'use server';

import { sleep } from '@/helpers';
import { signIn } from '../../auth.config';
import { AuthError } from 'next-auth';
 
// ...
 
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {

    // await sleep(2000);
    
    await signIn('credentials', {
      ...Object.fromEntries(formData),
      redirect: false,
    });

    return 'Success'

  } catch (error) {

    if((error as any).type === 'CredentialsSignin') {
      return 'CredentialsSignin';
    }

    return 'Unknow Error';
  }
}

export const login = async(email: string, password: string) => {

  try {
    await signIn('credentials', {
      email,
      password,
    })

    return {ok: true}
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "Error al iniciar sesión"
    }
  }
}