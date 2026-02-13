import { Link } from "react-router-dom";
import { useState } from "react";

export default function WatchCard({ watch, featured = false }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const addToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const productId = watch._id || watch.id;
    const existingItem = cart.find(item => (item._id || item.id) === productId);
    
    if (existingItem) {
      existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
      cart.push({ ...watch, quantity: 1 });
    }
    
    localStorage.setItem("cart", JSON.stringify(cart));
    
    // Show feedback
    const button = e.target;
    const originalText = button.textContent;
    button.textContent = "Added!";
    button.style.background = "#28a745";
    
    setTimeout(() => {
      button.textContent = originalText;
      button.style.background = "";
    }, 1000);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div className={`watch-card ${featured ? 'featured' : ''}`}>
      <Link to={`/product/${watch._id || watch.id}`} className="card-link">
        <div className="image-container">
          {!imageLoaded && !imageError && (
            <div className="image-placeholder">
              <div className="loading-spinner"></div>
            </div>
          )}
          {imageError ? (
            <div className="image-fallback">
              <span>📷</span>
              <p>Image not available</p>
            </div>
          ) : (
            <img 
              src={watch.image} 
              alt={watch.name}
              onLoad={handleImageLoad}
              onError={handleImageError}
              style={{ display: imageLoaded ? 'block' : 'none' }}
            />
          )}
          <div className="card-overlay">
            <span className="view-details">View Details</span>
          </div>
        </div>
        
        <div className="card-content">
          <h3 className="watch-name">{watch.name}</h3>
          <p className="watch-description">{watch.description}</p>
          <div className="price-section">
            <span className="price">${watch.price.toLocaleString()}</span>
            {watch.price > 1000 && <span className="luxury-badge">Luxury</span>}
          </div>
        </div>
      </Link>
      
      <div className="card-actions">
        <Link to={`/product/${watch._id || watch.id}`} className="btn btn-primary">
          View Details
        </Link>
        <button className="btn btn-secondary" onClick={addToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}
