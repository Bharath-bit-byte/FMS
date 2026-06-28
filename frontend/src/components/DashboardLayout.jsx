import React, { useContext, useEffect, useState } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, CreditCard, ArrowLeftRight, FileText, PieChart, Target, Bell, Search, LogOut } from 'lucide-react';
import { AuthContext } from '../App';
import axios from 'axios';

export default function DashboardLayout() {
  const { userId, username, logout } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);
  const location = useLocation();

  useEffect(() => {
    fetchNotifications();
  }, [userId, location.pathname]); 

  const fetchNotifications = async () => {
    try {
      const res = await axios.get(`/api/bills/user/${userId}/reminders?days=3`);
      setNotifications(res.data);
    } catch (error) {
      console.error("Failed to fetch notifications");
    }
  };

  const handleNotificationClick = async () => {
    try {
      const res = await axios.get(`/api/bills/user/${userId}/reminders?days=3`);
      const liveNotifications = res.data;
      setNotifications(liveNotifications);

      if (liveNotifications.length === 0) {
        alert("No bills due in the next 3 days.");
      } else {
        const messages = liveNotifications.map(b => `${b.billName} due on ${b.dueDate} ($${b.amount})`).join('\n');
        alert(`Attention - Action Required:\n\n${messages}`);
      }
    } catch (error) {
      alert("Error retrieving notifications.");
    }
  };

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <div className="logo">
          <div className="logo-icon"></div> SBVY_UI
        </div>
        <nav className="sidebar-nav">
          <NavLink to="/dashboard"><LayoutDashboard size={20} /> Dashboard</NavLink>
          <NavLink to="/balances"><CreditCard size={20} /> Balances</NavLink>
          <NavLink to="/transactions"><ArrowLeftRight size={20} /> Transactions</NavLink>
          <NavLink to="/bills"><FileText size={20} /> Bills</NavLink>
          <NavLink to="/expenses"><PieChart size={20} /> Expenses</NavLink>
          <NavLink to="/goals"><Target size={20} /> Goals</NavLink>
        </nav>
        
        <div className="user-profile" onClick={logout} title="Click to Logout">
          <div className="avatar">{username ? username.charAt(0).toUpperCase() : 'U'}</div>
          <span style={{ textTransform: 'capitalize' }}>{username}</span>
          <LogOut size={16} />
        </div>
      </aside>

      <div className="main-content">
        <header className="topbar">
          <div className="greeting">
            <h2>Hi, {username}</h2>
            <span>{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          </div>
          <div className="topbar-actions">
            <div style={{ position: 'relative', cursor: 'pointer' }}>
              <Bell className="notification-icon" size={24} onClick={handleNotificationClick} />
              
              {notifications.length > 0 && (
                <span style={{ 
                  position: 'absolute', top: -5, right: -5, 
                  background: '#ef4444', color: 'white', 
                  borderRadius: '50%', padding: '2px 6px', 
                  fontSize: '10px', fontWeight: 'bold', border: '2px solid white' 
                }}>
                  {notifications.length}
                </span>
              )}
            </div>
            <div className="search-bar">
              <Search size={16} />
              <input type="text" placeholder="Search here or ask me so..." />
            </div>
          </div>
        </header>
        <div className="page-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}