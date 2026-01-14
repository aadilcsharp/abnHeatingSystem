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
  name: "Malik Tray",
  nameHi: "मालिक ट्रे",
  nameUr: "مالک ٹرے",
  nameAr: "مالك صواني",

  logo: "/logo.jpeg",

  tagline: "Elegant Handcrafted Trays for Every Occasion",
  taglineHi: "हर अवसर के लिए सुंदर हस्तनिर्मित ट्रे",
  taglineUr: "ہر موقع کے لیے خوبصورت دست ساز ٹرے",
  taglineAr: "صواني مصنوعة يدويًا لكل المناسبات",

  description: "Malik Tray specializes in premium handcrafted trays including palki, dry fruit trays, and decorative serving items.",
  descriptionHi: "मालिक ट्रे प्रीमियम हस्तनिर्मित ट्रे में विशेषज्ञ है, जिनमें पालकी, ड्राई फ्रूट ट्रे और सजावटी परोसने की वस्तुएँ शामिल हैं।",
  descriptionUr: "مالک ٹرے پریمیم دست ساز ٹرے میں مہارت رکھتا ہے، جن میں پالکی، خشک میوہ جات کی ٹرے اور آرائشی اشیاء شامل ہیں۔",
  descriptionAr: "تتخصص مالك صواني في الصواني المصنوعة يدويًا مثل صواني الفواكه الجافة والبالكي وقطع التقديم الزخرفية.",

  address: "New Delhi, India",
  addressHi: "नई दिल्ली, भारत",
  addressUr: "نئی دہلی، بھارت",
  addressAr: "نيودلهي، الهند",

  phone: "+91-9310367925",
  email: "maliktray@gmail.com",
  gstNumber: "",

  website: "www.maliktray.com",

  paymentQR: "qr-code/payment-qr.png",
  whatsappQR: "qr-code/whatsapp-qr.png",

  whatsappNumber: "919310367925",

  whatsappMessage: "Hello! I'm interested in your handcrafted trays. Please share details.",
  whatsappMessageHi: "नमस्ते! मुझे आपकी हस्तनिर्मित ट्रे में रुचि है। कृपया विवरण साझा करें।",
  whatsappMessageUr: "ہیلو! مجھے آپ کی دست ساز ٹرے میں دلچسپی ہے۔ براہ کرم تفصیلات فراہم کریں۔",
  whatsappMessageAr: "مرحباً! أنا مهتم بالصواني المصنوعة يدويًا. يرجى مشاركة التفاصيل.",

  socialMedia: {
    facebook: "",
    instagram: "",
    twitter: ""
  },

  // Global app settings
  defaultTheme: "gradient-gold",
  defaultLanguage: "en",

  // Tax and shipping settings
  taxSettings: {
    enableGST: false,
    gstRate: 0
  },

  shippingSettings: {
    enableShipping: true,
    freeShippingThreshold: 2999,
    shippingCharge: 99
  },

  // Navigation settings
  navigationSettings: {
    enableHome: true,
    enableProducts: true,
    enableAbout: true,
    enableContact: true,
    enableCart: true
  },

  // Authentication settings
  authSettings: {
    enableLogin: false,
    enableSignup: false,
    showDemoCredentials: false
  },

  // Home page settings
  homePageSettings: {
    showHeroSection: true,
    showTrendingSection: true,
    sectionOrder: "hero-second"//"trending-first"|"hero-second"
  }
};
