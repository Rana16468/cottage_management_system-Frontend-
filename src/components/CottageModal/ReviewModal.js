import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiSend } from "react-icons/bi";

const ReviewModal = ({ subcategorieId }) => {
  const [AllReview, setAllReview] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:3013/api/v1/review_product/${subcategorieId}`, {
      method: "GET",
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
        setAllReview(data?.data);
      })
      .catch((error) => {
        toast.error(error?.message);
      });
  }, [subcategorieId]);

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
      })
      .catch((error) => {
        toast.error(error?.message);
      });
    element.reset();
  };
  return (
    <>
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
                <div className="chat chat-end">
                  <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                      <img
                        src="https://w7.pngwing.com/pngs/260/594/png-transparent-customer-review-review-site-yelp-realself-others-miscellaneous-label-service.png"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="chat-header">
                    Product Review
                    <time className="text-xs opacity-50 m-2">
                      {new Date().toString().slice(16, 23)}
                    </time>
                  </div>

                  {AllReview?.map((v, index) => (
                    <div key={index} className="chat-bubble text-white text-xl">
                      {v?.review}
                    </div>
                  ))}

                  <div className="chat-footer opacity-50">
                    <p className="text-sm text-black">
                      {new Date().toString().slice(0, 23)}
                    </p>
                  </div>
                </div>
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
