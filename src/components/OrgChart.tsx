/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Scale, 
  ShieldCheck, 
  Gavel, 
  FileText, 
  GraduationCap, 
  TrendingUp, 
  Activity, 
  Building, 
  Heart,
  DollarSign,
  X,
  Layers,
  Leaf,
  Zap,
  Award,
  ArrowRight,
  Eye,
  ListFilter,
  User,
  ClipboardCheck
} from 'lucide-react';
import { UserSettings, Language } from '../types';

interface OrgChartProps {
  settings: UserSettings;
}

interface OrgNode {
  id: string;
  titleTH: string;
  titleEN: string;
  descriptionTH: string;
  descriptionEN: string;
  icon: React.ComponentType<any>;
  color: string;
  bulletsTH?: string[];
  bulletsEN?: string[];
}

const MANAGING_DIRECTOR: OrgNode = {
  id: 'md',
  titleTH: 'กรรมการผู้จัดการ',
  titleEN: 'Managing Director',
  descriptionTH: 'ผู้รับผิดชอบสูงสุดในการบริหารงานและขับเคลื่อนนโยบายขององค์กรสู่มาตรฐานสากล กำกับดูแลการเงินและยุทธศาสตร์หลัก',
  descriptionEN: 'Chief executive officer responsible for company operations, strategic direction, and standard compliance policies.',
  icon: Users,
  color: 'bg-blue-600 dark:bg-blue-600 text-white shadow-blue-500/10 border-white/40 dark:border-white/20 border-2'
};

const FINANCE_ACCOUNTING: OrgNode = {
  id: 'finance',
  titleTH: 'เจ้าหน้าที่บัญชีการเงิน',
  titleEN: 'Finance & Accounting Officer',
  descriptionTH: 'ควบคุมดูแลงานระบบการเงิน บัญชี งบประมาณ และการทำธุรกรรมทางการเงินของบริษัท',
  descriptionEN: 'Manages corporate accounting, budgeting, financial reports, and transaction records.',
  icon: DollarSign,
  color: 'bg-emerald-650 dark:bg-[#004d40] text-emerald-100 dark:text-emerald-300 border-emerald-500/50 dark:border-[#00796b]/80 border-2 shadow-emerald-550/10'
};

const QUALITY_MANAGER: OrgNode = {
  id: 'qm',
  titleTH: 'ผู้จัดการคุณภาพ',
  titleEN: 'Quality Manager',
  descriptionTH: 'ควบคุมดูแลและพัฒนาระบบการจัดการคุณภาพของหน่วยรับรองให้สอดคล้องตามเกณฑ์มาตรฐานสากล ISO/IEC 17021-1',
  descriptionEN: 'Ensures the certification body operates in compliance with international quality accreditation standards (ISO/IEC 17021-1).',
  icon: ShieldCheck,
  color: 'bg-blue-50 dark:bg-[#071d49] text-blue-900 dark:text-sky-300 border-blue-500 dark:border-sky-500/80 border-2 shadow-sky-500/20'
};

const IMPARTIALITY_COMMITTEE: OrgNode = {
  id: 'impartiality',
  titleTH: 'คณะกรรมการความเป็นกลาง',
  titleEN: 'Impartiality Committee',
  descriptionTH: 'คณะกรรมการอิสระที่จัดตั้งขึ้นเพื่อควบคุม ดูแล และตรวจสอบความเป็นกลางในทุกกระบวนการรับรองมาตรฐานสากล',
  descriptionEN: 'Independent committee overseeing and verifying impartiality across all auditing and certification activities.',
  icon: Scale,
  color: 'bg-slate-50 dark:bg-[#0d1e3d] text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700 border shadow-sm'
};

const CERTIFICATION_DECISION_MAKER: OrgNode = {
  id: 'decision_maker',
  titleTH: 'ผู้ตัดสินให้การรับรอง',
  titleEN: 'Certification Decision Maker',
  descriptionTH: 'คณะผู้เชี่ยวชาญอิสระทำหน้าที่วิเคราะห์ ทบทวนผลรายงานตรวจประเมิน และตัดสินใจอนุมัติหรือปฏิเสธการให้การรับรอง',
  descriptionEN: 'Independent experts responsible for reviewing audit reports and making final certification decisions.',
  icon: Gavel,
  color: 'bg-slate-50 dark:bg-[#0d1e3d] text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700 border shadow-sm'
};

const DEPARTMENTS: OrgNode[] = [
  {
    id: 'dept_hr',
    titleTH: 'เจ้าหน้าที่แผนกบุคคล',
    titleEN: 'HR Department Officer',
    descriptionTH: 'สรรหา พัฒนาบุคลากร คณะผู้ตรวจประเมิน และจัดดูแลประวัติการฝึกอบรมเพื่อรักษาความสามารถของบุคลากรตามเกณฑ์มาตรฐาน',
    descriptionEN: 'Recruits and manages human resources, training logs, and qualification records for auditors and staff.',
    icon: User,
    color: 'bg-white dark:bg-[#071630] border-blue-200 dark:border-sky-500/30 text-gray-800 dark:text-slate-100 hover:border-blue-400 dark:hover:border-sky-400'
  },
  {
    id: 'dept_training',
    titleTH: 'เจ้าหน้าที่แผนกฝึกอบรม',
    titleEN: 'Training Department Officer',
    descriptionTH: 'วางแผน ดำเนินการจัดอบรม และพัฒนาความรู้หลักสูตรมาตรฐานสากล ISO/มาตรฐานอื่น ๆ แก่บุคลากรและลูกค้าภายนอก',
    descriptionEN: 'Manages internal and external training sessions for ISO standards and quality assurance certifications.',
    icon: GraduationCap,
    color: 'bg-white dark:bg-[#071630] border-blue-200 dark:border-sky-500/30 text-gray-800 dark:text-slate-100 hover:border-blue-400 dark:hover:border-sky-400'
  },
  {
    id: 'dept_audit_manager',
    titleTH: 'ผู้จัดการแผนกตรวจสอบและรับรองระบบ',
    titleEN: 'Audit & Certification Dept Manager',
    descriptionTH: 'บริหารการทำงาน จัดสรรตารางการตรวจประเมิน คัดเลือกทีมผู้ตรวจประเมิน และควบคุมดูแลงานระบบวิชาการให้เป็นไปตามมาตรฐาน',
    descriptionEN: 'Oversees audit program schedules, selects audit teams, and coordinates certification project operations.',
    icon: ClipboardCheck,
    color: 'bg-blue-50 dark:bg-[#071d49] border-blue-600 dark:border-sky-500 text-blue-900 dark:text-sky-300 font-bold shadow-sm'
  },
  {
    id: 'dept_doc_control',
    titleTH: 'เจ้าหน้าที่ควบคุมเอกสาร',
    titleEN: 'Document Control Officer',
    descriptionTH: 'ดูแล จัดเก็บ ควบคุมการแจกจ่าย และปรับปรุงแก้ไขเอกสารระบบคุณภาพทั้งหมดของหน่วยรับรองระบบงาน',
    descriptionEN: 'Responsible for maintaining, distributing, and archiving quality documents and records within the certification system.',
    icon: FileText,
    color: 'bg-white dark:bg-[#071630] border-blue-200 dark:border-sky-500/30 text-gray-800 dark:text-slate-100 hover:border-blue-400 dark:hover:border-sky-400'
  },
  {
    id: 'dept_coordinator',
    titleTH: 'เจ้าหน้าที่ประสานงาน',
    titleEN: 'Coordinator Officer',
    descriptionTH: 'ประสานงานอำนวยความสะดวกในการตรวจประเมินระหว่างคณะผู้ตรวจประเมินกับลูกค้าองค์กรเพื่อให้โครงการสำเร็จตรงเวลา',
    descriptionEN: 'Coordinates communications between clients, audit teams, and office managers to facilitate smooth site visits.',
    icon: Users,
    color: 'bg-white dark:bg-[#071630] border-blue-200 dark:border-sky-500/30 text-gray-800 dark:text-slate-100 hover:border-blue-400 dark:hover:border-sky-400'
  },
  {
    id: 'dept_marketing',
    titleTH: 'เจ้าหน้าที่การตลาด',
    titleEN: 'Marketing Officer',
    descriptionTH: 'เสนอขายบริการ แนะนำขอบข่ายการรับรองมาตรฐานสากล ให้ข้อมูลเบื้องต้นแก่ลูกค้า และดูแลฝ่ายลูกค้าสัมพันธ์',
    descriptionEN: 'Handles client inquiries, marketing campaigns, public relations, and provides initial standard scope assessments.',
    icon: TrendingUp,
    color: 'bg-white dark:bg-[#071630] border-blue-200 dark:border-sky-500/30 text-gray-800 dark:text-slate-100 hover:border-blue-400 dark:hover:border-sky-400'
  }
];

const AUDITORS: OrgNode[] = [
  {
    id: 'aud_fsms',
    titleTH: 'ผู้ตรวจประเมินระบบ FSMS',
    titleEN: 'FSMS Auditor',
    descriptionTH: 'คณะผู้ตรวจประเมินที่ได้รับการรับรองความเชี่ยวชาญด้านระบบการจัดการความปลอดภัยของอาหารและสุขอนามัยในการผลิต',
    descriptionEN: 'Certified auditors specializing in food safety management systems, food production, and agricultural hygiene.',
    icon: ShieldCheck,
    color: 'border-blue-200 dark:border-blue-500/30 bg-white/90 dark:bg-[#071630]/90 text-gray-800 dark:text-white',
    bulletsTH: ['GHP', 'HACCP', 'ISO 22000', 'TAS (มกษ.)', 'อย. (FDA)'],
    bulletsEN: ['GHP', 'HACCP', 'ISO 22000', 'TAS (Agricultural)', 'FDA (Thai)']
  },
  {
    id: 'aud_qms',
    titleTH: 'ผู้ตรวจประเมินระบบ QMS',
    titleEN: 'QMS Auditor',
    descriptionTH: 'คณะผู้ตรวจประเมินที่ได้รับรองความสามารถด้านระบบการจัดการคุณภาพและการดำเนินงานของกระบวนการในองค์กร',
    descriptionEN: 'Certified auditors specializing in quality management systems, customer satisfaction, and process control checks.',
    icon: Award,
    color: 'border-indigo-200 dark:border-indigo-500/30 bg-white/90 dark:bg-[#071630]/90 text-gray-800 dark:text-white',
    bulletsTH: ['ISO 9001', 'TISI (มอก.)'],
    bulletsEN: ['ISO 9001', 'TISI (Thai Industry)']
  },
  {
    id: 'aud_ems',
    titleTH: 'ผู้ตรวจประเมินระบบ EMS',
    titleEN: 'EMS Auditor',
    descriptionTH: 'คณะผู้ตรวจประเมินที่มีความเชี่ยวชาญด้านกฎหมายสิ่งแวดล้อม การจัดการขยะ มลพิษ และความยั่งยืนของทรัพยากรธรรมชาติ',
    descriptionEN: 'Certified auditors focusing on environmental laws, waste management, emissions, and environmental sustainability.',
    icon: Leaf,
    color: 'border-emerald-200 dark:border-emerald-500/30 bg-white/90 dark:bg-[#071630]/90 text-gray-800 dark:text-white',
    bulletsTH: ['ISO 14001'],
    bulletsEN: ['ISO 14001']
  },
  {
    id: 'aud_ohs',
    titleTH: 'ผู้ตรวจประเมินระบบ OH&S',
    titleEN: 'OH&S Auditor',
    descriptionTH: 'คณะผู้ตรวจประเมินที่ดูแลความปลอดภัย อาชีวอนามัย สภาพแวดล้อมการทำงาน และการประเมินความเสี่ยงอุบัติเหตุในโรงงาน',
    descriptionEN: 'Certified auditors evaluating workplace health, safety hazards, risk controls, and occupational wellness.',
    icon: Heart,
    color: 'border-teal-200 dark:border-teal-500/30 bg-white/90 dark:bg-[#071630]/90 text-gray-800 dark:text-white',
    bulletsTH: ['ISO 45001'],
    bulletsEN: ['ISO 45001']
  },
  {
    id: 'aud_enms',
    titleTH: 'ผู้ตรวจประเมินระบบ ENMS',
    titleEN: 'ENMS Auditor',
    descriptionTH: 'คณะผู้ตรวจประเมินพลังงาน มุ่งเน้นการปรับปรุงประสิทธิภาพการใช้ไฟฟ้า ความร้อน และพลังงานทางเลือกในอุตสาหกรรม',
    descriptionEN: 'Certified auditors assessing energy efficiency, consumption patterns, and alternative energy systems.',
    icon: Zap,
    color: 'border-purple-200 dark:border-purple-500/30 bg-white/90 dark:bg-[#071630]/90 text-gray-800 dark:text-white',
    bulletsTH: ['ISO 50001'],
    bulletsEN: ['ISO 50001']
  },
  {
    id: 'aud_md',
    titleTH: 'ผู้ตรวจประเมินระบบ MD',
    titleEN: 'MD Auditor',
    descriptionTH: 'คณะผู้ตรวจประเมินที่เชี่ยวชาญการผลิตเครื่องมือแพทย์และอุปกรณ์ทางการแพทย์ให้มีความปลอดภัยสูงสุดและเป็นไปตามกฎหมายสากล',
    descriptionEN: 'Certified auditors inspecting medical device manufacturing processes, product safety, and healthcare legal compliance.',
    icon: Activity,
    color: 'border-rose-200 dark:border-rose-500/30 bg-white/90 dark:bg-[#071630]/90 text-gray-800 dark:text-white',
    bulletsTH: ['ISO 13485'],
    bulletsEN: ['ISO 13485']
  }
];

export default function OrgChart({ settings }: OrgChartProps) {
  const lang = settings.lang;
  const t = (th: string, en: string) => lang === 'TH' ? th : en;

  const [selectedNode, setSelectedNode] = useState<OrgNode | null>(null);
  const [viewMode, setViewMode] = useState<'tree' | 'list'>('tree');

  return (
    <section className="relative overflow-hidden py-10 px-2 md:px-4 border transition-all duration-500 bg-white/40 backdrop-blur-[35px] border-white/40 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] dark:bg-slate-950/45 dark:border-white/10 dark:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.25)] rounded-[2.5rem]">
      {/* Decorative Glows */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[25%] w-[350px] h-[350px] rounded-full bg-blue-500/5 dark:bg-blue-600/5 blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[25%] w-[350px] h-[350px] rounded-full bg-sky-400/5 dark:bg-sky-500/5 blur-[100px]" />
      </div>

      <div className="relative z-10 space-y-8">
        {/* Title matches web theme */}
        <div className="text-center space-y-1.5">
          <motion.h2 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-xl md:text-2xl lg:text-3xl font-display font-bold leading-tight tracking-tight text-slate-900 dark:text-white"
          >
            {t('ผังโครงสร้างองค์กร', 'Organizational Chart')}
          </motion.h2>
          
          <motion.h3 
            initial={{ opacity: 0, y: -5 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-base md:text-lg lg:text-xl font-display font-extrabold leading-tight tracking-wide text-blue-600 dark:text-blue-400 uppercase"
          >
            {t('บริษัท คิว เอ ไอ ซี (ประเทศไทย) จำกัด', 'QAIC (THAILAND) CO., LTD.')}
          </motion.h3>
        </div>

        {/* View Switcher */}
        <div className="flex justify-center">
          <div className="inline-flex p-1 bg-gray-100 dark:bg-[#07132e]/90 rounded-xl border border-gray-200 dark:border-sky-955">
            <button
              onClick={() => setViewMode('tree')}
              className={`px-3.5 py-1.5 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1.5 cursor-pointer border-none ${
                viewMode === 'tree' ? 'bg-blue-650 text-white shadow-sm' : 'text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{t('มุมมองผังโครงสร้าง', 'Tree View')}</span>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3.5 py-1.5 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1.5 cursor-pointer border-none ${
                viewMode === 'list' ? 'bg-blue-650 text-white shadow-sm' : 'text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <ListFilter className="w-3.5 h-3.5" />
              <span>{t('มุมมองรายการย่อย', 'List View')}</span>
            </button>
          </div>
        </div>

        {/* Tree View (Compact sizing & matches web theme color palette) */}
        {viewMode === 'tree' ? (
          <div className="overflow-x-auto pb-6 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-slate-800 scrollbar-track-transparent">
            <div className="md:hidden text-center text-[9px] text-blue-500 font-bold mb-3 animate-pulse uppercase tracking-wider">
              {t('← เลื่อนนิ้วซ้าย-ขวา เพื่อดูผังองค์กรแบบเต็ม →', '← Swipe left/right to view full chart →')}
            </div>

            {/* Fluid container with min-width of 990px to prevent overflow scroll on typical laptops */}
            <div className="w-full min-w-[990px] flex flex-col items-center py-4 relative select-none font-sans">
              
              {/* Level 1: MD & Finance */}
              <div className="relative flex justify-center items-center w-full">
                {/* Managing Director centered */}
                <div className="relative z-10 w-[240px] flex justify-center">
                  <NodeCard node={MANAGING_DIRECTOR} lang={lang} onClick={() => setSelectedNode(MANAGING_DIRECTOR)} />
                </div>

                {/* Connecting Line from MD right to Finance left */}
                <div className="absolute left-[calc(50%+105px)] w-[115px] h-0.5 border-t-2 border-dashed border-blue-500/30 dark:border-sky-500/30 z-0" />

                {/* Finance (Accounting Officer) positioned to the right */}
                <div className="absolute left-[calc(50%+220px)] z-10">
                  <NodeCard node={FINANCE_ACCOUNTING} lang={lang} onClick={() => setSelectedNode(FINANCE_ACCOUNTING)} />
                </div>
              </div>

              {/* Vertical connector from Level 1 MD down to Level 2 QM */}
              <div className="w-0.5 h-8 bg-blue-500/30 dark:bg-sky-500/30 relative z-0" />

              {/* Level 2: QM and advisory left components */}
              <div className="relative flex justify-center items-center w-full">
                
                {/* Left Stack (Advisory / Committees) positioned on the left side */}
                <div className="absolute right-[calc(50%+160px)] flex flex-col gap-4 items-end z-10">
                  {/* Bracket connecting the left stack to the main vertical line */}
                  <div className="absolute right-[-25px] top-[24px] bottom-[24px] w-[25px] border-y-2 border-r-2 border-blue-500/30 dark:border-sky-500/30 rounded-r-lg z-0" />
                  <div className="absolute right-[-55px] top-1/2 -translate-y-1/2 w-[30px] border-t-2 border-blue-500/30 dark:border-sky-500/30 z-0" />
                  
                  <NodeCard node={IMPARTIALITY_COMMITTEE} lang={lang} onClick={() => setSelectedNode(IMPARTIALITY_COMMITTEE)} />
                  <NodeCard node={CERTIFICATION_DECISION_MAKER} lang={lang} onClick={() => setSelectedNode(CERTIFICATION_DECISION_MAKER)} />
                </div>

                {/* Quality Manager (QM) centered */}
                <div className="relative z-10 w-[240px] flex justify-center">
                  <NodeCard node={QUALITY_MANAGER} lang={lang} onClick={() => setSelectedNode(QUALITY_MANAGER)} />
                </div>
              </div>

              {/* Vertical connector line from QM down to Level 3 */}
              <div className="w-0.5 h-10 bg-blue-500/30 dark:bg-sky-500/30 relative z-0">
                {/* Junction dot */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-blue-650 border border-white" />
              </div>

              {/* Level 3: 6 Departments Horizontal Line Connector */}
              <div className="w-[84%] border-t-2 border-blue-500/30 dark:border-sky-500/30 relative z-0" />

              {/* Level 3: 6 Departments cards row */}
              <div className="grid grid-cols-6 gap-2.5 w-full px-2 text-center relative z-10">
                {DEPARTMENTS.map((dept, index) => (
                  <div key={dept.id} className="relative flex flex-col items-center">
                    {/* Horizontal connector lines using our custom border technique */}
                    <div className={`absolute top-0 h-4 border-t-2 border-blue-500/30 dark:border-sky-500/30 ${
                      index === 0 ? 'left-1/2 right-0' :
                      index === 5 ? 'left-0 right-1/2' : 'left-0 right-0'
                    }`} />
                    {/* Vertical drop line to card */}
                    <div className="w-0.5 h-4 bg-blue-500/30 dark:bg-sky-500/30 z-0" />
                    
                    <NodeCard node={dept} lang={lang} onClick={() => setSelectedNode(dept)} />
                  </div>
                ))}
              </div>

              {/* Connecting lines from Audit Manager to Auditors */}
              <div className="w-full flex flex-col items-center">
                {/* Vertical line directly below Audit Dept Manager (3rd card, index 2) */}
                <div className="grid grid-cols-6 w-full px-2">
                  <div className="col-span-2" />
                  <div className="flex flex-col items-center">
                    <div className="w-0.5 h-10 bg-blue-500/30 dark:bg-sky-500/30 relative z-0">
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-blue-650 border border-white" />
                    </div>
                  </div>
                  <div className="col-span-3" />
                </div>

                {/* Level 4: 6 Auditors Horizontal line connector */}
                <div className="w-[84%] border-t-2 border-blue-500/30 dark:border-sky-500/30 relative z-0" />

                {/* Level 4: 6 Auditors cards row */}
                <div className="grid grid-cols-6 gap-2.5 w-full px-2 text-center relative z-10">
                  {AUDITORS.map((aud, index) => (
                    <div key={aud.id} className="relative flex flex-col items-center">
                      {/* Horizontal connector lines */}
                      <div className={`absolute top-0 h-4 border-t-2 border-blue-500/30 dark:border-sky-500/30 ${
                        index === 0 ? 'left-1/2 right-0' :
                        index === 5 ? 'left-0 right-1/2' : 'left-0 right-0'
                      }`} />
                      {/* Vertical drop line */}
                      <div className="w-0.5 h-4 bg-blue-500/30 dark:bg-sky-500/30 z-0" />
                      
                      <NodeCard node={aud} lang={lang} onClick={() => setSelectedNode(aud)} />
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        ) : (
          /* List view (perfect mobile responsive breakdown) */
          <div className="max-w-4xl mx-auto space-y-8 font-sans">
            {/* Executive tier */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 border-b border-gray-200 dark:border-slate-800 pb-2">
                {t('ฝ่ายบริหารระดับสูง & ควบคุมนโยบาย', 'Executive & Governance Board')}
              </h4>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                <ListItemCard node={MANAGING_DIRECTOR} lang={lang} onClick={() => setSelectedNode(MANAGING_DIRECTOR)} />
                <ListItemCard node={FINANCE_ACCOUNTING} lang={lang} onClick={() => setSelectedNode(FINANCE_ACCOUNTING)} />
                <ListItemCard node={QUALITY_MANAGER} lang={lang} onClick={() => setSelectedNode(QUALITY_MANAGER)} />
                <ListItemCard node={IMPARTIALITY_COMMITTEE} lang={lang} onClick={() => setSelectedNode(IMPARTIALITY_COMMITTEE)} />
                <ListItemCard node={CERTIFICATION_DECISION_MAKER} lang={lang} onClick={() => setSelectedNode(CERTIFICATION_DECISION_MAKER)} />
              </div>
            </div>

            {/* Department tier */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 border-b border-gray-200 dark:border-slate-800 pb-2">
                {t('เจ้าหน้าที่แผนกหลักขององค์กร', 'Organizational Departments')}
              </h4>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {DEPARTMENTS.map((dept) => (
                  <ListItemCard key={dept.id} node={dept} lang={lang} onClick={() => setSelectedNode(dept)} />
                ))}
              </div>
            </div>

            {/* Auditors tier */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 border-b border-gray-200 dark:border-slate-800 pb-2">
                {t('คณะผู้ตรวจประเมินระบบมาตรฐาน', 'Registered Standard Auditors')}
              </h4>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {AUDITORS.map((aud) => (
                  <ListItemCard key={aud.id} node={aud} lang={lang} onClick={() => setSelectedNode(aud)} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* POPUP DETAIL MODAL */}
      <AnimatePresence>
        {selectedNode && (
          <div className="fixed inset-0 z-[120] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="w-full max-w-lg bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col relative"
            >
              {/* Header decor */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 to-indigo-500" />
              
              <div className="p-6 flex justify-between items-start border-b border-gray-150 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-900/60">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                    <selectedNode.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-display font-bold text-gray-900 dark:text-white">
                      {t(selectedNode.titleTH, selectedNode.titleEN)}
                    </h3>
                    <p className="text-[10px] text-gray-500 dark:text-slate-500 uppercase tracking-widest font-bold mt-0.5">
                      {t('โครงสร้างองค์กร QAIC THAILAND', 'QAIC THAILAND ORG STRUCTURE')}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedNode(null)}
                  className="p-1.5 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full border-none cursor-pointer text-gray-500 dark:text-slate-400 hover:text-gray-800 dark:hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-6 text-left text-xs text-gray-700 dark:text-slate-350 font-sans leading-relaxed">
                <div className="space-y-2">
                  <span className="text-[9px] font-bold text-blue-600 dark:text-blue-450 uppercase tracking-wider block">
                    {t('บทบาทและขอบข่ายหน้าที่', 'Role & Scope of Responsibility')}
                  </span>
                  <p className="text-gray-650 dark:text-slate-300 text-xs md:text-sm leading-relaxed">
                    {t(selectedNode.descriptionTH, selectedNode.descriptionEN)}
                  </p>
                </div>

                {/* Bullets standards check */}
                {selectedNode.bulletsTH && selectedNode.bulletsTH.length > 0 && (
                  <div className="space-y-3 pt-2 border-t border-gray-150 dark:border-slate-800">
                    <span className="text-[9px] font-bold text-indigo-650 dark:text-indigo-400 uppercase tracking-wider block">
                      {t('มาตรฐานที่ตรวจประเมินระบบงาน', 'Scope of Accreditation Standards')}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {(lang === 'TH' ? selectedNode.bulletsTH : selectedNode.bulletsEN || []).map((std) => (
                        <span 
                          key={std} 
                          className="px-3 py-1 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-850 text-blue-700 dark:text-blue-300 rounded-full text-[10px] font-bold shadow-sm"
                        >
                          {std}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="p-4 border-t border-gray-150 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-900/40 flex justify-end">
                <button
                  onClick={() => setSelectedNode(null)}
                  className="px-5 py-2 bg-white hover:bg-gray-100 dark:bg-slate-850 dark:hover:bg-slate-800 text-gray-700 dark:text-white rounded-xl text-xs font-bold border border-gray-200 dark:border-slate-800 cursor-pointer transition-colors"
                >
                  {t('ปิดหน้าต่าง', 'Close')}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

// Tree view Node Card
interface NodeCardProps {
  node: OrgNode;
  lang: Language;
  onClick: () => void;
}

// List view card node props
interface ListItemCardProps {
  key?: string | number;
  node: OrgNode;
  lang: Language;
  onClick: () => void;
}

function NodeCard({ node, lang, onClick }: NodeCardProps) {
  const isAuditor = node.id.startsWith('aud_');
  const isDept = node.id.startsWith('dept_');
  const isMD = node.id === 'md';
  const isQM = node.id === 'qm';
  const isFinance = node.id === 'finance';
  const isAdvisory = node.id === 'impartiality' || node.id === 'decision_maker';
  
  // Custom widths and heights for display boxes (increased width, reduced vertical height where appropriate to keep it compact)
  let sizeClasses = 'w-[130px] min-h-[75px] p-2.5 text-[9.5px]';
  if (isMD) {
    sizeClasses = 'w-[210px] h-[48px] rounded-full flex items-center justify-center py-2 px-4 text-[10.5px] md:text-[11.5px]';
  } else if (isQM) {
    sizeClasses = 'w-[210px] h-[48px] rounded-2xl flex items-center justify-center py-2 px-4 text-[10px] md:text-[11px]';
  } else if (isFinance) {
    sizeClasses = 'w-[190px] h-[46px] rounded-2xl flex items-center justify-center py-2 px-4 text-[10px] md:text-[11px]';
  } else if (isAdvisory) {
    sizeClasses = 'w-[190px] h-[46px] rounded-2xl flex items-center justify-center py-2 px-4 text-[10px] md:text-[11px]';
  } else if (isAuditor) {
    sizeClasses = 'w-full max-w-[160px] min-h-[135px] p-3 text-[9.5px]';
  } else if (isDept) {
    sizeClasses = 'w-full max-w-[155px] min-h-[82px] p-2.5 text-[9.5px]';
  }

  // Dynamic backgrounds adapting to light/dark themes, blending beautifully with the website's glassmorphism style
  let themeBg = 'bg-white/80 dark:bg-slate-900/50 text-gray-800 dark:text-slate-200';
  let borderClass = 'border-slate-200/80 dark:border-slate-800/60 hover:border-blue-400/60 dark:hover:border-sky-500/40 hover:shadow-md';

  if (isMD) {
    themeBg = 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white';
    borderClass = 'border-blue-500/20 dark:border-blue-500/30 shadow-lg shadow-blue-500/10';
  } else if (isQM) {
    themeBg = 'bg-blue-50/90 dark:bg-blue-950/45 text-blue-900 dark:text-sky-300';
    borderClass = 'border-blue-450/45 dark:border-sky-500/40 shadow-sm';
  } else if (isFinance) {
    themeBg = 'bg-emerald-50/90 dark:bg-emerald-950/45 text-emerald-950 dark:text-emerald-300';
    borderClass = 'border-emerald-450/40 dark:border-emerald-500/45 shadow-sm';
  } else if (isAdvisory) {
    themeBg = 'bg-slate-50/90 dark:bg-slate-900/60 text-slate-850 dark:text-slate-200';
    borderClass = 'border-slate-300/60 dark:border-slate-800 shadow-sm';
  } else if (node.id === 'dept_audit_manager') {
    themeBg = 'bg-blue-50/95 dark:bg-blue-950/50 text-blue-950 dark:text-sky-300 font-bold';
    borderClass = 'border-blue-600/60 dark:border-sky-500/60 shadow-md shadow-blue-500/5';
  } else if (isAuditor) {
    if (node.id === 'aud_fsms') {
      themeBg = 'bg-blue-50/45 dark:bg-blue-950/20 text-blue-950 dark:text-blue-200';
      borderClass = 'border-blue-200 dark:border-blue-500/30 hover:border-blue-400 dark:hover:border-blue-450/50';
    } else if (node.id === 'aud_qms') {
      themeBg = 'bg-indigo-50/45 dark:bg-indigo-950/20 text-indigo-950 dark:text-indigo-200';
      borderClass = 'border-indigo-200 dark:border-indigo-500/30 hover:border-indigo-400 dark:hover:border-indigo-450/50';
    } else if (node.id === 'aud_ems') {
      themeBg = 'bg-emerald-50/45 dark:bg-emerald-950/20 text-emerald-950 dark:text-emerald-200';
      borderClass = 'border-emerald-200 dark:border-emerald-500/30 hover:border-emerald-400 dark:hover:border-emerald-450/50';
    } else if (node.id === 'aud_ohs') {
      themeBg = 'bg-teal-50/45 dark:bg-teal-950/20 text-teal-950 dark:text-teal-200';
      borderClass = 'border-teal-200 dark:border-teal-500/30 hover:border-teal-400 dark:hover:border-teal-450/50';
    } else if (node.id === 'aud_enms') {
      themeBg = 'bg-purple-50/45 dark:bg-purple-950/20 text-purple-950 dark:text-purple-200';
      borderClass = 'border-purple-200 dark:border-purple-500/30 hover:border-purple-400 dark:hover:border-purple-450/50';
    } else if (node.id === 'aud_md') {
      themeBg = 'bg-rose-50/45 dark:bg-rose-950/20 text-rose-950 dark:text-rose-200';
      borderClass = 'border-rose-200 dark:border-rose-500/30 hover:border-rose-400 dark:hover:border-rose-450/50';
    }
  }

  return (
    <div
      onClick={onClick}
      className={`rounded-2xl border flex flex-col justify-between items-center text-center cursor-pointer transition-all duration-200 hover:scale-105 active:scale-[0.98] border-solid ${sizeClasses} ${themeBg} ${borderClass}`}
    >
      <div className={`flex ${isMD || isQM || isFinance || isAdvisory ? 'flex-row gap-2 justify-center' : 'flex-col'} items-center space-y-1 w-full`}>
        {/* Node Icon */}
        <div className={`p-1.5 rounded-lg flex-shrink-0 ${
          isMD ? 'bg-white/10 text-white' : 'bg-blue-500/10 text-blue-600 dark:text-sky-400'
        } ${isMD || isQM || isFinance ? 'mb-1' : ''}`}>
          <node.icon className="w-3.5 h-3.5" />
        </div>

        {/* Node Title */}
        <p className={`font-bold leading-snug line-clamp-2 max-w-full font-display ${
          isMD ? 'text-xs md:text-sm' : 'text-[10px] md:text-xs'
        }`}>
          {lang === 'TH' ? node.titleTH : node.titleEN}
        </p>
      </div>

      {/* Mini details list inside auditor cards */}
      {isAuditor && node.bulletsTH && (
        <div className="flex flex-col gap-0.5 justify-start w-full mt-2 pt-2 border-t border-gray-150 dark:border-slate-800/60 text-left font-sans text-[9.5px]">
          {node.bulletsTH.map((std) => (
            <div key={std} className="flex items-center gap-1 text-gray-700 dark:text-slate-350">
              <span className="w-1 h-1 rounded-full bg-blue-500 dark:bg-sky-400 flex-shrink-0" />
              <span className="truncate">{std}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// List view card node
function ListItemCard({ node, lang, onClick }: ListItemCardProps) {
  const isAuditor = node.id.startsWith('aud_');
  const isMD = node.id === 'md';
  const isQM = node.id === 'qm';
  const isFinance = node.id === 'finance';
  const isAdvisory = node.id === 'impartiality' || node.id === 'decision_maker';

  let bgClass = 'bg-white/85 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 text-gray-850 dark:text-white';
  
  if (isMD) {
    bgClass = 'bg-gradient-to-r from-blue-600 to-indigo-600 border-blue-500/20 text-white shadow-lg shadow-blue-500/10';
  } else if (isQM) {
    bgClass = 'bg-blue-50/90 dark:bg-blue-950/45 border-blue-400/45 dark:border-sky-500/40 text-blue-900 dark:text-sky-300';
  } else if (isFinance) {
    bgClass = 'bg-emerald-50/90 dark:bg-emerald-950/45 border-emerald-450/45 dark:border-emerald-500/40 text-emerald-950 dark:text-emerald-300';
  } else if (isAdvisory) {
    bgClass = 'bg-slate-50/90 dark:bg-slate-900/60 border-slate-300/60 dark:border-slate-800 text-slate-850 dark:text-slate-200';
  } else if (node.id === 'dept_audit_manager') {
    bgClass = 'bg-blue-50/95 dark:bg-blue-950/50 border-blue-600/60 dark:border-sky-500/60 text-blue-950 dark:text-sky-300 font-bold';
  } else if (isAuditor) {
    if (node.id === 'aud_fsms') {
      bgClass = 'bg-blue-50/45 dark:bg-blue-950/20 border-blue-250 dark:border-blue-500/30 text-blue-950 dark:text-blue-200';
    } else if (node.id === 'aud_qms') {
      bgClass = 'bg-indigo-50/45 dark:bg-indigo-950/20 border-indigo-250 dark:border-indigo-500/30 text-indigo-950 dark:text-indigo-200';
    } else if (node.id === 'aud_ems') {
      bgClass = 'bg-emerald-50/45 dark:bg-emerald-950/20 border-emerald-250 dark:border-emerald-500/30 text-emerald-950 dark:text-emerald-200';
    } else if (node.id === 'aud_ohs') {
      bgClass = 'bg-teal-50/45 dark:bg-teal-950/20 border-teal-250 dark:border-teal-500/30 text-teal-950 dark:text-teal-200';
    } else if (node.id === 'aud_enms') {
      bgClass = 'bg-purple-50/45 dark:bg-purple-950/20 border-purple-250 dark:border-purple-500/30 text-purple-950 dark:text-purple-200';
    } else if (node.id === 'aud_md') {
      bgClass = 'bg-rose-50/45 dark:bg-rose-950/20 border-rose-250 dark:border-rose-500/30 text-rose-950 dark:text-rose-200';
    }
  }

  return (
    <div
      onClick={onClick}
      className={`p-4 rounded-2xl flex flex-col justify-between cursor-pointer border transition-all duration-200 hover:scale-102 hover:border-blue-500 hover:shadow-md border-solid ${bgClass}`}
    >
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-xl flex-shrink-0 bg-blue-500/10 dark:bg-white/10 text-blue-600 dark:text-white`}>
            <node.icon className="w-4 h-4" />
          </div>
          <h4 className="font-bold text-sm leading-tight">
            {lang === 'TH' ? node.titleTH : node.titleEN}
          </h4>
        </div>

        <p className="text-[11px] text-gray-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
          {lang === 'TH' ? node.descriptionTH : node.descriptionEN}
        </p>
      </div>

      {isAuditor && node.bulletsTH && (
        <div className="flex flex-wrap gap-1.5 pt-3 mt-3 border-t border-gray-150 dark:border-slate-800/80">
          {(lang === 'TH' ? node.bulletsTH : node.bulletsEN || []).map((std) => (
            <span 
              key={std} 
              className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-gray-50 dark:bg-[#020716] border border-gray-250 dark:border-slate-800 text-blue-650 dark:text-sky-400"
            >
              {std}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center justify-end gap-1 text-[10px] text-blue-600 dark:text-sky-400 font-bold mt-3">
        <span>{lang === 'TH' ? 'ดูรายละเอียด' : 'Details'}</span>
        <ArrowRight className="w-3 h-3" />
      </div>
    </div>
  );
}
