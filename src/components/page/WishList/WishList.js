import React from "react";
import MenuDashbord from "../BuyerDashboard/MenuDashbord";
import { useQuery } from "@tanstack/react-query";
import { Card, Col, Row } from "antd";
import { Button, Spin } from "antd";
import "./style.css";
import ErrorPage from "../../error/ErrorPage";
import { TbHttpDelete } from "react-icons/tb";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
const WishList = () => {
  const url = `http://localhost:3013/api/v1/find_my_wish_list`;

  const {
    data: myWishList = [],
    error,
    isLoading,
    refetch,
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
    refetchInterval: 1000,
  });

  const handelDeleteWishList = (id) => {
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
        fetch(`http://localhost:3013/api/v1/delete_wish_list/${id}`, {
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

  const handelAddToCartFromWishList = (product) => {
    fetch("http://localhost:3013/api/v1/addToCard_from_wishList", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify(product),
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

  return (
    <>
      <div className="flex">
        <MenuDashbord />
        <div className="w-full px-4 py-2 md:w-full  lg:w-full ">
          {isLoading && <Spin />}
          {error && <ErrorPage />}
          <div className="product-list-container">
            <Row gutter={[16, 16]}>
              {myWishList?.data?.map((product) => (
                <Col key={product._id} xs={24} sm={12} md={8} lg={8}>
                  <Card
                    hoverable
                    cover={
                      <img
                        className="product-image"
                        alt={product.name}
                        src={product.photo}
                      />
                    }
                    className="product-card">
                    <Card.Meta
                      title={product.name}
                      description={product.description}
                    />
                    <div className="product-details">
                      <p>Brand: {product.brandName}</p>

                      {product?.salesOf <= 0 ? (
                        <p className="inline-block mt-1 bg-gray-200 rounded-full px-2 py-1 text-sm font-semibold text-gray-700">
                          #Price:
                          {product?.price}
                        </p>
                      ) : (
                        <p className="inline-block mt-1 bg-gray-200 rounded-full px-2 py-1 text-sm font-semibold text-gray-700 original-price">
                          #Price:
                          {product?.price}
                        </p>
                      )}

                      <p className="inline-block m-2 bg-gray-200 rounded-full px-2 py-1 text-sm font-semibold text-gray-700">
                        #Sales Of: {product?.salesOf} %
                      </p>
                      {product?.salesOf >= 1 ? (
                        <p className="inline-block m-2 bg-gray-200 rounded-full px-2 py-1 text-sm font-semibold text-gray-700 discounted-price">
                          #Selling Price :{product?.sellingPrice}
                        </p>
                      ) : (
                        <p className="inline-block m-2 bg-gray-200 rounded-full px-2 py-1 text-sm font-semibold text-gray-700">
                          #Selling Price: {product?.price}
                        </p>
                      )}
                    </div>

                    <div className="flex justify-between">
                      <Button
                        onClick={() => handelAddToCartFromWishList(product)}
                        type="primary"
                        className="btn btn-outline bg-blue-900 btn-sm text-white">
                        Add to Cart
                      </Button>
                      <Button
                        onClick={() => handelDeleteWishList(product?._id)}
                        type="primary"
                        className="btn btn-outline btn-sm bg-red-800 text-white">
                        <TbHttpDelete className="text-xl" />
                      </Button>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </div>
      </div>
    </>
  );
};

export default WishList;
