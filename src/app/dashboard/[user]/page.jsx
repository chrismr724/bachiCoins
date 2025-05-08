'use client';

import { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import { Modal, Box, TextField, Button, Typography } from '@mui/material';
import ClassCard from './components/classCard';

const page = () => {
  const [groups, setGroups] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [newGroup, setNewGroup] = useState({
    name: '',
    description: '',
    ProfesorId: '',
  });

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      setNewGroup(prev => ({ ...prev, ProfesorId: parseInt(user.id) }));
    }
  }, []);

  const handleDeleteGroup = async (groupId) => {
    try {
      const res = await fetch(`/api/groups/${groupId}`, {
        method: 'DELETE',
      });
      setGroups(prevGroups => prevGroups.filter(group => group.id !== groupId));
    } catch (error) {
      console.error('Error deleting group:', error);
    }
  };

  useEffect(() => {
    // Fetch groups from the API
    const fetchGroups = async () => {
      try {
        const response = await fetch('/api/groups');
        const data = await response.json();
        if (data) {
          setGroups(Array.isArray(data) ? data : [data]);
        }
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
    };
    fetchGroups();
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/groups', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newGroup)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setGroups(prevGroups => [...prevGroups, data]);
      
      // Preserve the ProfesorId when resetting the form
      const profesorId = newGroup.ProfesorId;
      setNewGroup({ name: '', description: '', ProfesorId: profesorId });
      setOpenModal(false);
    } catch (error) {
      console.error('Error creating group:', error);
      alert('Failed to create group. Please try again.');
    }
  }

  return (
    <div className="p-8 w-full bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-medium text-gray-900">Mis grupos</h1>
          <button
            onClick={() => setOpenModal(true)}
            className="flex items-center cursor-pointer space-x-2 px-6 py-2.5 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-all duration-200 text-sm font-medium shadow-sm hover:shadow"
          >
            <FaPlus className="text-sm" />
            <span>Crear grupo</span>
          </button>

        <Modal
          open={openModal}
          onClose={() => setOpenModal(false)}
          aria-labelledby="create-group-modal"
        >
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 380,
            bgcolor: '#fafbfc',
            boxShadow: '0 2px 16px 0 rgba(60,60,60,0.07)',
            p: 3.5,
            borderRadius: 3,
            border: 'none',
            minHeight: 320
          }}>
            <Typography variant="h6" component="h2" sx={{ mb: 2, fontWeight: 400, letterSpacing: 0.5, color: '#222', fontSize: '1.35rem' }}>
              Crea grupo nuevo
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Nombre del grupo"
                variant="outlined"
                value={newGroup.name}
                onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Descripción"
                variant="outlined"
                multiline
                rows={4}
                value={newGroup.description}
                onChange={(e) => setNewGroup({ ...newGroup, description: e.target.value })}
                sx={{ mb: 3 }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1.5 }}>
                <Button 
                  onClick={() => setOpenModal(false)}
                  sx={{ color: '#6366f1', fontWeight: 400, borderRadius: 2, px: 2.5, py: 1, textTransform: 'none', boxShadow: 'none', background: 'none', '&:hover': { background: '#f3f4f6' } }}>
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ bgcolor: '#6366f1', color: '#fff', fontWeight: 400, borderRadius: 2, px: 2.5, py: 1, textTransform: 'none', boxShadow: 'none', '&:hover': { bgcolor: '#4f46e5' } }}
                >
                  Crear grupo
                </Button>
              </Box>
            </form>
          </Box>
        </Modal>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
        {groups.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500 text-lg">No tienes grupos</p>
            <p className="text-gray-400 text-sm mt-2">Crea tu primer grupo para empezar</p>
          </div>
        ) : (
          groups.map((group, index) => (
            <ClassCard 
              key={group.id || index} 
              name={group.name} 
              students={group.estudiantes}
              groupId={group.id}
              onDelete={() => handleDeleteGroup(group.id)}
            />
          ))
        )}
        <button
          onClick={() => setOpenModal(true)}
          className="h-[180px] cursor-pointer border border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center space-y-3 hover:border-indigo-500 hover:bg-indigo-50 transition-all duration-200 group"
        >
          <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center group-hover:bg-indigo-200 transition-colors duration-200">
            <FaPlus className="text-indigo-600 text-sm" />
          </div>
          <span className="text-gray-600 text-sm font-medium">Crear nuevo grupo</span>
        </button>
      </div>
    </div>
  );
};

export default page;