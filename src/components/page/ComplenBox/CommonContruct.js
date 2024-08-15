import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiOutlineSend } from "react-icons/ai";

const CommonContruct = ({ information }) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    fetch("https://creative-crafting.vercel.app/api/v1/report", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({ ...data, ...information }),
    })
      .then((res) => {
        if (!res.ok) {
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
    reset();
  };

  return (
    <>
      <div className="bg-gradient-to-b from-black via-black p-10 rounded-2xl m-3">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid md:grid-cols-3 md:gap-6">
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="date"
                id="date"
                defaultValue={information?.date}
                readOnly
                className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              {errors.date && (
                <p role="alert" className="text-white">
                  {errors?.date?.message}
                </p>
              )}
              <label
                htmlFor="date"
                className="peer-focus:font-medium absolute text-sm text-white dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Apply Date
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="email"
                name="email"
                id="email"
                readOnly
                defaultValue={information?.email}
                className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              {errors.email && (
                <p role="alert" className="text-white">
                  {errors?.email?.message}
                </p>
              )}
              <label
                htmlFor="email"
                className="peer-focus:font-medium absolute text-sm text-white dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Email Address
              </label>
            </div>

            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="username"
                id="username"
                defaultValue={information?.name}
                readOnly
                className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              {errors.user && (
                <p role="alert" className="text-white">
                  {errors?.user?.message}
                </p>
              )}
              <label
                htmlFor="username"
                className="peer-focus:font-medium absolute text-sm text-white dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                User Name
              </label>
            </div>
          </div>

          {information?.role === "seller" && (
            <>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="email"
                    name="buyerEmail"
                    id="buyerEmail"
                    {...register("buyerEmail")}
                    className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  {errors.buyerEmail && (
                    <p role="alert" className="text-white">
                      {errors?.buyerEmail?.message}
                    </p>
                  )}
                  <label
                    htmlFor="buyerEmail"
                    className="peer-focus:font-medium absolute text-sm text-white dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Buyer Email Address
                  </label>
                </div>
              </div>

              <div className="relative z-0 w-full mb-6 group">
                <label
                  htmlFor="details"
                  className="block mb-2 text-sm font-medium text-white dark:text-black">
                  Complain Details
                </label>
                <textarea
                  id="details"
                  {...register("details")}
                  rows="4"
                  maxLength={150}
                  required
                  className="block p-2.5 w-full text-sm text-white bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Write your complain details here...(Maximun Length 150 Word)"></textarea>
                {errors.details && (
                  <p role="alert" className="text-white">
                    {errors?.details?.message}
                  </p>
                )}
              </div>
            </>
          )}

          {information?.role === "buyer" && (
            <>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="text"
                    name="transactionID"
                    id="transactionID"
                    {...register("transactionID")}
                    className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  {errors.transactionID && (
                    <p role="alert" className="text-white">
                      {errors?.transactionID?.message}
                    </p>
                  )}
                  <label
                    htmlFor="transactionID"
                    className="peer-focus:font-medium absolute text-sm text-white dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Transaction ID
                  </label>
                </div>

                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="text"
                    name="productId"
                    id="productId"
                    {...register("productId")}
                    className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  {errors.productId && (
                    <p role="alert" className="text-white">
                      {errors?.productId?.message}
                    </p>
                  )}
                  <label
                    htmlFor="productId"
                    className="peer-focus:font-medium absolute text-sm text-white dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Product Id
                  </label>
                </div>

                <div className="relative z-0 w-full mb-6 group mt-2">
                  <label
                    htmlFor="details"
                    className="block mb-2 text-sm font-medium text-white dark:text-black">
                    System Complain Details
                  </label>
                  <textarea
                    id="details"
                    {...register("details")}
                    maxLength={150}
                    required
                    rows="4"
                    className="block p-2.5 w-full text-sm text-white bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Write your System Complaint details here...(Maximun Length 150 Word)"></textarea>
                  {errors.details && (
                    <p role="alert" className="text-white">
                      {errors?.details?.message}
                    </p>
                  )}
                </div>
              </div>
            </>
          )}

          <div className="flex justify-end">
            <button className="btn btn-outline btn-md text-white">
              <AiOutlineSend className="m-2 text-xl"></AiOutlineSend> Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CommonContruct;
