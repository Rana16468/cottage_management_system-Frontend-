import React, { useContext, useState } from "react";

import { useForm, useWatch } from "react-hook-form";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Register = () => {
  const { handleSubmit, register, reset, control } = useForm();
  const term = useWatch({ control, name: "term" });
  const [error, setError] = useState(null);
  const [isRegister, setRegister] = useState(false);
  const navigate = useNavigate();
  const { createUser, updateUserProfile, EmailVarification } =
    useContext(AuthContext);

  const onSubmit = async (data) => {
    if (data.password.length < 6) {
      setError("Password should be 6 characters or more.");
      return;
    }

    if (data?.password !== data?.confirmPassword) {
      setError("Your Password did not match");
      return;
    }

    createUser(data.email, data.password)
      .then(async (result) => {
        const user = result.user;

        if (user) {
          const res = await fetch("http://localhost:3013/api/v1/create_token", {
            method: "POST",
            body: JSON.stringify({ role: data?.role, email: data?.email }),
          });
          const accessToken = await res.json();
          localStorage.setItem("token", accessToken?.data);
        }
        updateProfileInfo(data?.username, data?.role);
        setRegister(true);
        EmailVarification();
        toast.success("Checked Your Email and Varified");
        await storeUserInformation(data);
        navigate("/");

        reset();
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const updateProfileInfo = (name, PhotoURL) => {
    const photoURL = {
      displayName: name,
      photoURL: PhotoURL,
    };

    updateUserProfile(photoURL)
      .then(() => {
        console.log("successfuly-profile-update");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const storeUserInformation = async (data) => {
    fetch("http://localhost:3013/api/v1/user_information", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success(data?.message);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <>
      <section className="bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="bg-white flex rounded-2xl shadow-lg max-w-5xl p-5 items-center mt-4 mb-6">
          <div className="md:w-8/12 lg:w-6/12  flex">
            <img
              src="https://ik.imagekit.io/7hdidvbes/illustrations/become_expert_2.svg?tr=w-1920,q-75"
              className="w-full "
              alt=""
            />
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="mx-auto">
            <h2 className="text-left text-2xl font-bold mb-4">
              Create an Account
            </h2>
            <p className="text-left  text-gray-600 mb-4">
              Sign up with your email address or social media account.
            </p>

            <div className="mb-4">
              <input
                type="text"
                className="border border-gray-300 rounded-lg w-full px-4 py-3"
                {...register("username")}
                placeholder="User Name"
                required
              />
            </div>

            <div className="mb-4">
              <input
                type="email"
                className="border border-gray-300 rounded-lg w-full px-4 py-3"
                {...register("email")}
                placeholder="Email Address"
                required
              />
            </div>
            <div className="mb-4">
              <select
                className="border border-gray-300 rounded-lg  px-4 w-full  py-3"
                {...register("role")}
                required>
                <option disabled value="">
                  Account Types
                </option>
                <option value="buyer">Buyer Account</option>
                <option value="seller">Seller Account</option>

                {/* <option value="Admin">Admin</option> */}
              </select>
            </div>
            <div className="mb-4">
              <input
                type="password"
                className="border border-gray-300 rounded-lg w-full px-4 py-3"
                {...register("password")}
                placeholder="Password(6-12 character long)"
                required
              />
            </div>

            <div className="mb-4">
              <input
                type="password"
                className="border border-gray-300 rounded-lg w-full px-4 py-3"
                {...register("confirmPassword")}
                placeholder="Confirm Password(6-12 character long)"
                required
              />
            </div>

            <div className="mt-3 text-xs  flex justify-between items-center text-[#002D74]">
              <p className="text-base text-left text-red-700">{}</p>
            </div>

            <div className="mt-5 mb-6 grid grid-cols-3 items-center text-gray-400">
              <hr className="border-gray-400" />
              <p className="text-center text-sm">OR</p>
              <hr className="border-gray-400" />
            </div>

            <div className="md:col-span-5">
              <div className="inline-flex items-center">
                <input
                  type="checkbox"
                  required
                  name="term"
                  id="term"
                  {...register("term")}
                  className="form-checkbox"
                />
                <label htmlFor="billing_same" className="ml-2">
                  My billing address is different than above.
                </label>
              </div>
            </div>

            <div className="md:col-span-5 text-right">
              <div className="inline-flex items-end">
                <button disabled={!term} className="btn btn-outline btn-sm">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>

      <div className="flex items-center justify-center">
        {isRegister && (
          <p className="text-3xl text-danger font-serif text-center">
            Successfully Register
          </p>
        )}
        {error && <p className="text-3xl text-center text-red-600">{error}</p>}
      </div>
    </>
  );
};

export default Register;
