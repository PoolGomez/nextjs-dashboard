
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import CreateCategoryForm from '@/app/ui/categories/create-form';
 
export default async function CreateCategoriyPage() {
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Categories', href: '/dashboard/categoies' },
          {
            label: 'Create Category',
            href: '/dashboard/categories/create',
            active: true,
          },
        ]}
      />
      <CreateCategoryForm  />
    </main>
  );
}