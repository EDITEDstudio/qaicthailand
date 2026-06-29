/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { UserSettings } from '../types';
import { 
 HelpCircle, 
 Target, 
 Clock, 
 ClipboardList, 
 MessageSquare, 
 Wallet,
 CheckCircle2,
 ArrowRight,
 ChevronRight,
 Plus,
 Minus,
 Play,
 Award,
 Compass,
 Coins,
 ShieldCheck,
 Leaf,
 Stethoscope,
 Utensils,
 Lock,
 Truck,
 Settings,
 Calendar,
 Newspaper
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ISO_STANDARDS } from '../constants';
import DiagnosticQuiz from './DiagnosticQuiz';
import BusinessSectors from './BusinessSectors';
import VideoPresentation from './VideoPresentation';
import { NewsArticle, DEFAULT_NEWS_ARTICLES } from './NewsSection';

interface InfoSectionsProps {
  settings: UserSettings;
  onTabChange: (tab: 'assess' | 'standards' | 'training' | 'verify' | 'org' | 'profile' | 'quote' | 'news' | 'downloads') => void;
}

const CATEGORY_ICONS: { [key: string]: any } = {
 'Quality & Risk': ShieldCheck,
 'Environmental & Energy': Leaf,
 'Health & Safety': Stethoscope,
 'Food Safety & GMP': Utensils,
 'Security & Tech': Lock,
 'Express Certifications': Truck,
};

export default function InfoSections({ settings, onTabChange }: InfoSectionsProps) {
 const t = (th: string, en: string) => settings.lang === 'TH' ? th : en;
 const [openFaq, setOpenFaq] = React.useState<number | null>(null);
 const [isPlaying, setIsPlaying] = React.useState(false);
 const [showQuiz, setShowQuiz] = React.useState(false);

 const coreStandards = [
 ISO_STANDARDS.find(s => s.id === 'iso-9001'),
 ISO_STANDARDS.find(s => s.id === 'iso-14001'),
 ISO_STANDARDS.find(s => s.id === 'iso-45001'),
 ISO_STANDARDS.find(s => s.id === 'iso-27001'),
 ISO_STANDARDS.find(s => s.id === 'haccp'),
 ISO_STANDARDS.find(s => s.id === 'gdp'),
 ].filter(Boolean) as typeof ISO_STANDARDS;

 const sections = [
 {
 id: 'what-is-iso',
 icon: HelpCircle,
 title: t('มาตรฐาน ISO คืออะไร?', 'What is ISO Standard?'),
 content: t(
 'ISO (International Organization for Standardization) คือมาตรฐานสากลที่กำหนดขึ้นเพื่อรองรับระบบบริหารจัดการ และกระบวนการทำงานในองค์กรให้มีคุณภาพ ความปลอดภัย และประสิทธิภาพเหมือนกันทั่วโลก ช่วยสร้างความมั่นใจให้กับลูกค้าและคู่ค้าถาวร',
 'ISO (International Organization for Standardization) is a set of international standards designed to ensure quality, safety, and efficiency in organizational management and processes worldwide. It builds trust with customers and partners globally.'
 ),
 color: 'blue'
 },
 {
 id: 'who-is-it-for',
 icon: Target,
 title: t('ISO เหมาะสำหรับใคร?', 'Who is ISO for?'),
 content: t(
 'ISO เหมาะสำหรับองค์กรทุกขนาด ตั้งแต่ SME ไปจนถึงองค์กรขนาดใหญ่ ไม่ว่าจะเป็นภาคการผลิต การบริการ ร้านอาหาร ก่อสร้าง หรือธุรกิจออนไลน์ ที่ต้องการยกระดับความเชื่อมั่นและเพิ่มโอกาสในการขยายตลาดทั้งในและต่างประเทศ',
 'ISO is suitable for organizations of all sizes, from SMEs to large corporations, across manufacturing, services, restaurants, construction, or online businesses looking to enhance trust and expand into local and international markets.'
 ),
 color: 'blue'
 },
 {
 id: 'timeline',
 icon: Clock,
 title: t('ใช้เวลานานแค่ไหน?', 'How long does it take?'),
 content: t(
 'โดยปกติการขอรับรองจะใช้เวลาประมาณ 30 - 90 วัน ขึ้นอยู่กับความพร้อมของระบบภายในองค์กร ขนาดของบริษัท และประเภทของมาตรฐานที่ต้องการขอรับรอง',
 'Typically, certification takes about 30 - 90 days, depending on the readiness of the internal management system, company size, and the specific standard being sought.'
 ),
 color: 'amber'
 }
 ];

 const steps = [
 { num: '01', title: t('สมัครและประเมินเบื้องต้น', 'Application & Pre-assessment'), desc: t('ส่งคำขอรับรองและประเมินขอบข่ายงานของธุรกิจ', 'Submit application and assess scope of business.') },
 { num: '02', title: t('ตรวจประเมินระยะที่ 1 (Stage 1)', 'Stage 1 Audit'), desc: t('ตรวจสอบความพร้อมของเอกสารและระบบเบื้องต้น', 'Initial documentation and system readiness review.') },
 { num: '03', title: t('ตรวจประเมินระยะที่ 2 (Stage 2)', 'Stage 2 Audit'), desc: t('ตรวจประเมินหน้างานจริงเพื่อยืนยันการปฏิบัติ', 'On-site audit to verify effective implementation.') },
 { num: '04', title: t('พิจารณาและมอบใบรับรอง', 'Certification Award'), desc: t('สรุปผลและออกใบรับรองเมื่อผ่านการประเมิน', 'Final review and issuance of ISO certificate.') },
 ];

 const faqs = [
 { q: t('ไม่เป็นนิติบุคคลขอได้ไหม?', 'Can non-juristic persons apply?'), a: t('ขอได้ครับ ธุรกิจขนาดเล็กหรือร้านค้าที่มีการจดทะเบียนพาณิชย์ก็สามารถยื่นขอการรับรองได้เพื่อสร้างความเชื่อมั่น', 'Yes, small businesses or shops with commercial registration can apply for certification to build trust.') },
 { q: t('ต้องทำเอกสารเยอะไหม?', 'is there a lot of paperwork?'), a: t('ในมาตรฐานเวอร์ชันใหม่ เน้นประสิทธิภาพการทำงานมากกว่าเอกสาร โดยเน้นการควบคุมความเสี่ยงและผลลัพธ์ที่เกิดขึ้นจริง', 'Modern standards focus more on process efficiency and risk management than excessive paperwork.') },
 { q: t('ใบรับรองมีอายุกี่ปี?', 'How long is the certificate valid?'), a: t('ใบรับรอง ISO มีอายุ 3 ปี โดยจะต้องมีการตรวจติดตามเป็นรายปี (Surveillance Audit) เพื่อยืนยันความต่อเนื่องของระบบ', 'ISO certificates are valid for 3 years, with annual surveillance audits required to ensure system continuity.') },
 ];

 return (
 <div className="space-y-24 mt-8">
 {/* Accreditation Trust Bar */}
 <div className="bg-white/40 backdrop-blur-[35px] border border-white/40 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] dark:bg-slate-900/40 dark:border-white/20 dark:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.2)] rounded-3xl border p-6 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-6">
 <div className="flex items-center gap-4 text-center lg:text-left">
 <div className="p-3.5 bg-blue-50 text-blue-600 rounded-2xl hidden sm:block">
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
 <div className="h-6 w-px bg-gray-200 hidden sm:block" />
 <div className="flex items-center gap-3">
 <span className="text-[10px] font-bold text-gray-600 dark:text-slate-500 uppercase tracking-widest">Accredited Body</span>
 <div className="px-3 py-1.5 bg-blue-600 text-white rounded-xl text-[10px] font-mono font-bold tracking-wider">
 NAC-045
 </div>
 </div>
 </div>
 </div>

 

  {/* Intro Grid */}
 <div className="grid md:grid-cols-3 gap-8">
 {sections.map((section, idx) => (
 <motion.div 
 key={section.id}
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ delay: idx * 0.1 }}
 className="p-8 bg-white/40 backdrop-blur-[35px] border border-white/40 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] dark:bg-slate-900/40 dark:border-white/20 dark:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.2)] rounded-3xl border shadow-sm relative group hover:shadow-xl hover:shadow-blue-900/5 transition-all"
 >
 <div className={`w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center mb-6 text-gray-600 dark:text-slate-500 group-hover:scale-110 transition-transform`}>
 <section.icon className="w-7 h-7" />
 </div>
 <h3 className="text-xl font-display font-bold text-gray-900 dark:text-white mb-4">{section.title}</h3>
 <p className="text-gray-700 dark:text-slate-400 text-sm leading-relaxed">{section.content}</p>
 </motion.div>
 ))}
 </div>


 

  {/* Process Steps */}
 <section className="relative">
 <div className="text-center mb-16">
 <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white mb-4">{t('ขั้นตอนการขอรับรอง', 'Our Certification Process')}</h2>
 <p className="text-gray-700 dark:text-slate-400">{t('กระบวนการ 4 ขั้นตอนง่ายๆ เพื่อก้าวสู่มาตรฐานระดับสากล', 'Simple 4-step journey to international excellence')}</p>
 </div>

 <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
 {/* Connector Line (Desktop) Removed */}
 
 {steps.map((step, idx) => (
 <motion.div 
 key={idx}
 initial={{ opacity: 0, scale: 0.95 }}
 whileInView={{ opacity: 1, scale: 1 }}
 viewport={{ once: true }}
 transition={{ delay: idx * 0.1 }}
 className="relative z-10 bg-white/40 backdrop-blur-[35px] border border-white/40 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] dark:bg-slate-900/40 dark:border-white/20 dark:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.2)] p-6 rounded-3xl border text-center"
 >
 <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-display font-bold text-sm mx-auto mb-6 shadow-lg shadow-blue-600/20">
 {step.num}
 </div>
 <h4 className="font-bold text-gray-900 dark:text-white mb-2">{step.title}</h4>
 <p className="text-xs text-gray-700 dark:text-slate-400 leading-relaxed">{step.desc}</p>
 </motion.div>
 ))}
 </div>
 </section>

  <div className="mt-16">
    <VideoPresentation settings={settings} />
  </div>

  <hr className="border-gray-150/30 dark:border-slate-850/50 my-16 border-t" />

  {/* Core Standards Showcase */}
 <div className="space-y-8">
 <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
 <div>
 <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white tracking-tight flex items-center gap-2">
 <ShieldCheck className="w-6 h-6 text-blue-600" />
 {t('มาตรฐานเด่นที่ให้บริการตรวจรับรอง', 'Core Certification Standards')}
 </h2>
 <p className="text-sm text-gray-700 dark:text-slate-400 mt-1">
 {t('บริการตรวจประเมินตามมาตรฐานสากลที่เป็นที่นิยมและจำเป็นที่สุดในการดำเนินธุรกิจ', 'Our most requested international standards for organizations.')}
 </p>
 </div>
 <button 
 onClick={() => onTabChange('standards')}
 className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-all flex items-center gap-1 cursor-pointer group self-start md:self-auto"
 >
 <span>{t('ดูมาตรฐานทั้งหมดที่รับรอง', 'View All Standards')}</span>
 <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
 </button>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
 {coreStandards.map((std) => {
 const Icon = CATEGORY_ICONS[std.category] || Settings;
 return (
 <div
 key={std.id}
 className="group relative bg-white/45 dark:bg-slate-900/40 backdrop-blur-[35px] border border-slate-200/50 dark:border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.02)] dark:shadow-none p-6 rounded-[2rem] hover:border-blue-500/40 hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-300 flex flex-col justify-between h-full"
 >
 <div>
 <div className="mb-6 flex items-center justify-between">
 <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
 <Icon className="w-5 h-5" />
 </div>
 {std.accreditation.length > 0 && (
 <div className="flex gap-1">
 {std.accreditation.map(acc => (
 <span key={acc} className="text-[8px] font-bold px-1.5 py-0.5 bg-gray-100 text-gray-700 dark:text-slate-400 rounded uppercase">
 {acc}
 </span>
 ))}
 </div>
 )}
 </div>

 <h3 className="text-lg font-display font-bold text-gray-900 dark:text-white mb-2">{std.code}</h3>
 <h4 className="text-xs font-bold text-blue-600 mb-4">{t(std.nameTH, std.nameEN)}</h4>
 <p className="text-xs text-gray-700 dark:text-slate-400 font-sans leading-relaxed mb-6">
 {t(std.shortDescTH, std.shortDescEN)}
 </p>
 </div>

 <button 
 onClick={() => onTabChange('standards')}
 className="w-full py-3 bg-gray-50 text-gray-800 dark:text-slate-300 group-hover:bg-blue-600 group-hover:text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2"
 >
 {t('ดูรายละเอียดและประโยชน์', 'View Details & Benefits')}
 <ArrowRight className="w-3.5 h-3.5" />
 </button>
 </div>
 );
 })}
 </div>
 </div>

 
  <hr className="border-gray-150/30 dark:border-slate-850/50 my-16 border-t" />

  {/* Interactive Tools Hub */}
 <div className="bg-white/40 backdrop-blur-[35px] border border-white/40 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] dark:bg-slate-900/40 dark:border-white/20 dark:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.2)] rounded-[3rem] p-8 md:p-12 shadow-sm space-y-8">
 <div className="text-center max-w-2xl mx-auto space-y-3">
 <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 dark:text-white">
 {t('เครื่องมือวิเคราะห์และบริการออนไลน์', 'Interactive ISO Tools & Services')}
 </h2>
 <p className="text-sm text-gray-700 dark:text-slate-200 leading-relaxed font-sans">
 {t('เลือกใช้บริการออนไลน์เพื่อช่วยประเมินความต้องการ ตรวจสอบสถานะใบรับรอง หรือคำนวณงบประมาณเบื้องต้น', 'Choose from our digital tools to assist with scope assessment, certificate verification, or budgeting.')}
 </p>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
 {/* Tool Card 1: Diagnostic Assessor */}
 <div className="bg-white/40 backdrop-blur-[35px] border border-white/40 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] dark:bg-slate-900/40 dark:border-white/20 dark:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.2)] p-6 rounded-3xl border shadow-sm flex flex-col justify-between">
 <div className="space-y-4">
 <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl w-fit">
 <Compass className="w-6 h-6" />
 </div>
 <h3 className="text-base font-bold text-gray-900 dark:text-white">{t('วิเคราะห์ขอบข่ายและประเมินราคา', 'ISO Scope & Cost Assessor')}</h3>
 <p className="text-xs text-gray-700 dark:text-slate-400 font-sans leading-relaxed">
 {t('ตอบคำถาม 4 ข้อ เพื่อแนะนำมาตรฐานที่เหมาะสมกับธุรกิจคุณ พร้อมคำนวณค่าธรรมเนียมและจำนวนวันประเมิน (Man-Days) อัตโนมัติ', 'Answer a quick 4-step quiz to find the right standard and estimate costs and audit man-days.')}
 </p>
 </div>
 <button 
 onClick={() => {
 setShowQuiz(!showQuiz);
 if(!showQuiz) {
 setTimeout(() => {
 document.getElementById('quiz-section')?.scrollIntoView({ behavior: 'smooth' });
 }, 100);
 }
 }}
 className="mt-6 w-full py-3 bg-gray-900 text-white rounded-xl text-xs font-bold hover:bg-gray-800 transition-all cursor-pointer flex items-center justify-center gap-1.5"
 >
 <span>{showQuiz ? t('ปิดโปรแกรมประเมิน', 'Close Assessor') : t('เริ่มประเมินความต้องการ', 'Start Assessment')}</span>
 <ArrowRight className="w-3.5 h-3.5" />
 </button>
 </div>

 {/* Tool Card 2: Verify Certificate */}
 <div className="bg-white/40 backdrop-blur-[35px] border border-white/40 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] dark:bg-slate-900/40 dark:border-white/20 dark:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.2)] p-6 rounded-3xl border shadow-sm flex flex-col justify-between">
 <div className="space-y-4">
 <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl w-fit">
 <ShieldCheck className="w-6 h-6" />
 </div>
 <h3 className="text-base font-bold text-gray-900 dark:text-white">{t('ตรวจสอบความถูกต้องใบรับรอง', 'Verify ISO Certificate')}</h3>
 <p className="text-xs text-gray-700 dark:text-slate-400 font-sans leading-relaxed">
 {t('ตรวจสอบสถานะและความถูกต้องของใบรับรองที่ออกโดย QAIC Thailand ได้ทันทีผ่านฐานข้อมูลกลางของระบบสากล', 'Instantly check the status and validity of certificates issued by QAIC Thailand using our database registry.')}
 </p>
 </div>
 <button 
 onClick={() => onTabChange('verify')}
 className="mt-6 w-full py-3 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/10"
 >
 <span>{t('ตรวจสอบใบรับรอง', 'Verify Certificate')}</span>
 <ArrowRight className="w-3.5 h-3.5" />
 </button>
 </div>

 {/* Tool Card 3: Request Quote */}
 <div className="bg-white/40 backdrop-blur-[35px] border border-white/40 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] dark:bg-slate-900/40 dark:border-white/20 dark:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.2)] p-6 rounded-3xl border shadow-sm flex flex-col justify-between">
 <div className="space-y-4">
 <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl w-fit">
 <Coins className="w-6 h-6" />
 </div>
 <h3 className="text-base font-bold text-gray-900 dark:text-white">{t('ขอใบเสนอราคาอย่างเป็นทางการ', 'Request Official Proposal')}</h3>
 <p className="text-xs text-gray-700 dark:text-slate-400 font-sans leading-relaxed">
 {t('ส่งข้อมูลขอบข่ายงานขององค์กร รายละเอียดสาขา และจำนวนพนักงาน เพื่อรับเอกสารใบเสนอราคาสำหรับการตรวจประเมิน', 'Submit your corporate scope, facility details, and headcount to receive an official price proposal.')}
 </p>
 </div>
 <button 
 onClick={() => onTabChange('quote')}
 className="mt-6 w-full py-3 bg-amber-600 text-white rounded-xl text-xs font-bold hover:bg-amber-700 transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-md shadow-amber-600/10"
 >
 <span>{t('ขอใบเสนอราคาด่วน', 'Request Proposal')}</span>
 <ArrowRight className="w-3.5 h-3.5" />
 </button>
 </div>
 </div>

 {/* Collapsible Quiz Panel */}
 <AnimatePresence>
 {showQuiz && (
 <motion.div 
 id="quiz-section"
 initial={{ height: 0, opacity: 0 }}
 animate={{ height: 'auto', opacity: 1 }}
 exit={{ height: 0, opacity: 0 }}
 transition={{ duration: 0.4, ease: "easeInOut" }}
 className="overflow-hidden bg-white/40 backdrop-blur-[35px] border border-white/40 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] dark:bg-slate-900/40 dark:border-white/20 dark:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.2)] p-6 md:p-8 rounded-[2rem] border shadow-inner"
 >
 <DiagnosticQuiz settings={settings} />
 </motion.div>
 )}
 </AnimatePresence>
 </div>

 
  <hr className="border-gray-150/30 dark:border-slate-850/50 my-16 border-t" />

  <BusinessSectors settings={settings} />

 <hr className="border-gray-150/30 dark:border-slate-850/50 my-16 border-t" />

 <NewsHighlight settings={settings} onTabChange={onTabChange} />

 <hr className="border-gray-150/30 dark:border-slate-850/50 my-16 border-t" />

 {/* Pricing & FAQ Split */}
 <div className="grid lg:grid-cols-2 gap-12">
 {/* Pricing Card */}
 <section>
 <div className="flex items-center gap-3 mb-8">
 <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600">
 <Wallet className="w-5 h-5" />
 </div>
 <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white">{t('ค่าใช้จ่ายเบื้องต้น', 'Estimated Costs')}</h2>
 </div>
 
 <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-8 text-white shadow-xl shadow-blue-900/20">
 <p className="text-blue-100 text-sm mb-2 opacity-80">{t('ราคาเริ่มต้นประมาณ', 'Starting from approximately')}</p>
 <div className="flex items-baseline gap-2 mb-6">
 <span className="text-4xl font-display font-bold">฿25,XXX</span>
 <span className="text-blue-100/60 text-sm">{t('/ ต่อใบรับรอง', '/ per certificate')}</span>
 </div>
 
 <ul className="space-y-4 mb-8">
 {[
 t('รวมค่าธรรมเนียมใบรับรองสากล', 'Includes global certificate fees'),
 t('ฟรี! ที่ปรึกษา AI ช่วยตอบข้อสงสัย 24 ชม.', 'Free AI Consultant 24/7'),
 t('ตรวจประเมินโดยผู้เชี่ยวชาญระดับสากล', 'Audited by international experts'),
 t('ใบรับรองดิจิทัลตรวจสอบผ่าน QR ได้ทันที', 'Digital certificate with QR verification')
 ].map((item, i) => (
 <li key={i} className="flex items-center gap-3 text-sm">
 <div className="bg-white/40 backdrop-blur-[35px] border border-white/40 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] dark:bg-slate-900/40 dark:border-white/20 dark:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.2)] p-1 rounded-full"><CheckCircle2 className="w-3 h-3" /></div>
 <span>{item}</span>
 </li>
 ))}
 </ul>

 <button 
 onClick={() => onTabChange('quote')}
 className="w-full py-4 bg-white/40 backdrop-blur-[35px] border border-white/40 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] dark:bg-slate-900/40 dark:border-white/20 dark:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.2)] text-blue-700 font-bold rounded-2xl hover:bg-blue-50 transition-all flex items-center justify-center gap-2 group cursor-pointer border-none"
 >
 <span>{t('ขอใบเสนอราคาด่วน', 'Get Instant Quote')}</span>
 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
 </button>
 <p className="text-[10px] text-blue-100/60 text-center mt-4 uppercase tracking-widest font-medium">
 {t('*ราคานี้อ้างอิงสำหรับสถานประกอบการขนาดเล็ก', '*Pricing based on small-scale facility')}
 </p>
 </div>
 </section>

 {/* FAQ Area */}
 <section>
 <div className="flex items-center gap-3 mb-8">
 <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
 <MessageSquare className="w-5 h-5" />
 </div>
 <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white">{t('คำถามที่พบบ่อย', 'Common Questions')}</h2>
 </div>

 <div className="space-y-3">
 {faqs.map((faq, idx) => (
 <div 
 key={idx} 
 className="bg-white/40 backdrop-blur-[35px] border border-white/40 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] dark:bg-slate-900/40 dark:border-white/20 dark:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.2)] rounded-2xl overflow-hidden"
 >
 <button 
 onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
 className="w-full flex items-center justify-between p-5 text-left font-bold text-gray-900 dark:text-white hover:bg-gray-50 transition-colors cursor-pointer border-none bg-transparent"
 >
 <span className="text-sm">{faq.q}</span>
 {openFaq === idx ? <Minus className="w-4 h-4 text-blue-600" /> : <Plus className="w-4 h-4 text-gray-600 dark:text-slate-500" />}
 </button>
 <AnimatePresence>
 {openFaq === idx && (
 <motion.div 
 initial={{ height: 0, opacity: 0 }}
 animate={{ height: 'auto', opacity: 1 }}
 exit={{ height: 0, opacity: 0 }}
 className="overflow-hidden bg-white/20 backdrop-blur-[10px] dark:bg-slate-900/20"
 >
 <div className="p-5 text-gray-700 dark:text-slate-400 text-sm leading-relaxed border-t border-gray-100">
 {faq.a}
 </div>
 </motion.div>
 )}
 </AnimatePresence>
 </div>
 ))}
 </div>

 <button 
 onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
 className="mt-8 flex items-center gap-2 text-blue-600 font-bold text-sm hover:translate-x-1 transition-transform cursor-pointer border-none bg-transparent"
 >
 <span>{t('ดูคำถามทั้งหมด', 'View all FAQs')}</span>
 <ChevronRight className="w-4 h-4" />
 </button>
 </section>
 </div>
 </div>
 );
}

interface NewsHighlightProps {
  settings: UserSettings;
  onTabChange: (tab: 'assess' | 'standards' | 'training' | 'verify' | 'org' | 'profile' | 'quote' | 'news' | 'downloads') => void;
}

function NewsHighlight({ settings, onTabChange }: NewsHighlightProps) {
  const lang = settings.lang;
  const t = (th: string, en: string) => lang === 'TH' ? th : en;

  const [articles] = React.useState<NewsArticle[]>(() => {
    const saved = localStorage.getItem('qaic_news_articles');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      } catch (e) {
        console.error('Failed to parse news articles from localStorage:', e);
      }
    }
    return DEFAULT_NEWS_ARTICLES;
  });

  const latestArticles = articles.slice(0, 3);

  const getBadgeColor = (category: string) => {
    switch (category) {
      case 'PR': return 'bg-blue-500/10 text-blue-650 dark:text-blue-400 border border-blue-200/40 dark:border-blue-900/30';
      case 'CERTIFICATION': return 'bg-emerald-500/10 text-emerald-650 dark:text-emerald-400 border border-emerald-200/40 dark:border-emerald-900/30';
      case 'TRAINING': return 'bg-purple-500/10 text-purple-650 dark:text-purple-400 border border-purple-200/40 dark:border-purple-900/30';
      case 'ISO UPDATE': return 'bg-amber-500/10 text-amber-650 dark:text-amber-400 border border-amber-200/40 dark:border-amber-900/30';
      default: return 'bg-gray-500/10 text-gray-650 dark:text-gray-400 border border-gray-200/40';
    }
  };

  const handleNewsClick = (articleId: string) => {
    onTabChange('news');
    const params = new URLSearchParams(window.location.search);
    params.set('tab', 'news');
    params.set('article', articleId);
    window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`);
    // Smooth scroll to top of viewport
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="space-y-12">
      {/* Section Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto px-4">
        <motion.h4 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-red-500 font-display font-extrabold uppercase tracking-[0.25em] text-xs md:text-sm"
        >
          {t('ข่าวสารและกิจกรรม', 'LATEST NEWS & ACTIVITIES')}
        </motion.h4>
        
        <motion.h2 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-4xl font-display font-bold leading-tight tracking-tight text-gray-900 dark:text-white"
        >
          {t('อัปเดตข่าวประชาสัมพันธ์ล่าสุด', 'Stay Updated with QAIC Thailand')}
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-sm md:text-base text-gray-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed"
        >
          {t('เกาะติดข่าวสารการรับรองมาตรฐาน กิจกรรมเพื่อสังคม อัปเดตข้อกำหนด ISO และตารางการฝึกอบรมจากผู้เชี่ยวชาญ', 'Keep up with our latest certifications, corporate activities, ISO updates, and specialized professional training updates.')}
        </motion.p>
      </div>

      {/* Grid of latest 3 articles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 px-4 md:px-8">
        {latestArticles.map((article, index) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            onClick={() => handleNewsClick(article.id)}
            className="group bg-white/40 dark:bg-slate-900/40 backdrop-blur-[35px] border border-slate-200/50 dark:border-white/10 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] dark:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.15)] rounded-3xl overflow-hidden hover:scale-[1.02] hover:bg-white/60 dark:hover:bg-slate-900/60 transition-all duration-300 shadow-lg cursor-pointer flex flex-col h-full"
          >
            {/* Cover Image */}
            <div className="h-48 w-full overflow-hidden relative border-b border-slate-200/30 dark:border-slate-800/30 bg-gray-100 dark:bg-slate-950/40">
              <img 
                src={article.image} 
                alt={lang === 'TH' ? article.titleTH : article.titleEN}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
            </div>
            
            {/* Body */}
            <div className="p-6 flex flex-col justify-between flex-grow">
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className={`px-2.5 py-1 rounded-lg text-[9px] font-bold uppercase tracking-wider ${getBadgeColor(article.category)}`}>
                    {article.category}
                  </span>
                  <div className="flex items-center gap-1 text-[10px] text-gray-700 dark:text-slate-400 font-medium font-sans">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{lang === 'TH' ? article.readTimeTH : article.readTimeEN}</span>
                  </div>
                </div>
                
                <h3 className="text-sm md:text-base font-display font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-650 dark:group-hover:text-blue-400 transition-colors leading-snug">
                  {lang === 'TH' ? article.titleTH : article.titleEN}
                </h3>
                
                <p className="text-[11px] md:text-xs text-gray-500 dark:text-slate-400 line-clamp-3 leading-relaxed font-sans mb-4">
                  {lang === 'TH' ? article.summaryTH : article.summaryEN}
                </p>
              </div>

              {/* Bottom Row */}
              <div className="flex items-center justify-between border-t border-gray-100 dark:border-slate-800/50 pt-4 mt-auto">
                <span className="text-[10px] text-gray-750 dark:text-slate-500 font-semibold font-sans">
                  {lang === 'TH' ? article.date : article.dateEN}
                </span>
                
                <div className="flex items-center gap-1 text-[10px] md:text-xs font-bold text-blue-650 dark:text-blue-400 uppercase tracking-wider select-none">
                  <span>{t('อ่านข่าวเพิ่มเติม', 'Read More')}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* View All Button */}
      <div className="text-center pt-2">
        <button
          onClick={() => {
            onTabChange('news');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="px-6 py-3 border border-blue-500/35 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 hover:border-transparent text-blue-650 dark:text-blue-400 text-xs font-bold rounded-xl tracking-wider uppercase transition-all duration-200 cursor-pointer shadow-sm bg-transparent active:scale-95"
        >
          {t('ดูข่าวสารทั้งหมด', 'View All News & PR')}
        </button>
      </div>
    </section>
  );
}
