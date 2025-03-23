import { useState, useEffect } from "react";

import { getFromLocalStorage, saveToLocalStorage } from "../utils/localStorageUtils";
import Card from "./Card";
import ExpensePieChart from "./ExpensePieChart";

import styles from "../styles/FirstSection.module.css";

function FirstSection({ balance, setBalance, expenses, setExpenses, setCategorySpends }) {

    const [displayAmount, setDisplayAmount] = useState(getFromLocalStorage("expenseAmount") || 0);

    useEffect(() => {

        let foodSpends = 0,
            entertainmentSpends = 0,
            travelSpends = 0;
        expenses.forEach((item) => {
            if (item.category === "food") {
                foodSpends += Number(item.price);
            } else if (item.category === "entertainment") {
                entertainmentSpends += Number(item.price);
            } else if (item.category === "travel") {
                travelSpends += Number(item.price);
            }
        });

        setCategorySpends({
            food: foodSpends,
            entertainment: entertainmentSpends,
            travel: travelSpends
        });
    }, [expenses]);

    const addExpense = (expense) => {
        const updatedExpenses = [...expenses, expense];
        setExpenses(updatedExpenses);
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
            <Card text="Expenses" addExpense={addExpense} balance={balance} displayAmount={displayAmount} setDisplayAmount={setDisplayAmount} />
            <ExpensePieChart expenses={expenses} />
        </div>
    );
}

export default FirstSection;