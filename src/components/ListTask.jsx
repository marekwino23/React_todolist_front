import { useCallback, useEffect, useRef, useState } from 'react';
import cogoToast from 'cogo-toast';
import UpdateTask from './UpdateTask'
import {
    BrowserRouter as Router,
    Route,
    Link
  } from "react-router-dom";

const ListTask = () => {
    const[tasks, setTasks] = useState([]);
    const notifyRef = useRef(null);
    
    useEffect(() => {
        fetch('http://localhost:8000/getTasks', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }).then(response => response.json())
        .then(tasks=> {
          setTasks(tasks.items);
        })
      },[]);

      const onStop = () => {
          const audio = document.querySelector("audio")
          audio.style.visibility = "hidden"
      }

      const onAlert = useCallback(() => {
        tasks.forEach((task) => {
            const times = task.time
            let time_hour = times.slice(0,2)
            let time_minutes = times.slice(3,5)
            const today = new Date()
            const hour = today.getHours()
            const minutes = today.getMinutes()
            const music = document.querySelector("audio")
            music.muted = false
                 if((+time_hour - 1) === hour && +time_minutes === minutes){
                    cogoToast.warn("Alert!!")
                    music.play()
                    document.getElementById("stop").style.visibility = "visible"
                }
        })
      }, [tasks]);
    
          useEffect(() => {
            if(tasks) {
              notifyRef.current = setInterval(onAlert,1000); 
            }
            return () => clearInterval(notifyRef.current);
          }, [onAlert, tasks]);
    

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
                    }
                     else {
                        console.log("failed")
                     }
      })
    }

    const listTasks = tasks.map((task) => {
        return (
          <li key={task.id}>{task.task_content},  {task.date},  {task.time}, status: {task.status}<button onClick={() => deleteTask(task)} id="del">delete</button> <button id="edit"><Link to={`/edit/${task.id}`}>
            edit</Link></button></li>
        )})
        return(
            <div>
                <button id="stop" style={{visibility:"hidden"}} onClick={onStop}>Stop</button>
                    <div className="box">
                         <h2>List of task</h2>
                     </div>
                <Router>
                    <ul className="list">
                        {listTasks} 
                    </ul> 
                    <Route path="/edit/:id">
                        <UpdateTask></UpdateTask>
                     </Route>
                </Router>
            </div>
        )}

export default ListTask;