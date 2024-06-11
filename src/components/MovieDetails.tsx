import { useEffect, useState } from "react";
import StarRating from "./StarRating";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import { MovieDetailsI, WatchedMovieI } from "../interfaces/types";

const KEY = "d84c3d7d";

interface MovieDetailsProps {
  selectedId: string;
  watched: WatchedMovieI[];
  onCloseMovie: () => void;
  onAddWatched: (wacthedMovie: WatchedMovieI) => void;
}

function MovieDetails({
  selectedId,
  watched,
  onCloseMovie,
  onAddWatched,
}: MovieDetailsProps) {
  const [movie, setMovie] = useState<MovieDetailsI | Record<string, never>>({});
  const [userRating, setUserRating] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const isAlreadyWatched = watched.some(
    (movie: WatchedMovieI) => movie.imdbID === selectedId
  );

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
    Type: type,
  } = movie;

  const handleAdd = function () {
    const newWatchedMovie: WatchedMovieI = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: type === "movie" ? Number(runtime.split(" ")[0]) : 0,
      userRating,
    };
    onAddWatched(newWatchedMovie);
    onCloseMovie();
  };

  useEffect(() => {
    const getMovieDetails = async function () {
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
        );

        if (!res.ok) throw new Error("Something went wrong :(");

        const data = await res.json();
        if (data.Response === "False") throw new Error("Movie not found!");

        setMovie(data);
      } catch (err) {
        if (err instanceof Error) {
          console.error(err.message);
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    getMovieDetails();
  }, [selectedId]);

  useEffect(() => {
    if (!title) return;
    document.title = `Movie | ${title}`;

    return () => {
      document.title = "usePopcorn";
    };
  }, [title]);

  return (
    <div className="details">
      {isLoading && <Loader />}
      {!isLoading && !error && (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${title}`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span> {imdbRating}
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!isAlreadyWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>You already rated this movie!</p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
      {error && <ErrorMessage message={error} />}
    </div>
  );
}

export default MovieDetails;
