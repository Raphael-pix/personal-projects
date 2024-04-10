import Tabs from "./tabs";
import "./style.css" 

function RandomComponent(){
    return <div>This is some random content</div>
}

export default function TabTest(){

    const tabs = [
        {
            label:"Tab 1",
            content:"This is content for Tab 1"
        },
        {
            label:"Tab 2",
            content:"This is content for Tab 2"
        },
        {
            label:"Tab 3",
            content: <RandomComponent/>
        },
    ]

    function handleChange(currentTabIndex){
        console.log(currentTabIndex)
    }

    return <Tabs tabsContent={tabs} onChange={handleChange}/>
}