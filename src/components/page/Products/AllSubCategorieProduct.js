import React from "react";
import MenuDashbord from "../BuyerDashboard/MenuDashbord";
import { useParams } from "react-router-dom";
import { allPotterySubCategorie } from "../../../utils/AllSubCategorieName";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import AllProductList from "../../reusable/AllProductList";

const AllSubCategorieProduct = () => {
  const { sub, id } = useParams();
  const { subCategorieName, subCategorie } = allPotterySubCategorie.find(
    (v) => v.id === Number(sub)
  );

  if (subCategorie[id] === undefined && subCategorieName) {
    toast.success("This Caregorical Data is Not Exist");
  }

  const url = `http://localhost:3013/api/v1/buyer_specific_subcategore?subCategorieName=${subCategorieName}&subDetails=${subCategorie[id]}`;
  const {
    data: allSubCateforie = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["allSubCateforie", subCategorie],
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
  });

  return (
    <>
      <div className="flex">
        <MenuDashbord />
        <div className="w-full px-4 py-2 md:w-full  lg:w-full ">
          <AllProductList
            isLoading={isLoading}
            error={error}
            categoricalProduct={allSubCateforie}
          />
        </div>
      </div>
    </>
  );
};

export default AllSubCategorieProduct;
