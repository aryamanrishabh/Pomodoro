import "./App.css";
import Pomodoro from "./Pomodoro";
import Navbar from "./Navbar";

function App() {
  return (
    <div className="Page">
      <Navbar />
      <div className="App">
        <Pomodoro />
      </div>
    </div>
  );
}

export default App;
