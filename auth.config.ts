import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  providers: [], // Add your providers here
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/new-account',
  }
} satisfies NextAuthConfig;