import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { UserSettings } from '../types';

interface VideoPresentationProps {
  settings: UserSettings;
}

export default function VideoPresentation({ settings }: VideoPresentationProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const t = (th: string, en: string) => settings.lang === 'TH' ? th : en;

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white/40 backdrop-blur-[35px] border border-white/40 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] dark:bg-slate-900/40 dark:border-white/20 dark:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.2)] rounded-[3rem] p-8 md:p-12 shadow-sm relative overflow-hidden mb-8"
    >
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 space-y-6 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-[10px] font-bold uppercase tracking-widest">
            <Play className="w-3 h-3 fill-current" />
            <span>Video Presentation</span>
          </div>
          <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white leading-tight">
            {t('ทำความรู้จัก QAIC Thailand ใน 2 นาที', 'Get to know QAIC Thailand in 2 Minutes')}
          </h2>
          <p className="text-gray-700 dark:text-slate-200 text-sm leading-relaxed">
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
                <div className="w-16 h-16 bg-white/40 backdrop-blur-[35px] border border-white/40 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] dark:bg-slate-900/40 dark:border-white/20 dark:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.2)] text-blue-600 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                  <Play className="w-6 h-6 fill-current ml-1" />
                </div>
                <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest mt-4">Click to play video</p>
              </div>
              <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800" alt="Office Professional" className="w-full h-full object-cover" />
            </>
          )}
        </div>
      </div>
    </motion.section>
  );
}
