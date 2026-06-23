/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { ORGANIZATION_MEMBERS } from '../constants';
import { EmployeeNode, UserSettings, Language } from '../types';
import { Search, Mail, Phone, BadgeCheck, X, Briefcase, Award, Check } from 'lucide-react';

interface OrgChartProps {
 settings: UserSettings;
}

export default function OrgChart({ settings }: OrgChartProps) {
 const lang = settings.lang;
 const [searchTerm, setSearchTerm] = useState('');
 const [selectedDept, setSelectedDept] = useState<string>('All');
 const [selectedMember, setSelectedMember] = useState<EmployeeNode | null>(null);
 
 // Auditing inquiry states
 const [inquirySent, setInquirySent] = useState(false);
 const [inquiryName, setInquiryName] = useState('');
 const [inquiryMessage, setInquiryMessage] = useState('');

 // Extract all departments for filter list
 const departments = ['All', 'Executive', 'Auditing', 'Technical', 'Sales', 'Admin'];

 // Identify matching nodes based on search or skills
 const filteredMembers = useMemo(() => {
 return ORGANIZATION_MEMBERS.map((member) => {
 const isMatch =
 searchTerm === '' ||
 member.nameTH.toLowerCase().includes(searchTerm.toLowerCase()) ||
 member.nameEN.toLowerCase().includes(searchTerm.toLowerCase()) ||
 member.roleTH.toLowerCase().includes(searchTerm.toLowerCase()) ||
 member.roleEN.toLowerCase().includes(searchTerm.toLowerCase()) ||
 member.certifications.some((cert) =>
 cert.toLowerCase().includes(searchTerm.toLowerCase())
 );

 const matchesDept = selectedDept === 'All' || member.department === selectedDept;

 return {
 ...member,
 highlighted: isMatch && searchTerm !== '',
 visible: matchesDept && (searchTerm === '' || isMatch)
 };
 });
 }, [searchTerm, selectedDept]);

 // CEO is root node or find nodes without parentId
 const rootNodes = useMemo(() => {
 return filteredMembers.filter((m) => !m.parentId && m.visible);
 }, [filteredMembers]);

 // Recursively find children nodes
 const getChildrenOf = (parentId: string) => {
 return filteredMembers.filter((m) => m.parentId === parentId && m.visible);
 };

 const handleSendInquiry = (e: React.FormEvent) => {
 e.preventDefault();
 setInquirySent(true);
 setTimeout(() => {
 setInquirySent(false);
 setInquiryName('');
 setInquiryMessage('');
 }, 4000);
 };

 return (
 <div className="space-y-8">
 {/* Introduction Banner */}
 <div className="text-center max-w-2xl mx-auto space-y-3">
 <h2 className="text-2xl md:text-3xl font-bold font-display tracking-tight text-gray-900 dark:text-white">
 {lang === 'TH' ? 'ผังโครงสร้างบุคลากรและคณะผู้ตรวจ' : 'Executive & Assessor Structure'}
 </h2>
 <p className="text-sm text-gray-700 dark:text-slate-400 font-sans">
 {lang === 'TH'
 ? 'ตรวจสอบความถูกต้องและประสิทธิภาพของกระบวนการ ด้วยทีมงานผู้รับการรับรองตามหลักมาตรฐานสากล IRCA และมีประสบการณ์ตรวจประเมินอุตสาหกรรมในไทยกว่า 20 ปี'
 : 'Explore our multi-tier organizational board, technical auditors, and accredited registry experts certified under IRCA guidelines with active fields work since 2006.'}
 </p>
 </div>

 {/* Control panel & Filter */}
 <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 flex flex-col md:flex-row gap-4 justify-between items-center max-w-4xl mx-auto">
 {/* Search */}
 <div className="relative w-full md:w-80">
 <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
 <Search className="h-4 w-4 text-gray-600 dark:text-slate-500" />
 </span>
 <input
 type="text"
 placeholder={
 lang === 'TH'
 ? 'ค้นหาชื่อ คณะตรวจ ISO 27001, QMS...'
 : 'Search name, ISO 27001 auditor...'
 }
 value={searchTerm}
 onChange={(e) => setSearchTerm(e.target.value)}
 className="block w-full pl-10 pr-4 py-2 text-xs bg-white/40 backdrop-blur-[35px] border border-white/40 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] dark:bg-slate-900/40 dark:border-white/20 dark:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.2)] border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder-gray-400 font-sans"
 />
 {searchTerm && (
 <button
 onClick={() => setSearchTerm('')}
 className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 dark:text-slate-500 hover:text-gray-800 dark:text-slate-300 text-xs"
 >
 ✕
 </button>
 )}
 </div>

 {/* Filter categories */}
 <div className="flex gap-1 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
 {departments.map((dept) => (
 <button
 key={dept}
 onClick={() => setSelectedDept(dept)}
 className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
 selectedDept === dept
 ? 'bg-blue-600 text-white shadow-sm'
 : ' bg-white/40 backdrop-blur-[35px] border border-white/40 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] dark:bg-slate-900/40 dark:border-white/20 dark:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.2)] hover:bg-gray-100 text-gray-800 dark:text-slate-300 border-transparent'
 }`}
 >
 {lang === 'TH'
 ? dept === 'All' ? 'ทั้งหมด' :
 dept === 'Executive' ? 'ฝ่ายบริหาร' :
 dept === 'Auditing' ? 'ฝ่ายตรวจประเมิน' :
 dept === 'Technical' ? 'ฝ่ายเทคนิค/วิชาการ' :
 dept === 'Sales' ? 'ฝ่ายบริการลูกค้า' : 'ฝ่ายทะเบียน'
 : dept}
 </button>
 ))}
 </div>
 </div>

 {/* Visually stunning interactive layout Tree or Grid (combines both for responsiveness) */}
 <div className="p-4 overflow-x-auto rounded-3xl bg-white/40 backdrop-blur-[35px] border border-white/40 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] dark:bg-slate-900/40 dark:border-white/20 dark:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.2)] border shadow-inner flex flex-col justify-center items-center min-h-[400px]">
 {rootNodes.length === 0 ? (
 <div className="text-center py-12 text-gray-600 dark:text-slate-500 font-sans">
 <Briefcase className="w-12 h-12 mx-auto stroke-1 mb-2 text-gray-300" />
 <p className="text-xs">
 {lang === 'TH' ? 'ไม่พบบุคลากรที่ตรงตามการค้นหาของคุณ' : 'No staff members found matching specifications.'}
 </p>
 </div>
 ) : (
 <div className="flex flex-col items-center gap-12 w-full min-w-[700px] py-4">
 {rootNodes.map((root) => (
 <div key={root.id} className="flex flex-col items-center w-full">
 {/* ROOT Node (CEO/Managing Director) */}
 <EmployeeCardNode
 node={root}
 lang={lang}
 onClick={() => setSelectedMember(root)}
 />

 {/* Vertical Connector Line */}
 {getChildrenOf(root.id).length > 0 && (
 <div className="w-0.5 h-10 bg-blue-100 relative">
 <div className="absolute top-0 bottom-0 left-[-4px] right-[-4px] m-auto w-2.5 h-2.5 rounded-full bg-blue-500 border-2 border-white"></div>
 </div>
 )}

 {/* LEVEL 1 Children Container */}
 {getChildrenOf(root.id).length > 0 && (
 <div className="flex justify-center gap-8 relative pt-6 border-t-2 border-dashed border-blue-100/80 rounded-t-xl px-10">
 {getChildrenOf(root.id).map((member) => (
 <div key={member.id} className="flex flex-col items-center relative">
 {/* Connecting branch to card top */}
 <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-0.5 h-6 bg-blue-100"></div>

 <EmployeeCardNode
 node={member}
 lang={lang}
 onClick={() => setSelectedMember(member)}
 />

 {/* Level 2 Sub-Children Vertical Line */}
 {getChildrenOf(member.id).length > 0 && (
 <div className="w-0.5 h-10 bg-blue-100"></div>
 )}

 {/* LEVEL 2 Sub-Children Container */}
 {getChildrenOf(member.id).length > 0 && (
 <div className="flex justify-center gap-4 pt-6 border-t border-blue-100 rounded-t-md px-4">
 {getChildrenOf(member.id).map((subMember) => (
 <div key={subMember.id} className="flex flex-col items-center relative">
 <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-0.5 h-6 bg-blue-100"></div>
 <EmployeeCardNode
 node={subMember}
 lang={lang}
 mini
 onClick={() => setSelectedMember(subMember)}
 />
 </div>
 ))}
 </div>
 )}
 </div>
 ))}
 </div>
 )}
 </div>
 ))}
 </div>
 )}
 </div>

 {/* Staff profile detail & simulated scheduler modal */}
 {selectedMember && (
 <div className="fixed inset-0 bg-black/65 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
 <div className="bg-white/40 backdrop-blur-[35px] border border-white/40 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] dark:bg-slate-900/40 dark:border-white/20 dark:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.2)] rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl relative border flex flex-col md:flex-row animate-in zoom-in-95 duration-200">
 {/* Left Photo & Badging Info */}
 <div className="w-full md:w-2/5 bg-gray-50 p-6 border-b md:border-b-0 md:border-r border-gray-100 relative flex flex-col items-center justify-center gap-4">
 <button
 onClick={() => setSelectedMember(null)}
 className="absolute top-4 left-4 p-1.5 rounded-full bg-white/40 backdrop-blur-[35px] border border-white/40 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] dark:bg-slate-900/40 dark:border-white/20 dark:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.2)] text-gray-700 dark:text-slate-400 hover:text-gray-800 dark:text-slate-100 border md:hidden cursor-pointer"
 >
 <X className="w-4 h-4" />
 </button>

 <div className="w-28 h-28 rounded-2xl overflow-hidden shadow-md ring-4 ring-blue-500/20 object-cover">
 <img
 src={selectedMember.avatarUrl}
 alt={selectedMember.nameEN}
 className="w-full h-full object-cover"
 />
 </div>

 <div className="text-center">
 <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-blue-50 text-blue-800 border border-blue-100">
 {selectedMember.department} Division
 </span>
 <p className="text-xs text-gray-600 dark:text-slate-500 font-sans mt-2">{selectedMember.email}</p>
 <p className="text-[11px] text-gray-600 dark:text-slate-500 font-sans">{selectedMember.phone}</p>
 </div>

 {/* Accreditations / Certifications lists */}
 <div className="w-full space-y-1.5 pt-3 border-t border-gray-200/60">
 <span className="text-[10px] font-bold uppercase text-gray-600 dark:text-slate-500 tracking-wider block">
 {lang === 'TH' ? 'ความเชี่ยวชาญ / ทะเบียนหลัก' : 'Registry / Certifications'}
 </span>
 <div className="space-y-1">
 {selectedMember.certifications.map((cert) => (
 <div key={cert} className="flex items-center gap-1.5 text-xs text-gray-800 dark:text-slate-300 font-sans">
 <BadgeCheck className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
 <span className="line-clamp-1">{cert}</span>
 </div>
 ))}
 </div>
 </div>
 </div>

 {/* Right Audit Proposal scheduler form */}
 <div className="w-full md:w-3/5 p-6 flex flex-col justify-between">
 <div>
 <div className="flex justify-between items-start mb-4">
 <div>
 <h3 className="font-display font-bold text-lg text-gray-900 dark:text-white leading-tight">
 {lang === 'TH' ? selectedMember.nameTH : selectedMember.nameEN}
 </h3>
 <p className="text-xs text-blue-600 font-bold tracking-wide mt-1">
 {lang === 'TH' ? selectedMember.roleTH : selectedMember.roleEN}
 </p>
 </div>
 <button
 onClick={() => setSelectedMember(null)}
 className="p-1.5 rounded-full bg-gray-50 text-gray-600 dark:text-slate-500 hover:text-gray-800 dark:text-slate-100 border border-gray-100 hidden md:block cursor-pointer"
 >
 <X className="w-4 h-4" />
 </button>
 </div>

 <div className="space-y-4">
 <div className="p-3 bg-blue-50/50 border border-blue-100 rounded-xl">
 <p className="text-[11px] text-blue-800 font-sans leading-relaxed">
 💡 <strong>{lang === 'TH' ? 'การติดต่อคณะผู้ตรวจ:' : 'Assessor Direct Inquiry:'}</strong>{' '}
 {lang === 'TH'
 ? 'คุณสามารถขอเข้าประกบตรวจประเมินเบื้องต้น หรือขอคำแนะนำในหลักสูตรอบรม ISO ได้รับการแนะนำโดยตรง'
 : 'Submit a certified scheduling inquiry to coordinate Stage 1 document evaluation or certified corporate seminar leads.'}
 </p>
 </div>

 {/* simulated scheduler form */}
 <form onSubmit={handleSendInquiry} className="space-y-3 pt-1">
 <div>
 <label className="block text-[10px] font-bold text-gray-600 dark:text-slate-500 uppercase tracking-wider mb-1">
 {lang === 'TH' ? 'ชื่อผู้ติดต่อ / บริษัท' : 'Your Name / Org Name'}
 </label>
 <input
 type="text"
 required
 value={inquiryName}
 onChange={(e) => setInquiryName(e.target.value)}
 placeholder="John Doe Co., Ltd."
 className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 font-sans"
 />
 </div>
 <div>
 <label className="block text-[10px] font-bold text-gray-600 dark:text-slate-500 uppercase tracking-wider mb-1">
 {lang === 'TH' ? 'รายละเอียดหัวข้อรับคำแนะนำ' : 'Standards of Interest or Scope message'}
 </label>
 <textarea
 required
 rows={3}
 value={inquiryMessage}
 onChange={(e) => setInquiryMessage(e.target.value)}
 placeholder={
 lang === 'TH'
 ? 'ต้องการประเมินขอบข่ายการผลิตอาหารแช่แข็ง และการขอใบรับรอง ISO 9001 มิตรสู่ชุมชน...'
 : 'Requesting certified team alignment for integrated quality and env audits...'
 }
 className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 font-sans"
 ></textarea>
 </div>

 <button
 type="submit"
 disabled={inquirySent}
 className="w-full py-2 bg-gray-900 hover:bg-gray-800 text-white font-semibold text-xs rounded-xl tracking-wider uppercase transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
 >
 {inquirySent ? (
 <>
 <Check className="w-4 h-4 text-blue-400" />
 <span>{lang === 'TH' ? 'ส่งคำร้องสำเร็จแล้ว!' : 'Enquiry Scheduled!'}</span>
 </>
 ) : (
 <span>{lang === 'TH' ? 'ส่งคำขอนัดตรวจประเมิน' : 'Schedule Assessment Meeting'}</span>
 )}
 </button>
 </form>
 </div>
 </div>

 <p className="text-[10px] text-gray-600 dark:text-slate-500 font-sans border-t border-gray-100 pt-3 text-center mt-3">
 {lang === 'TH'
 ? 'เอกสารที่ส่งผ่านตรงเข้าสู่ระบบ CRM ของ QAIC Thailand'
 : 'Data handled securely under QAIC Privacy Code (TH/UK_2026).'}
 </p>
 </div>
 </div>
 </div>
 )}
 </div>
 );
}

/* Sub helper Component represent an Employee card inside the visual tree */
interface EmployeeCardNodeProps {
 node: EmployeeNode & { highlighted?: boolean };
 lang: Language;
 mini?: boolean;
 onClick: () => void;
}

function EmployeeCardNode({ node, lang, mini = false, onClick }: EmployeeCardNodeProps) {
 // Border style representing highlight
 const highlightClass = node.highlighted
 ? 'ring-4 ring-amber-400 scale-105 border-transparent animate-pulse'
 : 'border-gray-200/80 hover:border-blue-400 hover:shadow-xl hover:scale-102';

 const deptColors = {
 Executive: 'bg-blue-600',
 Auditing: 'bg-blue-600',
 Technical: 'bg-indigo-600',
 Sales: 'bg-amber-600',
 Admin: 'bg-gray-600'
 };

 const badgeColor = deptColors[node.department] || 'bg-gray-500';

 return (
 <div
 onClick={onClick}
 className={`bg-white/40 backdrop-blur-[35px] border border-white/40 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] dark:bg-slate-900/40 dark:border-white/20 dark:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.2)] border rounded-2xl cursor-pointer p-4 transition-all duration-150 flex items-center gap-3 w-72 h-24 ${highlightClass}`}
 >
 <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-gray-100 flex-shrink-0 bg-gray-50">
 <img src={node.avatarUrl} alt={node.nameEN} className="w-full h-full object-cover" />
 <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${badgeColor}`}></span>
 </div>

 <div className="overflow-hidden space-y-0.5">
 <span className="text-[9px] font-bold text-gray-600 dark:text-slate-500 uppercase tracking-widest block">
 {node.department} Division
 </span>
 <h4 className="text-xs font-bold text-gray-900 dark:text-white leading-tight line-clamp-1">
 {lang === 'TH' ? node.nameTH : node.nameEN}
 </h4>
 <p className="text-[10px] text-blue-600 leading-tight font-medium line-clamp-1 font-sans">
 {lang === 'TH' ? node.roleTH : node.roleEN}
 </p>

 {node.certifications.length > 0 && (
 <div className="flex gap-1 overflow-hidden pt-1">
 {node.certifications.slice(0, 2).map((cert, idx) => (
 <span
 key={idx}
 className="inline-block bg-gray-50 text-gray-700 dark:text-slate-400 text-[8px] px-1 py-0.5 rounded border border-gray-100 line-clamp-1 max-w-[90px]"
 >
 {cert}
 </span>
 ))}
 </div>
 )}
 </div>
 </div>
 );
}
