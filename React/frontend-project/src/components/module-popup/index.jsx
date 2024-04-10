import "./module.css"
import { useState } from "react"
import Module from "./module"


export default function ModuleTest(){

    const [showModulePopup,SetShowModulePopup]=useState(false)

    function handleToggleModulePopup(){
        SetShowModulePopup(!showModulePopup)
    }

    return <div className="container">
        <button onClick={handleToggleModulePopup}>Open module Popup</button>
        {showModulePopup && <Module
        body={"customized body"}
        closeModule={()=>handleToggleModulePopup()}
        />}
    </div>
}