import React from 'react';

const TaskFilter = ({ currentFilter, counts, onFilterChange }) => {
  return (
    <div className="TaskFilter" style={{ marginBottom: 16, display: 'flex', justifyContent: 'center', gap: 12 }}>
      <button
        onClick={() => onFilterChange('all')}
        style={{ fontWeight: currentFilter === 'all' ? 'bold' : 'normal' }}
      >
        All ({counts.all})
      </button>
      <button
        onClick={() => onFilterChange('completed')}
        style={{ fontWeight: currentFilter === 'completed' ? 'bold' : 'normal' }}
      >
        Completed ({counts.completed})
      </button>
      <button
        onClick={() => onFilterChange('pending')}
        style={{ fontWeight: currentFilter === 'pending' ? 'bold' : 'normal' }}
      >
        Pending ({counts.pending})
      </button>
    </div>
  );
};

export default TaskFilter;
