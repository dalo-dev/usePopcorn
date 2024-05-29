import { MovieI } from "../interfaces/types";

interface NumResultsProps {
  movies: MovieI[];
}

function NumResults({ movies }: NumResultsProps) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}

export default NumResults;
