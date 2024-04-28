import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiOutlineSend } from "react-icons/ai";

const SystemComplain = ({ information }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  const systemProblemlist = [
    {
      id: 1,
      problem: "System Issues By Seller Section",
    },
    { id: 2, problem: "System Issues By Buyer Section" },
    { id: 3, problem: "System Issues By Product Added Section" },
    { id: 4, problem: "System Issues By ChatBot Section" },
    { id: 5, problem: "System Issues By Product Details Section" },
    { id: 6, problem: "System Issues By Product AI Section" },
    { id: 7, problem: "System Issues By Review Section" },
    { id: 8, problem: "System Issues By Authnitigation Section" },
    { id: 9, problem: "System Issues By Server Issues Particular " },
    { id: 10, problem: "Security ISSUES" },
    { id: 11, problem: "System Advertisement" },
    { id: 11, problem: "System Payment Getway Issues " },
    { id: 12, problem: "Others" },
  ];

  const onSubmit = (data) => {
    fetch("http://localhost:3013/api/v1/report", {
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
      <div className="bg-secondary/10 shadow-lg p-10 rounded-2xl m-3">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid md:grid-cols-3 md:gap-6">
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="date"
                id="date"
                defaultValue={information?.date}
                readOnly
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              {errors.date && <p role="alert">{errors?.date?.message}</p>}
              <label
                htmlFor="date"
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
                htmlFor="email"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
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

          <div className="grid md:grid-cols-2 md:gap-6">
            <label for="underline_select" className="sr-only">
              System Problem List
            </label>
            <select
              name="problem"
              id="problem"
              {...register("problem")}
              required
              className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-black dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
              <option selected>System Problem List</option>
              {systemProblemlist?.map((v) => (
                <option key={v.id}>{v.problem}</option>
              ))}
            </select>
            {errors.problem && <p role="alert">{errors?.problem?.message}</p>}
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
              required
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Write your System Complaint details here...(Maximun Length 150 Word)"></textarea>
            {errors.details && <p role="alert">{errors?.details?.message}</p>}
          </div>

          <div className="flex justify-end">
            <button className="btn btn-outline btn-md">
              <AiOutlineSend className=" text-sm"></AiOutlineSend> Submit System
              Complain
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SystemComplain;
