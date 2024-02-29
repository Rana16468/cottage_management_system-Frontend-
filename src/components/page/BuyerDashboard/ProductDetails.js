import React from "react";
import MenuDashbord from "./MenuDashbord";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ProductDetailsCard from "../../reusable/ProductDetailsCard";

const ProductDetails = () => {
  const { productId, SubcategorieId } = useParams();

  const url = `http://localhost:3013/api/v1/specific_product_details?productId=${productId}&SubcategorieId=${SubcategorieId}`;

  const {
    data: productDetails = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["productDetails", productId, SubcategorieId],
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

  console.log(productDetails);
  console.log(isLoading);
  console.log(error);
  return (
    <>
      <div className="flex">
        <MenuDashbord />
        {/* bg-gray-200 */}
        <ProductDetailsCard
          productDetails={productDetails}
          isLoading={isLoading}
          error={error}
        />
      </div>
    </>
  );
};

export default ProductDetails;
