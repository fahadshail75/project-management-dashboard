import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { addProject } from '../../store/slices/projectsSlice';
import { selectTheme } from '../../store/slices/uiSlice';

/**
 * Add Project Modal Component
 * Uses Formik for form handling and Yup for validation.
 */
const AddProjectModal = ({ isOpen, onClose }) => {
    const dispatch = useDispatch();
    const theme = useSelector(selectTheme);

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .max(50, 'Must be 50 characters or less')
                .required('Project Name is Required'),
            description: Yup.string()
                .max(200, 'Must be 200 characters or less')
                .required('Description is Required'),
        }),
        onSubmit: (values, { resetForm }) => {
            const newProject = {
                id: Date.now().toString(), // Simple ID generation
                name: values.name,
                description: values.description,
                status: 'active',
            };

            dispatch(addProject(newProject));
            resetForm();
            onClose();
        },
    });

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className={`rounded-xl shadow-lg w-full max-w-md p-6 ${
                theme === 'dark'
                    ? 'bg-gray-700 text-white'
                    : 'bg-white'
            }`}>
                <h2 className="text-xl font-bold mb-4">Add New Project</h2>

                {/* Formik Form */}
                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className={`block text-sm font-medium mb-1 ${
                            theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                        }`}>
                            Project Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            {...formik.getFieldProps('name')}
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                                formik.touched.name && formik.errors.name ? 'border-red-500' : theme === 'dark' ? 'border-gray-600 bg-gray-600 text-white' : 'border-gray-300'
                            }`}
                        />
                        {formik.touched.name && formik.errors.name ? (
                            <div className="text-red-500 text-sm mt-1">{formik.errors.name}</div>
                        ) : null}
                    </div>

                    <div className="mb-6">
                        <label htmlFor="description" className={`block text-sm font-medium mb-1 ${
                            theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                        }`}>
                            Description
                        </label>
                        <textarea
                            id="description"
                            rows="3"
                            {...formik.getFieldProps('description')}
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                                formik.touched.description && formik.errors.description ? 'border-red-500' : theme === 'dark' ? 'border-gray-600 bg-gray-600 text-white' : 'border-gray-300'
                            }`}
                        />
                        {formik.touched.description && formik.errors.description ? (
                            <div className="text-red-500 text-sm mt-1">{formik.errors.description}</div>
                        ) : null}
                    </div>

                    <div className="flex justify-end space-x-3">
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
                            Create Project
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProjectModal;
