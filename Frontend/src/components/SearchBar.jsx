import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products..."
        className="flex-1 p-2 border rounded-l bg-gray-700 text-white border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
      />
      <button 
        type="submit" 
        className="px-4 py-2 bg-blue-500 text-white rounded-r hover:bg-blue-600 transition-colors"
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;

