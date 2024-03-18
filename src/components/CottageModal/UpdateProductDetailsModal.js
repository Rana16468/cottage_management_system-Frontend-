import React, { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { TypeOfImage } from "../../utils/ExtentionType";
import toast from "react-hot-toast";

const UpdateProductDetailsModal = ({ productDetails }) => {
  const { user } = useContext(AuthContext);

  const onSubmit = (event) => {
    event.preventDefault();
    const element = event.target;
    let image = element.photo.files[0];
    if (TypeOfImage.includes(image?.name?.split(".")?.pop()?.toLowerCase())) {
      const formData = new FormData();
      formData.append("image", image);
      const url = `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_IMAGE_KEY}`;
      fetch(url, {
        method: "POST",
        body: formData,
      })
        .then((res) => {
          if (!res?.ok) {
            throw new Error("API ERROR");
          }
          return res.json();
        })
        .then((imgData) => {
          if (imgData?.success) {
            const newImageUrl = imgData?.data?.url;

            const updateDetails = {
              newImageUrl,
              indexToUpdate: productDetails.indexToUpdate,
            };

            fetch(
              `http://localhost:3013/api/v1/update_image_details/${productDetails?._id}`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                  authorization: localStorage.getItem("token"),
                },
                body: JSON.stringify(updateDetails),
              }
            )
              .then((res) => {
                if (!res?.ok) {
                  throw new Error("API ERROR");
                }
                return res.json();
              })
              .then((data) => {
                toast.success(data?.message);
              })
              .catch((error) => {
                toast.error(error?.message);
              });
          } else {
            toast.error("Image Uploding Server ERROR");
          }
        })
        .catch((error) => {
          toast.error(error?.message);
        });
    } else {
      toast.error("png,jpg,jpeg accespted Onter Types Not Accespted");
    }
  };
  return (
    <>
      <dialog id="product_details" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm bg-green-500 btn-circle absolute right-2 top-2">
              ✕
            </button>
            <h3 className=" font-bold text-2xl font-serif">
              Update Categories Details
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

export default UpdateProductDetailsModal;
