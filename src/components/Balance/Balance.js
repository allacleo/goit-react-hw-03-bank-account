import React from 'react';
import T from 'prop-types';
import style from '../Dashboard/Dashboard.module.css';

const Balance = ({ income, expenses, balance }) => (
  <section className={style.balance}>
    <span role="img" aria-label="Up Arrow">
      ⬆️{income}$
    </span>
    <span role="img" aria-label="Down Arrow">
      ⬇️{expenses}$
    </span>
    <span>Balance: {balance}$</span>
  </section>
);

Balance.defaultProp = {
  income: 0,
  expenses: 0,
};

Balance.propTypes = {
  income: T.number.isRequired,
  expenses: T.number.isRequired,
  balance: T.number.isRequired,
};

export default Balance;