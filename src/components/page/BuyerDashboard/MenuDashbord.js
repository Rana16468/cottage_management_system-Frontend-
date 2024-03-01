import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import menuItems from "../../../utils/AppData";
const MenuDashbord = () => {
  const [allCatagories, setAllCatagories] = useState([]);

  useEffect(() => {
    fetch("https://api.escuelajs.co/api/v1/categories")
      .then((res) => res.json())
      .then((data) => {
        setAllCatagories(data);
      })
      .catch((error) => {
        console.log(error?.message);
      });
  }, []);
  return (
    <>
      <div className=" lg:px-4 lg:py-2  bg-indigo-600 lg:w-1/4 sm:w-full">
        <div className="hidden lg:block">
          <div className="my-2 mb-6">
            <h1 className="text-2xl font-serif text-white">
              Product Dashboard
            </h1>
          </div>
          <ul>
            <li className="mb-6">
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                  <button type="submit" className="p-1 focus:outline-none">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      className="w-4 h-4">
                      <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                  </button>
                </span>
                <input
                  type="search"
                  name="search"
                  className="w-full px-4 py-2 pl-12 rounded shadow outline-none"
                  placeholder="Search..."
                />
              </div>
            </li>
            <li className="mb-2 rounded hover:shadow hover:bg-gray-800">
              <Link
                to="/"
                className="inline-block w-full h-full px-3 py-2 font-bold text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="inline-block w-6 h-6 mr-2 -mt-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                Home
              </Link>
            </li>
            <li className="mb-2 bg-gray-800 rounded shadow">
              <Link className="inline-block w-full h-full px-3 py-2 font-bold text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="inline-block w-6 h-6 mr-2 -mt-2"
                  viewBox="0 0 20 20"
                  fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                    clipRule="evenodd"
                  />
                </svg>
                Blogs
              </Link>
            </li>
            <li className="mb-2 rounded hover:shadow hover:bg-gray-800">
              <Link
                href=" "
                className="inline-block w-full h-full px-3 py-2 font-bold text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="inline-block w-6 h-6 mr-2 -mt-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Reports
              </Link>
            </li>
            <li className="mb-2 rounded hover:shadow hover:bg-gray-800">
              <Link className="inline-block w-full h-full px-3 py-2 font-bold text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="inline-block w-6 h-6 mr-2 -mt-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Inbox
              </Link>
            </li>

            {/* add To product List */}

            {/* product Catagories List  */}

            <li>
              <details open>
                <summary className="mb-2 text-white  font-serif rounded hover:shadow hover:bg-gray-800">
                  Catagories
                </summary>
                <ul>
                  {allCatagories?.map((v, index) => (
                    <li
                      key={index}
                      className="mb-2 rounded hover:shadow hover:bg-gray-800">
                      <Link
                        to={`/trandint_product/${index + 1}`}
                        className="inline-block w-full h-full px-3 py-2 font-bold text-white">
                        {v?.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </details>
            </li>

            <li>
              {menuItems?.map((v, index) => (
                <details key={index} open>
                  <summary className="mb-2 text-white  font-serif rounded hover:shadow hover:bg-gray-800">
                    {" "}
                    {v.title}
                  </summary>
                  <ul>
                    {v?.subItems?.map((v, index) => (
                      <li key={index}>
                        <details open>
                          <summary className="mb-2 rounded bg-slate-50 hover:shadow hover:bg-white">
                            {v?.catagoties}
                          </summary>
                          <hr />
                          <ul>
                            {v?.items?.map((v, index) => (
                              <li
                                className="mb-2 rounded hover:shadow hover:bg-gray-800"
                                key={index}>
                                <Link className="inline-block w-full h-full px-3 py-2 font-bold text-white">
                                  {v}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </details>
                      </li>
                    ))}
                  </ul>
                </details>
              ))}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default MenuDashbord;
