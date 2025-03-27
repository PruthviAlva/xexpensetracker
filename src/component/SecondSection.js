import RecentTransactions from './RecentTransactions';
import BarChartComponent from './BarChartComponent';

import styles from '../styles/SecondSection.module.css';

const SecondSection = ({ expenseList = [], setExpensList, balance, setBalance, categoryCount }) => {

    return (
        <div className={styles.SecondSection}>
            <RecentTransactions
                expenseList={expenseList}
                editExpensList={setExpensList}
                balance={balance}
                setBalance={setBalance}
            />
            <BarChartComponent data={[
                { name: "Food", value: categoryCount.food },
                { name: "Entertainment", value: categoryCount.entertainment },
                { name: "Travel", value: categoryCount.travel }
            ]} />
        </div>
    );
}

export default SecondSection;