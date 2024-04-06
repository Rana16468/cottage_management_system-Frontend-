import React, { useContext, useState } from "react";
import MenuDashbord from "../BuyerDashboard/MenuDashbord";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const AllProducts = () => {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const pages = Math.ceil(75 / size);

  const url = `http://localhost:3013/api/v1/all_product?page=${page}&limit=${size}`;
  const { user } = useContext(AuthContext);

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
          return data.data; // Return the reviews array
        } else {
          toast.error("Data structure from API is invalid");
        }
      } catch (error) {
        toast.error(`Failed to fetch reviews: ${error.message}`);
      }
    },
  });

  return (
    <>
      <div className="flex">
        <MenuDashbord />
        <div className="w-full px-4 py-2 md:w-full  lg:w-full ">
          <br />

          {isLoading && <h1>loading</h1>}
          {error && <h1>error</h1>}
          <h1 className="mb-5 text-6xl font-serif text-black text-center">
            ALL Categoriacl Products
          </h1>

          <div className="flex justify-end">
            <div>
              <p>
                Current Page : {page + 1} and Size:{size}
              </p>
              {[...Array(pages).keys()].map((number) => (
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

          {allProduct?.map((item, index) => (
            <div key={index}>
              <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-2 sm:grid-cols-1 m-3">
                {item?.products?.map((v, index) => {
                  return (
                    <div
                      key={index}
                      className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                      {item?.email === user?.email &&
                        user?.photoURL === "seller" && (
                          <>
                            <Link
                              to={`/buyer_dashboard/${item?.categorieId}/${v?.id}`}>
                              <img
                                className="w-full h-72 object-cover rounded"
                                src={v?.photo}
                                alt={v?.tittle}
                              />
                            </Link>
                            <div className="p-5">
                              <Link
                                to={`/buyer_dashboard/${item?.categorieId}/${v?.id}`}>
                                <h5 className="text-center mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                  {v?.tittle}
                                </h5>
                              </Link>
                              <Link
                                to={`/buyer_dashboard/${item?.categorieId}/${v?.id}`}>
                                <h5 className="text-center mb-2 text-xl font-serif tracking-tight text-gray-900 dark:text-white">
                                  Categorie :{item?._id}
                                </h5>
                              </Link>
                            </div>
                          </>
                        )}

                      {user?.photoURL === "buyer" && (
                        <>
                          <Link
                            to={`/buyer_dashboard/${item?.categorieId}/${v?.id}`}>
                            <img
                              className="w-full h-72 object-cover rounded"
                              src={v?.photo}
                              alt={v?.tittle}
                            />
                          </Link>
                          <div className="p-5">
                            <Link
                              to={`/buyer_dashboard/${item?.categorieId}/${v?.id}`}>
                              <h5 className="text-center mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                {v?.tittle}
                              </h5>
                            </Link>
                            <Link
                              to={`/buyer_dashboard/${item?.categorieId}/${v?.id}`}>
                              <h5 className="text-center mb-2 text-xl font-serif tracking-tight text-gray-900 dark:text-white">
                                Categorie :{item?._id}
                              </h5>
                            </Link>
                          </div>
                        </>
                      )}
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
