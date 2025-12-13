import { createSlice } from '@reduxjs/toolkit';

/**
 * Initial State for Projects
 * Contains a list of projects.
 */
const initialState = {
    projects: [
        { id: 'p1', name: 'Website Redesign', description: 'Redesigning the corporate website.', status: 'active' },
        { id: 'p2', name: 'Mobile App', description: 'Development of the new mobile application.', status: 'active' }
    ],
};

const projectsSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        /**
         * Add a new project
         * @param {Object} state - Current state
         * @param {Object} action - Action containing the new project
         */
        addProject: (state, action) => {
            state.projects.push(action.payload);
        },
        /**
         * Update an existing project
         * @param {Object} state - Current state
         * @param {Object} action - Action containing the updated project
         */
        updateProject: (state, action) => {
            const index = state.projects.findIndex(p => p.id === action.payload.id);
            if (index !== -1) {
                state.projects[index] = action.payload;
            }
        },
        /**
         * Delete a project
         * @param {Object} state - Current state
         * @param {Object} action - Action containing the project ID
         */
        deleteProject: (state, action) => {
            state.projects = state.projects.filter(p => p.id !== action.payload);
        }
    },
});

export const { addProject, updateProject, deleteProject } = projectsSlice.actions;

// Selector to get all projects
export const selectAllProjects = (state) => state.projects.projects;

export default projectsSlice.reducer;
