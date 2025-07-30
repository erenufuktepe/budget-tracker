import React, { useState } from "react";
import styles from "./ExpenseTable.module.css";

const ExpenseTable = ({
  expenses,
  onDelete,
  onEdit,
  editingId,
  onSaveEdit,
}) => {
  const [editValues, setEditValues] = useState({});

  const handleChange = (field, value) => {
    setEditValues({ ...editValues, [field]: value });
  };

  const capitalizeFirst = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }


  const calculateRemainingPayments = (endDate, frequency) => {
  if (!endDate || !frequency) return null;

  const now = new Date();
  const end = new Date(endDate);
  if (isNaN(end.getTime()) || end < now) return 0;

  const msPerPeriod = {
    'weekly': 7 * 24 * 60 * 60 * 1000,
    'bi-weekly': 14 * 24 * 60 * 60 * 1000,
    'monthly': 30 * 24 * 60 * 60 * 1000,
    'one-time': Infinity,
  };

  const diffMs = end - now;
  const period = msPerPeriod[frequency] || Infinity;

  return frequency === 'one-time' ? 1 : Math.ceil(diffMs / period);
};
  if (expenses.length === 0) return <p>No expenses added yet.</p>;

  return (
    <div className={styles.tableWrapper}>
      <h3>Expense Table</h3>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>Name</th>
            <th className={styles.th}>Cost</th>
            <th className={styles.th}>Frequency</th>
            <th className={styles.th}>End Date</th>
            <th className={styles.th}>Remaining Payments</th>
            <th className={styles.th}>Category</th>
            <th className={styles.th}>Paid By</th>
            <th className={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((exp) =>
            editingId === exp.id ? (
              <tr key={exp.id}>
                <td>
                  <input
                    className={styles.input}
                    value={editValues.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    className={styles.input}
                    type="number"
                    value={editValues.cost}
                    onChange={(e) => handleChange("cost", e.target.value)}
                  />
                </td>
                <td>
                  <select
                    className={styles.input}
                    value={editValues.frequency}
                    onChange={(e) => handleChange("frequency", e.target.value)}
                  >
                    <option value="one-time">One-time</option>
                    <option value="weekly">Weekly</option>
                    <option value="bi-weekly">Bi-Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </td>
                <td>
                  <input
                    className={styles.input}
                    type="date"
                    value={editValues.endDate || ""}
                    onChange={(e) => handleChange("endDate", e.target.value)}
                  />
                </td>
                <td className={styles.td}>{exp.remainingPayments ?? "-"}</td>
                <td>
                  <select
                    className={styles.input}
                    value={editValues.category || ""}
                    onChange={(e) => handleChange("category", e.target.value)}
                  >
                    <option value="need">Need</option>
                    <option value="want">Want</option>
                    <option value="saving">Saving</option>
                  </select>
                </td>
                <td>
                  <input
                    className={styles.input}
                    value={editValues.payer}
                    onChange={(e) => handleChange("payer", e.target.value)}
                  />
                </td>
                <td>
                  <button
                    className={`${styles.actionButton} ${styles.save}`}
                    onClick={() =>
                      onSaveEdit({
                        ...exp,
                        ...editValues,
                        remainingPayments: calculateRemainingPayments(
                          editValues.endDate,
                          editValues.frequency
                        ),
                      })
                    }
                  >
                    Save
                  </button>
                  <button
                    className={`${styles.actionButton} ${styles.cancel}`}
                    onClick={() => onEdit(null)} // ✅ Resets editing state
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ) : (
              <tr key={exp.id}>
                <td className={styles.td}>{exp.name}</td>
                <td className={styles.td}>${exp.cost.toFixed(2)}</td>
                <td className={styles.td}>{capitalizeFirst(exp.frequency)}</td>
                <td className={styles.td}>{exp.endDate || "-"}</td>
                <td className={styles.td}>{exp.remainingPayments ?? "-"}</td>
                <td className={styles.td}>
                  {capitalizeFirst(exp.category) || "-"}
                </td>
                <td className={styles.td}>{exp.payer}</td>
                <td className={styles.td}>
                  <button
                    className={`${styles.actionButton} ${styles.edit}`}
                    onClick={() => {
                      onEdit(exp.id);
                      setEditValues({ ...exp });
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className={`${styles.actionButton} ${styles.delete}`}
                    onClick={() => onDelete(exp.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseTable;
