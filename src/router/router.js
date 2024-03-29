import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import ADVTime from "../components/header/ADVTime";
import Register from "../components/page/register/Register";
import Login from "../components/page/register/Login";
import Dashboard from "../components/page/BuyerDashboard/Dashboard";
import PrivateRouter from "./PrivateRouter";
import ProductDetails from "../components/page/BuyerDashboard/ProductDetails";
import PotteryCategorie from "../components/page/Categories/PotteryCategorie";
import SellerCategorie from "../components/page/Categories/SellerCategorie";
import AddToProduct from "../components/page/Categories/AddToProduct";
import AddToSubCategorie from "../components/page/SubCategorie/AddToSubCategorie";
import MySubCategorie from "../components/page/SubCategorie/MySubCategorie";
import AddToDetails from "../components/page/AddToDetails/AddToDetails";
import AddToCard from "../components/page/AddToCard/AddToCard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: "",
    children: [
      { path: "/", element: <ADVTime /> },
      { path: "/register", element: <Register /> },
      { path: "/login", element: <Login /> },
      {
        path: "/add_to_card",
        element: (
          <PrivateRouter>
            <AddToCard />
          </PrivateRouter>
        ),
      },
      { path: "/New_arrivals", element: "" },
      {
        path: "/buyer_dashboard/:categorieId/:id",
        element: (
          <PrivateRouter>
            <Dashboard />
          </PrivateRouter>
        ),
      },
      {
        path: "/product_details/:productId/:SubcategorieId",
        element: (
          <PrivateRouter>
            <ProductDetails />
          </PrivateRouter>
        ),
      },
      {
        path: "/create_categorie",
        element: (
          <PrivateRouter>
            <PotteryCategorie />
          </PrivateRouter>
        ),
      },
      {
        path: "/specific_seller_categorie",
        element: (
          <PrivateRouter>
            <SellerCategorie />
          </PrivateRouter>
        ),
      },
      {
        path: "/addToProduct/:categorieName/:productId",
        element: (
          <PrivateRouter>
            <AddToProduct />
          </PrivateRouter>
        ),
      },
      {
        path: "/add_to_categorie/:subCategorie/:categorieId/:productId",
        element: (
          <PrivateRouter>
            <AddToSubCategorie />
          </PrivateRouter>
        ),
      },
      {
        path: "/your_sub_categorie/:categorieId/:productId",
        element: (
          <PrivateRouter>
            <MySubCategorie />
          </PrivateRouter>
        ),
      },
      // addded to product details
      {
        path: "/add_to_details/:productId/:SubcategorieId",
        element: (
          <PrivateRouter>
            <AddToDetails />
          </PrivateRouter>
        ),
      },
    ],
  },
]);

export default router;
