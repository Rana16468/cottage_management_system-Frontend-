import React, { useContext } from "react";
import MenuDashbord from "../BuyerDashboard/MenuDashbord";
import { Link, useParams } from "react-router-dom";
import CategoriesName from "../../../utils/CategoriesName";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { Spin } from "antd";
import ErrorPage from "../../error/ErrorPage";
import { AuthContext } from "../../AuthProvider/AuthProvider";
const BamboChane = () => {
  const { id } = useParams();
  const { categorieName } = CategoriesName.find((v) => v.id === Number(id));
  const { user } = useContext(AuthContext);

  const url = `https://creative-crafting.vercel.app/api/v1/specific_categorical_product?categorie_name=${categorieName}`;

  const {
    data: SpecificCategorie = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["allProduct", categorieName],
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

  console.log(SpecificCategorie);

  return (
    <>
      <div className="flex">
        <MenuDashbord />
        <div className="w-full px-4 py-2 md:w-full  lg:w-full ">
          {isLoading && <Spin />}
          {error && <ErrorPage />}
          {!isLoading &&
            SpecificCategorie?.map((item, index) => (
              <div key={index}>
                <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-2 sm:grid-cols-1 m-3">
                  {item?.productList?.map((v, index) => {
                    return (
                      <div
                        key={index}
                        className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        {item?.email === user?.email &&
                          user?.photoURL === "seller" && (
                            <>
                              <Link
                                to={`/buyer_dashboard/${item?._id}/${v?.id}`}>
                                <img
                                  className="w-full h-72 object-cover rounded"
                                  src={v?.photo}
                                  alt={v?.tittle}
                                />
                              </Link>
                              <div className="p-5">
                                <Link
                                  to={`/buyer_dashboard/${item?._id}/${v?.id}`}>
                                  <h5 className="text-center mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    {v?.tittle}
                                  </h5>
                                </Link>
                                <Link
                                  to={`/buyer_dashboard/${item?._id}/${v?.id}`}>
                                  <h5 className="text-center mb-2 text-xl font-serif tracking-tight text-gray-900 dark:text-white">
                                    Product Name :{v?.tittle}
                                  </h5>
                                </Link>
                              </div>
                            </>
                          )}

                        {user?.photoURL === "buyer" && (
                          <>
                            <Link to={`/buyer_dashboard/${item?._id}/${v?.id}`}>
                              <img
                                className="w-full h-72 object-cover rounded"
                                src={v?.photo}
                                alt={v?.tittle}
                              />
                            </Link>
                            <div className="p-5">
                              <Link
                                to={`/buyer_dashboard/${item?._id}/${v?.id}`}>
                                <h5 className="text-center mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                  {v?.tittle}
                                </h5>
                              </Link>
                              <Link
                                to={`/buyer_dashboard/${item?._id}/${v?.id}`}>
                                <h5 className="text-center mb-2 text-xl font-serif tracking-tight text-gray-900 dark:text-white">
                                  Product Name :{v?.tittle}
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
        </div>
      </div>
    </>
  );
};

export default BamboChane;
