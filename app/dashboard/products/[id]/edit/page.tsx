import { fetchCategories } from "@/app/lib/data/categories";
import { fetchProductById } from "@/app/lib/data/products";
import Breadcrumbs from "@/app/ui/common/breadcrumb";
import EditProductForm from "@/app/ui/products/edit-form";
import { notFound } from "next/navigation";

export default async function ProductEditPage({params}:{params:{id: string}}){
    const id = params.id;
    const [product, categories] = await Promise.all([
        fetchProductById(id),
        fetchCategories(),
      ]);
    if (!product) {
    notFound();
    }
    return(
        <main>
            <Breadcrumbs
                breadcrumbs={[
                { label: 'Products', href: '/dashboard/products' },
                {
                    label: 'Editar Producto',
                    href: `/dashboard/products/${id}/edit`,
                    active: true,
                },
                ]}
            />

            <EditProductForm product={product} categories={categories} />
        </main>
        
    )
}