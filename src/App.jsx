import { useEffect, useState } from 'react';
import './App.css';
import cogoToast from 'cogo-toast';
import UpdateTask from './components/UpdateTask'
import "react-datepicker/dist/react-datepicker.css";
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";

function App() {
  const[text,setText] = useState("")
  const[tasks, setTasks] = useState([])
  const handleChange = (e) => {
    setText(e.target.value)
  }
  useEffect(() => {
    fetch('http://localhost:8000/getTasks', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
        .then(response => response.json())
        .then(tasks=> {
          setTasks(tasks.items)
        })
      },[])

    const deleteTask = (task) => {
        const id = task.id
          fetch('http://localhost:8000/deleteTask/', {
          method: 'POST',
          headers: {
          'Content-Type': 'application/json',
        },
          body: JSON.stringify({id
        }),
      })
          .then(response => response.json())
          .then(data => {
            if (data.message === "success") {
              cogoToast.success("Delete success")
              window.location.href='/'
            } else {
              console.log("failed")
            }
      })
    }

    const listTasks = tasks.map((task) => {
    return (
      <li key={task.id}>{task.task_content},  {task.date},  {task.time}, status: {task.status}<button onClick={() => deleteTask(task)} id="del">delete</button> <button id="edit"><Link to={`/edit/${task.id}`}>
        edit</Link></button></li>
    )})

  const addTask = () => { 
    const date = new Date()
    fetch('http://localhost:8000/addTask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ date: date.toJSON().slice(0, 10).replace(/-/g, '-'), text,
        }),
      })
          .then(response => response.json())
          .then(data => {
            if (data.message === "success") {
              cogoToast.success("Task added")
              window.location.href='/'
            } else {
              console.log("failed")
            }
          })
  }
  return (
    <div className="container">
      <div className="App">
      <header className="App-header">
        <h1>Todolist</h1>
      </header>
    </div>
    <div className="field">
    <input required value={text} onChange={handleChange} type="text"></input>
    <button onClick={addTask}>Add</button>
    </div>
    <div className="table">
      <div className="box">
      <h2>List of task</h2>
      </div>
      <Router>
        <Route path="/edit/:id">
        <UpdateTask></UpdateTask>
        </Route>
      <ul className="list">
         {listTasks} 
      </ul>
      </Router>
      </div>
    </div>
   
  );
}

export default App;
