import React from 'react';

const getCleanImageUrl = (imagen) => {
  if (!imagen) return null;
  
  if (imagen.startsWith('[')) {
    const match = imagen.match(/\((.*?)\)/);
    return match && match[1] ? match[1] : null;
  }
  
  if (imagen.startsWith('/')) {
    const API_URL = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:8000';
    return `${API_URL}${imagen}`;
  }
  
  return imagen;
};

const TallerCard = ({ taller, onEdit, onDelete, onView }) => {
  const imageUrl = getCleanImageUrl(taller.imagen);
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300 hover:border-gray-300">
      {imageUrl && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={imageUrl}
            alt={taller.tema}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      )}
      
      <div className="p-5">
        <div className="mb-3">
          <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            {taller.tipo_taller_nombre}
          </span>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{taller.tema}</h3>
        
        <div className="space-y-2 mb-4">
          <p className="text-sm text-gray-600 flex items-center">
            <span className="font-medium mr-1">Ponente:</span>
            {taller.ponente}
          </p>
          <p className="text-sm text-gray-600 flex items-center">
            <span className="font-medium mr-1">Fecha:</span>
            {new Date(taller.fecha).toLocaleDateString('es-ES')}
          </p>
          <p className="text-sm text-gray-600 flex items-center">
            <span className="font-medium mr-1">Duración:</span>
            {taller.duracion} minutos
          </p>
        </div>

        <div className="flex gap-2">
          <button 
            onClick={() => onView(taller)}
            className="flex-1 bg-gray-100 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
          >
            Ver
          </button>
          <button 
            onClick={() => onEdit(taller)}
            className="flex-1 bg-blue-100 text-blue-700 px-3 py-2 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium"
          >
            Editar
          </button>
          <button 
            onClick={() => onDelete(taller.id)}
            className="flex-1 bg-red-100 text-red-700 px-3 py-2 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default TallerCard;