import { WatchedMovieI } from "../interfaces/types";

interface WatchedListProps {
  watched: WatchedMovieI[];
  onDelete: (id: string) => void;
}
interface WatchedMovieProps {
  movie: WatchedMovieI;
  onDelete: (id: string) => void;
}

function WatchedMovie({ movie, onDelete }: WatchedMovieProps) {
  return (
    <li>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>

        <button className="btn-delete" onClick={() => onDelete(movie.imdbID)}>
          X
        </button>
      </div>
    </li>
  );
}

function WatchedList({ watched, onDelete }: WatchedListProps) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie key={movie.imdbID} movie={movie} onDelete={onDelete} />
      ))}
    </ul>
  );
}

export default WatchedList;
