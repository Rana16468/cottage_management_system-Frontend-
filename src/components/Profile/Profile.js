import React, { useEffect, useState } from "react";
import DeviceDetector from "device-detector-js";
import TimeCalculation from "../../utils/TimeCalculation";
import yourhandle from "countrycitystatejson";
import { GrDevice } from "react-icons/gr";
import { PiTrainRegionalThin } from "react-icons/pi";
import { GrDocumentUpdate } from "react-icons/gr";
import { Spin } from "antd";
import {
  MdOutlineSettingsSystemDaydream,
  MdOutlineSignalWifiStatusbar4Bar,
  MdOutlineSignalWifiStatusbarNull,
  MdSignalWifiStatusbarConnectedNoInternet,
} from "react-icons/md";
import { BsBrowserChrome } from "react-icons/bs";
import { CountrylogoDetails, TypeOfImage } from "../../utils/ExtentionType";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import ErrorPage from "../error/ErrorPage";
const Profile = () => {
  const [deviceInfo, setDeviceInfo] = useState(null);
  useEffect(() => {
    const deviceDetector = new DeviceDetector();
    const userAgent = navigator.userAgent;

    const info = deviceDetector.parse(userAgent);
    setDeviceInfo(info);
  }, []);

  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const distractName = userTimeZone.split("/")[1];

  const countryDetails =
    yourhandle.getCountries().find((v) => v.capital === distractName) || {};
  const userInfo = Object.values(countryDetails) || [];

  const {
    data: specific_user = {},
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["specific_user"],
    queryFn: async () => {
      const res = await fetch(
        "http://localhost:3013/api/v1/specific_user_info",
        {
          method: "GET",
          headers: {
            authorization: localStorage.getItem("token"),
          },
        }
      );
      const data = await res.json();
      return data;
    },
  });

  const handelSubmitProfile = (event) => {
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
            image = imgData?.data?.url;
            fetch("http://localhost:3013/api/v1/profile_picture", {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                authorization: localStorage.getItem("token"),
              },
              body: JSON.stringify({ image }),
            })
              .then((res) => {
                if (!res.ok) {
                  throw new Error("API ERROR");
                }
                return res.json();
              })
              .then((data) => {
                toast.success(data?.message);
                refetch();
              })
              .catch((error) => {
                toast.error(error?.message);
              });
          }
        });
    } else {
      toast.error("png,jpg,jpeg accespted Onter Types Not Accespted");
    }
  };

  return (
    <>
      {error && <ErrorPage />}
      {isLoading && <Spin />}
      <div className=" h-full">
        <div className="border-b-2 block md:flex">
          <form
            onSubmit={handelSubmitProfile}
            className="w-full md:w-2/5 p-4 sm:p-6 lg:p-8  shadow-md">
            <h1 className="text-center font-serif text-2xl m-3">
              User Profile
            </h1>
            <div className="avatar flex justify-center">
              <div className="w-52 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img
                  src={
                    specific_user?.data?.photo ||
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzF32lbq4BoRPJ3bZ4FrQiFe9uhw5tRZBqxzt7G00uhbmqTW3f-PeYpIMOUzFCsYpuOMI&usqp=CAU"
                  }
                  alt=""
                />
              </div>
            </div>

            <div className="flex justify-center">
              <label className="block">
                <span className="sr-only">Choose profile photo</span>
                <input
                  type="file"
                  name="photo"
                  className="block w-full text-sm text-slate-500
                  file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                     file:text-sm file:font-semibold
                  file:bg-violet-50 file:text-violet-700
                   hover:file:bg-violet-100"
                  required
                />
              </label>
            </div>

            <div className=" flex justify-center">
              <button
                type="submit"
                className="mt-2 text-md font-bold text-white bg-gray-700 rounded-full px-5 py-2 hover:bg-gray-800">
                <div className="flex justify-center">
                  Edit <GrDocumentUpdate className="text-xl ml-2" />
                </div>
              </button>
            </div>
          </form>

          {deviceInfo && (
            <div className="w-full max-w-md p-4 bg-white border border-gray-200  shadow sm:p-8 dark:bg-blue-900 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                  User Infomation
                </h5>
                <a
                  href="..."
                  className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
                  View all
                </a>
              </div>
              <div className="flow-root">
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                  <li className="py-3 sm:py-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <GrDevice className="text-xl bg-green-400 rounded" />
                      </div>
                      <div className="flex-1 min-w-0 ms-4">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                          <strong>Device Name:</strong>
                        </p>
                      </div>
                      <div className="inline-flex items-center text-base font-semibold dark:text-white">
                        {deviceInfo.device.brand || "common"}
                        {deviceInfo.device.model || 5100}
                      </div>
                    </div>
                  </li>
                  <li className="py-3 sm:py-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <MdOutlineSettingsSystemDaydream className="text-xl bg-green-500" />
                      </div>
                      <div className="flex-1 min-w-0 ms-4">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                          <strong>OS:</strong>
                        </p>
                      </div>
                      <div className="inline-flex items-center text-base font-semibold dark:text-white">
                        {deviceInfo.os.name} {deviceInfo.os.version}
                      </div>
                    </div>
                  </li>
                  <li className="py-3 sm:py-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <BsBrowserChrome className="text-xl bg-orange-600 rounded" />
                      </div>
                      <div className="flex-1 min-w-0 ms-4">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                          <strong>Browser:</strong>
                        </p>
                      </div>
                      <div className="inline-flex items-center text-base font-semibold dark:text-white">
                        {deviceInfo.client.name} {deviceInfo.client.version}
                      </div>
                    </div>
                  </li>
                  <li className="py-3 sm:py-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <MdOutlineSignalWifiStatusbar4Bar className="text-xl bg-white rounded" />
                      </div>
                      <div className="flex-1 min-w-0 ms-4">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                          <strong>Active</strong>
                        </p>
                      </div>
                      <div className="inline-flex items-center text-base font-semibold dark:text-white">
                        {navigator.onLine ? (
                          <p className="btn btn-success btn-sm">
                            {" "}
                            <MdOutlineSignalWifiStatusbarNull className="text-xl bg-white rounded" />{" "}
                            Active
                          </p>
                        ) : (
                          <p className="btn btn-error btn-sm">
                            <MdSignalWifiStatusbarConnectedNoInternet className="text-xl bg-red-900 rounded" />
                            In-Active
                          </p>
                        )}
                      </div>
                    </div>
                  </li>

                  <li className="py-3 sm:py-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <PiTrainRegionalThin className="text-xl rounded bg-white" />
                      </div>
                      <div className="flex-1 min-w-0 ms-4">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                          <strong>Continent:</strong>
                        </p>
                      </div>
                      <div className="inline-flex items-center text-base font-semibold dark:text-white">
                        {userTimeZone}
                      </div>
                    </div>
                  </li>

                  {userInfo?.map((v, index) => (
                    <li className="py-3 sm:py-4" key={index}>
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          {CountrylogoDetails[index]}
                        </div>
                        <div className="flex-1 min-w-0 ms-4">
                          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                            <strong>
                              {Object.keys(countryDetails)[index]}
                            </strong>
                          </p>
                        </div>
                        <div className="inline-flex items-center text-base font-semibold dark:text-white">
                          {v}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          <div className="flex justify-center items-center w-screen  ">
            <div className="container  my-4 px-4 lg:px-20">
              <div className="w-full p-8 my-4 md:px-12 lg:w-9/12 lg:pl-20   lg:pr-24 mr-auto rounded-2xl shadow-2xl">
                <h1 className="text-2xl font-serif text-center">
                  User Information
                </h1>
                <div className="grid grid-cols-1 gap-1 md:grid-cols-1 sm:grid-cols-1 mt-5">
                  <input
                    className="w-full  bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="username"
                    defaultValue={specific_user?.data?.username}
                  />
                  <input
                    className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                    type="email"
                    placeholder="email"
                    defaultValue={specific_user?.data?.email}
                    readOnly
                  />
                  <input
                    className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                    type="role"
                    placeholder="role"
                    defaultValue={specific_user?.data?.role?.toUpperCase()}
                    readOnly
                  />

                  {specific_user?.data?.isAdmin ? (
                    <button className="btn btn-outline bg-blue-500 btn-md text-white">
                      I am Admin
                    </button>
                  ) : (
                    <button className="btn btn-outline bg-blue-900 btn-sm text-white">
                      I am User Account Holder
                    </button>
                  )}

                  <input
                    className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Date"
                    defaultValue={TimeCalculation()}
                    readOnly
                  />
                </div>

                <div className="m-3">
                  <button
                    className="btn-sm btn-outline  bg-blue-900 text-gray-100  rounded-lg w-full 
                      focus:outline-none focus:shadow-outline">
                    update
                  </button>
                </div>
              </div>

              <div className="w-full lg:-mt-96 lg:w-2/6 px-8 py-12 ml-auto bg-blue-900 rounded-2xl">
                <div className="flex flex-col text-white">
                  <div className="flex my-4 w-2/3 lg:w-1/2">
                    <div className="flex flex-col">
                      <i className="fas fa-map-marker-alt pt-2 pr-2" />
                    </div>
                    <div className="flex flex-col">
                      <h2 className="text-2xl">Main Office</h2>
                      <p className="text-gray-400">
                        5555 Tailwind RD, Pleasant Grove, UT 73533
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-end justify-end fixed bottom-0 right-0 mb-4 mr-4 z-10">
            <div>
              <a
                title="Buy me a pizza"
                href="https://www.buymeacoffee.com/Dekartmc"
                target=""
                className="block w-16 h-16 rounded-full transition-all shadow hover:shadow-lg transform hover:scale-110 hover:rotate-12">
                <img
                  className="object-cover object-center w-full h-full rounded-full"
                  src="https://img.icons8.com/emoji/48/000000/pizza-emoji.png"
                  alt=""
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
