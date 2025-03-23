import React from "react";
import ExpenseItem from "./ExpenseItem";

import styles from "../styles/ExpensesList.module.css";

const TransactionList = ({ expenses, setExpenses, setBalance }) => {
  
  // Delete Expense
  const handleDelete = (id, amount) => {
    const updatedExpenses = expenses.filter(expense => expense.id !== id);
    setExpenses(updatedExpenses);
    setBalance(prevBalance => prevBalance + amount);
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
  };

  return (
    <div className={styles.expenseList}>
      {expenses.length === 0 ? (
        <p>No expenses added yet.</p>
      ) : (
        expenses.map(expense => (
          <ExpenseItem 
            key={expense.id} 
            expense={expense} 
            onDelete={handleDelete} 
          />
        ))
      )}
    </div>
  );
};

export default TransactionList;
