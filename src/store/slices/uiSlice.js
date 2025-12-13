import { createSlice } from '@reduxjs/toolkit';

/**
 * Initial State for UI
 */
const initialState = {
    theme: 'light', // 'light' or 'dark'
    isSidebarOpen: true,
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.theme = state.theme === 'light' ? 'dark' : 'light';
        },
        setTheme: (state, action) => {
            state.theme = action.payload;
        },
        toggleSidebar: (state) => {
            state.isSidebarOpen = !state.isSidebarOpen;
        },
    },
});

export const { toggleTheme, setTheme, toggleSidebar } = uiSlice.actions;

export const selectTheme = (state) => state.ui.theme;
export const selectIsSidebarOpen = (state) => state.ui.isSidebarOpen;

export default uiSlice.reducer;
