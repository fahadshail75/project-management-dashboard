import { createSlice } from '@reduxjs/toolkit';

/**
 * Initial State for Tasks
 */
const initialState = {
    tasks: [
        { id: 't1', projectId: 'p1', title: 'Design Mockups', description: '<p>Create initial mockups for the homepage.</p>', status: 'To Do', assignee: 'Alice' },
        { id: 't2', projectId: 'p1', title: 'Setup React Repo', description: '<p>Initialize the repository with Vite.</p>', status: 'In Progress', assignee: 'Bob' },
        { id: 't3', projectId: 'p2', title: 'API Integration', description: '<p>Connect to the backend API.</p>', status: 'Done', assignee: 'Charlie' }
    ],
};

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        /**
         * Add a new task
         */
        addTask: (state, action) => {
            state.tasks.push(action.payload);
        },
        /**
         * Update an existing task
         */
        updateTask: (state, action) => {
            const index = state.tasks.findIndex(t => t.id === action.payload.id);
            if (index !== -1) {
                state.tasks[index] = action.payload;
            }
        },
        /**
         * Delete a task
         */
        deleteTask: (state, action) => {
            state.tasks = state.tasks.filter(t => t.id !== action.payload);
        },
        /**
         * Move task to a different status (for Drag and Drop)
         * Payload: { id: taskId, status: newStatus }
         */
        moveTask: (state, action) => {
            const { id, status } = action.payload;
            const task = state.tasks.find(t => t.id === id);
            if (task) {
                task.status = status;
            }
        }
    },
});

export const { addTask, updateTask, deleteTask, moveTask } = tasksSlice.actions;

// Selector to get tasks by project ID
export const selectTasksByProject = (state, projectId) =>
    state.tasks.tasks.filter(t => t.projectId === projectId);

export default tasksSlice.reducer;
