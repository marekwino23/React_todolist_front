import cogoToast from 'cogo-toast';
import {useState} from 'react'
  
const AddTask = () => {
    const[text,setText] = useState("")
    const date = new Date()
    const handleChange = (e) => {
        setText(e.target.value)
      }  
    const onClick = () => {
        const clock = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        fetch('http://localhost:8000/addTask', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ date: date.toJSON().slice(0, 10).replace(/-/g, '-'), text, clock
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
          return(
            <div className="field">
                <input required value={text} onChange={handleChange} type="text"></input>
                <button onClick={onClick}>Add task</button>
            </div> 
            )}

export default AddTask;