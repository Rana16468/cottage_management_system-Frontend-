import React, { useState } from "react";
import MenuDashbord from "../BuyerDashboard/MenuDashbord";
import { Button, Divider, Radio, Table } from "antd";
import { useQuery } from "@tanstack/react-query";
const SellerCategorie = () => {
  const url = `http://localhost:3013/api/v1/specific_user_product`;

  const {
    data: productCategories = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["productCategories"],
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

  console.log(productCategories?.data);
  console.log(isLoading);
  console.log(error);

  const columns = [
    {
      title: "Categorie Name",
      dataIndex: "categorie_name",
      render: (text) => <a href="..">{text}</a>,
    },
    {
      title: "Release Date",
      dataIndex: "release_date",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Status",
      dataIndex: "isCreated",
      render: (data) => {
        return data ? (
          <Button className="">Active</Button>
        ) : (
          <Button>InActive</Button>
        );
      },
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      // Column configuration not to be checked
      name: record.name,
    }),
  };
  const [selectionType, setSelectionType] = useState("checkbox");
  return (
    <>
      <div className="flex">
        <MenuDashbord />
        <div className="w-full px-4 py-2 md:w-full  lg:w-full ">
          <Radio.Group
            onChange={({ target: { value } }) => {
              setSelectionType(value);
            }}
            value={selectionType}>
            <Radio value="checkbox">Checkbox</Radio>
            <Radio value="radio">radio</Radio>
          </Radio.Group>

          <Divider />

          <Table
            rowSelection={{
              type: selectionType,
              ...rowSelection,
            }}
            columns={columns}
            dataSource={productCategories?.data?.map((item) => ({
              ...item,
              key: item._id,
            }))}
          />
        </div>
      </div>
    </>
  );
};

export default SellerCategorie;
