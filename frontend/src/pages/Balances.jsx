import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../App';

export default function Balances() {
  const { userId } = useContext(AuthContext);
  const [cards, setCards] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ cardNumber: '', cardName: '', expiryDate: '', cvv: '', amount: '' });

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    const res = await axios.get(`/api/accounts/user/${userId}`);
    setCards(res.data);
  };

  const handleAddCard = async (e) => {
    e.preventDefault();
    await axios.post(`/api/accounts/user/${userId}/add`, formData);
    setShowModal(false);
    fetchCards();
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <button className="btn-primary" onClick={() => setShowModal(true)}>Add Account</button>
      </div>

      <div className="cards-grid">
        {cards.map(card => (
          <div key={card.id} className="credit-card">
            <div className="chip"></div>
            <div className="card-number">**** **** **** {card.cardNumber.slice(-4)}</div>
            <div className="card-footer">
              <div>
                <small>Card Name</small>
                <div>{card.cardName}</div>
              </div>
              <div>
                <small>Expires</small>
                <div>{card.expiryDate}</div>
              </div>
            </div>
            <div className="card-balance">${card.amount}</div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Add Account</h3>
              <button onClick={() => setShowModal(false)}>×</button>
            </div>
            <form onSubmit={handleAddCard}>
              <input type="text" placeholder="Card Number" required onChange={e => setFormData({...formData, cardNumber: e.target.value})} />
              <input type="text" placeholder="Card name" required onChange={e => setFormData({...formData, cardName: e.target.value})} />
              <input type="text" placeholder="Expiry Date (MM/YY)" required onChange={e => setFormData({...formData, expiryDate: e.target.value})} />
              <input type="text" placeholder="CVV" required onChange={e => setFormData({...formData, cvv: e.target.value})} />
              <input type="number" placeholder="Initial Balance Amount" required onChange={e => setFormData({...formData, amount: e.target.value})} />
              <button type="submit" className="btn-success w-full">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}