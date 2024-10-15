import prisma from '@/lib/prisma';
import type { NextAuthConfig } from 'next-auth';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import bcryptjs from 'bcryptjs';
 
export const authConfig = {
  providers: [

    Credentials({
        async authorize(credentials) {
          const parsedCredentials = z
            .object({ email: z.string().email(), password: z.string().min(6) })
            .safeParse(credentials);

            if( parsedCredentials.success === false ) return null;

            const { email, password } = parsedCredentials.data;

            // Buscar el correo
            const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } })
            if( !user ) return null;

            // Comparar las contraseñas
            if( !bcryptjs.compareSync( password, user.password ) ) {
                return null;  
            };

            // Si todo sale bien, retornar el usuario (excepto el password)
            const { password: _, ...userWithoutPassword } = user;
            return userWithoutPassword;
            
        },
      }),

  ], // Add your providers here
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/new-account',
  }
} satisfies NextAuthConfig;


export const { signIn, signOut, auth } = NextAuth(authConfig);