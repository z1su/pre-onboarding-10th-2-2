import { useState, useEffect } from "react";

const useDebounce = (searchKeywords: string) => {
  const [debounceData, setDebounceData] = useState(searchKeywords);

  useEffect(() => {
    const debounce = setTimeout(() => {
      setDebounceData(searchKeywords);
    }, 500);

    return () => {
      clearTimeout(debounce);
    };
  }, [searchKeywords]);

  return debounceData;
};

export default useDebounce;
