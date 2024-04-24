import React from "react";
import { RiHome8Line } from "react-icons/ri";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { FcShop } from "react-icons/fc";
import { LiaUniversitySolid } from "react-icons/lia";
import { RiCommunityFill } from "react-icons/ri";
const Service = () => {
  const ourService = [
    {
      id: 1,
      serviceIcon: <RiHome8Line className="text-4xl text-white" />,
      serviceName: "Home Design",
      description:
        " There are many variations of passages of Lorem Ipsum availablebut the majority have suffered alteration in some form.",
    },
    {
      id: 2,
      serviceIcon: <HiOutlineOfficeBuilding className="text-5xl text-white" />,
      serviceName: "Mordan Design",
      description:
        " There are many variations of passages of Lorem Ipsum availablebut the majority have suffered alteration in some form.",
    },
    {
      id: 3,
      serviceIcon: <FcShop className="text-5xl " />,
      serviceName: " Shop Interiror Design",
      description:
        " There are many variations of passages of Lorem Ipsum availablebut the majority have suffered alteration in some form.",
    },
    {
      id: 4,
      serviceIcon: <FcShop className="text-5xl " />,
      serviceName: "Community Center Interiror Design",
      description:
        " There are many variations of passages of Lorem Ipsum availablebut the majority have suffered alteration in some form.",
    },
    {
      id: 5,
      serviceIcon: <LiaUniversitySolid className="text-5xl text-white" />,
      serviceName: "University Interior Design",
      description:
        " There are many variations of passages of Lorem Ipsum availablebut the majority have suffered alteration in some form.",
    },
    {
      id: 6,
      serviceIcon: <RiCommunityFill className="text-5xl text-white" />,
      serviceName: "Community Center Interior Design",
      description:
        " There are many variations of passages of Lorem Ipsum availablebut the majority have suffered alteration in some form.",
    },
    {
      id: 7,
      serviceIcon: <RiCommunityFill className="text-5xl text-white" />,
      serviceName: "Community Center Interior Design",
      description:
        " There are many variations of passages of Lorem Ipsum availablebut the majority have suffered alteration in some form.",
    },
    {
      id: 8,
      serviceIcon: <RiCommunityFill className="text-5xl text-white" />,
      serviceName: "Community Center Interior Design",
      description:
        " There are many variations of passages of Lorem Ipsum availablebut the majority have suffered alteration in some form.",
    },
    {
      id: 9,
      serviceIcon: <RiCommunityFill className="text-5xl text-white" />,
      serviceName: "Community Center Interior Design",
      description:
        " There are many variations of passages of Lorem Ipsum availablebut the majority have suffered alteration in some form.",
    },
    {
      id: 10,
      serviceIcon: <RiCommunityFill className="text-5xl text-white" />,
      serviceName: "Community Center Interior Design",
      description:
        " There are many variations of passages of Lorem Ipsum availablebut the majority have suffered alteration in some form.",
    },
  ];
  return (
    <>
      <section className="pt-20 pb-12 lg:pt-[120px] lg:pb-[90px] dark:bg-dark">
        <div className="container mx-auto">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="mx-auto mb-12 max-w-[510px] text-center lg:mb-20">
                <span className="text-primary mb-2 block text-lg font-semibold">
                  Our Services
                </span>
                <h2 className="text-dark dark:text-black mb-3 text-3xl leading-[1.2] font-bold sm:text-4xl md:text-[40px]">
                  What We Offer
                </h2>
                <p className="text-body-color text-base dark:text-dark-6">
                  There are many variations of passages of Lorem Ipsum available
                  but the majority have suffered alteration in some form.
                </p>
              </div>
            </div>
          </div>
          <div className="-mx-4 flex flex-wrap">
            {ourService?.map((v, index) => (
              <div key={index} className="w-full px-4 md:w-1/2 lg:w-1/3">
                <div className="mb-9 rounded-[20px] bg-white dark:bg-dark-2 p-10 shadow-2 hover:shadow-lg md:px-7 xl:px-10">
                  <div className="bg-primary mb-8 flex h-[70px] w-[70px] items-center justify-center rounded-2xl">
                    {v?.serviceIcon}
                  </div>
                  <h4 className="text-dark dark:text-black mb-[14px] text-2xl font-semibold">
                    {v?.serviceName}
                  </h4>
                  <p className="text-body-color dark:text-dark-6">
                    {v?.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Service;
