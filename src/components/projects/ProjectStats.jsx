import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectTasksByProject } from '../../store/slices/tasksSlice';
import { selectTheme } from '../../store/slices/uiSlice';
import { FaChartPie, FaCheck, FaClock, FaList } from 'react-icons/fa';

/**
 * Project Statistics Component
 * Aesthetic: Bento Box Grid, Clean White Cards, Soft Shadows.
 */
const ProjectStats = ({ projectId }) => {
    const tasks = useSelector(state => selectTasksByProject(state, projectId));
    const theme = useSelector(selectTheme);
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    const stats = {
        total: tasks.length,
        todo: tasks.filter(t => t.status === 'To Do').length,
        inProgress: tasks.filter(t => t.status === 'In Progress').length,
        done: tasks.filter(t => t.status === 'Done').length,
        completionRate: tasks.length > 0
            ? Math.round((tasks.filter(t => t.status === 'Done').length / tasks.length) * 100)
            : 0,
    };

    // "Bento" Card Component
    const StatSquare = ({ label, value, icon: Icon, colorClass, delay }) => (
        <div
            className={`flex flex-col justify-between p-5 rounded-3xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-500 ease-out transform ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            <div className="flex justify-between items-start">
                <span className={`text-3xl font-bold tracking-tight text-gray-900 dark:text-white`}>{value}</span>
                <div className={`p-2 rounded-full ${colorClass} bg-opacity-10 dark:bg-opacity-20`}>
                    <Icon className={`text-sm ${colorClass.replace('bg-', 'text-')}`} />
                </div>
            </div>
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-2">{label}</span>
        </div>
    );

    return (
        <div className="space-y-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white px-1">Overview</h3>

            <div className="grid grid-cols-2 gap-4">
                <StatSquare
                    label="Total"
                    value={stats.total}
                    icon={FaList}
                    colorClass="bg-indigo-500"
                    delay={0}
                />
                <StatSquare
                    label="To Do"
                    value={stats.todo}
                    icon={FaClock}
                    colorClass="bg-gray-500"
                    delay={100}
                />
                <StatSquare
                    label="In Progress"
                    value={stats.inProgress}
                    icon={FaChartPie}
                    colorClass="bg-orange-500"
                    delay={200}
                />
                <StatSquare
                    label="Done"
                    value={stats.done}
                    icon={FaCheck}
                    colorClass="bg-emerald-500"
                    delay={300}
                />
            </div>

            {/* Progress Card */}
            <div className={`p-6 rounded-3xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm transition-all duration-700 delay-300 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
                <div className="flex justify-between items-center mb-4">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Completion</span>
                    <span className="text-lg font-bold text-gray-900 dark:text-white">{stats.completionRate}%</span>
                </div>
                <div className="h-2 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gray-900 dark:bg-white rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${mounted ? stats.completionRate : 0}%` }}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProjectStats;
