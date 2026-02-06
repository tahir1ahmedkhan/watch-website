import watches from "../data/watches";
import WatchCard from "../components/WatchCard";

export default function Home() {
  const featuredWatches = watches.slice(0, 3);
  const allWatches = watches;

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
          <div className="featured-grid">
            {featuredWatches.map(watch => (
              <WatchCard key={watch.id} watch={watch} featured={true} />
            ))}
          </div>
        </div>
      </section>

      {/* All Watches */}
      <section id="watches-section" className="all-watches-section">
        <div className="container">
          <div className="section-header">
            <h2>Our Complete Collection</h2>
            <p>Explore our full range of premium timepieces</p>
          </div>
          <div className="watches-grid">
            {allWatches.map(watch => (
              <WatchCard key={watch.id} watch={watch} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
