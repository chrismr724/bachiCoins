import React, { useState } from 'react'
import { FaUsers, FaTrash, FaChevronRight } from 'react-icons/fa'
import { Modal, Box, Button, Typography } from '@mui/material'
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const ClassCard = ({ name, students = [], onDelete, groupId }) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const pathname = usePathname();

  const handleDelete = () => {
    onDelete();
    setOpenDeleteModal(false);
  };
  return (
    <div
      className="block bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-200 group relative"
    >
      <div className="flex justify-between items-start">
        <div className="space-y-3 flex-1">
          <h3 className="text-lg font-medium text-gray-900 pr-8">{name}</h3>
          <div className="flex items-center space-x-2 text-gray-500 text-sm">
            <FaUsers className="text-gray-400" />
            <span>{students.length} Estudiantes</span>
          </div>
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setOpenDeleteModal(true);
          }}
          className="text-gray-400 hover:text-red-500 transition-colors duration-200 absolute top-6 right-6 cursor-pointer"
        >
          <FaTrash size={14} />
        </button>
      </div>
      <div className="mt-6 flex items-center justify-between text-sm">
        <Link href={`${pathname}/${groupId}`} className="text-indigo-600 font-medium group-hover:text-indigo-700 transition-colors duration-200 flex items-center">
          Ver detalles
          <FaChevronRight className="ml-1 text-xs opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-200" />
        </Link>
        <div className="flex items-center space-x-2">
          <div className="h-2 w-2 rounded-full bg-green-500"></div>
          <span className="text-gray-500">Activo</span>
        </div>
      </div>

      <Modal
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        aria-labelledby="delete-group-modal"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2
        }}>
          <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
            Borrar grupo
          </Typography>
          <Typography sx={{ mb: 3 }}>
            Estas seguro que quieres eliminar {name}? Esta accion no se puede deshacer.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button 
              onClick={() => setOpenDeleteModal(false)}
              sx={{color: "blue"}}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleDelete}
              variant="contained"
              sx={{ bgcolor: 'red', '&:hover': { bgcolor: 'red.800' } }}
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  )
}

export default ClassCard