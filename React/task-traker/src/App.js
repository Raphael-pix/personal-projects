import {useState,useEffect} from "react"
import Header from "./components/Header"
import Tasks from "./components/Tasks"
import AddTask from "./components/AddTask"

function App() {
  const [showAddTask,setShowAddTask]= useState(false)
  const[tasks,setTasks] = useState([])

  useEffect(()=>{

    const getTasks = async ()=>{
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  },[])

//fetch tasks
  const fetchTasks = async()=>{
      const tasks =await fetch("http://localhost:5000/tasks")
                    .then(response => response.json())
                    .then(data =>{return data})
      return tasks
  }
   
//delete task
    const deleteTask = async (id)=>{
      await fetch(`http://localhost:5000/tasks/${[id]}`,{
        method:"DELETE",
      })

      setTasks(tasks.filter((task)=>
        task.id !== id
      ))
    }

    //add task
    const addTask =(task)=>{
      const id = Math.floor(Math.random()*1000)+1
      const newTask ={id, ...task}
      setTasks([...tasks,newTask])
    }

    //toggle reminder 
    const toggleReminder = (id)=>{
      setTasks(tasks.map((task)=>task.id === id?{ ...task,reminder: !task.reminder }:task))
    }
  return (
    <div className="container">
      <Header onAdd={()=>setShowAddTask(!showAddTask)} showAdd={showAddTask} />
      {showAddTask && <AddTask onAdd={addTask}/>}
      {
        tasks.length >0 ?(
        <Tasks tasks={tasks} onDelete = {deleteTask} onToggle={toggleReminder}/>)
        : (
          
          "No Tasks To Show"
        )}
    </div>
  );
}

export default App;
