import ExpensesList from "./ExpensesList";

import styles from '../styles/RecentTransactions.module.css';

function RecentTransactions({ expenses, setExpenses, setBalance }) {

    return (
        <div className={styles.recentTransactions}>
            <h1>Recent Transactions</h1>
            <div className={styles.expensesList}>
                <ExpensesList expenses={expenses} setExpenses={setExpenses} setBalance={setBalance} />
            </div>
        </div>
    )
}

export default RecentTransactions;