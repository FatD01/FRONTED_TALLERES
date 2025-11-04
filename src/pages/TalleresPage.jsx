import React, { useState, useEffect } from 'react';
import { getTalleres, createTaller, updateTaller, deleteTaller } from '../api/tallerService';
import { getTiposTaller } from '../api/tipoTallerService';
import TallerCard from '../components/TallerCard.jsx';
import TallerForm from '../components/TallerForm.jsx';
import TallerModal from '../components/TallerModal.jsx';

const TalleresPage = () => {
  const [talleres, setTalleres] = useState([]);
  const [tiposTaller, setTiposTaller] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedTaller, setSelectedTaller] = useState(null);
  const [editingTaller, setEditingTaller] = useState(null);

  useEffect(() => { 
    loadData(); 
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [talleresData, tiposData] = await Promise.all([
        getTalleres(), 
        getTiposTaller()
      ]);
      setTalleres(talleresData);
      setTiposTaller(tiposData);
    } catch (error) {
      console.error('Error al cargar los datos:', error);
      alert('Error al cargar los datos');
    } finally { 
      setLoading(false); 
    }
  };

  const handleCreate = () => { 
    setEditingTaller(null); 
    setShowForm(true); 
  };

  const handleEdit = (taller) => { 
    setEditingTaller(taller); 
    setShowForm(true); 
  };

  const handleView = (taller) => {
    setSelectedTaller(taller);
    setShowModal(true);
  };

  const handleSubmit = async (formData) => {
    try {
      if (editingTaller) { 
        await updateTaller(editingTaller.id, formData); 
      } else { 
        await createTaller(formData); 
      }
      setShowForm(false); 
      setEditingTaller(null); 
      await loadData();
    } catch (error) {
      console.error('Error al guardar:', error);
      alert('Error al guardar el taller');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este taller?')) {
      try { 
        await deleteTaller(id); 
        await loadData(); 
      } catch (error) {
        console.error('Error al eliminar:', error);
        alert('Error al eliminar el taller'); 
      }
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedTaller(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gestión de Talleres</h1>
            <p className="text-gray-600 mt-2">Administra los talleres disponibles</p>
          </div>
          <button 
            onClick={handleCreate}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-md"
          >
            Nuevo Taller
          </button>
        </div>

        {/* Formulario */}
        {showForm && (
          <div className="mb-8">
            <TallerForm
              taller={editingTaller}
              tiposTaller={tiposTaller}
              onSubmit={handleSubmit}
              onCancel={() => { 
                setShowForm(false); 
                setEditingTaller(null); 
              }}
            />
          </div>
        )}

        {/* Grid de Talleres */}
        {talleres.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No hay talleres registrados</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {talleres.map(taller => (
              <TallerCard
                key={taller.id}
                taller={taller}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onView={handleView}
              />
            ))}
          </div>
        )}

        {/* Modal para ver taller */}
        {showModal && selectedTaller && (
          <TallerModal
            taller={selectedTaller}
            onClose={closeModal}
          />
        )}
      </div>
    </div>
  );
};

export default TalleresPage;