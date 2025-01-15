import React, { useState } from 'react';

function BarcodeSearch({ onSearch }) {
  const [barcode, setBarcode] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(barcode);
  };

  return (
    <form onSubmit={handleSubmit} className="flex">
      <input
        type="text"
        value={barcode}
        onChange={(e) => setBarcode(e.target.value)}
        placeholder="Enter barcode..."
        className="flex-grow p-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button type="submit" className="bg-green-500 text-white p-2 rounded-r hover:bg-green-600 transition-colors">
        Barcode
      </button>
    </form>
  );
}

export default BarcodeSearch;

