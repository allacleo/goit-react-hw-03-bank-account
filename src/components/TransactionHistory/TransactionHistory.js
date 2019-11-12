import React from 'react';
import T from 'prop-types';
import style from '../Dashboard/Dashboard.module.css';

const TransactionHistory = ({items}) => (
    <table className={style.history}>
    <thead>
      <tr>
        <th>Transaction</th>
        <th>Amount</th>
        <th>Date</th>
      </tr>
    </thead>
    <tbody>
        {items.map(item => (
          <tr key={item.id}>
          <td>{item.type}</td>
          <td>{item.amount}$</td>
          <td>{item.date}</td>
        </tr> 
        ))}
    </tbody>
  </table>
);

TransactionHistory.propTypes = {
    items: T.arrayOf(
      T.shape({
        id: T.string.isRequired,
        type: T.string.isRequired,
        amount: T.number.isRequired,
        date: T.string.isRequired,
    }).isRequired,
    ).isRequired,
};

export default TransactionHistory;