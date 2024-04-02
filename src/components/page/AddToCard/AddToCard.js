import React, { useContext, useState } from "react";
import MenuDashbord from "../BuyerDashboard/MenuDashbord";
import { useQuery } from "@tanstack/react-query";
import { Spin } from "antd";
import ErrorPage from "../../error/ErrorPage";
import { FaPlusCircle } from "react-icons/fa";
import { FaMinusCircle } from "react-icons/fa";
import toast from "react-hot-toast";
import AllDistrict from "../../../utils/AllDistrict";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import {
  ProductCalculation,
  ProductCalculationLength,
} from "../../reusable/ProductCalculation";
import { TiDeleteOutline } from "react-icons/ti";
import Swal from "sweetalert2";
import TimeCalculation from "../../../utils/TimeCalculation";
import { FaAmazonPay } from "react-icons/fa6";
import { Link } from "react-router-dom";

const AddToCard = () => {
  const {
    user: { displayName, email },
  } = useContext(AuthContext);

  const [totalDeliveryCost, setTotalDeliveryCost] = useState(0);

  const {
    data: MyAddToCard = [],
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["MyAddToCard"],
    queryFn: async () => {
      const res = await fetch(
        "http://localhost:3013/api/v1/my_addToCard_product",
        {
          method: "GET",
          headers: {
            authorization: localStorage.getItem("token"),
          },
        }
      );
      const data = await res.json();
      return data?.data;
    },
    refetchInterval: 1000,
  });

  const increment = (id, count) => {
    AddToCount(id, count + 1, process.env.REACT_APP_increment);
  };

  // Function to handle decrement
  const decrement = (id, count) => {
    AddToCount(id, count - 1, process.env.REACT_APP_decrement);
  };

  const AddToCount = (id, count, condition) => {
    fetch(`http://localhost:3013/api/v1/add_to_product_count/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({ condition, count }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("API ERROR");
        }
        return res.json();
      })
      .then((data) => {
        toast.success(data?.message);
      })
      .catch((error) => {
        toast.error(error?.message);
      });
  };

  const handelDailvary = (event) => {
    event.preventDefault();
    const element = event.target;

    const name = element.name.value;
    const email = element.email.value;
    const currency = element.currency.value;
    const number = element.number.value;
    const shippingCost = Number(element.shippingCost.value);
    const date = element.date.value;
    const districtAnddelivery = element.district.value;
    const district = districtAnddelivery.split("-")[0];
    const delivery = Number(districtAnddelivery.split("-")[1]);
    const address = element.address.value;
    const totalproduct = ProductCalculationLength(MyAddToCard);
    const shippingTex = shippingCost * totalproduct;
    const deliveryTotalCost = totalproduct * delivery;
    const actualamount = ProductCalculation(MyAddToCard);
    const payableAmount = actualamount + shippingTex + deliveryTotalCost;
    setTotalDeliveryCost(deliveryTotalCost);
    const orderSummery = {
      name,
      email,
      currency,
      number,
      shippingCost,
      date,
      district,
      address,
      delivery,
      actualamount,
      totalproduct,
      shippingTex,
      deliveryTotalCost,
      payableAmount,
      productId: MyAddToCard?.filter((v) => v?.count >= 1).map((v) => v?._id),
    };

    if (orderSummery.actualamount > 0) {
      fetch("http://localhost:3013/api/v1/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify(orderSummery),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("API ERROR");
          }
          return res.json();
        })
        .then((data) => {
          window.open(data?.url, "_blank");
        })
        .catch((error) => {
          toast.error(error?.message);
        });
    } else {
      toast.error("Add Your Product Quentity");
    }
  };

  const handelDeleteItem = (id, count, email, subcategorieId) => {
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
        fetch(`http://localhost:3013/api/v1/delete_add_to_cardItem/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            authorization: localStorage.getItem("token"),
          },
          body: JSON.stringify({ count, email, subcategorieId }),
        })
          .then((res) => {
            if (!res.ok) {
              throw new Error("API ERROR");
            }
            return res.json();
          })
          .then((data) => {
            toast.success(data.message);
            refetch();
          })
          .catch((error) => {
            toast.error(error?.message);
          });
      }
    });
  };

  return (
    <>
      <div className="flex">
        <MenuDashbord />
        <div className="w-full px-4 py-2 md:w-full  lg:w-full ">
          {isLoading && <Spin />}
          {error && <ErrorPage />}
          <section className=" relative z-10 after:contents-[''] after:absolute after:z-0 after:h-full xl:after:w-1/3 after:top-0 after:right-0 after:bg-gray-50">
            <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto relative z-10">
              <div className="grid grid-cols-12">
                <div className="col-span-12 xl:col-span-8 lg:pr-8 pt-14 pb-8 lg:py-24 w-full max-xl:max-w-3xl max-xl:mx-auto">
                  <div className="flex items-center justify-between pb-8 border-b border-gray-300">
                    <h2 className="font-manrope font-bold text-3xl leading-10 text-black">
                      Shopping Cart
                    </h2>
                    <h2 className="font-manrope font-bold text-3xl leading-10 text-black">
                      {MyAddToCard?.length}
                    </h2>
                  </div>
                  <div className="grid grid-cols-12 mt-8 max-md:hidden pb-6 border-b border-gray-200">
                    <div className="col-span-12 md:col-span-7">
                      <p className="font-normal text-lg leading-8 text-gray-400">
                        Product Details
                      </p>
                    </div>
                    <div className="col-span-12 md:col-span-5">
                      <div className="grid grid-cols-5">
                        <div className="col-span-3">
                          <p className="font-normal text-lg leading-8 text-gray-400 text-center">
                            Quantity
                          </p>
                        </div>
                        <div className="col-span-2">
                          <p className="font-normal text-lg leading-8 text-gray-400 text-center">
                            Total
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {MyAddToCard?.map((v, index) => (
                    <div
                      key={index}
                      className="flex flex-col min-[500px]:flex-row min-[500px]:items-center gap-5 py-6  border-b border-gray-200">
                      <div className="w-full md:max-w-[126px]">
                        <img src={v?.photo} alt="..." className="mx-auto" />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-4 w-full">
                        <div className="md:col-span-2">
                          <div className="flex flex-col max-[500px]:items-center gap-3">
                            <h6 className="font-semibold text-base leading-7 text-black">
                              #BrandName:{v?.brandName}
                            </h6>
                            <h6 className="font-normal text-base leading-7 text-gray-500">
                              #Product Name: {v?.name}
                            </h6>
                            <div className="flex justify-around">
                              <h6 className="font-semibold text-base leading-7 text-indigo-600">
                                #price:{v?.price}
                              </h6>
                              <button
                                onClick={() =>
                                  handelDeleteItem(
                                    v?._id,
                                    v?.count,
                                    v?.email,
                                    v?.subcategorieId
                                  )
                                }
                                className="ml-3 btn btn-outline btn-error btn-xs">
                                <TiDeleteOutline className="text-xl" />
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center max-[500px]:justify-center h-full max-md:mt-3">
                          <div className="flex items-center h-full">
                            <button
                              onClick={() => increment(v?._id, v?.count)}
                              className="group rounded-l-full px-5 py-[10px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-green-500 hover:border-gray-300 hover:shadow-gray-300 focus-within:outline-gray-300">
                              <FaPlusCircle className="text-2xl" />
                            </button>
                            <button
                              onClick={() => decrement(v?._id, v?.count)}
                              className="group rounded-r-full px-5   py-[10px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-red-500 hover:border-gray-300 hover:shadow-gray-300 focus-within:outline-gray-300">
                              <FaMinusCircle className="text-2xl" />
                            </button>
                            <input
                              type="number"
                              className="border-spacing-52 rounded border-gray-200 outline-none text-gray-900 font-semibold text-lg w-full max-w-[70px] min-w-[70px] placeholder:text-gray-900 py-[15px]  text-center bg-transparent"
                              readOnly
                              placeholder={v?.count}
                            />
                          </div>
                        </div>
                        <div className="flex items-center max-[500px]:justify-center md:justify-end max-md:mt-3 h-full">
                          <p className="font-bold text-lg leading-8 text-indigo-600 text-center">
                            {v?.price * v?.count}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="flex items-center justify-end mt-8">
                    <button className="flex items-center px-5 py-3 rounded-full gap-2 border-none outline-0 font-semibold text-lg leading-8 text-indigo-600 shadow-sm shadow-transparent transition-all duration-500 hover:shadow-indigo-300 hover:bg-indigo-50">
                      Add Coupon Code
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none">
                        <path
                          d="M12.7757 5.5L18.3319 11.0562M18.3319 11.0562L12.7757 16.6125M18.3319 11.0562L1.83203 11.0562"
                          stroke="#4F46E5"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className=" col-span-12 xl:col-span-4 bg-gray-50 w-full max-xl:px-6 max-w-3xl xl:max-w-lg mx-auto lg:pl-8 py-24">
                  <h2 className="font-manrope font-bold text-3xl leading-10 text-black pb-8 border-b border-gray-300">
                    Order Summary
                  </h2>
                  <div className="mt-8">
                    <div className="flex items-center justify-between pb-6">
                      <p className="font-normal text-lg leading-8 text-black">
                        {ProductCalculationLength(MyAddToCard)}
                      </p>
                      <p className="font-medium text-lg leading-8 text-black">
                        {ProductCalculation(MyAddToCard)}
                      </p>
                    </div>
                    <form onSubmit={handelDailvary}>
                      {/* user name  */}
                      <label className="flex items-center mb-1.5 text-gray-400 text-sm font-medium">
                        User Name
                      </label>
                      <div className="flex pb-6">
                        <div className="relative w-full">
                          <div className=" absolute left-0 top-0 py-3 px-4">
                            <span className="font-normal text-base text-gray-300">
                              User Name
                            </span>
                          </div>
                          <input
                            type="text"
                            name="name"
                            className="block w-full h-11 pr-10 pl-36 min-[500px]:pl-52 py-2.5 text-base font-normal shadow-xs text-gray-900 bg-white border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-gray-400"
                            readOnly
                            defaultValue={displayName}
                            required
                          />
                        </div>
                      </div>
                      {/* email  */}
                      <label className="flex items-center mb-1.5 text-gray-400 text-sm font-medium">
                        Email Address
                      </label>
                      <div className="flex pb-6">
                        <div className="relative w-full">
                          <div className=" absolute left-0 top-0 py-3 px-4">
                            <span className="font-normal text-base text-gray-300">
                              User Email
                            </span>
                          </div>
                          <input
                            type="text"
                            name="email"
                            className="block w-full h-11 pr-10 pl-36 min-[500px]:pl-52 py-2.5 text-base font-normal shadow-xs text-gray-900 bg-white border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-gray-400"
                            readOnly
                            defaultValue={email}
                            required
                          />
                        </div>
                      </div>
                      <label className="flex  items-center mb-1.5 text-gray-600 text-sm font-medium">
                        Shipping & Tex
                      </label>
                      <div className="flex pb-6">
                        <div className="relative w-full">
                          <div className=" absolute left-0 top-0 py-3 px-4">
                            <span className="font-normal text-base text-gray-300">
                              ShippingCost && Tex
                            </span>
                          </div>
                          <input
                            type="text"
                            className="block w-full h-11 pr-10 pl-36 min-[500px]:pl-52 py-2.5 text-base font-normal shadow-xs text-gray-900 bg-white border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-gray-400"
                            placeholder="$5.00"
                            name="shippingCost"
                            defaultValue={25}
                            readOnly
                            required
                          />
                        </div>
                      </div>
                      <label className="flex items-center mb-1.5 text-gray-400 text-sm font-medium">
                        Order Date
                      </label>
                      <div className="flex pb-4 w-full">
                        <div className="relative w-full ">
                          <div className=" absolute left-0 top-0 py-2.5 px-4 text-gray-300"></div>
                          <input
                            type="text"
                            className="block w-full h-11 pr-11 pl-5 py-2.5 text-base font-normal shadow-xs text-gray-900 bg-white border border-gray-300 rounded-lg placeholder-gray-500 focus:outline-gray-400 "
                            defaultValue={TimeCalculation()}
                            name="date"
                            required
                          />
                        </div>
                      </div>

                      <label className="flex items-center mb-1.5 text-gray-400 text-sm font-medium">
                        District | Delivery_charges
                      </label>
                      <div className="flex pb-4 w-full">
                        <div className="relative w-full ">
                          <div className=" absolute left-0 top-0 py-2.5 px-4 text-gray-300"></div>
                          <select
                            name="district"
                            required
                            className="select select-bordered select-sm w-full h-11 pr-11 pl-5 py-2.5 text-base font-normal shadow-xs text-gray-900 bg-white border border-gray-300 rounded-lg placeholder-gray-500 focus:outline-gray-400">
                            <option disabled>District Name</option>
                            {AllDistrict?.map((v, index) => (
                              <option
                                value={`${v.district_name}-${v.delivery_charges}`}
                                key={index}>
                                {v.district_name} | {v.bn_name} - Delivery :{" "}
                                {v.delivery_charges}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <label className="flex items-center mb-1.5 text-gray-400 text-sm font-medium">
                        Actual Address
                      </label>
                      <div className="flex pb-4 w-full">
                        <div className="relative w-full ">
                          <div className=" absolute left-0 top-0 py-2.5 px-4 text-gray-300"></div>
                          <input
                            type="text"
                            name="address"
                            required
                            className="block w-full h-11 pr-11 pl-5 py-2.5 text-base font-normal shadow-xs text-gray-900 bg-white border border-gray-300 rounded-lg placeholder-gray-500 focus:outline-gray-400 "
                            placeholder="xxxx xxxx xxxx"
                          />
                        </div>
                      </div>
                      {/* payment Currency */}
                      <label className="flex items-center mb-1.5 text-gray-400 text-sm font-medium">
                        Currency
                      </label>
                      <div className="flex pb-4 w-full">
                        <div className="relative w-full ">
                          <div className=" absolute left-0 top-0 py-2.5 px-4 text-gray-300"></div>
                          <select
                            name="currency"
                            required
                            className="select select-bordered select-sm w-full h-11 pr-11 pl-5 py-2.5 text-base font-normal shadow-xs text-gray-900 bg-white border border-gray-300 rounded-lg placeholder-gray-500 focus:outline-gray-400">
                            <option disabled>Choose a Curreny</option>
                            <option>BDT</option>
                            <option>USD</option>
                            <option>RMB</option>
                            <option>Euro</option>
                          </select>
                        </div>
                      </div>

                      <label className="flex  items-center mb-1.5 text-gray-600 text-sm font-medium">
                        Contruct Number
                      </label>
                      <div className="flex pb-6">
                        <div className="relative w-full">
                          <div className=" absolute left-0 top-0 py-3 px-4">
                            <span className="font-normal text-base text-gray-300">
                              Contruct Number
                            </span>
                          </div>
                          <input
                            type="number"
                            className="block w-full h-11 pr-10 pl-36 min-[500px]:pl-52 py-2.5 text-base font-normal shadow-xs text-gray-900 bg-white border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-gray-400"
                            placeholder="018/017/019/015/016"
                            name="number"
                            required
                          />
                        </div>
                      </div>
                      <div className="flex items-center border-b border-gray-200">
                        <button
                          type="submit"
                          className="btn btn-outline  bg-blue-100  btn-primary w-full btn-sm">
                          Pay Now <FaAmazonPay className="text-xl" />
                        </button>
                      </div>
                    </form>

                    <h1 className="text-xl font-serif text-center m-1">
                      Total Payment Summay
                    </h1>
                    <div className="flex justify-between border-b border-gray-200">
                      <p className="font-normal text-lg leading-8 text-gray-400">
                        Total Product
                      </p>
                      <p className="font-normal text-lg leading-8 text-gray-400">
                        Total Price
                      </p>
                    </div>
                    <div className="flex items-center justify-between py-8">
                      <p className="font-medium text-xl leading-8 text-black">
                        {ProductCalculationLength(MyAddToCard)}
                      </p>
                      <p className="font-semibold text-xl leading-8 text-indigo-600">
                        {ProductCalculation(MyAddToCard) +
                          25 * ProductCalculationLength(MyAddToCard) +
                          totalDeliveryCost}
                      </p>
                      <Link to="/payment">
                        {" "}
                        <button>Payment Success</button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default AddToCard;
