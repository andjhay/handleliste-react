import { useState, useEffect } from "react";
import { authFetch } from "../../utils/api/authFetch.js";

function useApi(url) {
  const [data, setData] = useState([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        setIsError(false);
        const fetchedData = await authFetch(url);
        setData(fetchedData.data);
      } catch (error) {
        console.log(error);
        setIsError(true);
      }
    }

    getData();
  }, [url]);

  return { data, isError };
}

export default useApi;
