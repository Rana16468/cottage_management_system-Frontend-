import React, { useContext, useState } from "react";
import { BiSend } from "react-icons/bi";
import "./style.css";
import { AuthContext } from "../AuthProvider/AuthProvider";
import UpdateProductDetails from "./UpdateProductDetails";
import { MdOutlineFileUpload } from "react-icons/md";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { BsArrowReturnRight } from "react-icons/bs";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useQuery } from "@tanstack/react-query";
import { FiEdit } from "react-icons/fi";
import { MdAutoDelete } from "react-icons/md";
import EditChat from "../CottageModal/EditChat";
import Swal from "sweetalert2";
import SellerReply from "./SellerReply";
import ChatBotValidateInput from "../../utils/ChatBotValidateInput";

const ProductDetailsCard = ({ productDetails, refetch }) => {
  const { user } = useContext(AuthContext);
  const [editmessage, setEditMessage] = useState({});
  const [DetailsId, setDetailsId] = useState("");
  const { SubcategorieId } = useParams();
  const { _id } = productDetails?.data?.find(
    (v) => v.SubcategorieId === SubcategorieId
  );

  /*
const product=[
    
    {message:"https://assets.bigcartel.com/product_images/361265728/20230522_135652.jpg?auto=format&fit=max&w=2000"},
     {message:"The Quick brown fox jumps over the lazy dog"},
       {message:"The Quick brown fox jumps over the lazy dog"},
         {message:"The Quick brown fox jumps over the lazy dog"}
    
    ];
      const urlRegex = /^(http|https):\/\/[^\s]+/;
      product.map((v)=>{
          urlRegex.test(v.message) && console.log(v);
           !urlRegex.test(v.message) && console.log(v);
          
      })
       */

  const handelTextMessages = (event) => {
    event.preventDefault();
    const element = event.target;
    const message = element.textMessage.value;

    if (ChatBotValidateInput(message)) {
      fetch("http://localhost:3013/api/v1/message", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          DetailsId,
          message,
        }),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("API ERROR");
          }
          return res.json();
        })
        .then((data) => {
          refetch();
          toast.success(data?.message);
        })
        .catch((error) => {
          toast.error(error?.message);
        });
    } else {
      toast.error("Invalide Types");
    }

    element.reset();
  };
  // my message display with my text area start the codeing

  const chatUrl = `http://localhost:3013/api/v1/display_chatting_message/${_id}`;
  const { data: chattingMessage = [] } = useQuery({
    queryKey: ["chattingMessage", _id],
    queryFn: async () => {
      const res = await fetch(chatUrl, {
        method: "GET",
        headers: {
          authorization: localStorage.getItem("token"),
        },
      });
      const data = await res.json();
      return data?.data;
    },
    refetchInterval: 1000,
  });

  // delete message

  const handelChatDelete = (delete_message) => {
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
        fetch("http://localhost:3013/api/v1/delete_chettingMessage", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: localStorage.getItem("token"),
          },
          body: JSON.stringify(delete_message),
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

  // console.log(chattingMessage);

  return (
    <>
      <div className="w-full px-4 py-2  lg:w-full">
        {productDetails?.success &&
          productDetails?.data?.map((item, index) => (
            <div key={index}>
              <div className="carousel">
                <div className="carousel-inner">
                  {item?.imageList?.map((v, index) => (
                    <div key={index + 1} className="carousel-item m-3">
                      <div className="block min-w-96 h-auto p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-white-800 dark:border-gray-700 dark:hover:bg-gray-700">
                        <div className="flex">
                          <img className="w-96  h-full" src={v} alt="" />

                          <div className="ml-3">
                            {item?.categorie?.map((v, index) => (
                              <div key={index}>
                                <p className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-black">
                                  Amazing Product
                                </p>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                  Product Name : {v?.name}
                                </p>

                                <p className="text-sm text-gray-700 dark:text-gray-400">
                                  {v?.description} ipsum dolor sit amet,
                                  consectetur adipisicing elit. Voluptatibus
                                  quia, nulla! Maiores et perferendis eaque,
                                  exercitationem praesentium nihil.
                                </p>

                                <div className="px-6 pt-4 pb-2">
                                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                                    #Brand Name :{v?.brandName}
                                  </span>
                                  {v?.salesOf <= 0 ? (
                                    <p className="inline-block mt-1 bg-gray-200 rounded-full px-2 py-1 text-sm font-semibold text-gray-700">
                                      #Price:
                                      {v?.price}
                                    </p>
                                  ) : (
                                    <p className="inline-block mt-1 bg-gray-200 rounded-full px-2 py-1 text-sm font-semibold text-gray-700 original-price">
                                      #Price:
                                      {v?.price}
                                    </p>
                                  )}

                                  <p className="inline-block m-2 bg-gray-200 rounded-full px-2 py-1 text-sm font-semibold text-gray-700">
                                    #Sales Of: {v?.salesOf} %
                                  </p>
                                  {v?.salesOf >= 1 ? (
                                    <p className="inline-block m-2 bg-gray-200 rounded-full px-2 py-1 text-sm font-semibold text-gray-700 discounted-price">
                                      #Selling Price :{v?.sellingPrice}
                                    </p>
                                  ) : (
                                    <p className="inline-block m-2 bg-gray-200 rounded-full px-2 py-1 text-sm font-semibold text-gray-700">
                                      #Selling Price: {v?.price}
                                    </p>
                                  )}
                                </div>

                                <p className="inline-block m-2 bg-gray-200 font-serif rounded-full px-2 py-1 text-sm font-semibold text-gray-700">
                                  #Company Name: Air Index
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {item?.categorie?.map((v, index) => (
                <div key={index} className="flex justify-center items-center">
                  <div className="max-w-full rounded overflow-hidden shadow-lg">
                    <img
                      className="w-full h-96"
                      src={v?.photo}
                      alt="Sunset in the mountains"
                    />

                    <div className="px-6 py-4">
                      <div className="font-bold text-xl mb-2">{v?.name}</div>
                      <p className="text-gray-700 text-base">
                        {v?.description} ipsum dolor sit amet, consectetur
                        adipisicing elit. Voluptatibus quia, nulla! Maiores et
                        perferendis eaque, exercitationem praesentium nihil.
                      </p>
                    </div>
                    <div className="px-6 pt-4 pb-2">
                      <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                        #Brand Name :{v?.brandName}
                      </span>
                      {v?.salesOf <= 0 ? (
                        <p className="inline-block mt-1 bg-gray-200 rounded-full px-2 py-1 text-sm font-semibold text-gray-700">
                          #Price:
                          {v?.price}
                        </p>
                      ) : (
                        <p className="inline-block mt-1 bg-gray-200 rounded-full px-2 py-1 text-sm font-semibold text-gray-700 original-price">
                          #Price:
                          {v?.price}
                        </p>
                      )}

                      <p className="inline-block m-2 bg-gray-200 rounded-full px-2 py-1 text-sm font-semibold text-gray-700">
                        #Sales Of: {v?.salesOf} %
                      </p>
                      {v?.salesOf >= 1 ? (
                        <p className="inline-block m-2 bg-gray-200 rounded-full px-2 py-1 text-sm font-semibold text-gray-700 discounted-price">
                          #Selling Price :{v?.sellingPrice}
                        </p>
                      ) : (
                        <p className="inline-block m-2 bg-gray-200 rounded-full px-2 py-1 text-sm font-semibold text-gray-700">
                          #Selling Price: {v?.price}
                        </p>
                      )}
                      <div className="flex justify-end">
                        {user?.photoURL === "buyer" && (
                          <button className="btn btn-outline btn-sm ">
                            Add to Cart
                          </button>
                        )}
                      </div>
                    </div>

                    {user?.photoURL === "seller" && (
                      <SellerReply detailsId={item?._id} />
                    )}
                  </div>
                </div>
              ))}

              {/* chatbot */}

              {user?.photoURL === "buyer" && (
                <div className=" m-3 flex justify-center">
                  <div
                    style={{ width: "950px" }}
                    className="card  bg-base-100 shadow-xl">
                    <div className="card-body">
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text text-xl">
                            Buyer/Seller Reaply Message
                          </span>
                        </label>
                        <div
                          name="message"
                          className="textarea textarea-success">
                          {chattingMessage?.map((chat, index) => (
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
                                  <div className="chat-bubble text-white text-xl">
                                    {chatMessage?.message}
                                    <div className="flex justify-end">
                                      <div className="dropdown">
                                        <div tabIndex={0}>
                                          <BsThreeDotsVertical />
                                        </div>
                                        <ul
                                          tabIndex={0}
                                          className="dropdown-content z-[1] menu p-2 shadow bg-black rounded-box w-32">
                                          <li>
                                            <button
                                              onClick={() => {
                                                document
                                                  .getElementById(
                                                    "edit_chatbot"
                                                  )
                                                  .showModal();
                                                setEditMessage({
                                                  _id: chat?._id,
                                                  messageId:
                                                    chatMessage?.messageId,
                                                  message: chatMessage?.message,
                                                });
                                              }}
                                              className="btn btn-outline btn-info btn-sm">
                                              <FiEdit className="text-xl" />
                                            </button>
                                            <EditChat
                                              editmessage={editmessage}
                                              refetch={refetch}
                                            />
                                          </li>
                                          <li>
                                            <button
                                              onClick={() =>
                                                handelChatDelete({
                                                  _id: chat?._id,
                                                  messageId:
                                                    chatMessage?.messageId,
                                                })
                                              }
                                              className="btn btn-outline btn-error btn-sm">
                                              <MdAutoDelete className="text-xl" />
                                            </button>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>

                                    <div className="gap-2 relative left-5">
                                      {chatMessage?.reply?.map(
                                        (reply, index) => (
                                          <div key={index}>
                                            <BsArrowReturnRight className="text-xl font-bold" />
                                            {reply?.replymessage}
                                          </div>
                                        )
                                      )}

                                      {/* {user?.email === employeerEmail && <button onClick={() => handelDelete(v.queId, _id)} className='btn btn-outline btn-error text-xl m-3'><RiDeleteBinLine></RiDeleteBinLine></button>

                                                        } */}
                                    </div>
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

                    <div className="chat chat-start m-2">
                      <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                          <img
                            src="https://previews.123rf.com/images/lexaarts/lexaarts1311/lexaarts131100148/24091315-happy-buyer-3d-human-and-shopping-cart.jpg"
                            alt=""
                          />
                        </div>
                      </div>
                      <div className="chat-header">
                        Buyer Message Box -
                        <time className="text-xs opacity-50">
                          {new Date().toString().slice(0, 18)}
                        </time>
                      </div>
                      <form
                        onSubmit={handelTextMessages}
                        className="chat-bubble w-full">
                        <div className="flex justify-around">
                          <label className="cursor-pointer">
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                            />
                            <MdOutlineFileUpload className="text-2xl m-3 rounded  bg-blue-700" />
                          </label>
                          <input
                            type="text"
                            name="textMessage"
                            placeholder="Type here"
                            className="input input-bordered input-info w-full max-w-4xl text-black text-xl mr-3"
                          />

                          <button
                            onClick={() => setDetailsId(item?._id)}
                            className="btn btn-primary text-2xl">
                            <BiSend className="text-xl"></BiSend>
                          </button>
                        </div>
                      </form>
                      <div className="chat-footer opacity-50">Delivered</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

        {/* table  */}
        {user?.photoURL === "seller" && (
          <>
            <h1 className=" text-3xl font-serif text-center m-3">
              Product Details Table
            </h1>
            <UpdateProductDetails item={productDetails} refetch={refetch} />
            {/* chatbot reply message  */}
          </>
        )}
      </div>
    </>
  );
};

export default ProductDetailsCard;
