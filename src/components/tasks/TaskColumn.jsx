import React from 'react';
import { useDrop } from 'react-dnd';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../store/slices/uiSlice';
import TaskCard from './TaskCard';

/**
 * Task Column Component
 * Aesthetic: Invisible background, minimal header.
 */
const TaskColumn = ({ status, tasks, onMoveTask, onTaskClick }) => {
    const theme = useSelector(selectTheme);
    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'TASK',
        drop: (item) => onMoveTask(item.id, status),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    // Status dot color
    const dotColor = {
        'To Do': 'bg-gray-400',
        'In Progress': 'bg-blue-500',
        'Done': 'bg-green-500',
    }[status];

    return (
        <div
            ref={drop}
            className={`flex-1 min-w-[320px] rounded-3xl flex flex-col h-full transition-colors duration-200 ${isOver ? 'bg-indigo-50/50 dark:bg-indigo-900/20' : ''
                }`}
        >
            <div className="flex items-center justify-between mb-4 px-2 py-2">
                <div className="flex items-center space-x-3">
                    <div className={`w-2.5 h-2.5 rounded-full ${dotColor}`}></div>
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white tracking-wide">
                        {status}
                    </h3>
                </div>
                <span className="text-xs font-semibold text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md">
                    {tasks.length}
                </span>
            </div>

            <div className="flex-1 overflow-y-auto px-1 pb-4 space-y-3 custom-scrollbar">
                {tasks.map(task => (
                    <TaskCard key={task.id} task={task} onClick={() => onTaskClick(task)} />
                ))}
            </div>
        </div>
    );
};

export default TaskColumn;
