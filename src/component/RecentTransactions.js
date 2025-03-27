import { useEffect, useState } from "react";
import Modal from "react-modal";

import ExpenseItem from "./ExpenseItem";
import ExpenseForm from "./ExpenseForm";
import Pagination from "./Pagination";

import styles from '../styles/RecentTransactions.module.css';

function RecentTransactions({ expenseList, editExpensList, balance, setBalance }) {

    const [editID, setEditID] = useState(0);
    const [isDisplayEditor, setIsDisplayEditor] = useState(false);
    const [currentExpense, setCurrentExpense] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const maxRecords = 3;
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const startIndex = (currentPage - 1) * maxRecords;
        const endIndex = Math.min(currentPage * maxRecords, expenseList.length);

        setCurrentExpense([...expenseList].slice(startIndex, endIndex));
        setTotalPages(Math.ceil(expenseList.length / maxRecords));

    }, [currentPage, expenseList]);

    //update page if all items on current page have been deleted

    useEffect(() => {
        if (totalPages < currentPage && currentPage > 1) {
            setCurrentPage(prev => prev - 1)
        }
    }, [totalPages])


    // Edit Expense
    const handleEdit = (id) => {
        setEditID(id);
        setIsDisplayEditor(true);
    };

    // Delete Expense
    const handleDelete = (id) => {
        const transaction = expenseList.find(expense => expense.id === id);
        const price = Number(transaction.amount);
        setBalance(prevBalance => prevBalance + price);
        editExpensList(prev => (
            prev.filter(item => item.id !== id)
        ));
    };

    return (
        <div className={styles.recentTransactions}>
            <h2>Recent Transactions</h2>
            {expenseList.length > 0 ?
                <div className={styles.expensesList}>
                    <div>
                        {currentExpense.map(expense => (
                            <ExpenseItem
                                key={expense.id}
                                expense={expense}
                                handleEdit={() => handleEdit(expense.id)}
                                handleDelete={() => handleDelete(expense.id)}
                            />
                        ))}
                    </div>
                    {totalPages > 1 && (<Pagination
                        updatePage={setCurrentPage}
                        currentPage={currentPage}
                        totalPages={totalPages}
                    />
                    )}
                </div>
                : (
                    <div className={styles.expensesList}>
                        <p>No Expense added yet.</p>
                    </div>
                )
            }
            <ExpenseForm
                editID={editID}
                expenseList={expenseList}
                setExpenseList={editExpensList}
                isOpen={isDisplayEditor}
                setIsOpen={setIsDisplayEditor}
                balance={balance}
                setBalance={setBalance}
            />
        </div>
    )
}

export default RecentTransactions;