import { useQuery } from "@tanstack/react-query";
import React from "react";
import SellerCategorie from "../page/Categories/SellerCategorie";

const AllUserProductZone = () => {
  const url = `https://creative-crafting.vercel.app/api/v1/specific_user_product`;

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

export default AllUserProductZone;
