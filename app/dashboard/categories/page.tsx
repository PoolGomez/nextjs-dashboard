import Breadcrumb from "@/app/ui/breadcrumb/breadcrumb";
import ListCategories from "@/app/ui/categories/listCategories";
import Link from "next/link";

export default function CategoriesPage () {
  return (
    <>
     <Breadcrumb pageName="Categorias" />

    <div className="flex flex-col gap-10">
        <ListCategories />
    </div>
    </>
  )
}


