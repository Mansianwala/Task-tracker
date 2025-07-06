import React from 'react';

const TaskFilter = ({ currentFilter, counts, onFilterChange }) => {
  return (
    <div style={{ marginBottom: 16 }}>
      <button
        onClick={() => onFilterChange('all')}
        style={{ fontWeight: currentFilter === 'all' ? 'bold' : 'normal', marginRight: 8 }}
      >
        All ({counts.all})
      </button>
      <button
        onClick={() => onFilterChange('completed')}
        style={{ fontWeight: currentFilter === 'completed' ? 'bold' : 'normal', marginRight: 8 }}
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
