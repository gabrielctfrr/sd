import React from "react";
import MovieListItem from "./MovieListItem";
import "./MovieList.css";

function MovieList({ movies, onDeleteMovie, type }) {
  return (
    <ul className="MovieList">
      {movies.map((movie) => (
        <MovieListItem
          key={movie._id}
          movie={movie}
          onDeleteMovie={() => onDeleteMovie(movie)}
          type = {type}
        />
      ))}
    </ul>
  );
}

export default MovieList;
