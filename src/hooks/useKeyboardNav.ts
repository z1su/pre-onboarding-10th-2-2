import { useState, useEffect, useCallback } from "react";

const useKeyboardNavigation = (searchDataLength: number) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "ArrowDown") {
        setSelectedIndex(prev => Math.min(prev + 1, searchDataLength - 1));
      } else if (event.key === "ArrowUp") {
        setSelectedIndex(prev => Math.max(prev - 1, 0));
      }
    },
    [searchDataLength]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      setSelectedIndex(-1);
    };
  }, [handleKeyDown]);

  return { selectedIndex, setSelectedIndex };
};

export default useKeyboardNavigation;
