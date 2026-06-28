import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../App';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
  const { userId } = useContext(AuthContext);
  const [totalBalance, setTotalBalance] = useState(0);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [upcomingBills, setUpcomingBills] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [goals, setGoals] = useState([]); // <-- Added state for goals

  useEffect(() => {
    fetchDashboardData();
  }, [userId]);

  const fetchDashboardData = async () => {
    try {
      const accountsRes = await axios.get(`/api/accounts/user/${userId}`);
      const balance = accountsRes.data.reduce((acc, curr) => acc + parseFloat(curr.amount), 0);
      setTotalBalance(balance);

      const transRes = await axios.get(`/api/transactions/user/${userId}`);
      const transactions = transRes.data;
      setRecentTransactions(transactions.slice().reverse());

      // Calculate Current Month's Credits and Debits for Dashboard Graph
      let currentMonthCredit = 0;
      let currentMonthDebit = 0;
      const currentMonth = new Date().getMonth();
      
      transactions.forEach(tx => {
        const txMonth = new Date(tx.dateOfPayment).getMonth();
        if (txMonth === currentMonth) {
          if (tx.paymentType.toLowerCase() === 'credit') currentMonthCredit += parseFloat(tx.amount);
          if (tx.paymentType.toLowerCase() === 'debit') currentMonthDebit += parseFloat(tx.amount);
        }
      });
      
      setChartData([{ name: 'This Month', Credit: currentMonthCredit, Debit: currentMonthDebit }]);

      const billsRes = await axios.get(`/api/bills/user/${userId}/upcoming`);
      setUpcomingBills(billsRes.data.slice(0, 3));

      // Fetch user's goals
      const goalsRes = await axios.get(`/api/goals/user/${userId}`);
      setGoals(goalsRes.data);

    } catch (error) {
      console.error("Error fetching dashboard data", error);
    }
  };

  return (
    <div className="page-container">
      <div className="dash-grid">
        <div className="dash-card text-center" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h3 className="text-muted">Total Balance</h3>
          <h1 style={{ fontSize: '2.5rem', marginTop: '10px' }}>${totalBalance.toFixed(2)}</h1>
        </div>
        
        <div className="dash-card">
          <h3 className="text-muted text-center mb-1">Expense Breakdown</h3>
          <ResponsiveContainer width="100%" height={100}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" hide />
              <Tooltip cursor={{fill: 'transparent'}} />
              <Bar dataKey="Credit" fill="#4ade80" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Debit" fill="#d1d5db" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="text-center mt-2 text-muted" style={{ fontSize: '12px' }}>
            <span style={{ color: '#4ade80', marginRight: '10px' }}>■ Credit</span>
            <span style={{ color: '#d1d5db' }}>■ Debit</span>
          </div>
        </div>

        <div className="dash-card" style={{ maxHeight: '220px', overflowY: 'auto' }}>
          <h3 className="text-muted mb-1 text-center" style={{ position: 'sticky', top: '-20px', background: 'white', padding: '10px 0', zIndex: 2 }}>Upcoming Bills</h3>
          {upcomingBills.length > 0 ? (
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {upcomingBills.map(bill => (
                <li key={bill.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', borderBottom: '1px solid #eee', paddingBottom: '5px' }}>
                  <span>{bill.billName}</span>
                  <span className="text-red">${bill.amount}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted text-center" style={{ marginTop: '30px' }}>No upcoming bills.</p>
          )}
        </div>

        <div className="dash-card" style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', height: '320px', padding: '20px 20px 0 20px' }}>
          <h3 className="text-muted mb-1">Recent Transactions</h3>
          {recentTransactions.length > 0 ? (
            <div style={{ flex: 1, overflowY: 'auto', paddingBottom: '20px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead style={{ position: 'sticky', top: 0, background: 'white', zIndex: 1, boxShadow: '0 2px 2px -1px rgba(0,0,0,0.1)' }}>
                  <tr>
                    <th style={{ padding: '10px', textAlign: 'left' }}>Item</th>
                    <th style={{ padding: '10px', textAlign: 'left' }}>Date</th>
                    <th style={{ padding: '10px', textAlign: 'left' }}>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTransactions.map(tx => (
                    <tr key={tx.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                      <td style={{ padding: '10px' }}>{tx.item}</td>
                      <td style={{ padding: '10px' }}>{tx.dateOfPayment}</td>
                      <td style={{ padding: '10px', color: tx.paymentType.toLowerCase() === 'credit' ? 'var(--success-dark)' : 'var(--danger)', fontWeight: 'bold' }}>
                        {tx.paymentType.toLowerCase() === 'credit' ? '+' : '-'}${tx.amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
             <p className="text-muted" style={{ marginTop: '20px' }}>No transactions recorded yet.</p>
          )}
        </div>
        
         <div className="dash-card" style={{ display: 'flex', flexDirection: 'column', height: '320px', padding: '20px' }}>
            <h3 className="text-muted mb-1 text-center" style={{ position: 'sticky', top: '-20px', background: 'white', paddingBottom: '10px', zIndex: 2 }}>Financial Goals</h3>
            
            {goals.length > 0 ? (
              <div style={{ flex: 1, overflowY: 'auto', paddingRight: '5px' }}>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {goals.map(goal => (
                    <li key={goal.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', paddingBottom: '10px', borderBottom: '1px solid #f3f4f6' }}>
                      <span style={{ fontWeight: '500', fontSize: '14px' }}>{goal.category}</span>
                      <span style={{ color: 'var(--primary)', fontWeight: 'bold', fontSize: '14px' }}>${goal.amount}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <p className="text-muted text-center" style={{ fontSize: '13px', marginBottom: '15px' }}>No goals set yet.</p>
                <a href="/goals" className="btn-primary" style={{ textDecoration: 'none', fontSize: '12px', padding: '8px 16px' }}>Set a Goal</a>
              </div>
            )}
         </div>

      </div>
    </div>
  );
}