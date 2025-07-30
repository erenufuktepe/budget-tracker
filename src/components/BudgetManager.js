import React, { useState, useEffect } from 'react';
import ExpenseForm from './ExpenseForm';
import ExpenseTable from './ExpenseTable';
import IncomeForm from './IncomeForm';
import IncomeTable from './IncomeTable';
import ImportExport from './ImportExport';
import styles from './BudgetManager.module.css';

const BudgetManager = () => {
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem('expenses');
    return saved ? JSON.parse(saved) : [];
  });

  const [incomes, setIncomes] = useState(() => {
    const saved = localStorage.getItem('incomes');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('incomes', JSON.stringify(incomes));
  }, [incomes]);

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  const addIncome = (income) => {
    setIncomes([...incomes, { id: crypto.randomUUID(), ...income }]);
  };

  const addExpense = (expense) => {
    setExpenses([...expenses, { id: crypto.randomUUID(), ...expense }]);
  };

  const updateIncome = (updated) => {
    setIncomes(incomes.map((inc) => (inc.id === updated.id ? updated : inc)));
  };

  const updateExpense = (updated) => {
    setExpenses(expenses.map((exp) => (exp.id === updated.id ? updated : exp)));
  };

  const deleteIncome = (id) => {
    setIncomes(incomes.filter((inc) => inc.id !== id));
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter((exp) => exp.id !== id));
  };

  const clearAllData = () => {
    setIncomes([]);
    setExpenses([]);
    localStorage.removeItem('incomes');
    localStorage.removeItem('expenses');
  };

  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <h3>Add Income</h3>
        <IncomeForm onAdd={addIncome} />
        <IncomeTable
          incomes={incomes}
          onDelete={deleteIncome}
          onSaveEdit={updateIncome}
        />
      </section>

      <section className={styles.section}>
        <h3>Add Expense</h3>
        <ExpenseForm onAdd={addExpense} />
        <ExpenseTable
          expenses={expenses}
          onDelete={deleteExpense}
          onSaveEdit={updateExpense}
        />
      </section>

      <ImportExport
        incomes={incomes}
        expenses={expenses}
        onImport={({ incomes, expenses }) => {
          setIncomes(incomes || []);
          setExpenses(expenses || []);
        }}
        onClear={clearAllData}
      />
    </div>
  );
};

export default BudgetManager;
