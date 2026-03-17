function Stats({ tasks }) {
const total = tasks.length;
const completed = tasks.filter(t => t.completed).length;
const pending = total - completed;
 const presentage = total === 0 ? 0 : Math.round((completed/total)*100)

  return (
    <div className="stats">
      <h3>Task statistics</h3>
      <div className="stats-grid">
        <span> Total: {total}</span>
        <span> Completed: {completed}</span>
        <span> Pending: {pending}</span>
      </div>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${presentage}%` }}
        ></div>
        <p>{presentage}% Completed</p>

        {
          presentage ===100 ? ( <p className="success">Congratulations, you have completed all the tasks.</p> )
          :(<p className="keep-going"> Go on, you're doing great.  </p>)
        }

{pending >5 && ( <p className="warning">You have many pending tasks.</p>)}

      </div>
    </div>
  );
}

export default Stats;