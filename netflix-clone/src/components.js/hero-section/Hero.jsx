import React, { useEffect, useState } from 'react'
import fetchMovies from '../../utils/fetchmovies'
import "./hero.css"
import {FaPlay,FaInfo,FaAngleRight,FaAngleLeft} from "react-icons/fa"


function Hero({url}) {
    const [moviePosters,setMoviePosters]=useState([])
    const [visiblePoster,setVisiblePoster]=useState(0)
    const [changeBg,setChangeBg] = useState(false)
    const imageUrl ="https://image.tmdb.org/t/p/original"
    
    async function fetchData(){
        try{

            const data =  await fetchMovies(url)
            setMoviePosters(data)
        }catch(e){
            console.error(e)
        }
    }

    useEffect(()=>{
        fetchData()    
    },[url])
    
    useEffect(() => {
        const interval = setInterval(() => {
            setVisiblePoster(prevVisiblePoster => (prevVisiblePoster === moviePosters.length - 1 ? 0 : prevVisiblePoster + 1));
        }, 10000); // Change poster every 5 seconds (5000 milliseconds)

        return () => clearInterval(interval); // Clean up the interval on component unmount
    }, [moviePosters]);

    useEffect(()=>{
        function handleResize(){
            if(window.innerWidth > 375){
                setChangeBg(false)
            }else setChangeBg(true)
        }
        window.addEventListener("resize",handleResize)
        return() => {
            window.addEventListener("resize",handleResize)
        }
    },[])


    function truncate(str, n) {
        if (str.length <= n) return str; // Return the original string if its length is less than or equal to n
    
        // Find the last space character within the substring up to length n
        const lastSpaceIndex = str.substr(0, n).lastIndexOf(' ');
    
        // If no space is found or the last space is at the end, truncate normally
        if (lastSpaceIndex === -1 || lastSpaceIndex === n - 1) {
            return str.substr(0, n - 1) + '...';
        } else {
            // Otherwise, truncate at the last space character
            return str.substr(0, lastSpaceIndex) + '...';
        }
    }

    function handlePrevious(){
        setVisiblePoster(prevVisiblePoster => (prevVisiblePoster === 0 ? moviePosters.length - 1 : prevVisiblePoster - 1));
    }
    function handleNext(){
        setVisiblePoster(prevVisiblePoster => (prevVisiblePoster === moviePosters.length - 1 ? 0 : prevVisiblePoster + 1));
    }

  return (
    <div className='hero-section'>
      {
        moviePosters.map((poster,index)=>{
            const heroBackground = `${imageUrl}${poster.backdrop_path}`;
            const heroBackground_phone = `${imageUrl}${poster.poster_path}`;
            return(
            <div  key={poster.id}  style={{backgroundImage: `url(${changeBg ? heroBackground_phone : heroBackground})` }} className={index === visiblePoster ? "current-poster" : "current-poster hide-current-poster"}>
                {/* to darken the background image so that the text is more visible */}
                <div className="cover-darken"></div>
                <div className="poster-info">
                    <div className="logo">
                        <img src="../images/simple-icons--netflix.svg" alt="netflix logo"/>
                        <span>{poster.media_type === "tv" ?  "series" : "movie"}</span>
                    </div>
                    
                    <h1 className='poster-title'>{poster.name || poster.original_title}</h1>
                
                    <p className='overview'>
                        {truncate(poster.overview,150)}
                    </p>
                    
                    <div className="buttons">
                        <button className='play'>
                            <FaPlay size={16}/>
                            Play
                        </button>
                        <button className='more'>
                            <FaInfo size={12}/>
                            More info
                        </button>
                    </div>
                </div>

                <div className="hero-icons">
                    <div className="hero-icon left" onClick={()=>handlePrevious()}>
                        <FaAngleLeft size={26} className='left-icon'/>
                    </div>
                    <div className="hero-icon right" onClick={()=>handleNext()}>
                        <FaAngleRight size={26} className='right-icon'/>
                    </div>
                </div>

                <div className="fade-bottom"></div>
            </div>
         )
        })
      }
    </div>
  )
}

export default Hero
