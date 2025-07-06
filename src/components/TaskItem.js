import React from 'react';

const TaskItem = ({ task, onToggleComplete, onDelete, onEdit }) => {
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      onDelete(task.id);
    }
  };

  const createdAt = new Date(task.createdAt);
  const formattedDate = createdAt.toLocaleString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit', hour12: false
  });

  return (
    <div
      className={`TaskItem${task.completed ? ' completed' : ''}`}
      style={{
        border: '1px solid #ddd',
        borderRadius: 6,
        padding: 12,
        marginBottom: 12,
        background: task.completed ? '#f0f0f0' : '#f9f9fb',
        opacity: task.completed ? 0.6 : 1,
        transition: 'background 0.2s, opacity 0.2s',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleComplete(task.id)}
        />
        <strong style={{ textDecoration: task.completed ? 'line-through' : 'none', fontSize: '1.1rem' }}>{task.title}</strong>
        <span style={{ marginLeft: 'auto', fontSize: 13, color: task.completed ? '#4caf50' : '#ff9800' }}>
          {task.completed ? 'Completed' : 'Pending'}
        </span>
      </div>
      {task.description && <div style={{ margin: '8px 0', color: '#555', textDecoration: task.completed ? 'line-through' : 'none' }}>{task.description}</div>}
      {task.dueDate && (
        <div style={{ fontSize: 12, color: '#b77' }}>
          Due: {new Date(task.dueDate).toLocaleDateString()}
        </div>
      )}
      <div style={{ fontSize: 12, color: '#888' }}>
        Created: {formattedDate}
      </div>
      <div style={{ marginTop: 8 }}>
        <button onClick={() => onEdit(task)} style={{ marginRight: 8 }}>Edit</button>
        <button onClick={handleDelete} style={{ color: 'red' }}>Delete</button>
      </div>
    </div>
  );
};

export default TaskItem;
