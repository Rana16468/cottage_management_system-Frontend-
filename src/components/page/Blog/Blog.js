import React from "react";
import BlogData from "../../../utils/BlogData.json";
const Blog = () => {
  /*const [blog, setBlog] = useState([]);
  const latestArticles = BlogData.articles.sort((a, b) => {
    return new Date(b.timestamp) - new Date(a.timestamp);
  });

  //   // For demonstration, let's assume the first half of the articles are the most recent
  const numPopularArticles = Math.floor(BlogData.articles.length / 2); // Half of the total articles

  //   // 'popularArticles' will be the first half of the sorted articles array (by timestamp)
  const popularArticles = latestArticles.slice(0, numPopularArticles);

  console.log(blog);*/

  return (
    <>
      <section className="px-5 py-10  dark:text-gray-800">
        <div className="container grid grid-cols-12 mx-auto gap-y-6 md:gap-10">
          <div className="flex flex-col justify-between col-span-12 py-2 space-y-8 md:space-y-16 md:col-span-3">
            <div className="flex flex-col space-y-8 md:space-y-12">
              <div className="flex flex-col space-y-2">
                <h3 className="flex items-center space-x-2 dark:text-gray-600">
                  <span className="flex-shrink-0 w-2 h-2 uppercase rounded-full dark:bg-violet-600"></span>
                  <span className="text-xs font-bold tracking-wider uppercase">
                    Exclusive
                  </span>
                </h3>
                <a
                  rel="noopener noreferrer"
                  href="..."
                  className="font-serif hover:underline">
                  Donec sed elit quis odio mollis dignissim eget et nulla.
                </a>
                <p className="text-xs dark:text-gray-600">
                  47 minutes ago by
                  <a
                    rel="noopener noreferrer"
                    href="..."
                    className="hover:underline dark:text-violet-600">
                    Leroy Jenkins
                  </a>
                </p>
              </div>
              <div className="flex flex-col space-y-2">
                <h3 className="flex items-center space-x-2 dark:text-gray-600">
                  <span className="flex-shrink-0 w-2 h-2 uppercase rounded-full dark:bg-violet-600"></span>
                  <span className="text-xs font-bold tracking-wider uppercase">
                    Exclusive
                  </span>
                </h3>
                <a
                  rel="noopener noreferrer"
                  href="..."
                  className="font-serif hover:underline">
                  Ut fermentum nunc quis ipsum laoreet condimentum.
                </a>
                <p className="text-xs dark:text-gray-600">
                  2 hours ago by
                  <a
                    rel="noopener noreferrer"
                    href="..."
                    className="hover:underline dark:text-violet-600">
                    Leroy Jenkins
                  </a>
                </p>
              </div>
              <div className="flex flex-col space-y-2">
                <h3 className="flex items-center space-x-2 dark:text-gray-600">
                  <span className="flex-shrink-0 w-2 h-2 uppercase rounded-full dark:bg-violet-600"></span>
                  <span className="text-xs font-bold tracking-wider uppercase">
                    Exclusive
                  </span>
                </h3>
                <a
                  rel="noopener noreferrer"
                  href="..."
                  className="font-serif hover:underline">
                  Nunc nec ipsum lobortis, pulvinar neque sed.
                </a>
                <p className="text-xs dark:text-gray-600">
                  4 hours ago by
                  <a
                    rel="noopener noreferrer"
                    href="..."
                    className="hover:underline dark:text-violet-600">
                    Leroy Jenkins
                  </a>
                </p>
              </div>
            </div>
            <div className="flex flex-col w-full space-y-2">
              <div className="flex w-full h-1 bg-opacity-10 dark:bg-violet-600">
                <div className="w-1/2 h-full dark:bg-violet-600"></div>
              </div>
              <a
                rel="noopener noreferrer"
                href="..."
                className="flex items-center justify-between w-full">
                <span className="text-xs font-bold tracking-wider uppercase">
                  See more exclusives
                </span>
                <svg
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 strokeCurrent dark:text-violet-600">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </a>
            </div>
          </div>
          {/*  middle points  */}
          <div className="  col-span-12  bg-center bg-no-repeat bg-cover xl:col-span-6 lg:col-span-5 md:col-span-9  ">
            <span className="absolute px-1 pb-2 text-xs font-bold uppercase border-b-2 left-6 top-6 dark:text-white dark:border-violet-600">
              paris, france
            </span>

            <div className="hero min-h-screen ">
              <div className="hero-content text-center">
                <div className="grid grid-cols-1 gap-2">
                  {BlogData?.articles.map((article, index) => (
                    <div
                      key={index}
                      className="w-full  bg-white shadow-lg rounded-lg overflow-hidden">
                      <img
                        className="w-full  object-cover object-center"
                        src={article.imageUrl}
                        alt={article.title}
                      />
                      <div className="p-4">
                        <h2 className="text-gray-800 text-lg font-semibold">
                          {article.title}
                        </h2>
                        <p className="mt-2 text-gray-600">{article.category}</p>
                        <p className="text-gray-600 text-sm mt-2">
                          {article.timestamp}
                        </p>
                        <div className="flex items-center mt-4">
                          <div className="flex-shrink-0">
                            <img
                              className="h-10 w-10 rounded-full"
                              src="https://randomuser.me/api/portraits/men/1.jpg"
                              alt="Author"
                            />
                          </div>
                          <div className="ml-3">
                            <p className="text-gray-800 text-sm font-semibold">
                              {article.author.name}
                            </p>
                            <a
                              href={article.author.profileUrl}
                              className="text-blue-500 text-xs"
                              target="_blank"
                              rel="noopener noreferrer">
                              View Profile
                            </a>
                          </div>
                        </div>
                        <a
                          href={article.articleUrl}
                          className="block bg-blue-500 hover:bg-blue-600 text-white font-semibold text-center mt-4 py-2 px-4 rounded"
                          target="_blank"
                          rel="noopener noreferrer">
                          Read More
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="hidden py-2 xl:col-span-3 lg:col-span-4 md:hidden lg:block">
            <div className="mb-8 space-x-5 border-b-2 border-opacity-10 dark:border-violet-600">
              <button
                type="button"
                className="pb-5 text-xs font-bold uppercase border-b-2 dark:border-violet-600">
                Latest
              </button>
              <button
                type="button"
                className="pb-5 text-xs font-bold uppercase border-b-2 dark:border- dark:text-gray-600">
                Popular
              </button>
            </div>
            <div className="flex flex-col divide-y dark:divide-gray-300">
              {BlogData?.articles?.map((v, index) => (
                <div key={index} className="flex px-1 py-4">
                  <img
                    alt=""
                    className="flex-shrink-0 object-cover w-20 h-20 mr-4 dark:bg-gray-500"
                    src={v.imageUrl}
                  />
                  <div className="flex flex-col flex-grow">
                    <a
                      rel="noopener noreferrer"
                      href="..."
                      className="font-serif hover:underline">
                      {v.title}
                    </a>
                    <p className="mt-auto text-xs dark:text-gray-600">
                      {v.timestamp}
                      <a
                        rel="noopener noreferrer"
                        href="..."
                        className="block dark:text-blue-600 lg:ml-2 lg:inline hover:underline">
                        {v.category}
                      </a>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;
