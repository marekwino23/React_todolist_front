import { useEffect, useState } from 'react';
import './App.css';
import cogoToast from 'cogo-toast';
import UpdateTask from './components/UpdateTask'
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
      <li key={task.id}>id: {task.id} content: {task.task_content} date: {task.date}<button onClick={() => deleteTask(task)} id="del">delete</button> <Link to={`/edit/${task.id}`} >
        Edit</Link> </li>
    )})

  const addTask = () => {
    const dateformat = new Date()
    const date = dateformat.toJSON().slice(0, 10).replace(/-/g, '-')
    fetch('http://localhost:8000/addTask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ date, text
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
