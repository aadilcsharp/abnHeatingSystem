import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import { dataService } from '../data/dataService';

export const useCompanySettings = () => {
  const { i18n } = useTranslation();
  const { setTheme } = useTheme();

  useEffect(() => {
    // Apply company's default settings when the app loads
    const companyInfo = dataService.getCompanyInfo();
    
    // Set default theme if not already set by user
    const savedTheme = localStorage.getItem('theme');
    if (!savedTheme && companyInfo.defaultTheme) {
      setTheme(companyInfo.defaultTheme);
    }

    // Set default language if not already set by user
    const savedLanguage = localStorage.getItem('i18nextLng');
    if (!savedLanguage && companyInfo.defaultLanguage) {
      i18n.changeLanguage(companyInfo.defaultLanguage);
    }
  }, [i18n, setTheme]);

  const applyCompanyDefaults = () => {
    const companyInfo = dataService.getCompanyInfo();
    
    // Force apply company defaults (useful after company settings update)
    if (companyInfo.defaultTheme) {
      setTheme(companyInfo.defaultTheme);
    }
    
    if (companyInfo.defaultLanguage) {
      i18n.changeLanguage(companyInfo.defaultLanguage);
    }
  };

  return { applyCompanyDefaults };
};
