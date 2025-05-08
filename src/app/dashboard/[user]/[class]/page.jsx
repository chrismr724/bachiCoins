'use client';

import { useState, useEffect } from 'react';
import { use } from 'react';
import { FaUsers, FaCoins, FaChartBar } from 'react-icons/fa';
import { IoIosArrowBack } from "react-icons/io";
import { Typography, Card, CardContent, List } from '@mui/material';
import Subasta from './components/subasta';
import StudentList from './components/students';
import Link from 'next/link';

const ClassPage = ({ params }) => {
  const resolvedParams = use(params);
  const [classData, setClassData] = useState(null);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const decodedUrl = decodeURIComponent(resolvedParams.class);
  const userUrl = decodeURIComponent(resolvedParams.user);
  const fetchClassData = async () => {
    try {
      const response = await fetch(`/api/groups/${decodedUrl}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      setClassData(data);
      setStudents(data.estudiantes);
    } catch (error) {
      console.error('Error fetching class data:', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchClassData();
  }, [decodedUrl])


  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-400"></div>
      </div>
    );
  }

  if (!classData) {
    return (
      <div className="p-8">
        <Typography variant="h5" color="error">
          Class not found
        </Typography>
      </div>
    );
  }
  return (
    <div>
      <div className='mb-7 ml-3 flex items-center justify-center w-10'>
        <Link 
          href={`/dashboard/${userUrl}`}
          className='flex items-center justify-center w-16 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200'>
          <IoIosArrowBack />
        </Link>
      </div>
    <div className="p-8 max-w-5xl mx-auto bg-white min-h-screen rounded-3xl shadow-sm border border-gray-100">
      <div className="mb-10">
        <div className="flex justify-between items-center mb-2">
          <Typography variant="h4" component="h1" sx={{ fontWeight: 400, letterSpacing: 0.5, color: '#222' }}>
            {classData.name}
          </Typography>
        </div>
        <Typography variant="subtitle1" sx={{ mb: 1.5, color: '#888', fontWeight: 300, fontSize: '1.1rem' }}>
          {classData.description}
        </Typography>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
        <Card sx={{ boxShadow: '0 1px 6px 0 rgba(60,60,60,0.07)', borderRadius: 3, background: '#f8fafc', border: 'none' }}>
          <CardContent className="flex items-center gap-3">
            <FaUsers className="text-3xl text-gray-400" />
            <div>
              <Typography variant="body2" sx={{ color: '#666', fontWeight: 400 }}>Estudiantes totales</Typography>
              <Typography variant="h5" sx={{ fontWeight: 300, color: '#222' }}>{students.length}</Typography>
            </div>
          </CardContent>
        </Card>
        <Card sx={{ boxShadow: '0 1px 6px 0 rgba(60,60,60,0.07)', borderRadius: 3, background: '#f8fafc', border: 'none' }}>
          <CardContent className="flex items-center gap-3">
            <FaCoins className="text-3xl text-gray-400" />
            <div>
              <Typography variant="body2" sx={{ color: '#666', fontWeight: 400 }}>BachiCoins en promedio</Typography>
              <Typography variant="h5" sx={{ fontWeight: 300, color: '#222' }}>
                {students.length > 0
                  ? Math.round(students.reduce((acc, student) => acc + (student.Monedas || 0), 0) / students.length)
                  : 0}
              </Typography>
            </div>
          </CardContent>
        </Card>
        <Card sx={{ boxShadow: '0 1px 6px 0 rgba(60,60,60,0.07)', borderRadius: 3, background: '#f8fafc', border: 'none' }}>
          <CardContent className="flex items-center gap-3">
            <FaChartBar className="text-3xl text-gray-400" />
            <div>
              <Typography variant="body2" sx={{ color: '#666', fontWeight: 400 }}>Subastas activas</Typography>
              <Typography variant="h5" sx={{ fontWeight: 300, color: '#222' }}>{classData.activeTasks || 0}</Typography>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Students List & Subasta */}
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1/6 bg-gray-50 rounded-2xl p-6 shadow-sm border border-gray-100">
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 400, color: '#222' }}>
            Students
          </Typography>
          <List sx={{overflowY: "scroll", height:"300px" }}>
            <StudentList estudiantes={students} groupId={parseInt(decodedUrl)} />
          </List>
        </div>
        <div className="flex-1/2 bg-gray-50 rounded-2xl p-6 shadow-sm border border-gray-100">
          <Subasta />
        </div>
      </div>
    </div>
    </div>
  );
};

export default ClassPage;