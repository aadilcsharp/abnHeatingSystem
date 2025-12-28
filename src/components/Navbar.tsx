import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Globe, ShoppingCart, Menu, X, Palette, Zap, LogIn, LogOut, Settings, Users, Package, Building, PlayCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useTheme, themes } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { companyInfo } from '../data/company';

function Navbar() {
  const { t, i18n } = useTranslation();
  const { state } = useCart();
  const { state: themeState, setTheme } = useTheme();
  const { state: authState, logout, showLoginForm, showRegisterForm } = useAuth();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isAdminMenuOpen, setIsAdminMenuOpen] = React.useState(false);

  const languages = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
    { code: 'ur', name: 'Urdu', nativeName: 'اردو' },
    { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
  ];

  const changeLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode);
  };

  const isActivePage = (path: string) => {
    return location.pathname === path;
  };

  const getCompanyName = () => {
    switch (i18n.language) {
      case 'hi': return companyInfo.nameHi;
      case 'ur': return companyInfo.nameUr;
      case 'ar': return companyInfo.nameAr;
      default: return companyInfo.name;
    }
  };

  const navItems = [
    { path: '/', label: t('home'), enabled: companyInfo.navigationSettings.enableHome },
    { path: '/products', label: t('products'), enabled: companyInfo.navigationSettings.enableProducts },
    { path: '/about', label: t('about'), enabled: companyInfo.navigationSettings.enableAbout },
    { path: '/contact', label: t('contact'), enabled: companyInfo.navigationSettings.enableContact },
  ].filter(item => item.enabled); // Only show enabled items

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <span className="nav-logo-icon">
            <Zap size={24} />
          </span>
          <span className="logo-text">{getCompanyName()}</span>
        </Link>

        <div className="nav-menu-container">
          <div className={`nav-menu ${isMenuOpen ? 'nav-menu-open' : ''}`}>
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link ${isActivePage(item.path) ? 'nav-link-active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="nav-actions">
            {/* Admin Menu (only show if authenticated) */}
            {authState.isAuthenticated && (
              <div className="admin-menu">
                <button
                  className="admin-button"
                  onClick={() => setIsAdminMenuOpen(!isAdminMenuOpen)}
                >
                  <Settings size={20} />
                  <span className="admin-text">
                    {authState.user?.role === 'admin' ? 'Admin' : 'Employee'}
                  </span>
                </button>
                {isAdminMenuOpen && (
                  <div className="admin-dropdown">
                    {/* Management Section - Admin Only */}
                    {authState.user?.role === 'admin' && (
                      <>
                        <div className="admin-section-header">
                          <Settings size={14} />
                          <span>Management</span>
                        </div>
                        <Link
                          to="/manage-products"
                          className="admin-option"
                          onClick={() => setIsAdminMenuOpen(false)}
                        >
                          <Package size={16} />
                          <span>Products</span>
                        </Link>
                        <Link
                          to="/manage-users"
                          className="admin-option"
                          onClick={() => setIsAdminMenuOpen(false)}
                        >
                          <Users size={16} />
                          <span>Users</span>
                        </Link>
                        <Link
                          to="/manage-company"
                          className="admin-option"
                          onClick={() => setIsAdminMenuOpen(false)}
                        >
                          <Building size={16} />
                          <span>Company</span>
                        </Link>
                        <Link
                          to="/product-slideshow"
                          className="admin-option"
                          onClick={() => setIsAdminMenuOpen(false)}
                        >
                          <PlayCircle size={16} />
                          <span>Slideshow</span>
                        </Link>
                        <div className="admin-divider"></div>
                      </>
                    )}
                    
                    {/* Orders Section - Available to both admin and employees */}
                    <div className="admin-section-header">
                      <Package size={14} />
                      <span>Operations</span>
                    </div>
                    <Link
                      to="/manage-orders"
                      className="admin-option"
                      onClick={() => setIsAdminMenuOpen(false)}
                    >
                      <Package size={16} />
                      <span>Manage Orders</span>
                    </Link>
                    <div className="admin-divider"></div>
                    
                    {/* Customization Section */}
                    <div className="admin-section-header">
                      <Palette size={14} />
                      <span>Preferences</span>
                    </div>
                    
                    {/* Theme Options */}
                    <div className="admin-submenu">
                      <div className="admin-submenu-header">
                        <Palette size={14} />
                        <span>Theme</span>
                      </div>
                      <div className="theme-options">
                        {themes.map((theme) => (
                          <button
                            key={theme.id}
                            className={`theme-option-compact ${themeState.currentTheme.id === theme.id ? 'active' : ''}`}
                            onClick={() => setTheme(theme.id)}
                          >
                            <div 
                              className="theme-preview-small" 
                              style={{ background: theme.colors.gradient }}
                            ></div>
                            <span>{theme.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Language Options */}
                    <div className="admin-submenu">
                      <div className="admin-submenu-header">
                        <Globe size={14} />
                        <span>Language</span>
                      </div>
                      <div className="language-options">
                        {languages.map((lang) => (
                          <button
                            key={lang.code}
                            className={`lang-option-compact ${i18n.language === lang.code ? 'active' : ''}`}
                            onClick={() => changeLanguage(lang.code)}
                          >
                            <span className="lang-native">{lang.nativeName}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="admin-divider"></div>
                    <button
                      className="admin-option logout-option"
                      onClick={() => {
                        logout();
                        setIsAdminMenuOpen(false);
                      }}
                    >
                      <LogOut size={16} />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Login/Register Buttons (only show if not authenticated and enabled by admin) */}
            {!authState.isAuthenticated && (companyInfo.authSettings.enableLogin || companyInfo.authSettings.enableSignup) && (
              <div className="auth-buttons">
                {companyInfo.authSettings.enableSignup && (
                  <button
                    className="register-button"
                    onClick={showRegisterForm}
                  >
                    <span className="register-text">Sign Up</span>
                  </button>
                )}
                {companyInfo.authSettings.enableLogin && (
                  <button
                    className="login-button"
                    onClick={showLoginForm}
                  >
                    <LogIn size={20} />
                    <span className="login-text">Login</span>
                  </button>
                )}
              </div>
            )}

            {/* Cart */}
            {companyInfo.navigationSettings.enableCart && (
              <Link to="/cart" className="cart-button">
                <div className="cart-icon-container">
                  <ShoppingCart size={20} />
                  {state.itemCount > 0 && (
                    <span className="cart-badge">{state.itemCount}</span>
                  )}
                </div>
                <span className="cart-text">{t('cart')}</span>
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button
              className="mobile-menu-toggle"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
