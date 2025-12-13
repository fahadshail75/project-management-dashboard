import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllTeamMembers, deleteTeamMember } from '../../store/slices/teamSlice';
import AddTeamMemberModal from './AddTeamMemberModal';
import { FaPlus, FaEnvelope, FaTrash, FaCircle } from 'react-icons/fa';

/**
 * Team Members Component
 * Aesthetic: Premium "People Widget" with vibrant avatars and hover interactions.
 */
const TeamMembers = ({ projectId }) => {
    const dispatch = useDispatch();
    const members = useSelector(selectAllTeamMembers);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDelete = (id) => {
        if (window.confirm('Remove this member?')) {
            dispatch(deleteTeamMember(id));
        }
    };

    // Helper to generate consistent smooth gradients based on name length
    const getGradient = (name) => {
        const hash = name.length;
        if (hash % 3 === 0) return 'bg-gradient-to-br from-pink-400 to-rose-500';
        if (hash % 3 === 1) return 'bg-gradient-to-br from-indigo-400 to-purple-500';
        return 'bg-gradient-to-br from-cyan-400 to-blue-500';
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center px-2">
                <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Team</h3>
                    <span className="bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-300 px-2 py-0.5 rounded-full text-xs font-bold">
                        {members.length}
                    </span>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex justify-center items-center w-8 h-8 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-md hover:scale-110 transition-transform duration-200"
                    title="Add Member"
                >
                    <FaPlus className="text-xs" />
                </button>
            </div>

            <div className="space-y-4">
                {members.map((member, index) => (
                    <div
                        key={member.id}
                        className="group flex items-center justify-between p-3 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-700/40 transition-all cursor-pointer border border-transparent hover:border-gray-100 dark:hover:border-gray-700"
                        style={{ transitionDelay: `${index * 50}ms` }}
                    >
                        <div className="flex items-center space-x-4">
                            {/* Avatar with Status */}
                            <div className="relative">
                                <div className={`w-12 h-12 rounded-2xl ${getGradient(member.name)} flex items-center justify-center text-white font-bold text-lg shadow-sm group-hover:shadow-md transition-shadow`}>
                                    {member.name.charAt(0)}
                                </div>
                                <div className={`absolute -bottom-1 -right-1 p-0.5 rounded-full bg-white dark:bg-gray-800`}>
                                    <FaCircle className={`text-[10px] ${index % 2 === 0 ? 'text-green-500' : 'text-gray-400'}`} />
                                </div>
                            </div>

                            {/* Info */}
                            <div className="min-w-0 flex-1">
                                <h4 className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate">
                                    {member.name}
                                </h4>
                                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 truncate">{member.role}</p>
                            </div>
                        </div>

                        {/* Hover Actions */}
                        <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-200">
                            <button className="p-2 rounded-full hover:bg-white dark:hover:bg-gray-600 shadow-sm text-gray-400 hover:text-indigo-600 transition-colors" title="Message">
                                <FaEnvelope />
                            </button>
                            <button
                                onClick={(e) => { e.stopPropagation(); handleDelete(member.id); }}
                                className="p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/30 shadow-sm text-gray-400 hover:text-red-500 transition-colors"
                                title="Remove Member"
                            >
                                <FaTrash />
                            </button>
                        </div>
                    </div>
                ))}

                {members.length === 0 && (
                    <div className="p-8 text-center bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-dashed border-gray-200 dark:border-gray-700">
                        <p className="text-gray-400 text-sm">No team members yet.</p>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="text-indigo-500 text-sm font-bold mt-2 hover:underline"
                        >
                            Invite someone
                        </button>
                    </div>
                )}
            </div>

            <AddTeamMemberModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
};

export default TeamMembers;
