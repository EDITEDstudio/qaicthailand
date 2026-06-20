/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
 signInWithEmailAndPassword, 
 createUserWithEmailAndPassword, 
 signInWithPopup,
 updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db, googleProvider } from '../../lib/firebase';
import { UserSettings } from '../../types';
import { 
 X, 
 Mail, 
 Lock, 
 User as UserIcon, 
 ArrowRight, 
 Github, 
 Chrome,
 AlertCircle,
 Loader2,
 CheckCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AuthModalProps {
 isOpen: boolean;
 onClose: () => void;
 settings: UserSettings;
 initialMode?: 'login' | 'register';
 onMockLogin?: (user: any) => void;
}

export default function AuthModal({ isOpen, onClose, settings, initialMode = 'login', onMockLogin }: AuthModalProps) {
 const [mode, setMode] = useState<'login' | 'register'>(initialMode);
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [displayName, setDisplayName] = useState('');
 const [error, setError] = useState<string | null>(null);
 const [loading, setLoading] = useState(false);
 const [success, setSuccess] = useState(false);

 const t = <T extends string>(th: T, en: T): T => settings.lang === 'TH' ? th : en;

 const handleAuth = async (e: React.FormEvent) => {
 e.preventDefault();
 setError(null);
 setLoading(true);

 try {
 if (mode === 'register') {
 const userCredential = await createUserWithEmailAndPassword(auth, email, password);
 await updateProfile(userCredential.user, { displayName });
 
 // Sync to Firestore
 await setDoc(doc(db, 'users', userCredential.user.uid), {
 uid: userCredential.user.uid,
 email: userCredential.user.email,
 displayName,
 role: 'user',
 createdAt: serverTimestamp(),
 updatedAt: serverTimestamp()
 });
 } else {
 await signInWithEmailAndPassword(auth, email, password);
 }
 
 setSuccess(true);
 setTimeout(() => {
 onClose();
 setSuccess(false);
 setLoading(false);
 }, 1500);
 } catch (err: any) {
 if (err.code === 'auth/operation-not-allowed' || err.code === 'auth/configuration-not-allowed') {
 console.warn("Firebase email auth disabled, falling back to local demo mock mode");
  const mockUser = {
    uid: 'mock-' + email.split('@')[0],
    email: email,
    displayName: displayName || email.split('@')[0],
    isMock: true,
    photoURL: null,
    role: email === 'admin@qaic-thailand.com' ? 'admin' : 'user'
  };
 if (onMockLogin) {
 onMockLogin(mockUser);
 }
 setSuccess(true);
 setTimeout(() => {
 onClose();
 setSuccess(false);
 setLoading(false);
 }, 1500);
 } else {
 setError(err.message);
 setLoading(false);
 }
 }
 };

 const handleQuickDemoLogin = (role: 'customer' | 'admin') => {
 setError(null);
 setLoading(true);
  const mockUser = {
    uid: role === 'admin' ? 'mock-admin-999' : 'mock-customer-111',
    email: role === 'admin' ? 'admin@qaic-thailand.com' : 'demo@qaic-thailand.com',
    displayName: role === 'admin' ? 'QAIC Auditor Admin' : 'QAIC Demo Customer',
    isMock: true,
    photoURL: null,
    role: role
  };
 
 if (onMockLogin) {
 onMockLogin(mockUser);
 }
 
 setSuccess(true);
 setTimeout(() => {
 onClose();
 setSuccess(false);
 setLoading(false);
 }, 1500);
 };


 const handleGoogleSignIn = async () => {
 setError(null);
 setLoading(true);
 try {
 const result = await signInWithPopup(auth, googleProvider);
 const user = result.user;
 
 // Check if user document exists
 const userDoc = await getDoc(doc(db, 'users', user.uid));
 if (!userDoc.exists()) {
 await setDoc(doc(db, 'users', user.uid), {
 uid: user.uid,
 email: user.email,
 displayName: user.displayName,
 photoURL: user.photoURL,
 role: 'user',
 createdAt: serverTimestamp(),
 updatedAt: serverTimestamp()
 });
 }
 
 setSuccess(true);
 setTimeout(() => {
 onClose();
 setSuccess(false);
 setLoading(false);
 }, 1500);
 } catch (err: any) {
 setError(err.message);
 setLoading(false);
 }
 };

 if (!isOpen) return null;

 return (
 <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-gray-900/60 backdrop-blur-md">
 <motion.div 
 initial={{ opacity: 0, scale: 0.95, y: 20 }}
 animate={{ opacity: 1, scale: 1, y: 0 }}
 className="bg-white/40 backdrop-blur-[35px] border border-white/40 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] dark:bg-slate-900/40 dark:border-white/20 dark:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.2)] w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden relative"
 >
 <button 
 onClick={onClose}
 className="absolute top-6 right-6 p-2 text-gray-600 dark:text-slate-500 hover:text-gray-900 dark:text-white hover:bg-gray-100 rounded-full transition-all z-10"
 >
 <X className="w-5 h-5" />
 </button>

 <div className="p-8 md:p-10">
 <div className="mb-8">
 <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white tracking-tight">
 {mode === 'login' ? t('เข้าสู่ระบบ', 'Welcome Back') : t('สร้างบัญชีใหม่', 'Create Account')}
 </h2>
 <p className="text-sm text-gray-700 dark:text-slate-400 mt-2">
 {mode === 'login' 
 ? t('เข้าสู่ระบบเพื่อเข้าถึงบริการรับรองมาตรฐานระดับโลก', 'Login to access world-class certification services.')
 : t('เริ่มต้นการรับรองมาตรฐานสากลกับ QAIC Thailand', 'Start your international certification journey with us.')}
 </p>
 </div>

 {error && (
 <motion.div 
 initial={{ opacity: 0, height: 0 }}
 animate={{ opacity: 1, height: 'auto' }}
 className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex gap-3 text-red-600 text-sm"
 >
 <AlertCircle className="w-5 h-5 flex-shrink-0" />
 <span>{error}</span>
 </motion.div>
 )}

 {success ? (
 <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
 <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
 <CheckCircle className="w-8 h-8" />
 </div>
 <h3 className="text-xl font-bold text-gray-900 dark:text-white">
 {mode === 'login' ? t('เข้าสู่ระบบสำเร็จ', 'Login Successful') : t('ลงทะเบียนสำเร็จ', 'Account Created')}
 </h3>
 <p className="text-sm text-gray-700 dark:text-slate-400">{t('กำลังนำคุณเข้าสู่ระบบ...', 'Redirecting you...')}</p>
 </div>
 ) : (
 <form onSubmit={handleAuth} className="space-y-4">
 {mode === 'register' && (
 <div className="relative">
 <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 dark:text-slate-500" />
 <input 
 type="text"
 required
 placeholder={t('ชื่อ-นามสกุล', 'Full Name')}
 value={displayName}
 onChange={(e) => setDisplayName(e.target.value)}
 className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-sans"
 />
 </div>
 )}
 <div className="relative">
 <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 dark:text-slate-500" />
 <input 
 type="email"
 required
 placeholder={t('อีเมล', 'Email Address')}
 value={email}
 onChange={(e) => setEmail(e.target.value)}
 className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-sans"
 />
 </div>
 <div className="relative">
 <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 dark:text-slate-500" />
 <input 
 type="password"
 required
 placeholder={t('รหัสผ่าน', 'Password')}
 value={password}
 onChange={(e) => setPassword(e.target.value)}
 className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-sans"
 />
 </div>

 <button 
 type="submit"
 disabled={loading}
 className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-sm font-bold transition-all shadow-lg shadow-blue-600/20 active:scale-[0.98] flex items-center justify-center gap-2 group"
 >
 {loading ? (
 <Loader2 className="w-5 h-5 animate-spin" />
 ) : (
 <>
 {mode === 'login' ? t('เข้าสู่ระบบ', 'Sign In') : t('ลงทะเบียน', 'Create Account')}
 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
 </>
 )}
 </button>

 <div className="relative py-4">
 <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
 <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-widest text-gray-600 dark:text-slate-500 bg-white px-4">
 {t('หรือเลือกช่องทางอื่น', 'Or continue with')}
 </div>
 </div>

  <div className="space-y-3">
    <button 
      type="button"
      onClick={handleGoogleSignIn}
      disabled={loading}
      className="w-full py-3.5 bg-white/40 backdrop-blur-[35px] border border-white/40 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] dark:bg-slate-900/40 dark:border-white/20 dark:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.2)] hover:bg-white/60 dark:hover:bg-slate-800/60 text-gray-700 dark:text-slate-200 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2 active:scale-[0.98] cursor-pointer"
    >
      <Chrome className="w-4 h-4 text-blue-600" />
      <span>{t('เข้าสู่ระบบด้วย Google', 'Continue with Google')}</span>
    </button>
    
    <div className="grid grid-cols-2 gap-3">
      <button 
        type="button"
        onClick={() => handleQuickDemoLogin('customer')}
        disabled={loading}
        className="w-full py-3 bg-blue-50 border border-blue-100 hover:bg-blue-100 dark:bg-blue-950/20 dark:border-blue-900/30 dark:hover:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-2xl text-xs font-bold transition-all flex items-center justify-center active:scale-[0.98] cursor-pointer"
      >
        <span>{t('ลูกค้าทดสอบ', 'Demo Customer')}</span>
      </button>
      <button 
        type="button"
        onClick={() => handleQuickDemoLogin('admin')}
        disabled={loading}
        className="w-full py-3 bg-purple-50 border border-purple-100 hover:bg-purple-100 dark:bg-purple-950/20 dark:border-purple-900/30 dark:hover:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-2xl text-xs font-bold transition-all flex items-center justify-center active:scale-[0.98] cursor-pointer"
      >
        <span>{t('แอดมินทดสอบ', 'Demo Admin')}</span>
      </button>
    </div>
  </div>

 <p className="text-center text-xs text-gray-700 dark:text-slate-400 pt-4">
 {mode === 'login' ? t('ยังไม่มีบัญชี?', "Don't have an account?") : t('มีบัญชีอยู่แล้ว?', 'Already have an account?')}
 {' '}
 <button 
 type="button"
 onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
 className="text-blue-600 font-bold hover:underline"
 >
 {mode === 'login' ? t('ลงทะเบียนฟรี', 'Sign Up Free') : t('เข้าสู่ระบบ', 'Login')}
 </button>
 </p>
 </form>
 )}
 </div>
 </motion.div>
 </div>
 );
}
