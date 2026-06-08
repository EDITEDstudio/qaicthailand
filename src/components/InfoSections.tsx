import React from 'react';
import { UserSettings } from '../types';
import { 
  HelpCircle, 
  Target, 
  Clock, 
  ClipboardList, 
  MessageSquare, 
  Wallet,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  Plus,
  Minus,
  Play
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface InfoSectionsProps {
  settings: UserSettings;
  onTabChange: (tab: 'assess' | 'standards' | 'training' | 'verify' | 'org' | 'profile' | 'quote') => void;
}

export default function InfoSections({ settings, onTabChange }: InfoSectionsProps) {
  const t = (th: string, en: string) => settings.lang === 'TH' ? th : en;
  const [openFaq, setOpenFaq] = React.useState<number | null>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);

  const sections = [
    {
      id: 'what-is-iso',
      icon: HelpCircle,
      title: t('มาตรฐาน ISO คืออะไร?', 'What is ISO Standard?'),
      content: t(
        'ISO (International Organization for Standardization) คือมาตรฐานสากลที่กำหนดขึ้นเพื่อรองรับระบบบริหารจัดการ และกระบวนการทำงานในองค์กรให้มีคุณภาพ ความปลอดภัย และประสิทธิภาพเหมือนกันทั่วโลก ช่วยสร้างความมั่นใจให้กับลูกค้าและคู่ค้าถาวร',
        'ISO (International Organization for Standardization) is a set of international standards designed to ensure quality, safety, and efficiency in organizational management and processes worldwide. It builds trust with customers and partners globally.'
      ),
      color: 'blue'
    },
    {
      id: 'who-is-it-for',
      icon: Target,
      title: t('ISO เหมาะสำหรับใคร?', 'Who is ISO for?'),
      content: t(
        'ISO เหมาะสำหรับองค์กรทุกขนาด ตั้งแต่ SME ไปจนถึงองค์กรขนาดใหญ่ ไม่ว่าจะเป็นภาคการผลิต การบริการ ร้านอาหาร ก่อสร้าง หรือธุรกิจออนไลน์ ที่ต้องการยกระดับความเชื่อมั่นและเพิ่มโอกาสในการขยายตลาดทั้งในและต่างประเทศ',
        'ISO is suitable for organizations of all sizes, from SMEs to large corporations, across manufacturing, services, restaurants, construction, or online businesses looking to enhance trust and expand into local and international markets.'
      ),
      color: 'blue'
    },
    {
      id: 'timeline',
      icon: Clock,
      title: t('ใช้เวลานานแค่ไหน?', 'How long does it take?'),
      content: t(
        'โดยปกติการขอรับรองจะใช้เวลาประมาณ 30 - 90 วัน ขึ้นอยู่กับความพร้อมของระบบภายในองค์กร ขนาดของบริษัท และประเภทของมาตรฐานที่ต้องการขอรับรอง',
        'Typically, certification takes about 30 - 90 days, depending on the readiness of the internal management system, company size, and the specific standard being sought.'
      ),
      color: 'amber'
    }
  ];

  const steps = [
    { num: '01', title: t('สมัครและประเมินเบื้องต้น', 'Application & Pre-assessment'), desc: t('ส่งคำขอรับรองและประเมินขอบข่ายงานของธุรกิจ', 'Submit application and assess scope of business.') },
    { num: '02', title: t('ตรวจประเมินระยะที่ 1 (Stage 1)', 'Stage 1 Audit'), desc: t('ตรวจสอบความพร้อมของเอกสารและระบบเบื้องต้น', 'Initial documentation and system readiness review.') },
    { num: '03', title: t('ตรวจประเมินระยะที่ 2 (Stage 2)', 'Stage 2 Audit'), desc: t('ตรวจประเมินหน้างานจริงเพื่อยืนยันการปฏิบัติ', 'On-site audit to verify effective implementation.') },
    { num: '04', title: t('พิจารณาและมอบใบรับรอง', 'Certification Award'), desc: t('สรุปผลและออกใบรับรองเมื่อผ่านการประเมิน', 'Final review and issuance of ISO certificate.') },
  ];

  const faqs = [
    { q: t('ไม่เป็นนิติบุคคลขอได้ไหม?', 'Can non-juristic persons apply?'), a: t('ขอได้ครับ ธุรกิจขนาดเล็กหรือร้านค้าที่มีการจดทะเบียนพาณิชย์ก็สามารถยื่นขอการรับรองได้เพื่อสร้างความเชื่อมั่น', 'Yes, small businesses or shops with commercial registration can apply for certification to build trust.') },
    { q: t('ต้องทำเอกสารเยอะไหม?', 'is there a lot of paperwork?'), a: t('ในมาตรฐานเวอร์ชันใหม่ เน้นประสิทธิภาพการทำงานมากกว่าเอกสาร โดยเน้นการควบคุมความเสี่ยงและผลลัพธ์ที่เกิดขึ้นจริง', 'Modern standards focus more on process efficiency and risk management than excessive paperwork.') },
    { q: t('ใบรับรองมีอายุกี่ปี?', 'How long is the certificate valid?'), a: t('ใบรับรอง ISO มีอายุ 3 ปี โดยจะต้องมีการตรวจติดตามเป็นรายปี (Surveillance Audit) เพื่อยืนยันความต่อเนื่องของระบบ', 'ISO certificates are valid for 3 years, with annual surveillance audits required to ensure system continuity.') },
  ];

  return (
    <div className="space-y-24 mt-20">
      {/* Intro Grid */}
      <div className="grid md:grid-cols-3 gap-8">
        {sections.map((section, idx) => (
          <motion.div 
            key={section.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm relative group hover:shadow-xl hover:shadow-blue-900/5 transition-all"
          >
            <div className={`w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center mb-6 text-gray-400 group-hover:scale-110 transition-transform`}>
              <section.icon className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-display font-bold text-gray-900 mb-4">{section.title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{section.content}</p>
          </motion.div>
        ))}
      </div>

      {/* Video Presentation Section */}
      <section className="bg-gray-50 rounded-[3rem] p-8 md:p-12 border border-gray-100 overflow-hidden relative">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-[10px] font-bold uppercase tracking-widest">
              <Play className="w-3 h-3 fill-current" />
              <span>Video Presentation</span>
            </div>
            <h2 className="text-3xl font-display font-bold text-gray-900 leading-tight">
              {t('ทำความรู้จัก QAIC Thailand ใน 2 นาที', 'Get to know QAIC Thailand in 2 Minutes')}
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              {t(
                'รับชมวิดีโอแนะนำบริการ ขั้นตอนการทำงาน และสิทธิประโยชน์ที่จะได้รับเมื่อเลือกรับรองมาตรฐานกับเรา เราพร้อมเป็นพันธมิตรที่ช่วยให้ธุรกิจของคุณเติบโตอย่างยั่งยืน',
                'Watch our introductory video on services, workflow, and the benefits of choosing us for your certification. We are ready to be the partner that helps your business grow sustainably.'
              )}
            </p>
          </div>
          <div className="flex-1 w-full aspect-video bg-gray-200 rounded-3xl overflow-hidden shadow-2xl relative group">
             {isPlaying ? (
               <iframe 
                 src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" 
                 title="QAIC Video Presentation"
                 className="w-full h-full border-none"
                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                 allowFullScreen
               ></iframe>
             ) : (
               <>
                 <div 
                   onClick={() => setIsPlaying(true)}
                   className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-gray-900/60 transition-colors group-hover:bg-gray-900/40 cursor-pointer"
                 >
                    <div className="w-16 h-16 bg-white text-blue-600 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 fill-current ml-1" />
                    </div>
                    <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest mt-4">Click to play video</p>
                 </div>
                 <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800" alt="Office Professional" className="w-full h-full object-cover" />
               </>
             )}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">{t('ขั้นตอนการขอรับรอง', 'Our Certification Process')}</h2>
          <p className="text-gray-500">{t('กระบวนการ 4 ขั้นตอนง่ายๆ เพื่อก้าวสู่มาตรฐานระดับสากล', 'Simple 4-step journey to international excellence')}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden lg:block absolute top-[1.75rem] left-[15%] right-[15%] h-0.5 bg-gray-100" />
          
          {steps.map((step, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative z-10 bg-white p-6 rounded-3xl border border-gray-100 text-center"
            >
              <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-display font-bold text-sm mx-auto mb-6 shadow-lg shadow-blue-600/20">
                {step.num}
              </div>
              <h4 className="font-bold text-gray-900 mb-2">{step.title}</h4>
              <p className="text-xs text-gray-500 leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pricing & FAQ Split */}
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Pricing Card */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600">
              <Wallet className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-display font-bold text-gray-900">{t('ค่าใช้จ่ายเบื้องต้น', 'Estimated Costs')}</h2>
          </div>
          
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-8 text-white shadow-xl shadow-blue-900/20">
            <p className="text-blue-100 text-sm mb-2 opacity-80">{t('ราคาเริ่มต้นประมาณ', 'Starting from approximately')}</p>
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-4xl font-display font-bold">฿25,XXX</span>
              <span className="text-blue-100/60 text-sm">{t('/ ต่อใบรับรอง', '/ per certificate')}</span>
            </div>
            
            <ul className="space-y-4 mb-8">
               {[
                 t('รวมค่าธรรมเนียมใบรับรองสากล', 'Includes global certificate fees'),
                 t('ฟรี! ที่ปรึกษา AI ช่วยตอบข้อสงสัย 24 ชม.', 'Free AI Consultant 24/7'),
                 t('ตรวจประเมินโดยผู้เชี่ยวชาญระดับสากล', 'Audited by international experts'),
                 t('ใบรับรองดิจิทัลตรวจสอบผ่าน QR ได้ทันที', 'Digital certificate with QR verification')
               ].map((item, i) => (
                 <li key={i} className="flex items-center gap-3 text-sm">
                   <div className="bg-white/20 p-1 rounded-full"><CheckCircle2 className="w-3 h-3" /></div>
                   <span>{item}</span>
                 </li>
               ))}
            </ul>

            <button 
              onClick={() => onTabChange('quote')}
              className="w-full py-4 bg-white text-blue-700 font-bold rounded-2xl hover:bg-blue-50 transition-all flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>{t('ขอใบเสนอราคาด่วน', 'Get Instant Quote')}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-[10px] text-blue-100/60 text-center mt-4 uppercase tracking-widest font-medium">
              {t('*ราคานี้อ้างอิงสำหรับสถานประกอบการขนาดเล็ก', '*Pricing based on small-scale facility')}
            </p>
          </div>
        </section>

        {/* FAQ Area */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-display font-bold text-gray-900">{t('คำถามที่พบบ่อย', 'Common Questions')}</h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm"
              >
                <button 
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left font-bold text-gray-900 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <span className="text-sm">{faq.q}</span>
                  {openFaq === idx ? <Minus className="w-4 h-4 text-blue-600" /> : <Plus className="w-4 h-4 text-gray-400" />}
                </button>
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden bg-gray-50/50"
                    >
                      <div className="p-5 text-gray-500 text-sm leading-relaxed border-t border-gray-100">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          <button className="mt-8 flex items-center gap-2 text-blue-600 font-bold text-sm hover:translate-x-1 transition-transform cursor-pointer">
            <span>{t('ดูคำถามทั้งหมด', 'View all FAQs')}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </section>
      </div>
    </div>
  );
}
