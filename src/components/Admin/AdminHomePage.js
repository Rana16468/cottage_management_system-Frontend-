import { useQuery } from "@tanstack/react-query";
import { Spin } from "antd";
import React from "react";
import ErrorPage from "../error/ErrorPage";
import { FaRegUser } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import { BsSubtract } from "react-icons/bs";
import { TbListDetails } from "react-icons/tb";
import { PiChatText } from "react-icons/pi";
import { GiShoppingCart } from "react-icons/gi";
import { VscPreview } from "react-icons/vsc";
import { MdPayment } from "react-icons/md";
import { GiLoveMystery } from "react-icons/gi";
import { TbReport } from "react-icons/tb";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  Legend,
  Bar,
} from "recharts";

const AdminHomePage = () => {
  const {
    data: allCollection = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ["allCollection"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:3013/api/v1/deshboard`, {
        method: "GET",
        headers: {
          authorization: localStorage.getItem("token"),
        },
      });
      const data = await res.json();
      return data?.data;
    },
  });

  const { data: paymentSummery = [] } = useQuery({
    queryKey: ["paymentSummery"],
    queryFn: async () => {
      const res = await fetch(
        "http://localhost:3013/api/v1/my_all_order_summary",
        {
          method: "GET",
          headers: {
            authorization: localStorage.getItem("token"),
          },
        }
      );
      const data = await res.json();
      return data?.data;
    },
  });

  return (
    <div>
      {isLoading && <Spin />}
      {error && <ErrorPage />}
      <section>
        <div id="main" className="main-content flex-1 ">
          <div className="bg-gray-800 pt-3">
            <div className="rounded-tl-3xl bg-gradient-to-r from-blue-900 to-gray-800 p-4 shadow text-2xl text-white">
              <h1 className="font-bold pl-2">Analytics</h1>
            </div>
          </div>

          <div className="flex flex-wrap">
            <div className="w-full md:w-1/2 xl:w-1/3 p-6">
              <div className="bg-gradient-to-b from-green-200 to-green-100 border-b-4 border-green-600 rounded-lg shadow-xl p-5">
                <div className="flex flex-row items-center">
                  <div className="flex-shrink pr-4">
                    <div className="rounded-full p-5 bg-green-600">
                      <FaRegUser className="text-3xl" />
                    </div>
                  </div>
                  <div className="flex-1 text-right md:text-center">
                    <h2 className="font-bold uppercase text-gray-600">
                      Total User
                    </h2>
                    <p className="font-bold text-3xl">
                      {allCollection?.totalUserCount}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/2 xl:w-1/3 p-6">
              <div className="bg-gradient-to-b from-pink-200 to-pink-100 border-b-4 border-pink-500 rounded-lg shadow-xl p-5">
                <div className="flex flex-row items-center">
                  <div className="flex-shrink pr-4">
                    <div className="rounded-full p-5 bg-pink-600">
                      <BiCategory className="text-3xl" />
                    </div>
                  </div>
                  <div className="flex-1 text-right md:text-center">
                    <h2 className="font-bold uppercase text-gray-600">
                      Total Categorie
                    </h2>
                    <p className="font-bold text-3xl">
                      {allCollection?.totalProductCount}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 xl:w-1/3 p-6">
              <div className="bg-gradient-to-b from-yellow-200 to-yellow-100 border-b-4 border-yellow-600 rounded-lg shadow-xl p-5">
                <div className="flex flex-row items-center">
                  <div className="flex-shrink pr-4">
                    <div className="rounded-full p-5 bg-yellow-600">
                      <BsSubtract className="text-3xl" />
                    </div>
                  </div>
                  <div className="flex-1 text-right md:text-center">
                    <h2 className="font-bold uppercase text-gray-600">
                      Total SubCaregorie
                    </h2>
                    <p className="font-bold text-3xl">
                      {allCollection?.totalSubCategorieCount}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 xl:w-1/3 p-6">
              <div className="bg-gradient-to-b from-blue-200 to-blue-100 border-b-4 border-blue-500 rounded-lg shadow-xl p-5">
                <div className="flex flex-row items-center">
                  <div className="flex-shrink pr-4">
                    <div className="rounded-full p-5 bg-blue-600">
                      <TbListDetails className="text-3xl" />
                    </div>
                  </div>
                  <div className="flex-1 text-right md:text-center">
                    <h2 className="font-bold uppercase text-gray-600">
                      Total Details
                    </h2>
                    <p className="font-bold text-3xl">
                      {allCollection?.totalProductDetailsCount}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 xl:w-1/3 p-6">
              <div className="bg-gradient-to-b from-indigo-200 to-indigo-100 border-b-4 border-indigo-500 rounded-lg shadow-xl p-5">
                <div className="flex flex-row items-center">
                  <div className="flex-shrink pr-4">
                    <div className="rounded-full p-5 bg-indigo-600">
                      <PiChatText className="text-3xl" />
                    </div>
                  </div>
                  <div className="flex-1 text-right md:text-center">
                    <h2 className="font-bold uppercase text-gray-600">
                      Toat Chat
                    </h2>
                    <p className="font-bold text-3xl">
                      {allCollection?.totalChatCount}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 xl:w-1/3 p-6">
              <div className="bg-gradient-to-b from-red-200 to-red-100 border-b-4 border-red-500 rounded-lg shadow-xl p-5">
                <div className="flex flex-row items-center">
                  <div className="flex-shrink pr-4">
                    <div className="rounded-full p-5 bg-red-600">
                      <GiShoppingCart className="text-3xl" />
                    </div>
                  </div>
                  <div className="flex-1 text-right md:text-center">
                    <h2 className="font-bold uppercase text-gray-600">
                      Total AddToCard
                    </h2>
                    <p className="font-bold text-3xl">
                      {allCollection?.totalAddToCardCount}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* next */}
            <div className="w-full md:w-1/2 xl:w-1/3 p-6">
              <div className="bg-gradient-to-b from-pink-200 to-pink-100 border-b-4 border-pink-500 rounded-lg shadow-xl p-5">
                <div className="flex flex-row items-center">
                  <div className="flex-shrink pr-4">
                    <div className="rounded-full p-5 bg-blue-300">
                      <VscPreview className="text-3xl" />
                    </div>
                  </div>
                  <div className="flex-1 text-right md:text-center">
                    <h2 className="font-bold uppercase text-gray-600">
                      Total Review
                    </h2>
                    <p className="font-bold text-3xl">
                      {allCollection?.totalReviewCount}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/*  */}
            <div className="w-full md:w-1/2 xl:w-1/3 p-6">
              <div className="bg-gradient-to-b from-pink-200 to-pink-100 border-b-4 border-pink-500 rounded-lg shadow-xl p-5">
                <div className="flex flex-row items-center">
                  <div className="flex-shrink pr-4">
                    <div className="rounded-full p-5 bg-sky-500">
                      <MdPayment className="text-3xl" />
                    </div>
                  </div>
                  <div className="flex-1 text-right md:text-center">
                    <h2 className="font-bold uppercase text-gray-600">
                      Total Payment
                    </h2>
                    <p className="font-bold text-3xl">
                      {allCollection?.totalPaymentCount}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/*  */}
            <div className="w-full md:w-1/2 xl:w-1/3 p-6">
              <div className="bg-gradient-to-b from-pink-200 to-pink-100 border-b-4 border-pink-500 rounded-lg shadow-xl p-5">
                <div className="flex flex-row items-center">
                  <div className="flex-shrink pr-4">
                    <div className="rounded-full p-5 bg-pink-600">
                      <GiLoveMystery className="text-3xl" />
                    </div>
                  </div>
                  <div className="flex-1 text-right md:text-center">
                    <h2 className="font-bold uppercase text-gray-600">
                      Total WishList
                    </h2>
                    <p className="font-bold text-3xl">
                      {allCollection?.totalWishListCount}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/*  */}
            <div className="w-full md:w-1/2 xl:w-1/3 p-6">
              <div className="bg-gradient-to-b from-pink-200 to-pink-100 border-b-4 border-pink-500 rounded-lg shadow-xl p-5">
                <div className="flex flex-row items-center">
                  <div className="flex-shrink pr-4">
                    <div className="rounded-full p-5 bg-blue-100">
                      <TbReport className="text-3xl" />
                    </div>
                  </div>
                  <div className="flex-1 text-right md:text-center">
                    <h2 className="font-bold uppercase text-gray-600">
                      Total Report
                    </h2>
                    <p className="font-bold text-3xl">
                      {allCollection?.totalReportCount}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-row flex-wrap flex-grow mt-2">
            <div className="w-full md:w-1/2 xl:w-1/3 p-6">
              <div className="bg-white border-transparent rounded-lg shadow-xl">
                <div className="bg-gradient-to-b from-gray-300 to-gray-100 uppercase text-gray-800 border-b-2 border-gray-300 rounded-tl-lg rounded-tr-lg p-2">
                  <h2 className="font-bold uppercase text-gray-600">Graph</h2>
                </div>
                <div className="p-5">
                  <table className="w-full p-5 text-gray-700">
                    <thead>
                      <tr>
                        <th className="text-left text-blue-900">Name</th>
                        <th className="text-left text-blue-900">Side</th>
                        <th className="text-left text-blue-900">Role</th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr>
                        <td>Obi Wan Kenobi</td>
                        <td>Light</td>
                        <td>Jedi</td>
                      </tr>
                      <tr>
                        <td>Greedo</td>
                        <td>South</td>
                        <td>Scumbag</td>
                      </tr>
                      <tr>
                        <td>Darth Vader</td>
                        <td>Dark</td>
                        <td>Sith</td>
                      </tr>
                    </tbody>
                  </table>

                  <p className="py-2">
                    <a href="...">See More issues...</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ResponsiveContainer width="100%" height={500}>
        <BarChart data={paymentSummery}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="payableAmount" />
          <YAxis />

          <Tooltip />
          <Legend />
          <Bar dataKey="actualamount" fill="#0ee832" />
          <Bar dataKey="delivery" fill="#9a13d4" />
          <Bar dataKey="totalproduct" fill="#eb6abe" />
          <Bar dataKey="shippingTex" fill="#d46511" />
          <Bar dataKey="deliveryTotalCost" fill="#d1d411" />
          <Bar dataKey="payableAmount" fill="#6b74d6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AdminHomePage;
