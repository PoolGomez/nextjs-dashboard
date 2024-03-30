'use server';
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";



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
