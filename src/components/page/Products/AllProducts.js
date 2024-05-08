import React, { useState } from "react";
import MenuDashbord from "../BuyerDashboard/MenuDashbord";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useTitle from "../../hook/useTitle";
import CategoricalProduct from "../../../utils/CategoricalProduct";

const AllProducts = () => {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const pages = Math.ceil(75 / size);
  const [search, setSearch] = useState("");

  useTitle("ALL-PRODUCT");

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

        if (data && data?.data) {
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
      <div className="flex">
        <MenuDashbord />
        <div className="w-full px-4 py-2 md:w-full  lg:w-full ">
          <br />

          {isLoading && <h1>loading</h1>}
          {error && <h1>error</h1>}

          <div className="grid lg:grid-cols-2 md:grid-cols-3 sm:grid-cols-1 ">
            <div className="flex items-center justify-center">
              <select
                onChange={(e) => setSearch(e.target.value)}
                className="rounded-r-sm bg-pink-200 h-14">
                <option disabled selected>
                  Caragories
                </option>
                {CategoricalProduct?.map((v, index) => (
                  <option key={index} value={v.categorieName}>
                    {v?.categorieName}
                  </option>
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

          {allProduct?.success &&
            allProduct?.data?.map((items, index) => (
              <div key={index}>
                <div className="grid lg:grid-cols-5 md:grid-cols-3 gap-2 sm:grid-cols-1 m-3">
                  {items?.products
                    ?.filter((item) => {
                      return search.toLowerCase() === ""
                        ? item
                        : items?.categorieId
                            ?.toLowerCase()
                            .includes(search.toLowerCase()) ||
                            item?.tittle?.toLowerCase() ===
                              search?.toLowerCase();
                    })
                    .map((v, index) => {
                      return (
                        <div
                          key={index}
                          className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                          <Link to={`/buyer_dashboard/${items?._id}/${v?.id}`}>
                            <img
                              className="w-full h-72 object-cover rounded"
                              src={v?.photo}
                              alt={v?.tittle}
                            />
                          </Link>
                          <div className="p-5">
                            <Link
                              to={`/buyer_dashboard/${items?._id}/${v?.id}`}>
                              <h5 className="text-center mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                {v?.tittle}
                              </h5>
                            </Link>
                            <Link
                              to={`/buyer_dashboard/${items?._id}/${v?.id}`}>
                              <h5 className="text-center mb-2 text-xl font-serif tracking-tight text-gray-900 dark:text-white">
                                Categorie :{items?.categorieId}
                              </h5>
                            </Link>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            ))}

          {/* <ProductCarasal items={items} product={allProduct} /> */}
        </div>
      </div>
    </>
  );
};

export default AllProducts;
