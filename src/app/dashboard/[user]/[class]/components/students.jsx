'use client'

import { useEffect, useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';

const staticStudents = [
  {
    name: 'Maria Garcia',
    email: 'maria.garcia@student.edu',
    points: 3
  },
  {
    name: 'Carlos Rodriguez',
    email: 'carlos.r@student.edu',
    points: 11
  },
  {
    name: 'Ana Martinez',
    email: 'ana.m@student.edu',
    points: 10
  },
  {
    name: 'Juan Perez',
    email: 'juan.p@student.edu',
    points: 7
  },
  {
    name: 'Sofia Lopez',
    email: 'sofia.l@student.edu',
    points: 9
  }
]

const StudentList = ({ estudiantes = staticStudents, groupId }) => {
  const [open, setOpen] = useState(false);
  const [students, setStudents] = useState(estudiantes);
  const [newStudent, setNewStudent] = useState({
    Matricula: '',
    name: '',
    Monedas: 0,
    GroupId: parseInt(groupId)
  });

  const fetchStudents = async () => {
    try {
      const response = await fetch(`/api/students?GroupId=${groupId}`, { method:"POST" });
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleSubmit = async () => {
    try {
      // Validate required fields
      if (!newStudent.Matricula || !newStudent.name) {
        alert('Please fill in all required fields');
        return;
      }

      // Ensure Monedas is a number and GroupId is set
      const studentData = {
        ...newStudent,
        Monedas: parseInt(newStudent.Monedas) || 0,
        GroupId: parseInt(groupId)
      };

      const response = await fetch('/api/students/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentData),
      });

      if (response.ok) {
        // Reset form
        setNewStudent({
          Matricula: '',
          name: '',
          Monedas: 0,
          GroupId: parseInt(groupId)
        });
        
        handleClose();
        // Refresh the students list
        fetchStudents();
        
        // Reload the page to update the student count in the UI
        window.location.reload();
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error || 'Failed to add student'}`); 
      }
    } catch (error) {
      console.error('Error creating student:', error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [groupId])

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent(prev => ({
      ...prev,
      [name]: value
    }));
  };
  console.log(students)
  return (
    <div className="space-y-4 p-4">
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
        className="mb-4"
        style={{
          backgroundColor: '#F3F4F6',
          color: '#222',
          borderRadius: '1.5rem',
          fontWeight: 400,
          fontSize: '1rem',
          boxShadow: '0 2px 8px 0 rgba(60,60,60,0.04)',
          padding: '0.65rem 1.5rem',
          marginBottom: '1.5rem',
          textTransform: 'none',
          letterSpacing: 0.2,
          border: 'none',
        }}
      >
        Add New Student
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Student</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="Matricula"
            label="Matricula *"
            type="text"
            fullWidth
            variant="outlined"
            value={newStudent.Matricula}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
            required
          />
          <TextField
            margin="dense"
            name="name"
            label="Nombre completo *"
            type="text"
            fullWidth
            variant="outlined"
            value={newStudent.name}
            onChange={handleInputChange}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            name="Monedas"
            label="Monedas iniciales"
            type="number"
            fullWidth
            variant="outlined"
            value={newStudent.Monedas}
            onChange={handleInputChange}
            InputProps={{ inputProps: { min: 0 } }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary" variant="contained">
            Add Student
          </Button>
        </DialogActions>
      </Dialog>
      { !students ? (
        <div className="bg-white dark:bg-gray-50 rounded-xl shadow-sm p-6 flex items-center justify-between border border-gray-100">
          <div>
            <h3 className="text-lg font-light text-gray-400 dark:text-gray-700">
              No hay estudiantes en esta clase
            </h3>
          </div>
        </div>
      ) : (
      students.map((student, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-50 rounded-xl shadow-sm p-6 flex items-center justify-between border border-gray-100"
        >
          <div>
            <h3 className="text-base font-normal text-gray-900 dark:text-gray-800">
              {student.name}
            </h3>
          </div>
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 text-xs bg-green-50 text-green-700 rounded-full border border-green-100">
              {student.Monedas || 0} points
            </span>
          </div>
        </div>
      )))}
      
    </div>
  )
}

export default StudentList