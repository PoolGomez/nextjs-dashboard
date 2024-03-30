'use client';
import Link from 'next/link';
import { createInvoice } from '@/app/lib/actions';
import { useFormState } from 'react-dom';
import Switcher from '../common/switcher';
import { CheckIcon, ClockIcon } from '@heroicons/react/20/solid';

export default function CreateCategoryForm() {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createInvoice, initialState);
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
                <input
                    id='name'
                    name='name'
                    type="text"
                    placeholder="Ingrese nombre"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Imagen URL
                </label>
                <input
                    id='image_url'
                    name='image_url'
                    type="text"
                    placeholder="Ingrese la URL de la imagen"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>

              <div className="flex justify-between">
                <fieldset>
                    <legend className="mb-3 block text-black dark:text-white">
                        Estado
                    </legend>
                    <div className="flex gap-4">
                    <div className="flex items-center">
                        <input
                        id="pending"
                        name="status"
                        type="radio"
                        value="pending"
                        className="h-4 w-4 cursor-pointer border-primary bg-primary text-primary focus:ring-2"
                        // required
                        aria-describedby="status-error"
                        />
                        {/* <div
                            className={`mr-4 flex h-5 w-5 items-center justify-center rounded border border-primary bg-gray dark:bg-transparent`}
                        >
                            <span
                            className={`h-2.5 w-2.5 rounded-sm bg-primary`}
                            ></span>
                        </div> */}
                        <label
                        htmlFor="pending"
                        className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full  px-3 py-1.5  text-black dark:text-white"
                        >
                        Activo
                        </label>
                    </div>
                    <div className="flex items-center">
                        <input
                        id="paid"
                        name="status"
                        type="radio"
                        value="paid"
                        className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                        // required
                        aria-describedby="status-error"
                        />
                        <label
                        htmlFor="paid"
                        className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1.5 text-black dark:text-white"
                        >
                        Inactivo
                        </label>
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
                  className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                >
                  Cancelar
                </Link>
                <button
                  className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-95"
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
