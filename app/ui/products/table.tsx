import { fetchFilteredProducts } from "@/app/lib/data/products";
import Status from "../common/status";
import { DeleteProduct, UpdateProduct } from "./buttons";
import { formatCurrency } from "@/app/lib/utils";

export default async function ProductsTable({query, currentPage}:{query: string, currentPage: number}){
    
    const products = await fetchFilteredProducts(query, currentPage);

    return (


        <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base text-black dark:text-white">
              Titulo
            </h5>
          </div>
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base  text-black dark:text-white">
              Categoria
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base text-black dark:text-white">
              Precio
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Estado
            </h5>
          </div>
          <div className="p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base text-black dark:text-white">
              Accion
            </h5>
          </div>
        </div>

        {products.map((product, key) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-5 ${
              key === products.length - 1
                ? ""
                : "border-b border-stroke dark:border-strokedark"
            }`}
            key={key}
          >
            <div className="flex items-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{product.title}</p>
            </div>

            <div className="flex items-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{product.name}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white">{formatCurrency(product.base_price)}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <Status status={product.status} />
            </div>

            <div className="items-center justify-center p-2.5 sm:flex xl:p-5">
                
                    <div className="flex justify-end gap-3">
                      <UpdateProduct id={product.id} />
                      <DeleteProduct id={product.id} />
                    
                    </div>
                    
            </div>
          </div>
        ))}

      </div> 
      
    )

}