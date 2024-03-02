import MenuDashbord from "./MenuDashbord";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ProductDetailsCard from "../../reusable/ProductDetailsCard";
import ErrorPage from "../../error/ErrorPage";

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

  return (
    <>
      {isLoading && (
        <div className="flex justify-center items-center">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      )}
      {error && <ErrorPage />}

      <div className="flex">
        <MenuDashbord />

        {productDetails?.data?.length ? (
          <ProductDetailsCard productDetails={productDetails} />
        ) : (
          <p className="text-4xl font-serif text-center">
            Product Details is Not Exist
          </p>
        )}
      </div>
    </>
  );
};

export default ProductDetails;
