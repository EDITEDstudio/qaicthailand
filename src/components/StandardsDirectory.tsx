/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ISO_STANDARDS } from '../constants';
import { UserSettings } from '../types';
import { 
  Search, 
  Filter, 
  ArrowRight, 
  Grid, 
  List as ListIcon, 
  Info,
  ShieldCheck,
  Zap,
  Leaf,
  Stethoscope,
  Utensils,
  Lock,
  Truck,
  Car,
  Settings
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface StandardsDirectoryProps {
  settings: UserSettings;
}

const CATEGORY_ICONS: { [key: string]: any } = {
  'Quality & Risk': ShieldCheck,
  'Environmental & Energy': Leaf,
  'Health & Safety': Stethoscope,
  'Food Safety & GMP': Utensils,
  'Security & Tech': Lock,
  'Express Certifications': Truck,
};

export default function StandardsDirectory({ settings }: StandardsDirectoryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedStandardId, setSelectedStandardId] = useState<string | null>(null);

  const categories = ['All', ...Array.from(new Set(ISO_STANDARDS.map(s => s.category)))];

  const filteredStandards = ISO_STANDARDS.filter(s => {
    const matchesSearch = 
      s.code.toLowerCase().includes(searchQuery.toLowerCase()) || 
      s.nameTH.toLowerCase().includes(searchQuery.toLowerCase()) || 
      s.nameEN.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || s.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const t = <T extends string | string[]>(th: T, en: T): T => settings.lang === 'TH' ? th : en;

  const selectedStandard = ISO_STANDARDS.find(s => s.id === selectedStandardId);

  return (
    <div className="space-y-8">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-display font-bold text-gray-900 tracking-tight">
            {t('มาตรฐานการรับรองระบบสากล', 'International Certification Standards')}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {t('เลือกชมมาตรฐานที่เราให้บริการครอบคลุมทุกอุตสาหกรรม', 'Browse our comprehensive range of certification standards.')}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-blue-100 text-blue-700' : 'text-gray-400 hover:bg-gray-100'}`}
          >
            <Grid className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-blue-100 text-blue-700' : 'text-gray-400 hover:bg-gray-100'}`}
          >
            <ListIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text"
            placeholder={t('ค้นหามาตรฐาน (เช่น ISO 9001)...', 'Search standards (e.g. ISO 9001)...')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-sans"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                selectedCategory === cat 
                  ? 'bg-gray-900 text-white border-gray-900 shadow-lg shadow-gray-900/10' 
                  : 'bg-white text-gray-500 border-gray-100 hover:border-gray-200'
              }`}
            >
              {cat === 'All' ? t('ทั้งหมด', 'All') : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Standards List/Grid */}
      <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" : "space-y-4"}>
        {filteredStandards.map((std, idx) => {
          const Icon = CATEGORY_ICONS[std.category] || Settings;
          
          if (viewMode === 'grid') {
            return (
              <motion.div
                key={std.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="group relative bg-white p-6 rounded-[2rem] border border-gray-100 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 flex flex-col h-full"
              >
                <div className="mb-6 flex items-center justify-between">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  {std.accreditation.length > 0 && (
                    <div className="flex gap-1">
                      {std.accreditation.map(acc => (
                        <span key={acc} className="text-[8px] font-bold px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded uppercase">
                          {acc}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <h3 className="text-lg font-display font-bold text-gray-900 mb-2">{std.code}</h3>
                <p className="text-xs text-gray-500 font-sans leading-relaxed flex-1 mb-6">
                  {t(std.nameTH, std.nameEN)}
                </p>

                <button 
                  onClick={() => setSelectedStandardId(std.id)}
                  className="w-full py-3 bg-gray-50 text-gray-600 group-hover:bg-blue-600 group-hover:text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2"
                >
                  {t('ดูรายละเอียด', 'View Details')}
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            );
          }

          return (
            <motion.div
              key={std.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4 p-4 bg-white border border-gray-100 rounded-2xl hover:border-blue-200 transition-all group"
            >
              <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-bold text-gray-900">{std.code}</h3>
                <p className="text-xs text-gray-400 font-sans">{t(std.nameTH, std.nameEN)}</p>
              </div>
              <button 
                onClick={() => setSelectedStandardId(std.id)}
                className="px-4 py-2 text-xs font-bold text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
              >
                {t('รายละเอียด', 'Details')}
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* No Results */}
      {filteredStandards.length === 0 && (
        <div className="text-center py-20 bg-gray-50 rounded-[2rem] border border-dashed border-gray-200">
           <Info className="w-12 h-12 text-gray-300 mx-auto mb-4" />
           <p className="text-gray-500 font-sans">{t('ไม่พบข้อมูลมาตรฐานที่ค้นหา', 'No standards found matching your criteria.')}</p>
        </div>
      )}

            {/* Details Modal */}
      <AnimatePresence>
        {selectedStandardId && selectedStandard && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white/95 backdrop-blur-[35px] border border-white/60 shadow-2xl dark:bg-slate-900/95 dark:border-slate-800 w-full max-w-4xl max-h-[90vh] rounded-[2.5rem] overflow-hidden flex flex-col"
            >
              <div className="relative h-48 bg-blue-800 p-10 flex flex-col justify-end">
                <button 
                  onClick={() => setSelectedStandardId(null)}
                  className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/40 backdrop-blur-[35px] border border-white/40 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] dark:bg-slate-900/40 dark:border-white/20 dark:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.2)] text-white rounded-full transition-all"
                >
                  <ArrowRight className="w-5 h-5 rotate-180" />
                </button>
                <div className="flex items-center gap-3 text-blue-400 text-xs font-bold uppercase tracking-widest mb-2">
                   <Zap className="w-4 h-4" />
                   <span>{selectedStandard.category}</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-white tracking-tight">
                  {selectedStandard.code}
                </h2>
              </div>

              <div className="flex-1 overflow-y-auto p-8 md:p-12 space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                   <div className="space-y-6">
                      <h3 className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest border-b border-blue-100 dark:border-blue-900/40 pb-2 flex items-center gap-2">
                        <Info className="w-4 h-4" />
                        {t('ภาพรวมมาตรฐาน', 'Standard Overview')}
                      </h3>
                      <p className="text-xl font-display font-bold text-gray-900 dark:text-white leading-tight">
                        {t(selectedStandard.nameTH, selectedStandard.nameEN)}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-slate-300 font-sans leading-relaxed">
                        {t(selectedStandard.longDescTH, selectedStandard.longDescEN)}
                      </p>
                   </div>
                   <div className="space-y-6">
                      <h3 className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest border-b border-blue-100 dark:border-blue-900/40 pb-2 flex items-center gap-2">
                        <ArrowRight className="w-4 h-4" />
                        {t('ประโยชน์ที่จะได้รับ', 'Key Benefits')}
                      </h3>
                      <ul className="space-y-3">
                        {t(selectedStandard.benefitsTH, selectedStandard.benefitsEN).map((benefit: string, i: number) => (
                           <li key={i} className="flex gap-3 text-sm text-gray-705 dark:text-slate-200 font-sans">
                              <ShieldCheck className="w-5 h-5 text-blue-500 flex-shrink-0" />
                              <span>{benefit}</span>
                           </li>
                        ))}
                      </ul>
                   </div>
                </div>

                <div className="bg-gray-50/90 dark:bg-slate-950/40 rounded-3xl p-8 space-y-6 border border-gray-150/70 dark:border-slate-850">
                    <h3 className="text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-widest text-center">
                      {t('กระบวนการประเมิน', 'Certification Journey')}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                       {t(selectedStandard.stepsTH, selectedStandard.stepsEN).map((step: string, i: number) => (
                          <div key={i} className="bg-white/90 dark:bg-slate-900/60 p-4 rounded-2xl border border-gray-200/50 dark:border-slate-800 shadow-sm">
                             <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 block mb-1">STEP 0{i+1}</span>
                             <p className="text-[11px] text-gray-700 dark:text-slate-350 font-sans leading-snug">{step}</p>
                          </div>
                       ))}
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-6">
                  <div className="flex items-center gap-8">
                     <div className="space-y-1">
                        <span className="text-[10px] font-bold text-gray-550 dark:text-slate-455 uppercase tracking-widest block">Audit Duration</span>
                        <span className="text-lg font-display font-bold text-gray-900 dark:text-white">{selectedStandard.baseDays} Man-Days</span>
                     </div>
                     <div className="w-px h-10 bg-gray-200 dark:bg-slate-800 hidden md:block" />
                     <div className="space-y-1">
                        <span className="text-[10px] font-bold text-gray-555 dark:text-slate-455 uppercase tracking-widest block">Accreditation Seals</span>
                        <div className="flex gap-2">
                           {selectedStandard.accreditation.map(acc => (
                             <span key={acc} className="px-2 py-0.5 bg-gray-900 text-white text-[9px] font-bold rounded uppercase">{acc}</span>
                           ))}
                        </div>
                     </div>
                  </div>
                  <button className="px-8 py-4 bg-blue-600 text-white rounded-2xl text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 active:scale-95">
                    {t('ขอใบเสนอราคาด่วน', 'Request Fast Quote')}
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
