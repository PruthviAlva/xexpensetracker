import { useEffect, useState } from "react";

import { saveToLocalStorage, getFromLocalStorage } from "./utils/localStorageUtils";
import FirstSection from './component/FirstSection';
import SecondSection from "./component/SecondSection";

import styles from './App.module.css';

function App() {
  const [balance, setBalance] = useState(0);
  const [expenseList, setExpensList] = useState([]);
  const [isMounted, setIsMounted] = useState(false);
  const [expenses, setExpenses] = useState(0);

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

    if (walletBalance) {
      setBalance(Number(walletBalance));
    } else {
      setBalance(5000);
      saveToLocalStorage("walletBalance", 5000);
    }

    // Expense List
    const expense_List = getFromLocalStorage("expenses");
    setExpensList(expense_List || []);
    setIsMounted(true);

  }, []);

  useEffect(() => {
    if (expenseList.length > 0 || isMounted) {
      saveToLocalStorage("expenses", expenseList);
    }

    if (expenseList.length > 0) {
      setExpenses(
        expenseList.reduce((res, val) => res + Number(val.amount), 0)
      );
    } else {
      setExpenses(0);
    }

    let foodSpends = 0,
      entertainmentSpends = 0,
      travelSpends = 0;
    let foodCount = 0,
      entertainmentCount = 0,
      travelCount = 0;

    expenseList.forEach((item) => {
      if (item.category === "Food") {
        foodSpends += Number(item.amount);
        foodCount++;
      } else if (item.category === "Entertainment") {
        entertainmentSpends += Number(item.amount);
        entertainmentCount++;
      } else if (item.category === "Travel") {
        travelSpends += Number(item.amount);
        travelCount++;
      }
    });

    setCategorySpends({
      food: foodSpends,
      entertainment: entertainmentSpends,
      travel: travelSpends
    });

    setCategoryCount({
      food: foodCount,
      entertainment: entertainmentCount,
      travel: travelCount
    });

  }, [expenseList, isMounted]);

  //save balance in localStorage
  useEffect(() => {
    if (isMounted) {
      saveToLocalStorage("walletBalance", balance);
    }
  }, [balance, isMounted])

  return (
    <div className={styles.App}>
      <h1>Expense Tracker</h1>
      <div>
        <FirstSection
          balance={balance}
          setBalance={setBalance}
          expenses={expenses}
          expenseList={expenseList}
          setExpensList={setExpensList}
          categorySpends={categorySpends}
        />
        <SecondSection
          expenseList={expenseList}
          setExpensList={setExpensList}
          balance={balance}
          setBalance={setBalance}
          categoryCount={categoryCount}
        />
      </div>
    </div>
  );
}

export default App;
