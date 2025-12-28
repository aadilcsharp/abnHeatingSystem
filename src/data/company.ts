export interface CompanyInfo {
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
  gstNumber: string;
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
    showDemoCredentials: boolean; // Show demo login credentials on login page
  };
  // Home page settings
  homePageSettings: {
    showHeroSection: boolean;
    showTrendingSection: boolean;
    sectionOrder: 'trending-first'|'hero-second'; // Controls which section appears first
  };
}

 export const companyInfo: CompanyInfo = {
  name: "ABN HEATING SYSTEM",
  nameHi: "टेकमार्ट इलेक्ट्रॉनिक्स",
  nameUr: "ٹیک مارٹ الیکٹرانکس",
  nameAr: "تيك مارت للإلكترونيات",
  logo: "/logo.jpeg",
  tagline: "Empowering Your Digital Life",
  taglineHi: "आपके डिजिटल जीवन को शक्ति देना",
  taglineUr: "آپ کی ڈیجیٹل زندگی کو طاقت دینا",
  taglineAr: "تشغيل حياتك الرقمية",
  description: "Your trusted partner for premium heating systems and gadgets",
  descriptionHi: "प्रीमियम हीटिंग सिस्टम्स और गैजेट्स के लिए आपका विश्वसनीय साझीदार",
  descriptionUr: "پریمیم ہیٹنگ سسٹمز اور گیجٹس کے لیے آپ کا قابل اعتماد پارٹنر",
  descriptionAr: "شريكك الموثوق لأنظمة التدفئة والأجهزة المتميزة",
  address: "H NO B-167/6 BHAGIRATHI VIHAR PHASE 2, New Delhi, India - 110094",
  addressHi: "H NO B-167/6 भागीरथी विहार फेज 2, नई दिल्ली, भारत - 110094",
  addressUr: "H NO B-167/6 BHAGIRATHI VIHAR PHASE 2, نئی دہلی، بھارت - 110094",
  addressAr: "123 شارع التقنية، مدينة الإلكترونيات، نيودلهي، الهند - 110001",
  phone: "+91-9310367925",
  email: "a.b.n.heatingsystem@gmail.com",
  gstNumber: "07BJFPT0247H1Z2",
  website: "www.ABN HEATING SYSTEM.com",
  paymentQR: "payment-qr.png",
  whatsappQR: "whatsapp-qr.png",
  whatsappNumber: "919310367925",
  whatsappMessage: "Hello! I'm interested in your products. Please provide more information.",
  whatsappMessageHi: "नमस्ते! मुझे आपके उत्पादों में रुचि है। कृपया अधिक जानकारी प्रदान करें।",
  whatsappMessageUr: "ہیلو! مجھے آپ کی مصنوعات میں دلچسپی ہے۔ براہ کرم مزید معلومات فراہم کریں۔",
  whatsappMessageAr: "مرحباً! أنا مهتم بمنتجاتكم. يرجى تقديم المزيد من المعلومات.",
  socialMedia: {
    facebook: "https://www.facebook.com/share/14SkrFbewEr/",
    instagram: "https://instagram.com/ABN HEATING SYSTEM",
    twitter: "https://twitter.com/ABN HEATING SYSTEM"
  },
  // Global app settings
  defaultTheme: "gradient-blue", // Default theme for all users
  defaultLanguage: "en", // Default language for all users
  // Tax and shipping settings
  taxSettings: {
    enableGST: true,
    gstRate: 18 // 18% GST
  },
  shippingSettings: {
    enableShipping: true,
    freeShippingThreshold: 2999, // Free shipping above ₹2999
    shippingCharge: 99 // ₹99 shipping charge
  },
  // Navigation settings - all enabled by default
  navigationSettings: {
    enableHome: true,
    enableProducts: true,
    enableAbout: true,
    enableContact: false,
    enableCart: true
  },
  // Authentication settings - all enabled by default
  authSettings: {
    enableLogin: false,
    enableSignup: false,
    showDemoCredentials: false // Show demo credentials by default
  },
  // Home page settings - trending first
  homePageSettings: {
    showHeroSection: false,
    showTrendingSection: false,
    sectionOrder: 'hero-second' // Show trending products first, hero second
      //     'trending-first' = Trending → Hero (current setting) ✅
      // 'hero-second' = Hero → Trending
  }
};
