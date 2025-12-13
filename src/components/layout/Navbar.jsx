import React from 'react';
import { FaBell, FaBars } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { selectTheme, toggleSidebar } from '../../store/slices/uiSlice';

/**
 * Navbar Component
 * Displays the top header with dark mode support.
 */
const Navbar = ({ title }) => {
    const theme = useSelector(selectTheme);
    const dispatch = useDispatch();

    return (
        <header className={`h-16 flex items-center px-4 md:px-8 justify-between shadow-sm border-b transition-colors duration-300 ${theme === 'dark'
            ? 'bg-gray-700 border-gray-600 text-white'
            : 'bg-white border-gray-200 text-gray-800'
            }`}>
            <div className="flex items-center space-x-4">
                <button
                    onClick={() => dispatch(toggleSidebar())}
                    className={`p-2 rounded-lg transition-colors ${theme === 'dark' ? 'hover:bg-gray-600' : 'hover:bg-gray-100'}`}
                >
                    <FaBars />
                </button>
                <h2 className="text-xl font-semibold">{title}</h2>
            </div>
            <div className="flex items-center space-x-4">
                <button className={`p-2 transition-colors ${theme === 'dark'
                    ? 'text-gray-300 hover:text-white'
                    : 'text-gray-400 hover:text-gray-600'
                    }`}>
                    <FaBell className="text-xl" />
                </button>
            </div>
        </header>
    );
};

export default Navbar;
