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
  const form = location.state?.from?.pathname || "/";

  const onSubmit = (data) => {
    signIn(data?.email, data?.password)
      .then(async (result) => {
        const user = result.user;

        if (user) {
          const res = await fetch("http://localhost:3013/api/v1/create_token", {
            method: "POST",
            body: JSON.stringify({ role: user?.photoURL, email: data?.email }),
          });
          const accessToken = await res.json();
          localStorage.setItem("token", accessToken?.data);
        }

        toast.success("Successfully Login");
        const userInoformation = {
          lastLogin: user?.metadata?.lastLoginAt,
          lastSignInTime: user?.metadata?.lastSignInTime,
        };
        console.log(userInoformation);

        setLogain(true);
        setError("");
        navigate(form, { replace: true });
      })
      .catch((error) => {
        setError(error.message);
      });

    reset();
  };

  const handelGoogleSinIn = () => {
    // store in user Information
    googleLogin()
      .then((result) => {
        const user = result.user;
        console.log(user);

        setLogain(true);
        setError("");
        navigate(form, { replace: true });
        toast.success("Successfully Login");
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
              src="https://as1.ftcdn.net/v2/jpg/02/35/82/64/1000_F_235826468_w2HW7U7EWjEdwTFIvJCeLzd9LZYJTH0G.jpg"
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
                  required
                  placeholder="Your password"
                />
                <p className="underline m-1">
                  Please Register Your Account Info{" "}
                  <Link to="/register">Register</Link>
                </p>
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
