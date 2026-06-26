/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { UserSettings } from '../types';
import { ENRICHED_CLIENTS } from '../data/clientsData';
import {
 Search,
 CheckCircle2,
 AlertCircle,
 XCircle,
 FileText,
 Plus,
 ArrowRight,
 ShieldCheck,
 Award,
 QrCode,
 Printer,
 ChevronDown,
  ChevronLeft,
  ChevronRight,
 RefreshCw,
 MapPin,
 Building2,
 Calendar,
 Zap,
 Mail,
 Phone,
 User,
 Check,
 Tag,
 AlertTriangle,
 ExternalLink
} from 'lucide-react';

interface CertificateVerificationProps {
 settings: UserSettings;
}

interface ClientCertificate {
 certificateNo: string;
 companyNameTH: string;
 companyNameEN: string;
 standard: string;
 scopeTH: string;
 scopeEN: string;
 issueDate: string;
 expiryDate: string;
 status: 'Active' | 'Suspended' | 'Expired';
 country: string;
 provinceTH: string;
 provinceEN: string;
 category: 'TAS' | 'ISO 9001' | 'ISO 14001' | 'ISO 27001' | 'HACCP/GHP' | 'GDP';
 authorizedSignatory: string;
}

export default function CertificateVerification({ settings }: CertificateVerificationProps) {
  const lang = settings.lang;
  
  // States
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Expired'>('All');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [activeCert, setActiveCert] = useState<ClientCertificate | null>(null);
  const [customCertificates, setCustomCertificates] = useState<ClientCertificate[]>([]);
  const [certLayout, setCertLayout] = useState<'digital' | 'paper'>('paper');
  const [currentPage, setCurrentPage] = useState(1);

 const getStandardLogo = (category: string) => {
 switch (category) {
 case 'ISO 9001': return '/logoมาตรฐาน/4.png';
 case 'ISO 14001': return '/logoมาตรฐาน/5.png';
 case 'ISO 27001': return '/logoมาตรฐาน/6.png';
 case 'HACCP/GHP': return '/logoมาตรฐาน/7.png';
 case 'GDP': return '/logoมาตรฐาน/8.png';
 case 'TAS': return '/logoมาตรฐาน/9.png';
 default: return '/logoมาตรฐาน/10.png';
 }
 };
 
 // Renewal request modal state
 const [renewalClient, setRenewalClient] = useState<ClientCertificate | null>(null);
 const [renewalForm, setRenewalForm] = useState({ name: '', phone: '', email: '', notes: '' });
 const [isSubmittingRenewal, setIsSubmittingRenewal] = useState(false);
 const [isRenewalSubmitted, setIsRenewalSubmitted] = useState(false);

 // Mint sandbox state
 const [customCompanyName, setCustomCompanyName] = useState('');
 const [customStandard, setCustomStandard] = useState('ISO 9001:2015');
 const [customScope, setCustomScope] = useState('');
 const [customProvince, setCustomProvince] = useState('กรุงเทพมหานคร');
 const [isGenerating, setIsGenerating] = useState(false);
 const [generatedMsg, setGeneratedMsg] = useState(false);

 // Helper localizer
 const t = (th: string, en: string) => (lang === 'TH' ? th : en);

 // Pool combination
 const databasePool = useMemo(() => {
 return [...customCertificates, ...ENRICHED_CLIENTS];
 }, [customCertificates]);

 // Filters calculation
 const filteredClients = useMemo(() => {
 return databasePool.filter((client) => {
 // 1. Status Filter
 if (statusFilter === 'Active') {
 if (client.status !== 'Active') return false;
 } else if (statusFilter === 'Expired') {
 if (client.status !== 'Expired' && client.status !== 'Suspended') return false;
 }

 // 2. Category tag Filter
 if (categoryFilter !== 'All') {
 if (categoryFilter === 'มกษ. (TAS)') {
 if (client.category !== 'TAS') return false;
 } else if (categoryFilter === 'ISO 9001') {
 if (client.category !== 'ISO 9001') return false;
 } else if (categoryFilter === 'ISO 14001') {
 if (client.category !== 'ISO 14001') return false;
 } else if (categoryFilter === 'ISO 27001') {
 if (client.category !== 'ISO 27001') return false;
 } else if (categoryFilter === 'HACCP/GHP') {
 if (client.category !== 'HACCP/GHP') return false;
 } else if (categoryFilter === 'อื่น ๆ / GDP') {
 if (client.category !== 'GDP') return false;
 }
 }

 // 3. Search query match
 if (searchQuery.trim()) {
 const query = searchQuery.toLowerCase().trim();
 const matchesCompany =
 client.companyNameTH.toLowerCase().includes(query) ||
 client.companyNameEN.toLowerCase().includes(query);
 const matchesNo = client.certificateNo.toLowerCase().includes(query);
 const matchesStandard = client.standard.toLowerCase().includes(query);
 const matchesProvince =
 client.provinceTH.toLowerCase().includes(query) ||
 client.provinceEN.toLowerCase().includes(query);
 const matchesScope =
 client.scopeTH.toLowerCase().includes(query) ||
 client.scopeEN.toLowerCase().includes(query);

 return matchesCompany || matchesNo || matchesStandard || matchesProvince || matchesScope;
 }

 return true;
 });
 }, [databasePool, statusFilter, categoryFilter, searchQuery]);

  // Reset pagination when search or filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter, categoryFilter]);

  // Paginated client list for performance (12 items per page)
  const paginatedClients = useMemo(() => {
    const startIndex = (currentPage - 1) * 12;
    return filteredClients.slice(startIndex, startIndex + 12);
  }, [filteredClients, currentPage]);

  const totalPages = useMemo(() => {
    return Math.ceil(filteredClients.length / 12);
  }, [filteredClients]);

  // Helper to generate visible page numbers
  const getPageNumbers = () => {
    const pageNumbers = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1);
      if (currentPage > 3) {
        pageNumbers.push('...');
      }
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) {
        pageNumbers.push(i);
      }
      if (currentPage < totalPages - 2) {
        pageNumbers.push('...');
      }
      pageNumbers.push(totalPages);
    }
    return pageNumbers;
  };

 // Open certificate detail sheets modal
 const openVerificationModal = (client: ClientCertificate) => {
 setActiveCert(client);
 };

 const closeVerificationModal = () => {
 setActiveCert(null);
 };

 // Open renewal flow modal
 const openRenewalModal = (client: ClientCertificate, e: React.MouseEvent) => {
 e.stopPropagation(); // Avoid triggering open modal
 setRenewalClient(client);
 setRenewalForm({
 name: '',
 phone: '',
 email: '',
 notes: `ต้องการขอนัดหมายผู้ตรวจประเมิน เพื่อเข้าทบทวนระบบต่ออายุใบรับรองใบรับรอง ${client.standard} (รหัสอ้างอิงเก่า: ${client.certificateNo}) องค์กร ${client.companyNameTH}`
 });
 setIsRenewalSubmitted(false);
 };

 const submitRenewalRequest = (e: React.FormEvent) => {
 e.preventDefault();
 if (!renewalForm.name || !renewalForm.phone) return;
 setIsSubmittingRenewal(true);
 setTimeout(() => {
 setIsSubmittingRenewal(false);
 setIsRenewalSubmitted(true);
 setTimeout(() => {
 setRenewalClient(null);
 }, 4000);
 }, 1500);
 };

 // Simulated Certificate Printer Play Sandbox Minter
 const handleMintSandboxCert = (e: React.FormEvent) => {
 e.preventDefault();
 if (!customCompanyName.trim()) return;
 setIsGenerating(true);

 setTimeout(() => {
 const isTAS = customStandard.startsWith('มกษ.');
 const cat = isTAS ? 'TAS' : 
 customStandard.includes('9001') ? 'ISO 9001' :
 customStandard.includes('14001') ? 'ISO 14001' :
 customStandard.includes('27001') ? 'ISO 27001' : 'HACCP/GHP';
 
 const randomId = Math.floor(100000 + Math.random() * 900000);
 const generatedCode = isTAS ? `QAIC-TAS-${randomId}` : `QAIC-TH-${randomId}`;

 const today = new Date().toISOString().split('T')[0];
 const expiry = new Date();
 expiry.setFullYear(expiry.getFullYear() + 3);
 const expiryStr = expiry.toISOString().split('T')[0];

 const defaultScopeTH = isTAS 
 ? 'การจัดการกระบวนการวิสาหกิจชุมชนเกษตร คัดเกรด บรรจุมูลค่า และตรวจสอบสิ่งปนเปื้อนเพื่อความปลอดภัยผู้ใช้นานาชาติ'
 : 'การจัดการงานคุณภาพเชิงระบบ คลอบคลุมส่วนงานวิเคราะห์ วางแผน ผลิต ขาย และส่งมอบการบริการที่คุ้มค่าสูงสุด';

 const defaultScopeEN = isTAS
 ? 'Operational guidelines control of agricultural products sorting, sanitary handling, and export tracing compliance.'
 : 'Standard system-wide quality governance, covering design, commercial administration, and logistic security support.';

 const newCert: ClientCertificate = {
 certificateNo: generatedCode,
 companyNameTH: `${customCompanyName} (จำกัด)`,
 companyNameEN: `${customCompanyName} Co., Ltd.`,
 standard: customStandard,
 scopeTH: customScope.trim() || defaultScopeTH,
 scopeEN: `${customCompanyName} custom implementation & ` + defaultScopeEN,
 issueDate: today,
 expiryDate: expiryStr,
 status: 'Active',
 country: 'Thailand',
 provinceTH: customProvince,
 provinceEN: 'Thailand Province',
 category: cat as any,
 authorizedSignatory: 'ดร. ออนิรุทธ์ รัตนพิมล (CEO)'
 };

 setCustomCertificates([newCert, ...customCertificates]);
 setIsGenerating(false);
 setGeneratedMsg(true);
 setCustomCompanyName('');
 setCustomScope('');

 // Open verification visual instantly for user satisfaction
 setActiveCert(newCert);

 setTimeout(() => setGeneratedMsg(false), 5000);
 }, 1200);
 };

 return (
 <div className="space-y-8 animate-fadeIn">
 {/* Intro Metrics Hub Header Section */}
 <div className="bg-gradient-to-br from-gray-900 to-slate-800 rounded-[2rem] p-8 md:p-10 text-white relative overflow-hidden shadow-xl">
 <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent pointer-events-none"></div>
 
 <div className="relative max-w-3xl space-y-4">
 <span className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-semibold uppercase tracking-wider font-sans border border-blue-500/30">
 <ShieldCheck className="w-4 h-4 text-blue-400" />
 {t('ทำเนียบตรวจสอบสิทธิความเป็นผู้ถือใบรับรองวิสาหกิจ', 'Verifiable Accreditation Directory')}
 </span>
 <h2 className="text-3xl md:text-4xl font-display font-medium tracking-tight text-white">
 {t('ทำเนียบผู้ถือใบรับรองและสืบค้นสถานะอัจฉริยะ', 'Certified Clients Directory & Lookup')}
 </h2>
 <p className="text-sm md:text-base text-gray-300 font-sans leading-relaxed">
 {t(
 'ระบบสอยสืบตรวจสอบรายชื่อบริษัทและสหกรณ์เกษตรที่ได้รับอนุมัติผ่านเกณฑ์ตามมาตรฐาน มกษ. ของสำนักงานมาตรฐานสินค้าเกษตรและอาหารแห่งชาติ (มกอช.) และมาตรฐานสากล ISO จากสถาบัน QAIC เพื่อยืนยันความโปร่งใสแก่คู่ค้าและสาธารณชน',
 'Search and verify active certification statuses of Thai agricultural cooperatives, mills, and commercial clients registered under local TAS and global ISO authorities.'
 )}
 </p>
 </div>

 {/* Dynamic Metric Badges - Minimal & Official (Strictly No Telemetry noise) */}
 <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8 pt-6 border-t border-white/10">
 <div className="space-y-1">
 <span className="text-xs text-gray-600 dark:text-slate-500 font-sans">{t('รหัสรับรองทั้งหมด', 'Registry Database Records')}</span>
 <p className="text-xl md:text-2xl font-display font-bold text-white flex items-center gap-2">
 <Building2 className="w-5 h-5 text-blue-400" /> {/* Includes standard + custom sandboxed ones */}
 {databasePool.length + 572}
 </p>
 </div>
 <div className="space-y-1">
 <span className="text-xs text-gray-600 dark:text-slate-500 font-sans">{t('ผ่านการรับรองแล้ว (Active)', 'Active Certified Clients')}</span>
 <p className="text-xl md:text-2xl font-display font-bold text-emerald-400 flex items-center gap-2">
 <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></span>
 {databasePool.filter(c => c.status === 'Active').length + 510}
 </p>
 </div>
 <div className="space-y-1">
 <span className="text-xs text-gray-600 dark:text-slate-500 font-sans">{t('กลุ่มสินค้าเกษตร มกษ. (ACFS)', 'Thai Agricultural TAS')}</span>
 <p className="text-xl md:text-2xl font-display font-bold text-amber-300 flex items-center gap-2">
 <Award className="w-5 h-5 text-amber-300" />
 {databasePool.filter(c => c.category === 'TAS').length + 138}
 </p>
 </div>
 <div className="space-y-1">
 <span className="text-xs text-gray-600 dark:text-slate-500 font-sans">{t('อัตราความน่าเชื่อถือระบบ', 'Validation Guarantee')}</span>
 <p className="text-xl md:text-2xl font-display font-bold text-sky-400 flex items-center gap-2">
 <CheckCircle2 className="w-5 h-5 text-sky-400" />
 100% Secure
 </p>
 </div>
 </div>
 </div>

 {/* Main Directory & Core Tools Panel */}
 <div className="bg-white/40 backdrop-blur-[35px] border border-white/40 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] dark:bg-slate-900/40 dark:border-white/20 dark:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.2)] p-6 md:p-8 rounded-[2rem] border shadow-sm space-y-6">
 
 {/* Supported Standard Logos Showcase Filter Row */}
 <div className="bg-gray-50/50 rounded-2xl p-4 border border-gray-100 space-y-3">
 <span className="text-[10px] font-bold text-gray-600 dark:text-slate-500 uppercase tracking-widest font-sans block text-center md:text-left">
 {t('ขอบข่ายการรับรองมาตรฐานสากลที่สามารถตรวจสอบได้', 'Verified International Standard Registries')}
 </span>
 <div className="flex gap-4 overflow-x-auto py-2 justify-start md:justify-center no-scrollbar">
 {[
 { id: 'ISO 9001', logo: '4.png', label: 'ISO 9001' },
 { id: 'ISO 14001', logo: '5.png', label: 'ISO 14001' },
 { id: 'ISO 27001', logo: '6.png', label: 'ISO 27001' },
 { id: 'HACCP/GHP', logo: '8.png', label: 'HACCP/GHP' },
 { id: 'GDP', logo: '10.png', label: 'GDP' },
 { id: 'TAS', logo: '9.png', label: 'มกษ. (TAS)' }
 ].map((item, idx) => {
 const isSelected = categoryFilter === item.id || (item.id === 'GDP' && categoryFilter === 'อื่น ๆ / GDP') || (item.id === 'TAS' && categoryFilter === 'มกษ. (TAS)');
 return (
 <button
 type="button"
 key={idx}
 onClick={() => {
 if (item.id === 'GDP') setCategoryFilter('อื่น ๆ / GDP');
 else if (item.id === 'TAS') setCategoryFilter('มกษ. (TAS)');
 else setCategoryFilter(item.id);
 }}
 className={`bg-white/40 backdrop-blur-[35px] border border-white/40 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] dark:bg-slate-900/40 dark:border-white/20 dark:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.2)] p-2 rounded-xl border flex flex-col items-center justify-center w-20 h-28 hover:scale-105 transition-all cursor-pointer shadow-sm flex-shrink-0 ${
 isSelected
 ? 'border-blue-500 ring-2 ring-blue-500/10'
 : ''
 }`}
 title={`Filter by ${item.label}`}
 >
 <img src={`/logoมาตรฐาน/${item.logo}`} alt={item.label} className="w-full h-[80%] object-contain" />
 <span className="text-[8px] font-bold text-gray-700 dark:text-slate-400 mt-1">{item.label}</span>
 </button>
 );
 })}
 </div>
 </div>

 {/* Filter Section */}
 <div className="space-y-4 font-sans">
 <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
 {/* Status Tabs with Blinking LED Indicator */}
 <div className="bg-gray-100/80 p-1.5 rounded-2xl flex gap-1.5 w-fit">
 {[
 { id: 'All', labelTH: 'ทั้งหมด', labelEN: 'Show All', color: 'bg-blue-600' },
 { id: 'Active', labelTH: 'ผ่านการรับรองแล้ว (Active)', labelEN: 'Active Standards', color: 'bg-emerald-500', isBlinking: true, ledColor: 'bg-emerald-500' },
 { id: 'Expired', labelTH: 'ใบรับรองหมดอายุ (Expired)', labelEN: 'Expired / Suspended', color: 'bg-red-500', isBlinking: true, ledColor: 'bg-amber-500' }
 ].map((tab) => {
 const isActive = statusFilter === tab.id;
 return (
 <button
 key={tab.id}
 onClick={() => setStatusFilter(tab.id as any)}
 className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-2 cursor-pointer ${
 isActive 
 ? 'bg-gray-900 text-white shadow-sm' 
 : 'text-gray-700 dark:text-slate-400 hover:text-gray-900 dark:text-white'
 }`}
 >
 {tab.isBlinking && (
 <span className="relative flex h-2 w-2">
 <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${tab.ledColor}`}></span>
 <span className={`relative inline-flex rounded-full h-2 w-2 ${tab.ledColor}`}></span>
 </span>
 )}
 <span>{t(tab.labelTH, tab.labelEN)}</span>
 </button>
 );
 })}
 </div>

 {/* Smart Search Query Input Box */}
 <div className="relative w-full md:max-w-md">
 <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
 <Search className="h-4 w-4 text-gray-600 dark:text-slate-500" />
 </span>
 <input
 type="text"
 value={searchQuery}
 onChange={(e) => setSearchQuery(e.target.value)}
 placeholder={t(
 'ค้นหาด่วน: ชื่อองค์กร, รหัสใบรับรอง, พิกัดจังหวัด, หรือรหัสมาตรฐาน มกษ.',
 'Live Search: Company name, standard, code, or province prefix...'
 )}
 className="w-full pl-10 pr-10 py-3 text-xs bg-gray-50 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white/40 backdrop-blur-[35px] border border-white/40 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] dark:bg-slate-900/40 dark:border-white/20 dark:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.2)] font-sans transition-all placeholder:text-gray-600 dark:text-slate-500 shadow-inner"
 />
 {searchQuery && (
 <button 
 onClick={() => setSearchQuery('')}
 className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-700 dark:text-slate-400 hover:text-gray-700 dark:text-slate-200"
 >
 <XCircle className="w-4 h-4 text-gray-600 dark:text-slate-500 hover:text-gray-800 dark:text-slate-300 cursor-pointer" />
 </button>
 )}
 </div>
 </div>

 {/* Category tags Filter Row */}
 <div className="flex items-center gap-2 overflow-x-auto py-1 invisible-scrollbar">
 <span className="text-xs font-bold text-gray-600 dark:text-slate-500 uppercase tracking-wider font-sans whitespace-nowrap mr-1">
 {t('หมวดมาตรฐาน:', 'Sift Category:')}
 </span>
 {[
 'All',
 'มกษ. (TAS)',
 'ISO 9001',
 'ISO 14001',
 'ISO 27001',
 'HACCP/GHP',
 'อื่น ๆ / GDP'
 ].map((cat) => {
 const isActive = categoryFilter === cat;
 return (
 <button
 key={cat}
 onClick={() => setCategoryFilter(cat)}
 className={`px-3.5 py-1.5 text-xs font-medium rounded-full transition-all border whitespace-nowrap cursor-pointer ${
 isActive
 ? 'bg-blue-50 text-blue-700 border-blue-200 font-semibold shadow-sm'
 : ' bg-white/40 backdrop-blur-[35px] border border-white/40 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] dark:bg-slate-900/40 dark:border-white/20 dark:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.2)] text-gray-800 dark:text-slate-300 hover:bg-gray-50'
 }`}
 >
 {cat === 'All' ? t('ทุกมาตรฐาน', 'All Standards') : cat}
 </button>
 );
 })}
 </div>
 </div>

 {/* Directory Results Rendering Area */}
 {filteredClients.length > 0 ? (
    <>
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
 {paginatedClients.map((client) => {
 const isActiveStatus = client.status === 'Active';
 
 return (
 <div
 key={`${client.certificateNo}-${client.companyNameTH}-${client.standard}`}
 onClick={() => openVerificationModal(client)}
 className="group bg-white/40 backdrop-blur-[35px] border border-white/40 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] dark:bg-slate-900/40 dark:border-white/20 dark:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.2)] rounded-3xl border hover:border-blue-200 hover:shadow-xl hover:shadow-gray-200/40 transition-all duration-300 p-5 flex flex-col justify-between cursor-pointer relative overflow-hidden"
 >
 {/* Status Indicator Pill */}
 <div className="flex justify-between items-start gap-2 mb-4">
 <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold ${
 isActiveStatus 
 ? 'bg-emerald-50 text-emerald-800 border border-emerald-100' 
 : 'bg-amber-50 text-amber-800 border border-amber-100'
 }`}>
 <span className={`relative flex h-2 w-2`}>
 <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isActiveStatus ? 'bg-emerald-400' : 'bg-amber-500'}`}></span>
 <span className={`relative inline-flex rounded-full h-2 w-2 ${isActiveStatus ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
 </span>
 <span>{isActiveStatus ? t('ได้รับการรับรองแล้ว', 'Active') : t('ใบรับรองหมดอายุ', 'Expired')}</span>
 </span>

 <span className="text-[10px] font-bold font-mono text-gray-600 dark:text-slate-500 bg-gray-50 px-2 py-0.5 rounded border">
 {client.category}
 </span>
 </div>

 {/* Body Context */}
 <div className="space-y-2">
 <div className="text-xs text-gray-600 dark:text-slate-500 font-sans font-bold flex items-center gap-1">
 <Tag className="w-3.5 h-3.5 text-blue-500" />
 <span>{client.standard}</span>
 </div>

 <h4 className="font-display font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors text-sm line-clamp-1 leading-snug">
 {lang === 'TH' ? client.companyNameTH : client.companyNameEN}
 </h4>
 
 <p className="text-xs text-gray-600 dark:text-slate-500 line-clamp-1 font-sans">
 {lang === 'TH' ? client.companyNameEN : client.companyNameTH}
 </p>

 {/* Meta values */}
 <div className="grid grid-cols-2 gap-2 pt-3 border-t border-gray-50 text-[10.5px] text-gray-700 dark:text-slate-400 font-sans">
 <div className="flex items-center gap-1.5">
 <MapPin className="w-3.5 h-3.5 text-gray-600 dark:text-slate-500 shrink-0" />
 <span className="truncate">{t(client.provinceTH, client.provinceEN)}</span>
 </div>
 <div className="flex items-center gap-1.5 justify-end">
 <Calendar className="w-3.5 h-3.5 text-gray-600 dark:text-slate-500 shrink-0" />
 <span className="truncate">{t(`หมดอายุ: ${client.expiryDate.split('-')[0]}`, `Exp: ${client.expiryDate.split('-')[0]}`)}</span>
 </div>
 </div>
 </div>

 {/* Bottom Actions Frame */}
 <div className="mt-4 pt-3 border-t border-gray-50 flex gap-2">
 <button
 onClick={(e) => {
 e.stopPropagation();
 openVerificationModal(client);
 }}
 className="flex-1 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-xl text-[10.5px] font-bold flex items-center justify-center gap-1 uppercase tracking-wider transition-colors"
 >
 <span>{t('ตรวจใบรับรอง', 'Inspect')}</span>
 <ExternalLink className="w-3 h-3" />
 </button>
 
 {!isActiveStatus && (
 <button
 onClick={(e) => openRenewalModal(client, e)}
 className="py-2 px-3 bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white rounded-xl text-[10.5px] font-black flex items-center justify-center gap-1 transition-all animate-pulse shadow-sm min-w-[100px]"
 >
 <Zap className="w-3 h-3 text-yellow-250 animate-bounce" />
 <span>{t('ต่ออายุพิเศษ', 'Renew Now')}</span>
 </button>
 )}
 </div>
            </div>
          );
        })}
      </div>

      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-gray-200/40 dark:border-slate-800/60 w-full font-sans text-xs">
          {/* Result Info Text */}
          <div className="text-gray-650 dark:text-slate-400 font-medium">
            {t(
              `แสดง ${(currentPage - 1) * 12 + 1} - ${Math.min(currentPage * 12, filteredClients.length)} จากทั้งหมด ${filteredClients.length} รายการ`,
              `Showing ${(currentPage - 1) * 12 + 1} - ${Math.min(currentPage * 12, filteredClients.length)} of ${filteredClients.length} certificates`
            )}
          </div>

          {/* Page Buttons List */}
          <div className="flex items-center gap-1.5">
            {/* Prev Button */}
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className={`p-2 rounded-xl transition-all border flex items-center justify-center cursor-pointer ${
                currentPage === 1
                  ? 'text-gray-300 dark:text-slate-700 border-gray-100 dark:border-slate-800/40 bg-gray-50/20 dark:bg-slate-900/10 cursor-not-allowed'
                  : 'bg-white/40 dark:bg-slate-900/40 border-white/40 dark:border-white/10 text-gray-800 dark:text-slate-300 hover:bg-blue-500 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white hover:border-blue-500 dark:hover:border-blue-600'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Page Numbers */}
            {getPageNumbers().map((page, idx) => {
              if (page === '...') {
                return (
                  <span key={`dots-${idx}`} className="px-2 text-gray-400 dark:text-slate-655 select-none">
                    ...
                  </span>
                );
              }
              const isCurrent = page === currentPage;
              return (
                <button
                  key={`page-${page}`}
                  onClick={() => setCurrentPage(Number(page))}
                  className={`w-8 h-8 rounded-xl font-bold flex items-center justify-center transition-all border cursor-pointer ${
                    isCurrent
                      ? 'bg-blue-500 border-blue-500 text-white shadow-md shadow-blue-500/25 dark:bg-blue-600 dark:border-blue-600'
                      : 'bg-white/40 dark:bg-slate-900/40 border-white/40 dark:border-white/10 text-gray-800 dark:text-slate-300 hover:bg-blue-500 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white hover:border-blue-500 dark:hover:border-blue-600'
                  }`}
                >
                  {page}
                </button>
              );
            })}

            {/* Next Button */}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-xl transition-all border flex items-center justify-center cursor-pointer ${
                currentPage === totalPages
                  ? 'text-gray-300 dark:text-slate-700 border-gray-100 dark:border-slate-800/40 bg-gray-50/20 dark:bg-slate-900/10 cursor-not-allowed'
                  : 'bg-white/40 dark:bg-slate-900/40 border-white/40 dark:border-white/10 text-gray-800 dark:text-slate-300 hover:bg-blue-500 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white hover:border-blue-500 dark:hover:border-blue-600'
              }`}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  ) : (

 <div className="py-20 text-center border-2 border-dashed border-gray-150 rounded-3xl max-w-xl mx-auto space-y-4">
 <AlertCircle className="w-12 h-12 text-gray-300 mx-auto" />
 <div className="space-y-1">
 <h4 className="font-display font-bold text-gray-700 dark:text-slate-200">{t('ไม่พบบันทึกตรงตามเงื่อนไขค้นหา', 'No Certified Records Match')}</h4>
 <p className="text-xs text-gray-600 dark:text-slate-500 font-sans max-w-md mx-auto">
 {t(
 'กรุณาทดลองพิมพ์หาชื่อชื่อ สหกรณ์ จังหวัดพัทลุง ชุมพร หรือรหัส มกษ.9046 หรือพิมพ์แบรนด์จำลองเพื่อตรวจสอบข้อมูลใหม่อีกครั้ง',
 'Double check spelling filters. Type "DUR01" for durian coop, "เชียงราย" for rice processing, or reset keyword filters.'
 )}
 </p>
 </div>
 <button
 onClick={() => {
 setSearchQuery('');
 setStatusFilter('All');
 setCategoryFilter('All');
 }}
 className="px-5 py-2.5 bg-gray-950 text-white rounded-xl text-xs font-bold hover:bg-gray-850 cursor-pointer transition-colors"
 >
 {t('รีเซ็ตการค้นหาทั้งหมด', 'Clear Search Filters')}
 </button>
 </div>
 )}
 </div>

 {/* FOOTER INTERACTIVE SANDBOX PLAYGROUND */}
 <div className="bg-gray-50 border border-gray-200/60 p-6 md:p-8 rounded-[2.5rem] relative overflow-hidden">
 <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-amber-500/5 via-transparent to-transparent pointer-events-none rounded-bl-full"></div>
 <div className="max-w-3xl space-y-6">
 <div className="space-y-2">
 <span className="text-[10px] font-bold text-amber-600 bg-amber-500/10 px-3 py-1 rounded-full uppercase tracking-widest font-sans inline-block">
 🛠️ {t('ลูกเล่นพิเศษจำลองระบบในแซนด์บ็อกซ์', 'Interactive Sandbox Sandbox Feature')}
 </span>
 <h3 className="text-xl md:text-2xl font-display font-medium text-gray-900 dark:text-white tracking-tight">
 {t('ทดลองจำลองยื่นสมัครเพื่อประทับตราออกใบรับรองดิจิทัล', 'Custom Digital Certificate Generation Simulator')}
 </h3>
 <p className="text-xs text-gray-700 dark:text-slate-400 font-sans max-w-2xl leading-relaxed">
 {t(
 'ระบุชื่อจัดจำลององค์กรออฟไลน์เพื่อสร้างรหัสทดสอบและออกใบประกาศในนาม QAIC ให้ระบบจำลองประมวลขอบข่ายสิทธิประโยชน์เพื่อนำเสนอฝ่ายงานความตระหนักร่วมในองค์กรทันที',
 'Type down your business brand and select standard to dynamically mock-register a verifiable certificate inside our local view. Test and print PDF layout with simulated security stamps.'
 )}
 </p>
 </div>

 <form onSubmit={handleMintSandboxCert} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
 <div className="md:col-span-2 space-y-1.5">
 <label className="text-[10px] font-bold text-gray-600 dark:text-slate-500 uppercase tracking-widest font-sans block">
 {t('ระบุชื่อบริษัทจำลองสำหรับการรับรอง', 'Mock Company Name (TH/EN)')}
 </label>
 <input
 type="text"
 required
 placeholder="Acme Agricultural Exporters CO., Ltd."
 value={customCompanyName}
 onChange={(e) => setCustomCompanyName(e.target.value)}
 className="w-full px-4 py-3 bg-white/40 backdrop-blur-[35px] border border-white/40 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] dark:bg-slate-900/40 dark:border-white/20 dark:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.2)] border rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 font-sans"
 />
 </div>
 
 <div className="space-y-1.5">
 <label className="text-[10px] font-bold text-gray-600 dark:text-slate-500 uppercase tracking-widest font-sans block">
 {t('เลือกประเภทเกณฑ์มาตรฐาน', 'Select Target Standard')}
 </label>
 <select
 value={customStandard}
 onChange={(e) => setCustomStandard(e.target.value)}
 className="w-full px-3 py-3 bg-white/40 backdrop-blur-[35px] border border-white/40 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] dark:bg-slate-900/40 dark:border-white/20 dark:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.2)] border rounded-xl text-xs focus:outline-none font-sans"
 >
 <option value="ISO 9001:2015">ISO 9001:2015</option>
 <option value="มกษ. 9046-2560">มกษ. 9046-2560 (ทุเรียนแช่เยือกแข็ง)</option>
 <option value="มกษ. 4403-2564">มกษ. 4403-2564 (โรงสีข้าว)</option>
 <option value="มกษ. 6401-2558">มกษ. 6401-2558 (ศูนย์นมดิบ)</option>
 <option value="ISO 27001:2022">ISO 27001:2022</option>
 <option value="HACCP & GHPs (Codex)">HACCP & GHPs</option>
 </select>
 </div>

 <div>
 <button
 type="submit"
 disabled={isGenerating}
 className="w-full py-3 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded-xl uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
 >
 {isGenerating ? (
 <>
 <RefreshCw className="w-4 h-4 animate-spin" />
 <span>{t('ประทับตรา...', 'Issuing...')}</span>
 </>
 ) : (
 <>
 <Plus className="w-4 h-4" />
 <span>{t('สร้างและสืบค้น', 'Mock-Issue')}</span>
 </>
 )}
 </button>
 </div>
 </form>

 {generatedMsg && (
 <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-[11px] text-emerald-850 font-sans font-bold flex items-center gap-2 animate-bounce">
 <Check className="w-4 h-4 text-emerald-600" />
 <span>
 {t(
 'สำเร็จ! ออกใบรับรองจำลองและเปิดแผงหน้าต่างตรวจประทับพร้อมลายเซ็นดงแล้ว และได้บรรจุเข้าระบบให้ค้นหาต่อได้ทันที',
 'Mock certification processed securely! View your certificate inside the visual template.'
 )}
 </span>
 </div>
 )}
 </div>
 </div>

  {/* ACTIVE CERTIFICATE VERIFICATION DETAIL MODAL SHEET */}
  {activeCert && (
    <div className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white/95 backdrop-blur-[35px] border border-white/60 shadow-2xl dark:bg-slate-900/95 dark:border-slate-800 rounded-[2rem] overflow-hidden flex flex-col p-6 md:p-8 space-y-6 animate-scaleIn">
        
        {/* Close Button */}
        <button
          onClick={closeVerificationModal}
          className="absolute top-6 right-6 p-2 bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-700 dark:text-slate-300 rounded-full transition-colors cursor-pointer border-none"
        >
          <XCircle className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-start gap-4 border-b border-gray-100 dark:border-slate-800 pb-4">
          <div className="p-3 bg-red-50 dark:bg-red-950/30 text-red-800 dark:text-red-400 rounded-2xl">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-display font-bold text-gray-900 dark:text-white text-left">
              {t('ผลการตรวจสอบใบรับรองมาตรฐาน', 'Certificate Verification Details')}
            </h3>
            <p className="text-xs text-gray-600 dark:text-slate-400 text-left">
              {t('ข้อมูลสถานะระบบทะเบียนผู้ได้รับอนุมัติการรับรองสากลอย่างเป็นทางการ', 'Official registration status and compliance records')}
            </p>
          </div>
        </div>

        {/* Content Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans text-left">
          
          {/* Left Column */}
          <div className="space-y-4">
            <div>
              <span className="text-[10px] font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
                {t('ชื่อองค์กร (ไทย)', 'Company Name (TH)')}
              </span>
              <p className="text-sm font-bold text-gray-900 dark:text-white leading-snug">
                {activeCert.companyNameTH}
              </p>
            </div>

            <div>
              <span className="text-[10px] font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
                {t('ชื่อองค์กร (อังกฤษ)', 'Company Name (EN)')}
              </span>
              <p className="text-sm font-bold text-gray-800 dark:text-slate-200 leading-snug">
                {activeCert.companyNameEN}
              </p>
            </div>

            <div>
              <span className="text-[10px] font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
                {t('เกณฑ์มาตรฐานที่รับรอง', 'Accredited Standard')}
              </span>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 dark:bg-red-950/30 border border-red-100 dark:border-red-900/50 rounded-full text-xs font-bold text-red-800 dark:text-red-400">
                <Award className="w-3.5 h-3.5" />
                <span>{activeCert.standard}</span>
              </div>
            </div>

            <div>
              <span className="text-[10px] font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
                {t('พื้นที่ดำเนินการ (Location)', 'Operating Location')}
              </span>
              <div className="flex items-center gap-1.5 text-xs text-gray-700 dark:text-slate-300">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span>{t(activeCert.provinceTH, activeCert.provinceEN)}, {activeCert.country}</span>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div>
              <span className="text-[10px] font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
                {t('เลขที่ใบรับรอง (Certificate No.)', 'Certificate Number')}
              </span>
              <p className="text-xs font-bold font-mono text-gray-900 dark:text-white bg-gray-50 dark:bg-slate-800 px-2 py-1 rounded border border-gray-200/50 dark:border-slate-700 w-fit">
                {activeCert.certificateNo}
              </p>
            </div>

            <div>
              <span className="text-[10px] font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
                {t('สถานะใบรับรอง (Status)', 'Certification Status')}
              </span>
              <div>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                  activeCert.status === 'Active' 
                    ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/50' 
                    : 'bg-amber-50 dark:bg-amber-950/30 text-amber-800 dark:text-amber-400 border border-amber-100 dark:border-amber-900/50'
                }`}>
                  <span className="relative flex h-2 w-2">
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${activeCert.status === 'Active' ? 'bg-emerald-400' : 'bg-amber-500'}`}></span>
                    <span className={`relative inline-flex rounded-full h-2 w-2 ${activeCert.status === 'Active' ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                  </span>
                  <span>{activeCert.status === 'Active' ? t('ได้รับการรับรอง (Active)', 'Active') : t('ใบรับรองหมดอายุ (Expired)', 'Expired')}</span>
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-[10px] font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
                  {t('วันที่อนุมัติ (Certified Date)', 'Certified Date')}
                </span>
                <p className="text-xs text-gray-800 dark:text-slate-350 font-mono">{activeCert.issueDate}</p>
              </div>
              <div>
                <span className="text-[10px] font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
                  {t('วันที่หมดอายุ (Expiry Date)', 'Expiry Date')}
                </span>
                <p className="text-xs text-red-700 dark:text-red-400 font-mono font-bold">{activeCert.expiryDate}</p>
              </div>
            </div>

            <div>
              <span className="text-[10px] font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
                {t('ผู้ลงนามรับรอง (Authorized Signatory)', 'Authorized Signatory')}
              </span>
              <p className="text-xs text-gray-800 dark:text-slate-300 font-medium">
                {activeCert.authorizedSignatory}
              </p>
            </div>
          </div>
        </div>

        {/* Scope Area */}
        <div className="bg-gray-50/50 dark:bg-slate-900/40 p-4 rounded-2xl border border-gray-100 dark:border-slate-800 font-sans text-left">
          <span className="text-[10px] font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5">
            {t('ขอบข่ายการรับรองระบบ (Certified Scope)', 'Certified Scope of Operations')}
          </span>
          <p className="text-xs text-gray-700 dark:text-slate-200 italic leading-relaxed">
            "{lang === 'TH' ? activeCert.scopeTH : activeCert.scopeEN}"
          </p>
        </div>

        {/* Footer Logos & Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-150 dark:border-slate-800">
          {/* Stamps/Logos */}
          <div className="flex items-center gap-4">
            <div className="bg-white/90 dark:bg-slate-950/60 p-1.5 rounded-lg border border-gray-150 dark:border-slate-800 shadow-sm w-9 h-12 flex items-center justify-center">
              <img src={getStandardLogo(activeCert.category)} alt="Standard Logo" className="w-full h-full object-contain" />
            </div>
            <div className="bg-white/90 dark:bg-slate-950/60 p-1.5 rounded-lg border border-gray-150 dark:border-slate-800 shadow-sm w-12 h-12 flex items-center justify-center">
              <QrCode className="w-full h-full text-gray-800 dark:text-white stroke-1" />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 w-full sm:w-auto">
            <button
              onClick={() => window.print()}
              className="flex-1 sm:flex-initial px-5 py-2.5 bg-red-800 hover:bg-red-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer border-none shadow-md shadow-red-800/10"
            >
              <Printer className="w-4 h-4" />
              <span>{t('พิมพ์ข้อมูลระบบ', 'Print Official Records')}</span>
            </button>
            <button
              onClick={closeVerificationModal}
              className="flex-1 sm:flex-initial px-5 py-2.5 bg-gray-200 dark:bg-slate-800 hover:bg-gray-300 dark:hover:bg-slate-700 text-gray-700 dark:text-slate-200 rounded-xl text-xs font-bold cursor-pointer border-none"
            >
              {t('ปิดหน้าต่าง', 'Close')}
            </button>
          </div>
        </div>

      </div>
    </div>
  )}


  {/* RENEWAL EMERGENCY ACTION DRAWERS / OVERLAY FORM */}
 {renewalClient && (
 <div className="fixed inset-0 z-[110] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
 <div className="bg-white/40 backdrop-blur-[35px] border border-white/40 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] dark:bg-slate-900/40 dark:border-white/20 dark:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.2)] rounded-3xl w-full max-w-lg p-6 md:p-8 border shadow-2xl relative animate-scaleIn">
 
 {/* Header */}
 <div className="flex items-center justify-between border-b pb-4 mb-6">
 <div className="flex items-center gap-2 text-amber-600">
 <Zap className="w-6 h-6 text-amber-500 animate-bounce" />
 <h3 className="font-display font-bold text-lg text-gray-900 dark:text-white">
 {t('ขอนัดหมายต่ออายุระบบด่วนพิเศษ (Renew)', 'Express Certification Renewal Request')}
 </h3>
 </div>
 <button 
 onClick={() => setRenewalClient(null)}
 className="p-1.5 bg-gray-100 rounded-full text-gray-600 dark:text-slate-500 hover:text-gray-900 dark:text-white cursor-pointer"
 >
 <XCircle className="w-5 h-5" />
 </button>
 </div>

 {/* Content Context */}
 {isRenewalSubmitted ? (
 <div className="text-center py-8 space-y-4">
 <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
 <CheckCircle2 className="w-10 h-10" />
 </div>
 <div className="space-y-2">
 <h4 className="font-display font-bold text-gray-900 dark:text-white text-base">{t('บันทึกคำขอต่ออายุด่วนเสร็จสมบูรณ์แล้ว!', 'Renewal Ticket Created Successfully!')}</h4>
 <p className="text-xs text-gray-700 dark:text-slate-400 font-sans max-w-sm mx-auto leading-relaxed">
 {t(
 'ประสานงานข้อมูลเรียบร้อย! เจ้าหน้าที่วิเคราะห์มาตรฐานอาวุโส (CISO/Lead Auditor) ประจำสาขาได้รับการส่งสัญญาณสั่นสะเทือนจะรีบติดต่อกลับเพื่อส่งแพ็กเกจพิเศษและกำหนดเวลาทบทวนตรวจบอร์ดหน้างานภายใน 15 นาที',
 'Your request is dispatched. Senior auditors in your operating sector have been notified. An expert will reach out to schedule an audit scope re-evaluation campaign within 15 minutes.'
 )}
 </p>
 </div>
 </div>
 ) : (
 <form onSubmit={submitRenewalRequest} className="space-y-4">
 
 <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-100/60 text-xs text-amber-850 font-sans space-y-1">
 <div className="font-bold flex items-center gap-1">
 <AlertTriangle className="w-4 h-4 text-amber-600" />
 <span>{t('เตรียมการทบทวนสำหรับสิทธิที่หมดอายุ', 'Re-evaluation audit targeting expired slot')}</span>
 </div>
 <div><strong>{t('ชื่อองค์กร / Client:', 'Enterprise Name:')}</strong> {renewalClient.companyNameTH}</div>
 <div><strong>{t('มาตรฐาน / Standard:', 'Target Standard:')}</strong> {renewalClient.standard}</div>
 <div><strong>{t('รหัสรับรองเดิม / Old Ref Code:', 'Previous ID:')}</strong> {renewalClient.certificateNo}</div>
 </div>

 <div className="space-y-1">
 <label className="text-[10px] font-bold text-gray-600 dark:text-slate-500 uppercase tracking-widest font-sans block">{t('ชื่อผู้ลงประสานงาน', 'Your Full Name')}</label>
 <div className="relative">
 <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
 <User className="h-4 w-4 text-gray-600 dark:text-slate-500" />
 </span>
 <input
 type="text"
 required
 placeholder="เช่น คุณวิฑูรย์ รักความสะอาด"
 value={renewalForm.name}
 onChange={(e) => setRenewalForm({ ...renewalForm, name: e.target.value })}
 className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none"
 />
 </div>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <div className="space-y-1">
 <label className="text-[10px] font-bold text-gray-600 dark:text-slate-500 uppercase tracking-widest font-sans block">{t('เบอร์โทรศัพท์ติดต่อประสานงาน', 'Direct phone number')}</label>
 <div className="relative">
 <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
 <Phone className="h-4 w-4 text-gray-600 dark:text-slate-500" />
 </span>
 <input
 type="tel"
 required
 placeholder="เช่น 081-234-5678"
 value={renewalForm.phone}
 onChange={(e) => setRenewalForm({ ...renewalForm, phone: e.target.value })}
 className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none"
 />
 </div>
 </div>

 <div className="space-y-1">
 <label className="text-[10px] font-bold text-gray-600 dark:text-slate-500 uppercase tracking-widest font-sans block">{t('อีเมลสำหรับยื่นข้อเสนอพิเศษ', 'Contact Email address')}</label>
 <div className="relative">
 <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
 <Mail className="h-4 w-4 text-gray-600 dark:text-slate-500" />
 </span>
 <input
 type="email"
 required
 placeholder="เมลที่ใช้ติดต่อ"
 value={renewalForm.email}
 onChange={(e) => setRenewalForm({ ...renewalForm, email: e.target.value })}
 className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none"
 />
 </div>
 </div>
 </div>

 <div className="space-y-1">
 <label className="text-[10px] font-bold text-gray-600 dark:text-slate-500 uppercase tracking-widest font-sans block">{t('รายละเอียดเพิ่มเติม', 'Additional requirements')}</label>
 <textarea
 value={renewalForm.notes}
 onChange={(e) => setRenewalForm({ ...renewalForm, notes: e.target.value })}
 rows={3}
 className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none font-sans"
 ></textarea>
 </div>

 <button
 type="submit"
 disabled={isSubmittingRenewal}
 className="w-full py-3 mt-4 bg-gradient-to-r from-amber-500 to-rose-500 text-white font-bold text-xs rounded-xl uppercase tracking-wider hover:opacity-90 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
 >
 {isSubmittingRenewal ? (
 <>
 <RefreshCw className="w-4 h-4 animate-spin" />
 <span>{t('กำลังส่งคำขอเข้าสัญญาณจ้างผู้ประเมิน...', 'Transmitting signal to Regional Auditors...')}</span>
 </>
 ) : (
 <>
 <Zap className="w-4 h-4" />
 <span>{t('ส่งรายงานขอต่อสายด่วน CISO ลดประเมินพิเศษ', 'Dispatch Express Renewal Order & Discount Request')}</span>
 </>
 )}
 </button>

 </form>
 )}

 </div>
 </div>
 )}

 </div>
 );
}
