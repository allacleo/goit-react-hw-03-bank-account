import React, {Component} from 'react';
import T from 'prop-types';

import style from '../Dashboard/Dashboard.module.css';

export default class Controls extends Component {
    static propTypes ={
        onDeposit: T.func.isRequired,
        onWithdraw: T.func.isRequired,
    };

    state = {
        inputValue: '',
    };

    handleChangeInput = e => {
        const amount = Number(e.target.value);
        this.setState({inputValue: amount});
    };

    handleDeposit = e => {
        e.preventDefault();
        this.props.onDeposit(this.state.inputValue);
        this.setState({inputValue: ""});
    };

    handleWithdraw = e => {
        e.preventDefault();
        this.props.onWithdraw(this.state.inputValue);
        this.setState({inputValue: ""});
    };

    render() {
        const {inputValue} = this.state;

        return (
        <section className={style.controls}>
    <input type="number" 
    className={style.input} 
    name="amount" 
    value={inputValue}
    onChange={this.handleChangeInput}/>
    <button 
    type="button"
    className={style.button}
    onClick={this.handleDeposit}
    >
        Deposit
    </button>
    <button 
    type="button"
    className={style.button}
    onClick={this.handleWithdraw}
    >
        Withdraw
    </button>
  </section>
        );
    }
}