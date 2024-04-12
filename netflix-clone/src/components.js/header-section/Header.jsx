import menu from "./navMenu";
import {FaSearch,FaBell} from "react-icons/fa"
import "./header.css"
import { useEffect, useState } from "react";
import requests from "../../utils/request";

export default function Header(){

    const base_URL = "https://api.themoviedb.org/3"
    const imageUrl ="https://image.tmdb.org/t/p/original"

    const [inputValue,setInputValue]=useState("")
    const [searchResults,setSearchResults]=useState([])
    const[show,handleShow]=useState(false)
    const [changeLogo,setChangeLogo]=useState(false)
    const [isSearchVisible,setIsSearchVisible] = useState(false)

    useEffect(()=>{
        window.addEventListener("scroll",()=>{
            if(window.scrollY>100){
                handleShow(true)
            }else handleShow(false)
        })
    },[])
    useEffect(()=>{
        function handleResize(){
            if(window.innerWidth > 375){
                setChangeLogo(false)
            }else setChangeLogo(true)
        }

        window.addEventListener("resize",handleResize)

        return() => {
            window.addEventListener("resize",handleResize)
        }
    },[])

    async function searchInfo(value){
        try{
            const response = await fetch(`${base_URL}${requests.getSearch}&query=${value}`)
            const data = await response.json()
            setSearchResults(data.results)
            console.log(searchResults)
        }catch(e){
            console.log(e)
        }
    }

    function toggleSearch(){
        setIsSearchVisible(!isSearchVisible)
    }
    function handleChange(value){
        setInputValue(value)
        searchInfo(value)
    }

    return <div className="header-container" style={show ? {backgroundColor:"#111"}:{backgroundColor:"transparent"}}>
        <img src={changeLogo ? "../images/simple-icons--netflix.svg" : "../images/logos--netflix.svg"} alt="netflix logo" className="logo"/>

        <ul className="nav-menu">
            {
                menu.map(menuItem =>{
                    return <li className="menu-item" key={menuItem.label}>{menuItem.label}</li>
                })
            }
        </ul>

        <div className="right-section">
            

            <div className="search-options-container">
                <div className={`search-container ${isSearchVisible ? "visible" : ""}`}>
                     <FaSearch size={17} className="icons search" onClick={()=>toggleSearch()}/>
                     <input type="text" name="search" placeholder="search for movies/series"className="search-input"  onChange={(e)=>handleChange(e.target.value)}/>
                </div>
                <div className="search-results">
                    {
                        searchResults.map(result=>(
                            result.poster_path ? 
                                <div className="result">
                                    <img src={`${imageUrl}${result.poster_path}`} alt={result.original_name || result.name || result.original_title || result.title} />
                                    <p>{result.original_name || result.name || result.original_title || result.title}</p>
                                </div>
                            : null
                        ))

                    }
                </div>
            </div>
            
            <FaBell size={17} className="icons notification"/>
            <div className="profile-box">
                <img src="../images/Netflix-avatar.png" alt="netflix avatar" />
            </div>
        </div>
    </div>

}