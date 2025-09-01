import React, { useState } from "react";
import styles from "./IncomeTable.module.css";

const IncomeTable = ({ incomes, onDelete, onEdit, editingId, onSaveEdit }) => {
  const [editValues, setEditValues] = useState({});

  const handleChange = (field, value) => {
    setEditValues({ ...editValues, [field]: value });
  };

  const capitalizeFirst = (str) => {
    return str ? str.charAt(0).toUpperCase() + str.slice(1) : "-";
  }

  if (incomes.length === 0) return <p>No income added yet.</p>;

  return (
    <div className={styles.tableWrapper}>
      <h3>Income Table</h3>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>Name</th>
            <th className={styles.th}>Amount</th>
            <th className={styles.th}>Frequency</th>
            <th className={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {incomes.map((inc) =>
            editingId === inc.id ? (
              <tr key={inc.id}>
                <td>
                  <input
                    className={styles.input}
                    value={editValues.source}
                    onChange={(e) => handleChange("name", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    className={styles.input}
                    type="number"
                    value={Number(editValues.amount)}
                    onChange={(e) => handleChange("amount", e.target.value)}
                  />
                </td>
                <td>
                  <select
                    className={styles.input}
                    value={editValues.frequency}
                    onChange={(e) => handleChange("frequency", e.target.value)}
                  >
                    <option value="monthly">Monthly</option>
                    <option value="bi-weekly">Bi-Weekly</option>
                    <option value="weekly">Weekly</option>
                    <option value="one-time">One-time</option>
                  </select>
                </td>
                <td>
                  <button
                    className={`${styles.actionButton} ${styles.save}`}
                    onClick={() => onSaveEdit(editValues)}
                  >
                    Save
                  </button>
                  <button
                    className={`${styles.actionButton} ${styles.cancel}`}
                    onClick={() => onEdit(null)} 
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ) : (
              <tr key={inc.id}>
                <td className={styles.td}>{inc.source}</td>
                <td className={styles.td}>${Number(inc.amount).toFixed(2)}</td>
                <td className={styles.td}>{capitalizeFirst(inc.frequency)}</td>
                <td className={styles.td}>
                  <button
                    className={`${styles.actionButton} ${styles.edit}`}
                    onClick={() => {
                      onEdit(inc.id);
                      setEditValues({ ...inc });
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className={`${styles.actionButton} ${styles.delete}`}
                    onClick={() => onDelete(inc.id)}
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

export default IncomeTable;
