/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { db, auth } from '../lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { UserSettings } from '../types';
import { 
  ShieldCheck, 
  Clock, 
  CreditCard, 
  FileUp, 
  Download, 
  Calendar,
  CheckCircle2,
  AlertCircle,
  FileText,
  ChevronRight,
  Loader2,
  Plus,
  LayoutDashboard,
  Award,
  FileCheck2,
  FileSpreadsheet,
  Receipt,
  User,
  QrCode,
  Eye,
  Check,
  Upload,
  Send,
  HelpCircle,
  FileBadge
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CustomerProfileProps {
  settings: UserSettings;
  user: any;
}

interface Certificate {
  id: string;
  standardId: string;
  code: string;
  certNumber: string;
  issueDate: string;
  expiryDate: string;
  status: 'active' | 'expired';
  companyNameTH?: string;
  companyNameEN?: string;
  scopeTH?: string;
  scopeEN?: string;
  provinceTH?: string;
  provinceEN?: string;
  country?: string;
  category?: string;
}

interface AuditProject {
  id: string;
  standardId: string;
  code: string;
  status: string;
  currentStep: number;
  totalSteps: number;
  scheduledDate: string;
  outstandingBalance: number;
}

export default function CustomerProfile({ settings, user }: CustomerProfileProps) {
  const [certs, setCerts] = useState<Certificate[]>([]);
  const [audits, setAudits] = useState<AuditProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [portalTab, setPortalTab] = useState<'dashboard' | 'certificates' | 'tracking' | 'documents' | 'finance'>('dashboard');

  // Simulated Interactive States
  const [confirmedSchedule, setConfirmedSchedule] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'unpaid' | 'verifying' | 'paid'>('unpaid');
  const [ncStatus, setNcStatus] = useState<'action_required' | 'under_review'>('action_required');
  const [ncText, setNcText] = useState('');
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(false);

  // Document checklist status
  const [docStatuses, setDocStatuses] = useState<{ [key: string]: 'approved' | 'pending' | 'under_review' | 'action_required' }>({
    qualityManual: 'approved',
    managementReview: 'approved',
    internalAudit: 'pending',
    riskAssessment: 'pending'
  });

  // Certificate Viewer Modal
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [certModalOpen, setCertModalOpen] = useState(false);
  const [certLayout, setCertLayout] = useState<'paper' | 'digital'>('paper');

  const t = <T extends string | string[]>(th: T, en: T): T => settings.lang === 'TH' ? th : en;

  useEffect(() => {
    const fetchData = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        // Fetch Certificates
        const certsQuery = query(collection(db, 'certificates'), where('userId', '==', user.uid));
        const certsSnapshot = await getDocs(certsQuery);
        const certsData = certsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Certificate));
        
        // Fetch Audits
        const auditsQuery = query(collection(db, 'audits'), where('userId', '==', user.uid));
        const auditsSnapshot = await getDocs(auditsQuery);
        const auditsData = auditsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as AuditProject));

        // If no real data, use demo data for the UI showcase
        if (certsData.length === 0 && auditsData.length === 0) {
            setCerts([
              {
                id: '1',
                standardId: 'iso-9001',
                code: 'ISO 9001:2015',
                certNumber: 'QAIC/TH/9001/0123',
                issueDate: '2023-01-15',
                expiryDate: '2026-01-14',
                status: 'active',
                companyNameTH: 'บริษัท เพรสซิเดนท์ เบเกอรี่ จำกัด (มหาชน)',
                companyNameEN: 'President Bakery Public Company Limited',
                scopeTH: 'การผลิตและจัดจำหน่ายขนมปังและเบเกอรี่ทุกชนิด',
                scopeEN: 'Manufacture and distribution of bread and bakery products',
                provinceTH: 'กรุงเทพมหานคร',
                provinceEN: 'Bangkok',
                country: 'Thailand',
                category: 'ISO 9001'
              },
              {
                id: '2',
                standardId: 'iso-14001',
                code: 'ISO 14001:2015',
                certNumber: 'QAIC/TH/14001/1055',
                issueDate: '2023-03-20',
                expiryDate: '2026-03-19',
                status: 'active',
                companyNameTH: 'บริษัท เพรสซิเดนท์ เบเกอรี่ จำกัด (มหาชน)',
                companyNameEN: 'President Bakery Public Company Limited',
                scopeTH: 'การผลิตและจัดจำหน่ายขนมปังและเบเกอรี่ทุกชนิด',
                scopeEN: 'Manufacture and distribution of bread and bakery products',
                provinceTH: 'กรุงเทพมหานคร',
                provinceEN: 'Bangkok',
                country: 'Thailand',
                category: 'ISO 14001'
              }
            ]);
            setAudits([
              {
                id: '101',
                standardId: 'iso-45001',
                code: 'ISO 45001:2018',
                status: 'On-site Audit',
                currentStep: 2,
                totalSteps: 4,
                scheduledDate: '2024-03-24',
                outstandingBalance: 15400
              }
            ]);
        } else {
            setCerts(certsData);
            setCerts(prev => prev.map(c => ({
              ...c,
              companyNameTH: c.companyNameTH || 'บริษัท เพรสซิเดนท์ เบเกอรี่ จำกัด (มหาชน)',
              companyNameEN: c.companyNameEN || 'President Bakery Public Company Limited',
              scopeTH: c.scopeTH || 'การผลิตและจัดจำหน่ายขนมปังและเบเกอรี่ทุกชนิด',
              scopeEN: c.scopeEN || 'Manufacture and distribution of bread and bakery products',
              provinceTH: c.provinceTH || 'กรุงเทพมหานคร',
              provinceEN: c.provinceEN || 'Bangkok',
              country: c.country || 'Thailand',
              category: c.category || c.code.split(':')[0]
            })));
            setAudits(auditsData);
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const getStandardLogo = (category: string) => {
    const cat = category?.toUpperCase() || '';
    if (cat.includes('9001')) return '/logoมาตรฐาน/4.png';
    if (cat.includes('14001')) return '/logoมาตรฐาน/5.png';
    if (cat.includes('27001')) return '/logoมาตรฐาน/6.png';
    if (cat.includes('HACCP') || cat.includes('GHP')) return '/logoมาตรฐาน/7.png';
    if (cat.includes('GDP')) return '/logoมาตรฐาน/8.png';
    if (cat.includes('TAS')) return '/logoมาตรฐาน/9.png';
    return '/logoมาตรฐาน/10.png';
  };

  const handleDocumentUpload = (docKey: string) => {
    setDocStatuses(prev => ({ ...prev, [docKey]: 'under_review' }));
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUploadProgress(true);
    setTimeout(() => {
      setPaymentStatus('verifying');
      setUploadProgress(false);
      setPaymentModalOpen(false);
    }, 1500);
  };

  const handleCARSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUploadProgress(true);
    setTimeout(() => {
      setNcStatus('under_review');
      setUploadProgress(false);
    }, 1500);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
        <p className="text-gray-500 font-sans">{t('กำลังโหลดข้อมูลพอร์ทัล...', 'Loading portal data...')}</p>
      </div>
    );
  }

  // Sidebar Menu Items
  const menuItems = [
    { id: 'dashboard', labelTH: 'แดชบอร์ดหลัก', labelEN: 'Portal Dashboard', icon: LayoutDashboard },
    { id: 'certificates', labelTH: 'ใบรับรองมาตรฐาน', labelEN: 'My Certificates', icon: Award },
    { id: 'tracking', labelTH: 'ติดตามงานและข้อบกพร่อง', labelEN: 'Audit & CAR Tracking', icon: FileCheck2 },
    { id: 'documents', labelTH: 'รายการตรวจเอกสาร', labelEN: 'Document Checklist', icon: FileSpreadsheet },
    { id: 'finance', labelTH: 'การเงินและบิล', labelEN: 'Billing & Payments', icon: Receipt },
  ];

  return (
    <div className="max-w-7xl mx-auto pb-24 px-4 sm:px-6 lg:px-8">
      {/* Profile Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white rounded-[2.5rem] p-8 md:p-10 mb-8 shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.15),transparent_60%)] pointer-events-none" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-6 text-center md:text-left flex-col md:flex-row">
            <div className="w-20 h-20 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center overflow-hidden">
              {user?.photoURL ? (
                <img src={user.photoURL} className="w-full h-full object-cover" />
              ) : (
                <User className="w-8 h-8 text-blue-200" />
              )}
            </div>
            <div className="space-y-1">
              <span className="px-3 py-1 bg-blue-500/20 border border-blue-400/30 text-blue-300 rounded-full text-[10px] font-bold uppercase tracking-widest block w-fit mx-auto md:mx-0">
                {t('รหัสลูกค้า: QAIC-TH-2023', 'Client ID: QAIC-TH-2023')}
              </span>
              <h2 className="text-3xl font-display font-bold tracking-tight">
                {t(`สวัสดี, ${user?.displayName || 'ลูกค้าจำลอง'}`, `Welcome, ${user?.displayName || 'Demo Customer'}`)}
              </h2>
              <p className="text-sm text-blue-200/80">
                {t('เข้าถึงระบบงานจัดการใบรับรองและตรวจติดตาม ISO แบบครบวงจร', 'Unified ISO certification & audit monitoring platform.')}
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => {
                const cert = certs[0];
                if (cert) {
                  setSelectedCert(cert);
                  setCertLayout('paper');
                  setCertModalOpen(true);
                }
              }}
              className="px-6 py-3 bg-white text-blue-950 rounded-2xl text-xs font-bold hover:bg-blue-50 transition-all flex items-center gap-2 shadow-lg shadow-black/10 active:scale-95"
            >
              <Award className="w-4 h-4 text-blue-600" />
              {t('ดูใบรับรองด่วน', 'Quick View Cert')}
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Navigation Sidebar */}
        <div className="w-full lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-[2rem] border border-gray-100 p-4 shadow-sm space-y-1.5 sticky top-8">
            {menuItems.map(item => {
              const Icon = item.icon;
              const isActive = portalTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setPortalTab(item.id as any)}
                  className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-2xl text-left text-xs font-bold transition-all ${
                    isActive 
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/10' 
                      : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{t(item.labelTH, item.labelEN)}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content Panel */}
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={portalTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              {/* TAB 1: DASHBOARD */}
              {portalTab === 'dashboard' && (
                <div className="space-y-6">
                  {/* Action Center Banner */}
                  <div className="bg-amber-50/70 border border-amber-100 rounded-3xl p-6 space-y-4">
                    <div className="flex items-center gap-2 text-amber-800">
                      <AlertCircle className="w-5 h-5 flex-shrink-0" />
                      <span className="text-sm font-bold uppercase tracking-wider">{t('การดำเนินงานที่ต้องจัดการด่วน', 'Required Urgent Actions')}</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {!confirmedSchedule && (
                        <div className="bg-white p-4 rounded-2xl border border-amber-200/50 flex items-start justify-between gap-3 shadow-sm">
                          <div className="space-y-1">
                            <h4 className="text-xs font-bold text-gray-900">{t('ยืนยันตารางตรวจ ISO 45001', 'Confirm ISO 45001 Audit')}</h4>
                            <p className="text-[11px] text-gray-500">{t('โปรดยืนยันวันที่เข้าตรวจประเมินภายใน 24 มี.ค. 2024', 'Please confirm the scheduled audit date by March 24, 2024')}</p>
                          </div>
                          <button 
                            onClick={() => setPortalTab('tracking')}
                            className="text-[10px] font-bold text-blue-600 hover:underline flex-shrink-0 flex items-center gap-0.5"
                          >
                            {t('ไปตรวจสอบ', 'Go')} <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                      {ncStatus === 'action_required' && (
                        <div className="bg-white p-4 rounded-2xl border border-amber-200/50 flex items-start justify-between gap-3 shadow-sm">
                          <div className="space-y-1">
                            <h4 className="text-xs font-bold text-gray-900">{t('แก้ไขข้อบกพร่อง (NC)', 'Correct Audit NC')}</h4>
                            <p className="text-[11px] text-gray-500">{t('ตรวจพบข้อบกพร่องระดับ Major ที่งานตรวจสอบรายงานภายใน', '1 Major NC detected in internal audit record clause.')}</p>
                          </div>
                          <button 
                            onClick={() => setPortalTab('tracking')}
                            className="text-[10px] font-bold text-blue-600 hover:underline flex-shrink-0 flex items-center gap-0.5"
                          >
                            {t('ไปยื่นหลักฐาน', 'Upload')} <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                      {paymentStatus === 'unpaid' && (
                        <div className="bg-white p-4 rounded-2xl border border-amber-200/50 flex items-start justify-between gap-3 shadow-sm md:col-span-2">
                          <div className="space-y-1">
                            <h4 className="text-xs font-bold text-gray-900">{t('ชำระยอดค้างจ่ายใบเสนอราคา #INV-2024-002', 'Pay Outstanding Invoice #INV-2024-002')}</h4>
                            <p className="text-[11px] text-gray-500">{t('ยอดชำระ Stage 2 Audit & Certification จำนวน ฿15,400 ยังไม่ได้ดำเนินการ', 'Stage 2 Audit payment of ฿15,400 is outstanding.')}</p>
                          </div>
                          <button 
                            onClick={() => setPortalTab('finance')}
                            className="text-[10px] font-bold text-blue-600 hover:underline flex-shrink-0 flex items-center gap-0.5"
                          >
                            {t('ไปชำระเงิน', 'Pay Now')} <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                      {confirmedSchedule && ncStatus === 'under_review' && paymentStatus === 'verifying' && (
                        <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-2xl flex items-center gap-3 text-emerald-800 md:col-span-2 shadow-sm">
                          <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                          <div className="text-xs">
                            <span className="font-bold block">{t('ยอดเยี่ยม! คุณจัดการข้อมูลครบถ้วนแล้ว', 'Excellent! All tasks are currently up-to-date.')}</span>
                            <span className="text-emerald-700/80">{t('เอกสารและสลิปการเงินของคุณอยู่ระหว่างเจ้าหน้าที่ QAIC ตรวจสอบความถูกต้อง', 'Your billing details and audit evidence are under QAIC review.')}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Dashboard Stats Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white p-6 rounded-3xl border border-gray-100 flex items-center gap-5 shadow-sm">
                      <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <Award className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider leading-none mb-1.5">{t('ใบรับรองที่ใช้งาน', 'Active Certs')}</p>
                        <p className="text-xl font-display font-bold text-gray-900">{certs.length} <span className="text-xs font-sans font-medium text-gray-400">{t('ฉบับ', 'Certs')}</span></p>
                      </div>
                    </div>
                    <div className="bg-white p-6 rounded-3xl border border-gray-100 flex items-center gap-5 shadow-sm">
                      <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider leading-none mb-1.5">{t('ตรวจติดตามรอบหน้า', 'Next Audit Date')}</p>
                        <p className="text-xl font-display font-bold text-gray-900">24 {t('มี.ค.', 'Mar')} 2024</p>
                      </div>
                    </div>
                    <div className="bg-white p-6 rounded-3xl border border-gray-100 flex items-center gap-5 shadow-sm">
                      <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <CreditCard className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider leading-none mb-1.5">{t('ยอดเงินค้างชำระ', 'Balance Due')}</p>
                        <p className={`text-xl font-display font-bold ${paymentStatus === 'paid' ? 'text-emerald-600' : 'text-amber-600'}`}>
                          {paymentStatus === 'paid' ? '฿0' : '฿15,400'}
                        </p>
                      </div>
                    </div>
                    <div className="bg-white p-6 rounded-3xl border border-gray-100 flex items-center gap-5 shadow-sm">
                      <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <FileSpreadsheet className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider leading-none mb-1.5">{t('ความคืบหน้าเอกสาร', 'Document Checklist')}</p>
                        <p className="text-xl font-display font-bold text-gray-900">
                          {Object.values(docStatuses).filter(s => s === 'approved' || s === 'under_review').length}/4
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Activity and Timeline split */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Activity Feed */}
                    <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 p-6 md:p-8 shadow-sm space-y-6">
                      <h3 className="text-lg font-display font-bold text-gray-900 flex items-center gap-2">
                        <Clock className="w-5 h-5 text-blue-600" />
                        {t('บันทึกกิจกรรมล่าสุด', 'Recent Activities')}
                      </h3>
                      <div className="space-y-6 relative ml-3 border-l border-gray-100 pl-6">
                        <div className="relative">
                          <div className="absolute -left-[30px] top-0.5 w-4.5 h-4.5 rounded-full bg-blue-100 border-4 border-white flex items-center justify-center"><div className="w-1.5 h-1.5 bg-blue-600 rounded-full" /></div>
                          <p className="text-xs font-bold text-gray-900">{t('มอบหมายคณะผู้ตรวจประเมิน', 'Lead Auditor Assigned')}</p>
                          <p className="text-[10px] text-gray-400">{t('วันนี้ - มอบหมาย คุณอนิรุทธ์ ร. เป็นหัวหน้าผู้แทนตรวจสำหรับ ISO 45001', 'Today - Assigned Anirut R. as lead auditor for ISO 45001 project.')}</p>
                        </div>
                        {paymentStatus === 'verifying' && (
                          <div className="relative">
                            <div className="absolute -left-[30px] top-0.5 w-4.5 h-4.5 rounded-full bg-amber-100 border-4 border-white flex items-center justify-center"><div className="w-1.5 h-1.5 bg-amber-600 rounded-full" /></div>
                            <p className="text-xs font-bold text-gray-900">{t('ลูกค้าส่งหลักฐานสลิปแจ้งชำระเงิน', 'Payment Slip Uploaded')}</p>
                            <p className="text-[10px] text-gray-400">{t('วันนี้ - ยื่นสลิปยอดชำระ ฿15,400 เข้าสู่ระบบ อยู่ระหว่างตรวจสอบบัญชี', 'Today - Submitted slip for ฿15,400. Pending accountant verification.')}</p>
                          </div>
                        )}
                        {ncStatus === 'under_review' && (
                          <div className="relative">
                            <div className="absolute -left-[30px] top-0.5 w-4.5 h-4.5 rounded-full bg-emerald-100 border-4 border-white flex items-center justify-center"><div className="w-1.5 h-1.5 bg-emerald-600 rounded-full" /></div>
                            <p className="text-xs font-bold text-gray-900">{t('ลูกค้าส่งหลักฐานการแก้ไขข้อบกพร่อง (NC)', 'CAR Evidence Submitted')}</p>
                            <p className="text-[10px] text-gray-400">{t('วันนี้ - ยื่นเอกสารแก้ไขสำหรับจุดบันทึกรายงานตรวจประเมินภายใน', 'Today - Submitted corrective action report for internal audit clause.')}</p>
                          </div>
                        )}
                        <div className="relative">
                          <div className="absolute -left-[30px] top-0.5 w-4.5 h-4.5 rounded-full bg-gray-100 border-4 border-white flex items-center justify-center"><div className="w-1.5 h-1.5 bg-gray-400 rounded-full" /></div>
                          <p className="text-xs font-bold text-gray-900">{t('ออกใบแจ้งหนี้ #INV-2024-002', 'Invoice INV-2024-002 Issued')}</p>
                          <p className="text-[10px] text-gray-400">{t('เมื่อวานนี้ - ออกใบแจ้งค่าบริการตรวจติดตาม ISO 45001', 'Yesterday - Invoice generated for ISO 45001 Stage 2 Audit.')}</p>
                        </div>
                        <div className="relative">
                          <div className="absolute -left-[30px] top-0.5 w-4.5 h-4.5 rounded-full bg-emerald-100 border-4 border-white flex items-center justify-center"><div className="w-1.5 h-1.5 bg-emerald-600 rounded-full" /></div>
                          <p className="text-xs font-bold text-gray-900">{t('ผ่านการอนุมัติเอกสารคู่มือคุณภาพ', 'Quality Manual Document Approved')}</p>
                          <p className="text-[10px] text-gray-400">{t('3 วันก่อน - เอกสารคู่มือระบบงาน (Quality Manual) ได้รับอนุมัติผ่านระบบงานตรวจเอกสาร', '3 days ago - Quality Manual approved by technical assessment committee.')}</p>
                        </div>
                      </div>
                    </div>

                    {/* Support card */}
                    <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-sm space-y-6">
                      <div className="space-y-2">
                        <HelpCircle className="w-8 h-8 text-indigo-400" />
                        <h4 className="text-base font-bold">{t('ต้องการคำปรึกษา ISO หรือระบบงาน?', 'Need ISO & Standards help?')}</h4>
                        <p className="text-xs text-indigo-200/80 leading-relaxed">
                          {t('คุณสามารถสอบถามประเด็นข้อกำหนด การเตรียมงานตรวจประเมิน และขั้นตอนการปิดข้อบกพร่อง (NC) กับที่ปรึกษา AI อัจฉริยะได้ตลอด 24 ชั่วโมง', 'Get instant advice on standards clauses, audit preparation, or resolving non-conformities with our AI Consultant.')}
                        </p>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/10 space-y-1">
                        <div className="text-[10px] font-bold text-indigo-300 uppercase tracking-wider">{t('สายด่วนติดต่อเจ้าหน้าที่', 'QAIC Hotline')}</div>
                        <div className="text-sm font-display font-bold">02-123-4567</div>
                        <div className="text-[10px] text-indigo-200/70">support@qaic-thailand.com</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: CERTIFICATES */}
              {portalTab === 'certificates' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-display font-bold text-gray-900">{t('ใบรับรองมาตรฐานของท่าน', 'My Certificates')}</h3>
                      <p className="text-xs text-gray-500">{t('ใบรับรองมาตรฐาน ISO ที่ผ่านการรับรองและมีผลบังคับใช้ในปัจจุบัน', 'Your currently active and accredited ISO certifications.')}</p>
                    </div>
                    <button className="px-4 py-2.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5">
                      <Download className="w-4 h-4" />
                      {t('ดาวน์โหลดใบรับรองทั้งหมด', 'Download All')}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {certs.map(cert => (
                      <div 
                        key={cert.id}
                        className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between space-y-6 relative overflow-hidden"
                      >
                        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />
                        
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="px-3 py-1 bg-blue-50 text-blue-700 border border-blue-100 rounded-lg text-[10px] font-bold uppercase tracking-wider">
                              {cert.code}
                            </span>
                            <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded-full uppercase tracking-wider">
                              {t('สถานะ: ปกติ', 'Active')}
                            </span>
                          </div>
                          <div>
                            <h4 className="text-base font-bold text-gray-900 mb-1">{t('ระบบบริหารงานที่ได้รับการรับรอง', 'Certified Quality System')}</h4>
                            <p className="text-xs text-gray-500 line-clamp-2 italic">"{lang === 'TH' ? cert.scopeTH : cert.scopeEN}"</p>
                          </div>
                        </div>

                        <div className="pt-4 border-t border-gray-50 space-y-4">
                          <div className="grid grid-cols-2 gap-4 text-[10px] text-gray-500">
                            <div>
                              <span className="block font-bold text-gray-400 uppercase">{t('เลขที่ใบรับรอง', 'Cert Number')}</span>
                              <span className="font-mono text-gray-700 font-bold">{cert.certNumber}</span>
                            </div>
                            <div>
                              <span className="block font-bold text-gray-400 uppercase">{t('วันออกและหมดอายุ', 'Issue & Expiry')}</span>
                              <span className="text-gray-700">{cert.issueDate} - {cert.expiryDate}</span>
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            <button 
                              onClick={() => {
                                setSelectedCert(cert);
                                setCertModalOpen(true);
                              }}
                              className="flex-1 py-3 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5"
                            >
                              <Eye className="w-4 h-4" />
                              {t('แสดงใบรับรอง', 'View Certificate')}
                            </button>
                            <button className="p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-600 rounded-xl transition-all flex items-center justify-center">
                              <Download className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}

                    <div className="border-2 border-dashed border-gray-200 rounded-3xl p-6 flex flex-col items-center justify-center gap-4 text-gray-400 min-h-[200px]">
                      <div className="p-4 bg-gray-50 rounded-full text-gray-400"><ShieldCheck className="w-8 h-8" /></div>
                      <div className="text-center space-y-1">
                        <h4 className="text-sm font-bold text-gray-700">{t('ใบรับรองอยู่ในขั้นตอนเตรียมตรวจประเมิน', 'Audit Under Preparation')}</h4>
                        <p className="text-xs text-gray-400 max-w-xs">{t('สำหรับมาตรฐาน ISO 45001:2018 ใบรับรองจะปรากฏขึ้นหลังจากการปิดข้อบกพร่องและอนุมัติผ่านที่ประชุม', 'ISO 45001 certification will appear here after audit completion & committee approval.')}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: AUDIT & CAR TRACKING */}
              {portalTab === 'tracking' && (
                <div className="space-y-8">
                  {/* Audit Project Info */}
                  <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-50 pb-5">
                      <div className="space-y-1">
                        <span className="px-3 py-1 bg-amber-50 text-amber-800 border border-amber-100 text-[9px] font-bold rounded-lg uppercase tracking-wider">
                          ISO 45001:2018 ({t('ตรวจประเมินรอบหลัก', 'Main Audit Cycle')})
                        </span>
                        <h3 className="text-lg font-display font-bold text-gray-900">{t('การตรวจติดตามและรับรองระบบงาน', 'Audit & Certification Progress')}</h3>
                      </div>
                      <div className="px-3.5 py-1.5 bg-blue-50 text-blue-700 text-xs font-bold rounded-full uppercase tracking-wider">
                        {confirmedSchedule ? t('กำหนดการ: ยืนยันแล้ว', 'Schedule: Confirmed') : t('สถานะ: รอยืนยันนัดตรวจ', 'Status: Pending Confirmation')}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Proposed Schedule Block */}
                      <div className="bg-gray-50/50 p-6 rounded-2xl border border-gray-100 space-y-4">
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest leading-none">{t('กำหนดการที่เสนอเข้าตรวจ', 'Proposed Audit Schedule')}</h4>
                        <div className="space-y-2">
                          <div className="text-xl font-display font-bold text-gray-900">24 {t('มีนาคม 2024', 'March 2024')}</div>
                          <div className="text-xs text-gray-500 leading-relaxed">{t('ระยะเวลาตรวจประเมิน: 2 วันทำการ (Stage 2 Audit)', 'Audit Duration: 2 Working Days (Stage 2 Audit)')}</div>
                        </div>

                        {!confirmedSchedule ? (
                          <div className="flex gap-2 pt-2">
                            <button 
                              onClick={() => setConfirmedSchedule(true)}
                              className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold rounded-xl transition-all flex items-center justify-center gap-1 shadow-sm active:scale-95"
                            >
                              <Check className="w-3.5 h-3.5" />
                              {t('ยืนยันวันตรวจ', 'Confirm Date')}
                            </button>
                            <button className="py-2.5 px-3 bg-white border border-gray-200 hover:bg-gray-50 text-gray-650 text-[11px] font-bold rounded-xl transition-all">
                              {t('ขอเปลี่ยน', 'Reschedule')}
                            </button>
                          </div>
                        ) : (
                          <div className="py-2 px-3 bg-emerald-50 text-emerald-800 border border-emerald-100 rounded-xl text-xs font-bold flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                            <span>{t('ยืนยันกำหนดการตรวจแล้ว', 'Audit date confirmed')}</span>
                          </div>
                        )}
                      </div>

                      {/* Lead Auditor Profile */}
                      <div className="bg-gray-50/50 p-6 rounded-2xl border border-gray-100 flex items-start gap-4 col-span-2">
                        <div className="w-14 h-14 bg-blue-100 text-blue-700 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden font-display font-bold text-lg">
                          AR
                        </div>
                        <div className="space-y-2 flex-1">
                          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest leading-none">{t('หัวหน้าคณะผู้ตรวจประเมิน', 'Lead Auditor Assigned')}</h4>
                          <div>
                            <span className="text-sm font-bold text-gray-900 block">{t('คุณอนิรุทธ์ รักษาสัตย์', 'Mr. Anirut Raksasat')}</span>
                            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">{t('แผนกตรวจประเมิน (Auditing Department)', 'Auditing Department')}</span>
                          </div>
                          <p className="text-[11px] text-gray-500 leading-relaxed">
                            {t('ผู้ตรวจประเมินอาวุโสจดทะเบียน IRCA, เชี่ยวชาญมาตรฐาน OHSAS/ISO 45001 ประสบการณ์ตรวจอุตสาหกรรมกว่า 10 ปี', 'Senior registered IRCA auditor, specializing in ISO 45001 with 10+ years of industrial audit experience.')}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* NC / CAR Action Center */}
                  <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                    <div>
                      <h3 className="text-lg font-display font-bold text-gray-900 flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-amber-600" />
                        {t('จุดบกพร่องที่ต้องยื่นหลักฐานแก้ไข (CAR/NC Tracker)', 'Corrective Action Reports (CAR/NC)')}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">{t('ตารางติดตามข้อบกพร่องจากการตรวจประเมินครั้งก่อนหน้า และอัปโหลดรายงานผลการแก้ไข', 'Track non-conformities from previous audits and upload corrective action reports.')}</p>
                    </div>

                    <div className="border border-gray-100 rounded-2xl overflow-hidden">
                      <div className="p-4 bg-gray-50 text-[10px] font-bold text-gray-500 uppercase tracking-wider grid grid-cols-6 gap-4 border-b border-gray-100">
                        <div className="col-span-2">{t('ข้อบกพร่องและรายละเอียด', 'Finding Detail')}</div>
                        <div>{t('ข้อกำหนด', 'Clause')}</div>
                        <div>{t('ระดับความรุนแรง', 'Severity')}</div>
                        <div>{t('สถานะ', 'Status')}</div>
                        <div className="text-right">{t('การจัดการ', 'Actions')}</div>
                      </div>

                      <div className="divide-y divide-gray-50 text-xs">
                        <div className="p-4 grid grid-cols-6 gap-4 items-center">
                          <div className="col-span-2 space-y-1">
                            <span className="font-bold text-gray-900 block">{t('รายงานบันทึกการตรวจประเมินภายในไม่ครบถ้วน', 'Internal Audit Record Incomplete')}</span>
                            <span className="text-[10px] text-gray-400 leading-relaxed block italic">"{t('รายงานผลลัพธ์การประชุมทบทวนรายงานการตรวจสอบภายในตามแผนไม่มีหลักฐานอ้างอิงชัดเจน', 'No clear record of management review inputs mapping from last internal audit.')}"</span>
                          </div>
                          <div className="font-mono text-gray-600">9.2.2</div>
                          <div>
                            <span className="px-2 py-0.5 bg-red-50 text-red-700 text-[9px] font-bold rounded">Major NC</span>
                          </div>
                          <div>
                            {ncStatus === 'action_required' ? (
                              <span className="px-2.5 py-0.5 bg-amber-100 text-amber-800 text-[9px] font-bold rounded-full uppercase tracking-wider">{t('ต้องปรับปรุง', 'Action Required')}</span>
                            ) : (
                              <span className="px-2.5 py-0.5 bg-blue-100 text-blue-800 text-[9px] font-bold rounded-full uppercase tracking-wider">{t('รอการตรวจสอบ', 'Under Review')}</span>
                            )}
                          </div>
                          <div className="text-right">
                            <span className="text-[10px] text-gray-400 font-mono block mb-1">Due: 30 Mar 2024</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {ncStatus === 'action_required' ? (
                      <form onSubmit={handleCARSubmit} className="bg-gray-50/50 p-6 rounded-2xl border border-gray-100 space-y-4">
                        <h4 className="text-xs font-bold text-gray-900">{t('ยื่นแผนแก้ไขและสลักสลิปหลักฐานการปรับปรุง (Submit CAR Report)', 'Submit Corrective Action Plan & Evidence')}</h4>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-500 uppercase block">{t('การวิเคราะห์สาเหตุและแนวทางป้องกัน (Root Cause & Corrective Action Analysis)', 'Root Cause & Action Plan')}</label>
                            <textarea 
                              required
                              value={ncText}
                              onChange={(e) => setNcText(e.target.value)}
                              placeholder={t('ระบุสาเหตุที่ตรวจพบข้อบกพร่อง พร้อมทั้งรายละเอียดการจัดอบรมหรือปรับแก้ขั้นตอนปฏิบัติงาน...', 'Describe root cause and preventive measures taken...')}
                              className="w-full p-3 bg-white border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-sans min-h-[80px]"
                            />
                          </div>
                          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                            <label className="flex items-center gap-2 p-3 bg-white border border-gray-200 hover:border-gray-300 rounded-xl cursor-pointer text-xs font-semibold text-gray-650 transition-all active:scale-[0.98] w-full sm:w-auto">
                              <FileUp className="w-4 h-4 text-gray-400" />
                              <span>{selectedFile ? selectedFile.name : t('แนบหลักฐาน (เช่น PDF, รูปภาพสไลด์สรุป)', 'Attach Proof (PDF, Images)')}</span>
                              <input 
                                type="file" 
                                className="hidden" 
                                onChange={(e) => {
                                  if (e.target.files && e.target.files[0]) {
                                    setSelectedFile(e.target.files[0]);
                                  }
                                }} 
                              />
                            </label>
                            <button 
                              type="submit"
                              disabled={uploadProgress}
                              className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all shadow-md active:scale-95 flex items-center justify-center gap-1.5"
                            >
                              {uploadProgress ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                              <span>{t('ส่งสลักแผนงานตรวจประเมิน', 'Submit Evidence')}</span>
                            </button>
                          </div>
                        </div>
                      </form>
                    ) : (
                      <div className="bg-emerald-50/50 p-6 rounded-2xl border border-emerald-100 flex items-start gap-4">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <div className="space-y-1">
                          <h4 className="text-xs font-bold text-gray-900">{t('ส่งหลักฐานแก้ไขแล้ว (Evidence Submitted)', 'Evidence Under Audit Review')}</h4>
                          <p className="text-[11px] text-gray-600">{t('รายงานการวิเคราะห์และหลักฐานของคุณถูกส่งไปยังหัวหน้าคณะผู้ตรวจประเมินเรียบร้อยแล้ว สถานะจะเปลี่ยนเมื่อหัวหน้าผู้ตรวจปิดประเด็น', 'We have forwarded your action evidence and analysis to Mr. Anirut R. (Lead Auditor) for official sign-off.')}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 4: DOCUMENT CHECKLIST */}
              {portalTab === 'documents' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-display font-bold text-gray-900">{t('รายการตรวจสอบเอกสาร (Document Checklist)', 'Document Checklist')}</h3>
                      <p className="text-xs text-gray-500">{t('เอกสารที่คณะผู้ตรวจประเมินต้องการสำหรับการวิเคราะห์เอกสารระบบงาน (Stage 1 Audit)', 'Standard files required by auditing body for document reviews (Stage 1).')}</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="divide-y divide-gray-50">
                      {[
                        { key: 'qualityManual', titleTH: 'คู่มือคุณภาพระบบบริหารงาน (Quality Manual)', titleEN: 'System Quality Manual', code: 'QM-01' },
                        { key: 'managementReview', titleTH: 'รายงานผลการประชุมทบทวนฝ่ายบริหาร (Management Review Report)', titleEN: 'Management Review Meeting Minutes', code: 'MR-02' },
                        { key: 'internalAudit', titleTH: 'รายงานผลการตรวจติดตามระบบภายใน (Internal Audit Report)', titleEN: 'Internal Audit Reports', code: 'IA-03' },
                        { key: 'riskAssessment', titleTH: 'บันทึกวิเคราะห์และประเมินความเสี่ยงองค์กร (Risk Assessment Records)', titleEN: 'Risk Register & Assessment Records', code: 'RA-04' }
                      ].map(doc => {
                        const status = docStatuses[doc.key];
                        return (
                          <div key={doc.key} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex items-start gap-4">
                              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                                <FileText className="w-5 h-5" />
                              </div>
                              <div className="space-y-1">
                                <span className="text-[9px] font-mono text-gray-400 block font-bold">{doc.code}</span>
                                <h4 className="text-xs font-bold text-gray-900">{t(doc.titleTH, doc.titleEN)}</h4>
                              </div>
                            </div>

                            <div className="flex items-center gap-4 justify-between md:justify-end">
                              <div>
                                {status === 'approved' && (
                                  <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded-full uppercase tracking-wider flex items-center gap-1">
                                    <Check className="w-3.5 h-3.5" />
                                    {t('ผ่านการอนุมัติ', 'Approved')}
                                  </span>
                                )}
                                {status === 'pending' && (
                                  <span className="px-2.5 py-1 bg-gray-100 text-gray-500 text-[10px] font-bold rounded-full uppercase tracking-wider">
                                    {t('รอดำเนินการ', 'Pending Upload')}
                                  </span>
                                )}
                                {status === 'under_review' && (
                                  <span className="px-2.5 py-1 bg-blue-50 text-blue-700 text-[10px] font-bold rounded-full uppercase tracking-wider flex items-center gap-1">
                                    <Loader2 className="w-3 h-3 animate-spin" />
                                    {t('รอการตรวจสอบ', 'Under Review')}
                                  </span>
                                )}
                              </div>

                              {status === 'pending' ? (
                                <button 
                                  onClick={() => handleDocumentUpload(doc.key)}
                                  className="px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white text-[11px] font-bold rounded-xl transition-all flex items-center gap-1 pointer-events-auto shadow-sm"
                                >
                                  <Upload className="w-3.5 h-3.5" />
                                  <span>{t('อัปโหลดไฟล์', 'Upload')}</span>
                                </button>
                              ) : (
                                <button className="px-4 py-2 bg-gray-50 text-gray-400 border border-gray-200 text-[11px] font-bold rounded-xl cursor-not-allowed">
                                  {t('ตรวจสอบแล้ว', 'Completed')}
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: BILLING & FINANCE */}
              {portalTab === 'finance' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-display font-bold text-gray-900">{t('การเงินและประวัติค่าธรรมเนียม', 'Billing & Payments')}</h3>
                      <p className="text-xs text-gray-500">{t('ตรวจสอบข้อมูลใบเสนอราคา ค่าบริการประเมินความสอดคล้อง และอัปโหลดสลิปแจ้งการเงิน', 'Manage invoices, check payment records, and submit transfer slips.')}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-5">
                      <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <CreditCard className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1 leading-none">{t('ยอดเงินคงค้าง', 'Amount Outstanding')}</p>
                        <p className={`text-xl font-display font-bold ${paymentStatus === 'paid' ? 'text-emerald-600' : 'text-amber-650'}`}>
                          {paymentStatus === 'paid' ? '฿0' : '฿15,400'}
                        </p>
                      </div>
                    </div>
                    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-5">
                      <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1 leading-none">{t('ชำระแล้วเสร็จ', 'Total Paid')}</p>
                        <p className="text-xl font-display font-bold text-gray-900">
                          {paymentStatus === 'paid' ? '฿30,800' : '฿15,400'}
                        </p>
                      </div>
                    </div>
                    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-5">
                      <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <Receipt className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1 leading-none">{t('จำนวนเอกสารบิล', 'Total Invoices')}</p>
                        <p className="text-xl font-display font-bold text-gray-900">2 <span className="text-xs font-sans font-medium text-gray-400">รายการ</span></p>
                      </div>
                    </div>
                  </div>

                  {/* Billing Records Table */}
                  <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="p-4 bg-gray-50 text-[10px] font-bold text-gray-500 uppercase tracking-wider grid grid-cols-5 gap-4 border-b border-gray-100">
                      <div>{t('เลขที่ใบแจ้งหนี้', 'Invoice No')}</div>
                      <div className="col-span-2">{t('รายละเอียดรายการ', 'Item Description')}</div>
                      <div>{t('ยอดเงินสุทธิ', 'Amount')}</div>
                      <div>{t('สถานะทางการเงิน', 'Status')}</div>
                    </div>

                    <div className="divide-y divide-gray-50 text-xs">
                      {/* INV-01: Paid */}
                      <div className="p-5 grid grid-cols-5 gap-4 items-center">
                        <div className="font-mono font-bold text-gray-900">#INV-2024-001</div>
                        <div className="col-span-2">
                          <span className="block font-bold text-gray-800">{t('ค่าธรรมเนียมสมัครและทบทวนเอกสาร Stage 1', 'ISO 45001 Application & Stage 1 Review Fee')}</span>
                          <span className="text-[10px] text-gray-400">{t('ชำระเมื่อ: 15 ม.ค. 2024 (แนบสลิปผ่านระบบแล้ว)', 'Paid on Jan 15, 2024 via Bank Transfer')}</span>
                        </div>
                        <div className="font-display font-bold text-gray-900">฿15,400.00</div>
                        <div>
                          <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded-full uppercase tracking-wider flex items-center gap-1 w-fit">
                            <Check className="w-3.5 h-3.5" />
                            {t('ชำระเงินแล้ว', 'Paid')}
                          </span>
                        </div>
                      </div>

                      {/* INV-02: Interactive */}
                      <div className="p-5 grid grid-cols-5 gap-4 items-center">
                        <div className="font-mono font-bold text-gray-900">#INV-2024-002</div>
                        <div className="col-span-2">
                          <span className="block font-bold text-gray-800">{t('ค่าบริการคณะตรวจและรับรอง Stage 2', 'ISO 45001 Stage 2 Audit & Certification Fee')}</span>
                          <span className="text-[10px] text-gray-400">{t('กำหนดชำระ: 20 มี.ค. 2024', 'Payment Due: Mar 20, 2024')}</span>
                        </div>
                        <div className="font-display font-bold text-gray-900">฿15,400.00</div>
                        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
                          <div>
                            {paymentStatus === 'unpaid' && (
                              <span className="px-2.5 py-1 bg-amber-50 text-amber-700 text-[10px] font-bold rounded-full uppercase tracking-wider w-fit block">
                                {t('ค้างชำระ', 'Unpaid')}
                              </span>
                            )}
                            {paymentStatus === 'verifying' && (
                              <span className="px-2.5 py-1 bg-blue-50 text-blue-700 text-[10px] font-bold rounded-full uppercase tracking-wider w-fit block flex items-center gap-1">
                                <Loader2 className="w-3 h-3 animate-spin" />
                                {t('รอตรวจสลิป', 'Verifying')}
                              </span>
                            )}
                            {paymentStatus === 'paid' && (
                              <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded-full uppercase tracking-wider w-fit block flex items-center gap-1">
                                <Check className="w-3.5 h-3.5" />
                                {t('ชำระเงินแล้ว', 'Paid')}
                              </span>
                            )}
                          </div>
                          {paymentStatus === 'unpaid' && (
                            <button 
                              onClick={() => setPaymentModalOpen(true)}
                              className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-bold rounded-xl transition-all shadow-sm active:scale-95 flex items-center gap-1"
                            >
                              <Upload className="w-3.5 h-3.5" />
                              <span>{t('แจ้งชำระเงิน', 'Pay Slip')}</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* POPUP MODAL: Upload Billing Bank Slip */}
      <AnimatePresence>
        {paymentModalOpen && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-6 bg-gray-900/60 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl p-8 border border-gray-100"
            >
              <h3 className="text-xl font-display font-bold text-gray-900 mb-2">{t('แจ้งชำระเงินค่าธรรมเนียม', 'Upload Bank Transfer Slip')}</h3>
              <p className="text-xs text-gray-500 mb-6">{t('กรุณาโอนเงินเข้าบัญชีธนาคารกรุงเทพ เลขที่ 123-4-56789-0 บจก. คิวเอไอซี ประเทศไทย และอัปโหลดหลักฐาน', 'Please transfer ฿15,400 to Bangkok Bank 123-4-56789-0 (QAIC Thailand) and upload the slip.')}</p>
              
              <form onSubmit={handlePaymentSubmit} className="space-y-6">
                <div className="border-2 border-dashed border-gray-200 rounded-2xl p-6 text-center hover:border-blue-400 transition-all flex flex-col items-center justify-center gap-3 cursor-pointer">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-full"><Upload className="w-6 h-6" /></div>
                  <span className="text-xs font-semibold text-gray-650">{selectedFile ? selectedFile.name : t('เลือกภาพถ่ายสลิป / สลิปโอนเงิน', 'Choose Slip Photo / Receipt File')}</span>
                  <input 
                    type="file" 
                    required
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setSelectedFile(e.target.files[0]);
                      }
                    }}
                  />
                </div>

                <div className="flex gap-3">
                  <button 
                    type="button" 
                    onClick={() => setPaymentModalOpen(false)}
                    className="flex-1 py-3.5 bg-gray-50 hover:bg-gray-100 text-gray-650 text-xs font-bold rounded-xl transition-all"
                  >
                    {t('ยกเลิก', 'Cancel')}
                  </button>
                  <button 
                    type="submit" 
                    disabled={uploadProgress}
                    className="flex-1 py-3.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-md shadow-blue-600/10 active:scale-95"
                  >
                    {uploadProgress && <Loader2 className="w-4 h-4 animate-spin" />}
                    <span>{t('แจ้งชำระเงิน', 'Submit Slip')}</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* POPUP MODAL: Certificate Paper/Digital Viewer */}
      <AnimatePresence>
        {certModalOpen && selectedCert && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 md:p-6 bg-gray-900/60 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white w-full max-w-lg rounded-[2rem] shadow-2xl p-6 md:p-8 relative my-8"
            >
              {/* Close Button */}
              <button 
                onClick={() => setCertModalOpen(false)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-all z-15"
              >
                <ChevronRight className="w-5 h-5 rotate-90" />
              </button>

              <div className="text-center space-y-6">
                <div>
                  <h3 className="text-base font-bold text-gray-900">{t('ตัวอย่างใบรับรองระบบบริหารงาน', 'Accredited Certificate Inspector')}</h3>
                  <div className="flex justify-center gap-2 mt-3 p-1 bg-gray-100 rounded-xl w-fit mx-auto">
                    <button 
                      onClick={() => setCertLayout('paper')}
                      className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${certLayout === 'paper' ? 'bg-white text-blue-900 shadow' : 'text-gray-500'}`}
                    >
                      {t('รูปแบบใบจริง', 'Paper View')}
                    </button>
                    <button 
                      onClick={() => setCertLayout('digital')}
                      className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${certLayout === 'digital' ? 'bg-white text-blue-900 shadow' : 'text-gray-500'}`}
                    >
                      {t('ข้อมูลสากล (Digital)', 'Digital Info')}
                    </button>
                  </div>
                </div>

                {certLayout === 'paper' ? (
                  /* Paper A4 template layout overlayed with dynamic fields */
                  <div 
                    className="relative w-full aspect-[1/1.414] bg-white rounded-lg shadow-inner overflow-hidden border border-gray-150 p-6 md:p-10 text-center flex flex-col justify-between"
                    style={{ 
                      backgroundImage: 'url("/ตัวอย่างใบcer.png")', 
                      backgroundSize: '100% 100%', 
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat'
                    }}
                  >
                    <div className="h-full flex flex-col justify-between pt-[24%] pb-[5%]">
                      <div></div>
                      <div className="space-y-4 md:space-y-6">
                        <div className="space-y-1">
                          <span className="text-[8px] italic text-red-800/80 tracking-widest font-sans font-bold uppercase block">
                            This is to certify that
                          </span>
                          <h4 className="text-xs md:text-sm font-bold text-gray-900 leading-snug px-6">
                            {selectedCert.companyNameTH}
                          </h4>
                          <p className="text-[8px] md:text-[9.5px] text-gray-500 font-sans font-medium px-6">
                            {selectedCert.companyNameEN}
                          </p>
                        </div>

                        <div className="space-y-0.5 bg-red-900/5 py-1 px-3 rounded-lg border border-red-900/10 max-w-[240px] mx-auto">
                          <span className="text-[7px] font-bold uppercase text-red-800/70 tracking-wider block">{t('ได้รับการรับรองมาตรฐานระบบงาน', 'Has been assessed and certified under')}</span>
                          <div className="text-xs md:text-sm font-black text-red-950 font-display">
                            {selectedCert.code}
                          </div>
                        </div>

                        <div className="space-y-0.5 max-w-[280px] mx-auto">
                          <span className="text-[7px] font-bold uppercase text-gray-400 tracking-widest block">Scope of Certified Operations</span>
                          <p className="text-[8px] text-gray-750 leading-relaxed font-sans italic px-6 line-clamp-3">
                            "{t(selectedCert.scopeTH || '', selectedCert.scopeEN || '')}"
                          </p>
                        </div>
                      </div>

                      {/* Bottom validation footer */}
                      <div className="grid grid-cols-3 items-end gap-2 pt-2 border-t border-gray-150/40 text-left">
                        <div className="text-[7px] text-gray-500 font-sans space-y-0.5 leading-tight">
                          <div><span className="font-bold text-gray-700">CERT NO: </span><span className="font-mono">{selectedCert.certNumber}</span></div>
                          <div><span className="font-bold text-gray-700">ISSUE: </span><span className="font-mono">{selectedCert.issueDate}</span></div>
                          <div><span className="font-bold text-gray-700">EXPIRY: </span><span className="font-mono text-red-800">{selectedCert.expiryDate}</span></div>
                          <div><span className="font-bold text-gray-700">STATUS: </span><span className="font-bold text-emerald-600">Active</span></div>
                        </div>

                        <div className="flex flex-col items-center justify-center">
                          <div className="bg-white p-1 rounded border border-gray-200 shadow-sm w-8 h-8 flex items-center justify-center">
                            <QrCode className="w-full h-full text-gray-900 stroke-1" />
                          </div>
                          <span className="text-[5px] font-mono text-gray-400 mt-0.5 uppercase">VERIFIED QR</span>
                        </div>

                        <div className="flex flex-col items-center justify-center">
                          <div className="bg-white p-1 rounded border border-gray-200 shadow-sm w-8 h-11 flex items-center justify-center">
                            <img src={getStandardLogo(selectedCert.category || '')} alt="Standard Logo" className="w-full h-full object-contain" />
                          </div>
                          <span className="text-[5px] font-mono text-gray-400 mt-0.5 uppercase">ACCREDITED</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Digital clean interface layout */
                  <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 text-left space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div>
                        <span className="text-gray-400 block font-bold uppercase tracking-wider text-[9px]">{t('บริษัทผู้ได้รับใบรับรอง (TH)', 'Accredited Company (TH)')}</span>
                        <span className="text-gray-800 font-bold">{selectedCert.companyNameTH}</span>
                      </div>
                      <div>
                        <span className="text-gray-400 block font-bold uppercase tracking-wider text-[9px]">{t('บริษัทผู้ได้รับใบรับรอง (EN)', 'Accredited Company (EN)')}</span>
                        <span className="text-gray-800 font-bold">{selectedCert.companyNameEN}</span>
                      </div>
                      <div>
                        <span className="text-gray-400 block font-bold uppercase tracking-wider text-[9px]">{t('มาตรฐานใบรับรอง', 'ISO Standard')}</span>
                        <span className="text-blue-700 font-extrabold">{selectedCert.code}</span>
                      </div>
                      <div>
                        <span className="text-gray-400 block font-bold uppercase tracking-wider text-[9px]">{t('เลขที่ใบรับรอง', 'Certificate No')}</span>
                        <span className="font-mono text-gray-800 font-bold">{selectedCert.certNumber}</span>
                      </div>
                      <div className="col-span-2">
                        <span className="text-gray-400 block font-bold uppercase tracking-wider text-[9px]">{t('ขอบข่ายการรับรอง', 'Certified Scope')}</span>
                        <span className="text-gray-750 italic">"{t(selectedCert.scopeTH || '', selectedCert.scopeEN || '')}"</span>
                      </div>
                      <div>
                        <span className="text-gray-400 block font-bold uppercase tracking-wider text-[9px]">{t('วันออกใบรับรอง', 'Certified Issue Date')}</span>
                        <span>{selectedCert.issueDate}</span>
                      </div>
                      <div>
                        <span className="text-gray-400 block font-bold uppercase tracking-wider text-[9px]">{t('วันหมดอายุสากล', 'Global Expiry Date')}</span>
                        <span className="text-red-700 font-bold">{selectedCert.expiryDate}</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="pt-2 flex items-center justify-center gap-4">
                  <button className="flex-1 py-3.5 bg-gray-900 hover:bg-gray-800 text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-md active:scale-95">
                    <Download className="w-4 h-4" />
                    {t('ดาวน์โหลดเป็น PDF', 'Download PDF')}
                  </button>
                  <button 
                    onClick={() => setCertModalOpen(false)}
                    className="px-6 py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-xl transition-all"
                  >
                    {t('ปิดหน้าต่าง', 'Close')}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
