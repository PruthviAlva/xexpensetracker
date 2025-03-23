import React from "react";
import { FaTrash } from "react-icons/fa";
import { IoPizzaOutline } from "react-icons/io5";

import styles from "../styles/ExpenseItem.module.css";

const ExpenseItem = ({ expense, onDelete }) => {
  return (
    <div className={styles.expenseItem}>
      <IoPizzaOutline />
      <p><strong>{expense.title}</strong></p>
      <p>${expense.amount.toFixed(2)}</p>
      <p>{expense.category}</p>
      <p>{expense.date}</p>
      <button onClick={() => onDelete(expense.id, expense.amount)} className={styles.deleteButton}>
        <FaTrash />
      </button>
    </div>
  );
};

export default ExpenseItem;
