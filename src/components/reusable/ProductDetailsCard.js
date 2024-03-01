import React, { useEffect, useState } from "react";
import Advertisment from "../../utils/Adv.json";
import "./style.css";
const ProductDetailsCard = ({ productDetails }) => {
  const images = [
    "https://i.ibb.co/5LS0nGL/cer1.png",
    "https://i.ibb.co/grKryTr/emp.png",
    "https://i.ibb.co/HhfC3M9/gpt.png",
    "https://i.ibb.co/5LS0nGL/cer1.png",
    "https://i.ibb.co/grKryTr/emp.png",
    "https://i.ibb.co/HhfC3M9/gpt.png",
    "https://t.ly/bwHV7",

    // Add more image URLs here
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [currentIndex, images.length]);

  return (
    <>
      <div className="w-full px-4 py-2  lg:w-full">
        <div className="w-full px-4 py-2  lg:w-full">
          {productDetails?.success &&
            productDetails?.data?.map((item) => (
              <>
                <div className="carousel">
                  <div className="carousel-inner">
                    {Advertisment.Advertisment.map((v, index) => (
                      <div key={index + 1} className="carousel-item m-3">
                        <div className="block min-w-96 h-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-white-800 dark:border-gray-700 dark:hover:bg-gray-700">
                          <div className="flex">
                            <img
                              className="w-full  h-full"
                              src={v.advertisement.image_url}
                              alt=""
                            />

                            <div className="ml-3">
                              <p className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-black">
                                Amazing Product
                              </p>
                              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                Organization Name : Berist Ltd
                              </p>
                              <p className="text-sm text-gray-700 dark:text-gray-400">
                                Introducing the new Amazing Product - the
                                ultimate solution for all your needs!
                              </p>

                              <p className="text-sm text-gray-700 dark:text-gray-400">
                                Limited stock available. Order now to avail of
                                the discount!
                              </p>

                              <div className="flex justify-end m-2">
                                <div className="price-container">
                                  <button className="btn btn-outline btn-error btn-sm original-price">
                                    $100
                                  </button>

                                  <button className="btn btn-outline btn-success btn-sm discounted-price">
                                    $80
                                  </button>
                                </div>
                              </div>
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
              </>
            ))}

          {/*  */}
        </div>
      </div>
    </>
  );
};

export default ProductDetailsCard;
