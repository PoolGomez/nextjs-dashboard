
import Breadcrumbs from "@/app/ui/common/breadcrumb";
import CreateProductForm from "@/app/ui/products/create-form";

export default function ProductCreatePage(){
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
        <CreateProductForm  />
        </main>
    )
}