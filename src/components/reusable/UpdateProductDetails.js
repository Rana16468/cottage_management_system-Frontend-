import React from "react";
import { MdSystemUpdateAlt } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
const UpdateProductDetails = ({ item }) => {
  const handelUpdateDetails = (id, index) => {
    console.log({ id, index });
  };
  return (
    <>
      {item?.data?.map((v, index) => (
        <React.Fragment key={index}>
          <div
            key={index}
            className=" grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-1">
            {v?.categorie?.map((categorie, index) => (
              <React.Fragment key={index}>
                {v?.imageList?.map((image, index) => (
                  <div key={index} className="flex justify-center items-center">
                    <div className="max-w-full rounded overflow-hidden shadow-lg">
                      <img
                        className="w-full h-96"
                        src={image}
                        alt="Sunset in the mountains"
                      />

                      <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">
                          {categorie?.name}
                        </div>
                        <p className="text-gray-700 text-base">
                          {categorie?.description} ipsum dolor sit amet,
                          consectetur adipisicing elit. Voluptatibus quia,
                          nulla! Maiores et perferendis eaque, exercitationem
                          praesentium nihil.
                        </p>
                      </div>
                      <div className="px-6 pt-4 pb-2">
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                          #Brand Name :{categorie?.brandName}
                        </span>
                        {categorie?.salesOf <= 0 ? (
                          <p className="inline-block mt-1 bg-gray-200 rounded-full px-2 py-1 text-sm font-semibold text-gray-700">
                            #Price:
                            {categorie?.price}
                          </p>
                        ) : (
                          <p className="inline-block mt-1 bg-gray-200 rounded-full px-2 py-1 text-sm font-semibold text-gray-700 original-price">
                            #Price:
                            {categorie?.price}
                          </p>
                        )}

                        <p className="inline-block m-2 bg-gray-200 rounded-full px-2 py-1 text-sm font-semibold text-gray-700">
                          #Sales Of: {categorie?.salesOf} %
                        </p>
                        {v?.salesOf >= 1 ? (
                          <p className="inline-block m-2 bg-gray-200 rounded-full px-2 py-1 text-sm font-semibold text-gray-700 discounted-price">
                            #Selling Price :{categorie?.sellingPrice}
                          </p>
                        ) : (
                          <p className="inline-block m-2 bg-gray-200 rounded-full px-2 py-1 text-sm font-semibold text-gray-700">
                            #Selling Price: {categorie?.price}
                          </p>
                        )}
                      </div>

                      <div className="flex justify-end">
                        <button
                          onClick={() => handelUpdateDetails(v?._id, index)}
                          className="btn btn-outline btn-success btn-sm m-1">
                          Update <MdSystemUpdateAlt className="text-xl" />
                        </button>
                        <button className="btn btn-outline btn-error btn-sm m-1">
                          <RiDeleteBin5Line className="text-xl" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </React.Fragment>
      ))}
    </>
  );
};

export default UpdateProductDetails;
