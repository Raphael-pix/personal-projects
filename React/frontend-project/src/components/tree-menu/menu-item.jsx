import { useState } from "react";
import ListContainer from "./list-container";


export default function MenuItem({item}){

    const [displayCirrentChildren,setDisplayCurrentChildren] = useState({})
    
    function handleToggleChildren(getCurrentLabel){
        setDisplayCurrentChildren(
            {
                ...displayCirrentChildren,
                [getCurrentLabel]: !displayCirrentChildren[getCurrentLabel]
            }
        )
    }

    return <li className="menu-item">
        <div style={{display:"flex",alignItems: "center",gap:"20px"}}>
            <p>{item.label}</p>
            {
                item && item.children && item.children.length ? 
                <span className="icon" onClick={()=>handleToggleChildren(item.label)}>
                    {
                        displayCirrentChildren[item.label]? "-" : "+"
                    }
                </span>
                : null
            }
        </div>
        {
            item && item.children && item.children.length > 0 && displayCirrentChildren[item.label] ? 
                <ListContainer list={item.children} />
            : null
        }
    </li>
}