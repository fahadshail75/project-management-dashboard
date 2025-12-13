import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllProjects, deleteProject } from '../store/slices/projectsSlice';
import { selectIsAdmin } from '../store/slices/authSlice';
import KanbanBoard from '../components/tasks/KanbanBoard';
import AddTaskModal from '../components/tasks/AddTaskModal';
import EditTaskModal from '../components/tasks/EditTaskModal';
import TeamMembers from '../components/projects/TeamMembers';
import ProjectStats from '../components/projects/ProjectStats';
import { FaPlus, FaTrash } from 'react-icons/fa';

/**
 * Project Details Page
 * Apple Design Aesthetic: Minimalist, Focus on Content, Clean Typography.
 */
const ProjectDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const projects = useSelector(selectAllProjects);
    const isAdmin = useSelector(selectIsAdmin);
    const project = projects.find(p => p.id === id);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    if (!project) {
        return <div className="text-center py-20 text-gray-400 font-medium">Project not found</div>;
    }

    const handleDeleteProject = () => {
        if (window.confirm(`Are you sure you want to delete "${project.name}"? This cannot be undone.`)) {
            dispatch(deleteProject(id));
            navigate('/dashboard');
        }
    };

    return (
        <div className="flex flex-col h-full space-y-8 relative">
            {/* Minimalist Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between px-2 pt-2 pb-6 border-b border-gray-100 dark:border-gray-800">
                <div>
                    <h5 className="text-sm font-semibold tracking-wide text-gray-500 dark:text-gray-400 uppercase mb-2">Project</h5>
                    <div className="flex items-center space-x-4">
                        <h2 className="text-4xl font-bold text-gray-900 dark:text-white tracking-tight leading-tight">{project.name}</h2>
                        {isAdmin && (
                            <button
                                onClick={handleDeleteProject}
                                className="p-2 text-gray-400 hover:text-red-500 transition-colors rounded-full hover:bg-red-50 dark:hover:bg-red-900/20"
                                title="Delete Project"
                            >
                                <FaTrash className="text-lg" />
                            </button>
                        )}
                    </div>
                    <p className="text-lg text-gray-500 dark:text-gray-400 mt-2 max-w-2xl font-normal leading-relaxed">{project.description}</p>
                </div>
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="mt-6 md:mt-0 bg-gray-900 dark:bg-white text-white dark:text-black px-6 py-3 rounded-full hover:bg-gray-800 dark:hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl font-medium flex items-center justify-center space-x-2 transform active:scale-95 duration-200"
                >
                    <FaPlus className="text-sm" />
                    <span>New Task</span>
                </button>
            </div>

            {/* Layout */}
            <div className="flex flex-col xl:flex-row gap-8 h-[calc(100vh-220px)]">
                {/* Board Section - Takes available space */}
                <div className="flex-1 overflow-hidden h-full rounded-3xl bg-gray-50/50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 backdrop-blur-3xl p-6 shadow-sm">
                    <KanbanBoard
                        projectId={id}
                        onTaskClick={(task) => setSelectedTask(task)}
                    />
                </div>

                {/* Sidebar Section - Fixed width on large screens */}
                <div className="w-full xl:w-[350px] shrink-0 space-y-6 overflow-y-auto pr-1 custom-scrollbar pb-4">
                    <ProjectStats projectId={id} />
                    <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
                        <TeamMembers />
                    </div>
                </div>
            </div>

            <AddTaskModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                projectId={id}
            />

            <EditTaskModal
                isOpen={!!selectedTask}
                onClose={() => setSelectedTask(null)}
                task={selectedTask}
            />
        </div>
    );
};

export default ProjectDetails;
