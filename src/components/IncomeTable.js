import React, { useState } from "react";
import styles from "./IncomeTable.module.css";

const IncomeTable = ({ incomes, onDelete, onEdit, editingId, onSaveEdit }) => {
  const [editValues, setEditValues] = useState({});

  const handleChange = (field, value) => {
    setEditValues({ ...editValues, [field]: value });
  };

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
                    value={editValues.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    className={styles.input}
                    type="number"
                    value={editValues.amount}
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
                    onClick={() => onSaveEdit({ ...inc, ...editValues })}
                  >
                    Save
                  </button>
                </td>
              </tr>
            ) : (
              <tr key={inc.id}>
                <td className={styles.td}>{inc.name}</td>
                <td className={styles.td}>${inc.amount.toFixed(2)}</td>
                <td className={styles.td}>{inc.frequency}</td>
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
