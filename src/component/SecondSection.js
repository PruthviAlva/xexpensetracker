import { useEffect } from "react";

import RecentTransactions from './RecentTransactions';
import BarChartComponent from './BarChartComponent';

import styles from '../styles/SecondSection.module.css';

const SecondSection = ({ expenses, setExpenses, setBalance, categoryCount, setCategoryCount }) => {

    useEffect(() => {

        let foodSpends = 0,
            entertainmentSpends = 0,
            travelSpends = 0;
        let foodCount = 0,
            entertainmentCount = 0,
            travelCount = 0;
        expenses.forEach((item) => {
            if (item.category === "food") {
                foodSpends += Number(item.price);
                foodCount++;
            } else if (item.category === "entertainment") {
                entertainmentSpends += Number(item.price);
                entertainmentCount++;
            } else if (item.category === "travel") {
                travelSpends += Number(item.price);
                travelCount++;
            }
        });

        setCategoryCount({
            food: foodCount,
            entertainment: entertainmentCount,
            travel: travelCount
        });
    }, [expenses]);

    return (
        <div className={styles.SecondSection}>
            <RecentTransactions expenses={expenses} setExpenses={setExpenses} setBalance={setBalance} />
            <BarChartComponent data={[
                { name: "Food", value: categoryCount.food },
                { name: "Entertainment", value: categoryCount.entertainment },
                { name: "Travel", value: categoryCount.travel }
            ]} />
        </div>
    );
}

export default SecondSection;