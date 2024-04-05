'use client';

import { updateCategory } from '@/app/lib/actions/categories';
import { updateProduct } from '@/app/lib/actions/products';
import { CategoryField, ProductForm } from '@/app/lib/definitions';
import { useState } from 'react';
import { useFormState } from 'react-dom';
import MenuItemPriceProps from './menuItemPriceProps';
import Link from 'next/link';

export default function EditProductForm({
  product,
  categories,
}: {
  product: ProductForm;
  categories: CategoryField[];
}) {
  const initialState = { message: null, errors: {} };
  const updateProductWithId = updateProduct.bind(null, product.id);
  const [state, dispatch] = useFormState(updateProductWithId, initialState);

  const [sizes, setSizes] = useState(product.sizes);

  return (
    <form action={dispatch}>
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Titulo
                </label>
                <div className="relative mt-2 rounded-md">
                  <div className="relative">
                    <input
                      id="title"
                      name="title"
                      type="text"
                      defaultValue={product.title}
                      placeholder="Ingrese un titulo"
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      aria-describedby="title-error"
                    />
                  </div>
                  <div id="title-error" aria-live="polite" aria-atomic="true">
                    {state.errors?.title &&
                      state.errors.title.map((error: string) => (
                        <p className="mt-2 text-sm text-danger" key={error}>
                          {error}
                        </p>
                      ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Categoria
                </label>
                <div className="relative mt-2 rounded-md">
                  <div className="relative">
                    <div className="relative z-20 bg-transparent dark:bg-form-input">
                      <select
                        id="category"
                        name="categoryId"
                        aria-describedby="category-error"
                        className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        defaultValue={product.category_id}
                      >
                        <option value="" disabled>
                          Seleccione una categoria{' '}
                        </option>
                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                      <span className="absolute right-4 top-1/2 z-30 -translate-y-1/2">
                        <svg
                          className="fill-current"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g opacity="0.8">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                              fill=""
                            ></path>
                          </g>
                        </svg>
                      </span>
                    </div>
                  </div>
                  <div
                    id="category-error"
                    aria-live="polite"
                    aria-atomic="true"
                  >
                    {state.errors?.categoryId &&
                      state.errors.categoryId.map((error: string) => (
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
                      placeholder="Ingrese la URL de la imagen"
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      aria-describedby="image-error"
                      defaultValue={product.image_url}
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

              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Descripcion
                </label>
                <div className="relative mt-2 rounded-md">
                  <div className="relative">
                    <input
                      id="description"
                      name="description"
                      type="text"
                      placeholder="Ingrese una descripcion"
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      aria-describedby="description-error"
                      defaultValue={product.description}
                    />
                  </div>
                  <div
                    id="description-error"
                    aria-live="polite"
                    aria-atomic="true"
                  >
                    {state.errors?.description &&
                      state.errors.description.map((error: string) => (
                        <p className="mt-2 text-sm text-danger" key={error}>
                          {error}
                        </p>
                      ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Precio
                </label>
                <div className="relative mt-2 rounded-md">
                  <div className="relative">
                    <input
                      id="base_price"
                      name="base_price"
                      type="number"
                    //   step="0.01"
                      placeholder="Ingrese un precio"
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      aria-describedby="base_price-error"
                      defaultValue={product.base_price}
                    />
                  </div>
                  <div
                    id="base_price-error"
                    aria-live="polite"
                    aria-atomic="true"
                  >
                    {state.errors?.base_price &&
                      state.errors.base_price.map((error: string) => (
                        <p className="mt-2 text-sm text-danger" key={error}>
                          {error}
                        </p>
                      ))}
                  </div>
                </div>
              </div>

              {/* <input name="sizes" type="hidden" value={JSON.stringify(sizes)} /> */}
              <input name="sizes" type="hidden" value={JSON.stringify(sizes)} />

              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Tamaño
                </label>
                <div className="relative mt-2 rounded-md">
                  <div className="relative">
                    <MenuItemPriceProps
                      // name={'Sizessss'}
                      addLabel={'Agregar tamaño'}
                      props={sizes}
                      setProps={setSizes}
                    />
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
                        defaultChecked={product.status === 'active'}
                        className="h-4 w-4 cursor-pointer border-primary bg-primary text-primary focus:ring-2"
                        // required
                        aria-describedby="status-error"
                      />
                      <label
                        htmlFor="activo"
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
                        defaultChecked={product.status === 'inactive'}
                        className="border-gray-300 bg-gray-100 text-gray-600 h-4 w-4 cursor-pointer focus:ring-2"
                        // required
                        aria-describedby="status-error"
                      />
                      <label
                        htmlFor="inactivo"
                        className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1.5 text-black dark:text-white"
                      >
                        Inactivo
                      </label>
                    </div>

                    <div
                      id="status-error"
                      aria-live="polite"
                      aria-atomic="true"
                    >
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
                  href="/dashboard/products"
                  className="flex justify-center rounded border border-stroke bg-danger px-6 py-2 font-medium text-white hover:shadow-1 dark:border-strokedark "
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
