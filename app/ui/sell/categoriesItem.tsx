import Image from "next/image";
import Link from "next/link";

export default function CategoriesItem({
    cardImageSrc,
    cardTitle,
    // cardContent,
  }:{
    cardImageSrc : string,
    cardTitle: string,
    // cardContent: string,
  }){

    return(
        <div className="mt-4 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <Link href='#'>
            <div className="block px-4 pt-4">
                <Image width={250} height={150} src={cardImageSrc || ""} alt="Cards" />
            </div>

            <div className="text-center p-6">
                <h4 className="mb-3 text-xl font-semibold text-black hover:text-primary dark:text-white dark:hover:text-primary">
                {cardTitle}
                </h4>
                {/* <p>{cardContent}</p> */}
            </div>
            </Link>
        </div>
    )

}