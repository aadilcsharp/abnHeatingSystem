import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Navigation
      home: "Home",
      products: "Products",
      about: "About",
      contact: "Contact Us",
      cart: "Cart",
      
      // Home Page
      welcomeTitle: "Welcome to ABN HEATING SYSTEM",
      welcomeSubtitle: "Your trusted partner for premium heating systems and gadgets",
      specialOffers: "Special Offers",
      shopNow: "Shop Now",
      featuredProducts: "Featured Products",
      viewAll: "View All Products",
      
      // Products Page
      "products.title": "Our Products",
      "products.subtitle": "Discover our amazing collection of premium electronics",
      "products.searchPlaceholder": "Search products...",
      "products.noProducts": "No products found matching your criteria",
      "products.inStock": "In Stock",
      "products.outOfStock": "Out of Stock",
      
      // Product Page
      addToCart: "Add to Cart",
      selectSize: "Select Size",
      features: "Features",
      description: "Description",
      price: "Price",
      originalPrice: "Original Price",
      inStock: "In Stock",
      outOfStock: "Out of Stock",
      
      // Cart
      cartItems: "Cart Items",
      total: "Total",
      proceedToPayment: "Proceed to Payment",
      removeFromCart: "Remove from Cart",
      emptyCart: "Your cart is empty",
      
      // Payment
      paymentTitle: "Complete Your Payment",
      scanQRCode: "Scan QR Code to Pay",
      paymentInstructions: "Use any UPI app to scan the QR code and complete your payment",
      
      // Contact
      contactTitle: "Contact Us",
      getInTouch: "Get in Touch",
      address: "Address",
      phone: "Phone",
      email: "Email",
      whatsappContact: "WhatsApp Contact",
      scanWhatsApp: "Scan to Chat on WhatsApp",
      callUs: "Call Us",
      
      // About
      aboutTitle: "About ABN HEATING SYSTEM",
      aboutDescription: "We are a leading retailer of premium heating systems and gadgets, committed to providing our customers with the latest technology at competitive prices.",
      
      // Common
      loading: "Loading...",
      error: "Something went wrong",
      retry: "Retry",
      close: "Close",
      back: "Back",
      next: "Next",
      previous: "Previous",
      
      // Footer
      followUs: "Follow Us",
      quickLinks: "Quick Links",
      categories: "Categories",
      customerService: "Customer Service",
      contactInfo: "Contact Info",
      helpCenter: "Help Center",
      returns: "Returns",
      shippingInfo: "Shipping Info",
      trackOrder: "Track Order",
      warranty: "Warranty",
      electronics: "Electronics",
      audio: "Audio",
      computers: "Computers",
      wearables: "Wearables",
      accessories: "Accessories",
      support: "Support",
      legal: "Legal",
      stayUpdated: "Stay Updated",
      subscribeNewsletter: "Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.",
      enterEmail: "Enter your email address",
      subscribe: "Subscribe",
      allRightsReserved: "All rights reserved",
      madeWith: "Made with",
      forTechEnthusiasts: "for tech enthusiasts",
      privacyPolicy: "Privacy Policy",
      termsOfService: "Terms of Service",
      cookiePolicy: "Cookie Policy"
    }
  },
  hi: {
    translation: {
      // Navigation
      home: "होम",
      products: "उत्पाद",
      about: "हमारे बारे में",
      contact: "संपर्क करें",
      cart: "कार्ट",
      
      // Home Page
      welcomeTitle: "टेकमार्ट इलेक्ट्रॉनिक्स में आपका स्वागत है",
      welcomeSubtitle: "प्रीमियम इलेक्ट्रॉनिक्स के लिए आपका विश्वसनीय साझीदार",
      specialOffers: "विशेष ऑफर",
      shopNow: "अभी खरीदें",
      featuredProducts: "विशेष उत्पाद",
      viewAll: "सभी उत्पाद देखें",
      
      // Products Page
      "products.title": "हमारे उत्पाद",
      "products.subtitle": "प्रीमियम इलेक्ट्रॉनिक्स के हमारे अद्भुत संग्रह की खोज करें",
      "products.searchPlaceholder": "उत्पाद खोजें...",
      "products.noProducts": "आपके मानदंडों से मेल खाने वाले कोई उत्पाद नहीं मिले",
      "products.inStock": "स्टॉक में",
      "products.outOfStock": "स्टॉक में नहीं",
      
      // Product Page
      addToCart: "कार्ट में जोड़ें",
      selectSize: "साइज़ चुनें",
      features: "विशेषताएं",
      description: "विवरण",
      price: "मूल्य",
      originalPrice: "मूल मूल्य",
      inStock: "स्टॉक में",
      outOfStock: "स्टॉक में नहीं",
      
      // Cart
      cartItems: "कार्ट आइटम",
      total: "कुल",
      proceedToPayment: "भुगतान के लिए आगे बढ़ें",
      removeFromCart: "कार्ट से हटाएं",
      emptyCart: "आपका कार्ट खाली है",
      
      // Payment
      paymentTitle: "अपना भुगतान पूरा करें",
      scanQRCode: "भुगतान के लिए QR कोड स्कैन करें",
      paymentInstructions: "QR कोड स्कैन करने और अपना भुगतान पूरा करने के लिए किसी भी UPI ऐप का उपयोग करें",
      
      // Contact
      contactTitle: "संपर्क करें",
      getInTouch: "संपर्क में रहें",
      address: "पता",
      phone: "फोन",
      email: "ईमेल",
      whatsappContact: "व्हाट्सऐप संपर्क",
      scanWhatsApp: "व्हाट्सऐप पर चैट करने के लिए स्कैन करें",
      callUs: "हमें कॉल करें",
      
      // About
      aboutTitle: "टेकमार्ट इलेक्ट्रॉनिक्स के बारे में",
      aboutDescription: "हम प्रीमियम इलेक्ट्रॉनिक्स और गैजेट्स के एक अग्रणी रिटेलर हैं, जो अपने ग्राहकों को प्रतिस्पर्धी कीमतों पर नवीनतम तकनीक प्रदान करने के लिए प्रतिबद्ध हैं।",
      
      // Common
      loading: "लोड हो रहा है...",
      error: "कुछ गलत हुआ",
      retry: "फिर से कोशिश करें",
      close: "बंद करें",
      back: "वापस",
      next: "अगला",
      previous: "पिछला",
      
      // Footer
      followUs: "हमें फॉलो करें",
      quickLinks: "त्वरित लिंक",
      categories: "श्रेणियां",
      customerService: "ग्राहक सेवा",
      contactInfo: "संपर्क जानकारी",
      helpCenter: "सहायता केंद्र",
      returns: "वापसी",
      shippingInfo: "शिपिंग जानकारी",
      trackOrder: "ऑर्डर ट्रैक करें",
      warranty: "वारंटी",
      electronics: "इलेक्ट्रॉनिक्स",
      audio: "ऑडियो",
      computers: "कंप्यूटर",
      wearables: "पहनने योग्य",
      accessories: "एक्सेसरीज",
      support: "सहायता",
      legal: "कानूनी",
      stayUpdated: "अपडेट रहें",
      subscribeNewsletter: "विशेष ऑफर, मुफ्त उपहार और जीवन भर के सौदे पाने के लिए सब्सक्राइब करें।",
      enterEmail: "अपना ईमेल पता दर्ज करें",
      subscribe: "सब्सक्राइब करें",
      allRightsReserved: "सभी अधिकार सुरक्षित",
      madeWith: "बनाया गया",
      forTechEnthusiasts: "तकनीक प्रेमियों के लिए",
      privacyPolicy: "गोपनीयता नीति",
      termsOfService: "सेवा की शर्तें",
      cookiePolicy: "कुकी नीति"
    }
  },
  ur: {
    translation: {
      // Navigation
      home: "ہوم",
      products: "مصنوعات",
      about: "ہمارے بارے میں",
      contact: "رابطہ کریں",
      cart: "کارٹ",
      
      // Home Page
      welcomeTitle: "ٹیک مارٹ الیکٹرانکس میں آپ کا خوش آمدید",
      welcomeSubtitle: "پریمیم الیکٹرانکس کے لیے آپ کا قابل اعتماد پارٹنر",
      specialOffers: "خصوصی پیشکشیں",
      shopNow: "ابھی خریداری کریں",
      featuredProducts: "خصوصی مصنوعات",
      viewAll: "تمام مصنوعات دیکھیں",
      
      // Products Page
      "products.title": "ہماری مصنوعات",
      "products.subtitle": "پریمیم الیکٹرانکس کے ہمارے شاندار مجموعے کو دریافت کریں",
      "products.searchPlaceholder": "مصنوعات تلاش کریں...",
      "products.noProducts": "آپ کے معیار سے میل کھاتی کوئی مصنوعات نہیں ملیں",
      "products.inStock": "اسٹاک میں",
      "products.outOfStock": "اسٹاک میں نہیں",
      
      // Product Page
      addToCart: "کارٹ میں شامل کریں",
      selectSize: "سائز منتخب کریں",
      features: "خصوصیات",
      description: "تفصیل",
      price: "قیمت",
      originalPrice: "اصل قیمت",
      inStock: "اسٹاک میں",
      outOfStock: "اسٹاک میں نہیں",
      
      // Cart
      cartItems: "کارٹ آئٹمز",
      total: "کل",
      proceedToPayment: "ادائیگی کے لیے آگے بڑھیں",
      removeFromCart: "کارٹ سے ہٹائیں",
      emptyCart: "آپ کا کارٹ خالی ہے",
      
      // Payment
      paymentTitle: "اپنی ادائیگی مکمل کریں",
      scanQRCode: "ادائیگی کے لیے QR کوڈ اسکین کریں",
      paymentInstructions: "QR کوڈ اسکین کرنے اور اپنی ادائیگی مکمل کرنے کے لیے کوئی بھی UPI ایپ استعمال کریں",
      
      // Contact
      contactTitle: "رابطہ کریں",
      getInTouch: "رابطے میں رہیں",
      address: "پتہ",
      phone: "فون",
      email: "ای میل",
      whatsappContact: "واٹس ایپ رابطہ",
      scanWhatsApp: "واٹس ایپ پر چیٹ کرنے کے لیے اسکین کریں",
      callUs: "ہمیں کال کریں",
      
      // About
      aboutTitle: "ٹیک مارٹ الیکٹرانکس کے بارے میں",
      aboutDescription: "ہم پریمیم الیکٹرانکس اور گیجٹس کے ایک معروف ریٹیلر ہیں، جو اپنے صارفین کو مسابقتی قیمتوں پر جدید ترین ٹیکنالوجی فراہم کرنے کے لیے پرعزم ہیں۔",
      
      // Common
      loading: "لوڈ ہو رہا ہے...",
      error: "کچھ غلط ہوا",
      retry: "دوبارہ کوشش کریں",
      close: "بند کریں",
      back: "واپس",
      next: "اگلا",
      previous: "پچھلا",
      
      // Footer
      followUs: "ہمیں فالو کریں",
      quickLinks: "فوری لنکس",
      categories: "قسمیں",
      customerService: "کسٹمر سروس",
      contactInfo: "رابطہ کی معلومات",
      helpCenter: "مدد کا مرکز",
      returns: "واپسی",
      shippingInfo: "شپنگ کی معلومات",
      trackOrder: "آرڈر ٹریک کریں",
      warranty: "وارنٹی",
      electronics: "الیکٹرانکس",
      audio: "آڈیو",
      computers: "کمپیوٹرز",
      wearables: "پہننے والے",
      accessories: "لوازمات",
      support: "سپورٹ",
      legal: "قانونی",
      stayUpdated: "اپ ڈیٹ رہیں",
      subscribeNewsletter: "خصوصی پیشکشیں، مفت تحائف اور زندگی بھر کے سودے حاصل کرنے کے لیے سبسکرائب کریں۔",
      enterEmail: "اپنا ای میل ایڈریس درج کریں",
      subscribe: "سبسکرائب کریں",
      allRightsReserved: "تمام حقوق محفوظ",
      madeWith: "بنایا گیا",
      forTechEnthusiasts: "ٹیک کے شوقینوں کے لیے",
      privacyPolicy: "رازداری کی پالیسی",
      termsOfService: "سروس کی شرائط",
      cookiePolicy: "کوکی پالیسی"
    }
  },
  ar: {
    translation: {
      // Navigation
      home: "الرئيسية",
      products: "المنتجات",
      about: "حولنا",
      contact: "اتصل بنا",
      cart: "السلة",
      
      // Home Page
      welcomeTitle: "مرحباً بكم في تيك مارت للإلكترونيات",
      welcomeSubtitle: "شريكك الموثوق للإلكترونيات المتميزة",
      specialOffers: "عروض خاصة",
      shopNow: "تسوق الآن",
      featuredProducts: "منتجات مميزة",
      viewAll: "عرض جميع المنتجات",
      
      // Products Page
      "products.title": "منتجاتنا",
      "products.subtitle": "اكتشف مجموعتنا الرائعة من الإلكترونيات المتميزة",
      "products.searchPlaceholder": "البحث عن المنتجات...",
      "products.noProducts": "لم يتم العثور على منتجات تطابق معاييرك",
      "products.inStock": "متوفر",
      "products.outOfStock": "غير متوفر",
      
      // Product Page
      addToCart: "إضافة إلى السلة",
      selectSize: "اختر الحجم",
      features: "الميزات",
      description: "الوصف",
      price: "السعر",
      originalPrice: "السعر الأصلي",
      inStock: "متوفر",
      outOfStock: "غير متوفر",
      
      // Cart
      cartItems: "عناصر السلة",
      total: "الإجمالي",
      proceedToPayment: "المتابعة للدفع",
      removeFromCart: "إزالة من السلة",
      emptyCart: "سلتك فارغة",
      
      // Payment
      paymentTitle: "أكمل دفعتك",
      scanQRCode: "امسح رمز QR للدفع",
      paymentInstructions: "استخدم أي تطبيق UPI لمسح رمز QR وإكمال دفعتك",
      
      // Contact
      contactTitle: "اتصل بنا",
      getInTouch: "تواصل معنا",
      address: "العنوان",
      phone: "الهاتف",
      email: "البريد الإلكتروني",
      whatsappContact: "اتصال واتساب",
      scanWhatsApp: "امسح للدردشة على واتساب",
      callUs: "اتصل بنا",
      
      // About
      aboutTitle: "حول تيك مارت للإلكترونيات",
      aboutDescription: "نحن تاجر تجزئة رائد للإلكترونيات والأجهزة المتميزة، ملتزمون بتوفير أحدث التقنيات لعملائنا بأسعار تنافسية.",
      
      // Common
      loading: "جاري التحميل...",
      error: "حدث خطأ ما",
      retry: "إعادة المحاولة",
      close: "إغلاق",
      back: "رجوع",
      next: "التالي",
      previous: "السابق",
      
      // Footer
      followUs: "تابعونا",
      quickLinks: "روابط سريعة",
      categories: "الفئات",
      customerService: "خدمة العملاء",
      contactInfo: "معلومات الاتصال",
      helpCenter: "مركز المساعدة",
      returns: "المرتجعات",
      shippingInfo: "معلومات الشحن",
      trackOrder: "تتبع الطلب",
      warranty: "الضمان",
      electronics: "الإلكترونيات",
      audio: "الصوت",
      computers: "الحاسوب",
      wearables: "القابلة للارتداء",
      accessories: "الإكسسوارات",
      support: "الدعم",
      legal: "قانوني",
      stayUpdated: "ابق على اطلاع",
      subscribeNewsletter: "اشترك للحصول على عروض خاصة وهدايا مجانية وصفقات العمر.",
      enterEmail: "أدخل عنوان بريدك الإلكتروني",
      subscribe: "اشتراك",
      allRightsReserved: "جميع الحقوق محفوظة",
      madeWith: "صنع بـ",
      forTechEnthusiasts: "لعشاق التكنولوجيا",
      privacyPolicy: "سياسة الخصوصية",
      termsOfService: "شروط الخدمة",
      cookiePolicy: "سياسة ملفات تعريف الارتباط"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
