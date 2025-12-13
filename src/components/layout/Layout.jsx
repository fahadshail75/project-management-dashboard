import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../store/slices/uiSlice';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

/**
 * Layout Component
 * Wraps the Sidebar, Navbar, and Main Content area.
 */
const Layout = () => {
    const location = useLocation();
    const theme = useSelector(selectTheme);

    // Apply theme to document element
    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    // Determine page title based on path (simple logic)
    const getPageTitle = () => {
        if (location.pathname.startsWith('/project/')) return 'Project Details';
        if (location.pathname === '/settings') return 'Settings';
        return 'Dashboard';
    };

    return (
        <div className={`flex h-screen overflow-hidden ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Navbar title={getPageTitle()} />
                <main className={`flex-1 overflow-auto p-8 relative ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;
