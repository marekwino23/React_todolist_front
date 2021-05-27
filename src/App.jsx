import './App.css';
import ListTask from './components/ListTask';
import "react-datepicker/dist/react-datepicker.css";
import audio from '../src/Alarm-Fast-A1-www.fesliyanstudios.com.mp3'
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
      <audio className="audio">
        <source src={audio} type="audio/mp3"></source>
      </audio>
      </div>
    </div>
   
  );
}

export default App;
