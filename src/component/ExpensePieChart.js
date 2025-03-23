import React from "react";
import { PieChart, Pie, Cell } from "recharts";

const CATEGORY_COLORS = {
    Food: "rgba(160, 0, 255, 1)", // Purple
    Entertainment: "rgba(255, 147, 4, 1)", // Orange
    Travel: "rgba(253, 224, 6, 1)", // Yellow
};

const ExpensePieChart = ({ expenses }) => {
    if (!expenses || expenses.length === 0) {
        return <p>No expense data available.</p>; // Prevents PieChart from breaking
    }

    // Step 1: Group expenses by category
    const categoryTotals = expenses.reduce((acc, expense) => {
        if (expense.amount > 0) { // Ensure amount is valid
            acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
        }
        return acc;
    }, {});

    // Step 2: Compute total amount spent
    const totalAmount = Object.values(categoryTotals).reduce((sum, val) => sum + val, 0);
    if (totalAmount === 0) return <p>No valid expenses to display.</p>; // Prevents division by zero

    // Step 3: Format data for PieChart
    const pieData = Object.keys(categoryTotals).map((category) => ({
        name: category,
        value: parseFloat(((categoryTotals[category] / totalAmount) * 100).toFixed(2)), // Ensure value is a number
        color: CATEGORY_COLORS[category] || "#8884d8",
    }));

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <PieChart width={200} height={200}>
                <Pie
                    data={pieData}
                    cx={100}
                    cy={100}
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ cx, cy, midAngle, innerRadius, outerRadius, value }) => {
                        const RADIAN = Math.PI / 180;
                        const radius = innerRadius + (outerRadius - innerRadius) * 0.65; // Position inside slice
                        const x = cx + radius * Math.cos(-midAngle * RADIAN);
                        const y = cy + radius * Math.sin(-midAngle * RADIAN);

                        return (
                            <text
                                x={x}
                                y={y}
                                fill="white"
                                fontSize={17}
                                fontWeight="bold"
                                textAnchor="middle"
                                alignmentBaseline="middle"
                            >
                                {`${value}%`}
                            </text>
                        );
                    }}
                >
                    {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                </Pie>
            </PieChart>
            <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <div style={{ backgroundColor: 'rgba(160, 0, 255, 1)', width: '2rem', height: '0.5rem' }}></div>
                    <p style={{ color: 'white', margin: '0' }}>Food</p>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <div style={{ backgroundColor: 'rgba(255, 147, 4, 1)', width: '2rem', height: '0.5rem' }}></div>
                    <p style={{ color: 'white', margin: '0' }}>Entertainment</p>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <div style={{ backgroundColor: 'rgba(253, 224, 6, 1)', width: '2rem', height: '0.5rem' }}></div>
                    <p style={{ color: 'white', margin: '0' }}>Travel</p>
                </div>
            </div>
        </div>
    );
};

export default ExpensePieChart;