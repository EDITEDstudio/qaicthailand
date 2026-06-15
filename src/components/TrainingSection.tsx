/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
 Search, 
 Calendar, 
 MapPin, 
 Clock, 
 ChevronRight, 
 ChevronLeft,
 Trash2,
 Edit3,
 ArrowRight,
 BookOpen,
 GraduationCap,
 Mail,
 ShieldCheck,
 CheckCircle2,
 Award,
 Leaf,
 Stethoscope,
 Palette,
 Car,
 Zap,
 RefreshCcw,
 ClipboardCheck,
 Utensils,
 Settings,
 ShieldAlert,
 FlaskConical,
 Filter as LucideFilter
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserSettings } from '../types';

interface TrainingSectionProps {
 settings: UserSettings;
 onContactClick: () => void;
}

interface Course {
 id: string;
 code: string;
 title: string;
 titleEN: string;
 category: 'MANAGEMENT' | 'FOOD SAFETY' | 'TECHNICAL' | 'LEAN' | 'MEDICAL';
 series: string;
 seriesEN: string;
 standard: string;
 duration: string;
 durationEN: string;
 location: string;
 locationEN: string;
 price: number;
 image: string;
 description?: string;
 descriptionEN?: string;
}

interface ScheduledEvent {
 id: string;
 courseId: string;
 date: string;
 location: string;
 locationEN: string;
 time: string;
}

const COURSES: Course[] = [
 // Lead Auditor CQI-IRCA Course (Image 11)
 {
 id: 'lead-01',
 code: 'LEAD-01',
 title: 'Lead Auditor ISO 9001 : 2015 CQI-IRCA Course',
 titleEN: 'Lead Auditor ISO 9001 : 2015 CQI-IRCA Course',
 category: 'MANAGEMENT',
 series: 'Lead Auditor CQI-IRCA Course',
 seriesEN: 'Lead Auditor CQI-IRCA Course',
 standard: 'ISO 9001',
 duration: '5 วัน',
 durationEN: '5 days',
 location: 'กรุงเทพฯ (On-site)',
 locationEN: 'Bangkok (On-site)',
 price: 35000,
 image: 'input_file_10.png',
 description: 'หลักสูตรผู้ตรวจประเมินหัวหน้าทีมที่ได้รับการรับรองสากล มุ่งเน้นการตรวจประเมินระบบบริหารงานคุณภาพ',
 descriptionEN: 'Internationally certified Lead Auditor course focusing on quality management system auditing.'
 },
 {
 id: 'lead-02',
 code: 'LEAD-02',
 title: 'Lead Auditor ISO 14001 : 2015 CQI-IRCA Course',
 titleEN: 'Lead Auditor ISO 14001 : 2015 CQI-IRCA Course',
 category: 'MANAGEMENT',
 series: 'Lead Auditor CQI-IRCA Course',
 seriesEN: 'Lead Auditor CQI-IRCA Course',
 standard: 'ISO 14001',
 duration: '5 วัน',
 durationEN: '5 days',
 location: 'กรุงเทพฯ (On-site)',
 locationEN: 'Bangkok (On-site)',
 price: 35000,
 image: 'input_file_10.png',
 description: 'พัฒนาทักษะการตรวจประเมินระบบจัดการสิ่งแวดล้อมในระดับสากล',
 descriptionEN: 'Develop environmental management system auditing skills at an international level.'
 },
 {
 id: 'lead-03',
 code: 'LEAD-03',
 title: 'Lead Auditor ISO 45001 : 2018 CQI-IRCA Course',
 titleEN: 'Lead Auditor ISO 45001 : 2018 CQI-IRCA Course',
 category: 'MANAGEMENT',
 series: 'Lead Auditor CQI-IRCA Course',
 seriesEN: 'Lead Auditor CQI-IRCA Course',
 standard: 'ISO 45001',
 duration: '5 วัน',
 durationEN: '5 days',
 location: 'กรุงเทพฯ (On-site)',
 locationEN: 'Bangkok (On-site)',
 price: 35000,
 image: 'input_file_10.png',
 description: 'หลักสูตรระดับสูงสำหรับการตรวจประเมินระบบอาชีวอนามัยและความปลอดภัย',
 descriptionEN: 'Advanced course for auditing occupational health and safety systems.'
 },
 {
 id: 'lead-04',
 code: 'LEAD-04',
 title: 'Lead Auditor ISO 9001 : 2015 with IATF CQI-IRCA Course',
 titleEN: 'Lead Auditor ISO 9001 : 2015 with IATF CQI-IRCA Course',
 category: 'MANAGEMENT',
 series: 'Lead Auditor CQI-IRCA Course',
 seriesEN: 'Lead Auditor CQI-IRCA Course',
 standard: 'ISO 9001 / IATF',
 duration: '5 วัน',
 durationEN: '5 days',
 location: 'กรุงเทพฯ (On-site)',
 locationEN: 'Bangkok (On-site)',
 price: 38000,
 image: 'input_file_0.png',
 description: 'เจาะลึกการตรวจประเมินระบบคุณภาพสำหรับอุตสาหกรรมยานยนต์ตามมาตรฐาน IATF 16949',
 descriptionEN: 'In-depth quality system auditing for the automotive industry according to IATF 16949.'
 },
 {
 id: 'lead-05',
 code: 'LEAD-05',
 title: 'Lead Auditor ISO 22000 : 2018 CQI-IRCA Course',
 titleEN: 'Lead Auditor ISO 22000 : 2018 CQI-IRCA Course',
 category: 'FOOD SAFETY',
 series: 'Lead Auditor CQI-IRCA Course',
 seriesEN: 'Lead Auditor CQI-IRCA Course',
 standard: 'ISO 22000',
 duration: '5 วัน',
 durationEN: '5 days',
 location: 'กรุงเทพฯ (On-site)',
 locationEN: 'Bangkok (On-site)',
 price: 35000,
 image: 'input_file_0.png',
 description: 'หลักสูตรหัวหน้าผู้ตรวจประเมินระบบความครอบคลุมความปลอดภัยด้านอาหาร',
 descriptionEN: 'Lead auditor course for comprehensive food safety management systems.'
 },
 {
 id: 'lead-06',
 code: 'LEAD-06',
 title: 'Lead Auditor ISO 50001 : 2018 CQI-IRCA Course',
 titleEN: 'Lead Auditor ISO 50001 : 2018 CQI-IRCA Course',
 category: 'TECHNICAL',
 series: 'Lead Auditor CQI-IRCA Course',
 seriesEN: 'Lead Auditor CQI-IRCA Course',
 standard: 'ISO 50001',
 duration: '5 วัน',
 durationEN: '5 days',
 location: 'กรุงเทพฯ (On-site)',
 locationEN: 'Bangkok (On-site)',
 price: 35000,
 image: 'input_file_0.png',
 description: 'หลักสูตรระดับสากลสำหรับการตรวจประเมินระบบการจัดการพลังงาน',
 descriptionEN: 'International course for auditing energy management systems.'
 },
 {
 id: 'lead-07',
 code: 'LEAD-07',
 title: 'Lead Auditor ISO 13485 : 2016 CQI-IRCA Course',
 titleEN: 'Lead Auditor ISO 13485 : 2016 CQI-IRCA Course',
 category: 'TECHNICAL',
 series: 'Lead Auditor CQI-IRCA Course',
 seriesEN: 'Lead Auditor CQI-IRCA Course',
 standard: 'ISO 13485',
 duration: '5 วัน',
 durationEN: '5 days',
 location: 'กรุงเทพฯ (On-site)',
 locationEN: 'Bangkok (On-site)',
 price: 38000,
 image: 'input_file_0.png',
 description: 'หลักสูตรหัวหน้าผู้ตรวจประเมินระบบการจัดการคุณภาพสำหรับเครื่องมือแพทย์',
 descriptionEN: 'Lead auditor course for medical device quality management systems.'
 },
 {
 id: 'lead-08',
 code: 'LEAD-08',
 title: 'Lead Auditor ISO 27001 : 2013 CQI-IRCA Course',
 titleEN: 'Lead Auditor ISO 27001 : 2013 CQI-IRCA Course',
 category: 'TECHNICAL',
 series: 'Lead Auditor CQI-IRCA Course',
 seriesEN: 'Lead Auditor CQI-IRCA Course',
 standard: 'ISO 27001',
 duration: '5 วัน',
 durationEN: '5 days',
 location: 'กรุงเทพฯ (On-site)',
 locationEN: 'Bangkok (On-site)',
 price: 35000,
 image: 'input_file_0.png',
 description: 'หลักสูตรการตรวจประเมินระบบการจัดการความปลอดภัยของข้อมูลตามมาตรฐานสากล',
 descriptionEN: 'Information security management system auditing course according to ISO 27001.'
 },

 // PSM MANAGENT SYSTEM TRAINING COURSE (Image 9)
 {
 id: 'psm-01',
 code: 'PSM-01',
 title: 'ผู้ตรวจประเมิณภายนอก (PSM External Auditor)',
 titleEN: 'PSM External Auditor',
 category: 'TECHNICAL',
 series: 'PSM MANAGENT SYSTEM TRAINING COURSE',
 seriesEN: 'PSM MANAGENT SYSTEM TRAINING COURSE',
 standard: 'PSM',
 duration: '3 วัน',
 durationEN: '3 days',
 location: 'กรุงเทพฯ (On-site)',
 locationEN: 'Bangkok (On-site)',
 price: 25000,
 image: 'input_file_1.png',
 description: 'หลักสูตรสำหรับผู้ตรวจประเมินภายนอกตามระบบการจัดการความปลอดภัยกระบวนการผลิต (PSM) เพื่อความปลอดภัยสูงสุดในโรงงานอุตสาหกรรม',
 descriptionEN: 'Course for external auditors in Process Safety Management (PSM) to ensure maximum safety in industrial plants.'
 },
 {
 id: 'psm-03',
 code: 'PSM-03',
 title: 'ผู้ตรวจประเมิณภายใน (PSM Internal Auditor)',
 titleEN: 'PSM Internal Auditor',
 category: 'TECHNICAL',
 series: 'PSM MANAGENT SYSTEM TRAINING COURSE',
 seriesEN: 'PSM MANAGENT SYSTEM TRAINING COURSE',
 standard: 'PSM',
 duration: '2 วัน',
 durationEN: '2 days',
 location: 'กรุงเทพฯ (On-site)',
 locationEN: 'Bangkok (On-site)',
 price: 15000,
 image: 'input_file_1.png',
 description: 'การเตรียมความพร้อมสำหรับบุคลากรภายในเพื่อทำการตรวจประเมินระบบ PSM ตามมาตรฐานสากล',
 descriptionEN: 'Preparation for internal personnel to conduct PSM system audits according to international standards.'
 },

 // ENVIRONMENTAL MANAGEMENT SYSTEM TRAINING COURSE (Image 10)
 {
 id: 'ems-01',
 code: 'EMS-01',
 title: 'ข้อกำหนด ISO 14001:2015 สำหรับโรงงานมลพิษสิ่งแวดล้อมสูง',
 titleEN: 'ISO 14001:2015 Requirement for High Pollution Plants',
 category: 'TECHNICAL',
 series: 'ENVIRONMENTAL MANAGEMENT SYSTEM TRAINING COURSE',
 seriesEN: 'ENVIRONMENTAL MANAGEMENT SYSTEM TRAINING COURSE',
 standard: 'ISO 14001',
 duration: '2 วัน',
 durationEN: '2 days',
 location: 'ระยอง (On-site)',
 locationEN: 'Rayong (On-site)',
 price: 18000,
 image: 'input_file_2.png',
 description: 'เจาะลึกข้อกำหนด ISO 14001 สำหรับโรงงานอุตสาหกรรมกลุ่มเสี่ยงมลพิษสูง',
 descriptionEN: 'In-depth ISO 14001 requirements for industrial plants with high pollution risk.'
 },
 {
 id: 'ems-02',
 code: 'EMS-02',
 title: 'ISO 14001:2015 INTERNAL AUDIT',
 titleEN: 'ISO 14001:2015 INTERNAL AUDIT',
 category: 'TECHNICAL',
 series: 'ENVIRONMENTAL MANAGEMENT SYSTEM TRAINING COURSE',
 seriesEN: 'ENVIRONMENTAL MANAGEMENT SYSTEM TRAINING COURSE',
 standard: 'ISO 14001',
 duration: '2 วัน',
 durationEN: '2 days',
 location: 'ระยอง (On-site)',
 locationEN: 'Rayong (On-site)',
 price: 15000,
 image: 'input_file_2.png',
 description: 'หลักสูตรการตรวจประเมินภายในเพื่อรักษาระบบการจัดการสิ่งแวดล้อมให้ยั่งยืน',
 descriptionEN: 'Internal audit course to maintain sustainable environmental management systems.'
 },

 // QUALITY MANAGEMENT SYSTEM TRAINING COURSE (Image 1)
 {
 id: 'qms-01',
 code: 'QMS-01',
 title: 'Interpretation ISO 9001 : 2015 Requirement',
 titleEN: 'Interpretation ISO 9001 : 2015 Requirement',
 category: 'MANAGEMENT',
 series: 'QUALITY MANAGEMENT SYSTEM TRAINING COURSE',
 seriesEN: 'QUALITY MANAGEMENT SYSTEM TRAINING COURSE',
 standard: 'ISO 9001',
 duration: '2 วัน',
 durationEN: '2 days',
 location: 'กรุงเทพฯ (On-site)',
 locationEN: 'Bangkok (On-site)',
 price: 12000,
 image: 'input_file_0.png',
 description: 'การตีความข้อกำหนดมาตรฐาน ISO 9001:2015 เพื่อการประยุกต์ใช้งานอย่างมีประสิทธิภาพ',
 descriptionEN: 'Interpreting ISO 9001:2015 requirements for effective application.'
 },
 {
 id: 'qms-02',
 code: 'QMS-02',
 title: 'ISO 9001 : 2015 Internal Audit',
 titleEN: 'ISO 9001 : 2015 Internal Audit',
 category: 'MANAGEMENT',
 series: 'QUALITY MANAGEMENT SYSTEM TRAINING COURSE',
 seriesEN: 'QUALITY MANAGEMENT SYSTEM TRAINING COURSE',
 standard: 'ISO 9001',
 duration: '2 วัน',
 durationEN: '2 days',
 location: 'กรุงเทพฯ (On-site)',
 locationEN: 'Bangkok (On-site)',
 price: 12000,
 image: 'input_file_0.png',
 description: 'หลักสูตรฝึกอบรมการตรวจประเมินภายในตามระบบ ISO 9001 เพื่อการพัฒนาอย่างต่อเนื่อง',
 descriptionEN: 'Internal audit training course according to ISO 9001 for continuous improvement.'
 },
 {
 id: 'qms-03',
 code: 'QMS-03',
 title: 'Risk management for ISO 9001 : 2015',
 titleEN: 'Risk management for ISO 9001 : 2015',
 category: 'MANAGEMENT',
 series: 'QUALITY MANAGEMENT SYSTEM TRAINING COURSE',
 seriesEN: 'QUALITY MANAGEMENT SYSTEM TRAINING COURSE',
 standard: 'ISO 9001',
 duration: '1 วัน',
 durationEN: '1 day',
 location: 'กรุงเทพฯ (On-site)',
 locationEN: 'Bangkok (On-site)',
 price: 8000,
 image: 'input_file_0.png',
 description: 'เทคนิคการบริหารความเสี่ยงสำหรับระบบบริหารงานคุณภาพยุคใหม่',
 descriptionEN: 'Risk management techniques for modern quality management systems.'
 },

 // OCCUPATIONAL HEALTH & SAFEY MANAGEMENT SYSTEM TRAINING COURSE (Image 9)
 {
 id: 'ohs-01',
 code: 'OHS-01',
 title: 'Interpretation ISO45001 : 2018 Requirement',
 titleEN: 'Interpretation ISO45001 : 2018 Requirement',
 category: 'MANAGEMENT',
 series: 'OCCUPATIONAL HEALTH & SAFEY MANAGEMENT SYSTEM TRAINING COURSE',
 seriesEN: 'OCCUPATIONAL HEALTH & SAFEY MANAGEMENT SYSTEM TRAINING COURSE',
 standard: 'ISO 45001',
 duration: '2 วัน',
 durationEN: '2 days',
 location: 'กรุงเทพฯ (On-site)',
 locationEN: 'Bangkok (On-site)',
 price: 12000,
 image: 'input_file_4.png',
 description: 'เรียนรู้ข้อกำหนดของมาตรฐานอาชีวอนามัยและความปลอดภัย เพื่อความปลอดภัยของพนักงานทุกคน',
 descriptionEN: 'Learn the requirements of Occupational Health and Safety standards for the safety of all employees.'
 },
 {
 id: 'ohs-02',
 code: 'OHS-02',
 title: 'ISO45001 : 2018 Internal Audit',
 titleEN: 'ISO45001 : 2018 Internal Audit',
 category: 'MANAGEMENT',
 series: 'OCCUPATIONAL HEALTH & SAFEY MANAGEMENT SYSTEM TRAINING COURSE',
 seriesEN: 'OCCUPATIONAL HEALTH & SAFEY MANAGEMENT SYSTEM TRAINING COURSE',
 standard: 'ISO 45001',
 duration: '2 วัน',
 durationEN: '2 days',
 location: 'กรุงเทพฯ (On-site)',
 locationEN: 'Bangkok (On-site)',
 price: 12000,
 image: 'input_file_4.png',
 description: 'การฝึกทักษะการตรวจประเมินภายในสำหรับระบบ ISO 45001:2018',
 descriptionEN: 'Internal audit skills training for ISO 45001:2018 systems.'
 },

 // COSMATIC INDUSTRY TRAINING COURSE (Image 4)
 {
 id: 'cos-01',
 code: 'COS-01',
 title: 'GMP Asean Cosmetic',
 titleEN: 'GMP Asean Cosmetic',
 category: 'TECHNICAL',
 series: 'COSMATIC INDUSTRY TRAINING COURSE',
 seriesEN: 'COSMATIC INDUSTRY TRAINING COURSE',
 standard: 'GMP Asean',
 duration: '2 วัน',
 durationEN: '2 days',
 location: 'กรุงเทพฯ (On-site)',
 locationEN: 'Bangkok (On-site)',
 price: 12000,
 image: 'input_file_5.png',
 description: 'ข้อกำหนดการผลิตเครื่องสำอางตามมาตรฐานอาเซียนเพื่อความปลอดภัยของผู้บริโภค',
 descriptionEN: 'Cosmetic manufacturing requirements according to ASEAN standards for consumer safety.'
 },
 {
 id: 'cos-02',
 code: 'COS-02',
 title: 'ISO22716:2007 มาตรฐานเครื่องสำอางค์',
 titleEN: 'ISO22716:2007 Cosmetic Standard',
 category: 'TECHNICAL',
 series: 'COSMATIC INDUSTRY TRAINING COURSE',
 seriesEN: 'COSMATIC INDUSTRY TRAINING COURSE',
 standard: 'ISO 22716',
 duration: '2 วัน',
 durationEN: '2 days',
 location: 'กรุงเทพฯ (On-site)',
 locationEN: 'Bangkok (On-site)',
 price: 15000,
 image: 'input_file_3.png',
 description: 'มาตรฐานระบบการผลิตที่ดีสำหรับเครื่องสำอางในระดับสากล',
 descriptionEN: 'Good Manufacturing Practices for cosmetics at an international level.'
 },

 // AUTOMOTIVE MANAGEMENT SYSTEM TRAINING COURSE (Image 1)
 {
 id: 'iatf-01',
 code: 'IATF-01',
 title: 'IATF 16949:2016 Requirement & Implementation',
 titleEN: 'IATF 16949:2016 Requirement & Implementation',
 category: 'MANAGEMENT',
 series: 'AUTOMOTIVE MANAGEMENT SYSTEM TRAINING COURSE',
 seriesEN: 'AUTOMOTIVE MANAGEMENT SYSTEM TRAINING COURSE',
 standard: 'IATF 16949',
 duration: '2 วัน',
 durationEN: '2 days',
 location: 'กรุงเทพฯ (On-site)',
 locationEN: 'Bangkok (On-site)',
 price: 15000,
 image: 'input_file_3.png',
 description: 'ข้อกำหนดพื้นฐานและการตีความมาตรฐาน IATF 16949 สำหรับอุตสาหกรรมยานยนต์',
 descriptionEN: 'Basic requirements and interpretation of IATF 16949 for the automotive industry.'
 },
 {
 id: 'iatf-02',
 code: 'IATF-02',
 title: 'IATF 16949:2016 Internal Audit',
 titleEN: 'IATF 16949:2016 Internal Audit',
 category: 'MANAGEMENT',
 series: 'AUTOMOTIVE MANAGEMENT SYSTEM TRAINING COURSE',
 seriesEN: 'AUTOMOTIVE MANAGEMENT SYSTEM TRAINING COURSE',
 standard: 'IATF 16949',
 duration: '2 วัน',
 durationEN: '2 days',
 location: 'กรุงเทพฯ (On-site)',
 locationEN: 'Bangkok (On-site)',
 price: 15000,
 image: 'input_file_0.png',
 description: 'การฝึกทักษะการตรวจประเมินภายในตามมาตรฐานสากลยานยนต์',
 descriptionEN: 'Internal audit skills training according to international automotive standards.'
 },
 {
 id: 'iatf-03',
 code: 'IATF-03',
 title: 'AIAG and VDA FMEA reversion 2019',
 titleEN: 'AIAG and VDA FMEA reversion 2019',
 category: 'MANAGEMENT',
 series: 'AUTOMOTIVE MANAGEMENT SYSTEM TRAINING COURSE',
 seriesEN: 'AUTOMOTIVE MANAGEMENT SYSTEM TRAINING COURSE',
 standard: 'FMEA',
 duration: '2 วัน',
 durationEN: '2 days',
 location: 'กรุงเทพฯ (On-site)',
 locationEN: 'Bangkok (On-site)',
 price: 18000,
 image: 'input_file_0.png',
 description: 'การอัปเดตมาตรฐานการวิเคราะห์ลักษณะข้อบกพร่องและผลกระทบตามเกณฑ์ AIAG และ VDA ล่าสุด',
 descriptionEN: 'Updating FMEA standards according to the latest AIAG and VDA criteria.'
 },
 {
 id: 'iatf-04',
 code: 'IATF-04',
 title: 'Advance Product Quality Planning : APQP',
 titleEN: 'Advance Product Quality Planning : APQP',
 category: 'MANAGEMENT',
 series: 'AUTOMOTIVE MANAGEMENT SYSTEM TRAINING COURSE',
 seriesEN: 'AUTOMOTIVE MANAGEMENT SYSTEM TRAINING COURSE',
 standard: 'APQP',
 duration: '1 วัน',
 durationEN: '1 day',
 location: 'กรุงเทพฯ (On-site)',
 locationEN: 'Bangkok (On-site)',
 price: 8000,
 image: 'input_file_0.png',
 description: 'กระบวนการวางแผนคุณภาพผลิตภัณฑ์ล่วงหน้าเพื่อตอบสนองความต้องการของลูกค้าอุตสาหกรรมยานยนต์',
 descriptionEN: 'Advanced product quality planning process to meet automotive industry customer requirements.'
 },
 {
 id: 'iatf-05',
 code: 'IATF-05',
 title: 'Failure Mode and Effects Analysis (FMEA)4th Edition(IATF-05)',
 titleEN: 'Failure Mode and Effects Analysis (FMEA)4th Edition',
 category: 'MANAGEMENT',
 series: 'AUTOMOTIVE MANAGEMENT SYSTEM TRAINING COURSE',
 seriesEN: 'AUTOMOTIVE MANAGEMENT SYSTEM TRAINING COURSE',
 standard: 'FMEA 4th',
 duration: '1 วัน',
 durationEN: '1 day',
 location: 'กรุงเทพฯ (On-site)',
 locationEN: 'Bangkok (On-site)',
 price: 8000,
 image: 'input_file_0.png',
 description: 'การฝึกหัดวิเคราะห์ผลกระทบและความล้มเหลวตามมาตรฐานฉบับที่ 4',
 descriptionEN: 'Failure mode and effects analysis training according to the 4th edition standard.'
 },
 {
 id: 'iatf-06',
 code: 'IATF-06',
 title: 'Measurement System Analysis (MSA)4th Edition',
 titleEN: 'Measurement System Analysis (MSA)4th Edition',
 category: 'MANAGEMENT',
 series: 'AUTOMOTIVE MANAGEMENT SYSTEM TRAINING COURSE',
 seriesEN: 'AUTOMOTIVE MANAGEMENT SYSTEM TRAINING COURSE',
 standard: 'MSA 4th',
 duration: '1 วัน',
 durationEN: '1 day',
 location: 'กรุงเทพฯ (On-site)',
 locationEN: 'Bangkok (On-site)',
 price: 8000,
 image: 'input_file_0.png',
 description: 'เทคนิคการวิเคราะห์ระบบการวัดเพื่อความแม่นยำในการผลิตชิ้นส่วนยานยนต์',
 descriptionEN: 'Measurement system analysis techniques for precision in automotive part manufacturing.'
 },
 {
 id: 'iatf-07',
 code: 'IATF-07',
 title: 'Statistical Process Control (SPC) and Process Capability Study (PCS)',
 titleEN: 'Statistical Process Control (SPC) and Process Capability Study (PCS)',
 category: 'MANAGEMENT',
 series: 'AUTOMOTIVE MANAGEMENT SYSTEM TRAINING COURSE',
 seriesEN: 'AUTOMOTIVE MANAGEMENT SYSTEM TRAINING COURSE',
 standard: 'SPC/PCS',
 duration: '2 วัน',
 durationEN: '2 days',
 location: 'กรุงเทพฯ (On-site)',
 locationEN: 'Bangkok (On-site)',
 price: 15000,
 image: 'input_file_0.png',
 description: 'การควบคุมกระบวนการด้วยสถิติและการประเมินความสามารถของกระบวนการ',
 descriptionEN: 'Statistical process control and process capability assessment.'
 },
 {
 id: 'iatf-08',
 code: 'IATF-08',
 title: 'VDA6.3 การตรวจประเมิณกระบวนการผลิต',
 titleEN: 'VDA 6.3 Process Audit',
 category: 'MANAGEMENT',
 series: 'AUTOMOTIVE MANAGEMENT SYSTEM TRAINING COURSE',
 seriesEN: 'AUTOMOTIVE MANAGEMENT SYSTEM TRAINING COURSE',
 standard: 'VDA 6.3',
 duration: '3 วัน',
 durationEN: '3 days',
 location: 'กรุงเทพฯ (On-site)',
 locationEN: 'Bangkok (On-site)',
 price: 25000,
 image: 'input_file_0.png',
 description: 'หลักสูตรการตรวจประเมินกระบวนการผลิตตามมาตรฐานเยอรมัน VDA',
 descriptionEN: 'Process audit course according to the German VDA standard.'
 },

 // ENGERGY MANAGEMENT SYSTEM TRAINING COURSE (Image 5)
 {
 id: 'enms-01',
 code: 'ENMS-01',
 title: 'Interpretation ISO 50001:2018 Requirement',
 titleEN: 'Interpretation ISO 50001:2018 Requirement',
 category: 'TECHNICAL',
 series: 'ENGERGY MANAGEMENT SYSTEM TRAINING COURSE',
 seriesEN: 'ENGERGY MANAGEMENT SYSTEM TRAINING COURSE',
 standard: 'ISO 50001',
 duration: '2 วัน',
 durationEN: '2 days',
 location: 'กรุงเทพฯ (On-site)',
 locationEN: 'Bangkok (On-site)',
 price: 12000,
 image: 'input_file_2.png',
 description: 'หลักสูตรการตีความข้อกำหนดระบบการจัดการพลังงานตามมาตรฐานสากล',
 descriptionEN: 'Course for interpreting energy management system requirements according to international standards.'
 },
 {
 id: 'enms-02',
 code: 'ENMS-02',
 title: 'ISO 50001:2018 Internal Audit',
 titleEN: 'ISO 50001:2018 Internal Audit',
 category: 'TECHNICAL',
 series: 'ENGERGY MANAGEMENT SYSTEM TRAINING COURSE',
 seriesEN: 'ENGERGY MANAGEMENT SYSTEM TRAINING COURSE',
 standard: 'ISO 50001',
 duration: '2 วัน',
 durationEN: '2 days',
 location: 'กรุงเทพฯ (On-site)',
 locationEN: 'Bangkok (On-site)',
 price: 15000,
 image: 'input_file_2.png',
 description: 'เน้นทักษะการตรวจประเมินภายในเพื่อการอนุรักษ์พลังงานอย่างยั่งยืน',
 descriptionEN: 'Focuses on internal audit skills for sustainable energy conservation.'
 },

 // BUSINESS CONTINUITY MANAGEMENT SYSTEM TRAINING COURSE (Image 2)
 {
 id: 'bcms-01',
 code: 'BCMS-01',
 title: 'ISO22302:2012 Business Continuity Management Systam',
 titleEN: 'ISO22301:2012 Business Continuity Management System',
 category: 'MANAGEMENT',
 series: 'BUSINESS CONTINUITY MANAGEMENT SYSTEM TRAINING COURSE',
 seriesEN: 'BUSINESS CONTINUITY MANAGEMENT SYSTEM TRAINING COURSE',
 standard: 'ISO 22301',
 duration: '2 วัน',
 durationEN: '2 days',
 location: 'กรุงเทพฯ (On-site)',
 locationEN: 'Bangkok (On-site)',
 price: 18000,
 image: 'input_file_4.png',
 description: 'การบริหารความต่อเนื่องทางธุรกิจเพื่อให้องค์กรพร้อมรับมือกับวิกฤตการณ์ต่างๆ',
 descriptionEN: 'Business continuity management ensuring organization readiness for various crises.'
 },

 // COMFORMITY ASSESSMENT SYSTEM TRAINING COURSE (Image 3)
 {
 id: 'cas-01',
 code: 'CAS-01',
 title: 'ISO17021-1:2015มาตรฐานข้อกำหนด สำหรับหน่วยตรวจประเมิน',
 titleEN: 'ISO17021-1:2015 Requirement & Implementation',
 category: 'MANAGEMENT',
 series: 'COMFORMITY ASSESSMENT SYSTEM TRAINING COURSE',
 seriesEN: 'COMFORMITY ASSESSMENT SYSTEM TRAINING COURSE',
 standard: 'ISO 17021',
 duration: '2 วัน',
 durationEN: '2 days',
 location: 'กรุงเทพฯ (On-site)',
 locationEN: 'Bangkok (On-site)',
 price: 18000,
 image: 'input_file_3.png',
 description: 'มาตรฐานสำหรับหน่วยงานที่ทำหน้าที่ตรวจประเมินและรับรองระบบการจัดการ',
 descriptionEN: 'Standard for bodies providing audit and certification of management systems.'
 },

 // FOOD STANDARD TRAINING COURSE (Image 6)
 {
 id: 'food-01',
 code: 'FOOD-01',
 title: 'ข้อกำหนด GHPs/HACCP Internal Audit',
 titleEN: 'GHPs/HACCP Requirement',
 category: 'FOOD SAFETY',
 series: 'FOOD STANDARD TRAINING COURSE',
 seriesEN: 'FOOD STANDARD TRAINING COURSE',
 standard: 'GHPs/HACCP',
 duration: '2 วัน',
 durationEN: '2 days',
 location: 'กรุงเทพฯ (On-site)',
 locationEN: 'Bangkok (On-site)',
 price: 12000,
 image: 'input_file_5.png',
 description: 'ข้อกำหนดพื้นฐานด้านสุขลักษณะที่ดีในการผลิตอาหารและระบบวิเคราะห์อันตราย',
 descriptionEN: 'Basic requirements for good hygiene practices in food production and hazard analysis systems.'
 },
 {
 id: 'food-02',
 code: 'FOOD-02',
 title: 'GHPs/HACCP Internal Audit',
 titleEN: 'GHPs/HACCP Internal Audit',
 category: 'FOOD SAFETY',
 series: 'FOOD STANDARD TRAINING COURSE',
 seriesEN: 'FOOD STANDARD TRAINING COURSE',
 standard: 'GHPs/HACCP',
 duration: '2 วัน',
 durationEN: '2 days',
 location: 'กรุงเทพฯ (On-site)',
 locationEN: 'Bangkok (On-site)',
 price: 15000,
 image: 'input_file_5.png',
 description: 'การเตรียมความพร้อมสำหรับการตรวจประเมินภายในระบบมาตรฐานความปลอดภัยด้านอาหาร',
 descriptionEN: 'Preparation for internal auditing of food safety management systems.'
 },
 {
 id: 'food-03',
 code: 'FOOD-03',
 title: 'International of ISO22000:2018 Requierments',
 titleEN: 'ISO22000:2018 Requirements',
 category: 'FOOD SAFETY',
 series: 'FOOD STANDARD TRAINING COURSE',
 seriesEN: 'FOOD STANDARD TRAINING COURSE',
 standard: 'ISO 22000',
 duration: '2 วัน',
 durationEN: '2 days',
 location: 'กรุงเทพฯ (On-site)',
 locationEN: 'Bangkok (On-site)',
 price: 18000,
 image: 'input_file_5.png',
 description: 'การวิเคราะห์และประยุกต์ใช้ข้อกำหนดมาตราฐานสากลสำหรับระบบการจัดการความปลอดภัยของอาหาร',
 descriptionEN: 'Analysis and application of international food safety management system requirements.'
 },
 {
 id: 'food-04',
 code: 'FOOD-04',
 title: 'ISO/FSSC 22000 Version 6 Requirement and Internal Audit',
 titleEN: 'ISO/FSSC 22000 V6 Requirement & Internal Audit',
 category: 'FOOD SAFETY',
 series: 'FOOD STANDARD TRAINING COURSE',
 seriesEN: 'FOOD STANDARD TRAINING COURSE',
 standard: 'FSSC 22000',
 duration: '3 วัน',
 durationEN: '3 days',
 location: 'กรุงเทพฯ (On-site)',
 locationEN: 'Bangkok (On-site)',
 price: 25000,
 image: 'input_file_5.png',
 description: 'ข้อกำหนดและการตรวจประเมินภายในระบบ FSSC 22000 ฉบับปรับปรุงใหม่ล่าสุด',
 descriptionEN: 'Requirements and internal auditing for the latest FSSC 22000 version.'
 },
 {
 id: 'food-05',
 code: 'FOOD-05',
 title: 'BRCGS Global Standard for Food Safety Issue 9',
 titleEN: 'BRCGS Food Safety Issue 9',
 category: 'FOOD SAFETY',
 series: 'FOOD STANDARD TRAINING COURSE',
 seriesEN: 'FOOD STANDARD TRAINING COURSE',
 standard: 'BRCGS',
 duration: '3 วัน',
 durationEN: '3 days',
 location: 'กรุงเทพฯ (On-site)',
 locationEN: 'Bangkok (On-site)',
 price: 30000,
 image: 'input_file_5.png',
 description: 'มาตรฐานความปลอดภัยด้านอาหารระดับโลก BRCGS ฉบับที่ 9 เพื่อการส่งออก',
 descriptionEN: 'Global food safety standard BRCGS Issue 9 for international export.'
 },

 // LEAN MANUFACTURING TRAINING COURSE (Image 7)
 {
 id: 'lean-01',
 code: 'LEAN-01',
 title: 'Lean Automation Manufacturing สำหรับโรงงาน',
 titleEN: 'Lean Automation Manufacturing',
 category: 'LEAN',
 series: 'LEAN MANUFACTURING TRAINING COURSE',
 seriesEN: 'LEAN MANUFACTURING TRAINING COURSE',
 standard: 'LEAN',
 duration: '2 วัน',
 durationEN: '2 days',
 location: 'ชลบุรี (On-site)',
 locationEN: 'Chonburi (On-site)',
 price: 18000,
 image: 'input_file_3.png',
 description: 'แนวคิดลีนและการนำระบบอัตโนมัติมาใช้เพื่อเพิ่มประสิทธิภาพการผลิตในยุค 4.0',
 descriptionEN: 'Lean concepts and automation implementation to enhance production efficiency in Industry 4.0.'
 },
 {
 id: 'lean-02',
 code: 'LEAN-02',
 title: 'TPM การบำรุงรักษาเชิงทวีผล',
 titleEN: 'Total Productive Maintenance (TPM)',
 category: 'LEAN',
 series: 'LEAN MANUFACTURING TRAINING COURSE',
 seriesEN: 'LEAN MANUFACTURING TRAINING COURSE',
 standard: 'TPM',
 duration: '2 วัน',
 durationEN: '2 days',
 location: 'ชลบุรี (On-site)',
 locationEN: 'Chonburi (On-site)',
 price: 15000,
 image: 'input_file_3.png',
 description: 'หลักการบำรุงรักษาเครื่องจักรโดยทุกคนมีส่วนร่วมเพื่อเพิ่มผลผลิตสูงสุด',
 descriptionEN: 'Machinery maintenance principles with everyone\'s participation to maximize productivity.'
 },
 {
 id: 'lean-03',
 code: 'LEAN-03',
 title: 'QCC และ 7QC Tools',
 titleEN: 'QCC & 7QC Tools',
 category: 'LEAN',
 series: 'LEAN MANUFACTURING TRAINING COURSE',
 seriesEN: 'LEAN MANUFACTURING TRAINING COURSE',
 standard: 'QCC',
 duration: '2 วัน',
 durationEN: '2 days',
 location: 'ชลบุรี (On-site)',
 locationEN: 'Chonburi (On-site)',
 price: 12000,
 image: 'input_file_3.png',
 description: 'การแก้ปัญหาคุณภาพด้วยกลุ่มกิจกรรมคิวซีซีและเครื่องมือควบคุมคุณภาพทั้ง 7 ชนิด',
 descriptionEN: 'Quality problem solving with QCC groups and the 7 QC tools.'
 }
];

const SERIES_ICONS: { [key: string]: any } = {
 'Lead Auditor CQI-IRCA Course': Award,
 'PSM MANAGENT SYSTEM TRAINING COURSE': ShieldAlert,
 'ENVIRONMENTAL MANAGEMENT SYSTEM TRAINING COURSE': Leaf,
 'QUALITY MANAGEMENT SYSTEM TRAINING COURSE': ShieldCheck,
 'OCCUPATIONAL HEALTH & SAFEY MANAGEMENT SYSTEM TRAINING COURSE': Stethoscope,
 'COSMATIC INDUSTRY TRAINING COURSE': FlaskConical,
 'AUTOMOTIVE MANAGEMENT SYSTEM TRAINING COURSE': Car,
 'ENGERGY MANAGEMENT SYSTEM TRAINING COURSE': Zap,
 'BUSINESS CONTINUITY MANAGEMENT SYSTEM TRAINING COURSE': RefreshCcw,
 'COMFORMITY ASSESSMENT SYSTEM TRAINING COURSE': ClipboardCheck,
 'FOOD STANDARD TRAINING COURSE': Utensils,
 'LEAN MANUFACTURING TRAINING COURSE': Settings,
};

const GOOGLE_FORM_URL = 'https://forms.gle/p9HoHAFfKBM2EdYj7';

export default function TrainingSection({ settings, onContactClick }: TrainingSectionProps) {
 const [searchQuery, setSearchQuery] = useState('');
 const [activeFilter, setActiveFilter] = useState('All');
 const [activeSeries, setActiveSeries] = useState('All');
 const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const [schedules, setSchedules] = useState<ScheduledEvent[]>(() => {
    const saved = localStorage.getItem('qaic_training_schedules');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return [
      {
        id: 'sch-1',
        courseId: 'lead-01',
        date: '2026-06-16',
        location: 'กรุงเทพฯ (On-site)',
        locationEN: 'Bangkok (On-site)',
        time: '09:00 - 16:00'
      },
      {
        id: 'sch-2',
        courseId: 'lead-02',
        date: '2026-06-19',
        location: 'ระบบออนไลน์ (Zoom)',
        locationEN: 'Online (Zoom)',
        time: '09:00 - 16:00'
      },
      {
        id: 'sch-3',
        courseId: 'lead-05',
        date: '2026-06-23',
        location: 'กรุงเทพฯ (On-site)',
        locationEN: 'Bangkok (On-site)',
        time: '09:00 - 16:00'
      },
      {
        id: 'sch-4',
        courseId: 'lead-03',
        date: '2026-06-25',
        location: 'กรุงเทพฯ (On-site)',
        locationEN: 'Bangkok (On-site)',
        time: '09:00 - 16:00'
      },
      {
        id: 'sch-5',
        courseId: 'lead-04',
        date: '2026-07-02',
        location: 'ชลบุรี (On-site)',
        locationEN: 'Chonburi (On-site)',
        time: '08:30 - 16:30'
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('qaic_training_schedules', JSON.stringify(schedules));
  }, [schedules]);

  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(5); // June (0-indexed)
  const [selectedDate, setSelectedDate] = useState('2026-06-15');

  // Add/Edit Event state
  const [isAdding, setIsAdding] = useState(false);
  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  const [newCourseId, setNewCourseId] = useState('');
  const [newLocationTH, setNewLocationTH] = useState('');
  const [newLocationEN, setNewLocationEN] = useState('');
  const [newTime, setNewTime] = useState('09:00 - 16:00');
  const [newDate, setNewDate] = useState('2026-06-15');

  const MONTHS_TH = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'];
  const MONTHS_EN = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const firstDayIndex = (year: number, month: number) => new Date(year, month, 1).getDay();

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(prev => prev - 1);
    } else {
      setCurrentMonth(prev => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(prev => prev + 1);
    } else {
      setCurrentMonth(prev => prev + 1);
    }
  };

  const formatDateStr = (y: number, m: number, d: number) => {
    const mm = String(m + 1).padStart(2, '0');
    const dd = String(d).padStart(2, '0');
    return `${y}-${mm}-${dd}`;
  };

  const formatLongDate = (dateStr: string) => {
    if (!dateStr) return '';
    const [y, m, d] = dateStr.split('-').map(Number);
    const date = new Date(y, m - 1, d);
    if (isNaN(date.getTime())) return dateStr;
    
    if (settings.lang === 'TH') {
      return `${d} ${MONTHS_TH[m - 1]} ${y + 543}`;
    } else {
      return `${MONTHS_EN[m - 1]} ${d}, ${y}`;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'MANAGEMENT': return 'bg-blue-500';
      case 'FOOD SAFETY': return 'bg-emerald-500';
      case 'TECHNICAL': return 'bg-amber-500';
      case 'LEAN': return 'bg-indigo-500';
      case 'MEDICAL': return 'bg-rose-500';
      default: return 'bg-gray-400';
    }
  };

  const handleSaveEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCourseId || !newDate || !newLocationTH) return;

    if (editingEventId !== null) {
      // Editing
      setSchedules(prev => prev.map(s => s.id === editingEventId ? {
        ...s,
        courseId: newCourseId,
        date: newDate,
        location: newLocationTH,
        locationEN: newLocationEN || newLocationTH,
        time: newTime
      } : s));
      setEditingEventId(null);
    } else {
      // Adding new
      const newSch: ScheduledEvent = {
        id: `sch-${Date.now()}`,
        courseId: newCourseId,
        date: newDate,
        location: newLocationTH,
        locationEN: newLocationEN || newLocationTH,
        time: newTime
      };
      setSchedules(prev => [...prev, newSch]);
      setIsAdding(false);
    }
  };

  const handleStartEdit = (ev: ScheduledEvent) => {
    setEditingEventId(ev.id);
    setNewCourseId(ev.courseId);
    setNewLocationTH(ev.location);
    setNewLocationEN(ev.locationEN);
    setNewTime(ev.time);
    setNewDate(ev.date);
    setIsAdding(false);
  };

  const handleDeleteEvent = (id: string) => {
    if (confirm(settings.lang === 'TH' ? 'คุณแน่ใจหรือไม่ที่จะลบกิจกรรมนี้?' : 'Are you sure you want to delete this event?')) {
      setSchedules(prev => prev.filter(s => s.id !== id));
    }
  };

  const daysCount = daysInMonth(currentYear, currentMonth);
  const startOffset = firstDayIndex(currentYear, currentMonth);
  const cells: (number | null)[] = [];
  
  for (let i = 0; i < startOffset; i++) {
    cells.push(null);
  }
  for (let i = 1; i <= daysCount; i++) {
    cells.push(i);
  }

 const t = <T extends string | string[]>(th: T, en: T): T => settings.lang === 'TH' ? th : en;

 const handleRegister = (course?: Course) => {
 // สามารถเพิ่ม logic การส่ง course code ไปยัง form ได้ถ้าต้องการ (เช่นผ่าน URL parameters)
 window.open(GOOGLE_FORM_URL, '_blank');
 };

 const filteredCourses = COURSES.filter(course => {
 const matchesSearch = 
 course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
 course.titleEN.toLowerCase().includes(searchQuery.toLowerCase()) ||
 course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
 course.standard.toLowerCase().includes(searchQuery.toLowerCase());
 
 const matchesFilter = activeFilter === 'All' || course.category === activeFilter;
 const matchesSeries = activeSeries === 'All' || course.series === activeSeries;
 
 return matchesSearch && matchesFilter && matchesSeries;
 });

 const seriesOrder = [
 'Lead Auditor CQI-IRCA Course',
 'PSM MANAGENT SYSTEM TRAINING COURSE',
 'ENVIRONMENTAL MANAGEMENT SYSTEM TRAINING COURSE',
 'QUALITY MANAGEMENT SYSTEM TRAINING COURSE',
 'OCCUPATIONAL HEALTH & SAFEY MANAGEMENT SYSTEM TRAINING COURSE',
 'COSMATIC INDUSTRY TRAINING COURSE',
 'AUTOMOTIVE MANAGEMENT SYSTEM TRAINING COURSE',
 'ENGERGY MANAGEMENT SYSTEM TRAINING COURSE',
 'BUSINESS CONTINUITY MANAGEMENT SYSTEM TRAINING COURSE',
 'COMFORMITY ASSESSMENT SYSTEM TRAINING COURSE',
 'FOOD STANDARD TRAINING COURSE',
 'LEAN MANUFACTURING TRAINING COURSE'
 ];

 const seriesList = ['All', ...seriesOrder];

 return (
 <div className="space-y-12 pb-20">
 {/* Header Section */}
 <div className="flex flex-col md:flex-row items-end justify-between gap-6">
 <div className="space-y-4 max-w-2xl">
 <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-bold uppercase tracking-widest">
 {t('การพัฒนาบุคลากรอย่างมืออาชีพ', 'Professional Development')}
 </div>
 <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white tracking-tight leading-tight">
 {t('หลักสูตรฝึกอบรม', 'Advanced Professional')} <br />
 <span className="text-blue-600">{t('ใบรับรองมาตรฐานสากล', 'Certification Training')}</span>
 </h2>
 <p className="text-gray-700 dark:text-slate-400 font-sans leading-relaxed">
 {t(
 'ยกระดับมาตรฐานองค์กรของคุณด้วยโปรแกรมการฝึกอบรมชั้นนำ ตั้งแต่ระบบการจัดการ ISO ไปจนถึงโปรโตคอลความปลอดภัยด้านอาหารเฉพาะทาง',
 'Elevate your organization\'s standards with our industry-leading training programs. From ISO Management Systems to Specialized Food Safety protocols.'
 )}
 </p>
 </div>

 <div className="bg-blue-900 p-6 rounded-3xl text-white flex items-center gap-4 shadow-xl shadow-blue-900/10">
 <div className="w-12 h-12 bg-white/40 backdrop-blur-[35px] border border-white/40 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] dark:bg-slate-900/40 dark:border-white/20 dark:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.2)] rounded-2xl flex items-center justify-center">
 <ShieldCheck className="w-6 h-6 text-blue-400" />
 </div>
 <div>
 <p className="text-[10px] font-bold uppercase tracking-widest text-blue-400 leading-none mb-1">
 Accredited Provider
 </p>
 <p className="text-sm font-bold">ISO/IEC 17021-1</p>
 </div>
 </div>
 </div>

  {/* Training Calendar */}
  <div className="bg-white/40 backdrop-blur-[35px] border border-white/40 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] dark:bg-slate-900/40 dark:border-white/20 dark:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.2)] p-6 md:p-8 rounded-[2.5rem] border shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8">
    {/* Left Panel: Calendar */}
    <div className="lg:col-span-7 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1 text-left">
          <h3 className="text-xl font-display font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            {t('ปฏิทินกิจกรรมฝึกอบรม', 'Training Activity Calendar')}
          </h3>
          <p className="text-xs text-gray-650 dark:text-slate-400">
            {t('คลิกเลือกวันที่เพื่อตรวจสอบหลักสูตรที่เปิดรับลงทะเบียนหรืออัปเดตกิจกรรม', 'Select a date to inspect courses or schedule sessions')}
          </p>
        </div>
        <div className="flex items-center gap-1.5 bg-white/50 dark:bg-slate-800/80 px-3 py-1.5 rounded-xl border border-gray-200/50 dark:border-slate-700 w-fit">
          <button 
            type="button"
            onClick={handlePrevMonth}
            className="p-1 hover:bg-gray-200 dark:hover:bg-slate-700 rounded-lg text-gray-700 dark:text-slate-300 transition-colors cursor-pointer border-none bg-transparent"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-xs font-bold font-display min-w-[90px] text-center text-gray-800 dark:text-slate-200">
            {t(MONTHS_TH[currentMonth], MONTHS_EN[currentMonth])} {currentYear}
          </span>
          <button 
            type="button"
            onClick={handleNextMonth}
            className="p-1 hover:bg-gray-200 dark:hover:bg-slate-700 rounded-lg text-gray-700 dark:text-slate-300 transition-colors cursor-pointer border-none bg-transparent"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Weekday Grid */}
      <div className="grid grid-cols-7 gap-2 text-center text-[10px] font-bold text-gray-600 dark:text-slate-500 uppercase tracking-wider">
        {t(['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'], ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']).map((d, idx) => (
          <div key={idx} className={idx === 0 || idx === 6 ? 'text-red-500/80' : ''}>{d}</div>
        ))}
      </div>

      {/* Day Cells Grid */}
      <div className="grid grid-cols-7 gap-2">
        {cells.map((day, idx) => {
          if (day === null) {
            return <div key={`empty-${idx}`} className="aspect-square"></div>;
          }

          const dateStr = formatDateStr(currentYear, currentMonth, day);
          const isSelected = selectedDate === dateStr;
          
          const today = new Date();
          const isToday = today.getFullYear() === currentYear && today.getMonth() === currentMonth && today.getDate() === day;
          
          const dayEvents = schedules.filter(s => s.date === dateStr);
          const hasEvents = dayEvents.length > 0;

          return (
            <button
              type="button"
              key={`day-${day}`}
              onClick={() => {
                setSelectedDate(dateStr);
                setIsAdding(false);
                setEditingEventId(null);
              }}
              className={`relative aspect-square flex flex-col items-center justify-center rounded-xl transition-all cursor-pointer border-none text-xs ${
                isSelected 
                  ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-600/10' 
                  : isToday 
                    ? 'border border-blue-500/50 text-blue-600 dark:text-blue-400 font-bold bg-blue-500/5' 
                    : 'bg-white/40 dark:bg-slate-800/30 hover:bg-white/80 dark:hover:bg-slate-800/80 text-gray-800 dark:text-slate-200'
              }`}
            >
              <span>{day}</span>
              
              {/* Event indicators */}
              {hasEvents && (
                <div className="absolute bottom-1 flex gap-0.5 justify-center w-full">
                  {dayEvents.slice(0, 3).map((ev, evIdx) => {
                    const course = COURSES.find(c => c.id === ev.courseId);
                    const colorClass = getCategoryColor(course?.category || 'MANAGEMENT');
                    return (
                      <span key={evIdx} className={`w-1.5 h-1.5 rounded-full ${colorClass}`}></span>
                    );
                  })}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Legends */}
      <div className="flex flex-wrap items-center gap-4 text-[9px] font-bold text-gray-600 dark:text-slate-500 pt-3 border-t border-gray-150/40 dark:border-slate-800">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-blue-500"></span>
          <span>MANAGEMENT</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>FOOD SAFETY</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-amber-500"></span>
          <span>TECHNICAL</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
          <span>LEAN</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-rose-500"></span>
          <span>MEDICAL</span>
        </div>
      </div>
    </div>

    {/* Right Panel: Daily Schedule Details */}
    <div className="lg:col-span-5 bg-white/20 dark:bg-slate-900/20 border border-gray-150/40 dark:border-slate-800/80 p-6 rounded-[2rem] flex flex-col justify-between min-h-[320px]">
      
      {/* Dynamic forms / view list */}
      {(isAdding || editingEventId !== null) ? (
        /* Form mode */
        <form onSubmit={handleSaveEvent} className="space-y-4 font-sans text-left flex flex-col justify-between h-full">
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-gray-900 dark:text-white pb-2 border-b border-gray-200/50 dark:border-slate-800">
              {editingEventId !== null ? t('แก้ไขตารางกิจกรรม', 'Edit Training Event') : t('เพิ่มกิจกรรมการฝึกอบรม', 'Add Training Event')}
            </h4>

            <div className="space-y-1">
              <label className="text-[9px] font-bold text-gray-600 dark:text-slate-500 uppercase tracking-widest">{t('เลือกหลักสูตรที่เปิดสอน', 'Select Course')}</label>
              <select
                required
                value={newCourseId}
                onChange={(e) => setNewCourseId(e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-xs focus:ring-1 focus:ring-blue-500 dark:text-white"
              >
                <option value="">-- {t('กรุณาเลือกหลักสูตร', 'Please select course')} --</option>
                {COURSES.map(c => (
                  <option key={c.id} value={c.id}>[{c.code}] {c.title}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[9px] font-bold text-gray-600 dark:text-slate-500 uppercase tracking-widest">{t('วันที่ดำเนินการ', 'Date')}</label>
              <input
                type="date"
                required
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-xs focus:ring-1 focus:ring-blue-500 dark:text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-gray-600 dark:text-slate-500 uppercase tracking-widest">{t('สถานที่จัดอบรม', 'Location')}</label>
                <input
                  type="text"
                  required
                  placeholder={t('เช่น กรุงเทพฯ, Zoom', 'e.g. Bangkok, Zoom')}
                  value={newLocationTH}
                  onChange={(e) => {
                    setNewLocationTH(e.target.value);
                    if (!newLocationEN) setNewLocationEN(e.target.value);
                  }}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-xs focus:ring-1 focus:ring-blue-500 dark:text-white"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-gray-600 dark:text-slate-500 uppercase tracking-widest">{t('เวลาจัดอบรม', 'Time')}</label>
                <input
                  type="text"
                  required
                  placeholder="09:00 - 16:00"
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-xs focus:ring-1 focus:ring-blue-500 dark:text-white"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <button
              type="submit"
              className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer border-none shadow-md"
            >
              {t('บันทึก', 'Save')}
            </button>
            <button
              type="button"
              onClick={() => {
                setIsAdding(false);
                setEditingEventId(null);
              }}
              className="px-4 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 rounded-xl text-xs font-bold cursor-pointer border-none"
            >
              {t('ยกเลิก', 'Cancel')}
            </button>
          </div>
        </form>
      ) : (
        /* List mode */
        <div className="space-y-4 flex-1 flex flex-col justify-between text-left h-full">
          <div className="space-y-4 flex-1 flex flex-col">
            <div className="border-b border-gray-200/50 dark:border-slate-800 pb-3 flex justify-between items-center">
              <div>
                <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                  {t('ตารางอบรมประจำวันที่', 'Training Events for')}
                </h4>
                <p className="text-[10px] text-gray-500 dark:text-slate-400 font-mono mt-0.5">
                  {formatLongDate(selectedDate)}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setNewCourseId('');
                  setNewLocationTH('');
                  setNewLocationEN('');
                  setNewTime('09:00 - 16:00');
                  setNewDate(selectedDate);
                  setIsAdding(true);
                }}
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-[10px] font-bold cursor-pointer border-none shadow-sm"
              >
                + {t('เพิ่มอบรม', 'Add Event')}
              </button>
            </div>

            {/* Event List */}
            <div className="space-y-3 overflow-y-auto flex-1 max-h-[220px] pr-1">
              {schedules.filter(s => s.date === selectedDate).length > 0 ? (
                schedules.filter(s => s.date === selectedDate).map(ev => {
                  const course = COURSES.find(c => c.id === ev.courseId);
                  if (!course) return null;
                  return (
                    <div 
                      key={ev.id}
                      className="bg-white dark:bg-slate-800/80 p-3 rounded-2xl border border-gray-150/40 dark:border-slate-800/50 shadow-sm flex items-start justify-between gap-3 group/item"
                    >
                      <div className="space-y-1.5 flex-1 min-w-0">
                        <span className={`inline-block px-2 py-0.5 rounded text-[8px] font-bold text-white ${getCategoryColor(course.category)}`}>
                          {course.category}
                        </span>
                        <h5 className="text-xs font-bold text-gray-800 dark:text-white truncate">
                          {t(course.title, course.titleEN)}
                        </h5>
                        <div className="flex flex-col gap-1 text-[10px] text-gray-600 dark:text-slate-450 font-sans">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-blue-500" />
                            <span>{ev.time}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-blue-500" />
                            <span>{t(ev.location, ev.locationEN)}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 self-center opacity-85 lg:opacity-0 lg:group-hover/item:opacity-100 transition-opacity">
                        <button
                          type="button"
                          onClick={() => handleStartEdit(ev)}
                          className="p-1.5 bg-gray-100 hover:bg-blue-50 hover:text-blue-600 dark:bg-slate-700 dark:hover:bg-slate-600 rounded-lg text-gray-600 dark:text-slate-350 cursor-pointer border-none bg-transparent"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteEvent(ev.id)}
                          className="p-1.5 bg-gray-100 hover:bg-red-50 hover:text-red-600 dark:bg-slate-700 dark:hover:bg-slate-650 rounded-lg text-gray-600 dark:text-slate-300 cursor-pointer border-none bg-transparent"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center text-gray-500 dark:text-slate-400 space-y-2 my-auto">
                  <Calendar className="w-8 h-8 text-gray-300 dark:text-slate-700 stroke-1" />
                  <p className="text-xs font-medium">{t('ไม่มีตารางอบรมสำหรับวันนี้', 'No training events scheduled for this day')}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  </div>

  {/* Search and Filters */}
 <div className="space-y-6">
 <div className="bg-white/40 backdrop-blur-[35px] border border-white/40 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] dark:bg-slate-900/40 dark:border-white/20 dark:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.2)] p-4 rounded-[2rem] border shadow-sm flex flex-col md:flex-row items-center gap-4">
 <div className="relative flex-1 w-full">
 <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 dark:text-slate-500" />
 <input 
 type="text" 
 placeholder={t('ค้นหาหลักสูตร (เช่น ISO 9001, HACCP...)', 'Search courses (e.g. ISO 9001, HACCP...)')}
 className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all text-sm"
 value={searchQuery}
 onChange={(e) => setSearchQuery(e.target.value)}
 />
 </div>
 </div>

 {/* Series Filter as Main Categories */}
 <div className="flex flex-wrap items-center gap-2">
 {seriesList.map((series) => (
 <button
 key={series}
 onClick={() => setActiveSeries(series)}
 className={`px-6 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap border ${
 activeSeries === series 
 ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/20' 
 : ' bg-white/40 backdrop-blur-[35px] border border-white/40 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] dark:bg-slate-900/40 dark:border-white/20 dark:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.2)] text-gray-600 dark:text-slate-500 hover:border-blue-200 hover:text-gray-800 dark:text-slate-300'
 }`}
 >
 {series === 'All' ? t('หลักสูตรทั้งหมด', 'All Courses') : series}
 </button>
 ))}
 </div>
 </div>

 {/* Course Detail Modal */}
 <AnimatePresence>
 {selectedCourse && createPortal(
 <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
 <motion.div 
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 exit={{ opacity: 0 }}
 onClick={() => setSelectedCourse(null)}
 className="absolute inset-0 bg-black/60 backdrop-blur-sm"
 />
 <motion.div
 layoutId={`course-${selectedCourse.id}`}
 initial={{ opacity: 0, scale: 0.9, y: 20 }}
 animate={{ opacity: 1, scale: 1, y: 0 }}
 exit={{ opacity: 0, scale: 0.9, y: 20 }}
 className="relative w-full max-w-4xl bg-white/40 backdrop-blur-[35px] border border-white/40 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] dark:bg-slate-900/40 dark:border-white/20 dark:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.2)] rounded-[3rem] overflow-hidden shadow-2xl z-10 flex flex-col md:flex-row max-h-[90vh]"
 >
 <div className="relative w-full md:w-1/2 h-64 md:h-auto bg-blue-50 flex items-center justify-center p-12 overflow-hidden">
 {selectedCourse.image && (
 <img 
 src={selectedCourse.image} 
 alt=""
 className="absolute inset-0 w-full h-full object-cover opacity-20"
 onError={(e) => { e.currentTarget.style.display = 'none'; }}
 />
 )}
 <div className="relative p-10 bg-white/40 backdrop-blur-[35px] border border-white/40 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] dark:bg-slate-900/40 dark:border-white/20 dark:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.2)] rounded-[3rem] shadow-2xl shadow-blue-900/10 transition-transform hover:scale-105">
 {React.createElement(SERIES_ICONS[selectedCourse.series] || BookOpen, {
 className: "w-24 h-24 text-blue-600"
 })}
 </div>
 <button 
 onClick={() => setSelectedCourse(null)}
 className="absolute top-6 left-6 md:hidden w-10 h-10 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all transition-all"
 >
 <LucideFilter className="w-5 h-5 rotate-45" />
 </button>
 </div>
 
 <div className="w-full md:w-1/2 p-8 md:p-12 space-y-8 overflow-y-auto">
 <div className="flex justify-between items-start">
 <div className="space-y-1">
 <p className="text-blue-600 text-[10px] font-bold uppercase tracking-widest">
 {selectedCourse.series}
 </p>
 <h3 className="text-2xl md:text-3xl font-display font-bold text-gray-900 dark:text-white leading-tight">
 {t(selectedCourse.title, selectedCourse.titleEN)}
 </h3>
 </div>
 <button 
 onClick={() => setSelectedCourse(null)}
 className="hidden md:flex w-10 h-10 bg-gray-50 hover:bg-gray-100 rounded-full items-center justify-center text-gray-600 dark:text-slate-500 transition-all"
 >
 <LucideFilter className="w-5 h-5 rotate-45" />
 </button>
 </div>

 <div className="grid grid-cols-2 gap-6">
 <div className="space-y-1">
 <p className="text-[10px] font-bold text-gray-600 dark:text-slate-500 uppercase tracking-widest">{t('รหัสหลักสูตร', 'Course Code')}</p>
 <p className="font-mono font-bold text-gray-900 dark:text-white">{selectedCourse.code}</p>
 </div>
 <div className="space-y-1">
 <p className="text-[10px] font-bold text-gray-600 dark:text-slate-500 uppercase tracking-widest">{t('มาตรฐาน', 'Standard')}</p>
 <p className="font-bold text-gray-900 dark:text-white">{selectedCourse.standard}</p>
 </div>
 <div className="space-y-1">
 <p className="text-[10px] font-bold text-gray-600 dark:text-slate-500 uppercase tracking-widest">{t('ระยะเวลา', 'Duration')}</p>
 <p className="font-bold text-gray-900 dark:text-white">{t(selectedCourse.duration, selectedCourse.durationEN)}</p>
 </div>
 <div className="space-y-1">
 <p className="text-[10px] font-bold text-gray-600 dark:text-slate-500 uppercase tracking-widest">{t('ราคา (ต่อท่าน)', 'Price (per person)')}</p>
 <p className="text-xl font-display font-bold text-blue-600">฿{selectedCourse.price.toLocaleString()} THB</p>
 </div>
 </div>

 <div className="space-y-3">
 <h4 className="text-sm font-bold text-gray-900 dark:text-white">{t('รายละเอียดหลักสูตร', 'Course Description')}</h4>
 <p className="text-gray-700 dark:text-slate-400 leading-relaxed text-sm">
 {t(selectedCourse.description || '', selectedCourse.descriptionEN || '')}
 </p>
 </div>

 <div className="flex flex-col sm:flex-row gap-4 pt-4">
 <button 
 onClick={() => handleRegister(selectedCourse)}
 className="flex-1 py-4 bg-blue-600 text-white rounded-2xl font-bold text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20"
 >
 {t('ลงทะเบียนหลักสูตรนี้', 'Register for this course')}
 </button>
 <button 
 onClick={onContactClick}
 className="px-8 py-4 bg-gray-50 text-gray-800 dark:text-slate-300 rounded-2xl font-bold text-sm hover:bg-gray-100 transition-all"
 >
 {t('สอบถามเพิ่มเติม', 'Inquiry')}
 </button>
 </div>
 </div>
 </motion.div>
 </div>
 , document.body)}
 </AnimatePresence>

 {/* Courses Grid */}
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
 <AnimatePresence mode="popLayout">
 {filteredCourses.map((course) => (
 <motion.div
 layout
 key={course.id}
 initial={{ opacity: 0, scale: 0.9 }}
 animate={{ opacity: 1, scale: 1 }}
 exit={{ opacity: 0, scale: 0.9 }}
 onClick={() => setSelectedCourse(course)}
 className="bg-white/40 backdrop-blur-[35px] border border-white/40 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] dark:bg-slate-900/40 dark:border-white/20 dark:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.2)] rounded-[2.5rem] overflow-hidden border hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-900/5 transition-all group cursor-pointer"
 >
 <div className="relative h-48 overflow-hidden bg-blue-50 flex items-center justify-center transition-colors duration-500">
 {course.image && (
 <img 
 src={course.image} 
 alt=""
 className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-110 group-hover:opacity-20 transition-all duration-700"
 onError={(e) => { e.currentTarget.style.display = 'none'; }}
 />
 )}
 <div className="relative p-6 bg-white/40 backdrop-blur-[35px] border border-white/40 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] dark:bg-slate-900/40 dark:border-white/20 dark:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.2)] rounded-3xl shadow-xl group-hover:scale-110 transition-transform duration-500">
 {React.createElement(SERIES_ICONS[course.series] || BookOpen, {
 className: "w-10 h-10 text-blue-600"
 })}
 </div>
 <div className="absolute top-4 left-4 flex gap-2">
 <div className="px-3 py-1 bg-white/90 backdrop-blur-md text-[9px] font-bold rounded-lg shadow-sm">
 {course.category}
 </div>
 </div>
 </div>

 <div className="p-8 space-y-6">
 <div className="space-y-3">
 <div className="flex items-center justify-between">
 <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">{course.standard}</p>
 <p className="text-[10px] font-mono font-bold text-gray-600 dark:text-slate-500">{course.code}</p>
 </div>
 <h3 className="text-xl font-display font-bold text-gray-900 dark:text-white leading-tight group-hover:text-blue-600 transition-colors">
 {t(course.title, course.titleEN)}
 </h3>
 </div>

 <div className="space-y-3 pt-4 border-t border-gray-50">
 <div className="flex items-center gap-3 text-gray-700 dark:text-slate-400">
 <Clock className="w-4 h-4 text-blue-500" />
 <span className="text-xs font-medium">{t(course.duration, course.durationEN)}</span>
 </div>
 <div className="flex items-center gap-3 text-gray-700 dark:text-slate-400">
 <MapPin className="w-4 h-4 text-blue-500" />
 <span className="text-xs font-medium">{t(course.location, course.locationEN)}</span>
 </div>
 <div className="flex items-center gap-3 text-gray-900 dark:text-white">
 <GraduationCap className="w-4 h-4 text-blue-500" />
 <span className="text-lg font-display font-bold">฿{course.price.toLocaleString()} THB</span>
 </div>
 </div>

 <button 
 onClick={(e) => {
 e.stopPropagation();
 handleRegister(course);
 }}
 className="w-full py-4 bg-gray-50 text-blue-600 rounded-2xl text-[11px] font-bold group-hover:bg-blue-600 group-hover:text-white transition-all flex items-center justify-center gap-2"
 >
 {t('ลงทะเบียนเลย', 'Register Now')}
 <ArrowRight className="w-4 h-4" />
 </button>
 </div>
 </motion.div>
 ))}
 </AnimatePresence>
 </div>

 {/* Newsletter Section */}
 <div className="bg-gradient-to-br from-blue-800 to-blue-950 rounded-[3rem] p-12 text-white relative overflow-hidden">
 <div className="absolute top-0 right-0 w-64 h-64 bg-white/40 backdrop-blur-[35px] border border-white/40 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] dark:bg-slate-900/40 dark:border-white/20 dark:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.2)] /5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
 <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
 
 <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
 <div className="space-y-4">
 <h3 className="text-3xl md:text-5xl font-display font-bold">{t('ไม่พลาดทุกโอกาสการเรียนรู้', 'Never Miss a Training Opportunity')}</h3>
 <p className="text-blue-200/80 max-w-2xl mx-auto font-sans">
 {t(
 'เข้าร่วมรายชื่อรับจดหมายข่าวของเราเพื่อรับส่วนลด Early Bird, ประกาศหลักสูตรใหม่ และการอัปเดตระบบการรับรองส่งตรงถึงคุณ',
 'Join our mailing list to receive early bird discounts, new course announcements, and industry certification updates directly to your inbox.'
 )}
 </p>
 </div>

 <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
 <div className="flex-1 relative">
 <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400" />
 <input 
 type="email" 
 placeholder={t('อีเมลสำหรับรับข่าวสารของคุณ', 'Your professional email')}
 className="w-full pl-12 pr-6 py-4 bg-white/40 backdrop-blur-[35px] border border-white/40 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] dark:bg-slate-900/40 dark:border-white/20 dark:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.2)] border border-white/10 rounded-2xl focus:ring-2 focus:ring-blue-400 transition-all placeholder:text-blue-300/50"
 />
 </div>
 <button className="px-10 py-4 bg-white/40 backdrop-blur-[35px] border border-white/40 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] dark:bg-slate-900/40 dark:border-white/20 dark:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.2)] text-blue-900 rounded-2xl font-bold text-sm hover:bg-blue-50 active:scale-95 transition-all shadow-xl shadow-black/20">
 {t('ลงทะเบียนรับข่าวสาร', 'Subscribe')}
 </button>
 </div>
 </div>
 </div>
 </div>
 );
}
