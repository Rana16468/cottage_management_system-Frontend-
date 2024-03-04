import { Link } from "react-router-dom";

const AllCatagorie = [
  {
    id: 1,
    categorie: "Product Catagorie",
    executeCatagorie: [
      {
        id: 1,
        name: <Link to="/create_categorie">Create Prottery Categorie </Link>,
      },
      { id: 2, name: "Get All Categorie" },
    ],
  },
];

export default AllCatagorie;
