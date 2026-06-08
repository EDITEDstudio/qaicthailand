/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { UserSettings } from '../types';
import { Bot, Send, User, Loader2, Sparkles, AlertCircle, RefreshCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  role: 'user' | 'ai';
  text: string;
}

interface GeminiConsultantProps {
  settings: UserSettings;
}

export default function GeminiConsultant({ settings }: GeminiConsultantProps) {
  const lang = settings.lang;
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'ai',
      text: lang === 'TH' 
        ? 'สวัสดีครับ ผมคือผู้ช่วยอัจฉริยะจาก QAIC Thailand ยินดีให้คำปรึกษาด้านมาตรฐาน ISO (9001, 14001, 27001 และอื่นๆ) ต้องการทราบข้อมูลด้านใดเป็นพิเศษไหมครับ?' 
        : 'Hello! I am your QAIC Thailand AI Consultant. I can help you with ISO standards (9001, 14001, 27001, etc.), certification processes, and compliance advisory. How can I assist you today?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);
    setError(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      const systemInstruction = `
        You are "QAIC Thailand AI ISO Consultant", a professional, authoritative, and helpful advisor for Quality Assurance International Certification (QAIC) Thailand.
        Your expertise covers ISO 9001 (Quality), ISO 14001 (Environment), ISO 45001 (Health & Safety), ISO 27001 (Information Security), and HACCP/GHPs.
        
        Guidelines:
        - Respond in the user's language (Thai or English).
        - Be professional but accessible.
        - If asked about fees, mention that QAIC Thailand provides competitive accredited pricing and suggest using the "Cost Estimator" tool on the portal.
        - Advise on the multi-stage process (Gap Analysis, Stage 1 Audit, Stage 2 Audit, Surveillance).
        - Direct users to contact QAIC Thailand for formal quotes.
        - Keep responses concise and formatted with bullet points for readability.
      `;

      const chat = ai.chats.create({
        model: "gemini-3-flash-preview",
        config: {
          systemInstruction,
        },
        history: messages.slice(0, -1).map(m => ({
            role: m.role === 'ai' ? 'model' : 'user',
            parts: [{ text: m.text }]
        }))
      });

      const result = await chat.sendMessage({ message: userMessage });
      const aiResponse = result.text || 'I apologize, I could not generate a response. Please try again.';
      
      setMessages(prev => [...prev, { role: 'ai', text: aiResponse }]);
    } catch (err: any) {
      console.error("Gemini Error:", err);
      setError(lang === 'TH' ? 'ขออภัย เกิดข้อผิดพลาดในการเชื่อมต่อกรุณาลองใหม่อีกครั้ง' : 'Sorry, something went wrong. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([
        {
          role: 'ai',
          text: lang === 'TH' 
            ? 'สวัสดีครับ ผมคือผู้ช่วยอัจฉริยะจาก QAIC Thailand ยินดีให้คำปรึกษาด้านมาตรฐาน ISO (9001, 14001, 27001 และอื่นๆ) ต้องการทราบข้อมูลด้านใดเป็นพิเศษไหมครับ?' 
            : 'Hello! I am your QAIC Thailand AI Consultant. I can help you with ISO standards (9001, 14001, 27001, etc.), certification processes, and compliance advisory. How can I assist you today?'
        }
      ]);
      setError(null);
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-gray-900 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500 rounded-lg text-white">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              {lang === 'TH' ? 'ที่ปรึกษา ISO อัจฉริยะ' : 'AI ISO Consultant'}
            </h3>
            <p className="text-[10px] text-blue-400 font-sans"> Powered by Gemini Flash </p>
          </div>
        </div>
        <button 
          onClick={handleReset}
          className="text-gray-400 hover:text-white transition-colors p-1.5 hover:bg-white/10 rounded-lg cursor-pointer"
          title={lang === 'TH' ? 'ล้างการแชท' : 'Clear Chat'}
        >
          <RefreshCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50/30 scroll-smooth"
      >
        <AnimatePresence initial={false}>
          {messages.map((m, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-3 max-w-[85%] ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  m.role === 'user' ? 'bg-blue-700' : 'bg-blue-600'
                }`}>
                  {m.role === 'user' ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-white" />}
                </div>
                <div className={`p-4 rounded-2xl text-[13px] leading-relaxed font-sans shadow-sm whitespace-pre-wrap ${
                  m.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-tr-none' 
                    : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
                }`}>
                  {m.text}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isLoading && (
          <div className="flex justify-start">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-white border border-gray-100 p-4 rounded-2xl rounded-tl-none">
                <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="p-3 bg-red-50 border border-red-100 rounded-xl flex items-center gap-2 text-[11px] text-red-600 font-sans">
             <AlertCircle className="w-4 h-4" />
             <span>{error}</span>
          </div>
        )}
      </div>

      {/* Input */}
      <form 
        onSubmit={handleSendMessage}
        className="p-4 bg-white border-t border-gray-100 flex gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={lang === 'TH' ? 'พิมพ์คำถามเพื่อให้ AI ช่วยเหลือ...' : 'Type your question for AI advisory...'}
          className="flex-1 px-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 font-sans disabled:opacity-50"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="p-2.5 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
}
