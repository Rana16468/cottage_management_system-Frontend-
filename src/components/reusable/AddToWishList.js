import toast from "react-hot-toast";
export const AddToWishList = (wishList) => {
  const {
    brandName,
    description,
    name,
    photo,
    price,
    salesOf,
    sellingPrice,
    _id,
  } = wishList || {};
  fetch("https://creative-crafting.vercel.app/api/v1/my_wish_list", {
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
      description,
      salesOf,
      sellingPrice,
      productId: _id,
    }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Already Exist");
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
