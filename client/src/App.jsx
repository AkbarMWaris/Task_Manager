import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import AuthModal from './components/AuthModal';
import UserMenu from './components/UserMenu';
<<<<<<< HEAD
import HowItWorksModal from './components/HowItWorksModal';
=======
>>>>>>> c0c4e34b8870a2d6bd3634d9e56ef0971caa6570
import { useAuth } from './context/AuthContext';
import './App.css';

const API_BASE_URL = import.meta.env.DEV
  ? 'http://localhost:5000/api'
<<<<<<< HEAD
  : '/api';

=======
  : import.meta.env.VITE_API_URL;

  
>>>>>>> c0c4e34b8870a2d6bd3634d9e56ef0971caa6570
function App() {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
<<<<<<< HEAD
  const [showHowItWorks, setShowHowItWorks] = useState(false);
=======
>>>>>>> c0c4e34b8870a2d6bd3634d9e56ef0971caa6570

  // Fetch all tasks belonging to the logged-in user
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/tasks`);
      setTasks(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch tasks');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchTasks();
    } else {
      setTasks([]);
    }
  }, [isAuthenticated]);

  // Refresh tasks after CRUD operations
  const refreshTasks = () => {
    fetchTasks();
  };

  // Still checking if a saved session is valid
  if (authLoading) {
    return (
      <div className="app-container">
        <div className="header">
          <h1>💼 Task Manager</h1>
        </div>
        <div className="container" style={{ textAlign: 'center', padding: '4rem' }}>
          <div>Loading...</div>
        </div>
      </div>
    );
  }

  // Not logged in -> show the app shell behind a login/signup popup
  if (!isAuthenticated) {
    return (
      <div className="app-container">
        <div className="header">
          <h1>💼 Task Manager</h1>
          <p>Manage your tasks efficiently</p>
        </div>
        <div className="container" style={{ textAlign: 'center', padding: '4rem', color: '#94a3b8' }}>
          Please log in or sign up to use the Task Manager.
        </div>
        <AuthModal />
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="header">
        <UserMenu />
        <h1>💼 Task Manager</h1>
        <p>Manage your tasks efficiently</p>
<<<<<<< HEAD
        <button
          className="how-it-works-btn"
          onClick={() => setShowHowItWorks(true)}
        >
           How does this work❓
        </button>
      </div>

      {showHowItWorks && (
        <HowItWorksModal onClose={() => setShowHowItWorks(false)} />
      )}

=======
      </div>

>>>>>>> c0c4e34b8870a2d6bd3634d9e56ef0971caa6570
      <div className="container">
        <TaskForm onTaskAdded={refreshTasks} />
        {error && (
          <div style={{ padding: '1rem', background: '#fee', color: '#c33', borderRadius: '8px', marginBottom: '1rem' }}>
            {error}
          </div>
        )}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>Loading tasks...</div>
        ) : (
          <TaskList tasks={tasks} onTasksUpdated={refreshTasks} />
        )}
      </div>
    </div>
  );
}

export default App;
