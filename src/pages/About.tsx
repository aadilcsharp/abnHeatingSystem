import { useTranslation } from 'react-i18next';
import { companyInfo } from '../data/company';

function About() {
  const { t, i18n } = useTranslation();

  const getCompanyName = () => {
    switch (i18n.language) {
      case 'hi': return companyInfo.nameHi;
      case 'ur': return companyInfo.nameUr;
      case 'ar': return companyInfo.nameAr;
      default: return companyInfo.name;
    }
  };

  const getCompanyDescription = () => {
    switch (i18n.language) {
      case 'hi': return companyInfo.descriptionHi;
      case 'ur': return companyInfo.descriptionUr;
      case 'ar': return companyInfo.descriptionAr;
      default: return companyInfo.description;
    }
  };

  const getCompanyAddress = () => {
    switch (i18n.language) {
      case 'hi': return companyInfo.addressHi;
      case 'ur': return companyInfo.addressUr;
      case 'ar': return companyInfo.addressAr;
      default: return companyInfo.address;
    }
  };

  return (
    <div className="about-page">
      <div className="page-container">
        <div className="page-header">
          <h1 className="page-title">{t('aboutTitle')}</h1>
        </div>

        <div className="about-content">
          <div className="about-hero">
            <div className="about-hero-content">
              <h2 className="about-company-name">{getCompanyName()}</h2>
              <p className="about-description">
                {getCompanyDescription()}
              </p>
              <p className="about-extended">
                {t('aboutDescription')}
              </p>
            </div>
            <div className="about-hero-image">
              <div className="company-logo">
                <span className="logo-text-large">ABN HEATING SYSTEM</span>
                <span className="logo-tagline"></span>
              </div>
            </div>
          </div>

          <div className="about-sections">
            <div className="about-section">
              <h3>Our Mission</h3>
              <p>
                To provide our customers with the latest technology products at competitive prices, 
                ensuring quality, reliability, and exceptional customer service.
              </p>
            </div>

            <div className="about-section">
              <h3>Our Vision</h3>
              <p>
                To become the leading e-commerce platform for electronics and gadgets, 
                trusted by customers across the region for quality products and service excellence.
              </p>
            </div>

            <div className="about-section">
              <h3>Why Choose Us?</h3>
              <div className="why-choose-grid">
                <div className="why-choose-item">
                  <div className="why-choose-icon">🏆</div>
                  <h4>Quality Products</h4>
                  <p>We source only genuine products from authorized dealers and manufacturers.</p>
                </div>
                <div className="why-choose-item">
                  <div className="why-choose-icon">💰</div>
                  <h4>Best Prices</h4>
                  <p>Competitive pricing with regular offers and discounts for our customers.</p>
                </div>
                <div className="why-choose-item">
                  <div className="why-choose-icon">🚚</div>
                  <h4>Fast Delivery</h4>
                  <p>Quick and secure delivery to your doorstep with order tracking.</p>
                </div>
                <div className="why-choose-item">
                  <div className="why-choose-icon">🛡️</div>
                  <h4>Warranty Support</h4>
                  <p>Comprehensive warranty support and after-sales service.</p>
                </div>
              </div>
            </div>

            <div className="about-section">
              <h3>Company Information</h3>
              <div className="company-details">
                <div className="detail-item">
                  <strong>Address:</strong>
                  <span>{getCompanyAddress()}</span>
                </div>
                <div className="detail-item">
                  <strong>Phone:</strong>
                  <span>{companyInfo.phone}</span>
                </div>
                <div className="detail-item">
                  <strong>Email:</strong>
                  <span>{companyInfo.email}</span>
                </div>
                <div className="detail-item">
                  <strong>Website:</strong>
                  <span>{companyInfo.website}</span>
                </div>
              </div>
            </div>

            <div className="about-section">
              <h3>Our Values</h3>
              <div className="values-grid">
                <div className="value-item">
                  <h4>🤝 Customer First</h4>
                  <p>Customer satisfaction is our top priority in everything we do.</p>
                </div>
                <div className="value-item">
                  <h4>🔍 Transparency</h4>
                  <p>Clear pricing, honest product descriptions, and transparent policies.</p>
                </div>
                <div className="value-item">
                  <h4>⚡ Innovation</h4>
                  <p>Continuously improving our services and embracing new technologies.</p>
                </div>
                <div className="value-item">
                  <h4>🌍 Sustainability</h4>
                  <p>Committed to environmentally responsible business practices.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
