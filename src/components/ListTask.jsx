import { useEffect, useState } from "react";

const ListTask = ({ tasks, setTasks }) => {
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
        setTasks(tasks);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError("Nie udało się pobrać zadań");
        setTasks([]);
        setLoading(false);
      });
  }, []);

  // Zmiana statusu zadania
  const changeStatusTask = (task) => {
    const newStatus = task.done === 0 || task.done === false ? 1 : 0;

    fetch("http://127.0.0.1:8000/change_status", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: task.id, done: newStatus }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "success") {
          setTasks((prev) =>
            prev.map((t) => (t.id === task.id ? { ...t, done: newStatus } : t))
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
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: taskId }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "success") {
          setTasks((prev) => prev.filter((t) => t.id !== taskId));
        } else {
          console.error("Delete failed:", data);
        }
      })
      .catch((err) => console.error("Delete error:", err));
  };

  if (loading)
    return <p className="text-center mt-6">Ładowanie zadań...</p>;
  if (error)
    return <p className="text-center mt-6 text-red-600">{error}</p>;

  return (
    <div className="max-w-md mx-auto mt-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Lista zadań</h2>

      {tasks.length === 0 ? (
        <p className="text-center text-gray-500">Brak zadań do wyświetlenia.</p>
      ) : (
        <ul className="space-y-3">
          {tasks.map((task, index) => (
            <li
              key={task.id}
              className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <span className="flex-1">
                {index + 1}. {task.name}
              </span>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={task.done === 1 || task.done === true}
                  onChange={() => changeStatusTask(task)}
                  className="w-5 h-5"
                />
                <button
                  onClick={() => deleteTask(task.id)}
                  className="bg-teal-700 text-white px-3 py-1 rounded hover:bg-teal-800 transition-colors"
                >
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