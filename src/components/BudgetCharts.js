import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';
import styles from './BudgetCharts.module.css';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);
ChartJS.register(ChartDataLabels);

const BudgetCharts = ({ incomes, expenses }) => {
  // Monthly totals
  const getMonthlyIncome = () => {
    return incomes.reduce((sum, income) => {
      const multiplier =
        {
          monthly: 1,
          "bi-weekly": 2,
          weekly: 4,
          "one-time": 1,
        }[income.frequency] || 1;

      return sum + income.amount * multiplier;
    }, 0);
  };

  const getMonthlyExpenses = () => {
    return expenses
      .filter((e) => e.frequency === 'monthly')
      .reduce((sum, e) => sum + e.cost, 0);
  };

  const totalIncome = getMonthlyIncome();
  const totalExpenses = getMonthlyExpenses();

  const incomeVsExpenseData = {
    labels: ['Monthly Income', 'Monthly Expenses'],
    datasets: [
      {
        label: 'Amount ($)',
        data: [totalIncome, totalExpenses],
        backgroundColor: ['#28a745', '#dc3545'],
      },
    ],
  };

  // Expense by category
  const categoryTotals = {};
  expenses.forEach((e) => {
    if (e.frequency === 'monthly') {
      const category = e.category || 'Uncategorized';
      categoryTotals[category] = (categoryTotals[category] || 0) + e.cost;
    }
  });

  const pieData = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        label: 'Expenses by Category',
        data: Object.values(categoryTotals),
        backgroundColor: [
          '#007bff',
          '#ffc107',
          '#28a745'
        ],
      },
    ],
  };

  return (
    <div className={styles.chartsContainer}>
      <div className={styles.chartBox}>
        <h3>Monthly Income vs Expenses</h3>
        <Bar data={incomeVsExpenseData} height={250} />
      </div>

      <div className={styles.chartBox}>
        <h3>Expenses by Category</h3>
        <Pie
          data={pieData}
          options={{
            plugins: {
              datalabels: {
                formatter: (value, context) => {
                  const total =
                    context.chart._metasets[0].total ||
                    context.chart.data.datasets[0].data.reduce(
                      (a, b) => a + b,
                      0
                    );
                  const percent = ((value / total) * 100).toFixed(1);
                  return `${percent}%`;
                },
                color: "#fff",
                font: {
                  weight: "bold",
                  size: 14,
                },
              },
            },
          }}
          height={250}
        />
      </div>
    </div>
  );
};

export default BudgetCharts;
