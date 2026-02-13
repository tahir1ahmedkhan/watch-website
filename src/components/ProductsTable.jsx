import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor to include admin token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default function ProductsTable() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    brand: '',
    category: '',
    movement: '',
    caseMaterial: '',
    caseSize: '',
    waterResistance: '',
    warranty: '',
    stockCount: '',
    inStock: true,
    image: '' // Add image URL field
  });

  useEffect(() => {
    fetchProducts();
  }, [currentPage, searchTerm]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await api.get('/admin/products', {
        params: {
          page: currentPage,
          limit: 10,
          search: searchTerm
        }
      });

      if (response.data.success) {
        setProducts(response.data.data.products);
        setTotalPages(response.data.data.pagination.totalPages);
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to fetch products';
      setError(errorMsg);
      console.error('Fetch products error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const openCreateModal = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      price: '',
      description: '',
      brand: '',
      category: '',
      movement: '',
      caseMaterial: '',
      caseSize: '',
      waterResistance: '',
      warranty: '',
      stockCount: '',
      inStock: true,
      image: ''
    });
    setImageFile(null);
    setImagePreview('');
    setShowModal(true);
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      description: product.description,
      brand: product.brand,
      category: product.category,
      movement: product.movement,
      caseMaterial: product.caseMaterial,
      caseSize: product.caseSize,
      waterResistance: product.waterResistance,
      warranty: product.warranty,
      stockCount: product.stockCount,
      inStock: product.inStock,
      image: product.image || ''
    });
    setImageFile(null);
    setImagePreview(product.image);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setError('');
      const submitData = new FormData();
      
      // Append all form fields
      Object.keys(formData).forEach(key => {
        if (key !== 'image' || !imageFile) {
          // Only append image URL if no file is being uploaded
          submitData.append(key, formData[key]);
        }
      });
      
      // Append image file if selected
      if (imageFile) {
        submitData.append('image', imageFile);
      } else if (!editingProduct && !formData.image) {
        // If creating new product and no image file or URL, show error
        setError('Please select an image or provide an image URL');
        return;
      }

      if (editingProduct) {
        // Update existing product
        const response = await api.put(`/admin/products/${editingProduct._id}`, submitData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        
        if (response.data.success) {
          setShowModal(false);
          fetchProducts();
          alert('Product updated successfully!');
        }
      } else {
        // Create new product
        const response = await api.post('/admin/products', submitData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        
        if (response.data.success) {
          setShowModal(false);
          fetchProducts();
          alert('Product created successfully!');
        }
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Failed to save product';
      setError(errorMsg);
      console.error('Save product error:', err);
      alert(`Error: ${errorMsg}`);
    }
  };

  const handleDelete = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      setError('');
      const response = await api.delete(`/admin/products/${productId}`);
      
      if (response.data.success) {
        fetchProducts();
        alert('Product deleted successfully!');
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to delete product';
      setError(errorMsg);
      console.error('Delete product error:', err);
      alert(`Error: ${errorMsg}`);
    }
  };

  if (loading && products.length === 0) {
    return (
      <div className="admin-loading">
        <div className="admin-spinner"></div>
        <p>Loading products...</p>
      </div>
    );
  }

  return (
    <div className="admin-table-container">
      <div className="admin-table-header">
        <div className="admin-table-title">
          <h2>Products Management</h2>
          <p>Manage your watch inventory</p>
        </div>
        <button className="admin-btn-primary" onClick={openCreateModal}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="12" y1="5" x2="12" y2="19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          Add Product
        </button>
      </div>

      <div className="admin-table-controls">
        <div className="admin-search-box">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
            <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      {error && (
        <div className="admin-alert admin-alert-error">
          {error}
        </div>
      )}

      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Brand</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="admin-product-image"
                  />
                </td>
                <td>
                  <div className="admin-product-name">{product.name}</div>
                </td>
                <td>{product.brand}</td>
                <td>
                  <span className="admin-badge admin-badge-info">
                    {product.category}
                  </span>
                </td>
                <td className="admin-product-price">${product.price.toLocaleString()}</td>
                <td>{product.stockCount}</td>
                <td>
                  <span className={`admin-badge ${product.inStock ? 'admin-badge-success' : 'admin-badge-danger'}`}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </td>
                <td>
                  <div className="admin-table-actions">
                    <button
                      className="admin-btn-icon admin-btn-edit"
                      onClick={() => openEditModal(product)}
                      title="Edit"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M18.5 2.50001C18.8978 2.10219 19.4374 1.87869 20 1.87869C20.5626 1.87869 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.4374 22.1213 4.00001C22.1213 4.56262 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    <button
                      className="admin-btn-icon admin-btn-delete"
                      onClick={() => handleDelete(product._id)}
                      title="Delete"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <polyline points="3,6 5,6 21,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="admin-pagination">
          <button
            className="admin-pagination-btn"
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="admin-pagination-info">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="admin-pagination-btn"
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}

      {/* Product Modal */}
      {showModal && (
        <div className="admin-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="admin-modal admin-modal-large" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3>{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
              <button className="admin-modal-close" onClick={() => setShowModal(false)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="admin-modal-body">
              <div className="admin-form-grid">
                <div className="admin-form-group admin-form-group-full">
                  <label>Product Image</label>
                  <div className="admin-image-upload">
                    {imagePreview && (
                      <div className="admin-image-preview">
                        <img src={imagePreview} alt="Preview" />
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      id="product-image"
                      className="admin-file-input"
                    />
                    <label htmlFor="product-image" className="admin-file-label">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                        <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/>
                        <polyline points="21,15 16,10 5,21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {imageFile ? 'Change Image' : 'Upload Image'}
                    </label>
                    <div style={{ margin: '10px 0', textAlign: 'center', color: '#666' }}>OR</div>
                    <input
                      type="text"
                      name="image"
                      value={formData.image}
                      onChange={handleInputChange}
                      placeholder="Enter image URL (e.g., https://example.com/image.jpg)"
                      style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '2px solid #e2e8f0' }}
                    />
                  </div>
                </div>

                <div className="admin-form-group">
                  <label>Product Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="admin-form-group">
                  <label>Price *</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    min="0"
                    step="0.01"
                  />
                </div>

                <div className="admin-form-group">
                  <label>Brand *</label>
                  <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="admin-form-group">
                  <label>Category *</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Luxury">Luxury</option>
                    <option value="Sport">Sport</option>
                    <option value="Casual">Casual</option>
                    <option value="Dress">Dress</option>
                    <option value="Smart">Smart</option>
                  </select>
                </div>

                <div className="admin-form-group">
                  <label>Movement *</label>
                  <input
                    type="text"
                    name="movement"
                    value={formData.movement}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., Automatic, Quartz"
                  />
                </div>

                <div className="admin-form-group">
                  <label>Case Material *</label>
                  <input
                    type="text"
                    name="caseMaterial"
                    value={formData.caseMaterial}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., Stainless Steel"
                  />
                </div>

                <div className="admin-form-group">
                  <label>Case Size *</label>
                  <input
                    type="text"
                    name="caseSize"
                    value={formData.caseSize}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., 42mm"
                  />
                </div>

                <div className="admin-form-group">
                  <label>Water Resistance *</label>
                  <input
                    type="text"
                    name="waterResistance"
                    value={formData.waterResistance}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., 100m"
                  />
                </div>

                <div className="admin-form-group">
                  <label>Warranty *</label>
                  <input
                    type="text"
                    name="warranty"
                    value={formData.warranty}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., 2 Years"
                  />
                </div>

                <div className="admin-form-group">
                  <label>Stock Count *</label>
                  <input
                    type="number"
                    name="stockCount"
                    value={formData.stockCount}
                    onChange={handleInputChange}
                    required
                    min="0"
                  />
                </div>

                <div className="admin-form-group admin-form-group-full">
                  <label>Description *</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows="4"
                  />
                </div>

                <div className="admin-form-group admin-form-group-full">
                  <label className="admin-checkbox-label">
                    <input
                      type="checkbox"
                      name="inStock"
                      checked={formData.inStock}
                      onChange={handleInputChange}
                    />
                    <span>In Stock</span>
                  </label>
                </div>
              </div>

              <div className="admin-modal-footer">
                <button type="button" className="admin-btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="admin-btn-primary">
                  {editingProduct ? 'Update Product' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
