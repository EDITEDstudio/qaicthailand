/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  History,
  Target,
  ShieldCheck,
  Scale,
  BarChart3,
  CheckCircle2,
  Users,
  Award,
  BookOpen,
  TrendingUp
} from 'lucide-react';
import { UserSettings } from '../types';

interface AboutSectionProps {
 settings: UserSettings;
 isAdminMode?: boolean;
}

export default function AboutSection({ settings, isAdminMode = false }: AboutSectionProps) {
 const lang = settings.lang;
 const t = (th: string, en: string) => lang === 'TH' ? th : en;

 // Initialize theme based on user settings
 const [localTheme, setLocalTheme] = useState<'light' | 'dark'>('light');
 useEffect(() => {
 if (settings.theme === 'cyber') {
 setLocalTheme('dark');
 } else {
 setLocalTheme('light');
 }
 }, [settings.theme]);


 const KPIs = [
 { label: t('จำนวนลูกค้าใหม่จากการตรวจประเมิน', 'New clients from assessments'), value: t('ไม่ต่ำกว่า 30 รายต่อปี', 'Min 30 per year') },
 { label: t('อัตราลูกค้าร้องเรียนหรืออุทธรณ์หรือยกเลิกการรับรอง', 'Complaints/appeals/cancellations rate'), value: t('ไม่เกินปีละ 3 ราย', 'Max 3 per year') },
 { label: t('% อัตราการส่งรายงาน Audit Report ตรงเวลา', '% On-time Audit Report delivery'), value: t('ไม่ต่ำกว่า 70% ต่อเดือน', 'Min 70% per month') },
 { label: t('ความพึงพอใจในด้านบริการตรวจรับรอง', 'Certification service satisfaction'), value: t('ไม่ต่ำกว่า 80% ต่อเดือน', 'Min 80% per month') },
 ];

 const executionPlans = [
 t('บริหารงานและดำเนินการอย่างมืออาชีพให้สอดคล้องกับข้อกำหนด ISO/IEC 17021-1:2015', 'Professional management in compliance with ISO/IEC 17021-1:2015'),
 t('ให้บริการตรวจสอบระบบการควบคุมกระบวนการผลิตในอุตสาหกรรมอาหารอย่างเป็นระบบ', 'Systematic production control inspection services in food industry'),
 t('ส่งเสริมและพัฒนาบุคลากรให้มีประสิทธิภาพและทักษะที่เหมาะสมอย่างต่อเนื่อง', 'Continuous development of personnel skills and performance'),
 t('ให้เจ้าหน้าที่ปฏิบัติงานได้โดยอิสระ ไม่มีภาวะกดดันที่กระทบต่อความเที่ยงตรง', 'Ensuring staff independence from any pressures affecting audit integrity'),
 ];

 return (
 <div className={`transition-colors duration-500 rounded-[3rem] p-4 md:p-8 space-y-12 text-slate-900 dark:text-slate-100`}>
 
  {/* Header Section */}
  <section className="relative text-center space-y-4 max-w-4xl mx-auto pt-6 px-4">
    <motion.h4 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-red-500 font-display font-extrabold uppercase tracking-[0.25em] text-xs md:text-sm"
    >
      {t('ผู้เชี่ยวชาญของเรา', 'OUR EXPERTS')}
    </motion.h4>
    
    <motion.h2 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className={`text-2xl md:text-3xl lg:text-4xl font-display font-bold leading-tight tracking-tight text-slate-900 dark:text-white`}
    >
      {t('ทีมผู้เชี่ยวชาญที่อยู่เบื้องหลัง', 'The Expert Team Behind')}<br />
      <span className="text-red-650 dark:text-red-500">{t('ความสำเร็จของลูกค้ากว่า 500+ องค์กร', 'the Success of 500+ Organizations')}</span>
    </motion.h2>
  </section>

  {/* Stats / Pillars Banner Section */}
  <section className="relative z-25 max-w-5xl mx-auto pt-4">
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-8 md:py-10 border rounded-3xl transition-all duration-500 bg-white border-gray-100/80 text-slate-800 shadow-xl dark:bg-slate-900/60 dark:border-slate-850/80 dark:text-white dark:shadow-2xl dark:backdrop-blur-md`}>
    
      {/* Stat Pillar 1 */}
      <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-2 sm:px-4 border-b sm:border-b-0 lg:border-r border-gray-100/50 dark:border-slate-800/50 pb-6 sm:pb-0">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-red-500/10 text-red-500">
            <Users className="w-5 h-5" />
          </div>
          <span className="font-display font-extrabold text-3xl text-red-555 dark:text-red-500">500+</span>
        </div>
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wider">{t('องค์กรที่ไว้วางใจ', 'Trusted Clients')}</p>
          <p className={`text-[9.5px] mt-0.5 text-gray-600 dark:text-slate-300`}>{t('ครอบคลุมทุกอุตสาหกรรมทั่วประเทศ', 'Across all industries nationwide')}</p>
        </div>
      </div>

      {/* Stat Pillar 2 */}
      <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-2 sm:px-4 border-b sm:border-b-0 lg:border-r border-gray-100/50 dark:border-slate-800/50 pb-6 sm:pb-0">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <span className="font-display font-extrabold text-3xl text-emerald-555 dark:text-emerald-500">100%</span>
        </div>
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wider">{t('อัตราความสำเร็จในการรับรอง', 'Success Rate')}</p>
          <p className={`text-[9.5px] mt-0.5 text-gray-600 dark:text-slate-300`}>{t('ให้บริการจนกว่าลูกค้าจะได้รับการรับรอง', 'Guaranteed certification service')}</p>
        </div>
      </div>

      {/* Stat Pillar 3 */}
      <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-2 sm:px-4 border-b sm:border-b-0 lg:border-r border-gray-100/50 dark:border-slate-800/50 pb-6 sm:pb-0">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-500">
            <Award className="w-5 h-5" />
          </div>
          <span className="font-display font-extrabold text-3xl text-blue-555 dark:text-blue-550">15+ {t('ปี', 'Yrs')}</span>
        </div>
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wider">{t('แห่งประสบการณ์', 'Years Experience')}</p>
          <p className={`text-[9.5px] mt-0.5 text-gray-600 dark:text-slate-300`}>{t('ในงานที่ปรึกษาและตรวจประเมิน', 'In consulting & assessment')}</p>
        </div>
      </div>

      {/* Stat Pillar 4 */}
      <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-2 sm:px-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-500">
            <TrendingUp className="w-5 h-5" />
          </div>
          <span className="font-display font-extrabold text-3xl text-purple-555 dark:text-purple-500">50+</span>
        </div>
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wider">{t('โครงการภาครัฐและชุมชน', 'Public Initiatives')}</p>
          <p className={`text-[9.5px] mt-0.5 text-gray-600 dark:text-slate-300`}>{t('ร่วมพัฒนามาตรฐานกับหน่วยงานต่าง ๆ', 'Supporting national standard dev')}</p>
        </div>
      </div>

    </div>
  </section>

 {/* Establishment & Intro */}
 <section className="relative overflow-hidden px-4 md:px-8">
 <div className="max-w-4xl mx-auto space-y-8">
 <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 dark:bg-slate-900 text-blue-700 dark:text-blue-400 rounded-full text-xs font-bold uppercase tracking-widest border border-blue-100/50 dark:border-slate-800">
 <History className="w-4 h-4" />
 <span>{t('ก่อตั้งเมื่อ 12 มีนาคม 2550', 'Established March 12, 2007')}</span>
 </div>
 
 <h2 className="text-3xl md:text-5xl font-display font-bold leading-tight text-gray-900 dark:text-white">
 {t('บริษัท คิวเอไอซี (ประเทศไทย) จำกัด', 'QAIC (Thailand) Co., Ltd.')}
 </h2>
 
 <div className="grid md:grid-cols-2 gap-12 items-start">
 <div className="space-y-6">
 <p className={`leading-relaxed font-sans text-gray-700 dark:text-white`}>
 {t(
 'บริษัท คิวเอไอซี (ประเทศไทย) จำกัด เป็นหน่วยตรวจประเมินรับรองระบบมาตรฐานสากลที่ได้รับความเชื่อถือให้กับสถานประกอบการ องค์กร และหน่วยงานที่นำข้อกำหนดตามมาตรฐานสากลต่างๆ มาประยุกต์ใช้ โดยได้รับการรับรองระบบงานจาก United Kingdom Accreditation Service (UKAS) เลขที่ 46',
 'QAIC (Thailand) Co., Ltd. is a trusted international certification body for organizations implementing global standards. We are accredited by the United Kingdom Accreditation Service (UKAS), Accredited Body No. 46.'
 )}
 </p>
 <div className={`p-6 rounded-3xl flex items-center gap-6 bg-gray-50 dark:bg-slate-900/50 dark:border dark:border-slate-800`}>
 <div className="w-16 h-16 bg-white/40 backdrop-blur-[35px] border border-white/40 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] dark:bg-slate-900/40 dark:border-white/20 dark:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.2)] rounded-2xl shadow-sm flex items-center justify-center p-3">
 <img src="/logo.png" alt="UKAS" className="w-full h-auto opacity-90" />
 </div>
 <div>
 <p className="text-[10px] font-bold text-gray-600 dark:text-slate-300 uppercase tracking-widest mb-1">Accreditation</p>
 <p className="text-sm font-bold">UKAS Accredited Body #46</p>
 </div>
 </div>
 </div>
 
 <div className="space-y-4">
 <h3 className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest flex items-center gap-2">
 <Award className="w-4 h-4" />
 {t('มาตรฐานที่ให้บริการ', 'Our Certifications')}
 </h3>
 <div className="flex flex-wrap gap-2 text-xs">
 {['ISO 9001:2015', 'ISO 14001:2015', 'ISO 45001:2018', 'ISO 22000:2018', 'GHPs', 'HACCP', 'BRC', 'ISO 13485:2016', 'ISO 50001', 'ISO/IEC 17021-1:2015'].map(std => (
 <span key={std} className={`px-3 py-1.5 rounded-full font-medium shadow-sm transition-all bg-white/40 backdrop-blur-[35px] border border-white/40 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] text-gray-700 dark:bg-slate-900 dark:text-gray-300 dark:border dark:border-slate-800`}>
 {std}
 </span>
 ))}
 </div>
 </div>
 </div>
 </div>
 </section>

 {/* Quality Policy Quote */}
 <section className={`rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden transition-all bg-blue-600 text-white dark:bg-indigo-950/20 dark:border dark:border-indigo-900/40 dark:text-blue-100`}>
 <motion.div 
 initial={{ opacity: 0, scale: 0.9 }}
 whileInView={{ opacity: 1, scale: 1 }}
 className="relative z-10 max-w-4xl mx-auto space-y-8"
 >
 <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6 bg-white/40 backdrop-blur-[35px] border border-white/40 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] text-white dark:bg-blue-500/20 dark:text-blue-400`}>
 <BookOpen className="w-6 h-6" />
 </div>
 <h3 className={`text-xs font-bold uppercase tracking-[0.3em] text-blue-200 dark:text-blue-400`}>{t('นโยบายคุณภาพ', 'Quality Policy')}</h3>
 <p className="text-xl md:text-3xl lg:text-4xl font-display font-medium leading-tight">
 “{t(
 'มุ่งมั่นบริการตรวจสอบและรับรองระบบมาตรฐานให้กับลูกค้าอย่างมีคุณภาพ เป็นกลาง น่าเชื่อถือ และเป็นไปตามมาตรฐานสากล ISO/IEC 17021-1 เพื่อสร้างมูลค่าเพิ่มและสนองความพึงพอใจของลูกค้า',
 'Committed to provide quality, impartial, and reliable certification services in accordance with ISO/IEC 17021-1 to create added value and ensure customer satisfaction.'
 )}”
 </p>
 </motion.div>
 <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
 <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[100%] bg-white/40 backdrop-blur-[35px] border border-white/40 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] dark:bg-slate-900/40 dark:border-white/20 dark:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.2)] rounded-full blur-[100px]" />
 <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[100%] bg-white/40 backdrop-blur-[35px] border border-white/40 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] dark:bg-slate-900/40 dark:border-white/20 dark:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.2)] rounded-full blur-[100px]" />
 </div>
 </section>

 {/* Execution Plan & KPIs */}
 <section className="grid lg:grid-cols-2 gap-16 items-start px-4 md:px-8">
 <div className="space-y-12">
 <div className="space-y-4">
 <h3 className={`text-2xl font-display font-bold text-gray-900 dark:text-white`}>{t('แนวทางการดำเนินงาน', 'Execution Framework')}</h3>
 <p className={`text-sm leading-relaxed text-gray-700 dark:text-white`}>
 {t(
 'เพื่อให้บรรลุวัตถุประสงค์ตามนโยบายดังกล่าว เรามุ่งเน้นความเป็นมืออาชีพในทุกขั้นตอนของการตรวจสอบและรับรองระบบมาตรฐานสากล',
 'To achieve our quality objectives, we focus on professionalism at every stage of the global standard certification process.'
 )}
 </p>
 </div>
 
 <div className="space-y-6">
 {executionPlans.map((plan, i) => (
 <div key={i} className="flex gap-4 group">
 <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-slate-900 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-xs flex-shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors border border-blue-100/30 dark:border-slate-800">
 {i + 1}
 </div>
 <p className={`text-sm leading-relaxed font-sans pt-1.5 text-gray-700 dark:text-white`}>{plan}</p>
 </div>
 ))}
 </div>
 </div>

 <div className={`rounded-[2.5rem] p-8 md:p-12 space-y-8 bg-white/40 backdrop-blur-[35px] border border-white/40 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] dark:bg-slate-900/40 dark:border-white/20 dark:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.2)] relative overflow-hidden`}>
 <div className="flex items-center gap-3 border-b border-gray-800 pb-6">
 <div className="p-3 bg-blue-500/20 rounded-xl text-blue-400">
 <BarChart3 className="w-6 h-6" />
 </div>
 <div>
 <h3 className="font-display font-bold text-lg">{t('วัตถุประสงค์และ KPI', 'Quality Objectives & KPIs')}</h3>
 <p className="text-[10px] text-gray-700 dark:text-slate-300 uppercase tracking-widest font-bold mt-0.5">{t('เป้าหมายที่วัดผลได้ของบริษัท', 'Measurable Corporate Targets')}</p>
 </div>
 </div>
 
 <div className="space-y-6">
 {KPIs.map((kpi, i) => (
 <div key={i} className="flex justify-between items-start gap-4">
 <p className="text-sm text-gray-600 dark:text-slate-200 font-sans leading-relaxed">{kpi.label}</p>
 <div className="text-right flex-shrink-0">
 <p className="text-sm font-bold text-blue-400">{kpi.value}</p>
 </div>
 </div>
 ))}
 </div>
 </div>
 </section>

 {/* Goals & Impartiality */}
 <section className="space-y-16 px-4 md:px-8">
 <div className="grid md:grid-cols-2 gap-8">
 {/* Our Goals */}
 <div className={`rounded-[2.5rem] p-8 md:p-12 space-y-8 bg-white/40 backdrop-blur-[35px] border border-white/40 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] dark:bg-slate-900/40 dark:border-white/20 dark:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.2)] relative overflow-hidden`}>
 <div className="flex items-center gap-3">
 <div className="p-3 bg-blue-50 dark:bg-slate-900 rounded-xl text-blue-600 dark:text-blue-400">
 <Target className="w-6 h-6" />
 </div>
 <h3 className={`font-display font-bold text-xl text-gray-900 dark:text-white`}>{t('เป้าหมายของเรา', 'Our Strategic Goals')}</h3>
 </div>
 <div className="space-y-6">
 {goals.map((goal, i) => (
 <div key={i} className="flex gap-4">
 <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
 <p className={`text-sm leading-relaxed font-sans text-gray-800 dark:text-white`}>{goal}</p>
 </div>
 ))}
 </div>
 </div>

 {/* Impartiality Policy */}
 <div className={`rounded-[2.5rem] p-8 md:p-12 space-y-8 bg-white/40 backdrop-blur-[35px] border border-white/40 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] dark:bg-slate-900/40 dark:border-white/20 dark:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.2)] relative overflow-hidden`}>
 <div className="flex items-center gap-3">
 <div className="p-3 bg-amber-50 dark:bg-slate-900 rounded-xl text-amber-600 dark:text-amber-400">
 <Scale className="w-6 h-6" />
 </div>
 <h3 className={`font-display font-bold text-xl text-gray-900 dark:text-white`}>{t('นโยบายความเป็นกลาง', 'Impartiality Policy')}</h3>
 </div>
 <div className="space-y-6">
 {impartialityPolicies.map((policy, i) => (
 <div key={i} className="flex gap-4">
 <ShieldCheck className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
 <p className={`text-sm leading-relaxed font-sans text-gray-800 dark:text-white`}>{policy}</p>
 </div>
 ))}
 </div>
 </div>
 </div>
 </section>


 </div>
 );
}

// Temporary fallback mock variables
const goals = [
 'มุ่งมั่นในการให้บริการที่สอดคล้องต่อความต้องการและคาดหวังของลูกค้า',
 'มุ่งเน้นการตรวจประเมินที่รวดเร็ว มีคุณภาพ และเอื้ออำนวยความสะดวก',
 'มุ่งเน้นการให้บริการหลังการรับรองเพื่อการพัฒนาที่ยั่งยืน',
 'ประชาสัมพันธ์ชื่อของลูกค้าเพื่อขยายโอกาสทางการตลาด',
 'แจ้งข่าวสารความเคลื่อนไหวในวงการมาตรฐาน ISO อย่างต่อเนื่อง'
];

const impartialityPolicies = [
 'บริการให้สอดคล้องกับกฎหมาย กฎระเบียบที่เกี่ยวข้อง',
 'จัดให้มีทรัพยากรที่เพียงพอเพื่อป้องกันความกดดันในกิจกรรม',
 'มอบหมายงานที่เป็นอิสระ โดยผู้ตรวจและผู้อนุมัติผลต้องไม่ใช่คนเดียวกัน',
 'ตัดสินใจบนพื้นฐานความถูกต้องทางวิชาการ โดยปราศจากความกดดันทางธุรกิจ',
 'หลีกเลี่ยงความสัมพันธ์ใดๆ ที่อาจส่งผลกระทบต่อความเป็นกลาง',
 'มั่นใจในบุคลากร ไม่เลือกปฏิบัติ และให้ความเสมอภาคต่อลูกค้าทุกราย',
 'ไม่มีการทำการตลาดร่วมกับกิจกรรมที่ส่งผลกระทบต่อความเป็นกลาง'
];

