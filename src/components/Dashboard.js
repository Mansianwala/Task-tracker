import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import TaskFilter from './TaskFilter';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [currentFilter, setCurrentFilter] = useState('all');
  const [editTask, setEditTask] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editDueDate, setEditDueDate] = useState('');
  const [search, setSearch] = useState('');
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });
  const [username, setUsername] = useState(() => localStorage.getItem('currentUser') || '');
  const navigate = useNavigate();

  // Redirect to login if not logged in
  useEffect(() => {
    if (!username) {
      navigate('/');
    }
  }, [username, navigate]);

  // Load tasks for this user
  useEffect(() => {
    if (username) {
      const data = localStorage.getItem(`tasks_${username}`);
      setTasks(data ? JSON.parse(data) : []);
    }
  }, [username]);

  // Save tasks for this user
  useEffect(() => {
    if (username) {
      localStorage.setItem(`tasks_${username}`, JSON.stringify(tasks));
    }
  }, [tasks, username]);

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

  const startEditTask = (task) => {
    setEditTask(task);
    setEditTitle(task.title);
    setEditDescription(task.description || '');
    setEditDueDate(task.dueDate || '');
  };

  const handleEditSave = () => {
    if (!editTitle.trim()) return;
    const updatedTask = {
      ...editTask,
      title: editTitle.trim(),
      description: editDescription.trim(),
      dueDate: editDueDate || null,
    };
    setTasks(tasks.map(t => t.id === updatedTask.id ? updatedTask : t));
    setEditTask(null);
  };

  const handleEditCancel = () => {
    setEditTask(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setUsername('');
    navigate('/');
  };

  return (
    <div>
      <button
        onClick={handleLogout}
        style={{ float: 'left', marginBottom: 8, background: '#ff5252', color: '#fff' }}
      >
        Logout
      </button>
      <button
        onClick={() => setDarkMode(dm => !dm)}
        style={{ float: 'right', marginBottom: 8 }}
      >
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
      <h2>Dashboard</h2>
      <p>Welcome, {username}!</p>
      {editTask && (
        <div className="modal" style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.3)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000}}>
          <div style={{background:'#fff',padding:24,borderRadius:10,minWidth:320}}>
            <h3>Edit Task</h3>
            <input
              type="text"
              value={editTitle}
              onChange={e => setEditTitle(e.target.value)}
              required
              style={{width:'100%',marginBottom:8}}
            />
            <textarea
              value={editDescription}
              onChange={e => setEditDescription(e.target.value)}
              placeholder="Description (optional)"
              style={{width:'100%',marginBottom:8}}
            />
            <input
              type="date"
              value={editDueDate || ''}
              onChange={e => setEditDueDate(e.target.value)}
              style={{width:'100%',marginBottom:8}}
            />
            <div style={{display:'flex',justifyContent:'flex-end',gap:8}}>
              <button onClick={handleEditCancel} style={{background:'#eee',color:'#333'}}>Cancel</button>
              <button onClick={handleEditSave}>Save</button>
            </div>
          </div>
        </div>
      )}
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
        onEdit={startEditTask}
      />
    </div>
  );
};

export default Dashboard;