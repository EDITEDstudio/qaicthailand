/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Download, 
  FileText, 
  ArrowRight, 
  Sliders, 
  Grid, 
  Check, 
  ExternalLink,
  ChevronRight,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { UserSettings } from '../types';
import { jsPDF } from 'jspdf';

interface DocumentItem {
  id: string;
  title: string;
  category: string;
  downloads: number;
}

const DOCUMENT_LIST: DocumentItem[] = [
  // QAIC แจ้งปรับเปลี่ยนรูปแบบใบรับรองใหม่
  { id: 'qaic-01', title: 'หนังสือแจ้งการปรับเปลี่ยนรูปแบบการแสดงข้อมูลบนใบรับรอง', category: 'QAIC Announcements', downloads: 274 },
  // ประกาศแจ้งตรวจเพิ่มเรื่องการเปลี่ยนแปลงภูมิกาศ
  { id: 'qaic-02', title: 'หนังสือแจ้งตรวจเพิ่มเรื่องการเปลี่ยนแปลงภูมิอากาศ ของการตรวจ ISO9001,ISO14001,ISO45001', category: 'Climate Change Announcement', downloads: 443 },
  
  // ISO22000
  { id: 'iso22-01', title: 'สิ่งน่ารู้ การตรวจประเมินสโตร์ ในอุตสาหกรรมอาหาร', category: 'ISO 22000', downloads: 551 },
  { id: 'iso22-02', title: 'รายการ_Check_ระบบเอกสาร_ของ_ISO22000', category: 'ISO 22000', downloads: 1759 },
  { id: 'iso22-03', title: 'วัตถุประสงค์ที่วัดได้ ISO22000', category: 'ISO 22000', downloads: 592 },
  { id: 'iso22-04', title: 'ระบบการจัดการความปลอดภัยในอาหาร กับ การจัดเก็บวัตถุดิบ (Raw material storage )', category: 'ISO 22000', downloads: 539 },
  { id: 'iso22-05', title: 'ประเภทของการผลิตอาหาร กับ การจัดการความเสี่ยง', category: 'ISO 22000', downloads: 507 },
  { id: 'iso22-06', title: 'ประเด็นที่ต้องสนใจ การว่าจ้างพนักงาน ปฐมนิเทศ และการอบรม อุตสาหกรรมอาหาร', category: 'ISO 22000', downloads: 490 },
  { id: 'iso22-07', title: 'โปรแกรมขั้นพื้นฐานและข้อกำหนดที่ออกแบบสำหรับความปลอดภัยของอาหารในผู้ผลิตบรรจุภัณฑ์สำหรับอาหาร PAS223_ 2011', category: 'ISO 22000', downloads: 716 },
  { id: 'iso22-08', title: 'ตรวจประเมิน มาตรฐานของการรักษาความสะอาดของพนักงาน และสุขลักษณะส่วนบุคคล', category: 'ISO 22000', downloads: 692 },
  { id: 'iso22-09', title: 'การออกแบบระบบตรวจเฝ้าระวัง HACCP (MONITORING SYSTEM)', category: 'ISO 22000', downloads: 1697 },
  { id: 'iso22-10', title: 'ความแตกต่างระหว่างระหว่าง 7.5 oPRP กับ 7.6 HACCP', category: 'ISO 22000', downloads: 823 },
  { id: 'iso22-11', title: 'การทวนสอบระบบการสอบกลับ (Traceability)', category: 'ISO 22000', downloads: 3935 },
  { id: 'iso22-12', title: 'ความเหมือน ความแตกต่าง prp oprp haccp ตอน 2', category: 'ISO 22000', downloads: 1061 },
  { id: 'iso22-13', title: 'ทำไม ISO22000 ใช้คำว่า มาตรการควบคุมร่วม combination of control measure', category: 'ISO 22000', downloads: 429 },
  { id: 'iso22-14', title: 'ISO22000 monitoring verify PRP oPRP CCP', category: 'ISO 22000', downloads: 2664 },
  { id: 'iso22-15', title: 'เรื่องของการตรวจสอบวัตถุดิบ vs ISO22000', category: 'ISO 22000', downloads: 754 },
  { id: 'iso22-16', title: 'ความรู้ ISO22000 เบื้องต้น', category: 'ISO 22000', downloads: 4174 },
  { id: 'iso22-17', title: 'ISO22000 การเตรียมพร้อมและการตอบสนองสภาวะฉุกเฉิน', category: 'ISO 22000', downloads: 1560 },
  { id: 'iso22-18', title: 'หลักการรักษาความปลอดภัยของอาหาร (Food Security Principles)', category: 'ISO 22000', downloads: 586 },
  { id: 'iso22-19', title: 'Food defense Food Security', category: 'ISO 22000', downloads: 5261 },
  { id: 'iso22-20', title: '3 ขั้นตอนในการจัดทำ Food Security Plan', category: 'ISO 22000', downloads: 637 },
  { id: 'iso22-21', title: 'ข้อกำหนด ISO22000 ภาษาไทย', category: 'ISO 22000', downloads: 609 },
  { id: 'iso22-22', title: 'ISO22000 7.4.4 การเลือกและการประเมินมาตรการ', category: 'ISO 22000', downloads: 960 },
  { id: 'iso22-23', title: 'ISO22000 7.6.4 ระบบการตรวจเฝ้าระวัง จุดวิกฤติ', category: 'ISO 22000', downloads: 659 },
  { id: 'iso22-24', title: 'ISO 22000_2005 ข้อที่ 5.2 นโยบายความปลอดภัยในอาหาร', category: 'ISO 22000', downloads: 777 },
  { id: 'iso22-25', title: 'ISO22000 7.8 แผนการทวนสอบ', category: 'ISO 22000', downloads: 1140 },
  { id: 'iso22-26', title: 'ISO22000 8.4.2 การประเมิน แต่ละผลของการทวนสอบ', category: 'ISO 22000', downloads: 650 },
  { id: 'iso22-27', title: 'ISO22000 8.2 การรับรองการใช้มาตรการควบคุมร่วม', category: 'ISO 22000', downloads: 1167 },
  { id: 'iso22-28', title: 'ISO22000 8.4.3 การวิเคราะห์ผลของกิจกรรมการทวนสอบ', category: 'ISO 22000', downloads: 693 },
  { id: 'iso22-29', title: 'ISO22000 8.5.2 การทำให้ระบบการจัดการความปลอดภัยในอาหารมีความทันสมัย', category: 'ISO 22000', downloads: 483 },

  // TS16949
  { id: 'ts-01', title: 'Predictive maintenance TS 16949 Part 5', category: 'TS 16949', downloads: 902 },
  { id: 'ts-02', title: 'Manufacturing Process Audit TS 16949', category: 'TS 16949', downloads: 3536 },
  { id: 'ts-03', title: '8TS16949 Readiness Review ทำอย่างไร', category: 'TS 16949', downloads: 404 },
  { id: 'ts-04', title: '7TS 16949 APQP', category: 'TS 16949', downloads: 18209 },
  { id: 'ts-05', title: 'ทำไมต้องตรวจกิจกรรมสนับสนุน (Remote Support function) ก่อนการตรวจกิจกรรมการผลิต (manufacturing site)', category: 'TS 16949', downloads: 329 },
  { id: 'ts-06', title: 'ความปลอดภัยของพนักงาน เพื่อให้บรรลุถึงคุณภาพของผลิตภัณฑ์', category: 'TS 16949', downloads: 348 },
  { id: 'ts-07', title: 'แผนฉุกเฉินของ TS 16949', category: 'TS 16949', downloads: 3012 },
  { id: 'ts-08', title: 'Predictive maintenance TS 16949 Part 4 - Thermography', category: 'TS 16949', downloads: 675 },
  { id: 'ts-09', title: 'นิยามของ Predictive maintenance preventive', category: 'TS 16949', downloads: 1159 },
  { id: 'ts-10', title: 'Predictive maintenanceTS 16949 Part 2', category: 'TS 16949', downloads: 439 },
  { id: 'ts-11', title: 'ผู้แทนลูกค้า Customer representativeTS16949', category: 'TS 16949', downloads: 393 },
  { id: 'ts-12', title: 'ค่ายผู้ผลิตรถยนต์กับ การรับรองระบบ TS16949', category: 'TS 16949', downloads: 391 },
  { id: 'ts-13', title: 'Predictive maintenance TS 16949 Part 3 - เทคนิคที่ 1 Vibration monitoring and Analysis', category: 'TS 16949', downloads: 652 },

  // OHSAS18001
  { id: 'ohsas-01', title: 'ความปลอดภัยในการทำงานเกี่ยวกับสารเคมีอันตราย', category: 'OHSAS 18001', downloads: 549 },
  { id: 'ohsas-02', title: 'ความปลอดภัยในการในการใช้หินเจียรนัยแท่นและเครื่องตัดไฟเบอร์', category: 'OHSAS 18001', downloads: 9608 },
  { id: 'ohsas-03', title: 'กิจกรรมส่งเสริมความปลอดภัย', category: 'OHSAS 18001', downloads: 529 },
  { id: 'ohsas-04', title: 'OHSAS18001 เทคนิคการระบุอันตรายจากระบบ อุปกรณ์ อาคาร สถานที่ ระบบ ยูทิลิตี้', category: 'OHSAS 18001', downloads: 358 },
  { id: 'ohsas-05', title: 'การเตรียมพร้อมตอบสนองต่อภาวะฉุกเฉิน OHSAS18001 4_4_7', category: 'OHSAS 18001', downloads: 1092 },
  { id: 'ohsas-06', title: 'กฎความปลอดภัยในการทำงานสำหรับผู้รับเหมา', category: 'OHSAS 18001', downloads: 8775 },
  { id: 'ohsas-07', title: 'ความปลอดภัยในการกองเก็บวัสดุ', category: 'OHSAS 18001', downloads: 387 },
  { id: 'ohsas-08', title: 'ความปลอดภัยเกี่ยวกับไฟฟ้า', category: 'OHSAS 18001', downloads: 1074 },
  { id: 'ohsas-09', title: 'ความปลอดภัยในการใช้เครื่องเชื่อมไฟฟ้า', category: 'OHSAS 18001', downloads: 528 },
  { id: 'ohsas-10', title: 'ความปลอดภัยในการใช้ปั้นจั่น(เครน', category: 'OHSAS 18001', downloads: 1245 },
  { id: 'ohsas-11', title: 'ความปลอดภัยในการใช้รถโฟล์คลิฟ', category: 'OHSAS 18001', downloads: 368 },
  { id: 'ohsas-12', title: 'ความปลอดภัยในการใช้เครื่องเจาะ', category: 'OHSAS 18001', downloads: 12908 },
  { id: 'ohsas-13', title: 'ความปลอดภัยในการทำงานบนที่สูง', category: 'OHSAS 18001', downloads: 697 },
  { id: 'ohsas-14', title: 'ความปลอดภัยในการทำงานทั่วไป', category: 'OHSAS 18001', downloads: 535 },

  // ISO14001
  { id: 'iso14-01', title: 'เก็บตก การตรวจประเมินระบบ ISO14001', category: 'ISO 14001', downloads: 385 },
  { id: 'iso14-02', title: 'นโยบายด้านสิ่งแวดล้อม', category: 'ISO 14001', downloads: 516 },
  { id: 'iso14-03', title: 'ระบบการจัดการตามมาตรฐาน ISO14001 เป็นอย่างไร', category: 'ISO 14001', downloads: 437 },
  { id: 'iso14-04', title: 'วัตถุประสงค์ เป้าหมาย สำหรับ EMS ISO14001', category: 'ISO 14001', downloads: 1435 },
  { id: 'iso14-05', title: 'ประเด็นปัญหาด้านสิ่งแวดล้อม (environmental aspect)', category: 'ISO 14001', downloads: 1670 },
  { id: 'iso14-06', title: 'แนวทางในการประเมินความสอดคล้องตามกฎหมาย และข้อกำหนดต่างๆทางด้านสิ่งแวดล้อม', category: 'ISO 14001', downloads: 1447 },
  { id: 'iso14-07', title: 'การเก็บ ขน บำบัด และกำจัดของเสียอันตรายทำได้อย่างไร', category: 'ISO 14001', downloads: 358 },
  { id: 'iso14-08', title: 'ระบบการฝึกอบรมสำหรับองค์กรที่มีส่วนเกี่ยวข้องกับวัตถุอันตรายหรือกากอันตราย', category: 'ISO 14001', downloads: 292 },
  { id: 'iso14-09', title: 'แผนปฏิบัติการเหตุฉุกเฉินกับสารเคมี', category: 'ISO 14001', downloads: 1038 },
  { id: 'iso14-10', title: 'บริษัทกำจัดกากอุตสาหกรรม', category: 'ISO 14001', downloads: 332 },
  { id: 'iso14-11', title: 'การทบทวนฝ่ายบริหารสำหรับ EMS', category: 'ISO 14001', downloads: 372 },
  { id: 'iso14-12', title: 'ISO14001 การควบคุมการปฏิบัติการ', category: 'ISO 14001', downloads: 696 },
  { id: 'iso14-13', title: 'การควบคุมการใช้น้ำในสำนักงาน ISO4001', category: 'ISO 14001', downloads: 378 },
  { id: 'iso14-14', title: 'ISO14001 การเดินตรวจพื้นที่ ระหว่างตรวจประเมินภายใน', category: 'ISO 14001', downloads: 448 },
  { id: 'iso14-15', title: 'ISO14001GuideBookRev4r', category: 'ISO 14001', downloads: 743 },
  { id: 'iso14-16', title: 'เทคนิคการตรวจประเมิน ISO 14001 - site tour', category: 'ISO 14001', downloads: 439 },
  { id: 'iso14-17', title: 'เทคนิคการตรวจประเมินระบบ ISO14001', category: 'ISO 14001', downloads: 580 },

  // ISO9001
  { id: 'iso9-01', title: 'การออกแบบและพัฒนา ISO9001 2008', category: 'ISO 9001', downloads: 464 },
  { id: 'iso9-02', title: 'ผลการออกแบบและการพัฒนา ISO9001', category: 'ISO 9001', downloads: 676 },
  { id: 'iso9-03', title: 'ข้อมูลสำหรับการออกแบบและการพัฒนา ISO9001', category: 'ISO 9001', downloads: 399 },
  { id: 'iso9-04', title: 'การทบทวนการออกแบบ Design Review ISO9001', category: 'ISO 9001', downloads: 4248 },
  { id: 'iso9-05', title: 'การทวนสอบการออกแบบ (Design and development verification)', category: 'ISO 9001', downloads: 1002 },
  { id: 'iso9-06', title: 'การแก้ไขข้อบกพร่อง CAR', category: 'ISO 9001', downloads: 12751 },
  { id: 'iso9-07', title: 'กำหนดความสามารถในงาน ข้อกำหนด 6.6.2', category: 'ISO 9001', downloads: 518 },
  { id: 'iso9-08', title: 'ปัญหาของกระบวนการตรวจประเมิน ผู้ตรวจประเมิน', category: 'ISO 9001', downloads: 356 },
  { id: 'iso9-09', title: 'QMS-Audit-Guide-R5', category: 'ISO 9001', downloads: 2867 },
  { id: 'iso9-10', title: 'เคล็ดลับในการ Internal Audit', category: 'ISO 9001', downloads: 935 },
  { id: 'iso9-11', title: 'เหตุผลที่ท่านควรทำ มาตรฐาน ISO9001', category: 'ISO 9001', downloads: 391 },
  { id: 'iso9-12', title: 'การควบคุม outsources ISO9001_2008', category: 'ISO 9001', downloads: 1320 },
  { id: 'iso9-13', title: 'ISO 9001 5.6 การทบทวนฝ่ายบริหาร', category: 'ISO 9001', downloads: 2929 },
  { id: 'iso9-14', title: 'ผู้ควบคุมเอกสาร DCC มีหน้าที่หลัก ๆ อะไร แล้วต้องมีความรู้ด้านไหน', category: 'ISO 9001', downloads: 792 },
  { id: 'iso9-15', title: 'ประกาศแต่งตั้ง ตัวแทนฝ่ายบริหาร', category: 'ISO 9001', downloads: 990 },
  { id: 'iso9-16', title: 'สาระสำคัญของ ISO9001', category: 'ISO 9001', downloads: 785 },
  { id: 'iso9-17', title: 'การจัดตั้งทีมงานคณะกรรมการISO', category: 'ISO 9001', downloads: 572 },
  { id: 'iso9-18', title: 'การรับรองผลการออกแบบ Design Validation ISO9001', category: 'ISO 9001', downloads: 456 },

  // HACCP
  { id: 'haccp-01', title: 'ความรู้เกี่ยวระบบคุณภาพ HACCP', category: 'HACCP', downloads: 1199 },
  { id: 'haccp-02', title: 'HACCP system verification', category: 'HACCP', downloads: 566 },
  { id: 'haccp-03', title: 'รายละเอียดขั้นตอนการทำ HACCP', category: 'HACCP', downloads: 4157 },
  { id: 'haccp-04', title: 'HACCP Verification', category: 'HACCP', downloads: 546 },
  { id: 'haccp-05', title: 'HACCP Verification of CCPs', category: 'HACCP', downloads: 3316 },

  // GMP
  { id: 'gmp-01', title: 'เอกสารที่ใช้ของระบบ GMP', category: 'GMP', downloads: 1000 },
  { id: 'gmp-02', title: 'การออกแบบเครื่องจักรตามระบบ GMP', category: 'GMP', downloads: 597 },
  { id: 'gmp-03', title: 'personel-hygiene-rule', category: 'GMP', downloads: 645 },
  { id: 'gmp-04', title: 'food safety checklist revise 1', category: 'GMP', downloads: 1178 },
  { id: 'gmp-05', title: 'เทคนิคการตรวจสอบความปลอดภัยในอาหาร - โรงงานและบริเวณโดยรอบ', category: 'GMP', downloads: 570 },
  { id: 'gmp-06', title: 'เทคนิคการตรวจสอบความปลอดภัยในอาหาร - กระบวนการผลิต', category: 'GMP', downloads: 687 },
  { id: 'gmp-07', title: 'เทคนิคการตรวจสอบความปลอดภัยในอาหาร - พนักงาน', category: 'GMP', downloads: 480 },
  { id: 'gmp-08', title: 'โปรแกรมสุขลักษณะส่วนบุคคล', category: 'GMP', downloads: 972 }
];

interface DownloadsSectionProps {
  settings: UserSettings;
}

export default function DownloadsSection({ settings }: DownloadsSectionProps) {
  const [documents, setDocuments] = useState<DocumentItem[]>(() => {
    const saved = localStorage.getItem('qaic_download_documents');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse documents from localStorage:', e);
      }
    }
    return DOCUMENT_LIST;
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('qaic_download_documents', JSON.stringify(documents));
  }, [documents]);

  const lang = settings.lang;
  const t = (th: string, en: string) => lang === 'TH' ? th : en;

  const categories = [
    'ALL',
    'QAIC Announcements',
    'Climate Change Announcement',
    'ISO 22000',
    'TS 16949',
    'OHSAS 18001',
    'ISO 14001',
    'ISO 9001',
    'HACCP',
    'GMP'
  ];

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'ALL': return t('ทั้งหมด', 'All Folders');
      case 'QAIC Announcements': return t('ประกาศปรับรูปแบบใบรับรอง', 'QAIC Certificate Format Notices');
      case 'Climate Change Announcement': return t('ประกาศเกณฑ์การตรวจสิ่งแวดล้อม', 'Climate Change Audits');
      case 'ISO 22000': return 'ISO 22000 (Food Safety)';
      case 'TS 16949': return 'TS 16949 (Automotive)';
      case 'OHSAS 18001': return 'OHSAS 18001 (Health & Safety)';
      case 'ISO 14001': return 'ISO 14001 (Environment)';
      case 'ISO 9001': return 'ISO 9001 (Quality)';
      case 'HACCP': return 'HACCP (Hazard Analysis)';
      case 'GMP': return 'GMP (Good Hygiene)';
      default: return cat;
    }
  };

  const filteredDocs = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          doc.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'ALL' || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDownload = async (docItem: DocumentItem) => {
    setDownloadingId(docItem.id);
    
    // Simulate slight network download lag for rich experience
    await new Promise(resolve => setTimeout(resolve, 800));

    try {
      // Initialize jsPDF document (Standard A4 dimensions: 210 x 297 mm)
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      // Set up canvas off-screen to draw perfectly formatted Thai text as high-res images
      const canvas = document.createElement('canvas');
      canvas.width = 1240; // High-res width for A4
      canvas.height = 1754; // High-res height for A4
      const ctx = canvas.getContext('2d');

      if (ctx) {
        // Clear background
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw elegant border
        ctx.strokeStyle = '#1e3a8a'; // QAIC Deep Blue
        ctx.lineWidth = 10;
        ctx.strokeRect(30, 30, canvas.width - 60, canvas.height - 60);

        ctx.strokeStyle = '#d97706'; // Gold/Amber Accent border
        ctx.lineWidth = 2;
        ctx.strokeRect(45, 45, canvas.width - 90, canvas.height - 90);

        // Header - Company Brand
        ctx.fillStyle = '#1e3a8a';
        ctx.font = 'bold 36px "Inter", "Helvetica Neue", sans-serif';
        ctx.fillText('QAIC (THAILAND) CO., LTD.', 80, 110);
        
        ctx.fillStyle = '#64748b';
        ctx.font = '22px "Inter", sans-serif';
        ctx.fillText('บริษัท คิวเอไอซี (ประเทศไทย) จำกัด | ศูนย์การรับรองมาตรฐานสากล', 80, 145);

        // Gold divider line
        ctx.fillStyle = '#d97706';
        ctx.fillRect(80, 170, canvas.width - 160, 4);

        // Document Metadata Block
        ctx.fillStyle = '#f8fafc';
        ctx.fillRect(80, 200, canvas.width - 160, 150);
        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 2;
        ctx.strokeRect(80, 200, canvas.width - 160, 150);

        ctx.fillStyle = '#475569';
        ctx.font = 'bold 20px sans-serif';
        ctx.fillText(`รหัสเอกสาร (DOC ID): QAIC-FM-${docItem.id.toUpperCase()}`, 110, 240);
        ctx.fillText(`หมวดหมู่ (Category): ${docItem.category}`, 110, 275);
        ctx.fillText(`สถานะการจัดหมวดหมู่ (Classification): เอกสารเผยแพร่ทั่วไป / PUBLIC RELEASE`, 110, 310);

        ctx.fillStyle = '#94a3b8';
        ctx.font = '16px sans-serif';
        ctx.fillText('วันเผยแพร่: 23 มิถุนายน 2569 | เวอร์ชัน: 1.0', 780, 240);

        // Official Seal/Logo Graphic watermark
        ctx.strokeStyle = 'rgba(30, 58, 138, 0.08)';
        ctx.lineWidth = 8;
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2 + 100, 220, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fillStyle = 'rgba(30, 58, 138, 0.04)';
        ctx.fill();

        ctx.fillStyle = 'rgba(30, 58, 138, 0.07)';
        ctx.font = 'bold 32px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('QAIC THAILAND', canvas.width / 2, canvas.height / 2 + 80);
        ctx.fillText('CERTIFIED DOCUMENT', canvas.width / 2, canvas.height / 2 + 130);
        ctx.textAlign = 'left'; // Reset

        // Document Title
        ctx.fillStyle = '#0f172a';
        ctx.font = 'bold 28px sans-serif';
        
        // Wrap text for title if it is too long
        const words = docItem.title.split(' ');
        let line = '';
        let titleY = 410;
        const maxWidth = canvas.width - 200;
        
        // Simple Thai wrapping approximations
        const titleChars = docItem.title.split('');
        let currentLine = '';
        for (let n = 0; n < titleChars.length; n++) {
          currentLine += titleChars[n];
          if (currentLine.length > 50 || n === titleChars.length - 1) {
            ctx.fillText(currentLine, 80, titleY);
            titleY += 40;
            currentLine = '';
          }
        }

        // Content Divider line
        ctx.fillStyle = '#e2e8f0';
        ctx.fillRect(80, titleY + 10, canvas.width - 160, 2);

        // Document Body Contents
        ctx.fillStyle = '#334155';
        ctx.font = 'bold 22px sans-serif';
        ctx.fillText('คำชี้แจงและรายละเอียดการนำไปใช้ (Instructions & Context):', 80, titleY + 60);

        ctx.fillStyle = '#475569';
        ctx.font = '20px sans-serif';
        let bodyY = titleY + 110;

        const printParagraph = (text: string) => {
          let currentLine = '';
          const charLimit = 75;
          for (let i = 0; i < text.length; i++) {
            currentLine += text[i];
            if (currentLine.length >= charLimit || i === text.length - 1) {
              ctx.fillText(currentLine.trim(), 80, bodyY);
              bodyY += 35;
              currentLine = '';
            }
          }
          bodyY += 15; // spacing
        };

        printParagraph('1. เอกสารฉบับนี้เป็นส่วนหนึ่งของระบบสนับสนุนการขึ้นทะเบียนและตรวจประเมินระบบบริหารจัดการมาตรฐานสากล โดยบริษัท คิวเอไอซี (ประเทศไทย) จำกัด เพื่ออำนวยความสะดวกให้ผู้รับการประเมินศึกษาและปฏิบัติตามข้อกำหนด');
        printParagraph('2. โปรดใช้เอกสารนี้เพื่อการอ้างอิงภายในองค์กรสำหรับการออกแบบกระบวนการตามเกณฑ์การตรวจประเมิน และนำส่งเป็นส่วนหนึ่งของแฟ้มเอกสารระบบงานเมื่อได้รับการร้องขอจากผู้ตรวจประเมินอาวุโส (Senior Auditor)');
        printParagraph('3. การแก้ไข ดัดแปลง หรือนำส่วนหนึ่งส่วนใดของแบบฟอร์มนี้ไปเผยแพร่เชิงพาณิชย์โดยไม่ได้รับอนุญาตเป็นลายลักษณ์อักษรจาก QAIC Thailand ถือเป็นการละเมิดข้อตกลงและลิขสิทธิ์สากล');

        // Checklist Section table
        ctx.fillStyle = '#0f172a';
        ctx.font = 'bold 22px sans-serif';
        ctx.fillText('ตารางเช็คลิสต์ตรวจสอบเบื้องต้น (Preliminary Compliance Checklist):', 80, bodyY + 20);

        bodyY += 70;
        
        // Draw Table Header
        ctx.fillStyle = '#1e3a8a';
        ctx.fillRect(80, bodyY, canvas.width - 160, 45);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 18px sans-serif';
        ctx.fillText('ลำดับ (No.)', 100, bodyY + 30);
        ctx.fillText('ข้อกำหนด / รายการตรวจสอบ (Requirements & Verification Items)', 240, bodyY + 30);
        ctx.fillText('สถานะ (Status)', 960, bodyY + 30);

        // Draw Table Rows
        bodyY += 45;
        const checklistItems = [
          'การจัดตั้งคณะทำงานและกำหนดขอบข่ายขอบเขตความรับผิดชอบอย่างเป็นทางการ',
          'การจัดทำคู่มือและระบบบันทึกเอกสารการทำงานที่สอดคล้องตามข้อกำหนดระบุ',
          'การดำเนินการประเมินความเสี่ยงและจุดวิกฤตของขั้นตอนทำงาน (Risk Assessment)',
          'การจัดหลักสูตรปฐมนิเทศฝึกอบรมความรู้ความเข้าใจมาตรฐานสำหรับผู้เกี่ยวข้อง',
          'การดำเนินการตรวจประเมินภายใน (Internal Audit) และประเมินประสิทธิผลระบบงาน',
          'การประชุมผู้บริหารเพื่อทบทวนรายงานและปรับปรุงข้อบกพร่องตามแผนงาน (Management Review)'
        ];

        checklistItems.forEach((item, idx) => {
          // Row background
          ctx.fillStyle = idx % 2 === 0 ? '#f8fafc' : '#ffffff';
          ctx.fillRect(80, bodyY, canvas.width - 160, 50);
          ctx.strokeStyle = '#e2e8f0';
          ctx.lineWidth = 1;
          ctx.strokeRect(80, bodyY, canvas.width - 160, 50);

          ctx.fillStyle = '#334155';
          ctx.font = '18px sans-serif';
          ctx.fillText(`0${idx + 1}`, 120, bodyY + 32);

          // Wrap table cell text
          let cellText = item;
          if (cellText.length > 55) {
            cellText = cellText.slice(0, 52) + '...';
          }
          ctx.fillText(cellText, 240, bodyY + 32);

          // Draw empty checkbox for status
          ctx.strokeStyle = '#94a3b8';
          ctx.strokeRect(980, bodyY + 15, 20, 20);

          bodyY += 50;
        });

        // Signatures Block
        bodyY += 80;
        ctx.fillStyle = '#64748b';
        ctx.fillRect(80, bodyY, canvas.width - 160, 2);
        
        bodyY += 50;
        ctx.fillStyle = '#475569';
        ctx.font = 'bold 18px sans-serif';
        ctx.fillText('ลงชื่อผู้อนุมัติเอกสาร (Authorized Approver)', 100, bodyY);
        ctx.fillText('ประทับตราทางการ (Official Seal)', 780, bodyY);

        ctx.font = '18px sans-serif';
        ctx.fillText('___________________________________', 100, bodyY + 80);
        ctx.fillText('(ฝ่ายบริหารงานระบบรับรองมาตรฐาน QAIC)', 100, bodyY + 120);

        // Stamp circle outline
        ctx.strokeStyle = 'rgba(217, 119, 6, 0.4)';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(880, bodyY + 80, 55, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fillStyle = 'rgba(217, 119, 6, 0.1)';
        ctx.fill();

        ctx.fillStyle = 'rgba(217, 119, 6, 0.7)';
        ctx.font = 'bold 12px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('QAIC THAILAND', 880, bodyY + 70);
        ctx.fillText('APPROVED', 880, bodyY + 88);
        ctx.fillText('2026', 880, bodyY + 106);
        ctx.textAlign = 'left'; // Reset

        // Footer
        ctx.fillStyle = '#94a3b8';
        ctx.font = '14px sans-serif';
        ctx.fillText('เอกสารทางการของ บริษัท คิวเอไอซี (ประเทศไทย) จำกัด | สำนักงานใหญ่ กรุงเทพมหานคร', 80, canvas.height - 80);
        ctx.textAlign = 'right';
        ctx.fillText(`รหัสการดาวน์โหลดไฟล์: DL-${docItem.downloads + 1} | หน้า 1 จาก 1`, canvas.width - 80, canvas.height - 80);
        ctx.textAlign = 'left'; // Reset
      }

      // Convert canvas to image data
      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      
      // Save canvas image as full-page PDF
      pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297);
      
      // Save file download trigger
      const safeFilename = docItem.title.replace(/[\s\/\(\)_]+/g, '_') + '.pdf';
      pdf.save(safeFilename);

      // Increment download counter state
      setDocuments(prev => prev.map(d => {
        if (d.id === docItem.id) {
          return { ...d, downloads: d.downloads + 1 };
        }
        return d;
      }));

    } catch (err) {
      console.error('Failed to generate PDF:', err);
      alert(t('เกิดข้อผิดพลาดในการดาวน์โหลดกรุณาลองใหม่อีกครั้ง', 'Download failed. Please try again.'));
    } finally {
      setDownloadingId(null);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 md:px-8 pb-12">
      {/* Title Header */}
      <div className="text-left space-y-3">
        <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white flex items-center gap-3">
          <FileText className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          <span>{t('ดาวน์โหลดเอกสารและแบบฟอร์ม', 'Document Center & Forms')}</span>
        </h2>
        <p className="text-sm text-gray-500 dark:text-slate-400 max-w-3xl leading-relaxed">
          {t('ศูนย์ดาวน์โหลดแบบฟอร์มประกาศทางการ เช็คลิสต์ และระเบียบปฏิบัติมาตรฐานสากลเพื่อการศึกษาและปรับปรุงระบบงานของท่าน ทุกรายการสามารถคลิกเพื่อดาวน์โหลดเป็นเอกสาร PDF ของแท้ได้ฟรีทันที', 
             'Official resource center for downloading standard documents, checklists, announcements, and compliance templates. Click any item to generate and download a certified PDF file for free.')}
        </p>
      </div>

      {/* Filters & Search */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Category Sidebar - Desktop view */}
        <div className="hidden lg:block bg-white/40 dark:bg-slate-900/40 backdrop-blur-[35px] border border-slate-200/50 dark:border-white/10 p-5 rounded-[2rem] space-y-1.5 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] dark:shadow-none">
          <span className="text-[10px] font-bold text-gray-600 dark:text-slate-500 uppercase tracking-widest block mb-4 px-2">
            {t('หมวดหมู่เอกสาร', 'Document Folders')}
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-semibold flex items-center justify-between transition-all cursor-pointer border-none ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/10'
                  : 'bg-transparent text-gray-700 hover:bg-gray-100/50 dark:text-slate-300 dark:hover:bg-slate-950/20'
              }`}
            >
              <span className="line-clamp-1">{getCategoryLabel(cat)}</span>
              {selectedCategory === cat ? (
                <Check className="w-3.5 h-3.5" />
              ) : (
                <ChevronRight className="w-3 h-3 text-gray-400" />
              )}
            </button>
          ))}
        </div>

        {/* Search and Grid Area */}
        <div className="lg:col-span-3 space-y-6">
          {/* Search bar & Category dropdown for mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="relative sm:col-span-2">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder={t('ค้นหาชื่อเอกสาร หรือมาตรฐานที่เกี่ยวข้อง...', 'Search files by title or keywords...')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/40 dark:bg-slate-950/40 border border-slate-200/50 dark:border-slate-800 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-gray-900 dark:text-white"
              />
            </div>
            {/* Category Select for Tablet/Mobile viewport */}
            <div className="block lg:hidden">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 bg-white/40 dark:bg-slate-950/40 border border-slate-200/50 dark:border-slate-800 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-gray-900 dark:text-white"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat} className="text-gray-900">
                    {getCategoryLabel(cat)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Document list grid */}
          <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-slate-800">
            <AnimatePresence mode="popLayout">
              {filteredDocs.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-16 bg-white/30 dark:bg-slate-900/20 rounded-[2rem] border border-dashed border-gray-150/50 dark:border-slate-850/50"
                >
                  <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-xs text-gray-500 dark:text-slate-400 font-sans">
                    {t('ไม่พบเอกสารตรงตามคำค้นหาของคุณ', 'No documents found matching your search term.')}
                  </p>
                </motion.div>
              ) : (
                filteredDocs.map((docItem) => (
                  <motion.div
                    key={docItem.id}
                    layoutId={docItem.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-[35px] border border-slate-200/50 dark:border-white/10 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] dark:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.15)] rounded-2xl p-4 flex items-center justify-between gap-4 hover:bg-white/60 dark:hover:bg-slate-900/60 transition-all duration-200 group relative overflow-hidden"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      {/* Document icon box */}
                      <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-650 dark:text-blue-400 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-250 border border-blue-150/30 dark:border-blue-800/20">
                        <FileText className="w-5 h-5" />
                      </div>
                      
                      {/* Title & Folder label */}
                      <div className="text-left min-w-0">
                        <h4 className="text-xs md:text-sm font-semibold text-gray-900 dark:text-white line-clamp-1 leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors pr-2">
                          {docItem.title}
                        </h4>
                        
                        <div className="flex items-center gap-3 mt-1 text-[10px] text-gray-500 dark:text-slate-500 font-sans font-medium">
                          <span className="bg-gray-100 dark:bg-slate-950/40 px-2 py-0.5 rounded border border-gray-150/30 dark:border-slate-850/40">
                            {docItem.category}
                          </span>
                          <span className="flex items-center gap-1">
                            <TrendingUp className="w-3.5 h-3.5 text-gray-400" />
                            <span>{t(`ดาวน์โหลด ${docItem.downloads.toLocaleString()} ครั้ง`, `Downloaded ${docItem.downloads.toLocaleString()} times`)}</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Download Button */}
                    <button
                      onClick={() => handleDownload(docItem)}
                      disabled={downloadingId !== null}
                      className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-md shadow-blue-600/10 border-none cursor-pointer active:scale-95 disabled:bg-gray-250 dark:disabled:bg-slate-800 disabled:text-gray-500 dark:disabled:text-slate-500 disabled:shadow-none"
                    >
                      {downloadingId === docItem.id ? (
                        <>
                          <span className="animate-spin inline-block w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full" />
                          <span className="hidden sm:inline">{t('กำลังเตรียม...', 'Preparing...')}</span>
                        </>
                      ) : (
                        <>
                          <Download className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">{t('ดาวน์โหลด PDF', 'Download PDF')}</span>
                        </>
                      )}
                    </button>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
