import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../App';

export default function Transactions() {
  const { userId } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    item: '', goal: '', cardName: '', dateOfPayment: '', paymentType: 'debit', amount: ''
  });

  useEffect(() => {
    fetchData();
  }, [userId]);

  const fetchData = async () => {
    const transRes = await axios.get(`/api/transactions/user/${userId}`);
    setTransactions(transRes.data);
    
    const accRes = await axios.get(`/api/accounts/user/${userId}`);
    setAccounts(accRes.data);
  };

  const handleAddTransaction = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/api/transactions/user/${userId}/process`, formData);
      setShowModal(false);
      fetchData(); // Refresh list
    } catch (error) {
      alert(error.response?.data || "Error processing transaction. Check card balance/details.");
    }
  };

  return (
    <div className="page-container">
      <div className="page-header" style={{ marginBottom: '20px' }}>
        <button className="btn-primary" onClick={() => setShowModal(true)}>Add Transaction</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Goal</th>
            <th>Account Name</th>
            <th>Date of Payment</th>
            <th>Payment Type</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(tx => (
            <tr key={tx.id}>
              <td>{tx.item}</td>
              <td>{tx.goal}</td>
              <td>{tx.cardName}</td>
              <td>{tx.dateOfPayment}</td>
              <td><span className="amount-badge">{tx.paymentType.toUpperCase()}</span></td>
              <td style={{ color: tx.paymentType === 'credit' ? 'var(--success-dark)' : 'var(--danger)', fontWeight: 'bold' }}>
                ${tx.amount}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Add Transaction</h3>
              <button onClick={() => setShowModal(false)}>×</button>
            </div>
            <form onSubmit={handleAddTransaction}>
              <input type="text" placeholder="Item Name" required onChange={e => setFormData({...formData, item: e.target.value})} />
              <input type="text" placeholder="Goal Category" required onChange={e => setFormData({...formData, goal: e.target.value})} />
              
              <select required onChange={e => setFormData({...formData, cardName: e.target.value})} defaultValue="">
                <option value="" disabled>Select Account Name</option>
                {accounts.map(acc => <option key={acc.id} value={acc.cardName}>{acc.cardName}</option>)}
              </select>

              <select required onChange={e => setFormData({...formData, paymentType: e.target.value})}>
                <option value="debit">Debit (Expense)</option>
                <option value="credit">Credit (Income)</option>
              </select>

              <input type="date" required onChange={e => setFormData({...formData, dateOfPayment: e.target.value})} />
              <input type="number" step="0.01" placeholder="Amount" required onChange={e => setFormData({...formData, amount: e.target.value})} />
              
              <button type="submit" className="btn-success w-full">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}