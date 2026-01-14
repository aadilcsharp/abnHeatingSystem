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
    id: "101",
    name: "Palki Dry Fruit Tray",
    nameHi: "पालकी ड्राई फ्रूट ट्रे",
    nameUr: "پالکی ڈرائی فروٹ ٹرے",
    nameAr: "صينية فواكه جافة بالكي",
    description: "Elegant handcrafted palki tray ideal for serving dry fruits, sweets, and festive offerings.",
    descriptionHi: "ड्राई फ्रूट, मिठाइयाँ और त्योहारी प्रसाद परोसने के लिए सुंदर हस्तनिर्मित पालकी ट्रे।",
    descriptionUr: "خشک میوہ جات، مٹھائیوں اور تہواروں کی پیشکش کے لیے خوبصورت ہاتھ سے بنی پالکی ٹرے۔",
    descriptionAr: "صينية بالكي مصنوعة يدويًا مثالية لتقديم الفواكه الجافة والحلويات والمناسبات الخاصة.",
    price: 1499,
    originalPrice: 1799,
    category: "HANDICRAFT TRAYS",
    images: [
      "palki/Palki-Front.png",
      "palki/Palki-Front-2.png",
      "palki/Palki-Front-3.png",
      "palki/Palki-Side-1.png",
      "palki/Palki-Side-2.png"
    ],
    sizes: ["Standard"],
    inStock: true,
    features: ["Handcrafted", "Premium finish", "Festive use"],
    featuresHi: ["हस्तनिर्मित", "प्रीमियम फिनिश", "त्योहारी उपयोग"],
    featuresUr: ["ہاتھ سے بنی", "اعلیٰ معیار", "تہواروں کے لیے"],
    featuresAr: ["مصنوع يدويًا", "تشطيب فاخر", "مناسب للمناسبات"]
  },

  {
    id: "102",
    name: "Round Wooden Tray",
    nameHi: "गोल लकड़ी की ट्रे",
    nameUr: "گول لکڑی کی ٹرے",
    nameAr: "صينية دائرية خشبية",
    description: "Classic circular handcrafted tray suitable for dry fruits and snacks.",
    descriptionHi: "ड्राई फ्रूट और स्नैक्स के लिए उपयुक्त क्लासिक गोल हस्तनिर्मित ट्रे।",
    descriptionUr: "خشک میوہ جات اور اسنیکس کے لیے موزوں کلاسک گول ٹرے۔",
    descriptionAr: "صينية دائرية تقليدية مصنوعة يدويًا لتقديم الفواكه الجافة والوجبات الخفيفة.",
    price: 999,
    originalPrice: 1199,
    category: "HANDICRAFT TRAYS",
    images: [
      "tray-circle/tray-Circle-front.png",
      "tray-circle/tray-Circle-Side.png"
    ],
    sizes: ["Standard"],
    inStock: true,
    features: ["Round design", "Durable wood"],
    featuresHi: ["गोल डिज़ाइन", "मजबूत लकड़ी"],
    featuresUr: ["گول ڈیزائن", "مضبوط لکڑی"],
    featuresAr: ["تصميم دائري", "خشب متين"]
  },

  {
    id: "103",
    name: "Round 5-Section Dry Fruit Tray",
    nameHi: "गोल 5 सेक्शन ड्राई फ्रूट ट्रे",
    nameUr: "گول 5 حصوں والی ٹرے",
    nameAr: "صينية دائرية بخمسة أقسام",
    description: "Five-section circular tray for serving multiple dry fruits in an elegant way.",
    descriptionHi: "एक ही ट्रे में कई ड्राई फ्रूट परोसने के लिए 5 सेक्शन वाली ट्रे।",
    descriptionUr: "ایک ہی ٹرے میں مختلف خشک میوہ جات پیش کرنے کے لیے۔",
    descriptionAr: "صينية دائرية بخمسة أقسام لتقديم أنواع متعددة من الفواكه الجافة.",
    price: 1799,
    originalPrice: 2099,
    category: "HANDICRAFT TRAYS",
    images: [
      "tray-circle-cavity-5-section/tray-Circle-Cavity-5-Section.png",
      "tray-circle-cavity-5-section/tray-Circle-Cavity-5-Section-FrontM2.png",
      "tray-circle-cavity-5-section/tray-Circle-Cavity-5-Section-Side.png",
      "tray-circle-cavity-5-section/tray-Circle-Cavity-5-Section-Side2.png",
      "tray-circle-cavity-5-section/tray-Circle-Cavity-5-Section-Side3.png",
      "tray-circle-cavity-5-section/tray-Circle-Cavity-5-Section-SideM2.png"
    ],
    sizes: ["Standard"],
    inStock: true,
    features: ["5 compartments", "Elegant finish"],
    featuresHi: ["5 सेक्शन", "आकर्षक फिनिश"],
    featuresUr: ["5 خانے", "خوبصورت فنش"],
    featuresAr: ["خمسة أقسام", "تشطيب أنيق"]
  },

  {
    id: "104",
    name: "Heart Shape Tray",
    nameHi: "दिल के आकार की ट्रे",
    nameUr: "دل کی شکل کی ٹرے",
    nameAr: "صينية على شكل قلب",
    description: "Heart-shaped handcrafted tray perfect for gifting and special occasions.",
    descriptionHi: "उपहार और खास मौकों के लिए दिल के आकार की सुंदर ट्रे।",
    descriptionUr: "تحفے اور خاص مواقع کے لیے دل کی شکل کی ٹرے۔",
    descriptionAr: "صينية مصنوعة يدويًا على شكل قلب مثالية للهدايا.",
    price: 1299,
    originalPrice: 1599,
    category: "HANDICRAFT TRAYS",
    images: [
      "tray-heart/tray-Heart-Front.png",
      "tray-heart/tray-Heart-Front2.png",
      "tray-heart/tray-Heart-Side.png",
      "tray-heart/tray-Heart-Side2.png"
    ],
    sizes: ["Standard"],
    inStock: true,
    features: ["Heart design", "Gift friendly"],
    featuresHi: ["दिल डिज़ाइन", "उपहार के लिए उपयुक्त"],
    featuresUr: ["دل نما ڈیزائن", "تحفے کے لیے موزوں"],
    featuresAr: ["تصميم قلب", "مثالي للهدايا"]
  },

  {
    id: "105",
    name: "Mango Shape Tray",
    nameHi: "आम के आकार की ट्रे",
    nameUr: "آم کی شکل کی ٹرے",
    nameAr: "صينية على شكل مانجو",
    description: "Unique mango-shaped tray handcrafted for decorative serving.",
    descriptionHi: "सजावटी परोसने के लिए अनोखी आम आकार की ट्रे।",
    descriptionUr: "سجاوٹی پیشکش کے لیے منفرد آم کی شکل کی ٹرے۔",
    descriptionAr: "صينية فريدة على شكل مانجو للتقديم الزخرفي.",
    price: 1199,
    originalPrice: 1499,
    category: "HANDICRAFT TRAYS",
    images: [
      "tray-mango/tray-Mango-Side.png",
      "tray-mango/tray-Mango-Side2.png",
      "tray-mango/tray-Mango-Side3.png",
      "tray-mango/tray-Mango-Side4.png"
    ],
    sizes: ["Standard"],
    inStock: true,
    features: ["Unique shape", "Decorative"],
    featuresHi: ["अनोखा आकार", "सजावटी"],
    featuresUr: ["منفرد شکل", "آرائشی"],
    featuresAr: ["شكل فريد", "زخرفي"]
  },

  {
    id: "106",
    name: "Oval Wooden Tray",
    nameHi: "ओवल लकड़ी की ट्रे",
    nameUr: "بیضوی لکڑی کی ٹرے",
    nameAr: "صينية بيضاوية خشبية",
    description: "Elegant oval tray suitable for dry fruits and table décor.",
    descriptionHi: "ड्राई फ्रूट और टेबल सजावट के लिए सुंदर ओवल ट्रे।",
    descriptionUr: "خشک میوہ جات اور میز کی سجاوٹ کے لیے۔",
    descriptionAr: "صينية بيضاوية أنيقة لتقديم الفواكه الجافة.",
    price: 1099,
    originalPrice: 1399,
    category: "HANDICRAFT TRAYS",
    images: [
      "tray-oval/tray-Oval-Front.png",
      "tray-oval/tray-Oval-Side1.png",
      "tray-oval/tray-Oval-Side2.png",
      "tray-oval/tray-Oval-Side3.png"
    ],
    sizes: ["Standard"],
    inStock: true,
    features: ["Oval design", "Smooth finish"],
    featuresHi: ["ओवल डिज़ाइन", "स्मूद फिनिश"],
    featuresUr: ["بیضوی ڈیزائن", "ہموار فنش"],
    featuresAr: ["تصميم بيضاوي", "تشطيب ناعم"]
  }
];
