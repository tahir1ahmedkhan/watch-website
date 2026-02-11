import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaStar, FaStarHalfAlt, FaRegStar, FaShoppingCart, FaHeart, FaShare, FaCheck, FaTimes, FaShieldAlt, FaTruck, FaUndo } from "react-icons/fa";
import api from "../services/api";
import WatchCard from "../components/WatchCard";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [watch, setWatch] = useState(null);
  const [relatedWatches, setRelatedWatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState("overview");
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        console.log('Fetching product with ID:', id); // Debug log
        const response = await api.getProduct(id);
        console.log('Product Response:', response); // Debug log
        if (response.success && response.data) {
          setWatch(response.data);
          
          // Fetch related products
          const allProductsResponse = await api.getProducts();
          if (allProductsResponse.success && allProductsResponse.data) {
            const allProducts = allProductsResponse.data.products || allProductsResponse.data;
            const related = allProducts.filter(p => 
              p._id !== response.data._id && 
              (p.brand === response.data.brand || p.category === response.data.category)
            ).slice(0, 4);
            setRelatedWatches(related);
          }
        } else {
          console.error('Product not found in response');
        }
      } catch (err) {
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div className="loading-state" style={{ textAlign: 'center', padding: '3rem' }}><p>Loading product...</p></div>;
  if (!watch) return <div className="product-not-found"><h2>Product not found</h2></div>;

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    for (let i = 0; i < quantity; i++) {
      cart.push(watch);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    navigate("/cart");
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  const shareProduct = () => {
    if (navigator.share) {
      navigator.share({
        title: watch.name,
        text: watch.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Product link copied to clipboard!");
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="star filled" />);
    }
    
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="star half" />);
    }
    
    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="star empty" />);
    }
    
    return stars;
  };

  return (
    <div className="product-details-page">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <span onClick={() => navigate("/")} className="breadcrumb-link">Home</span>
          <span className="breadcrumb-separator"> / </span>
          <span onClick={() => navigate("/products")} className="breadcrumb-link">Products</span>
          <span className="breadcrumb-separator"> / </span>
          <span className="breadcrumb-current">{watch.name}</span>
        </nav>

        <div className="product-details-content">
          {/* Product Images */}
          <div className="product-images">
            <div className="main-image">
              <img src={watch.image} alt={watch.name} />
              {!watch.inStock && <div className="out-of-stock-overlay">Out of Stock</div>}
            </div>
          </div>

          {/* Product Info */}
          <div className="product-info">
            <div className="product-header">
              <h1 className="product-title">{watch.name}</h1>
              <div className="product-brand">by {watch.brand}</div>
              
              <div className="rating-section">
                <div className="stars">
                  {renderStars(watch.rating)}
                </div>
                <span className="rating-text">({watch.rating}) • {watch.reviews} reviews</span>
              </div>
            </div>

            <div className="price-section">
              <div className="current-price">${watch.price}</div>
              <div className="stock-info">
                {watch.inStock ? (
                  <span className="in-stock">
                    <FaCheck /> In Stock ({watch.stockCount} available)
                  </span>
                ) : (
                  <span className="out-of-stock">
                    <FaTimes /> Out of Stock
                  </span>
                )}
              </div>
            </div>

            <div className="product-description">
              <p>{watch.description}</p>
            </div>

            {/* Key Features */}
            <div className="key-features">
              <h3>Key Features</h3>
              <ul>
                {watch.features?.map((feature, index) => (
                  <li key={index}><FaCheck className="feature-check" /> {feature}</li>
                ))}
              </ul>
            </div>

            {/* Quick Specs */}
            <div className="quick-specs">
              <div className="spec-item">
                <span className="spec-label">Movement:</span>
                <span className="spec-value">{watch.movement}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Case Size:</span>
                <span className="spec-value">{watch.caseSize}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Water Resistance:</span>
                <span className="spec-value">{watch.waterResistance}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Material:</span>
                <span className="spec-value">{watch.caseMaterial}</span>
              </div>
            </div>

            {/* Purchase Section */}
            <div className="purchase-section">
              <div className="quantity-selector">
                <label htmlFor="quantity">Quantity:</label>
                <select 
                  id="quantity" 
                  value={quantity} 
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  disabled={!watch.inStock}
                >
                  {[...Array(Math.min(watch.stockCount, 10))].map((_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                  ))}
                </select>
              </div>

              <div className="action-buttons">
                <button 
                  onClick={addToCart} 
                  className="add-to-cart-btn"
                  disabled={!watch.inStock}
                >
                  <FaShoppingCart /> Add to Cart
                </button>
                
                <button 
                  onClick={toggleWishlist}
                  className={`wishlist-btn ${isWishlisted ? 'wishlisted' : ''}`}
                >
                  <FaHeart />
                </button>
                
                <button onClick={shareProduct} className="share-btn">
                  <FaShare />
                </button>
              </div>
            </div>

            {/* Guarantees */}
            <div className="guarantees">
              <div className="guarantee-item">
                <FaShieldAlt className="guarantee-icon" />
                <div>
                  <strong>{watch.warranty} Warranty</strong>
                  <p>Manufacturer warranty included</p>
                </div>
              </div>
              <div className="guarantee-item">
                <FaTruck className="guarantee-icon" />
                <div>
                  <strong>Free Shipping</strong>
                  <p>On orders over $200</p>
                </div>
              </div>
              <div className="guarantee-item">
                <FaUndo className="guarantee-icon" />
                <div>
                  <strong>30-Day Returns</strong>
                  <p>Easy return policy</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Information Tabs */}
        <div className="product-tabs">
          <div className="tab-navigation">
            <button 
              className={`tab-btn ${selectedTab === 'overview' ? 'active' : ''}`}
              onClick={() => setSelectedTab('overview')}
            >
              Overview
            </button>
            <button 
              className={`tab-btn ${selectedTab === 'specifications' ? 'active' : ''}`}
              onClick={() => setSelectedTab('specifications')}
            >
              Specifications
            </button>
            <button 
              className={`tab-btn ${selectedTab === 'reviews' ? 'active' : ''}`}
              onClick={() => setSelectedTab('reviews')}
            >
              Reviews ({watch.reviews})
            </button>
            <button 
              className={`tab-btn ${selectedTab === 'shipping' ? 'active' : ''}`}
              onClick={() => setSelectedTab('shipping')}
            >
              Shipping & Returns
            </button>
          </div>

          <div className="tab-content">
            {selectedTab === 'overview' && (
              <div className="overview-content">
                <h3>Product Overview</h3>
                <p>{watch.description}</p>
                
                <h4>Category: {watch.category}</h4>
                <p>This {watch.category.toLowerCase()} watch from {watch.brand} represents the perfect blend of functionality and style.</p>
                
                <h4>Key Highlights</h4>
                <ul>
                  {watch.features?.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}

            {selectedTab === 'specifications' && (
              <div className="specifications-content">
                <h3>Technical Specifications</h3>
                <div className="specs-grid">
                  <div className="spec-row">
                    <span className="spec-label">Brand:</span>
                    <span className="spec-value">{watch.brand}</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-label">Category:</span>
                    <span className="spec-value">{watch.category}</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-label">Movement:</span>
                    <span className="spec-value">{watch.movement}</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-label">Case Material:</span>
                    <span className="spec-value">{watch.caseMaterial}</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-label">Case Size:</span>
                    <span className="spec-value">{watch.caseSize}</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-label">Water Resistance:</span>
                    <span className="spec-value">{watch.waterResistance}</span>
                  </div>
                  
                  {watch.specifications && Object.entries(watch.specifications).map(([key, value]) => (
                    <div key={key} className="spec-row">
                      <span className="spec-label">{key}:</span>
                      <span className="spec-value">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedTab === 'reviews' && (
              <div className="reviews-content">
                <h3>Customer Reviews</h3>
                <div className="reviews-summary">
                  <div className="average-rating">
                    <div className="rating-number">{watch.rating}</div>
                    <div className="stars">
                      {renderStars(watch.rating)}
                    </div>
                    <div className="review-count">Based on {watch.reviews} reviews</div>
                  </div>
                </div>
                
                <div className="sample-reviews">
                  <div className="review-item">
                    <div className="review-header">
                      <div className="reviewer-name">John D.</div>
                      <div className="review-rating">{renderStars(5)}</div>
                    </div>
                    <p>"Excellent quality watch. The build feels premium and it keeps perfect time. Highly recommended!"</p>
                  </div>
                  
                  <div className="review-item">
                    <div className="review-header">
                      <div className="reviewer-name">Sarah M.</div>
                      <div className="review-rating">{renderStars(4)}</div>
                    </div>
                    <p>"Beautiful design and great functionality. The only minor issue is the strap could be more comfortable."</p>
                  </div>
                </div>
              </div>
            )}

            {selectedTab === 'shipping' && (
              <div className="shipping-content">
                <h3>Shipping & Returns</h3>
                
                <div className="shipping-section">
                  <h4>Shipping Information</h4>
                  <ul>
                    <li>Free standard shipping on orders over $200</li>
                    <li>Express shipping available for $15</li>
                    <li>International shipping available</li>
                    <li>Orders processed within 1-2 business days</li>
                  </ul>
                </div>
                
                <div className="returns-section">
                  <h4>Return Policy</h4>
                  <ul>
                    <li>30-day return window</li>
                    <li>Items must be in original condition</li>
                    <li>Free return shipping for defective items</li>
                    <li>Refunds processed within 5-7 business days</li>
                  </ul>
                </div>
                
                <div className="warranty-section">
                  <h4>Warranty</h4>
                  <p>This watch comes with a {watch.warranty} manufacturer warranty covering defects in materials and workmanship.</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedWatches.length > 0 && (
          <div className="related-products">
            <h3>Related Products</h3>
            <div className="related-grid">
              {relatedWatches.map(relatedWatch => (
                <div key={relatedWatch._id} className="related-item" onClick={() => navigate(`/product/${relatedWatch._id}`)}>
                  <img src={relatedWatch.image} alt={relatedWatch.name} />
                  <h4>{relatedWatch.name}</h4>
                  <p className="related-price">${relatedWatch.price}</p>
                  <div className="related-rating">
                    {renderStars(relatedWatch.rating)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}