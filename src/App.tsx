/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { UserSettings, Language } from './types';

import CertificateVerification from './components/CertificateVerification';
import GeminiConsultant from './components/GeminiConsultant';
import OrgChart from './components/OrgChart';
import AboutSection from './components/AboutSection';
import StandardsDirectory from './components/StandardsDirectory';
import CustomerProfile from './components/CustomerProfile';
import TrainingSection from './components/TrainingSection';
import InfoSections from './components/InfoSections';
import ProposalForm from './components/ProposalForm';
import AuthModal from './components/auth/AuthModal';
import NewsSection from './components/NewsSection';
import DownloadsSection from './components/DownloadsSection';
import NewsSlider from './components/NewsSlider';
import { auth, db } from './lib/firebase';
import { onAuthStateChanged, User, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { 
 ShieldCheck, 
 MapPin, 
 Phone, 
 Mail, 
 Globe, 
 Award, 
 FileText, 
 MessageSquare,
 Users,
 Menu,
 X,
 Facebook,
 Linkedin,
 MessageCircle,
 Layers,
 LogOut,
 User as UserIcon,
 ChevronDown,
 GraduationCap,
 Calculator,
 Home,
 Download
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function App() {
 const [settings, setSettings] = useState<UserSettings>({
 theme: 'corporate',
 fontSize: 'normal',
 lang: 'TH',
 primaryColor: '#2563eb' // Blue 600
 });

 const [activeTab, setActiveTab] = useState<'assess' | 'standards' | 'training' | 'verify' | 'org' | 'profile' | 'quote' | 'news' | 'downloads'>('assess');
 const [isAiOpen, setIsAiOpen] = useState(false);
 const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
 const [scrolled, setScrolled] = useState(false);
 const isDarkMode = false;

  // Auth State
  const [user, setUser] = useState<User | null>(null);
  const [authModal, setAuthModal] = useState<{isOpen: boolean, mode: 'login' | 'register'}>({
    isOpen: false,
    mode: 'login'
  });
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [isAdminModeActive, setIsAdminModeActive] = useState(false);

  // Fetch user role from Firestore if user changes
  useEffect(() => {
    if (!user) {
      setIsAdminModeActive(false);
      return;
    }
    
    // For mock users, they already have a role property
    if ((user as any).isMock) {
      if ((user as any).role !== 'admin') {
        setIsAdminModeActive(false);
      }
      return;
    }

    const fetchUserRole = async () => {
      try {
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUser((prev: any) => prev ? { ...prev, role: userData.role || 'user' } : null);
          if (userData.role !== 'admin') {
            setIsAdminModeActive(false);
          }
        }
      } catch (error) {
        console.error('Error fetching user role from Firestore:', error);
      }
    };
    fetchUserRole();
  }, [user?.uid]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);

    // Parse URL parameter to support direct tab routing
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get('tab');
    if (tabParam && ['assess', 'standards', 'training', 'verify', 'org', 'profile', 'quote', 'news', 'downloads'].includes(tabParam)) {
      setActiveTab(tabParam as any);
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser((prevUser: any) => {
        if (prevUser && prevUser.isMock) return prevUser;
        return currentUser;
      });
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    try {
      if (user && user.isMock) {
        setUser(null);
      } else {
        await signOut(auth);
      }
      setIsAdminModeActive(false);
      setUserMenuOpen(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

 const changeLang = (lang: Language) => setSettings(s => ({ ...s, lang }));

 const tabs = [
   { id: 'assess', labelTH: 'หน้าแรก', labelEN: 'Home', icon: Home },
   { id: 'org', labelTH: 'เกี่ยวกับเรา', labelEN: 'About Us', icon: Users },
   { id: 'standards', labelTH: 'บริการตรวจประเมิน', labelEN: 'Accredited Services', icon: Layers },
   { id: 'training', labelTH: 'การฝึกอบรม', labelEN: 'Training Courses', icon: GraduationCap },
   { id: 'news', labelTH: 'ข่าวสารประชาสัมพันธ์', labelEN: 'News & PR', icon: FileText },
   { id: 'verify', labelTH: 'ตรวจใบรับรอง', labelEN: 'Verify Certificate', icon: ShieldCheck },
   { id: 'downloads', labelTH: 'ดาวน์โหลดแบบฟอร์ม', labelEN: 'Forms & Downloads', icon: Download },
   { id: 'profile', labelTH: 'โปรไฟล์ลูกค้า', labelEN: 'Client Profile', icon: UserIcon },
  ];

 const t = (th: string, en: string) => settings.lang === 'TH' ? th : en;

 const bannerImages = [
 { src: '/hero-banner.png', alt: 'QAIC Thailand Banner' },
 { src: '/banner2.png', alt: 'Professional Certification' },
 { src: '/banner_quality.png', alt: 'Quality Assurance Banner' }
 ];
 const [currentBanner, setCurrentBanner] = React.useState(0);

 React.useEffect(() => {
 if (activeTab === 'assess') {
 const timer = setInterval(() => {
 setCurrentBanner((prev) => (prev + 1) % bannerImages.length);
 }, 10000);
 return () => clearInterval(timer);
 }
 }, [activeTab, bannerImages.length]);

 return (
 <div 
 className={`min-h-screen font-sans selection:bg-blue-100 selection:text-blue-900 transition-colors duration-500 bg-[#f8fafc] text-slate-900 ${settings.theme}`}
 style={{ 
 backgroundImage: 'url("/wallpaper whitemode2.jpg")', 
 backgroundSize: 'cover', 
 backgroundPosition: 'center', 
 backgroundAttachment: 'fixed' 
 }}
 >
  {/* Desktop Sidebar */}
  <aside className="fixed top-0 left-0 bottom-0 z-50 w-64 xl:w-72 bg-white/40 backdrop-blur-[35px] border-r border-gray-200/40 dark:bg-slate-900/40 dark:border-white/10 p-6 flex flex-col justify-between overflow-y-auto hidden lg:flex">
    <div className="space-y-8 flex flex-col h-full">
      {/* Brand Logo Section */}
      <div className="flex items-center gap-3.5 px-2">
        <img src="/logo.png" alt="QAIC Thailand Logo" className="h-10 w-auto" />
        <div className="flex flex-col">
          <span className="font-display font-bold text-gray-900 dark:text-white text-base tracking-tight leading-tight">
            QAIC Thailand
          </span>
          <span className="text-[9px] text-gray-500 dark:text-slate-400 font-sans tracking-widest uppercase mt-0.5">
            Global Certifications
          </span>
        </div>
      </div>

      {/* Navigation Tabs (Vertical list) */}
      <div className="flex-1 flex flex-col gap-1.5 overflow-y-auto pr-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer text-left w-full relative ${
                isActive 
                  ? 'bg-blue-600/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400 border border-blue-500/10 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)]' 
                  : 'text-gray-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100/50 dark:hover:bg-slate-800/40 border border-transparent'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute left-0 top-3 bottom-3 w-1 bg-blue-600 dark:bg-blue-400 rounded-r-full"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <Icon className="w-4.5 h-4.5 flex-shrink-0" />
              <span className="truncate">{t(tab.labelTH, tab.labelEN)}</span>
              {tab.id === 'verify' && (
                <span className="relative flex h-2 w-2 ml-auto">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              )}
            </button>
          );
        })}
      </div>
      
      {/* Settings / Switchers at Bottom */}
      <div className="pt-4 border-t border-gray-150 dark:border-white/10 space-y-4">
        {/* Language switcher */}
        <div className="flex bg-gray-100/50 dark:bg-slate-800/40 p-1 rounded-xl border border-gray-200/50 dark:border-white/10 justify-between items-center">
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-2">
            {t('ภาษา', 'Lang')}
          </span>
          <div className="flex gap-1">
            <button 
              onClick={() => changeLang('TH')}
              className={`px-2.5 py-1 text-[10px] font-bold rounded-lg transition-all ${settings.lang === 'TH' ? ' bg-white dark:bg-slate-900 shadow-sm text-blue-600 font-extrabold border border-gray-200/30 dark:border-white/10' : 'text-gray-700 dark:text-slate-400 hover:text-gray-900 cursor-pointer'}`}
            >TH</button>
            <button 
              onClick={() => changeLang('EN')}
              className={`px-2.5 py-1 text-[10px] font-bold rounded-lg transition-all ${settings.lang === 'EN' ? ' bg-white dark:bg-slate-900 shadow-sm text-blue-600 font-extrabold border border-gray-200/30 dark:border-white/10' : 'text-gray-700 dark:text-slate-400 hover:text-gray-900 cursor-pointer'}`}
            >EN</button>
          </div>
        </div>

        {/* User Account / Profile Info */}
        <div className="pt-2">
          {user ? (
            <div className="space-y-3">
              {/* User badge */}
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-gray-50 dark:bg-slate-800/40 border border-gray-100 dark:border-white/5">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center overflow-hidden bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex-shrink-0">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt={user.displayName || 'User'} className="w-full h-full object-cover" />
                  ) : (
                    <UserIcon className="w-4.5 h-4.5" />
                  )}
                </div>
                <div className="text-left overflow-hidden">
                  <p className="text-[10px] font-bold text-gray-900 dark:text-white leading-tight truncate">
                    {user.displayName || user.email?.split('@')[0]}
                  </p>
                  <p className="text-[8px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">
                    {(user as any).role === 'admin' ? t('ผู้ดูแลระบบ', 'Admin') : t('สมาชิก', 'Member')}
                  </p>
                </div>
              </div>

              {/* Admin Mode toggle directly in sidebar */}
              {(user as any).role === 'admin' && (
                <div className="flex items-center justify-between px-2.5 py-1.5 bg-purple-50/50 dark:bg-purple-950/10 border border-purple-100/50 dark:border-purple-950/20 rounded-xl">
                  <span className="text-[9px] uppercase font-bold tracking-widest text-purple-600 dark:text-purple-400">
                    {t('โหมดแอดมิน', 'Admin Mode')}
                  </span>
                  <button
                    onClick={() => setIsAdminModeActive(!isAdminModeActive)}
                    className={`w-9 h-5.5 rounded-full p-0.5 transition-colors duration-200 focus:outline-none relative flex items-center cursor-pointer ${
                      isAdminModeActive ? 'bg-purple-600' : 'bg-gray-200 dark:bg-slate-700'
                    }`}
                  >
                    <div
                      className={`w-4.5 h-4.5 rounded-full bg-white shadow-sm transform duration-200 ${
                        isAdminModeActive ? 'translate-x-3.5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              )}

              {/* Logout button */}
              <button 
                onClick={handleLogout}
                className="w-full py-3 bg-red-50 hover:bg-red-100 dark:bg-red-950/15 dark:hover:bg-red-950/25 text-red-600 dark:text-red-400 rounded-xl text-[10px] font-bold flex items-center justify-center gap-2 cursor-pointer transition-all border border-red-100/50 dark:border-red-950/20 uppercase tracking-widest"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>{t('ออกจากระบบ', 'Log Out')}</span>
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <button 
                onClick={() => setAuthModal({ isOpen: true, mode: 'login' })}
                className="w-full py-3 rounded-xl text-[10px] font-bold shadow-md cursor-pointer bg-gray-900 dark:bg-white text-white dark:text-gray-950 hover:bg-gray-800 dark:hover:bg-gray-100 transition-all uppercase tracking-widest"
              >
                {t('เข้าสู่ระบบ', 'Login')}
              </button>
              <button 
                onClick={() => setAuthModal({ isOpen: true, mode: 'register' })}
                className="w-full py-3 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-slate-350 hover:bg-gray-50 dark:hover:bg-slate-800/40 rounded-xl text-[10px] font-bold cursor-pointer transition-all uppercase tracking-widest"
              >
                {t('ลงทะเบียน', 'Register')}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  </aside>

  {/* Mobile Header (Visible on screen sizes < lg) */}
  <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 lg:hidden ${scrolled ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm border-b border-gray-100 dark:border-white/10 py-2.5' : 'bg-transparent py-4 md:py-5'}`}>
    <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <img src="/logo.png" alt="QAIC Thailand Logo" className="h-10 w-auto" />
        <div className="flex flex-col">
          <span className="font-display font-bold text-gray-900 dark:text-white text-sm tracking-tight leading-tight">
            QAIC Thailand
          </span>
          <span className="text-[8px] text-gray-600 dark:text-slate-400 font-sans tracking-widest uppercase mt-0.5">
            Global Certifications
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex bg-gray-100/50 dark:bg-slate-800/40 p-0.5 rounded-lg border border-gray-200/50 dark:border-white/10 text-[9px] mr-2">
          <button onClick={() => changeLang('TH')} className={`px-2 py-0.5 font-bold rounded ${settings.lang === 'TH' ? 'bg-white dark:bg-slate-950 text-blue-600 shadow-sm' : 'text-gray-600 dark:text-slate-400'}`}>TH</button>
          <button onClick={() => changeLang('EN')} className={`px-2 py-0.5 font-bold rounded ${settings.lang === 'EN' ? 'bg-white dark:bg-slate-950 text-blue-600 shadow-sm' : 'text-gray-600 dark:text-slate-400'}`}>EN</button>
        </div>
        <button className="p-2 text-gray-800 dark:text-white" onClick={() => setMobileMenuOpen(true)}>
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </div>
  </nav>

  {/* Mobile Menu Overlay */}
  <AnimatePresence>
    {mobileMenuOpen && (
      <motion.div 
        initial={{ opacity: 0, x: '100%' }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: '100%' }}
        className="fixed inset-0 z-[60] p-8 flex flex-col transition-all duration-300 bg-white/95 backdrop-blur-[35px] border border-white/40 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] dark:bg-slate-950/95 dark:border-white/10 dark:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.1)] text-gray-950 dark:text-white overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
            <div className="flex flex-col">
              <span className="font-display font-bold text-gray-900 dark:text-white text-sm tracking-tight leading-tight">
                QAIC Thailand
              </span>
              <span className="text-[8px] text-gray-600 dark:text-slate-400 font-sans tracking-widest uppercase mt-0.5">
                Global Certifications
              </span>
            </div>
          </div>
          <button 
            onClick={() => setMobileMenuOpen(false)} 
            className="p-2.5 rounded-2xl cursor-pointer transition-colors bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-slate-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation list */}
        <div className="flex-1 flex flex-col gap-2 overflow-y-auto pr-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center gap-4 px-5 py-4 rounded-2xl text-sm font-bold uppercase tracking-wider transition-all cursor-pointer text-left w-full relative ${
                  isActive 
                    ? 'bg-blue-600/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400 border border-blue-500/10 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)]' 
                    : 'text-gray-700 dark:text-slate-350 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100/50 dark:hover:bg-slate-800/40 border border-transparent'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="truncate">{t(tab.labelTH, tab.labelEN)}</span>
                {tab.id === 'verify' && (
                  <span className="relative flex h-2.5 w-2.5 ml-auto">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Footer info & switchers in drawer */}
        <div className="pt-6 border-t border-gray-150 dark:border-white/10 mt-auto space-y-6 font-sans">
          {user ? (
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-slate-900/50 border border-gray-100 dark:border-white/5">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center overflow-hidden bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex-shrink-0">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt={user.displayName || 'User'} className="w-full h-full object-cover" />
                  ) : (
                    <UserIcon className="w-6 h-6" />
                  )}
                </div>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white text-sm">
                    {user.displayName || user.email?.split('@')[0]}
                  </p>
                  <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">
                    {(user as any).role === 'admin' ? t('ผู้ดูแลระบบ', 'Admin') : t('สมาชิก', 'Member')}
                  </p>
                </div>
              </div>

              {(user as any).role === 'admin' && (
                <div className="flex items-center justify-between px-4 py-2.5 bg-purple-50/50 dark:bg-purple-950/10 border border-purple-100/50 dark:border-purple-950/20 rounded-xl">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-purple-600 dark:text-purple-400">
                    {t('โหมดแอดมิน', 'Admin Mode')}
                  </span>
                  <button
                    onClick={() => setIsAdminModeActive(!isAdminModeActive)}
                    className={`w-9 h-5.5 rounded-full p-0.5 transition-colors duration-200 focus:outline-none relative flex items-center cursor-pointer ${
                      isAdminModeActive ? 'bg-purple-600' : 'bg-gray-200 dark:bg-slate-700'
                    }`}
                  >
                    <div
                      className={`w-4.5 h-4.5 rounded-full bg-white shadow-sm transform duration-205 ${
                        isAdminModeActive ? 'translate-x-3.5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              )}

              <button 
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3.5 bg-red-50 hover:bg-red-100 dark:bg-red-950/15 dark:hover:bg-red-950/25 text-red-600 dark:text-red-400 rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all border border-red-100/50 dark:border-red-950/20 uppercase tracking-widest"
              >
                <LogOut className="w-4 h-4" />
                <span>{t('ออกจากระบบ', 'Log Out')}</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => {
                  setAuthModal({ isOpen: true, mode: 'login' });
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3.5 rounded-xl text-xs font-bold shadow-md cursor-pointer bg-gray-900 dark:bg-white text-white dark:text-gray-950 hover:bg-gray-800 dark:hover:bg-gray-100 transition-all uppercase tracking-widest text-center"
              >
                {t('เข้าสู่ระบบ', 'Login')}
              </button>
              <button 
                onClick={() => {
                  setAuthModal({ isOpen: true, mode: 'register' });
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3.5 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-slate-350 hover:bg-gray-50 dark:hover:bg-slate-800/40 rounded-xl text-xs font-bold cursor-pointer transition-all uppercase tracking-widest text-center"
              >
                {t('ลงทะเบียน', 'Register')}
              </button>
            </div>
          )}

          <div className="pt-4 flex justify-center gap-4 border-t items-center border-gray-100 dark:border-white/10">
            {[
              { Icon: Facebook, href: 'https://www.facebook.com/qaicthailand.company' },
              { Icon: MessageCircle, href: '#', label: 'LINE' },
              { Icon: Linkedin, href: '#' },
              { Icon: Globe, href: '#' }
            ].map(({ Icon, href }, idx) => (
              <a 
                key={idx} 
                href={href} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-3 bg-gray-50 dark:bg-slate-900 text-gray-600 dark:text-slate-450 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800 rounded-2xl transition-all"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    )}
  </AnimatePresence>

  <div className="lg:pl-64 xl:pl-72 flex flex-col min-h-screen transition-all duration-300">
    <main className="pt-16 md:pt-20 lg:pt-8 pb-16 px-6">
 <div className="max-w-7xl mx-auto">
 {/* News Slideshow — top of Home page */}
 {activeTab === 'assess' && (
   <NewsSlider />
 )}

 {/* Premium Hero Section (Grid side-by-side) */}
 {activeTab === 'assess' && (
 <div className={`grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center py-8 md:py-10 rounded-[3rem] px-6 md:px-12 mb-8 relative overflow-hidden transition-all duration-500 ${isDarkMode ? 'bg-slate-900/40 backdrop-blur-[35px] border border-white/20 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.25),0_15px_35px_rgba(0,0,0,0.35)]' : 'bg-white/40 backdrop-blur-[35px] border border-white/40 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)]'}`}>
 <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.12),transparent_70%)] pointer-events-none" />
 
 {/* Left Column: Text & Buttons */}
 <div className="lg:col-span-6 space-y-6 text-center md:text-left relative z-10">
 <motion.div 
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${isDarkMode ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-50 text-blue-700'}`}
 >
 <Award className="w-3.5 h-3.5" />
 <span>Accredited by UKAS & NAC</span>
 </motion.div>
 
 <motion.h2 
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.1 }}
 className="text-4xl md:text-5xl lg:text-[2.75rem] font-display font-bold text-gray-900 dark:text-white tracking-tight leading-[1.25]"
 >
 {t('ยกระดับมาตรฐานธุรกิจไทย', 'Elevating Thai Business Standards')}<br />
 <span className="text-blue-600 dark:text-blue-400">{t('ด้วยความโปร่งใสระดับโลก', 'with Global Integrity')}</span>
 </motion.h2>
 
 <motion.p 
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.2 }}
 className="text-gray-700 dark:text-slate-200 max-w-xl text-sm leading-relaxed"
 >
 {t('QAIC Thailand คือหน่วยตรวจประเมินอิสระที่ได้รับการรับรองระดับสากล เรามุ่งมั่นช่วยองค์กรของคุณให้ผ่านการรับรองมาตรฐาน พร้อมเติบโตอย่างยั่งยืนในตลาดโลก', 'QAIC Thailand is an internationally accredited independent assessment body. We commit to supporting your organization to achieve standards and grow sustainably in the global market.')}
 </motion.p>

 <motion.div 
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.3 }}
 className="flex flex-wrap items-center justify-center md:justify-start gap-4"
 >
 <button 
 onClick={() => setActiveTab('standards')}
 className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-xs font-bold transition-all shadow-lg shadow-blue-600/20 active:scale-[0.98] flex items-center gap-2"
 >
 <span>{t('ดูมาตรฐานทั้งหมด 🧭', 'Explore Standards 🧭')}</span>
 </button>
 <button 
 onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
 className={`px-6 py-3.5 border rounded-2xl text-xs font-bold transition-all active:scale-[0.98] flex items-center gap-2 ${isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-250 hover:bg-slate-800' : ' bg-white/40 backdrop-blur-[35px] border border-white/40 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] dark:bg-slate-900/40 dark:border-white/20 dark:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.2)] hover: text-gray-700 dark:text-slate-200'}`}
 >
 <span>{t('ปรึกษาผู้เชี่ยวชาญ 💬', 'Consult Experts 💬')}</span>
 </button>
 </motion.div>

 {/* Bottom 3 Trust Pillars */}
 <div className={`grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t text-left ${isDarkMode ? 'border-white/10' : 'border-gray-100'}`}>
 <div className="flex items-center gap-3">
 <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${isDarkMode ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-50 text-blue-600'}`}>
 <Award className="w-4 h-4" />
 </div>
 <div>
 <h4 className="text-[10px] font-bold text-gray-950 dark:text-slate-100 leading-tight">{t('มาตรฐานระดับสากล', 'International Standard')}</h4>
 <p className="text-[9px] text-gray-600 dark:text-slate-400">{t('ครอบคลุมกว่า 20 มาตรฐาน', 'Over 20 standards')}</p>
 </div>
 </div>
 <div className="flex items-center gap-3">
 <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${isDarkMode ? 'bg-amber-500/10 text-amber-400' : 'bg-amber-50 text-amber-600'}`}>
 <UserIcon className="w-4 h-4" />
 </div>
 <div>
 <h4 className="text-[10px] font-bold text-gray-950 dark:text-slate-100 leading-tight">{t('ผู้ตรวจประเมินมืออาชีพ', 'Expert Auditors')}</h4>
 <p className="text-[9px] text-gray-600 dark:text-slate-400">{t('ประสบการณ์กว่า 15 ปี', '15+ years experience')}</p>
 </div>
 </div>
 <div className="flex items-center gap-3">
 <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${isDarkMode ? 'bg-emerald-500/10 text-emerald-400' : 'bg-emerald-50 text-emerald-600'}`}>
 <ShieldCheck className="w-4 h-4" />
 </div>
 <div>
 <h4 className="text-[10px] font-bold text-gray-950 dark:text-slate-100 leading-tight">{t('โปร่งใส เป็นกลาง เชื่อถือได้', 'Transparent & Fair')}</h4>
 <p className="text-[9px] text-gray-600 dark:text-slate-400">{t('ได้รับการยอมรับทั่วโลก', 'Globally trusted')}</p>
 </div>
 </div>
 </div>
 </div>

 {/* Right Column: Hero Image */}
 <div className="lg:col-span-6 relative flex items-center justify-center py-4">
 <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
 
 <motion.div 
 initial={{ opacity: 0, scale: 0.95 }}
 animate={{ opacity: 1, scale: 1 }}
 transition={{ delay: 0.2 }}
 className="relative z-10 w-full"
 >
 <img 
 src="/herosection.png" 
 alt="QAIC Thailand Hero Section" 
 className="w-full h-auto object-contain select-none"
 />
 </motion.div>
 </div>

 {/* Accreditation Trust Bar */}
 <div className={`lg:col-span-12 mt-8 pt-6 border-t flex flex-col lg:flex-row items-center justify-between gap-6 ${isDarkMode ? 'border-white/10' : 'border-gray-150/40'}`}>
   <div className="flex items-center gap-4 text-center lg:text-left">
     <div className={`p-3.5 rounded-2xl hidden sm:block ${isDarkMode ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-50 text-blue-600'}`}>
       <Award className="w-6 h-6" />
     </div>
     <div>
       <h3 className="font-display font-bold text-sm text-gray-900 dark:text-white uppercase tracking-wider">
         {t('การรับรองและการยอมรับระดับสากล', 'Accreditation & Recognition')}
       </h3>
       <p className="text-xs text-gray-700 dark:text-slate-400 font-sans mt-0.5">
         {t('QAIC Thailand ได้รับการรับรองระบบงานจากสถาบันระดับสากลอย่างเต็มรูปแบบ', 'QAIC Thailand is fully accredited and certified by global institutions.')}
       </p>
     </div>
   </div>
   <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-8">
     <div className="flex items-center gap-3">
       <span className="text-[10px] font-bold text-gray-600 dark:text-slate-500 uppercase tracking-widest">Accredited Body</span>
       <div className="px-3 py-1.5 bg-gray-900 text-white rounded-xl text-[10px] font-mono font-bold tracking-wider">
         UKAS #0046
       </div>
     </div>
     <div className="h-6 w-px bg-gray-200 dark:bg-slate-800 hidden sm:block" />
     <div className="flex items-center gap-3">
       <span className="text-[10px] font-bold text-gray-600 dark:text-slate-500 uppercase tracking-widest">Accredited Body</span>
       <div className="px-3 py-1.5 bg-blue-600 text-white rounded-xl text-[10px] font-mono font-bold tracking-wider">
         NAC-045
       </div>
     </div>
   </div>
 </div>
 </div>
 )}

 {/* Interactive Portal Area */}
 <div className={`rounded-[2rem] overflow-hidden min-h-[700px] transition-all duration-500 ${isDarkMode ? 'bg-slate-950/45 backdrop-blur-[35px] border border-white/20 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.25),0_25px_50px_rgba(0,0,0,0.45)]' : 'bg-white/40 backdrop-blur-[35px] border border-white/40 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)]'}`}>

 {/* Tab Content */}
 <div className="p-4 md:p-8 pt-3 md:pt-4">
 <AnimatePresence mode="wait">
 {activeTab === 'assess' && (
 <motion.div 
 key="assess"
 initial={{ opacity: 0, scale: 0.98 }}
 animate={{ opacity: 1, scale: 1 }}
 exit={{ opacity: 0, scale: 1.02 }}
 transition={{ duration: 0.3 }}
 >
 <InfoSections settings={settings} onTabChange={setActiveTab} />
 </motion.div>
 )}
 {activeTab === 'standards' && (
 <motion.div 
 key="standards"
 initial={{ opacity: 0, scale: 0.98 }}
 animate={{ opacity: 1, scale: 1 }}
 exit={{ opacity: 0, scale: 1.02 }}
 transition={{ duration: 0.3 }}
 >
 <StandardsDirectory settings={settings} isAdminMode={isAdminModeActive} />
 </motion.div>
 )}
 {activeTab === 'training' && (
 <motion.div 
 key="training"
 initial={{ opacity: 0, scale: 0.98 }}
 animate={{ opacity: 1, scale: 1 }}
 exit={{ opacity: 0, scale: 1.02 }}
 transition={{ duration: 0.3 }}
 >
 <TrainingSection 
 settings={settings} 
 onContactClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
 isAdminMode={isAdminModeActive}
 />
 </motion.div>
 )}
 {activeTab === 'quote' && (
 <motion.div 
 key="quote"
 initial={{ opacity: 0, scale: 0.98 }}
 animate={{ opacity: 1, scale: 1 }}
 exit={{ opacity: 0, scale: 1.02 }}
 transition={{ duration: 0.3 }}
 >
 <ProposalForm settings={settings} />
 </motion.div>
 )}
 {activeTab === 'verify' && (
 <motion.div 
 key="verify"
 initial={{ opacity: 0, scale: 0.98 }}
 animate={{ opacity: 1, scale: 1 }}
 exit={{ opacity: 0, scale: 1.02 }}
 transition={{ duration: 0.3 }}
 >
 <CertificateVerification settings={settings} />
 </motion.div>
 )}
 {activeTab === 'profile' && (
 <motion.div 
 key="profile"
 initial={{ opacity: 0, scale: 0.98 }}
 animate={{ opacity: 1, scale: 1 }}
 exit={{ opacity: 0, scale: 1.02 }}
 transition={{ duration: 0.3 }}
 >
 {user ? (
 <CustomerProfile settings={settings} user={user} />
 ) : (
 <div className="text-center py-24 bg-white/40 backdrop-blur-[35px] border border-white/40 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] dark:bg-slate-900/40 dark:border-white/20 dark:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.2)] rounded-[2.5rem] border border-dashed max-w-2xl mx-auto">
 <div className="w-20 h-20 bg-gray-50 text-gray-300 rounded-full flex items-center justify-center mx-auto mb-6">
 <UserIcon className="w-10 h-10" />
 </div>
 <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-2">{t('กรุณาเข้าสู่ระบบ', 'Please Login')}</h2>
 <p className="text-gray-700 dark:text-slate-400 mb-8 max-w-sm mx-auto">{t('กรุณาเข้าสู่ระบบเพื่อดูข้อมูลการรับรอง มาตรฐานที่ได้รับ และสถานะการตรวจประเมินของคุณ', 'Please login to view your certification data, achieved standards, and audit progress.')}</p>
 <button 
 onClick={() => setAuthModal({ isOpen: true, mode: 'login' })}
 className="px-8 py-4 bg-blue-600 text-white rounded-2xl text-sm font-bold shadow-lg shadow-blue-600/20 active:scale-95 transition-all"
 >
 {t('เข้าสู่ระบบตอนนี้', 'Login Now')}
 </button>
 </div>
 )}
 </motion.div>
 )}
 {activeTab === 'news' && (
 <motion.div 
 key="news"
 initial={{ opacity: 0, scale: 0.98 }}
 animate={{ opacity: 1, scale: 1 }}
 exit={{ opacity: 0, scale: 1.02 }}
 transition={{ duration: 0.3 }}
 >
 <NewsSection settings={settings} isAdminMode={isAdminModeActive} />
 </motion.div>
 )}
 {activeTab === 'org' && (
 <motion.div 
 key="org"
 initial={{ opacity: 0, scale: 0.98 }}
 animate={{ opacity: 1, scale: 1 }}
 exit={{ opacity: 0, scale: 1.02 }}
 transition={{ duration: 0.3 }}
 >
 <AboutSection settings={settings} isAdminMode={isAdminModeActive} />
 </motion.div>
 )}
 {activeTab === 'downloads' && (
 <motion.div 
 key="downloads"
 initial={{ opacity: 0, scale: 0.98 }}
 animate={{ opacity: 1, scale: 1 }}
 exit={{ opacity: 0, scale: 1.02 }}
 transition={{ duration: 0.3 }}
 >
 <DownloadsSection settings={settings} />
 </motion.div>
 )}
 </AnimatePresence>
 </div>
 </div>
 </div>
 </main>

 {/* Stats/Badge Section */}
 <section className="bg-gray-900 py-20">
 <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
 {[
 { val: '20', label: t('ปีที่ให้บริการ', 'Years Hub') },
 { val: '600+', label: t('บริษัทที่รับรอง', 'Certificates Issued') },
 { val: '15+', label: t('ประเภทมาตรฐาน', 'ISO Scopes') },
 { val: '4.9/5', label: t('ความพอใจลูกค้า', 'Client Satisfaction') },
 ].map((stat, i) => (
 <div key={i} className="space-y-1">
 <span className="text-3xl md:text-4xl font-display font-bold text-white block">{stat.val}</span>
 <span className="text-[10px] text-gray-600 dark:text-slate-500 uppercase tracking-widest font-bold">{stat.label}</span>
 </div>
 ))}
 </div>
 </section>

 {/* Footer */}
 <footer className="bg-white/40 backdrop-blur-[35px] border border-white/40 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] dark:bg-slate-900/40 dark:border-white/20 dark:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.2)] border-t pt-20 pb-10 px-6">
 <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
 <div className="col-span-1 md:col-span-2 space-y-6">
 <div className="flex items-center gap-4">
 <img src="/logo.png" alt="QAIC Thailand Logo" className="h-14 w-auto" />
 <span className="text-xl font-display font-bold text-gray-900 dark:text-white tracking-tight">QAIC Thailand</span>
 </div>
 <p className="text-sm text-gray-700 dark:text-slate-400 font-sans max-w-sm leading-relaxed">
 Quality Assurance International Certification (Thailand). <br/>
 The premier certification body for sustainable growth and operational excellence.
 </p>
 <div className="flex gap-4">
 {[
 { Icon: Facebook, href: 'https://www.facebook.com/qaicthailand.company' },
 { Icon: MessageCircle, href: '#', label: 'LINE' },
 { Icon: Linkedin, href: '#' },
 { Icon: Globe, href: '#' }
 ].map(({ Icon, href }, idx) => (
 <a 
 key={idx} 
 href={href} 
 target="_blank" 
 rel="noopener noreferrer" 
 className="p-2.5 bg-gray-50 text-gray-600 dark:text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
 >
 <Icon className="w-5 h-5" />
 </a>
 ))}
 </div>
 </div>

 <div className="space-y-6">
 <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-widest">Connect</h4>
 <ul className="space-y-4 text-xs text-gray-700 dark:text-slate-400 font-sans">
 <li className="flex items-center gap-2">
 <Phone className="w-3.5 h-3.5 text-blue-600" />
 <span>02-482-7989</span>
 </li>
 <li className="flex items-center gap-2">
 <Mail className="w-3.5 h-3.5 text-blue-600" />
 <span>qaicthailand@gmail.com</span>
 </li>
 <li className="flex items-center gap-2">
 <Facebook className="w-3.5 h-3.5 text-blue-600" />
 <a href="https://www.facebook.com/qaicthailand.company" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">Facebook: QAIC Thailand</a>
 </li>
 <li className="flex items-center gap-2">
 <MessageCircle className="w-3.5 h-3.5 text-blue-600" />
 <a href="#" className="hover:text-blue-600 transition-colors">LINE: @qaicthailand (Soon)</a>
 </li>
 <li className="flex items-start gap-3">
 <MapPin className="w-3.5 h-3.5 text-blue-600 mt-0.5 flex-shrink-0" />
 <span className="leading-relaxed">
 {t(
 'เลขที่ 2/8 ซอย กาญจนาภิเษก 0010 ถนนกาญจนาภิเษก แขวงบางแค เขตบางแค กรุงเทพฯ 10160',
 '2/8 Soi Kanchanaphisek 0010, Kanchanaphisek Rd, Bang Khae, Bangkok 10160'
 )}
 </span>
 </li>
 <li className="flex items-center gap-2 pt-2 border-t border-gray-50 mt-2">
 <div className="px-2 py-1 bg-gray-50 text-[10px] font-bold text-gray-600 dark:text-slate-500 rounded uppercase">TAX ID</div>
 <span className="font-mono font-bold text-gray-600 dark:text-slate-400">0105550041773</span>
 </li>
 </ul>
 </div>

 <div className="space-y-6">
 <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-widest">Resources</h4>
 <ul className="space-y-4 text-xs text-gray-700 dark:text-slate-400 font-sans">
 <li><a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a></li>
 <li><a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a></li>
 <li><a href="#" className="hover:text-blue-600 transition-colors">Global Registry</a></li>
 <li><a href="#" className="hover:text-blue-600 transition-colors">Career at QAIC</a></li>
 </ul>
 </div>
 </div>

 <div className="max-w-7xl mx-auto border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
 <p className="text-[10px] text-gray-600 dark:text-slate-500 font-sans uppercase tracking-widest">
 © 2025 QAIC Thailand Co., Ltd. All Rights Reserved.
 </p>
 <div className="flex gap-6 text-[10px] font-bold text-gray-500 dark:text-slate-500 uppercase tracking-widest">
 <span>License UKAS# 0001</span>
 <span>Accredited Body NAC-045</span>
 </div>
 </div>
 </footer>
 </div>

 {/* Auth Modal */}
 <AuthModal 
 isOpen={authModal.isOpen} 
 onClose={() => setAuthModal(s => ({ ...s, isOpen: false }))}
 settings={settings}
 initialMode={authModal.mode}
 onMockLogin={(mockUser) => setUser(mockUser)}
 />

 {/* Floating AI Assistant */}
 <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end gap-4">
 <AnimatePresence>
 {isAiOpen && (
 <motion.div
 initial={{ opacity: 0, y: 20, scale: 0.9, originX: '100%', originY: '100%' }}
 animate={{ opacity: 1, y: 0, scale: 1 }}
 exit={{ opacity: 0, y: 20, scale: 0.9 }}
 className="w-[90vw] md:w-[340px] max-h-[550px] mb-2"
 >
 <div className="relative shadow-2xl rounded-3xl overflow-hidden border border-gray-100">
 <button 
 onClick={() => setIsAiOpen(false)}
 className="absolute top-4 right-4 z-10 p-2 bg-white/20 hover:bg-white/30 text-white rounded-full backdrop-blur-md transition-all cursor-pointer"
 >
 <X className="w-4 h-4" />
 </button>
 <div className="h-[480px]">
 <GeminiConsultant settings={settings} />
 </div>
 </div>
 </motion.div>
 )}
 </AnimatePresence>

 <motion.button
 whileHover={{ scale: 1.05 }}
 whileTap={{ scale: 0.95 }}
 onClick={() => setIsAiOpen(!isAiOpen)}
 className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all relative group cursor-pointer ${
 isAiOpen ? 'bg-gray-900 text-white ring-4 ring-gray-900/10' : 'bg-blue-600 text-white ring-8 ring-blue-600/5'
 }`}
 >
 {isAiOpen ? <X className="w-6 h-6" /> : (
 <>
 <MessageSquare className="w-6 h-6" />
 <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white animate-bounce">
 1
 </div>
 <motion.div 
 animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0, 0.3] }}
 transition={{ repeat: Infinity, duration: 2 }}
 className="absolute inset-0 rounded-full bg-blue-600 -z-10"
 />
 </>
 )}
 
 <span className="absolute right-20 bg-gray-900 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden md:block">
 {t('ปรึกษา AI ISO ฟรี', 'Free AI ISO Consultant')}
 </span>
 </motion.button>
 </div>
 </div>
 );
}
