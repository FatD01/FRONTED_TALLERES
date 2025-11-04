import React from 'react';

const TallerModal = ({ taller, onClose }) => {
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

  const imageUrl = getCleanImageUrl(taller.imagen);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div 
        className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Detalles del Taller</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
          {imageUrl && (
            <div className="w-full h-64 overflow-hidden">
              <img
                src={imageUrl}
                alt={taller.tema}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          <div className="p-6 space-y-6">
            <div>
              <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full mb-3">
                {taller.tipo_taller_nombre}
              </span>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{taller.tema}</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-1">Ponente</h4>
                  <p className="text-gray-900">{taller.ponente}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-1">Fecha</h4>
                  <p className="text-gray-900">
                    {new Date(taller.fecha).toLocaleDateString('es-ES', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-1">Duración</h4>
                  <p className="text-gray-900">{taller.duracion} minutos</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-1">ID del Taller</h4>
                  <p className="text-gray-900 font-mono">{taller.id}</p>
                </div>
              </div>
            </div>

            {taller.descripcion && (
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Descripción</h4>
                <p className="text-gray-900 leading-relaxed">{taller.descripcion}</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default TallerModal;