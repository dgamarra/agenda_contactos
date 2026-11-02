function SearchBar({ onSearch, onFilterChange, filters }) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Buscar contactos..."
            value={filters.search}
            onChange={(e) => onSearch(e.target.value)}
            data-cy="search-input"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={filters.category}
            onChange={(e) => onFilterChange('category', e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="">Todas las categorías</option>
            <option value="personal">Personal</option>
            <option value="trabajo">Trabajo</option>
            <option value="familia">Familia</option>
            <option value="amigo">Amigo</option>
            <option value="otro">Otro</option>
          </select>
          <button
            onClick={() => onFilterChange('favorite', filters.favorite === 'true' ? '' : 'true')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filters.favorite === 'true'
                ? 'bg-yellow-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            ⭐ Favoritos
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;