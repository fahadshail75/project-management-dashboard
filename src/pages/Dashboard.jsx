import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectAllProjects } from '../store/slices/projectsSlice';
import { selectTheme } from '../store/slices/uiSlice';
import { selectIsAdmin } from '../store/slices/authSlice';
import AddProjectModal from '../components/projects/AddProjectModal';
import TaskStatusChart from '../components/charts/TaskStatusChart';

/**
 * Dashboard Page
 * Displays list of projects and summary statistics with dark mode support.
 */
const Dashboard = () => {
    const projects = useSelector(selectAllProjects);
    const theme = useSelector(selectTheme);
    const isAdmin = useSelector(selectIsAdmin);
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>My Projects</h2>
                {isAdmin && (
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center shadow-sm"
                    >
                        <span className="mr-2">+</span> New Project
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Project List */}
                <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 content-start">
                    {projects.map(project => (
                        <div
                            key={project.id}
                            onClick={() => navigate(`/project/${project.id}`)}
                            className={`p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border cursor-pointer group ${theme === 'dark'
                                    ? 'bg-gray-700 border-gray-600 hover:bg-gray-600'
                                    : 'bg-white border-gray-100'
                                }`}
                        >
                            <h3 className={`text-xl font-semibold mb-2 group-hover:text-indigo-400 transition-colors ${theme === 'dark'
                                    ? 'text-white'
                                    : 'text-gray-800'
                                }`}>
                                {project.name}
                            </h3>
                            <p className={`mb-4 h-12 overflow-hidden text-sm line-clamp-2 ${theme === 'dark'
                                    ? 'text-gray-300'
                                    : 'text-gray-600'
                                }`}>
                                {project.description}
                            </p>
                            <div className="flex justify-between items-center text-sm text-gray-500">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${project.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                    }`}>
                                    {project.status.toUpperCase()}
                                </span>
                                <span>View Tasks →</span>
                            </div>
                        </div>
                    ))}

                    {projects.length === 0 && (
                        <div className={`col-span-full py-12 text-center rounded-xl border border-dashed ${theme === 'dark'
                                ? 'bg-gray-700 border-gray-600 text-gray-400'
                                : 'bg-white border-gray-300 text-gray-500'
                            }`}>
                            <p className="mb-2">No projects yet.</p>
                            <button onClick={() => setIsModalOpen(true)} className="text-indigo-400 hover:underline">
                                Create your first project
                            </button>
                        </div>
                    )}
                </div>

                {/* Charts & Stats */}
                <div className="lg:col-span-1 space-y-6">
                    <TaskStatusChart />
                    {/* Can add more cards here */}
                </div>
            </div>

            <AddProjectModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
};

export default Dashboard;
