import React, { useState, useEffect } from 'react';

const TallerForm = ({ taller, tiposTaller, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    tipo_taller: '',
    tema: '',
    fecha: '',
    duracion: '',
    ponente: '',
    imagen: null
  });
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (taller) {
      setFormData({
        tipo_taller: taller.tipo_taller || '',
        tema: taller.tema || '',
        fecha: taller.fecha || '',
        duracion: taller.duracion || '',
        ponente: taller.ponente || '',
        imagen: null
      });
      if (taller.imagen) {
        const cleanUrl = getCleanImageUrl(taller.imagen);
        setPreview(cleanUrl);
      }
    }
  }, [taller]);

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({ ...prev, imagen: file }));
    setPreview(file ? URL.createObjectURL(file) : null);
  };

  const handleSubmit = (e) => { 
    e.preventDefault(); 
    onSubmit(formData); 
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {taller ? 'Editar Taller' : 'Nuevo Taller'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de Taller *
            </label>
            <select 
              name="tipo_taller" 
              value={formData.tipo_taller} 
              onChange={handleChange} 
              required 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Seleccionar tipo</option>
              {tiposTaller.map(tipo => (
                <option key={tipo.id} value={tipo.id}>{tipo.nombre}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Duración (minutos) *
            </label>
            <input 
              type="number" 
              name="duracion" 
              value={formData.duracion} 
              onChange={handleChange} 
              required 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tema del Taller *
          </label>
          <input 
            type="text" 
            name="tema" 
            value={formData.tema} 
            onChange={handleChange} 
            required 
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Ingresa el tema del taller"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ponente *
          </label>
          <input 
            type="text" 
            name="ponente" 
            value={formData.ponente} 
            onChange={handleChange} 
            required 
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Nombre del ponente"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Fecha *
          </label>
          <input 
            type="date" 
            name="fecha" 
            value={formData.fecha} 
            onChange={handleChange} 
            required 
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Imagen
          </label>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleImageChange} 
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {preview && (
            <div className="mt-3">
              <p className="text-sm text-gray-600 mb-2">Vista previa:</p>
              <img 
                src={preview} 
                alt="Preview" 
                className="w-32 h-32 object-cover rounded-lg border border-gray-300"
              />
            </div>
          )}
        </div>

        <div className="flex gap-4 pt-4">
          <button 
            type="submit" 
            className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            {taller ? 'Actualizar' : 'Crear'} Taller
          </button>
          <button 
            type="button" 
            onClick={onCancel}
            className="flex-1 bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors font-medium"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default TallerForm;