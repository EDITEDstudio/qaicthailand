/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { UserSettings, ThemeType, FontSize, Language } from '../types';
import { Sliders, Check, Globe, Type } from 'lucide-react';

interface ThemeCustomizerProps {
  settings: UserSettings;
  onChange: (settings: UserSettings) => void;
}

const colorPresets = [
  { name: 'QAIC Blue (Logo)', value: 'from-blue-600 to-blue-800', hex: '#2563eb' },
  { name: 'Azure Sky', value: 'from-sky-500 to-blue-600', hex: '#0ea5e9' },
  { name: 'Amber Gold', value: 'from-amber-600 to-yellow-500', hex: '#d97706' },
  { name: 'Deep Crimson', value: 'from-red-600 to-rose-700', hex: '#dc2626' }
];

export default function ThemeCustomizer({ settings, onChange }: ThemeCustomizerProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const updateSetting = <K extends keyof UserSettings>(key: K, value: UserSettings[K]) => {
    onChange({ ...settings, [key]: value });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Trigger Button */}
      <button
        id="theme-toggle-btn"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-3 rounded-full bg-white text-gray-900 border border-gray-200 shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer text-xs uppercase tracking-wider font-semibold font-display"
      >
        <Sliders className={`w-4 h-4 text-blue-600 ${isOpen ? 'rotate-180' : ''} transition-transform duration-300`} />
        <span>{settings.lang === 'TH' ? 'ตั้งค่าการแสดงผล' : 'UI Customizer'}</span>
      </button>

      {/* Settings Dialog Panel */}
      {isOpen && (
        <div
          id="customizer-panel"
          className="absolute bottom-16 right-0 w-80 p-6 rounded-2xl bg-white text-gray-900 shadow-2xl border border-gray-100/80 animate-in fade-in slide-in-from-bottom-4 duration-200"
        >
          <div className="flex justify-between items-center mb-5 border-b border-gray-100 pb-3">
            <h3 className="font-display font-bold text-sm tracking-wide text-gray-800 uppercase flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-blue-600" />
              {settings.lang === 'TH' ? 'ปรับแต่งการแสดงผล' : 'Aesthetic Settings'}
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600 font-sans text-xs"
            >
              ✕
            </button>
          </div>

          {/* Theme Selector */}
          <div className="mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 block mb-2">
              {settings.lang === 'TH' ? 'รูปแบบเว็บไซต์ (Theme)' : 'Aesthetic Mood'}
            </span>
            <div className="grid grid-cols-2 gap-2">
              {(['modern', 'editorial', 'cyber', 'corporate'] as ThemeType[]).map((t) => (
                <button
                  key={t}
                  onClick={() => updateSetting('theme', t)}
                  className={`px-3 py-2 text-xs rounded-lg font-medium border text-left flex justify-between items-center transition-all cursor-pointer ${
                    settings.theme === t
                      ? 'border-blue-500 bg-blue-50/50 text-blue-900 font-semibold'
                      : 'border-gray-200 bg-gray-50/50 hover:bg-gray-100/50 text-gray-600'
                  }`}
                >
                  <span className="capitalize">{t}</span>
                  {settings.theme === t && <Check className="w-3.5 h-3.5 text-blue-600" />}
                </button>
              ))}
            </div>
          </div>

          {/* Core Accent Color */}
          <div className="mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 block mb-2">
              {settings.lang === 'TH' ? 'สีเอกลักษณ์ (Branding Color)' : 'Brand Color Accent'}
            </span>
            <div className="flex gap-2">
              {colorPresets.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => updateSetting('primaryColor', preset.value)}
                  className={`w-8 h-8 rounded-full bg-gradient-to-tr ${preset.value} transition-all duration-150 relative cursor-pointer hover:scale-110 active:scale-95 flex items-center justify-center`}
                  title={preset.name}
                >
                  {settings.primaryColor === preset.value && (
                    <Check className="w-4 h-4 text-white drop-shadow" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Font Resizing */}
          <div className="mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 block mb-2 flex items-center gap-1">
              <Type className="w-3.5 h-3.5 text-gray-400" />
              {settings.lang === 'TH' ? 'ขนาดคำบรรยาย (Font Size)' : 'Typography Scale'}
            </span>
            <div className="flex gap-1.5 bg-gray-100 p-1 rounded-lg">
              {(['normal', 'medium', 'large'] as FontSize[]).map((size) => (
                <button
                  key={size}
                  onClick={() => updateSetting('fontSize', size)}
                  className={`flex-1 text-center py-1 rounded text-xs tracking-wide transition-all capitalize cursor-pointer ${
                    settings.fontSize === size
                      ? 'bg-white font-semibold text-gray-900 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {size === 'normal' ? (settings.lang === 'TH' ? 'ปกติ' : 'Normal') :
                   size === 'medium' ? (settings.lang === 'TH' ? 'ปานกลาง' : 'Medium') : 
                   (settings.lang === 'TH' ? 'ใหญ่พิเศษ' : 'Large')}
                </button>
              ))}
            </div>
          </div>

          {/* Language Selector */}
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 block mb-2 flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-gray-400" />
              {settings.lang === 'TH' ? 'ปรับเปลี่ยนภาษา (Language)' : 'System Language'}
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => updateSetting('lang', 'TH')}
                className={`py-1.5 px-3 border rounded-lg text-xs font-semibold flex items-center justify-between cursor-pointer ${
                  settings.lang === 'TH'
                    ? 'border-blue-500 bg-blue-50 text-blue-900'
                    : 'border-gray-200 text-gray-500 hover:bg-gray-50'
                }`}
              >
                <span>ภาษาไทย 🇹🇭</span>
                {settings.lang === 'TH' && <Check className="w-3 h-3 text-blue-600" />}
              </button>
              <button
                onClick={() => updateSetting('lang', 'EN')}
                className={`py-1.5 px-3 border rounded-lg text-xs font-semibold flex items-center justify-between cursor-pointer ${
                  settings.lang === 'EN'
                    ? 'border-blue-500 bg-blue-50 text-blue-900'
                    : 'border-gray-200 text-gray-500 hover:bg-gray-50'
                }`}
              >
                <span>English 🇬🇧</span>
                {settings.lang === 'EN' && <Check className="w-3 h-3 text-blue-600" />}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
