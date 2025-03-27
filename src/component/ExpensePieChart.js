import React from "react";
import { PieChart, Pie, Cell } from "recharts";

const ExpensePieChart = ({ data }) => {

    const COLORS = ['rgba(160, 0, 255, 1)', 'rgba(255, 147, 4, 1)', 'rgba(253, 224, 6, 1)'];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <PieChart width={200} height={200}>
                <Pie
                    data={data}
                    cx={100}
                    cy={100}
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={renderCustomizedLabel}
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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