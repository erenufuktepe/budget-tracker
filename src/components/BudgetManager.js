import React, { useState, useEffect } from "react";
import ExpenseForm from "./ExpenseForm";
import ExpenseTable from "./ExpenseTable";
import IncomeForm from "./IncomeForm";
import IncomeTable from "./IncomeTable";
import ImportExport from "./ImportExport";
import BudgetCharts from './BudgetCharts';
import styles from "./BudgetManager.module.css";

const BudgetManager = () => {
  const [editingIncomeId, setEditingIncomeId] = useState(null);
  const [editingExpenseId, setEditingExpenseId] = useState(null);
  
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem("expenses");
    return saved ? JSON.parse(saved) : [];
  });

  const [incomes, setIncomes] = useState(() => {
    const saved = localStorage.getItem("incomes");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("incomes", JSON.stringify(incomes));
  }, [incomes]);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const addIncome = (income) => {
    setIncomes([...incomes, { id: crypto.randomUUID(), ...income }]);
  };

  const addExpense = (expense) => {
    setExpenses([...expenses, { id: crypto.randomUUID(), ...expense }]);
  };

  const updateIncome = (updated) => {
    setIncomes(incomes.map((inc) => (inc.id === updated.id ? updated : inc)));
    setEditingIncomeId(null); 
  };

  const updateExpense = (updated) => {
    setExpenses(expenses.map((exp) => (exp.id === updated.id ? updated : exp)));
    setEditingExpenseId(null);
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
    localStorage.removeItem("incomes");
    localStorage.removeItem("expenses");
  };

  const getMonthlyIncomeTotal = () => {
    return incomes.reduce((sum, income) => {
      const multiplier =
        {
          monthly: 1,
          "bi-weekly": 2,
          weekly: 4,
          "one-time": 1,
        }[income.frequency] || 1;

      return sum + Number(income.amount) * multiplier;
    }, 0);
  };

  const getMonthlyExpenseTotal = () => {
    return expenses
      .filter((exp) => exp.frequency === "monthly")
      .reduce((sum, exp) => sum + Number(exp.cost), 0);
  };

  return (
    <div className={styles.container}>
      <ImportExport
        incomes={incomes}
        expenses={expenses}
        onImport={({ incomes, expenses }) => {
          setIncomes(incomes || []);
          setExpenses(expenses || []);
        }}
        onClear={clearAllData}
      />

      <section className={styles.section}>
        <h3>Add Income</h3>
        <IncomeForm onAdd={addIncome} />
        <IncomeTable
          incomes={incomes}
          onDelete={deleteIncome}
          onEdit={setEditingIncomeId}
          editingId={editingIncomeId}
          onSaveEdit={updateIncome}
        />
        <h4 style={{ marginTop: "1rem" }}>
          Total Estimated Monthly Income: ${getMonthlyIncomeTotal().toFixed(2)}
        </h4>
      </section>

      <section className={styles.section}>
        <h3>Add Expense</h3>
        <ExpenseForm onAdd={addExpense} />
        <ExpenseTable
          expenses={expenses}
          onDelete={deleteExpense}
          onEdit={setEditingExpenseId}
          editingId={editingExpenseId}
          onSaveEdit={updateExpense}
        />
        <h4 style={{ marginTop: "1rem" }}>
          Total Monthly Expenses: ${getMonthlyExpenseTotal().toFixed(2)}
        </h4>
      </section>

      <section className={`${styles.section} ${styles.budgetText}`}>
        <h3>Budget Overview</h3>
        <p>
          The 50/30/20 rule is a budgeting guideline that suggests allocating
          your after-tax income as follows:
        </p>
        <ul>
          <li>
            <strong>50%</strong> for <em>needs</em>: essentials like rent,
            utilities, groceries, and healthcare.
          </li>
          <li>
            <strong>30%</strong> for <em>wants</em>: non-essentials such as
            dining out, entertainment, and hobbies.
          </li>
          <li>
            <strong>20%</strong> for <em>savings</em>: includes emergencies,
            retirement, and debt repayment.
          </li>
        </ul>

        <BudgetCharts incomes={incomes} expenses={expenses} />
      </section>
    </div>
  );
};

export default BudgetManager;
