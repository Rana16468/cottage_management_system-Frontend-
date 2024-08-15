import React, { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { allPotterySubCategorie } from "../../utils/AllSubCategorieName";
import { TypeOfImage } from "../../utils/ExtentionType";
import toast from "react-hot-toast";

const UpdateSubCategorie = ({ subCategorieData }) => {
  const { user } = useContext(AuthContext);

  // identify the categories

  const { subCategorieName, subCategorie } =
    allPotterySubCategorie?.find((v) => {
      return (
        v?.subCategorie?.includes(subCategorieData?.name) && v?.subCategorie
      );
    }) || {};

  const onSubmit = (event) => {
    event.preventDefault();
    const element = event.target;
    const name = element.name.value;
    const price = Number(element.price.value);
    const salesOf = Number(element.salesOf.value);
    const brandName = element.brandName.value;
    const description = element.description.value;
    const quentity = Number(element.quentity.value);
    let image = element.photo.files[0] || subCategorieData?.photo;
    const sellingPrice = price - price * (salesOf / 100);

    let updateData;

    const commanAPIFetch = (updateData) => {
      //https://creative-crafting.vercel.app/api/v1/update_sub_categorie/65dca0d728c454bf044463e6

      fetch(
        `https://creative-crafting.vercel.app/api/v1/update_sub_categorie/${subCategorieData?._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: localStorage.getItem("token"),
          },
          body: JSON.stringify(updateData),
        }
      )
        .then((res) => {
          if (!res.ok) {
            throw Error("API ERROR");
          }
          return res.json();
        })
        .then((data) => {
          toast.success(data?.message);
        })
        .catch((error) => {
          toast.error(error?.message);
        });
    };

    if (TypeOfImage?.includes(image?.name?.split(".")?.pop()?.toLowerCase())) {
      const formData = new FormData();
      formData.append("image", image);
      const url = `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_IMAGE_KEY}`;
      fetch(url, {
        method: "POST",
        body: formData,
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("API ERROR");
          }
          return res.json();
        })
        .then((imgData) => {
          if (imgData?.success) {
            image = imgData?.data?.url;

            updateData = {
              name,
              price,
              salesOf,
              brandName,
              description,
              quentity,
              photo: image,
              sellingPrice,
            };
            commanAPIFetch(updateData);
          }
        })
        .catch((error) => {
          toast.error(error?.message);
        });
    } else if (!element.photo.files[0]) {
      updateData = {
        name,
        price,
        salesOf,
        brandName,
        description,
        quentity,
        photo: image,
        sellingPrice,
      };
      commanAPIFetch(updateData);
    } else {
      toast.error("png,jpg,jpeg accespted Onter Types Not Accespted");
    }
  };

  return (
    <>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}

      <dialog id="report_modal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm bg-green-500 btn-circle absolute right-2 top-2">
              ✕
            </button>
            <h3 className=" font-bold text-2xl font-serif">
              Categorie Name :{subCategorieName}
            </h3>
          </form>
          <form onSubmit={onSubmit} className="grid grid-cols-1 gap-3 mt-10">
            <input
              name="email"
              defaultValue={user?.email}
              readOnly
              type="email"
              placeholder="Email Address"
              className="input input-bordered w-full "
            />

            <input
              type="text"
              name="release_date"
              defaultValue={new Date().toString()}
              readOnly
              className="input input-bordered w-full "
            />

            {subCategorie?.length ? (
              <select
                className="border border-gray-300 rounded-lg  px-3 w-full  py-3"
                name="name"
                required>
                <option disabled>
                  Product Categorie Name :{subCategorieData?.name}
                </option>

                {subCategorie.map((v, index) => (
                  <option key={index} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            ) : (
              <input
                className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                type="text"
                name="name"
                defaultValue={subCategorieData?.name}
                placeholder="Sub Categories Name*"
                required
              />
            )}

            <input
              type="number"
              name="price"
              defaultValue={subCategorieData?.price}
              placeholder="Price"
              className="input input-bordered w-full "
            />

            <input
              type="number"
              name="salesOf"
              defaultValue={subCategorieData?.salesOf}
              placeholder="SalesOf"
              className="input input-bordered w-full "
              required
            />

            <input
              type="text"
              name="brandName"
              defaultValue={subCategorieData?.brandName}
              placeholder="Brand Name"
              className="input input-bordered w-full "
              required
            />

            <div className="col-span-full">
              <div className="mt-2">
                <textarea
                  id="description"
                  name="description"
                  defaultValue={subCategorieData?.description}
                  minLength={50}
                  maxLength={100}
                  rows="3"
                  placeholder="Description"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  required></textarea>
              </div>

              <input
                className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                type="number"
                name="quentity"
                defaultValue={subCategorieData?.quentity}
                placeholder="Quentity"
                required
              />
              <p className="mt-3 text-sm leading-6 text-gray-600">
                Write a few sentences about Product (min-50, max-100).
              </p>
            </div>

            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <svg
                  className="mx-auto h-12 w-12 "
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true">
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="photo"
                    className="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                    <span className="">Upload a Photo</span>
                    <input
                      id="photo"
                      name="photo"
                      type="file"
                      className="sr-only"
                    />
                  </label>
                  <p className="pl-1 ">or drag and drop</p>
                </div>
                <p className="text-xs ">PNG, JPG, GIF up to 800kb</p>
              </div>
            </div>

            <br />
            <input
              className="w-full btn-sm  btn bg-blue-900 btn-outline text-white"
              type="submit"
              value="Submit"
            />
          </form>
        </div>
      </dialog>
    </>
  );
};

export default UpdateSubCategorie;
