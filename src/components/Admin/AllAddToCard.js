import { useQuery } from "@tanstack/react-query";
import { Button, Image, Spin, Table } from "antd";
import React from "react";
import toast from "react-hot-toast";
import ErrorPage from "../error/ErrorPage";
import { MdAutoDelete } from "react-icons/md";

const AllAddToCard = () => {
  const url = `http://localhost:3013/api/v1/my_addToCard_product`;

  const {
    data: AllAddToCard = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["allProduct"],
    queryFn: async () => {
      try {
        const res = await fetch(url, {
          method: "GET",
          headers: {
            authorization: localStorage.getItem("token"),
          },
        });
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();

        if (data && data.data) {
          return data; // Return the reviews array
        } else {
          toast.error("Data structure from API is invalid");
        }
      } catch (error) {
        toast.error(`Failed to fetch reviews: ${error.message}`);
      }
    },
  });

  // Define columns for the table
  const columns = [
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Brand",
      dataIndex: "brandName",
      key: "brandName",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `$${price}`,
    },
    {
      title: "Image",
      dataIndex: "photo",
      key: "photo",
      render: (photo) => <Image src={photo} width={80} />,
    },
    {
      title: "Email Address",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Total Count",
      dataIndex: "count",
      key: "count",
    },
    {
      title: "Status & Delete",
      key: "x",
      render: (item) => {
        return (
          <>
            {item?.status ? (
              <Button className="    font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">
                Processing
              </Button>
            ) : (
              <Button className="  font-semibold leading-tight text-red-700 bg-red-100 rounded-sm">
                Not Processing{" "}
              </Button>
            )}
            <Button className="ml-2">
              <MdAutoDelete className="text-2xl" />
            </Button>
          </>
        );
      },
    },
  ];

  return (
    <>
      {isLoading && <Spin />}
      {error && <ErrorPage />}
      {AllAddToCard.status && (
        <Table
          dataSource={AllAddToCard?.data}
          columns={columns}
          pagination={{ pageSize: 10 }}
          scroll={{ x: 1500 }} // Optional: Set horizontal scroll if needed
        />
      )}
    </>
  );
};

export default AllAddToCard;
