import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onTasksUpdated }) => {
  if (!tasks || tasks.length === 0) {
    return (
      <div className="empty-state">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22,4 12,14.01 9,11.01"></polyline>
        </svg>
        <h3>No tasks yet</h3>
        <p>Create your first task using the form above</p>
      </div>
    );
  }

  return (
    <div className="tasks-grid">
      {tasks.map(task => (
        <TaskItem
          key={task._id}
          task={task}
          onTasksUpdated={onTasksUpdated}
        />
      ))}
    </div>
  );
};

export default TaskList;
