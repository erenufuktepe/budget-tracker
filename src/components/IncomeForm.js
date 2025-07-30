import React, { useState } from 'react';
import styles from './IncomeForm.module.css';

const IncomeForm = ({ onAdd }) => {
  const [source, setSource] = useState('');
  const [amount, setAmount] = useState('');
  const [frequency, setFrequency] = useState('Monthly');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!source || !amount) return;

    onAdd({
      source,
      amount: parseFloat(amount),
      frequency,
    });

    // Reset
    setSource('');
    setAmount('');
    setFrequency('Monthly');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formGroup}>
      <label>
        Source
        <input
          type="text"
          value={source}
          onChange={(e) => setSource(e.target.value)}
          className={styles.input}
          required
        />
      </label>

      <label>
        Amount
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className={styles.input}
          required
        />
      </label>

      <label>
        Frequency
        <select
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
          className={styles.select}
        >
          <option value="Monthly">Monthly</option>
          <option value="Bi-weekly">Bi-Weekly</option>
          <option value="Weekly">Weekly</option>
          <option value="One-time">One-time</option>
        </select>
      </label>

      <button type="submit" className={styles.button}>Add Income</button>
    </form>
  );
};

export default IncomeForm;
