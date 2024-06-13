import { useEffect, useState } from "react";
import { MovieI } from "../interfaces/types";
const KEY = "d84c3d7d";

export function useMovies(query: string) {
  const [movies, setMovies] = useState<MovieI[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const controller = new AbortController();
    const fetchMovies = async function () {
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          { signal: controller.signal }
        );

        if (!res.ok) throw new Error("Something went wrong :(");

        const data = await res.json();
        if (data.Response === "False") throw new Error("Movie not found!");

        setMovies(data.Search);
        setError("");
      } catch (err) {
        if (err instanceof Error && err.name !== "AbortError") {
          console.log(err.message);
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (!query.trim() || query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }

    fetchMovies();

    return () => {
      controller.abort();
    };
  }, [query]);

  return { movies, isLoading, error };
}
