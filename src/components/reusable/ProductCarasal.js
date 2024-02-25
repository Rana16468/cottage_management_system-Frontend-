import React, { useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { Link } from "react-router-dom";
const ProductCarasal = ({ items, product }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((currentIndex + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrentIndex((currentIndex - 1 + items.length) % items.length);
  };

  return (
    <>
      <div className="relative m-3">
        <div className="flex items-center justify-center">
          <div className="grid lg:grid-cols-5 md:grid-cols-3 gap-2 sm:grid-cols-1">
            {product.map((v, index) => {
              return (
                <div key={index}>
                  {v?.products?.map((v, index) => {
                    return (
                      <div
                        key={index}
                        className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <Link to={`/product/${product.id}`}>
                          <img
                            className="w-full h-72 object-cover rounded"
                            src={v?.image}
                            alt={v?.title}
                          />
                        </Link>
                        <div className="p-5">
                          <Link to={`/product/${product.id}`}>
                            <h5 className="text-center mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                              {v?.title}
                            </h5>
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
        <div className="absolute top-1/2 transform -translate-y-1/2 left-4 cursor-pointer">
          <button
            onClick={prevSlide}
            className="bg-gray-800 text-white rounded-full w-10 h-10 flex items-center justify-center">
            <AiOutlineArrowLeft className="text-xl" />
          </button>
        </div>
        <div className="absolute top-1/2 transform -translate-y-1/2 right-4 cursor-pointer">
          <button
            onClick={nextSlide}
            className="bg-gray-800 text-white rounded-full w-10 h-10 flex items-center justify-center">
            <AiOutlineArrowRight className="text-xl" />
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductCarasal;
