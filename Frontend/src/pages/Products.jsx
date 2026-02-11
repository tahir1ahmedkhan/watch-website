import { useState, useEffect } from "react";
import { FaFilter, FaSort, FaTh, FaList } from "react-icons/fa";
import api from "../services/api";
import WatchCard from "../components/WatchCard";

export default function Products() {
  const [watches, setWatches] = useState([]);
  const [filteredWatches, setFilteredWatches] = useState([]);
  const [sortBy, setSortBy] = useState("name");
  const [filterBy, setFilterBy] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [viewMode, setViewMode] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.getProducts();
        console.log('API Response:', response); // Debug log
        
        if (response.success && response.data) {
          // API returns data.products, not just data
          const productList = response.data.products || response.data;
          console.log('Products:', productList); // Debug log
          setWatches(Array.isArray(productList) ? productList : []);
        } else {
          setError('No products found. Please add products in the admin dashboard.');
        }
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(`Failed to load products: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter and sort watches
  useEffect(() => {
    let filtered = [...watches];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(watch =>
        watch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        watch.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (filterBy !== "all") {
      filtered = filtered.filter(watch => {
        switch (filterBy) {
          case "luxury":
            return watch.price > 1000;
          case "affordable":
            return watch.price <= 500;
          case "smartwatch":
            return watch.name.toLowerCase().includes("apple") || 
                   watch.name.toLowerCase().includes("samsung") ||
                   watch.name.toLowerCase().includes("garmin") ||
                   watch.name.toLowerCase().includes("fitbit");
          case "diving":
            return watch.description.toLowerCase().includes("diving") ||
                   watch.description.toLowerCase().includes("water");
          default:
            return true;
        }
      });
    }

    // Price range filter
    filtered = filtered.filter(watch => 
      watch.price >= priceRange[0] && watch.price <= priceRange[1]
    );

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    setFilteredWatches(filtered);
  }, [sortBy, filterBy, priceRange, searchTerm, watches]);

  const categories = [
    { value: "all", label: "All Watches" },
    { value: "luxury", label: "Luxury ($1000+)" },
    { value: "affordable", label: "Affordable ($500-)" },
    { value: "smartwatch", label: "Smart Watches" },
    { value: "diving", label: "Diving Watches" }
  ];

  const sortOptions = [
    { value: "name", label: "Name A-Z" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" }
  ];

  return (
    <div className="products-page">
      <div className="container">
        {/* Page Header */}
        <div className="products-header">
          <h1>Our Watch Collection</h1>
          <p>Discover premium timepieces from the world's finest brands</p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="loading-state" style={{ textAlign: 'center', padding: '3rem' }}>
            <p>Loading products...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="error-state" style={{ textAlign: 'center', padding: '3rem', color: '#e74c3c' }}>
            <p>{error}</p>
          </div>
        )}

        {/* Products Content */}
        {!loading && !error && (
          <>
            {/* Search Bar */}
            <div className="search-section">
              <div className="search-bar">
                <input
                  type="text"
                  placeholder="Search watches..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

        {/* Filters and Controls */}
        <div className="products-controls">
          <div className="filters-section">
            <div className="filter-group">
              <label>
                <FaFilter /> Category:
                <select value={filterBy} onChange={(e) => setFilterBy(e.target.value)}>
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
              </label>
            </div>

            <div className="filter-group">
              <label>
                <FaSort /> Sort by:
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </label>
            </div>

            <div className="price-range">
              <label>Price Range: ${priceRange[0]} - ${priceRange[1]}</label>
              <input
                type="range"
                min="0"
                max="5000"
                step="100"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
              />
            </div>
          </div>

          <div className="view-controls">
            <button
              className={`view-btn ${viewMode === "grid" ? "active" : ""}`}
              onClick={() => setViewMode("grid")}
            >
              <FaTh />
            </button>
            <button
              className={`view-btn ${viewMode === "list" ? "active" : ""}`}
              onClick={() => setViewMode("list")}
            >
              <FaList />
            </button>
          </div>
        </div>

        {/* Results Count */}
        <div className="results-info">
          <p>Showing {filteredWatches.length} of {watches.length} watches</p>
        </div>

        {/* Products Grid/List */}
        <div className={`products-container ${viewMode}`}>
          {filteredWatches.length > 0 ? (
            filteredWatches.map(watch => (
              <WatchCard key={watch.id} watch={watch} />
            ))
          ) : (
            <div className="no-results">
              <h3>No watches found</h3>
              <p>Try adjusting your filters or search terms</p>
            </div>
          )}
        </div>
          </>
        )}
      </div>
    </div>
  );
}