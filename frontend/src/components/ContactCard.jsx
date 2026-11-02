import { useState } from 'react';
import { contactService } from '../services/api';

function ContactCard({ contact, onUpdate, onDelete, onEdit }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleToggleFavorite = async () => {
    try {
      const response = await contactService.toggleFavorite(contact._id);
      onUpdate(response.data.data);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('¿Estás seguro de eliminar este contacto?')) return;
    setIsDeleting(true);
    try {
      await contactService.delete(contact._id);
      onDelete(contact._id);
    } catch (error) {
      console.error('Error deleting contact:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const categoryColors = {
    trabajo: 'bg-blue-100 text-blue-800',
    personal: 'bg-green-100 text-green-800',
    familia: 'bg-purple-100 text-purple-800',
    amigo: 'bg-yellow-100 text-yellow-800',
    otro: 'bg-gray-100 text-gray-800',
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow" data-cy="contact-card">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="font-semibold text-lg text-gray-900">{contact.name}</h3>
          <span className={`inline-block px-2 py-1 text-xs rounded-full ${categoryColors[contact.category] || 'bg-gray-100'}`}>
            {contact.category}
          </span>
        </div>
        <button
          onClick={handleToggleFavorite}
          data-cy="toggle-favorite"
          className={`text-2xl ${contact.favorite ? 'text-yellow-500' : 'text-gray-300'}`}
        >
          {contact.favorite ? '★' : '☆'}
        </button>
      </div>
      
      <div className="mt-3 space-y-1 text-sm text-gray-600">
        {contact.phone && <p>📞 {contact.phone}</p>}
        {contact.email && <p>✉️ {contact.email}</p>}
        {contact.company && <p>🏢 {contact.company}</p>}
      </div>

      <div className="mt-4 flex gap-2">
        <button
          onClick={onEdit}
          data-cy="edit-contact"
          className="flex-1 px-3 py-2 text-sm font-medium text-primary-600 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors"
        >
          Editar
        </button>
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          data-cy="delete-contact"
          className="flex-1 px-3 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors disabled:opacity-50"
        >
          {isDeleting ? 'Eliminando...' : 'Eliminar'}
        </button>
      </div>
    </div>
  );
}

export default ContactCard;