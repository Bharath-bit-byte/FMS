import React, { useState, useEffect, useContext } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import { AuthContext } from '../App';

export default function Expenses() {
  const { userId } = useContext(AuthContext);
  const [chartData, setChartData] = useState([]);
  const [totalDebit, setTotalDebit] = useState(0);
  const [totalCredit, setTotalCredit] = useState(0);

  useEffect(() => {
    const fetchTransactions = async () => {
      const res = await axios.get(`/api/transactions/user/${userId}`);
      const transactions = res.data;

      let creditSum = 0;
      let debitSum = 0;
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
      const monthName = new Date().toLocaleString('default', { month: 'short' });

      transactions.forEach(tx => {
        const txDate = new Date(tx.dateOfPayment);
        if (txDate.getMonth() === currentMonth && txDate.getFullYear() === currentYear) {
          if (tx.paymentType.toLowerCase() === 'credit') creditSum += parseFloat(tx.amount);
          if (tx.paymentType.toLowerCase() === 'debit') debitSum += parseFloat(tx.amount);
        }
      });

      setChartData([{ 
        name: `${monthName} ${currentYear}`, 
        Credit: creditSum, 
        Debit: debitSum 
      }]);
      setTotalDebit(debitSum);
      setTotalCredit(creditSum);
    };
    
    fetchTransactions();
  }, [userId]);

  return (
    <div className="page-container">
      <div className="chart-card">
        <h3 className="text-center mb-1">Present Month Breakdown</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip cursor={{fill: 'transparent'}} />
            <Legend verticalAlign="top" height={36}/>
            <Bar dataKey="Credit" fill="#4ade80" radius={[4, 4, 0, 0]} maxBarSize={100} />
            <Bar dataKey="Debit" fill="#d1d5db" radius={[4, 4, 0, 0]} maxBarSize={100} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="expense-breakdown-card mt-2">
        <h3 className="text-center">Monthly Summary</h3>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap', marginTop: '15px' }}>
          
          <div className="breakdown-item" style={{ borderColor: 'var(--success-dark)', margin: 0 }}>
            <span>Total Income</span>
            <div className="amount-badge" style={{ color: 'var(--success-dark)', fontWeight: 'bold' }}>
              +${totalCredit.toFixed(2)}
            </div>
          </div>

          <div className="breakdown-item" style={{ borderColor: 'var(--danger)', margin: 0 }}>
            <span>Total Spent</span>
            <div className="amount-badge text-red">
              -${totalDebit.toFixed(2)}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}