import { useContext, useState } from "react";
import ErrorPage from "../error/ErrorPage";
import "./style.css";
import { GrDocumentUpdate } from "react-icons/gr";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import UpdateSubCategorie from "../CottageModal/UpdateSubCategorie";
import { RiDeleteBinLine } from "react-icons/ri";
import { TbListDetails } from "react-icons/tb";
import { GiEternalLove } from "react-icons/gi";
import { GoCodeReview } from "react-icons/go";
import { MdOutlineShoppingCart } from "react-icons/md";
import { BiDetail } from "react-icons/bi";
import { AddToCard } from "./AddToCard";
import ReviewModal from "../CottageModal/ReviewModal";
import { Spin } from "antd";
import { AddToWishList } from "./AddToWishList";
const AllProductList = ({ isLoading, error, categoricalProduct }) => {
  const { user } = useContext(AuthContext);
  const [specificSubCategorie, setSpecificSubCategorie] = useState({});
  const [subcategorieId, setSubCategorieId] = useState("");

  return (
    <>
      <div className="w-full px-4 py-2  lg:w-full">
        <div className="grid lg:grid-cols-3 md:grid-cols-3  gap-2 sm:grid-cols-1">
          {isLoading && <Spin />}

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
                <div className="flex justify-around">
                  {user?.photoURL === "seller" ? (
                    <>
                      <Link to={`/add_to_details/${v?.productId}/${v?._id}`}>
                        <button
                          disabled={v?.isDetails}
                          className="btn btn-outline btn-sm ">
                          Add To <TbListDetails className="text-xl" />
                        </button>
                      </Link>

                      {/* update Sub Categorical Product */}

                      <button
                        className="btn btn-outline  btn-sm"
                        onClick={() => {
                          document.getElementById("report_modal").showModal();
                          setSpecificSubCategorie(v);
                        }}>
                        <GrDocumentUpdate className="text-xl" /> Sub Categorie
                      </button>

                      <button className="btn btn-outline bg-red-400  btn-sm">
                        <RiDeleteBinLine className="text-xl" />
                      </button>
                      <UpdateSubCategorie
                        subCategorieData={specificSubCategorie}
                      />
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => AddToCard(v)}
                        className="btn btn-outline btn-sm ">
                        Add to <MdOutlineShoppingCart className="text-xl" />
                      </button>
                      <button
                        onClick={() => AddToWishList(v)}
                        className="btn btn-outline btn-sm ">
                        <GiEternalLove className="text-xl text-red-500" />
                      </button>

                      {/* review Section  */}

                      <button
                        className="btn btn-outline  btn-sm"
                        onClick={() => {
                          document.getElementById("review_modal").showModal();
                          setSubCategorieId(v?._id);
                        }}>
                        <GoCodeReview className="text-xl text-pink-500" />
                      </button>
                      <ReviewModal subcategorieId={subcategorieId} />
                    </>
                  )}
                  {/* You can open the modal using document.getElementById('ID').showModal() method */}
                  <Link
                    className="btn btn-outline  btn-sm"
                    to={`/product_details/${v?.productId}/${v?._id}`}>
                    Details <BiDetail className="text-xl" />
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
