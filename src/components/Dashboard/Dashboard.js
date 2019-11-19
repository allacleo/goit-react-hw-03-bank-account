import React, { Component } from 'react';
import shortid from 'shortid';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Controls from '../Controls/Controls';
import Balance from '../Balance/Balance';
import TransactionHistory from '../TransactionHistory/TransactionHistory';
import style from './Dashboard.module.css';
import storage from '../../services/storage';

toast.configure({
    autoClose: 5000,
    draggable: false,
  });



export default class Dashboard extends Component {
    state = {
        transactions: [],
        balance: 0,
    };

    componentDidMount() {
        const transactions = storage.get('transactions');
        const balance = storage.get('balance');
        
        if (transactions && balance) {
            this.setState({transactions, balance});
        }
    
    }
    
    componentDidUpdate(prevProps, prevState) {
        const {transactions, balance} = this.state;
    
        if (prevState. transactions !== transactions) {
            storage.save('transactions', transactions);
            storage.save('balance', balance);
        }
    };

handleDeposit = amount => {
    if (amount <= 0 || amount === '') {
        toast.info('Введите сумму для проведения операции!');
        return;
    }

    this.setState(({transactions, balance}) => {
        const transactionItem = {
            id: shortid.generate(),
            type: 'Deposit',
            amount,
            date: new Date().toLocaleString(),
        };
        return {
            transactions: [...transactions, transactionItem],
            balance: balance + amount,
        };
    });
};

handleWithdraw = amount => {
    if (amount <= 0 || amount === '') {
        toast.info('Введите сумму для проведения операции!');
        return;
    }
    if (this.state.balance < amount) {
        toast.warning('На счету недостаточно для проведения операции!');
        return;
    }

    this.setState (({transactions, balance}) => {
        const transactionItem = {
            id: shortid.generate(),
            type: 'Withdraw',
            amount,
            date: new Date().toLocaleString(),
        };

        return {
            transactions: [...transactions, transactionItem],
            balance: balance - amount,
        };
    });
};

calculateMoney = () => {
    const {transactions} = this.state;

    return transactions.reduce(
        (acc, transaction) => {
           acc[transaction.type] += transaction.amount;
            return acc;
        },
        {
            Deposit: 0,
            Withdraw: 0,
        },
    );
};

render () {
    const { transactions, balance} = this.state;
    const income = this.calculateMoney().Deposit;
    const expenses = this.calculateMoney().Withdraw;

    return (
        <div className={style.dashboard}>
          <Controls
            onDeposit={this.handleDeposit}
            onWithdraw={this.handleWithdraw}
          />
          {transactions.length > 0 && (
            <Balance balance={balance} income={income} expenses={expenses} />
          )}
  
          {transactions.length > 0 && <TransactionHistory items={transactions} />}
  
          <ToastContainer />
        </div>
    );
}
}

  