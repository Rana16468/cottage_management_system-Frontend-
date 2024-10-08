import React, { useContext } from "react";
import MenuDashbord from "../page/BuyerDashboard/MenuDashbord";
import { AuthContext } from "../AuthProvider/AuthProvider";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const DeleteAccount = () => {
  const { user, DeleteAccount, logOut } = useContext(AuthContext);

  const navigate = useNavigate();

  const handelDeleteAccount = (event) => {
    event.preventDefault();

    Swal.fire({
      title: "Are you sure?",
      text: "You  want to be a delete Account",
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
        fetch("https://creative-crafting.vercel.app/api/v1/deleteAccount", {
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
            DeleteAccount()
              .then(() => {
                // system logout
                logOut()
                  .then(() => {
                    localStorage.setItem("token", null);
                    navigate("/");
                  })
                  .catch((error) => {
                    toast.error(error?.message);
                  })
                  .catch((error) => {
                    toast.error(error.message);
                  });
              })
              .catch((error) => {
                toast.error(error?.message);
              });

            toast.success(data?.message);
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
        <div className="w-full px-4 py-2 md:w-full  lg:w-full bg-[url(https://as2.ftcdn.net/v2/jpg/04/04/49/57/1000_F_404495747_Oi3y1kgnv2x1qer8RkQBiNytnWApw8iA.jpg)] ">
          <div className="mx-auto max-w-xl space-y-6 ">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold text-white">
                Delete Account Data
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                This action will permanently remove all of your data from
                VidLink, including your account information, videos, and
                settings. You will no longer be able to access the app or
                recover any data.
              </p>
            </div>
            <form onSubmit={handelDeleteAccount} className="space-y-4">
              <div>
                <label
                  className="font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-base text-white"
                  htmlFor="email">
                  Email Address
                </label>
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  type="email"
                  id="email"
                  defaultValue={user?.email}
                  placeholder="Enter your email address"
                  required=""
                  readOnly
                />
              </div>

              <div>
                <label
                  className="font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-base text-white"
                  htmlFor="email">
                  User Name
                </label>
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  required=""
                  defaultValue={user?.displayName}
                  readOnly
                />
              </div>

              <div>
                <label
                  className="font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-base text-white"
                  htmlFor="email">
                  Date
                </label>
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  defaultValue={new Date().toString()}
                  required=""
                />
              </div>
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  role="checkbox"
                  aria-checked="false"
                  aria-required="true"
                  data-state="unchecked"
                  value="on"
                  className="peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                  id="confirm"></button>
                <input
                  type="checkbox"
                  aria-hidden="true"
                  required=""
                  tabindex="-1"
                  value="on"
                />
                <label
                  className="font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm text-gray-500 dark:text-gray-400"
                  htmlFor="confirm">
                  I understand that this action is irreversible and will
                  permanently delete my account data.
                </label>
              </div>
              <button
                className=" bg-red-400 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
                type="submit">
                Delete Account
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteAccount;
