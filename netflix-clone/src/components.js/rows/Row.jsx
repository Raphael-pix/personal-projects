import { useEffect, useState } from "react";
import "./rows.css";
import fetchMovies from "../../utils/fetchmovies";
import Popup from "../movie-popup/popup";

export default function Row({ title, url, isLarge }) {
  const imageUrl = "https://image.tmdb.org/t/p/original";

  const [movies, setMovies] = useState([]);
  const [isClicked,setIsClicked] = useState(false)

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

function toggleIsClicked(){
  setIsClicked(!isClicked)
}


  return (
    <div className="row-container">
      <h1 className="row-title">{title}</h1>
      <div className="movie-posters">
        {movies.map((movie) => 
          <div className={`poster ${isLarge?"poster-large":""}`} key={movie.id} onClick={()=>toggleIsClicked()}>
              <img
                src={`${imageUrl}${ movie.poster_path}`}
                alt={movie.title || movie.name}
                className={`movie-poster ${isLarge?"movie-poster-large":""}`}
              />
          </div> 
        )}
      </div>
    </div>
  );
}