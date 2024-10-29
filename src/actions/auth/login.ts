'use server';

import { sleep } from '@/helpers';
import { signIn } from '../../../auth.config';
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