import { useEffect, useState } from "react";
import "./rows.css";
import fetchMovies from "../../utils/fetchmovies";

export default function Row({ title, url, isLarge }) {
  const imageUrl = "https://image.tmdb.org/t/p/original";

  const [movies, setMovies] = useState([]);

  async function fetchData() {
    try {
      const data = await fetchMovies(url);
      setMovies(data);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    fetchData();
  }, [url]);
  console.log(movies)

  return (
    <div className="row-container">
      <h1 className="row-title">{title}</h1>
      <div className="movie-posters">
        {movies.map((movie) => (
          <img
            src={`${imageUrl}${isLarge ? movie.poster_path : movie.backdrop_path}`}
            alt={movie.title || movie.name}
            className={`movie-poster ${isLarge?"movie-poster-large":""}`}
            title={!isLarge?movie.title || movie.name || movie.original_name || movie.original_title :null} 
            key={movie.id}
          />
        ))}
      </div>
    </div>
  );
}
