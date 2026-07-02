/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  Search,
  ChevronRight,
  Clock,
  User,
  Calendar,
  X,
  MessageSquare,
  Plus,
  Edit,
  Trash2,
  Image as ImageIcon,
  Upload,
  Info,
  ShieldCheck,
  Zap,
  Building2,
  FileText
} from 'lucide-react';
import { UserSettings } from '../types';
import { db } from '../lib/firebase';
import { collection, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore';

interface ArticlesSectionProps {
  settings: UserSettings;
  onTabChange?: (tab: any) => void;
  isAdminMode?: boolean;
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
  iconName: 'info' | 'shield' | 'zap' | 'building' | 'fileText';
  colorClass: string;
  contentTH: string[];
  contentEN: string[];
  imageUrl?: string;
  imagePositionClass?: string; // e.g. object-[50%_20%]
}

// Icon Mapping helper
const iconMap = {
  info: Info,
  shield: ShieldCheck,
  zap: Zap,
  building: Building2,
  fileText: FileText
};

export default function ArticlesSection({ settings, onTabChange, isAdminMode = false }: ArticlesSectionProps) {
  const lang = settings.lang;
  const t = <T extends any>(th: T, en: T): T => (lang === 'TH' ? th : en);

  const [articlesList, setArticlesList] = useState<Article[]>([]);
  const [activeCategory, setActiveCategory] = useState<'all' | 'beginner' | 'implementation' | 'industry'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Editor Modal States
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Form States
  const [formTitleTH, setFormTitleTH] = useState('');
  const [formTitleEN, setFormTitleEN] = useState('');
  const [formExcerptTH, setFormExcerptTH] = useState('');
  const [formExcerptEN, setFormExcerptEN] = useState('');
  const [formCategory, setFormCategory] = useState<'beginner' | 'implementation' | 'industry'>('beginner');
  const [formTagsTH, setFormTagsTH] = useState('');
  const [formTagsEN, setFormTagsEN] = useState('');
  const [formAuthorTH, setFormAuthorTH] = useState('');
  const [formAuthorEN, setFormAuthorEN] = useState('');
  const [formImageUrl, setFormImageUrl] = useState('');
  const [formPosX, setFormPosX] = useState(50); // percentage X
  const [formPosY, setFormPosY] = useState(50); // percentage Y
  const [formContentTH, setFormContentTH] = useState('');
  const [formContentEN, setFormContentEN] = useState('');

  // Default seeded articles
  const defaultArticles: Article[] = [
    {
      id: 'begin-1',
      category: 'beginner',
      categoryLabelTH: '1. เริ่มต้นมาตรฐาน (Beginner)',
      categoryLabelEN: '1. Introduction (Beginner)',
      titleTH: 'ISO คืออะไร? เข้าใจความหมายและบทบาทของมาตรฐานสากลใน 5นาที',
      titleEN: 'What is ISO? Understand International Standards in 5 Minutes',
      excerptTH: 'ทำความเข้าใจจุดเริ่มต้นของคำว่า ISO และความสำคัญในการขับเคลื่อนอุตสาหกรรมในยุคปัจจุบันเพื่อความโปร่งใสและน่าเชื่อถือ',
      excerptEN: 'Discover the history, purpose, and significance of ISO standards in modern industries to build global trust.',
      readTime: '5 min read',
      authorTH: 'ฝ่ายวิชาการ QAIC',
      authorEN: 'QAIC Technical Team',
      date: '2026-06-15',
      tagsTH: ['ความรู้ทั่วไป', 'ISO พื้นฐาน'],
      tagsEN: ['General Knowledge', 'Basic ISO'],
      iconName: 'info',
      colorClass: 'from-blue-500 to-indigo-600',
      imageUrl: '/knowledge/ISO คืออะไร.jpg',
      imagePositionClass: 'object-[50%_50%]',
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
      iconName: 'shield',
      colorClass: 'from-blue-600 to-sky-600',
      imageUrl: '/knowledge/ทำไมต้องมี iso.jpg',
      imagePositionClass: 'object-[50%_50%]',
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
      iconName: 'zap',
      colorClass: 'from-indigo-600 to-purple-650',
      imageUrl: '/knowledge/iso มีกี่ประเภท.jpg',
      imagePositionClass: 'object-top',
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
    }
  ];

  // 1. Load articles from Firestore, fallback to seeding defaults
  useEffect(() => {
    const fetchArticles = async () => {
      setIsLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, 'articles'));
        if (querySnapshot.empty) {
          // Seed database with defaults
          for (const art of defaultArticles) {
            await setDoc(doc(db, 'articles', art.id), art);
          }
          setArticlesList(defaultArticles);
        } else {
          const loaded: Article[] = [];
          querySnapshot.forEach(docSnap => {
            loaded.push(docSnap.data() as Article);
          });
          // Sort descending
          loaded.sort((a, b) => b.id.localeCompare(a.id));
          setArticlesList(loaded);
        }
      } catch (err) {
        console.error('Failed to load articles from Firestore:', err);
        setArticlesList(defaultArticles);
      } finally {
        setIsLoading(false);
      }
    };
    fetchArticles();
  }, []);

  // 2. Filter logic
  const filteredArticles = useMemo(() => {
    return articlesList.filter(article => {
      const matchCategory = activeCategory === 'all' || article.category === activeCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchSearch =
        !query ||
        article.titleTH.toLowerCase().includes(query) ||
        article.titleEN.toLowerCase().includes(query) ||
        article.excerptTH.toLowerCase().includes(query) ||
        article.excerptEN.toLowerCase().includes(query) ||
        (article.tagsTH && article.tagsTH.some(t => t.toLowerCase().includes(query))) ||
        (article.tagsEN && article.tagsEN.some(t => t.toLowerCase().includes(query)));
      return matchCategory && matchSearch;
    });
  }, [articlesList, activeCategory, searchQuery]);

  // 3. Open editor for creation/edit
  const openEditor = (article: Article | null = null) => {
    if (article) {
      setEditingArticle(article);
      setFormTitleTH(article.titleTH);
      setFormTitleEN(article.titleEN);
      setFormExcerptTH(article.excerptTH);
      setFormExcerptEN(article.excerptEN);
      setFormCategory(article.category);
      setFormTagsTH(article.tagsTH ? article.tagsTH.join(', ') : '');
      setFormTagsEN(article.tagsEN ? article.tagsEN.join(', ') : '');
      setFormAuthorTH(article.authorTH);
      setFormAuthorEN(article.authorEN);
      setFormImageUrl(article.imageUrl || '');
      setFormContentTH(article.contentTH ? article.contentTH.join('\n\n') : '');
      setFormContentEN(article.contentEN ? article.contentEN.join('\n\n') : '');

      // Parse imagePositionClass (e.g. object-[X%_Y%])
      if (article.imagePositionClass && article.imagePositionClass.startsWith('object-[')) {
        const cleanVal = article.imagePositionClass.replace('object-[', '').replace(']', '');
        const parts = cleanVal.split('_');
        if (parts.length === 2) {
          setFormPosX(parseInt(parts[0]) || 50);
          setFormPosY(parseInt(parts[1]) || 50);
        } else {
          setFormPosX(50);
          setFormPosY(50);
        }
      } else if (article.imagePositionClass === 'object-top') {
        setFormPosX(50);
        setFormPosY(0);
      } else if (article.imagePositionClass === 'object-bottom') {
        setFormPosX(50);
        setFormPosY(100);
      } else {
        setFormPosX(50);
        setFormPosY(50);
      }
    } else {
      setEditingArticle(null);
      setFormTitleTH('');
      setFormTitleEN('');
      setFormExcerptTH('');
      setFormExcerptEN('');
      setFormCategory('beginner');
      setFormTagsTH('');
      setFormTagsEN('');
      setFormAuthorTH('ฝ่ายวิชาการ QAIC');
      setFormAuthorEN('QAIC Technical Team');
      setFormImageUrl('');
      setFormPosX(50);
      setFormPosY(50);
      setFormContentTH('');
      setFormContentEN('');
    }
    setIsEditorOpen(true);
  };

  // 4. Handle file upload as Base64 DataURL
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // 5. Handle Interactive Click on Image to select focal point
  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setFormPosX(Math.round(x));
    setFormPosY(Math.round(y));
  };

  // 6. Delete article
  const handleDeleteArticle = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm(t('คุณแน่ใจหรือไม่ว่าต้องการลบบทความนี้?', 'Are you sure you want to delete this article?'))) return;

    try {
      await deleteDoc(doc(db, 'articles', id));
      setArticlesList(prev => prev.filter(art => art.id !== id));
      if (selectedArticle?.id === id) {
        setSelectedArticle(null);
      }
    } catch (err) {
      alert('Failed to delete article.');
      console.error(err);
    }
  };

  // 7. Save article to Firestore
  const handleSaveArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitleTH || !formTitleEN) {
      alert('Please fill out titles.');
      return;
    }

    setIsSaving(true);
    try {
      const id = editingArticle ? editingArticle.id : `art-${Date.now()}`;
      const imagePositionClass = `object-[${formPosX}%_${formPosY}%]`;

      const categoryLabels = {
        beginner: { th: '1. เริ่มต้นมาตรฐาน (Beginner)', en: '1. Introduction (Beginner)' },
        implementation: { th: '2. แนวทางปฏิบัติ (Implementation)', en: '2. Implementation Guides' },
        industry: { th: '3. เจาะลึกอุตสาหกรรม (Industry)', en: '3. Industry Insights' }
      };

      const updatedArticle: Article = {
        id,
        category: formCategory,
        categoryLabelTH: categoryLabels[formCategory].th,
        categoryLabelEN: categoryLabels[formCategory].en,
        titleTH: formTitleTH,
        titleEN: formTitleEN,
        excerptTH: formExcerptTH,
        excerptEN: formExcerptEN,
        readTime: '5 min read',
        authorTH: formAuthorTH,
        authorEN: formAuthorEN,
        date: editingArticle ? editingArticle.date : new Date().toISOString().split('T')[0],
        tagsTH: formTagsTH.split(',').map(tag => tag.trim()).filter(Boolean),
        tagsEN: formTagsEN.split(',').map(tag => tag.trim()).filter(Boolean),
        iconName: formCategory === 'beginner' ? 'info' : formCategory === 'implementation' ? 'zap' : 'building',
        colorClass: formCategory === 'beginner' ? 'from-blue-500 to-indigo-600' : formCategory === 'implementation' ? 'from-emerald-500 to-teal-650' : 'from-indigo-650 to-blue-800',
        imageUrl: formImageUrl || undefined,
        imagePositionClass,
        contentTH: formContentTH.split('\n\n').map(p => p.trim()).filter(Boolean),
        contentEN: formContentEN.split('\n\n').map(p => p.trim()).filter(Boolean)
      };

      await setDoc(doc(db, 'articles', id), updatedArticle);

      if (editingArticle) {
        setArticlesList(prev => prev.map(art => (art.id === id ? updatedArticle : art)));
      } else {
        setArticlesList(prev => [updatedArticle, ...prev]);
      }
      setIsEditorOpen(false);
      setEditingArticle(null);
    } catch (err) {
      console.error(err);
      alert('Failed to save article.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto pb-24 px-4 sm:px-6 lg:px-8 relative font-sans text-left">
      {/* Header banner */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white rounded-[2.5rem] p-8 md:p-12 mb-12 shadow-xl relative overflow-hidden text-center md:text-left">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.18),transparent_60%)] pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-blue-200 text-xs font-bold uppercase tracking-wider">
              <BookOpen className="w-4 h-4" />
              {t('คลังความรู้มาตรฐานสากล', 'Knowledge Center')}
            </div>
            <h1 className="text-3xl md:text-5xl font-display font-bold leading-tight">
              {t('บทความให้ความรู้ด้านระบบมาตรฐาน', 'Standardization Insights')}
            </h1>
            <p className="text-xs md:text-sm text-blue-100/80 leading-relaxed font-sans">
              {t(
                'คลังข้อมูลบทความทางวิชาการและแนวปฏิบัติการทำระบบ ISO, GHPs, HACCP และมาตรฐานอื่นๆ รวบรวมโดยผู้เชี่ยวชาญและผู้ตรวจประเมินประสบการณ์สูงของ QAIC Thailand',
                'A collection of expert guides, guidelines, and frameworks for ISO, GHPs, HACCP, and cybersecurity standards curated by QAIC Thailand assessors.'
              )}
            </p>
          </div>

          {/* Admin Create Button */}
          {isAdminMode && (
            <button
              onClick={() => openEditor()}
              className="self-center md:self-end px-6 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-2xl text-xs flex items-center justify-center gap-2 shadow-lg hover:shadow-indigo-500/20 active:scale-95 transition-all cursor-pointer border-none"
            >
              <Plus className="w-4 h-4" />
              {t('เขียนบทความใหม่', 'Write New Article')}
            </button>
          )}
        </div>
      </div>

      {/* Control Bar */}
      <div className="bg-white/40 backdrop-blur-[35px] border border-white/40 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] dark:bg-slate-900/40 dark:border-white/20 dark:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.2)] p-4 rounded-3xl border shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
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

        <div className="relative w-full md:w-72">
          <input
            type="text"
            placeholder={t('ค้นหาบทความ/แท็ก...', 'Search articles or tags...')}
            className="w-full pl-10 pr-4 py-2.5 bg-white/50 border border-gray-200 dark:bg-slate-900/50 dark:border-slate-800 rounded-xl focus:outline-none focus:border-blue-500 text-xs font-sans text-gray-900 dark:text-white"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
        </div>
      </div>

      {/* Grid List */}
      {isLoading ? (
        <div className="text-center py-24 text-gray-500 dark:text-slate-400 text-xs">
          {t('กำลังโหลดข้อมูลคลังความรู้...', 'Loading Articles...')}
        </div>
      ) : (
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
              const Icon = iconMap[article.iconName] || Info;
              return (
                <div
                  key={article.id}
                  className="bg-white/40 backdrop-blur-[35px] border border-white/40 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] dark:bg-slate-900/40 dark:border-white/20 dark:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.2)] rounded-[2rem] border overflow-hidden flex flex-col justify-between hover:shadow-lg transition-all duration-300 group relative"
                >
                  {/* Image Placeholder Banner */}
                  <div className={`h-36 bg-gradient-to-br ${article.colorClass} p-6 relative flex flex-col justify-between overflow-hidden text-white`}>
                    {article.imageUrl ? (
                      <>
                        <img
                          src={article.imageUrl}
                          alt={article.titleEN}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          style={{
                            objectPosition: article.imagePositionClass
                              ? article.imagePositionClass.replace('object-[', '').replace(']', '').replace('_', ' ')
                              : 'center'
                          }}
                        />
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
                    </div>

                    {/* Admin Action Buttons on Hover/Top */}
                    {isAdminMode && (
                      <div className="absolute top-4 right-4 z-20 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openEditor(article);
                          }}
                          className="p-2 bg-white/95 hover:bg-white text-blue-600 hover:text-blue-700 dark:bg-slate-900/95 dark:text-blue-400 rounded-lg shadow-sm transition-all cursor-pointer border-none"
                          title="Edit"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={(e) => handleDeleteArticle(article.id, e)}
                          className="p-2 bg-white/95 hover:bg-white text-red-600 hover:text-red-700 dark:bg-slate-900/95 dark:text-red-400 rounded-lg shadow-sm transition-all cursor-pointer border-none"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Article Info */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-sm font-bold text-gray-900 dark:text-white leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                        {t(article.titleTH, article.titleEN)}
                      </h3>
                      <p className="text-xs text-gray-700 dark:text-slate-450 leading-relaxed font-sans line-clamp-3">
                        {t(article.excerptTH, article.excerptEN)}
                      </p>
                    </div>

                    {/* Metadata and Link */}
                    <div className="pt-4 border-t border-gray-100 dark:border-slate-800 flex items-center justify-between gap-2">
                      <div className="flex flex-wrap gap-1">
                        {t(article.tagsTH || [], article.tagsEN || []).slice(0, 2).map((tag, i) => (
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
      )}

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
              <div className={`relative flex flex-col min-h-44 md:min-h-56 w-full overflow-hidden bg-gradient-to-r ${selectedArticle.colorClass}`}>
                {selectedArticle.imageUrl ? (
                  <img
                    src={selectedArticle.imageUrl}
                    alt={selectedArticle.titleEN}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{
                      objectPosition: selectedArticle.imagePositionClass
                        ? selectedArticle.imagePositionClass.replace('object-[', '').replace(']', '').replace('_', ' ')
                        : 'center'
                    }}
                  />
                ) : (
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_60%)]" />
                )}
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="absolute top-6 right-6 p-2 bg-white/20 hover:bg-white/40 backdrop-blur-md border border-white/30 text-white rounded-full transition-all cursor-pointer z-20"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-8 md:p-12 space-y-6 text-sm text-gray-700 dark:text-slate-200 leading-relaxed font-sans text-left">
                <div className="border-b border-gray-150 dark:border-slate-800 pb-6 mb-6">
                  <span className="px-2.5 py-0.5 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-lg text-[10px] font-bold uppercase tracking-wider inline-block mb-3">
                    {t(selectedArticle.categoryLabelTH, selectedArticle.categoryLabelEN)}
                  </span>
                  <h2 className="text-xl md:text-2xl font-display font-bold text-gray-900 dark:text-white leading-snug">
                    {t(selectedArticle.titleTH, selectedArticle.titleEN)}
                  </h2>
                </div>
                {selectedArticle.contentTH && t(selectedArticle.contentTH, selectedArticle.contentEN).map((para, idx) => (
                  <p key={idx} className="indent-6">
                    {para}
                  </p>
                ))}

                {/* Author and Date Footer */}
                <div className="pt-6 border-t border-gray-150 dark:border-slate-850 flex items-center justify-between text-[11px] text-gray-500 dark:text-slate-450 font-sans mt-8">
                  <span className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-gray-400" />
                    {t('เขียนโดย:', 'Written by:')} {t(selectedArticle.authorTH, selectedArticle.authorEN)}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                    {t('เผยแพร่เมื่อ:', 'Published:')} {selectedArticle.date}
                  </span>
                </div>

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
                  {selectedArticle.tagsTH && t(selectedArticle.tagsTH, selectedArticle.tagsEN).map((tag, i) => (
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

      {/* Editor Modal for Create/Edit */}
      <AnimatePresence>
        {isEditorOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 w-full max-w-4xl my-8 rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden max-h-[90vh]"
            >
              {/* Editor Header */}
              <div className="p-6 md:p-8 bg-gradient-to-r from-blue-900 to-indigo-950 text-white flex justify-between items-center border-b border-gray-200 dark:border-slate-850">
                <div className="space-y-1">
                  <h3 className="text-base md:text-lg font-bold">
                    {editingArticle ? t('แก้ไขบทความความรู้', 'Edit Knowledge Article') : t('สร้างบทความความรู้ใหม่', 'Create New Knowledge Article')}
                  </h3>
                  <p className="text-[10px] text-blue-200">{t('กรอกรายละเอียดให้ครบถ้วนเพื่ออัปเดตลงระบบทำเนียบ', 'Enter details to post on the directory.')}</p>
                </div>
                <button
                  onClick={() => setIsEditorOpen(false)}
                  className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all border-none cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Editor Form Body (Scrollable) */}
              <form onSubmit={handleSaveArticle} className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 text-xs text-gray-700 dark:text-slate-350">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Category Selection */}
                  <div className="space-y-2 col-span-full">
                    <label className="font-bold text-gray-900 dark:text-white">{t('หมวดหมู่บทความ (Category)', 'Article Category')}</label>
                    <select
                      className="w-full p-3 bg-gray-50 border border-gray-200 dark:bg-slate-950 dark:border-slate-850 rounded-xl focus:outline-none focus:border-blue-500 font-bold"
                      value={formCategory}
                      onChange={e => setFormCategory(e.target.value as any)}
                    >
                      <option value="beginner">{t('1. เริ่มต้นใหม่ (Beginner)', '1. Beginner')}</option>
                      <option value="implementation">{t('2. แนวทางปฏิบัติ (Implementation)', '2. Implementation')}</option>
                      <option value="industry">{t('3. เจาะลึกรายอุตสาหกรรม (Industry)', '3. Industry')}</option>
                    </select>
                  </div>

                  {/* TH Title */}
                  <div className="space-y-2">
                    <label className="font-bold text-gray-900 dark:text-white">{t('หัวข้อภาษาไทย (Title TH)', 'Thai Title')}</label>
                    <input
                      type="text"
                      className="w-full p-3 bg-gray-50 border border-gray-200 dark:bg-slate-950 dark:border-slate-850 rounded-xl focus:outline-none focus:border-blue-500"
                      value={formTitleTH}
                      onChange={e => setFormTitleTH(e.target.value)}
                      required
                    />
                  </div>

                  {/* EN Title */}
                  <div className="space-y-2">
                    <label className="font-bold text-gray-900 dark:text-white">{t('หัวข้อภาษาอังกฤษ (Title EN)', 'English Title')}</label>
                    <input
                      type="text"
                      className="w-full p-3 bg-gray-50 border border-gray-200 dark:bg-slate-950 dark:border-slate-850 rounded-xl focus:outline-none focus:border-blue-500"
                      value={formTitleEN}
                      onChange={e => setFormTitleEN(e.target.value)}
                      required
                    />
                  </div>

                  {/* TH Excerpt */}
                  <div className="space-y-2">
                    <label className="font-bold text-gray-900 dark:text-white">{t('คำย่อพรีวิวไทย (Excerpt TH)', 'Thai Excerpt')}</label>
                    <textarea
                      rows={2}
                      className="w-full p-3 bg-gray-50 border border-gray-200 dark:bg-slate-950 dark:border-slate-850 rounded-xl focus:outline-none focus:border-blue-500"
                      value={formExcerptTH}
                      onChange={e => setFormExcerptTH(e.target.value)}
                    />
                  </div>

                  {/* EN Excerpt */}
                  <div className="space-y-2">
                    <label className="font-bold text-gray-900 dark:text-white">{t('คำย่อพรีวิวอังกฤษ (Excerpt EN)', 'English Excerpt')}</label>
                    <textarea
                      rows={2}
                      className="w-full p-3 bg-gray-50 border border-gray-200 dark:bg-slate-950 dark:border-slate-850 rounded-xl focus:outline-none focus:border-blue-500"
                      value={formExcerptEN}
                      onChange={e => setFormExcerptEN(e.target.value)}
                    />
                  </div>

                  {/* Author TH */}
                  <div className="space-y-2">
                    <label className="font-bold text-gray-900 dark:text-white">{t('ผู้เขียนไทย (Author TH)', 'Thai Author')}</label>
                    <input
                      type="text"
                      className="w-full p-3 bg-gray-50 border border-gray-200 dark:bg-slate-950 dark:border-slate-850 rounded-xl focus:outline-none focus:border-blue-500"
                      value={formAuthorTH}
                      onChange={e => setFormAuthorTH(e.target.value)}
                    />
                  </div>

                  {/* Author EN */}
                  <div className="space-y-2">
                    <label className="font-bold text-gray-900 dark:text-white">{t('ผู้เขียนอังกฤษ (Author EN)', 'English Author')}</label>
                    <input
                      type="text"
                      className="w-full p-3 bg-gray-50 border border-gray-200 dark:bg-slate-950 dark:border-slate-850 rounded-xl focus:outline-none focus:border-blue-500"
                      value={formAuthorEN}
                      onChange={e => setFormAuthorEN(e.target.value)}
                    />
                  </div>

                  {/* Tags TH (Comma separated) */}
                  <div className="space-y-2">
                    <label className="font-bold text-gray-900 dark:text-white">{t('แท็กไทย (คั่นด้วยคอมมา) เช่น ความรู้, ISO', 'Thai Tags (comma separated)')}</label>
                    <input
                      type="text"
                      className="w-full p-3 bg-gray-50 border border-gray-200 dark:bg-slate-950 dark:border-slate-850 rounded-xl focus:outline-none focus:border-blue-500"
                      value={formTagsTH}
                      onChange={e => setFormTagsTH(e.target.value)}
                      placeholder="ความรู้, มาตรฐาน"
                    />
                  </div>

                  {/* Tags EN */}
                  <div className="space-y-2">
                    <label className="font-bold text-gray-900 dark:text-white">{t('แท็กอังกฤษ (คั่นด้วยคอมมา)', 'English Tags (comma separated)')}</label>
                    <input
                      type="text"
                      className="w-full p-3 bg-gray-50 border border-gray-200 dark:bg-slate-950 dark:border-slate-850 rounded-xl focus:outline-none focus:border-blue-500"
                      value={formTagsEN}
                      onChange={e => setFormTagsEN(e.target.value)}
                      placeholder="standards, iso"
                    />
                  </div>

                  {/* Image Path / Upload Section */}
                  <div className="col-span-full border-t border-gray-100 dark:border-slate-850 pt-6 space-y-4">
                    <h4 className="font-extrabold text-sm text-gray-900 dark:text-white flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-blue-600" />
                      {t('ระบบอัปโหลดภาพปกบทความและเลือกตำแหน่งแสดงผลครอบตัด (Focal Point Crop)', 'Article Cover Image & Crop Alignment')}
                    </h4>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        {/* Option 1: Upload file */}
                        <div className="space-y-2">
                          <label className="font-bold text-gray-700 dark:text-slate-300 flex items-center gap-1.5">
                            <Upload className="w-3.5 h-3.5" />
                            {t('อัปโหลดไฟล์ภาพจากคอมพิวเตอร์', 'Upload image file')}
                          </label>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="w-full text-xs text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-blue-50 file:text-blue-700 dark:file:bg-slate-800 dark:file:text-blue-400 file:cursor-pointer"
                          />
                        </div>

                        {/* Option 2: Paste URL */}
                        <div className="space-y-2">
                          <label className="font-bold text-gray-700 dark:text-slate-300">{t('หรือ วางที่อยู่ลิงก์รูปภาพ (Image URL)', 'Or Paste Image URL')}</label>
                          <input
                            type="text"
                            placeholder="/knowledge/what-is-iso.jpg"
                            className="w-full p-3 bg-gray-50 border border-gray-200 dark:bg-slate-950 dark:border-slate-850 rounded-xl focus:outline-none focus:border-blue-500"
                            value={formImageUrl}
                            onChange={e => setFormImageUrl(e.target.value)}
                          />
                        </div>

                        {/* Sliders for Position Coordinates */}
                        {formImageUrl && (
                          <div className="p-4 bg-gray-50 dark:bg-slate-950 rounded-2xl border border-gray-200/50 dark:border-slate-850 space-y-3">
                            <p className="font-extrabold text-[10px] text-blue-600 uppercase tracking-wider">{t('ปรับตั้งพิกัดการแสดงผล (Coordinate Selection)', 'Coordinate Selector presets')}</p>
                            <div className="flex flex-wrap gap-1 mb-2">
                              <button type="button" onClick={() => { setFormPosX(50); setFormPosY(0); }} className="px-2.5 py-1 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-md text-[9px] hover:border-blue-500">{t('ชิดบน (Top)', 'Top')}</button>
                              <button type="button" onClick={() => { setFormPosX(50); setFormPosY(50); }} className="px-2.5 py-1 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-md text-[9px] hover:border-blue-500">{t('กึ่งกลาง (Center)', 'Center')}</button>
                              <button type="button" onClick={() => { setFormPosX(50); setFormPosY(100); }} className="px-2.5 py-1 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-md text-[9px] hover:border-blue-500">{t('ชิดล่าง (Bottom)', 'Bottom')}</button>
                            </div>
                            <div className="space-y-2">
                              <div className="flex justify-between text-[10px]">
                                <span>{t('ตำแหน่งแนวนอน (X Axis Offset):', 'X Axis Offset:')} {formPosX}%</span>
                              </div>
                              <input
                                type="range"
                                min="0"
                                max="100"
                                className="w-full accent-blue-600"
                                value={formPosX}
                                onChange={e => setFormPosX(parseInt(e.target.value))}
                              />
                            </div>
                            <div className="space-y-2">
                              <div className="flex justify-between text-[10px]">
                                <span>{t('ตำแหน่งแนวตั้ง (Y Axis Offset):', 'Y Axis Offset:')} {formPosY}%</span>
                              </div>
                              <input
                                type="range"
                                min="0"
                                max="100"
                                className="w-full accent-blue-600"
                                value={formPosY}
                                onChange={e => setFormPosY(parseInt(e.target.value))}
                              />
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Visual Editor Click Area & Live Preview Card */}
                      <div className="flex flex-col gap-4">
                        {formImageUrl ? (
                          <div className="space-y-3">
                            <label className="font-bold text-gray-700 dark:text-slate-300">
                              {t('คลิกเลือกจุดศูนย์กลางภาพที่ภาพจำลองด้านล่าง:', 'Click focal point on the editor image below:')}
                            </label>
                            {/* Interactive Click-to-Point Canvas */}
                            <div
                              className="relative w-full h-44 bg-slate-100 rounded-2xl overflow-hidden cursor-crosshair border border-gray-200 dark:border-slate-800 flex items-center justify-center select-none"
                              onClick={handleImageClick}
                              title="Click to set crop anchor"
                            >
                              <img src={formImageUrl} className="w-full h-full object-contain pointer-events-none" />
                              <div
                                className="absolute w-5 h-5 bg-red-600 rounded-full border-2 border-white shadow-lg transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center animate-pulse"
                                style={{ left: `${formPosX}%`, top: `${formPosY}%` }}
                              >
                                <div className="w-1.5 h-1.5 bg-white rounded-full" />
                              </div>
                            </div>

                            {/* Live Card Preview Box */}
                            <p className="font-extrabold text-[10px] text-gray-500 uppercase tracking-wider mt-2">{t('ภาพจำลองบนปกการ์ดจริง (Live preview on actual card):', 'Actual Card Preview (Live):')}</p>
                            <div className="border border-gray-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm bg-white dark:bg-slate-900 max-w-[280px]">
                              <div className="h-28 relative overflow-hidden text-white bg-slate-100">
                                <img
                                  src={formImageUrl}
                                  className="absolute inset-0 w-full h-full object-cover"
                                  style={{ objectPosition: `${formPosX}% ${formPosY}%` }}
                                />
                                <div className="absolute inset-0 bg-black/40" />
                                <span className="absolute top-3 left-3 px-2 py-0.5 bg-white/20 backdrop-blur-md rounded text-[8px] font-bold">
                                  {formCategory.toUpperCase()}
                                </span>
                              </div>
                              <div className="p-3">
                                <p className="font-bold text-[10px] truncate text-gray-800 dark:text-slate-200">{formTitleTH || 'Untitled Document'}</p>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="h-full min-h-44 bg-gray-50 dark:bg-slate-950 border-2 border-dashed border-gray-200 dark:border-slate-850 rounded-2xl flex flex-col items-center justify-center text-center p-6 text-gray-400">
                            <ImageIcon className="w-8 h-8 mb-2" />
                            <p className="text-[10px]">{t('เลือกรูปภาพเพื่อเข้าสู่เครื่องมือครอปพิกัดแบบโต้ตอบ', 'Select an image to activate crop focal selector')}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* TH Content (Paragraphs split by double newline) */}
                  <div className="space-y-2 col-span-full border-t border-gray-100 dark:border-slate-850 pt-6">
                    <label className="font-bold text-gray-900 dark:text-white">
                      {t('เนื้อหาบทความภาษาไทย (เว้น 1 บรรทัดเปล่าเพื่อขึ้นย่อหน้าใหม่)', 'Thai Content Paragraphs (Leave 1 blank line between paragraphs)')}
                    </label>
                    <textarea
                      rows={6}
                      className="w-full p-4 bg-gray-50 border border-gray-200 dark:bg-slate-950 dark:border-slate-850 rounded-xl focus:outline-none focus:border-blue-500 font-sans"
                      value={formContentTH}
                      onChange={e => setFormContentTH(e.target.value)}
                      placeholder="ย่อหน้าที่ 1...\n\nย่อหน้าที่ 2..."
                      required
                    />
                  </div>

                  {/* EN Content */}
                  <div className="space-y-2 col-span-full">
                    <label className="font-bold text-gray-900 dark:text-white">
                      {t('เนื้อหาบทความภาษาอังกฤษ (เว้น 1 บรรทัดเปล่าเพื่อขึ้นย่อหน้าใหม่)', 'English Content Paragraphs (Leave 1 blank line between paragraphs)')}
                    </label>
                    <textarea
                      rows={6}
                      className="w-full p-4 bg-gray-50 border border-gray-200 dark:bg-slate-950 dark:border-slate-850 rounded-xl focus:outline-none focus:border-blue-500 font-sans"
                      value={formContentEN}
                      onChange={e => setFormContentEN(e.target.value)}
                      placeholder="Paragraph 1...\n\nParagraph 2..."
                      required
                    />
                  </div>
                </div>

                {/* Form Buttons */}
                <div className="pt-6 border-t border-gray-100 dark:border-slate-850 flex justify-end gap-2 bg-gray-50/50 dark:bg-slate-900/50 -mx-8 -mb-8 p-6">
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditorOpen(false);
                      setEditingArticle(null);
                    }}
                    className="px-6 py-3 bg-gray-200 dark:bg-slate-800 hover:bg-gray-300 dark:hover:bg-slate-700 text-gray-700 dark:text-slate-200 font-bold rounded-xl transition-all cursor-pointer border-none"
                  >
                    {t('ยกเลิก', 'Cancel')}
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all cursor-pointer border-none flex items-center justify-center gap-1.5 shadow-sm active:scale-95 disabled:opacity-50"
                  >
                    {isSaving ? t('กำลังบันทึก...', 'Saving...') : t('บันทึกบทความ', 'Save Article')}
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