import TaskItem from "./TaskItem";

function TaskList({ tasks, onToggle, onDelete }) {
  
  console.log("Current to-do list:", tasks);

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

export default TaskList;