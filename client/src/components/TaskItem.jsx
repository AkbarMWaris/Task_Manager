import React, { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = import.meta.env.DEV 
  ? 'http://localhost:5000/api' 
  : '/api';

const TaskItem = ({ task, onTasksUpdated }) => {
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: task.title,
    description: task.description,
    status: task.status
  });
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.put(`${API_BASE_URL}/tasks/${task._id}`, editData);
      setEditing(false);
      onTasksUpdated();
    } catch (error) {
      console.error('Error updating task:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;

    try {
      await axios.delete(`${API_BASE_URL}/tasks/${task._id}`);
      onTasksUpdated();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className={`task-card ${task.status}`}>
      {editing ? (
        <form onSubmit={handleUpdate}>
          <div className="form-group">
            <input
              type="text"
              name="title"
              value={editData.title}
              onChange={handleChange}
              placeholder="Task title"
              style={{marginBottom: '1rem'}}
            />
          </div>
          <div className="form-group">
            <textarea
              name="description"
              value={editData.description}
              onChange={handleChange}
              placeholder="Description"
              style={{marginBottom: '1rem'}}
            />
          </div>
          <div style={{display: 'flex', gap: '1rem', marginBottom: '1rem'}}>
            <select
              name="status"
              value={editData.status}
              onChange={handleChange}
              style={{flex: 1}}
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            <button
              type="submit"
              className="btn btn-warning"
              disabled={loading}
              style={{padding: '8px 16px'}}
            >
              Save
            </button>
            <button
              type="button"
              className="btn"
              onClick={() => setEditing(false)}
              style={{background: '#6b7280'}}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className="task-header">
            <h3 className="task-title">{task.title}</h3>
            <span className={`task-status status-${task.status}`}>
              {task.status.replace('-', ' ').toUpperCase()}
            </span>
          </div>
          
          <p className="task-description">{task.description}</p>
          
          <div className="task-meta">
            <span>Created: {new Date(task.createdAt).toLocaleDateString()}</span>
            <div>
              <button
                className="btn btn-warning"
                onClick={() => setEditing(true)}
                style={{padding: '6px 12px', marginRight: '0.5rem'}}
              >
                Edit
              </button>
              <button
                className="btn btn-danger"
                onClick={handleDelete}
                style={{padding: '6px 12px'}}
              >
                Delete
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskItem;
