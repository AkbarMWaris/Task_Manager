import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const getInitials = (name) => {
  if (!name) return '?';
  return name
    .trim()
    .split(' ')
    .map(part => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
};

const UserMenu = () => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) return null;

  return (
    <div className="user-menu" ref={menuRef}>
      <button className="user-avatar" onClick={() => setOpen(!open)} title={user.name}>
        {getInitials(user.name)}
      </button>
      {open && (
        <div className="user-dropdown">
          <div className="user-dropdown-name">{user.name}</div>
          <div className="user-dropdown-email">{user.email}</div>
          <button className="user-dropdown-logout" onClick={logout}>Log Out</button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
