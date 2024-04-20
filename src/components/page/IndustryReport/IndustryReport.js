import React from "react";

import IndustryData from "../../../utils/IndutryData.json";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Legend,
  Bar,
} from "recharts";
const IndustryReport = () => {
  return (
    <>
      <div className="w-full mx-auto">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
            Cottage Industry Market Report
          </h1>
          <p className="text-gray-600 mt-2">April 2024</p>
        </header>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column - Text */}
          <div className="text-lg text-gray-700 ">
            <p>
              Welcome to the Cottage Industry Market Report for April 2024. This
              report provides an overview of trends, insights, and analysis
              relevant to cottage industries across various sectors.
            </p>
            <p className="mt-4">
              Cottage industries play a vital role in local economies, fostering
              entrepreneurship and creativity.
            </p>
            <p className="mt-4">
              Cottage industries play a vital role in local economies, fostering
              entrepreneurship and creativity.
            </p>
            <p>
              Welcome to the Cottage Industry Market Report for April 2024. This
              report provides an overview of trends, insights, and analysis
              relevant to cottage industries across various sectors.
            </p>
          </div>

          {/* Right Column - Image */}
          <div className="md:order-first">
            <img
              src="https://greener-business.com/wp-content/uploads/2023/04/What-Is-Cottage-Industry-1024x585.jpg"
              alt="Cottage Industry"
              className="rounded-lg shadow-md h-96 w-full"
            />
          </div>
        </div>

        {/* Featured Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Featured Insights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Example Cards with Images */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <img
                src="https://fastercapital.com/i/Handmade-Haven--The-Cottage-Industry-s-Resurgence--The-Challenges-of-Running-a-Cottage-Industry-Business.webp"
                alt="Featured Insight"
                className="h-96 w-full object-cover mb-4 rounded-lg"
              />
              <p className="text-gray-700">Insight 1: Brief description</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4">
              <img
                src="https://fastercapital.com/i/Cottage-Industry-Conundrum--Challenges-and-Solutions--The-Way-Forward-for-Cottage-Industry.webp"
                alt="Featured Insight"
                className="h-96 w-full object-cover mb-4 rounded-lg"
              />
              <p className="text-gray-700">Insight 2: Brief description</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4">
              <img
                src="https://fastercapital.com/i/Cottage-Industry-2-0--Integrating-Technology-for-Growth--Benefits-of-Integrating-Technology-in-Cottage-Industry.webp"
                alt="Featured Insight"
                className="h-96 w-full object-cover mb-4 rounded-lg"
              />
              <p className="text-gray-700">Insight 3: Brief description</p>
            </div>
          </div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={800}>
        <BarChart
          data={IndustryData?.data}
          margin={{ top: 20, right: 50, left: 40, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="country" />
          <XAxis dataKey="growth_rate" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="demand.2015" name="2015" fill="#8884d8" />
          <Bar dataKey="growth_rate.2016" name="2016" fill="#82ca9d" />
          <Bar dataKey="demand.2016" name="2016" fill="#82ca9d" />
          <Bar dataKey="growth_rate.2017" name="2017" fill="#ffc658" />
          <Bar dataKey="demand.2017" name="2017" fill="#ffc658" />
          <Bar dataKey="growth_rate.2018" name="2018" fill="#ff7300" />
          <Bar dataKey="demand.2018" name="2018" fill="#ff7300" />
          <Bar dataKey="growth_rate.2019" name="2019" fill="#0088fe" />
          <Bar dataKey="demand.2019" name="2019" fill="#0088fe" />
          <Bar dataKey="growth_rate.2020" name="2020" fill="#00C49F" />
          <Bar dataKey="demand.2020" name="2020" fill="#00C49F" />
          <Bar dataKey="growth_rate.2021" name="2021" fill="#FFBB28" />
          <Bar dataKey="demand.2021" name="2021" fill="#FFBB28" />
          <Bar dataKey="growth_rate.2022" name="2022" fill="#FF8042" />
          <Bar dataKey="demand.2022" name="2022" fill="#FF8042" />
          <Bar dataKey="growth_rate.2023" name="2023" fill="#FF6666" />
          <Bar dataKey="demand.2023" name="2023" fill="#FF6666" />
          <Bar dataKey="growth_rate.2024" name="2024" fill="#8A2BE2" />
          <Bar dataKey="demand.2024" name="2024" fill="#8A2BE2" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default IndustryReport;
