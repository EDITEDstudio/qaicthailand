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
  TrendingUp
} from 'lucide-react';
import { UserSettings } from '../types';

interface AboutSectionProps {
  settings: UserSettings;
}

export default function AboutSection({ settings }: AboutSectionProps) {
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
    <div className={`transition-colors duration-500 rounded-[3rem] p-4 md:p-8 space-y-24 ${localTheme === 'dark' ? 'bg-slate-950 text-slate-100 border border-slate-900 shadow-2xl dark' : 'bg-transparent text-slate-900'}`}>
      
      {/* Theme Toggle Button Bar */}
      <div className="flex justify-end pt-4 pr-4">
        <div className="inline-flex bg-gray-100 dark:bg-slate-900 p-1 rounded-2xl border border-gray-200/50 dark:border-slate-800 shadow-inner">
          <button 
            onClick={() => setLocalTheme('light')} 
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${localTheme === 'light' ? 'bg-white text-blue-600 shadow-sm font-extrabold' : 'text-gray-500 dark:text-gray-400 hover:text-gray-950 dark:hover:text-white'}`}
          >
            ☀️ {t('โหมดสว่าง', 'Light Mode')}
          </button>
          <button 
            onClick={() => setLocalTheme('dark')} 
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${localTheme === 'dark' ? 'bg-slate-800 text-red-500 shadow-sm font-extrabold' : 'text-gray-500 hover:text-gray-950'}`}
          >
            🌙 {t('โหมดมืด', 'Dark Mode')}
          </button>
        </div>
      </div>

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

        {/* Experts Lineup & Floating Badges Container */}
        <div className="relative z-10 max-w-6xl mx-auto min-h-[460px] md:min-h-[580px] flex flex-col justify-end">
          
          {/* SVG Overlay for connecting lines (Desktop only) */}
          <svg 
            className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block" 
            viewBox="0 0 1000 500"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ef4444" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.4" />
              </linearGradient>
            </defs>

            {badgeConnections.map((conn, i) => {
              const isActive = hoveredExpert === conn.expertIdx;
              return (
                <g key={i}>
                  {/* Glowing line shadow on hover */}
                  {isActive && (
                    <line 
                      x1={conn.x} 
                      y1={conn.y + 15} 
                      x2={conn.targetX} 
                      y2={conn.targetY} 
                      stroke={localTheme === 'dark' ? '#ef4444' : '#3b82f6'} 
                      strokeWidth="3.5" 
                      className="opacity-40 blur-sm transition-all duration-300" 
                    />
                  )}
                  {/* Base connector line */}
                  <line 
                    x1={conn.x} 
                    y1={conn.y + 15} 
                    x2={conn.targetX} 
                    y2={conn.targetY} 
                    stroke={isActive ? (localTheme === 'dark' ? '#ef4444' : '#3b82f6') : (localTheme === 'dark' ? '#334155' : '#e2e8f0')} 
                    strokeWidth={isActive ? '2' : '1'} 
                    strokeDasharray={isActive ? 'none' : '4 4'}
                    className="transition-all duration-300"
                  />
                  {/* Connection Node Dot */}
                  <circle 
                    cx={conn.targetX} 
                    cy={conn.targetY} 
                    r={isActive ? '4' : '2.5'} 
                    fill={isActive ? (localTheme === 'dark' ? '#ef4444' : '#3b82f6') : (localTheme === 'dark' ? '#475569' : '#cbd5e1')} 
                    className="transition-all duration-300"
                  />
                </g>
              );
            })}

            {/* Glowing orbital red path matching background */}
            <path 
              d="M 100 420 Q 500 380 900 420" 
              fill="none" 
              stroke="url(#lineGrad)" 
              strokeWidth="2" 
              className="opacity-30 dark:opacity-40" 
            />
          </svg>

          {/* Floating Absolute Badges (Desktop only) */}
          <div className="absolute inset-0 pointer-events-none hidden lg:block">
            {badgeConnections.map((badge, i) => {
              const IconComp = badge.icon;
              const isActive = hoveredExpert === badge.expertIdx;
              return (
                <motion.div
                  key={i}
                  style={{ left: `${badge.x}%`, top: `${badge.y}px` }}
                  className="absolute -translate-x-1/2 z-25 pointer-events-auto"
                >
                  <motion.div
                    className={`flex items-center gap-2.5 px-3.5 py-2 rounded-full border shadow-md transition-all duration-300 bg-white/90 dark:bg-slate-900/90 ${badge.color} ${isActive ? 'scale-108 ring-2 ring-blue-500/20 shadow-lg border-blue-500' : 'opacity-85'}`}
                    onMouseEnter={() => setHoveredExpert(badge.expertIdx)}
                    onMouseLeave={() => setHoveredExpert(null)}
                  >
                    <div className="p-1 rounded-full bg-white dark:bg-slate-950 flex items-center justify-center flex-shrink-0 shadow-sm">
                      <IconComp className="w-4 h-4" />
                    </div>
                    <div className="text-[10px] text-left leading-tight">
                      <p className="font-display font-extrabold uppercase tracking-wider">{t(badge.roleTH, badge.roleEN)}</p>
                      <p className="text-[8.5px] text-gray-450 dark:text-gray-500 truncate max-w-[150px]">{t(badge.descTH, badge.descEN)}</p>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          {/* Expert Characters Standing Row */}
          <div className="flex items-end justify-center -space-x-3 sm:-space-x-6 md:-space-x-10 lg:-space-x-12 px-4 relative z-10 w-full select-none mb-4">
            {experts.map((exp, idx) => {
              const isHovered = hoveredExpert === idx;
              return (
                <motion.div
                  key={exp.id}
                  className={`relative cursor-pointer transition-all duration-300 origin-bottom flex flex-col justify-end ${exp.sizeClass}`}
                  onMouseEnter={() => setHoveredExpert(idx)}
                  onMouseLeave={() => setHoveredExpert(null)}
                  whileHover={{ scale: 1.08, y: -10, zIndex: 30 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                >
                  {/* Ambient Character Highlight Circle (Only on Hover) */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1.2 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        style={{ backgroundColor: exp.glowColor }}
                        className="absolute inset-0 rounded-full blur-2xl pointer-events-none -z-10"
                      />
                    )}
                  </AnimatePresence>

                  {/* Character PNG Image with Mirror capability */}
                  <img
                    src={exp.img}
                    alt={exp.roleTH}
                    className={`w-full h-auto object-contain transition-all duration-300 filter drop-shadow-lg ${exp.mirror ? 'scale-x-[-1]' : ''} ${isHovered ? 'brightness-110 saturate-105' : 'brightness-95 opacity-90'}`}
                  />
                </motion.div>
              );
            })}
          </div>

          {/* COMPLIANCE OS Box - Overlaid in Center Bottom */}
          <div className="relative z-20 mx-auto w-[90%] max-w-sm text-center mb-[-20px] sm:mb-[-15px]">
            <motion.div 
              whileHover={{ y: -4 }}
              className={`rounded-2xl border px-6 py-4 shadow-xl backdrop-blur-md transition-all duration-300 ${localTheme === 'dark' ? 'bg-slate-900/95 border-slate-800 text-white shadow-slate-950/50' : 'bg-white/95 border-gray-150 text-slate-900 shadow-gray-200/50'}`}
            >
              <div className="flex items-center justify-center gap-2 mb-1">
                {/* Standard Stylized Red Q logo */}
                <div className="w-5 h-5 rounded-full bg-red-655 text-white font-display font-black text-xs flex items-center justify-center">Q</div>
                <h4 className="font-display font-bold text-sm uppercase tracking-wider">COMPLIANCE OS</h4>
              </div>
              <p className={`text-[10px] sm:text-xs leading-relaxed ${localTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                {t(
                  'ระบบบริหารจัดการมาตรฐานแบบครบวงจร เชื่อมโยงทุกกระบวนการขององค์กร',
                  'Enterprise Compliance OS - Unifying all organizational standard systems.'
                )}
              </p>
            </motion.div>
          </div>

        </div>

        {/* Stats / Pillars Banner (Exactly matching the bottom of the screenshot) */}
        <div className="relative z-25 max-w-5xl mx-auto mt-12">
          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-8 md:py-10 border rounded-3xl transition-all duration-500 ${localTheme === 'dark' ? 'bg-slate-900/60 border-slate-850/80 text-white shadow-2xl backdrop-blur-md' : 'bg-white border-gray-100/80 text-slate-800 shadow-xl'}`}>
            
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
                <p className={`text-[9.5px] mt-0.5 ${localTheme === 'dark' ? 'text-gray-400' : 'text-gray-400'}`}>{t('ครอบคลุมทุกอุตสาหกรรมทั่วประเทศ', 'Across all industries nationwide')}</p>
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
                <p className={`text-[9.5px] mt-0.5 ${localTheme === 'dark' ? 'text-gray-400' : 'text-gray-400'}`}>{t('ให้บริการจนกว่าลูกค้าจะได้รับการรับรอง', 'Guaranteed certification service')}</p>
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
                <p className={`text-[9.5px] mt-0.5 ${localTheme === 'dark' ? 'text-gray-400' : 'text-gray-400'}`}>{t('ในงานที่ปรึกษาและตรวจประเมิน', 'In consulting & assessment')}</p>
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
                <p className={`text-[9.5px] mt-0.5 ${localTheme === 'dark' ? 'text-gray-400' : 'text-gray-400'}`}>{t('ร่วมพัฒนามาตรฐานกับหน่วยงานต่าง ๆ', 'Supporting national standard dev')}</p>
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
          
          <h2 className="text-3xl md:text-5xl font-display font-bold leading-tight">
            {t('บริษัท คิวเอไอซี (ประเทศไทย) จำกัด', 'QAIC (Thailand) Co., Ltd.')}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <p className={`leading-relaxed font-sans ${localTheme === 'dark' ? 'text-gray-400' : 'text-gray-650'}`}>
                {t(
                  'บริษัท คิวเอไอซี (ประเทศไทย) จำกัด เป็นหน่วยตรวจประเมินรับรองระบบมาตรฐานสากลที่ได้รับความเชื่อถือให้กับสถานประกอบการ องค์กร และหน่วยงานที่นำข้อกำหนดตามมาตรฐานสากลต่างๆ มาประยุกต์ใช้ โดยได้รับการรับรองระบบงานจาก United Kingdom Accreditation Service (UKAS) เลขที่ 46',
                  'QAIC (Thailand) Co., Ltd. is a trusted international certification body for organizations implementing global standards. We are accredited by the United Kingdom Accreditation Service (UKAS), Accredited Body No. 46.'
                )}
              </p>
              <div className={`p-6 rounded-3xl flex items-center gap-6 ${localTheme === 'dark' ? 'bg-slate-900/50 border border-slate-800' : 'bg-gray-50'}`}>
                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center p-3">
                  <img src="/logo.png" alt="UKAS" className="w-full h-auto opacity-90" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Accreditation</p>
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
                  <span key={std} className={`px-3 py-1.5 rounded-full font-medium shadow-sm transition-all ${localTheme === 'dark' ? 'bg-slate-900 text-gray-300 border border-slate-800' : 'bg-white text-gray-700'}`}>
                    {std}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quality Policy Quote */}
      <section className={`rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden transition-all ${localTheme === 'dark' ? 'bg-indigo-950/20 border border-indigo-900/40 text-blue-100' : 'bg-blue-600 text-white'}`}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="relative z-10 max-w-4xl mx-auto space-y-8"
        >
          <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6 ${localTheme === 'dark' ? 'bg-blue-500/20 text-blue-400' : 'bg-white/20 text-white'}`}>
            <BookOpen className="w-6 h-6" />
          </div>
          <h3 className={`text-xs font-bold uppercase tracking-[0.3em] ${localTheme === 'dark' ? 'text-blue-400' : 'text-blue-200'}`}>{t('นโยบายคุณภาพ', 'Quality Policy')}</h3>
          <p className="text-xl md:text-3xl lg:text-4xl font-display font-medium leading-tight">
            “{t(
              'มุ่งมั่นบริการตรวจสอบและรับรองระบบมาตรฐานให้กับลูกค้าอย่างมีคุณภาพ เป็นกลาง น่าเชื่อถือ และเป็นไปตามมาตรฐานสากล ISO/IEC 17021-1 เพื่อสร้างมูลค่าเพิ่มและสนองความพึงพอใจของลูกค้า',
              'Committed to provide quality, impartial, and reliable certification services in accordance with ISO/IEC 17021-1 to create added value and ensure customer satisfaction.'
            )}”
          </p>
        </motion.div>
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[100%] bg-white rounded-full blur-[100px]" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[100%] bg-white rounded-full blur-[100px]" />
        </div>
      </section>

      {/* Execution Plan & KPIs */}
      <section className="grid lg:grid-cols-2 gap-16 items-start px-4 md:px-8">
        <div className="space-y-12">
          <div className="space-y-4">
            <h3 className="text-2xl font-display font-bold">{t('แนวทางการดำเนินงาน', 'Execution Framework')}</h3>
            <p className={`text-sm leading-relaxed ${localTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
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
                <p className={`text-sm leading-relaxed font-sans pt-1.5 ${localTheme === 'dark' ? 'text-gray-300' : 'text-gray-650'}`}>{plan}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={`rounded-[2.5rem] p-8 md:p-12 space-y-10 shadow-2xl ${localTheme === 'dark' ? 'bg-slate-900/40 border border-slate-800 text-white shadow-slate-950/20' : 'bg-gray-900 text-white shadow-blue-900/10'}`}>
          <div className="flex items-center gap-3 border-b border-gray-800 pb-6">
            <div className="p-3 bg-blue-500/20 rounded-xl text-blue-400">
              <BarChart3 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg">{t('วัตถุประสงค์และ KPI', 'Quality Objectives & KPIs')}</h3>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mt-0.5">{t('เป้าหมายที่วัดผลได้ของบริษัท', 'Measurable Corporate Targets')}</p>
            </div>
          </div>
          
          <div className="space-y-6">
            {KPIs.map((kpi, i) => (
              <div key={i} className="flex justify-between items-start gap-4">
                <p className="text-sm text-gray-400 font-sans leading-relaxed">{kpi.label}</p>
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
          <div className={`rounded-[2.5rem] p-8 md:p-12 space-y-8 shadow-sm border ${localTheme === 'dark' ? 'bg-slate-900/20 border-slate-850 text-white shadow-slate-950/20' : 'bg-white border-gray-100 text-slate-900'}`}>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-50 dark:bg-slate-900 rounded-xl text-blue-600 dark:text-blue-400">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-xl">{t('เป้าหมายของเรา', 'Our Strategic Goals')}</h3>
            </div>
            <div className="space-y-6">
              {goals.map((goal, i) => (
                <div key={i} className="flex gap-4">
                  <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <p className={`text-sm leading-relaxed font-sans ${localTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{goal}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Impartiality Policy */}
          <div className={`rounded-[2.5rem] p-8 md:p-12 space-y-8 shadow-sm border ${localTheme === 'dark' ? 'bg-slate-900/20 border-slate-850 text-white shadow-slate-950/20' : 'bg-white border-gray-100 text-slate-900'}`}>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-amber-50 dark:bg-slate-900 rounded-xl text-amber-600 dark:text-amber-400">
                <Scale className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-xl">{t('นโยบายความเป็นกลาง', 'Impartiality Policy')}</h3>
            </div>
            <div className="space-y-6">
              {impartialityPolicies.map((policy, i) => (
                <div key={i} className="flex gap-4">
                  <ShieldCheck className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <p className={`text-sm leading-relaxed font-sans ${localTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{policy}</p>
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
