import React, { useState } from 'react';
import styles from './ExpenseForm.module.css';

const ExpenseForm = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [cost, setCost] = useState('');
  const [frequency, setFrequency] = useState('monthly');
  const [endDate, setEndDate] = useState('');
  const [category, setCategory] = useState('');
  const [payer, setPayer] = useState('');

  const calculateRemainingPayments = () => {
    if (!endDate || !frequency) return null;

    const now = new Date();
    const end = new Date(endDate);
    if (isNaN(end.getTime()) || end < now) return 0;

    const msPerPeriod = {
      'Weekly': 7 * 24 * 60 * 60 * 1000,
      'Bi-weekly': 14 * 24 * 60 * 60 * 1000,
      'Monthly': 30 * 24 * 60 * 60 * 1000,
      'One-time': Infinity,
    };

    const diffMs = end - now;
    const periods = msPerPeriod[frequency] || Infinity;

    return frequency === 'One-time' ? 1 : Math.ceil(diffMs / periods);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !cost || !payer) return;

    const remainingPayments = calculateRemainingPayments();

    onAdd({
      name,
      cost: parseFloat(cost),
      frequency,
      endDate,
      remainingPayments,
      category,
      payer,
    });

    setName('');
    setCost('');
    setFrequency('Monthly');
    setEndDate('');
    setCategory('');
    setPayer('');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formGroup}>
      <label>
        Name
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.input}
          required
        />
      </label>

      <label>
        Cost
        <input
          type="number"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
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

      <label>
        End Date
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className={styles.input}
        />
      </label>

      <label>
        Category
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={styles.input}
        />
      </label>

      <label>
        Who is paying?
        <input
          type="text"
          value={payer}
          onChange={(e) => setPayer(e.target.value)}
          className={styles.input}
          required
        />
      </label>

      <button type="submit" className={styles.button}>
        Add Expense
      </button>
    </form>
  );
};

export default ExpenseForm;
