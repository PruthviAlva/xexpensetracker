import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    ResponsiveContainer
} from 'recharts';

import styles from '../styles/BarChartComponent.module.css';

const BarChartComponent = ({ data }) => {
    return (
        <div className={styles.topExpenses}>
            <h1>Top Expenses</h1>
            <div className={styles.barComponent}>
                <ResponsiveContainer width="100%" height={280}>
                    <BarChart data={data} layout="vertical">
                        <XAxis type="number" axisLine={false} display="none" />
                        <YAxis
                            type='category'
                            width={100}
                            dataKey="name"
                            axisLine={false}
                        />
                        <Bar dataKey="value" fill="#8884d8" barSize={25} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default BarChartComponent;