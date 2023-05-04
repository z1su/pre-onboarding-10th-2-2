export const checkCacheExpired = (searchKeywords: string) => {
  const obj = localStorage.getItem(searchKeywords);
  if (!obj) return null;

  const searchValueObj = JSON.parse(obj);
  if (Date.now() > searchValueObj.expire) {
    localStorage.removeItem(searchKeywords);
    return null;
  }
  return searchValueObj.searchValue;
};
