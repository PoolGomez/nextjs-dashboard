import { fetchCategoriesPages } from "@/app/lib/data/categories";
import { CreateCategory } from "@/app/ui/categories/buttons";
import { lusitana } from "@/app/ui/fonts";
import Loader from "@/app/ui/loader/loader";
import Search from "@/app/ui/search";
import { Suspense } from "react";
import Table from '@/app/ui/categories/table';

export default async function CategoriesPage ({searchParams}:{searchParams?:{
  query?:string;
  page?: string;
}}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchCategoriesPages(query)
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl  text-black dark:text-white`}>Categorias</h1>
      </div>
      <div className="mt-4 mb-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search categoria..." />
        <CreateCategory />
      </div>
      {/* <InvoicesTableSkeleton /> */}
      
      <Suspense key={query + currentPage} fallback={<Loader />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>

    </div>
    

     
    
    
  )
}


{/* <Breadcrumb pageName="Categorias" />
      <ListCategories /> */}