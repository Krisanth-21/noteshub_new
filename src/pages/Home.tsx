import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, BookOpen, Users, Upload, TrendingUp } from 'lucide-react';
import { mockData } from '../mockData';

const Home = ({ notes }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredNotes = notes.filter(note =>
    note.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const recentNotes = notes.slice(0, 3);
  const totalNotes = notes.length;
  const totalTeachers = mockData.teachers.length;
  const totalDepartments = mockData.departments.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Welcome to <span className="text-blue-600">Notes Hub</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Your central platform for sharing and accessing academic notes. Teachers can easily upload study materials, 
          and students can search, filter, and download notes from all departments.
        </p>
        
        {/* Quick Search */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search notes by course name or subject..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {searchTerm && (
            <div className="mt-4 text-left bg-white border border-gray-200 rounded-lg shadow-lg max-h-64 overflow-y-auto">
              {filteredNotes.length > 0 ? (
                filteredNotes.slice(0, 5).map(note => {
                  const teacher = mockData.teachers.find(t => t.id === note.teacherId);
                  const department = mockData.departments.find(d => d.id === note.department);
                  return (
                    <div key={note.id} className="p-3 border-b border-gray-100 hover:bg-gray-50">
                      <div className="font-medium text-gray-900">{note.courseName}</div>
                      <div className="text-sm text-gray-600">{note.subject} • {teacher?.name} • {department?.code}</div>
                    </div>
                  );
                })
              ) : (
                <div className="p-4 text-gray-500">No notes found matching your search.</div>
              )}
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/notes"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
          >
            <BookOpen className="h-5 w-5" />
            <span>Browse All Notes</span>
          </Link>
          <Link
            to="/upload"
            className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center space-x-2"
          >
            <Upload className="h-5 w-5" />
            <span>Upload Notes</span>
          </Link>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
            <BookOpen className="h-6 w-6 text-blue-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">{totalNotes}</div>
          <div className="text-gray-600">Total Notes Available</div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <div className="bg-teal-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Users className="h-6 w-6 text-teal-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">{totalTeachers}</div>
          <div className="text-gray-600">Contributing Teachers</div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <div className="bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="h-6 w-6 text-orange-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">{totalDepartments}</div>
          <div className="text-gray-600">Departments Covered</div>
        </div>
      </div>

      {/* Recent Notes Section */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Recently Added Notes</h2>
          <Link to="/notes" className="text-blue-600 hover:text-blue-700 font-medium">
            View All →
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentNotes.map(note => {
            const teacher = mockData.teachers.find(t => t.id === note.teacherId);
            const department = mockData.departments.find(d => d.id === note.department);
            const year = mockData.years.find(y => y.id === note.year);
            
            return (
              <div key={note.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    {department?.code}
                  </div>
                  <div className="text-sm text-gray-500">{note.fileSize}</div>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{note.courseName}</h3>
                <p className="text-gray-600 mb-3">{note.subject}</p>
                
                <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                  <span>{teacher?.name}</span>
                  <span>{year?.name}</span>
                </div>
                
                <a
                  href={note.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Download
                </a>
              </div>
            );
          })}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-100 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Notes Hub?</h2>
            <p className="text-xl text-gray-600">Everything you need for academic success in one place</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Smart Search</h3>
              <p className="text-gray-600">Find notes quickly with our advanced search and filtering system</p>
            </div>
            
            <div className="text-center">
              <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Organized Content</h3>
              <p className="text-gray-600">Notes organized by department, year, and subject for easy browsing</p>
            </div>
            
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Easy Upload</h3>
              <p className="text-gray-600">Teachers can upload notes effortlessly with our simple interface</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Always Updated</h3>
              <p className="text-gray-600">Fresh content added regularly by our dedicated teaching staff</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;