import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import ADVTime from "../components/header/ADVTime";
import Register from "../components/page/register/Register";
import Login from "../components/page/register/Login";
import Dashboard from "../components/page/BuyerDashboard/Dashboard";
import PrivateRouter from "./PrivateRouter";
import ProductDetails from "../components/page/BuyerDashboard/ProductDetails";
import PotteryCategorie from "../components/page/Categories/PotteryCategorie";
import AddToProduct from "../components/page/Categories/AddToProduct";
import AddToSubCategorie from "../components/page/SubCategorie/AddToSubCategorie";
import MySubCategorie from "../components/page/SubCategorie/MySubCategorie";
import AddToDetails from "../components/page/AddToDetails/AddToDetails";
import AddToCard from "../components/page/AddToCard/AddToCard";
import PaymentSuccess from "../components/page/Payment/PaymentSuccess";
import PaymentSummary from "../components/page/Payment/PaymentSummary";
import PaymentFailed from "../components/page/Payment/PaymentFailed";
import AllProducts from "../components/page/Products/AllProducts";
import BamboChane from "../components/page/Products/BamboChane";
import AllSubCategorieProduct from "../components/page/Products/AllSubCategorieProduct";
import WishList from "../components/page/WishList/WishList";
import AdminDashboard from "../components/page/Dashboard/AdminDashboard";
import Profile from "../components/Profile/Profile";
import AdminHomePage from "../components/Admin/AdminHomePage";
import AllUser from "../components/Admin/AllUser";
import AllProductCategorie from "../components/Admin/AllProductCategorie";
import AllUserProductZone from "../components/Admin/AllUserProductZone";
import SellerCategorieApi from "../components/page/Categories/SellerCategorieApi";
import AllReviwes from "../components/Admin/AllReviwes";
import AllWishList from "../components/Admin/AllWishList";
import AllAddToCard from "../components/Admin/AllAddToCard";
import AllPaymentInfo from "../components/Admin/AllPaymentInfo";
import AllDeliveryDetails from "../components/Admin/AllDeliveryDetails";
import PaymentSchedule from "../components/Admin/PaymentSchedule";

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
        path: "/all_produts",
        element: (
          <PrivateRouter>
            <AllProducts />
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
            <SellerCategorieApi />
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
      {
        path: "/payment/success/:tranId",
        element: (
          <PrivateRouter>
            <PaymentSuccess />
          </PrivateRouter>
        ),
      },
      {
        path: "/payment/fail/:tranId",
        element: (
          <PrivateRouter>
            <PaymentFailed />
          </PrivateRouter>
        ),
      },
      {
        path: "/payment/my_paymment_summery",
        element: (
          <PrivateRouter>
            <PaymentSummary />
          </PrivateRouter>
        ),
      },
      {
        path: "/all_product_categories/:id",
        element: (
          <PrivateRouter>
            <BamboChane />
          </PrivateRouter>
        ),
      },
      {
        path: "/all_sub_categories/:sub/:id",
        element: (
          <PrivateRouter>
            <AllSubCategorieProduct />
          </PrivateRouter>
        ),
      },
      {
        path: "/wish_list",
        element: (
          <PrivateRouter>
            <WishList />
          </PrivateRouter>
        ),
      },
      {
        path: "/my_profile",
        element: (
          <PrivateRouter>
            <Profile />
          </PrivateRouter>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRouter>
        <AdminDashboard />
      </PrivateRouter>
    ),
    children: [
      { path: "/dashboard", element: <AdminHomePage /> },
      { path: "/dashboard/all_user", element: <AllUser /> },
      {
        path: "/dashboard/all_product_categorie",
        element: <AllProductCategorie />,
      },
      {
        path: "/dashboard/admin_product_zone",
        element: <AllUserProductZone />,
      },
      {
        path: "/dashboard/reviwes",
        element: <AllReviwes />,
      },
      {
        path: "/dashboard/wish_list",
        element: <AllWishList />,
      },
      {
        path: "/dashboard/add_to_cards",
        element: <AllAddToCard />,
      },
      {
        path: "/dashboard/payment_details",
        element: <AllPaymentInfo />,
      },
      {
        path: "/dashboard/delivery_report",
        element: <AllDeliveryDetails />,
      },
      {
        path: "/dashboard/paymentSchedule",
        element: <PaymentSchedule />,
      },
    ],
  },
]);

export default router;
