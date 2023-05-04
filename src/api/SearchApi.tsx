import axios from "axios";

export const SearchApi = async (keyword: string) => {
  try {
    const res = await axios.get(`/api/v1/search-conditions/?name=${keyword}`);
    console.info("calling api");
    return res.data;
  } catch (error) {
    return;
  }
};
