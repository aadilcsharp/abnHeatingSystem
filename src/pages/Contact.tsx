import { useTranslation } from 'react-i18next';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import { companyInfo } from '../data/company';
import { qrCodeImage } from '../../public/images';

function Contact() {
  const { t, i18n } = useTranslation();

  const getCompanyAddress = () => {
    switch (i18n.language) {
      case 'hi': return companyInfo.addressHi;
      case 'ur': return companyInfo.addressUr;
      case 'ar': return companyInfo.addressAr;
      default: return companyInfo.address;
    }
  };

  const getWhatsAppMessage = () => {
    switch (i18n.language) {
      case 'hi': return companyInfo.whatsappMessageHi;
      case 'ur': return companyInfo.whatsappMessageUr;
      case 'ar': return companyInfo.whatsappMessageAr;
      default: return companyInfo.whatsappMessage;
    }
  };

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(getWhatsAppMessage());
    const whatsappUrl = `https://wa.me/${companyInfo.whatsappNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleCallClick = () => {
    window.open(`tel:${companyInfo.phone}`, '_self');
  };

  const handleEmailClick = () => {
    const subject = encodeURIComponent('Inquiry from ABN HEATING SYSTEM Website');
    const body = encodeURIComponent('Hello,\n\nI would like to inquire about your products.\n\nThank you.');
    window.open(`mailto:${companyInfo.email}?subject=${subject}&body=${body}`, '_self');
  };

  return (
    <div className="contact-page">
      <div className="page-container">
        <div className="page-header">
          <h1 className="page-title">{t('contactTitle')}</h1>
          <p className="page-subtitle">{t('getInTouch')}</p>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-section">
              <h3>Contact Information</h3>
              <div className="contact-methods">
                <div className="contact-method">
                  <div className="contact-icon">
                    <MapPin size={24} />
                  </div>
                  <div className="contact-details">
                    <h4>{t('address')}</h4>
                    <p>{getCompanyAddress()}</p>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="contact-icon">
                    <Phone size={24} />
                  </div>
                  <div className="contact-details">
                    <h4>{t('phone')}</h4>
                    <p>{companyInfo.phone}</p>
                    <button 
                      className="contact-action-btn"
                      onClick={handleCallClick}
                    >
                      {t('callUs')}
                    </button>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="contact-icon">
                    <Mail size={24} />
                  </div>
                  <div className="contact-details">
                    <h4>{t('email')}</h4>
                    <p>{companyInfo.email}</p>
                    <button 
                      className="contact-action-btn"
                      onClick={handleEmailClick}
                    >
                      Send Email
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-section">
              <h3>Business Hours</h3>
              <div className="business-hours">
                <div className="hours-item">
                  <span className="day">Monday - Friday</span>
                  <span className="time">9:00 AM - 8:00 PM</span>
                </div>
                <div className="hours-item">
                  <span className="day">Saturday</span>
                  <span className="time">10:00 AM - 6:00 PM</span>
                </div>
                <div className="hours-item">
                  <span className="day">Sunday</span>
                  <span className="time">10:00 AM - 4:00 PM</span>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-qr-section">
            <div className="qr-container">
              <div className="qr-card">
                <div className="qr-header">
                  <MessageCircle size={32} />
                  <h3>{t('whatsappContact')}</h3>
                </div>
                <div className="qr-image-container">
                  <img src={qrCodeImage} alt="WhatsApp QR Code" className="qr-image" />
                </div>
                <p className="qr-description">{t('scanWhatsApp')}</p>
                <button 
                  className="btn btn-primary qr-action-btn"
                  onClick={handleWhatsAppClick}
                >
                  <MessageCircle size={20} />
                  Open WhatsApp
                </button>
              </div>

              <div className="qr-card">
                <div className="qr-header">
                  <Phone size={32} />
                  <h3>Call QR Code</h3>
                </div>
                <div className="qr-image-container">
                  <img src={qrCodeImage} alt="Call QR Code" className="qr-image" />
                </div>
                <p className="qr-description">Scan to call directly</p>
                <button 
                  className="btn btn-secondary qr-action-btn"
                  onClick={handleCallClick}
                >
                  <Phone size={20} />
                  {t('callUs')}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-form-section">
          <h3>Send us a Message</h3>
          <form className="contact-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" required />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input type="tel" id="phone" name="phone" />
            </div>
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input type="text" id="subject" name="subject" required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows={5} required></textarea>
            </div>
            <button type="submit" className="btn btn-primary form-submit-btn">
              Send Message
            </button>
          </form>
        </div>

        <div className="social-media-section">
          <h3>Follow Us</h3>
          <div className="social-links">
            <a href={companyInfo.socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="social-link facebook">
              Facebook
            </a>
            <a href={companyInfo.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="social-link instagram">
              Instagram
            </a>
            <a href={companyInfo.socialMedia.twitter} target="_blank" rel="noopener noreferrer" className="social-link twitter">
              Twitter
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
