'use server';
import { z } from 'zod';
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import toast from 'react-hot-toast';
import { redirect } from 'next/navigation';
// import { redirect } from 'next/navigation';

const FormSchema = z.object({
    id: z.string(),
    name: z.string().min(1,{message:"El nombre es un campo obligatorio"}),
    image_url: z.string().min(1,{message:"La url de la imagen es un campo obligatorio"}),
    // state: z.coerce.boolean({required_error: "isActive is required"}),
    // status: z.string({required_error: "El estado es obligatorio",invalid_type_error: "Debe seleccionar un Estado",})
    // .min(1,{message:"El estado es obligatorio"}), 
    status: z.enum(['active', 'inactive'],{
        invalid_type_error: 'Porfavor seleccionar un estado.',
    }),
  });

const CreateCategory = FormSchema.omit({ id: true });
const UpdateCategory = FormSchema.omit({ id: true });

export type State = {
    errors?: {
      name?: string[];
      image_url?:string[];
      status?: string[];
    };
    message?: string | null;
};


export async function deleteCategory(id: string) {
    // throw new Error('Failed to Delete Invoice');
    try {
        await sql`DELETE FROM categories WHERE id = ${id}`;
        revalidatePath('/dashboard/categories');
        return { message: 'Deleted Category' };
    } catch (error) {
        return { message: 'Database Error: Failed to Delete Category.' };
    }
    
}

export async function createCategory(prevState: State, formData: FormData) {
    // Validate form fields using Zod
    const validatedFields = CreateCategory.safeParse({
        name: formData.get('name'),
        image_url:formData.get('image_url'),
        status: formData.get('status'),
      });
    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Create Category.',
        };
    }
    // Prepare data for insertion into the database
    const { name,image_url, status } = validatedFields.data;

    // Insert data into the database
    try {
        await sql`
            INSERT INTO categories (name, image_url, status)
            VALUES (${name}, ${image_url}, ${status})
        `;
    } catch (error) {
        // If a database error occurs, return a more specific error.
        return {
            message: 'Database Error: Failed to Create Categories.',
          };
    }
    revalidatePath('/dashboard/categories');
    return { message: 'Register category OK'};
}

export async function updateCategory(id: string,prevState: State, formData: FormData) {
    const validatedFields = UpdateCategory.safeParse({
        name: formData.get('name'),
        image_url: formData.get('image_url'),
        status: formData.get('status'),
    });
    
    if (!validatedFields.success) {
    return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Update Category.',
    };
    }

    const { name, image_url, status } = validatedFields.data;
   
    try {
        await sql`
            UPDATE categories
            SET name = ${name}, image_url = ${image_url}, status = ${status}
            WHERE id = ${id}
            `;
    } catch (error) {
        return { message: 'Database Error: Failed to Update Category.' };
    }
    revalidatePath('/dashboard/categories');
    return { message: 'Update category OK'};
}