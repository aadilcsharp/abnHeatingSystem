import { CompanyInfo, companyInfo } from '../data/company';

// Function to update company info and generate downloadable company.ts file
export const saveCompanyToFile = (updatedCompanyInfo: CompanyInfo): void => {
  // Update the in-memory company info object
  Object.assign(companyInfo, updatedCompanyInfo);

  console.log(`✅ Company information updated`);

  // Generate and save updated file content
  generateAndSaveCompanyFile();
};

// Function to generate the complete company.ts file content
export const generateCompanyFileContent = (): string => {
  const fileHeader = `export interface CompanyInfo {
  name: string;
  nameHi: string;
  nameUr: string;
  nameAr: string;
  logo: string;
  tagline: string;
  taglineHi: string;
  taglineUr: string;
  taglineAr: string;
  description: string;
  descriptionHi: string;
  descriptionUr: string;
  descriptionAr: string;
  address: string;
  addressHi: string;
  addressUr: string;
  addressAr: string;
  phone: string;
  email: string;
  website: string;
  paymentQR: string;
  whatsappQR: string;
  whatsappNumber: string;
  whatsappMessage: string;
  whatsappMessageHi: string;
  whatsappMessageUr: string;
  whatsappMessageAr: string;
  socialMedia: {
    facebook: string;
    instagram: string;
    twitter: string;
  };
  // Global app settings
  defaultTheme: string;
  defaultLanguage: string;
  // Tax and shipping settings
  taxSettings: {
    enableGST: boolean;
    gstRate: number; // GST percentage (e.g., 18 for 18%)
  };
  shippingSettings: {
    enableShipping: boolean;
    freeShippingThreshold: number; // Free shipping above this amount
    shippingCharge: number; // Flat shipping charge
  };
  // Navigation settings
  navigationSettings: {
    enableHome: boolean;
    enableProducts: boolean;
    enableAbout: boolean;
    enableContact: boolean;
    enableCart: boolean;
  };
  // Authentication settings
  authSettings: {
    enableLogin: boolean;
    enableSignup: boolean;
    showDemoCredentials: boolean;
  };
  // Home page settings
  homePageSettings: {
    showHeroSection: boolean;
    showTrendingSection: boolean;
    sectionOrder: 'trending-first' | 'hero-second';
  };
}

export const companyInfo: CompanyInfo = {`;

  const companyContent = `  name: "${companyInfo.name}",
  nameHi: "${companyInfo.nameHi}",
  nameUr: "${companyInfo.nameUr}",
  nameAr: "${companyInfo.nameAr}",
  logo: "${companyInfo.logo}",
  tagline: "${companyInfo.tagline}",
  taglineHi: "${companyInfo.taglineHi}",
  taglineUr: "${companyInfo.taglineUr}",
  taglineAr: "${companyInfo.taglineAr}",
  description: "${companyInfo.description}",
  descriptionHi: "${companyInfo.descriptionHi}",
  descriptionUr: "${companyInfo.descriptionUr}",
  descriptionAr: "${companyInfo.descriptionAr}",
  address: "${companyInfo.address}",
  addressHi: "${companyInfo.addressHi}",
  addressUr: "${companyInfo.addressUr}",
  addressAr: "${companyInfo.addressAr}",
  phone: "${companyInfo.phone}",
  email: "${companyInfo.email}",
  website: "${companyInfo.website}",
  paymentQR: "${companyInfo.paymentQR}",
  whatsappQR: "${companyInfo.whatsappQR}",
  whatsappNumber: "${companyInfo.whatsappNumber}",
  whatsappMessage: "${companyInfo.whatsappMessage}",
  whatsappMessageHi: "${companyInfo.whatsappMessageHi}",
  whatsappMessageUr: "${companyInfo.whatsappMessageUr}",
  whatsappMessageAr: "${companyInfo.whatsappMessageAr}",
  socialMedia: {
    facebook: "${companyInfo.socialMedia.facebook}",
    instagram: "${companyInfo.socialMedia.instagram}",
    twitter: "${companyInfo.socialMedia.twitter}"
  },
  // Global app settings
  defaultTheme: "${companyInfo.defaultTheme}", // Default theme for all users
  defaultLanguage: "${companyInfo.defaultLanguage}", // Default language for all users
  // Tax and shipping settings
  taxSettings: {
    enableGST: ${companyInfo.taxSettings.enableGST},
    gstRate: ${companyInfo.taxSettings.gstRate} // ${companyInfo.taxSettings.gstRate}% GST
  },
  shippingSettings: {
    enableShipping: ${companyInfo.shippingSettings.enableShipping},
    freeShippingThreshold: ${companyInfo.shippingSettings.freeShippingThreshold}, // Free shipping above ₹${companyInfo.shippingSettings.freeShippingThreshold}
    shippingCharge: ${companyInfo.shippingSettings.shippingCharge} // ₹${companyInfo.shippingSettings.shippingCharge} shipping charge
  },
  // Navigation settings - all enabled by default
  navigationSettings: {
    enableHome: ${companyInfo.navigationSettings.enableHome},
    enableProducts: ${companyInfo.navigationSettings.enableProducts},
    enableAbout: ${companyInfo.navigationSettings.enableAbout},
    enableContact: ${companyInfo.navigationSettings.enableContact},
    enableCart: ${companyInfo.navigationSettings.enableCart}
  },
  // Authentication settings - both enabled by default
  authSettings: {
    enableLogin: ${companyInfo.authSettings.enableLogin},
    enableSignup: ${companyInfo.authSettings.enableSignup},
    showDemoCredentials: ${companyInfo.authSettings.showDemoCredentials}
  },
  // Home page settings - both enabled by default
  homePageSettings: {
    showHeroSection: ${companyInfo.homePageSettings.showHeroSection},
    showTrendingSection: ${companyInfo.homePageSettings.showTrendingSection},
    sectionOrder: '${companyInfo.homePageSettings.sectionOrder}'
  }`;

  const fileFooter = `
};
`;

  return fileHeader + '\n' + companyContent + fileFooter;
};

// Function to create and download the company.ts file
export const generateAndSaveCompanyFile = (): void => {
  const fileContent = generateCompanyFileContent();
  
  // Create blob and download
  const blob = new Blob([fileContent], { type: 'text/typescript' });
  const url = window.URL.createObjectURL(blob);
  
  // Create download link
  const link = document.createElement('a');
  link.href = url;
  link.download = 'company.ts';
  link.style.display = 'none';
  
  // Trigger download
  document.body.appendChild(link);
  link.click();
  
  // Cleanup
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
  
  console.log('📁 company.ts file generated and downloaded');
  console.log('📋 Please replace the existing company.ts file with the downloaded version');
};

// Debug function to test company saving
export const testCompanySaving = (): void => {
  console.log('🧪 Testing company file generation...');
  generateAndSaveCompanyFile();
};

// Export debug functions for browser console
if (typeof window !== 'undefined') {
  (window as any).testCompanySaving = testCompanySaving;
  (window as any).generateAndSaveCompanyFile = generateAndSaveCompanyFile;
  (window as any).saveCompanyToFile = saveCompanyToFile;
  
  console.log('🔧 Company File Saver Debug Functions Available:');
  console.log('   - testCompanySaving() - Test file generation');
  console.log('   - generateAndSaveCompanyFile() - Generate and download company.ts');
  console.log('   - saveCompanyToFile(companyInfo) - Update and save company info');
}
