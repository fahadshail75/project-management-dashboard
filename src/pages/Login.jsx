import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../store/slices/authSlice';
import { FaUserShield, FaUser } from 'react-icons/fa';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (role) => {
        // Mock login logic
        const user = {
            id: role === 'admin' ? 'u1' : 'u2',
            name: role === 'admin' ? 'Admin User' : 'Regular User',
            email: role === 'admin' ? 'admin@example.com' : 'user@example.com',
            role: role,
            avatar: role === 'admin' ? '🛡️' : '👤'
        };
        dispatch(login(user));
        navigate('/dashboard');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-indigo-600 mb-2">PM Dashboard</h1>
                    <p className="text-gray-500 dark:text-gray-400">Sign in to manage your projects</p>
                </div>

                <div className="space-y-4">
                    <button
                        onClick={() => handleLogin('admin')}
                        className="w-full flex items-center justify-center p-4 rounded-xl border-2 border-indigo-100 dark:border-indigo-900 hover:border-indigo-500 dark:hover:border-indigo-400 bg-white dark:bg-gray-800 hover:bg-indigo-50 dark:hover:bg-gray-700 transition-all group"
                    >
                        <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                            <FaUserShield className="text-indigo-600 dark:text-indigo-400 text-xl" />
                        </div>
                        <div className="text-left">
                            <h3 className="font-bold text-gray-900 dark:text-white">Login as Admin</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Full access to create & delete projects</p>
                        </div>
                    </button>

                    <button
                        onClick={() => handleLogin('user')}
                        className="w-full flex items-center justify-center p-4 rounded-xl border-2 border-gray-100 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all group"
                    >
                        <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                            <FaUser className="text-gray-600 dark:text-gray-400 text-xl" />
                        </div>
                        <div className="text-left">
                            <h3 className="font-bold text-gray-900 dark:text-white">Login as User</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">View and edit tasks only</p>
                        </div>
                    </button>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-xs text-gray-400">
                        This is a demo application. No password required.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
