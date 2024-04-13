import React from "react";
import { FaChevronLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import Navbar from "../../header/Navbar";
import { Outlet } from "react-router-dom";
const AdminDashboard = () => {
  //const { user: { email } } = useSelector((state) => state.auth);
  //const { data } = useFind_by_isitAdminQuery(email, { refetchOnMountOrArgChange: true });
  const AdminAccessRouter = [
    { name: "Admin Dashboard", path: "/dashboard/setting/dash_board" },
    { name: "All Employeer", path: "/dashboard/setting/all_employeer_user" },
    { name: "All Candidate", path: "/dashboard/setting/All_Candidate" },
    { name: "NON ORG", path: "/dashboard/setting/all_Non_Org_data" },
    { name: "Content JOB", path: "/dashboard/setting/all_content_jobdata" },
    { name: "ORG JOB", path: "/dashboard/setting/all_Org_data" },
    { name: "Device Details", path: "/dashboard/setting/all_device_info" },
    { name: "Complain Box", path: "/contract" },
    { name: "Complain List", path: "/dashboard/setting/complain_list" },
    { name: "Translation", path: "/dashboard/translation" },
    { name: "AI CHAT", path: "/dashboard/chatbot" },
    { name: "Application", path: "/dashboard/image-generator" },
  ];
  return (
    <>
      <Navbar />
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          {/* Page content here */}
          <Outlet />
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"></label>
          <ul className="menu p-4 w-72 h-full  text-xl text-base-content bg-center bg-no-repeat bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/conference.jpg')] bg-sky-700 bg-blend-multiply">
            {/* Sidebar content here */}
            <div className="flex justify-between items-center text-white my-1">
              <Link to="/" className="flex items-center">
                <FaChevronLeft />
                <h1>Back</h1>
              </Link>
              <h1 className="text-xl">Admin Panel</h1>
            </div>
            <li className="m-1">
              <Link className="btn btn-outline btn-sm text-white" to="">
                Dashboard
              </Link>
            </li>
            <li className="m-1">
              <Link className="btn btn-outline btn-sm text-white" to="">
                Dashboard
              </Link>
            </li>
            <li className="m-1">
              <Link className="btn btn-outline btn-sm text-white" to="">
                Dashboard
              </Link>
            </li>
            <li className="m-1">
              <Link className="btn btn-outline btn-sm text-white" to="">
                Dashboard
              </Link>
            </li>
            <li className="m-1">
              <Link className="btn btn-outline btn-sm text-white" to="">
                Dashboard
              </Link>
            </li>
            <li className="m-1">
              <Link className="btn btn-outline btn-sm text-white" to="">
                Dashboard
              </Link>
            </li>
            {AdminAccessRouter?.map((v, index) => (
              <li className="m-1" key={index}>
                <Link className="btn btn-outline btn-sm text-white" to={v.path}>
                  {v.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
