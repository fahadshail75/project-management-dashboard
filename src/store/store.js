import { configureStore } from '@reduxjs/toolkit';
import projectsReducer from './slices/projectsSlice';
import tasksReducer from './slices/tasksSlice';
import uiReducer from './slices/uiSlice';
import teamReducer from './slices/teamSlice';
import authReducer from './slices/authSlice';

/**
 * Configures the Redux store with reducers for projects, tasks, UI, team, and auth.
 */
export const store = configureStore({
    reducer: {
        projects: projectsReducer,
        tasks: tasksReducer,
        ui: uiReducer,
        team: teamReducer,
        auth: authReducer,
    },
});

export default store;
