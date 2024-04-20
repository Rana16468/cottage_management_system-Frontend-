import React from "react";
import { useForm } from "react-hook-form";
import { AiOutlineSend } from "react-icons/ai";
const CommonContruct = ({ information }) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    reset();
  };
  return (
    <>
      <div className="bg-secondary/10 shadow-lg p-10 rounded-2xl m-3">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid md:grid-cols-3 md:gap-6">
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="date"
                id="date"
                {...register("date")}
                defaultValue={information?.date}
                readOnly
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              {errors.date && <p role="alert">{errors?.date?.message}</p>}
              <label
                for="date"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
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
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              {errors.email && <p role="alert">{errors?.email?.message}</p>}
              <label
                for="email"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Email Address
              </label>
            </div>

            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="username"
                id="username"
                {...register("username")}
                defaultValue={information?.name}
                readOnly
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              {errors.user && <p role="alert">{errors?.user?.message}</p>}
              <label
                for="username"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                User Name
              </label>
            </div>
          </div>

          {information?.role === "seller" && (
            <>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-6 group">
                  <div className="relative z-0 w-full mb-6 group">
                    <input
                      type="text"
                      name="buyerName"
                      id="buyerName"
                      {...register("buyerName")}
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                    />
                    {errors.buyerName && (
                      <p role="alert">{errors?.buyerName?.message}</p>
                    )}
                    <label
                      for="Buyer Name"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                      Buyer Name
                    </label>
                  </div>
                </div>

                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="email"
                    name="buyerEmail"
                    id="buyerEmail"
                    {...register("buyerEmail")}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  {errors.buyerEmail && (
                    <p role="alert">{errors?.buyerEmail?.message}</p>
                  )}
                  <label
                    for="candidateemail"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Buyer Email Address
                  </label>
                </div>
              </div>

              <div className="relative z-0 w-full mb-6 group">
                <label
                  for="details"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                  Complain Details
                </label>
                <textarea
                  id="details"
                  {...register("details")}
                  rows="4"
                  maxLength={150}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Write your complain details here...(Maximun Length 150 Word)"></textarea>
                {errors.details && (
                  <p role="alert">{errors?.details?.message}</p>
                )}
              </div>
            </>
          )}

          {information?.role === "buyer" && (
            <>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="email"
                    name="transactionID"
                    id="transactionID"
                    {...register("transactionID")}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  {errors.transactionID && (
                    <p role="alert">{errors?.transactionID?.message}</p>
                  )}
                  <label
                    for="employeeremail"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Transaction ID
                  </label>
                </div>

                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="text"
                    name="productId"
                    id="productId"
                    {...register("productId")}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  {errors.productId && (
                    <p role="alert">{errors?.productId?.message}</p>
                  )}
                  <label
                    for="Product Id"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Product Id
                  </label>
                </div>

                <div className="relative z-0 w-full mb-6 group mt-2">
                  <label
                    for="details"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                    System Complain Details
                  </label>
                  <textarea
                    id="details"
                    {...register("details")}
                    maxLength={150}
                    rows="4"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Write your System Complaint details here...(Maximun Length 150 Word)"></textarea>
                  {errors.details && (
                    <p role="alert">{errors?.details?.message}</p>
                  )}
                </div>
              </div>
            </>
          )}

          <div className="flex justify-end">
            <button className="btn btn-outline btn-md">
              <AiOutlineSend className="m-2 text-xl"></AiOutlineSend> Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CommonContruct;
