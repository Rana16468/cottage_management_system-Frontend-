import { Link } from "react-router-dom";
import CategoriesName from "./CategoriesName";
import { allPotterySubCategorie } from "./AllSubCategorieName";

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
    title: "Product Categories",
    subItems: [
      {
        catagoties: "Cottage & Categorie",
        items: CategoriesName?.map((v) => (
          <Link to={`/all_product_categories/${v.id}`}>{v.categorieName}</Link>
        )),
      },
    ],
  },
  {
    title: "Product SubCategorie",
    subItems: allPotterySubCategorie.map((v) => {
      return {
        catagoties: v.subCategorieName,
        items: v.subCategorie,
      };
    }),
  },
];
export default menuItems;
