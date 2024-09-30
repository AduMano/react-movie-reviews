import { useState, useCallback } from "react";
import axios from "axios";

export const useFetchData = () => {
  const [data, setData] = useState(null); // State for storing data
  const [error, setError] = useState(null); // State for storing errors
  const [loading, setLoading] = useState(false); // State for loading status

  const config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    },
  };

  // Function for GET request
  const getData = useCallback(async (url) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(url, config);
      setData(response.data);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, []);

  // Function for POST request
  const postData = useCallback(async (url, postData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(url, postData, config);
      setData(response.data);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, []);

  // Function for PUT request
  const putData = useCallback(async (url, putData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.put(url, putData, config);
      setData(response.data);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, []);

  // Function for DELETE request
  const deleteData = useCallback(async (url) => {
    setLoading(true);
    setError(null);

    try {
      await axios.delete(url, config);
      setData(null);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    data,
    error,
    loading,
    getData, // Function to perform GET request
    postData, // Function to perform POST request
    putData, // Function to perform PUT request
    deleteData, // Function to perform DELETE request
  };
};
