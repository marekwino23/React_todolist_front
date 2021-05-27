import { useParams } from "react-router";
import { useEffect, useState } from 'react';
import cogoToast from 'cogo-toast';
import DatePicker from "react-datepicker";
import TimePicker from 'react-time-picker';
import "react-datepicker/dist/react-datepicker.css";

const UpdateTask = () => {
    const {id} = useParams()
    const [task,setTask] = useState("")
    const [content,setContent] = useState("")
    const [date,setDate] = useState("")
    const [time,setTime] = useState()
    const [status,setStatus] = useState("")

    useEffect(() => {
        fetch(`http://localhost:8000/getcurrentTask/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
            .then(response => response.json())
            .then(task=> {
              setTask(task)
            })
          },[id])

    const handleChange = (e) => {
        if(e.target.name === "content"){
            setContent(e.target.value)
            console.log(content)
        }
        else if(e.target.name === "status"){
            setStatus(e.target.value)
            console.log(status)
        }

}
      const onClick = () => {
        const id = task.id
            if(date === "" && content === "" && status === "" && time === undefined){
              window.location.href='/'
            }
            else{
              fetch(`http://localhost:8000/updateTask`, {
                    method: 'PATCH',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({id, content, date: date.toLocaleDateString().slice(0,10), status, time})
                  })
                  .then(response => response.json())
                  .then(data => {
                    if (data.info === "update success") {
                      cogoToast.success("Update success")
                      window.location.href='/'
                    } else {
                      console.log("failed")
                    }
              })}             
            }              

return(
   <div className="edit">
       <h2>Edit task</h2>
        <p>id: {task.id}</p>  
        <input id="field" onChange={handleChange} type="text" name="content" value={content} placeholder={task.content}/>
        <br></br>
        date: <DatePicker
        required
        onChange={setDate} 
        selected={date}/>
        <br></br>
        <br></br>
        time: <TimePicker
        onChange={setTime}
        value={time}/>
       <br></br>
       <br></br>
       status: <select onChange={handleChange} name="status">
                  <option></option>  
                  <option value="delayed">delayed</option>
                  <option value="done">done</option>
                  <option value="inprogress">inprogress</option>
              </select> 
        <br></br>
        <button onClick={onClick}>Update task</button>   
   </div>
)
}

export default UpdateTask;