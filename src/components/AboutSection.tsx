/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'framer-motion';
import { 
  History, 
  Target, 
  ShieldCheck, 
  Scale, 
  BarChart3, 
  CheckCircle2, 
  Users,
  Award,
  BookOpen
} from 'lucide-react';
import { UserSettings } from '../types';
import OrgChart from './OrgChart';

interface AboutSectionProps {
  settings: UserSettings;
}

export default function AboutSection({ settings }: AboutSectionProps) {
  const lang = settings.lang;
  const t = (th: string, en: string) => lang === 'TH' ? th : en;

  const KPIs = [
    { label: t('จำนวนลูกค้าใหม่จากการตรวจประเมิน', 'New clients from assessments'), value: t('ไม่ต่ำกว่า 30 รายต่อปี', 'Min 30 per year') },
    { label: t('อัตราลูกค้าร้องเรียนหรืออุทธรณ์หรือยกเลิกการรับรอง', 'Complaints/appeals/cancellations rate'), value: t('ไม่เกินปีละ 3 ราย', 'Max 3 per year') },
    { label: t('% อัตราการส่งรายงาน Audit Report ตรงเวลา', '% On-time Audit Report delivery'), value: t('ไม่ต่ำกว่า 70% ต่อเดือน', 'Min 70% per month') },
    { label: t('ความพึงพอใจในด้านบริการตรวจรับรอง', 'Certification service satisfaction'), value: t('ไม่ต่ำกว่า 80% ต่อเดือน', 'Min 80% per month') },
    { label: t('อัตรากำลังการให้บริการตรวจประเมิน', 'Assessment service capacity'), value: t('ไม่ต่ำกว่า 20 Man-day ต่อเดือน', 'Min 20 Man-day per month') },
    { label: t('อัตราการพัฒนาฝึกอบรมบุคลากร', 'Personnel training rate'), value: t('ไม่น้อยกว่า 20 ชั่วโมง/คน/ปี', 'Min 20 hours/person/year') },
  ];

  const executionPlans = [
    t('บริหารงานและดำเนินการอย่างมืออาชีพให้สอดคล้องกับข้อกำหนด ISO/IEC 17021-1:2015', 'Professional management in compliance with ISO/IEC 17021-1:2015'),
    t('ให้บริการตรวจสอบระบบการควบคุมกระบวนการผลิตในอุตสาหกรรมอาหารอย่างเป็นระบบ', 'Systematic production control inspection services in food industry'),
    t('ส่งเสริมและพัฒนาบุคลากรให้มีประสิทธิภาพและทักษะที่เหมาะสมอย่างต่อเนื่อง', 'Continuous development of personnel skills and performance'),
    t('ให้เจ้าหน้าที่ปฏิบัติงานได้โดยอิสระ ไม่มีภาวะกดดันที่กระทบต่อความเที่ยงตรง', 'Ensuring staff independence from any pressures affecting audit integrity'),
    t('ให้เจ้าหน้าที่ทุกคนเข้าใจและปฏิบัติตามคู่มือคุณภาพอย่างถูกต้อง', 'Ensuring all staff understand and strictly follow the Quality Manual'),
  ];

  const goals = [
    t('มุ่งมั่นในการให้บริการที่สอดคล้องต่อความต้องการและคาดหวังของลูกค้า', 'Commitment to services meeting customer needs and expectations'),
    t('มุ่งเน้นการตรวจประเมินที่รวดเร็ว มีคุณภาพ และเอื้ออำนวยความสะดวก', 'Focus on fast, quality, and convenient assessments'),
    t('มุ่งเน้นการให้บริการหลังการรับรองเพื่อการพัฒนาที่ยั่งยืน', 'Post-certification services focused on sustainable improvement'),
    t('ประชาสัมพันธ์ชื่อของลูกค้าเพื่อขยายโอกาสทางการตลาด', 'PR services for customers to expand market opportunities'),
    t('แจ้งข่าวสารความเคลื่อนไหวในวงการมาตรฐาน ISO อย่างต่อเนื่อง', 'Continuous updates on ISO standards and global trends'),
  ];

  const impartialityPolicies = [
    t('บริการให้สอดคล้องกับกฎหมาย กฎระเบียบที่เกี่ยวข้อง', 'Service compliance with relevant laws and regulations'),
    t('จัดให้มีทรัพยากรที่เพียงพอเพื่อป้องกันความกดดันในกิจกรรม', 'Sufficient resources to prevent pressure in certification activities'),
    t('มอบหมายงานที่เป็นอิสระ โดยผู้ตรวจและผู้อนุมัติผลต้องไม่ใช่คนเดียวกัน', 'Independent assignment: Auditors and approvers must be different persons'),
    t('ตัดสินใจบนพื้นฐานความถูกต้องทางวิชาการ โดยปราศจากความกดดันทางธุรกิจ', 'Decisions based on academic correctness without commercial pressure'),
    t('หลีกเลี่ยงความสัมพันธ์ใดๆ ที่อาจส่งผลกระทบต่อความเป็นกลาง', 'Avoiding any relationships that might affect impartiality'),
    t('มั่นใจในบุคลากร ไม่เลือกปฏิบัติ และให้ความเสมอภาคต่อลูกค้าทุกราย', 'Non-discriminatory service and equality for all customers'),
    t('ไม่มีการทำการตลาดร่วมกับกิจกรรมที่ส่งผลกระทบต่อความเป็นกลาง', 'No joint marketing that affects impartiality'),
  ];

  return (
    <div className="space-y-24 py-10">
      {/* Establishment & Intro */}
      <section className="relative overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-widest">
            <History className="w-4 h-4" />
            <span>{t('ก่อตั้งเมื่อ 12 มีนาคม 2550', 'Established March 12, 2007')}</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-display font-bold text-gray-900 leading-tight">
            {t('บริษัท คิวเอไอซี (ประเทศไทย) จำกัด', 'QAIC (Thailand) Co., Ltd.')}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed font-sans">
                {t(
                  'บริษัท คิวเอไอซี (ประเทศไทย) จำกัด เป็นหน่วยตรวจประเมินรับรองระบบมาตรฐานสากลที่ได้รับความเชื่อถือให้กับสถานประกอบการ องค์กร และหน่วยงานที่นำข้อกำหนดตามมาตรฐานสากลต่างๆ มาประยุกต์ใช้ โดยได้รับการรับรองระบบงานจาก United Kingdom Accreditation Service (UKAS) เลขที่ 46',
                  'QAIC (Thailand) Co., Ltd. is a trusted international certification body for organizations implementing global standards. We are accredited by the United Kingdom Accreditation Service (UKAS), Accredited Body No. 46.'
                )}
              </p>
              <div className="p-6 bg-gray-50 rounded-3xl flex items-center gap-6">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center p-3">
                  <img src="/logo.png" alt="UKAS" className="w-full h-auto opacity-80" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Accreditation</p>
                  <p className="text-sm font-bold text-gray-900">UKAS Accredited Body #46</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-blue-600 uppercase tracking-widest flex items-center gap-2">
                <Award className="w-4 h-4" />
                {t('มาตรฐานที่ให้บริการ', 'Our Certifications')}
              </h3>
              <div className="flex flex-wrap gap-2 text-xs">
                {['ISO 9001:2015', 'ISO 14001:2015', 'ISO 45001:2018', 'ISO 22000:2018', 'GHPs', 'HACCP', 'BRC', 'ISO 13485:2016', 'ISO 50001', 'ISO/IEC 17021-1:2015'].map(std => (
                  <span key={std} className="px-3 py-1.5 bg-white rounded-full font-medium text-gray-700 shadow-sm">
                    {std}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quality Policy Quote */}
      <section className="bg-blue-600 rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="relative z-10 max-w-4xl mx-auto space-y-8"
        >
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <BookOpen className="w-6 h-6" />
          </div>
          <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-blue-200">{t('นโยบายคุณภาพ', 'Quality Policy')}</h3>
          <p className="text-2xl md:text-3xl lg:text-4xl font-display font-medium leading-tight">
            “{t(
              'มุ่งมั่นบริการตรวจสอบและรับรองระบบมาตรฐานให้กับลูกค้าอย่างมีคุณภาพ เป็นกลาง น่าเชื่อถือ และเป็นไปตามมาตรฐานสากล ISO/IEC 17021-1 เพื่อสร้างมูลค่าเพิ่มและสนองความพึงพอใจของลูกค้า',
              'Committed to provide quality, impartial, and reliable certification services in accordance with ISO/IEC 17021-1 to create added value and ensure customer satisfaction.'
            )}”
          </p>
        </motion.div>
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[100%] bg-white rounded-full blur-[100px]" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[100%] bg-white rounded-full blur-[100px]" />
        </div>
      </section>

      {/* Execution Plan & KPIs */}
      <section className="grid lg:grid-cols-2 gap-16 items-start">
        <div className="space-y-12">
          <div className="space-y-4">
            <h3 className="text-2xl font-display font-bold text-gray-900">{t('แนวทางการดำเนินงาน', 'Execution Framework')}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              {t(
                'เพื่อให้บรรลุวัตถุประสงค์ตามนโยบายดังกล่าว เรามุ่งเน้นความเป็นมืออาชีพในทุกขั้นตอนของการตรวจสอบและรับรองระบบมาตรฐานสากล',
                'To achieve our quality objectives, we focus on professionalism at every stage of the global standard certification process.'
              )}
            </p>
          </div>
          
          <div className="space-y-6">
            {executionPlans.map((plan, i) => (
              <div key={i} className="flex gap-4 group">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs flex-shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  {i + 1}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed font-sans pt-1.5">{plan}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-900 rounded-[2.5rem] p-8 md:p-12 text-white space-y-10 shadow-2xl shadow-blue-900/10">
          <div className="flex items-center gap-3 border-b border-gray-800 pb-6">
            <div className="p-3 bg-blue-500/20 rounded-xl text-blue-400">
              <BarChart3 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg">{t('วัตถุประสงค์และ KPI', 'Quality Objectives & KPIs')}</h3>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mt-0.5">{t('เป้าหมายที่วัดผลได้ของบริษัท', 'Measurable Corporate Targets')}</p>
            </div>
          </div>
          
          <div className="space-y-6">
            {KPIs.map((kpi, i) => (
              <div key={i} className="flex justify-between items-start gap-4">
                <p className="text-sm text-gray-400 font-sans leading-relaxed">{kpi.label}</p>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-bold text-blue-400">{kpi.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Goals & Impartiality */}
      <section className="space-y-16">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Our Goals */}
          <div className="bg-white rounded-[2.5rem] p-8 md:p-12 space-y-8 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-xl">{t('เป้าหมายของเรา', 'Our Strategic Goals')}</h3>
            </div>
            <div className="space-y-6">
              {goals.map((goal, i) => (
                <div key={i} className="flex gap-4">
                  <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-600 leading-relaxed font-sans">{goal}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Impartiality Policy */}
          <div className="bg-white rounded-[2.5rem] p-8 md:p-12 space-y-8 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-amber-50 rounded-xl text-amber-600">
                <Scale className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-xl">{t('นโยบายความเป็นกลาง', 'Impartiality Policy')}</h3>
            </div>
            <div className="space-y-6">
              {impartialityPolicies.map((policy, i) => (
                <div key={i} className="flex gap-4">
                  <ShieldCheck className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-600 leading-relaxed font-sans">{policy}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Chart (The original OrgChart) */}
      <section className="space-y-12">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gray-100 text-gray-600 rounded-full text-[10px] font-bold uppercase tracking-widest">
            <Users className="w-3.5 h-3.5" />
            <span>{t('โครงสร้างองค์กร', 'Organizational Structure')}</span>
          </div>
          <h3 className="text-3xl font-display font-bold text-gray-900">{t('คณะผู้บริหารและทีมงานผู้ตรวจประเมิน', 'Executive Board & Auditing Team')}</h3>
        </div>
        
        <div className="bg-white rounded-[3rem] p-8 shadow-inner overflow-hidden">
          <OrgChart settings={settings} />
        </div>
      </section>
    </div>
  );
}
