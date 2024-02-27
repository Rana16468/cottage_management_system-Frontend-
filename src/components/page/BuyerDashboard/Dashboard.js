import React from "react";
import { useParams } from "react-router-dom";
import MenuDashbord from "./MenuDashbord";
import { useQuery } from "@tanstack/react-query";

const Dashboard = () => {
  const { categorieId, id } = useParams();

  const url = `http://localhost:3013/api/v1/get_specificProduct_categories?categorieId=${categorieId}&productId=${id}`;

  const {
    data: categoricalProduct = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ["bookingList", categorieId, id],
    queryFn: async () => {
      const res = await fetch(url, {
        method: "GET",
        headers: {
          authorization: localStorage.getItem("token"),
        },
      });
      const data = await res.json();
      return data;
    },
  });
  console.log(categoricalProduct);
  console.log(isLoading);
  console.log(error);

  return (
    <>
      <div className="flex">
        <MenuDashbord />
        {/* bg-gray-200 */}
        <div className="w-full px-4 py-2  lg:w-full">
          <h1>{categorieId}</h1>
          <h1>{id}</h1>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
