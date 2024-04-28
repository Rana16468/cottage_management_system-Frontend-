import React, { useState } from "react";
import { Button, Divider, Modal, Space, Spin, Table } from "antd";
import ErrorPage from "../../error/ErrorPage";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import CategoriesName from "../../../utils/CategoriesName";
import { Link } from "react-router-dom";
import { TypeOfImage } from "../../../utils/ExtentionType";

const SellerCategorie = ({ productCategories, isLoading, error, refetch }) => {
  // pagination
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const pages = Math.ceil(75 / size);

  // delete categorie

  ///api/v1/delete_categorie

  const handelDeleteCategorie = (id) => {
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Don't Delete`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        fetch(`http://localhost:3013/api/v1/delete_categorie?id=${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            authorization: localStorage.getItem("token"),
          },
        })
          .then((res) => {
            if (!res.ok) {
              toast.error("API ERROR");
            }
            return res.json();
          })
          .then((data) => {
            toast.success(data?.message);
            refetch();
          })
          .catch((error) => {
            console.log(error?.message);
          });
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  const handelDeleteProductCatagorie = (id) => {
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Don't Delete`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        fetch(`http://localhost:3013/api/v1/delete_categorie_list/${id}`, {
          method: "DELETE",
          headers: {
            authorization: localStorage.getItem("token"),
          },
        })
          .then((res) => {
            if (!res.ok) {
              toast.error("API ERROR");
            }
            return res.json();
          })
          .then((data) => {
            toast.success(data?.message);
          })
          .catch((error) => {
            toast.error(error?.message);
          });
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  const columns = [
    {
      title: "Categorie Name",
      dataIndex: "categorie_name",
      render: (text) => <a href="..">{text}</a>,
    },
    {
      title: "Release Date",
      dataIndex: "release_date",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Status",
      dataIndex: "isCreated",
      render: (data) => {
        return data ? (
          <Button className="">Active</Button>
        ) : (
          <Button>InActive</Button>
        );
      },
    },
    {
      title: "Action",
      key: "x",
      render: (item) => {
        return (
          <Space>
            <Link
              to={`/addToProduct/${item?.categorie_name
                ?.split(" ")
                .join("_")}/${item?._id}`}>
              <Button>Add To Product</Button>
            </Link>
            <Button onClick={() => handelDeleteCategorie(item?._id)}>
              Delete
            </Button>
          </Space>
        );
      },
    },
    {
      title: "Action",
      key: "x",
      render: (item) => {
        return <UpdateModal item={item} refetch={refetch} />;
      },
    },

    {
      title: "Sub Categorie",
      key: "x",
      render: (subitem) => {
        const columns = [
          {
            title: "Title",
            dataIndex: "tittle",
          },
          {
            title: "image",
            dataIndex: "photo",
            key: "photo",
            render: (photo) => {
              return (
                <img
                  className="rounded-md "
                  src={photo}
                  alt=""
                  style={{ width: 100 }}
                />
              );
            },
          },
          {
            title: "Add To Categories",
            key: "x",
            render: (item) => {
              return (
                <Link
                  to={`/add_to_categorie/${item?.tittle
                    ?.split(" ")
                    .join("_")}/${subitem?._id}/${item?.id}`}>
                  <Button>Sub Categories</Button>
                </Link>
              );
            },
          },
          {
            title: "Sub_Categorie",
            key: "x",
            render: (item) => {
              return (
                <Link to={`/your_sub_categorie/${subitem?._id}/${item?.id}`}>
                  <Button>Sub Categorie</Button>
                </Link>
              );
            },
          },
          {
            title: "Delete",
            key: "x",
            render: (item) => {
              return (
                <Space>
                  <Button onClick={() => handelDeleteProductCatagorie(item.id)}>
                    Delete
                  </Button>
                </Space>
              );
            },
          },
          {
            title: "Update Image",
            key: "x",
            render: (item) => {
              return <UpdateProductModal item={item} refetch={refetch} />;
            },
          },
        ];

        return (
          <Table
            columns={columns}
            dataSource={subitem?.productList?.map((item) => {
              return {
                ...item,
                key: item.id,
              };
            })}
          />
        );
      },
    },
  ];

  return (
    <>
      <div className="w-full px-4 py-2 md:w-full  lg:w-full ">
        {isLoading && <Spin />}
        {error && <ErrorPage />}

        <Divider />
        <Table
          columns={columns}
          dataSource={productCategories?.data?.map((item) => ({
            ...item,
            key: item._id,
          }))}
        />

        <div className="flex justify-end">
          <div
            style={{
              marginLeft: "200px",
              marginBottom: "50px",
            }}>
            <p>
              Current Page : {page + 1} and Size:{size}
            </p>
            {[...Array(pages).keys()].map((number) => (
              <button
                className="m-3 text-xl btn btn-outline btn-sm"
                key={number}
                onClick={() => {
                  setPage(number);
                }}>
                {number + 1}
              </button>
            ))}
            <select
              className="rounded-full btn btn-outline btn-sm"
              onChange={(event) => setSize(event.target.value)}>
              <option value="10" defaultValue={10}>
                10
              </option>
              <option value="15">15</option>
              <option value="20">20</option>
              <option value="25">25</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

const UpdateModal = ({ item, refetch }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { handleSubmit, register } = useForm();

  const onSubmit = (updatedata) => {
    fetch(`http://localhost:3013/api/v1/update_categorie/${item?._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify(updatedata),
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
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button onClick={showModal}>Update</Button>
      <Modal
        title="Update Categories"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-3 mt-10">
          <input
            className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
            type="email"
            name="email"
            defaultValue={item?.email}
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
            <option disabled>Selected :{item?.categorie_name}</option>
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

          <Button className="bg-blue-900 text-white" htmlType="submit">
            Uodate
          </Button>
        </form>
      </Modal>
    </>
  );
};

const UpdateProductModal = ({ item, refetch }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { handleSubmit, register } = useForm();

  const onSubmit = (data) => {
    // start the work

    let image = data.photo[0];

    if (TypeOfImage.includes(image?.name?.split(".")?.pop()?.toLowerCase())) {
      const image = data.photo[0];
      const formData = new FormData();
      formData.append("image", image);
      const url = `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_IMAGE_KEY}`;
      fetch(url, {
        method: "POST",
        body: formData,
      })
        .then((res) => {
          if (!res?.ok) {
            throw new Error("API ERROR");
          }
          return res.json();
        })
        .then((imgData) => {
          if (imgData?.success) {
            const photo = imgData?.data?.url;
            // fatching
            fetch(
              `http://localhost:3013/api/v1/update_productList_images/${item.id}`,
              {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                  authorization: localStorage.getItem("token"),
                },
                body: JSON.stringify({ photo }),
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
            toast.error("Image BB Server Issues");
          }
        });
    } else {
      toast.error("png,jpg,jpeg accespted Onter Types Not Accespted");
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button onClick={showModal}>Update Product</Button>
      <Modal
        title="Update Product"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-3 mt-10">
          <input
            className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
            type="text"
            name="tittle"
            {...register("tittle")}
            defaultValue={item?.tittle}
            readOnly
            placeholder="title*"
          />
          <div className="avatar">
            <div className="w-full rounded">
              <img src={item?.photo} alt="" />
            </div>
          </div>
          <input
            className="block w-full text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            id="photo"
            required
            name="photo"
            {...register("photo", {
              required: "'photo is required",
            })}
            type="file"
          />

          <Button
            className="bg-blue-900 text-white btn btn-outline btn-sm "
            htmlType="submit">
            Update
          </Button>
        </form>
      </Modal>
    </>
  );
};
export default SellerCategorie;
