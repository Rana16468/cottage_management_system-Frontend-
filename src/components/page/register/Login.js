import React, { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const Login = () => {
  const { signIn, googleLogin } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [login, setLogain] = useState(false);
  const { handleSubmit, register, reset } = useForm();
  const location = useLocation();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    signIn(data?.email, data?.password)
      .then(async (result) => {
        const user = await result?.user;

        // validation checking
        //user.emailVerified
        if (user) {
          try {
            const response = await fetch(
              "https://creative-crafting.vercel.app/api/v1/create_token",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  role: user?.photoURL,
                  email: user?.email,
                }),
              }
            );
            if (!response.ok) {
              throw new Error("Failed to fetch token");
            }
            const data = await response.json();
            const accessToken = data?.data;
            localStorage.setItem("token", accessToken);
            // Call your other function here
            toast.success("Successfully Login");
            const userInoformation = {
              lastLogin: user?.metadata?.lastLoginAt,
              lastSignInTime: user?.metadata?.lastSignInTime,
            };
            console.log(userInoformation);

            setLogain(true);
            setError("");
            if (user?.emailVerified) {
              console.log("varified");
              console.log(user?.emailVerified);
              const form = location.state?.from?.pathname || "/";
              navigate(form, { replace: true });
            } else {
              toast.error("You Are Not Varified User");
            }
          } catch (error) {
            console.error("Error fetching token:", error);
          }
        } else {
          console.log("Not Varified");
        }
      })
      .catch((error) => {
        setError(error.message);
      });

    reset();
  };

  const handelGoogleSinIn = () => {
    // store in user Information
    googleLogin()
      .then(async (result) => {
        const user = result.user;
        console.log(user);
        //uid
        if (user) {
          // create token
          if (user) {
            const res = await fetch(
              "https://creative-crafting.vercel.app/api/v1/create_token",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  role: process.env.REACT_APP_buyer,
                  email: user?.email,
                }),
              }
            );
            const accessToken = await res.json();
            localStorage.setItem("token", accessToken?.data);
            // store information data in the mongodb database

            fetch(
              "https://creative-crafting.vercel.app/api/v1/user_information",
              {
                method: "POST", // or 'PUT'
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  username: user?.displayName,
                  email: user?.email,
                  role: process.env.REACT_APP_buyer,
                  password: user?.uid,
                  photo: user?.photoURL,
                }),
              }
            )
              .then((res) => res.json())
              .then((data) => {
                toast.success(data?.message);
                setLogain(true);
                setError("");
                if (user?.emailVerified) {
                  const form = location.state?.from?.pathname || "/";
                  console.log("va");
                  navigate(form, { replace: true });
                } else {
                  toast.error("You Are Not Varified User");
                }
              })
              .catch((error) => {
                setError(error.message);
              });
          }
        } else {
          console.log("Not Varified");
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <>
      <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
        <div className="  container max-w-md mx-auto xl:max-w-3xl h-full flex bg-white rounded-lg shadow overflow-hidden">
          <div className="relative hidden xl:block xl:w-1/2 h-full">
            <img
              className="w-full object-cover"
              src="https://i.pinimg.com/474x/88/12/90/881290f78d367304d64f9b4498de1369.jpg"
              alt="my zomato"
            />
          </div>
          <div className="w-full xl:w-1/2 p-8">
            <form onSubmit={handleSubmit(onSubmit)}>
              <h1 className=" text-2xl font-bold">Sign in to your account</h1>
              <div>
                <span className="text-gray-600 text-sm">
                  Don't have an account?
                </span>
                <span className="text-gray-700 text-sm font-semibold">
                  Sign up
                </span>
              </div>
              <div className="mb-4 mt-6">
                <label
                  className="block text-gray-700 text-sm font-semibold mb-2"
                  htmlFor="email">
                  Email
                </label>
                <input
                  className="text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline h-10"
                  id="email"
                  name="email"
                  defaultValue={"amsr215019@gmail.com"}
                  type="email"
                  {...register("email")}
                  required
                  placeholder="Your email address"
                />
              </div>
              <div className="mb-6 mt-6">
                <label
                  className="block text-gray-700 text-sm font-semibold mb-2"
                  htmlFor="password">
                  Password
                </label>
                <input
                  className="text-sm bg-gray-200 appearance-none rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline h-10"
                  id="password"
                  type="password"
                  {...register("password")}
                  defaultValue={"215019"}
                  required
                  placeholder="Your password"
                />
                <p className="underline m-1">
                  Please Register Your Account Info{" "}
                  <Link to="/register">Register</Link>
                </p>
                <p className="text-sm font-serif">
                  Buyer Account: rana16-468@diu.edu.bd
                </p>
                <p className="text-sm font-serif">Password:215019</p>

                <p className="text-sm font-serif">
                  <b> Seller Account & Admin Account</b>: amsr215019@gmail.com
                </p>
                <p className="text-sm font-serif">Password:215019</p>
              </div>

              <div className="flex w-full mt-8">
                <button
                  className=" btn btn-outline  w-full bg-gray-800 hover:bg-grey-900 text-white text-sm py-2 px-4 font-semibold rounded focus:outline-none focus:shadow-outline h-10"
                  type="submit">
                  Sign in
                </button>
              </div>
            </form>

            <div>
              <button
                onClick={handelGoogleSinIn}
                type="submit"
                className="mt-3 w-full font-bold text-white text-sm  rounded btn btn-success  btn-outline h-10">
                <FcGoogle className="text-xl mr-3" /> Google-SingIn
              </button>
            </div>

            <div>
              {login && (
                <p className="text-3xl text-danger text-center">
                  Successfully Login
                </p>
              )}
              {error && (
                <p className="text-3xl text-center text-red-600">{error}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
