

import CreateCategoryForm from '@/app/ui/categories/create-form';
import Breadcrumbs from '@/app/ui/common/breadcrumb';
 
export default async function CreateCategoriyPage() {
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Categorias', href: '/dashboard/categories' },
          {
            label: 'Crear Categoria',
            href: '/dashboard/categories/create',
            active: true,
          },
        ]}
      />
      <CreateCategoryForm  />
    </main>
  );
}