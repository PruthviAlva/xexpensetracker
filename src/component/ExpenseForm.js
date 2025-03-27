import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useSnackbar } from 'notistack'

import { saveToLocalStorage } from "../utils/localStorageUtils";

import styles from '../styles/Card.module.css';

const ExpenseForm = ({ editID, expenseList, setExpenseList, isOpen, setIsOpen, balance, setBalance }) => {

    const { enqueueSnackbar } = useSnackbar();
    // Add Expense
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [date, setDate] = useState("");

    const [formData, setFormData] = useState({
        title: '',
        amount: '',
        category: '',
        date: '',
    });

    const handleChange = (e) => {
        const name = e.target.name;
        setFormData(prev => ({ ...prev, [name]: e.target.value }));
    }

    useEffect(() => {
        if (editID) {
            const expenseData = expenseList.find(item => item.id === editID);
            setFormData({
                title: expenseData.title,
                amount: expenseData.amount,
                category: expenseData.category,
                date: expenseData.date,
            })
        }
    }, [editID]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const updated = expenseList.map(item => {
            if (item.id === editID) {

                const priceDifference = item.amount - Number(formData.amount);
                if (priceDifference < 0 && Math.abs(priceDifference) > balance) {
                    enqueueSnackbar("Price should not exceed the wallet balance", { variant: "warning" });
                    setIsOpen(false);
                    return { ...item };
                }

                setBalance(prev => prev + priceDifference);
                return { ...formData, id: editID };

            } else {
                return item;
            }
        });

        setExpenseList(updated);
        setIsOpen(false);
    }

    return (
        <Modal
            isOpen={isOpen}
            contentLabel="Edit Expense"
            className={styles.modal}
            overlayClassName={styles.overlay}
        >
            <h2>Edit Expenses</h2>
            <form onSubmit={handleSubmit} className={styles.formElement2}>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <input
                        type="text"
                        name="title"
                        placeholder="Expense Title"
                        value={formData.title}
                        onChange={handleChange}
                        className={styles.input}
                        required
                    />
                    <input
                        type="number"
                        name="price"
                        placeholder="Expense Amount"
                        value={formData.amount}
                        onChange={handleChange}
                        className={styles.input}
                        required
                    />
                </div>
                <div style={{ display: 'flex', gap: '5.1rem' }}>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
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
                        value={formData.date}
                        onChange={handleChange}
                        className={styles.input}
                        required
                    />
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button type="submit" className={styles.submitButton}>Edit Expense</button>
                    <button onClick={() => setIsOpen(false)} className={styles.closeButton}>
                        Cancel
                    </button>
                </div>
            </form>
        </Modal>
    )
}

export default ExpenseForm;