import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import styles from './ImportExport.module.css';

const ImportExport = ({ incomes, expenses, onImport, onClear }) => {
  const [fileName, setFileName] = useState(null);

  const handleExport = () => {
    const wb = XLSX.utils.book_new();
    const incomeSheet = XLSX.utils.json_to_sheet(incomes);
    const expenseSheet = XLSX.utils.json_to_sheet(expenses);
    XLSX.utils.book_append_sheet(wb, incomeSheet, 'Incomes');
    XLSX.utils.book_append_sheet(wb, expenseSheet, 'Expenses');

    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'budget-data.xlsx');
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = new Uint8Array(evt.target.result);
      const workbook = XLSX.read(data, { type: 'array' });

      const importedIncomes = XLSX.utils.sheet_to_json(workbook.Sheets['Incomes'] || []);
      const importedExpenses = XLSX.utils.sheet_to_json(workbook.Sheets['Expenses'] || []);

      onImport({
        incomes: importedIncomes,
        expenses: importedExpenses,
      });
    };
    reader.readAsArrayBuffer(file);
  };

  const handleClear = () => {
    setFileName(null);
    onClear();
  };

  return (
    <div className={styles.container}>
      <h3>Import/Export Budget Data</h3>
      <button onClick={handleExport} className={styles.button}>Export to Excel</button>
      <label htmlFor="file-upload" className={styles.fileLabel}>Import from Excel</label>
      <input
        id="file-upload"
        type="file"
        accept=".xlsx,.xls"
        onChange={handleImport}
        className={styles.fileInput}
      />
      {fileName && <span style={{ marginLeft: '1rem' }}>📄 {fileName}</span>}
      <div style={{ marginTop: '1rem' }}>
        <button onClick={handleClear} className={styles.clearButton}>Clear All Data</button>
      </div>
    </div>
  );
};

export default ImportExport;
