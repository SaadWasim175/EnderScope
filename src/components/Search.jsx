import React, { useState, useEffect } from "react";
import { useResultContext } from "../contexts/ResultContextProvider";
import { useDebounce } from "use-debounce";

const Search = () => {
  const [text, setText] = useState("latest tech trends");
  const { setSearchTerm, isLoading, getResults, getImages, getVideos } =
    useResultContext();
  const [debouncedValue] = useDebounce(text, 500);

  useEffect(() => {
    if (debouncedValue) setSearchTerm(debouncedValue);
  }, [debouncedValue]);

  const handleSearch = () => {
    getResults(debouncedValue); // Web search
    getImages(debouncedValue); // Image search
    getVideos(debouncedValue); // Video search
  };

  return (
    <div className="flex justify-center items-center w-full mt-4 sm:mt-0">
      <div className="flex items-center bg-gray-200 dark:bg-gray-700 rounded-full shadow-lg w-full max-w-md p-1">
        <input
          value={text}
          type="text"
          placeholder="Search..."
          className="flex-grow text-black dark:text-white dark:border-gray-900 p-3 rounded-l-full outline-none bg-gray-200 dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400"
          onChange={(e) => setText(e.target.value)}
        />
        <button
          type="button"
          className="bg-blue-500 dark:bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-500 text-white dark:text-gray-100 rounded-full p-3 mx-1 transition-all duration-300"
          aria-label="Search"
          onClick={handleSearch}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 sm:h-6 sm:w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11 4a7 7 0 110 14 7 7 0 010-14zm10 10l-3.87-3.87"
            />
          </svg>
        </button>
      </div>
      {isLoading && (
        <div className="absolute top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex justify-center items-center z-10">
          <div className="spinner-border text-white" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
