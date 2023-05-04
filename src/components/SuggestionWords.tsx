import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import SearchIcon from "../assets/search-icon.svg";
import SuggestionWordsList from "./SuggestionWordsList";
import { SearchApi } from "../api/SearchApi";
import { SearchData, SuggestionWordsProps, IsFocusedProps } from "../types/types";
import { setItems } from "../utills/setItems";
import { checkCacheExpired } from "../utills/checkCacheExpired";
import useKeyboardNav from "../hooks/useKeyboardNav";

const SuggestionWords = ({ isFocused, searchKeywords, changeKeyword }: SuggestionWordsProps) => {
  const [searchData, setSearchData] = useState<SearchData[]>([]);
  const { selectedIndex, setSelectedIndex } = useKeyboardNav(searchData.length);

  const fetchSearchData = useCallback(async (searchKeywords: string) => {
    if (searchKeywords) {
      
      const cachedData = checkCacheExpired(searchKeywords);
      if (cachedData) {
        return setSearchData(cachedData);
      } else {
        const result = await SearchApi(searchKeywords);
        setSearchData(result);
        setItems(searchKeywords, result);
      }
    } else {
      setSearchData([]);
    }
  }, []);

  useEffect(() => {
    fetchSearchData(searchKeywords);
  }, [searchKeywords, fetchSearchData]);

  return (
    <KeywordsContainer isFocused={isFocused}>
      <SearchKeyWordsContainer>
        <SearchIcon />
        <p>{changeKeyword}</p>
      </SearchKeyWordsContainer>
      <SuggestedKeywordsContainer>
        <SuggestedKeywordsTitle>추천 검색어</SuggestedKeywordsTitle>
        {searchData?.map((keyword: SearchData, index: number) => (
          <SuggestionWordsList
            key={keyword?.id}
            keyword={keyword?.name}
            isSelected={index === selectedIndex}
            handleMouseEnter={() => setSelectedIndex(index)}
          />
        ))}
        {searchData?.length === 0 && <NoSearchResults>검색어 없음</NoSearchResults>}
      </SuggestedKeywordsContainer>
    </KeywordsContainer>
  );
};

export default SuggestionWords;

const KeywordsContainer = styled.div<IsFocusedProps>`
  display: ${({ isFocused }) => (isFocused ? "block" : "none")};
  margin-top: 8px;
  border-radius: 20px;
  background-color: rgb(255, 255, 255);
  padding-top: 24px;
  padding-bottom: 16px;
  box-shadow: rgba(30, 32, 37, 0.1) 0px 2px 10px;
  width: 500px;
  svg {
    width: 16px;
    height: 16px;
    color: rgb(167, 175, 183);
    margin-right: 10px;
    margin-top: 3px;
  }
`;

const SearchKeyWordsContainer = styled.div`
  display: flex;
  padding-left: 24px;
  padding-bottom: 10px;
`;

const SuggestedKeywordsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const SuggestedKeywordsTitle = styled.p`
  color: rgb(106, 115, 123);
  font-size: 13px;
  font-weight: 400;
  padding-left: 24px;
  padding-bottom: 5px;
`;

const NoSearchResults = styled.p`
  margin-top: 8px;
  padding-left: 24px;
`;
