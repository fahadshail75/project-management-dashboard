import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useSelector, useDispatch } from 'react-redux';
import { selectTasksByProject, moveTask } from '../../store/slices/tasksSlice';
import TaskColumn from './TaskColumn';

/**
 * Kanban Board Component
 */
const KanbanBoard = ({ projectId, onTaskClick }) => {
    const dispatch = useDispatch();
    const tasks = useSelector(state => selectTasksByProject(state, projectId));

    const columns = ['To Do', 'In Progress', 'Done'];

    const handleMoveTask = (taskId, newStatus) => {
        dispatch(moveTask({ id: taskId, status: newStatus }));
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="flex h-full overflow-x-auto pb-4 gap-6">
                {columns.map(status => (
                    <TaskColumn
                        key={status}
                        status={status}
                        tasks={tasks.filter(t => t.status === status)}
                        onMoveTask={handleMoveTask}
                        onTaskClick={onTaskClick}
                    />
                ))}
            </div>
        </DndProvider>
    );
};

export default KanbanBoard;
