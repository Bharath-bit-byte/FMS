import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../App';

export default function Bills() {
  const { userId } = useContext(AuthContext);
  const [bills, setBills] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ billName: '', itemDescription: '', dueDate: '', amount: '' });

  useEffect(() => {
    fetchBills();
  }, [userId]);

  const fetchBills = async () => {
    const res = await axios.get(`/api/bills/user/${userId}/upcoming`);
    setBills(res.data);
  };

  const handleAddBill = async (e) => {
    e.preventDefault();
    await axios.post(`/api/bills/user/${userId}/add`, formData);
    setShowModal(false);
    fetchBills();
  };

  const handlePayBill = async (billId) => {
    await axios.put(`/api/bills/${billId}/pay`);
    fetchBills(); 
  };

  return (
    <div className="page-container">
      <div className="page-header text-center" style={{ marginBottom: '20px', position: 'relative' }}>
        <h2>Upcoming Bills</h2>
        <button className="btn-primary" style={{ position: 'absolute', right: 0, top: 0 }} onClick={() => setShowModal(true)}>Add Bill</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Bill Name</th>
            <th>Item Description</th>
            <th>Due Date</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {bills.map(bill => (
            <tr key={bill.id}>
              <td>{bill.billName}</td>
              <td>{bill.itemDescription}</td>
              <td>{bill.dueDate}</td>
              <td className="text-red font-bold">${bill.amount}</td>
              <td>
                <button className="btn-success" style={{ padding: '5px 15px' }} onClick={() => handlePayBill(bill.id)}>Mark Paid</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Add New Bill</h3>
              <button onClick={() => setShowModal(false)}>×</button>
            </div>
            <form onSubmit={handleAddBill}>
              <input type="text" placeholder="Bill Name" required onChange={e => setFormData({...formData, billName: e.target.value})} />
              <input type="text" placeholder="Item Description" required onChange={e => setFormData({...formData, itemDescription: e.target.value})} />
              <input type="date" required onChange={e => setFormData({...formData, dueDate: e.target.value})} />
              <input type="number" step="0.01" placeholder="Amount" required onChange={e => setFormData({...formData, amount: e.target.value})} />
              <button type="submit" className="btn-success w-full">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}