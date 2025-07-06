import React from 'react';

const TaskItem = ({ task, onToggleComplete, onDelete, onEdit }) => {
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      onDelete(task.id);
    }
  };

  return (
    <div style={{ border: '1px solid #ddd', borderRadius: 6, padding: 12, marginBottom: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleComplete(task.id)}
        />
        <strong style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>{task.title}</strong>
      </div>
      {task.description && <div style={{ margin: '8px 0' }}>{task.description}</div>}
      {task.dueDate && (
        <div style={{ fontSize: 12, color: '#b77' }}>
          Due: {new Date(task.dueDate).toLocaleDateString()}
        </div>
      )}
      <div style={{ fontSize: 12, color: '#888' }}>
        Created: {new Date(task.createdAt).toLocaleString()}
      </div>
      <div style={{ marginTop: 8 }}>
        <button onClick={() => onEdit(task)} style={{ marginRight: 8 }}>Edit</button>
        <button onClick={handleDelete} style={{ color: 'red' }}>Delete</button>
      </div>
    </div>
  );
};

export default TaskItem;
