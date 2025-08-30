import { useState } from 'react';
import './task.css';

const initialTasks = [
  { id: 1, text: 'Learn React', completed: false },
  { id: 2, text: 'Build a Task Tracker', completed: true },
];

function Task() {
  const [tasks, setTasks] = useState(initialTasks);
  const [input, setInput] = useState('');

  // Stats
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const remaining = total - completed;

  // Add new task
  const addTask = () => {
    if (input.trim() === '') return;
    setTasks([
      ...tasks,
      { id: Date.now(), text: input, completed: false }
    ]);
    setInput('');
  };

  // Toggle completed
  const toggleTask = id => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // Delete task
  const deleteTask = id => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="container">
      <h2 className="title">Task Tracker</h2>

      {/* Stats */}
      <div className="stats">
        <div>
          <div className="stat-number">{total}</div>
          <div className="stat-label">Total Tasks</div>
        </div>
        <div>
          <div className="stat-number">{completed}</div>
          <div className="stat-label">Completed</div>
        </div>
        <div>
          <div className="stat-number">{remaining}</div>
          <div className="stat-label">Remaining</div>
        </div>
      </div>

      {/* Add task */}
      <div className="add-task-row">
        <input
          className="task-input"
          type="text"
          placeholder="Add a new task..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addTask()}
        />
        <button className="add-btn" onClick={addTask}>Add Task</button>
      </div>

      {/* Task list */}
      <div className="task-list">
        {tasks.map(task => (
          <div className={`task-row${task.completed ? ' completed' : ''}`} key={task.id}>
            <span className="task-text">{task.text}</span>
            <div className="task-actions">
              <button
                className={task.completed ? "undo-btn" : "complete-btn"}
                onClick={() => toggleTask(task.id)}
              >
                {task.completed ? "Undo" : "Complete"}
              </button>
              <button className="delete-btn" onClick={() => deleteTask(task.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Task;
