import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const AuthModal = () => {
<<<<<<< HEAD
  const { login, register } = useAuth();
  const [mode, setMode] = useState('login'); // 'login' | 'signup'
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
=======
  const { login, signup } = useAuth();
  const [mode, setMode] = useState('login'); // 'login' | 'signup'
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState(null);
>>>>>>> c0c4e34b8870a2d6bd3634d9e56ef0971caa6570
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

<<<<<<< HEAD
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.(com|in)$/i.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!isValidEmail(formData.email)) {
      setError('Please use an email ending with .com or .in');
      return;
    }

=======
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
>>>>>>> c0c4e34b8870a2d6bd3634d9e56ef0971caa6570
    setLoading(true);
    try {
      if (mode === 'login') {
        await login(formData.email, formData.password);
      } else {
<<<<<<< HEAD
        await register(formData.name, formData.email, formData.password);
        setMode('login');
        setSuccess('Account created! Please log in.');
        setFormData({ name: '', email: formData.email, password: '' });
=======
        await signup(formData.name, formData.email, formData.password);
>>>>>>> c0c4e34b8870a2d6bd3634d9e56ef0971caa6570
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setMode(mode === 'login' ? 'signup' : 'login');
    setError(null);
<<<<<<< HEAD
    setSuccess(null);
=======
>>>>>>> c0c4e34b8870a2d6bd3634d9e56ef0971caa6570
  };

  return (
    <div className="auth-modal-overlay">
      <div className="auth-modal">
        <div className="auth-modal-header">
          <h2>💼 Task Manager</h2>
          <p>{mode === 'login' ? 'Log in to see your tasks' : 'Create an account to get started'}</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {mode === 'signup' && (
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                required
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="At least 6 characters"
              minLength={6}
              required
            />
          </div>

<<<<<<< HEAD
{success && <div className="auth-success">{success}</div>}
          {error && <div className="auth-error">{error}</div>}
=======
          {error && <div className="auth-error">{error}</div>}

>>>>>>> c0c4e34b8870a2d6bd3634d9e56ef0971caa6570
          <button type="submit" className="btn" disabled={loading} style={{ width: '100%' }}>
            {loading ? 'Please wait...' : mode === 'login' ? 'Log In' : 'Sign Up'}
          </button>
        </form>

        <div className="auth-switch">
          {mode === 'login' ? (
            <p>Don't have an account? <button type="button" onClick={toggleMode}>Sign up</button></p>
          ) : (
            <p>Already have an account? <button type="button" onClick={toggleMode}>Log in</button></p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
