import React, { useState } from "react";
import Modal from "react-modal";
import { useSnackbar } from 'notistack';

import { saveToLocalStorage } from "../utils/localStorageUtils";

import styles from '../styles/Card.module.css';

const ModalComponent = ({ text, modalIsOpen, closeModal, balance, setBalance, addExpense }) => {

    const { enqueueSnackbar } = useSnackbar();
   // Wallet Balance
    const [incomeAmount, setIncomeAmount] = useState("");
    
    // Add Expense
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [date, setDate] = useState("");

    const handleAddIncome = (e) => {
        e.preventDefault();
        const amount = parseInt(incomeAmount);

        if (!amount || amount <= 0) {
            enqueueSnackbar("Please enter a valid income amount.", { variant: "warning" });
            return;
        }

        setBalance(prevBalance => {
            const newBalance = prevBalance + amount;
            saveToLocalStorage("walletBalance", newBalance);
            return newBalance;
        });
        setIncomeAmount("");
        closeModal();
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const expenseAmount = parseInt(amount);

        if (!title || !amount || !category || !date) {
            enqueueSnackbar("All fields are required.", { variant: "warning" });
            return;
        }

        if (expenseAmount <= 0) {
            enqueueSnackbar("Amount must be greater than zero.", { variant: "warning" });
            return;
        }

        if (expenseAmount > balance) {
            enqueueSnackbar("Insufficient wallet balance!", { variant: "warning" });
            return;
        }

        const newExpense = {
            id: Date.now(),
            title,
            amount: expenseAmount,
            category,
            date
        }

        addExpense(newExpense);

        setTitle("");
        setAmount("");
        setCategory("");
        setDate("");
        closeModal();
    }

    return (
        <>
            {text === "Wallet Balance" ? (
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="Add Income"
                    className={styles.modal}
                    overlayClassName={styles.overlay}
                >
                    <h2>Add Balance</h2>
                    <form onSubmit={handleAddIncome} className={styles.formElement}>
                        <input
                            type="number"
                            placeholder="Income Amount"
                            value={incomeAmount}
                            onChange={(e) => setIncomeAmount(e.target.value)}
                            className={styles.input}
                        />
                        <button type="submit" className={styles.submitButton}>
                           + Add Balance
                        </button>
                        <button onClick={closeModal} className={styles.closeButton}>
                            Close
                        </button>
                    </form>
                </Modal>
            ) : (
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="Add Expense"
                    className={styles.modal}
                    overlayClassName={styles.overlay}
                >
                    <h2>Add Expenses</h2>
                    <form onSubmit={handleSubmit} className={styles.formElement2}>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <input
                                type="text"
                                name="title"
                                placeholder="Expense Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className={styles.input}
                                required
                            />
                            <input
                                type="number"
                                name="price"
                                placeholder="Expense Amount"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className={styles.input}
                                required
                            />
                        </div>
                        <div style={{ display: 'flex', gap: '5.1rem' }}>
                            <select
                                name="category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className={styles.input}
                                required
                            >
                                <option value="">Select Category</option>
                                <option value="Food">Food</option>
                                <option value="Entertainment">Entertainment</option>
                                <option value="Travel">Travel</option>
                            </select>
                            <input
                                type="date"
                                name="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className={styles.input}
                                required
                            />
                        </div>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button type="submit" className={styles.submitButton}>+ Add Expense</button>
                            <button onClick={closeModal} className={styles.closeButton}>
                                Cancel
                            </button>
                        </div>
                    </form>
                </Modal>
            )}
        </>
    )
}

export default ModalComponent;