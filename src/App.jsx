import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Router from "./components/Router";
import Footer from "./components/Footer";

function App() {
  const [darkTheme, setDarkTheme] = useState(false);

  useEffect(() => {
    if (darkTheme) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkTheme]);

  return (
    <>
      <div className="">
        <div className="bg-gray-100 text-black min-h-full dark:bg-gray-900 dark:text-gray-200">
          <Navbar darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
          <Router />
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
