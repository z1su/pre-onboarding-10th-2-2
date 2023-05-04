import styled from "styled-components";
import SearchIcon from "../assets/search-icon.svg";
import { SuggestionWordsListProps, IsSelectedProps } from "../types/types";

const SuggestionWordsList = ({
  keyword,
  isSelected,
  handleMouseEnter,
}: SuggestionWordsListProps) => {
  return (
    <SuggestionWordsListWrapper isSelected={isSelected} onMouseOver={handleMouseEnter}>
      <SearchIcon />
      <p>{keyword}</p>
    </SuggestionWordsListWrapper>
  );
};

export default SuggestionWordsList;

const SuggestionWordsListWrapper = styled.div<IsSelectedProps>`
  display: flex;
  padding: 8px 24px;
  background-color: ${({ isSelected }) => (isSelected ? "#f1f3f5" : "transparent")};
  cursor: pointer;
`;
