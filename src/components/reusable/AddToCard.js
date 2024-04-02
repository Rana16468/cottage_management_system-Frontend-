import toast from "react-hot-toast";

export const AddToCard = (addToProduct) => {
  const { brandName, name, photo, price } = addToProduct || {};

  fetch("http://localhost:3013/api/v1/addToCard_Product", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: localStorage.getItem("token"),
    },
    body: JSON.stringify({
      brandName,
      name,
      photo,
      price,
      id: addToProduct?._id,
    }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Already Exist product");
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
