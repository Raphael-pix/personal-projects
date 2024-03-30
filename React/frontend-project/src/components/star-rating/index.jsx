
import { useState } from 'react'
import {FaStar} from 'react-icons/fa'
import './style.css'

export default function StarRating({noOfStars = 5}){
     
    const [rating, setRating] = useState(0)
    const [hover,setHover] = useState(0)
    

    function handleClick(getCurrentIndex){
        setRating(getCurrentIndex)
    }
    function handleMosueEnter(getCurrentIndex){
        setHover(getCurrentIndex)
    }
    function handleMosueDown(){
        setRating(hover)
    }

    return <div className="StarRating">

    {
        [...Array(noOfStars)].map((_,index) =>{

            index += 1
            return<FaStar
            key = {index}
            className = {index <= (hover||rating)  ? "active" : "inactive"}
            onClick={()=>handleClick(index)}
            onMouseEnter={()=>handleMosueEnter(index)}
            onMouseDown={()=>handleMosueDown()}
            size = "40"
            />
        })

    }

    </div>
}