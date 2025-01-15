import React from 'react';

function formatCategory(category) {
  return category
    .replace(/^en:|^fr:/, '')
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function ProductList({ products, onProductClick }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <div 
          key={product.code || product._id} // Using product code or _id as unique key
          className="bg-gray-800 rounded-lg shadow-xl overflow-hidden cursor-pointer transition-all hover:scale-105 hover:shadow-2xl"
          onClick={() => onProductClick(product)}
        >
          <div className="relative h-48 overflow-hidden bg-gray-700">
            <img 
              src={product.image_url || "/placeholder.svg"} 
              alt={product.product_name} 
              className="w-full h-full object-contain p-2"
            />
          </div>
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-2 text-white truncate">
              {product.product_name}
            </h2>
            <p className="text-sm text-gray-400 mb-2">
              {(product.categories_tags || [])
                .slice(0, 1)
                .map(formatCategory)
                .join(', ')}
            </p>
            <div className={`inline-block px-2 py-1 rounded text-sm ${getNutritionGradeColor(product.nutrition_grades)}`}>
              Grade: {product.nutrition_grades?.toUpperCase() || 'N/A'}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function getNutritionGradeColor(grade) {
  switch (grade?.toLowerCase()) {
    case 'a': return 'bg-green-500 text-white';
    case 'b': return 'bg-green-400 text-white';
    case 'c': return 'bg-yellow-500 text-black';
    case 'd': return 'bg-orange-500 text-white';
    case 'e': return 'bg-red-500 text-white';
    default: return 'bg-gray-500 text-white';
  }
}

export default ProductList;
