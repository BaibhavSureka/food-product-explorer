import React from 'react';

function CategoryFilter({ categories, onCategoryChange }) {
  return (
    <select 
      onChange={(e) => onCategoryChange(e.target.value)}
      className="w-full p-2 border rounded bg-gray-700 text-white border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="">All Categories</option>
      {categories.map((category, index) => (
        <option key={index} value={category}>
          {category.replace(/^en:|^fr:/, '').split('-').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
          ).join(' ')}
        </option>
      ))}
    </select>
  );
}

export default CategoryFilter;

