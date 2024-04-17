import { useQuery } from "@tanstack/react-query";
import { Button, Image, Space, Spin, Table } from "antd";
import React from "react";
import ErrorPage from "../error/ErrorPage";
import { MdAutoDelete } from "react-icons/md";
import toast from "react-hot-toast";
const AllReviwes = () => {
  const url = `http://localhost:3013/api/v1/admin/all_reviwes`;

  const {
    data: allReviwes = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["allReviwes"],
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
  const handelReviewDelete = (id) => {
    fetch(`http://localhost:3013/api/v1/review_delete/${id}`, {
      method: "DELETE",
      headers: {
        authorization: localStorage.getItem("token"),
      },
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
  };

  const reviewColumns = [
    {
      title: "Details",
      dataIndex: "review",
      key: "review",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Delete",
      key: "x",
      render: (item) => {
        return (
          <Button onClick={() => handelReviewDelete(item?._id)}>
            <MdAutoDelete className="text-2xl" />
          </Button>
        );
      },
    },
  ];

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
      title: "Quantity",
      dataIndex: "quentity",
      key: "quentity",
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
      title: "Review",
      dataIndex: "productInfo",
      key: "productInfo",
      render: (productInfo) => (
        <Space direction="vertical">
          <Table
            columns={reviewColumns}
            dataSource={productInfo}
            rowKey="_id"
            pagination={{ pageSize: 5 }}
          />
        </Space>
      ),
    },
  ];

  return (
    <>
      {isLoading && <Spin />}
      {error && <ErrorPage />}
      {allReviwes?.status && (
        <Table
          columns={columns}
          dataSource={allReviwes?.data}
          rowKey="_id"
          pagination={{ pageSize: 10 }}
          scroll={{ x: 1500 }} // Optional: Set horizontal scroll if needed
        />
      )}
    </>
  );
};

export default AllReviwes;
