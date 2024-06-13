import { useEffect, useRef } from "react";

interface SearchProps {
  query: string;
  setQuery: (q: string) => void;
}

function Search({ query, setQuery }: SearchProps) {
  const inputElm = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const callback = function (e: KeyboardEvent) {
      if (document.activeElement === inputElm.current) return;
      if (e.code === "Enter") {
        inputElm.current && inputElm.current.focus();
        setQuery("");
      }
    };

    document.addEventListener("keydown", callback);

    return () => document.removeEventListener("keydown", callback);
  }, [setQuery]);

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
