import React from 'react';
import { useDrag } from 'react-dnd';
import { useSelector, useDispatch } from 'react-redux';
import { selectTheme } from '../../store/slices/uiSlice';
import { deleteTask } from '../../store/slices/tasksSlice';
import { FaUser, FaTrash } from 'react-icons/fa';

/**
 * Task Card Component
 * Aesthetic: Pure white floating card, High border-radius, Soft shadow.
 */
const TaskCard = ({ task, onClick }) => {
    const theme = useSelector(selectTheme);
    const dispatch = useDispatch();
    
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'TASK',
        item: { id: task.id, status: task.status },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    const handleDelete = (e) => {
        e.stopPropagation();
        if (window.confirm('Delete this task?')) {
            dispatch(deleteTask(task.id));
        }
    };

    return (
        <div
            ref={drag}
            onClick={onClick}
            className={`p-5 rounded-2xl cursor-grab active:cursor-grabbing hover:-translate-y-1 transition-all duration-300 group relative ${
                isDragging ? 'opacity-50 scale-95' : 'opacity-100'
            } ${
                theme === 'dark'
                    ? 'bg-gray-800 border-gray-700 text-white shadow-lg'
                    : 'bg-white border-transparent shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)]'
            }`}
        >
            <div className="flex flex-col h-full">
                <h4 className="font-semibold text-[15px] mb-3 leading-snug pr-6">{task.title}</h4>

                <div className="mt-auto pt-3 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <div className={`flex items-center justify-center w-6 h-6 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
                            <FaUser className="text-[10px] text-gray-500" />
                        </div>
                        {task.assignee && (
                            <span className="text-xs text-gray-500 font-medium">{task.assignee}</span>
                        )}
                    </div>
                    
                    {/* Delete Button (Visible on Hover) */}
                    <button
                        onClick={handleDelete}
                        className="opacity-0 group-hover:opacity-100 p-1.5 rounded-full hover:bg-red-50 dark:hover:bg-red-900/30 text-gray-300 hover:text-red-500 transition-all duration-200 absolute top-4 right-4"
                        title="Delete Task"
                    >
                        <FaTrash className="text-xs" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskCard;
