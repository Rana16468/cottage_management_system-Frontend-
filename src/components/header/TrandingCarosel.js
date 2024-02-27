import React, { useEffect, useState } from "react";

import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const TrandingCarosel = () => {
  const [allProduct, setAllProduct] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState("");
  const navigate = useNavigate();
  // pagination
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const pages = Math.ceil(75 / size);

  useEffect(() => {
    fetch(
      `http://localhost:3013/api/v1/all_product?page=${page}&limit=${size}`,
      {
        method: "GET",
        headers: {
          authorization: localStorage.getItem("token"),
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data?.status === 401) {
          navigate("/login");
          toast.success("Login First Then Access Then See The Product");
        }
        setLoading(false);
        setError("");
        setAllProduct(data?.data);
      })
      .catch((error) => {
        setError(error);
      });
  }, [navigate, page, size]);

  return (
    <>
      <br />

      {isLoading && <h1>loading</h1>}
      {isError && <h1>error</h1>}
      <h1 className="mb-5 text-6xl font-serif text-black text-center">
        Tranding Product
      </h1>

      <div className="flex justify-end">
        {/* <div className="flex items-center justify-center">
          <select className="rounded-sm h-12">
            <option disabled selected>
              Caragories
            </option>
            <option value="Internship">Internship</option>
            <option value="Fresher">Fresher</option>
            <option value="Semi-Experiences">Semi-Experiences</option>
            <option value="Experiences">Experiences</option>
            <option value="">All Jobs</option>
          </select>
          <input
            type="search"
            id="default-search"
            className="block w-96 p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-r-lg  focus:ring-blue-500 focus:border-blue-500 bg-[#082f49] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Find Your Job / Srach Your Job Name"
            required
          />
        </div> */}
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
            <option value="10" selected>
              10
            </option>
            <option value="15">15</option>
            <option value="20">20</option>
            <option value="25">25</option>
          </select>
        </div>
      </div>

      {allProduct?.map((item, index) => (
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
