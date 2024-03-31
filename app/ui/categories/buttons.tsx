'use client'
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteCategory } from '@/app/lib/actions/categories';
import Swal from 'sweetalert2'

export function CreateCategory() {
    // className="inline-flex  items-center justify-center rounded-md bg-meta-3 py-3 px-6 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
  return (
    <Link
      href="/dashboard/categories/create"
      // className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    // className="inline-flex items-center justify-center rounded-md bg-meta-3 py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
    className="inline-flex items-center justify-center rounded-md bg-meta-3 py-4 px-6 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
    >
      <span className="hidden md:block">Crear Categoria</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateCategory({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/categories/${id}/edit`}
      className="rounded-md p-2 hover:bg-gray-100 bg-warning"
    >
      <PencilIcon className="w-5 text-white" />
    </Link>
  );
}


export function DeleteCategory({ id }: { id: string }) {
  const deleteCategoryWithId = deleteCategory.bind(null, id);
  function testdeletecat(){
    Swal.fire({
      title: "Eliminar",
      text: "¿Esta seguro que desea eliminar este elemento?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar"
    }).then( (result) => {
      if (result.isConfirmed) {
         
        Swal.fire({
          title: "Eliminado!",
          text: "El elemento fue eliminado",
          icon: "success"
        });
        
        deleteCategoryWithId();
      }
    });
  }
  // const deleteCategoryWithId = testdeletecat();
  
  // deleteCategory.bind(null, id);

  return (
    <form action={testdeletecat}>
      <button 
        className="rounded-md p-2 hover:bg-gray-100 bg-danger"
      >
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5 text-white" />
      </button>
    </form>
  );
}


// export function DeleteCategory({ id }: { id: string }) {
//   const deleteCategoryWithId = deleteCategory.bind(null, id);
//   return (
//     <form action={deleteCategoryWithId}>
//       <button className="rounded-md p-2 hover:bg-gray-100 bg-danger">
//         <span className="sr-only">Delete</span>
//         <TrashIcon className="w-5 text-white" />
//       </button>
//     </form>
//   );
// }
