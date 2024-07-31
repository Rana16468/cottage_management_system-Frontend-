import { useQuery } from "@tanstack/react-query";
import React from "react";
import SellerCategorie from "./SellerCategorie";
//import MenuDashbord from "../BuyerDashboard/MenuDashbord";

const SellerCategorieApi = () => {
  const url = `http://localhost:3013/api/v1/specific_user_product`;

  const {
    data: productCategories = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["productCategories"],
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
      <SellerCategorie
        productCategories={productCategories}
        isLoading={isLoading}
        error={error}
        refetch={refetch}
      />
    </>
  );
};

export default SellerCategorieApi;
