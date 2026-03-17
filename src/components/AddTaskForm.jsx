import { useState } from "react";

function AddTaskForm({onAdd}) {
const [text, setText] = useState("");
const [priority, setPriority] = useState("low");

const handleSubmit = (e) => {
    e.preventDefault();

    if (text.trim() === ""){
        alert("Please enter the task text");
        return;
    }
    const newTask= {
        id: Date.now(),
        name: text,
        completed: false,
        priority: priority
    }
    onAdd(newTask);

    setText("");
    setPriority("low");
}
    return (
        <form onSubmit={handleSubmit} className="task-form">
            <input type="text" placeholder="Enter a new task" value={text} onChange={(e) => setText(e.target.value)} className="task-input"/>
            <select value={priority} onChange={(e) => setPriority(e.target.value)} className="task-select">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>
            <button type="submit" className="add-btn">Add Task</button>
        </form>
    )
}

export default AddTaskForm