import React, { useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

const ProductCarasal = ({ data }) => {
  console.log(data);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? data?.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === data?.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <>
      <div className="max-w-full mx-auto bg-white rounded overflow-hidden shadow-lg m-3">
        <div className="relative">
          <div
            className="carousel-item"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
            {data?.map((imageUrl, index) => (
              <img
                key={index}
                src={imageUrl}
                alt=""
                className="w-full h-64 object-cover"
              />
            ))}
          </div>
          <button
            onClick={handlePrev}
            className="absolute top-1/2 transform -translate-y-1/2 left-4 cursor-pointer">
            <AiOutlineArrowLeft className="text-xl" />
          </button>
          <button
            onClick={handleNext}
            className="absolute top-1/2 transform -translate-y-1/2 right-4 cursor-pointer">
            <AiOutlineArrowRight className="text-xl" />
          </button>
        </div>
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2 font-serif">
            Interior Design Name: {}
          </div>
          <p className="text-gray-700 text-base font-serif">
            {data?.data?.discription}
          </p>
          <p className="text-gray-700 text-base font-serif">
            Publishing Date {}
          </p>
        </div>
        <div className="px-6 py-4">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-serif text-gray-700 mr-2">
            #Categories {}
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-serif text-gray-700">
            #Price: {}
          </span>
          <span className="m-1 inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-serif text-gray-700">
            # SellerName: {}
          </span>
          <span className="m-1 inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-serif text-gray-700">
            {}
          </span>
        </div>
      </div>
    </>
  );
};

export default ProductCarasal;
