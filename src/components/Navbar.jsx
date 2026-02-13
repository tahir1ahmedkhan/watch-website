import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaShoppingCart, FaBars, FaTimes, FaClock, FaSearch, FaUser, FaSignOutAlt } from "react-icons/fa";
import SearchModal from "./SearchModal";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const location = useLocation();
  const { user, logout, isAuthenticated } = useAuth();

  // Update cart count
  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
      setCartCount(totalItems);
    };

    updateCartCount();
    
    // Listen for storage changes
    window.addEventListener('storage', updateCartCount);
    
    // Custom event for cart updates
    window.addEventListener('cartUpdated', updateCartCount);
    
    return () => {
      window.removeEventListener('storage', updateCartCount);
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleAuthAction = (action) => {
    if (action === 'login') {
      setIsLoginOpen(true);
    } else if (action === 'register') {
      setIsRegisterOpen(true);
    }
    setShowUserMenu(false);
    closeMenu();
  };

  const switchToRegister = () => {
    setIsLoginOpen(false);
    setIsRegisterOpen(true);
  };

  const switchToLogin = () => {
    setIsRegisterOpen(false);
    setIsLoginOpen(true);
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    closeMenu();
  };

  return (
    <nav className={`modern-navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Logo Section */}
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <FaClock className="logo-icon" />
          <span className="logo-text">
            <span className="logo-main">Watch</span>
            <span className="logo-accent">Store</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="navbar-menu">
          <Link 
            to="/" 
            className={`navbar-link ${isActive('/') ? 'active' : ''}`}
            onClick={closeMenu}
          >
            Home
          </Link>
          <Link 
            to="/products" 
            className={`navbar-link ${isActive('/products') ? 'active' : ''}`}
            onClick={closeMenu}
          >
            Products
          </Link>
          <Link 
            to="/about" 
            className={`navbar-link ${isActive('/about') ? 'active' : ''}`}
            onClick={closeMenu}
          >
            About
          </Link>
          <Link 
            to="/contact" 
            className={`navbar-link ${isActive('/contact') ? 'active' : ''}`}
            onClick={closeMenu}
          >
            Contact
          </Link>
        </div>

        {/* Right Section */}
        <div className="navbar-right">
          {/* Search Icon */}
          <button 
            className="navbar-icon-btn search-btn"
            onClick={() => setIsSearchOpen(true)}
          >
            <FaSearch />
          </button>

          {/* User Menu */}
          <div className="user-menu-container">
            <button 
              className="navbar-icon-btn user-btn"
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <FaUser />
            </button>
            
            {showUserMenu && (
              <div className="user-dropdown">
                {isAuthenticated ? (
                  <>
                    <div className="user-info">
                      <span className="user-name">
                        {user?.firstName} {user?.lastName}
                      </span>
                      <span className="user-email">{user?.email}</span>
                    </div>
                    <div className="dropdown-divider"></div>
                    <Link 
                      to="/orders" 
                      className="dropdown-item"
                      onClick={() => setShowUserMenu(false)}
                    >
                      My Orders
                    </Link>
                    <Link 
                      to="/profile" 
                      className="dropdown-item"
                      onClick={() => setShowUserMenu(false)}
                    >
                      Profile
                    </Link>
                    <div className="dropdown-divider"></div>
                    <button 
                      className="dropdown-item logout-btn"
                      onClick={handleLogout}
                    >
                      <FaSignOutAlt /> Logout
                    </button>
                  </>
                ) : (
                  <>
                    <button 
                      className="dropdown-item"
                      onClick={() => handleAuthAction('login')}
                    >
                      Login
                    </button>
                    <button 
                      className="dropdown-item"
                      onClick={() => handleAuthAction('register')}
                    >
                      Register
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Cart Link */}
          <Link to="/cart" className="cart-link" onClick={closeMenu}>
            <div className="cart-icon-wrapper">
              <FaShoppingCart className="cart-icon" />
              {cartCount > 0 && (
                <span className="cart-badge">{cartCount}</span>
              )}
            </div>
            <span className="cart-text">Cart</span>
          </Link>

          {/* Mobile Menu Toggle */}
          <button 
            className="mobile-menu-toggle"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-content">
          <Link 
            to="/" 
            className={`mobile-link ${isActive('/') ? 'active' : ''}`}
            onClick={closeMenu}
          >
            Home
          </Link>
          <Link 
            to="/products" 
            className={`mobile-link ${isActive('/products') ? 'active' : ''}`}
            onClick={closeMenu}
          >
            Products
          </Link>
          <Link 
            to="/about" 
            className={`mobile-link ${isActive('/about') ? 'active' : ''}`}
            onClick={closeMenu}
          >
            About
          </Link>
          <Link 
            to="/contact" 
            className={`mobile-link ${isActive('/contact') ? 'active' : ''}`}
            onClick={closeMenu}
          >
            Contact
          </Link>
          
          <div className="mobile-menu-divider"></div>
          
          <div className="mobile-menu-actions">
            <button 
              className="mobile-action-btn"
              onClick={() => setIsSearchOpen(true)}
            >
              <FaSearch /> Search
            </button>
            {isAuthenticated ? (
              <>
                <Link 
                  to="/orders" 
                  className="mobile-action-btn"
                  onClick={closeMenu}
                >
                  <FaUser /> My Orders
                </Link>
                <Link 
                  to="/profile" 
                  className="mobile-action-btn"
                  onClick={closeMenu}
                >
                  <FaUser /> Profile
                </Link>
                <button 
                  className="mobile-action-btn logout-btn"
                  onClick={handleLogout}
                >
                  <FaSignOutAlt /> Logout
                </button>
              </>
            ) : (
              <>
                <button 
                  className="mobile-action-btn"
                  onClick={() => handleAuthAction('login')}
                >
                  <FaUser /> Login
                </button>
                <button 
                  className="mobile-action-btn"
                  onClick={() => handleAuthAction('register')}
                >
                  <FaUser /> Register
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="mobile-menu-overlay" onClick={closeMenu}></div>
      )}

      {/* Search Modal */}
      <SearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />

      {/* Authentication Modals */}
      <LoginModal 
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        switchToRegister={switchToRegister}
      />
      
      <RegisterModal 
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        switchToLogin={switchToLogin}
      />
    </nav>
  );
} 
