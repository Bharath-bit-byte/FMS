import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../App';

export default function Goals() {
  const { userId } = useContext(AuthContext);
  const [goals, setGoals] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ category: '', amount: '' });

  useEffect(() => {
    fetchGoals();
  }, [userId]);

  const fetchGoals = async () => {
    const res = await axios.get(`/api/goals/user/${userId}`);
    setGoals(res.data);
  };

  const handleAddGoal = async (e) => {
    e.preventDefault();
    await axios.post(`/api/goals/user/${userId}/add`, formData);
    setShowModal(false);
    fetchGoals();
  };

  return (
    <div className="page-container">
      <div className="dash-card text-center mb-1">
        <h3>Expenses Goals by Category</h3>
        <button className="btn-primary" style={{ marginTop: '15px' }} onClick={() => setShowModal(true)}>Add Goal</button>
      </div>

      <div className="dash-grid mt-2">
        {goals.map(goal => (
          <div key={goal.id} className="dash-card text-center" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h4 style={{ color: 'var(--text-muted)' }}>{goal.category}</h4>
            <h2 style={{ color: 'var(--primary)', marginTop: '10px' }}>Target: ${goal.amount}</h2>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Set New Goal</h3>
              <button onClick={() => setShowModal(false)}>×</button>
            </div>
            <form onSubmit={handleAddGoal}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 'bold' }}>Goal Name</label>
                <input type="text" placeholder="Enter Your Goal (e.g. Shopping, Savings)" required onChange={e => setFormData({...formData, category: e.target.value})} />
              </div>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 'bold' }}>Enter Goal Target Amount</label>
                <input type="number" step="0.01" placeholder="0" required onChange={e => setFormData({...formData, amount: e.target.value})} />
              </div>
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button type="button" className="btn-primary w-full" style={{ background: 'var(--text-muted)' }} onClick={() => setShowModal(false)}>Close</button>
                <button type="submit" className="btn-primary w-full" style={{ background: '#007bff' }}>Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}