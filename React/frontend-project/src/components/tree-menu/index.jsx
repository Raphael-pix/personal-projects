import ListContainer from "./list-container"
import "./style.css"

export default function TreeMenu({menus = []}){
    return <div className="container">
        <ListContainer list={menus}/>
    </div>
}