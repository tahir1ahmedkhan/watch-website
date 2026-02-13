import { useState } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    console.log("Form submitted:", formData);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: <FaPhone />,
      title: "Phone",
      details: ["+1 (555) 123-4567", "+1 (555) 987-6543"],
      description: "Call us for immediate assistance"
    },
    {
      icon: <FaEnvelope />,
      title: "Email",
      details: ["info@watchstore.com", "support@watchstore.com"],
      description: "Send us your questions anytime"
    },
    {
      icon: <FaMapMarkerAlt />,
      title: "Address",
      details: ["123 Luxury Avenue", "New York, NY 10001"],
      description: "Visit our flagship store"
    },
    {
      icon: <FaClock />,
      title: "Business Hours",
      details: ["Mon-Fri: 9:00 AM - 8:00 PM", "Sat-Sun: 10:00 AM - 6:00 PM"],
      description: "We're here when you need us"
    }
  ];

  const faqs = [
    {
      question: "Do you offer international shipping?",
      answer: "Yes, we ship worldwide! Free shipping on orders over $500, with express delivery options available."
    },
    {
      question: "Are all watches authentic?",
      answer: "Absolutely. Every watch comes with a certificate of authenticity and manufacturer warranty."
    },
    {
      question: "What's your return policy?",
      answer: "We offer a 30-day return policy for unworn watches in original condition with all packaging."
    },
    {
      question: "Do you service watches?",
      answer: "Yes, our certified watchmakers provide professional servicing and repairs for all major brands."
    }
  ];

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="container">
          <h1>Get in Touch</h1>
          <p>We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
        </div>
      </section>

      <div className="container">
        <div className="contact-content">
          {/* Contact Form */}
          <div className="contact-form-section">
            <h2>Send us a Message</h2>
            {isSubmitted ? (
              <div className="success-message">
                <h3>✅ Message Sent Successfully!</h3>
                <p>Thank you for contacting us. We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your full name"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="subject">Subject *</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="product">Product Question</option>
                    <option value="order">Order Support</option>
                    <option value="warranty">Warranty Claim</option>
                    <option value="repair">Watch Repair</option>
                    <option value="partnership">Business Partnership</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    placeholder="Tell us how we can help you..."
                  ></textarea>
                </div>
                
                <button type="submit" className="submit-btn">
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Contact Information */}
          <div className="contact-info-section">
            <h2>Contact Information</h2>
            <div className="contact-cards">
              {contactInfo.map((info, index) => (
                <div key={index} className="contact-card">
                  <div className="contact-icon">{info.icon}</div>
                  <div className="contact-details">
                    <h3>{info.title}</h3>
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="contact-detail">{detail}</p>
                    ))}
                    <p className="contact-description">{info.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Media */}
            <div className="social-section">
              <h3>Follow Us</h3>
              <div className="social-links">
                <button 
                  className="social-link facebook" 
                  aria-label="Follow us on Facebook"
                  onClick={() => window.open('https://facebook.com', '_blank')}
                >
                  <FaFacebook />
                </button>
                <button 
                  className="social-link twitter" 
                  aria-label="Follow us on Twitter"
                  onClick={() => window.open('https://twitter.com', '_blank')}
                >
                  <FaTwitter />
                </button>
                <button 
                  className="social-link instagram" 
                  aria-label="Follow us on Instagram"
                  onClick={() => window.open('https://instagram.com', '_blank')}
                >
                  <FaInstagram />
                </button>
                <button 
                  className="social-link linkedin" 
                  aria-label="Follow us on LinkedIn"
                  onClick={() => window.open('https://linkedin.com', '_blank')}
                >
                  <FaLinkedin />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <section className="faq-section">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-grid">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Map Section */}
        <section className="map-section">
          <h2>Visit Our Store</h2>
          <div className="map-container">
            <div className="map-placeholder">
              <FaMapMarkerAlt className="map-icon" />
              <h3>WatchStore Flagship</h3>
              <p>123 Luxury Avenue<br />New York, NY 10001</p>
              <p>Experience our full collection in person at our beautiful flagship store in the heart of Manhattan.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}