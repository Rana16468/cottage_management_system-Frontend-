import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import ErrorPage from "../error/ErrorPage";
import { Spin } from "antd";
import CategoricalProduct from "../../utils/CategoricalProduct";

const AllProductCategorie = () => {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const pages = Math.ceil(75 / size);
  const [search, setSearch] = useState("");

  const url = `http://localhost:3013/api/v1/all_product?page=${page}&limit=${size}`;

  const {
    data: allProduct = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["allProduct", page, size],
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
    refetchInterval: 30,
  });

  return (
    <>
      {isLoading && <Spin />}
      {error && <ErrorPage />}
      <h1 className="mb-5 text-4xl font-serif text-black text-center mt-3">
        ALL Categoriacl Products
      </h1>

      <div className="grid lg:grid-cols-2 md:grid-cols-3 sm:grid-cols-1">
        <div className="flex items-center justify-center m-3">
          <select
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-l-xl bg-pink-200 h-14">
            <option disabled selected>
              Caragories
            </option>
            {CategoricalProduct?.map((v, index) => (
              <>
                <option key={index} value={v.categorieName}>
                  {v?.categorieName}
                </option>
                <option value="">All Product</option>
              </>
            ))}
          </select>
          <input
            type="search"
            id="default-search"
            onChange={(e) => setSearch(e.target.value)}
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-r-lg  focus:ring-blue-500 focus:border-blue-500 bg-blue-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Find Categorie / Srach Your product Name "
            required
          />
        </div>

        <div
          style={{
            marginLeft: "200px",
            marginBottom: "50px",
          }}>
          <p>
            Current Page : {page + 1} and Size:{size}
          </p>
          {[...Array(pages).keys()]?.map((number) => (
            <button
              className="mr-3 text-xl btn btn-outline btn-sm"
              key={number}
              onClick={() => {
                setPage(number);
              }}>
              {number + 1}
            </button>
          ))}
          <select
            className="rounded-full btn btn-outline btn-sm"
            onChange={(event) => setSize(event.target.value)}>
            <option value="10" defaultValue={10}>
              10
            </option>
            <option value="15">15</option>
            <option value="20">20</option>
            <option value="25">25</option>
          </select>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Product Categories</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full border rounded-lg overflow-hidden">
            <thead className="bg-gray-100 text-gray-800">
              <tr>
                <th className="text-left py-2 px-3 uppercase font-semibold">
                  Category
                </th>
                <th className="text-left py-2 px-3 uppercase font-semibold">
                  Product Count
                </th>
                <th className="text-left py-2 px-3 uppercase font-semibold">
                  Products
                </th>
              </tr>
            </thead>
            <tbody>
              {allProduct?.success &&
                allProduct?.data?.map((item) => (
                  <tr key={item?._id} className="border-t">
                    <td className="py-2 px-3">{item?.categorieId}</td>
                    <td className="py-2 px-3">{item?.count}</td>
                    <td className="py-2 px-3">
                      <div className="flex flex-wrap">
                        {item?.products
                          ?.filter((searchItem) => {
                            return search.toLowerCase() === ""
                              ? item
                              : item?.categorieId
                                  ?.toLowerCase()
                                  .includes(search.toLowerCase()) ||
                                  searchItem?.tittle?.toLowerCase() ===
                                    search?.toLowerCase();
                          })
                          ?.map((v) => {
                            return (
                              <div
                                key={v?.id}
                                className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 p-2">
                                <div className="border rounded-lg overflow-hidden">
                                  <img
                                    src={v?.photo}
                                    alt={v?.title}
                                    className="w-full h-32 object-cover"
                                  />
                                  <div className="p-2">
                                    <p className="text-sm font-semibold">
                                      {v?.tittle}
                                      <Link
                                        to={`/buyer_dashboard/${item?._id}/${v?.id}`}>
                                        <h5 className="text-sm font-semibold btn btn-xs flex justify-end btn-outline bg-blue-200">
                                          click
                                        </h5>
                                      </Link>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        {/* {item?.products?.map((v) => (
                          <div
                            key={v?.id}
                            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 p-2">
                            <div className="border rounded-lg overflow-hidden">
                              <img
                                src={v?.photo}
                                alt={v?.title}
                                className="w-full h-32 object-cover"
                              />
                              <div className="p-2">
                                <p className="text-sm font-semibold">
                                  {v?.tittle}
                                  <Link
                                    to={`/buyer_dashboard/${item?._id}/${v?.id}`}>
                                    <h5 className="text-sm font-semibold btn btn-xs flex justify-end btn-outline bg-blue-200">
                                      click
                                    </h5>
                                  </Link>
                                </p>
                              </div>
                            </div>
                          </div>
                        ))} */}
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AllProductCategorie;
