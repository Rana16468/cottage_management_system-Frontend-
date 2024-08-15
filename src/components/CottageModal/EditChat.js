import React, { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import toast from "react-hot-toast";
import ChatBotValidateInput from "../../utils/ChatBotValidateInput";

const EditChat = ({ editmessage, refetch }) => {
  const { user } = useContext(AuthContext);

  const onSubmit = (event) => {
    event.preventDefault();
    const element = event.target;
    editmessage.message = element.message.value;

    if (ChatBotValidateInput(editmessage.message)) {
      fetch(
        "https://creative-crafting.vercel.app/api/v1/update_chatting_message",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: localStorage.getItem("token"),
          },
          body: JSON.stringify(editmessage),
        }
      )
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
    } else {
      toast.error("Invalidate Message");
    }

    element.reset();
  };

  return (
    <>
      <div className="flex justify-center items-center text-black">
        <dialog id="edit_chatbot" className="modal">
          <div className="modal-box">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm bg-green-500 btn-circle absolute right-2 top-2">
                ✕
              </button>
              <h3 className=" font-bold text-2xl font-seri">
                Edit Chat Message
              </h3>
            </form>
            <form onSubmit={onSubmit} className="grid grid-cols-1 gap-3 mt-10">
              <input
                name="email"
                defaultValue={user?.email}
                readOnly
                type="email"
                placeholder="Email Address"
                className="input input-bordered w-full "
              />

              <input
                type="text"
                name="release_date"
                defaultValue={new Date().toString()}
                readOnly
                className="input input-bordered w-full "
              />

              <textarea
                placeholder="edit message"
                name="message"
                defaultValue={editmessage.message}
                className="textarea textarea-bordered textarea-lg w-full "></textarea>

              <br />
              <input
                className="w-full btn-sm  btn bg-blue-900 btn-outline text-white"
                type="submit"
                value="Edit"
              />
            </form>
          </div>
        </dialog>
      </div>
    </>
  );
};

export default EditChat;
