import React, { useEffect, useState } from "react";

import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const TrandingCarosel = () => {
  const [allProduct, setAllProduct] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState("");
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
        setLoading(false);
        setError("");
        setAllProduct(data?.data);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  return (
    <>
      <br />

      {isLoading && <h1>loading</h1>}
      {isError && <h1>error</h1>}
      <h1 className="mb-5 text-6xl font-serif text-black text-center">
        Tranding Product
      </h1>

      {allProduct.map((item, index) => (
        <div key={index}>
          <div className="grid lg:grid-cols-5 md:grid-cols-3 gap-2 sm:grid-cols-1 m-3">
            {item?.products?.map((v, index) => {
              return (
                <div
                  key={index}
                  className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                  <Link to={`/buyer_dashboard/${v?.id}`}>
                    <img
                      className="w-full h-72 object-cover rounded"
                      src={v?.image}
                      alt={v?.tittle}
                    />
                  </Link>
                  <div className="p-5">
                    <Link to={`/buyer_dashboard/${v?.id}`}>
                      <h5 className="text-center mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {v?.tittle}
                      </h5>
                    </Link>
                    <Link to={`/buyer_dashboard/${v?.id}`}>
                      <h5 className="text-center mb-2 text-xl font-serif tracking-tight text-gray-900 dark:text-white">
                        Categorie :{item?._id}
                      </h5>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {/* <ProductCarasal items={items} product={allProduct} /> */}
    </>
  );
};

export default TrandingCarosel;
