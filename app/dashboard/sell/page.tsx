import { lusitana } from "@/app/ui/fonts";
import CategoriesItem from "@/app/ui/sell/categoriesItem";

const cardsItemTwoData = [
  {
    cardImageSrc: "https://alzu-web.s3.us-east-2.amazonaws.com/pizza.png",
    cardTitle: "PIZZAS",
    cardContent:
      "Lorem ipsum dolor sit amet, vehiculaum ero felis loreum fitiona fringilla goes scelerisque Interdum et.",
  },

  {
    cardImageSrc: "https://alzu-web.s3.us-east-2.amazonaws.com/lasagna.png",
    cardTitle: "LASAGNAS",
    cardContent:
      "Lorem ipsum dolor sit amet, vehiculaum ero felis loreum fitiona fringilla goes scelerisque Interdum et.",
  },

  {
    cardImageSrc: "https://alzu-web.s3.us-east-2.amazonaws.com/pizza.png",
    cardTitle: "PIZZAS",
    cardContent:
      "Lorem ipsum dolor sit amet, vehiculaum ero felis loreum fitiona fringilla goes scelerisque Interdum et.",
  },

  {
    cardImageSrc: "https://alzu-web.s3.us-east-2.amazonaws.com/lasagna.png",
    cardTitle: "LASAGNAS",
    cardContent:
      "Lorem ipsum dolor sit amet, vehiculaum ero felis loreum fitiona fringilla goes scelerisque Interdum et.",
  },
];

export default function SellPage () {
    return (
      <div className="w-full">
        <div className="flex w-full items-center justify-between">
          <h1 className={`${lusitana.className} text-2xl text-black dark:text-white`}>Vender</h1>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-5">
          {cardsItemTwoData.map((card, key) => (
            <CategoriesItem
              key={key}
              cardImageSrc={card.cardImageSrc}
              cardTitle={card.cardTitle}
              // cardContent={card.cardContent}
            />
          ))}
        </div>



      </div>
    )
  }