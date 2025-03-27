import { useState } from "react";


import ModalComponent from "./ModalComponent";

import styles from '../styles/Card.module.css';

const Card = ({ text, balance, setBalance, addExpense, expenses }) => {

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);

    return (
        <>
            {text === "Wallet Balance" ? (
                <div className={styles.cardContainer}>
                    {text}: ₹{balance}
                    <button type="button" onClick={openModal} className={styles.addIncomeButton}>+ Add Income</button>
                </div>
            ) : (
                <div className={styles.cardContainer}>
                    {text}: ₹{expenses}
                    <button type="button" onClick={openModal} className={styles.addExpenseButton}>+ Add Expense</button>
                </div>
            )}
            {/* Modal Component */}
            <ModalComponent
                text={text}
                modalIsOpen={modalIsOpen}
                closeModal={closeModal}
                balance={balance}
                setBalance={setBalance}
                addExpense={addExpense}
            />
        </>
    )
}

export default Card;