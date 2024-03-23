import React, { useEffect, useState } from "react";

import { BsArrowReturnRight, BsThreeDotsVertical } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { MdAutoDelete } from "react-icons/md";
import ErrorPage from "../error/ErrorPage";
import { BiSend } from "react-icons/bi";
import toast from "react-hot-toast";

const SellerReply = ({ detailsId }) => {
  const [sellerReplyMessage, setSellerReplyMessage] = useState([]);
  const [isError, setError] = useState("");
  const [replyIds, setReplyIds] = useState({});

  useEffect(() => {
    const fetchData = () => {
      fetch(
        `http://localhost:3013/api/v1/display_specific_product_chat/${detailsId}`,
        {
          method: "GET",
          headers: {
            authorization: localStorage.getItem("token"),
          },
        }
      )
        .then((res) => {
          if (!res.ok) {
            throw new Error("API ERROR");
          }
          return res.json();
        })
        .then((data) => {
          setSellerReplyMessage(data?.data);
        })
        .catch((error) => {
          setError(error?.message);
        });
    };

    // Fetch data initially
    fetchData();

    // Set interval to refetch data every 10 seconds
    const refetchInterval = setInterval(fetchData, 1000);

    // Cleanup function to clear interval on component unmount
    return () => clearInterval(refetchInterval);
  }, [detailsId]);

  const replyMessage = (event) => {
    event.preventDefault();
    const element = event.target;
    const replymessage = element.replymessage.value;
    const replyText = {
      replymessage,
      ...replyIds,
    };

    fetch("http://localhost:3013/api/v1/reply", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify(replyText),
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
      {isError && <ErrorPage />}
      <div className=" m-3 flex justify-center">
        <div className="card">
          <div className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-xl">
                  Seller - Reaply Message
                </span>
              </label>
              <div name="message" className="textarea textarea-success">
                {sellerReplyMessage?.map((chat, index) => (
                  <div key={index}>
                    {chat?.queries?.map((chatMessage, index) => (
                      <div key={index} className="chat chat-end">
                        <div className="chat-image avatar">
                          <div className="w-10 rounded-full">
                            <img
                              src="https://blinkit.com/careers/sites/default/files/2021-12/local-desktop-masthead.png"
                              alt=""
                            />
                          </div>
                        </div>

                        <div className="chat-header">
                          Buyer Message
                          <time className="text-xs opacity-50 m-2">
                            {new Date().toString().slice(16, 23)}
                          </time>
                        </div>
                        <div className="chat-bubble text-white text-xl font-serif">
                          {chatMessage?.message}

                          <div className="gap-2 relative left-5">
                            {chatMessage?.reply?.map((reply, index) => (
                              <div key={index}>
                                <BsArrowReturnRight className="text-xl font-bold" />
                                {reply?.replymessage}
                              </div>
                            ))}
                          </div>
                          <form
                            onSubmit={replyMessage}
                            className="chat-bubble w-full ">
                            <div className="flex justify-between">
                              <input
                                type="text"
                                name="replymessage"
                                placeholder="Type here"
                                className="input input-bordered input-info  w-full  text-black text-xl mr-3"
                              />

                              <button
                                disabled={chatMessage?.message ? false : true}
                                onClick={() =>
                                  setReplyIds({
                                    chatId: chat?._id,
                                    messageId: chatMessage?.messageId,
                                  })
                                }
                                className="btn btn-primary text-2xl">
                                <BiSend className="text-xl"></BiSend>
                              </button>
                            </div>
                          </form>
                        </div>

                        <div className="chat-footer opacity-50">
                          <p className="text-sm text-black">
                            {new Date().toString().slice(0, 23)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SellerReply;
