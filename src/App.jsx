import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TalleresPage from './pages/TalleresPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-blue-600 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold">Gestión de Talleres</Link>
            <div className="space-x-4">
              <Link to="/" className="hover:underline">Talleres</Link>
            </div>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<TalleresPage />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
  