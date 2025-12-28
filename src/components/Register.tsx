import { useState } from 'react';
import { X, User, Lock, Mail, Phone, MapPin, UserPlus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

function Register() {
  const { state, register, hideRegisterForm, showLoginForm } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Validate password strength
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setIsLoading(true);

    // Simulate loading time
    setTimeout(() => {
      const success = register({
        username: formData.username,
        password: formData.password,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
      });
      
      if (!success) {
        setError('Username or email already exists');
      } else {
        // Reset form on success
        setFormData({
          username: '',
          password: '',
          confirmPassword: '',
          name: '',
          email: '',
          phone: '',
          address: '',
        });
      }
      
      setIsLoading(false);
    }, 500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setError(''); // Clear error when user types
  };

  if (!state.showRegister) {
    return null;
  }

  return (
    <div className="login-overlay">
      <div className="login-modal register-modal">
        <div className="login-header">
          <h2 className="login-title">
            <UserPlus size={24} />
            Create Account
          </h2>
          <button
            className="login-close"
            onClick={hideRegisterForm}
            type="button"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="login-form register-form">
          {error && (
            <div className="login-error">
              {error}
            </div>
          )}

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                <User size={16} />
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter your full name"
                required
              />
            </div>

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
                placeholder="Choose a username"
                required
                minLength={3}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              <Mail size={16} />
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter your email address"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone" className="form-label">
              <Phone size={16} />
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter your phone number"
            />
          </div>

          <div className="form-row">
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
                placeholder="Create a password"
                required
                minLength={6}
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">
                <Lock size={16} />
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="form-input"
                placeholder="Confirm your password"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="address" className="form-label">
              <MapPin size={16} />
              Address
            </label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter your address (optional)"
              rows={3}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`login-button ${isLoading ? 'loading' : ''}`}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>

          <div className="auth-switch">
            <p>
              Already have an account?{' '}
              <button
                type="button"
                className="auth-switch-button"
                onClick={() => {
                  hideRegisterForm();
                  showLoginForm();
                }}
              >
                Sign In
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
