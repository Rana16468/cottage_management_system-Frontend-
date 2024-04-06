import React from "react";
import toast from "react-hot-toast";
const EditReviewModal = ({ specificReview, refetch }) => {
  const onSubmit = (event) => {
    event.preventDefault();
    const element = event.target;
    specificReview.review = element.review.value;

    fetch("http://localhost:3013/api/v1/edit_review", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify(specificReview),
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
      <div className="flex justify-center items-center text-black">
        <dialog id="edit_review" className="modal">
          <div className="modal-box">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm bg-green-500 btn-circle absolute right-2 top-2">
                ✕
              </button>
              <h3 className=" font-bold text-2xl font-seri">
                Edit Review Message
              </h3>
            </form>
            <form onSubmit={onSubmit} className="grid grid-cols-1 gap-3 mt-10">
              <input
                type="text"
                name="release_date"
                defaultValue={new Date().toString()}
                readOnly
                className="input input-bordered w-full "
              />

              <textarea
                placeholder="edit message"
                name="review"
                defaultValue={specificReview?.review}
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

export default EditReviewModal;
