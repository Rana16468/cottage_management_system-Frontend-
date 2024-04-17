import { Image, Space, Spin, Table } from "antd";
import React, { useState } from "react";
import toast from "react-hot-toast";

const PaymentSchedule = () => {
  const [paymentReport, SetPaymentReport] = useState({});
  const [isLoading, setLoading] = useState(true);

  const handelPaymentSchedule = (report) => {
    fetch(
      `http://localhost:3013/api/v1/admin/payment_schedule_information?interval=${report}`,
      {
        method: "GET",
        headers: {
          authorization: localStorage.getItem("token"),
        },
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("API Error");
        }
        return res.json();
      })
      .then((data) => {
        SetPaymentReport(data);
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
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
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select your country
        </label>
        <select
          id="tabs"
          name="selectedJob"
          className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-30 p-2.5  bg-blue-900 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option value="none">All Sales </option>
          <option value="Internship">Deaily Sales</option>
          <option value="Fresher">Weekly Sales</option>
          <option value="Semi-Experiences">Monthly Sales</option>
          <option value="Experiences">Yearly Sales</option>
        </select>
      </div>
      <ul className="mb-3 hidden text-sm font-medium text-center bg-blue-900 text-gray-500 divide-x divide-gray-200  shadow sm:flex dark:divide-gray-700 dark:text-gray-400">
        <li className="w-full">
          <button
            onClick={() => handelPaymentSchedule("daily")}
            className="inline-block w-full p-4 text-gray-900  focus:ring-4 focus:ring-blue-300 active focus:outline-none  bg-blue-900 dark:text-white hover:bg-primary"
            aria-current="page">
            Deaily Sales
          </button>
        </li>
        <li className="w-full">
          <button
            onClick={() => handelPaymentSchedule("weekly")}
            className="inline-block w-full p-4  hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:hover:text-white bg-blue-900 dark:hover:bg-blue-700">
            Weekly Sales
          </button>
        </li>
        <li className="w-full">
          <button
            onClick={() => handelPaymentSchedule("monthly")}
            className="inline-block w-full p-4 hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:hover:text-white  bg-blue-900 dark:hover:bg-blue-700">
            Monthly Sales
          </button>
        </li>
        <li className="w-full">
          <button
            onClick={() => handelPaymentSchedule("yearly")}
            className="inline-block w-full p-4  rounded-r-lg hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:hover:text-white  bg-blue-900 dark:hover:bg-blue-700">
            Yearly Sales
          </button>
        </li>
      </ul>
      {isLoading && <Spin />}
      {isLoading && (
        <img
          className="w-full"
          src="https://www.firmofthefuture.com/oidam/intuit/sbseg/en_us/Blog/Photography/Stock/invoicing-quickbooks-online-advanced-part-2.png"
          alt=""></img>
      )}
      {paymentReport?.status && (
        <Table
          columns={columns}
          dataSource={paymentReport?.data}
          rowKey="_id"
          pagination={{ pageSize: 10 }}
          scroll={{ x: 1500 }} // Optional: Set horizontal scroll if needed
        />
      )}
    </>
  );
};

export default PaymentSchedule;
