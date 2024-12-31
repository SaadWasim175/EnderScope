import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Search from "./Search";

const Navbar = ({ darkTheme, setDarkTheme }) => {
  const location = useLocation();

  const [search, setSearch] = useState("");

  return (
    <div
      className={`h-16 flex items-center justify-between border-b dark:border-gray-600 border-gray-300 ${darkTheme ? "bg-gray-800" : "bg-white"} mb-3 px-4`}
    >
      {/* Left Section: Logo */}
      <div className="flex items-center">
        <Link to="/" className="flex-shrink-0">
          <p
            className={`text-2xl font-semibold rounded-lg ${darkTheme ? "bg-gray-900 text-white" : "bg-blue-300 text-black"} px-3 py-1`}
          >
            EnderScope 🔭
          </p>
        </Link>
      </div>

      {/* Center Section: Search */}
      <div className="flex-grow flex justify-center">
        <Search />
      </div>

      {/* Right Section: Theme Toggle and Tabs */}
      <div className="flex items-center space-x-3">
        <button
          type="button"
          onClick={() => setDarkTheme(!darkTheme)}
          className={`rounded-xl px-4 py-2 ${darkTheme ? "bg-blue-200 text-black" : "bg-gray-800 text-white"} text-sm hover:shadow-md transition-all`}
        >
          {darkTheme ? "Light 💡" : "Dark 🌙"}
        </button>

        {["/search", "/images", "/videos"].map((path, index) => {
          const tabNames = ["Search", "Images", "Videos"];
          return (
            <Link
              key={index}
              to={path}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${location.pathname === path
                ? "bg-blue-500 text-white shadow-md"
                : `${darkTheme ? "bg-gray-700 text-gray-300 hover:bg-blue-400" : "bg-gray-200 text-gray-700 hover:bg-blue-300"}`
                }`}
            >
              {tabNames[index]}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Navbar;
