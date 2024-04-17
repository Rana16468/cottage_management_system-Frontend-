import { useQuery } from "@tanstack/react-query";
import { Image, Spin, Table } from "antd";
import React, { useEffect, useState } from "react";
import ErrorPage from "../error/ErrorPage";
import toast from "react-hot-toast";
import yourhandle from "countrycitystatejson";

const AllDeliveryDetails = () => {
  const [country, setCountries] = useState([]);
  const {
    data: deliverysReports = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ["deliverysReports"],
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

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => setCountries(data))
      .catch((error) => {
        toast.error("Country App Error");
      });
  }, []);
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const distractName = userTimeZone.split("/")[1];

  const countryDetails =
    yourhandle.getCountries().find((v) => v.capital === distractName) || {};
  const { startOfWeek, maps } =
    country?.find((v) => v.name.common === countryDetails?.name) || {};

  const columns = [
    {
      title: "Success",
      dataIndex: "x",
      key: "x",
      render: () => (
        <Image
          src="https://png.pngtree.com/png-clipart/20230509/original/pngtree-fast-delivery-label-design-png-image_9153915.png"
          width={80}
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
      title: "Delivery_Total ",
      dataIndex: "deliveryTotalCost",
      key: "deliveryTotalCost",
    },
    {
      title: "Product Price",
      dataIndex: "payableAmount",
      key: "payableAmount",
    },
    {
      title: "Transaction_Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Start Week",
      dataIndex: "x",
      key: "x",
      render: () => ` ${startOfWeek}`,
    },
    {
      title: "Google_Map",
      dataIndex: "x",
      key: "x",
      render: () => (
        <a
          target="_blank"
          rel="noreferrer"
          className="btn btn-outline btn-sm"
          href={maps?.googleMaps}>
          Google Map
        </a>
      ),
    },
    {
      title: "Open_Street_Maps",
      dataIndex: "district",
      key: "district",
      render: (district) => {
        return (
          <a
            target="_blank"
            rel="noreferrer"
            className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm"
            href={`https://www.openstreetmap.org/search?query=${district}`}>
            Open Street
          </a>
        );
      },
    },
  ];

  return (
    <>
      {isLoading && <Spin />}
      {error && <ErrorPage />}
      {deliverysReports?.status && (
        <div>
          <Table
            columns={columns}
            dataSource={deliverysReports.data}
            rowKey="_id"
            pagination={{ pageSize: 10 }}
            scroll={{ x: 1500 }}
          />
        </div>
      )}
    </>
  );
};

export default AllDeliveryDetails;
