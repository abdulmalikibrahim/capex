import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Legend);


const Graph = ({pdfRef,dataPlan,dataActual,dataBFOS,dataBTOS,formatNumber,shop}) => {
    const barChartLabelsPlugin = {
        id: 'barChartLabels',
        afterDatasetsDraw(chart) {
            const { ctx, data } = chart;
            chart.data.datasets.forEach((dataset, i) => {
                const meta = chart.getDatasetMeta(i);
                meta.data.forEach((bar, index) => {
                    const value = dataset.data[index] > 0 ? formatNumber(dataset.data[index]) : "";
                    ctx.save();
                    ctx.font = '12px Arial';
                    ctx.fillStyle = '#333';
                    ctx.textAlign = 'center';
                    ctx.fillText(value, bar.x, bar.y - 10); // Teks di atas batang
                    ctx.restore();
                });
            });
        },
    };

    // Membuat label chart
    const [labels, setLabels] = useState([]);
    const LabelChart = () => {
        const Labels = [];
        const monthNotUp = [1, 2, 3];
        const currentDate = monthNotUp.includes(new Date().getMonth() + 1)
        ? `${new Date().getFullYear() - 1}-03-01`
        : `${new Date().getFullYear()}-03-01`;
        const date = new Date(currentDate);
    
        for (let i = 1; i <= 12; i++) {
            date.setMonth(date.getMonth() + 1); // Increment month
            const month = date.toLocaleString('default', { month: 'short' }) + ' ' + date.getFullYear();
            Labels.push(month);
        }
    
        setLabels(Labels); // Update state once
    };    
    useEffect(() => {
        LabelChart();
        // eslint-disable-next-line
    }, []);

    // Data untuk chart
    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Plan',
                data: dataPlan,
                borderColor: 'rgb(229, 128, 128)',
                backgroundColor: 'rgb(216, 135, 115)',
                borderWidth: 2,
                tension: 0.4, // Membuat garis lebih melengkung
            },
            {
                label: 'Actual',
                data: dataActual,
                borderColor: 'rgb(192, 184, 75)',
                backgroundColor: 'rgb(192, 184, 75)',
                borderWidth: 2,
                tension: 0.4, // Membuat garis lebih melengkung
            },
            {
                label: 'BFOS',
                data: dataBFOS,
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgb(75, 192, 192)',
                borderWidth: 2,
                tension: 0.4, // Membuat garis lebih melengkung
            },
            {
                label: 'BTOS',
                data: dataBTOS,
                borderColor: 'rgb(192, 75, 186)',
                backgroundColor: 'rgb(192, 75, 186)',
                borderWidth: 2,
                tension: 0.4, // Membuat garis lebih melengkung
            },
        ],
    };

    // Konfigurasi opsi chart
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: `CAPEX MONITORING ${shop}`,
                font: {
                    size: 40 // Ubah ukuran font sesuai kebutuhan
                }
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Periode',
                },
            },
            y: {
                title: {
                    display: true,
                    text: '(in x1000)',
                },
                beginAtZero: true,
            },
        },
        maintainAspectRatio: false,
    };

    return (
        <div className="chart-container" style={{height:"56rem"}} ref={pdfRef}>
            <Bar data={data} options={options} plugins={[barChartLabelsPlugin]} />
        </div>
    );
};

export default Graph;
