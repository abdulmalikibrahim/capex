import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
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

const Graph = (shop) => {
    const [dataPlan, setDataPlan] = useState([]);
    const [dataActual, setDataActual] = useState([]);
    const [dataBFOS, setDataBFOS] = useState([]);
    const [dataBTOS, setDataBTOS] = useState([]);

    // Mengambil data dari API
    const getData = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/capex');
            const data = res.data.data;
            const plan = data.map((d) => d.plan);
            const actual = data.map((d) => d.actual);
            const bfos = data.map((d) => d.bfos);
            const btos = data.map((d) => d.btos);
            setDataPlan(plan);
            setDataActual(actual);
            setDataBFOS(bfos);
            setDataBTOS(btos);
        } catch (error) {
            console.log(error);
        }
    };
    // Membuat label chart
    const [labels, setLabels] = useState([]);
    const LabelChart = () => {
        const Labels = [];
        const monthNotUp = [1,2,3];
        for (let i = 1; i <= 12; i++) {
            const currentDate = (monthNotUp.includes(new Date().getMonth) <= 0) ? new Date().getFullYear()+"-01-01" : (new Date().getFullYear() - 1)+"-01-01";
            const date = new Date(currentDate);
            date.setMonth(date.getMonth() + 2 + i);
    
            const month = date.toLocaleString('default', { month: 'short' })+" "+date.getFullYear();
            Labels.push(month);
            setLabels(Labels)
        }
    }
    
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
                data: [65, 59, 80, 81, 56, 55, 40],
                borderColor: 'rgb(192, 75, 75)',
                backgroundColor: 'rgb(192, 98, 75)',
                borderWidth: 2,
                tension: 0.4, // Membuat garis lebih melengkung
            },
            {
                label: 'Actual',
                data: [65, 59, 80, 81, 56, 55, 40],
                borderColor: 'rgb(192, 184, 75)',
                backgroundColor: 'rgb(192, 184, 75)',
                borderWidth: 2,
                tension: 0.4, // Membuat garis lebih melengkung
            },
            {
                label: 'BFOS',
                data: [65, 59, 80, 81, 56, 55, 40],
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgb(75, 192, 192)',
                borderWidth: 2,
                tension: 0.4, // Membuat garis lebih melengkung
            },
            {
                label: 'BTOS',
                data: [65, 59, 80, 81, 56, 55, 40],
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
                text: 'CAPEX MONITORING',
            },
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
                    text: 'Capex (in x1000)',
                },
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="chart-container">
            <Bar data={data} options={options} />
        </div>
    );
};

export default Graph;
