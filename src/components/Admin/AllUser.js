import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Spin } from "antd";
import ErrorPage from "../error/ErrorPage";
import { GrStatusGood } from "react-icons/gr";

const AllUser = () => {
  const url = `https://creative-crafting.vercel.app/api/v1/admin/all_user`;
  const [search, setSearch] = useState("");

  const {
    data: AllUser = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["allProduct"],
    queryFn: async () => {
      try {
        const res = await fetch(url, {
          method: "GET",
          headers: {
            authorization: localStorage.getItem("token"),
          },
        });
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();

        if (data && data.data) {
          return data; // Return the reviews array
        } else {
          toast.error("Data structure from API is invalid");
        }
      } catch (error) {
        toast.error(`Failed to fetch reviews: ${error.message}`);
      }
    },
  });

  const handleAdminToggle = (id, role, isAdmin) => {
    if (role === "buyer") {
      toast.error("Only seller Account Holder Can be Admin");
      return;
    }
    fetch(
      `https://creative-crafting.vercel.app/api/v1/admin/admin_toggle?id=${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({ isAdmin: !isAdmin }),
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("API ERROR");
        }
        return res.json();
      })
      .then((data) => {
        toast.success(data?.message);
        refetch();
      })
      .catch((error) => {
        toast.error(error?.message);
      });
  };

  return (
    <>
      {isLoading && <Spin />}
      {error && <ErrorPage />}

      <div className="container mx-auto p-6 font-mono ">
        <div className="flex items-center justify-center text-center text-white">
          <select
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-l-md bg-blue-900 h-14">
            <option disabled={true}>User Role</option>
            <option value="">All User Role</option>
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
          </select>
          <input
            type="search"
            id="default-search"
            onChange={(e) => setSearch(e.target.value)}
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-r-lg  focus:ring-blue-500 focus:border-blue-500 bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Find  User Account Type / Srach User Email Address"
            required
          />
        </div>
      </div>
      <section className="container mx-auto p-6 font-mono">
        <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
          <div className="w-full overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                  <th className="px-4 py-3"> Image</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Admin</th>
                  <th className="px-4 py-3">Password</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Creator</th>
                </tr>
              </thead>
              <tbody>
                {AllUser?.status &&
                  AllUser?.data
                    ?.filter((item) => {
                      console.log(item);
                      return search.toLowerCase() === ""
                        ? item
                        : item?.email.includes(search) || item?.role === search;
                    })
                    ?.map((v, index) => {
                      return (
                        <tr key={index} className="text-gray-700">
                          <td className="px-4 py-3 border">
                            <div className="flex items-center text-sm">
                              <div className="relative w-16 h-16 mr-3 rounded-full md:block">
                                <img
                                  className="object-cover w-full h-full rounded-full"
                                  src={
                                    v?.photo
                                      ? v?.photo
                                      : "https://community.fabric.microsoft.com/t5/image/serverpage/image-id/813578i64726DCE0B971C89?v=v2"
                                  }
                                  alt=""
                                  loading="lazy"
                                />
                                <div
                                  className="absolute inset-0 rounded-full shadow-inner"
                                  aria-hidden="true"></div>
                              </div>
                              <div>
                                <p className="font-semibold text-black">
                                  {v?.username}
                                </p>
                                <p className="text-xs text-gray-600">
                                  {v?.role}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-ms font-semibold border">
                            {v?.username}
                          </td>
                          <td className="px-4 py-3 text-xs border">
                            <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">
                              {v?.role}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm border">
                            {v?.email}
                          </td>

                          <td className="px-4 py-3 text-xs border">
                            {v?.isAdmin ? (
                              <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">
                                Admin
                              </span>
                            ) : (
                              <span className="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-sm">
                                {v?.role}
                              </span>
                            )}
                          </td>

                          <td className="px-4 py-3 text-ms font-semibold border">
                            {v?.password ? (
                              <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">
                                Is Exist / Validate
                              </span>
                            ) : (
                              <span className="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-sm">
                                In Validate/Not Exist
                              </span>
                            )}
                          </td>

                          <td className="px-4 py-3 text-ms font-semibold border">
                            <button
                              onClick={() =>
                                handleAdminToggle(v?._id, v?.role, v?.isAdmin)
                              }
                              className={`${
                                v?.isAdmin ? "bg-green-500" : "bg-red-500"
                              } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}>
                              {v?.isAdmin ? (
                                <GrStatusGood className="text-xl text-green-700" />
                              ) : (
                                <GrStatusGood />
                              )}
                            </button>
                          </td>
                          <td className="px-4 py-3 text-ms font-semibold border">
                            {v?.date}
                          </td>
                          <td className="px-4 py-3 text-ms font-semibold border">
                            {v?.creator}
                          </td>
                        </tr>
                      );
                    })}
                {/* {AllUser?.status &&
                  AllUser?.data?.map((v, index) => (
                    <tr key={index} className="text-gray-700">
                      <td className="px-4 py-3 border">
                        <div className="flex items-center text-sm">
                          <div className="relative w-16 h-16 mr-3 rounded-full md:block">
                            <img
                              className="object-cover w-full h-full rounded-full"
                              src={
                                v?.photo
                                  ? v?.photo
                                  : "https://community.fabric.microsoft.com/t5/image/serverpage/image-id/813578i64726DCE0B971C89?v=v2"
                              }
                              alt=""
                              loading="lazy"
                            />
                            <div
                              className="absolute inset-0 rounded-full shadow-inner"
                              aria-hidden="true"></div>
                          </div>
                          <div>
                            <p className="font-semibold text-black">
                              {v?.username}
                            </p>
                            <p className="text-xs text-gray-600">{v?.role}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-ms font-semibold border">
                        {v?.username}
                      </td>
                      <td className="px-4 py-3 text-xs border">
                        <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">
                          {v?.role}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm border">{v?.email}</td>

                      <td className="px-4 py-3 text-xs border">
                        {v?.isAdmin ? (
                          <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">
                            Admin
                          </span>
                        ) : (
                          <span className="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-sm">
                            {v?.role}
                          </span>
                        )}
                      </td>

                      <td className="px-4 py-3 text-ms font-semibold border">
                        {v?.password ? (
                          <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">
                            Is Exist / Validate
                          </span>
                        ) : (
                          <span className="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-sm">
                            In Validate/Not Exist
                          </span>
                        )}
                      </td>

                      <td className="px-4 py-3 text-ms font-semibold border">
                        <button
                          onClick={() =>
                            handleAdminToggle(v?._id, v?.role, v?.isAdmin)
                          }
                          className={`${
                            v?.isAdmin ? "bg-green-500" : "bg-red-500"
                          } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}>
                          {v?.isAdmin ? (
                            <GrStatusGood className="text-xl text-green-700" />
                          ) : (
                            <GrStatusGood />
                          )}
                        </button>
                      </td>
                      <td className="px-4 py-3 text-ms font-semibold border">
                        {v?.date}
                      </td>
                      <td className="px-4 py-3 text-ms font-semibold border">
                        {v?.creator}
                      </td>
                    </tr>
                  ))} */}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
};

export default AllUser;
