import { SearchData } from "../types/types";

export const setItems = (searchKeywords: string, searchValue: SearchData[]) => {
  const searchValueObj = {
    searchValue,
    expire: Date.now() + 3600000,
  };
  localStorage.setItem(searchKeywords, JSON.stringify(searchValueObj));
};
