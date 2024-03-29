'use server';
import { z } from 'zod';
import { sql } from "@vercel/postgres";
import { redirect } from "next/navigation";
import { AuthError } from 'next-auth';
import { signIn, signOut } from '@/auth';
const bcrypt = require('bcrypt');

const FormSchema = z.object({
    id: z.string(),
    name: z.string()
    .min(3,{
        message:"Debe tener 4 o más caracteres",
    }),
    email: z.string().email({
        message: 'Ingrese un email invalido',
    }),
    password: z.string().min(6,{
        message:'Debe tener 6 o más caracteres',
    }),
});
const RegistrarUsuario = FormSchema.omit({ id: true});
export type State = {
    errors?: {
      name?: string[];
      email?: string[];
      password?: string[];
      repassword?: string[];
    };
    message?: string | null;
};

export async function registerUser(prevState: State, formData: FormData) {

    // Validate form fields using Zod
    const validatedFields = RegistrarUsuario.safeParse({
        name: formData.get('name'),
        email:formData.get('email'),
        password: formData.get('password'),
        // repassword: formData.get('password'),
      });
      
    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Campos faltantes. No se pudo crear el usuario.',
            };
        
    }

    if(formData.get('password') !== formData.get('repassword')){
        return {
            errors: {
                repassword:['Contraseñan no coinciden']
            },
            message: 'Campos faltantes. No se pudo crear el usuario.',
            };
    }

    // Prepare data for insertion into the database
    const { name, email, password } = validatedFields.data;

 
    // Insert data into the database
    try {
        // await sql`
        //     INSERT INTO users (name, email, password)
        //     VALUES (${name}, ${email}, ${password})
        // `;

        const hashedPassword = await bcrypt.hash(password, 10);
        await sql`
        INSERT INTO users (name, email, password)
        VALUES (${name}, ${email}, ${hashedPassword});
      `;


    } catch (error) {
        // If a database error occurs, return a more specific error.
        return {
            message: 'Error de base de datos: No se pudo crear el usuario.',
          };
    }

    return { message: 'Register OK'};
    // Revalidate the cache for the invoices page and redirect the user.
    // revalidatePath('/dashboard/invoices');
    // redirect('/login');
}

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
  ) {
    try {
      await signIn('credentials', formData);
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case 'CredentialsSignin':
            return 'Invalid credentials.';
          default:
            return 'Something went wrong.';
        }
      }
      throw error;
    }
}

export async function logOut(){
  await signOut();
}