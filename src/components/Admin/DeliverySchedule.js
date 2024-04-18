import { Button, Image, Spin, Table } from "antd";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import yourhandle from "countrycitystatejson";
import { useReactToPrint } from "react-to-print";
import { TbTruckDelivery } from "react-icons/tb";
const DeliverySchedule = () => {
  const [deliveryReport, SetDeliverReport] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [country, setCountries] = useState([]);

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
        SetDeliverReport(data);
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

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
      title: "Number",
      dataIndex: "number",
      key: "number",
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

  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Ant Design Table (Printed)",
    copyStyles: true,
  });

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
      <ul className="mb-3 hidden text-sm font-medium text-center bg-blue-900 text-gray-900 divide-x divide-gray-200  shadow sm:flex dark:divide-blue-700 dark:text-gray-400">
        <li className="w-full">
          <button
            onClick={() => handelPaymentSchedule("daily")}
            className="inline-block w-full p-4 text-gray-900  focus:ring-4 focus:ring-blue-300 active focus:outline-none  bg-blue-900 dark:text-white hover:bg-primary"
            aria-current="page">
            Deaily Delivery
          </button>
        </li>
        <li className="w-full">
          <button
            onClick={() => handelPaymentSchedule("weekly")}
            className="inline-block w-full p-4  hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:hover:text-white bg-blue-900 dark:hover:bg-blue-700">
            Weekly Delivery
          </button>
        </li>
        <li className="w-full">
          <button
            onClick={() => handelPaymentSchedule("monthly")}
            className="inline-block w-full p-4 hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:hover:text-white  bg-blue-900 dark:hover:bg-blue-700">
            Monthly Delivery
          </button>
        </li>
        <li className="w-full">
          <button
            onClick={() => handelPaymentSchedule("yearly")}
            className="inline-block w-full p-4  rounded-r-lg hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:hover:text-white  bg-blue-900 dark:hover:bg-blue-700">
            Yearly Delivery
          </button>
        </li>
      </ul>

      {isLoading && <Spin />}
      {isLoading && (
        <>
          <section className="bg-center bg-no-repeat bg-[url('https://c8.alamy.com/comp/2BH5JYH/shopping-online-concept-cargo-truck-and-delivery-report-and-pencil-over-white-background-colorful-design-vector-illustration-2BH5JYH.jpg')] bg-pink-00 bg-blend-multiply">
            <div className="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56"></div>
          </section>
          <img
            className="w-full"
            src="https://cdn3.vectorstock.com/i/1000x1000/96/12/delivery-report-line-icon-parcel-documents-sign-vector-46429612.jpg"
            alt=""></img>
        </>
      )}

      <Table dataSource={deliveryReport?.data} columns={columns} />
      <div className=" flex justify-center">
        <Button
          className=" btn bg-sky-200 btn-outline btn-md"
          type="primary"
          onClick={handlePrint}>
          Generate Delivery Report <TbTruckDelivery className="text-3xl" />
        </Button>
      </div>
      <div style={{ display: "none" }}>
        <ComponentToPrint ref={componentRef}>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    District
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Address
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cost
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {deliveryReport?.data?.map((item) => (
                  <tr key={item._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item?.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item?.number}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item?.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item?.district}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item?.address}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item?.delivery}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ComponentToPrint>
      </div>
    </>
  );
};

export default DeliverySchedule;

const ComponentToPrint = React.forwardRef((props, ref) => (
  <div ref={ref} {...props}>
    {/* Your printable content goes here */}
  </div>
));
