import React, { useContext, useEffect, useState } from "react";
import { BiSend } from "react-icons/bi";
import "./style.css";
import { AuthContext } from "../AuthProvider/AuthProvider";
import UpdateProductDetails from "./UpdateProductDetails";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
//import { useParams } from "react-router-dom";
const ProductDetailsCard = ({ productDetails, refetch }) => {
  //const { productId, SubcategorieId } = useParams();

  const { user } = useContext(AuthContext);
  const [messagetext, setMessage] = useState([]);
  const [DetailsId, setDetailsId] = useState("");
  const { SubcategorieId } = useParams();
  const { _id } = productDetails?.data?.find(
    (v) => v.SubcategorieId === SubcategorieId
  );

  const handelTextMessages = (event) => {
    event.preventDefault();
    const element = event.target;
    const message = element.textMessage.value;
    const sendMessage = {
      DetailsId,
      message,
    };

    // start fateching
    fetch("http://localhost:3013/api/v1/message", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify(sendMessage),
    })
      .then((res) => {
        if (!res.ok) {
          throw Error("API ERROR");
        }
        return res.json();
      })
      .then((data) => {
        toast.success(data?.message);
        refetch();
      })
      .catch((error) => {
        toast.error(error?.message);
      });

    setMessage([...messagetext, message]);
    // const send_message = {
    //   textMessage,
    //   productId,
    //   SubcategorieId,
    // };
    // console.log(send_message);
    element.reset();
  };
  // my message display with my text area start the codeing

  console.log(messagetext);

  useEffect(() => {
    fetch(`http://localhost:3013/api/v1/display_chatting_message/${_id}`, {
      method: "GET",
      headers: {
        authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw Error("API ERROR");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        refetch();
      })
      .catch((error) => {
        toast.error(error?.message);
      });
  }, [_id, refetch]);

  return (
    <>
      <div className="w-full px-4 py-2  lg:w-full">
        {productDetails?.success &&
          productDetails?.data?.map((item, index) => (
            <div key={index}>
              <div className="carousel">
                <div className="carousel-inner">
                  {item?.imageList?.map((v, index) => (
                    <div key={index + 1} className="carousel-item m-3">
                      <div className="block min-w-96 h-auto p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-white-800 dark:border-gray-700 dark:hover:bg-gray-700">
                        <div className="flex">
                          <img className="w-96  h-full" src={v} alt="" />

                          <div className="ml-3">
                            {item?.categorie?.map((v, index) => (
                              <div key={index}>
                                <p className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-black">
                                  Amazing Product
                                </p>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                  Product Name : {v?.name}
                                </p>

                                <p className="text-sm text-gray-700 dark:text-gray-400">
                                  {v?.description} ipsum dolor sit amet,
                                  consectetur adipisicing elit. Voluptatibus
                                  quia, nulla! Maiores et perferendis eaque,
                                  exercitationem praesentium nihil.
                                </p>

                                <div className="px-6 pt-4 pb-2">
                                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                                    #Brand Name :{v?.brandName}
                                  </span>
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

                                <p className="inline-block m-2 bg-gray-200 font-serif rounded-full px-2 py-1 text-sm font-semibold text-gray-700">
                                  #Company Name: Air Index
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {item?.categorie?.map((v, index) => (
                <div key={index} className="flex justify-center items-center">
                  <div className="max-w-full rounded overflow-hidden shadow-lg">
                    <img
                      className="w-full h-96"
                      src={v?.photo}
                      alt="Sunset in the mountains"
                    />

                    <div className="px-6 py-4">
                      <div className="font-bold text-xl mb-2">{v?.name}</div>
                      <p className="text-gray-700 text-base">
                        {v?.description} ipsum dolor sit amet, consectetur
                        adipisicing elit. Voluptatibus quia, nulla! Maiores et
                        perferendis eaque, exercitationem praesentium nihil.
                      </p>
                    </div>
                    <div className="px-6 pt-4 pb-2">
                      <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                        #Brand Name :{v?.brandName}
                      </span>
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
                      <div className="flex justify-end">
                        {user?.photoURL === "buyer" && (
                          <button className="btn btn-outline btn-sm ">
                            Add to Cart
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* chatbot */}

              {user?.photoURL === "buyer" && (
                <div className=" m-3 flex justify-center">
                  <div
                    style={{ width: "950px" }}
                    className="card  bg-base-100 shadow-xl">
                    <div className="card-body">
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text text-xl">
                            Buyer/Seller Reaply Message
                          </span>
                        </label>
                        <div
                          name="message"
                          className="textarea textarea-success">
                          {messagetext?.map((v, index) => (
                            <div key={index} className="chat chat-end">
                              <div className="chat-image avatar">
                                <div className="w-10 rounded-full">
                                  <img
                                    src="https://blinkit.com/careers/sites/default/files/2021-12/local-desktop-masthead.png"
                                    alt=""
                                  />
                                </div>
                              </div>
                              <div className="chat-header">
                                Buyer Message
                                <time className="text-xs opacity-50 m-2">
                                  {new Date().toString().slice(16, 23)}
                                </time>
                              </div>
                              <div className="chat-bubble text-white text-xl">
                                {v}
                              </div>
                              <div className="chat-footer opacity-50">
                                <p className="text-sm text-black">
                                  {new Date().toString().slice(0, 23)}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="chat chat-start m-2">
                      <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                          <img
                            src="https://previews.123rf.com/images/lexaarts/lexaarts1311/lexaarts131100148/24091315-happy-buyer-3d-human-and-shopping-cart.jpg"
                            alt=""
                          />
                        </div>
                      </div>
                      <div className="chat-header">
                        Buyer Message Box -
                        <time className="text-xs opacity-50">
                          {new Date().toString().slice(0, 18)}
                        </time>
                      </div>
                      <form
                        onSubmit={handelTextMessages}
                        className="chat-bubble w-full">
                        <div className="flex justify-between">
                          <input
                            type="text"
                            name="textMessage"
                            placeholder="Type here"
                            className="input input-bordered input-info w-full max-w-4xl text-black text-xl mr-3"
                          />
                          <button
                            onClick={() => setDetailsId(item?._id)}
                            className="btn btn-primary text-2xl">
                            <BiSend className="text-xl"></BiSend>
                          </button>
                        </div>
                      </form>
                      <div className="chat-footer opacity-50">Delivered</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

        {/* table  */}
        {user?.photoURL === "seller" && (
          <>
            <h1 className=" text-3xl font-serif text-center m-3">
              Product Details Table
            </h1>
            <UpdateProductDetails item={productDetails} refetch={refetch} />
          </>
        )}
      </div>
    </>
  );
};

export default ProductDetailsCard;
