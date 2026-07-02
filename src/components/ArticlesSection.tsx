/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  Search,
  ArrowRight,
  Clock,
  Tag,
  ChevronRight,
  Sparkles,
  Info,
  ShieldCheck,
  Zap,
  Building2,
  FileText,
  User,
  Calendar,
  X,
  MessageSquare
} from 'lucide-react';
import { UserSettings } from '../types';

interface ArticlesSectionProps {
  settings: UserSettings;
  onTabChange?: (tab: any) => void;
}

interface Article {
  id: string;
  category: 'beginner' | 'implementation' | 'industry';
  categoryLabelTH: string;
  categoryLabelEN: string;
  titleTH: string;
  titleEN: string;
  excerptTH: string;
  excerptEN: string;
  readTime: string;
  authorTH: string;
  authorEN: string;
  date: string;
  tagsTH: string[];
  tagsEN: string[];
  icon: any;
  colorClass: string;
  contentTH: string[];
  contentEN: string[];
  imageUrl?: string;
}

export default function ArticlesSection({ settings, onTabChange }: ArticlesSectionProps) {
  const lang = settings.lang;
  const t = <T extends any>(th: T, en: T): T => (lang === 'TH' ? th : en);

  const [activeCategory, setActiveCategory] = useState<'all' | 'beginner' | 'implementation' | 'industry'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const articles: Article[] = [
    // 1. Beginner Articles
    {
      id: 'begin-1',
      imageUrl: '/knowledge/ISO คืออะไร.jpg',
      category: 'beginner',
      categoryLabelTH: '1. เริ่มต้นมาตรฐาน (Beginner)',
      categoryLabelEN: '1. Introduction (Beginner)',
      titleTH: 'ISO คืออะไร? เข้าใจความหมายและบทบาทของมาตรฐานสากลใน 5 นาที',
      titleEN: 'What is ISO? Understand International Standards in 5 Minutes',
      excerptTH: 'ทำความเข้าใจจุดเริ่มต้นของคำว่า ISO และความสำคัญในการขับเคลื่อนอุตสาหกรรมในยุคปัจจุบันเพื่อความโปร่งใสและน่าเชื่อถือ',
      excerptEN: 'Discover the history, purpose, and significance of ISO standards in modern industries to build global trust.',
      readTime: '5 min read',
      authorTH: 'ฝ่ายวิชาการ QAIC',
      authorEN: 'QAIC Technical Team',
      date: '2026-06-15',
      tagsTH: ['ความรู้ทั่วไป', 'ISO พื้นฐาน'],
      tagsEN: ['General Knowledge', 'Basic ISO'],
      icon: Info,
      colorClass: 'from-blue-500 to-indigo-600',
      contentTH: [
        'ISO ย่อมาจาก International Organization for Standardization หรือ องค์การระหว่างประเทศว่าด้วยการมาตรฐาน เป็นองค์กรอิสระที่จัดตั้งขึ้นเพื่อกำหนดมาตรฐานอุตสาหกรรมและการค้าทั่วโลก',
        'คำว่า ISO ไม่ได้เป็นตัวย่อของชื่อองค์กรโดยตรง แต่มาจากคำว่า "ISOS" ในภาษากรีกซึ่งแปลว่า "ความเท่าเทียมกัน" เพื่อสะท้อนถึงการกำหนดเกณฑ์ขั้นต่ำที่เป็นกลางและใช้ร่วมกันได้ทุกประเทศ',
        'บทบาทหลักของ ISO คือการสร้าง "ภาษาทางเทคนิคและกระบวนการทำงานที่เป็นอันหนึ่งอันเดียวกัน" เพื่อให้สินค้าและบริการจากประเทศหนึ่ง สามารถส่งออกและเข้ากันได้กับอีกประเทศหนึ่งอย่างไร้อุปสรรค',
        'ระบบมาตรฐานที่นิยมมากที่สุดในโลก ได้แก่ ISO 9001 (ระบบการจัดการคุณภาพ), ISO 14001 (ระบบการจัดการสิ่งแวดล้อม) และ ISO 45001 (ระบบการจัดการอาชีวอนามัยและความปลอดภัย)',
        'สรุปใจความสำคัญ: ISO ไม่ใช่กฎหมาย แต่เป็นตัวกลางที่ช่วยยืนยันความโปร่งใส ความปลอดภัย และประสิทธิภาพของกระบวนการผลิตและบริการขององค์กรต่อสายตาคู่ค้าสากล'
      ],
      contentEN: [
        'ISO stands for the International Organization for Standardization. It is an independent, non-governmental global organization that develops standards to ensure the quality, safety, and efficiency of products, services, and systems.',
        'The word "ISO" is derived from the Greek word "ISOS", meaning "equal". This reflects the core concept of establishing a common benchmark across different countries and industries.',
        'The primary role of ISO is to facilitate international trade by providing common specifications and frameworks, resolving technical and operational gaps between exporters and importers worldwide.',
        'The most globally recognized standards include ISO 9001 (Quality Management), ISO 14001 (Environmental Management), and ISO 45001 (Occupational Health & Safety).',
        'Summary: ISO is not a legal requirement, but it acts as a global seal of trust, proving that your organization operates with reliable, standardized, and internationally verified processes.'
      ]
    },
    {
      id: 'begin-2',
      category: 'beginner',
      categoryLabelTH: '1. เริ่มต้นมาตรฐาน (Beginner)',
      categoryLabelEN: '1. Introduction (Beginner)',
      titleTH: 'ทำไมต้องมี ISO? เหตุผลที่ธุรกิจขนาดเล็กและขนาดใหญ่จำเป็นต้องจดรับรอง',
      titleEN: 'Why Do We Need ISO? Crucial Reasons for SMEs and Large Corporations',
      excerptTH: 'วิเคราะห์เจาะลึกผลประโยชน์ทางธุรกิจของการจดมาตรฐาน ISO ทั้งด้านการลดต้นทุน การตลาด และการเพิ่มสิทธิ์ยื่นประมูลงาน',
      excerptEN: 'Analyze the business benefits of ISO certification including cost reduction, marketing prestige, and government bids.',
      readTime: '6 min read',
      authorTH: 'ฝ่ายการตลาดองค์กร',
      authorEN: 'QAIC Corporate Marketing',
      date: '2026-06-20',
      tagsTH: ['ประโยชน์ธุรกิจ', 'ผู้ประกอบการ'],
      tagsEN: ['Business Value', 'Entrepreneurs'],
      icon: ShieldCheck,
      colorClass: 'from-blue-600 to-sky-600',
      contentTH: [
        'หลายองค์กรอาจตั้งคำถามว่า การยื่นขอใบรับรอง ISO มีค่าใช้จ่ายและขั้นตอนที่ซับซ้อน แล้วทำไมเราถึงยังจำเป็นต้องทำ? คำตอบนั้นแบ่งออกเป็น 3 มิติหลักทางธุรกิจ:',
        '1. การเปิดประตูสู่ตลาดการค้าระดับสูง (Market Access): ในอุตสาหกรรมขนาดใหญ่และการจัดซื้อจัดจ้างของหน่วยงานราชการหรือบริษัทต่างชาติ ใบรับรอง ISOมักถูกกำหนดเป็นเกณฑ์บังคับ (Requirement) หากไม่มีใบรับรอง คุณจะไม่มีสิทธิ์ยื่นประมูลงานตั้งแต่แรก',
        '2. การลดต้นทุนที่เกิดจากความผิดพลาด (Operational Efficiency): ระบบ ISO บังคับให้มีการจัดระเบียบกระบวนการทำงานผ่านคู่มือการปฏิบัติงาน (SOP) ทำให้พนักงานทำงานได้ตรงตามมาตรฐาน ลดของเสียในการผลิตได้เฉลี่ย 15-30% และลดความเสี่ยงจากการทำงานที่ผิดพลาด',
        '3. การสร้างภาพลักษณ์และพลังการต่อรอง (Brand Reputation): การได้รับใบรับรองการประเมินจากผู้ตรวจสอบภายนอก (Certification Body) ที่น่าเชื่อถือ ย่อมสร้างความมั่นใจให้ผู้บริโภคมากกว่าการกล่าวอ้างลอยๆ จากทางบริษัทเอง',
        'สรุป: การทำ ISO ไม่ใช่ค่าใช้จ่ายที่เสียเปล่า แต่คือการลงทุนในโครงสร้างพื้นฐานของระบบงานที่จะเปลี่ยนธุรกิจแบบพึ่งพาบุคคล (People-dependent) ให้กลายเป็นธุรกิจที่มีระบบรองรับ (System-driven) เพื่อการเติบโตอย่างยั่งยืน'
      ],
      contentEN: [
        'Many businesses ask: is the cost and effort of obtaining an ISO certificate worth it? The answer lies in three key business dimensions:',
        '1. Accessing Premium Markets: Major supply chains, international trade groups, and government agencies often set ISO certification as a mandatory bidding requirement. Without it, you are excluded from premium contract opportunities.',
        '2. Cost Reduction & Waste Elimination: ISO frameworks compel organizations to document processes (SOPs). This reduces human error, cuts down waste by 15-30% on average, and optimizes resource allocation.',
        '3. Brand Reputation & Customer Trust: Having your systems audited by an accredited independent Certification Body (CB) offers far higher credibility than self-proclaimed quality claims.',
        'Summary: ISO implementation shifts your business model from people-dependent to system-driven, building a scalable architecture primed for international expansion.'
      ]
    },
    {
      id: 'begin-3',
      category: 'beginner',
      categoryLabelTH: '1. เริ่มต้นมาตรฐาน (Beginner)',
      categoryLabelEN: '1. Introduction (Beginner)',
      titleTH: 'ISO มีกี่ประเภท? เจาะลึกความแตกต่างและการนำไปประยุกต์ใช้งาน',
      titleEN: 'Types of ISO Standards: Core Differences and Applications Explained',
      excerptTH: 'ทำความคุ้นเคยกับ ISO ยอดนิยมแต่ละรหัส เช่น 9001, 14001, 45001, 27001 รหัสไหนคู่ควรกับประเภทธุรกิจคุณ',
      excerptEN: 'Get familiar with the most popular ISO codes like 9001, 14001, 45001, 27001. Find out which one fits your business goals.',
      readTime: '7 min read',
      authorTH: 'ดร. อนิรุทธ์ รัตนพิมล',
      authorEN: 'Dr. Anirut Rattanapimon',
      date: '2026-06-25',
      tagsTH: ['ประเภทมาตรฐาน', 'แนะนำธุรกิจ'],
      tagsEN: ['Standard Types', 'Business Guide'],
      icon: Zap,
      colorClass: 'from-indigo-600 to-purple-650',
      contentTH: [
        'องค์การมาตรฐานสากลมีการประกาศใช้เกณฑ์มาตรฐานมากกว่า 20,000 มาตรฐาน แต่สำหรับภาคธุรกิจทั่วไป มาตรฐานหลักๆ ที่จำเป็นต้องรู้จักมีดังต่อไปนี้:',
        '1. ISO 9001 (Quality Management): มาตรฐานที่ได้รับความนิยมสูงสุด จัดทำขึ้นเพื่อควบคุมคุณภาพในการบริหารงาน การบริการ และกระบวนการผลิตสินค้าให้ตรงตามความคาดหวังของลูกค้าอย่างสม่ำเสมอ',
        '2. ISO 14001 (Environmental Management): มาตรฐานการจัดการสิ่งแวดล้อม เพื่อควบคุม มลพิษ ขยะ พลังงาน และการปล่อยก๊าซเรือนกระจก เหมาะสำหรับโรงงานอุตสาหกรรม หรือบริษัทที่มุ่งเน้นความยั่งยืน (ESG)',
        '3. ISO 45001 (Occupational Health & Safety): มาตรฐานด้านความปลอดภัยและสุขอนามัยในสถานที่ทำงาน เน้นป้องกันอุบัติเหตุ ลดความเจ็บป่วยของพนักงาน และสร้างสภาพแวดล้อมการทำงานที่ดี',
        '4. ISO/IEC 27001 (Information Security): มาตรฐานความปลอดภัยข้อมูลสารสนเทศ ควบคุมการจัดเก็บข้อมูลลูกค้า ป้องกันการโจรกรรมทางไซเบอร์ เหมาะอย่างยิ่งสำหรับบริษัทไอที แพลตฟอร์ม และสถาบันการเงิน',
        'การเลือกจดมาตรฐาน: หากเป็นก้าวแรกของธุรกิจ แนะนำให้เริ่มทำ ISO 9001 ก่อน เพราะเป็นโครงสร้างรากฐานที่สามารถเชื่อมโยงและขยายไปมาตรฐานอื่นๆ (Integrated Management System - IMS) ได้ง่ายที่สุดในอนาคต'
      ],
      contentEN: [
        'While ISO has published over 20,000 standards, only a handful form the foundation of global business operations. Here are the core codes:',
        '1. ISO 9001 (Quality Management): The gold standard for quality control, assuring consistent delivery of products and services that satisfy customer requirements.',
        '2. ISO 14001 (Environmental Management): Focused on reducing environmental impact, carbon footprint, and energy waste. Crucial for eco-conscious manufacturing and ESG compliance.',
        '3. ISO 45001 (Occupational Health & Safety): A safety-first framework that prevents workplace hazards, injuries, and illness while building an employee-friendly workspace.',
        '4. ISO/IEC 27001 (Information Security Management): Designed to protect critical data, secure customer privacy, and block cyber leaks. Vital for IT vendors, FinTech, and SaaS providers.',
        'Strategy: Start with ISO 9001 as your base. It establishes a high-level structure (Annex SL) that easily integrates with other codes in an Integrated Management System (IMS) later.'
      ]
    },
    {
      id: 'begin-4',
      category: 'beginner',
      categoryLabelTH: '1. เริ่มต้นมาตรฐาน (Beginner)',
      categoryLabelEN: '1. Introduction (Beginner)',
      titleTH: 'ขั้นตอนการขอใบรับรองมาตรฐาน ISO ฉบับเข้าใจง่ายสำหรับผู้เริ่มต้น',
      titleEN: 'Step-by-Step ISO Certification Roadmap for Beginners',
      excerptTH: 'สรุป 6 ขั้นตอนหลักในการขอใบเซอร์ตั้งแต่เตรียมตัว ตรวจประเมินเบื้องต้น จนได้รับการอนุมัติรับรองระบบงาน',
      excerptEN: 'Summary of the 6 key steps from initial gap assessment, audit stages, up to formal certificate approval.',
      readTime: '8 min read',
      authorTH: 'ฝ่ายวางแผนรับรองระบบ QAIC',
      authorEN: 'QAIC Certification Planning',
      date: '2026-06-28',
      tagsTH: ['ขั้นตอนขอรับรอง', 'เตรียมความพร้อม'],
      tagsEN: ['Certification Steps', 'Preparation Guide'],
      icon: Clock,
      colorClass: 'from-blue-700 to-indigo-850',
      contentTH: [
        'การเริ่มต้นขอใบรับรอง ISO สำหรับผู้ที่ไม่เคยทำระบบมาก่อน อาจดูซับซ้อน แต่หากแบ่งสัดส่วนการปฏิบัติงานตามมาตรฐานสากล จะพบว่ามีเพียง 6 ขั้นตอนหลักๆ ดังนี้:',
        '1. ตรวจสอบความพร้อมและวิเคราะห์ประเด็นต่างจากมาตรฐาน (Gap Analysis): ศึกษาว่าปัจจุบันกระบวนการทำงานของเราขาดอะไรบ้างเมื่อเทียบกับเกณฑ์ข้อกำหนดของ ISO มาตรฐานนั้นๆ',
        '2. ออกแบบและพัฒนาเอกสารระบบงาน (Documentation): เขียนนโยบายคุณภาพ (Quality Policy) คู่มือคุณภาพ (Quality Manual) และระเบียบปฏิบัติงาน (SOP) ในแต่ละกระบวนการทำงาน',
        '3. นำระบบไปปฏิบัติใช้จริงและเก็บข้อมูลบันทึกหลักฐาน (Implementation & Records): ฝึกอบรมพนักงานให้ทำงานตามที่ระบุไว้ในเอกสาร และเก็บบันทึกร่องรอยการทำงานอย่างน้อย 3 เดือน',
        '4. ตรวจประเมินภายใน (Internal Audit & Management Review): สุ่มตรวจสอบการทำงานภายในเองเพื่อหาข้อบกพร่อง และจัดประชุมทบทวนฝ่ายบริหารเพื่ออนุมัติข้อมูลระบบก่อนส่งตรวจจริง',
        '5. ตรวจประเมินโดย Certification Body (CB Audits): แบ่งเป็น Stage 1 (ตรวจความพร้อมของเอกสาร) และ Stage 2 (ตรวจหน้างานจริงเพื่อหาข้อสรุป NC หรือข้อบกพร่อง)',
        '6. ปิดข้อบกพร่องและรับใบรับรอง (Certification Approval): แก้ไขข้อบกพร่องค้างคาที่ได้รับจากการตรวจ (หากมี) เพื่อส่งเล่มรายงานให้คณะกรรมการพิจารณาอนุมัติออกใบเซอร์อย่างเป็นทางการ'
      ],
      contentEN: [
        'The journey to certification can be broken down into 6 straightforward phases:',
        '1. Gap Analysis: Evaluate your existing operations against standard requirements to identify what controls are missing.',
        '2. Documentation: Define quality policies, draft Standard Operating Procedures (SOPs), and build process maps.',
        '3. Implementation & Evidence Gathering: Educate employees on the new systems, execute operations, and gather at least 3 months of logs.',
        '4. Internal Audit & Management Review: Conduct internal mock assessments to identify gaps, followed by a formal leadership review.',
        '5. Certification Audits (CB): Split into Stage 1 (Doc review and readiness check) and Stage 2 (On-site assessment to verify physical evidence and identify NCs).',
        '6. Corrective Actions & Certification: Address remaining findings (NCs) to secure technical board approval and receive your accredited certificate.'
      ]
    },

    // 2. Implementation Articles
    {
      id: 'impl-1',
      category: 'implementation',
      categoryLabelTH: '2. แนวทางปฏิบัติ (Implementation)',
      categoryLabelEN: '2. Implementation Guides',
      titleTH: 'วิธีเตรียมตัวรับ Audit อย่างมืออาชีพ: เทคนิคการจัดการเอกสารและบุคลากร',
      titleEN: 'How to Prepare for a Professional Audit: Document and Staff Readiness',
      excerptTH: 'คู่มือการจัดห้องตรวจและฝึกอบรมทีมงานหน้าบ้านให้ตอบคำถามผู้ตรวจประเมินได้อย่างถูกต้องและมั่นใจ',
      excerptEN: 'Guide on setting up the audit room and coaching your frontline staff to answer auditor inquiries with confidence.',
      readTime: '6 min read',
      authorTH: 'ผู้ตรวจประเมินอาวุโส QAIC',
      authorEN: 'QAIC Senior Lead Auditor',
      date: '2026-06-29',
      tagsTH: ['การเตรียมตัว Audit', 'คู่มือพนักงาน'],
      tagsEN: ['Audit Preparation', 'Staff Coaching'],
      icon: Zap,
      colorClass: 'from-emerald-500 to-teal-650',
      contentTH: [
        'วันตรวจประเมินหน้างานจริง (Stage 2 Audit) คือตัวชี้วัดสำคัญว่าจะผ่านการรับรองหรือไม่ การเตรียมการล่วงหน้าในส่วนของเอกสารและบุคคลเป็นสิ่งจำเป็นอย่างยิ่ง:',
        '1. จัดระเบียบเอกสารตามหัวข้อตรวจ (Document Organization): เตรียมไฟล์นโยบาย, SOP, รายงานการประชุมทบทวนฝ่ายบริหาร, และประวัติการทำ Internal Audit ล่าสุดให้อยู่ในแฟ้มหรือระบบที่เรียกดูได้ทันทีภายใน 5 นาที เพื่อแสดงถึงความเป็นระบบ',
        '2. การซักซ้อมพนักงาน (Staff Coaching): พนักงานในไลน์ปฏิบัติงานต้องทราบว่านโยบายคุณภาพของบริษัทคืออะไร และตนเองมีบทบาทสำคัญในการควบคุมข้อบกพร่องอย่างไร เน้นตอบตามกระบวนการทำงานจริงตาม SOP',
        '3. จัดการสถานที่ตรวจ (Housekeeping): เคลียร์พื้นที่จัดเก็บ ป้ายเตือนความปลอดภัย ถังดับเพลิง จุดทิ้งขยะอันตราย และป้ายบอกทิศทางต่างๆ ให้สะอาด ถูกต้องตามกฎหมายและข้อกำหนด',
        'เคล็ดลับจากผู้ตรวจประเมิน: หากไม่มั่นใจในคำตอบ หรือหาเอกสารไม่เจอในทันที ให้ตอบตามตรงว่าขอเวลาค้นหาข้อมูลแทนการคาดเดาคำตอบ หรือพยายามปิดบังข้อมูล เพราะความโปร่งใสคือหัวใจหลักของการประเมินระบบงาน'
      ],
      contentEN: [
        'The Stage 2 Audit is the defining moment of your certification journey. Preparing documents and coaching your team can significantly reduce friction:',
        '1. Structured Document Access: Keep policies, SOPs, management review minutes, and internal audit logs organized. If an auditor requests a document, you should retrieve it within 5 minutes to show control.',
        '2. Coaching Operational Staff: Employees should know the company\'s quality policies and understand their role in controlling non-conformities. Instruct them to answer questions based on actual daily SOP tasks.',
        '3. On-Site Housekeeping: Clean operational spaces, verify that safety signs, fire extinguishers, waste management bins, and safety gear conform to regulations.',
        'Pro-tip: If you cannot find a requested document immediately, ask for a brief moment to locate it instead of guessing or concealing. Transparency builds trust with lead auditors.'
      ]
    },
    {
      id: 'impl-2',
      category: 'implementation',
      categoryLabelTH: '2. แนวทางปฏิบัติ (Implementation)',
      categoryLabelEN: '2. Implementation Guides',
      titleTH: 'วิธีทำ Internal Audit ให้ได้ผลลัพธ์จริง: สรุปหลักการตรวจประเมินภายใน',
      titleEN: 'Internal Auditing Best Practices: How to Drive Real Improvements',
      excerptTH: 'เรียนรู้กระบวนการจัดทำแผนตรวจภายใน การจัดตั้งคณะผู้ตรวจ และการเขียนใบ CAR เพื่อแก้ไขปัญหาก่อนวันตรวจจริง',
      excerptEN: 'Learn how to outline audit plans, assign internal audit teams, and issue CAPA/CARs to resolve system errors.',
      readTime: '7 min read',
      authorTH: 'ผู้เชี่ยวชาญระบบควบคุมวิชาการ',
      authorEN: 'QAIC Technical Expert',
      date: '2026-06-30',
      tagsTH: ['ตรวจประเมินภายใน', 'เอกสารตรวจสอบ'],
      tagsEN: ['Internal Audit', 'Checklists'],
      icon: Sparkles,
      colorClass: 'from-emerald-600 to-green-600',
      contentTH: [
        'Internal Audit หรือการตรวจประเมินภายใน เป็นเงื่อนไขบังคับในระบบ ISO ทุกมาตรฐาน เพื่อให้แน่ใจว่าระบบยังคงมีประสิทธิภาพก่อนการตรวจประเมินภายนอกจริง:',
        '1. กฎการแต่งตั้งผู้ตรวจประเมินภายใน (Auditor Independence): ผู้ที่จะไปตรวจแผนกใดก็ตาม ต้องไม่มีหน้าที่หลักในการรับผิดชอบแผนกนั้นๆ เพื่อป้องกันการมีอคติ (เช่น บัญชีห้ามตรวจแผนกบัญชีของตัวเอง แต่ตรวจฝ่ายจัดซื้อได้)',
        '2. การร่างรายการตรวจสอบ (Checklist Generation): อ้างอิงตามเกณฑ์ข้อกำหนดมาตรฐาน (Standard Clause) ผสานกับคู่มือการทำงานจริง (SOP) เพื่อนำมาไล่เช็คว่าพนักงานทำตรงตามเอกสารหรือไม่',
        '3. การออกใบแจ้งเตือนข้อบกพร่อง (CAR / NCR): หากพบข้อบกพร่องที่ไม่เป็นไปตามข้อกำหนด ให้ทำการออกใบคำขอการแก้ไข (Corrective Action Request) เพื่อให้แผนกที่เกี่ยวข้องทำการวิเคราะห์สาเหตุที่แท้จริง (Root Cause Analysis) และแก้ไข',
        'สรุป: การตรวจภายในที่ดีไม่ใช่การตรวจเพื่อหาเรื่องตำหนิกัน แต่คือการช่วยเหลือซึ่งกันและกันเพื่อซ่อมแซมระบบที่รั่วไหลก่อนที่ผู้ตรวจภายนอกจริงจะเข้ามาพิจารณาใบรับรอง'
      ],
      contentEN: [
        'Internal Auditing is a mandatory clause in all ISO standards, serving as your system\'s pre-screening health check:',
        '1. Auditor Independence: Ensure auditors do not audit their own work or department. A finance team member can audit purchasing, but not the accounting logs.',
        '2. Checklist Formulation: Build lists based on ISO clauses merged with your actual SOPs. This keeps the audit targeted and evidence-focused.',
        '3. Issuing CARs/NCRs: When discrepancies are found, issue a Corrective Action Request (CAR). This requires the affected department to perform Root Cause Analysis and implement a permanent fix.',
        'Takeaway: Internal audits are not meant to criticize staff. They are a collaborative tool to optimize your processes before the external registrar arrives.'
      ]
    },
    {
      id: 'impl-3',
      category: 'implementation',
      categoryLabelTH: '2. แนวทางปฏิบัติ (Implementation)',
      categoryLabelEN: '2. Implementation Guides',
      titleTH: 'คู่มือการเขียน SOP (Standard Operating Procedure) ให้สอดคล้องตามมาตรฐาน',
      titleEN: 'Guide to Writing SOPs (Standard Operating Procedures) for ISO Conformance',
      excerptTH: 'เจาะลึกโครงสร้างการทำเอกสารระเบียบปฏิบัติงาน การกำหนดผู้รับผิดชอบ และการใช้สัญลักษณ์ Flowchart ในองค์กร',
      excerptEN: 'Detailed layout of writing work instructions, allocating responsibilities, and mapping workflows using standard Flowcharts.',
      readTime: '6 min read',
      authorTH: 'วิศวกรวิเคราะห์ระบบงาน QAIC',
      authorEN: 'QAIC Systems Engineer',
      date: '2026-07-01',
      tagsTH: ['เขียน SOP', 'คู่มือคุณภาพ'],
      tagsEN: ['SOP Writing', 'Quality Manuals'],
      icon: FileText,
      colorClass: 'from-teal-600 to-cyan-650',
      contentTH: [
        'SOP หรือระเบียบปฏิบัติการมาตรฐาน คือหัวใจของการรันระบบงานให้คงที่และลดความพึ่งพาในตัวบุคคลใดบุคคลหนึ่ง โครงสร้างที่สอดคล้องกับ ISO มีดังนี้:',
        '1. ข้อมูลการควบคุมเอกสาร (Document Control Header): ประกอบด้วย รหัสเอกสาร, ครั้งที่แก้ไข (Revision), วันที่ประกาศใช้, หน้า และผู้ลงนามอนุมัติ (เป็นเกณฑ์สำคัญใน ISO 9001)',
        '2. วัตถุประสงค์และขอบเขต (Purpose & Scope): เขียนอธิบายสั้นๆ ว่าเอกสารนี้จัดทำขึ้นเพื่อควบคุมเรื่องอะไร ครอบคลุมตั้งแต่ขั้นตอนใดถึงขั้นตอนใด',
        '3. แผนผังกระบวนการทำงาน (Process Flowchart): ใช้สัญลักษณ์มาตรฐาน เช่น จุดเริ่มต้น/สิ้นสุด (Oval), กิจกรรม (Rectangle), และการตัดสินใจ (Diamond) เพื่อให้เข้าใจลื่นไหลง่ายที่สุด',
        '4. รายละเอียดขั้นตอนการทำงานและผู้รับผิดชอบ (Procedure Details): เขียนระบุรายละเอียดงานให้ชัดเจนว่า ใครต้องทำอะไร อย่างไร และมีเอกสารบันทึกร่องรอย (Form) อะไรบ้างประกอบงานนั้นๆ'
      ],
      contentEN: [
        'A Standard Operating Procedure (SOP) forms the backbone of a system-driven business. Here is how to construct ISO-conforming SOPs:',
        '1. Document Control Header: Every SOP must display a Document ID, Revision Number, Effective Date, Page Number, and approval signatures.',
        '2. Purpose & Scope: Clearly define the objective of the SOP and outline which departments, operations, or sites it applies to.',
        '3. Process Flowcharts: Use standard flow shapes (Oval for start/end, Rectangle for actions, Diamond for decisions) to present visual process flows.',
        '4. Detailed Procedures & Responsibility: Document step-by-step tasks, assign ownership (roles, not names), and list standard forms/logs generated.',
      ]
    },
    {
      id: 'impl-4',
      category: 'implementation',
      categoryLabelTH: '2. แนวทางปฏิบัติ (Implementation)',
      categoryLabelEN: '2. Implementation Guides',
      titleTH: 'Pre-Audit Checklist: 10 รายการสิ่งของและบันทึกข้อมูลที่ต้องเช็คด่วนที่สุด',
      titleEN: 'Pre-Audit Checklist: 10 Critical Records to Review Immediately',
      excerptTH: 'เช็คลิสต์ด่วนสำหรับเจ้าหน้าที่ควบคุมระบบ (QMR) นำไปตรวจทานเพื่อความสมบูรณ์ 1 สัปดาห์ก่อนวันรับตรวจประเมินจริง',
      excerptEN: 'A quick checklist for Management Representatives (QMR) to verify logs and training evidence 1 week prior to the CB audit.',
      readTime: '5 min read',
      authorTH: 'ผู้ประเมินวิชาการ ISO',
      authorEN: 'QAIC Technical Assessor',
      date: '2026-07-01',
      tagsTH: ['Checklist ก่อนตรวจ', 'QMR เตรียมความพร้อม'],
      tagsEN: ['Pre-Audit Check', 'QMR Support'],
      icon: Clock,
      colorClass: 'from-emerald-500 to-green-700',
      contentTH: [
        'ก่อนผู้ตรวจภายนอกจริงจะก้าวเข้ามาในสัปดาห์หน้า เจ้าหน้าที่ควบคุมระบบมาตรฐาน (QMR) ควรนำ 10 รายการเช็คลิสต์นี้ไปตรวจสอบให้แน่ใจว่าไม่มีข้อตกหล่น:',
        '1. ทะเบียนคุมเอกสารและฉบับปรับปรุง (Master Document Control List) ได้รับการอัปเดตตรงตามหน้างานจริง',
        '2. รายงานการประชุมทบทวนฝ่ายบริหาร (Management Review Minutes) มีหลักฐานครบถ้วน มีลายเซ็นกรรมการและผู้เกี่ยวข้อง',
        '3. รายงานข้อบกพร่องและการปิด CAR (Corrective Action Request Log) ทั้งหมดที่เกิดจากรอบตรวจประเมินภายในได้รับการปิดเรียบร้อย',
        '4. ประวัติการฝึกอบรมพนักงานและประวัติการประเมินผลพนักงานใหม่ได้รับการบันทึกข้อมูลและรวบรวมอย่างเป็นระบบ',
        '5. ข้อมูลการประเมินคู่ค้าภายนอก (Supplier Evaluation Records) ของแผนกจัดซื้อได้รับการบันทึกครบถ้วนตามหลักเกณฑ์',
        '6. ข้อมูลการวัดความพึงพอใจของลูกค้า (Customer Satisfaction Analysis) มีการรวบรวมและวิเคราะห์สถิติ',
        '7. ประวัติการซ่อมบำรุงเครื่องจักรและการสอบเทียบเครื่องมือวัด (Calibration Records) ที่สำคัญได้รับการติดป้ายระบุสถานะถูกต้อง',
        '8. แผนบริหารความเสี่ยงและโอกาสทางธุรกิจ (Risk & Opportunity Matrix) มีการทบทวนผลสัมฤทธิ์อย่างเป็นรูปธรรม',
        '9. การกำหนดค่าเป้าหมายดัชนีชี้วัดความสำเร็จ (KPI Target Review) ของแต่ละแผนกได้รับการสรุปประเมิน',
        '10. สภาพความสะอาดและความปลอดภัยขั้นพื้นฐานของสถานที่หน้างานได้รับการเคลียร์อุปสรรคทางเดินและการจัดเก็บแล้ว'
      ],
      contentEN: [
        'Ensure the following 10 items are ready and verified 1 week before the audit starts:',
        '1. Master Document Control List: Check that all active documents are at their latest revision status.',
        '2. Management Review Minutes: Verify signed leadership commitment, objective outcomes, and strategic action plans.',
        '3. Corrective Action Log (CAR/CAPA): Ensure all internal audit findings have closed corrective actions with verification evidence.',
        '4. Staff Training Records: Compile competency matrices, training attendances, and evaluations.',
        '5. Supplier Evaluations: Confirm annual performance evaluations of critical external vendors are fully documented.',
        '6. Customer Feedback & Satisfaction Surveys: Gather statistical feedback summaries and complaint logs.',
        '7. Equipment Calibration Logs: Ensure key measuring instruments show up-to-date calibration stamps.',
        '8. Risk & Opportunity Matrix: Verify that business risk mitigations show active review logs.',
        '9. KPI Performance Logs: Compile progress metrics for all department goals.',
        '10. Site Walk-through: Check walkways, emergency exit clearances, fire extinguisher locations, and waste handling areas.'
      ]
    },

    // 3. Industry Articles
    {
      id: 'ind-1',
      category: 'industry',
      categoryLabelTH: '3. เจาะลึกอุตสาหกรรม (Industry)',
      categoryLabelEN: '3. Industry Insights',
      titleTH: 'ISO 13485 & ISO 9001 มาตรฐานสำคัญสำหรับกลุ่มโรงพยาบาลและเครื่องมือแพทย์',
      titleEN: 'ISO 13485 & 9001: Critical Standards for Hospitals and Medical Devices',
      excerptTH: 'วิเคราะห์การประยุกต์ใช้ข้อกำหนดควบคุมคุณภาพเพื่อความปลอดภัยของผู้ป่วยและการจัดเก็บอุปกรณ์เครื่องมืออย่างถูกสุขลักษณะ',
      excerptEN: 'An analysis of quality control implementation for patient safety, medical supply chain integrity, and clean rooms.',
      readTime: '8 min read',
      authorTH: 'ผู้ตรวจประเมินชีวการแพทย์ QAIC',
      authorEN: 'QAIC Medical Systems Auditor',
      date: '2026-07-01',
      tagsTH: ['โรงพยาบาล', 'เครื่องมือแพทย์'],
      tagsEN: ['Hospitals', 'Medical Devices'],
      icon: Building2,
      colorClass: 'from-indigo-650 to-blue-800',
      contentTH: [
        'ในภาคส่วนการดูแลสุขภาพ โรงพยาบาล และผู้ผลิตเครื่องมือแพทย์ คุณภาพของระบบไม่ใช่เพียงแค่เรื่องการลดต้นทุน แต่ส่งผลโดยตรงต่อชีวิตและความปลอดภัยของมนุษย์:',
        '1. ISO 9001 ในโรงพยาบาล (Healthcare Quality): ประยุกต์ใช้เพื่อจัดระเบียบขั้นตอนการรับผู้ป่วย, ระบบคัดกรอง (Triage), การจัดเก็บประวัติบันทึกทางการแพทย์อย่างเป็นระบบ, และระบบการจ่ายยาเพื่อป้องกันข้อผิดพลาด',
        '2. ISO 13485 สำหรับผู้ผลิตเครื่องมือแพทย์ (Medical Devices QMS): เป็นมาตรฐานเฉพาะด้านเทคนิคที่เข้มงวด มุ่งเน้นการออกแบบชิ้นงาน, การบริหารความเสี่ยงด้านอุปกรณ์แพทย์ (ISO 14971), และการจัดห้องสะอาด (Clean Room Control)',
        '3. ระบบควบคุมการฆ่าเชื้อและการสอบเทียบเครื่องมือวัดทางแพทย์: เครื่องมือแพทย์ทุกชิ้นที่ส่งผลต่อการตรวจวินิจฉัยโรค ต้องได้รับการสอบเทียบ (Calibration) อย่างเที่ยงตรงเพื่อความแม่นยำสูง',
        'ข้อเสนอแนะ: การทำมาตรฐานในกลุ่มสุขภาพควรเน้นการฝึกอบรมทัศนคติของบุคลากรให้ตระหนักถึงความปลอดภัยเชิงรุก (Risk-based thinking) เพื่อป้องกันความเสี่ยงก่อนที่จะเกิดความผิดพลาดจริงกับผู้ป่วย'
      ],
      contentEN: [
        'In the healthcare and medical devices sector, quality systems directly impact patient safety and clinical outcomes:',
        '1. ISO 9001 in Healthcare: Focuses on patient admission workflows, medical records encryption, and medication dispensing safety loops.',
        '2. ISO 13485 for Medical Device Manufacturers: A highly specialized standard emphasizing product design control, medical risk management (ISO 14971), cleanroom particle control, and sterile packaging.',
        '3. Calibration of Clinical Tools: Healthcare diagnostic instruments must demonstrate traceable calibration history to assure accuracy.',
        'Recommendation: Implement proactive risk-based thinking (FMEA) across departments, treating quality as a safety protocol rather than a paper exercise.'
      ]
    },
    {
      id: 'ind-2',
      category: 'industry',
      categoryLabelTH: '3. เจาะลึกอุตสาหกรรม (Industry)',
      categoryLabelEN: '3. Industry Insights',
      titleTH: 'ISO 14001 และ ISO 45001 หัวใจหลักในการขับเคลื่อนโรงงานอุตสาหกรรมยุคใหม่',
      titleEN: 'ISO 14001 & 45001: The Backbone of Modern Manufacturing Factories',
      excerptTH: 'แนวทางการบริหารจัดการมลพิษสิ่งแวดล้อม และระบบป้องกันอุบัติเหตุในสายการผลิตเพื่อเพิ่มประสิทธิภาพการทำงานและสอดคล้องตามกฎหมาย',
      excerptEN: 'Strategies for environmental waste management and accident prevention in production lines to ensure legal compliance.',
      readTime: '7 min read',
      authorTH: 'ผู้ประเมินระบบสิ่งแวดล้อมอาวุโส',
      authorEN: 'QAIC Senior Environmental Auditor',
      date: '2026-07-01',
      tagsTH: ['โรงงานและสิ่งแวดล้อม', 'อาชีวอนามัย'],
      tagsEN: ['Factory & Environment', 'Safety First'],
      icon: ShieldCheck,
      colorClass: 'from-indigo-700 to-indigo-900',
      contentTH: [
        'โรงงานอุตสาหกรรมคือจุดที่มีกระบวนการทำงานซับซ้อน ปล่อยของเสีย และมีความเสี่ยงด้านอุบัติภัยสูงที่สุด การประยุกต์ใช้ ISO สองมาตรฐานร่วมกัน (Integrated Management System) จึงเป็นแนวทางมาตรฐานทั่วโลก:',
        '1. ISO 14001 (Environmental Management): ควบคุมการปล่อยน้ำเสีย, มลพิษทางอากาศ, การจำแนกประเภทขยะอันตราย, และประหยัดการใช้พลังงานในโรงงาน เพื่อสอดคล้องกับมาตรการกฎหมายกระทรวงอุตสาหกรรมและกระทรวงทรัพยากรฯ',
        '2. ISO 45001 (OH&S): การประเมินความเสี่ยงด้านความปลอดภัย (Job Safety Analysis - JSA), การทำความคุ้นเคยกับการฝึกซ้อมหนีไฟ, ระบบ Lockout Tagout (LOTO) ในงานซ่อมบำรุงเครื่องจักร, และการใช้ชุดป้องกันอันตรายส่วนบุคคล (PPE)',
        '3. การตรวจสอบกฎหมายเกี่ยวข้อง (Legal Compliance Registry): โรงงานต้องจัดทำระบบคอยติดตามกฎหมายใหม่ๆ ด้านสิ่งแวดล้อมและความปลอดภัย และประเมินตนเองอย่างน้อยปีละ 1 ครั้ง',
        'สรุป: การรักษาระบบร่วมกันนี้ ช่วยลดโอกาสที่โรงงานจะโดนร้องเรียนจากชุมชนภายนอก ลดเบี้ยประกันอุบัติภัยลง และลดอุบัติเหตุร้ายแรงในสายการผลิตได้เกือบ 100%'
      ],
      contentEN: [
        'Manufacturing sites face the highest operational hazards, emissions risks, and regulatory oversight. Integrating these two core standards is global best practice:',
        '1. ISO 14001: Controls wastewater quality, air emissions, chemical storage, hazardous waste disposal, and energy consumption. Essential for compliance with industrial and green regulations.',
        '2. ISO 45001: Focuses on Job Safety Analysis (JSA), incident reports, Lockout-Tagout (LOTO) machinery protocols, and Personal Protective Equipment (PPE) compliance.',
        '3. Legal Registry Maintenance: Factories must document applicable environmental/safety laws and perform compliance evaluations at least annually.',
        'Summary: Dual implementation shields factories from environmental litigation, lowers insurance premiums, and virtually eliminates workplace fatalities.'
      ]
    },
    {
      id: 'ind-3',
      category: 'industry',
      categoryLabelTH: '3. เจาะลึกอุตสาหกรรม (Industry)',
      categoryLabelEN: '3. Industry Insights',
      titleTH: 'GHPs & HACCP มาตรฐานการจัดการความปลอดภัยและสุขอนามัยสำหรับธุรกิจร้านอาหาร',
      titleEN: 'GHPs & HACCP: Food Safety and Sanitation Standards for Restaurants',
      excerptTH: 'แนวทางการจัดระบบการผลิตอาหารตั้งแต่การควบคุมวัตถุดิบ การจัดเก็บ การเตรียมครัว และการป้องกันสิ่งปนเปื้อนในอาหาร',
      excerptEN: 'Guidelines for managing food production chains from raw materials, safe storage, kitchen layouts, to cross-contamination prevention.',
      readTime: '6 min read',
      authorTH: 'ผู้ตรวจประเมินอุตสาหกรรมอาหาร',
      authorEN: 'QAIC Food Chain Specialist',
      date: '2026-07-02',
      tagsTH: ['ร้านอาหารและเบเกอรี่', 'ความปลอดภัยอาหาร'],
      tagsEN: ['Food & Beverage', 'Food Safety'],
      icon: Zap,
      colorClass: 'from-blue-800 to-indigo-950',
      contentTH: [
        'สำหรับร้านอาหาร โรงแรม คลังจัดเก็บ และผู้ผลิตเบเกอรี่ ความปลอดภัยของอาหารไม่มีคำว่าอะลุ่มอล่วย มาตรฐาน GHPs (Good Hygiene Practices) และ HACCP คือหัวใจ:',
        '1. การแยกพื้นที่เก็บวัตถุดิบดิบและอาหารพร้อมทาน (Cross-contamination Prevention): ควบคุมการไหลเวียนของงานในครัว (Work Flow Layout) ห้ามพนักงานใช้เขียงหรือมีดหั่นเนื้อดิบและผักสลัดปะปนกัน',
        '2. การควบคุมอุณหภูมิ (Cold Chain Control): ตู้แช่เย็นต้องคงอุณหภูมิ 0-4 องศาเซลเซียส และช่องแช่แข็งต้องอยู่ต่ำกว่า -18 องศาเซลเซียส โดยต้องมีบันทึกอุณหภูมิเช้า-เย็นทุกวัน',
        '3. การวิเคราะห์จุดวิกฤตที่ต้องควบคุม (HACCP CCPs): ระบุและหามาตรการควบคุมจุดวิกฤต เช่น อุณหภูมิในขั้นความร้อนที่ฆ่าเชื้อโรคของเนื้อสัตว์ ต้องสูงเกิน 74 องศาเซลเซียส เพื่อความปลอดภัยสูงสุดของผู้บริโภค',
        'สรุป: การได้รับรองมาตรฐานระบบนี้ ช่วยให้ร้านอาหารของคุณสามารถขยายสาขาแฟรนไชส์ หรือยื่นเสนอเป็นผู้จัดทำอาหารส่งออกสายการบินหรือห้างค้าปลีกชั้นนำได้อย่างน่าเชื่อถือ'
      ],
      contentEN: [
        'For restaurants, hotels, catering services, and food producers, GHPs (Good Hygiene Practices) and HACCP form the basic compliance requirement:',
        '1. Cross-Contamination Prevention: Maintain strict separation of raw ingredients from ready-to-eat products. Optimize kitchen workflow layouts (one-way flow) to prevent raw juice spills.',
        '2. Temperature Control (Cold Chain): Refrigerator temps must run at 0-4°C, and freezers at -18°C or below, backed by daily logs.',
        '3. Critical Control Points (CCP) under HACCP: Identify and monitor key limits, such as heating temperatures of meats (min 74°C) to ensure biological hazards are eliminated.',
        'Summary: Food safety compliance is the prerequisite for franchising, supplying to hypermarkets, or securing airline catering contracts.'
      ]
    },
    {
      id: 'ind-4',
      category: 'industry',
      categoryLabelTH: '3. เจาะลึกอุตสาหกรรม (Industry)',
      categoryLabelEN: '3. Industry Insights',
      titleTH: 'ISO/IEC 27001 มาตรฐานการปกป้องข้อมูลและความปลอดภัยทางไซเบอร์สำหรับบริษัทไอที',
      titleEN: 'ISO/IEC 27001: Data Protection and Cybersecurity for IT Companies',
      excerptTH: 'วิเคราะห์หลักการควบคุมความปลอดภัยข้อมูลสารสนเทศ แผนกู้คืนระบบเมื่อเกิดภัยพิบัติ และความสำคัญในการรักษาข้อมูลลูกค้า',
      excerptEN: 'Analyze information security controls, disaster recovery plans, and the importance of safeguarding user data.',
      readTime: '8 min read',
      authorTH: 'ผู้ตรวจประเมินระบบเทคโนโลยีสารสนเทศอาวุโส',
      authorEN: 'QAIC Senior IT Assessor',
      date: '2026-07-02',
      tagsTH: ['บริษัท IT และเทค', 'ความปลอดภัยข้อมูลไซเบอร์'],
      tagsEN: ['IT & Tech Companies', 'Information Security'],
      icon: Building2,
      colorClass: 'from-blue-900 to-indigo-950',
      contentTH: [
        'ในยุคที่ข้อมูลมีค่ามากกว่าน้ำมันดิบ และภัยคุกคามทางไซเบอร์เกิดขึ้นทุกนาที บริษัทซอฟต์แวร์, SaaS, คลาวด์, และบริษัทเทคจำจำเป็นต้องควบคุมระบบความปลอดภัยตามมาตรฐาน ISO 27001:',
        '1. การประเมินความเสี่ยงด้านสินทรัพย์สารสนเทศ (Asset Risk Assessment): ค้นหาว่าอุปกรณ์ เซิร์ฟเวอร์ ซอร์สโค้ด และข้อมูลส่วนบุคคล (PDPA) ของลูกค้าชิ้นไหนมีความเสี่ยง และกำหนดมาตรการควบคุม (Annex A Controls)',
        '2. การควบคุมการเข้าถึงระบบแบบเข้มงวด (Access Control Policy): จำกัดสิทธิ์การเข้าถึงข้อมูลตามความจำเป็น (Need-to-Know basis) และเปิดใช้งานการยืนยันตัวตนแบบหลายปัจจัย (MFA)',
        '3. แผนกู้คืนความเสียหายและดำเนินธุรกิจต่อเนื่อง (Disaster Recovery & BCP): ต้องมีระบบสำรองข้อมูล (Backup) และจำลองเหตุการณ์เซิร์ฟเวอร์หลักพัง หรือโดน Ransomware ว่าจะสามารถกู้ข้อมูลกลับมาให้บริการต่อได้ในกี่ชั่วโมง',
        'ความสำคัญต่อการขายงาน: ปัจจุบันบริษัทยักษ์ใหญ่และธนาคารแทบทุกแห่ง จะปฏิเสธการเชื่อมต่อ API หรือซื้อระบบจากบริษัทซอฟต์แวร์ที่ยังไม่ผ่าน ISO 27001 ดังนั้นนี่จึงเป็นเสมือนกุญแจสำคัญในการเปิดดีลโปรเจกต์ระดับองค์กรใหญ่'
      ],
      contentEN: [
        'For software, cloud infrastructure, and SaaS companies, securing customer data and preventing server breaches is a major business requirement:',
        '1. Information Asset Risk Assessment: Catalog databases, software source codes, and personal data (PDPA), establishing Annex A controls.',
        '2. Access Control Policies: Restrict data access strictly on a "need-to-know" basis. Enforce multi-factor authentication (MFA) across servers.',
        '3. Disaster Recovery (DR) & BCP: Implement auto-backup routines and run simulations of server outages or ransomware locks to define Recovery Time Objectives (RTO).',
        'Enterprise Sales Advantage: Enterprises and banking networks refuse API integrations or SaaS purchases from vendors lacking ISO 27001. It is a critical sales enabler for B2B tech.'
      ]
    }
  ];

  const filteredArticles = useMemo(() => {
    return articles.filter(article => {
      const matchCategory = activeCategory === 'all' || article.category === activeCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchSearch =
        !query ||
        article.titleTH.toLowerCase().includes(query) ||
        article.titleEN.toLowerCase().includes(query) ||
        article.excerptTH.toLowerCase().includes(query) ||
        article.excerptEN.toLowerCase().includes(query) ||
        article.tagsTH.some(t => t.toLowerCase().includes(query)) ||
        article.tagsEN.some(t => t.toLowerCase().includes(query));
      return matchCategory && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto pb-24 px-4 sm:px-6 lg:px-8 relative font-sans text-left">
      {/* Header banner */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white rounded-[2.5rem] p-8 md:p-12 mb-12 shadow-xl relative overflow-hidden text-center md:text-left">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.18),transparent_60%)] pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-blue-200 text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-4 h-4" />
            {t('คลังความรู้มาตรฐานสากล', 'Knowledge Center')}
          </div>
          <h1 className="text-3xl md:text-5xl font-display font-bold leading-tight">
            {t('บทความให้ความรู้ด้านระบบมาตรฐาน', 'Standardization Insights')}
          </h1>
          <p className="text-xs md:text-sm text-blue-100/80 leading-relaxed font-sans max-w-2xl mx-auto md:mx-0">
            {t(
              'คลังข้อมูลบทความทางวิชาการและแนวปฏิบัติการทำระบบ ISO, GHPs, HACCP และมาตรฐานอื่นๆ รวบรวมโดยผู้เชี่ยวชาญและผู้ตรวจประเมินประสบการณ์สูงของ QAIC Thailand',
              'A collection of expert guides, guidelines, and frameworks for ISO, GHPs, HACCP, and cybersecurity standards curated by QAIC Thailand assessors.'
            )}
          </p>
        </div>
      </div>

      {/* Control Bar: Category filters and Search */}
      <div className="bg-white/40 backdrop-blur-[35px] border border-white/40 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] dark:bg-slate-900/40 dark:border-white/20 dark:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.2)] p-4 rounded-3xl border shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
          {(
            [
              { id: 'all', labelTH: 'ทั้งหมด', labelEN: 'All Articles' },
              { id: 'beginner', labelTH: '1. เริ่มต้นใหม่', labelEN: '1. Beginner' },
              { id: 'implementation', labelTH: '2. แนวปฏิบัติ', labelEN: '2. Implementation' },
              { id: 'industry', labelTH: '3. เจาะลึกธุรกิจ', labelEN: '3. Industry' }
            ] as const
          ).map(cat => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer border border-transparent ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm font-extrabold'
                    : 'text-gray-600 hover:text-blue-600 dark:text-slate-350 hover:bg-white/50 dark:hover:bg-slate-800/40'
                }`}
              >
                {t(cat.labelTH, cat.labelEN)}
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <input
            type="text"
            placeholder={t('ค้นหาบทความ/แท็ก...', 'Search articles or tags...')}
            className="w-full pl-10 pr-4 py-2.5 bg-white/50 border border-gray-200 dark:bg-slate-900/50 dark:border-slate-800 rounded-xl focus:outline-none focus:border-blue-500 text-xs font-sans"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
        </div>
      </div>

      {/* Grid of Articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {filteredArticles.length === 0 ? (
          <div className="col-span-full text-center py-20 bg-gray-50/50 dark:bg-slate-900/10 rounded-[2rem] border border-dashed border-gray-200 dark:border-slate-800">
            <BookOpen className="w-12 h-12 text-gray-300 dark:text-slate-700 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-slate-400 text-xs font-sans">
              {t('ไม่พบข้อมูลบทความสอดคล้องกับข้อความที่ค้นหา', 'No articles found matching your criteria.')}
            </p>
          </div>
        ) : (
          filteredArticles.map(article => {
            const Icon = article.icon;
            return (
              <div
                key={article.id}
                className="bg-white/40 backdrop-blur-[35px] border border-white/40 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] dark:bg-slate-900/40 dark:border-white/20 dark:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.2)] rounded-[2rem] border overflow-hidden flex flex-col justify-between hover:shadow-lg transition-all duration-300 group"
              >
                {/* Image Placeholder Banner */}
                <div className={`h-36 bg-gradient-to-br ${article.colorClass} p-6 relative flex flex-col justify-between overflow-hidden text-white`}>
                  {article.imageUrl ? (
                    <>
                      <img src={article.imageUrl} alt={article.titleEN} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-black/45 group-hover:bg-black/50 transition-colors" />
                    </>
                  ) : (
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_60%)]" />
                  )}
                  <span className="self-start px-2 py-0.5 bg-white/20 backdrop-blur-md rounded-lg text-[9px] font-bold uppercase tracking-wider z-10">
                    {t(article.categoryLabelTH, article.categoryLabelEN)}
                  </span>
                  <div className="flex items-end justify-between z-10">
                    <Icon className="w-10 h-10 opacity-80 stroke-1" />
                    <span className="flex items-center gap-1 text-[9px] opacity-90">
                      <Clock className="w-3.5 h-3.5" />
                      {article.readTime}
                    </span>
                  </div>
                </div>

                {/* Article Info */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {t(article.titleTH, article.titleEN)}
                    </h3>
                    <p className="text-xs text-gray-700 dark:text-slate-450 leading-relaxed font-sans line-clamp-3">
                      {t(article.excerptTH, article.excerptEN)}
                    </p>
                  </div>

                  {/* Metadata and Link */}
                  <div className="pt-4 border-t border-gray-100 dark:border-slate-800 flex items-center justify-between gap-2">
                    <div className="flex flex-wrap gap-1">
                      {t(article.tagsTH, article.tagsEN).slice(0, 2).map((tag, i) => (
                        <span key={i} className="px-2 py-0.5 bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-400 rounded-md text-[9px]">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <button
                      onClick={() => setSelectedArticle(article)}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 dark:text-blue-400 group-hover:gap-2 transition-all cursor-pointer border-none bg-transparent"
                    >
                      {t('อ่านต่อ', 'Read More')}
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Full Article Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 15 }}
              className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 w-full max-w-3xl max-h-[85vh] rounded-[2.5rem] overflow-hidden flex flex-col shadow-2xl relative"
            >
              {/* Header Banner */}
              <div className={`p-8 bg-gradient-to-r ${selectedArticle.colorClass} text-white relative flex flex-col justify-end min-h-44`}>
                {selectedArticle.imageUrl && (
                  <>
                    <img src={selectedArticle.imageUrl} alt={selectedArticle.titleEN} className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50" />
                  </>
                )}
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/30 backdrop-blur-md border border-white/20 text-white rounded-full transition-all cursor-pointer z-20"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="space-y-3 z-10 max-w-2xl">
                  <span className="px-2.5 py-0.5 bg-white/20 backdrop-blur-md rounded-lg text-[9px] font-bold uppercase tracking-wider inline-block">
                    {t(selectedArticle.categoryLabelTH, selectedArticle.categoryLabelEN)}
                  </span>
                  <h2 className="text-base md:text-xl font-bold leading-snug">
                    {t(selectedArticle.titleTH, selectedArticle.titleEN)}
                  </h2>
                  <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-[10px] opacity-90 font-sans">
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5" />
                      {t(selectedArticle.authorTH, selectedArticle.authorEN)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {selectedArticle.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {selectedArticle.readTime}
                    </span>
                  </div>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-8 md:p-12 space-y-6 text-sm text-gray-700 dark:text-slate-200 leading-relaxed font-sans text-left">
                {t(selectedArticle.contentTH, selectedArticle.contentEN).map((para, idx) => (
                  <p key={idx} className="indent-6">
                    {para}
                  </p>
                ))}

                {/* Call to Action Inside Article */}
                <div className="mt-8 p-6 bg-blue-50/50 dark:bg-slate-850/50 rounded-3xl border border-blue-100/50 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="space-y-1 text-center md:text-left">
                    <h4 className="font-bold text-gray-900 dark:text-white text-sm">{t('ต้องการขอคำปรึกษาเพิ่มเติม?', 'Need expert ISO consultation?')}</h4>
                    <p className="text-xs text-gray-600 dark:text-slate-400">{t('คุยกับวิทยากรและผู้ตรวจประเมินของ QAIC เพื่อวางแผนระบบองค์กรของคุณ', 'Speak directly with QAIC assessors to structure your systems.')}</p>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedArticle(null);
                      if (onTabChange) {
                        onTabChange('quote'); // Navigate to proposal form
                      }
                    }}
                    className="w-full md:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-sm border-none active:scale-95 transition-all"
                  >
                    <MessageSquare className="w-4 h-4" />
                    {t('ขอใบเสนอราคา / นัดหมาย', 'Get Proposal / Schedule')}
                  </button>
                </div>
              </div>

              {/* Footer */}
              <div className="px-8 py-4 border-t border-gray-100 dark:border-slate-800 flex justify-between items-center gap-4 bg-gray-50 dark:bg-slate-900/50">
                <div className="flex flex-wrap gap-1.5">
                  {t(selectedArticle.tagsTH, selectedArticle.tagsEN).map((tag, i) => (
                    <span key={i} className="px-2.5 py-0.5 bg-white dark:bg-slate-800 border border-gray-200/50 dark:border-slate-700 text-gray-600 dark:text-slate-400 rounded-md text-[9px]">
                      #{tag}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="px-5 py-2.5 bg-gray-200 dark:bg-slate-800 hover:bg-gray-300 dark:hover:bg-slate-700 text-gray-700 dark:text-slate-200 rounded-xl text-xs font-bold cursor-pointer border-none"
                >
                  {t('ปิดบทความ', 'Close')}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}