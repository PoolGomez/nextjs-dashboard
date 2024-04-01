'use client';

import { CategoryForm } from '@/app/lib/definitions';

import Link from 'next/link';
import { useFormState } from 'react-dom';
import { updateCategory } from '@/app/lib/actions/categories';
import { useEffect } from 'react';
import { redirect } from 'next/navigation';
import toast from 'react-hot-toast';
// import { useEffect } from 'react';
// import { redirect } from 'next/navigation';
// import toast from 'react-hot-toast';
// import { revalidatePath } from 'next/cache';


export default function EditCategoryForm({
    category
}: {
    category: CategoryForm;
}) {
  const initialState = { message: null, errors: {} };
  const updateCategoryWithId = updateCategory.bind(null, category.id);
  const [state, dispatch] = useFormState(updateCategoryWithId, initialState);

  useEffect(()=>{
    if(state.message === 'Update category OK'){
        toast.success('Categoria Actualizada Correctamente!');
        redirect('/dashboard/categories');
    }
  },[state])
  
  return (
    <form action={dispatch}>
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Nombre
                </label>
                <div className="relative mt-2 rounded-md">
                  <div className="relative">
                    <input
                        id="name"
                        name="name"
                        type="text"
                        defaultValue={category.name}
                        placeholder="Ingrese nombre"
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        aria-describedby="name-error"
                    />
                  </div>
                  <div id="name-error" aria-live="polite" aria-atomic="true">
                    {state.errors?.name &&
                      state.errors.name.map((error: string) => (
                        <p className="mt-2 text-sm text-danger" key={error}>
                          {error}
                        </p>
                      ))}
                  </div>
                </div>
              </div>
              

              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Imagen URL
                </label>
                <div className="relative mt-2 rounded-md">
                  <div className="relative">
                    <input
                        id="image_url"
                        name="image_url"
                        type="text"
                        defaultValue={category.image_url}
                        placeholder="Ingrese la URL de la imagen"
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        aria-describedby="image-error"
                    />
                  </div>
                  <div id="image-error" aria-live="polite" aria-atomic="true">
                    {state.errors?.image_url &&
                      state.errors.image_url.map((error: string) => (
                        <p className="mt-2 text-sm text-danger" key={error}>
                          {error}
                        </p>
                      ))}
                  </div>
                </div>
              </div>
              



              <div className="flex justify-between">
                <fieldset>
                    <legend className="mb-3 block text-black dark:text-white">
                        Estado
                    </legend>
                    <div className="flex gap-4">
                    <div className="flex items-center">
                        <input
                        id="active"
                        name="status"
                        type="radio"
                        value="active"
                        defaultChecked={category.status ==='active'}
                        className="h-4 w-4 cursor-pointer border-primary bg-primary text-primary focus:ring-2"
                        // required
                        aria-describedby="status-error"
                        />
                        <label
                        htmlFor="active"
                        className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full  px-3 py-1.5  text-black dark:text-white"
                        >
                        Activo
                        </label>
                    </div>
                    <div className="flex items-center">
                        <input
                        id="inactive"
                        name="status"
                        type="radio"
                        value="inactive"
                        defaultChecked={category.status ==='inactive'}
                        className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                        // required
                        aria-describedby="status-error"
                        />
                        <label
                        htmlFor="inactive"
                        className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1.5 text-black dark:text-white"
                        >
                        Inactivo
                        </label>
                    </div>

                    <div id="status-error" aria-live="polite" aria-atomic="true">
                      {state.errors?.status &&
                        state.errors.status.map((error: string) => (
                          <p className="mt-2 text-sm text-danger" key={error}>
                            {error}
                          </p>
                        ))}
                    </div>
                    
                </div>
                </fieldset>
                {/* <label className="mb-3 block text-black dark:text-white">
                
                Estado
                </label> */}
                {/* <Switcher /> */}
              </div>

              <div className="flex justify-end gap-4.5">
                <Link
                  href="/dashboard/categories"
                  className="flex justify-center rounded bg-danger border border-stroke px-6 py-2 font-medium text-white hover:shadow-1 dark:border-strokedark "
                >
                  Cancelar
                </Link>
                <button
                  className="flex justify-center rounded bg-meta-3 px-6 py-2 font-medium text-gray hover:bg-opacity-95"
                  type="submit"
                >
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
