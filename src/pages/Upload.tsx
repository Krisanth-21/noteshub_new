import React, { useState } from 'react';
import { Upload as UploadIcon, Check, AlertCircle } from 'lucide-react';
import { mockData } from '../mockData';

const Upload = ({ onAddNote }) => {
  const [formData, setFormData] = useState({
    courseName: '',
    subject: '',
    teacherId: '',
    department: '',
    year: '',
    file: null
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({
      ...prev,
      file
    }));
    if (errors.file) {
      setErrors(prev => ({
        ...prev,
        file: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.courseName.trim()) newErrors.courseName = 'Course name is required';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.teacherId) newErrors.teacherId = 'Teacher selection is required';
    if (!formData.department) newErrors.department = 'Department selection is required';
    if (!formData.year) newErrors.year = 'Year selection is required';
    if (!formData.file) newErrors.file = 'File upload is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Add the note to the mock data
    onAddNote({
      courseName: formData.courseName,
      subject: formData.subject,
      teacherId: formData.teacherId,
      department: formData.department,
      year: formData.year
    });

    // Reset form
    setFormData({
      courseName: '',
      subject: '',
      teacherId: '',
      department: '',
      year: '',
      file: null
    });

    // Show success message
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const filteredTeachers = formData.department 
    ? mockData.teachers.filter(teacher => teacher.department === formData.department)
    : mockData.teachers;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Upload Notes</h1>
        <p className="text-gray-600">Share your academic materials with students across all departments</p>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
          <div className="flex items-center">
            <Check className="h-5 w-5 text-green-400 mr-3" />
            <p className="text-green-700 font-medium">Notes uploaded successfully!</p>
          </div>
        </div>
      )}

      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="px-6 py-4 bg-blue-50 border-b border-blue-100">
          <h2 className="text-xl font-semibold text-blue-900 flex items-center">
            <UploadIcon className="h-5 w-5 mr-2" />
            Upload New Notes
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Course Name */}
            <div>
              <label htmlFor="courseName" className="block text-sm font-medium text-gray-700 mb-2">
                Course Name *
              </label>
              <input
                type="text"
                id="courseName"
                name="courseName"
                value={formData.courseName}
                onChange={handleInputChange}
                placeholder="e.g., Data Structures and Algorithms"
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.courseName ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.courseName && (
                <div className="flex items-center mt-1 text-sm text-red-600">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.courseName}
                </div>
              )}
            </div>

            {/* Subject/Topic */}
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                Subject/Topic *
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="e.g., Binary Trees and Heaps"
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.subject ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.subject && (
                <div className="flex items-center mt-1 text-sm text-red-600">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.subject}
                </div>
              )}
            </div>

            {/* Department */}
            <div>
              <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-2">
                Department *
              </label>
              <select
                id="department"
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.department ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select Department</option>
                {mockData.departments.map(dept => (
                  <option key={dept.id} value={dept.id}>{dept.name} ({dept.code})</option>
                ))}
              </select>
              {errors.department && (
                <div className="flex items-center mt-1 text-sm text-red-600">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.department}
                </div>
              )}
            </div>

            {/* Year */}
            <div>
              <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-2">
                Academic Year *
              </label>
              <select
                id="year"
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.year ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select Year</option>
                {mockData.years.map(year => (
                  <option key={year.id} value={year.id}>{year.name}</option>
                ))}
              </select>
              {errors.year && (
                <div className="flex items-center mt-1 text-sm text-red-600">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.year}
                </div>
              )}
            </div>

            {/* Teacher */}
            <div className="md:col-span-2">
              <label htmlFor="teacherId" className="block text-sm font-medium text-gray-700 mb-2">
                Teacher *
              </label>
              <select
                id="teacherId"
                name="teacherId"
                value={formData.teacherId}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.teacherId ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select Teacher</option>
                {filteredTeachers.map(teacher => (
                  <option key={teacher.id} value={teacher.id}>{teacher.name}</option>
                ))}
              </select>
              {errors.teacherId && (
                <div className="flex items-center mt-1 text-sm text-red-600">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.teacherId}
                </div>
              )}
            </div>
          </div>

          {/* File Upload */}
          <div>
            <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-2">
              Upload File *
            </label>
            <div className={`border-2 border-dashed rounded-lg p-6 text-center ${
              errors.file ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-blue-400 bg-gray-50'
            }`}>
              <UploadIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <div className="mb-4">
                <label htmlFor="file" className="cursor-pointer">
                  <span className="text-blue-600 font-medium hover:text-blue-700">
                    Click to upload
                  </span>
                  <span className="text-gray-500"> or drag and drop</span>
                </label>
                <input
                  type="file"
                  id="file"
                  name="file"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.ppt,.pptx"
                  className="hidden"
                />
              </div>
              <p className="text-xs text-gray-500">PDF, DOC, DOCX, PPT, PPTX up to 10MB</p>
              {formData.file && (
                <div className="mt-2 text-sm text-gray-700">
                  Selected: {formData.file.name}
                </div>
              )}
            </div>
            {errors.file && (
              <div className="flex items-center mt-1 text-sm text-red-600">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.file}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => {
                setFormData({
                  courseName: '',
                  subject: '',
                  teacherId: '',
                  department: '',
                  year: '',
                  file: null
                });
                setErrors({});
              }}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Reset
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <UploadIcon className="h-4 w-4" />
              <span>Upload Notes</span>
            </button>
          </div>
        </form>
      </div>

      {/* Upload Guidelines */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">Upload Guidelines</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
          <div>
            <h4 className="font-medium mb-2">File Requirements:</h4>
            <ul className="space-y-1 list-disc list-inside">
              <li>Supported formats: PDF, DOC, DOCX, PPT, PPTX</li>
              <li>Maximum file size: 10MB</li>
              <li>Clear, readable content</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Content Guidelines:</h4>
            <ul className="space-y-1 list-disc list-inside">
              <li>Original academic content only</li>
              <li>Proper attribution for references</li>
              <li>Clear topic organization</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;