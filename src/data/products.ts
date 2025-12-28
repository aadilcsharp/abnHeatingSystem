export interface SizeOption {
  size: string;
  price: number;
  originalPrice: number;
  inStock: boolean;
}

export interface Product {
  id: string;
  name: string;
  nameHi: string;
  nameUr: string;
  nameAr: string;
  description: string;
  descriptionHi: string;
  descriptionUr: string;
  descriptionAr: string;
  price: number; // Base price (for backward compatibility)
  originalPrice: number; // Base original price (for backward compatibility)
  category: string;
  images: string[];
  sizes: string[]; // Keep for backward compatibility
  sizeOptions?: SizeOption[]; // New size-based pricing
  inStock?: boolean; // Make optional since we use size-based stock
  features: string[];
  featuresHi: string[];
  featuresUr: string[];
  featuresAr: string[];
}

export const products: Product[] = [
  {
    "id": "1",
    "name": "BTH HEATER",
    "nameHi": "BTH (हीटर)",
    "nameUr": "BTH ہیٹر",
    "nameAr": "BTH سخان",
    "description": "High-performance industrial heating product ideal for consistent and efficient heating applications.",
    "descriptionHi": "सुसंगत और कुशल हीटिंग अनुप्रयोगों के लिए आदर्श उच्च-प्रदर्शन औद्योगिक हीटिंग उत्पाद।",
    "descriptionUr": "اعلی کارکرد والا صنعتی ہیٹنگ پروڈکٹ جو مستقل اور مؤثر حرارتی اطلاقات کے لیے مثالی ہے۔",
    "descriptionAr": "منتج تدفئة صناعي عالي الأداء مثالي لتطبيقات التدفئة المتسقة والفعالة.",
    "price": 1140,
    "originalPrice": 1140,
    "category": "BTH",
    "images": [
      "BTH HEATER/2000-w-bth-industrial-water-heater-500x500.webp",
      "BTH HEATER/bth-heater-1000x1000.webp",
      "BTH HEATER/bth-heater-500x500 (1).webp",
      "BTH HEATER/bth-heater-500x500.webp"
    ],
    "sizes": ["12 inch", "15 inch", "18 inch", "20 inch", "24 inch"],
    "sizeOptions": [
      {"size": "12 inch", "price": 850, "originalPrice": 1140, "inStock": true},
      {"size": "15 inch", "price": 1060, "originalPrice": 1425, "inStock": true},
      {"size": "18 inch", "price": 1270, "originalPrice": 1710, "inStock": true},
      {"size": "20 inch", "price": 1415, "originalPrice": 1875, "inStock": true},
      {"size": "24 inch", "price": 1790, "originalPrice": 2280, "inStock": true}
    ],
    "inStock": true,
    "features": [],
    "featuresHi": [],
    "featuresUr": [],
    "featuresAr": []
  },
  {
    "id": "2",
    "name": "CARTRIDGE HEATER",
    "nameHi": "CARTRIDGE (हीٹر)",
    "nameUr": "CARTRIDGE ہیٹر",
    "nameAr": "CARTRIDGE سخان",
    "description": "High-performance industrial heating product ideal for consistent and efficient heating applications. Note: Pricing is 45 rupees per inch (length-based; contact for custom quotes).",
    "descriptionHi": "सुसंगत और कुशल हीटिंग अनुप्रयोगों के लिए आदर्श उच्च-प्रदर्शन औद्योगिक हीटिंग उत्पाद। नोट: मूल्य 45 रुपये प्रति इंच (लंबाई-आधारित; कस्टम कोट के लिए संपर्क करें)।",
    "descriptionUr": "اعلی کارکرد والا صنعتی ہیٹنگ پروڈکٹ جو مستقل اور مؤثر حرارتی اطلاقات کے لیے مثالی ہے۔ نوٹ: قیمت 45 روپے فی انچ (لمبائی کی بنیاد پر؛ کسٹم کوٹ کے لیے رابطہ کریں)۔",
    "descriptionAr": "منتج تدفئة صناعي عالي الأداء مثالي لتطبيقات التدفئة المتسقة والفعالة. ملاحظة: التسعير 45 روبية لكل بوصة (بناءً على الطول؛ اتصل للحصول على عروض أسعار مخصصة).",
    "price": 300,
    "originalPrice": 300,
    "category": "CARTRIDGE",
    "images": [
      "CARTRIDGE HEATER/1123-mmt-products-hasco-cartridgeheaters.jpg",
      "CARTRIDGE HEATER/220v-high-density-cartridge-heater-1000x1000.webp",
      "CARTRIDGE HEATER/hd-cartrige-heater-1000x1000.webp"
    ],
    "sizes": ["45 RUP PER INCH"],
    "sizeOptions": [
      {"size": "45 RUP PER INCH", "price": 0, "originalPrice": 0, "inStock": true}
    ],
    "inStock": true,
    "features": [],
    "featuresHi": [],
    "featuresUr": [],
    "featuresAr": []
  },
  {
    "id": "3",
    "name": "CEDREMIC BOBBIN HEATER",
    "nameHi": "CEDREMIC BOBBIN (हीटर)",
    "nameUr": "CEDREMIC BOBBIN ہیٹر",
    "nameAr": "CEDREMIC BOBBIN سخان",
    "description": "High-performance industrial heating product ideal for consistent and efficient heating applications.",
    "descriptionHi": "सुसंगत और कुशल हीटिंग अनुप्रयोगों के लिए आदर्श उच्च-प्रदर्शन औद्योगिक हीटिंग उत्पाद।",
    "descriptionUr": "اعلی کارکرد والا صنعتی ہیٹنگ پروڈکٹ جو مستقل اور مؤثر حرارتی اطلاقات کے لیے مثالی ہے۔",
    "descriptionAr": "منتج تدفئة صناعي عالي الأداء مثالي لتطبيقات التدفئة المتسقة والفعالة.",
    "price": 300,
    "originalPrice": 300,
    "category": "CEDREMIC BOBBIN",
    "images": [
      "CEDREMIC BOBBIN HEATER/201909211237008467498.jpg",
      "CEDREMIC BOBBIN HEATER/bobbin-heater-01-500x500.webp",
      "CEDREMIC BOBBIN HEATER/ceramic-bobbin-heater.jpg",
      "CEDREMIC BOBBIN HEATER/silica-bobbin-heaters-titani-1000x1000.jpg"
    ],
    "sizes": ["Standard Size"],
    "sizeOptions": [
      {"size": "150W / 1500W", "price": 0, "originalPrice": 0, "inStock": true},
      {"size": "200W / 2500W", "price": 0, "originalPrice": 0, "inStock": true},
      {"size": "300W / 3500W", "price": 0, "originalPrice": 0, "inStock": true}
    ],
    "inStock": true,
    "features": [],
    "featuresHi": [],
    "featuresUr": [],
    "featuresAr": []
  },
  {
    "id": "4",
    "name": "CERAMIC HEATER",
    "nameHi": "CERAMIC (हीٹر)",
    "nameUr": "CERAMIC ہیٹر",
    "nameAr": "CERAMIC سخان",
    "description": "High-performance industrial heating product ideal for consistent and efficient heating applications. Note: Pricing is 15 rupees per running inch (length-based; contact for custom quotes).",
    "descriptionHi": "सुसंगत और कुशल हीटिंग अनुप्रयोगों के लिए आदर्श उच्च-प्रदर्शन औद्योगिक हीٹिंग उत्पाद। नोट: मूल्य 15 रुपये प्रति रनिंग इंच (लंबाई-आधारित; कस्टम कोट के लिए संपर्क करें)।",
    "descriptionUr": "اعلی کارکرد والا صنعتی ہیٹنگ پروڈکٹ جو مستقل اور مؤثر حرارتی اطلاقات کے لیے مثالی ہے۔ نوٹ: قیمت 15 روپے فی رننگ انچ (لمبائی کی بنیاد پر؛ کسٹم کوٹ کے لیے رابطہ کریں)۔",
    "descriptionAr": "منتج تدفئة صناعي عالي الأداء مثالي لتطبيقات التدفئة المتسقة والفعالة. ملاحظة: التسعير 15 روبية لكل بوصة تشغيل (بناءً على الطول؛ اتصل لعروض مخصصة).",
    "price": 300,
    "originalPrice": 300,
    "category": "CERAMIC",
    "images": [
      "CEREMIC HEATER/industrial-ceramic-heater-500x500 (1).webp",
      "CEREMIC HEATER/industrial-ceramic-heater-500x500 (2).webp",
      "CEREMIC HEATER/industrial-ceramic-heater-500x500.webp",
      "CEREMIC HEATER/Industrial-Ceramic-Heater-for-Blowing-Injection-Moulding-Machines.avif",
      "CEREMIC HEATER/industrial-ceramic-heater.jpg"
    ],
    "sizes": ["Standard Size"],
    "sizeOptions": [
      {"size": "9 RUP RUNNING INCH", "price": 0, "originalPrice": 0, "inStock": true}
    ],
    "inStock": true,
    "features": [],
    "featuresHi": [],
    "featuresUr": [],
    "featuresAr": []
  },
  {
    "id": "5",
    "name": "CMO WATER HEATER",
    "nameHi": "CMO WATER (हीटर)",
    "nameUr": "CMO WATER ہیٹر",
    "nameAr": "CMO WATER سخان",
    "description": "High-performance industrial heating product ideal for consistent and efficient heating applications.",
    "descriptionHi": "सुसंगत और कुशल हीटिंग अनुप्रयोगों के लिए आदर्श उच्च-प्रदर्शन औद्योगिक हीटिंग उत्पाद।",
    "descriptionUr": "اعلی کارکرد والا صنعتی ہیٹنگ پروڈکٹ جو مستقل اور مؤثر حرارتی اطلاقات کے لیے مثالی ہے۔",
    "descriptionAr": "منتج تدفئة صناعي عالي الأداء مثالي لتطبيقات التدفئة المتسقة والفعالة.",
    "price": 250,
    "originalPrice": 250,
    "category": "CMO",
    "images": [
      "CMO WATER HEATER/250-steriliser-nipple-type-elements-water-boiler-water-heater-original-imagyegxmjfhgy4t-500x500.webp",
      "CMO WATER HEATER/CMO.webp",
      "CMO WATER HEATER/u-shape-heater-500x500 (1).webp",
      "CMO WATER HEATER/CMO WATER HEATER 3.jpeg",
      "CMO WATER HEATER/CMO WATER HEATER 4.jpeg"
    ],
    "sizes": ["6 inch", "8 inch", "10 inch", "12 inch"],
    "sizeOptions": [
      {"size": "6 inch", "price": 220, "originalPrice": 250, "inStock": true},
      {"size": "8 inch", "price": 270, "originalPrice": 270, "inStock": true},
      {"size": "10 inch", "price": 300, "originalPrice": 300, "inStock": true},
      {"size": "12 inch", "price": 350, "originalPrice": 350, "inStock": true}
    ],
    "inStock": true,
    "features": [],
    "featuresHi": [],
    "featuresUr": [],
    "featuresAr": []
  },
  {
    "id": "6",
    "name": "COIL NOZZLE HEATER",
    "nameHi": "COIL NOZZLE (हीटर)",
    "nameUr": "COIL NOZZLE ہیٹر",
    "nameAr": "COIL NOZZLE سخان",
    "description": "High-performance industrial heating product ideal for consistent and efficient heating applications.",
    "descriptionHi": "सुसंगत और कुशल हीटिंग अनुप्रयोगों के लिए आदर्श उच्च-प्रदर्शन औद्योगिक हीटिंग उत्पाद।",
    "descriptionUr": "اعلی کارکرد والا صنعتی ہیٹنگ پروڈکٹ جو مستقل اور مؤثر حرارتی اطلاقات کے لیے مثالی ہے۔",
    "descriptionAr": "منتج تدفئة صناعي عالي الأداء مثالي لتطبيقات التدفئة المتسقة والفعالة.",
    "price": 1350,
    "originalPrice": 1350,
    "category": "COIL NOZZLE",
    "images": [
      "COIL NOZZLE/Coil-Nozzle-Heaters..jpg",
      "COIL NOZZLE/France-Hot-Runner-Nozzle-Coil-Heater.avif",
      "COIL NOZZLE/nozzle-coil-heater.jpg"
    ],
    "sizes": ["25mm", "30mm", "35mm"],
    "sizeOptions": [
      {"size": "25mm", "price": 1350, "originalPrice": 1350, "inStock": true},
      {"size": "30mm", "price": 1450, "originalPrice": 1450, "inStock": true},
      {"size": "35mm", "price": 1550, "originalPrice": 1550, "inStock": true}
    ],
    "inStock": true,
    "features": [],
    "featuresHi": [],
    "featuresUr": [],
    "featuresAr": []
  },
  {
    "id": "7",
    "name": "D TYPE HEATER",
    "nameHi": "D TYPE (हीٹر)",
    "nameUr": "D TYPE ہیٹر",
    "nameAr": "D TYPE سخان",
    "description": "High-performance industrial heating product ideal for consistent and efficient heating applications. Note: Pricing is 25 rupees per running inch (length-based; contact for custom quotes).",
    "descriptionHi": "सुसंगत और कुशल हीटिंग अनुप्रयोगों के लिए आदर्श उच्च-प्रदर्शन औद्योगिक हीटिंग उत्पाद। नोट: मूल्य 25 रुपये प्रति रनिंग इंच (लंबाई-आधारित; कस्टम कोट के लिए संपर्क करें)।",
    "descriptionUr": "اعلی کارکرد والا صنعتی ہیٹنگ پروڈکٹ جو مستقل اور مؤثر حرارتی اطلاقات کے لیے مثالی ہے۔ نوٹ: قیمت 25 روپے فی رننگ انچ (لمبائی کی بنیاد پر؛ کسٹم کوٹ کے لیے رابطہ کریں)۔",
    "descriptionAr": "منتج تدفئة صناعي عالي الأداء مثالي لتطبيقات التدفئة المتسقة والفعالة. ملاحظة: التسعير 25 روبية لكل بوصة تشغيل (بناءً على الطول؛ اتصل لعروض مخصصة).",
    "price": 300,
    "originalPrice": 300,
    "category": "D TYPE",
    "images": [
      "D TYPE HEATER/-dsc0020-1000x1000.webp",
      "D TYPE HEATER/d-type-heater-3.png",
      "D TYPE HEATER/d-type-heater-500x500.webp"
    ],
    "sizes": ["Standard Size"],
    "sizeOptions": [
      {"size": "25 RUP RUNNING INCH", "price": 0, "originalPrice": 0, "inStock": true}
    ],
    "inStock": true,
    "features": [],
    "featuresHi": [],
    "featuresUr": [],
    "featuresAr": []
  },
  {
    "id": "8",
    "name": "DOOR HEATER",
    "nameHi": "DOOR (हीٹر)",
    "nameUr": "DOOR ہیٹر",
    "nameAr": "DOOR سخان",
    "description": "High-performance industrial heating product ideal for consistent and efficient heating applications.",
    "descriptionHi": "सुसंगत और कुशल हीटिंग अनुप्रयोगों के लिए आदर्श उच्च-प्रदर्शन औद्योगिक हीٹिंग उत्पाद।",
    "descriptionUr": "اعلی کارکرد والا صنعتی ہیٹنگ پروڈکٹ جو مستقل اور مؤثر حرارتی اطلاقات کے لیے مثالی ہے۔",
    "descriptionAr": "منتج تدفئة صناعي عالي الأداء مثالي لتطبيقات التدفئة المتسقة والفعالة.",
    "price": 125,
    "originalPrice": 125,
    "category": "DOOR",
    "images": [
      "DOOR HEATER/cold-room-door-heater-500x500.webp",
      "DOOR HEATER/cold-storage-heater-800x800.jpg",
      "DOOR HEATER/DRAIN HEATER/dra-1000x1000.jpg"
    ],
    "sizes": ["25W"],
    "sizeOptions": [
      {"size": "125 rup per meter (25W/per meter)", "price": 125, "originalPrice": 150, "inStock": true}
    ],
    "inStock": true,
    "features": [],
    "featuresHi": [],
    "featuresUr": [],
    "featuresAr": []
  },
  {
    "id": "9",
    "name": "U Type L HEATER",
    "nameHi": "U Type L (हीٹر)",
    "nameUr": "U Type L ہیٹر",
    "nameAr": "U Type L سخان",
    "description": "High-performance industrial heating product ideal for consistent and efficient heating applications.",
    "descriptionHi": "सुसंगत और कुशल हीटिंग अनुप्रयोगों के लिए आदर्श उच्च-प्रदर्शन औद्योगिक हीटिंग उत्पाद।",
    "descriptionUr": "اعلی کارکرد والا صنعتی ہیٹنگ پروڈکٹ جو مستقل اور مؤثر حرارتی اطلاقات کے لیے مثالی ہے۔",
    "descriptionAr": "منتج تدفئة صناعي عالي الأداء مثالي لتطبيقات التدفئة المتسقة والفعالة.",
    "price": 280,
    "originalPrice": 280,
    "category": "L SHAPE U",
    "images": [
      "L SHAPE U HEATER/u-shape-heater-500x500 (1).webp",
      "L SHAPE U HEATER/u-type-heater-500x500.webp"
    ],
    "sizes": ["10 inch", "12 inch"],
    "sizeOptions": [
      {"size": "10 inch", "price": 280, "originalPrice": 300, "inStock": true},
      {"size": "12 inch", "price": 330, "originalPrice": 350, "inStock": true}
    ],
    "inStock": true,
    "features": [],
    "featuresHi": [],
    "featuresUr": [],
    "featuresAr": []
  },
  {
    "id": "10",
    "name": "M TYPE FINNED HEATER",
    "nameHi": "M TYPE FINNED (हीٹر)",
    "nameUr": "M TYPE FINNED ہیٹر",
    "nameAr": "M TYPE FINNED سخان",
    "description": "High-performance industrial heating product ideal for consistent and efficient heating applications.",
    "descriptionHi": "सुसंगत और कुशल हीटिंग अनुप्रयोगों के लिए आदर्श उच्च-प्रदर्शन औद्योगिक हीटिंग उत्पाद।",
    "descriptionUr": "اعلی کارکرد والا صنعتی ہیٹنگ پروڈکٹ جو مستقل اور مؤثر حرارتی اطلاقات کے لیے مثالی ہے۔",
    "descriptionAr": "منتج تدفئة صناعي عالي الأداء مثالي لتطبيقات التدفئة المتسقة والفعالة.",
    "price": 300,
    "originalPrice": 300,
    "category": "M TYPE FINNED",
    "images": [
      "M TYPE INNED NEATER/201812091126422173322.jpg",
      "M TYPE INNED NEATER/m-type-heaters-1000x1000.webp",
      "M TYPE INNED NEATER/tubular-fin-type-heater-500x500.webp"
    ],
    "sizes": ["Standard Size"],
    "sizeOptions": [
      {"size": "Standard Size", "price": 0, "originalPrice": 0, "inStock": true}
    ],
    "inStock": true,
    "features": [],
    "featuresHi": [],
    "featuresUr": [],
    "featuresAr": []
  },
  {
    "id": "11",
    "name": "MICA BAND HEATER",
    "nameHi": "MICA BAND (हीٹر)",
    "nameUr": "MICA BAND ہیٹر",
    "nameAr": "MICA BAND سخان",
    "description": "High-performance industrial heating product ideal for consistent and efficient heating applications. Note: Pricing is 7 rupees per square inch (area-based; contact for custom quotes).",
    "descriptionHi": "सुसंगत और कुशल हीटिंग अनुप्रयोगों के लिए आदर्श उच्च-प्रदर्शन औد्योगिक हीटिंग उत्पाद। नोट: मूल्य 7 रुपये प्रति वर्ग इंच (क्षेत्रफल-आधारित; कस्टम कोट के लिए संपर्क करें)।",
    "descriptionUr": "اعلی کارکرد والا صنعتی ہیٹنگ پروڈکٹ جو مستقل اور مؤثر حرارتی اطلاقات کے لیے مثالی ہے۔ نوٹ: قیمت 7 روپے فی مربع انچ (رقبہ کی بنیاد پر؛ کسٹم کوٹ کے لیے رابطہ کریں)۔",
    "descriptionAr": "منتج تدفئة صناعي عالي الأداء مثالي لتطبيقات التدفئة المتسقة والفعالة. ملاحظة: التسعير 7 روبية لكل بوصة مربعة (بناءً على المساحة؛ اتصل لعروض مخصصة).",
    "price": 300,
    "originalPrice": 300,
    "category": "MICA BAND",
    "images": [
      "MICA BANNED HEATER/cps-mica-barrel-band-heater-1080x1080.jpg",
      "MICA BANNED HEATER/mica-band-heater-500x500.webp",
      "MICA BANNED HEATER/mica_band_heater_24.webp",
      "MICA BANNED HEATER/MICA BANNED HEATER 4.jpeg",
      "MICA BANNED HEATER/MICA BANNED HEATER 5.jpeg",
      "MICA BANNED HEATER/MICA BANNED HEATER 6.jpeg"
    ],
    "sizes": ["Standard Size"],
    "sizeOptions": [
      {"size": "6 RUP SQUARE INCH", "price": 0, "originalPrice": 0, "inStock": true}
    ],
    "inStock": true,
    "features": [],
    "featuresHi": [],
    "featuresUr": [],
    "featuresAr": []
  },
  {
    "id": "12",
    "name": "MICA Strip Heater",
    "nameHi": "MICA Strip Heater (हीटर)",
    "nameUr": "MICA Strip Heater ہیٹر",
    "nameAr": "MICA Strip Heater سخان",
    "description": "High-performance industrial heating product ideal for consistent and efficient heating applications. Note: Pricing is 5 rupees per square inch (area-based; contact for custom quotes).",
    "descriptionHi": "सुसंगत और कुशल हीटिंग अनुप्रयोगों के लिए आदर्श उच्च-प्रदर्शन औद्योगिक हीटिंग उत्पाद। नोट: मूल्य 5 रुपये प्रति वर्ग इंच (क्षेत्रफल-आधारित; कस्टम कोट के लिए संपर्क करें)।",
    "descriptionUr": "اعلی کارکرد والا صنعتی ہیٹنگ پروڈکٹ جو مستقل اور مؤثر حرارتی اطلاقات کے لیے مثالی ہے۔ نوٹ: قیمت 5 روپے فی مربع انچ (رقبہ کی بنیاد پر؛ کسٹم کوٹ کے لیے رابطہ کریں)۔",
    "descriptionAr": "منتج تدفئة صناعي عالي الأداء مثالي لتطبيقات التدفئة المتسقة والفعالة. ملاحظة: التسعير 5 روبية لكل بوصة مربعة (بناءً على المساحة؛ اتصل لعروض مخصصة).",
    "price": 300,
    "originalPrice": 300,
    "category": "MICA NOZZLE",
    "images": [
      "MICA STRIP HEATER/mica-strip-heaters-1000x1000 (1).webp",
      "MICA STRIP HEATER/mica-strip-heater-1000x1000.webp",
      "MICA STRIP HEATER/mica-strip-heaters-1000x1000.webp"
    ],
    "sizes": ["Standard Size"],
    "sizeOptions": [
      {"size": "5 RUP SQUARE INCH", "price": 5, "originalPrice": 5, "inStock": true}
    ],
    "inStock": true,
    "features": [],
    "featuresHi": [],
    "featuresUr": [],
    "featuresAr": []
  },
  {
    "id": "13",
    "name": "OIL IMMERSION HEATER",
    "nameHi": "OIL IMMERSION (हीٹر)",
    "nameUr": "OIL IMMERSION ہیٹر",
    "nameAr": "OIL IMMERSION سخان",
    "description": "High-performance industrial heating product ideal for consistent and efficient heating applications.",
    "descriptionHi": "सुसंगत और कुशल हीटिंग अनुप्रयोगों के लिए आदर्श उच्च-प्रदर्शन औद्योगिक हीटिंग उत्पाद।",
    "descriptionUr": "اعلی کارکرد والا صنعتی ہیٹنگ پروڈکٹ جو مستقل اور مؤثر حرارتی اطلاقات کے لیے مثالی ہے۔",
    "descriptionAr": "منتج تدفئة صناعي عالي الأداء مثالي لتطبيقات التدفئة المتسقة والفعالة.",
    "price": 750,
    "originalPrice": 750,
    "category": "OIL IMMERSION",
    "images": [
      "OIL IMMERSION HEATER/OIL IMMERSION HEATER _1.webp",
      "OIL IMMERSION HEATER/OIL IMMERSION HEATER.avif",
      "OIL IMMERSION HEATER/OIL IMMERSION HEATER_2.jpeg"
    ],
    "sizes": ["11 inch", "12 inch", "13 inch", "19 inch"],
    "sizeOptions": [
      {"size": "11 inch", "price": 750, "originalPrice": 950, "inStock": true},
      {"size": "12 inch", "price": 850, "originalPrice": 1150, "inStock": true},
      {"size": "13 inch", "price": 950, "originalPrice": 1350, "inStock": true},
      {"size": "19 inch", "price": 1050, "originalPrice": 1450, "inStock": true}
    ],
    "inStock": true,
    "features": [],
    "featuresHi": [],
    "featuresUr": [],
    "featuresAr": []
  },
  {
    "id": "14",
    "name": "PANEL SPACE HEATER",
    "nameHi": "PANEL SPACE (हीटर)",
    "nameUr": "PANEL SPACE ہیٹر",
    "nameAr": "PANEL SPACE سخان",
    "description": "High-performance industrial heating product ideal for consistent and efficient heating applications.",
    "descriptionHi": "सुसंगत और कुशल हीटिंग अनुप्रयोगों के लिए आदर्श उच्च-प्रदर्शन औद्योगिक हीٹिंग उत्पाद।",
    "descriptionUr": "اعلی کارکرد والا صنعتی ہیٹنگ پروڈکٹ جو مستقل اور مؤثر حرارتی اطلاقات کے لیے مثالی ہے۔",
    "descriptionAr": "منتج تدفئة صناعي عالي الأداء مثالي لتطبيقات التدفئة المتسقة والفعالة.",
    "price": 120,
    "originalPrice": 120,
    "category": "PANEL SPACE",
    "images": [
      "panel space heater/79581ef8-39d5-4746-bbd8-c81bbcf4cc22.jpeg",
      "panel space heater/adce2462-c3be-411a-a689-60e73f28fb2a.jpeg",
      "panel space heater/f58c7aa3-79a6-4a4f-bbdb-77b324892b76.jpeg"
    ],
    "sizes": ["60W", "80W", "100W", "150W", "200W"],
    "sizeOptions": [
      {"size": "60W", "price": 120, "originalPrice": 200, "inStock": true},
      {"size": "80W", "price": 120, "originalPrice": 200, "inStock": true},
      {"size": "100W", "price": 130, "originalPrice": 200, "inStock": true},
      {"size": "150W", "price": 140, "originalPrice": 200, "inStock": true},
      {"size": "200W", "price": 150, "originalPrice": 200, "inStock": true}
    ],
    "inStock": true,
    "features": [],
    "featuresHi": [],
    "featuresUr": [],
    "featuresAr": []
  },
  {
    "id": "15",
    "name": "ROUND COIL HEATER",
    "nameHi": "ROUND COIL (हीٹر)",
    "nameUr": "ROUND COIL ہیٹر",
    "nameAr": "ROUND COIL سخان",
    "description": "High-performance industrial heating product ideal for consistent and efficient heating applications.",
    "descriptionHi": "सुसंगत और कुशल हीटिंग अनुप्रयोगों के लिए आदर्श उच्च-प्रदर्शन औद्योगिक हीटिंग उत्पाद।",
    "descriptionUr": "اعلی کارکرد والا صنعتی ہیٹنگ پروڈکٹ جو مستقل اور مؤثر حرارتی اطلاقات کے لیے مثالی ہے۔",
    "descriptionAr": "منتج تدفئة صناعي عالي الأداء مثالي لتطبيقات التدفئة المتسقة والفعالة.",
    "price": 350,
    "originalPrice": 350,
    "category": "ROUND COIL",
    "images": [
      "ROUND COIL HEATER/img-20181003-wa0013-500x500.webp",
      "ROUND COIL HEATER/round-coil-heater-1000x1000.webp",
      "ROUND COIL HEATER/round-jalebi-heater-coil-500x500.webp",
      "ROUND COIL HEATER/top-terminal-jalebi-type-air-heater-500x500.webp"
    ],
    "sizes": ["3 Ring", "4 Ring", "5 Ring", "6 Ring", "7 Ring", "8 Ring"],
    "sizeOptions": [
      {"size": "3 Ring", "price": 350, "originalPrice": 450, "inStock": true},
      {"size": "4 Ring", "price": 380, "originalPrice": 480, "inStock": true},
      {"size": "5 Ring", "price": 390, "originalPrice": 490, "inStock": true},
      {"size": "6 Ring", "price": 430, "originalPrice": 530, "inStock": true},
      {"size": "7 Ring", "price": 450, "originalPrice": 550, "inStock": true},
      {"size": "8 Ring", "price": 470, "originalPrice": 570, "inStock": true}
    ],
    "inStock": true,
    "features": [],
    "featuresHi": [],
    "featuresUr": [],
    "featuresAr": []
  },
  {
    "id": "16",
    "name": "SILICA GLASS ACID HEATER",
    "nameHi": "SILICA GLASS ACID  (हीटर)",
    "nameUr": "SILICA GLASS ACID ہیٹر",
    "nameAr": "SILICA GLASS ACID سخان",
    "description": "High-performance industrial heating product ideal for consistent and efficient heating applications.",
    "descriptionHi": "सुसंगत और कुशल हीटिंग अनुप्रयोगों के लिए आदर्श उच्च-प्रदर्शन औद्योगिक हीٹिंग उत्पाद।",
    "descriptionUr": "اعلی کارکرد والا صنعتی ہیٹنگ پروڈکٹ جو مستقل اور مؤثر حرارتی اطلاقات کے لیے مثالی ہے۔",
    "descriptionAr": "منتج تدفئة صناعي عالي الأداء مثالي لتطبيقات التدفئة المتسقة والفعالة.",
    "price": 4499,
    "originalPrice": 4499,
    "category": "SILICA GLASS TUBE",
    "images": [
      "SILICA GLASS ACID HEATER/silica-glass-tube-heater-500x500.webp"
    ],
    "sizes": ["500W", "750W", "1KW"],
    "sizeOptions": [
      {"size": "3 KW", "price": 4499, "originalPrice": 5500, "inStock": true},
      {"size": "4 KW", "price": 5999, "originalPrice": 6500, "inStock": true},
      {"size": "5 KW", "price": 7499, "originalPrice": 8000, "inStock": true}
    ],
    "inStock": true,
    "features": [],
    "featuresHi": [],
    "featuresUr": [],
    "featuresAr": []
  },
  {
    "id": "17",
    "name": "SS BOBBIN HEATER",
    "nameHi": "SS BOBBIN (हीٹر)",
    "nameUr": "SS BOBBIN ہیٹر",
    "nameAr": "SS BOBBIN سخان",
    "description": "High-performance industrial heating product ideal for consistent and efficient heating applications. Note: Pricing is 50 rupees per running inch (length-based; contact for custom quotes).",
    "descriptionHi": "सुसंगत और कुशल हीटिंग अनुप्रयोगों के लिए आदर्श उच्च-प्रदर्शन औद्योगिक हीटिंग उत्पाद। नोट: मूल्य 50 रुपये प्रति रनिंग इंच (लंबाई-आधारित; कस्टम कोट के लिए संपर्क करें)।",
    "descriptionUr": "اعلی کارکرد والا صنعتی ہیٹنگ پروڈکٹ جو مستقل اور مؤثر حرارتی اطلاقات کے لیے مثالی ہے۔ نوٹ: قیمت 50 روپے فی رننگ انچ (لمبائی کی بنیاد پر؛ کسٹم کوٹ کے لیے رابطہ کریں)۔",
    "descriptionAr": "منتج تدفئة صناعي عالي الأداء مثالي لتطبيقات التدفئة المتسقة والفعالة. ملاحظة: التسعير 50 روبية لكل بوصة تشغيل (بناءً على الطول؛ اتصل لعروض مخصصة).",
    "price": 300,
    "originalPrice": 300,
    "category": "SS BOBBIN",
    "images": [
      "SS BOBBIN HEATER/ss-bobbin-heater-500x500.webp",
      "SS BOBBIN HEATER/ss-electric-bobbin-heater-023.jpg",
      "SS BOBBIN HEATER/sunilheat-ss-bobbin-porcelain-immersion-heater-500x500.webp"
    ],
    "sizes": ["Standard Size"],
    "sizeOptions": [
      {"size": "50 RUP RUNNING INCH", "price": 0, "originalPrice": 0, "inStock": true}
    ],
    "inStock": true,
    "features": [],
    "featuresHi": [],
    "featuresUr": [],
    "featuresAr": []
  },
  {
    "id": "18",
    "name": "STRIP FINNED HEATER",
    "nameHi": "STRIP FINNED (हीٹر)",
    "nameUr": "STRIP FINNED ہیٹر",
    "nameAr": "STRIP FINNED سخان",
    "description": "High-performance industrial heating product ideal for consistent and efficient heating applications.",
    "descriptionHi": "सुसंगत और कुशल हीटिंग अनुप्रयोगों के लिए आदर्श उच्च-प्रदर्शन औد्योगिक हीٹिंग उत्पाद।",
    "descriptionUr": "اعلی کارکرد والا صنعتی ہیٹنگ پروڈکٹ جو مستقل اور مؤثر حرارتی اطلاقات کے لیے مثالی ہے۔",
    "descriptionAr": "منتج تدفئة صناعي عالي الأداء مثالي لتطبيقات التدفئة المتسقة والفعالة.",
    "price": 150,
    "originalPrice": 150,
    "category": "STRIP",
    "images": [
      "STRIP HEATER/FINNED  HEATER STRIP HEATER/FINNED U TYPE STRIP HEATER/finned-strip-heaters-1000x1000.jpg",
      "STRIP HEATER/ceramic-strip-heaters-1000x1000.webp",
      "STRIP HEATER/strip-heater-1000x1000.jpg",
      "STRIP HEATER/strip-heaters-1000x1000.webp"
     ],
    "sizes": ["12 inch", "18 inch", "29 inch", "30 inch", "33.5 inch", "36 inch", "24 inch"],
    "sizeOptions": [
      {"size": "12 inch", "price": 150, "originalPrice": 200, "inStock": true},
      {"size": "18 inch", "price": 220, "originalPrice": 250, "inStock": true},
      {"size": "24 inch", "price": 300, "originalPrice": 350, "inStock": true},
      {"size": "29 inch", "price": 360, "originalPrice": 400, "inStock": true},
      {"size": "30 inch", "price": 375, "originalPrice": 450, "inStock": true},
      {"size": "33.5 inch", "price": 419, "originalPrice": 500, "inStock": true},
      {"size": "36 inch", "price": 450, "originalPrice": 520, "inStock": true}
    ],
    "inStock": true,
    "features": [],
    "featuresHi": [],
    "featuresUr": [],
    "featuresAr": []
  },
  {
    "id": "19",
    "name": "TITANIUM HEATER",
    "nameHi": "TITANIUM (हीٹر)",
    "nameUr": "TITANIUM ہیٹر",
    "nameAr": "TITANIUM سخان",
    "description": "High-performance industrial heating product ideal for consistent and efficient heating applications.",
    "descriptionHi": "सुसंगत और कुशल हीटिंग अनुप्रयोगों के लिए आदर्श उच्च-प्रदर्शन औद्योगिक हीटिंग उत्पाद।",
    "descriptionUr": "اعلی کارکرد والا صنعتی ہیٹنگ پروڈکٹ جو مستقل اور مؤثر حرارتی اطلاقات کے لیے مثالی ہے۔",
    "descriptionAr": "منتج تدفئة صناعي عالي الأداء مثالي لتطبيقات التدفئة المتسقة والفعالة.",
    "price": 600,
    "originalPrice": 600,
    "category": "TITANIUM",
    "images": [
      "TITANIUM HEATER/1wdrz0ahssg.jpeg",
      "TITANIUM HEATER/titanium-heater-500x500 (1).webp",
      "TITANIUM HEATER/titanium-heater-500x500.jpeg",
      "TITANIUM HEATER/titanium-immersion-heater-1000x1000.png"
    ],
    "sizes": ["12 inch", "18 inch", "24 inch", "30 inch", "36 inch"],
    "sizeOptions": [
      {"size": "12 inch OD 25mm", "price": 600, "originalPrice": 900, "inStock": true},
      {"size": "18 inch OD 25mm", "price": 900, "originalPrice": 1200, "inStock": true},
      {"size": "24 inch OD 25mm", "price": 1200, "originalPrice": 1500, "inStock": true},
      {"size": "30 inch OD 25mm", "price": 1500, "originalPrice": 1800, "inStock": true},
      {"size": "36 inch OD 25mm", "price": 1800, "originalPrice": 2100, "inStock": true}
    ],
    "inStock": true,
    "features": [],
    "featuresHi": [],
    "featuresUr": [],
    "featuresAr": []
  },
  {
    "id": "20",
    "name": "U TYPE WATER HEATER",
    "nameHi": "U TYPE WATER (हीटर)",
    "nameUr": "U TYPE ہیٹر",
    "nameAr": "U TYPE سخان",
    "description": "High-performance industrial heating product ideal for consistent and efficient heating applications.",
    "descriptionHi": "सुसंगत और कुशल हीटिंग अनुप्रयोगों के लिए आदर्श उच्च-प्रदर्शन औद्योगिक हीटिंग उत्पाद।",
    "descriptionUr": "اعلی کارکرد والا صنعتی ہیٹنگ پروڈکٹ جو مستقل اور مؤثر حرارتی اطلاقات کے لیے مثالی ہے۔",
    "descriptionAr": "منتج تدفئة صناعي عالي الأداء مثالي لتطبيقات التدفئة المتسقة والفعالة.",
    "price": 250,
    "originalPrice": 250,
    "category": "U TYPE",
    "images": [
      "U WATER TYPE HEATER/U TYPE HEATER IMAGE 1.jpeg",
      "U WATER TYPE HEATER/U TYPE HEATER IMAGE 2.jpeg",
      "U WATER TYPE HEATER/U TYPE HEATER IMAGE 3.jpeg",
      "U WATER TYPE HEATER/U TYPE HEATER IMAGE 4.jpg",
      "U WATER TYPE HEATER/U TYPE HEATER IMAGE 5.avif"
    ],
    "sizes": ["6 inch", "8 inch", "10 inch", "12 inch", "18 inch", "24 inch", "30 inch", "36 inch", "48 inch"],
    "sizeOptions": [
      {"size": "6 inch", "price": 250, "originalPrice": 250, "inStock": true},
      {"size": "8 inch", "price": 300, "originalPrice": 300, "inStock": true},
      {"size": "10 inch", "price": 220, "originalPrice": 220, "inStock": true},
      {"size": "12 inch", "price": 230, "originalPrice": 230, "inStock": true},
      {"size": "18 inch", "price": 240, "originalPrice": 240, "inStock": true},
      {"size": "24 inch", "price": 250, "originalPrice": 250, "inStock": true},
      {"size": "30 inch", "price": 260, "originalPrice": 260, "inStock": true},
      {"size": "36 inch", "price": 270, "originalPrice": 270, "inStock": true},
      {"size": "48 inch", "price": 280, "originalPrice": 280, "inStock": true}
    ],
    "inStock": true,
    "features": [],
    "featuresHi": [],
    "featuresUr": [],
    "featuresAr": []
  },
  {
    "id": "21",
    "name": "WASHING MACHINE TYPE HEATER",
    "nameHi": "WASHING MACHINE TYPE (हीٹر)",
    "nameUr": "WASHING MACHINE TYPE ہیٹر",
    "nameAr": "WASHING MACHINE TYPE سخان",
    "description": "High-performance industrial heating product ideal for consistent and efficient heating applications.",
    "descriptionHi": "सुसंगत और कुशल हीटिंग अनुप्रयोगों के लिए आदर्श उच्च-प्रदर्शन औد्योगिक हीٹिंग उत्पाद।",
    "descriptionUr": "اعلی کارکرد والا صنعتی ہیٹنگ پروڈکٹ جو مستقل اور مؤثر حرارتی اطلاقات کے لیے مثالی ہے۔",
    "descriptionAr": "منتج تدفئة صناعي عالي الأداء مثالي لتطبيقات التدفئة المتسقة والفعالة.",
    "price": 450,
    "originalPrice": 450,
    "category": "M TYPE",
    "images": [
      "_M TYPE HEATER/m-type-heater-1000x1000.jpg",
      "_M TYPE HEATER/M-Type-Heater.jpeg"
    ],
    "sizes": ["Standard", "Heavy Duty"],
    "sizeOptions": [
      {"size": "Standard", "price": 450, "originalPrice": 500, "inStock": true},
      {"size": "Heavy Duty", "price": 650, "originalPrice": 700, "inStock": true}
    ],
    "inStock": true,
    "features": [],
    "featuresHi": [],
    "featuresUr": [],
    "featuresAr": []
  },
  {
    "id": "22",
    "name": "SILICA GLASS TUBE HEATER",
    "nameHi": "SILICA GLASS TUBE (हीٹر)",
    "nameUr": "SILICA GLASS TUBE ہیٹر",
    "nameAr": "SILICA GLASS TUBE سخان",
    "description": "High-performance industrial heating product ideal for consistent and efficient heating applications.",
    "descriptionHi": "सुसंगत और कुशल हीटिंग अनुप्रयोगों के लिए आदर्श उच्च-प्रदर्शन औद्योगिक हीٹिंग उत्पाद।",
    "descriptionUr": "اعلی کارکرد والا صنعتی ہیٹنگ پروڈکٹ جو مستقل اور مؤثر حرارتی اطلاقات کے لیے مثالی ہے۔",
    "descriptionAr": "منتج تدفئة صناعي عالي الأداء مثالي لتطبيقات التدفئة المتسقة والفعالة.",
    "price": 4499,
    "originalPrice": 4499,
    "category": "SILICA GLASS TUBE",
    "images": [
      "SILICA GLASS TUBE HEATER/SILICA GLASS TUBE HEATER 1.jpeg",
      "SILICA GLASS TUBE HEATER/SILICA GLASS TUBE HEATER 2.jpeg",
      "SILICA GLASS TUBE HEATER/SILICA GLASS TUBE HEATER 3.jpeg"
    ],
    "sizes": ["500W", "750W", "1KW"],
    "sizeOptions": [
      {"size": "25 RUP RUNNING INCH (1 KW)", "price": 0, "originalPrice": 0, "inStock": true},
      {"size": "27 RUP RUNNING INCH (2 KW)", "price": 0, "originalPrice": 0, "inStock": true},
      {"size": "29 RUP RUNNING INCH (3 KW)", "price": 0, "originalPrice": 0, "inStock": true}
    ],
    "inStock": true,
    "features": [],
    "featuresHi": [],
    "featuresUr": [],
    "featuresAr": []
  },
  {
    "id": "23",
    "name": "U TYPE FINNED HEATER",
    "nameHi": "U TYPE FINNED (हीटर)",
    "nameUr": "U TYPE FINNED ہیٹر",
    "nameAr": "U TYPE FINNED سخان",
    "description": "High-performance industrial heating product ideal for consistent and efficient heating applications.",
    "descriptionHi": "सुसंगत और कुशल हीटिंग अनुप्रयोगों के लिए आदर्श उच्च-प्रदर्शन औद्योगिक हीटिंग उत्पाद।",
    "descriptionUr": "اعلی کارکرد والا صنعتی ہیٹنگ پروڈکٹ جو مستقل اور مؤثر حرارتی اطلاقات کے لیے مثالی ہے۔",
    "descriptionAr": "منتج تدفئة صناعي عالي الأداء مثالي لتطبيقات التدفئة المتسقة والفعالة.",
    "price": 250,
    "originalPrice": 250,
    "category": "U TYPE",
    "images": [
      "U TYPE FINNED HEATER/U TYPE FINNED HEATER 1.jpeg",
      "U TYPE FINNED HEATER/U TYPE FINNED HEATER 2.jpeg",
      "U TYPE FINNED HEATER/U TYPE FINNED HEATER 3.jpeg",
      "U TYPE FINNED HEATER/U TYPE FINNED HEATER 4.jpeg"
    ],
    "sizes": ["12 inch", "18 inch", "24 inch", "30 inch", "36 inch", "48 inch"],
    "sizeOptions": [
      {"size": "12 inch", "price": 150, "originalPrice": 200, "inStock": true},
      {"size": "18 inch", "price": 220, "originalPrice": 240, "inStock": true},
      {"size": "24 inch", "price": 290, "originalPrice": 310, "inStock": true},
      {"size": "30 inch", "price": 360, "originalPrice": 390, "inStock": true},
      {"size": "36 inch", "price": 430, "originalPrice": 450, "inStock": true},
      {"size": "48 inch", "price": 580, "originalPrice": 600, "inStock": true}
    ],
    "inStock": true,
    "features": [],
    "featuresHi": [],
    "featuresUr": [],
    "featuresAr": []
  },
  {
    "id": "24",
    "name": "U TYPE HEATER",
    "nameHi": "U TYPE HEATER (हीटर)",
    "nameUr": "U TYPE HEATER ہیٹر",
    "nameAr": "U TYPE HEATER سخان",
    "description": "High-performance industrial heating product ideal for consistent and efficient heating applications.",
    "descriptionHi": "सुसंगत और कुशल हीटिंग अनुप्रयोगों के लिए आदर्श उच्च-प्रदर्शन औद्योगिक हीटिंग उत्पाद।",
    "descriptionUr": "اعلی کارکرد والا صنعتی ہیٹنگ پروڈکٹ جو مستقل اور مؤثر حرارتی اطلاقات کے لیے مثالی ہے۔",
    "descriptionAr": "منتج تدفئة صناعي عالي الأداء مثالي لتطبيقات التدفئة المتسقة والفعالة.",
    "price": 250,
    "originalPrice": 250,
    "category": "U TYPE",
    "images": [
      "U TYPE HEATER/U TYPE HEATER.jpeg",
      "U TYPE HEATER/U TYPE HEATER 2.jpeg",
      "U TYPE HEATER/U TYPE HEATER 3.jpeg"
    ],
    "sizes": ["12 inch", "18 inch", "24 inch", "30 inch", "36 inch", "48 inch"],
    "sizeOptions": [
      {"size": "12 inch", "price": 96, "originalPrice": 120, "inStock": true},
      {"size": "18 inch", "price": 145, "originalPrice": 190, "inStock": true},
      {"size": "24 inch", "price": 192, "originalPrice": 250, "inStock": true},
      {"size": "30 inch", "price": 240, "originalPrice": 300, "inStock": true},
      {"size": "36 inch", "price": 290, "originalPrice": 350, "inStock": true},
      {"size": "48 inch", "price": 385, "originalPrice": 500, "inStock": true}
    ],
    "inStock": true,
    "features": [],
    "featuresHi": [],
    "featuresUr": [],
    "featuresAr": []
  },
  {
    "id": "25",
    "name": "STRAIGHT FINNED HEATER DRYER",
    "nameHi": "STRAIGHT FINNED(हीटर)",
    "nameUr": "STRAIGHT FINNED ہیٹر",
    "nameAr": "STRAIGHT FINNED سخان",
    "description": "High-performance industrial heating product ideal for consistent and efficient heating applications.",
    "descriptionHi": "सुसंगत और कुशल हीटिंग अनुप्रयोगों के लिए आदर्श उच्च-प्रदर्शन औद्योगिक हीटिंग उत्पाद।",
    "descriptionUr": "اعلی کارکرد والا صنعتی ہیٹنگ پروڈکٹ جو مستقل اور مؤثر حرارتی اطلاقات کے لیے مثالی ہے۔",
    "descriptionAr": "منتج تدفئة صناعي عالي الأداء مثالي لتطبيقات التدفئة المتسقة والفعالة.",
    "price": 300,
    "originalPrice": 300,
    "category": "FINNED",
    "images": [
      "STRAIGHT FINNED HEATER DRYER/STRAIGHT FINNED HEATER DRYER 1.jpeg",
      "STRAIGHT FINNED HEATER DRYER/STRAIGHT FINNED HEATER DRYER 2.jpeg",
      "STRAIGHT FINNED HEATER DRYER/STRAIGHT FINNED HEATER DRYER 3.jpeg",
      "STRAIGHT FINNED HEATER DRYER/STRAIGHT FINNED HEATER DRYER 4.jpeg"
    ],
    "sizes": ["Standard Size"],
    "sizeOptions": [
      {"size": "Standard Size", "price": 0, "originalPrice": 0, "inStock": true}
    ],
    "inStock": true,
    "features": [],
    "featuresHi": [],
    "featuresUr": [],
    "featuresAr": []
  },
  {
    "id": "26",
    "name": "MICA NOZZLE Heater",
    "nameHi": "MICA NOZZLE Heater (हीटर)",
    "nameUr": "MICA NOZZLE Heater ہیٹر",
    "nameAr": "MICA NOZZLE Heater سخان",
    "description": "High-performance industrial heating product ideal for consistent and efficient heating applications. Note: Pricing is 5 rupees per square inch (area-based; contact for custom quotes).",
    "descriptionHi": "सुसंगत और कुशल हीटिंग अनुप्रयोगों के लिए आदर्श उच्च-प्रदर्शन औद्योगिक हीटिंग उत्पाद। नोट: मूल्य 5 रुपये प्रति वर्ग इंच (क्षेत्रफल-आधारित; कस्टम कोट के लिए संपर्क करें)।",
    "descriptionUr": "اعلی کارکرد والا صنعتی ہیٹنگ پروڈکٹ جو مستقل اور مؤثر حرارتی اطلاقات کے لیے مثالی ہے۔ نوٹ: قیمت 5 روپے فی مربع انچ (رقبہ کی بنیاد پر؛ کسٹم کوٹ کے لیے رابطہ کریں)۔",
    "descriptionAr": "منتج تدفئة صناعي عالي الأداء مثالي لتطبيقات التدفئة المتسقة والفعالة. ملاحظة: التسعير 5 روبية لكل بوصة مربعة (بناءً على المساحة؛ اتصل لعروض مخصصة).",
    "price": 300,
    "originalPrice": 300,
    "category": "MICA NOZZLE",
    "images": [
      "MICA NOZZLE HEATER/MICA NOZZLE HEATER 1.jpeg",
      "MICA NOZZLE HEATER/MICA NOZZLE HEATER 2.jpeg",
      "MICA NOZZLE HEATER/MICA NOZZLE HEATER 3.jpeg",
      "MICA NOZZLE HEATER/MICA NOZZLE HEATER 4.jpeg"
    ],
    "sizes": ["Standard Size"],
    "sizeOptions": [
      {"size": "PER PIC", "price": 150, "originalPrice": 200, "inStock": true}
    ],
    "inStock": true,
    "features": [],
    "featuresHi": [],
    "featuresUr": [],
    "featuresAr": []
  }
];