/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Briefcase,
  GraduationCap,
  MapPin,
  Clock,
  DollarSign,
  Send,
  Upload,
  CheckCircle2,
  FileText,
  User,
  Mail,
  Phone,
  ArrowRight,
  ShieldCheck,
  Award,
  Globe,
  Loader2
} from 'lucide-react';
import { UserSettings } from '../types';

interface CareersSectionProps {
  settings: UserSettings;
}

interface JobPosition {
  id: string;
  titleTH: string;
  titleEN: string;
  deptTH: string;
  deptEN: string;
  locationTH: string;
  locationEN: string;
  typeTH: string;
  typeEN: string;
  salaryTH: string;
  salaryEN: string;
  reqsTH: string[];
  reqsEN: string[];
  dutiesTH: string[];
  dutiesEN: string[];
}

export default function CareersSection({ settings }: CareersSectionProps) {
  const lang = settings.lang;
  const t = <T extends any>(th: T, en: T): T => (lang === 'TH' ? th : en);

  const [activeJobId, setActiveJobId] = useState<string | null>(null);
  const [selectedJob, setSelectedJob] = useState<JobPosition | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
    notes: ''
  });

  const jobs: JobPosition[] = [
    {
      id: 'job-1',
      titleTH: 'ผู้ตรวจประเมินระบบงาน / หัวหน้าผู้ตรวจประเมิน (ISO Auditor / Lead Auditor)',
      titleEN: 'ISO Auditor / Lead Auditor',
      deptTH: 'ฝ่ายตรวจประเมินและรับรองระบบงาน',
      deptEN: 'Audit & Certification Department',
      locationTH: 'กรุงเทพฯ (ปฏิบัติงานนอกสถานที่ทั่วประเทศ)',
      locationEN: 'Bangkok (On-site audits nationwide)',
      typeTH: 'งานประจำ / สัญญาจ้างฟรีแลนซ์',
      typeEN: 'Full-time / Freelance Contract',
      salaryTH: 'ตามตกลงและประสบการณ์ (มีค่าเบี้ยเลี้ยงการเดินทาง)',
      salaryEN: 'Competitive based on experience (+ Travel allowances)',
      dutiesTH: [
        'ดำเนินการตรวจประเมินระบบการบริหารงานของลูกค้าตามมาตรฐานสากล (ISO 9001, ISO 14001, ISO 45001, GHP, HACCP, ISO 22000)',
        'จัดทำรายงานผลการตรวจประเมิน (Audit Report) และสรุปประเด็นข้อบกพร่อง (NC/OFI)',
        'ให้คำแนะนำเกี่ยวกับการปิดข้อบกพร่องตามหลักการของหน่วยตรวจรับรองระบบงาน (CB)',
        'ประสานงานร่วมกับฝ่ายวิชาการเพื่อสรุปผลการรับรองระบบของลูกค้า'
      ],
      dutiesEN: [
        'Conduct management system audits in accordance with international standards (ISO 9001, 14001, 45001, GHPs, HACCP, 22000).',
        'Prepare detailed audit reports and summarize non-conformities (NC) and opportunities for improvement (OFI).',
        'Provide clarification on corrective action requirements to clients according to CB policies.',
        'Coordinate with the technical committee to facilitate final certification decisions.'
      ],
      reqsTH: [
        'วุฒิการศึกษาปริญญาตรีขึ้นไป ในสาขาวิทยาศาสตร์, วิศวกรรมศาสตร์, บริหารธุรกิจ หรือสาขาที่เกี่ยวข้อง',
        'ผ่านการฝึกอบรมหลักสูตร ISO Lead Auditor (IRCA Approved) อย่างน้อย 1 มาตรฐาน',
        'มีประสบการณ์การทำงานในอุตสาหกรรมอย่างน้อย 3 ปี หรือมีประสบการณ์ตรวจประเมินระบบงาน CB อย่างน้อย 1 ปี',
        'มีรถยนต์ส่วนบุคคล ใบขับขี่ และสามารถเดินทางไปปฏิบัติงานต่างจังหวัดได้'
      ],
      reqsEN: [
        'Bachelor\'s degree or higher in Science, Engineering, Business Administration, or related fields.',
        'Successfully completed IRCA-approved ISO Lead Auditor training course in at least one standard.',
        'Minimum 3 years of industrial working experience or 1 year of auditing experience in a Certification Body (CB).',
        'Possess a personal vehicle, valid driving license, and willing to travel upcountry.'
      ]
    },
    {
      id: 'job-2',
      titleTH: 'เจ้าหน้าที่ประสานงานและบริการลูกค้า (Client Relations Coordinator)',
      titleEN: 'Client Relations Coordinator',
      deptTH: 'ฝ่ายประสานงานและบริการส่วนหน้า',
      deptEN: 'Coordination & Front Office Department',
      locationTH: 'สำนักงานกรุงเทพฯ (ลาดพร้าว)',
      locationEN: 'Bangkok Office (Lat Phrao)',
      typeTH: 'งานประจำ (จันทร์ - ศุกร์)',
      typeEN: 'Full-time (Mon - Fri)',
      salaryTH: '฿18,000 - ฿28,000 (ตามตกลง)',
      salaryEN: '฿18,000 - ฿28,000 (Negotiable)',
      dutiesTH: [
        'ประสานงานนัดหมายระหว่างผู้ตรวจประเมินและลูกค้าเพื่อจัดทำตารางตรวจ (Audit Schedule)',
        'จัดส่งเอกสารและแบบฟอร์มตรวจสอบความพร้อมก่อนเข้าตรวจให้กับลูกค้า',
        'ดูแลลูกค้าในระบบสมาชิกพอร์ทัล คอยรับเรื่องร้องเรียนและตอบคำถามเบื้องต้น',
        'สนับสนุนการออกใบแจ้งหนี้และติดตามหลักฐานการเงินเบื้องต้น'
      ],
      dutiesEN: [
        'Coordinate schedules between auditors and clients to arrange audit dates.',
        'Distribute documents and prep checklists to clients before the scheduled audit.',
        'Support clients on the portal system, resolving inquiries and basic portal guidance.',
        'Assist in invoice generation and document tracking for the finance team.'
      ],
      reqsTH: [
        'วุฒิการศึกษาปริญญาตรีทุกสาขา (ยินดีรับนักศึกษาจบใหม่)',
        'มีทักษะการสื่อสารและประสานงานที่ดี น้ำเสียงสุภาพ รักงานบริการ',
        'สามารถใช้โปรแกรมพื้นฐาน Office และเครื่องมือสื่อสารออนไลน์ได้ดี',
        'หากมีความรู้พื้นฐานเกี่ยวกับระบบงาน ISO จะได้รับการพิจารณาเป็นพิเศษ'
      ],
      reqsEN: [
        'Bachelor\'s degree in any field (Fresh graduates are welcome).',
        'Excellent communication and coordination skills, service-oriented mind.',
        'Proficient in MS Office suite and online communication tools.',
        'Basic knowledge of ISO standards is a plus.'
      ]
    },
    {
      id: 'job-3',
      titleTH: 'เจ้าหน้าที่ตรวจสอบวิชาการด้านเทคนิค (Technical Reviewer)',
      titleEN: 'Technical Reviewer',
      deptTH: 'คณะกรรมการฝ่ายพิจารณาตัดสินและวิชาการ',
      deptEN: 'Technical Review & Certification Board',
      locationTH: 'กรุงเทพฯ (สามารถทำแบบ Work from Home บางส่วน)',
      locationEN: 'Bangkok (Partial Hybrid WFH)',
      typeTH: 'งานประจำ / สัญญาจ้างรายชิ้นงาน',
      typeEN: 'Full-time / Part-time contract',
      salaryTH: 'ตามตกลงและคุณวุฒิ',
      salaryEN: 'Competitive based on qualifications',
      dutiesTH: [
        'ทบทวนรายงานการตรวจประเมินของคณะผู้ตรวจ เพื่อตรวจทานความถูกต้องตามเกณฑ์ข้อกำหนด',
        'ตรวจสอบความสอดคล้องของการแก้ไขข้อบกพร่อง (NC CAR) ที่ลูกค้าส่งมาเสนอ',
        'จัดทำบันทึกข้อเสนอแนะต่อคณะกรรมการเพื่ออนุมัติการออกใบรับรองระบบงาน',
        'ช่วยควบคุมมาตรฐานเอกสารและจริยธรรมของ CB ตามข้อกำหนด ISO/IEC 17021'
      ],
      dutiesEN: [
        'Review audit reports submitted by audit teams to check conformance with standard clauses.',
        'Evaluate the adequacy and compliance of corrective actions (NC CAR) uploaded by clients.',
        'Formulate technical review conclusions and recommendations for board approvals.',
        'Uphold documentation standards and CB ethics in compliance with ISO/IEC 17021 requirements.'
      ],
      reqsTH: [
        'วุฒิปริญญาตรีขึ้นไป และมีประสบการณ์ทำงานในระบบ CB หรือเป็นผู้ตรวจประเมินระบบงาน (Auditor) อย่างน้อย 5 ปี',
        'มีความเชี่ยวชาญในข้อกำหนดของระบบมาตรฐานอย่างลึกซึ้ง (ISO 9001/145001/GHP/HACCP)',
        'ผ่านการฝึกอบรมหลักสูตร Technical Reviewer หรือเทียบเท่า',
        'มีความละเอียดรอบคอบในการตรวจสอบเอกสารวิชาการสูง'
      ],
      reqsEN: [
        'Bachelor\'s degree or higher, with at least 5 years of CB experience or active auditor background.',
        'Profound knowledge and expertise in standard requirements (ISO 9001/14001/45001/GHPs/HACCP).',
        'Completed Technical Reviewer training or equivalent CB credentials.',
        'High attention to detail in verifying technical and compliance documentations.'
      ]
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      alert(t('กรุณากรอกข้อมูลส่วนตัวที่จำเป็นให้ครบถ้วน', 'Please fill in all required contact info.'));
      return;
    }

    setIsSubmitting(true);
    // Simulate API submission
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
    }, 2000);
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', phone: '', experience: '', notes: '' });
    setResumeFile(null);
    setFormSubmitted(false);
    setSelectedJob(null);
  };

  return (
    <div className="max-w-7xl mx-auto pb-24 px-4 sm:px-6 lg:px-8 relative">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white rounded-[2.5rem] p-8 md:p-12 mb-12 shadow-xl relative overflow-hidden text-center md:text-left">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.18),transparent_60%)] pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-blue-200 text-xs font-bold uppercase tracking-wider">
            <Briefcase className="w-4 h-4" />
            {t('มาร่วมเป็นส่วนหนึ่งกับเรา', 'Join Our Growing Team')}
          </div>
          <h1 className="text-3xl md:text-5xl font-display font-bold leading-tight">
            {t('ร่วมงานกับ QAIC Thailand', 'Careers at QAIC Thailand')}
          </h1>
          <p className="text-xs md:text-sm text-blue-100/80 leading-relaxed font-sans max-w-2xl mx-auto md:mx-0">
            {t(
              'เรากำลังมองหาบุคลากรที่มีความเชี่ยวชาญ รักในมาตรฐาน และกระตือรือร้นที่จะเรียนรู้ เพื่อเข้าร่วมขับเคลื่อนและยกระดับมาตรฐานระบบบริหารจัดการให้กับธุรกิจไทยสู่ระดับสากล',
              'We are looking for dedicated professionals with a passion for quality and compliance to help elevate business standards in Thailand to global recognition.'
            )}
          </p>
        </div>
      </div>

      {/* Grid: Job List vs Advantages */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start mb-16">
        {/* Job Openings */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-display font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-blue-600" />
            {t('ตำแหน่งงานที่เปิดรับสมัคร', 'Current Job Openings')}
          </h2>

          <div className="space-y-4">
            {jobs.map(job => {
              const isOpen = activeJobId === job.id;
              return (
                <div
                  key={job.id}
                  className={`bg-white/40 backdrop-blur-[35px] border rounded-3xl transition-all duration-300 overflow-hidden shadow-sm hover:shadow-md ${
                    isOpen
                      ? 'border-blue-500/30 dark:border-blue-400/30 bg-blue-50/5 dark:bg-slate-900/20'
                      : 'border-white/40 dark:border-white/10'
                  }`}
                >
                  {/* Job Accordion Header */}
                  <button
                    onClick={() => setActiveJobId(isOpen ? null : job.id)}
                    className="w-full p-6 text-left flex items-start justify-between gap-4 cursor-pointer focus:outline-none"
                  >
                    <div className="space-y-2 flex-1">
                      <span className="px-2.5 py-0.5 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 text-[10px] font-bold rounded-lg uppercase tracking-wider">
                        {t(job.deptTH, job.deptEN)}
                      </span>
                      <h3 className="text-sm md:text-base font-bold text-gray-900 dark:text-white leading-snug">
                        {t(job.titleTH, job.titleEN)}
                      </h3>
                      <div className="flex flex-wrap gap-x-4 gap-y-2 text-[10px] text-gray-600 dark:text-slate-400 font-sans">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-gray-400" />
                          {t(job.locationTH, job.locationEN)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-gray-400" />
                          {t(job.typeTH, job.typeEN)}
                        </span>
                      </div>
                    </div>
                    <div className={`mt-2 p-1.5 rounded-full border border-gray-100 dark:border-slate-800 transition-transform duration-200 ${isOpen ? 'rotate-90 text-blue-600' : 'text-gray-400'}`}>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </button>

                  {/* Job Accordion Content */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <div className="px-6 pb-6 border-t border-gray-50/50 dark:border-slate-800/40 pt-6 space-y-6 text-xs text-gray-700 dark:text-slate-350">
                          {/* Salary */}
                          <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-slate-900/50 rounded-2xl border border-gray-100 dark:border-slate-850">
                            <DollarSign className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                            <div>
                              <span className="font-bold text-gray-600 dark:text-slate-500 uppercase text-[9px] block leading-none mb-1">{t('อัตราเงินเดือน', 'Salary')}</span>
                              <span className="font-bold text-gray-900 dark:text-white leading-none">{t(job.salaryTH, job.salaryEN)}</span>
                            </div>
                          </div>

                          {/* Responsibilities */}
                          <div className="space-y-2">
                            <h4 className="font-bold text-gray-900 dark:text-white text-xs">{t('หน้าที่และความรับผิดชอบ:', 'Key Responsibilities:')}</h4>
                            <ul className="list-disc list-inside space-y-1.5 pl-2 leading-relaxed">
                              {t(job.dutiesTH, job.dutiesEN).map((duty, idx) => (
                                <li key={idx}>{duty}</li>
                              ))}
                            </ul>
                          </div>

                          {/* Requirements */}
                          <div className="space-y-2">
                            <h4 className="font-bold text-gray-900 dark:text-white text-xs">{t('คุณสมบัติผู้สมัคร:', 'Job Requirements:')}</h4>
                            <ul className="list-disc list-inside space-y-1.5 pl-2 leading-relaxed">
                              {t(job.reqsTH, job.reqsEN).map((req, idx) => (
                                <li key={idx}>{req}</li>
                              ))}
                            </ul>
                          </div>

                          {/* Action Button */}
                          <div className="pt-4 border-t border-gray-50 dark:border-slate-800 flex justify-end">
                            <button
                              onClick={() => {
                                setSelectedJob(job);
                                const formEl = document.getElementById('apply-form-section');
                                if (formEl) {
                                  formEl.scrollIntoView({ behavior: 'smooth' });
                                }
                              }}
                              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-sm active:scale-95 transition-all cursor-pointer"
                            >
                              <Send className="w-4 h-4" />
                              {t('สมัครตำแหน่งนี้', 'Apply for this position')}
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* Why QAIC */}
        <div className="bg-white/40 backdrop-blur-[35px] border border-white/40 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] dark:bg-slate-900/40 dark:border-white/20 dark:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.2)] p-6 md:p-8 rounded-3xl border shadow-sm space-y-6">
          <h2 className="text-base md:text-lg font-display font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Award className="w-5.5 h-5.5 text-blue-600" />
            {t('ข้อดีในการร่วมงานกับเรา', 'Why Join QAIC?')}
          </h2>

          <div className="space-y-4 font-sans text-xs text-gray-700 dark:text-slate-350 leading-relaxed">
            <div className="flex gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-600 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white text-xs mb-1">{t('ความน่าเชื่อถือระดับสากล', 'Global Standards Expertise')}</h4>
                <p>{t('ได้ร่วมตรวจประเมินระบบงานที่อ้างอิง UKAS ลิขสิทธิ์อังกฤษ เรียนรู้และเติบโตสายวิชาชีพมาตรฐานสากล', 'Work under UKAS accreditation, boosting your career in international standards and regulatory domains.')}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <GraduationCap className="w-5 h-5 text-blue-600 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white text-xs mb-1">{t('สนับสนุนการอบรมพัฒนา', 'Training & Credentials Support')}</h4>
                <p>{t('สนับสนุนการอบรมขึ้นทะเบียน Lead Auditor และการอบรมเฉพาะทางด้านเทคนิคตามข้อกำหนดสากลฟรี', 'Get sponsored for certified Lead Auditor registrations and specialized regulatory training programs.')}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Globe className="w-5 h-5 text-blue-600 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white text-xs mb-1">{t('สภาพแวดล้อมทำงานที่ดี', 'Flexible & Supportive Work Culture')}</h4>
                <p>{t('ทำงานร่วมกันเป็นทีม สนับสนุนความเป็นอิสระและจริยธรรมการตรวจสอบด้วยความโปร่งใส', 'A collaborative work environment that respects professional integrity, transparency, and flexible routines.')}</p>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100 dark:border-slate-800 text-[10px] text-gray-600 dark:text-slate-400">
            <span className="block font-bold mb-1">{t('สอบถามข้อมูลเพิ่มเติมฝ่ายบุคคล', 'HR Inquiries')}</span>
            <span className="block">hr@qaic-thailand.com</span>
            <span className="block">02-123-4567 ต่อ 9</span>
          </div>
        </div>
      </div>

      {/* Application Form Section */}
      <div id="apply-form-section" className="bg-white/40 backdrop-blur-[35px] border border-white/40 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] dark:bg-slate-900/40 dark:border-white/20 dark:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.2)] rounded-[2.5rem] border p-6 md:p-10 shadow-sm max-w-3xl mx-auto space-y-6">
        <div className="text-center max-w-md mx-auto space-y-2">
          <h2 className="text-xl md:text-2xl font-display font-bold text-gray-900 dark:text-white">
            {t('ส่งใบสมัครออนไลน์', 'Apply Online')}
          </h2>
          <p className="text-xs text-gray-700 dark:text-slate-400">
            {t('กรอกรายละเอียดข้อมูลของคุณ และแนบไฟล์ประวัติ (Resume/CV) เพื่อให้เราติดต่อกลับ', 'Submit your details and CV/Resume for review. Our HR team will contact you shortly.')}
          </p>
        </div>

        {formSubmitted ? (
          <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center shadow-inner">
              <CheckCircle2 className="w-8 h-8 animate-bounce" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-gray-900 dark:text-white">{t('ส่งข้อมูลใบสมัครเรียบร้อยแล้ว!', 'Application Submitted!')}</h3>
              <p className="text-xs text-gray-700 dark:text-slate-400 max-w-sm">
                {t('ขอบคุณที่สนใจร่วมงานกับ QAIC Thailand ฝ่ายทรัพยากรบุคคลจะติดต่อกลับคุณทางอีเมลหรือเบอร์โทรศัพท์โดยเร็วที่สุด', 'Thank you for your interest. Our HR team will review your profile and get back to you soon.')}
              </p>
            </div>
            <button
              onClick={resetForm}
              className="px-6 py-2.5 bg-gray-50 border border-gray-200 text-gray-700 text-xs font-bold rounded-xl hover:bg-gray-100 transition-all cursor-pointer"
            >
              {t('ส่งใบสมัครใหม่', 'Apply Again')}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 font-sans text-xs">
            {/* Position Select */}
            <div className="space-y-2">
              <label className="block font-bold text-gray-800 dark:text-slate-200">{t('ตำแหน่งงานที่ต้องการสมัคร *', 'Position Applied *')}</label>
              <select
                required
                className="w-full px-4 py-3 bg-white/50 border border-gray-200 dark:bg-slate-900/50 dark:border-slate-800 rounded-xl focus:outline-none focus:border-blue-500 text-xs"
                value={selectedJob?.id || ''}
                onChange={(e) => {
                  const job = jobs.find(j => j.id === e.target.value);
                  setSelectedJob(job || null);
                }}
              >
                <option value="">-- {t('กรุณาเลือกตำแหน่งงาน', 'Please Select Position')} --</option>
                {jobs.map(job => (
                  <option key={job.id} value={job.id}>{t(job.titleTH, job.titleEN)}</option>
                ))}
                <option value="other">{t('อื่นๆ (ระบุในหมายเหตุ)', 'Other (Specify in notes)')}</option>
              </select>
            </div>

            {/* Name, Email, Phone Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="block font-bold text-gray-800 dark:text-slate-200 flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-gray-400" />
                  {t('ชื่อ-นามสกุล *', 'Full Name *')}
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder={t('ภาษาไทย หรือ อังกฤษ', 'John Doe')}
                  className="w-full px-4 py-3 bg-white/50 border border-gray-200 dark:bg-slate-900/50 dark:border-slate-800 rounded-xl focus:outline-none focus:border-blue-500 text-xs"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <label className="block font-bold text-gray-800 dark:text-slate-200 flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-gray-400" />
                  {t('อีเมลผู้ติดต่อ *', 'Contact Email *')}
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="name@company.com"
                  className="w-full px-4 py-3 bg-white/50 border border-gray-200 dark:bg-slate-900/50 dark:border-slate-800 rounded-xl focus:outline-none focus:border-blue-500 text-xs"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <label className="block font-bold text-gray-800 dark:text-slate-200 flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-gray-400" />
                  {t('เบอร์โทรศัพท์ *', 'Phone Number *')}
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="081-234-5678"
                  className="w-full px-4 py-3 bg-white/50 border border-gray-200 dark:bg-slate-900/50 dark:border-slate-800 rounded-xl focus:outline-none focus:border-blue-500 text-xs"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Experience and Notes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block font-bold text-gray-800 dark:text-slate-200">{t('ประสบการณ์ทำงาน (จำนวนปี)', 'Years of Experience')}</label>
                <input
                  type="text"
                  name="experience"
                  placeholder={t('ตัวอย่าง: 3 ปี ในอุตสาหกรรมผลิตเบเกอรี่', 'e.g. 5 Years')}
                  className="w-full px-4 py-3 bg-white/50 border border-gray-200 dark:bg-slate-900/50 dark:border-slate-800 rounded-xl focus:outline-none focus:border-blue-500 text-xs"
                  value={formData.experience}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <label className="block font-bold text-gray-800 dark:text-slate-200">{t('ข้อมูลแนะนำตัวสั้นๆ / หมายเหตุ', 'Brief Intro / Notes')}</label>
                <textarea
                  name="notes"
                  rows={2}
                  placeholder={t('แนะนำรายละเอียดคุณวุฒิ หรือมาตรฐานที่เป็น Lead Auditor อยู่', 'Highlight certification skills, auditor registration, etc.')}
                  className="w-full px-4 py-3 bg-white/50 border border-gray-200 dark:bg-slate-900/50 dark:border-slate-800 rounded-xl focus:outline-none focus:border-blue-500 text-xs resize-none"
                  value={formData.notes}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Resume Upload Box */}
            <div className="space-y-2">
              <label className="block font-bold text-gray-800 dark:text-slate-200">{t('แนบใบประวัติย่อ (Resume / CV) *', 'Upload Resume / CV *')}</label>
              <div className="border border-dashed border-gray-200 dark:border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center text-center bg-gray-50/50 dark:bg-slate-900/10 hover:bg-gray-100/30 transition-all relative">
                <input
                  type="file"
                  required
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
                <div className="p-3 bg-blue-50 dark:bg-slate-800 rounded-xl text-blue-600 mb-2">
                  <Upload className="w-5 h-5" />
                </div>
                {resumeFile ? (
                  <div className="flex items-center gap-1.5 text-blue-600 font-bold">
                    <FileText className="w-4 h-4" />
                    <span>{resumeFile.name} ({(resumeFile.size / 1024 / 1024).toFixed(2)} MB)</span>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <p className="font-bold text-gray-800 dark:text-slate-200">{t('คลิกเพื่อเลือกไฟล์ หรือลากไฟล์มาวางที่นี่', 'Click to browse or drag and drop file here')}</p>
                    <p className="text-[10px] text-gray-500">{t('รองรับรูปแบบ PDF, DOC, DOCX ขนาดไม่เกิน 5MB', 'Supports PDF, DOC, DOCX up to 5MB')}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-10 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-sm text-xs flex items-center justify-center gap-2 hover:shadow-md cursor-pointer transition-all active:scale-95 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>{t('กำลังส่งเอกสาร...', 'Submitting...')}</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>{t('ส่งใบสมัครร่วมงาน', 'Submit Application')}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
