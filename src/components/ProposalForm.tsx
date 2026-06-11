/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
 FileText, 
 Building2, 
 Users, 
 MapPin, 
 CheckCircle2, 
 ArrowRight, 
 Download, 
 Printer,
 History,
 Settings,
 ShieldCheck,
 Calculator,
 FileCode
} from 'lucide-react';
import { UserSettings } from '../types';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface ProposalFormProps {
 settings: UserSettings;
}

interface ProposalData {
 companyName: string;
 businessType: string;
 employees: number;
 sites: number;
 standard: string;
 hasExistingSystem: boolean;
 needsTraining: boolean;
}

export default function ProposalForm({ settings }: ProposalFormProps) {
 const [step, setStep] = useState(1);
 const [data, setData] = useState<ProposalData>({
 companyName: '',
 businessType: '',
 employees: 10,
 sites: 1,
 standard: 'ISO 9001:2015',
 hasExistingSystem: false,
 needsTraining: false,
 });

 const [isCalculating, setIsCalculating] = useState(false);
 const [showResult, setShowResult] = useState(false);

 const t = (th: string, en: string) => settings.lang === 'TH' ? th : en;

 const standards = [
 'ISO 9001:2015',
 'ISO 14001:2015',
 'ISO 45001:2018',
 'ISO 22000:2018',
 'ISO 27001:2022',
 'GMP/HACCP',
 'GHPs',
 'ISO 13485:2016'
 ];

 const handleNext = () => setStep(s => s + 1);
 const handleBack = () => setStep(s => s - 1);

 const calculatePrice = () => {
 setIsCalculating(true);
 // Mock calculation logic
 setTimeout(() => {
 setIsCalculating(false);
 setShowResult(true);
 }, 1500);
 };

 const generatePDF = () => {
 const doc = new jsPDF();
 
 // In a real app, we would load a Thai font. 
 // Since we can't easily bundle TTF here, we'll use standard fonts for English labels
 // and placeholders for Thai if needed, but we'll try to make it professional.
 
 doc.setFontSize(22);
 doc.text('PROPOSAL FOR CERTIFICATION', 105, 20, { align: 'center' });
 
 doc.setFontSize(12);
 doc.text(`Reference No: Q-2025-${Math.floor(Math.random() * 10000)}`, 20, 35);
 doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 42);
 
 doc.setFontSize(14);
 doc.text('COMPANY DETAILS', 20, 55);
 doc.line(20, 57, 190, 57);
 
 doc.setFontSize(11);
 doc.text(`Company Name: ${data.companyName}`, 25, 65);
 doc.text(`Business Type: ${data.businessType}`, 25, 72);
 doc.text(`Number of Employees: ${data.employees}`, 25, 79);
 doc.text(`Number of Sites: ${data.sites}`, 25, 86);
 
 doc.setFontSize(14);
 doc.text('SERVICE SCOPE', 20, 100);
 doc.line(20, 102, 190, 102);
 
 doc.setFontSize(11);
 doc.text(`Standard Requested: ${data.standard}`, 25, 110);
 doc.text(`Existing Management System: ${data.hasExistingSystem ? 'Yes' : 'No'}`, 25, 117);
 doc.text(`Training Required: ${data.needsTraining ? 'Yes' : 'No'}`, 25, 124);
 
 // Fee section
 const baseFee = 35000;
 const siteFee = (data.sites - 1) * 15000;
 const employeeMultiplier = data.employees > 50 ? 1.5 : data.employees > 20 ? 1.2 : 1;
 const trainingFee = data.needsTraining ? 20000 : 0;
 
 const subTotal = (baseFee + siteFee) * employeeMultiplier + trainingFee;
 const vat = subTotal * 0.07;
 const total = subTotal + vat;

 doc.setFontSize(14);
 doc.text('PROPOSED FEE STRUCTURE', 20, 140);
 doc.line(20, 142, 190, 142);

 autoTable(doc, {
 startY: 150,
 head: [['Description', 'Amount (THB)']],
 body: [
 [`Certification Audit Fee (${data.standard})`, subTotal.toLocaleString()],
 [`VAT 7%`, vat.toLocaleString()],
 [`Total Investment`, total.toLocaleString()]
 ],
 theme: 'striped',
 headStyles: { fillColor: [37, 99, 235] }
 });

 doc.text('Authorized Signature', 150, 250, { align: 'center' });
 doc.line(130, 265, 170, 265);
 doc.text('QAIC Thailand', 150, 272, { align: 'center' });
 
 doc.save(`QAIC_Proposal_${data.companyName.replace(/\s+/g, '_')}.pdf`);
 };

 const generateHTML = () => {
 const baseFee = 35000;
 const siteFee = (data.sites - 1) * 15000;
 const employeeMultiplier = data.employees > 50 ? 1.5 : data.employees > 20 ? 1.2 : 1;
 const trainingFee = data.needsTraining ? 20000 : 0;
 
 const subTotal = (baseFee + siteFee) * employeeMultiplier + trainingFee;
 const vat = subTotal * 0.07;
 const total = subTotal + vat;
 const quoteNo = `QAIC-2025-${Math.floor(1000 + Math.random() * 9000)}`;
 const dateStr = new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' });

 const htmlContent = `<!DOCTYPE html>
<html lang="th">
<head>
 <meta charset="UTF-8">
 <meta name="viewport" content="width=device-width, initial-scale=1.0">
 <title>ใบเสนอราคา - ${data.companyName}</title>
 <link href="https://fonts.googleapis.com/css2?family=Sarabun:wght@300;400;500;600;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
 <style>
 body {
 font-family: 'Sarabun', 'Inter', sans-serif;
 color: #1e293b;
 background-color: #f8fafc;
 margin: 0;
 padding: 40px 20px;
 }
 .container {
 max-width: 800px;
 margin: 0 auto;
 background: #ffffff;
 padding: 50px;
 border-radius: 24px;
 box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
 border: 1px solid #e2e8f0;
 }
 .header {
 display: flex;
 justify-content: space-between;
 align-items: flex-start;
 border-bottom: 2px solid #f1f5f9;
 padding-bottom: 30px;
 margin-bottom: 30px;
 }
 .logo-area {
 display: flex;
 align-items: center;
 gap: 12px;
 }
 .logo-icon {
 width: 44px;
 height: 44px;
 background-color: #2563eb;
 color: white;
 border-radius: 12px;
 display: flex;
 align-items: center;
 justify-content: center;
 font-weight: bold;
 font-size: 20px;
 }
 .company-name {
 font-size: 20px;
 font-weight: 700;
 color: #0f172a;
 margin: 0;
 }
 .company-sub {
 font-size: 12px;
 color: #64748b;
 margin: 2px 0 0 0;
 }
 .quote-title {
 text-align: right;
 }
 .quote-title h1 {
 font-size: 24px;
 font-weight: 700;
 color: #2563eb;
 margin: 0 0 8px 0;
 }
 .quote-meta {
 font-size: 13px;
 color: #475569;
 margin: 4px 0;
 }
 .quote-meta span {
 font-weight: 600;
 color: #0f172a;
 }
 .section-title {
 font-size: 14px;
 font-weight: 700;
 color: #2563eb;
 text-transform: uppercase;
 letter-spacing: 0.1em;
 margin-bottom: 16px;
 border-bottom: 1px solid #e2e8f0;
 padding-bottom: 8px;
 }
 .grid {
 display: grid;
 grid-template-columns: 1fr 1fr;
 gap: 30px;
 margin-bottom: 35px;
 }
 .info-block p {
 margin: 8px 0;
 font-size: 14px;
 color: #475569;
 }
 .info-block p strong {
 color: #0f172a;
 font-weight: 500;
 }
 table {
 width: 100%;
 border-collapse: collapse;
 margin: 25px 0;
 font-size: 14px;
 }
 th {
 background-color: #2563eb;
 color: white;
 text-align: left;
 padding: 12px 16px;
 font-weight: 500;
 }
 th:last-child, td:last-child {
 text-align: right;
 }
 td {
 padding: 14px 16px;
 border-bottom: 1px solid #e2e8f0;
 color: #334155;
 }
 tr:nth-child(even) td {
 background-color: #f8fafc;
 }
 .total-section {
 display: flex;
 justify-content: flex-end;
 margin-top: 20px;
 margin-bottom: 40px;
 }
 .total-box {
 width: 320px;
 background-color: #f8fafc;
 border-radius: 16px;
 padding: 20px;
 border: 1px solid #e2e8f0;
 }
 .total-row {
 display: flex;
 justify-content: space-between;
 margin: 8px 0;
 font-size: 14px;
 color: #475569;
 }
 .total-row.grand-total {
 border-top: 1px solid #cbd5e1;
 padding-top: 12px;
 margin-top: 12px;
 font-size: 18px;
 font-weight: 700;
 color: #2563eb;
 }
 .footer-note {
 font-size: 12px;
 color: #64748b;
 line-height: 1.6;
 background: #f1f5f9;
 padding: 16px;
 border-radius: 12px;
 margin-bottom: 40px;
 }
 .signatures {
 display: flex;
 justify-content: space-between;
 margin-top: 50px;
 padding-top: 30px;
 border-top: 1px dashed #cbd5e1;
 }
 .signature-block {
 text-align: center;
 width: 200px;
 }
 .signature-line {
 border-bottom: 1px solid #94a3b8;
 margin-bottom: 8px;
 height: 40px;
 }
 .signature-title {
 font-size: 13px;
 color: #475569;
 }
 @media print {
 body {
 background-color: white;
 padding: 0;
 }
 .container {
 box-shadow: none;
 border: none;
 padding: 0;
 }
 .no-print {
 display: none;
 }
 }
 .btn-area {
 text-align: center;
 margin-top: 30px;
 }
 .btn-print {
 background-color: #2563eb;
 color: white;
 border: none;
 padding: 12px 24px;
 font-size: 14px;
 font-weight: 600;
 border-radius: 12px;
 cursor: pointer;
 transition: all 0.2s;
 }
 .btn-print:hover {
 background-color: #1d4ed8;
 }
 </style>
</head>
<body>
 <div class="container">
 <div class="header">
 <div class="logo-area">
 <div class="logo-icon">Q</div>
 <div>
 <h2 class="company-name">QAIC THAILAND</h2>
 <p class="company-sub">ผู้ตรวจรับรองมาตรฐานสากล ISO ทั่วไทย</p>
 </div>
 </div>
 <div class="quote-title">
 <h1>ใบเสนอราคา / Proposal</h1>
 <div class="quote-meta">เลขที่ / Quote No: <span>${quoteNo}</span></div>
 <div class="quote-meta">วันที่ / Date: <span>${dateStr}</span></div>
 </div>
 </div>

 <div class="grid">
 <div class="info-block">
 <div class="section-title">ข้อมูลลูกค้า / Client Details</div>
 <p><strong>ชื่อบริษัท / Company:</strong> ${data.companyName}</p>
 <p><strong>ประเภทธุรกิจ / Business:</strong> ${data.businessType}</p>
 <p><strong>จำนวนพนักงาน / Employees:</strong> ${data.employees} คน</p>
 <p><strong>จำนวนสาขา / Sites:</strong> ${data.sites} สาขา</p>
 </div>
 <div class="info-block">
 <div class="section-title">ขอบข่ายการรับรอง / Scope</div>
 <p><strong>มาตรฐานที่ต้องการ / Standard:</strong> ${data.standard}</p>
 <p><strong>มีระบบเดิมอยู่แล้ว / Existing System:</strong> ${data.hasExistingSystem ? 'มี (Yes)' : 'ไม่มี (No)'}</p>
 <p><strong>ต้องการฝึกอบรม / Training Needed:</strong> ${data.needsTraining ? 'ต้องการอบรม (Yes)' : 'ไม่ต้องการอบรม (No)'}</p>
 </div>
 </div>

 <div class="section-title">โครงสร้างค่าธรรมเนียม / Proposed Fees</div>
 <table>
 <thead>
 <tr>
 <th>รายละเอียด / Description</th>
 <th style="text-align: right;">จำนวนเงิน (บาท) / Amount (THB)</th>
 </tr>
 </thead>
 <tbody>
 <tr>
 <td>ค่าธรรมเนียมการตรวจรับรองแรกเริ่ม (Initial Audit Fee) สำหรับ ${data.standard}</td>
 <td style="text-align: right;">${subTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
 </tr>
 <tr>
 <td>ค่าตรวจสอบยืนยันตามมาตรฐาน & บริการยื่นเอกสารอนุมัติใบรับรอง</td>
 <td style="text-align: right;">0.00 (ฟรี)</td>
 </tr>
 </tbody>
 </table>

 <div class="total-section">
 <div class="total-box">
 <div class="total-row">
 <span>มูลค่ารวมสุทธิ (Subtotal):</span>
 <span>฿${subTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
 </div>
 <div class="total-row">
 <span>ภาษีมูลค่าเพิ่ม 7% (VAT):</span>
 <span>฿${vat.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
 </div>
 <div class="total-row grand-total">
 <span>ยอดรวมทั้งสิ้น (Grand Total):</span>
 <span>฿${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
 </div>
 </div>
 </div>

 <div class="footer-note">
 <strong>หมายเหตุ และ เงื่อนไขสำคัญ (Terms & Conditions):</strong><br>
 1. ราคานี้เป็นราคาประเมินเบื้องต้นตามข้อมูลที่จัดสรรมา อาจเปลี่ยนแปลงได้หากขอบเขตหรือจำนวนพนักงานเพิ่มขึ้นตอนลงหน้างานจริง<br>
 2. อัตรานี้ยังไม่รวมค่าใช้จ่ายจริงเกี่ยวกับค่าเดินทางและค่าที่พักของผู้ตรวจประเมินกรณีอยู่ต่างจังหวัด<br>
 3. เอกสารนี้สร้างขึ้นโดยระบบอัตโนมัติ เพื่อประกอบการตัดสินใจเบื้องต้นเท่านั้น
 </div>

 <div class="signatures">
 <div class="signature-block">
 <div class="signature-line"></div>
 <div class="signature-title">ผู้ขอใบเสนอราคา</div>
 <div style="font-size: 12px; color: #64748b; margin-top: 4px;">(${data.companyName})</div>
 </div>
 <div class="signature-block">
 <div class="signature-line" style="border-bottom: 1px solid #2563eb; color: #2563eb; line-height: 48px; font-weight: bold; font-family: monospace;">QAIC THAILAND</div>
 <div class="signature-title">เจ้าหน้าที่วิเคราะห์ระบบข้อมูล</div>
 <div style="font-size: 12px; color: #64748b; margin-top: 4px;">ฝ่ายพิจารณารับรองมาตรฐาน</div>
 </div>
 </div>

 <div class="btn-area no-print">
 <button class="btn-print" onclick="window.print()">พิมพ์เอกสารนี้ / Print Proposal</button>
 </div>
 </div>
</body>
</html>`;

 const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8;' });
 const url = URL.createObjectURL(blob);
 const link = document.createElement('a');
 link.href = url;
 link.setAttribute('download', `QAIC_Proposal_${data.companyName.replace(/\s+/g, '_')}.html`);
 document.body.appendChild(link);
 link.click();
 document.body.removeChild(link);
 };

 return (
 <div className="max-w-4xl mx-auto py-8">
 <div className="flex items-center justify-between mb-8">
 <div>
 <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-2">
 {t('ขอใบเสนอราคาอัตโนมัติ', 'Auto Proposal Generator')}
 </h2>
 <p className="text-gray-700 dark:text-slate-400">
 {t('กรอกข้อมูลเบื้องต้นเพื่อรับใบเสนอราคาสำหรับการรับรองมาตรฐาน ISO ทันที', 'Fill in the basic info to receive an instant ISO certification proposal.')}
 </p>
 </div>
 <div className="h-12 w-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
 <Calculator className="w-6 h-6" />
 </div>
 </div>

 {!showResult ? (
 <div className="bg-white/40 backdrop-blur-[35px] border border-white/40 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] dark:bg-slate-900/40 dark:border-white/20 dark:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.2)] rounded-[2.5rem] border shadow-xl p-8 md:p-12">
 {/* Progress Bar */}
 <div className="flex gap-2 mb-12">
 {[1, 2, 3].map(i => (
 <div 
 key={i} 
 className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${step >= i ? 'bg-blue-600' : 'bg-gray-100'}`}
 />
 ))}
 </div>

 <AnimatePresence mode="wait">
 {step === 1 && (
 <motion.div 
 key="step1"
 initial={{ opacity: 0, x: 20 }}
 animate={{ opacity: 1, x: 0 }}
 exit={{ opacity: 0, x: -20 }}
 className="space-y-6"
 >
 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <div className="space-y-2">
 <label className="text-xs font-bold text-gray-600 dark:text-slate-500 uppercase tracking-widest">{t('ชื่อบริษัท', 'Company Name')}</label>
 <div className="relative">
 <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 dark:text-slate-500" />
 <input 
 type="text" 
 value={data.companyName}
 onChange={(e) => setData({...data, companyName: e.target.value})}
 placeholder={t('ระบุชื่อบริษัทของคุณ', 'Enter company name')}
 className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white/40 backdrop-blur-[35px] border border-white/40 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] dark:bg-slate-900/40 dark:border-white/20 dark:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.2)] focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all outline-none"
 />
 </div>
 </div>
 <div className="space-y-2">
 <label className="text-xs font-bold text-gray-600 dark:text-slate-500 uppercase tracking-widest">{t('ประเภทธุรกิจ', 'Business Type')}</label>
 <input 
 type="text" 
 value={data.businessType}
 onChange={(e) => setData({...data, businessType: e.target.value})}
 placeholder={t('เช่น ผลิตอาหาร, ขนส่ง, หรือ บริการ', 'e.g. Food Production, Logistics')}
 className="w-full px-4 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white/40 backdrop-blur-[35px] border border-white/40 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] dark:bg-slate-900/40 dark:border-white/20 dark:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.2)] focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all outline-none"
 />
 </div>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <div className="space-y-2">
 <label className="text-xs font-bold text-gray-600 dark:text-slate-500 uppercase tracking-widest">{t('จำนวนพนักงาน', 'Number of Employees')}</label>
 <div className="relative">
 <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 dark:text-slate-500" />
 <input 
 type="number" 
 value={data.employees}
 onChange={(e) => setData({...data, employees: parseInt(e.target.value) || 0})}
 className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white/40 backdrop-blur-[35px] border border-white/40 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] dark:bg-slate-900/40 dark:border-white/20 dark:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.2)] focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all outline-none"
 />
 </div>
 </div>
 <div className="space-y-2">
 <label className="text-xs font-bold text-gray-600 dark:text-slate-500 uppercase tracking-widest">{t('จำนวน Site/สาขา', 'Number of Sites')}</label>
 <div className="relative">
 <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 dark:text-slate-500" />
 <input 
 type="number" 
 value={data.sites}
 onChange={(e) => setData({...data, sites: parseInt(e.target.value) || 1})}
 className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white/40 backdrop-blur-[35px] border border-white/40 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] dark:bg-slate-900/40 dark:border-white/20 dark:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.2)] focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all outline-none"
 />
 </div>
 </div>
 </div>

 <div className="pt-8">
 <button 
 disabled={!data.companyName || !data.businessType}
 onClick={handleNext}
 className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
 >
 <span>{t('ถัดไป', 'Continue')}</span>
 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
 </button>
 </div>
 </motion.div>
 )}

 {step === 2 && (
 <motion.div 
 key="step2"
 initial={{ opacity: 0, x: 20 }}
 animate={{ opacity: 1, x: 0 }}
 exit={{ opacity: 0, x: -20 }}
 className="space-y-8"
 >
 <div className="space-y-4">
 <label className="text-xs font-bold text-gray-600 dark:text-slate-500 uppercase tracking-widest block">{t('มาตรฐานที่ต้องการรับรอง', 'Standard Required')}</label>
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
 {standards.map(std => (
 <button 
 key={std}
 onClick={() => setData({...data, standard: std})}
 className={`p-4 rounded-2xl border text-left transition-all ${
 data.standard === std 
 ? 'bg-blue-50 border-blue-200 text-blue-700 ring-4 ring-blue-500/5' 
 : ' bg-white/40 backdrop-blur-[35px] border border-white/40 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] dark:bg-slate-900/40 dark:border-white/20 dark:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.2)] text-gray-800 dark:text-slate-300 hover:border-blue-200'
 }`}
 >
 <div className="flex items-center justify-between">
 <span className="font-bold text-sm">{std}</span>
 {data.standard === std && <CheckCircle2 className="w-4 h-4" />}
 </div>
 </button>
 ))}
 </div>
 </div>

 <div className="flex justify-between gap-4 pt-8">
 <button 
 onClick={handleBack}
 className="px-8 py-4 bg-gray-50 text-gray-800 dark:text-slate-300 rounded-2xl font-bold hover:bg-gray-100 transition-all"
 >
 {t('ย้อนกลับ', 'Back')}
 </button>
 <button 
 onClick={handleNext}
 className="flex-1 py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2 group"
 >
 <span>{t('ถัดไป', 'Continue')}</span>
 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
 </button>
 </div>
 </motion.div>
 )}

 {step === 3 && (
 <motion.div 
 key="step3"
 initial={{ opacity: 0, x: 20 }}
 animate={{ opacity: 1, x: 0 }}
 exit={{ opacity: 0, x: -20 }}
 className="space-y-8"
 >
 <div className="space-y-6">
 <div className="p-6 bg-gray-50 rounded-[2rem] border border-gray-100">
 <div className="flex items-center justify-between">
 <div>
 <h4 className="font-bold text-gray-900 dark:text-white mb-1">{t('เคยมีระบบจัดการมาตรฐานมาก่อนไหม?', 'Existing Management System?')}</h4>
 <p className="text-xs text-gray-700 dark:text-slate-400">{t('ช่วยเราประเมินระยะเวลาในการตรวจประเมินเบื้องต้น', 'Helps us estimate initial audit duration')}</p>
 </div>
 <button 
 onClick={() => setData({...data, hasExistingSystem: !data.hasExistingSystem})}
 className={`w-14 h-8 rounded-full transition-all relative ${data.hasExistingSystem ? 'bg-blue-600' : 'bg-gray-300'}`}
 >
 <div className={`absolute top-1 w-6 h-6 bg-white/40 backdrop-blur-[35px] border border-white/40 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] dark:bg-slate-900/40 dark:border-white/20 dark:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.2)] rounded-full transition-all ${data.hasExistingSystem ? 'left-7' : 'left-1'}`} />
 </button>
 </div>
 </div>

 <div className="p-6 bg-gray-50 rounded-[2rem] border border-gray-100">
 <div className="flex items-center justify-between">
 <div>
 <h4 className="font-bold text-gray-900 dark:text-white mb-1">{t('ต้องการอบรมมาตรฐานเพิ่มเติมไหม?', 'Need Standards Training?')}</h4>
 <p className="text-xs text-gray-700 dark:text-slate-400">{t('หลักสูตรอบรมเพื่อให้พนักงานเข้าใจข้อกำหนด', 'Training for staff to understand requirements')}</p>
 </div>
 <button 
 onClick={() => setData({...data, needsTraining: !data.needsTraining})}
 className={`w-14 h-8 rounded-full transition-all relative ${data.needsTraining ? 'bg-blue-600' : 'bg-gray-300'}`}
 >
 <div className={`absolute top-1 w-6 h-6 bg-white/40 backdrop-blur-[35px] border border-white/40 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] dark:bg-slate-900/40 dark:border-white/20 dark:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.2)] rounded-full transition-all ${data.needsTraining ? 'left-7' : 'left-1'}`} />
 </button>
 </div>
 </div>
 </div>

 <div className="flex justify-between gap-4 pt-8">
 <button 
 onClick={handleBack}
 className="px-8 py-4 bg-gray-50 text-gray-800 dark:text-slate-300 rounded-2xl font-bold hover:bg-gray-100 transition-all"
 >
 {t('ย้อนกลับ', 'Back')}
 </button>
 <button 
 disabled={isCalculating}
 onClick={calculatePrice}
 className="flex-1 py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2 group shadow-xl shadow-blue-600/20 disabled:opacity-70"
 >
 {isCalculating ? (
 <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
 ) : (
 <>
 <span>{t('คำนวณและสรุปข้อเสนอ', 'Calculate & Review')}</span>
 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
 </>
 )}
 </button>
 </div>
 </motion.div>
 )}
 </AnimatePresence>
 </div>
 ) : (
 <motion.div 
 initial={{ opacity: 0, scale: 0.95 }}
 animate={{ opacity: 1, scale: 1 }}
 className="space-y-8"
 >
 <div className="bg-white/40 backdrop-blur-[35px] border border-white/40 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] dark:bg-slate-900/40 dark:border-white/20 dark:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.2)] rounded-[2.5rem] border shadow-xl overflow-hidden">
 <div className="bg-blue-600 p-12 text-white text-center">
 <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-6">
 <CheckCircle2 className="w-8 h-8 text-white" />
 </div>
 <h3 className="text-2xl font-display font-bold mb-2">{t('จัดทำข้อเสนอสำเร็จ', 'Proposal Generated Successfully')}</h3>
 <p className="text-blue-100 text-sm">{t('คุณสามารถดาวน์โหลดใบเสนอราคาฉบับเต็มในรูปแบบ PDF ได้ที่นี่', 'You can download the full proposal PDF here.')}</p>
 </div>
 
 <div className="p-8 md:p-12 space-y-8">
 <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
 <div className="space-y-6">
 <h4 className="text-xs font-bold text-gray-600 dark:text-slate-500 uppercase tracking-widest">{t('สรุปรายละเอียด', 'Summary Details')}</h4>
 <div className="space-y-4">
 <div className="flex justify-between border-b border-gray-50 pb-3">
 <span className="text-gray-700 dark:text-slate-400 text-sm">{t('บริษัท', 'Company')}</span>
 <span className="font-bold text-gray-900 dark:text-white">{data.companyName}</span>
 </div>
 <div className="flex justify-between border-b border-gray-50 pb-3">
 <span className="text-gray-700 dark:text-slate-400 text-sm">{t('มาตรฐาน', 'Standard')}</span>
 <span className="font-bold text-blue-600">{data.standard}</span>
 </div>
 <div className="flex justify-between border-b border-gray-50 pb-3">
 <span className="text-gray-700 dark:text-slate-400 text-sm">{t('พนักงาน', 'Employees')}</span>
 <span className="font-bold text-gray-900 dark:text-white">{data.employees}</span>
 </div>
 <div className="flex justify-between border-b border-gray-50 pb-3">
 <span className="text-gray-700 dark:text-slate-400 text-sm">{t('สถานที่', 'Sites')}</span>
 <span className="font-bold text-gray-900 dark:text-white">{data.sites}</span>
 </div>
 </div>
 </div>

 <div className="bg-gray-50 rounded-3xl p-8 space-y-6 border border-gray-100">
 <h4 className="text-xs font-bold text-gray-600 dark:text-slate-500 uppercase tracking-widest">{t('ประมาณการค่าใช้จ่าย', 'Estimated Investment')}</h4>
 <div className="space-y-4">
 <div className="flex justify-between items-end">
 <span className="text-sm text-gray-700 dark:text-slate-400">{t('ใบเสนอราคาเลขที่', 'Quote No.')}</span>
 <span className="text-xs font-mono font-bold text-gray-600 dark:text-slate-500">#QAIC-2025-{(Math.random() * 10000).toFixed(0)}</span>
 </div>
 <div className="py-6 border-y border-gray-200">
 <p className="text-[10px] font-bold text-gray-600 dark:text-slate-500 uppercase tracking-widest mb-1">{t('งบประมาณรวมโดยประมาณ (เริ่มต้น)', 'Total Estimated Budget (Starting)')}</p>
 <p className="text-4xl font-display font-bold text-gray-900 dark:text-white">
 ฿{(data.sites * 35000 * (data.employees > 50 ? 1.5 : 1)).toLocaleString()}
 <span className="text-sm font-sans font-normal text-gray-600 dark:text-slate-500 ml-2">/ {t('ปี', 'Year')}</span>
 </p>
 </div>
 <p className="text-[10px] text-gray-600 dark:text-slate-500 leading-relaxed italic">
 * {t('ราคานี้เป็นราคาประเมินเบื้องต้น ยังไม่รวมภาษีมูลค่าเพิ่มและค่าเดินทางผู้ตรวจประเมิน', 'Price is an initial estimate, excluding VAT and auditor travel expenses.')}
 </p>
 </div>
 </div>
 </div>

 <div className="flex flex-col sm:flex-row gap-4 pt-8">
 <button 
 onClick={generatePDF}
 className="flex-1 py-5 bg-blue-600 text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20"
 >
 <Download className="w-5 h-5" />
 <span>{t('ดาวน์โหลดใบเสนอราคา (PDF)', 'Download Proposal (PDF)')}</span>
 </button>
 <button 
 onClick={generateHTML}
 className="flex-1 py-5 bg-emerald-600 text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-600/20"
 >
 <FileCode className="w-5 h-5" />
 <span>{t('ดาวน์โหลดใบเสนอราคา (HTML)', 'Download Proposal (HTML)')}</span>
 </button>
 <button 
 onClick={() => window.print()}
 className="px-8 py-5 bg-white/40 backdrop-blur-[35px] border border-white/40 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] dark:bg-slate-900/40 dark:border-white/20 dark:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.2)] border text-gray-800 dark:text-slate-300 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-gray-50 transition-all"
 >
 <Printer className="w-5 h-5" />
 </button>
 </div>
 
 <div className="flex justify-center">
 <button 
 onClick={() => { setShowResult(false); setStep(1); }}
 className="text-xs font-bold text-gray-600 dark:text-slate-500 hover:text-blue-600 transition-colors flex items-center gap-2"
 >
 <History className="w-4 h-4" />
 {t('เริ่มคำนวณใหม่', 'Restart Calculation')}
 </button>
 </div>
 </div>
 </div>
 
 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
 <div className="p-6 bg-white/40 backdrop-blur-[35px] border border-white/40 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] dark:bg-slate-900/40 dark:border-white/20 dark:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.2)] rounded-3xl border flex items-start gap-4">
 <div className="w-10 h-10 bg-green-50 text-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
 <ShieldCheck className="w-5 h-5" />
 </div>
 <div>
 <h5 className="font-bold text-gray-900 dark:text-white text-sm mb-1">{t('ใบรับรองได้รับการรับรองพหุภาคี', 'Multi-Lateral Recognition')}</h5>
 <p className="text-[10px] text-gray-700 dark:text-slate-400 leading-relaxed">IAF / UKAS / NAC Accredited certificate recognized worldwide.</p>
 </div>
 </div>
 <div className="p-6 bg-white/40 backdrop-blur-[35px] border border-white/40 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] dark:bg-slate-900/40 dark:border-white/20 dark:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.2)] rounded-3xl border flex items-start gap-4">
 <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
 <FileText className="w-5 h-5" />
 </div>
 <div>
 <h5 className="font-bold text-gray-900 dark:text-white text-sm mb-1">{t('บริการเป็นเลิศ', 'Service Excellence')}</h5>
 <p className="text-[10px] text-gray-700 dark:text-slate-400 leading-relaxed">Professional auditors with deep industry knowledge.</p>
 </div>
 </div>
 <div className="p-6 bg-white/40 backdrop-blur-[35px] border border-white/40 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] dark:bg-slate-900/40 dark:border-white/20 dark:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.2)] rounded-3xl border flex items-start gap-4">
 <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
 <Settings className="w-5 h-5" />
 </div>
 <div>
 <h5 className="font-bold text-gray-900 dark:text-white text-sm mb-1">{t('ระบบตรวจสอบออนไลน์', 'Digital Verification')}</h5>
 <p className="text-[10px] text-gray-700 dark:text-slate-400 leading-relaxed">All certificates can be instantly verified via QR Code.</p>
 </div>
 </div>
 </div>
 </motion.div>
 )}
 </div>
 );
}
