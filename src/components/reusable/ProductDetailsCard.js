import React, { useState } from "react";
import { BiSend } from "react-icons/bi";
import "./style.css";
//import { useParams } from "react-router-dom";
const ProductDetailsCard = ({ productDetails }) => {
  //const { productId, SubcategorieId } = useParams();
  const [message, setMessage] = useState([]);
  const handelTextMessages = (event) => {
    event.preventDefault();
    const element = event.target;
    const textMessage = element.textMessage.value;
    setMessage([...message, textMessage]);
    // const send_message = {
    //   textMessage,
    //   productId,
    //   SubcategorieId,
    // };
    // console.log(send_message);
    element.reset();
  };

  console.log(message);
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
                      src={v?.image}
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
                        <button className="btn btn-outline btn-sm ">
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}

        {/* chatbot */}

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
                <div name="message" className="textarea textarea-success">
                  {message?.map((v, index) => (
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
                      <div className="chat-bubble text-white text-xl">{v}</div>
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
                  <button className="btn btn-primary text-2xl">
                    <BiSend className="text-xl"></BiSend>
                  </button>
                </div>
              </form>
              <div className="chat-footer opacity-50">Delivered</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailsCard;
