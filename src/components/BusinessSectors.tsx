/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, 
  Utensils, 
  Cpu, 
  Truck, 
  Flame, 
  HeartPulse, 
  Leaf, 
  FileCheck2, 
  Hammer, 
  Compass, 
  GraduationCap, 
  Layers,
  X,
  ArrowRight,
  Info,
  Award,
  Activity
} from 'lucide-react';
import { UserSettings } from '../types';
import { BUSINESS_SECTORS, BusinessSector } from '../data/businessSectors';

const SECTOR_ICONS: { [key: string]: React.ComponentType<any> } = {
  Zap,
  Utensils,
  Cpu,
  Truck,
  Flame,
  HeartPulse,
  Leaf,
  FileCheck2,
  Hammer,
  Compass,
  GraduationCap,
  Layers
};

const SECTOR_COLORS: { [key: string]: string } = {
  energy: 'from-amber-500/20 to-orange-500/20 text-amber-500 dark:text-amber-400 border-amber-500/30',
  'food-agri': 'from-green-500/20 to-emerald-500/20 text-green-500 dark:text-green-400 border-green-500/30',
  'it-telecom': 'from-blue-500/20 to-indigo-500/20 text-blue-500 dark:text-blue-400 border-blue-500/30',
  logistics: 'from-sky-500/20 to-blue-500/20 text-sky-500 dark:text-sky-400 border-sky-500/30',
  petroleum: 'from-red-500/20 to-orange-500/20 text-red-500 dark:text-red-400 border-red-500/30',
  'medical-health': 'from-rose-500/20 to-pink-500/20 text-rose-500 dark:text-rose-400 border-rose-500/30',
  'env-sustain': 'from-emerald-500/20 to-teal-500/20 text-emerald-500 dark:text-emerald-400 border-emerald-500/30',
  'cert-inspection': 'from-indigo-500/20 to-purple-500/20 text-indigo-500 dark:text-indigo-400 border-indigo-500/30',
  construction: 'from-slate-500/20 to-zinc-500/20 text-slate-600 dark:text-slate-300 border-slate-500/30',
  tourism: 'from-cyan-500/20 to-sky-500/20 text-cyan-500 dark:text-cyan-400 border-cyan-500/30',
  education: 'from-violet-500/20 to-purple-500/20 text-violet-500 dark:text-violet-400 border-violet-500/30',
  others: 'from-gray-500/20 to-slate-500/20 text-gray-500 dark:text-gray-400 border-gray-500/30'
};

interface BusinessSectorsProps {
  settings: UserSettings;
}

export default function BusinessSectors({ settings }: BusinessSectorsProps) {
  const [selectedSector, setSelectedSector] = useState<BusinessSector | null>(null);
  const lang = settings.lang;
  const t = (th: string, en: string) => lang === 'TH' ? th : en;

  const handleCardClick = (sector: BusinessSector) => {
    setSelectedSector(sector);
  };

  const closeModal = () => {
    setSelectedSector(null);
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
          {t('ขอบข่ายธุรกิจที่ให้บริการ', 'SECTORS WE SERVE')}
        </motion.h4>
        
        <motion.h2 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-4xl font-display font-bold leading-tight tracking-tight text-gray-900 dark:text-white"
        >
          {t('การตรวจประเมินตามกลุ่มอุตสาหกรรม', 'Tailored Audit Solutions by Sector')}
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-sm md:text-base text-gray-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed"
        >
          {t('คิวเอไอซี ประเทศไทย ให้บริการตรวจสอบรับรองระบบมาตรฐานสากลครอบคลุมทุกกลุ่มอุตสาหกรรมหลัก เพื่อเพิ่มความเชื่อมั่นและโอกาสการเติบโตอย่างยั่งยืน', 'QAIC Thailand provides global certification and assessment services tailored for all major sectors, enabling sustainable growth and building credibility.')}
        </motion.p>
      </div>

      {/* Grid of Business Sectors */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 px-4 md:px-8">
        {BUSINESS_SECTORS.map((sector, index) => {
          const Icon = SECTOR_ICONS[sector.iconName] || Layers;
          const colorClass = SECTOR_COLORS[sector.id] || 'from-gray-500/20 to-slate-500/20 text-gray-500 dark:text-gray-400';
          
          return (
            <motion.div
              key={sector.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              onClick={() => handleCardClick(sector)}
              className="group bg-white/40 dark:bg-slate-900/40 backdrop-blur-[35px] border border-slate-200/50 dark:border-white/10 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] dark:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.15)] rounded-3xl p-5 hover:bg-white/60 dark:hover:bg-slate-900/60 transition-all duration-300 hover:scale-[1.03] active:scale-95 cursor-pointer flex flex-col justify-between h-48 md:h-52 relative overflow-hidden"
            >
              {/* Card background glow matching icon color */}
              <div className={`absolute -right-4 -bottom-4 w-24 h-24 bg-gradient-to-br ${colorClass.split(' ')[0]} ${colorClass.split(' ')[1]} rounded-full blur-2xl opacity-0 group-hover:opacity-60 transition-all duration-500`} />
              
              <div>
                {/* Icon Squircle */}
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${colorClass.split(' ')[0]} ${colorClass.split(' ')[1]} border ${colorClass.split(' ')[4]} flex items-center justify-center mb-4 text-current`}>
                  <Icon className="w-5 h-5" />
                </div>
                
                {/* Text */}
                <h3 className="text-sm md:text-base font-display font-bold text-gray-900 dark:text-white mb-1.5 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {lang === 'TH' ? sector.titleTH : sector.titleEN}
                </h3>
                <p className="text-[11px] md:text-xs text-gray-500 dark:text-slate-400 line-clamp-2 leading-relaxed font-sans">
                  {lang === 'TH' ? sector.descriptionTH : sector.descriptionEN}
                </p>
              </div>

              {/* Bottom Trigger Indicator */}
              <div className="flex items-center gap-1 text-[10px] md:text-xs font-bold text-blue-650 dark:text-blue-400 uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0 select-none">
                <span>{t('ดูรายละเอียด', 'Learn More')}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Details Modal */}
      <AnimatePresence>
        {selectedSector && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            />
            
            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-[35px] border border-slate-200/50 dark:border-white/10 shadow-[0_25px_50px_rgba(0,0,0,0.3)] rounded-[2.5rem] p-6 md:p-8 overflow-y-auto max-h-[90vh] text-left text-gray-900 dark:text-white"
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-6 right-6 p-2 bg-gray-100 hover:bg-gray-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-gray-550 dark:text-slate-300 rounded-xl transition-all active:scale-95 cursor-pointer border-none"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Header */}
              <div className="flex items-center gap-4 border-b border-gray-150/40 dark:border-slate-800 pb-5 mb-6 pr-8">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${SECTOR_COLORS[selectedSector.id]?.split(' ')[0]} ${SECTOR_COLORS[selectedSector.id]?.split(' ')[1]} border ${SECTOR_COLORS[selectedSector.id]?.split(' ')[4]} flex items-center justify-center text-current`}>
                  {React.createElement(SECTOR_ICONS[selectedSector.iconName] || Layers, { className: 'w-6 h-6' })}
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-display font-bold text-gray-900 dark:text-white">
                    {lang === 'TH' ? selectedSector.titleTH : selectedSector.titleEN}
                  </h3>
                  <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mt-0.5 block">
                    {t('กลุ่มอุตสาหกรรมเป้าหมาย', 'Target Industry Sector')}
                  </span>
                </div>
              </div>

              {/* Content Panels */}
              <div className="space-y-5">
                {/* คืออะไร (What is it?) */}
                <div className="bg-gray-50/50 dark:bg-slate-950/20 border border-gray-150/40 dark:border-slate-800/60 rounded-2xl p-5 relative overflow-hidden">
                  <h4 className="font-display font-bold text-sm text-gray-900 dark:text-white flex items-center gap-2 mb-2">
                    <Info className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span>{t('คืออะไร', 'What is it?')}</span>
                  </h4>
                  <p className="text-xs md:text-sm text-gray-600 dark:text-slate-350 leading-relaxed font-sans">
                    {lang === 'TH' ? selectedSector.whatIsItTH : selectedSector.whatIsItEN}
                  </p>
                </div>

                {/* บทบาท (Role) */}
                <div className="bg-gray-50/50 dark:bg-slate-950/20 border border-gray-150/40 dark:border-slate-800/60 rounded-2xl p-5 relative overflow-hidden">
                  <h4 className="font-display font-bold text-sm text-gray-900 dark:text-white flex items-center gap-2 mb-2">
                    <Activity className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                    <span>{t('บทบาทในอุตสาหกรรม', 'Industry Role')}</span>
                  </h4>
                  <p className="text-xs md:text-sm text-gray-600 dark:text-slate-350 leading-relaxed font-sans">
                    {lang === 'TH' ? selectedSector.roleTH : selectedSector.roleEN}
                  </p>
                </div>

                {/* มาตรฐานที่เกี่ยวข้อง (Related Standards) */}
                <div className="bg-gray-50/50 dark:bg-slate-950/20 border border-gray-150/40 dark:border-slate-800/60 rounded-2xl p-5 relative overflow-hidden">
                  <h4 className="font-display font-bold text-sm text-gray-900 dark:text-white flex items-center gap-2 mb-3">
                    <Award className="w-4 h-4 text-emerald-500 dark:text-emerald-450" />
                    <span>{t('มาตรฐานการรับรองที่เกี่ยวข้อง', 'Related Certifications & Standards')}</span>
                  </h4>
                  
                  <div className="flex flex-wrap gap-2">
                    {(lang === 'TH' ? selectedSector.standardsTH : selectedSector.standardsEN).map((std, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 bg-blue-50/80 hover:bg-blue-100/80 text-blue-750 dark:bg-blue-950/30 dark:hover:bg-blue-900/30 dark:text-blue-400 border border-blue-150/30 dark:border-blue-800/40 rounded-xl text-[10px] md:text-xs font-semibold transition-colors duration-150"
                      >
                        {std}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
