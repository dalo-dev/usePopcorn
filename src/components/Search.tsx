import { useRef } from "react";
import { useKey } from "../hooks/useKey";

interface SearchProps {
  query: string;
  setQuery: (q: string) => void;
}

function Search({ query, setQuery }: SearchProps) {
  const inputElm = useRef<HTMLInputElement>(null);

  useKey("Enter", () => {
    if (document.activeElement === inputElm.current) return;
    inputElm.current && inputElm.current.focus();
    setQuery("");
  });

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputElm}
    />
  );
}

export default Search;
