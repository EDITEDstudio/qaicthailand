/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Search, 
  Calendar, 
  MapPin, 
  Clock, 
  ChevronRight, 
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
    title: 'Lead Auditor ISO 50001 : 2018  CQI-IRCA Course',
    titleEN: 'Lead Auditor ISO 50001 : 2018  CQI-IRCA Course',
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
    title: 'ISO/FSSC 22000 Version 6  Requirement and Internal Audit',
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
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 tracking-tight leading-tight">
            {t('หลักสูตรฝึกอบรม', 'Advanced Professional')} <br />
            <span className="text-blue-600">{t('ใบรับรองมาตรฐานสากล', 'Certification Training')}</span>
          </h2>
          <p className="text-gray-500 font-sans leading-relaxed">
            {t(
              'ยกระดับมาตรฐานองค์กรของคุณด้วยโปรแกรมการฝึกอบรมชั้นนำ ตั้งแต่ระบบการจัดการ ISO ไปจนถึงโปรโตคอลความปลอดภัยด้านอาหารเฉพาะทาง',
              'Elevate your organization\'s standards with our industry-leading training programs. From ISO Management Systems to Specialized Food Safety protocols.'
            )}
          </p>
        </div>

        <div className="bg-blue-900 p-6 rounded-3xl text-white flex items-center gap-4 shadow-xl shadow-blue-900/10">
          <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
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

      {/* Search and Filters */}
      <div className="space-y-6">
        <div className="bg-white p-4 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col md:flex-row items-center gap-4">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
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
                  : 'bg-white border-gray-100 text-gray-400 hover:border-blue-200 hover:text-gray-600'
              }`}
            >
              {series === 'All' ? t('หลักสูตรทั้งหมด', 'All Courses') : series}
            </button>
          ))}
        </div>
      </div>

      {/* Course Detail Modal */}
      <AnimatePresence>
        {selectedCourse && (
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
              className="relative w-full max-w-4xl bg-white rounded-[3rem] overflow-hidden shadow-2xl z-10 flex flex-col md:flex-row max-h-[90vh]"
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
                <div className="relative p-10 bg-white rounded-[3rem] shadow-2xl shadow-blue-900/10 transition-transform hover:scale-105">
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
                    <h3 className="text-2xl md:text-3xl font-display font-bold text-gray-900 leading-tight">
                      {t(selectedCourse.title, selectedCourse.titleEN)}
                    </h3>
                  </div>
                  <button 
                    onClick={() => setSelectedCourse(null)}
                    className="hidden md:flex w-10 h-10 bg-gray-50 hover:bg-gray-100 rounded-full items-center justify-center text-gray-400 transition-all"
                  >
                    <LucideFilter className="w-5 h-5 rotate-45" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t('รหัสหลักสูตร', 'Course Code')}</p>
                    <p className="font-mono font-bold text-gray-900">{selectedCourse.code}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t('มาตรฐาน', 'Standard')}</p>
                    <p className="font-bold text-gray-900">{selectedCourse.standard}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t('ระยะเวลา', 'Duration')}</p>
                    <p className="font-bold text-gray-900">{t(selectedCourse.duration, selectedCourse.durationEN)}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t('ราคา (ต่อท่าน)', 'Price (per person)')}</p>
                    <p className="text-xl font-display font-bold text-blue-600">฿{selectedCourse.price.toLocaleString()} THB</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-gray-900">{t('รายละเอียดหลักสูตร', 'Course Description')}</h4>
                  <p className="text-gray-500 leading-relaxed text-sm">
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
                    className="px-8 py-4 bg-gray-50 text-gray-600 rounded-2xl font-bold text-sm hover:bg-gray-100 transition-all"
                  >
                    {t('สอบถามเพิ่มเติม', 'Inquiry')}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
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
              className="bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-900/5 transition-all group cursor-pointer"
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
                <div className="relative p-6 bg-white rounded-3xl shadow-xl group-hover:scale-110 transition-transform duration-500">
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
                    <p className="text-[10px] font-mono font-bold text-gray-400">{course.code}</p>
                  </div>
                  <h3 className="text-xl font-display font-bold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors">
                    {t(course.title, course.titleEN)}
                  </h3>
                </div>

                <div className="space-y-3 pt-4 border-t border-gray-50">
                   <div className="flex items-center gap-3 text-gray-500">
                     <Clock className="w-4 h-4 text-blue-500" />
                     <span className="text-xs font-medium">{t(course.duration, course.durationEN)}</span>
                   </div>
                   <div className="flex items-center gap-3 text-gray-500">
                     <MapPin className="w-4 h-4 text-blue-500" />
                     <span className="text-xs font-medium">{t(course.location, course.locationEN)}</span>
                   </div>
                   <div className="flex items-center gap-3 text-gray-900">
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
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
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
                 className="w-full pl-12 pr-6 py-4 bg-white/10 border border-white/10 rounded-2xl focus:ring-2 focus:ring-blue-400 transition-all placeholder:text-blue-300/50"
               />
             </div>
             <button className="px-10 py-4 bg-white text-blue-900 rounded-2xl font-bold text-sm hover:bg-blue-50 active:scale-95 transition-all shadow-xl shadow-black/20">
               {t('ลงทะเบียนรับข่าวสาร', 'Subscribe')}
             </button>
           </div>
        </div>
      </div>
    </div>
  );
}
