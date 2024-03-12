import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import MenuDashbord from "../BuyerDashboard/MenuDashbord";
import AllProductList from "../../reusable/AllProductList";

const MySubCategorie = () => {
  const { categorieId, productId } = useParams();

  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const pages = Math.ceil(75 / size);
  const url = `http://localhost:3013/api/v1/get_specificProduct_categories?categorieId=${categorieId}&productId=${productId}`;

  const {
    data: SubCategoricalProduct = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ["SubCategoricalProduct", categorieId, productId],
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

  return (
    <>
      <div className="flex">
        <MenuDashbord />
        <AllProductList
          isLoading={isLoading}
          error={error}
          categoricalProduct={SubCategoricalProduct}
        />
      </div>
      <div className="flex justify-end">
        <div
          style={{
            marginLeft: "200px",
            marginBottom: "50px",
          }}>
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
    </>
  );
};

export default MySubCategorie;
