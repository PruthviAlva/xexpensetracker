import { useState, useEffect } from "react";

import { getFromLocalStorage, saveToLocalStorage } from "../utils/localStorageUtils";
import Card from "./Card";
import ExpensePieChart from "./ExpensePieChart";

import styles from "../styles/FirstSection.module.css";

function FirstSection({ balance, setBalance, expenseList, setExpensList, expenses, categorySpends }) {

    const addExpense = (expense) => {
        const updatedExpenses = [...expenseList, expense];
        setExpensList(updatedExpenses);
        saveToLocalStorage("expenses", updatedExpenses);
        setBalance(prevBalance => {
            const newBalance = prevBalance - expense.amount;
            saveToLocalStorage("walletBalance", newBalance);
            return newBalance;
        });
    }

    return (
        <div className={styles.FirstSection}>
            <Card text="Wallet Balance" balance={balance} setBalance={setBalance} />
            <Card text="Expenses" addExpense={addExpense} balance={balance} expenses={expenses} />
            <ExpensePieChart data={[
                { name: "Food", value: categorySpends.food },
                { name: "Entertainment", value: categorySpends.entertainment },
                { name: "Travel", value: categorySpends.travel }
            ]} />
        </div>
    );
}

export default FirstSection;