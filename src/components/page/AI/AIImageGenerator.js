import React, { useContext, useState } from "react";
import MenuDashbord from "../BuyerDashboard/MenuDashbord";
import { RiAiGenerate } from "react-icons/ri";
import { IoDownloadOutline } from "react-icons/io5";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const AIImageGenerator = () => {
  const { user } = useContext(AuthContext);

  const { handleSubmit, register, reset } = useForm();
  const [generatedImage, setGeneratedImage] = useState(
    "https://www.elegantthemes.com/blog/wp-content/uploads/2023/08/what-can-ai-do-ft-img-3-min.jpg"
  );
  const downloadImage = async (imageSrc) => {
    const image = await fetch(imageSrc);
    const imageBlog = await image.blob();
    const imageURL = URL.createObjectURL(imageBlog);

    const link = document.createElement("a");
    link.href = imageURL;
    link.download = "image file name here";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const onSubmit = (data) => {
    fetch(`https://creative-crafting.vercel.app/api/v1/AI_image_generate`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        setGeneratedImage(data?.result);
        reset();
        toast.success(data?.message);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <>
      <div className="flex">
        <MenuDashbord />
        <div className="w-full px-4 py-2 md:w-full  lg:w-full ">
          <div className=" flex justify-center items-center mt-3">
            <div className=" w-1/2">
              <h1 className="text-3xl font-bold mb-6">
                Text-Based Image Generator
              </h1>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid md:grid-cols-2 md:gap-6">
                  <div className="relative z-0 w-full mb-6 group">
                    <input
                      type="text"
                      name="date"
                      id="date"
                      defaultValue={new Date().toString()}
                      readOnly
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                    />

                    <label
                      htmlFor="date"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                      Date
                    </label>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <input
                      type="text"
                      name="username"
                      id="username"
                      defaultValue={user?.displayName}
                      readOnly
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                    />

                    <label
                      htmlFor="username"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                      Full Name
                    </label>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 md:gap-6">
                  <div className="relative z-0 w-full mb-6 group">
                    <input
                      type="text"
                      name="email"
                      defaultValue={user?.email}
                      readOnly
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                    />

                    <label
                      htmlFor="Email"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                      Email*
                    </label>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <input
                      type="text"
                      name="accountTypes"
                      defaultValue={user?.photoURL}
                      readOnly
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer bg-blue-200"
                      placeholder=" "
                      required
                    />

                    <label
                      htmlFor="username"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                      Account Types
                    </label>
                  </div>
                </div>
                <select
                  // {...register("industry")}
                  className="select select-success  w-full max-w-full">
                  <option disabled selected>
                    All Industries
                  </option>
                  <option selected>Creative Crafting</option>
                </select>
                <div className="max-w-full p-4 bg-white shadow-md rounded-md flex">
                  <input
                    type="text"
                    {...register("image")}
                    className="mt-1 p-2 border border-gray-300 rounded-l-md w-full focus:outline-none focus:ring focus:border-blue-300"
                  />

                  <button className="  p-3 bg-blue-500 text-white rounded-r-xl hover:bg-blue-800 transition duration-300">
                    <RiAiGenerate className="text-4xl " />
                  </button>
                </div>
              </form>

              <div className="mt-8  bg-white shadow-lg rounded-md overflow-hidden">
                <div className="flex justify-between">
                  <p className="text-xl font-serif mb-2">Generated Image:</p>
                  <button
                    onClick={() => downloadImage(generatedImage)}
                    className="btn btn-outline btn-info btn-sm">
                    <IoDownloadOutline className="text-xl" />
                  </button>
                </div>
                <div className="w-full h-full">
                  <img
                    src={generatedImage}
                    alt="Generated"
                    className="w-full h-auto rounded-md transition duration-500 transform hover:scale-150"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AIImageGenerator;
