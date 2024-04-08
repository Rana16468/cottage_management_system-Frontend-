import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { BiSend } from "react-icons/bi";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { FiEdit } from "react-icons/fi";
import { MdAutoDelete } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import EditReviewModal from "./EditReviewModal";
import { useQuery } from "@tanstack/react-query";
import { Spin } from "antd";
const ReviewModal = ({ subcategorieId }) => {
  //const [AllReview, setAllReview] = useState([]);

  const [specificReview, setSpecificReview] = useState({});
  const {
    user: { email },
  } = useContext(AuthContext);

  const url = `http://localhost:3013/api/v1/review_product/${subcategorieId}`;

  const {
    data: AllReviews = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["AllReviews", subcategorieId],
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
        // Check if data is defined and contains the expected property
        if (data && data.data) {
          return data.data; // Return the reviews array
        } else {
          toast.error("Data structure from API is invalid");
        }
      } catch (error) {
        toast.error(`Failed to fetch reviews: ${error.message}`);
      }
    },
  });

  const handelProductReview = (event) => {
    event.preventDefault();
    const element = event.target;
    const review = element.review.value;
    fetch("http://localhost:3013/api/v1/review_product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({ review, subcategorieId }),
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
    element.reset();
  };

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

  return (
    <>
      {isLoading && <Spin />}

      <dialog id="review_modal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm bg-green-500 btn-circle absolute right-2 top-2">
              ✕
            </button>
            <h3 className=" font-bold text-2xl font-serif">Product Review </h3>
          </form>
          {/* start model */}
          <div className="  flex justify-center">
            <div className="form-control">
              <div name="message" className="textarea textarea-success">
                {AllReviews?.map((v, index) => (
                  <div key={index} className="chat chat-end">
                    {v?.email === email && (
                      <div className="flex justify-start">
                        <div className="dropdown dropdown-end">
                          <div
                            tabIndex={0}
                            className="btn btn-outline btn-sm bg-pink-200">
                            <BsThreeDotsVertical />
                          </div>
                          <ul
                            tabIndex={0}
                            className="dropdown-content z-[1] menu p-2 shadow bg-black rounded-box w-32">
                            <li>
                              <button
                                onClick={() => {
                                  document
                                    .getElementById("edit_review")
                                    .showModal();
                                  setSpecificReview({
                                    review: v?.review,
                                    id: v?._id,
                                  });
                                }}
                                className="btn btn-outline btn-info btn-sm">
                                <FiEdit className="text-xl" />
                              </button>
                              <EditReviewModal
                                specificReview={specificReview}
                                refetch={refetch}
                              />
                            </li>
                            <li>
                              <button
                                onClick={() => handelReviewDelete(v?._id)}
                                className="btn btn-outline btn-error btn-sm">
                                <MdAutoDelete className="text-xl" />
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>
                    )}
                    <div className="chat-header">
                      Product Review
                      <time className="text-xs opacity-50 m-2">
                        {new Date().toString().slice(16, 23)}
                      </time>
                    </div>
                    <div className="chat-bubble text-white text-xl font-serif">
                      {v?.review}
                    </div>

                    <div className="chat-footer opacity-50">
                      <p className="text-sm text-black">
                        {new Date().toString().slice(0, 23)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="chat chat-start m-2">
            <form onSubmit={handelProductReview} className="chat-bubble">
              <div className="flex justify-between">
                <input
                  type="text"
                  name="review"
                  placeholder="Type here"
                  maxLength={200}
                  className="input input-bordered input-info w-full  text-black text-xl mr-3"
                />
                <button className="btn btn-primary text-2xl">
                  <BiSend className="text-xl"></BiSend>
                </button>
              </div>
            </form>
            <div className="chat-footer opacity-50">Delivered</div>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default ReviewModal;
