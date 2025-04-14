
import React, { createContext, useContext, useEffect, useState } from 'react';

// Define our translations
export const translations = {
  en: {
    appTitle: 'URL Audio Trigger',
    urlPlaceholder: 'Enter URL to trigger sound',
    addUrl: 'Add URL',
    uploadAudio: 'Upload Audio Files',
    testSound: 'Test Random Sound',
    activateService: 'Activate Service',
    serviceActive: 'Service is Active',
    serviceInactive: 'Service is Inactive',
    language: 'Language',
    audioFiles: 'Audio Files',
    noAudioFiles: 'No audio files uploaded yet',
    savedUrls: 'Saved URLs',
    noSavedUrls: 'No URLs saved yet',
    settings: 'Settings',
    testing: 'Testing',
    home: 'Home',
    english: 'English',
    arabic: 'العربية',
    deleteUrl: 'Delete',
    deleteAudio: 'Delete',
    upload: 'Upload',
    success: 'Success',
    error: 'Error',
    audioUploaded: 'Audio file uploaded successfully',
    urlAdded: 'URL added successfully',
    serviceEnabled: 'Service enabled successfully',
    serviceDisabled: 'Service disabled',
    noAudioForTest: 'No audio files available for testing',
    urlRemoved: 'URL removed successfully',
    audioRemoved: 'Audio file removed successfully',
    invalidUrl: 'Invalid URL format',
  },
  ar: {
    appTitle: 'مشغل الصوت عبر الروابط',
    urlPlaceholder: 'أدخل الرابط الذي سيطلق الصوت',
    addUrl: 'إضافة رابط',
    uploadAudio: 'رفع ملفات صوتية',
    testSound: 'اختبار صوت عشوائي',
    activateService: 'تفعيل الخدمة',
    serviceActive: 'الخدمة نشطة',
    serviceInactive: 'الخدمة غير نشطة',
    language: 'اللغة',
    audioFiles: 'الملفات الصوتية',
    noAudioFiles: 'لم يتم رفع ملفات صوتية بعد',
    savedUrls: 'الروابط المحفوظة',
    noSavedUrls: 'لا توجد روابط محفوظة بعد',
    settings: 'الإعدادات',
    testing: 'اختبار',
    home: 'الرئيسية',
    english: 'English',
    arabic: 'العربية',
    deleteUrl: 'حذف',
    deleteAudio: 'حذف',
    upload: 'رفع',
    success: 'نجاح',
    error: 'خطأ',
    audioUploaded: 'تم رفع الملف الصوتي بنجاح',
    urlAdded: 'تم إضافة الرابط بنجاح',
    serviceEnabled: 'تم تفعيل الخدمة بنجاح',
    serviceDisabled: 'تم تعطيل الخدمة',
    noAudioForTest: 'لا توجد ملفات صوتية متاحة للاختبار',
    urlRemoved: 'تم إزالة الرابط بنجاح',
    audioRemoved: 'تم إزالة الملف الصوتي بنجاح',
    invalidUrl: 'صيغة الرابط غير صالحة',
  }
};

type LanguageContextType = {
  language: 'en' | 'ar';
  setLanguage: (lang: 'en' | 'ar') => void;
  t: (key: keyof typeof translations.en) => string;
  dir: 'ltr' | 'rtl';
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'en' | 'ar'>('en');
  
  useEffect(() => {
    // Get saved language preference from localStorage
    const savedLanguage = localStorage.getItem('language') as 'en' | 'ar';
    
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ar')) {
      setLanguage(savedLanguage);
    }
  }, []);
  
  useEffect(() => {
    // Save language preference to localStorage
    localStorage.setItem('language', language);
    
    // Set the dir attribute on the document element
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    
    // Add or remove Arabic font class
    if (language === 'ar') {
      document.body.classList.add('font-arabic');
    } else {
      document.body.classList.remove('font-arabic');
    }
  }, [language]);
  
  const t = (key: keyof typeof translations.en): string => {
    return translations[language][key] || key;
  };
  
  const dir: 'ltr' | 'rtl' = language === 'ar' ? 'rtl' : 'ltr';
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
