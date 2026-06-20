/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ISO_STANDARDS } from '../constants';
import { UserSettings } from '../types';
import { ISOStandard } from '../types';
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
  Settings,
  Award,
  Plus,
  Edit3,
  Trash2,
  X,
  MapPin,
  Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface StandardsDirectoryProps {
  settings: UserSettings;
  isAdminMode?: boolean;
}

const CATEGORY_ICONS: { [key: string]: any } = {
  'Quality & Risk': ShieldCheck,
  'Environmental & Energy': Leaf,
  'Health & Safety': Stethoscope,
  'Food Safety & GMP': Utensils,
  'Security & Tech': Lock,
  'Express Certifications': Truck,
};

export default function StandardsDirectory({ settings, isAdminMode = false }: StandardsDirectoryProps) {
  // Load initial state from LocalStorage
  const [standards, setStandards] = useState<ISOStandard[]>(() => {
    const saved = localStorage.getItem('qaic_standards');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse standards from localStorage:', e);
      }
    }
    return ISO_STANDARDS;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedStandardId, setSelectedStandardId] = useState<string | null>(null);

  // Admin states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingStandard, setEditingStandard] = useState<ISOStandard | null>(null);

  // Form states
  const [formCode, setFormCode] = useState('');
  const [formCategory, setFormCategory] = useState('Quality & Risk');
  const [formAccreditation, setFormAccreditation] = useState<string[]>([]);
  const [formBaseCost, setFormBaseCost] = useState(20000);
  const [formBaseDays, setFormBaseDays] = useState(3);
  
  const [formNameTH, setFormNameTH] = useState('');
  const [formNameEN, setFormNameEN] = useState('');
  const [formShortDescTH, setFormShortDescTH] = useState('');
  const [formShortDescEN, setFormShortDescEN] = useState('');
  const [formLongDescTH, setFormLongDescTH] = useState('');
  const [formLongDescEN, setFormLongDescEN] = useState('');
  
  const [formWhatIsItTH, setFormWhatIsItTH] = useState('');
  const [formWhatIsItEN, setFormWhatIsItEN] = useState('');
  const [formBenefitsTH, setFormBenefitsTH] = useState('');
  const [formBenefitsEN, setFormBenefitsEN] = useState('');
  const [formPrinciplesTH, setFormPrinciplesTH] = useState('');
  const [formPrinciplesEN, setFormPrinciplesEN] = useState('');
  const [formKeyPointsTH, setFormKeyPointsTH] = useState('');
  const [formKeyPointsEN, setFormKeyPointsEN] = useState('');
  const [formStepsTH, setFormStepsTH] = useState('');
  const [formStepsEN, setFormStepsEN] = useState('');

  const categories = ['All', ...Array.from(new Set(standards.map(s => s.category)))];

  const filteredStandards = standards.filter(s => {
    const matchesSearch = 
      s.code.toLowerCase().includes(searchQuery.toLowerCase()) || 
      s.nameTH.toLowerCase().includes(searchQuery.toLowerCase()) || 
      s.nameEN.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || s.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const t = <T extends string | string[]>(th: T, en: T): T => settings.lang === 'TH' ? th : en;

  const selectedStandard = standards.find(s => s.id === selectedStandardId);

  const whatIsIt = selectedStandard ? (t(selectedStandard.whatIsItTH || '', selectedStandard.whatIsItEN || '') || t(selectedStandard.longDescTH, selectedStandard.longDescEN)) : '';
  const benefitsDetailed = selectedStandard ? ((selectedStandard.benefitsDetailedTH && selectedStandard.benefitsDetailedEN) 
    ? t(selectedStandard.benefitsDetailedTH, selectedStandard.benefitsDetailedEN)
    : t(selectedStandard.benefitsTH, selectedStandard.benefitsEN)) : [];
  const principlesDetailed = selectedStandard ? ((selectedStandard.principlesTH && selectedStandard.principlesEN)
    ? t(selectedStandard.principlesTH, selectedStandard.principlesEN)
    : t(selectedStandard.stepsTH, selectedStandard.stepsEN)) : [];
  const keyPointsDetailed = selectedStandard ? ((selectedStandard.keyPointsTH && selectedStandard.keyPointsEN)
    ? t(selectedStandard.keyPointsTH, selectedStandard.keyPointsEN)
    : []) : [];

  // Form utilities
  const openForm = (std: ISOStandard | null) => {
    if (std) {
      setEditingStandard(std);
      setFormCode(std.code);
      setFormCategory(std.category);
      setFormAccreditation(std.accreditation);
      setFormBaseCost(std.baseCost);
      setFormBaseDays(std.baseDays);
      setFormNameTH(std.nameTH);
      setFormNameEN(std.nameEN);
      setFormShortDescTH(std.shortDescTH);
      setFormShortDescEN(std.shortDescEN);
      setFormLongDescTH(std.longDescTH);
      setFormLongDescEN(std.longDescEN);
      setFormWhatIsItTH(std.whatIsItTH || '');
      setFormWhatIsItEN(std.whatIsItEN || '');
      setFormBenefitsTH((std.benefitsDetailedTH || std.benefitsTH || []).join('\n'));
      setFormBenefitsEN((std.benefitsDetailedEN || std.benefitsEN || []).join('\n'));
      setFormPrinciplesTH((std.principlesTH || std.stepsTH || []).join('\n'));
      setFormPrinciplesEN((std.principlesEN || std.stepsEN || []).join('\n'));
      setFormKeyPointsTH((std.keyPointsTH || []).join('\n'));
      setFormKeyPointsEN((std.keyPointsEN || []).join('\n'));
      setFormStepsTH((std.stepsTH || []).join('\n'));
      setFormStepsEN((std.stepsEN || []).join('\n'));
    } else {
      setEditingStandard(null);
      setFormCode('');
      setFormCategory('Quality & Risk');
      setFormAccreditation(['UKAS']);
      setFormBaseCost(20000);
      setFormBaseDays(3);
      setFormNameTH('');
      setFormNameEN('');
      setFormShortDescTH('');
      setFormShortDescEN('');
      setFormLongDescTH('');
      setFormLongDescEN('');
      setFormWhatIsItTH('');
      setFormWhatIsItEN('');
      setFormBenefitsTH('');
      setFormBenefitsEN('');
      setFormPrinciplesTH('');
      setFormPrinciplesEN('');
      setFormKeyPointsTH('');
      setFormKeyPointsEN('');
      setFormStepsTH('ขั้นตอนที่ 1: ตรวจประเมินเบื้องต้น (Initial Audit)\nขั้นตอนที่ 2: ตรวจประเมินหน้างาน (On-site Audit)\nขั้นตอนที่ 3: ออกใบรับรองระบบ (Certification Issue)\nขั้นตอนที่ 4: ตรวจรักษาระบบประจำปี (Surveillance Audit)');
      setFormStepsEN('Step 1: Document Review & Planning\nStep 2: On-site Certification Audit\nStep 3: Verification & Certificate Issue\nStep 4: Annual Surveillance Auditing');
    }
    setIsFormOpen(true);
  };

  const handleSaveStandard = (e: React.FormEvent) => {
    e.preventDefault();
    
    const accArray = formAccreditation.filter(a => ['UKAS', 'NAC', 'IATF', 'QAIC-Group'].includes(a)) as any[];

    const updatedStd: ISOStandard = {
      id: editingStandard ? editingStandard.id : 'iso-' + formCode.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      code: formCode,
      category: formCategory,
      accreditation: accArray,
      baseCost: Number(formBaseCost),
      baseDays: Number(formBaseDays),
      nameTH: formNameTH,
      nameEN: formNameEN,
      shortDescTH: formShortDescTH,
      shortDescEN: formShortDescEN,
      longDescTH: formLongDescTH,
      longDescEN: formLongDescEN,
      whatIsItTH: formWhatIsItTH,
      whatIsItEN: formWhatIsItEN,
      benefitsTH: formBenefitsTH.split('\n').filter(x => x.trim() !== '').slice(0, 4), // Fallback array max 4
      benefitsEN: formBenefitsEN.split('\n').filter(x => x.trim() !== '').slice(0, 4),
      benefitsDetailedTH: formBenefitsTH.split('\n').filter(x => x.trim() !== ''),
      benefitsDetailedEN: formBenefitsEN.split('\n').filter(x => x.trim() !== ''),
      principlesTH: formPrinciplesTH.split('\n').filter(x => x.trim() !== ''),
      principlesEN: formPrinciplesEN.split('\n').filter(x => x.trim() !== ''),
      keyPointsTH: formKeyPointsTH.split('\n').filter(x => x.trim() !== ''),
      keyPointsEN: formKeyPointsEN.split('\n').filter(x => x.trim() !== ''),
      stepsTH: formStepsTH.split('\n').filter(x => x.trim() !== ''),
      stepsEN: formStepsEN.split('\n').filter(x => x.trim() !== '')
    };

    let newStandards: ISOStandard[];
    if (editingStandard) {
      newStandards = standards.map(s => s.id === editingStandard.id ? updatedStd : s);
    } else {
      newStandards = [...standards, updatedStd];
    }

    setStandards(newStandards);
    localStorage.setItem('qaic_standards', JSON.stringify(newStandards));
    setIsFormOpen(false);
    setSelectedStandardId(null);
  };

  const handleDeleteStandard = (standardId: string) => {
    if (confirm(t('คุณต้องการลบมาตรฐานนี้ใช่หรือไม่?', 'Are you sure you want to delete this standard?'))) {
      const newStandards = standards.filter(s => s.id !== standardId);
      setStandards(newStandards);
      localStorage.setItem('qaic_standards', JSON.stringify(newStandards));
      setSelectedStandardId(null);
    }
  };

  const handleRestoreDefaults = () => {
    if (confirm(t('คุณต้องการคืนค่ามาตรฐานเริ่มต้นใช่หรือไม่? (การเปลี่ยนแปลงของแอดมินทั้งหมดจะหายไป)', 'Are you sure you want to restore default standards? (All admin edits will be lost)'))) {
      setStandards(ISO_STANDARDS);
      localStorage.removeItem('qaic_standards');
      setSelectedStandardId(null);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white tracking-tight">
            {t('มาตรฐานการรับรองระบบสากล', 'International Certification Standards')}
          </h2>
          <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">
            {t('เลือกชมมาตรฐานที่เราให้บริการครอบคลุมทุกอุตสาหกรรม', 'Browse our comprehensive range of certification standards.')}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {isAdminMode && (
            <button
              onClick={handleRestoreDefaults}
              className="px-4 py-2 bg-yellow-600/10 border border-yellow-500/20 text-yellow-700 dark:text-yellow-400 hover:bg-yellow-600/25 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer shadow-sm active:scale-95 font-sans"
            >
              {t('รีเซ็ตมาตรฐาน', 'Reset Standards')}
            </button>
          )}

          <div className="flex items-center gap-2">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-all cursor-pointer ${viewMode === 'grid' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' : 'text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800'}`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-all cursor-pointer ${viewMode === 'list' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' : 'text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800'}`}
            >
              <ListIcon className="w-5 h-5" />
            </button>
          </div>
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
            className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-slate-900/30 border border-gray-150/60 dark:border-slate-800 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-sans text-gray-900 dark:text-white"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border cursor-pointer ${
                selectedCategory === cat 
                  ? 'bg-gray-900 dark:bg-slate-200 text-white dark:text-gray-900 border-gray-900 dark:border-slate-200 shadow-lg shadow-gray-900/10' 
                  : 'bg-white/40 dark:bg-slate-900/20 text-gray-500 dark:text-slate-400 border-gray-150 dark:border-slate-800 hover:border-gray-200 dark:hover:border-slate-700'
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
                className="group relative bg-white/45 dark:bg-slate-900/40 backdrop-blur-[35px] shadow-[0_8px_30px_rgba(0,0,0,0.02)] dark:shadow-none border border-slate-200/50 dark:border-white/10 p-6 rounded-[2rem] hover:border-blue-500/40 hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-300 flex flex-col h-full"
              >
                <div className="mb-6 flex items-center justify-between">
                  <div className="p-3 bg-blue-50/80 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 rounded-2xl group-hover:bg-blue-600 group-hover:text-white dark:group-hover:text-white transition-colors duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  {std.accreditation.length > 0 && (
                    <div className="flex gap-1">
                      {std.accreditation.map(acc => (
                        <span key={acc} className="text-[8px] font-bold px-1.5 py-0.5 bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-slate-400 rounded uppercase">
                          {acc}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <h3 className="text-lg font-display font-bold text-gray-900 dark:text-white mb-2">{std.code}</h3>
                <p className="text-xs text-gray-500 dark:text-slate-400 font-sans leading-relaxed flex-1 mb-6">
                  {t(std.nameTH, std.nameEN)}
                </p>

                <button 
                  onClick={() => setSelectedStandardId(std.id)}
                  className="w-full py-3 bg-gray-50/80 dark:bg-slate-800/40 text-gray-600 dark:text-slate-350 hover:text-white group-hover:bg-blue-600 group-hover:text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer border-none"
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
              className="flex items-center gap-4 p-4 bg-white/45 dark:bg-slate-900/40 backdrop-blur-[35px] border border-slate-200/50 dark:border-white/10 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:border-blue-500/40 hover:shadow-[0_10px_30px_rgba(59,130,246,0.06)] transition-all group"
            >
              <div className="p-2 bg-blue-50/80 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 rounded-xl">
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white">{std.code}</h3>
                <p className="text-xs text-gray-400 dark:text-slate-500 font-sans">{t(std.nameTH, std.nameEN)}</p>
              </div>
              <button 
                onClick={() => setSelectedStandardId(std.id)}
                className="px-4 py-2 text-xs font-bold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/20 rounded-lg transition-all cursor-pointer border-none bg-transparent"
              >
                {t('รายละเอียด', 'Details')}
              </button>
            </motion.div>
          );
        })}

        {/* Admin Add Standard Card */}
        {isAdminMode && viewMode === 'grid' && (
          <motion.div
            key="add-new-standard"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => openForm(null)}
            className="group relative bg-white/20 dark:bg-slate-900/20 hover:bg-white/40 dark:hover:bg-slate-900/40 border-2 border-dashed border-gray-300 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500/50 p-6 rounded-[2rem] flex flex-col justify-center items-center h-full min-h-[220px] cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <div className="p-4 bg-blue-50/60 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 rounded-full group-hover:bg-blue-600 group-hover:text-white dark:group-hover:text-white transition-colors duration-300 mb-4">
              <Plus className="w-6 h-6" />
            </div>
            <span className="text-sm font-bold text-gray-700 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 font-sans">
              {t('+ เพิ่มมาตรฐานสากล', '+ Add International Standard')}
            </span>
          </motion.div>
        )}
      </div>

      {/* Admin Add Standard Row for List Mode */}
      {isAdminMode && viewMode === 'list' && (
        <button
          onClick={() => openForm(null)}
          className="w-full py-4 bg-white/20 dark:bg-slate-900/20 hover:bg-white/40 dark:hover:bg-slate-900/40 border-2 border-dashed border-gray-300 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500/50 rounded-2xl flex items-center justify-center gap-2 cursor-pointer transition-all font-sans text-sm font-bold text-gray-700 dark:text-slate-350"
        >
          <Plus className="w-4 h-4 text-blue-500" />
          <span>{t('เพิ่มมาตรฐานสากลใหม่', 'Add New International Standard')}</span>
        </button>
      )}

      {/* No Results */}
      {filteredStandards.length === 0 && (
        <div className="text-center py-20 bg-gray-50/50 dark:bg-slate-900/10 rounded-[2rem] border border-dashed border-gray-250 dark:border-slate-800">
           <Info className="w-12 h-12 text-gray-300 dark:text-slate-700 mx-auto mb-4" />
           <p className="text-gray-500 dark:text-slate-400 font-sans">{t('ไม่พบข้อมูลมาตรฐานที่ค้นหา', 'No standards found matching your criteria.')}</p>
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
                {/* Back / Close button */}
                <button 
                  onClick={() => setSelectedStandardId(null)}
                  className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/40 backdrop-blur-[35px] border border-white/40 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] dark:bg-slate-900/40 dark:border-white/20 dark:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.2)] text-white rounded-full transition-all cursor-pointer"
                >
                  <ArrowRight className="w-5 h-5 rotate-180" />
                </button>

                {/* Admin edit controls inside details view */}
                {isAdminMode && (
                  <div className="absolute top-6 left-6 flex items-center gap-2">
                    <button
                      onClick={() => openForm(selectedStandard)}
                      className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-md shadow-purple-600/10 cursor-pointer border-none"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>{t('แก้ไข', 'Edit')}</span>
                    </button>
                    <button
                      onClick={() => handleDeleteStandard(selectedStandard.id)}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-md shadow-red-600/10 cursor-pointer border-none"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>{t('ลบ', 'Delete')}</span>
                    </button>
                  </div>
                )}

                <div className="flex items-center gap-3 text-blue-400 text-xs font-bold uppercase tracking-widest mb-2">
                   <Zap className="w-4 h-4" />
                   <span>{selectedStandard.category}</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-white tracking-tight leading-tight">
                  {selectedStandard.code}
                </h2>
                <p className="text-sm md:text-base text-blue-100 font-sans mt-1 leading-snug">
                  {t(selectedStandard.nameTH, selectedStandard.nameEN)}
                </p>
              </div>

              <div className="flex-1 overflow-y-auto p-8 md:p-12 space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Card 1: คืออะไร (What is it?) */}
                  <div className="bg-blue-50/40 dark:bg-blue-950/10 border border-blue-100/50 dark:border-blue-900/30 p-6 md:p-8 rounded-[2rem] space-y-4 backdrop-blur-[10px] flex flex-col text-left">
                    <h3 className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest flex items-center gap-2 border-b border-blue-100/50 dark:border-blue-900/30 pb-2">
                      <Info className="w-5 h-5 text-blue-500 flex-shrink-0" />
                      {t('1. คืออะไร', '1. What is it?')}
                    </h3>
                    <p className="text-sm text-gray-700 dark:text-slate-200 font-sans leading-relaxed flex-1">
                      {whatIsIt}
                    </p>
                  </div>

                  {/* Card 2: ประโยชน์แบบละเอียด (Detailed Benefits) */}
                  <div className="bg-emerald-50/40 dark:bg-emerald-950/10 border border-emerald-100/50 dark:border-emerald-900/30 p-6 md:p-8 rounded-[2rem] space-y-4 backdrop-blur-[10px] flex flex-col text-left">
                    <h3 className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest flex items-center gap-2 border-b border-emerald-100/50 dark:border-emerald-900/30 pb-2">
                      <ShieldCheck className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                      {t('2. ประโยชน์แบบละเอียด', '2. Detailed Benefits')}
                    </h3>
                    <ul className="space-y-3 text-sm text-gray-700 dark:text-slate-200 font-sans flex-1">
                      {benefitsDetailed.map((benefit: string, i: number) => (
                        <li key={i} className="flex gap-2.5 leading-relaxed">
                          <span className="text-emerald-500 font-bold flex-shrink-0">•</span>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Card 3: หลักการนำไปใช้ (Implementation Principles) */}
                  <div className="bg-purple-50/40 dark:bg-purple-950/10 border border-purple-100/50 dark:border-purple-900/30 p-6 md:p-8 rounded-[2rem] space-y-4 backdrop-blur-[10px] flex flex-col text-left">
                    <h3 className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest flex items-center gap-2 border-b border-purple-100/50 dark:border-purple-900/30 pb-2">
                      <Zap className="w-5 h-5 text-purple-500 flex-shrink-0" />
                      {t('3. หลักการนำไปใช้', '3. Implementation Principles')}
                    </h3>
                    <ul className="space-y-3 text-sm text-gray-700 dark:text-slate-200 font-sans flex-1">
                      {principlesDetailed.map((principle: string, i: number) => (
                        <li key={i} className="flex gap-2.5 leading-relaxed">
                          <span className="text-purple-500 font-bold flex-shrink-0">•</span>
                          <span>{principle}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Card 4: สิ่งสำคัญ (Important Key Points) */}
                  <div className="bg-amber-50/40 dark:bg-amber-950/10 border border-amber-100/50 dark:border-amber-900/30 p-6 md:p-8 rounded-[2rem] space-y-4 backdrop-blur-[10px] flex flex-col text-left">
                    <h3 className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest flex items-center gap-2 border-b border-amber-100/50 dark:border-amber-900/30 pb-2">
                      <Award className="w-5 h-5 text-amber-500 flex-shrink-0" />
                      {t('4. สิ่งสำคัญ', '4. Important Key Points')}
                    </h3>
                    <ul className="space-y-3 text-sm text-gray-700 dark:text-slate-200 font-sans flex-1">
                      {keyPointsDetailed.length > 0 ? (
                        keyPointsDetailed.map((point: string, i: number) => (
                          <li key={i} className="flex gap-2.5 leading-relaxed">
                            <span className="text-amber-500 font-bold flex-shrink-0">•</span>
                            <span>{point}</span>
                          </li>
                        ))
                      ) : (
                        <li className="text-gray-500 dark:text-slate-400 italic">
                          {t('ไม่มีข้อมูลหลักการพิเศษ', 'No special key points specified')}
                        </li>
                      )}
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-50/90 dark:bg-slate-950/40 rounded-3xl p-8 space-y-6 border border-gray-150/70 dark:border-slate-850">
                    <h3 className="text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-widest text-center">
                      {t('กระบวนการประเมิน', 'Certification Journey')}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                       {selectedStandard.stepsTH && t(selectedStandard.stepsTH, selectedStandard.stepsEN).map((step: string, i: number) => (
                          <div key={i} className="bg-white/90 dark:bg-slate-900/60 p-4 rounded-2xl border border-gray-200/50 dark:border-slate-800 shadow-sm text-left">
                             <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 block mb-1">STEP 0{i+1}</span>
                             <p className="text-[11px] text-gray-700 dark:text-slate-350 font-sans leading-snug">{step}</p>
                          </div>
                       ))}
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-6">
                  <div className="flex items-center gap-8">
                     <div className="space-y-1 text-left">
                        <span className="text-[10px] font-bold text-gray-550 dark:text-slate-455 uppercase tracking-widest block">Audit Duration</span>
                        <span className="text-lg font-display font-bold text-gray-900 dark:text-white">{selectedStandard.baseDays} Man-Days</span>
                     </div>
                     <div className="w-px h-10 bg-gray-200 dark:bg-slate-800 hidden md:block" />
                     <div className="space-y-1 text-left">
                        <span className="text-[10px] font-bold text-gray-555 dark:text-slate-455 uppercase tracking-widest block">Accreditation Seals</span>
                        <div className="flex gap-2">
                           {selectedStandard.accreditation.map(acc => (
                             <span key={acc} className="px-2 py-0.5 bg-gray-900 text-white text-[9px] font-bold rounded uppercase">{acc}</span>
                           ))}
                        </div>
                     </div>
                  </div>
                  <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-sm font-bold transition-all shadow-lg shadow-blue-600/20 active:scale-95 cursor-pointer border-none">
                    {t('ขอใบเสนอราคาด่วน', 'Request Fast Quote')}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Form Modal */}
      <AnimatePresence>
        {isFormOpen && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white/95 backdrop-blur-[35px] border border-white/60 shadow-2xl dark:bg-slate-900/95 dark:border-slate-800 w-full max-w-4xl max-h-[90vh] rounded-[2.5rem] overflow-hidden flex flex-col"
            >
              <div className="p-6 md:p-8 border-b border-gray-150 dark:border-slate-800 flex justify-between items-center bg-blue-800 text-white">
                <h3 className="text-xl font-display font-bold">
                  {editingStandard ? t('แก้ไขข้อมูลมาตรฐาน', 'Edit Standard Information') : t('เพิ่มมาตรฐานสากลใหม่', 'Add New International Standard')}
                </h3>
                <button 
                  onClick={() => setIsFormOpen(false)}
                  className="p-2 bg-white/10 hover:bg-white/30 backdrop-blur-[35px] border border-white/30 text-white rounded-full transition-all cursor-pointer border-none"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveStandard} className="p-8 overflow-y-auto space-y-6 flex-1 text-sm text-left font-sans text-gray-900 dark:text-white">
                {/* 1. General Info */}
                <div className="space-y-4">
                  <h4 className="font-bold text-blue-600 dark:text-blue-400 border-b border-gray-100 dark:border-slate-800 pb-2">
                    {t('1. ข้อมูลทั่วไป (General Info)', '1. General Info')}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 dark:text-slate-450 mb-1">Standard Code</label>
                      <input 
                        type="text" required placeholder="e.g. ISO 9001:2015"
                        value={formCode} onChange={e => setFormCode(e.target.value)}
                        className="w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-950/40 border border-gray-150 dark:border-slate-850 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 dark:text-slate-455 mb-1">Category</label>
                      <select 
                        value={formCategory} onChange={e => setFormCategory(e.target.value)}
                        className="w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-950/40 border border-gray-150 dark:border-slate-850 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-gray-900 dark:text-white"
                      >
                        <option value="Quality & Risk">Quality & Risk</option>
                        <option value="Environmental & Energy">Environmental & Energy</option>
                        <option value="Health & Safety">Health & Safety</option>
                        <option value="Food Safety & GMP">Food Safety & GMP</option>
                        <option value="Security & Tech">Security & Tech</option>
                        <option value="Express Certifications">Express Certifications</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 dark:text-slate-450 mb-1">Accreditation</label>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {['UKAS', 'NAC', 'IATF', 'QAIC-Group'].map(acc => {
                          const checked = formAccreditation.includes(acc);
                          return (
                            <button
                              type="button" key={acc}
                              onClick={() => {
                                setFormAccreditation(prev => 
                                  checked ? prev.filter(x => x !== acc) : [...prev, acc]
                                );
                              }}
                              className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                                checked 
                                  ? 'bg-blue-600 border-blue-600 text-white shadow-sm' 
                                  : 'bg-gray-50 dark:bg-slate-950/40 border-gray-200 dark:border-slate-850 text-gray-500 hover:border-gray-300'
                              }`}
                            >
                              {acc}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 dark:text-slate-450 mb-1">Base Price (THB)</label>
                      <input 
                        type="number" required
                        value={formBaseCost} onChange={e => setFormBaseCost(Number(e.target.value))}
                        className="w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-950/40 border border-gray-150 dark:border-slate-850 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 dark:text-slate-450 mb-1">Base Audit Duration (Man-Days)</label>
                      <input 
                        type="number" required
                        value={formBaseDays} onChange={e => setFormBaseDays(Number(e.target.value))}
                        className="w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-950/40 border border-gray-150 dark:border-slate-850 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Bilingual Names & Descriptions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Thai Content */}
                  <div className="space-y-4 bg-gray-50/50 dark:bg-slate-950/20 p-5 rounded-2xl border border-gray-100 dark:border-slate-850/50">
                    <h4 className="font-bold text-gray-800 dark:text-white border-b border-gray-200 dark:border-slate-800 pb-1.5 flex items-center gap-2">
                      <span className="text-base">🇹🇭</span>
                      <span>เนื้อหาภาษาไทย (Thai Content)</span>
                    </h4>
                    
                    <div>
                      <label className="block text-xs font-bold text-gray-500 dark:text-slate-450 mb-1">ชื่อมาตรฐานสากล (Name)</label>
                      <input 
                        type="text" required placeholder="e.g. ระบบบริหารงานคุณภาพ"
                        value={formNameTH} onChange={e => setFormNameTH(e.target.value)}
                        className="w-full px-4 py-2 bg-white dark:bg-slate-950 border border-gray-150 dark:border-slate-850 rounded-xl text-sm text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 dark:text-slate-450 mb-1">คำอธิบายสั้นๆ (Short Desc)</label>
                      <input 
                        type="text" required placeholder="e.g. มาตรฐานจัดการและบริการคุณภาพระดับสากล"
                        value={formShortDescTH} onChange={e => setFormShortDescTH(e.target.value)}
                        className="w-full px-4 py-2 bg-white dark:bg-slate-950 border border-gray-150 dark:border-slate-850 rounded-xl text-sm text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 dark:text-slate-450 mb-1">คำอธิบายยาว (Long Desc)</label>
                      <textarea 
                        rows={2} required
                        value={formLongDescTH} onChange={e => setFormLongDescTH(e.target.value)}
                        className="w-full px-4 py-2 bg-white dark:bg-slate-950 border border-gray-150 dark:border-slate-850 rounded-xl text-sm text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 dark:text-slate-455 mb-1">คืออะไร (What is it?)</label>
                      <textarea 
                        rows={2} required
                        value={formWhatIsItTH} onChange={e => setFormWhatIsItTH(e.target.value)}
                        className="w-full px-4 py-2 bg-white dark:bg-slate-950 border border-gray-150 dark:border-slate-850 rounded-xl text-sm text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 dark:text-slate-450 mb-1">ประโยชน์แบบละเอียด (Benefits - 1 บรรทัดต่อข้อ)</label>
                      <textarea 
                        rows={3} required placeholder="ใส่ประโยชน์ทีละบรรทัด..."
                        value={formBenefitsTH} onChange={e => setFormBenefitsTH(e.target.value)}
                        className="w-full px-4 py-2 bg-white dark:bg-slate-950 border border-gray-150 dark:border-slate-850 rounded-xl text-sm font-sans text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 dark:text-slate-450 mb-1">หลักการนำไปใช้ (Principles - 1 บรรทัดต่อข้อ)</label>
                      <textarea 
                        rows={3} required placeholder="ใส่หลักการทีละบรรทัด..."
                        value={formPrinciplesTH} onChange={e => setFormPrinciplesTH(e.target.value)}
                        className="w-full px-4 py-2 bg-white dark:bg-slate-950 border border-gray-150 dark:border-slate-850 rounded-xl text-sm font-sans text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 dark:text-slate-450 mb-1">สิ่งสำคัญ (Key Points - 1 บรรทัดต่อข้อ)</label>
                      <textarea 
                        rows={3} placeholder="ใส่สิ่งสำคัญทีละบรรทัด..."
                        value={formKeyPointsTH} onChange={e => setFormKeyPointsTH(e.target.value)}
                        className="w-full px-4 py-2 bg-white dark:bg-slate-950 border border-gray-150 dark:border-slate-850 rounded-xl text-sm font-sans text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>

                  {/* English Content */}
                  <div className="space-y-4 bg-gray-50/50 dark:bg-slate-950/20 p-5 rounded-2xl border border-gray-100 dark:border-slate-850/50">
                    <h4 className="font-bold text-gray-800 dark:text-white border-b border-gray-200 dark:border-slate-800 pb-1.5 flex items-center gap-2">
                      <span className="text-base">🇬🇧</span>
                      <span>เนื้อหาภาษาอังกฤษ (English Content)</span>
                    </h4>
                    
                    <div>
                      <label className="block text-xs font-bold text-gray-500 dark:text-slate-450 mb-1">Standard Name (English)</label>
                      <input 
                        type="text" required placeholder="e.g. Quality Management System"
                        value={formNameEN} onChange={e => setFormNameEN(e.target.value)}
                        className="w-full px-4 py-2 bg-white dark:bg-slate-950 border border-gray-150 dark:border-slate-850 rounded-xl text-sm text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 dark:text-slate-450 mb-1">Short Description (English)</label>
                      <input 
                        type="text" required placeholder="e.g. Global quality management standards"
                        value={formShortDescEN} onChange={e => setFormShortDescEN(e.target.value)}
                        className="w-full px-4 py-2 bg-white dark:bg-slate-950 border border-gray-150 dark:border-slate-850 rounded-xl text-sm text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 dark:text-slate-450 mb-1">Long Description (English)</label>
                      <textarea 
                        rows={2} required
                        value={formLongDescEN} onChange={e => setFormLongDescEN(e.target.value)}
                        className="w-full px-4 py-2 bg-white dark:bg-slate-950 border border-gray-150 dark:border-slate-850 rounded-xl text-sm text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 dark:text-slate-450 mb-1">What is it? (English)</label>
                      <textarea 
                        rows={2} required
                        value={formWhatIsItEN} onChange={e => setFormWhatIsItEN(e.target.value)}
                        className="w-full px-4 py-2 bg-white dark:bg-slate-950 border border-gray-150 dark:border-slate-850 rounded-xl text-sm text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 dark:text-slate-450 mb-1">Detailed Benefits (1 per line)</label>
                      <textarea 
                        rows={3} required placeholder="Enter benefits one per line..."
                        value={formBenefitsEN} onChange={e => setFormBenefitsEN(e.target.value)}
                        className="w-full px-4 py-2 bg-white dark:bg-slate-950 border border-gray-150 dark:border-slate-850 rounded-xl text-sm font-sans text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 dark:text-slate-450 mb-1">Implementation Principles (1 per line)</label>
                      <textarea 
                        rows={3} required placeholder="Enter principles one per line..."
                        value={formPrinciplesEN} onChange={e => setFormPrinciplesEN(e.target.value)}
                        className="w-full px-4 py-2 bg-white dark:bg-slate-950 border border-gray-150 dark:border-slate-850 rounded-xl text-sm font-sans text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 dark:text-slate-450 mb-1">Important Key Points (1 per line)</label>
                      <textarea 
                        rows={3} placeholder="Enter key points one per line..."
                        value={formKeyPointsEN} onChange={e => setFormKeyPointsEN(e.target.value)}
                        className="w-full px-4 py-2 bg-white dark:bg-slate-950 border border-gray-150 dark:border-slate-850 rounded-xl text-sm font-sans text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Steps (Journey) */}
                <div className="space-y-4">
                  <h4 className="font-bold text-blue-600 dark:text-blue-400 border-b border-gray-100 dark:border-slate-800 pb-2">
                    {t('3. กระบวนการประเมิน (Certification Journey - 4 ขั้นตอน)', '3. Certification Journey')}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 dark:text-slate-450 mb-1">ขั้นตอนภาษาไทย (1 บรรทัดต่อข้อ - แนะนำ 4 ข้อ)</label>
                      <textarea 
                        rows={4} required
                        value={formStepsTH} onChange={e => setFormStepsTH(e.target.value)}
                        className="w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-950/40 border border-gray-150 dark:border-slate-850 rounded-xl text-sm text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 dark:text-slate-450 mb-1">Steps in English (1 per line - recommend 4 steps)</label>
                      <textarea 
                        rows={4} required
                        value={formStepsEN} onChange={e => setFormStepsEN(e.target.value)}
                        className="w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-950/40 border border-gray-150 dark:border-slate-850 rounded-xl text-sm text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Actions */}
                <div className="flex justify-end gap-3 border-t border-gray-150 dark:border-slate-800 pt-6">
                  <button 
                    type="button" onClick={() => setIsFormOpen(false)}
                    className="px-6 py-3 bg-gray-150 hover:bg-gray-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-gray-700 dark:text-slate-200 rounded-2xl text-xs font-bold cursor-pointer border-none"
                  >
                    {t('ยกเลิก', 'Cancel')}
                  </button>
                  <button 
                    type="submit"
                    className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-xs font-bold shadow-lg shadow-blue-600/20 cursor-pointer border-none"
                  >
                    {t('บันทึกข้อมูล', 'Save Changes')}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
