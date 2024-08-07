import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import isUrl from "is-url";
import logo1 from "./../image/logo.jfif";

import { GiShoppingCart } from "react-icons/gi";
import { FaHeart } from "react-icons/fa";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { GrUserAdmin } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );
  const [clickButton, setClickbutton] = useState(false);

  const handelToggle = (e) => {
    if (e.target.checked) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  const handelLogOut = () => {
    logOut()
      .then(() => {
        localStorage.setItem("token", null);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");
    document.querySelector("html").setAttribute("data-theme", localTheme);
  }, [theme]);

  const logoutHandelar =
    user?.emailVerified && user?.email ? (
      <>
        <li>
          <Link
            onClick={handelLogOut}
            className="block py-2 pl-3 pr-4 hover:bg-slate-300 btn-sm rounded-lg">
            LogOut <samp> | </samp>
          </Link>
        </li>
        <li>
          <Link
            to="/my_profile"
            className="block py-2 pl-3 pr-4 hover:bg-slate-300 btn-sm rounded-lg">
            <div className="flex">
              Profile <CgProfile className="text-xl ml-3" />
            </div>
          </Link>
        </li>
      </>
    ) : (
      <>
        <li>
          <Link
            to="/login"
            className="block py-2 pl-3 pr-4 hover:bg-slate-300 btn-sm rounded-lg">
            Join Us <samp> | </samp>
          </Link>
        </li>
        <li>
          <Link
            to="/register"
            className="block py-2 pl-3 pr-4 hover:bg-slate-300 btn-sm rounded-lg">
            Sing In{" "}
          </Link>
        </li>
      </>
    );

  const buyerAccountHolder = user?.emailVerified &&
    user?.photoURL === "buyer" && (
      <>
        <li>
          <Link to="/all_produts">Products</Link>
        </li>

        <li onMouseOver={() => setClickbutton(!clickButton)}>
          <Link>Company</Link>
        </li>

        <li>
          <Link to="/complean_box">Complain</Link>
        </li>
      </>
    );
  const sellerAccountHolder = user?.emailVerified &&
    user?.photoURL === "seller" && (
      <>
        <li>
          <Link to="/all_produts">Products</Link>
        </li>
        <li>
          <Link to="/ai_image_generator">AI</Link>
        </li>

        <li onMouseOver={() => setClickbutton(!clickButton)}>
          <Link>Company</Link>
        </li>
        <li>
          <Link to="/dashboard">Admin</Link>
        </li>

        <li>
          <Link to="/complean_box">Complain</Link>
        </li>
      </>
    );

  const optionalLogin = user?.emailVerified &&
    (isUrl(user?.photoURL) || user?.photoUR === null) && (
      <>
        <li>
          <Link to="/all_produts">Products</Link>
        </li>

        <li onMouseOver={() => setClickbutton(!clickButton)}>
          <Link>Company</Link>
        </li>

        <li>
          <Link to="/complean_box">Complain</Link>
        </li>
      </>
    );

  return (
    <>
      <nav className=" bg-white justify-between hidden lg:flex ">
        <span className="text-2xl font-serif m-1">
          <span className="text-red-600">C</span>reativ
          <span className="text-green-700">E</span>{" "}
          <span className="text-green-700">C</span>raftin
          <span className="text-red-600">G</span>
        </span>
        <ul className="flex flex-row font-medium rounded-lg  ml-3 ">
          <li>
            <a
              href="..."
              className="block py-2 pl-3 pr-4 hover:bg-slate-300 btn-sm rounded-lg ">
              C C Refurbished <samp> |</samp>
            </a>
          </li>
          <li>
            <a
              href="..."
              className="block py-2 pl-3 pr-4 hover:bg-slate-300 btn-sm rounded-lg">
              Find a Store <samp> |</samp>
            </a>
          </li>
          <li>
            <a
              href="..."
              className="block py-2 pl-3 pr-4 hover:bg-slate-300 btn-sm rounded-lg">
              {" "}
              Help <samp> |</samp>
            </a>
          </li>

          {logoutHandelar}

          {/* singout and logout toggle */}
        </ul>
      </nav>

      <div className="navbar bg-blue-900 w-full text-white">
        <div className="navbar-start">
          <div className="avatar">
            <div className="w-14 ml-2 rounded-sm">
              <img src={logo1} alt="" />
            </div>
          </div>
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-black">
              <li>
                <Link to="">Home</Link>
              </li>
              {buyerAccountHolder}
              {sellerAccountHolder}
              {optionalLogin}

              <ul className="space-x-2"></ul>
            </ul>
          </div>
          <div className="w-16 ml-2 rounded-full">
            <img src="" alt="" />
          </div>
          {/* <a className="btn btn-ghost btn-sm normal-case text-xl" href='...'></a> */}
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/">Home</Link>
            </li>

            <li>
              <Link to="/industry_report">Industry Report</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/service">Service</Link>
            </li>
            <li>
              <Link to="/blog">Blog</Link>
            </li>

            {buyerAccountHolder}
            {sellerAccountHolder}
            {optionalLogin}
            <ul className="flex space-x-2"></ul>
          </ul>
        </div>
        <div className="navbar-end">
          <Link to="/wish_list" className="btn btn-outline bg-white btn-sm m-3">
            <FaHeart className="text-xl" />
          </Link>

          {user?.photoURL === "buyer" ||
          isUrl(user?.photoURL) ||
          user?.photoUR === null ? (
            <Link
              className="btn btn-outline text-white btn-sm m-3"
              to="/add_to_card">
              <GiShoppingCart className="text-xl" />
            </Link>
          ) : (
            <button className="btn btn-outline text-white btn-sm m-3">
              <GiShoppingCart className="text-xl" />
            </button>
          )}

          <label className="swap swap-rotate">
            {/* this hidden checkbox controls the state */}

            <input type="checkbox" onChange={handelToggle} />

            {/* sun icon */}
            <svg
              className="swap-on fill-current w-10 h-10"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24">
              <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>

            {/* moon icon */}
            <svg
              className="swap-off fill-current w-10 h-10"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24">
              <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
          </label>

          <label
            htmlFor="my-drawer-2"
            className="text-green-700 hover:text-blue-900 border border-blue-700 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1.5 text-center mr-2 mb-2 dark:border-blue-400 dark:text-blue-400 dark:hover:text-blue-900 dark:hover:bg-blue-900 dark:focus:ring-purple-900 lg:hidden mt-2">
            <GrUserAdmin className="text-xs text-white" />
          </label>
        </div>
      </div>

      {clickButton && (
        <div className="mt-1 border-gray-200 shadow-sm bg-gray-50 md:bg-white border-y dark:bg-gray-800 dark:border-gray-600">
          <div className="grid max-w-screen-xl px-4 py-5 mx-auto text-gray-900 dark:text-white sm:grid-cols-2 md:px-6">
            <ul>
              <li>
                <a
                  href=".."
                  className="block p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                  <div className="font-semibold">Online Stores</div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Connect with third-party tools that you're already using.
                  </span>
                </a>
              </li>
              <li>
                <a
                  href=".."
                  className="block p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                  <div className="font-semibold">Segmentation</div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Connect with third-party tools that you're already using.
                  </span>
                </a>
              </li>
              <li>
                <a
                  href=".."
                  className="block p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                  <div className="font-semibold">Marketing CRM</div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Connect with third-party tools that you're already using.
                  </span>
                </a>
              </li>
            </ul>
            <ul>
              <li>
                <a
                  href=".."
                  className="block p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                  <div className="font-semibold">Online Stores</div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Connect with third-party tools that you're already using.
                  </span>
                </a>
              </li>
              <li>
                <a
                  href=".."
                  className="block p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                  <div className="font-semibold">Segmentation</div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Connect with third-party tools that you're already using.
                  </span>
                </a>
              </li>
              <li>
                <a
                  href=".."
                  className="block p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                  <div className="font-semibold">Marketing CRM</div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Connect with third-party tools that you're already using.
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
