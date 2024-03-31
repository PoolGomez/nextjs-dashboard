
import { fetchCategoryById } from "@/app/lib/data/categories";
import EditCategoryForm from "@/app/ui/categories/edit-form";
import Breadcrumbs from "@/app/ui/common/breadcrumb";
import { notFound } from "next/navigation";

export default async function CategoryEditPage({ params }: { params: { id: string } }){
    const id = params.id;
    const [category] = await Promise.all([
        fetchCategoryById(id)
      ]);
    if (!category) {
    notFound();
    }
    return(
        <main>
            <Breadcrumbs
                breadcrumbs={[
                { label: 'Categories', href: '/dashboard/categories' },
                {
                    label: 'Editar Categoria',
                    href: `/dashboard/categories/${id}/edit`,
                    active: true,
                },
                ]}
            />
            <EditCategoryForm category={category} />
        </main>
    )
}