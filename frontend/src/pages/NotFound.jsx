import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-6">Página no encontrada</p>
        <Link
          to="/dashboard"
          className="inline-block px-6 py-3 text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors"
        >
          Volver al Dashboard
        </Link>
      </div>
    </div>
  );
}

export default NotFound;