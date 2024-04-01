import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';
import { ProductForm, ProductsTable } from '../definitions';

const ITEMS_PER_PAGE = 10;

export async function fetchProductsPages(query: string) {
    noStore();
    try {
      const count = await sql`SELECT COUNT(*)
      FROM products
      JOIN categories ON products.category_id = categories.id
      WHERE
        categories.name ILIKE ${`%${query}%`} OR
        products.title ILIKE ${`%${query}%`} OR
        products.description ILIKE ${`%${query}%`} OR
        products.base_price::text ILIKE ${`%${query}%`} OR
        products.status ILIKE ${`%${query}%`}
    `;
  
      const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
      return totalPages;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch total number of products.');
    }
}

export async function fetchFilteredProducts(
    query: string,
    currentPage: number,
) {
    noStore();
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;

    try {
        const products = await sql<ProductsTable>`
        SELECT
            products.id,
            products.title,
            products.image_url,
            products.base_price,
            products.status,
            categories.name
        FROM products
        JOIN categories ON products.category.id = categories.id
        WHERE
            categories.name ILIKE ${`%${query}%`} OR
            products.title ILIKE ${`%${query}%`} OR
            products.base_price ILIKE ${`%${query}%`} OR
            products.status ILIKE ${`%${query}%`} OR
        ORDER BY products.title ASC
        LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
        `;
        return products.rows;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch products.');
    }
}

export async function fetchProductById(id: string) {
    noStore();
    try {
      const data = await sql<ProductForm>`
        SELECT
          products.id,
          products.category_id,
          products.title,
          products.description,
          products.base_price,
          products.image_url,
          products.sizes,
          products.status
        FROM products
        WHERE products.id = ${id};
      `;
      const product = data.rows.map((product) => ({
        ...product,
        // Convert amount from cents to dollars
        base_price: product.base_price / 100,
      }));

      return product[0];

    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch product.');
    }
  }




// products
// id, title, description, image_url, category_id, base_price, sizes, status

// categories
// id, name, image_url, status