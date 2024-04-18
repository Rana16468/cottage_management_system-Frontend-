import { useQuery } from "@tanstack/react-query";
import { Image, Space, Spin, Table } from "antd";
import React from "react";
import ErrorPage from "../error/ErrorPage";

const AllPaymentInfo = () => {
  const {
    data: paymentSummery = [],
    error,
    isLoading,
  } = useQuery({
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
      return data;
    },
  });

  const columns = [
    {
      title: "Success",
      dataIndex: "x",
      key: "x",
      render: () => (
        <Image
          src="https://icons.veryicon.com/png/o/business/third-party-sharing-payment/wechat-payment-1.png"
          width={30}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "District",
      dataIndex: "district",
      key: "district",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Number",
      dataIndex: "number",
      key: "number",
    },
    {
      title: "Delivery_Cost",
      dataIndex: "delivery",
      key: "delivery",
    },
    {
      title: "Actual_Amount",
      dataIndex: "actualamount",
      key: "actualamount",
      render: (amount) => `BDT ${amount}`,
    },
    {
      title: "Total_Products",
      dataIndex: "totalproduct",
      key: "totalproduct",
    },
    {
      title: "Shipping_Cost",
      dataIndex: "shippingCost",
      key: "shippingCost",
    },
    {
      title: "Tex&Vat",
      dataIndex: "shippingTex",
      key: "shippingTex",
    },
    {
      title: "Delivery_Total ",
      dataIndex: "deliveryTotalCost",
      key: "deliveryTotalCost",
    },
    {
      title: "Payable_Amount",
      dataIndex: "payableAmount",
      key: "payableAmount",
    },
    {
      title: "Status",
      dataIndex: "paidStatus",
      key: "paidStatus",
      render: (paid) =>
        paid ? (
          <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">
            Paid
          </span>
        ) : (
          <span className="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-sm">
            {" "}
            Unpaid
          </span>
        ),
    },
    {
      title: "Transaction ID",
      dataIndex: "transactionID",
      key: "transactionID",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Product IDs",
      dataIndex: "productId",
      key: "productId",
      render: (productIds) => (
        <Space direction="vertical">
          {productIds?.map((id, index) => (
            <div key={id}>
              <p className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">
                Product Id : {id}
                <button className="btn btn-xs text-white bg-blue-900">
                  Product {index + 1}
                </button>
              </p>
            </div>
          ))}
        </Space>
      ),
    },
  ];

  return (
    <>
      {isLoading && <Spin />}
      {error && <ErrorPage />}
      {paymentSummery?.status && (
        <Table
          columns={columns}
          dataSource={paymentSummery?.data}
          rowKey="_id"
          pagination={{ pageSize: 10 }}
          scroll={{ x: 1500 }} // Optional: Set horizontal scroll if needed
        />
      )}
    </>
  );
};

export default AllPaymentInfo;
