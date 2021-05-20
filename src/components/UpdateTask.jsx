import { useParams } from "react-router";
import { useEffect, useState } from 'react';
import cogoToast from 'cogo-toast';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const UpdateTask = () => {
    const {id} = useParams()
    const [task,setTask] = useState("")
    const [content,setContent] = useState("")
    const [date,setDate] = useState("")
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
        else{
            setStatus(e.target.value)
            console.log(status)
    }

}
const onClick = () => {
    const id = task.id
    fetch(`http://localhost:8000/updateTask`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({id, content, date, status})
      })
      .then(response => response.json())
      .then(data => {
        if (data.info === "update success") {
          cogoToast.success("Update success")
          window.location.href='/'
        } else {
          console.log("failed")
        }
  })
}

return(
   <div className="edit">
       <h2>Edit task</h2>
         <p>id: {task.id}</p>  
         content: <input onChange={handleChange} type="text" name="content" value={content} placeholder={task.content}/>
         status: <select onChange={handleChange} name="status">
         <option value="inprogress">inprogress</option>
         <option value="done">done</option></select> 
         <DatePicker
        required
        onChange={date =>{
            setDate(date)
        }} 
        selected={date}
      />
         <button onClick={onClick}>Update task</button>   
   </div>
)
}

export default UpdateTask;