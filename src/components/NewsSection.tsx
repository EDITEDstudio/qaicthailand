/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Search, 
  Calendar, 
  Clock, 
  ArrowRight, 
  Tag, 
  Share2, 
  Printer, 
  Newspaper, 
  BookOpen, 
  Check,
  XCircle,
  ShieldCheck,
  Award,
  Zap,
  Globe
} from 'lucide-react';
import { UserSettings } from '../types';

interface NewsSectionProps {
  settings: UserSettings;
}

interface NewsArticle {
  id: string;
  titleTH: string;
  titleEN: string;
  summaryTH: string;
  summaryEN: string;
  contentTH: string;
  contentEN: string;
  category: 'PR' | 'CERTIFICATION' | 'TRAINING' | 'ISO UPDATE';
  date: string;
  dateEN: string;
  readTimeTH: string;
  readTimeEN: string;
  image: string;
  views: number;
}

const NEWS_ARTICLES: NewsArticle[] = [
  {
    id: 'news-01',
    titleTH: 'QAIC ขยายการรับรองระบบ ISO 9001 แก่กลุ่มสหกรณ์การเกษตรภาคเหนือ',
    titleEN: 'QAIC Expands ISO 9001 Certification to Northern Agricultural Cooperatives',
    summaryTH: 'QAIC ประเทศไทย สนับสนุนภาคการเกษตรไทย ขยายขอบข่ายบริการตรวจประเมินรับรองมาตรฐานระบบบริหารงานคุณภาพ ISO 9001:2015 ให้แก่กลุ่มสหกรณ์ผู้ส่งออกผลผลิตการเกษตร',
    summaryEN: 'QAIC Thailand supports the Thai agricultural sector by expanding ISO 9001:2015 Quality Management certification scopes for agricultural export cooperatives.',
    contentTH: 'เมื่อวันที่ 12 มิถุนายน 2569 บริษัท คิวเอไอซี (ประเทศไทย) จำกัด ประกาศขยายกรอบการทำงานเพื่อรับรองระบบบริหารงานคุณภาพ ISO 9001:2015 ครอบคลุมกลุ่มวิสาหกิจชุมชนและสหกรณ์การเกษตรในภาคเหนือ โดยมีเป้าหมายเพื่อยกระดับห่วงโซ่อุปทานทางการเกษตรและสร้างความมั่นใจให้ผู้ซื้อในตลาดโลก ทางผู้เชี่ยวชาญจาก QAIC ได้ระบุว่าการประยุกต์ใช้มาตรฐานบริหารงานจะช่วยลดการสูญเสียในกระบวนการจัดเก็บและขนส่งได้กว่า 15%',
    contentEN: 'On June 12, 2026, QAIC (Thailand) Co., Ltd. announced the expansion of its ISO 9001:2015 Quality Management certification framework to cover community enterprises and agricultural cooperatives in Northern Thailand. This initiative aims to elevate the agricultural supply chain and build buyer confidence globally. QAIC experts noted that implementing this quality system helps reduce post-harvest storage and logistical losses by over 15%.',
    category: 'CERTIFICATION',
    date: '12 มิ.ย. 2569',
    dateEN: 'June 12, 2026',
    readTimeTH: '3 นาที',
    readTimeEN: '3 min read',
    image: '/news/news1.jpg',
    views: 245
  },
  {
    id: 'news-02',
    titleTH: 'มกอช. อนุมัติสิทธิ์การตรวจประเมินมาตรฐานทุเรียนแช่เยือกแข็ง (มกษ. 9046-2560) แก่ QAIC',
    titleEN: 'ACFS Approves QAIC for Durian Frozen Standard (TAS 9046-2017) Audits',
    summaryTH: 'สำนักงานมาตรฐานสินค้าเกษตรและอาหารแห่งชาติ (มกอช.) ขึ้นทะเบียนรับรองสิทธิ์อย่างเป็นทางการให้ QAIC สามารถประเมินมาตรฐานระบบงานทุเรียนแช่เยือกแข็งส่งออก',
    summaryEN: 'The National Bureau of Agricultural Commodity and Food Standards (ACFS) officially registers QAIC as an accredited body to audit the frozen durian standard for export.',
    contentTH: 'นับเป็นความสำเร็จที่ยิ่งใหญ่ของภาคอุตสาหกรรมอาหารไทย โดย QAIC ประเทศไทย ได้รับความเห็นชอบจาก มกอช. (ACFS) ให้เป็นหน่วยตรวจรับรองระบบตามมาตรฐานสินค้าเกษตร มกษ. 9046-2560 ( Durian Frozen Standard) เพื่อสนับสนุนผู้ประกอบการไทยในการส่งออกราชาผลไม้ไปยังตลาดเอเชียและยุโรป ด้วยการรับรองคุณภาพมาตรฐานที่ถูกต้องและรวดเร็ว',
    contentEN: 'Marking a major milestone for the Thai food industry, QAIC Thailand has been approved by ACFS to audit and certify compliance with Agricultural Standard TAS 9046-2017 (Frozen Durian). This certification enables Thai exporters to streamline trade pipelines for durian into Asian and European markets, ensuring official compliance and faster processing times.',
    category: 'CERTIFICATION',
    date: '8 มิ.ย. 2569',
    dateEN: 'June 8, 2026',
    readTimeTH: '4 นาที',
    readTimeEN: '4 min read',
    image: '/news/news2.jpg',
    views: 312
  },
  {
    id: 'news-03',
    titleTH: 'เปิดตัวหลักสูตรผู้ตรวจประเมินหัวหน้าทีม ISO 27001:2022 สำหรับไตรมาสที่ 3/2026',
    titleEN: 'New ISO 27001:2022 Lead Auditor Training Courses Launched for Q3 2026',
    summaryTH: 'QAIC สถาบันฝึกอบรมเปิดรับลงทะเบียนหลักสูตรผู้ตรวจประเมินหัวหน้าทีมด้านระบบการจัดการความมั่นคงปลอดภัยสารสนเทศรุ่นล่าสุดที่ได้รับการรับรองสากล',
    summaryEN: 'QAIC Training Academy opens registration for the latest internationally certified Lead Auditor training session on Information Security Management Systems.',
    contentTH: 'เพื่อเตรียมความพร้อมให้องค์กรและบุคลากรทางไอทีเผชิญหน้ากับภัยคุกคามทางไซเบอร์ในยุคดิจิทัล QAIC Academy ได้เปิดตารางอบรมหลักสูตร ISO/IEC 27001:2022 Lead Auditor (สัญญาสากลสอดคล้องตามเกณฑ์ประเมิน) ประจำรอบไตรมาสที่ 3/2026 โดยใช้กรณีศึกษาจริงในอุตสาหกรรมเทคโนโลยีการเงินและโลจิสติกส์ในการฝึกสอนความเข้าใจแบบเจาะลึก',
    contentEN: 'To equip organizations and IT professionals against modern cyber threats, QAIC Academy has launched the Q3 2026 registration schedule for the ISO/IEC 27001:2022 Lead Auditor course. Featuring real-world case studies in Fintech and Logistics, this course delivers deep compliance understanding and hands-on audit execution practice.',
    category: 'TRAINING',
    date: '3 มิ.ย. 2569',
    dateEN: 'June 3, 2026',
    readTimeTH: '2 นาที',
    readTimeEN: '2 min read',
    image: '/news/news3.jpg',
    views: 189
  },
  {
    id: 'news-04',
    titleTH: 'QAIC จัดงานสัมมนาอุตสาหกรรมสีเขียว (Green Industry) ณ กรุงเทพมหานคร',
    titleEN: 'QAIC Hosts Green Industry Sustainability Seminar in Bangkok',
    summaryTH: 'งานสัมมนาทิศทางความยั่งยืนของธุรกิจไทยภายใต้หัวข้อการเปลี่ยนผ่านสู่อุตสาหกรรมสีเขียวและการประเมินคาร์บอนฟุตพริ้นท์ตามเกณฑ์สากล',
    summaryEN: 'A sustainability seminar on green transition pathways, ESG integration, and carbon footprint compliance matching global standards.',
    contentTH: 'บริษัท คิวเอไอซี (ประเทศไทย) จำกัด ได้จับมือกับสมาคมการค้าสิ่งแวดล้อมจัดงานสัมมนาภายใต้หัวข้อ "อนาคตอุตสาหกรรมไทยบนเส้นทางสีเขียวและมาตรฐานความยั่งยืน" เพื่อแบ่งปันความรู้เกี่ยวกับการตรวจประเมินระบบสิ่งแวดล้อม ISO 14001 และการจัดทำบัญชีคาร์บอนเพื่อรับมือกับมาตรการทางการค้าข้ามพรมแดนที่เป็นมิตรกับสิ่งแวดล้อม',
    contentEN: 'QAIC (Thailand) Co., Ltd., in partnership with the Environmental Trade Association, hosted the seminar "The Future of Thai Industry on Green Pathways and Sustainability Standards." The event shared vital insights on ISO 14001 environmental auditing and carbon accounting to navigate carbon boundary adjustments in cross-border trade.',
    category: 'PR',
    date: '28 พ.ค. 2569',
    dateEN: 'May 28, 2026',
    readTimeTH: '5 นาที',
    readTimeEN: '5 min read',
    image: '/news/news4.jpg',
    views: 420
  },
  {
    id: 'news-05',
    titleTH: 'ข้อกำหนดและการเปลี่ยนแปลงที่สำคัญในการอัปเกรดมาตรฐาน ISO 14001:2015 สำหรับโรงงาน',
    titleEN: 'Key Changes for Factories Upgrading to ISO 14001:2015 Standards',
    summaryTH: 'สรุปการวิเคราะห์เชิงลึกโดยทีมผู้ตรวจประเมินอาวุโสเกี่ยวกับหัวใจสำคัญของการประเมินวัฏจักรชีวิตผลิตภัณฑ์ (Life Cycle Assessment) ในระบบสิ่งแวดล้อม',
    summaryEN: 'An in-depth analysis from our senior auditors highlighting the core pillars of Life Cycle Assessment in environmental compliance.',
    contentTH: 'สำหรับการเปลี่ยนผ่านและการพัฒนาอย่างมั่นคง โรงงานอุตสาหกรรมจำเป็นต้องเข้าใจการเปลี่ยนแปลงหัวใจหลักของ ISO 14001:2015 ซึ่งเน้นไปที่ทัศนคติการมองรอบด้านแบบวงจรชีวิตผลิตภัณฑ์ (Life Cycle Perspective) และการประเมินความเสี่ยงด้านการเปลี่ยนแปลงสภาพภูมิอากาศที่ส่งผลกระทบโดยตรงต่อธุรกิจ คณะทำงาน QAIC แนะนำวิธีเตรียมตัวเบื้องต้นผ่านบทความสรุปนี้',
    contentEN: 'To support a smooth compliance transition, manufacturing plants must grasp the core pillars of ISO 14001:2015, which emphasizes life-cycle perspective thinking and climate change risk assessments. QAIC senior auditors outline the essential step-by-step checklist to prepare for your environmental system upgrade.',
    category: 'ISO UPDATE',
    date: '20 พ.ค. 2569',
    dateEN: 'May 20, 2026',
    readTimeTH: '4 นาที',
    readTimeEN: '4 min read',
    image: '/news/news5.jpg',
    views: 156
  },
  {
    id: 'news-06',
    titleTH: 'QAIC ประเทศไทย มอบใบรับรองระบบมาตรฐานความปลอดภัยอาหารแก่ผู้ประกอบการรายที่ 500',
    titleEN: 'QAIC Thailand Certifies 500th Enterprise for Food Safety Compliance',
    summaryTH: 'ฉลองความสำเร็จร่วมกันกับผู้ประกอบการผลิตสินค้าอาหารไทยในการยกระดับมาตรฐานโรงงานสู่ GHPs/HACCP สากล มุ่งสร้างแบรนด์ที่น่าเชื่อถือ',
    summaryEN: 'Celebrating collaborative success with Thai food manufacturers upgrading to global GHPs/HACCP, building trusted retail brands.',
    contentTH: 'บริษัท คิวเอไอซี (ประเทศไทย) จำกัด ได้ร่วมแสดงความยินดีพร้อมมอบใบประกาศสัญญารับรองมาตรฐาน GHPs & HACCP สากล ให้แก่บริษัทแปรรูปอาหารเกษตรชั้นนำ ซึ่งถือเป็นองค์กรลำดับที่ 500 ที่ได้รับการรับรองระบบความปลอดภัยอาหารจาก QAIC สะท้อนถึงการเติบโตอย่างมั่นคงของมาตรฐานสุขอนามัยในห่วงโซ่อาหารของประเทศไทย',
    contentEN: 'QAIC (Thailand) Co., Ltd. marked a milestone by presenting international GHPs & HACCP certification to a leading agricultural food processor—representing the 500th food enterprise certified by QAIC. This achievement reflects the steady growth and commitment to hygiene in Thailand\'s food supply chain.',
    category: 'PR',
    date: '15 พ.ค. 2569',
    dateEN: 'May 15, 2026',
    readTimeTH: '3 นาที',
    readTimeEN: '3 min read',
    image: '/news/news6.jpg',
    views: 298
  },
  {
    id: 'news-07',
    titleTH: 'ประกาศเปิดตัวช่องทางการตรวจระบบด่วนพิเศษสำหรับมาตรฐานเครื่องมือแพทย์ (ISO 13485)',
    titleEN: 'Express Audit Lanes Launched for Medical Device Standard (ISO 13485)',
    summaryTH: 'ลดขั้นตอนความล่าช้าในการอนุมัติใบรับรองและเข้าสู่ตลาดของอุปกรณ์ทางการแพทย์ด้วยช่องทางประเมินแบบ Express Audit ของ QAIC ประเทศไทย',
    summaryEN: 'Reduce certification delays and accelerate medical device market entry with QAIC Thailand\'s new Express Audit service.',
    contentTH: 'เพื่อเป็นการอำนวยความสะดวกให้แก่อุตสาหกรรมทางการแพทย์ที่กำลังเติบโตอย่างก้าวกระโดด QAIC ได้ปรับปรุงขั้นตอนการขอรับตรวจประเมินมาตรฐาน ISO 13485:2016 โดยเปิดบริการช่องทางด่วนพิเศษ (Express Audit Lane) ช่วยจับคู่วันตรวจประเมินและเร่งกระบวนการจัดทำรูปเล่มเสนอใบรับรองให้เร็วขึ้น 30% โดยไม่มีการลดทอนเกณฑ์การตรวจสอบสากล',
    contentEN: 'To support the rapidly expanding medical devices sector, QAIC has optimized ISO 13485:2016 certification pathways. The newly introduced Express Audit Lane coordinates audit calendars and accelerates approval workflows by 30% without compromising on strict international compliance standards.',
    category: 'ISO UPDATE',
    date: '10 พ.ค. 2569',
    dateEN: 'May 10, 2026',
    readTimeTH: '3 นาที',
    readTimeEN: '3 min read',
    image: '/news/news7.jpg',
    views: 134
  },
  {
    id: 'news-08',
    titleTH: 'สรุปภาพบรรยากาศงานประชุมทิศทางมาตรฐานความปลอดภัยอุตสาหกรรมประจำปี',
    titleEN: 'Highlights from the Annual Safety Standards Compliance Summit',
    summaryTH: 'QAIC ร่วมบรรยายทิศทางมาตรฐานความปลอดภัยอาชีวอนามัยและสิทธิประโยชน์ในการบูรณาการระบบมาตรฐาน ISO 45001 เข้ากับระบบความปลอดภัยอุตสาหกรรม',
    summaryEN: 'QAIC co-hosted sessions on occupational health and safety directions and the benefits of integrating ISO 45001 with industrial safety guidelines.',
    contentTH: 'งานประชุมอภิปรายความปลอดภัยระดับชาติประจำปีที่ผ่านมา QAIC ได้รับเกียรติเข้าร่วมเสวนาในฐานะผู้เชี่ยวชาญการตรวจประเมินระบบจัดการความปลอดภัย ISO 45001:2018 โดยเน้นย้ำถึงแนวโน้มการลดอุบัติเหตุในพื้นที่ทำงานผ่านวัฒนธรรมความตระหนักรู้และการป้องกันความเสี่ยงเชิงรุก ซึ่งได้รับความสนใจจากผู้ร่วมงานกว่า 500 ท่าน',
    contentEN: 'During the recent Annual Safety Summit, QAIC was invited as a key speaker on ISO 45051:2018 Occupational Health & Safety Management systems. The presentation highlighted trends in workspace accident reduction through safety awareness and proactive risk prevention, drawing attention from over 500 industry leaders.',
    category: 'PR',
    date: '2 พ.ค. 2569',
    dateEN: 'May 2, 2026',
    readTimeTH: '5 นาที',
    readTimeEN: '5 min read',
    image: '/news/news8.jpg',
    views: 260
  },
  {
    id: 'news-09',
    titleTH: 'QAIC เปิดตัวพอร์ทัลตรวจสถานะใบรับรองอัจฉริยะผ่าน Verifiable QR Code',
    titleEN: 'QAIC Launches Smart Verifiable QR Certificate Directory Portal',
    summaryTH: 'ระบบตรวจสอบสถานะระบบการรับรองความถูกต้องของลูกค้าสากลทันทีผ่านการสแกนรหัสคิวอาร์ ป้องกันการปลอมแปลงเอกสารและเพิ่มความน่าเชื่อถือทางธุรกิจ',
    summaryEN: 'Verify certification status instantly with secure QR code scanning, preventing document tampering and building business trust.',
    contentTH: 'บริษัท คิวเอไอซี (ประเทศไทย) จำกัด ได้สร้างมิติใหม่ให้กับวงการรับรองมาตรฐาน ด้วยการปรับปรุงระบบทะเบียนผู้ถือใบรับรองแบบเรียลไทม์ ผู้ซื้อหรือผู้ตรวจประเมินสามารถสแกนคิวอาร์โค้ดบนตัวเอกสารใบรับรองเพื่อดึงข้อมูลตรงจากฐานข้อมูลตรวจสอบความถูกต้องของสถานะการรับรองได้ทันที เพิ่มความเชื่อมั่นในเวทีการค้าสากล',
    contentEN: 'QAIC (Thailand) Co., Ltd. has revolutionized standard compliance verification by launching a real-time smart registry portal. Buyers or inspectors can scan the QR code on certificates to pull live validation details directly from the directory, boosting compliance integrity and commercial trust.',
    category: 'ISO UPDATE',
    date: '25 เม.ย. 2569',
    dateEN: 'April 25, 2026',
    readTimeTH: '3 นาที',
    readTimeEN: '3 min read',
    image: '/news/news9.jpg',
    views: 389
  }
];

export default function NewsSection({ settings }: NewsSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  const t = (th: string, en: string) => settings.lang === 'TH' ? th : en;

  const categories = ['ALL', 'PR', 'CERTIFICATION', 'TRAINING', 'ISO UPDATE'];

  const filteredArticles = NEWS_ARTICLES.filter(article => {
    const matchesSearch = 
      article.titleTH.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.titleEN.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summaryTH.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summaryEN.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = activeCategory === 'ALL' || article.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  const getBadgeColor = (category: string) => {
    switch (category) {
      case 'PR': return 'bg-blue-500/10 text-blue-600 dark:text-blue-450 border border-blue-200/50 dark:border-blue-900/40';
      case 'CERTIFICATION': return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-450 border border-emerald-200/50 dark:border-emerald-900/40';
      case 'TRAINING': return 'bg-purple-500/10 text-purple-600 dark:text-purple-450 border border-purple-200/50 dark:border-purple-900/40';
      case 'ISO UPDATE': return 'bg-amber-500/10 text-amber-600 dark:text-amber-450 border border-amber-200/50 dark:border-amber-900/40';
      default: return 'bg-gray-500/10 text-gray-600 border border-gray-200/50';
    }
  };

  const handleShare = (article: NewsArticle) => {
    const shareUrl = `${window.location.origin}${window.location.pathname}?tab=news&article=${article.id}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  return (
    <div className="space-y-12 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-end justify-between gap-6 text-left">
        <div className="space-y-4 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 rounded-full text-[10px] font-bold uppercase tracking-widest border border-blue-100 dark:border-blue-900/30">
            <Newspaper className="w-3.5 h-3.5" />
            <span>{t('ข้อมูลประชาสัมพันธ์', 'News & PR Announcements')}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white tracking-tight leading-tight">
            {t('ข่าวสารและ', 'News & Updates')} <br />
            <span className="text-blue-600 dark:text-blue-400">{t('กิจกรรมองค์กร', 'Press Releases')}</span>
          </h2>
          <p className="text-gray-700 dark:text-slate-400 font-sans leading-relaxed">
            {t(
              'ติดตามข่าวสารอัปเดต มาตรฐานสินค้าเกษตร มาตรฐาน ISO สากล ตารางการฝึกอบรม และข่าวความเคลื่อนไหวล่าสุดจาก คิวเอไอซี ประเทศไทย',
              'Stay updated with the latest certification requirements, ISO adjustments, training directory schedules, and official announcements from QAIC Thailand.'
            )}
          </p>
        </div>

        <div className="bg-blue-900 p-6 rounded-3xl text-white flex items-center gap-4 shadow-xl shadow-blue-900/10">
          <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20">
            <Globe className="w-6 h-6 text-blue-400" />
          </div>
          <div className="text-left">
            <p className="text-[10px] font-bold uppercase tracking-widest text-blue-400 leading-none mb-1">
              QAIC PR Hub
            </p>
            <p className="text-sm font-bold">{t('ข่าวสารทางการ', 'Official Updates')}</p>
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="space-y-6">
        <div className="bg-white/45 dark:bg-slate-900/40 backdrop-blur-[35px] border border-white/40 dark:border-slate-800 shadow-sm p-4 rounded-[2rem] flex flex-col md:flex-row items-center gap-4">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input 
              type="text" 
              placeholder={t('ค้นหาข่าวสารประชาสัมพันธ์...', 'Search PR announcements...')}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all text-sm dark:text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Category selector */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer border ${
                activeCategory === cat 
                  ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/20' 
                  : 'bg-white/50 border-gray-200 text-gray-700 dark:bg-slate-900/40 dark:border-slate-800 dark:text-slate-300 dark:hover:text-white hover:bg-white'
              }`}
            >
              {cat === 'ALL' ? t('ทั้งหมด', 'All Articles') : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredArticles.length > 0 ? (
          filteredArticles.map(article => (
            <div
              key={article.id}
              onClick={() => setSelectedArticle(article)}
              className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-[35px] border border-white/40 dark:border-slate-800 rounded-[2.5rem] overflow-hidden hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-900/5 transition-all group cursor-pointer flex flex-col justify-between"
            >
              <div className="relative h-48 bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                {/* Visual Image with Fallback */}
                <img 
                  src={article.image} 
                  alt="" 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    // Hide the image if not found, let CSS show standard gradient
                    e.currentTarget.style.display = 'none';
                  }}
                />
                
                {/* Fallback stylized gradient icon box */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-indigo-900/10 flex flex-col items-center justify-center p-6 text-center">
                  <Newspaper className="w-12 h-12 text-blue-600/40 dark:text-blue-400/30 mb-2 stroke-1" />
                  <span className="text-[10px] font-bold tracking-widest text-blue-600/30 uppercase">QAIC NEWS</span>
                </div>

                <div className="absolute top-4 left-4">
                  <span className={`px-2.5 py-1 rounded-lg text-[8px] font-bold uppercase tracking-wider ${getBadgeColor(article.category)}`}>
                    {article.category}
                  </span>
                </div>
              </div>

              <div className="p-8 space-y-4 text-left flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-[10px] text-gray-500 dark:text-slate-450 font-mono">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{t(article.date, article.dateEN)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{t(article.readTimeTH, article.readTimeEN)}</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-display font-bold text-gray-900 dark:text-white leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
                    {t(article.titleTH, article.titleEN)}
                  </h3>
                  <p className="text-xs text-gray-650 dark:text-slate-400 line-clamp-3 leading-relaxed">
                    {t(article.summaryTH, article.summaryEN)}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 dark:border-slate-800/80 flex items-center justify-between text-blue-600 dark:text-blue-400 text-xs font-bold mt-auto group-hover:text-blue-700">
                  <span>{t('อ่านรายละเอียด', 'Read Article')}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-16 text-center text-gray-500 dark:text-slate-400 space-y-2">
            <Newspaper className="w-12 h-12 text-gray-300 dark:text-slate-700 stroke-1 mx-auto" />
            <p className="text-sm font-medium">{t('ไม่พบข้อมูลข่าวสารประชาสัมพันธ์ตามเงื่อนไข', 'No articles found matching your query')}</p>
          </div>
        )}
      </div>

      {/* Article Detail Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-3xl bg-white/95 backdrop-blur-[35px] border border-white/60 shadow-2xl dark:bg-slate-900/95 dark:border-slate-800 rounded-[2.5rem] overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="p-6 md:p-8 border-b border-gray-100 dark:border-slate-800 flex justify-between items-start">
              <div className="space-y-2 text-left pr-6">
                <span className={`inline-block px-3 py-1 rounded-xl text-[9px] font-bold uppercase tracking-wider ${getBadgeColor(selectedArticle.category)}`}>
                  {selectedArticle.category}
                </span>
                <h3 className="text-xl md:text-2xl font-display font-bold text-gray-900 dark:text-white leading-tight">
                  {t(selectedArticle.titleTH, selectedArticle.titleEN)}
                </h3>
                <div className="flex items-center gap-4 text-[10px] text-gray-500 dark:text-slate-450 font-mono">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{t(selectedArticle.date, selectedArticle.dateEN)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{t(selectedArticle.readTimeTH, selectedArticle.readTimeEN)}</span>
                  </div>
                  <div>•</div>
                  <div>{selectedArticle.views} {t('ยอดเข้าชม', 'views')}</div>
                </div>
              </div>
              <button
                onClick={() => setSelectedArticle(null)}
                className="p-2 bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-700 dark:text-slate-300 rounded-full transition-colors cursor-pointer border-none"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content Body */}
            <div className="p-6 md:p-8 overflow-y-auto space-y-6 flex-1 text-left font-sans leading-relaxed text-sm text-gray-800 dark:text-slate-200">
              {/* Optional header image in modal */}
              <div className="w-full h-56 bg-gradient-to-br from-blue-600/5 to-indigo-900/5 rounded-2xl border border-gray-200/50 dark:border-slate-800 overflow-hidden relative flex items-center justify-center">
                <img 
                  src={selectedArticle.image} 
                  alt="" 
                  className="w-full h-full object-cover"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
                <div className="absolute inset-0 bg-slate-900/10 flex items-center justify-center pointer-events-none">
                  <Newspaper className="w-16 h-16 text-blue-600/20 dark:text-blue-400/20 stroke-1" />
                </div>
              </div>

              <div className="space-y-4">
                <p className="font-bold text-gray-900 dark:text-white text-base">
                  {t(selectedArticle.summaryTH, selectedArticle.summaryEN)}
                </p>
                <p className="text-gray-700 dark:text-slate-300 text-sm">
                  {t(selectedArticle.contentTH, selectedArticle.contentEN)}
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 md:p-8 border-t border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-900/40 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleShare(selectedArticle)}
                  className="px-4 py-2 bg-white dark:bg-slate-800 text-gray-700 dark:text-slate-300 border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  {isCopied ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4 text-blue-500" />}
                  <span>{isCopied ? t('คัดลอกแล้ว', 'Link Copied') : t('แชร์ลิงก์ข่าว', 'Share')}</span>
                </button>
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 bg-white dark:bg-slate-800 text-gray-700 dark:text-slate-300 border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Printer className="w-4 h-4 text-red-500" />
                  <span>{t('พิมพ์ข่าวนี้', 'Print')}</span>
                </button>
              </div>

              <button
                onClick={() => setSelectedArticle(null)}
                className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold cursor-pointer border-none shadow-md"
              >
                {t('ปิดหน้าต่าง', 'Close')}
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
