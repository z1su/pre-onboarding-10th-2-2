export interface IsFocusedProps {
  isFocused: boolean;
  searchKeywords?: string;
}

export interface SearchData {
  name: string;
  id: number;
}

export interface SuggestionWordsProps {
  isFocused: boolean;
  searchKeywords: string;
  changeKeyword: string;
}

export interface SuggestionWordsListProps {
  keyword: string;
  isSelected: boolean;
  handleMouseEnter: () => void;
}

export interface IsSelectedProps {
  isSelected: boolean;
}
