export const mockData = {
  departments: [
    { id: 'cse', name: 'Computer Science Engineering', code: 'CSE' },
    { id: 'ece', name: 'Electronics & Communication Engineering', code: 'ECE' },
    { id: 'it', name: 'Information Technology', code: 'IT' },
    { id: 'me', name: 'Mechanical Engineering', code: 'ME' },
    { id: 'ee', name: 'Electrical Engineering', code: 'EE' }
  ],

  years: [
    { id: '1', name: '1st Year' },
    { id: '2', name: '2nd Year' },
    { id: '3', name: '3rd Year' },
    { id: '4', name: '4th Year' }
  ],

  teachers: [
    { id: '1', name: 'Dr. Sarah Johnson', department: 'cse' },
    { id: '2', name: 'Prof. Rajesh Kumar', department: 'cse' },
    { id: '3', name: 'Dr. Emily Chen', department: 'ece' },
    { id: '4', name: 'Prof. Michael Smith', department: 'it' },
    { id: '5', name: 'Dr. Priya Sharma', department: 'me' },
    { id: '6', name: 'Prof. David Wilson', department: 'ee' }
  ],

  notes: [
    {
      id: '1',
      courseName: 'Data Structures and Algorithms',
      subject: 'Binary Trees and Heaps',
      teacherId: '1',
      department: 'cse',
      year: '2',
      uploadDate: '2024-01-15',
      downloadUrl: 'https://example.com/ds-binary-trees.pdf',
      fileSize: '2.4 MB'
    },
    {
      id: '2',
      courseName: 'Database Management Systems',
      subject: 'SQL Queries and Joins',
      teacherId: '2',
      department: 'cse',
      year: '3',
      uploadDate: '2024-01-12',
      downloadUrl: 'https://example.com/dbms-sql-joins.pdf',
      fileSize: '1.8 MB'
    },
    {
      id: '3',
      courseName: 'Digital Signal Processing',
      subject: 'Fourier Transform Applications',
      teacherId: '3',
      department: 'ece',
      year: '3',
      uploadDate: '2024-01-10',
      downloadUrl: 'https://example.com/dsp-fourier.pdf',
      fileSize: '3.2 MB'
    },
    {
      id: '4',
      courseName: 'Web Development',
      subject: 'React Components and Hooks',
      teacherId: '4',
      department: 'it',
      year: '2',
      uploadDate: '2024-01-08',
      downloadUrl: 'https://example.com/web-react-hooks.pdf',
      fileSize: '1.9 MB'
    },
    {
      id: '5',
      courseName: 'Computer Networks',
      subject: 'TCP/IP Protocol Suite',
      teacherId: '2',
      department: 'cse',
      year: '3',
      uploadDate: '2024-01-05',
      downloadUrl: 'https://example.com/networks-tcpip.pdf',
      fileSize: '2.7 MB'
    },
    {
      id: '6',
      courseName: 'Machine Learning',
      subject: 'Neural Networks Fundamentals',
      teacherId: '1',
      department: 'cse',
      year: '4',
      uploadDate: '2024-01-03',
      downloadUrl: 'https://example.com/ml-neural-networks.pdf',
      fileSize: '4.1 MB'
    },
    {
      id: '7',
      courseName: 'Thermodynamics',
      subject: 'Heat Transfer Mechanisms',
      teacherId: '5',
      department: 'me',
      year: '2',
      uploadDate: '2024-01-01',
      downloadUrl: 'https://example.com/thermo-heat-transfer.pdf',
      fileSize: '2.3 MB'
    },
    {
      id: '8',
      courseName: 'Power Systems',
      subject: 'Load Flow Analysis',
      teacherId: '6',
      department: 'ee',
      year: '4',
      uploadDate: '2023-12-28',
      downloadUrl: 'https://example.com/power-load-flow.pdf',
      fileSize: '3.5 MB'
    }
  ]
};