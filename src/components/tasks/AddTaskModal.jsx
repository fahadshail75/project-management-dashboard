import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from '../../store/slices/tasksSlice';
import { selectTheme } from '../../store/slices/uiSlice';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

/**
 * Add Task Modal
 * Uses Formik and React Quill.
 */
const AddTaskModal = ({ isOpen, onClose, projectId }) => {
    const dispatch = useDispatch();
    const theme = useSelector(selectTheme);

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            assignee: '',
            status: 'To Do',
        },
        validationSchema: Yup.object({
            title: Yup.string().required('Title is Required'),
            description: Yup.string(),
            assignee: Yup.string(),
            status: Yup.string().required(),
        }),
        onSubmit: (values, { resetForm }) => {
            const newTask = {
                id: Date.now().toString(),
                projectId,
                ...values,
            };
            dispatch(addTask(newTask));
            resetForm();
            onClose();
        },
    });

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] transition-all">
            <div className={`rounded-xl shadow-2xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto transform transition-all scale-100 ${theme === 'dark'
                ? 'bg-gray-800 text-white border border-gray-700'
                : 'bg-white text-gray-900'
                }`}>
                <h2 className="text-xl font-bold mb-4">Add New Task</h2>

                <form onSubmit={formik.handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                            <input
                                type="text"
                                {...formik.getFieldProps('title')}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 border-gray-300"
                            />
                            {formik.touched.title && formik.errors.title && (
                                <div className="text-red-500 text-sm mt-1">{formik.errors.title}</div>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Assignee</label>
                            <input
                                type="text"
                                {...formik.getFieldProps('assignee')}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 border-gray-300"
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
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
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <ReactQuill
                            theme="snow"
                            value={formik.values.description}
                            onChange={(value) => formik.setFieldValue('description', value)}
                            className="bg-white rounded-lg overflow-hidden"
                            placeholder="Task description..."
                        />
                    </div>

                    <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={formik.submitForm}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                        >
                            Add Task
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddTaskModal;
