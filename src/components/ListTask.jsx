import { useEffect, useState } from "react";

const ListTask = () => {
  const [tasks, setTasks] = useState([]);
  const [done, setDone] = useState(0)
  const [loading, setLoading] = useState(true);   // stan ładowania
  const [error, setError] = useState(null);       // stan błędu

  // Pobieranie zadań
  useEffect(() => {
    fetch("https://todolist-python-e5oj.onrender.com/tasks", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Błąd sieci: " + res.status);
        return res.json();
      })
      .then((tasks) => {
        setTasks(tasks || []);
        setLoading(false);
        console.log(tasks, "tasks")
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError("Nie udało się pobrać zadań");
        setTasks([]);
        setLoading(false);
      });
  }, []);



  const changeStatusTask = (task) => {
    fetch("https://todolist-python-e5oj.onrender.com/change_status", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: task.id, status: task.done === 0 ? 1: 0 }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "success") {
        const newStatus = task.done === 0 ? 1 : 0;
        setTasks((prev) =>
          prev.map((t) =>
            t.id === task.id ? { ...t, done: newStatus } : t
          )
        );
        } else {
          console.error("Change Task Status failed:", data);
        }
      })
      .catch((err) => console.error("Task error:", err));
  };

  // Usuwanie zadania
  const deleteTask = (taskId) => {
    fetch("https://todolist-python-e5oj.onrender.com/delete_tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: taskId }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "success") {
          // filtrujemy zadanie z lokalnego stanu zamiast reloadować stronę
          setTasks((prevTasks) => prevTasks.filter((t) => t.id !== taskId));
        } else {
          console.error("Delete failed:", data);
        }
      })
      .catch((err) => console.error("Delete error:", err));
  };

  if (loading) return <p className="text-center mt-6">Ładowanie zadań...</p>;
  if (error) return <p className="text-center mt-6 text-red-600">{error}</p>;

  return (
    <div className="max-w-md mx-auto mt-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Lista zadań</h2>
      {tasks.length === 0 ? (
        <p className="text-center text-gray-500">Brak zadań do wyświetlenia.</p>
      ) : (
        <ul className="space-y-3">
          {(tasks || []).map((task, index) => (
                    <li key={task.id} className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <span className="flex-1">{index + 1}. {task.name}</span>
            <div style={{display:"flex", gap:"10px"}} className="flex items-center space-x-3">
              <input 
                type="checkbox" 
                checked={task.done === 1}
                onChange={() => changeStatusTask(task)}
                className="w-5 h-5"
              />
              <button onClick={() => deleteTask(task.id)} className="bg-teal-700 text-white px-3 py-1 rounded hover:bg-teal-800 transition-colors">
                Usuń
              </button>
            </div>
          </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListTask;