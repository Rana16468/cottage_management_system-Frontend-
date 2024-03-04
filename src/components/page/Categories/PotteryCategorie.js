import React, { useContext } from "react";
import MenuDashbord from "../BuyerDashboard/MenuDashbord";
import CategoriesName from "../../../utils/CategoriesName";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const PotteryCategorie = () => {
  const {
    user: { email },
  } = useContext(AuthContext);
  const { handleSubmit, register, reset } = useForm();

  const onSubmitCategorie = (categorie) => {
    const createCategories = {
      ...categorie,
      isCreated: true,
      productList: [],
    };
    fetch("http://localhost:3013/api/v1/product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify(createCategories),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to create category: ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        toast.success(data?.message);
      })
      .catch((error) => {
        toast.error("This Categorie Alredy Exist");
      });
    reset();
  };
  return (
    <>
      <div className="flex">
        <MenuDashbord />

        <div className="w-full px-4 py-2 md:w-full  lg:w-full ">
          <div className="flex justify-center  items-center">
            <div className="container mx-auto my-4 px-4 lg:px-20">
              <div className="w-full p-8 my-4 md:px-12 lg:w-9/12 lg:pl-20 lg:pr-40 mr-auto rounded-2xl shadow-2xl">
                <div className="flex">
                  <h1 className="font-serif  uppercase lg:text-3xl sm:text-sm">
                    Create Cottage Categories
                  </h1>
                </div>
                <form
                  onSubmit={handleSubmit(onSubmitCategorie)}
                  className="grid grid-cols-1 gap-3 md:grid-cols-1">
                  <input
                    className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                    type="email"
                    name="email"
                    {...register("email")}
                    defaultValue={email}
                    readOnly
                    placeholder="Email*"
                  />
                  <input
                    className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                    type="text"
                    name="release_date"
                    {...register("release_date")}
                    defaultValue={new Date().toString()}
                    readOnly
                    placeholder="Release Date"
                  />
                  <select
                    className="border border-gray-300 rounded-lg  px-3 w-full  py-3"
                    name="categorie_name"
                    {...register("categorie_name")}
                    required>
                    <option disabled value="">
                      Cottage Categories
                    </option>
                    {CategoriesName?.map((v, index) => (
                      <option
                        className="font-serif text-sm"
                        key={index}
                        value={v.categorieName}>
                        {v.categorieName}
                      </option>
                    ))}

                    {/* <option value="Admin">Admin</option> */}
                  </select>
                  <div className="flex justify-end mt-3">
                    <button className="btn btn-outline bg-blue-900 text-white ">
                      Create Categorie
                    </button>
                  </div>
                </form>
              </div>

              <div className="w-full lg:-mt-96 lg:w-2/6 px-8 py-12 ml-auto bg-blue-900 rounded-2xl">
                <div className="flex flex-col text-white">
                  <h1 className="font-bold uppercase text-4xl my-4">
                    Drop in our office
                  </h1>
                  <p className="text-gray-400">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Aliquam tincidunt arcu diam, eu feugiat felis fermentum id.
                    Curabitur vitae nibh viverra, auctor turpis sed, scelerisque
                    ex.
                  </p>

                  <div className="flex my-4 w-2/3 lg:w-1/2">
                    <div className="flex flex-col">
                      <i className="fas fa-map-marker-alt pt-2 pr-2" />
                    </div>
                    <div className="flex flex-col">
                      <h2 className="text-2xl">Main Office</h2>
                      <p className="text-gray-400">
                        5555 Tailwind RD, Pleasant Grove, UT 73533
                      </p>
                    </div>
                  </div>

                  <div className="flex my-4 w-2/3 lg:w-1/2">
                    <div className="flex flex-col">
                      <i className="fas fa-phone-alt pt-2 pr-2" />
                    </div>
                    <div className="flex flex-col">
                      <h2 className="text-2xl">Call Us</h2>
                      <p className="text-gray-400">Tel: 01722305054</p>
                      <p className="text-gray-400">Fax: F1001-F2000-F100</p>
                    </div>
                  </div>

                  <div className="flex my-4 w-2/3 lg:w-1/2">
                    <a
                      href="..."
                      target="_blank"
                      className="rounded-full bg-white h-8 w-8 inline-block mx-1 text-center pt-1">
                      <i className="fab fa-facebook-f text-blue-900" />
                    </a>
                    <a
                      href="...."
                      target="_blank"
                      className="rounded-full bg-white h-8 w-8 inline-block mx-1 text-center pt-1">
                      <i className="fab fa-linkedin-in text-blue-900" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-end justify-end fixed bottom-0 right-0 mb-4 mr-4 z-10">
            <div>
              <a
                title="Buy me a pizza"
                href="...."
                className="block w-16 h-16 rounded-full transition-all shadow hover:shadow-lg transform hover:scale-110 hover:rotate-12">
                <img
                  className="object-cover object-center w-full h-full rounded-full"
                  src=""
                  alt=""
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PotteryCategorie;
