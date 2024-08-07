import React, { useEffect } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../header/Navbar";
import { Outlet } from "react-router-dom";
import useAdmin from "../../hook/useAdmin";
import { Spin } from "antd";
import ErrorPage from "../../error/ErrorPage";

const AdminDashboard = () => {
  const { isAdmin, isLoading, error } = useAdmin();
  const navigate = useNavigate();

  // Redirect if not an admin
  useEffect(() => {
    if (!isLoading && !isAdmin?.isAdmin) {
      navigate("/");
    }
  }, [isLoading, isAdmin, navigate]);

  const AdminAccessRouter = [
    { name: "All User", path: "/dashboard/all_user" },
    { name: "All Categories", path: "/dashboard/all_product_categorie" },
    { name: "Product Zone", path: "/dashboard/admin_product_zone" },
    { name: "Reviews", path: "/dashboard/reviwes" },
    { name: "Wish List", path: "/dashboard/wish_list" },
    { name: "Add To Cart", path: "/dashboard/add_to_cards" },
    { name: "All Payments", path: "/dashboard/payment_details" },
    { name: "All Delivery Reports", path: "/dashboard/delivery_report" },
    { name: "Payment Schedule", path: "/dashboard/paymentSchedule" },
    { name: "Delivery Schedule", path: "/dashboard/delivery_schedule" },
    { name: "Forgot Password", path: "/forget_password" },
    { name: "Reset Password", path: "/reset_password" },
    { name: "Delete Account", path: "/delete_account" },
    { name: "Activity", path: "/dashboard" },
    { name: "Report", path: "/dashboard/report" },
  ];

  return (
    <>
      <Navbar />
      {isLoading && <Spin />}
      {error && <ErrorPage />}
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <Outlet />
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"></label>

          {isAdmin?.isAdmin && (
            <ul className="menu p-4 w-72 h-full max-h-screen text-xl text-base-content bg-center bg-no-repeat bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/conference.jpg')] bg-sky-700 bg-blend-multiply">
              {/* Sidebar content here */}
              <div className="flex justify-between items-center text-white my-1">
                <Link to="/" className="flex items-center">
                  <FaChevronLeft />
                  <h1>Back</h1>
                </Link>
                <h1 className="text-xl">Admin Panel</h1>
              </div>

              {AdminAccessRouter?.map((v, index) => (
                <li className="m-1" key={index}>
                  <Link
                    className="btn btn-outline btn-sm text-white"
                    to={v.path}>
                    {v.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
