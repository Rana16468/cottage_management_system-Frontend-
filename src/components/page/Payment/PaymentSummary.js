import React from "react";
import MenuDashbord from "../BuyerDashboard/MenuDashbord";
import { useQuery } from "@tanstack/react-query";
import { Spin } from "antd";
import ErrorPage from "../../error/ErrorPage";
import { TbListDetails } from "react-icons/tb";
import { GrTransaction } from "react-icons/gr";
import { AiFillPrinter } from "react-icons/ai";
const PaymentSummary = () => {
  const {
    data: paymentSummery = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ["categoricalProduct"],
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
      return data;
    },
  });

  return (
    <>
      <div className="flex">
        <MenuDashbord />
        <div className="w-full px-6 py-3 md:w-full  lg:w-full ">
          {isLoading && <Spin />}
          {error && <ErrorPage />}
          {paymentSummery?.data?.length === 0 && (
            <div className=" flex justify-center">
              <div className="text-center">
                <h2 className="text-3xl font-extrabold text-gray-900">
                  Payment Details Not Available
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                  Thank you for your purchase!
                </p>
              </div>
            </div>
          )}

          <div className="max-w-xl mx-auto p-6">
            <h2 className="text-2xl font-serif mb-4">My Payment Summery</h2>
            <div className="grid grid-cols-1 gap-4">
              {paymentSummery?.success &&
                paymentSummery?.data?.map((order, index) => (
                  <div
                    key={order?._id}
                    className="border border-gray-300 rounded p-4">
                    <h3 className="flex  justify-between text-lg font-semibold mb-2">
                      Payment Details {index + 1}
                      <TbListDetails className="text-3xl bg-blue-200 rounded" />
                    </h3>
                    <p>Name: {order?.name}</p>
                    <p>Email: {order?.email}</p>
                    <p>
                      Address: {order?.address}, {order.district}
                    </p>
                    <p>Total Products: {order?.totalproduct}</p>
                    <p>
                      Actual Amount: {order?.actualamount} {order.currency}
                    </p>
                    <p>
                      Shipping Cost: {order?.shippingCost} {order.currency}
                    </p>
                    <p>
                      Shipping Tax: {order?.shippingTex} {order.currency}
                    </p>
                    <p>
                      Delivery Cost: {order?.deliveryTotalCost} {order.currency}
                    </p>
                    <p>
                      Payable Amount: {order?.payableAmount} {order.currency}
                    </p>
                    <p>
                      Paid Status:{" "}
                      {order?.paidStatus ? (
                        <button className="btn bg-blue-200 btn-xs">Paid</button>
                      ) : (
                        "Not Paid"
                      )}
                    </p>
                    <p className="flex justify-between">
                      Transaction ID: {order?.transactionID}
                      <GrTransaction className="text-3xl bg-green-400 rounded" />
                    </p>
                    <div className="flex justify-center">
                      <button className="btn btn-outline btn-accent btn-sm">
                        <AiFillPrinter className="text-xl" />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentSummary;
