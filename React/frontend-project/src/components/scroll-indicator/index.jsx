
import "./style.css"
import { useEffect, useState } from "react"


export default function ScrollIndicator({url}){
    
    const [data,setData]=useState([])
    const [indicatorPercentage,setIndicatorPercentage]=useState(0)
    
    async function fetchData(getDataUrl){
        try{
            const response = await fetch(getDataUrl)
            const data = await response.json()

            setData(data)
        }catch(err){
            console.log(err)
        }
    }
   
    useEffect(()=>{
        fetchData(url)
    },[url])

    function handleScrollIndicator(){
        const howMuchScrolled = document.body.scrollTop || document.documentElement.scrollTop
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight

        setIndicatorPercentage(Math.round((howMuchScrolled/height)*100))
      }

    useEffect(()=>{
        window.addEventListener("scroll",handleScrollIndicator)
        return ()=>{
            window.removeEventListener("scroll",()=>{})
        }
    },[])
    console.log(indicatorPercentage)

    return <div className="container">
        <div className="scroll-indicator-container">
            <h1>custom scroll indicator</h1>
            <div className="top-indicator">
                <div className="current-indicator" style={{width:`${indicatorPercentage}%`}}>
                </div>
            </div>
        </div>
        <ul className="data-list">
            {
                data.map(dataItem=>{
                   return <li className="data-item">{dataItem}</li>
                })
            }
        </ul>
    </div>
}