import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../store/slices/uiSlice';
import { FaChartPie } from 'react-icons/fa';

ChartJS.register(ArcElement, Tooltip, Legend);

/**
 * Task Status Chart Component
 * Visualizes task distribution.
 */
const TaskStatusChart = () => {
    const allTasks = useSelector(state => state.tasks.tasks);
    const theme = useSelector(selectTheme);

    const statusCounts = allTasks.reduce((acc, task) => {
        acc[task.status] = (acc[task.status] || 0) + 1;
        return acc;
    }, {});

    const data = {
        labels: ['To Do', 'In Progress', 'Done'],
        datasets: [
            {
                label: '# of Tasks',
                data: [
                    statusCounts['To Do'] || 0,
                    statusCounts['In Progress'] || 0,
                    statusCounts['Done'] || 0
                ],
                backgroundColor: [
                    theme === 'dark' ? 'rgba(156, 163, 175, 0.8)' : 'rgba(209, 213, 219, 0.8)', // Gray/Silver
                    theme === 'dark' ? 'rgba(59, 130, 246, 0.8)' : 'rgba(99, 102, 241, 0.8)',   // Blue/Indigo
                    theme === 'dark' ? 'rgba(16, 185, 129, 0.8)' : 'rgba(52, 211, 153, 0.8)',   // Green/Emerald
                ],
                borderColor: [
                    theme === 'dark' ? 'rgba(31, 41, 55, 1)' : 'rgba(255, 255, 255, 1)',
                    theme === 'dark' ? 'rgba(31, 41, 55, 1)' : 'rgba(255, 255, 255, 1)',
                    theme === 'dark' ? 'rgba(31, 41, 55, 1)' : 'rgba(255, 255, 255, 1)',
                ],
                borderWidth: 2,
                hoverOffset: 4,
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    color: theme === 'dark' ? '#E5E7EB' : '#374151',
                    font: {
                        family: 'sans-serif',
                        size: 12,
                        weight: 'bold'
                    },
                    padding: 20
                }
            },
            tooltip: {
                backgroundColor: theme === 'dark' ? 'rgba(17, 24, 39, 0.9)' : 'rgba(255, 255, 255, 0.9)',
                titleColor: theme === 'dark' ? '#fff' : '#111',
                bodyColor: theme === 'dark' ? '#ccc' : '#444',
                borderColor: theme === 'dark' ? '#374151' : '#e5e7eb',
                borderWidth: 1,
                padding: 10,
                boxPadding: 4
            }
        },
        cutout: '70%',
        responsive: true,
        maintainAspectRatio: false,
    };

    return (
        <div className={`p-6 rounded-2xl shadow-sm border transition-colors duration-200 flex flex-col items-center ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
            }`}>
            <h3 className={`text-xl font-bold mb-6 w-full flex items-center ${theme === 'dark' ? 'text-white' : 'text-gray-800'
                }`}>
                <FaChartPie className="mr-2 text-pink-500" />
                Task Overview
            </h3>

            <div className="w-64 h-64 relative">
                {allTasks.length > 0 ? (
                    <>
                        <Doughnut data={data} options={options} />
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="text-center">
                                <span className={`text-3xl font-bold block ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                                    {allTasks.length}
                                </span>
                                <span className={`text-xs uppercase tracking-wider ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                    Total
                                </span>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className={`flex h-full items-center justify-center ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                        No tasks available
                    </div>
                )}
            </div>
        </div>
    );
};

export default TaskStatusChart;
