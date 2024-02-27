import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";

import ADVTime from "../components/header/ADVTime";
import Register from "../components/page/register/Register";
import Login from "../components/page/register/Login";
import Dashboard from "../components/page/BuyerDashboard/Dashboard";
import PrivateRouter from "./PrivateRouter";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: "",
    children: [
      { path: "/", element: <ADVTime /> },
      { path: "/register", element: <Register /> },
      { path: "/login", element: <Login /> },
      { path: "/add_to_card", element: "" },
      { path: "/New_arrivals", element: "" },
      { path: "/trandint_product/:id", element: "" },
      {
        path: "/buyer_dashboard/:categorieId/:id",
        element: (
          <PrivateRouter>
            <Dashboard />
          </PrivateRouter>
        ),
      },
    ],
  },
]);

export default router;
