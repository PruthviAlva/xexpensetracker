import { useEffect, useState } from "react";

import { saveToLocalStorage, getFromLocalStorage } from "./utils/localStorageUtils";
import FirstSection from './component/FirstSection';
import SecondSection from "./component/SecondSection";

import styles from './App.module.css';

function App() {
  const [balance, setBalance] = useState(0);
  const [expenseList, setExpensList] = useState([]);
  const [isMounted, setIsMounted] = useState(false);
  const [expenses, setExpenses] = useState(getFromLocalStorage("expenses") || []);

  const [categorySpends, setCategorySpends] = useState({
    food: 0,
    entertainment: 0,
    travel: 0
  });

  const [categoryCount, setCategoryCount] = useState({
    food: 0,
    entertainment: 0,
    travel: 0
  });

  useEffect(() => {
    // Wallet Balance
    const walletBalance = getFromLocalStorage("walletBalance");

    if(walletBalance) {
      setBalance(Number(walletBalance));
    } else {
      setBalance(5000);
      saveToLocalStorage("walletBalance", 5000);
    }

    // Expense List
    const expense_List = getFromLocalStorage("expenses");
    setExpensList(expense_List);
    setIsMounted(true);

  }, []);

  return (
    <div className={styles.App}>
      <h1>Expense Tracker</h1>
      <div>
        <FirstSection
          balance={balance}
          setBalance={setBalance}
          expenses={expenses}
          setExpenses={setExpenses}
          categorySpends={categorySpends}
          setCategorySpends={setCategorySpends}
          setCategoryCount={setCategoryCount}
        />
        <SecondSection
          expenses={expenses}
          setExpenses={setExpenses}
          setBalance={setBalance}
          categoryCount={categoryCount}
          setCategoryCount={setCategoryCount}
        />
      </div>
    </div>
  );
}

export default App;
