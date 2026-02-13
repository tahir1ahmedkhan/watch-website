import { useState, useEffect } from "react";
import api from "../services/api";
import WatchCard from "../components/WatchCard";
import mockWatches from "../data/watches";

export default function Home() {
  const [featuredWatches, setFeaturedWatches] = useState([]);
  const [allWatches, setAllWatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        console.log('Fetching products...'); // Debug log
        
        // Fetch featured products
        const featuredResponse = await api.getFeaturedProducts(3);
        console.log('Featured Response:', featuredResponse); // Debug log
        if (featuredResponse.success && featuredResponse.data) {
          const featured = featuredResponse.data.products || featuredResponse.data;
          setFeaturedWatches(Array.isArray(featured) ? featured : []);
        } else {
          // Fallback to mock data
          setFeaturedWatches(mockWatches.slice(0, 3));
        }

        // Fetch all products
        const allResponse = await api.getProducts();
        console.log('All Products Response:', allResponse); // Debug log
        if (allResponse.success && allResponse.data) {
          const all = allResponse.data.products || allResponse.data;
          setAllWatches(Array.isArray(all) ? all : []);
        } else {
          // Fallback to mock data
          setAllWatches(mockWatches);
        }
      } catch (err) {
        console.error('Error fetching products, using mock data:', err);
        // Fallback to mock data on error
        setFeaturedWatches(mockWatches.slice(0, 3));
        setAllWatches(mockWatches);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Premium Watch Collection</h1>
          <p>Discover luxury timepieces from the world's finest brands</p>
          <button className="hero-btn" onClick={() => document.getElementById('watches-section').scrollIntoView({behavior: 'smooth'})}>
            Shop Now
          </button>
        </div>
        <div className="hero-image">
          <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=400&fit=crop" alt="Luxury Watch" />
        </div>
      </section>

      {/* Featured Watches */}
      <section className="featured-section">
        <div className="container">
          <h2>Featured Watches</h2>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>Loading...</div>
          ) : (
            <div className="featured-grid">
              {featuredWatches.map(watch => (
                <WatchCard key={watch._id || watch.id} watch={watch} featured={true} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* All Watches */}
      <section id="watches-section" className="all-watches-section">
        <div className="container">
          <div className="section-header">
            <h2>Our Complete Collection</h2>
            <p>Explore our full range of premium timepieces</p>
          </div>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>Loading...</div>
          ) : (
            <div className="watches-grid">
              {allWatches.map(watch => (
                <WatchCard key={watch._id || watch.id} watch={watch} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
