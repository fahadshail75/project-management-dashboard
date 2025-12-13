import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { updateTask, deleteTask } from '../../store/slices/tasksSlice';
import { selectTheme } from '../../store/slices/uiSlice';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

/**
 * Edit Task Modal Component
 * Allows users to view and edit task details including description with Quill editor.
 * Supports task deletion.
 */
const EditTaskModal = ({ isOpen, onClose, task }) => {
    const dispatch = useDispatch();
    const theme = useSelector(selectTheme);

    const formik = useFormik({
        initialValues: {
            title: task?.title || '',
            description: task?.description || '',
            assignee: task?.assignee || '',
            status: task?.status || 'To Do',
        },
        validationSchema: Yup.object({
            title: Yup.string().required('Title is Required'),
            description: Yup.string(),
            assignee: Yup.string(),
            status: Yup.string().required(),
        }),
        onSubmit: (values) => {
            const updatedTask = {
                ...task,
                ...values,
            };
            dispatch(updateTask(updatedTask));
            onClose();
        },
        enableReinitialize: true,
    });

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            dispatch(deleteTask(task.id));
            onClose();
        }
    };

    if (!isOpen || !task) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] transition-all">
            <div className={`rounded-xl shadow-2xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto transform transition-all scale-100 ${theme === 'dark'
                ? 'bg-gray-800 text-white border border-gray-700'
                : 'bg-white text-gray-900'
                }`}>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Edit Task</h2>
                    <button
                        onClick={onClose}
                        className={`text-2xl ${theme === 'dark'
                            ? 'text-gray-300 hover:text-white'
                            : 'text-gray-400 hover:text-gray-600'
                            }`}
                    >
                        ×
                    </button>
                </div>

                <form onSubmit={formik.handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Title
                            </label>
                            <input
                                type="text"
                                {...formik.getFieldProps('title')}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 border-gray-300"
                            />
                            {formik.touched.title && formik.errors.title && (
                                <div className="text-red-500 text-sm mt-1">
                                    {formik.errors.title}
                                </div>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Assignee
                            </label>
                            <input
                                type="text"
                                {...formik.getFieldProps('assignee')}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 border-gray-300"
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Status
                        </label>
                        <select
                            {...formik.getFieldProps('status')}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 border-gray-300"
                        >
                            <option value="To Do">To Do</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Done">Done</option>
                        </select>
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                        </label>
                        <ReactQuill
                            theme="snow"
                            value={formik.values.description}
                            onChange={(value) => formik.setFieldValue('description', value)}
                            className="bg-white rounded-lg overflow-hidden"
                            placeholder="Task description..."
                        />
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                        <button
                            type="button"
                            onClick={handleDelete}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        >
                            Delete Task
                        </button>
                        <div className="flex space-x-3">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditTaskModal;

