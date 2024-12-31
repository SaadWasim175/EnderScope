import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useResultContext } from "../contexts/ResultContextProvider";
import Loading from "./Loading";
import ReactPlayer from "react-player";

const Results = () => {
  const {
    results,
    isLoading,
    getResults,
    searchTerm,
    imageResults,
    getImages,
    videos,
    setVideos,
    getVideos,
  } = useResultContext();
  const location = useLocation();

  useEffect(() => {
    getResults(`${searchTerm}`);
    getImages(`${searchTerm}`);
    getVideos(`${searchTerm}`);
  }, []);

  if (isLoading) return <Loading />;

  switch (location.pathname) {
    case "/search":
      return (
        <div className="flex flex-wrap justify-between space-y-6 sm:px-56">
          {results?.result?.map(({ href, title }, index) => (
            <div className="md:w-2/5 w-full" key={index}>
              <a href={href} target="_blank" rel="noreferrer">
                <p className="text-sm">
                  {href.length > 30 ? href.substring(0, 30) : href}
                </p>
                <p className="text-lg hover:underline dark:text-blue-300 text-blue-700">
                  {title}
                </p>
              </a>
            </div>
          ))}
        </div>
      );
    case "/images":
      return (
        <div className="flex flex-wrap justify-center gap-8 p-6">
          {imageResults?.result?.map(({ url, title, image }, index) => (
            <div
              className="w-64 bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transform hover:scale-105 transition duration-300 hover:bg-gray-300"
              key={index}
            >
              <a href={url} target="_blank" rel="noreferrer">
                <img
                  src={image}
                  alt={title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 dark:bg-gray-800">
                  <p className="text-sm text-gray-700 font-semibold truncate dark:text-white">
                    {title}
                  </p>
                </div>
              </a>
            </div>
          ))}
        </div>
      );

    case "/videos":
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
          {videos?.result?.map((video, index) => (
            <div
              key={index}
              className="relative group p-4 rounded-lg shadow-lg bg-gray-300 dark:bg-gray-700 hover:shadow-xl hover:scale-105 transition-transform duration-300"
            >
              {/* Video Player */}
              <ReactPlayer
                url={video.content}
                controls
                width="100%"
                height="250px"
                className="rounded-lg"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-center p-4">
                {/* Description */}
                <p className="text-white text-sm font-medium mb-3">
                  {video.description || "No description available"}
                </p>
                {/* External Link */}
                <a
                  href={video.content}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-white bg-red-600 hover:bg-red-500 py-2 px-4 rounded-md font-medium shadow-md"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M12.293 2.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-10 10a1 1 0 01-.512.274l-5 1a1 1 0 01-1.176-1.176l1-5a1 1 0 01.274-.512l10-10zm-9.793 14.5L3 14.707V17h2.293l1.5-1.5H12V16H7.293l-4 4zm2.707-2h2.293l9-9L14 3.293l-9 9V14z" />
                  </svg>
                  <span>Watch on YouTube</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      );

    default:
      return <div>ERROR: Page Not Found!</div>;
  }
};

export default Results;
