import React, { useState } from 'react';

const TaskForm = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    const task = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      title: title.trim(),
      description: description.trim(),
      dueDate: dueDate || null,
      completed: false,
      createdAt: Date.now(),
    };
    onAddTask(task);
    setTitle('');
    setDescription('');
    setDueDate('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />
      <br />
      <textarea
        placeholder="Description (optional)"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <br />
      <input
        type="date"
        value={dueDate}
        onChange={e => setDueDate(e.target.value)}
        placeholder="Due Date (optional)"
      />
      <br />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
