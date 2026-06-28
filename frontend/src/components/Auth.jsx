import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../App';

export default function Auth() {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/users/register', { username, password });
      alert(res.data);
      setIsRightPanelActive(false);
    } catch (err) {
      alert("Registration failed. Username might be taken.");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/users/login', { username, password });
      login(res.data.id, res.data.username); 
    } catch (err) {
      alert(err.response?.data || "Login failed");
    }
  };

  return (
    <div className="auth-wrapper">
      <h1 className="system-title">Finance Management System</h1>
      
      <div className={`auth-container ${isRightPanelActive ? 'right-panel-active' : ''}`}>
        <div className="form-container sign-up-container">
          <form onSubmit={handleRegister}>
            <h1>Create Account</h1>
            <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
            <button type="submit">SIGN UP</button>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form onSubmit={handleLogin}>
            <h1>Sign In</h1>
            <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
            <button type="submit">SIGN IN</button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>To keep connected with us please login with your personal info</p>
              <button type="button" className="ghost" onClick={() => setIsRightPanelActive(false)}>SIGN IN</button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello...!</h1>
              <p>Enter your personal details and start your journey with us</p>
              <button type="button" className="ghost" onClick={() => setIsRightPanelActive(true)}>SIGN UP</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}