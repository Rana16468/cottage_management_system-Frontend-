import { useQuery } from "@tanstack/react-query";
import { Image, Spin, Table } from "antd";
import React from "react";
import ErrorPage from "../error/ErrorPage";

const AllWishList = () => {
  const url = `http://localhost:3013/api/v1/find_my_wish_list`;

  const {
    data: myWishList = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ["myWishList"],
    queryFn: async () => {
      const res = await fetch(url, {
        method: "GET",
        headers: {
          authorization: localStorage.getItem("token"),
        },
      });
      const data = await res.json();
      return data;
    },
  });

  const columns = [
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `$${price}`,
    },
    {
      title: "Sales Of",
      dataIndex: "salesOf",
      key: "salesOf",
    },
    {
      title: "Brand",
      dataIndex: "brandName",
      key: "brandName",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Photo",
      dataIndex: "photo",
      key: "photo",
      render: (photo) => <Image src={photo} width={80} />,
    },
    {
      title: "Selling Price",
      dataIndex: "sellingPrice",
      key: "sellingPrice",
      render: (sellingPrice) => `$${sellingPrice}`,
    },
    {
      title: "Email Address",
      dataIndex: "email",
      key: "email",
    },
  ];

  return (
    <>
      {isLoading && <Spin />}
      {error && <ErrorPage />}
      {myWishList?.status && (
        <Table
          columns={columns}
          dataSource={myWishList?.data}
          rowKey="_id"
          pagination={{ pageSize: 10 }}
          scroll={{ x: 1500 }} // Optional: Set horizontal scroll if needed
        />
      )}
    </>
  );
};

export default AllWishList;
