import React, { useContext, useState } from "react";
import CommonContruct from "./CommonContruct";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import SystemComplain from "./SystemComplain";

const ComplenBox = () => {
  const { user } = useContext(AuthContext);
  const information = {
    email: user?.email,
    role: user?.photoURL,
    name: user?.displayName,
    date: new Date().toString(),
  };

  const accordionItems = [
    {
      title:
        user?.photoURL === "seller"
          ? "Seller Complain Section"
          : "Buyer Complain Section",
      content: <CommonContruct information={information} />,
    },

    {
      title: "System Complaint Section",
      content: <SystemComplain information={information} />,
    },
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  return (
    <>
      <div className="p-8 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4">
            <h2 className="text-xl font-bold mb-2">Seller Section</h2>
            <p className="text-gray-700">
              This is the left section of the complex box. It can contain
              various content. The quick brown fox jumps over the lazy dog
              ,Daffodil University. This is the left section of the complex box.
              It can contain various content. The quick brown fox jumps over the
              lazy dog ,Daffodil University. This is the left section of the
              complex box. It can contain various content. The quick brown fox
              jumps over the lazy dog ,Daffodil University.
            </p>

            <img
              className="w-full h-96"
              src="https://dfpi.ca.gov/wp-content/uploads/sites/337/2023/05/Untitled-600-%C3%97-450-px-2.jpg"
              alt=""
            />
          </div>
          <div className="p-4">
            <h2 className="text-xl font-bold mb-2">Customer Section</h2>
            <p className="text-gray-700">
              This is the left section of the complex box. It can contain
              various content. The quick brown fox jumps over the lazy dog
              ,Daffodil University. This is the left section of the complex box.
              It can contain various content. The quick brown fox jumps over the
              lazy dog ,Daffodil University. This is the left section of the
              complex box. It can contain various content. The quick brown fox
              jumps over the lazy dog ,Daffodil University.
            </p>

            <img
              className="w-full h-96"
              src=" https://assets-global.website-files.com/60e7482cd7259ce8e76b25bf/6442efe7f8b8a8308378897a_How_Does_a_Professional_Electrician_Handle_Customer_Complaints_638155968821161330.png"
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="lg:m-36">
        <div className="bg-gray-100  p-4">
          <h1 className="text-2xl font-semibold mb-4">Complaint box </h1>
          <div className="max-w-full mx-auto mt-8">
            {accordionItems.map((item, index) => (
              <div key={index} className="border rounded-md my-2">
                <button
                  onClick={() => toggleAccordion(index)}
                  className={`w-full text-left py-2 px-4 font-semibold ${
                    activeIndex === index
                      ? "bg-[#082f49] text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}>
                  {item.title}
                </button>
                {activeIndex === index && (
                  <div className="p-4 bg-gray-100">{item.content}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ComplenBox;
