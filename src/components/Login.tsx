import { useState } from 'react';
import { X, User, Lock, LogIn, Info } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { companyInfo } from '../data/company';

function Login() {
  const { state, login, hideLoginForm, showRegisterForm } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rememberMe: false,
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate loading time
    setTimeout(() => {
      const success = login(formData.username, formData.password, formData.rememberMe);
      
      if (!success) {
        setError('Invalid username or password');
      }
      
      setIsLoading(false);
    }, 500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
    setError(''); // Clear error when user types
  };

  // Demo credentials functions
  const fillUserCredentials = () => {
    setFormData(prev => ({
      ...prev,
      username: 'user@example.com',
      password: 'user123'
    }));
    setError('');
  };

  const fillAdminCredentials = () => {
    setFormData(prev => ({
      ...prev,
      username: 'admin@example.com',
      password: 'admin123'
    }));
    setError('');
  };

  if (!state.showLogin) {
    return null;
  }

  return (
    <div className="login-overlay">
      <div className="login-modal">
        <div className="login-header">
          <h2 className="login-title">
            <LogIn size={24} />
            Admin/Employee Login
          </h2>
          <button
            className="login-close"
            onClick={hideLoginForm}
            type="button"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && (
            <div className="login-error">
              {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="username" className="form-label">
              <User size={16} />
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              <Lock size={16} />
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="form-group form-checkbox">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="checkbox-input"
              />
              <span className="checkbox-text">Remember Me</span>
            </label>
            <small className="checkbox-help">
              Stay logged in even after closing the browser
            </small>
          </div>

          {/* Demo Credentials Section */}
          {companyInfo.authSettings.showDemoCredentials && (
            <div className="demo-credentials">
              <div className="demo-header">
                <Info size={16} />
                <span>Demo Credentials</span>
              </div>
              <p className="demo-description">
                Use these credentials to test the application:
              </p>
              <div className="demo-buttons">
                <button
                  type="button"
                  className="demo-button demo-user"
                  onClick={fillUserCredentials}
                >
                  👤 User Account
                  <small>user@example.com / user123</small>
                </button>
                <button
                  type="button"
                  className="demo-button demo-admin"
                  onClick={fillAdminCredentials}
                >
                  👑 Admin Account
                  <small>admin@example.com / admin123</small>
                </button>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={`login-button ${isLoading ? 'loading' : ''}`}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>

          <div className="auth-switch">
            <p>
              Don't have an account?{' '}
              <button
                type="button"
                className="auth-switch-button"
                onClick={() => {
                  hideLoginForm();
                  showRegisterForm();
                }}
              >
                Sign Up
              </button>
            </p>
          </div>

          {companyInfo.authSettings.showDemoCredentials && (
            <div className="login-info">
              <p><strong>Demo Credentials:</strong></p>
              <p>Admin: username: <code>admin</code>, password: <code>admin123</code></p>
              <p>Employee: username: <code>employee1</code>, password: <code>emp123</code></p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Login;
