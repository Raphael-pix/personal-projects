import "./style.css"
import gallery from "./gallery"
import {FaArrowAltCircleLeft,FaArrowCircleRight} from "react-icons/fa"
import { useState } from "react";

export default function ImageSlider(){

    const[imageIndex,setImageIndex] = useState(0)


    function handlePrevious(){
       setImageIndex(imageIndex === 0 ? gallery.length - 1 : imageIndex-1)
    }
    function handleNext(){
        setImageIndex(imageIndex === gallery.length - 1 ? 0 : imageIndex+1)
    }


    return <div className="container">
        <div className="image-container">
            <FaArrowAltCircleLeft className="arrow left-arrow" onClick={()=>handlePrevious()}/>
        {
                gallery.map( (image,index) => {
                    let imageSrc = `./images/${image.src}.jpg`;
                    return  <img 
                    src={imageSrc} 
                    alt={image.alt} 
                    className={imageIndex === index ? "image current-image" : "image hidden-image"}
                    />
                }
            )
        }
            <FaArrowCircleRight className=" arrow right-arrow" onClick={()=>handleNext()}/>
        </div>

    </div>
}