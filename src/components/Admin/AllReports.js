import { useQuery } from "@tanstack/react-query";
import { Button, Spin, Table } from "antd";
import React from "react";
import ErrorPage from "../error/ErrorPage";
import { FaResolving } from "react-icons/fa6";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
const AllReports = () => {
  const {
    data: allReport = [],
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [" allReport"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:3013/api/v1/user_report`, {
        method: "GET",
        headers: {
          authorization: localStorage.getItem("token"),
        },
      });
      const data = await res.json();
      return data?.data;
    },
  });

  const handelResolvingReport = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
        fetch(`http://localhost:3013/api/v1/delete_report/${id}`, {
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
      }
    });
  };

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Username",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Details",
      dataIndex: "details",
      key: "details",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Buyer Email",
      dataIndex: "buyerEmail",
      key: "buyerEmail",
      render: (buyerEmail) => {
        return buyerEmail ? (
          <p className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">
            {buyerEmail}
          </p>
        ) : (
          <p className="px-2 py-1 font-semibold leading-tight text-red-500 bg-green-100 rounded-sm">
            N/A
          </p>
        );
      },
    },
    {
      title: "Transaction ID",
      dataIndex: "transactionID",
      key: "transactionID",
      render: (tId) => {
        return tId ? (
          <p className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">
            {tId}
          </p>
        ) : (
          <p className="px-2 py-1 font-semibold leading-tight text-red-500 bg-green-100 rounded-sm">
            N/A
          </p>
        );
      },
    },
    {
      title: "Product ID",
      dataIndex: "productId",
      key: "productId",
      render: (product) => {
        return product ? (
          <p className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">
            {product}
          </p>
        ) : (
          <p className="px-2 py-1 font-semibold leading-tight text-red-500 bg-green-100 rounded-sm">
            N/A
          </p>
        );
      },
    },
    {
      title: "Problem",
      dataIndex: "problem",
      key: "problem",
      render: (problem) => {
        return problem ? (
          <p className="px-2 py-1 font-semibold leading-tight text-blue-900 bg-blue-300 rounded-sm">
            {problem}
          </p>
        ) : (
          <p className="px-2 py-1 font-semibold leading-tight text-red-500 bg-green-100 rounded-sm">
            N/A
          </p>
        );
      },
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role) => {
        return role === "buyer" ? (
          <p className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">
            {role}
          </p>
        ) : (
          <p className="px-2 py-1 font-semibold leading-tight text-red-700 bg-green-100 rounded-sm">
            {role}
          </p>
        );
      },
    },
    {
      title: "Resolve",
      dataIndex: "_id",
      key: "_id",
      render: (id) => {
        return (
          <Button
            onClick={() => handelResolvingReport(id)}
            className="bg-red-500">
            <FaResolving className="text-xl" />
          </Button>
        );
      },
    },
  ];

  return (
    <>
      {isLoading && <Spin />}
      {error && <ErrorPage />}
      <Table
        columns={columns}
        dataSource={allReport}
        rowKey={(record) => record._id}
        pagination={{ pageSize: 10 }}
        scroll={{ x: "100%" }}
      />
    </>
  );
};

export default AllReports;
