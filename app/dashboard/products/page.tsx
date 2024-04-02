import { fetchProductsPages } from "@/app/lib/data/products";
import Pagination from "@/app/ui/common/pagination";
import { lusitana } from "@/app/ui/fonts";
import Loader from "@/app/ui/loader/loader";
import { CreateProduct } from "@/app/ui/products/buttons";
import Search from "@/app/ui/search";
import { Suspense } from "react";
import Table from '@/app/ui/products/table';
export default async function ProductsPage ({
  searchParams
}:{
  searchParams?:{
    query?: string;
    page?: string;
  }
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchProductsPages(query);

    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
              <h1 className={`${lusitana.className} text-2xl text-black dark:text-white`}>Productos</h1>
            </div>
            <div className="mt-4 mb-4 flex items-center justify-between gap-2 md:mt-8">
              <Search placeholder="Buscar productos..." />
              <CreateProduct />
            </div>
            <Suspense key={query + currentPage} fallback={<Loader />}>
              <Table query={query} currentPage={currentPage} />
            </Suspense>
          <div className="mt-5 flex w-full justify-center">
            <Pagination totalPages={totalPages} />
          </div>
            
        </div>
    )
  }



 