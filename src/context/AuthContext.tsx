import { createContext, useContext, useReducer, ReactNode } from 'react';
import { User, users } from '../data/users';
import { saveUserToFile } from '../utils/userFileSaver';

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  showLogin: boolean;
  showRegister: boolean;
}

type AuthAction =
  | { type: 'LOGIN_SUCCESS'; user: User }
  | { type: 'LOGOUT' }
  | { type: 'SHOW_LOGIN' }
  | { type: 'HIDE_LOGIN' }
  | { type: 'SHOW_REGISTER' }
  | { type: 'HIDE_REGISTER' }
  | { type: 'REGISTER_SUCCESS'; user: User }
  | { type: 'INIT_FROM_STORAGE'; user: User };

// Load initial state from localStorage
const loadStoredAuth = (): AuthState => {
  try {
    const storedAuth = localStorage.getItem('eshop-auth');
    const sessionAuth = sessionStorage.getItem('eshop-auth-session');
    
    if (storedAuth) {
      const parsed = JSON.parse(storedAuth);
      return {
        isAuthenticated: true,
        user: parsed.user,
        showLogin: false,
        showRegister: false,
      };
    } else if (sessionAuth) {
      const parsed = JSON.parse(sessionAuth);
      return {
        isAuthenticated: true,
        user: parsed.user,
        showLogin: false,
        showRegister: false,
      };
    }
  } catch (error) {
    console.error('Error loading stored auth:', error);
  }
  
  return {
    isAuthenticated: false,
    user: null,
    showLogin: false,
    showRegister: false,
  };
};

const initialState: AuthState = loadStoredAuth();

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        user: action.user,
        showLogin: false,
        showRegister: false,
      };
    case 'REGISTER_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        user: action.user,
        showLogin: false,
        showRegister: false,
      };
    case 'INIT_FROM_STORAGE':
      return {
        ...state,
        isAuthenticated: true,
        user: action.user,
        showLogin: false,
        showRegister: false,
      };
    case 'LOGOUT':
      // Clear both localStorage and sessionStorage on logout
      localStorage.removeItem('eshop-auth');
      sessionStorage.removeItem('eshop-auth-session');
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        showLogin: false,
        showRegister: false,
      };
    case 'SHOW_LOGIN':
      return {
        ...state,
        showLogin: true,
        showRegister: false,
      };
    case 'HIDE_LOGIN':
      return {
        ...state,
        showLogin: false,
      };
    case 'SHOW_REGISTER':
      return {
        ...state,
        showRegister: true,
        showLogin: false,
      };
    case 'HIDE_REGISTER':
      return {
        ...state,
        showRegister: false,
      };
    default:
      return state;
  }
}

interface AuthContextType {
  state: AuthState;
  login: (username: string, password: string, rememberMe?: boolean) => boolean;
  register: (userData: {
    username: string;
    password: string;
    name: string;
    email: string;
    phone?: string;
    address?: string;
  }) => boolean;
  logout: () => void;
  showLoginForm: () => void;
  hideLoginForm: () => void;
  showRegisterForm: () => void;
  hideRegisterForm: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (username: string, password: string, rememberMe: boolean = false): boolean => {
    const user = users.find(
      (u) => u.username === username && u.password === password && u.isActive
    );

    if (user) {
      // Update last login time
      user.lastLogin = new Date().toISOString();
      
      // Store auth data based on rememberMe preference
      const authData = {
        user,
        timestamp: new Date().toISOString(),
        rememberMe
      };
      
      if (rememberMe) {
        // Store in localStorage (persists after browser close)
        localStorage.setItem('eshop-auth', JSON.stringify(authData));
        console.log('✅ Login saved to localStorage (Remember Me enabled)');
      } else {
        // Store in sessionStorage (cleared when browser closes)
        sessionStorage.setItem('eshop-auth-session', JSON.stringify(authData));
        console.log('✅ Login saved to sessionStorage (Remember Me disabled)');
      }
      
      dispatch({ type: 'LOGIN_SUCCESS', user });
      return true;
    }
    return false;
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const register = (userData: {
    username: string;
    password: string;
    name: string;
    email: string;
    phone?: string;
    address?: string;
  }): boolean => {
    // Check if username or email already exists
    const existingUser = users.find(
      (u) => u.username === userData.username || u.email === userData.email
    );

    if (existingUser) {
      return false;
    }

    // Use the file saver utility to save user to users.ts
    const newUser = saveUserToFile({
      username: userData.username,
      password: userData.password, // In production, this should be hashed
      role: 'customer',
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      address: userData.address,
      isActive: true,
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
    });

    console.log('🎉 USER SAVED TO USERS.TS!');
    console.log(`✅ User #${newUser.id} - ${newUser.name}`);
    console.log(`📁 Download the updated users.ts file using: downloadUsersFile()`);

    // Auto-login the user after registration
    const authData = {
      user: newUser,
      timestamp: new Date().toISOString(),
      rememberMe: false
    };

    // Store in sessionStorage by default for new registrations
    sessionStorage.setItem('eshop-auth-session', JSON.stringify(authData));
    console.log('✅ Registration successful, user logged in');

    dispatch({ type: 'REGISTER_SUCCESS', user: newUser });
    return true;
  };

  const showLoginForm = () => {
    dispatch({ type: 'SHOW_LOGIN' });
  };

  const hideLoginForm = () => {
    dispatch({ type: 'HIDE_LOGIN' });
  };

  const showRegisterForm = () => {
    dispatch({ type: 'SHOW_REGISTER' });
  };

  const hideRegisterForm = () => {
    dispatch({ type: 'HIDE_REGISTER' });
  };

  return (
    <AuthContext.Provider value={{
      state,
      login,
      register,
      logout,
      showLoginForm,
      hideLoginForm,
      showRegisterForm,
      hideRegisterForm,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
