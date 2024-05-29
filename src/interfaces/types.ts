export interface MovieI {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

export interface WatchedMovieI extends MovieI {
  runtime: number;
  imdbRating: number;
  userRating: number;
}
