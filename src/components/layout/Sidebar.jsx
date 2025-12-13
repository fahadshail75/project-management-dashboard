import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaChartBar, FaCog, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { selectTheme, selectIsSidebarOpen } from '../../store/slices/uiSlice';
import { selectUser, logout } from '../../store/slices/authSlice';

/**
 * Sidebar Component
 * Displays navigation links for the application with dark mode support.
 */
const Sidebar = () => {
    const theme = useSelector(selectTheme);
    const isOpen = useSelector(selectIsSidebarOpen);
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    const navItems = [
        { name: 'Dashboard', path: '/dashboard', icon: <FaChartBar /> },
        { name: 'Settings', path: '/settings', icon: <FaCog /> },
    ];

    return (
        <div className={`${isOpen ? 'w-64' : 'w-20'} h-screen flex flex-col shadow-sm border-r transition-all duration-300 ease-in-out ${theme === 'dark'
            ? 'bg-gray-800 border-gray-700'
            : 'bg-white border-gray-200'
            }`}>
            <div className={`h-16 flex items-center border-b px-6 ${theme === 'dark'
                ? 'border-gray-700'
                : 'border-gray-200'
                }`}>
                <h1 className={`font-bold text-indigo-600 transition-all duration-300 overflow-hidden whitespace-nowrap ${isOpen ? 'text-2xl opacity-100' : 'text-0 opacity-0 w-0'}`}>
                    PM Dashboard
                </h1>
                {!isOpen && <span className="text-xl font-bold text-indigo-600 mx-auto">PM</span>}
            </div>

            <nav className="flex-1 p-3 space-y-2">
                {navItems.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        title={!isOpen ? item.name : ''}
                        className={({ isActive }) =>
                            `flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors ${isActive
                                ? theme === 'dark'
                                    ? 'bg-indigo-900 text-indigo-300 font-medium'
                                    : 'bg-indigo-50 text-indigo-600 font-medium'
                                : theme === 'dark'
                                    ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                            } ${!isOpen ? 'justify-center' : ''}`
                        }
                    >
                        <span className="text-xl shrink-0">{item.icon}</span>
                        <span className={`transition-all duration-300 overflow-hidden whitespace-nowrap ${isOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0 hidden'}`}>
                            {item.name}
                        </span>
                    </NavLink>
                ))}
            </nav>

            <div className={`p-4 border-t ${theme === 'dark'
                ? 'border-gray-700 text-gray-300'
                : 'border-gray-200 text-gray-600'
                }`}>
                <div className={`flex items-center ${isOpen ? 'space-x-3' : 'justify-center'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${theme === 'dark'
                        ? 'bg-gray-700'
                        : 'bg-gray-200'
                        }`}>
                        {user?.avatar ? <span className="text-lg">{user.avatar}</span> : <FaUser />}
                    </div>
                    {isOpen && (
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{user?.name || 'User'}</p>
                            <p className="text-xs text-gray-500 truncate capitalize">{user?.role || 'Guest'}</p>
                        </div>
                    )}
                    {isOpen && (
                        <button
                            onClick={handleLogout}
                            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 hover:text-red-500 transition-colors"
                            title="Logout"
                        >
                            <FaSignOutAlt />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
