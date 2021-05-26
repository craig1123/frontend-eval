import React, { useState } from 'react';
import styles from './mortgage.module.scss';
/*
Prompt
Create a calculator that accepts three inputs and calculates your monthly mortgage payment:

Principal loan amount
Interest rate (annual)
Number of years on your mortgage
The standard math equation for calculating your monthly mortgage payment is:
P(r(1+r)^n/((1+r)^n)-1))
 */

const calculateMortgage = (amt: number, rate: number, loanLength: number) => {
  const apr = rate / 1200; // divded by 100 for decimal and 12 months
  const term = loanLength * 12;
  const payment = (amt * (apr * Math.pow(1 + apr, term))) / (Math.pow(1 + apr, term) - 1);
  return Math.round(payment);
};

const MortgageCalculator = () => {
  const [monthlyMortgage, setMonthlyMortgage] = useState(() => calculateMortgage(100000, 3.92, 30));
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const payment = calculateMortgage(
      Number(form.get('amount')),
      Number(form.get('rate')),
      Number(form.get('loan-length'))
    );
    setMonthlyMortgage(payment);
  };

  return (
    <div className={styles.mortgage}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="amount">
          Principal loan amount
          <input type="number" required name="amount" defaultValue="100000" step="1000" />
        </label>
        <label htmlFor="rate">
          Interest rate
          <div className={styles['input-wrapper']}>
            <input type="number" required name="rate" min="0" defaultValue="3.92" step=".01" /> <span>%</span>
          </div>
        </label>
        <label htmlFor="loan-length">
          Length of loan
          <div className={styles['input-wrapper']}>
            <input type="number" required name="loan-length" max="100" min="0" defaultValue="30" /> <span>years</span>
          </div>
        </label>

        <button type="submit" className={styles.calculate}>
          Calculate
        </button>
      </form>
      <h4>Your monthly mortgage payment will be ${monthlyMortgage}</h4>
    </div>
  );
};

export default MortgageCalculator;
