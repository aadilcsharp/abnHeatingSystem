import React, { createContext, useContext, useReducer, useEffect } from 'react';
import type { ReactNode } from 'react';

export interface Theme {
  id: string;
  name: string;
  colors: {
    primary: string;
    primaryHover: string;
    secondary: string;
    secondaryHover: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    success: string;
    warning: string;
    error: string;
    gradient: string;
    gradientSecondary: string;
    navbarBg: string;
    cardBg: string;
  };
}

export const themes: Theme[] = [
  {
    id: 'default',
    name: 'Ocean Blue',
    colors: {
      primary: '#667eea',
      primaryHover: '#5a67d8',
      secondary: '#764ba2',
      secondaryHover: '#6b46c1',
      accent: '#f093fb',
      background: '#f8f9fa',
      surface: '#ffffff',
      text: '#333333',
      textSecondary: '#666666',
      border: '#e9ecef',
      success: '#28a745',
      warning: '#ffc107',
      error: '#f5576c',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      gradientSecondary: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      navbarBg: 'rgba(255, 255, 255, 0.95)',
      cardBg: '#ffffff'
    }
  },
  {
    id: 'sunset',
    name: 'Sunset Glow',
    colors: {
      primary: '#ff6b6b',
      primaryHover: '#ff5252',
      secondary: '#feca57',
      secondaryHover: '#ff9ff3',
      accent: '#48dbfb',
      background: '#fff5f5',
      surface: '#ffffff',
      text: '#2d3748',
      textSecondary: '#4a5568',
      border: '#fed7d7',
      success: '#68d391',
      warning: '#f6ad55',
      error: '#fc8181',
      gradient: 'linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)',
      gradientSecondary: 'linear-gradient(135deg, #48dbfb 0%, #ff9ff3 100%)',
      navbarBg: 'rgba(255, 245, 245, 0.95)',
      cardBg: '#ffffff'
    }
  },
  {
    id: 'forest',
    name: 'Forest Green',
    colors: {
      primary: '#38a169',
      primaryHover: '#2f855a',
      secondary: '#68d391',
      secondaryHover: '#48bb78',
      accent: '#4fd1c7',
      background: '#f0fff4',
      surface: '#ffffff',
      text: '#1a202c',
      textSecondary: '#4a5568',
      border: '#c6f6d5',
      success: '#48bb78',
      warning: '#ed8936',
      error: '#e53e3e',
      gradient: 'linear-gradient(135deg, #38a169 0%, #68d391 100%)',
      gradientSecondary: 'linear-gradient(135deg, #4fd1c7 0%, #38a169 100%)',
      navbarBg: 'rgba(240, 255, 244, 0.95)',
      cardBg: '#ffffff'
    }
  },
  {
    id: 'purple',
    name: 'Royal Purple',
    colors: {
      primary: '#805ad5',
      primaryHover: '#6b46c1',
      secondary: '#b794f6',
      secondaryHover: '#9f7aea',
      accent: '#ed64a6',
      background: '#faf5ff',
      surface: '#ffffff',
      text: '#1a202c',
      textSecondary: '#4a5568',
      border: '#e9d8fd',
      success: '#38a169',
      warning: '#d69e2e',
      error: '#e53e3e',
      gradient: 'linear-gradient(135deg, #805ad5 0%, #b794f6 100%)',
      gradientSecondary: 'linear-gradient(135deg, #ed64a6 0%, #805ad5 100%)',
      navbarBg: 'rgba(250, 245, 255, 0.95)',
      cardBg: '#ffffff'
    }
  },
  {
    id: 'dark',
    name: 'Dark Mode',
    colors: {
      primary: '#4299e1',
      primaryHover: '#3182ce',
      secondary: '#63b3ed',
      secondaryHover: '#4299e1',
      accent: '#ed64a6',
      background: '#1a202c',
      surface: '#2d3748',
      text: '#f7fafc',
      textSecondary: '#e2e8f0',
      border: '#4a5568',
      success: '#48bb78',
      warning: '#ed8936',
      error: '#f56565',
      gradient: 'linear-gradient(135deg, #4299e1 0%, #63b3ed 100%)',
      gradientSecondary: 'linear-gradient(135deg, #ed64a6 0%, #4299e1 100%)',
      navbarBg: 'rgba(45, 55, 72, 0.95)',
      cardBg: '#2d3748'
    }
  },
  {
    id: 'coral',
    name: 'Coral Reef',
    colors: {
      primary: '#f093fb',
      primaryHover: '#f5576c',
      secondary: '#4facfe',
      secondaryHover: '#00f2fe',
      accent: '#fad0c4',
      background: '#fff0f5',
      surface: '#ffffff',
      text: '#2d3748',
      textSecondary: '#4a5568',
      border: '#fbb6ce',
      success: '#38a169',
      warning: '#d69e2e',
      error: '#e53e3e',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      gradientSecondary: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      navbarBg: 'rgba(255, 240, 245, 0.95)',
      cardBg: '#ffffff'
    }
  },
  {
    id: 'autumn',
    name: 'Autumn Leaves',
    colors: {
      primary: '#ed8936',
      primaryHover: '#dd6b20',
      secondary: '#f6ad55',
      secondaryHover: '#ed8936',
      accent: '#fc8181',
      background: '#fffaf0',
      surface: '#ffffff',
      text: '#1a202c',
      textSecondary: '#4a5568',
      border: '#fbd38d',
      success: '#38a169',
      warning: '#d69e2e',
      error: '#e53e3e',
      gradient: 'linear-gradient(135deg, #ed8936 0%, #f6ad55 100%)',
      gradientSecondary: 'linear-gradient(135deg, #fc8181 0%, #ed8936 100%)',
      navbarBg: 'rgba(255, 250, 240, 0.95)',
      cardBg: '#ffffff'
    }
  },
  {
    id: 'midnight',
    name: 'Midnight Blue',
    colors: {
      primary: '#3182ce',
      primaryHover: '#2c5282',
      secondary: '#4299e1',
      secondaryHover: '#3182ce',
      accent: '#9f7aea',
      background: '#0f172a',
      surface: '#1e293b',
      text: '#f1f5f9',
      textSecondary: '#cbd5e1',
      border: '#334155',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      gradient: 'linear-gradient(135deg, #3182ce 0%, #4299e1 100%)',
      gradientSecondary: 'linear-gradient(135deg, #9f7aea 0%, #3182ce 100%)',
      navbarBg: 'rgba(30, 41, 59, 0.95)',
      cardBg: '#1e293b'
    }
  }
];

interface ThemeState {
  currentTheme: Theme;
}

type ThemeAction = 
  | { type: 'SET_THEME'; theme: Theme };

const ThemeContext = createContext<{
  state: ThemeState;
  dispatch: React.Dispatch<ThemeAction>;
  setTheme: (themeId: string) => void;
} | null>(null);

function themeReducer(state: ThemeState, action: ThemeAction): ThemeState {
  switch (action.type) {
    case 'SET_THEME':
      return { currentTheme: action.theme };
    default:
      return state;
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(themeReducer, {
    currentTheme: themes[0] // Default theme
  });

  const setTheme = (themeId: string) => {
    const theme = themes.find(t => t.id === themeId);
    if (theme) {
      dispatch({ type: 'SET_THEME', theme });
      localStorage.setItem('selectedTheme', themeId);
    }
  };

  // Load saved theme on mount
  useEffect(() => {
    const savedThemeId = localStorage.getItem('selectedTheme');
    if (savedThemeId) {
      const savedTheme = themes.find(t => t.id === savedThemeId);
      if (savedTheme) {
        dispatch({ type: 'SET_THEME', theme: savedTheme });
      }
    }
  }, []);

  // Apply CSS variables when theme changes
  useEffect(() => {
    const root = document.documentElement;
    const theme = state.currentTheme;
    
    root.style.setProperty('--color-primary', theme.colors.primary);
    root.style.setProperty('--color-primary-hover', theme.colors.primaryHover);
    root.style.setProperty('--color-secondary', theme.colors.secondary);
    root.style.setProperty('--color-secondary-hover', theme.colors.secondaryHover);
    root.style.setProperty('--color-accent', theme.colors.accent);
    root.style.setProperty('--color-background', theme.colors.background);
    root.style.setProperty('--color-surface', theme.colors.surface);
    root.style.setProperty('--color-text', theme.colors.text);
    root.style.setProperty('--color-text-secondary', theme.colors.textSecondary);
    root.style.setProperty('--color-border', theme.colors.border);
    root.style.setProperty('--color-success', theme.colors.success);
    root.style.setProperty('--color-warning', theme.colors.warning);
    root.style.setProperty('--color-error', theme.colors.error);
    root.style.setProperty('--gradient-primary', theme.colors.gradient);
    root.style.setProperty('--gradient-secondary', theme.colors.gradientSecondary);
    root.style.setProperty('--color-navbar-bg', theme.colors.navbarBg);
    root.style.setProperty('--color-card-bg', theme.colors.cardBg);
  }, [state.currentTheme]);

  return (
    <ThemeContext.Provider value={{ state, dispatch, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
