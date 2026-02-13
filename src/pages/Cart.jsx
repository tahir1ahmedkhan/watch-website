import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import apiService from "../services/api";
import LoginModal from "../components/LoginModal";
import RegisterModal from "../components/RegisterModal";

export default function Cart() {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({
    firstName: '',
    lastName: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    phone: ''
  });

  const { isAuthenticated, user } = useAuth();

  const removeItem = index => {
    const updated = cart.filter((_, i) => i !== index);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const updateQuantity = (index, newQuantity) => {
    if (newQuantity < 1) return;
    const updated = [...cart];
    updated[index].quantity = newQuantity;
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const getTotal = () => {
    return cart.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
  };

  const getTax = () => {
    return getTotal() * 0.08; // 8% tax
  };

  const getShipping = () => {
    return getTotal() > 500 ? 0 : 25; // Free shipping over $500
  };

  const getFinalTotal = () => {
    return getTotal() + getTax() + getShipping();
  };

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }

    // Validate shipping address
    const requiredFields = ['firstName', 'lastName', 'street', 'city', 'state', 'zipCode'];
    const missingFields = requiredFields.filter(field => !shippingAddress[field]);
    
    if (missingFields.length > 0) {
      setError(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Prepare order data
      const orderData = {
        items: cart.map(item => ({
          productId: item.id,
          quantity: item.quantity || 1
        })),
        shippingAddress,
        paymentMethod
      };

      const response = await apiService.createOrder(orderData);
      
      if (response.success) {
        setOrderPlaced(true);
        setCart([]);
        localStorage.removeItem("cart");
        
        // Dispatch cart update event
        window.dispatchEvent(new Event('cartUpdated'));
        
        setTimeout(() => {
          setOrderPlaced(false);
          setShowCheckout(false);
        }, 3000);
      } else {
        throw new Error(response.message || 'Failed to place order');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      setError(error.message || 'Failed to place order. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddressChange = (e) => {
    setShippingAddress({
      ...shippingAddress,
      [e.target.name]: e.target.value
    });
  };

  const proceedToCheckout = () => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }
    
    // Pre-fill address with user data if available
    if (user && !shippingAddress.firstName) {
      setShippingAddress(prev => ({
        ...prev,
        firstName: user.firstName || '',
        lastName: user.lastName || ''
      }));
    }
    
    setShowCheckout(true);
  };

  if (orderPlaced) {
    return (
      <div className="container">
        <div className="order-success">
          <h1>🎉 Order Placed Successfully!</h1>
          <p>Thank you for your purchase. Your order will be shipped within 2-3 business days.</p>
          <p>Order confirmation has been sent to your email.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Your Cart ({cart.length} items)</h1>
      
      {cart.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <button onClick={() => window.history.back()}>Continue Shopping</button>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items">
            {cart.map((item, index) => (
              <div className="cart-item" key={index}>
                <img src={item.image} alt={item.name} />
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p className="item-price">${item.price}</p>
                  <div className="quantity-controls">
                    <button 
                      onClick={() => updateQuantity(index, (item.quantity || 1) - 1)}
                      disabled={(item.quantity || 1) <= 1}
                    >
                      -
                    </button>
                    <span className="quantity">{item.quantity || 1}</span>
                    <button onClick={() => updateQuantity(index, (item.quantity || 1) + 1)}>
                      +
                    </button>
                  </div>
                </div>
                <div className="item-total">
                  <p>${(item.price * (item.quantity || 1)).toFixed(2)}</p>
                  <button className="remove-btn" onClick={() => removeItem(index)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Order Summary</h2>
            <div className="summary-line">
              <span>Subtotal:</span>
              <span>${getTotal().toFixed(2)}</span>
            </div>
            <div className="summary-line">
              <span>Tax (8%):</span>
              <span>${getTax().toFixed(2)}</span>
            </div>
            <div className="summary-line">
              <span>Shipping:</span>
              <span>{getShipping() === 0 ? 'FREE' : `$${getShipping().toFixed(2)}`}</span>
            </div>
            <div className="summary-line total">
              <span>Total:</span>
              <span>${getFinalTotal().toFixed(2)}</span>
            </div>

            {!showCheckout ? (
              <button className="checkout-btn" onClick={proceedToCheckout}>
                Proceed to Checkout
              </button>
            ) : (
              <div className="checkout-section">
                {error && <div className="error-message">{error}</div>}
                
                <h3>Shipping Address</h3>
                <div className="address-form">
                  <div className="form-row">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name *"
                      value={shippingAddress.firstName}
                      onChange={handleAddressChange}
                      required
                    />
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name *"
                      value={shippingAddress.lastName}
                      onChange={handleAddressChange}
                      required
                    />
                  </div>
                  <input
                    type="text"
                    name="street"
                    placeholder="Street Address *"
                    value={shippingAddress.street}
                    onChange={handleAddressChange}
                    required
                  />
                  <div className="form-row">
                    <input
                      type="text"
                      name="city"
                      placeholder="City *"
                      value={shippingAddress.city}
                      onChange={handleAddressChange}
                      required
                    />
                    <input
                      type="text"
                      name="state"
                      placeholder="State *"
                      value={shippingAddress.state}
                      onChange={handleAddressChange}
                      required
                    />
                    <input
                      type="text"
                      name="zipCode"
                      placeholder="ZIP Code *"
                      value={shippingAddress.zipCode}
                      onChange={handleAddressChange}
                      required
                    />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={shippingAddress.phone}
                    onChange={handleAddressChange}
                  />
                </div>

                <h3>Payment Method</h3>
                <div className="payment-methods">
                  <label className="payment-option">
                    <input
                      type="radio"
                      value="credit-card"
                      checked={paymentMethod === "credit-card"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <span className="payment-icon">💳</span>
                    Credit/Debit Card
                  </label>
                  
                  <label className="payment-option">
                    <input
                      type="radio"
                      value="paypal"
                      checked={paymentMethod === "paypal"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <span className="payment-icon">🅿️</span>
                    PayPal
                  </label>
                  
                  <label className="payment-option">
                    <input
                      type="radio"
                      value="apple-pay"
                      checked={paymentMethod === "apple-pay"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <span className="payment-icon">🍎</span>
                    Apple Pay
                  </label>
                  
                  <label className="payment-option">
                    <input
                      type="radio"
                      value="google-pay"
                      checked={paymentMethod === "google-pay"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <span className="payment-icon">🔵</span>
                    Google Pay
                  </label>
                </div>

                {paymentMethod === "credit-card" && (
                  <div className="card-form">
                    <input type="text" placeholder="Card Number" />
                    <div className="card-row">
                      <input type="text" placeholder="MM/YY" />
                      <input type="text" placeholder="CVV" />
                    </div>
                    <input type="text" placeholder="Cardholder Name" />
                  </div>
                )}

                <div className="checkout-actions">
                  <button className="back-btn" onClick={() => setShowCheckout(false)}>
                    Back to Cart
                  </button>
                  <button 
                    className="place-order-btn" 
                    onClick={handleCheckout}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Placing Order...' : `Place Order - $${getFinalTotal().toFixed(2)}`}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Authentication Modals */}
      <LoginModal 
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        switchToRegister={() => {
          setShowLoginModal(false);
          setShowRegisterModal(true);
        }}
      />
      
      <RegisterModal 
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        switchToLogin={() => {
          setShowRegisterModal(false);
          setShowLoginModal(true);
        }}
      />
    </div>
  );
}
