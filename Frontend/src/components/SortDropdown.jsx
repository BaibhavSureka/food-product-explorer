import React from 'react';

function SortDropdown({ onSort }) {
  return (
    <select
      onChange={(e) => onSort(e.target.value)}
      className="w-full p-2 border rounded bg-gray-700 text-white border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="">Sort by</option>
      <option value="product_name">Name (A-Z)</option>
      <option value="-product_name">Name (Z-A)</option>
      <option value="nutrition_grades">Nutrition Grade (Best to Worst)</option>
      <option value="-nutrition_grades">Nutrition Grade (Worst to Best)</option>
    </select>
  );
}

export default SortDropdown;