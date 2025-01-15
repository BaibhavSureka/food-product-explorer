import React from 'react';

function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="flex justify-center items-center mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-blue-500 text-white rounded-r disabled:bg-gray-300 hover:bg-blue-600 transition-colors"
      >
        Previous
      </button>
      <span className="px-4 py-2 bg-black border-t border-b">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-blue-500 text-white rounded-r disabled:bg-gray-300 hover:bg-blue-600 transition-colors"
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;

