import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CheckoutPage = () => {
  // Cart items
  const [cartItems] = useState([
    {
      id: 1,
      name: 'Premium Almonds',
      price: 24.99,
      quantity: 2,
    },
    {
      id: 2,
      name: 'Organic Honey',
      price: 15.50,
      quantity: 1,
    },
  ]);

  // User info
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });

  // Payment
  const [cardInfo, setCardInfo] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
  });

  // Errors & loading
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Order total
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 5.99;
  const tax = 6.43;
  const total = subtotal + shipping + tax;

  // Handle input changes
  const handleUserInfoChange = (e) => {
    const { name, value } = e.target;
    setUserInfo(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    setCardInfo(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    // User info validation
    if (!userInfo.name.trim()) newErrors.name = 'Name is required';
    if (!userInfo.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(userInfo.email)) newErrors.email = 'Invalid email';
    if (!userInfo.phone.trim()) newErrors.phone = 'Phone is required';
    if (!userInfo.address.trim()) newErrors.address = 'Address is required';
    
    // Card info validation
    if (!cardInfo.cardNumber.trim()) newErrors.cardNumber = 'Card number is required';
    if (!cardInfo.cardName.trim()) newErrors.cardName = 'Card name is required';
    if (!cardInfo.expiry.trim()) newErrors.expiry = 'Expiry date is required';
    if (!cardInfo.cvv.trim()) newErrors.cvv = 'CVV is required';
    
    return newErrors;
  };

  // Place order
  const handlePlaceOrder = async () => {
    // Validate form
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      alert('Please fill all required fields correctly');
      return;
    }

    setLoading(true);

    const orderData = {
      userInfo,
      cartItems,
      total,
    };

    console.log('📤 Sending order data:', orderData);

    try {
      // Use correct backend URL (PORT 5001 from server.js)
      const response = await fetch('http://localhost:5001/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();
      console.log('📥 Server response:', result);

      if (response.ok) {
        alert(`✅ Order placed successfully!\nOrder ID: ${result.orderId}\nTotal: $${total.toFixed(2)}`);
        
        // Reset form
        setUserInfo({ name: '', email: '', phone: '', address: '', city: '', postalCode: '', country: '' });
        setCardInfo({ cardNumber: '', cardName: '', expiry: '', cvv: '' });
        setErrors({});
        
      } else {
        alert(`❌ Failed: ${result.message || 'Server error'}`);
      }
      
    } catch (error) {
      console.error('❌ Network error:', error);
      alert('⚠️ Connection failed. Please check if backend server is running on port 5001.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <Link to="/" className="inline-flex items-center text-blue-600 mb-4 hover:text-blue-800">
          <span className="mr-2">←</span>
          Back to Shopping
        </Link>
        <h1 className="text-2xl font-bold text-gray-800">Checkout</h1>
        <p className="text-gray-600">Fill in your details to complete purchase</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left - Forms */}
        <div className="lg:w-2/3">
          {/* Shipping Info */}
          <div className="bg-white p-5 rounded-lg shadow-sm border mb-6">
            <h2 className="text-lg font-bold mb-4 text-gray-800">Shipping Information</h2>
            
            <div className="space-y-4">
              {['name', 'email', 'phone', 'address', 'city', 'postalCode', 'country'].map(field => (
                <div key={field}>
                  <label className="block mb-1 text-gray-700 capitalize">
                    {field === 'postalCode' ? 'Postal Code' : field} 
                    {['name', 'email', 'phone', 'address'].includes(field) && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    type={field === 'email' ? 'email' : 'text'}
                    name={field}
                    value={userInfo[field]}
                    onChange={handleUserInfoChange}
                    className={`w-full p-3 border rounded ${errors[field] ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder={`Enter your ${field}`}
                  />
                  {errors[field] && <p className="text-red-500 text-sm mt-1">{errors[field]}</p>}
                </div>
              ))}
            </div>
          </div>

          {/* Payment Info */}
          <div className="bg-white p-5 rounded-lg shadow-sm border">
            <h2 className="text-lg font-bold mb-4 text-gray-800">Payment Details</h2>
            
            <div className="space-y-4">
              {[
                { name: 'cardNumber', label: 'Card Number', placeholder: '1234 5678 9012 3456' },
                { name: 'cardName', label: 'Name on Card', placeholder: 'John Doe' },
                { name: 'expiry', label: 'Expiry Date', placeholder: 'MM/YY' },
                { name: 'cvv', label: 'CVV', placeholder: '123' }
              ].map(field => (
                <div key={field.name}>
                  <label className="block mb-1 text-gray-700">
                    {field.label} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name={field.name}
                    value={cardInfo[field.name]}
                    onChange={handleCardChange}
                    placeholder={field.placeholder}
                    className={`w-full p-3 border rounded ${errors[field.name] ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors[field.name] && <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>}
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-3 bg-green-50 border border-green-200 rounded flex items-center">
              <span className="text-green-600 mr-2">🔒</span>
              <span className="text-sm text-green-700">Secure payment • Your data is protected</span>
            </div>
          </div>
        </div>

        {/* Right - Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white p-5 rounded-lg shadow-sm border sticky top-4">
            <h2 className="text-lg font-bold mb-4 text-gray-800">Order Summary</h2>
            
            {/* Items */}
            <div className="mb-6">
              {cartItems.map(item => (
                <div key={item.id} className="flex justify-between py-3 border-b">
                  <div>
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-600">Qty: {item.quantity} × ${item.price.toFixed(2)}</p>
                  </div>
                  <p className="font-medium text-gray-800">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
            
            {/* Price Breakdown */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">${shipping.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium">${tax.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between border-t pt-3 text-lg font-bold text-gray-800">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            
            {/* Place Order Button */}
            <button
              onClick={handlePlaceOrder}
              disabled={loading}
              className="w-full py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 disabled:opacity-50 transition-colors shadow-sm"
            >
              {loading ? 'Processing...' : `Place Order • $${total.toFixed(2)}`}
            </button>
            
            <p className="text-center text-xs text-gray-500 mt-3">
              By placing order, you agree to our Terms & Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;