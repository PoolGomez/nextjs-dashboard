
import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';
import { CategoriesTable, CategoryForm } from '../definitions';

const ITEMS_PER_PAGE = 10;

export async function fetchCategoriesPages(query: string) {
    noStore();
    try {
      const count = await sql`SELECT COUNT(*)
      FROM categories
      WHERE
        name ILIKE ${`%${query}%`}
    `;
  
      const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
      return totalPages;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch total number of invoices.');
    }
}

export async function fetchFilteredCategories(
    query: string,
    currentPage: number,
) {
    noStore();
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;

    try {
        const categories = await sql<CategoriesTable>`
        SELECT
            id,
            name,
            image_url,
            status
        FROM categories
        WHERE
            name ILIKE ${`%${query}%`} OR
            status ILIKE ${`%${query}%`}
        ORDER BY name DESC
        LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
        `;
        return categories.rows;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch categories.');
    }
}

export async function fetchCategoryById(id: string) {
    noStore();
    try {
      const data = await sql<CategoryForm>`
        SELECT
          id,
          name,
          image_url,
          status
        FROM categories
        WHERE id = ${id};
      `;
      return data.rows[0];

    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch category.');
    }
  }
