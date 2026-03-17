function TaskItem({ task, onToggle, onDelete }) {
  const itemStyle = {
    textDecoration: task.completed ? "line-through" : "none",
    color: task.completed ? "gray" : "black",
    opacity: task.completed ? 0.6 : 1,
  };

  const priorityColors = {
    high: "red",
    medium: "orange",
    low: "blue",
  };
  console.log(task);
  console.log(task.completed);

  return (
    <li className="task-item">
      <span
        className="task-text"
        onClick={() => onToggle(task.id)}
        style={itemStyle}
      >
        {task.completed ? "👍" : "❌"} {task.name}
        <span className="priority-badge" style={{backgroundColor:priorityColors[task.priority]}}>
          {task.priority === "high" && "🔥"}
          {task.priority === "medium" && "⚡"}
          {task.priority === "low" && "❄️"}
        </span>
      </span>
      {task.completed && (
        <button className="delete-btn" onClick={() => onDelete(task.id)}>
         Delete
        </button>
      )}
    </li>
  );
}

export default TaskItem;