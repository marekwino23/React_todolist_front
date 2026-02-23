import { useEffect, useState } from "react";

const AddTask = ({ tasks, setTasks }) => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null) 


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

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const onClick = async () => {
  if (!text.trim()) return;
  try {
    const response = await fetch("https://todolist-python-e5oj.onrender.com/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: text }),
    });
    const data = await response.json();
    if (data.id) {
      console.log(data, "data")
      setTasks(prev => [...prev, data]); // React-way
      setText(""); // czyścimy input
    } else {
      console.log("Failed to add task");
    }
  } catch (error) {
    console.log("Error:", error);
  }
};

  return (
     <div className="max-w-md mx-auto mt-6 p-4 bg-gray-50 rounded-lg shadow-lg">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Wpisz nazwa nowego zadania..."
          id="add task"
          value={text}
          onChange={handleChange}
          className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={onClick}
          className="px-4 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
        >
          Dodaj
        </button>
      </div>
    </div>
  );
};

export default AddTask;