import { FaClock, FaAward, FaShippingFast, FaHeadset, FaUsers, FaGlobe } from "react-icons/fa";

export default function About() {
  const features = [
    {
      icon: <FaClock />,
      title: "Premium Quality",
      description: "We curate only the finest timepieces from renowned watchmakers worldwide."
    },
    {
      icon: <FaAward />,
      title: "Authentic Guarantee",
      description: "Every watch comes with a certificate of authenticity and manufacturer warranty."
    },
    {
      icon: <FaShippingFast />,
      title: "Fast Shipping",
      description: "Free worldwide shipping on orders over $500. Express delivery available."
    },
    {
      icon: <FaHeadset />,
      title: "Expert Support",
      description: "Our watch specialists are here to help you find the perfect timepiece."
    }
  ];

  const stats = [
    { number: "10,000+", label: "Happy Customers" },
    { number: "500+", label: "Watch Models" },
    { number: "50+", label: "Premium Brands" },
    { number: "15+", label: "Years Experience" }
  ];

  const team = [
    {
      name: "John Smith",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
      description: "Watch enthusiast with 20+ years in luxury timepieces."
    },
    {
      name: "Sarah Johnson",
      role: "Head of Curation",
      image: "https://plus.unsplash.com/premium_photo-1661440052048-48f37620b3ae?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "Expert in vintage and contemporary watch collections."
    },
    {
      name: "Michael Chen",
      role: "Technical Specialist",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      description: "Certified watchmaker and repair specialist."
    }
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <div className="hero-content">
            <h1>About WatchStore</h1>
            <p className="hero-subtitle">
              Your trusted destination for premium timepieces since 2009
            </p>
            <p className="hero-description">
              We believe that a watch is more than just a timekeeper—it's a statement of style, 
              craftsmanship, and personal expression. Our carefully curated collection features 
              the world's most prestigious watch brands, from classic luxury pieces to cutting-edge smartwatches.
            </p>
          </div>
          <div className="hero-image">
            <img 
              src="https://images.unsplash.com/photo-1594534475808-b18fc33b045e?w=600&h=400&fit=crop" 
              alt="Luxury watches collection" 
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2>Why Choose WatchStore?</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="story-section">
        <div className="container">
          <div className="story-content">
            <div className="story-text">
              <h2>Our Story</h2>
              <p>
                Founded in 2009 by watch enthusiast John Smith, WatchStore began as a small 
                boutique specializing in vintage timepieces. What started as a passion project 
                has grown into one of the world's most trusted online destinations for luxury watches.
              </p>
              <p>
                Our mission is simple: to connect watch lovers with exceptional timepieces while 
                providing unparalleled service and expertise. Every watch in our collection is 
                carefully selected for its craftsmanship, heritage, and enduring appeal.
              </p>
              <p>
                Today, we're proud to serve customers in over 50 countries, offering everything 
                from iconic Swiss luxury watches to innovative smartwatches, all backed by our 
                commitment to authenticity and customer satisfaction.
              </p>
            </div>
            <div className="story-image">
              <img 
                src="https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="Watch craftsmanship" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <h2>Meet Our Team</h2>
          <div className="team-grid">
            {team.map((member, index) => (
              <div key={index} className="team-card">
                <div className="team-image">
                  <img src={member.image} alt={member.name} />
                </div>
                <div className="team-info">
                  <h3>{member.name}</h3>
                  <p className="team-role">{member.role}</p>
                  <p className="team-description">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="container">
          <h2>Our Values</h2>
          <div className="values-grid">
            <div className="value-item">
              <FaUsers className="value-icon" />
              <h3>Customer First</h3>
              <p>Your satisfaction is our top priority. We go above and beyond to ensure every customer has an exceptional experience.</p>
            </div>
            <div className="value-item">
              <FaAward className="value-icon" />
              <h3>Quality Assurance</h3>
              <p>Every timepiece undergoes rigorous authentication and quality checks before reaching your wrist.</p>
            </div>
            <div className="value-item">
              <FaGlobe className="value-icon" />
              <h3>Global Reach</h3>
              <p>Serving watch enthusiasts worldwide with secure shipping and local customer support.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}