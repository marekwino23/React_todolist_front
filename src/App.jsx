import './App.css';
import ListTask from './components/ListTask';
import "react-datepicker/dist/react-datepicker.css";
import AddTask from './components/AddTask';

function App() {
  return (
    <div className="container">
      <div className="App">
      <header className="App-header">
        <h1>Todolist</h1>
      </header>
    </div>
    <div className="table">
      <AddTask></AddTask>
      <ListTask></ListTask>
      </div>
    </div>
   
  );
}

export default App;
