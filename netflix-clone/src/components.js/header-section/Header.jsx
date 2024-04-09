import menu from "./navMenu";
import {FaSearch,FaBell} from "react-icons/fa"
import "./header.css"
import { useEffect, useState } from "react";

export default function Header(){

    const[show,handleShow]=useState(false)

    useEffect(()=>{
        window.addEventListener("scroll",()=>{
            if(window.scrollY>100){
                handleShow(true)
            }else handleShow(false)
        })
    },[])

    return <div className="header-container" style={show ? {backgroundColor:"#111"}:{backgroundColor:"transparent"}}>
        <img src="../images/logos--netflix.svg" alt="netflix logo" className="logo"/>

        <ul className="nav-menu">
            {
                menu.map(menuItem =>{
                    return <li className="menu-item">{menuItem.label}</li>
                })
            }
        </ul>

        <div className="right-section">
            <FaSearch size={17} className="icons search"/>
            <FaBell size={17} className="icons notification"/>
            <div className="profile-box">
                {/* <img src="" alt="" /> */}
            </div>
        </div>
    </div>

}