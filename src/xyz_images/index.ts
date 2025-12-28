// This file serves as a placeholder for banner images and fallback images
// Product images should use their actual paths from products.ts

// Default fallback image for when product images are not available
export const imagePlaceholder = "data:image/svg+xml,%3Csvg width='400' height='400' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23999' font-family='Arial, sans-serif' font-size='16'%3EProduct Image%3C/text%3E%3C/svg%3E";

// Function to get product image - uses actual images from products.ts
export const getProductImage = (imagePath: string, productName: string, index: number = 0): string => {
  // If no image path provided, return placeholder with product name
  if (!imagePath || imagePath.trim() === '') {
    return `data:image/svg+xml,%3Csvg width='400' height='400' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='%23667eea'/%3E%3Ctext x='50%25' y='45%25' dominant-baseline='middle' text-anchor='middle' fill='white' font-family='Arial, sans-serif' font-size='18' font-weight='bold'%3E${encodeURIComponent(productName)}%3C/text%3E%3Ctext x='50%25' y='60%25' dominant-baseline='middle' text-anchor='middle' fill='rgba(255,255,255,0.8)' font-family='Arial, sans-serif' font-size='14'%3EImage ${index + 1}%3C/text%3E%3C/svg%3E`;
  }
  
  // Handle different image path formats from products.ts
  let processedPath = imagePath;
  
  // Remove leading slash if present and ensure proper path format
  if (processedPath.startsWith('/src/')) {
    processedPath = processedPath.substring(1); // Remove leading slash
  } else if (processedPath.startsWith('src/')) {
    // Path is already in correct format
  } else {
    // For simple filenames like "headphones1.jpg", assume they're in mobile folder
    processedPath = `mobile/${processedPath}`;
  }
  
  // Return the processed image path - Vite will handle the import
  return `/${processedPath}`;
};

// Hero Banner Images for Slider - Import actual banner images
import banner1 from './banner/banner1.jpg';
import banner2 from './banner/banner2.jpg';
import banner3 from './banner/banner3.jpg';
import banner4 from './banner/banner4.jpg';
import banner5 from './banner/banner5.jpg';

export const heroBanner1 = banner1; 
export const heroBanner2 = banner2;
export const heroBanner3 = banner3;
export const heroBanner4 = banner4; 
export const heroBanner5 = banner5;

// QR Code for payment
export const qrCodeImage = "data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='white'/%3E%3Cg fill='black'%3E%3Crect x='20' y='20' width='20' height='20'/%3E%3Crect x='60' y='20' width='20' height='20'/%3E%3Crect x='100' y='20' width='20' height='20'/%3E%3Crect x='140' y='20' width='20' height='20'/%3E%3Crect x='20' y='60' width='20' height='20'/%3E%3Crect x='100' y='60' width='20' height='20'/%3E%3Crect x='160' y='60' width='20' height='20'/%3E%3Crect x='40' y='100' width='20' height='20'/%3E%3Crect x='80' y='100' width='20' height='20'/%3E%3Crect x='120' y='100' width='20' height='20'/%3E%3Crect x='160' y='100' width='20' height='20'/%3E%3Crect x='20' y='140' width='20' height='20'/%3E%3Crect x='60' y='140' width='20' height='20'/%3E%3Crect x='100' y='140' width='20' height='20'/%3E%3Crect x='160' y='140' width='20' height='20'/%3E%3C/g%3E%3Ctext x='50%25' y='190' text-anchor='middle' fill='%23666' font-family='Arial, sans-serif' font-size='12'%3EQR Code%3C/text%3E%3C/svg%3E";

// Legacy image exports for backward compatibility with Cart.tsx and other components
export const phoneImage = "data:image/svg+xml,%3Csvg width='400' height='400' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='%23667eea'/%3E%3Ctext x='50%25' y='45%25' dominant-baseline='middle' text-anchor='middle' fill='white' font-family='Arial, sans-serif' font-size='20' font-weight='bold'%3ESmartphone%3C/text%3E%3C/svg%3E";

export const headphonesImage = "data:image/svg+xml,%3Csvg width='400' height='400' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='%23f093fb'/%3E%3Ctext x='50%25' y='45%25' dominant-baseline='middle' text-anchor='middle' fill='white' font-family='Arial, sans-serif' font-size='20' font-weight='bold'%3EHeadphones%3C/text%3E%3C/svg%3E";

export const laptopImage = "data:image/svg+xml,%3Csvg width='400' height='400' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='%23f6d365'/%3E%3Ctext x='50%25' y='45%25' dominant-baseline='middle' text-anchor='middle' fill='%23333' font-family='Arial, sans-serif' font-size='20' font-weight='bold'%3ELaptop%3C/text%3E%3C/svg%3E";

export const watchImage = "data:image/svg+xml,%3Csvg width='400' height='400' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='%23a8edea'/%3E%3Ctext x='50%25' y='45%25' dominant-baseline='middle' text-anchor='middle' fill='%23333' font-family='Arial, sans-serif' font-size='20' font-weight='bold'%3ESmart Watch%3C/text%3E%3C/svg%3E";

// export const heroBanner2 = "data:image/svg+xml,%3Csvg width='1200' height='400' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='grad2' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23f093fb;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23f5576c;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grad2)'/%3E%3Ctext x='30%25' y='40%25' fill='white' font-family='Arial, sans-serif' font-size='48' font-weight='bold'%3EAudio Collection%3C/text%3E%3Ctext x='30%25' y='55%25' fill='rgba(255,255,255,0.9)' font-family='Arial, sans-serif' font-size='24'%3EPremium Sound Experience%3C/text%3E%3Ctext x='30%25' y='70%25' fill='rgba(255,255,255,0.8)' font-family='Arial, sans-serif' font-size='18'%3EWireless • Noise Cancelling • HD Audio%3C/text%3E%3Ccircle cx='900' cy='200' r='80' fill='rgba(255,255,255,0.1)'/%3E%3Ctext x='900' y='210' text-anchor='middle' fill='white' font-family='Arial, sans-serif' font-size='16' font-weight='bold'%3E🎧%3C/text%3E%3C/svg%3E";

// export const heroBanner3 = "data:image/svg+xml,%3Csvg width='1200' height='400' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='grad3' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23f6d365;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23fda085;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grad3)'/%3E%3Ctext x='30%25' y='40%25' fill='%23333' font-family='Arial, sans-serif' font-size='48' font-weight='bold'%3ELaptop %26 Computing%3C/text%3E%3Ctext x='30%25' y='55%25' fill='rgba(51,51,51,0.9)' font-family='Arial, sans-serif' font-size='24'%3EPowerful Performance%3C/text%3E%3Ctext x='30%25' y='70%25' fill='rgba(51,51,51,0.8)' font-family='Arial, sans-serif' font-size='18'%3EFast Processors • High Storage • Gaming Ready%3C/text%3E%3Ccircle cx='900' cy='200' r='80' fill='rgba(255,255,255,0.2)'/%3E%3Ctext x='900' y='210' text-anchor='middle' fill='%23333' font-family='Arial, sans-serif' font-size='16' font-weight='bold'%3E💻%3C/text%3E%3C/svg%3E";

// export const heroBanner4 = "data:image/svg+xml,%3Csvg width='1200' height='400' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='grad4' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23a8edea;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23fed6e3;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grad4)'/%3E%3Ctext x='30%25' y='40%25' fill='%23333' font-family='Arial, sans-serif' font-size='48' font-weight='bold'%3ESmart Watches%3C/text%3E%3Ctext x='30%25' y='55%25' fill='rgba(51,51,51,0.9)' font-family='Arial, sans-serif' font-size='24'%3EFitness %26 Health Tracking%3C/text%3E%3Ctext x='30%25' y='70%25' fill='rgba(51,51,51,0.8)' font-family='Arial, sans-serif' font-size='18'%3EHeart Rate • GPS • Water Resistant%3C/text%3E%3Ccircle cx='900' cy='200' r='80' fill='rgba(255,255,255,0.2)'/%3E%3Ctext x='900' y='210' text-anchor='middle' fill='%23333' font-family='Arial, sans-serif' font-size='16' font-weight='bold'%3E⌚%3C/text%3E%3C/svg%3E";

// export const heroBanner5 = "data:image/svg+xml,%3Csvg width='1200' height='400' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='grad5' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23667eea;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%2390a8ea;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grad5)'/%3E%3Ctext x='30%25' y='40%25' fill='white' font-family='Arial, sans-serif' font-size='48' font-weight='bold'%3EElectronics Sale%3C/text%3E%3Ctext x='30%25' y='55%25' fill='rgba(255,255,255,0.9)' font-family='Arial, sans-serif' font-size='24'%3EMega Electronics Festival%3C/text%3E%3Ctext x='30%25' y='70%25' fill='rgba(255,255,255,0.8)' font-family='Arial, sans-serif' font-size='18'%3EFree Shipping • Easy Returns • 24/7 Support%3C/text%3E%3Ccircle cx='900' cy='200' r='80' fill='rgba(255,255,255,0.1)'/%3E%3Ctext x='900' y='210' text-anchor='middle' fill='white' font-family='Arial, sans-serif' font-size='16' font-weight='bold'%3E🛒%3C/text%3E%3C/svg%3E";
