import React from 'react';
import { useCart } from '../contexts/CartContext';

function formatCategory(category) {
  return category
    .replace(/^en:|^fr:/, '')
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function ProductDetail({ product, onBack }) {
  const { dispatch } = useCart();

  const addToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-xl text-white">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-t-lg">
        <button 
          onClick={onBack} 
          className="mb-4 bg-white text-gray-800 px-4 py-2 rounded hover:bg-gray-100 transition-colors"
        >
          ← Back to List
        </button>
        <h2 className="text-3xl font-bold mb-4">{product.product_name}</h2>
        <div className={`inline-block px-3 py-1 rounded text-lg mb-4 ${getNutritionGradeColor(product.nutrition_grades)}`}>
          Nutrition Grade: {product.nutrition_grades?.toUpperCase() || 'N/A'}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
        <div className="space-y-6">
          <div className="bg-gray-700 p-4 rounded-lg">
            <div className="max-h-[400px] overflow-hidden rounded-lg">
              <img 
                src={product.image_url || "/placeholder.svg"} 
                alt={product.product_name} 
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          
          <div className="bg-gray-700 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Barcode</h3>
            <div className="bg-white p-4 rounded-lg">
              <p className="text-gray-800 font-mono text-lg">{product.code || 'N/A'}</p>
            </div>
          </div>

          <button
            onClick={addToCart}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Add to Cart
          </button>
        </div>
        
        <div className="space-y-6">
          <div className="bg-gray-700 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Ingredients</h3>
            <p className="text-gray-300">{product.ingredients_text || 'Not available'}</p>
          </div>

          <div className="bg-gray-700 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Nutritional Values (per 100g)</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Energy', value: `${product.nutriments?.energy_100g || 0} kcal` },
                { label: 'Fat', value: `${product.nutriments?.fat_100g || 0}g` },
                { label: 'Carbohydrates', value: `${product.nutriments?.carbohydrates_100g || 0}g` },
                { label: 'Proteins', value: `${product.nutriments?.proteins_100g || 0}g` },
              ].map((item, index) => (
                <div key={index} className="bg-gray-600 p-4 rounded-lg">
                  <div className="text-gray-300 text-sm">{item.label}</div>
                  <div className="text-2xl font-bold mt-1">{item.value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-700 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Categories</h3>
            <div className="flex flex-wrap gap-2">
              {(product.categories_tags || []).map((category, index) => (
                <span key={index} className="bg-blue-500 bg-opacity-20 text-blue-300 px-2 py-1 rounded text-sm">
                  {formatCategory(category)}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-gray-700 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Labels</h3>
            <div className="flex flex-wrap gap-2">
              {(product.labels_tags || []).map((label, index) => (
                <span key={index} className="bg-green-500 bg-opacity-20 text-green-300 px-2 py-1 rounded text-sm">
                  {formatCategory(label)}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
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

export default ProductDetail;
