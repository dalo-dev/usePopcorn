import { useEffect, useState } from "react";
import { WatchedMovieI } from "../interfaces/types";

export function useLocalStorageState(key: string) {
  const [value, setValue] = useState<WatchedMovieI[]>(() =>
    JSON.parse(localStorage.getItem("watched") || "[]")
  );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue] as const;
}
