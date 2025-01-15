import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductList from './components/ProductList';
import SearchBar from './components/SearchBar';
import CategoryFilter from './components/CategoryFilter';
import ProductDetail from './components/ProductDetail';
import Pagination from './components/Pagination';
import BarcodeSearch from './components/BarcodeSearch';
import SortDropdown from './components/SortDropdown';
import Cart from './components/Cart';
import { CartProvider } from './contexts/CartContext';

const API_BASE_URL = 'http://localhost:5000/api';

function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [currentPage, selectedCategory, searchQuery, sortBy]);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/products`, {
        params: {
          page: currentPage,
          category: selectedCategory,
          query: searchQuery,
          sort: sortBy,
        },
      });
      setProducts(response.data.products);
      setTotalPages(Math.ceil(response.data.count / 20));
    } catch (error) {
      console.error('Error fetching products:', error);
    }
    setIsLoading(false);
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/categories`);
      setCategories(response.data.tags.map(tag => tag.name));
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleSort = (sortOption) => {
    setSortBy(sortOption);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleBarcodeSearch = async (barcode) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/product/${barcode}`);
      setSelectedProduct(response.data.product);
    } catch (error) {
      console.error('Error fetching product by barcode:', error);
    }
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-900">
        <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-4 animate-fade-in">
              Food Product Explorer
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Discover and learn about various food products from around the world
            </p>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <div className="bg-gray-800 rounded-lg shadow-xl p-6 mb-8">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
              <div className="col-span-1">
                <SearchBar onSearch={handleSearch} />
              </div>
              <div className="col-span-1">
                <BarcodeSearch onSearch={handleBarcodeSearch} />
              </div>
              <div className="col-span-1">
                <CategoryFilter categories={categories} onCategoryChange={handleCategoryChange} />
              </div>
              <div className="col-span-1">
                <SortDropdown onSort={handleSort} />
              </div>
              <div className="col-span-1">
                <button
                  onClick={() => setShowCart(!showCart)}
                  className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                >
                  {showCart ? 'Hide Cart' : 'Show Cart'}
                </button>
              </div>
            </div>
          </div>

          {showCart && (
            <div className="mb-8">
              <Cart />
            </div>
          )}

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : selectedProduct ? (
            <ProductDetail product={selectedProduct} onBack={() => setSelectedProduct(null)} />
          ) : (
            <>
              <ProductList products={products} onProductClick={handleProductClick} />
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </main>
      </div>
    </CartProvider>
  );
}

export default App;

