
import { useState } from "react";
import AddTaskForm from "./components/AddTaskForm";
import Footer from "./components/Footer";
import Header from "./components/Header"; 
import Stats from "./components/Stats";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, name: "Buying groceries", completed: false, priority: "high" },
    { id: 2, name: "Cleaning the house", completed: true, priority: "medium" },
    { id: 3, name: "Exercise", completed: false, priority: "low" },
  ]);

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const toggleTask = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  return (
    <div className="container">
      <Header title="Work manager" count={tasks.length} />
      <Stats tasks={tasks} />
      <AddTaskForm onAdd={addTask} />
      <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />
      
      <Footer /> 
    </div>
  );
}

export default App;