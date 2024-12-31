import React, { createContext, useContext, useState } from "react";

const ResultContext = createContext();
const baseURL = "https://google-api31.p.rapidapi.com";

export const ResultContextProvider = ({ children }) => {
  const [results, setResults] = useState([]);
  const [imageResults, setImageResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [videos, setVideos] = useState([]);

  const apiKey = "be14ad96d9msh82752b2a3b1f0bap1f81fajsnff07ee81824b";

  const getResults = async (query) => {
    setIsLoading(true);

    const options = {
      method: "POST",
      headers: {
        "x-rapidapi-key": apiKey,
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({
      text: query,
      safesearch: "off",
      timelimit: "",
      region: "wt-wt",
      max_results: 20,
    });

    try {
      const response = await fetch(`${baseURL}/websearch`, {
        ...options,
        body,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      setResults(data);
      //console.log("Web Search API RESULTS: ", data.result);
    } catch (error) {
      console.error("Failed to fetch web results:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getImages = async (query) => {
    setIsLoading(true);

    const options = {
      method: "POST",
      headers: {
        "x-rapidapi-key": apiKey,
        "Content-Type": "application/json",
        "x-rapidapi-host": "google-api31.p.rapidapi.com",
      },
    };

    const body = JSON.stringify({
      text: query,
      safesearch: "off",
      region: "wt-wt",
      color: "",
      size: "",
      type_image: "",
      layout: "",
      max_results: 100,
    });

    try {
      const response = await fetch(`${baseURL}/imagesearch`, {
        ...options,
        body,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      setImageResults(data);
      // console.log("Image Search API RESULTS: ", data.result);
    } catch (error) {
      console.error("Failed to fetch image results:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getVideos = async (query) => {
    setIsLoading(true);

    const options = {
      method: "POST",
      headers: {
        "x-rapidapi-key": apiKey,
        "x-rapidapi-host": "google-api31.p.rapidapi.com",
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({
      text: query,
      safesearch: "off",
      timelimit: "",
      duration: "",
      resolution: "",
      region: "wt-wt",
      max_results: 50,
    });

    try {
      const response = await fetch(`${baseURL}/videosearch`, {
        ...options,
        body,
      });
      const data = await response.json();

      if (!response.ok) {
        console.error("Error from API:", data);
        return;
      }

      setVideos(data);
      //  console.log("Video Search Results:", data);
    } catch (error) {
      console.error("Request failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ResultContext.Provider
      value={{
        getResults,
        getImages,
        results,
        imageResults,
        searchTerm,
        setSearchTerm,
        isLoading,
        getVideos,
        videos,
        setVideos,
      }}
    >
      {children}
    </ResultContext.Provider>
  );
};

export const useResultContext = () => useContext(ResultContext);
