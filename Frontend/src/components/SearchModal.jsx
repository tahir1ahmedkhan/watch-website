import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaTimes } from "react-icons/fa";
import watches from "../data/watches";

export default function SearchModal({ isOpen, onClose }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    // Load recent searches from localStorage
    const saved = localStorage.getItem("recentSearches");
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    if (searchTerm.trim()) {
      const results = watches.filter(watch =>
        watch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        watch.description.toLowerCase().includes(searchTerm.toLowerCase())
      ).slice(0, 6); // Limit to 6 results
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  const handleSearch = (term) => {
    if (term.trim()) {
      // Add to recent searches
      const updated = [term, ...recentSearches.filter(s => s !== term)].slice(0, 5);
      setRecentSearches(updated);
      localStorage.setItem("recentSearches", JSON.stringify(updated));
    }
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem("recentSearches");
  };

  const handleClose = () => {
    setSearchTerm("");
    setSearchResults([]);
    onClose();
  };

  const popularSearches = [
    "Rolex", "Apple Watch", "Omega", "Casio", "Luxury watches", "Smart watches"
  ];

  if (!isOpen) return null;

  return (
    <div className="search-modal-overlay" onClick={handleClose}>
      <div className="search-modal" onClick={(e) => e.stopPropagation()}>
        <div className="search-modal-header">
          <div className="search-input-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search for watches..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch(searchTerm)}
              autoFocus
            />
            <button className="close-search" onClick={handleClose}>
              <FaTimes />
            </button>
          </div>
        </div>

        <div className="search-modal-content">
          {searchTerm && searchResults.length > 0 && (
            <div className="search-results">
              <h3>Search Results</h3>
              <div className="results-list">
                {searchResults.map(watch => (
                  <Link
                    key={watch.id}
                    to={`/product/${watch.id}`}
                    className="search-result-item"
                    onClick={() => {
                      handleSearch(searchTerm);
                      handleClose();
                    }}
                  >
                    <img src={watch.image} alt={watch.name} />
                    <div className="result-info">
                      <h4>{watch.name}</h4>
                      <p className="result-price">${watch.price}</p>
                      <p className="result-description">{watch.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
              <Link
                to="/products"
                className="view-all-results"
                onClick={handleClose}
              >
                View all results for "{searchTerm}"
              </Link>
            </div>
          )}

          {searchTerm && searchResults.length === 0 && (
            <div className="no-results">
              <h3>No results found</h3>
              <p>Try searching for different keywords or browse our categories</p>
            </div>
          )}

          {!searchTerm && (
            <div className="search-suggestions">
              {recentSearches.length > 0 && (
                <div className="recent-searches">
                  <div className="section-header">
                    <h3>Recent Searches</h3>
                    <button onClick={clearRecentSearches} className="clear-btn">
                      Clear
                    </button>
                  </div>
                  <div className="search-tags">
                    {recentSearches.map((search, index) => (
                      <button
                        key={index}
                        className="search-tag"
                        onClick={() => setSearchTerm(search)}
                      >
                        {search}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="popular-searches">
                <h3>Popular Searches</h3>
                <div className="search-tags">
                  {popularSearches.map((search, index) => (
                    <button
                      key={index}
                      className="search-tag"
                      onClick={() => setSearchTerm(search)}
                    >
                      {search}
                    </button>
                  ))}
                </div>
              </div>

              <div className="quick-categories">
                <h3>Browse Categories</h3>
                <div className="category-links">
                  <Link to="/products" onClick={handleClose}>All Watches</Link>
                  <Link to="/products?category=luxury" onClick={handleClose}>Luxury Watches</Link>
                  <Link to="/products?category=smartwatch" onClick={handleClose}>Smart Watches</Link>
                  <Link to="/products?category=diving" onClick={handleClose}>Sports Watches</Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}