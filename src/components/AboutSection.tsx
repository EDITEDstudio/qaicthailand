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
 Lock,
 Leaf,
 Factory,
 Shield,
 Activity,
 UserCheck,
 TrendingUp,
 Plus,
 Trash2,
 Edit3,
 X,
 Search,
 Filter
} from 'lucide-react';
import { UserSettings } from '../types';

interface Auditor {
  id: string;
  name: string;
  level: string;
  role: string;
  phone: string;
  email: string;
  status: 'ACTIVE' | 'INACTIVE';
}

const DEFAULT_AUDITORS: Auditor[] = [
  { id: '#AUD-2', name: 'Admin QAIC', level: 'Auditor', role: 'Super Admin', phone: '0989911545', email: 'admin@gmail.com', status: 'ACTIVE' },
  { id: '#AUD-101', name: 'กรรณิการ์ หมื่นหาวงศ์', level: 'Auditor', role: 'Staff', phone: '0817252390', email: 'kannikapakky@gmail.com', status: 'ACTIVE' },
  { id: '#AUD-46', name: 'กัญญาณัฐ ประเสริฐสุข', level: 'Lead Auditor', role: 'Auditor', phone: '0843335072', email: 'kanyanat@qaicthailand.com', status: 'ACTIVE' },
  { id: '#AUD-14', name: 'กันต์ธร เก่งพล', level: 'Lead Auditor', role: 'Auditor', phone: '0816401232', email: 'kanthon@yahoo.com', status: 'ACTIVE' },
  { id: '#AUD-39', name: 'คชภัค วงศ์สินภร', level: 'Lead Auditor', role: 'Auditor', phone: '0846928012', email: 'kachapak@qaicthialand.com', status: 'ACTIVE' },
  { id: '#AUD-50', name: 'ฉัตรชัย จรัสฉิมพลีกุล', level: 'Lead Auditor', role: 'Auditor', phone: '0898104882', email: 'chatchai14@gmail.com', status: 'ACTIVE' },
  { id: '#AUD-54', name: 'ชญาดา เอี่ยมตะโก', level: 'Auditor', role: 'Staff', phone: '081-9087565', email: 'chayada.ple@hotmail.com', status: 'ACTIVE' },
  { id: '#AUD-98', name: 'ชยธร เกตุกลัด', level: 'Auditor', role: 'Auditor', phone: '0863058507', email: 'chayatorn.fluke@gmail.com', status: 'ACTIVE' },
  { id: '#AUD-79', name: 'ชาริณี กีรติโชติ', level: 'Lead Auditor', role: 'Auditor', phone: '087-3903553', email: '-', status: 'ACTIVE' },
  { id: '#AUD-71', name: 'ณภาไร พรมศักดิ์', level: 'Lead Auditor', role: 'Auditor', phone: '090-2534200', email: 'naparai.np@gmail.com', status: 'ACTIVE' },
  { id: '#AUD-20', name: 'ณัฐฐินันท์ เลี่ยนกัตวา', level: 'Lead Auditor', role: 'Auditor', phone: '0814222546', email: 'nutthinanl@gmail.com', status: 'ACTIVE' },
  { id: '#AUD-66', name: 'ณัฐปพล วงศ์วานิช', level: 'Lead Auditor', role: 'Auditor', phone: '064-9893264', email: 'fork5115@hotmail.com', status: 'ACTIVE' },
  { id: '#AUD-86', name: 'ณิชชาภัทร เนตรรัตน์', level: 'Lead Auditor', role: 'Auditor', phone: '0855492397', email: 'Parichat.sopack@gmail.com', status: 'ACTIVE' },
  { id: '#AUD-89', name: 'ดรุณี กรนุ่ม', level: 'Lead Auditor', role: 'Auditor', phone: '0654416942', email: 'darunee.korn@gmail.com', status: 'ACTIVE' },
  { id: '#AUD-4', name: 'ตรัย อาจหาญ', level: 'Lead Auditor', role: 'Auditor', phone: '0863318455', email: 'qa_manager@qaicthailand.com', status: 'ACTIVE' },
  { id: '#AUD-33', name: 'ตรัย อาจหาญ', level: 'Lead Auditor', role: 'Super Admin', phone: '0863318455', email: 'trai9999@gmail.com', status: 'ACTIVE' },
  { id: '#AUD-82', name: 'ทวีศักดิ์ ศรีภูสิตโต', level: 'Lead Auditor', role: 'Auditor', phone: '081 8873576', email: 'iso9001 iso14000', status: 'ACTIVE' },
  { id: '#AUD-21', name: 'ธรรมศักดิ์ พัฒนพ่วง', level: 'Lead Auditor', role: 'Auditor', phone: '080-5832383', email: '-', status: 'ACTIVE' },
  { id: '#AUD-80', name: 'นพกร อุตสาหนันท์', level: 'Lead Auditor', role: 'Auditor', phone: '081-822-3622', email: '-', status: 'ACTIVE' },
  { id: '#AUD-11', name: 'นพวรรณ แพงวิเศษ', level: 'Lead Auditor', role: 'Auditor', phone: '0816293807', email: 'noppawanby@yahoo.com', status: 'ACTIVE' },
  { id: '#AUD-67', name: 'ปกรณ์ แสนจิตต์', level: 'Lead Auditor', role: 'Auditor', phone: '0877640301', email: 'pakorn.qaic@gmail.com', status: 'ACTIVE' },
  { id: '#AUD-75', name: 'ปนัดดา เสนาสุธรรม', level: 'Auditor', role: 'Staff', phone: '0824892426', email: 'panadda.juum@gmail.com', status: 'ACTIVE' },
  { id: '#AUD-84', name: 'ประชา บุญล้อม', level: 'Lead Auditor', role: 'Auditor', phone: '081-8994669', email: 'linemi17@gmail.com', status: 'ACTIVE' },
  { id: '#AUD-87', name: 'ปิยวรรณ อยู่ดี', level: 'Auditor', role: 'Auditor', phone: '0819500933', email: 'piyawan58@gmail.com', status: 'ACTIVE' },
  { id: '#AUD-51', name: 'ภูวิศณุ์ โพธิ์สุข', level: 'Lead Auditor', role: 'Auditor', phone: '0812801135', email: '-', status: 'ACTIVE' },
  { id: '#AUD-96', name: 'รวิชญ์ จิราภรณ์', level: 'Lead Auditor', role: 'Auditor', phone: '064-361-8486', email: 'ravitj8924@gmail.com', status: 'ACTIVE' },
  { id: '#AUD-100', name: 'ละมัยภรณ์ สุดวิลัย', level: 'Auditor', role: 'Staff', phone: '0855486225 / 0935158105', email: 'qaicthailand@gmail.com', status: 'ACTIVE' },
  { id: '#AUD-78', name: 'วิวัฒน์ ตีระวนิชพงศ์', level: 'Lead Auditor', role: 'Auditor', phone: '085-4857756', email: 'wiwatmail@gmail.com', status: 'ACTIVE' },
  { id: '#AUD-95', name: 'ศราวุฒิ เอกบุตร', level: 'Auditor', role: 'Staff', phone: '0829938547', email: 'sarutthakak@gmail.com', status: 'ACTIVE' },
  { id: '#AUD-74', name: 'ศศิโสม โฉมเฉลา', level: 'Lead Auditor', role: 'Auditor', phone: '0808311684', email: 'faiisasisom@gmail.com', status: 'ACTIVE' },
  { id: '#AUD-45', name: 'สมเกียรติ เต็งศิริ', level: 'Lead Auditor', role: 'Auditor', phone: '065-6356355', email: '-', status: 'ACTIVE' },
  { id: '#AUD-58', name: 'สุพัตรา สุขสันติกาล', level: 'Lead Auditor', role: 'Auditor', phone: '0827056675', email: '-', status: 'ACTIVE' },
  { id: '#AUD-49', name: 'สุวิมล ฤทธิ์แสนตอ', level: 'Lead Auditor', role: 'Auditor', phone: '0858294246', email: 'suwimol@qaicthailand.com', status: 'ACTIVE' },
  { id: '#AUD-13', name: 'เจษฏา ฤทธิ์กล้า', level: 'Lead Auditor', role: 'Auditor', phone: '0859110881', email: 'jassada.r@gmail.cm', status: 'ACTIVE' },
  { id: '#AUD-12', name: 'โสภณ ทัศนบรรจง', level: 'Lead Auditor', role: 'Auditor', phone: '0868028520', email: 'jae_sophon@hotmail.com', status: 'ACTIVE' },
  { id: '#AUD-62', name: 'ณิชชาภัทร เนตรรัตน์', level: 'Lead Auditor', role: 'Auditor', phone: '0855492397', email: 'Parichat.sopack@gmail.com', status: 'INACTIVE' }
];

interface AboutSectionProps {
 settings: UserSettings;
 isAdminMode?: boolean;
}

export default function AboutSection({ settings, isAdminMode = false }: AboutSectionProps) {
 const lang = settings.lang;
 const t = (th: string, en: string) => lang === 'TH' ? th : en;

 // Initialize theme based on user settings
 const [localTheme, setLocalTheme] = useState<'light' | 'dark'>('light');
  
  // Auditor registry states
  const [auditors, setAuditors] = useState<Auditor[]>(() => {
    const saved = localStorage.getItem('qaic_auditors');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse auditors:', e);
      }
    }
    return DEFAULT_AUDITORS;
  });

  useEffect(() => {
    localStorage.setItem('qaic_auditors', JSON.stringify(auditors));
  }, [auditors]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [levelFilter, setLevelFilter] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredAuditors = auditors.filter(aud => {
    const term = searchTerm.toLowerCase();
    const matchesSearch = aud.id.toLowerCase().includes(term) || 
                          aud.name.toLowerCase().includes(term) ||
                          aud.phone.includes(term) ||
                          aud.email.toLowerCase().includes(term);
                          
    const matchesStatus = statusFilter === 'ALL' || aud.status === statusFilter;
    const matchesLevel = levelFilter === 'ALL' || aud.level === levelFilter;
    
    return matchesSearch && matchesStatus && matchesLevel;
  });

  const totalPages = Math.ceil(filteredAuditors.length / itemsPerPage);
  
  const paginatedAuditors = filteredAuditors.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAuditor, setEditingAuditor] = useState<Auditor | null>(null);
  
  const [formId, setFormId] = useState('');
  const [formName, setFormName] = useState('');
  const [formLevel, setFormLevel] = useState('Auditor');
  const [formRole, setFormRole] = useState('Auditor');
  const [formPhone, setFormPhone] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formStatus, setFormStatus] = useState<'ACTIVE' | 'INACTIVE'>('ACTIVE');

  const openAuditorForm = (aud: Auditor | null = null) => {
    if (aud) {
      setEditingAuditor(aud);
      setFormId(aud.id);
      setFormName(aud.name);
      setFormLevel(aud.level);
      setFormRole(aud.role);
      setFormPhone(aud.phone);
      setFormEmail(aud.email);
      setFormStatus(aud.status);
    } else {
      setEditingAuditor(null);
      setFormId('');
      setFormName('');
      setFormLevel('Auditor');
      setFormRole('Auditor');
      setFormPhone('');
      setFormEmail('');
      setFormStatus('ACTIVE');
    }
    setIsFormOpen(true);
  };

  const handleSaveAuditor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formId || !formName) {
      alert(t('กรุณากรอกรหัสและชื่อผู้ตรวจประเมิน', 'Please fill in the Auditor ID and Name'));
      return;
    }

    if (editingAuditor) {
      setAuditors(prev => prev.map(aud => {
        if (aud.id === editingAuditor.id) {
          return {
            ...aud,
            name: formName,
            level: formLevel,
            role: formRole,
            phone: formPhone,
            email: formEmail,
            status: formStatus
          };
        }
        return aud;
      }));
    } else {
      if (auditors.some(aud => aud.id.toLowerCase() === formId.toLowerCase())) {
        alert(t('รหัสผู้ตรวจนี้มีอยู่ในระบบแล้ว', 'This Auditor ID already exists'));
        return;
      }
      const newAuditor: Auditor = {
        id: formId,
        name: formName,
        level: formLevel,
        role: formRole,
        phone: formPhone,
        email: formEmail,
        status: formStatus
      };
      setAuditors(prev => [...prev, newAuditor]);
    }
    setIsFormOpen(false);
    setEditingAuditor(null);
  };

  const handleDeleteAuditor = (id: string) => {
    if (confirm(t('คุณต้องการลบผู้ตรวจประเมินนี้ใช่หรือไม่?', 'Are you sure you want to delete this auditor?'))) {
      setAuditors(prev => prev.filter(aud => aud.id !== id));
    }
  };

 useEffect(() => {
 if (settings.theme === 'cyber') {
 setLocalTheme('dark');
 } else {
 setLocalTheme('light');
 }
 }, [settings.theme]);

 // Keep track of which expert is hovered to trigger line and badge highlights
 const [hoveredExpert, setHoveredExpert] = useState<number | null>(null);

 // 9 Experts definition (using our 4 generated assets with mirror flips)
 const experts = [
 { 
 id: 0, 
 roleTH: 'ISO SPECIALIST', 
 roleEN: 'ISO Specialist',
 descTH: 'ผู้เชี่ยวชาญด้านระบบมาตรฐาน ISO', 
 descEN: 'ISO Management System Specialist',
 img: '/expert_male_1.png', 
 icon: Award, 
 color: 'from-red-500 to-rose-600',
 badgeColor: 'border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400',
 glowColor: 'rgba(239, 68, 68, 0.4)',
 sizeClass: 'w-12 sm:w-16 md:w-20 lg:w-24 xl:w-28 h-16 sm:h-24 md:h-32 lg:h-38 xl:h-40',
 mirror: false
 },
 { 
 id: 1, 
 roleTH: 'HACCP CONSULTANT', 
 roleEN: 'HACCP Consultant',
 descTH: 'ผู้เชี่ยวชาญด้านระบบความปลอดภัยอาหาร', 
 descEN: 'Food Safety System Specialist',
 img: '/expert_female_1.png', 
 icon: ShieldCheck, 
 color: 'from-amber-500 to-orange-600',
 badgeColor: 'border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400',
 glowColor: 'rgba(245, 158, 11, 0.4)',
 sizeClass: 'w-14 sm:w-20 md:w-24 lg:w-28 xl:w-32 h-20 sm:h-30 md:h-38 lg:h-44 xl:h-48',
 mirror: false
 },
 { 
 id: 2, 
 roleTH: 'GMP CONSULTANT', 
 roleEN: 'GMP Consultant',
 descTH: 'ผู้เชี่ยวชาญด้านระบบ GMP และการผลิตที่ดี', 
 descEN: 'GMP and Good Manufacturing Practices Expert',
 img: '/expert_female_2.png', 
 icon: Factory, 
 color: 'from-orange-500 to-red-600',
 badgeColor: 'border-orange-500/30 bg-orange-500/10 text-orange-600 dark:text-orange-400',
 glowColor: 'rgba(249, 115, 22, 0.4)',
 sizeClass: 'w-16 sm:w-22 md:w-28 lg:w-32 xl:w-36 h-24 sm:h-34 md:h-44 lg:h-50 xl:h-56',
 mirror: false
 },
 { 
 id: 3, 
 roleTH: 'LEAD AUDITOR', 
 roleEN: 'Lead Auditor',
 descTH: 'ผู้ตรวจประเมินระบบมาตรฐาน', 
 descEN: 'Standard Management Auditor',
 img: '/expert_male_1.png', 
 icon: Shield, 
 color: 'from-blue-500 to-indigo-600',
 badgeColor: 'border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400',
 glowColor: 'rgba(59, 130, 246, 0.4)',
 sizeClass: 'w-18 sm:w-24 md:w-32 lg:w-36 xl:w-40 h-28 sm:h-38 md:h-50 lg:h-56 xl:h-64',
 mirror: true // Mirror flipped to look like a unique expert
 },
 { 
 id: 4, 
 roleTH: 'LEAD AUDITOR', 
 roleEN: 'Lead Auditor (Senior)',
 descTH: 'ผู้ตรวจประเมินระบบมาตรฐานอาวุโส (Lead Auditor)', 
 descEN: 'Senior Lead Management System Auditor',
 img: '/lead_auditor_male.png', 
 icon: UserCheck, 
 color: 'from-indigo-600 to-purple-700',
 badgeColor: 'border-indigo-600/30 bg-indigo-600/10 text-indigo-600 dark:text-indigo-400',
 glowColor: 'rgba(79, 70, 229, 0.6)',
 sizeClass: 'w-20 sm:w-28 md:w-36 lg:w-40 xl:w-44 h-32 sm:h-44 md:h-56 lg:h-64 xl:h-72 z-10',
 mirror: false,
 isCenter: true
 },
 { 
 id: 5, 
 roleTH: 'LEAD AUDITOR', 
 roleEN: 'Lead Auditor',
 descTH: 'ผู้ตรวจประเมินระบบมาตรฐาน', 
 descEN: 'Standard Management Auditor',
 img: '/expert_female_2.png', 
 icon: Shield, 
 color: 'from-blue-500 to-indigo-600',
 badgeColor: 'border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400',
 glowColor: 'rgba(59, 130, 246, 0.4)',
 sizeClass: 'w-18 sm:w-24 md:w-32 lg:w-36 xl:w-40 h-28 sm:h-38 md:h-50 lg:h-56 xl:h-64',
 mirror: true // Mirror flipped
 },
 { 
 id: 6, 
 roleTH: 'FACTORY EXPERT', 
 roleEN: 'Factory Expert',
 descTH: 'ผู้เชี่ยวชาญด้านโรงงานและกระบวนการผลิต', 
 descEN: 'Factory Plant and Industrial Process Expert',
 img: '/expert_male_1.png', 
 icon: Activity, 
 color: 'from-emerald-500 to-teal-600',
 badgeColor: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
 glowColor: 'rgba(16, 185, 129, 0.4)',
 sizeClass: 'w-16 sm:w-22 md:w-28 lg:w-32 xl:w-36 h-24 sm:h-34 md:h-44 lg:h-50 xl:h-56',
 mirror: false
 },
 { 
 id: 7, 
 roleTH: 'PDPA SPECIALIST', 
 roleEN: 'PDPA Specialist',
 descTH: 'ผู้เชี่ยวชาญด้านกฎหมายคุ้มครองข้อมูลส่วนบุคคล (PDPA)', 
 descEN: 'PDPA and Personal Data Protection Law Specialist',
 img: '/expert_female_1.png', 
 icon: Lock, 
 color: 'from-cyan-500 to-blue-600',
 badgeColor: 'border-cyan-500/30 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400',
 glowColor: 'rgba(6, 182, 212, 0.4)',
 sizeClass: 'w-14 sm:w-20 md:w-24 lg:w-28 xl:w-32 h-20 sm:h-30 md:h-38 lg:h-44 xl:h-48',
 mirror: true // Mirror flipped
 },
 { 
 id: 8, 
 roleTH: 'FOOD EXPERT', 
 roleEN: 'Food Expert',
 descTH: 'ผู้เชี่ยวชาญด้านอาหารและโภชนาการ', 
 descEN: 'Food Nutrition and Culinary Quality Expert',
 img: '/expert_female_2.png', 
 icon: Leaf, 
 color: 'from-green-500 to-emerald-600',
 badgeColor: 'border-green-500/30 bg-green-500/10 text-green-600 dark:text-green-400',
 glowColor: 'rgba(34, 197, 94, 0.4)',
 sizeClass: 'w-12 sm:w-16 md:w-20 lg:w-24 xl:w-28 h-16 sm:h-24 md:h-32 lg:h-38 xl:h-40',
 mirror: false
 }
 ];

 // Absolute positioning coords on desktop (1000x500 svg grid coordinates)
 // maps [x, y] of badge and connects to target expert [x, y]
 const badgeConnections = [
 { expertIdx: 0, roleTH: 'ISO SPECIALIST', descTH: 'ผู้เชี่ยวชาญด้านระบบมาตรฐาน ISO', roleEN: 'ISO SPECIALIST', descEN: 'ISO System Expert', icon: Award, x: 80, y: 150, targetX: 130, targetY: 340, color: 'text-red-500 border-red-500/30 bg-red-500/5 dark:bg-red-500/10' },
 { expertIdx: 2, roleTH: 'GMP CONSULTANT', descTH: 'ผู้เชี่ยวชาญด้านระบบ GMP และการผลิตที่ดี', roleEN: 'GMP CONSULTANT', descEN: 'GMP Consultant', icon: Factory, x: 260, y: 180, targetX: 300, targetY: 280, color: 'text-orange-500 border-orange-500/30 bg-orange-500/5 dark:bg-orange-500/10' },
 { expertIdx: 1, roleTH: 'HACCP CONSULTANT', descTH: 'ผู้เชี่ยวชาญด้านระบบความปลอดภัยอาหาร', roleEN: 'HACCP CONSULTANT', descEN: 'HACCP Consultant', icon: ShieldCheck, x: 200, y: 380, targetX: 210, targetY: 320, color: 'text-amber-500 border-amber-500/30 bg-amber-500/5 dark:bg-amber-500/10' },
 { expertIdx: 4, roleTH: 'LEAD AUDITOR', descTH: 'ผู้ตรวจประเมินระบบมาตรฐานอาวุโส (Lead Auditor)', roleEN: 'LEAD AUDITOR', descEN: 'Lead Auditor (Senior)', icon: UserCheck, x: 500, y: 80, targetX: 500, targetY: 200, color: 'text-indigo-500 border-indigo-500/30 bg-indigo-500/5 dark:bg-indigo-500/10' },
 { expertIdx: 6, roleTH: 'FACTORY EXPERT', descTH: 'ผู้เชี่ยวชาญด้านโรงงานและกระบวนการผลิต', roleEN: 'FACTORY EXPERT', descEN: 'Factory Expert', icon: Activity, x: 740, y: 180, targetX: 700, targetY: 280, color: 'text-emerald-500 border-emerald-500/30 bg-emerald-500/5 dark:bg-emerald-500/10' },
 { expertIdx: 7, roleTH: 'PDPA SPECIALIST', descTH: 'ผู้เชี่ยวชาญด้านกฎหมายคุ้มครองข้อมูลส่วนบุคคล (PDPA)', roleEN: 'PDPA SPECIALIST', descEN: 'PDPA Specialist', icon: Lock, x: 800, y: 380, targetX: 790, targetY: 320, color: 'text-cyan-500 border-cyan-500/30 bg-cyan-500/5 dark:bg-cyan-500/10' },
 { expertIdx: 8, roleTH: 'FOOD EXPERT', descTH: 'ผู้เชี่ยวชาญด้านอาหารและโภชนาการ', roleEN: 'FOOD EXPERT', descEN: 'Food Expert', icon: Leaf, x: 920, y: 150, targetX: 870, targetY: 340, color: 'text-green-500 border-green-500/30 bg-green-500/5 dark:bg-green-500/10' }
 ];

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
 
 

 {/* Main Premium Experts Section */}
 <section className="relative overflow-hidden pt-4 pb-12 rounded-[2.5rem] px-4 md:px-8">
 
 {/* Dynamic Backgrounds matching the screenshots */}
 <div className="absolute inset-0 pointer-events-none z-0">
 {localTheme === 'dark' ? (
 <>
 {/* Dark Cyber Background */}
 <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(30,41,59,0.5)_0%,rgba(2,6,23,1)_100%)]" />
 {/* Neon circles and blur glows */}
 <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-blue-600/10 blur-[120px]" />
 <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-red-600/10 blur-[120px]" />
 {/* Network nodes background dots */}
 <svg className="absolute inset-0 w-full h-full opacity-15" xmlns="http://www.w3.org/2000/svg">
 <defs>
 <pattern id="dotGrid" width="30" height="30" patternUnits="userSpaceOnUse">
 <circle cx="2" cy="2" r="1.2" fill="#475569" />
 </pattern>
 </defs>
 <rect width="100%" height="100%" fill="url(#dotGrid)" />
 </svg>
 </>
 ) : (
 <>
 {/* Light Clean Corporate Background */}
 <div className="absolute inset-0 bg-gradient-to-b from-blue-50/40 via-white to-indigo-50/20" />
 <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.06),transparent_60%)]" />
 {/* Soft sky-blue glow */}
 <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-r from-blue-400/5 to-indigo-400/5 rounded-full blur-[80px]" />
 </>
 )}
 </div>

  {/* Section Header */}
  <div className="relative z-10 text-center space-y-4 max-w-4xl mx-auto mb-16 px-4">
    <motion.h4 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-red-500 font-display font-extrabold uppercase tracking-[0.25em] text-xs md:text-sm"
    >
      OUR EXPERTS
    </motion.h4>
    
    <motion.h2 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className={`text-3xl md:text-4xl lg:text-5xl font-display font-bold leading-tight tracking-tight ${localTheme === 'dark' ? 'text-white' : 'text-slate-900'}`}
    >
      {t('ทีมผู้เชี่ยวชาญที่อยู่เบื้องหลัง', 'The Expert Team Behind')}<br />
      <span className="text-red-555 dark:text-red-500">{t('ความสำเร็จของลูกค้ากว่า 500+ องค์กร', 'the Success of 500+ Organizations')}</span>
    </motion.h2>
    
    <motion.p 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className={`text-sm md:text-base max-w-2xl mx-auto leading-relaxed ${localTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}
    >
      {t(
        'ทีมงานของเราประกอบด้วยผู้เชี่ยวชาญหลากหลายสาขา พร้อมให้คำแนะนำอย่างใกล้ชิด ในทุกขั้นตอนของการพัฒนาองค์กรสู่มาตรฐานระดับสากล',
        'Our team consists of experts across multiple disciplines, ready to provide close guidance at every stage of developing your organization to meet global standards.'
      )}
    </motion.p>
  </div>

 {/* Stats / Pillars Banner (Exactly matching the bottom of the screenshot) */}
 <div className="relative z-25 max-w-5xl mx-auto mt-12">
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
 <p key={i} className={`text-sm leading-relaxed font-sans text-gray-800 dark:text-white`}>{policy}</p>
 ))}
 </div>
 </div>
 </div>
 </section>

  {/* Auditor Directory Table Section */}
  <section className="space-y-6 px-4 md:px-8 mt-16 scroll-mt-20">
    <div className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-[35px] border border-slate-200/50 dark:border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.02)] dark:shadow-none p-6 md:p-10 rounded-[2.5rem] relative overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-150/40 dark:border-slate-800 pb-6">
        <div className="text-left">
          <h3 className="text-xl font-display font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <UserCheck className="w-5.5 h-5.5 text-blue-600 dark:text-blue-400" />
            <span>{t('รายชื่อผู้ตรวจประเมิน', 'Auditor Directory')}</span>
          </h3>
          <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">
            {t('ทำเนียบผู้ตรวจประเมินของ คิวเอไอซี ประเทศไทย ที่ได้รับการขึ้นทะเบียนอย่างเป็นทางการ', 'Official registry of registered auditors for QAIC Thailand.')}
          </p>
        </div>
        
        {isAdminMode && (
          <div className="flex gap-2 w-full sm:w-auto">
            <button
              onClick={() => {
                if (confirm(t('คุณต้องการรีเซ็ตรายชื่อผู้ตรวจเป็นค่าเริ่มต้นหรือไม่?', 'Do you want to reset the auditor directory to default?'))) {
                  setAuditors(DEFAULT_AUDITORS);
                  localStorage.setItem('qaic_auditors', JSON.stringify(DEFAULT_AUDITORS));
                }
              }}
              className="px-4 py-2 border border-yellow-500/25 bg-yellow-600/10 text-yellow-750 dark:text-yellow-400 rounded-xl text-xs font-bold uppercase hover:bg-yellow-600/25 transition-all cursor-pointer shadow-sm active:scale-95"
            >
              {t('รีเซ็ตรายชื่อ', 'Reset Registry')}
            </button>
            <button
              onClick={() => openAuditorForm(null)}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-md shadow-emerald-600/10 border-none active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>{t('เพิ่มผู้ตรวจ', 'Add Auditor')}</span>
            </button>
          </div>
        )}
      </div>

      {/* Filters bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
        {/* Search */}
        <div className="relative col-span-1 md:col-span-2">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder={t('ค้นหาจากชื่อ, Auditor ID หรือเบอร์โทร...', 'Search by Name, ID, or Phone...')}
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-slate-950/40 border border-gray-150/60 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-gray-900 dark:text-white"
          />
        </div>
        
        {/* Level Filter */}
        <div>
          <select
            value={levelFilter}
            onChange={(e) => {
              setLevelFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-950/40 border border-gray-150/60 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-gray-900 dark:text-white"
          >
            <option value="ALL">{t('ระดับทั้งหมด', 'All Levels')}</option>
            <option value="Auditor">{t('Auditor', 'Auditor')}</option>
            <option value="Lead Auditor">{t('Lead Auditor', 'Lead Auditor')}</option>
          </select>
        </div>

        {/* Status Filter */}
        <div>
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-950/40 border border-gray-150/60 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-gray-900 dark:text-white"
          >
            <option value="ALL">{t('สถานะทั้งหมด', 'All Statuses')}</option>
            <option value="ACTIVE">{t('ACTIVE (ปฎิบัติงาน)', 'Active')}</option>
            <option value="INACTIVE">{t('INACTIVE (ไม่ได้ปฎิบัติงาน)', 'Inactive')}</option>
          </select>
        </div>
      </div>

      {/* Table grid */}
      <div className="overflow-x-auto mt-6 rounded-2xl border border-gray-150/40 dark:border-slate-800 bg-white/20 dark:bg-slate-950/20">
        <table className="w-full text-left border-collapse text-xs font-sans text-gray-800 dark:text-slate-200">
          <thead>
            <tr className="bg-gray-50/65 dark:bg-slate-900/60 text-gray-700 dark:text-slate-350 font-bold uppercase tracking-wider border-b border-gray-150/40 dark:border-slate-800">
              <th className="py-3 px-4 w-12 text-center">{t('ลำดับ', 'No.')}</th>
              <th className="py-3 px-4 w-28">{t('Auditor ID', 'Auditor ID')}</th>
              <th className="py-3 px-4">{t('Auditor Profile', 'Auditor Profile')}</th>
              <th className="py-3 px-4 w-36">{t('Level / Role', 'Level / Role')}</th>
              <th className="py-3 px-4">{t('Contact Details', 'Contact Details')}</th>
              <th className="py-3 px-4 w-24 text-center">{t('Status', 'Status')}</th>
              {isAdminMode && <th className="py-3 px-4 w-24 text-center">{t('จัดการ', 'Actions')}</th>}
            </tr>
          </thead>
          <tbody>
            {paginatedAuditors.length > 0 ? (
              paginatedAuditors.map((aud, index) => {
                const globalIndex = (currentPage - 1) * itemsPerPage + index + 1;
                return (
                  <tr 
                    key={aud.id + '-' + index} 
                    className="border-b border-gray-150/20 dark:border-slate-800/40 hover:bg-gray-50/40 dark:hover:bg-slate-900/30 transition-colors"
                  >
                    <td className="py-3 px-4 text-center font-bold text-gray-500">{globalIndex}</td>
                    <td className="py-3 px-4 font-mono font-bold text-blue-600 dark:text-blue-450">{aud.id}</td>
                    <td className="py-3 px-4 font-semibold text-gray-900 dark:text-white text-left">{aud.name}</td>
                    <td className="py-3 px-4 text-left">
                      <div className="space-y-0.5">
                        <span className={`inline-flex px-2 py-0.5 rounded-full text-[9px] font-bold ${
                          aud.level === 'Lead Auditor' 
                            ? 'bg-purple-50 text-purple-600 dark:bg-purple-950/20 dark:text-purple-400 border border-purple-100/30'
                            : 'bg-blue-50 text-blue-600 dark:bg-blue-950/20 dark:text-blue-400 border border-blue-100/30'
                        }`}>
                          {aud.level}
                        </span>
                        <p className="text-[10px] text-gray-505 dark:text-slate-400 font-medium">{aud.role}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-left">
                      <div className="space-y-0.5 text-gray-750 dark:text-slate-300 font-sans">
                        <p className="font-semibold">{aud.phone}</p>
                        {aud.email && aud.email !== '-' && (
                          <p className="text-[10px] text-gray-500 dark:text-slate-400 truncate max-w-[170px]">{aud.email}</p>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-[9px] font-bold ${
                        aud.status === 'ACTIVE'
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                          : 'bg-red-500/10 text-red-650 dark:text-red-400 border border-red-500/20'
                      }`}>
                        {aud.status}
                      </span>
                    </td>
                    {isAdminMode && (
                      <td className="py-3 px-4 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => openAuditorForm(aud)}
                            className="p-1.5 bg-blue-50 hover:bg-blue-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-blue-600 dark:text-blue-400 rounded-lg transition-all border-none cursor-pointer"
                            title={t('แก้ไข', 'Edit')}
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteAuditor(aud.id)}
                            className="p-1.5 bg-red-50 hover:bg-red-100 dark:bg-slate-850 dark:hover:bg-red-950/20 text-red-600 dark:text-red-450 rounded-lg transition-all border-none cursor-pointer"
                            title={t('ลบ', 'Delete')}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={isAdminMode ? 7 : 6} className="py-10 text-center text-gray-500 dark:text-slate-400 font-sans">
                  {t('ไม่พบข้อมูลผู้ตรวจประเมินตามตัวกรอง', 'No auditors found matching the filter criteria.')}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between gap-4 mt-6 bg-gray-50/50 dark:bg-slate-950/20 p-4 rounded-2xl border border-gray-150/40 dark:border-slate-850">
          <span className="text-[10px] font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider font-sans">
            {t(
              `แสดงหน้า ${currentPage} จากทั้งหมด ${totalPages} หน้า (จำนวนผู้ตรวจ ${filteredAuditors.length} คน)`,
              `Showing page ${currentPage} of ${totalPages} (${filteredAuditors.length} auditors)`
            )}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3.5 py-2 bg-white dark:bg-slate-800 text-gray-700 dark:text-slate-200 border border-gray-200 dark:border-slate-700 disabled:opacity-50 disabled:pointer-events-none rounded-xl text-xs font-bold cursor-pointer transition-all active:scale-95 border-none"
            >
              {t('ก่อนหน้า', 'Previous')}
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3.5 py-2 bg-white dark:bg-slate-800 text-gray-700 dark:text-slate-200 border border-gray-200 dark:border-slate-700 disabled:opacity-50 disabled:pointer-events-none rounded-xl text-xs font-bold cursor-pointer transition-all active:scale-95 border-none"
            >
              {t('ถัดไป', 'Next')}
            </button>
          </div>
        </div>
      )}
    </div>
  </section>

  {/* AUDITOR ADD/EDIT FORM MODAL */}
  {isFormOpen && (
    <div className="fixed inset-0 z-[120] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl shadow-2xl flex flex-col">
        <div className="p-6 border-b border-gray-150 dark:border-slate-800 flex justify-between items-center bg-gray-50/50 dark:bg-slate-900/50 rounded-t-3xl text-left">
          <h3 className="text-base font-display font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-emerald-500 animate-pulse" />
            <span>{editingAuditor ? t('แก้ไขข้อมูลผู้ตรวจประเมิน', 'Edit Auditor Details') : t('เพิ่มผู้ตรวจประเมินใหม่', 'Add New Auditor')}</span>
          </h3>
          <button 
            onClick={() => setIsFormOpen(false)}
            className="p-1.5 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full border-none cursor-pointer text-gray-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSaveAuditor} className="p-6 space-y-4 text-left font-sans text-xs">
          <div className="grid grid-cols-2 gap-4">
            {/* Auditor ID */}
            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold text-gray-650 dark:text-slate-400 uppercase tracking-wider">{t('Auditor ID', 'Auditor ID')}</label>
              <input
                type="text"
                required
                placeholder="e.g. #AUD-102"
                value={formId}
                onChange={(e) => setFormId(e.target.value)}
                disabled={!!editingAuditor}
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-850 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm dark:text-white disabled:opacity-50 font-sans"
              />
            </div>

            {/* Status */}
            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold text-gray-655 dark:text-slate-400 uppercase tracking-wider">{t('สถานะการปฎิบัติงาน', 'Status')}</label>
              <select
                value={formStatus}
                onChange={(e) => setFormStatus(e.target.value as any)}
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-855 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm dark:text-white font-sans"
              >
                <option value="ACTIVE">ACTIVE (ปฎิบัติงาน)</option>
                <option value="INACTIVE">INACTIVE (ไม่ได้ปฎิบัติงาน)</option>
              </select>
            </div>
          </div>

          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="block text-[10px] font-bold text-gray-650 dark:text-slate-400 uppercase tracking-wider">{t('ชื่อ-นามสกุล', 'Full Name')}</label>
            <input
              type="text"
              required
              placeholder={t('พิมพ์ชื่อ-นามสกุลผู้ตรวจ...', 'Enter auditor full name...')}
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-850 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm dark:text-white font-sans"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Level */}
            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold text-gray-650 dark:text-slate-400 uppercase tracking-wider">{t('ระดับ (Level)', 'Level')}</label>
              <select
                value={formLevel}
                onChange={(e) => setFormLevel(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-850 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm dark:text-white font-sans"
              >
                <option value="Auditor">Auditor</option>
                <option value="Lead Auditor">Lead Auditor</option>
              </select>
            </div>

            {/* Role */}
            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold text-gray-650 dark:text-slate-400 uppercase tracking-wider">{t('ตำแหน่งงาน (Role)', 'Role')}</label>
              <input
                type="text"
                required
                placeholder="e.g. Auditor, Staff, Super Admin"
                value={formRole}
                onChange={(e) => setFormRole(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-855 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm dark:text-white font-sans"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Phone */}
            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold text-gray-650 dark:text-slate-400 uppercase tracking-wider">{t('เบอร์โทรศัพท์', 'Phone Number')}</label>
              <input
                type="text"
                required
                placeholder="e.g. 081-XXXXXXX"
                value={formPhone}
                onChange={(e) => setFormPhone(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-850 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm dark:text-white font-sans"
              />
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold text-gray-655 dark:text-slate-400 uppercase tracking-wider">{t('อีเมล', 'Email')}</label>
              <input
                type="text"
                placeholder="e.g. auditor@gmail.com"
                value={formEmail}
                onChange={(e) => setFormEmail(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-955 border border-gray-200 dark:border-slate-855 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm dark:text-white font-sans"
              />
            </div>
          </div>

          {/* Form buttons */}
          <div className="pt-4 border-t border-gray-150 dark:border-slate-850 flex items-center justify-end gap-2 bg-gray-50/50 dark:bg-slate-900/50 p-4 -mx-6 -mb-6 rounded-b-3xl">
            <button
              type="button"
              onClick={() => setIsFormOpen(false)}
              className="px-5 py-2.5 bg-white dark:bg-slate-800 text-gray-700 dark:text-slate-350 border border-gray-200 dark:border-slate-700 rounded-xl text-xs font-bold cursor-pointer"
            >
              {t('ยกเลิก', 'Cancel')}
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold cursor-pointer border-none shadow-md shadow-blue-600/10"
            >
              {t('บันทึกข้อมูล', 'Save')}
            </button>
          </div>
        </form>
      </div>
    </div>
  )}

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
