import { useEffect, useState } from "react";
import { WatchedMovieI } from "./interfaces/types";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import Logo from "./components/Logo";
import Search from "./components/Search";
import NumResults from "./components/NumResults";
import MovieList from "./components/MovieList";
import Box from "./components/Box";
import Summary from "./components/Summary";
import WatchedList from "./components/WatchedList";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import MovieDetails from "./components/MovieDetails";
import { useMovies } from "./hooks/useMovies";

function App() {
  const handleSelectedMovie = function (id: string) {
    setSelectedId((selectedId) => (selectedId === id ? "" : id));
  };

  const handleCloseMovie = function () {
    setSelectedId("");
  };

  const handleAddWatched = function (movie: WatchedMovieI) {
    setWatched((currentWatched) => [...currentWatched, movie]);
  };

  const handleDeleteWatched = function (id: string) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  };

  const [watched, setWatched] = useState<WatchedMovieI[]>(() =>
    JSON.parse(localStorage.getItem("watched") || "[]")
  );
  const [query, setQuery] = useState<string>("");
  const [selectedId, setSelectedId] = useState<string>("");
  const { movies, isLoading, error } = useMovies(query);

  useEffect(() => {
    localStorage.setItem("watched", JSON.stringify(watched));
  }, [watched]);

  return (
    <>
      <Navbar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Navbar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectedMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <Summary watched={watched} />
              <WatchedList watched={watched} onDelete={handleDeleteWatched} />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

export default App;
