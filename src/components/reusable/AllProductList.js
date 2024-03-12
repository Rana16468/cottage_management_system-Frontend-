import { useContext } from "react";
import ErrorPage from "../error/ErrorPage";
import "./style.css";

import { Link } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
const AllProductList = ({ isLoading, error, categoricalProduct }) => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <div className="w-full px-4 py-2  lg:w-full">
        <div className="grid lg:grid-cols-3 md:grid-cols-3  gap-2 sm:grid-cols-1">
          {isLoading && (
            <div className="flex justify-center items-center">
              <span className="loading loading-bars loading-lg"></span>
            </div>
          )}

          {/* second card  */}
          {error && <ErrorPage />}

          {categoricalProduct?.success &&
            categoricalProduct?.data?.map((v, index) => (
              <div
                key={index}
                className="max-w-full rounded overflow-hidden shadow-lg">
                <img className="w-full h-96" src={v?.photo} alt="" />
                <div className="px-6 py-4">
                  <div className="font-bold text-xl font-serif mb-2">
                    {v?.name}
                  </div>
                  <p className="text-gray-700 text-base font-serif">
                    {v?.description?.slice(0, 60) + "...."}
                  </p>
                  {v?.salesOf <= 0 ? (
                    <p className="inline-block mt-1 bg-gray-200 rounded-full px-2 py-1 text-sm font-semibold text-gray-700">
                      #Price:
                      {v?.price}
                    </p>
                  ) : (
                    <p className="inline-block mt-1 bg-gray-200 rounded-full px-2 py-1 text-sm font-semibold text-gray-700 original-price">
                      #Price:
                      {v?.price}
                    </p>
                  )}

                  <p className="inline-block m-2 bg-gray-200 rounded-full px-2 py-1 text-sm font-semibold text-gray-700">
                    #Sales Of: {v?.salesOf} %
                  </p>
                  {v?.salesOf >= 1 ? (
                    <p className="inline-block m-2 bg-gray-200 rounded-full px-2 py-1 text-sm font-semibold text-gray-700 discounted-price">
                      #Selling Price :{v?.sellingPrice}
                    </p>
                  ) : (
                    <p className="inline-block m-2 bg-gray-200 rounded-full px-2 py-1 text-sm font-semibold text-gray-700">
                      #Selling Price: {v?.price}
                    </p>
                  )}
                </div>
                <div className="px-3 py-2">
                  <span className="inline-block m-2 bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                    #Available Now: {v?.quentity}
                  </span>
                  <span className="inline-block m-2 bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                    #Brand:
                    <span className="text-sm font-serif">{v?.brandName}</span>
                  </span>
                </div>
                <div className="flex justify-between ">
                  {user?.photoURL === "seller" ? (
                    <>
                      <Link
                        to={`/add_to_details/${v?.productId}/${v?._id}`}
                        className="btn btn-outline btn-sm ">
                        Add To Details
                      </Link>
                    </>
                  ) : (
                    <>
                      <button className="btn btn-outline btn-sm ">
                        Add to Cart
                      </button>
                    </>
                  )}
                  {/* You can open the modal using document.getElementById('ID').showModal() method */}
                  <Link
                    className="btn btn-outline  btn-sm"
                    to={`/product_details/${v?.productId}/${v?._id}`}>
                    Details
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default AllProductList;
