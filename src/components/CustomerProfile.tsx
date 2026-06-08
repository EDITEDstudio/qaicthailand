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
  Plus
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
  const [activeTab, setActiveTab] = useState<'overview' | 'documents'>('overview');

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
                status: 'active'
              },
              {
                id: '2',
                standardId: 'iso-14001',
                code: 'ISO 14001:2015',
                certNumber: 'QAIC/TH/14001/1055',
                issueDate: '2023-03-20',
                expiryDate: '2026-03-19',
                status: 'active'
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
            setAudits(auditsData);
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalBalance = audits.reduce((sum, audit) => sum + audit.outstandingBalance, 0);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin mb-4" />
        <p className="text-gray-500 font-sans">{t('กำลังโหลดข้อมูลโปรไฟล์...', 'Loading your profile...')}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-20">
      {/* Profile Header */}
      <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 flex flex-col md:flex-row items-center gap-8 shadow-sm">
        <div className="relative">
           <div className="w-24 h-24 rounded-3xl bg-blue-100 text-blue-600 flex items-center justify-center overflow-hidden">
             {user?.photoURL ? (
               <img src={user.photoURL} className="w-full h-full object-cover" />
             ) : (
               <ShieldCheck className="w-10 h-10" />
             )}
           </div>
           <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-500 border-4 border-white rounded-full flex items-center justify-center text-white">
              <CheckCircle2 className="w-4 h-4" />
           </div>
        </div>
        <div className="flex-1 text-center md:text-left space-y-1">
          <h2 className="text-3xl font-display font-bold text-gray-900 tracking-tight">
            {user?.displayName || 'Client Name'}
          </h2>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {t('สมาชิกตั้งแต่: 15 ม.ค. 2023', 'Member since: Jan 15, 2023')}</span>
            <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-bold uppercase tracking-widest">{t('สถานะ: ปกติ', 'Status: Active')}</span>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-3 bg-gray-900 text-white rounded-2xl text-xs font-bold hover:bg-gray-800 transition-all flex items-center gap-2">
            <Download className="w-4 h-4" />
            {t('ดาวน์โหลดใบรับรอง', 'Download All Certs')}
          </button>
          <button className="px-6 py-3 bg-gray-50 text-gray-600 rounded-2xl text-xs font-bold hover:bg-gray-100 transition-all flex items-center gap-2 border border-gray-200">
            <Calendar className="w-4 h-4" />
            {t('นัดหมายการตรวจ', 'Schedule Audit')}
          </button>
        </div>
      </div>

      {/* Stats Quick View */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-gray-100 flex items-center gap-6">
          <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest leading-none mb-1">{t('ใบรับรองที่ใช้งาน', 'Active Certs')}</p>
            <p className="text-2xl font-display font-bold text-gray-900">{certs.length} <span className="text-sm font-sans font-medium text-gray-400">{t('มาตรฐาน', 'Standards')}</span></p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-gray-100 flex items-center gap-6">
          <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
            <Clock className="w-7 h-7" />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest leading-none mb-1">{t('การตรวจครั้งถัดไป', 'Next Audit')}</p>
            <p className="text-2xl font-display font-bold text-gray-900">24 {t('มี.ค.', 'Mar')} 2024</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-gray-100 flex items-center gap-6">
          <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center">
            <CreditCard className="w-7 h-7" />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest leading-none mb-1">{t('ยอดค้างชำระ', 'Balance Due')}</p>
            <p className="text-2xl font-display font-bold text-amber-600">฿{totalBalance.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Certification Status */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-display font-bold text-gray-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-blue-600" />
              {t('มาตรฐานที่ได้รับ', 'Achieved Standards')}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certs.map(cert => (
              <motion.div 
                key={cert.id}
                whileHover={{ y: -4 }}
                className="bg-white p-6 rounded-3xl border border-gray-100 hover:border-blue-200 transition-all shadow-sm"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="px-3 py-1 bg-indigo-600 text-white text-[9px] font-bold rounded uppercase">
                    {cert.code}
                  </div>
                  <ShieldCheck className="w-8 h-8 text-gray-50 opacity-10" />
                </div>
                <h4 className="text-sm font-bold text-gray-900 mb-4">{t('ระบบบริหารงานคุณภาพ', 'Quality Management System')}</h4>
                <div className="space-y-2 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-gray-400">{t('วันที่ออกใบรับรอง', 'Issue Date')}</span>
                    <span className="text-gray-700 font-medium">{new Date(cert.issueDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">{t('วันที่หมดอายุ', 'Expiry Date')}</span>
                    <span className="text-gray-700 font-medium">{new Date(cert.expiryDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </motion.div>
            ))}
            <button className="border-2 border-dashed border-gray-200 rounded-3xl p-6 flex flex-col items-center justify-center gap-3 text-gray-400 hover:border-blue-400 hover:text-blue-500 transition-all group">
               <div className="p-3 bg-gray-50 rounded-full group-hover:bg-blue-50 transition-colors">
                  <Plus className="w-6 h-6" />
               </div>
               <span className="text-xs font-bold">{t('ขอใบรับรองมาตรฐานใหม่', 'Apply for New Standard')}</span>
            </button>
          </div>

          {/* Pending Documents Section */}
          <div className="bg-blue-900 p-8 rounded-[2rem] text-white space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="text-lg font-display font-bold">{t('แนบเอกสารตรวจประเมิน', 'Document Submission')}</h3>
                <p className="text-xs text-blue-300">{t('ส่งเอกสารเพิ่มเติมสำหรับการตรวจประเมินที่กำลังดำเนินการ', 'Upload requested documents for ongoing audits.')}</p>
              </div>
              <FileUp className="w-8 h-8 text-blue-500" />
            </div>

            <div className="flex flex-col md:flex-row gap-4">
               <label className="flex-1 flex items-center gap-3 p-4 bg-white/10 border border-white/10 rounded-2xl cursor-pointer hover:bg-white/20 transition-all group">
                  <Plus className="w-5 h-5 text-blue-400" />
                  <span className="text-sm font-medium">{t('เลือกไฟล์เอกสาร...', 'Select Files...')}</span>
                  <input type="file" className="hidden" multiple />
               </label>
               <button className="px-8 py-4 bg-white text-blue-900 rounded-2xl text-sm font-bold shadow-xl shadow-blue-900/40 hover:bg-blue-50 transition-all">
                 {t('อัปโหลดเอกสารทั้งหมด', 'Upload All Documents')}
               </button>
            </div>
          </div>
        </div>

        {/* Audit Timeline */}
        <div className="space-y-6">
            <h3 className="text-lg font-display font-bold text-gray-900 flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              {t('สถานะการตรวจประเมิน', 'Audit Status')}
            </h3>

            <div className="space-y-4">
              {audits.map(audit => (
                <div key={audit.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden">
                  <div className="flex items-center justify-between mb-6">
                    <div className="space-y-1">
                       <h4 className="text-sm font-bold text-gray-900">{audit.code} ({t('รอบใหม่', 'New Cycle')})</h4>
                       <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">#AUD-2024-089</p>
                    </div>
                    <div className="px-3 py-1 bg-amber-100 text-amber-700 text-[9px] font-bold rounded-full uppercase">
                       {t('กำลังดำเนินการ', 'In Progress')}
                    </div>
                  </div>

                  <div className="space-y-6 relative ml-2">
                    <div className="absolute left-2.5 top-0 bottom-0 w-px bg-gray-100" />
                    
                    {[
                      { labelTH: 'Document Review', labelEN: 'Document Review', status: 'completed' },
                      { labelTH: 'On-site Audit', labelEN: 'On-site Audit', status: 'current' },
                      { labelTH: 'Pending Approval', labelEN: 'Pending Approval', status: 'pending' },
                      { labelTH: 'Issue Certificate', labelEN: 'Issue Certificate', status: 'pending' }
                    ].map((step, i) => (
                      <div key={i} className="flex gap-4 relative">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center z-10 ${
                          step.status === 'completed' ? 'bg-blue-500 text-white' : 
                          step.status === 'current' ? 'bg-blue-600 text-white' : 'bg-gray-100'
                        }`}>
                          {step.status === 'completed' ? <CheckCircle2 className="w-3 h-3" /> : (
                            step.status === 'current' ? <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" /> : null
                          )}
                        </div>
                        <div className="flex-1 pb-2">
                          <p className={`text-[11px] font-bold ${step.status === 'pending' ? 'text-gray-400' : 'text-gray-900'}`}>
                            {t(step.labelTH, step.labelEN)}
                          </p>
                          {step.status === 'completed' && <p className="text-[9px] text-gray-400">Completed on Mar 01, 2024</p>}
                          {step.status === 'current' && <p className="text-[9px] text-blue-600 font-bold uppercase tracking-widest">Scheduled: Mar 24, 2024</p>}
                        </div>
                      </div>
                    ))}
                  </div>

                  <button className="w-full mt-6 py-4 bg-gray-50 text-gray-600 rounded-2xl text-[11px] font-bold flex items-center justify-center gap-2 border border-gray-100 hover:bg-gray-100 transition-all">
                    <AlertCircle className="w-4 h-4" />
                    {t('ติดต่อที่ปรึกษาการตรวจ', 'Contact Audit Advisor')}
                  </button>
                </div>
              ))}
            </div>

            {/* Outstanding Payment Box */}
            <div className="bg-amber-50 p-6 rounded-3xl border border-amber-100 space-y-4">
               <div>
                  <h4 className="text-xs font-bold text-amber-800 uppercase tracking-widest mb-1">{t('สรุปยอดค้างชำระ', 'Payment Summary')}</h4>
                  <p className="text-2xl font-display font-bold text-gray-900">฿{totalBalance.toLocaleString()}</p>
               </div>
               <p className="text-[10px] text-amber-700 leading-relaxed">
                 {t('*ยอดค้างชำระรวมค่ามัดจำการตรวจประเมิน Stage 2 และค่าประเมินเอกสาร', '*Includes Stage 2 audit deposit and document assessment fees.')}
               </p>
               <button className="w-full py-4 bg-amber-600 text-white rounded-2xl text-[11px] font-bold shadow-lg shadow-amber-600/20 hover:bg-amber-700 transition-all active:scale-95">
                 {t('ชำระเงินทันที', 'Pay Now')}
               </button>
            </div>
        </div>
      </div>
    </div>
  );
}
