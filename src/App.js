import React from 'react';
import BudgetManager from './components/BudgetManager';
import './App.css';

function App() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Budget Tracker</h1>
      <BudgetManager />
    </div>
  );
}

export default App;