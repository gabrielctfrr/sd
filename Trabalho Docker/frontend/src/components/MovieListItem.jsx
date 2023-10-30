import React from "react";
import "./MovieListItem.css";

function Movie({ movie, onDeleteMovie, type }) {
  const classNameType = "MovieListItem "+type;
  return (
    <li className={classNameType}>
      {movie.title}
      <button className="MovieListItem__Delete" onClick={onDeleteMovie}>
        <img src="/images/delete.svg" alt="Delete movie" />
      </button>
    </li>
  );
}

export default Movie;
