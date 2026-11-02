import { useState, useEffect } from 'react';
import { contactService } from '../services/api';
import ContactCard from '../components/ContactCard';
import ContactForm from '../components/ContactForm';
import SearchBar from '../components/SearchBar';
import Loading from '../components/Loading';

function Dashboard() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [filters, setFilters] = useState({ search: '', category: '', favorite: '' });

  useEffect(() => {
    fetchContacts();
  }, [filters]);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const params = {};
      if (filters.search) params.search = filters.search;
      if (filters.category) params.category = filters.category;
      if (filters.favorite) params.favorite = filters.favorite;

      const response = await contactService.getAll(params);
      setContacts(response.data.data);
    } catch (err) {
      setError('Error al cargar contactos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateContact = async (formData) => {
    try {
      await contactService.create(formData);
      setShowForm(false);
      fetchContacts();
    } catch (err) {
      setError(err.response?.data?.message || 'Error al crear contacto');
    }
  };

  const handleUpdateContact = async (formData) => {
    try {
      await contactService.update(editingContact._id, formData);
      setEditingContact(null);
      fetchContacts();
    } catch (err) {
      setError(err.response?.data?.message || 'Error al actualizar contacto');
    }
  };

  const handleDeleteContact = (id) => {
    setContacts((prev) => prev.filter((c) => c._id !== id));
  };

  const handleEditContact = (contact, isEdit = false) => {
    setEditingContact(isEdit ? contact : null);
    setShowForm(false);
  };

  const handleSearch = (value) => {
    setFilters((prev) => ({ ...prev, search: value }));
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingContact(null);
  };

  if (loading && contacts.length === 0) {
    return <Loading />;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Mis Contactos</h1>
        <button
          onClick={() => { setShowForm(true); setEditingContact(null); }}
          data-cy="new-contact"
          className="px-4 py-2 text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors"
        >
          + Nuevo Contacto
        </button>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">
          {error}
        </div>
      )}

      <SearchBar
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
        filters={filters}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {contacts.map((contact) => (
          <ContactCard
            key={contact._id}
            contact={contact}
            onUpdate={(updated) => {
              setContacts((prev) =>
                prev.map((c) => (c._id === updated._id ? updated : c))
              );
            }}
            onDelete={handleDeleteContact}
            onEdit={() => handleEditContact(contact, true)}
          />
        ))}
      </div>

      {contacts.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg">No hay contactos</p>
          <p className="text-sm">Crea tu primer contacto</p>
        </div>
      )}

      {(showForm || editingContact) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="max-w-md w-full">
            <ContactForm
              contact={editingContact}
              onSubmit={editingContact ? handleUpdateContact : handleCreateContact}
              onCancel={handleCancelForm}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
