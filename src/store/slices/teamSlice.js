import { createSlice } from '@reduxjs/toolkit';

/**
 * Initial State for Team Members
 */
const initialState = {
    members: [
        { id: 'm1', name: 'Aarav Patel', email: 'aarav.p@example.com', role: 'Developer', avatar: '👨🏽‍💻' },
        { id: 'm2', name: 'Priya Sharma', email: 'priya.s@example.com', role: 'Designer', avatar: '👩🏽‍🎨' },
        { id: 'm3', name: 'Rohan Gupta', email: 'rohan.g@example.com', role: 'Product Owner', avatar: '👨🏽‍💼' },
        { id: 'm4', name: 'Isha Singh', email: 'isha.s@example.com', role: 'QA Lead', avatar: '👩🏽‍💻' },
        { id: 'm5', name: 'Vikram Malhotra', email: 'vikram.m@example.com', role: 'Backend Dev', avatar: '👨🏽‍🔧' },
    ],
};

const teamSlice = createSlice({
    name: 'team',
    initialState,
    reducers: {
        addTeamMember: (state, action) => {
            state.members.push(action.payload);
        },
        deleteTeamMember: (state, action) => {
            state.members = state.members.filter(m => m.id !== action.payload);
        },
    },
});

export const { addTeamMember, deleteTeamMember } = teamSlice.actions;

export const selectAllTeamMembers = (state) => state.team.members;

export default teamSlice.reducer;
