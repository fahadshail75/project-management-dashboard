import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectTheme, toggleTheme } from '../store/slices/uiSlice';
import { FaMoon, FaSun, FaCog } from 'react-icons/fa';

/**
 * Settings Page Component
 * Allows users to configure application preferences.
 */
const Settings = () => {
    const theme = useSelector(selectTheme);
    const dispatch = useDispatch();

    const handleThemeToggle = () => {
        dispatch(toggleTheme());
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h2 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                Settings
            </h2>

            <div className={`rounded-xl shadow-sm border p-6 ${theme === 'dark'
                    ? 'bg-gray-800 border-gray-700 text-white'
                    : 'bg-white border-gray-200 text-gray-800'
                }`}>
                <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
                    <FaCog className="text-2xl text-indigo-500" />
                    <h3 className="text-xl font-semibold">Preferences</h3>
                </div>

                <div className="flex items-center justify-between">
                    <div>
                        <h4 className="font-medium text-lg">Appearance</h4>
                        <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                            Customize how the application looks properly.
                        </p>
                    </div>

                    <button
                        onClick={handleThemeToggle}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${theme === 'dark'
                                ? 'bg-gray-700 hover:bg-gray-600 text-yellow-300 ring-1 ring-gray-600'
                                : 'bg-gray-100 hover:bg-gray-200 text-gray-600 ring-1 ring-gray-200'
                            }`}
                    >
                        {theme === 'dark' ? <FaSun className="text-xl" /> : <FaMoon className="text-xl" />}
                        <span className="font-medium">
                            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Settings;
