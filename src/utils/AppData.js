import { Link } from "react-router-dom";
import CategoriesName from "./CategoriesName";

const menuItems = [
  // {
  //   title: "EXPORE",
  //   subItems: [
  //     {
  //       catagoties: "New & Featured",
  //       items: [<Link>Shoes</Link>, "Clothing", "Accessories", "Featured"],
  //     },
  //   ],
  // },
  {
    title: "MEN",
    subItems: [
      {
        catagoties: "Cottage & Categorie",
        items: CategoriesName?.map((v) => (
          <Link to={`/all_product_categories/${v.id}`}>{v.categorieName}</Link>
        )),
      },
      {
        catagoties: "All Clothing",
        items: [
          "Jordan",
          "Big&Tall",
          "Basketball",
          "Fitness",
          "Cricket",
          "Football",
        ],
      },
      {
        catagoties: "Shop by Sport",
        items: [
          "Golf",
          "Soccer",
          "BasketBall",
          "Tennies",
          "Baseball",
          "Football",
          "Volleyball",
          "Yoga",
        ],
      },
    ],
  },
  {
    title: "WOMEN",
    subItems: [
      {
        catagoties: "New & Featured",
        items: ["Shoes", "Clothing", "Accessories", "Featured"],
      },
      {
        catagoties: "New & Featured",
        items: ["Shoes", "Clothing", "Accessories", "Featured"],
      },
      {
        catagoties: "New & Featured",
        items: ["Shoes", "Clothing", "Accessories", "Featured"],
      },
    ],
  },
  {
    title: "KID",
    subItems: [
      {
        catagoties: "Clothing",
        items: ["Shoes", "Clothing", "Accessories", "Featured"],
      },
      {
        catagoties: "Shoes",
        items: ["Shoes", "Clothing", "Accessories", "Featured"],
      },
      {
        catagoties: "Feature",
        items: ["Shoes", "Clothing", "Accessories", "Featured"],
      },
    ],
  },
];
export default menuItems;
