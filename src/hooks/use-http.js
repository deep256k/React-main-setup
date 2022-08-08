import { useCallback, useState } from "react";

const useHttp = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const sendRequests = useCallback(async (requestObj, modifyData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(requestObj.url, {
        headers: requestObj.headers ? requestObj.headers : "",
        method: requestObj.method ? requestObj.method : "GET",
        body: requestObj.body ? requestObj.body : null,
      });
      if (!res.ok) {
        throw new Error("Something went wrong");
      }
      const data = await res.json();
      modifyData(data);
    } catch (err) {
      console.log("error", err);
      setError(err.message || "Something went wrong");
    }
    setLoading(false);
  }, []);

  return {
    error,
    loading,
    sendRequests,
  };
};
export default useHttp;
