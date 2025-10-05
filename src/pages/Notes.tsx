import React, { useState, useMemo } from 'react';
import { Search, Download, Filter, Calendar, User, BookOpen } from 'lucide-react';
import { mockData } from '../mockData';

const Notes = ({ notes }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [sortBy, setSortBy] = useState('latest');

  const filteredAndSortedNotes = useMemo(() => {
    let filtered = notes.filter(note => {
      const matchesSearch = note.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          note.subject.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDepartment = !selectedDepartment || note.department === selectedDepartment;
      const matchesYear = !selectedYear || note.year === selectedYear;
      
      return matchesSearch && matchesDepartment && matchesYear;
    });

    // Sort the filtered notes
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'latest':
          return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime();
        case 'oldest':
          return new Date(a.uploadDate).getTime() - new Date(b.uploadDate).getTime();
        case 'course':
          return a.courseName.localeCompare(b.courseName);
        case 'teacher':
          const teacherA = mockData.teachers.find(t => t.id === a.teacherId)?.name || '';
          const teacherB = mockData.teachers.find(t => t.id === b.teacherId)?.name || '';
          return teacherA.localeCompare(teacherB);
        default:
          return 0;
      }
    });

    return filtered;
  }, [notes, searchTerm, selectedDepartment, selectedYear, sortBy]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedDepartment('');
    setSelectedYear('');
    setSortBy('latest');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse Notes</h1>
        <p className="text-gray-600">Discover and download academic notes from all departments</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Search Bar */}
          <div className="lg:col-span-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search notes..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Department Filter */}
          <div className="lg:col-span-2">
            <select
              className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
            >
              <option value="">All Departments</option>
              {mockData.departments.map(dept => (
                <option key={dept.id} value={dept.id}>{dept.code}</option>
              ))}
            </select>
          </div>

          {/* Year Filter */}
          <div className="lg:col-span-2">
            <select
              className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              <option value="">All Years</option>
              {mockData.years.map(year => (
                <option key={year.id} value={year.id}>{year.name}</option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div className="lg:col-span-2">
            <select
              className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="latest">Latest First</option>
              <option value="oldest">Oldest First</option>
              <option value="course">Course Name</option>
              <option value="teacher">Teacher Name</option>
            </select>
          </div>

          {/* Clear Filters */}
          <div className="lg:col-span-2">
            <button
              onClick={clearFilters}
              className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center space-x-1"
            >
              <Filter className="h-4 w-4" />
              <span>Clear</span>
            </button>
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="text-sm text-gray-600">
          Showing {filteredAndSortedNotes.length} of {notes.length} notes
        </div>
      </div>

      {/* Notes Grid */}
      {filteredAndSortedNotes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedNotes.map(note => {
            const teacher = mockData.teachers.find(t => t.id === note.teacherId);
            const department = mockData.departments.find(d => d.id === note.department);
            const year = mockData.years.find(y => y.id === note.year);
            
            return (
              <div key={note.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex space-x-2">
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      {department?.code}
                    </span>
                    <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      {year?.name}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500">{note.fileSize}</div>
                </div>
                
                {/* Content */}
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {note.courseName}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{note.subject}</p>
                
                {/* Meta Info */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <User className="h-4 w-4 mr-2" />
                    <span>{teacher?.name}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{new Date(note.uploadDate).toLocaleDateString()}</span>
                  </div>
                </div>
                
                {/* Download Button */}
                <a
                  href={note.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Download className="h-4 w-4" />
                  <span>Download</span>
                </a>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12">
          <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No notes found</h3>
          <p className="text-gray-600 mb-6">Try adjusting your search criteria or filters</p>
          <button
            onClick={clearFilters}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Notes;