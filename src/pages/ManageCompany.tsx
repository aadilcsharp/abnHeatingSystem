import { useState, useEffect } from 'react';
import { Save, Building, Globe, Phone, MessageCircle, Share2, Palette, Calculator, Menu, Shield, Home } from 'lucide-react';
import { CompanyInfo } from '../data/company';
import { dataService } from '../data/dataService';
import { useAuth } from '../context/AuthContext';
import { themes } from '../context/ThemeContext';
import { useCompanySettings } from '../hooks/useCompanySettings';
import { saveCompanyToFile } from '../utils/companyFileSaver';

function ManageCompany() {
  const { state } = useAuth();
  const { applyCompanyDefaults } = useCompanySettings();
  const [companyData, setCompanyData] = useState<CompanyInfo>({
    name: '',
    nameHi: '',
    nameUr: '',
    nameAr: '',
    logo: '',
    tagline: '',
    taglineHi: '',
    taglineUr: '',
    taglineAr: '',
    description: '',
    descriptionHi: '',
    descriptionUr: '',
    descriptionAr: '',
    address: '',
    addressHi: '',
    addressUr: '',
    addressAr: '',
    phone: '',
    email: '',
    website: '',
    paymentQR: '',
    whatsappQR: '',
    whatsappNumber: '',
    whatsappMessage: '',
    whatsappMessageHi: '',
    whatsappMessageUr: '',
    whatsappMessageAr: '',
    socialMedia: {
      facebook: '',
      instagram: '',
      twitter: ''
    },
    defaultTheme: 'gradient-blue',
    defaultLanguage: 'en',
    taxSettings: {
      enableGST: true,
      gstRate: 18
    },
    shippingSettings: {
      enableShipping: true,
      freeShippingThreshold: 2999,
      shippingCharge: 99
    },
    navigationSettings: {
      enableHome: true,
      enableProducts: true,
      enableAbout: true,
      enableContact: true,
      enableCart: true
    },
    authSettings: {
      enableLogin: true,
      enableSignup: true,
      showDemoCredentials: true
    },
    homePageSettings: {
      showHeroSection: true,
      showTrendingSection: true,
      sectionOrder: 'hero-second'
    }
  });

  useEffect(() => {
    // Load current company data
    const currentCompanyData = dataService.getCompanyInfo();
    setCompanyData(currentCompanyData);
  }, []);

  // Redirect if not admin
  if (!state.isAuthenticated || state.user?.role !== 'admin') {
    return (
      <div className="manage-container">
        <div className="access-denied">
          <h2>Access Denied</h2>
          <p>Only administrators can access company management.</p>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!companyData.name || !companyData.email || !companyData.phone) {
      alert('Please fill in all required fields (Name, Email, Phone)');
      return;
    }

    // Update in-memory data and save to file
    dataService.updateCompanyInfo(companyData);
    saveCompanyToFile(companyData);
    
    // Apply the new default theme and language immediately
    applyCompanyDefaults();
    
    alert('Company information updated successfully! The new default theme and language have been applied.\n\nA new company.ts file has been downloaded. Please replace the existing file in your project to make changes permanent.');
  };

  const handleInputChange = (field: keyof CompanyInfo, value: string) => {
    if (field === 'socialMedia') return; // Handle social media separately
    
    setCompanyData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSocialMediaChange = (platform: keyof CompanyInfo['socialMedia'], value: string) => {
    setCompanyData(prev => ({
      ...prev,
      socialMedia: {
        ...prev.socialMedia,
        [platform]: value
      }
    }));
  };

  return (
    <div className="manage-container">
      <div className="manage-header">
        <Building size={32} />
        <h1>Manage Company Information</h1>
        <p>Update company details and contact information</p>
        
        <div className="file-save-notice" style={{ 
          backgroundColor: 'var(--color-accent-light)', 
          border: '1px solid var(--color-accent)', 
          borderRadius: '8px', 
          padding: '15px', 
          margin: '20px 0',
          fontSize: '0.9rem'
        }}>
          <strong>📁 File Saving Notice:</strong> When you save changes, a new <code>company.ts</code> file will be downloaded. 
          Replace the existing file in your project to make changes permanent.
        </div>
      </div>

      <form onSubmit={handleSubmit} className="company-form">
        {/* Basic Information */}
        <div className="form-section">
          <h3><Building size={20} /> Basic Information</h3>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Company Name *</label>
              <input
                type="text"
                id="name"
                value={companyData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="logo">Logo/Emoji</label>
              <input
                type="text"
                id="logo"
                value={companyData.logo}
                onChange={(e) => handleInputChange('logo', e.target.value)}
                placeholder="⚡"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="nameHi">Company Name (Hindi)</label>
              <input
                type="text"
                id="nameHi"
                value={companyData.nameHi}
                onChange={(e) => handleInputChange('nameHi', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="nameUr">Company Name (Urdu)</label>
              <input
                type="text"
                id="nameUr"
                value={companyData.nameUr}
                onChange={(e) => handleInputChange('nameUr', e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="nameAr">Company Name (Arabic)</label>
            <input
              type="text"
              id="nameAr"
              value={companyData.nameAr}
              onChange={(e) => handleInputChange('nameAr', e.target.value)}
            />
          </div>
        </div>

        {/* Taglines */}
        <div className="form-section">
          <h3><Globe size={20} /> Taglines</h3>
          
          <div className="form-group">
            <label htmlFor="tagline">Tagline (English)</label>
            <input
              type="text"
              id="tagline"
              value={companyData.tagline}
              onChange={(e) => handleInputChange('tagline', e.target.value)}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="taglineHi">Tagline (Hindi)</label>
              <input
                type="text"
                id="taglineHi"
                value={companyData.taglineHi}
                onChange={(e) => handleInputChange('taglineHi', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="taglineUr">Tagline (Urdu)</label>
              <input
                type="text"
                id="taglineUr"
                value={companyData.taglineUr}
                onChange={(e) => handleInputChange('taglineUr', e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="taglineAr">Tagline (Arabic)</label>
            <input
              type="text"
              id="taglineAr"
              value={companyData.taglineAr}
              onChange={(e) => handleInputChange('taglineAr', e.target.value)}
            />
          </div>
        </div>

        {/* Descriptions */}
        <div className="form-section">
          <h3>Company Description</h3>
          
          <div className="form-group">
            <label htmlFor="description">Description (English)</label>
            <textarea
              id="description"
              value={companyData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={3}
            />
          </div>

          <div className="form-group">
            <label htmlFor="descriptionHi">Description (Hindi)</label>
            <textarea
              id="descriptionHi"
              value={companyData.descriptionHi}
              onChange={(e) => handleInputChange('descriptionHi', e.target.value)}
              rows={3}
            />
          </div>

          <div className="form-group">
            <label htmlFor="descriptionUr">Description (Urdu)</label>
            <textarea
              id="descriptionUr"
              value={companyData.descriptionUr}
              onChange={(e) => handleInputChange('descriptionUr', e.target.value)}
              rows={3}
            />
          </div>

          <div className="form-group">
            <label htmlFor="descriptionAr">Description (Arabic)</label>
            <textarea
              id="descriptionAr"
              value={companyData.descriptionAr}
              onChange={(e) => handleInputChange('descriptionAr', e.target.value)}
              rows={3}
            />
          </div>
        </div>

        {/* Contact Information */}
        <div className="form-section">
          <h3><Phone size={20} /> Contact Information</h3>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="phone">Phone Number *</label>
              <input
                type="tel"
                id="phone"
                value={companyData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                value={companyData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="website">Website</label>
            <input
              type="url"
              id="website"
              value={companyData.website}
              onChange={(e) => handleInputChange('website', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Address (English)</label>
            <textarea
              id="address"
              value={companyData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              rows={2}
            />
          </div>

          <div className="form-group">
            <label htmlFor="addressHi">Address (Hindi)</label>
            <textarea
              id="addressHi"
              value={companyData.addressHi}
              onChange={(e) => handleInputChange('addressHi', e.target.value)}
              rows={2}
            />
          </div>

          <div className="form-group">
            <label htmlFor="addressUr">Address (Urdu)</label>
            <textarea
              id="addressUr"
              value={companyData.addressUr}
              onChange={(e) => handleInputChange('addressUr', e.target.value)}
              rows={2}
            />
          </div>

          <div className="form-group">
            <label htmlFor="addressAr">Address (Arabic)</label>
            <textarea
              id="addressAr"
              value={companyData.addressAr}
              onChange={(e) => handleInputChange('addressAr', e.target.value)}
              rows={2}
            />
          </div>
        </div>

        {/* WhatsApp Information */}
        <div className="form-section">
          <h3><MessageCircle size={20} /> WhatsApp</h3>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="whatsappNumber">WhatsApp Number</label>
              <input
                type="tel"
                id="whatsappNumber"
                value={companyData.whatsappNumber}
                onChange={(e) => handleInputChange('whatsappNumber', e.target.value)}
                placeholder="919876543210"
              />
            </div>
            <div className="form-group">
              <label htmlFor="whatsappQR">WhatsApp QR Code</label>
              <input
                type="text"
                id="whatsappQR"
                value={companyData.whatsappQR}
                onChange={(e) => handleInputChange('whatsappQR', e.target.value)}
                placeholder="whatsapp-qr.png"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="whatsappMessage">WhatsApp Message (English)</label>
            <textarea
              id="whatsappMessage"
              value={companyData.whatsappMessage}
              onChange={(e) => handleInputChange('whatsappMessage', e.target.value)}
              rows={2}
            />
          </div>

          <div className="form-group">
            <label htmlFor="whatsappMessageHi">WhatsApp Message (Hindi)</label>
            <textarea
              id="whatsappMessageHi"
              value={companyData.whatsappMessageHi}
              onChange={(e) => handleInputChange('whatsappMessageHi', e.target.value)}
              rows={2}
            />
          </div>

          <div className="form-group">
            <label htmlFor="whatsappMessageUr">WhatsApp Message (Urdu)</label>
            <textarea
              id="whatsappMessageUr"
              value={companyData.whatsappMessageUr}
              onChange={(e) => handleInputChange('whatsappMessageUr', e.target.value)}
              rows={2}
            />
          </div>

          <div className="form-group">
            <label htmlFor="whatsappMessageAr">WhatsApp Message (Arabic)</label>
            <textarea
              id="whatsappMessageAr"
              value={companyData.whatsappMessageAr}
              onChange={(e) => handleInputChange('whatsappMessageAr', e.target.value)}
              rows={2}
            />
          </div>
        </div>

        {/* Social Media */}
        <div className="form-section">
          <h3><Share2 size={20} /> Social Media</h3>
          
          <div className="form-group">
            <label htmlFor="facebook">Facebook URL</label>
            <input
              type="url"
              id="facebook"
              value={companyData.socialMedia.facebook}
              onChange={(e) => handleSocialMediaChange('facebook', e.target.value)}
              placeholder="https://facebook.com/company"
            />
          </div>

          <div className="form-group">
            <label htmlFor="instagram">Instagram URL</label>
            <input
              type="url"
              id="instagram"
              value={companyData.socialMedia.instagram}
              onChange={(e) => handleSocialMediaChange('instagram', e.target.value)}
              placeholder="https://instagram.com/company"
            />
          </div>

          <div className="form-group">
            <label htmlFor="twitter">Twitter URL</label>
            <input
              type="url"
              id="twitter"
              value={companyData.socialMedia.twitter}
              onChange={(e) => handleSocialMediaChange('twitter', e.target.value)}
              placeholder="https://twitter.com/company"
            />
          </div>
        </div>

        {/* Global App Settings */}
        <div className="form-section">
          <h3><Palette size={20} /> Global App Settings</h3>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="defaultTheme">Default Theme for All Users</label>
              <select
                id="defaultTheme"
                value={companyData.defaultTheme}
                onChange={(e) => handleInputChange('defaultTheme', e.target.value)}
              >
                {themes.map((theme) => (
                  <option key={theme.id} value={theme.id}>
                    {theme.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="defaultLanguage">Default Language for All Users</label>
              <select
                id="defaultLanguage"
                value={companyData.defaultLanguage}
                onChange={(e) => handleInputChange('defaultLanguage', e.target.value)}
              >
                <option value="en">English</option>
                <option value="hi">हिंदी (Hindi)</option>
                <option value="ur">اردو (Urdu)</option>
                <option value="ar">العربية (Arabic)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tax & Shipping Settings */}
        <div className="form-section">
          <h3><Calculator size={20} /> Tax & Shipping Settings</h3>
          
          {/* GST Settings */}
          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={companyData.taxSettings.enableGST}
                onChange={(e) => setCompanyData(prev => ({
                  ...prev,
                  taxSettings: {
                    ...prev.taxSettings,
                    enableGST: e.target.checked
                  }
                }))}
              />
              Enable GST Calculation
            </label>
          </div>

          {companyData.taxSettings.enableGST && (
            <div className="form-group">
              <label htmlFor="gstRate">GST Rate (%)</label>
              <input
                type="number"
                id="gstRate"
                min="0"
                max="100"
                step="0.1"
                value={companyData.taxSettings.gstRate}
                onChange={(e) => setCompanyData(prev => ({
                  ...prev,
                  taxSettings: {
                    ...prev.taxSettings,
                    gstRate: parseFloat(e.target.value) || 0
                  }
                }))}
                placeholder="18"
              />
            </div>
          )}

          {/* Shipping Settings */}
          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={companyData.shippingSettings.enableShipping}
                onChange={(e) => setCompanyData(prev => ({
                  ...prev,
                  shippingSettings: {
                    ...prev.shippingSettings,
                    enableShipping: e.target.checked
                  }
                }))}
              />
              Enable Shipping Charges
            </label>
          </div>

          {companyData.shippingSettings.enableShipping && (
            <>
              <div className="form-group">
                <label htmlFor="shippingCharge">Shipping Charge (₹)</label>
                <input
                  type="number"
                  id="shippingCharge"
                  min="0"
                  value={companyData.shippingSettings.shippingCharge}
                  onChange={(e) => setCompanyData(prev => ({
                    ...prev,
                    shippingSettings: {
                      ...prev.shippingSettings,
                      shippingCharge: parseFloat(e.target.value) || 0
                    }
                  }))}
                  placeholder="99"
                />
              </div>

              <div className="form-group">
                <label htmlFor="freeShippingThreshold">Free Shipping Above (₹)</label>
                <input
                  type="number"
                  id="freeShippingThreshold"
                  min="0"
                  value={companyData.shippingSettings.freeShippingThreshold}
                  onChange={(e) => setCompanyData(prev => ({
                    ...prev,
                    shippingSettings: {
                      ...prev.shippingSettings,
                      freeShippingThreshold: parseFloat(e.target.value) || 0
                    }
                  }))}
                  placeholder="2999"
                />
              </div>
            </>
          )}
        </div>

        {/* Navigation Settings */}
        <div className="form-section">
          <h3><Menu size={20} /> Navigation Settings</h3>
          <p style={{ marginBottom: '20px', color: 'var(--color-text-muted)' }}>
            Control which navigation items are visible to users
          </p>
          
          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={companyData.navigationSettings.enableHome}
                onChange={(e) => setCompanyData(prev => ({
                  ...prev,
                  navigationSettings: {
                    ...prev.navigationSettings,
                    enableHome: e.target.checked
                  }
                }))}
              />
              Enable Home Page
            </label>
          </div>

          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={companyData.navigationSettings.enableProducts}
                onChange={(e) => setCompanyData(prev => ({
                  ...prev,
                  navigationSettings: {
                    ...prev.navigationSettings,
                    enableProducts: e.target.checked
                  }
                }))}
              />
              Enable Products Page
            </label>
          </div>

          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={companyData.navigationSettings.enableAbout}
                onChange={(e) => setCompanyData(prev => ({
                  ...prev,
                  navigationSettings: {
                    ...prev.navigationSettings,
                    enableAbout: e.target.checked
                  }
                }))}
              />
              Enable About Page
            </label>
          </div>

          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={companyData.navigationSettings.enableContact}
                onChange={(e) => setCompanyData(prev => ({
                  ...prev,
                  navigationSettings: {
                    ...prev.navigationSettings,
                    enableContact: e.target.checked
                  }
                }))}
              />
              Enable Contact Page
            </label>
          </div>

          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={companyData.navigationSettings.enableCart}
                onChange={(e) => setCompanyData(prev => ({
                  ...prev,
                  navigationSettings: {
                    ...prev.navigationSettings,
                    enableCart: e.target.checked
                  }
                }))}
              />
              Enable Cart/Shopping
            </label>
          </div>
        </div>

        {/* Authentication Settings */}
        <div className="form-section">
          <h3><Shield size={20} /> Authentication Settings</h3>
          <p style={{ marginBottom: '20px', color: 'var(--color-text-muted)' }}>
            Control user authentication features
          </p>
          
          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={companyData.authSettings.enableLogin}
                onChange={(e) => setCompanyData(prev => ({
                  ...prev,
                  authSettings: {
                    ...prev.authSettings,
                    enableLogin: e.target.checked
                  }
                }))}
              />
              Enable Login/Sign In
            </label>
          </div>

          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={companyData.authSettings.enableSignup}
                onChange={(e) => setCompanyData(prev => ({
                  ...prev,
                  authSettings: {
                    ...prev.authSettings,
                    enableSignup: e.target.checked
                  }
                }))}
              />
              Enable Sign Up/Registration
            </label>
          </div>
          
          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={companyData.authSettings.showDemoCredentials}
                onChange={(e) => setCompanyData(prev => ({
                  ...prev,
                  authSettings: {
                    ...prev.authSettings,
                    showDemoCredentials: e.target.checked
                  }
                }))}
              />
              Show Demo Credentials on Login Page
            </label>
          </div>
          
          <div style={{ 
            backgroundColor: 'var(--color-warning-light)', 
            border: '1px solid var(--color-warning)', 
            borderRadius: '6px', 
            padding: '12px', 
            marginTop: '15px',
            fontSize: '0.85rem'
          }}>
            <strong>⚠️ Note:</strong> Disabling login will hide login buttons but won't log out current users. 
            Disabling signup will prevent new user registrations. Demo credentials help users test the application quickly.
          </div>
        </div>

        {/* Home Page Settings */}
        <div className="form-section">
          <h3><Home size={20} /> Home Page Settings</h3>
          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={companyData.homePageSettings.showHeroSection}
                onChange={(e) => setCompanyData(prev => ({
                  ...prev,
                  homePageSettings: {
                    ...prev.homePageSettings,
                    showHeroSection: e.target.checked
                  }
                }))}
              />
              Show Hero/Banner Section
            </label>
          </div>
          
          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={companyData.homePageSettings.showTrendingSection}
                onChange={(e) => setCompanyData(prev => ({
                  ...prev,
                  homePageSettings: {
                    ...prev.homePageSettings,
                    showTrendingSection: e.target.checked
                  }
                }))}
              />
              Show Trending Products Section
            </label>
          </div>
          
          <div className="form-group">
            <label htmlFor="sectionOrder">Section Display Order</label>
            <select
              id="sectionOrder"
              value={companyData.homePageSettings.sectionOrder}
              onChange={(e) => setCompanyData(prev => ({
                ...prev,
                homePageSettings: {
                  ...prev.homePageSettings,
                  sectionOrder: e.target.value as 'trending-first' | 'hero-second'
                }
              }))}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid var(--color-border)',
                borderRadius: '0.5rem',
                fontSize: '1rem',
                backgroundColor: 'var(--color-surface)'
              }}
            >
              <option value="hero-second">Show Hero/Banner Section First</option>
              <option value="trending-first">Show Trending Products Section First</option>
            </select>
          </div>
          
          <div style={{ 
            backgroundColor: 'var(--color-info-light)', 
            border: '1px solid var(--color-info)', 
            borderRadius: '6px', 
            padding: '12px', 
            marginTop: '15px',
            fontSize: '0.85rem'
          }}>
            <strong>ℹ️ Info:</strong> These settings control the visibility and order of major sections on the home page. 
            Changes will be reflected immediately after saving.
          </div>
        </div>

        {/* Payment Information */}
        <div className="form-section">
          <h3>Payment Information</h3>
          
          <div className="form-group">
            <label htmlFor="paymentQR">Payment QR Code</label>
            <input
              type="text"
              id="paymentQR"
              value={companyData.paymentQR}
              onChange={(e) => handleInputChange('paymentQR', e.target.value)}
              placeholder="payment-qr.png"
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="save-button">
            <Save size={20} />
            Update Company Information
          </button>
        </div>
      </form>
    </div>
  );
}

export default ManageCompany;
