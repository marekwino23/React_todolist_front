import './App.css';
import ListTask from './components/ListTask';
import AddTask from './components/AddTask';
import { useState, useEffect } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pobranie zadań z backendu przy starcie
  useEffect(() => {
    fetch("https://todolist-python-e5oj.onrender.com/tasks")
      .then(res => res.json())
      .then(data => {
        setTasks(data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError("Nie udało się pobrać zadań");
        setLoading(false);
      });
  }, []);

  return (
    <div className="container">
      <div className="App">
        <header className="App-header">
          <h1>Todolist</h1>
        </header>
      </div>
      <div className="table">
        <AddTask tasks={tasks} setTasks={setTasks} />
        <ListTask tasks={tasks} setTasks={setTasks} />
      </div>
    </div>
  );
}

export default App;