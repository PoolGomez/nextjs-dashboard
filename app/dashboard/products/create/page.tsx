
import { fetchCategories } from "@/app/lib/data/categories";
import Breadcrumbs from "@/app/ui/common/breadcrumb";
import CreateProductForm from "@/app/ui/products/create-form";

export default async function ProductCreatePage(){
    const categories = await fetchCategories();
    return(
        <main>
        <Breadcrumbs
            breadcrumbs={[
            { label: 'Productos', href: '/dashboard/products' },
            {
                label: 'Crear Producto',
                href: '/dashboard/products/create',
                active: true,
            },
            ]}
        />
        <CreateProductForm categories={categories} />
        </main>
    )
}