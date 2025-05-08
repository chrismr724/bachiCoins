'use client'

import { useEffect, useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton } from '@mui/material';
import { FaEdit, FaPlus, FaMinus } from 'react-icons/fa';

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
  const [updateOpen, setUpdateOpen] = useState(false);
  const [students, setStudents] = useState(estudiantes);
  const [newStudent, setNewStudent] = useState({
    Matricula: '',
    name: '',
    Monedas: 0,
    GroupId: parseInt(groupId)
  });
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [coinAmount, setCoinAmount] = useState(0);

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

  const updateCoins = async () => {
    try {
      const response = await fetch('/api/students/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Matricula: selectedStudent.Matricula,
          Monedas: coinAmount
        }),
      });
      console.log(selectedStudent)
      console.log('Response status:', response);
      if (response.ok) {
        // Update local state
        setStudents(prev => 
          prev.map(student => 
            student.Matricula === selectedStudent.Matricula 
              ? {...student, Monedas: coinAmount} 
              : student
          )
        );
        handleUpdateClose();
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error || 'Failed to update student coins'}`);
      }
    } catch (error) {
      console.error('Error updating student coins:', error);
    }
  }

  useEffect(() => {
    fetchStudents();
  }, [groupId])

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const handleUpdateOpen = (student) => {
    setSelectedStudent(student);
    setCoinAmount(student.Monedas || 0);
    setUpdateOpen(true);
  };
  
  const handleUpdateClose = () => {
    setUpdateOpen(false);
    setSelectedStudent(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent(prev => ({
      ...prev,
      [name]: value
    }));
  };
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
        Agregar nuevo estudiante
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Agregar nuevo estudiante</DialogTitle>
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
            Cancelar
          </Button>
          <Button onClick={handleSubmit} color="primary" variant="contained">
            Añadir estudiante
          </Button>
        </DialogActions>
      </Dialog>

      {/* Update Coins Modal */}
      <Dialog open={updateOpen} onClose={handleUpdateClose}>
        <DialogTitle>Update Student Coins</DialogTitle>
        <DialogContent>
          {selectedStudent && (
            <div className="py-2">
              <p className="mb-4 font-medium">{selectedStudent.name}</p>
              <div className="flex items-center space-x-2 mb-4">
                <IconButton 
                  onClick={() => setCoinAmount(prev => Math.max(0, prev - 1))}
                  color="primary"
                  size="small"
                >
                  <FaMinus />
                </IconButton>
                <TextField
                  type="number"
                  value={coinAmount}
                  onChange={(e) => setCoinAmount(Math.max(0, parseInt(e.target.value) || 0))}
                  InputProps={{ inputProps: { min: 0 } }}
                  variant="outlined"
                  size="small"
                />
                <IconButton 
                  onClick={() => setCoinAmount(prev => prev + 1)}
                  color="primary"
                  size="small"
                >
                  <FaPlus />
                </IconButton>
              </div>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateClose} color="primary">
            Cancelar
          </Button>
          <Button 
            onClick={updateCoins} 
            color="primary" 
            variant="contained"
          >
            Actualizar bachi coins
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
            <button 
              onClick={() => handleUpdateOpen(student)}
              className="flex items-center space-x-1 px-3 py-1 text-xs bg-green-50 text-green-700 rounded-full border border-green-100 hover:bg-green-100 transition-colors cursor-pointer"
            >
              <span>{student.Monedas || 0} points</span>
              <FaEdit className="ml-1 text-xs" />
            </button>
          </div>
        </div>
      )))}
      
    </div>
  )
}

export default StudentList