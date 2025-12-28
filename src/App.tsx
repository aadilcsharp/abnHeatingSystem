import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import NotificationContainer from './components/NotificationContainer';
import { useCompanySettings } from './hooks/useCompanySettings';
import { companyInfo } from './data/company';
import './utils/debugOrders'; // Debug utility for orders
import './utils/orderFileDemo'; // Order file demonstration
import './utils/ordersFileUpdater'; // Orders file updater utility
import './utils/orderFileSaver'; // Order file saver utility
import './utils/userFileSaver'; // User file saver utility
import './utils/userRegistrationDemo'; // User registration demo
import './utils/companyFileSaver'; // Company file saver utility
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './components/Login';
import Register from './components/Register';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import Payment from './pages/Payment';
import ManageProducts from './pages/ManageProducts';
import ManageUsers from './pages/ManageUsers';
import ManageCompany from './pages/ManageCompany';
import ManageOrders from './pages/ManageOrders';
import ProductSlideshow from './pages/ProductSlideshow';
import './utils/i18n';
import './App.css';

function AppContent() {
  const { i18n } = useTranslation();
  
  // Apply company default settings
  useCompanySettings();

  // Set document direction based on language
  React.useEffect(() => {
    const isRTL = i18n.language === 'ar' || i18n.language === 'ur';
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="main-content">
          <Routes>
            {companyInfo.navigationSettings.enableHome && <Route path="/" element={<Home />} />}
            {companyInfo.navigationSettings.enableProducts && <Route path="/products" element={<Products />} />}
            {companyInfo.navigationSettings.enableProducts && <Route path="/product/:id" element={<ProductDetail />} />}
            {companyInfo.navigationSettings.enableAbout && <Route path="/about" element={<About />} />}
            {companyInfo.navigationSettings.enableContact && <Route path="/contact" element={<Contact />} />}
            {companyInfo.navigationSettings.enableCart && <Route path="/cart" element={<Cart />} />}
            {companyInfo.navigationSettings.enableCart && <Route path="/payment" element={<Payment />} />}
            
            {/* Admin routes - always available regardless of navigation settings */}
            <Route path="/manage-products" element={<ManageProducts />} />
            <Route path="/manage-users" element={<ManageUsers />} />
            <Route path="/manage-company" element={<ManageCompany />} />
            <Route path="/manage-orders" element={<ManageOrders />} />
            <Route path="/product-slideshow" element={<ProductSlideshow />} />
            
            {/* Fallback route - redirect to first enabled page */}
            {!companyInfo.navigationSettings.enableHome && companyInfo.navigationSettings.enableProducts && (
              <Route path="/" element={<Navigate to="/products" replace />} />
            )}
            {!companyInfo.navigationSettings.enableHome && !companyInfo.navigationSettings.enableProducts && companyInfo.navigationSettings.enableAbout && (
              <Route path="/" element={<Navigate to="/about" replace />} />
            )}
            {!companyInfo.navigationSettings.enableHome && !companyInfo.navigationSettings.enableProducts && !companyInfo.navigationSettings.enableAbout && companyInfo.navigationSettings.enableContact && (
              <Route path="/" element={<Navigate to="/contact" replace />} />
            )}
          </Routes>
        </main>
        <Footer />
        <Login />
        <Register />
        <NotificationContainer />
      </div>
    </Router>
  );
}

function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <AuthProvider>
          <NotificationProvider>
            <AppContent />
          </NotificationProvider>
        </AuthProvider>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
