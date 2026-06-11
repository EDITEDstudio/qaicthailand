/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ISO_STANDARDS, QUIZ_QUESTIONS } from '../constants';
import { ISOStandard, UserSettings } from '../types';
import {
 Compass,
 CheckCircle,
 Coins,
 Clock,
 Briefcase,
 HelpCircle,
 Award,
 RefreshCw,
 Plus,
 ArrowRight,
 Info
} from 'lucide-react';

interface DiagnosticQuizProps {
 settings: UserSettings;
}

export default function DiagnosticQuiz({ settings }: DiagnosticQuizProps) {
 const lang = settings.lang;
 // --- Quiz States ---
 const [currentStep, setCurrentStep] = useState(0);
 const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
 const [quizCompleted, setQuizCompleted] = useState(false);
 const [quizResults, setQuizResults] = useState<{ code: string; score: number }[]>([]);

 // --- Calculator States ---
 const [companySize, setCompanySize] = useState(25);
 const [selectedStandardId, setSelectedStandardId] = useState(ISO_STANDARDS[0].id);
 const [safetyRisk, setSafetyRisk] = useState<'low' | 'medium' | 'high'>('medium');
 const [includeTraining, setIncludeTraining] = useState(false);

 // --- Handle Quiz Choices ---
 const handleAnswerSelect = (questionId: number, optionIdx: number) => {
 setSelectedAnswers({ ...selectedAnswers, [questionId]: optionIdx });
 };

 const handleNextStep = () => {
 if (currentStep < QUIZ_QUESTIONS.length - 1) {
 setCurrentStep(currentStep + 1);
 } else {
 calculateResults();
 }
 };

 const calculateResults = () => {
 // Tally up scores
 const tally: { [key: string]: number } = {};
 
 // Initialize standards
 ISO_STANDARDS.forEach(std => {
 tally[std.id] = 0;
 });

 // Run scores from selected options
 QUIZ_QUESTIONS.forEach(quiz => {
 const selectedIndex = selectedAnswers[quiz.id];
 if (selectedIndex !== undefined) {
 const optionPoints = quiz.options[selectedIndex].points;
 Object.entries(optionPoints).forEach(([stdId, pts]) => {
 if (tally[stdId] !== undefined) {
 tally[stdId] += pts;
 }
 });
 }
 });

 // Convert to percentage of maximum achievable points per standard
 const sorted = Object.entries(tally)
 .map(([stdId, score]) => {
 // Base normalized percentage
 let percentage = Math.min(Math.round((score / 15) * 100), 100);
 return {
 id: stdId,
 score: percentage > 0 ? percentage : 10 // baseline
 };
 })
 .sort((a, b) => b.score - a.score);

 // Filter out top 3 standards
 const resultsSubset = sorted.slice(0, 3).map(res => {
 const std = ISO_STANDARDS.find(s => s.id === res.id);
 return {
 code: std?.code || 'ISO Standard',
 score: res.score,
 name: lang === 'TH' ? std?.nameTH : std?.nameEN,
 shortDesc: lang === 'TH' ? std?.shortDescTH : std?.shortDescEN,
 benefits: lang === 'TH' ? std?.benefitsTH : std?.benefitsEN
 };
 });

 setQuizResults(resultsSubset);
 setQuizCompleted(true);
 };

 const handleResetQuiz = () => {
 setCurrentStep(0);
 setSelectedAnswers({});
 setQuizCompleted(false);
 setQuizResults([]);
 };

 // --- Quote Cost & Timeline Calculations ---
 const selectedStandardObj = ISO_STANDARDS.find(s => s.id === selectedStandardId) || ISO_STANDARDS[0];

 const derivedMetrics = React.useMemo(() => {
 // 1. Audit Days: Base days modulated by size
 // Under 15: Base days - 1, 15-50: Base, 51-120: Base + 2, 121+: Base * 1.5
 let days = selectedStandardObj.baseDays;
 if (companySize <= 15) days = Math.max(2, days - 1);
 else if (companySize > 50 && companySize <= 120) days = days + 2;
 else if (companySize > 120) days = Math.round(days * 1.5);

 // High safety risk gets extra technical audit day
 if (safetyRisk === 'high') days += 1;

 // 2. Audit Costs: Audit days * audit rate (e.g. 7,000 THB/day) + registrar registration fee (e.g. 12,000 THB)
 const dayRate = 6500;
 let auditFee = days * dayRate;
 let regFee = 10000;
 let trainingFee = includeTraining ? 15000 : 0;

 let subtotal = auditFee + regFee + trainingFee;
 let tax = Math.round(subtotal * 0.07);
 let total = subtotal + tax;

 // 3. Estimates timeline of process (weeks)
 let timelineWeeks = 12; // default
 if (companySize <= 15) timelineWeeks = 8;
 else if (companySize > 120) timelineWeeks = 20;

 return {
 days,
 auditFee,
 regFee,
 trainingFee,
 tax,
 total,
 timelineWeeks
 };
 }, [companySize, selectedStandardId, safetyRisk, includeTraining, selectedStandardObj]);

 return (
 <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
 {/* LEFT COLUMN: INTERACTIVE COMPLIANCE ASSESSOR (6 Cols) */}
 <div className="lg:col-span-7 bg-white/40 backdrop-blur-[35px] border border-white/40 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] dark:bg-slate-900/40 dark:border-white/20 dark:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.2)] rounded-3xl border p-6 shadow-sm flex flex-col justify-between min-h-[460px]">
 {!quizCompleted ? (
 <div className="space-y-6">
 {/* Quiz Banner */}
 <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
 <div className="p-2.5 bg-blue-50 rounded-xl text-blue-600">
 <Compass className="w-5 h-5" />
 </div>
 <div>
 <h3 className="font-display font-bold text-sm text-gray-900 dark:text-white tracking-wide uppercase">
 {lang === 'TH' ? 'แบบประเมินความจำเป็นด้านมาตรฐาน (ISO Assessor)' : 'ISO Diagnostic Assessor'}
 </h3>
 <p className="text-xs text-gray-600 dark:text-slate-500 font-sans">
 {lang === 'TH' ? 'ค้นหาขอบข่ายใบรับรองที่ตอบโจทย์ธุรกิจท่านมากที่สุด' : 'Answer 4 diagnostic steps to match optimal standards.'}
 </p>
 </div>
 </div>

 {/* Stepper Progress indicators */}
 <div className="flex items-center gap-1">
 {QUIZ_QUESTIONS.map((q, idx) => (
 <div
 key={q.id}
 className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
 currentStep >= idx ? 'bg-blue-600' : 'bg-gray-100'
 }`}
 ></div>
 ))}
 </div>

 {/* Question body */}
 <div className="space-y-4">
 <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest font-sans">
 {lang === 'TH' ? `คำถามที่ ${currentStep + 1} จาก ${QUIZ_QUESTIONS.length}` : `Question ${currentStep + 1} of ${QUIZ_QUESTIONS.length}`}
 </span>
 <h4 className="font-display font-bold text-base text-gray-800 dark:text-slate-100 leading-snug">
 {lang === 'TH' ? QUIZ_QUESTIONS[currentStep].questionTH : QUIZ_QUESTIONS[currentStep].questionEN}
 </h4>

 {/* Options */}
 <div className="space-y-2 pt-2">
 {QUIZ_QUESTIONS[currentStep].options.map((opt, idx) => {
 const isSelected = selectedAnswers[QUIZ_QUESTIONS[currentStep].id] === idx;
 return (
 <button
 key={idx}
 onClick={() => handleAnswerSelect(QUIZ_QUESTIONS[currentStep].id, idx)}
 className={`w-full text-left px-4 py-3 text-xs rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
 isSelected
 ? 'border-blue-500 bg-blue-50/50 text-blue-950 font-semibold shadow-sm'
 : 'border-gray-200/80 hover:border-blue-200 hover:bg-gray-50/50 text-gray-800 dark:text-slate-300'
 }`}
 >
 <span className="font-sans leading-relaxed">{lang === 'TH' ? opt.labelTH : opt.labelEN}</span>
 <div
 className={`w-4 h-4 rounded-full border flex-shrink-0 flex items-center justify-center ${
 isSelected ? 'border-blue-600 bg-blue-600' : 'border-gray-300'
 }`}
 >
 {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white/40 backdrop-blur-[35px] border border-white/40 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] dark:bg-slate-900/40 dark:border-white/20 dark:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.2)]"></div>}
 </div>
 </button>
 );
 })}
 </div>
 </div>

 {/* Next buttons */}
 <div className="flex justify-between items-center pt-4 border-t border-gray-100">
 <button
 onClick={() => currentStep > 0 && setCurrentStep(currentStep - 1)}
 disabled={currentStep === 0}
 className="text-xs font-semibold text-gray-600 dark:text-slate-500 hover:text-gray-800 dark:text-slate-300 cursor-pointer disabled:opacity-0"
 >
 {lang === 'TH' ? 'ย้อนกลับ' : 'Back'}
 </button>

 <button
 onClick={handleNextStep}
 disabled={selectedAnswers[QUIZ_QUESTIONS[currentStep].id] === undefined}
 className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-xl flex items-center gap-1 cursor-pointer disabled:opacity-50 disabled:pointer-events-none shadow-sm font-sans"
 >
 <span>
 {currentStep === QUIZ_QUESTIONS.length - 1
 ? lang === 'TH' ? 'ดูผลการวิจัยความต้องการ' : 'See Recommendations'
 : lang === 'TH' ? 'ถัดไป' : 'Next'}
 </span>
 <ArrowRight className="w-3.5 h-3.5" />
 </button>
 </div>
 </div>
 ) : (
 <div className="space-y-6">
 {/* Results Title */}
 <div className="flex justify-between items-center border-b border-gray-100 pb-4">
 <div className="flex items-center gap-2">
 <CheckCircle className="w-5 h-5 text-blue-600" />
 <h3 className="font-display font-bold text-sm text-gray-900 dark:text-white tracking-wide uppercase">
 {lang === 'TH' ? 'ผลประเมินความสอดคล้องมาตรฐาน' : 'Suggested Standard Registry'}
 </h3>
 </div>
 <button
 onClick={handleResetQuiz}
 className="flex items-center gap-1 px-2.5 py-1 text-[10px] uppercase font-bold text-blue-600 border border-blue-100 rounded-lg hover:bg-blue-50 cursor-pointer"
 >
 <RefreshCw className="w-3 h-3" />
 <span>{lang === 'TH' ? 'ทำใหม่' : 'Restart'}</span>
 </button>
 </div>

 {/* Result items rendering */}
 <p className="text-xs text-gray-700 dark:text-slate-400 font-sans leading-relaxed">
 * {lang === 'TH' ? 'วิเคราะห์อิงตามกระบวนการหลัก ขนาดพนักงาน และขอบข่ายความเสี่ยงของธุรกิจท่าน แนะนำให้รับรองมาตรฐานต่อไปนี้:' : 'Calculated on organizational metrics and specific risk patterns. We suggest prioritising:'}
 </p>

 <div className="space-y-4">
 {quizResults.map((res, index) => (
 <div
 key={index}
 className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100 relative overflow-hidden"
 >
 {/* Gauge score bar */}
 <div
 className="absolute top-0 left-0 bottom-0 bg-blue-600/5 transition-all duration-1000"
 style={{ width: `${res.score}%` }}
 ></div>

 <div className="flex justify-between items-start gap-4">
 <div className="space-y-1">
 <div className="flex items-center gap-2">
 <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-white/40 backdrop-blur-[35px] border border-white/40 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] dark:bg-slate-900/40 dark:border-white/20 dark:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.2)] text-gray-800 dark:text-slate-100 border">
 {res.code}
 </span>
 <span className="text-xs font-bold text-gray-900 dark:text-white">{res.name}</span>
 </div>
 <p className="text-xs text-gray-450 leading-relaxed font-sans mt-1">
 {res.shortDesc}
 </p>
 </div>

 <div className="text-right">
 <span className="text-[10px] text-gray-600 dark:text-slate-500 block uppercase font-sans font-bold">Match Score</span>
 <span className="text-xl font-display font-extrabold text-blue-800">
 {res.score}%
 </span>
 </div>
 </div>

 {/* Highlights benefits */}
 <div className="mt-3 pt-2.5 border-t border-gray-250/20 grid grid-cols-1 md:grid-cols-2 gap-1.5">
 {res.benefits.slice(0, 2).map((b, key) => (
 <div key={key} className="flex gap-1.5 items-start text-[10px] text-gray-700 dark:text-slate-400 font-sans">
 <CheckCircle className="w-3 h-3 text-blue-500 flex-shrink-0 mt-0.5" />
 <span className="line-clamp-1">{b}</span>
 </div>
 ))}
 </div>
 </div>
 ))}
 </div>

 <div className="p-3.5 bg-blue-50 border border-blue-100 rounded-xl flex items-start gap-2.5">
 <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
 <p className="text-[11px] text-blue-800 font-sans leading-relaxed">
 {lang === 'TH'
 ? 'คุณสามารถเลือกรหัสมาตรฐานและตรวจสอบค่าธรรมเนียมตรวจรับประเมิน (ทางขวา) เพื่อประเมินสเกลงานและจัดตารางเวลาเบื้องต้น'
 : 'Select an recommended standard code in the Cost & Timeline Estimator (right panel) to see deep budgetary projections.'}
 </p>
 </div>
 </div>
 )}
 </div>

 {/* RIGHT COLUMN: DYNAMIC AUDIT QUOTE ESTIMATOR (5 Cols) */}
 <div className="lg:col-span-5 bg-white/40 backdrop-blur-[35px] border border-white/40 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] dark:bg-slate-900/40 dark:border-white/20 dark:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.2)] rounded-3xl border p-6 shadow-sm flex flex-col justify-between min-h-[460px]">
 <div className="space-y-5">
 {/* Estimator Banner */}
 <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
 <div className="p-2.5 bg-blue-50 rounded-xl text-blue-600">
 <Coins className="w-5 h-5" />
 </div>
 <div>
 <h3 className="font-display font-bold text-sm text-gray-900 dark:text-white tracking-wide uppercase">
 {lang === 'TH' ? 'เครื่องคำนวณสเกลงานและงบประมาณ' : 'Cost & Timeline Estimator'}
 </h3>
 <p className="text-xs text-gray-600 dark:text-slate-500 font-sans">
 {lang === 'TH' ? 'ประเมินราคาและระยะเวลาการตรวจรับรองและติดตามผล' : 'Configure audit factors to view real-time estimates.'}
 </p>
 </div>
 </div>

 <div className="space-y-4">
 {/* Standard Dropdown selection */}
 <div>
 <label className="block text-[10px] font-bold text-gray-600 dark:text-slate-500 uppercase tracking-wider mb-1.5 font-sans">
 {lang === 'TH' ? 'เลือกรหัสมาตรฐานที่จะขอรับตรวจ' : 'Certification Standard'}
 </label>
 <select
 value={selectedStandardId}
 onChange={(e) => setSelectedStandardId(e.target.value)}
 className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 font-sans"
 >
 {ISO_STANDARDS.map((std) => (
 <option key={std.id} value={std.id}>
 {std.code} - {lang === 'TH' ? std.nameTH : std.nameEN}
 </option>
 ))}
 </select>
 </div>

 {/* Slider for Team Headcount size */}
 <div>
 <div className="flex justify-between items-center mb-1 font-sans">
 <label className="block text-[10px] font-bold text-gray-600 dark:text-slate-500 uppercase tracking-wider">
 {lang === 'TH' ? 'จำนวนพนักงานในขอบข่ายการรับรอง' : 'Headcount In-Scope'}
 </label>
 <span className="text-xs font-bold text-blue-800">
 {companySize} {lang === 'TH' ? 'คน (FTEs)' : 'FTEs'}
 </span>
 </div>
 <input
 type="range"
 min={1}
 max={500}
 value={companySize}
 onChange={(e) => setCompanySize(Number(e.target.value))}
 className="w-full h-1.5 bg-gray-150 rounded-lg appearance-none cursor-pointer accent-blue-600"
 />
 <div className="flex justify-between text-[9px] text-gray-600 dark:text-slate-500 font-sans">
 <span>1 FTE (SME)</span>
 <span>100 FTEs</span>
 <span>500+ FTEs (Enterprise)</span>
 </div>
 </div>

 {/* Segment risk level */}
 <div>
 <label className="block text-[10px] font-bold text-gray-600 dark:text-slate-500 uppercase tracking-wider mb-1.5 font-sans">
 {lang === 'TH' ? 'ระดับความเสี่ยงสิ่งแวดล้อม/ทางกายภาพของธุรกิจ' : 'Physical / Workspace Hazard Rating'}
 </label>
 <div className="grid grid-cols-3 gap-1 bg-gray-100 p-1 rounded-xl">
 {(['low', 'medium', 'high'] as const).map((risk) => (
 <button
 key={risk}
 onClick={() => setSafetyRisk(risk)}
 className={`text-center py-1 rounded-lg text-[10px] font-semibold capitalize cursor-pointer transition-all ${
 safetyRisk === risk
 ? ' bg-white/40 backdrop-blur-[35px] border border-white/40 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] dark:bg-slate-900/40 dark:border-white/20 dark:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.2)] text-gray-900 dark:text-white shadow-sm'
 : 'text-gray-700 dark:text-slate-400 hover:text-gray-700 dark:text-slate-200'
 }`}
 >
 {risk === 'low' ? (lang === 'TH' ? 'เสี่ยงต่ำ' : 'Low') :
 risk === 'medium' ? (lang === 'TH' ? 'ปานกลาง' : 'Medium') :
 (lang === 'TH' ? 'เสี่ยงสูง' : 'High')}
 </button>
 ))}
 </div>
 </div>

 {/* Checkbox options (Include Pre-training seminar) */}
 <div className="flex items-center gap-2 pt-1">
 <input
 type="checkbox"
 id="training-checkbox"
 checked={includeTraining}
 onChange={(e) => setIncludeTraining(e.target.checked)}
 className="w-4 h-4 text-blue-600 border-gray-350 rounded focus:ring-blue-500 cursor-pointer"
 />
 <label htmlFor="training-checkbox" className="text-xs font-medium text-gray-750 cursor-pointer font-sans select-none">
 {lang === 'TH' ? 'รวมหลักสูตรอบรมเตรียมความพร้อมเบื้องต้น (+15,000 บาท)' : 'Include introductory training seminar (+15,000 THB)'}
 </label>
 </div>
 </div>
 </div>

 {/* Dynamic Cost Card Invoice mockup view */}
 <div className="mt-5 border-t border-dashed border-gray-150 pt-4 space-y-4">
 <div className="bg-gray-50 p-4 rounded-2xl space-y-2.5 font-sans">
 <span className="text-[10px] font-bold text-gray-600 dark:text-slate-500 uppercase tracking-widest block border-b border-gray-200 pb-1.5">
 {lang === 'TH' ? 'ค่าธรรมเนียมตรวจประเมินโดยประมาณ (THB)' : 'Estimated Audit Proposal'}
 </span>
 <div className="space-y-1.5 text-xs text-gray-800 dark:text-slate-300">
 <div className="flex justify-between">
 <span>{lang === 'TH' ? 'ค่าตรวจประเมินหน้างาน (Stage 1 & 2)' : 'Onsite Assessment Fees'} ({derivedMetrics.days} {lang === 'TH' ? 'วัน' : 'days'})</span>
 <span className="font-semibold text-gray-900 dark:text-white">{derivedMetrics.auditFee.toLocaleString()} THB</span>
 </div>
 <div className="flex justify-between">
 <span>{lang === 'TH' ? 'ค่าธรรมเนียมขึ้นทะเบียนอังกฤษ (Registrar fee)' : 'Accredited Registration Fee'}</span>
 <span className="font-semibold text-gray-900 dark:text-white">{derivedMetrics.regFee.toLocaleString()} THB</span>
 </div>
 {includeTraining && (
 <div className="flex justify-between text-blue-800">
 <span>{lang === 'TH' ? 'สัมมนาการเขียนระบบตรวจสอบ' : 'Pre-audit Advisory Seminar'}</span>
 <span className="font-semibold">{derivedMetrics.trainingFee.toLocaleString()} THB</span>
 </div>
 )}
 <div className="flex justify-between text-[11px] text-gray-600 dark:text-slate-500">
 <span>{lang === 'TH' ? 'ภาษีมูลค่าเพิ่ม (VAT 7%)' : 'Value Added Tax (7%)'}</span>
 <span>{derivedMetrics.tax.toLocaleString()} THB</span>
 </div>
 </div>

 <div className="border-t border-gray-200 pt-2 flex justify-between items-center">
 <div>
 <span className="text-[10px] font-bold text-gray-450 uppercase block tracking-wider leading-none">
 Total Estimate (Net)
 </span>
 <span className="text-[9px] text-gray-600 dark:text-slate-500">
 {lang === 'TH' ? 'รวมค่าบริการเดินทางและใบประกาศสัญญาลีก' : 'Includes accredited seal registration'}
 </span>
 </div>
 <span className="text-xl font-display font-extrabold text-blue-800 leading-none">
 {derivedMetrics.total.toLocaleString()} ฿
 </span>
 </div>
 </div>

 {/* Timeline Indicators */}
 <div className="grid grid-cols-2 gap-3 text-center">
 <div className="bg-gray-50/50 p-2.5 rounded-xl border border-gray-100 flex flex-col justify-center">
 <div className="flex justify-center text-gray-700 dark:text-slate-400 mb-0.5">
 <Clock className="w-4 h-4 text-blue-600" />
 </div>
 <span className="text-[10px] font-bold text-gray-600 dark:text-slate-500 uppercase tracking-widest block leading-none">Timeline</span>
 <span className="text-sm font-bold font-display text-gray-800 dark:text-slate-100 mt-1">
 {derivedMetrics.timelineWeeks} {lang === 'TH' ? 'สัปดาห์' : 'Weeks'}
 </span>
 </div>

 <div className="bg-gray-50/50 p-2.5 rounded-xl border border-gray-100 flex flex-col justify-center">
 <div className="flex justify-center text-gray-700 dark:text-slate-400 mb-0.5">
 <Plus className="w-4 h-4 text-blue-600" />
 </div>
 <span className="text-[10px] font-bold text-gray-600 dark:text-slate-500 uppercase tracking-widest block leading-none">Auditors Reg</span>
 <span className="text-sm font-bold font-display text-gray-800 dark:text-slate-100 mt-1">
 {derivedMetrics.days} {lang === 'TH' ? 'แมน-เดย์' : 'Man-Days'}
 </span>
 </div>
 </div>
 </div>
 </div>
 </div>
 );
}
