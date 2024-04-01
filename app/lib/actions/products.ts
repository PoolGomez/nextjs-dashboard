'use server';
import { z } from 'zod';
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from 'next/navigation';

const SizeSchema = z.object({
    name: z.string(),
    price: z.number(),
  });

const FormSchema = z.object({
    id: z.string(),
    categoryId: z.string({
        invalid_type_error: 'Porfavor selecciona una categoria.',
    }),
    title: z.string(),
    description: z.string(),
    image_url: z.string().min(1,{message:"La url de la imagen es un campo obligatorio"}),
    base_price: z.coerce.number().gt(0, { message: 'Ingrese una cantidad superior a 0.' }),
    sizes: z.array(SizeSchema),
    // state: z.coerce.boolean({required_error: "isActive is required"}),
    // status: z.string({required_error: "El estado es obligatorio",invalid_type_error: "Debe seleccionar un Estado",})
    // .min(1,{message:"El estado es obligatorio"}), 
    status: z.enum(['active', 'inactive'],{
        invalid_type_error: 'Porfavor seleccionar un estado.',
    }),
});

const CreateProduct = FormSchema.omit({ id: true});
const UpdateProduct = FormSchema.omit({ id: true});

export type State = {
    errors?: {
        categoryId?: string[];
        title?: string[];
        description?: string[];
        image_url?: string[];
        base_price?: string[];
        sizes?: string[];
        status?: string[];
    };
    message?: string | null;
};

export async function createProduct(prevState: State, formData: FormData) {
    // Validate form fields using Zod
    const validatedFields = CreateProduct.safeParse({
        categoryId: formData.get('categoryId'),
        title: formData.get('title'),
        description: formData.get('description'),
        image_url:formData.get('image_url'),
        base_price: formData.get('base_price'),
        sizes: formData.get('sizes'),        
        status: formData.get('status'),
      });
    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Create Product.',
        };
    }
    // Prepare data for insertion into the database
    const { categoryId, title,description, image_url,base_price,sizes,status } = validatedFields.data;
    const priceInCents = base_price * 100;
    const sizesJSON = JSON.stringify(sizes);
    // Insert data into the database
    try {
        await sql`
            INSERT INTO products (category_id, title, description, image_url, base_price, sizes, status)
            VALUES (${categoryId}, ${title}, ${description}, ${image_url}, ${priceInCents},  ${sizesJSON}, ${status})
        `;
    } catch (error) {
        // If a database error occurs, return a more specific error.
        return {
            message: 'Database Error: Failed to Create Product.',
          };
    }
    // Revalidate the cache for the invoices page and redirect the user.
    revalidatePath('/dashboard/products');
    redirect('/dashboard/products');
}

export async function updateProduct(id: string,prevState: State, formData: FormData) {
    const validatedFields = UpdateProduct.safeParse({
        categoryId: formData.get('categoryId'),
        title: formData.get('title'),
        description: formData.get('description'),
        image_url:formData.get('image_url'),
        base_price: formData.get('base_price'),
        sizes: formData.get('sizes'),        
        status: formData.get('status'),
    });
    
    if (!validatedFields.success) {
    return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Update Product.',
    };
    }

    const {categoryId, title,description, image_url,base_price,sizes,status  } = validatedFields.data;
    const priceInCents = base_price * 100;
    const sizesJSON = JSON.stringify(sizes);
   
    try {
        await sql`
            UPDATE products
            SET 
            category_id = ${categoryId}, title = ${title}, description = ${description}, image_url= ${image_url}, 
            base_price= ${priceInCents}, sizes= ${sizesJSON}, status= ${status}
            WHERE id = ${id}
            `;
    } catch (error) {
        return { message: 'Database Error: Failed to Update Product.' };
    }
    
   
    revalidatePath('/dashboard/products');
    redirect('/dashboard/products');
}
export async function deleteProduct(id: string) {
    // throw new Error('Failed to Delete Invoice');
    try {
        await sql`DELETE FROM products WHERE id = ${id}`;
        revalidatePath('/dashboard/products');
        return { message: 'Deleted Product' };
    } catch (error) {
        return { message: 'Database Error: Failed to Delete Product.' };
    }
    
}