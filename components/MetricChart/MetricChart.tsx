import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register the necessary components for Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

type DataPoint = {
    timestamp: string;
    metric_value: number;
};

type MetricChartProps = {
    chartLabel: string;
    data: DataPoint[];
};

const MetricChart: React.FC<MetricChartProps> = ({chartLabel, data }) => {
    // Sort the data by timestamp to ensure the graph is plotted correctly
    const sortedData = [...data].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

    // Prepare data for the chart
    const chartData = {
        labels: sortedData.map((point) => new Date(point.timestamp).toLocaleDateString()), // Format timestamp as a readable date
        datasets: [
            {
                label: chartLabel,
                data: sortedData.map((point) => point.metric_value),
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                tension: 0.3, // Smooth curves
            },
        ],
    };

    // Chart options
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: chartLabel,
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Date',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Metric Value',
                },
                beginAtZero: true, // Start the y-axis at 0
            },
        },
    };

    return <Line data={chartData} options={options} />;
};

export default MetricChart;
