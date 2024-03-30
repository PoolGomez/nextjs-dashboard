import { fetchFilteredCategories } from "@/app/lib/data/categories"
import Image from "next/image";
import Status from "../common/status";
import { DeleteCategory, UpdateCategory } from "./buttons";

export default async function CategoriesTable({query, currentPage}:{query: string, currentPage: number}){
    
    const categories = await fetchFilteredCategories(query, currentPage);

    return (


        <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-4">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Imagen
            </h5>
          </div>
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Nombre
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Estado
            </h5>
          </div>
          {/* <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Sales
            </h5>
          </div> */}
          <div className="p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Accion
            </h5>
          </div>
        </div>

        {categories.map((category, key) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-4 ${
              key === categories.length - 1
                ? ""
                : "border-b border-stroke dark:border-strokedark"
            }`}
            key={key}
          >
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <div className="flex-shrink-0">
                {/* <Image src={category.imagen_url} alt="imagen" width={48} height={48} /> */}
                <Image src="/categories/pizza.png" alt="imagen" width={48} height={48} />
              </div>
              {/* <p className="hidden text-black dark:text-white sm:block">
                {brand.name}
              </p> */}
            </div>

            <div className="flex items-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{category.name}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <Status status={category.state} />
              {/* <p className="text-meta-3">{category.state === true ? 'Active' : 'Inactive'}</p> */}
            </div>

            {/* <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white">{category.name}</p>
            </div> */}

            <div className="items-center justify-center p-2.5 sm:flex xl:p-5">
                {/* <Status status={category.state} /> */}
                {/* <button className="hover:text-primary">
                <TrashIcon className="w-8 text-danger" />
                  
                    </button> */}
                    <div className="flex justify-end gap-3">
                    <DeleteCategory id={category.id} />
                    <UpdateCategory id={category.id} />
                    </div>
                    
              {/* <p className="text-meta-5">{category.state}</p> */}
            </div>
          </div>
        ))}
      </div> 
      
    )

}