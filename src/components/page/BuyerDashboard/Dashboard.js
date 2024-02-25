import React from "react";
import { useParams } from "react-router-dom";
import MenuDashbord from "./MenuDashbord";

const Dashboard = () => {
  const { id } = useParams();
  return (
    <>
      <div className="flex">
        <MenuDashbord />

        <div className="w-full px-4 py-2 bg-gray-200 lg:w-full">
          <h1>{id}</h1>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
