import React from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { PiPizza, PiGift } from "react-icons/pi";
import { MdOutlineModeEdit } from "react-icons/md";
import { BsSuitcase2 } from "react-icons/bs";

import styles from "../styles/ExpenseItem.module.css";

const ExpenseItem = ({ expense, handleEdit, handleDelete }) => {
  return (
    <div className={styles.expenseItem}>
      <div className={styles.cardInner}>
        <div className={styles.cardIcon}>
          {expense.category === "Food" && <PiPizza />}
          {expense.category === "Entertainment" && <PiGift />}
          {expense.category === "Travel" && <BsSuitcase2 />}
        </div>
        <div className={styles.cardInfo}>
          <h5>{expense.title}</h5>
          <p>{expense.date}</p>
        </div>
      </div>

      <div className={styles.cardInner}>
        <p className={styles.cardPrice}>{`₹${expense.amount}`}</p>
        <div className={styles.cardButtonWrapper}>
          <button className={styles.cardDelete} onClick={handleDelete}>
            <IoMdCloseCircleOutline />
          </button>
          <button className={styles.cardEdit} onClick={handleEdit}>
            <MdOutlineModeEdit />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpenseItem;
