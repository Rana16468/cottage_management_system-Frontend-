import React, { useEffect, useState } from "react";

import TrandingCarosel from "./TrandingCarosel";
import { FcPrevious } from "react-icons/fc";
import { FcNext } from "react-icons/fc";
const ADVTime = () => {
  const advertisements = [
    {
      title: "New Styles Added: 20% Off Select Styles",
      link: "Sign in and use code MEMBER20 at checkout.",
    },
    {
      title: "Why Wait? Try Store Pickup",
      link: "Buy online and find a store near you for pick up in less than 2 hours. Shop now.",
    },
    {
      title: "New Arrivals",
      link: "Shop All",
    },
    {
      title: "Members: Free Shipping on Orders $50+",
      link: "Join Now",
    },
  ];
  const [currentAdvertisement, setCurrentAdvertisement] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAdvertisement((prev) => (prev + 1) % advertisements.length);
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [advertisements.length]);

  const images = [
    "https://pbs.twimg.com/media/FZElJbAacAEooz9.jpg",
    "https://greener-business.com/wp-content/uploads/2023/04/What-Is-Cottage-Industry-1024x585.jpg",
    "https://greener-business.com/wp-content/uploads/2023/04/Cottage-Industry-Examples-1024x585.jpg",
    "https://assets.website-files.com/61554cf1696635e97e823d26/61c5fa8ed8e88c9649430a65_IMG_6793.PNG",
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Automatically change image every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((index) => (index + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  const goToPrevious = () => {
    setCurrentImageIndex((index) =>
      index === 0 ? images.length - 1 : index - 1
    );
  };

  const goToNext = () => {
    setCurrentImageIndex((index) => (index + 1) % images.length);
  };

  return (
    <>
      {/* Carousel */}
      <div className="bg-gray-100 p-4">
        <div className="relative overflow-hidden w-full h-14">
          {advertisements.map((ad, index) => (
            <div
              key={index}
              className={`absolute w-full h-16 transition-opacity duration-500 ${
                index === currentAdvertisement ? "opacity-100" : "opacity-0"
              }`}>
              <div className="flex justify-center items-center">
                <div>
                  <p className="text-xl  font-bold font-serif">{ad.title}</p>
                  <a
                    className="underline flex items-center hover: text-slate-500"
                    href="....">
                    {" "}
                    {ad.link}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="relative">
        <img
          src={images[currentImageIndex]}
          alt={`Slide ${currentImageIndex + 1}`}
          className="block mx-auto w-full"
        />

        <div className="absolute inset-0 flex items-center justify-between px-4">
          <button
            onClick={goToPrevious}
            className="btn btn-outline btn-sm bg-blue-900">
            <FcPrevious className="text-xl text-white" />
          </button>
          <button
            onClick={goToNext}
            className="btn btn-outline btn-sm bg-blue-900">
            <FcNext className="text-xl text-white" />
          </button>
        </div>
      </div>

      <br />

      {/* <div className="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1">
        <a href="...">
          <img
            className="w-full h-full object-cover"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfo2sZA3QxBRrOFN4OD2CiBwXXbLpe0AGCVBweomAfLZJReFHvrk9Gnovg4EP6QP0_1yM&usqp=CAU"
            alt=""
          />
        </a>
        <a href="...">
          <img
            className="w-full h-full object-cover"
            src="https://menonimus.org/wp-content/uploads/2021/01/Cottage-Industries-of-Assam.jpg"
            alt=""
          />
        </a>
        <a href="...">
          <img
            className="w-full h-full object-cover"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQwQ0aniDu1xsp_RP4p6W7WiUomBjdttLutpTcGveLEm4djIGpAJlYyHjfF6WmltjRwuY&usqp=CAU"
            alt=""
          />
        </a>
      </div> */}

      <br />
      <TrandingCarosel />
    </>
  );
};

export default ADVTime;
