import React from 'react';
import { useCart } from '../contexts/CartContext';

function Cart() {
  const { cart, dispatch } = useCart();

  const removeFromCart = (code) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: code });
  };

  const updateQuantity = (code, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { code, quantity } });
  };

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);

  return (
    <div className="bg-gray-800 rounded-lg shadow-xl p-6 text-white">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.code} className="flex justify-between items-center mb-4 border-b border-gray-700 pb-2">
              <div>
                <h3 className="font-semibold">{item.product_name}</h3>
                <p className="text-sm text-gray-400">Quantity: {item.quantity}</p>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => updateQuantity(item.code, Math.max(1, item.quantity - 1))}
                  className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                >
                  -
                </button>
                <button
                  onClick={() => updateQuantity(item.code, item.quantity + 1)}
                  className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                >
                  +
                </button>
                <button
                  onClick={() => removeFromCart(item.code)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="mt-4">
            <p className="font-semibold">Total Items: {totalItems}</p>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
