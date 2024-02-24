import React, { useEffect } from "react";
import items from "./../../utils/TrandingCarasol.json";
import ProductCarasal from "../reusable/ProductCarasal";
import toast from "react-hot-toast";

const TrandingCarosel = () => {
  useEffect(() => {
    fetch("http://localhost:3013/api/v1/all_product", {
      method: "GET",
      headers: {
        authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 401) {
          toast.success("Login First Then Access Then See The Product");
        }
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div className="hero  ">
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-6xl font-bold text-black">NEW ARRIVALS</h1>
            <p className="mb-5 text-xl  text-black">
              Futuring the Air Force 1 Pro Tech{" "}
            </p>
            <button className="  btn btn-outline  btn-md rounded-xl bg-black  text-white">
              SHOW
            </button>
          </div>
        </div>
      </div>
      <br />

      <h1 className="text-5xl font-serif  sm:text-center m-3">
        Tranding Product
      </h1>
      <ProductCarasal items={items} />
    </>
  );
};

export default TrandingCarosel;
