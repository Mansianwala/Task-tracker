import React, { useState, useEffect } from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import TaskFilter from './TaskFilter';
import { saveTasks, loadTasks } from '../utils/localStorage';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [currentFilter, setCurrentFilter] = useState('all');
  const [editTask, setEditTask] = useState(null);
  const [search, setSearch] = useState('');
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });

  useEffect(() => {
    setTasks(loadTasks());
  }, []);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  const addTask = (task) => {
    setTasks([task, ...tasks]);
  };

  const updateTask = (updatedTask) => {
    setTasks(tasks.map(t => t.id === updatedTask.id ? updatedTask : t));
    setEditTask(null);
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(t => t.id !== taskId));
  };

  const toggleComplete = (taskId) => {
    setTasks(tasks.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t));
  };

  const filterTasks = () => {
    let filtered = tasks;
    if (currentFilter === 'completed') filtered = filtered.filter(t => t.completed);
    if (currentFilter === 'pending') filtered = filtered.filter(t => !t.completed);
    if (search.trim()) filtered = filtered.filter(t => t.title.toLowerCase().includes(search.toLowerCase()));
    return filtered;
  };

  const counts = {
    all: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    pending: tasks.filter(t => !t.completed).length,
  };

  const username = localStorage.getItem('username');
  return (
    <div>
      <button
        onClick={() => setDarkMode(dm => !dm)}
        style={{ float: 'right', marginBottom: 8 }}
      >
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
      <h2>Dashboard</h2>
      <p>Welcome, {username}!</p>
      <TaskForm onAddTask={addTask} />
      <TaskFilter currentFilter={currentFilter} counts={counts} onFilterChange={setCurrentFilter} />
      <input
        type="text"
        placeholder="Search tasks by title..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ marginBottom: 16, padding: 6, width: '100%' }}
      />
      <TaskList
        tasks={filterTasks()}
        onToggleComplete={toggleComplete}
        onDelete={deleteTask}
        onEdit={setEditTask}
      />
    </div>
  );
};

export default Dashboard;
