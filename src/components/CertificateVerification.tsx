/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { UserSettings } from '../types';
import {
 Search,
 CheckCircle2,
 AlertCircle,
 XCircle,
 FileText,
 Plus,
 ArrowRight,
 ShieldCheck,
 Award,
 QrCode,
 Printer,
 ChevronDown,
 RefreshCw,
 MapPin,
 Building2,
 Calendar,
 Zap,
 Mail,
 Phone,
 User,
 Check,
 Tag,
 AlertTriangle,
 ExternalLink
} from 'lucide-react';

interface CertificateVerificationProps {
 settings: UserSettings;
}

interface ClientCertificate {
 certificateNo: string;
 companyNameTH: string;
 companyNameEN: string;
 standard: string;
 scopeTH: string;
 scopeEN: string;
 issueDate: string;
 expiryDate: string;
 status: 'Active' | 'Suspended' | 'Expired';
 country: string;
 provinceTH: string;
 provinceEN: string;
 category: 'TAS' | 'ISO 9001' | 'ISO 14001' | 'ISO 27001' | 'HACCP/GHP' | 'GDP';
 authorizedSignatory: string;
}

// Complete localized database of certified clients & Thailand Agricultural Standard (มกษ.) focus
const ENRICHED_CLIENTS: ClientCertificate[] = [
 {
 certificateNo: 'QAIC-TAS-904601',
 companyNameTH: 'สหกรณ์การเกษตรหลังสวน จำกัด',
 companyNameEN: 'Chumphon Agricultural Cooperative Ltd.',
 standard: 'มกษ. 9046-2560',
 scopeTH: 'การรวบรวม การคัดแยกเกรด ปอกเปลือก และบรรจุแช่เยือกแข็งทุเรียนหมอนทอง (IQF) เพื่อการส่งออก',
 scopeEN: 'Procurement, grading, peeling, and individual quick freezing (IQF) packaging of Monthong Durian for global export.',
 issueDate: '2024-05-12',
 expiryDate: '2027-05-11',
 status: 'Active',
 country: 'Thailand',
 provinceTH: 'ชุมพร',
 provinceEN: 'Chumphon',
 category: 'TAS',
 authorizedSignatory: 'ดร. อนิรุทธ์ รัตนพิมล (CEO)'
 },
 {
 certificateNo: 'QAIC-TAS-440312',
 companyNameTH: 'วิสาหกิจชุมชนแปรรูปข้าวอินทรีย์พญาเม็งราย',
 companyNameEN: 'Phaya Mengrai Organic Rice Community Enterprise',
 standard: 'มกษ. 4403-2564',
 scopeTH: 'การขัดสีข้าวเปลือกออร์แกนิค คัดแยกสิ่งเจือปน บรรจุถุงสูญญากาศ ข้าวหอมมะลิ 105 และข้าวไรซ์เบอร์รี่',
 scopeEN: 'Organic paddy milling, impurity sorting, and vacuum packaging of Jasmine Rice 105 and Riceberry.',
 issueDate: '2024-02-15',
 expiryDate: '2027-02-14',
 status: 'Active',
 country: 'Thailand',
 provinceTH: 'เชียงราย',
 provinceEN: 'Chiang Rai',
 category: 'TAS',
 authorizedSignatory: 'ดร. อนิรุทธ์ รัตนพิมล (CEO)'
 },
 {
 certificateNo: 'QAIC-TAS-640145',
 companyNameTH: 'สหกรณ์โคนมปากช่อง จำกัด',
 companyNameEN: 'Pakchong Dairy Cooperative Ltd.',
 standard: 'มกษ. 6401-2558',
 scopeTH: 'การรับและรวบรวมน้ำนมดิบ การคัดกรองควบคุมอุณหภูมิ และจัดเก็บในถังบรรจุสะอาดกระจายป้อนโรงงานพาสเจอร์ไรส์',
 scopeEN: 'Raw milk collection, density & thermal testing, storage in chilled sanitary tanks, and bulk distribution.',
 issueDate: '2023-08-20',
 expiryDate: '2026-08-19',
 status: 'Active',
 country: 'Thailand',
 provinceTH: 'นครราชสีมา',
 provinceEN: 'Nakhon Ratchasima',
 category: 'TAS',
 authorizedSignatory: 'ดร. อนิรุทธ์ รัตนพิมล (CEO)'
 },
 {
 certificateNo: 'QAIC-TAS-902367',
 companyNameTH: 'วิสาหกิจประมงชายฝั่งปากพนังแปรรูปสัตว์น้ำ',
 companyNameEN: 'Pak Phanang Coastal Fishery Enterprise',
 standard: 'มกษ. 9023-2550',
 scopeTH: 'การแช่แข็งกุ้งกุลาดำสด เนื้อปลากะพงหั่นชิ้น และบรรจุภัณฑ์อาหารทะเลถนอมอาหารแปรรูปส่งออก',
 scopeEN: 'Freezing of fresh black tiger prawns, pre-cut sea bass fillet, and vacuum seal preservation for Pacific markets.',
 issueDate: '2023-11-05',
 expiryDate: '2026-11-04',
 status: 'Active',
 country: 'Thailand',
 provinceTH: 'นครศรีธรรมราช',
 provinceEN: 'Nakhon Si Thammarat',
 category: 'TAS',
 authorizedSignatory: 'ดร. อนิรุทธ์ รัตนพิมล (CEO)'
 },
 {
 certificateNo: 'QAIC-TH-9001-2045',
 companyNameTH: 'บริษัท อาหารไทยก้าวหน้า จำกัด (มหาชน)',
 companyNameEN: 'Thai Progressive Foods Public Company Limited',
 standard: 'ISO 9001:2015',
 scopeTH: 'การจัดหา จัดเตรียม บรรจุ และกระจายผลิตภัณฑ์อาหารทะเลแช่แข็งและอาหารแปรรูปสำเร็จรูป',
 scopeEN: 'Procurement, preparation, packaging, and distribution of frozen seafood and ready-to-eat processed meals.',
 issueDate: '2023-04-12',
 expiryDate: '2026-04-11',
 status: 'Active',
 country: 'Thailand',
 provinceTH: 'ฉะเชิงเทรา',
 provinceEN: 'Chachoengsao',
 category: 'ISO 9001',
 authorizedSignatory: 'ดร. อนิรุทธ์ รัตนพิมล (CEO)'
 },
 {
 certificateNo: 'QAIC-TH-14125',
 companyNameTH: 'บริษัท พลังงานบริสุทธิ์ไทยแลนด์ จำกัด',
 companyNameEN: 'Clean Energy Thailand Co., Ltd.',
 standard: 'ISO 14001:2015',
 scopeTH: 'การออกแบบ ติดตั้ง และการบำรุงรักษาโรงผลิตไฟฟ้าจากแผงโซลาร์พลังงานแสงอาทิตย์บนหลังคาอาคารอุตสาหกรรม',
 scopeEN: 'Design, installation, and maintenance of rooftop solar panel power generating facilities for industrial use.',
 issueDate: '2024-01-08',
 expiryDate: '2027-01-07',
 status: 'Active',
 country: 'Thailand',
 provinceTH: 'ชลบุรี',
 provinceEN: 'Chonburi',
 category: 'ISO 14001',
 authorizedSignatory: 'ดร. อนิรุทธ์ รัตนพิมล (CEO)'
 },
 {
 certificateNo: 'QAIC-TH-27001-99',
 companyNameTH: 'บริษัท เทคโซลูชันส์ดีเวลลอปเมนท์ จำกัด',
 companyNameEN: 'TechSolutions Development Co., Ltd.',
 standard: 'ISO 27001:2022',
 scopeTH: 'การทำงานของระบบคลาวด์ข้อมูล การบริการโครงสร้างไอที และซอฟต์แวร์ประมวลการประมูลภาษี',
 scopeEN: 'The operations of data cloud hosting backend, IT infrastructure services, and tax-bidding software processing.',
 issueDate: '2025-05-10',
 expiryDate: '2028-05-09',
 status: 'Active',
 country: 'Thailand',
 provinceTH: 'กรุงเทพมหานคร',
 provinceEN: 'Bangkok',
 category: 'ISO 27001',
 authorizedSignatory: 'คุณภรณี วัฒนพงศ์สกุล (Technical Director)'
 },
 {
 certificateNo: 'QAIC-TH-FOOD-HACCP',
 companyNameTH: 'ห้างหุ้นส่วนจำกัด ครัวจอมทองเฮลธ์แคร์',
 companyNameEN: 'Jomthong Healthcare Kitchen LP',
 standard: 'HACCP & GHPs (Codex)',
 scopeTH: 'การปรุงอาหาร โรงครัวจัดเตรียมอาหาร และกระจายสู่ห้องผู้ป่วยหนักในเขตภาคกลางประเทศไทย',
 scopeEN: 'The cooking, kitchen-preparation, and secure distribution of patients meals to intensive care units in Central Thailand.',
 issueDate: '2023-11-20',
 expiryDate: '2026-11-19',
 status: 'Active',
 country: 'Thailand',
 provinceTH: 'สมุทรสาคร',
 provinceEN: 'Samut Sakhon',
 category: 'HACCP/GHP',
 authorizedSignatory: 'ดร. อนิรุทธ์ รัตนพิมล (CEO)'
 },
 {
 certificateNo: 'QAIC-TH-GDP-1025',
 companyNameTH: 'บริษัท เมดิคอลอินสตรูเมนท์ซัพพลายส์ จำกัด',
 companyNameEN: 'Medical Instruments Supplies Co., Ltd.',
 standard: 'GDP (Good Distribution Practice)',
 scopeTH: 'การจัดเก็บ คลังสินค้าสินค้าควบคุมอุณหภูมิ และขนส่งเข็มฉีดยา นวัตกรรมอวัยวะเทียมสลายในร่างกาย ยารักษาโรคชีววัตถุ',
 scopeEN: 'The temperature-controlled warehousing and shipping of surgical needles, bioresorbable implants, and biotherapeutics.',
 issueDate: '2024-06-15',
 expiryDate: '2027-06-14',
 status: 'Active',
 country: 'Thailand',
 provinceTH: 'นนทบุรี',
 provinceEN: 'Nonthaburi',
 category: 'GDP',
 authorizedSignatory: 'คุณภรณี วัฒนพงศ์สกุล (Technical Director)'
 },
 // Expired Items for Renewal Action Test
 {
 certificateNo: 'QAIC-TAS-904688',
 companyNameTH: 'กลุ่มสวนผลไม้แปลงใหญ่พัทลุง (แปรรูปมังคุดและทุเรียน)',
 companyNameEN: 'Phatthalung Fruit Orchard Growers Group',
 standard: 'มกษ. 9046-2560',
 scopeTH: 'การรวบรวม คัดขนาดเกรด ทุเรียนสดบรรจุกล่อง และส่งมอบตู้คอนเทนเนอร์ควบคุมอุณหภูมิเพื่อการส่งออกต่างประเทศ',
 scopeEN: 'Collection, sorting, fresh durian carton packaging, and delivery via temperature controlled containers for overseas export.',
 issueDate: '2021-03-10',
 expiryDate: '2024-03-09',
 status: 'Expired',
 country: 'Thailand',
 provinceTH: 'พัทลุง',
 provinceEN: 'Phatthalung',
 category: 'TAS',
 authorizedSignatory: 'ดร. อนิรุทธ์ รัตนพิมล (CEO)'
 },
 {
 certificateNo: 'QAIC-TAS-440311',
 companyNameTH: 'โรงสีข้าวรวมน้ำใจพัฒนาทุ่งกุลา',
 companyNameEN: 'Thung Kula Joint Rice Mill Cooperative',
 standard: 'มกษ. 4403-2564',
 scopeTH: 'โรงรับซื้อข้าวเปลือก ตรวจสิ่งเจือปน ขัดข้าวขาวหอมมะลิร้อยเอ็ด และบรรจุถุงส่งจำหน่ายโมเดิร์นเทรด',
 scopeEN: 'Paddy purchase center, quality screening, milling of premium jasmine rice, and retail-grade vacuum packing.',
 issueDate: '2021-05-15',
 expiryDate: '2024-05-14',
 status: 'Expired',
 country: 'Thailand',
 provinceTH: 'ร้อยเอ็ด',
 provinceEN: 'Roi Et',
 category: 'TAS',
 authorizedSignatory: 'ดร. อนิรุทธ์ รัตนพิมล (CEO)'
 },
 {
 certificateNo: 'QAIC-TH-SUSPEND-XM',
 companyNameTH: 'บริษัท ยานยนต์ดั้งเดิมอุตสาหกรรม จำกัด',
 companyNameEN: 'Traditional Automotives Industrial Ltd.',
 standard: 'ISO 9001:2015',
 scopeTH: 'การหล่อเหล็กประกอบแม่พิมพ์ช่วงล่าง และน็อตเพลาขับสากล',
 scopeEN: 'Casting of steel for chassis molds and drive shaft nuts.',
 issueDate: '2020-03-01',
 expiryDate: '2023-02-28',
 status: 'Suspended',
 country: 'Thailand',
 provinceTH: 'ระยอง',
 provinceEN: 'Rayong',
 category: 'ISO 9001',
 authorizedSignatory: 'ดร. อนิรุทธ์ รัตนพิมล (CEO)'
 },
 {
 certificateNo: 'QAIC-TH-EXPIRED-99',
 companyNameTH: 'สำนักพิมพ์ มหาวิทยาลัยนิติกาล',
 companyNameEN: 'Nitikarn University Press Office',
 standard: 'ISO 9001:2015',
 scopeTH: 'การรับจ้างจัดพิมพ์ ผลิตตำราวิชาการ และหนังสืออิเล็กทรอนิกส์ด้านกฎหมายเอกภาพรัฐ',
 scopeEN: 'Printing contract work, manufacturing academic textbook materials, and electronic publications.',
 issueDate: '2019-12-01',
 expiryDate: '2022-11-30',
 status: 'Expired',
 country: 'Thailand',
 provinceTH: 'กรุงเทพมหานคร',
 provinceEN: 'Bangkok',
 category: 'ISO 9001',
 authorizedSignatory: 'ดร. อนิรุทธ์ รัตนพิมล (CEO)'
 }
];

export default function CertificateVerification({ settings }: CertificateVerificationProps) {
 const lang = settings.lang;
 
 // States
 const [searchQuery, setSearchQuery] = useState('');
 const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Expired'>('All');
 const [categoryFilter, setCategoryFilter] = useState<string>('All');
 const [activeCert, setActiveCert] = useState<ClientCertificate | null>(null);
 const [customCertificates, setCustomCertificates] = useState<ClientCertificate[]>([]);
 const [certLayout, setCertLayout] = useState<'digital' | 'paper'>('paper');

 const getStandardLogo = (category: string) => {
 switch (category) {
 case 'ISO 9001': return '/logoมาตรฐาน/4.png';
 case 'ISO 14001': return '/logoมาตรฐาน/5.png';
 case 'ISO 27001': return '/logoมาตรฐาน/6.png';
 case 'HACCP/GHP': return '/logoมาตรฐาน/7.png';
 case 'GDP': return '/logoมาตรฐาน/8.png';
 case 'TAS': return '/logoมาตรฐาน/9.png';
 default: return '/logoมาตรฐาน/10.png';
 }
 };
 
 // Renewal request modal state
 const [renewalClient, setRenewalClient] = useState<ClientCertificate | null>(null);
 const [renewalForm, setRenewalForm] = useState({ name: '', phone: '', email: '', notes: '' });
 const [isSubmittingRenewal, setIsSubmittingRenewal] = useState(false);
 const [isRenewalSubmitted, setIsRenewalSubmitted] = useState(false);

 // Mint sandbox state
 const [customCompanyName, setCustomCompanyName] = useState('');
 const [customStandard, setCustomStandard] = useState('ISO 9001:2015');
 const [customScope, setCustomScope] = useState('');
 const [customProvince, setCustomProvince] = useState('กรุงเทพมหานคร');
 const [isGenerating, setIsGenerating] = useState(false);
 const [generatedMsg, setGeneratedMsg] = useState(false);

 // Helper localizer
 const t = (th: string, en: string) => (lang === 'TH' ? th : en);

 // Pool combination
 const databasePool = useMemo(() => {
 return [...customCertificates, ...ENRICHED_CLIENTS];
 }, [customCertificates]);

 // Filters calculation
 const filteredClients = useMemo(() => {
 return databasePool.filter((client) => {
 // 1. Status Filter
 if (statusFilter === 'Active') {
 if (client.status !== 'Active') return false;
 } else if (statusFilter === 'Expired') {
 if (client.status !== 'Expired' && client.status !== 'Suspended') return false;
 }

 // 2. Category tag Filter
 if (categoryFilter !== 'All') {
 if (categoryFilter === 'มกษ. (TAS)') {
 if (client.category !== 'TAS') return false;
 } else if (categoryFilter === 'ISO 9001') {
 if (client.category !== 'ISO 9001') return false;
 } else if (categoryFilter === 'ISO 14001') {
 if (client.category !== 'ISO 14001') return false;
 } else if (categoryFilter === 'ISO 27001') {
 if (client.category !== 'ISO 27001') return false;
 } else if (categoryFilter === 'HACCP/GHP') {
 if (client.category !== 'HACCP/GHP') return false;
 } else if (categoryFilter === 'อื่น ๆ / GDP') {
 if (client.category !== 'GDP') return false;
 }
 }

 // 3. Search query match
 if (searchQuery.trim()) {
 const query = searchQuery.toLowerCase().trim();
 const matchesCompany =
 client.companyNameTH.toLowerCase().includes(query) ||
 client.companyNameEN.toLowerCase().includes(query);
 const matchesNo = client.certificateNo.toLowerCase().includes(query);
 const matchesStandard = client.standard.toLowerCase().includes(query);
 const matchesProvince =
 client.provinceTH.toLowerCase().includes(query) ||
 client.provinceEN.toLowerCase().includes(query);
 const matchesScope =
 client.scopeTH.toLowerCase().includes(query) ||
 client.scopeEN.toLowerCase().includes(query);

 return matchesCompany || matchesNo || matchesStandard || matchesProvince || matchesScope;
 }

 return true;
 });
 }, [databasePool, statusFilter, categoryFilter, searchQuery]);

 // Open certificate detail sheets modal
 const openVerificationModal = (client: ClientCertificate) => {
 setActiveCert(client);
 };

 const closeVerificationModal = () => {
 setActiveCert(null);
 };

 // Open renewal flow modal
 const openRenewalModal = (client: ClientCertificate, e: React.MouseEvent) => {
 e.stopPropagation(); // Avoid triggering open modal
 setRenewalClient(client);
 setRenewalForm({
 name: '',
 phone: '',
 email: '',
 notes: `ต้องการขอนัดหมายผู้ตรวจประเมิน เพื่อเข้าทบทวนระบบต่ออายุใบรับรองใบรับรอง ${client.standard} (รหัสอ้างอิงเก่า: ${client.certificateNo}) องค์กร ${client.companyNameTH}`
 });
 setIsRenewalSubmitted(false);
 };

 const submitRenewalRequest = (e: React.FormEvent) => {
 e.preventDefault();
 if (!renewalForm.name || !renewalForm.phone) return;
 setIsSubmittingRenewal(true);
 setTimeout(() => {
 setIsSubmittingRenewal(false);
 setIsRenewalSubmitted(true);
 setTimeout(() => {
 setRenewalClient(null);
 }, 4000);
 }, 1500);
 };

 // Simulated Certificate Printer Play Sandbox Minter
 const handleMintSandboxCert = (e: React.FormEvent) => {
 e.preventDefault();
 if (!customCompanyName.trim()) return;
 setIsGenerating(true);

 setTimeout(() => {
 const isTAS = customStandard.startsWith('มกษ.');
 const cat = isTAS ? 'TAS' : 
 customStandard.includes('9001') ? 'ISO 9001' :
 customStandard.includes('14001') ? 'ISO 14001' :
 customStandard.includes('27001') ? 'ISO 27001' : 'HACCP/GHP';
 
 const randomId = Math.floor(100000 + Math.random() * 900000);
 const generatedCode = isTAS ? `QAIC-TAS-${randomId}` : `QAIC-TH-${randomId}`;

 const today = new Date().toISOString().split('T')[0];
 const expiry = new Date();
 expiry.setFullYear(expiry.getFullYear() + 3);
 const expiryStr = expiry.toISOString().split('T')[0];

 const defaultScopeTH = isTAS 
 ? 'การจัดการกระบวนการวิสาหกิจชุมชนเกษตร คัดเกรด บรรจุมูลค่า และตรวจสอบสิ่งปนเปื้อนเพื่อความปลอดภัยผู้ใช้นานาชาติ'
 : 'การจัดการงานคุณภาพเชิงระบบ คลอบคลุมส่วนงานวิเคราะห์ วางแผน ผลิต ขาย และส่งมอบการบริการที่คุ้มค่าสูงสุด';

 const defaultScopeEN = isTAS
 ? 'Operational guidelines control of agricultural products sorting, sanitary handling, and export tracing compliance.'
 : 'Standard system-wide quality governance, covering design, commercial administration, and logistic security support.';

 const newCert: ClientCertificate = {
 certificateNo: generatedCode,
 companyNameTH: `${customCompanyName} (จำกัด)`,
 companyNameEN: `${customCompanyName} Co., Ltd.`,
 standard: customStandard,
 scopeTH: customScope.trim() || defaultScopeTH,
 scopeEN: `${customCompanyName} custom implementation & ` + defaultScopeEN,
 issueDate: today,
 expiryDate: expiryStr,
 status: 'Active',
 country: 'Thailand',
 provinceTH: customProvince,
 provinceEN: 'Thailand Province',
 category: cat as any,
 authorizedSignatory: 'ดร. ออนิรุทธ์ รัตนพิมล (CEO)'
 };

 setCustomCertificates([newCert, ...customCertificates]);
 setIsGenerating(false);
 setGeneratedMsg(true);
 setCustomCompanyName('');
 setCustomScope('');

 // Open verification visual instantly for user satisfaction
 setActiveCert(newCert);

 setTimeout(() => setGeneratedMsg(false), 5000);
 }, 1200);
 };

 return (
 <div className="space-y-8 animate-fadeIn">
 {/* Intro Metrics Hub Header Section */}
 <div className="bg-gradient-to-br from-gray-900 to-slate-800 rounded-[2rem] p-8 md:p-10 text-white relative overflow-hidden shadow-xl">
 <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent pointer-events-none"></div>
 
 <div className="relative max-w-3xl space-y-4">
 <span className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-semibold uppercase tracking-wider font-sans border border-blue-500/30">
 <ShieldCheck className="w-4 h-4 text-blue-400" />
 {t('ทำเนียบตรวจสอบสิทธิความเป็นผู้ถือใบรับรองวิสาหกิจ', 'Verifiable Accreditation Directory')}
 </span>
 <h2 className="text-3xl md:text-4xl font-display font-medium tracking-tight text-white">
 {t('ทำเนียบผู้ถือใบรับรองและสืบค้นสถานะอัจฉริยะ', 'Certified Clients Directory & Lookup')}
 </h2>
 <p className="text-sm md:text-base text-gray-300 font-sans leading-relaxed">
 {t(
 'ระบบสอยสืบตรวจสอบรายชื่อบริษัทและสหกรณ์เกษตรที่ได้รับอนุมัติผ่านเกณฑ์ตามมาตรฐาน มกษ. ของสำนักงานมาตรฐานสินค้าเกษตรและอาหารแห่งชาติ (มกอช.) และมาตรฐานสากล ISO จากสถาบัน QAIC เพื่อยืนยันความโปร่งใสแก่คู่ค้าและสาธารณชน',
 'Search and verify active certification statuses of Thai agricultural cooperatives, mills, and commercial clients registered under local TAS and global ISO authorities.'
 )}
 </p>
 </div>

 {/* Dynamic Metric Badges - Minimal & Official (Strictly No Telemetry noise) */}
 <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8 pt-6 border-t border-white/10">
 <div className="space-y-1">
 <span className="text-xs text-gray-600 dark:text-slate-500 font-sans">{t('รหัสรับรองทั้งหมด', 'Registry Database Records')}</span>
 <p className="text-xl md:text-2xl font-display font-bold text-white flex items-center gap-2">
 <Building2 className="w-5 h-5 text-blue-400" /> {/* Includes standard + custom sandboxed ones */}
 {databasePool.length + 572}
 </p>
 </div>
 <div className="space-y-1">
 <span className="text-xs text-gray-600 dark:text-slate-500 font-sans">{t('ผ่านการรับรองแล้ว (Active)', 'Active Certified Clients')}</span>
 <p className="text-xl md:text-2xl font-display font-bold text-emerald-400 flex items-center gap-2">
 <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></span>
 {databasePool.filter(c => c.status === 'Active').length + 510}
 </p>
 </div>
 <div className="space-y-1">
 <span className="text-xs text-gray-600 dark:text-slate-500 font-sans">{t('กลุ่มสินค้าเกษตร มกษ. (ACFS)', 'Thai Agricultural TAS')}</span>
 <p className="text-xl md:text-2xl font-display font-bold text-amber-300 flex items-center gap-2">
 <Award className="w-5 h-5 text-amber-300" />
 {databasePool.filter(c => c.category === 'TAS').length + 138}
 </p>
 </div>
 <div className="space-y-1">
 <span className="text-xs text-gray-600 dark:text-slate-500 font-sans">{t('อัตราความน่าเชื่อถือระบบ', 'Validation Guarantee')}</span>
 <p className="text-xl md:text-2xl font-display font-bold text-sky-400 flex items-center gap-2">
 <CheckCircle2 className="w-5 h-5 text-sky-400" />
 100% Secure
 </p>
 </div>
 </div>
 </div>

 {/* Main Directory & Core Tools Panel */}
 <div className="bg-white/40 backdrop-blur-[35px] border border-white/40 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] dark:bg-slate-900/40 dark:border-white/20 dark:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.2)] p-6 md:p-8 rounded-[2rem] border shadow-sm space-y-6">
 
 {/* Supported Standard Logos Showcase Filter Row */}
 <div className="bg-gray-50/50 rounded-2xl p-4 border border-gray-100 space-y-3">
 <span className="text-[10px] font-bold text-gray-600 dark:text-slate-500 uppercase tracking-widest font-sans block text-center md:text-left">
 {t('ขอบข่ายการรับรองมาตรฐานสากลที่สามารถตรวจสอบได้', 'Verified International Standard Registries')}
 </span>
 <div className="flex gap-4 overflow-x-auto py-2 justify-start md:justify-center no-scrollbar">
 {[
 { id: 'ISO 9001', logo: '4.png', label: 'ISO 9001' },
 { id: 'ISO 14001', logo: '5.png', label: 'ISO 14001' },
 { id: 'ISO 27001', logo: '6.png', label: 'ISO 27001' },
 { id: 'HACCP/GHP', logo: '8.png', label: 'HACCP/GHP' },
 { id: 'GDP', logo: '10.png', label: 'GDP' },
 { id: 'TAS', logo: '9.png', label: 'มกษ. (TAS)' }
 ].map((item, idx) => {
 const isSelected = categoryFilter === item.id || (item.id === 'GDP' && categoryFilter === 'อื่น ๆ / GDP') || (item.id === 'TAS' && categoryFilter === 'มกษ. (TAS)');
 return (
 <button
 type="button"
 key={idx}
 onClick={() => {
 if (item.id === 'GDP') setCategoryFilter('อื่น ๆ / GDP');
 else if (item.id === 'TAS') setCategoryFilter('มกษ. (TAS)');
 else setCategoryFilter(item.id);
 }}
 className={`bg-white/40 backdrop-blur-[35px] border border-white/40 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] dark:bg-slate-900/40 dark:border-white/20 dark:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.2)] p-2 rounded-xl border flex flex-col items-center justify-center w-20 h-28 hover:scale-105 transition-all cursor-pointer shadow-sm flex-shrink-0 ${
 isSelected
 ? 'border-blue-500 ring-2 ring-blue-500/10'
 : ''
 }`}
 title={`Filter by ${item.label}`}
 >
 <img src={`/logoมาตรฐาน/${item.logo}`} alt={item.label} className="w-full h-[80%] object-contain" />
 <span className="text-[8px] font-bold text-gray-700 dark:text-slate-400 mt-1">{item.label}</span>
 </button>
 );
 })}
 </div>
 </div>

 {/* Filter Section */}
 <div className="space-y-4 font-sans">
 <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
 {/* Status Tabs with Blinking LED Indicator */}
 <div className="bg-gray-100/80 p-1.5 rounded-2xl flex gap-1.5 w-fit">
 {[
 { id: 'All', labelTH: 'ทั้งหมด', labelEN: 'Show All', color: 'bg-blue-600' },
 { id: 'Active', labelTH: 'ผ่านการรับรองแล้ว (Active)', labelEN: 'Active Standards', color: 'bg-emerald-500', isBlinking: true, ledColor: 'bg-emerald-500' },
 { id: 'Expired', labelTH: 'ใบรับรองหมดอายุ (Expired)', labelEN: 'Expired / Suspended', color: 'bg-red-500', isBlinking: true, ledColor: 'bg-amber-500' }
 ].map((tab) => {
 const isActive = statusFilter === tab.id;
 return (
 <button
 key={tab.id}
 onClick={() => setStatusFilter(tab.id as any)}
 className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-2 cursor-pointer ${
 isActive 
 ? 'bg-gray-900 text-white shadow-sm' 
 : 'text-gray-700 dark:text-slate-400 hover:text-gray-900 dark:text-white'
 }`}
 >
 {tab.isBlinking && (
 <span className="relative flex h-2 w-2">
 <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${tab.ledColor}`}></span>
 <span className={`relative inline-flex rounded-full h-2 w-2 ${tab.ledColor}`}></span>
 </span>
 )}
 <span>{t(tab.labelTH, tab.labelEN)}</span>
 </button>
 );
 })}
 </div>

 {/* Smart Search Query Input Box */}
 <div className="relative w-full md:max-w-md">
 <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
 <Search className="h-4 w-4 text-gray-600 dark:text-slate-500" />
 </span>
 <input
 type="text"
 value={searchQuery}
 onChange={(e) => setSearchQuery(e.target.value)}
 placeholder={t(
 'ค้นหาด่วน: ชื่อองค์กร, รหัสใบรับรอง, พิกัดจังหวัด, หรือรหัสมาตรฐาน มกษ.',
 'Live Search: Company name, standard, code, or province prefix...'
 )}
 className="w-full pl-10 pr-10 py-3 text-xs bg-gray-50 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white/40 backdrop-blur-[35px] border border-white/40 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] dark:bg-slate-900/40 dark:border-white/20 dark:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.2)] font-sans transition-all placeholder:text-gray-600 dark:text-slate-500 shadow-inner"
 />
 {searchQuery && (
 <button 
 onClick={() => setSearchQuery('')}
 className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-700 dark:text-slate-400 hover:text-gray-700 dark:text-slate-200"
 >
 <XCircle className="w-4 h-4 text-gray-600 dark:text-slate-500 hover:text-gray-800 dark:text-slate-300 cursor-pointer" />
 </button>
 )}
 </div>
 </div>

 {/* Category tags Filter Row */}
 <div className="flex items-center gap-2 overflow-x-auto py-1 invisible-scrollbar">
 <span className="text-xs font-bold text-gray-600 dark:text-slate-500 uppercase tracking-wider font-sans whitespace-nowrap mr-1">
 {t('หมวดมาตรฐาน:', 'Sift Category:')}
 </span>
 {[
 'All',
 'มกษ. (TAS)',
 'ISO 9001',
 'ISO 14001',
 'ISO 27001',
 'HACCP/GHP',
 'อื่น ๆ / GDP'
 ].map((cat) => {
 const isActive = categoryFilter === cat;
 return (
 <button
 key={cat}
 onClick={() => setCategoryFilter(cat)}
 className={`px-3.5 py-1.5 text-xs font-medium rounded-full transition-all border whitespace-nowrap cursor-pointer ${
 isActive
 ? 'bg-blue-50 text-blue-700 border-blue-200 font-semibold shadow-sm'
 : ' bg-white/40 backdrop-blur-[35px] border border-white/40 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] dark:bg-slate-900/40 dark:border-white/20 dark:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.2)] text-gray-800 dark:text-slate-300 hover:bg-gray-50'
 }`}
 >
 {cat === 'All' ? t('ทุกมาตรฐาน', 'All Standards') : cat}
 </button>
 );
 })}
 </div>
 </div>

 {/* Directory Results Rendering Area */}
 {filteredClients.length > 0 ? (
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
 {filteredClients.map((client) => {
 const isActiveStatus = client.status === 'Active';
 
 return (
 <div
 key={client.certificateNo}
 onClick={() => openVerificationModal(client)}
 className="group bg-white/40 backdrop-blur-[35px] border border-white/40 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] dark:bg-slate-900/40 dark:border-white/20 dark:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.2)] rounded-3xl border hover:border-blue-200 hover:shadow-xl hover:shadow-gray-200/40 transition-all duration-300 p-5 flex flex-col justify-between cursor-pointer relative overflow-hidden"
 >
 {/* Status Indicator Pill */}
 <div className="flex justify-between items-start gap-2 mb-4">
 <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold ${
 isActiveStatus 
 ? 'bg-emerald-50 text-emerald-800 border border-emerald-100' 
 : 'bg-amber-50 text-amber-800 border border-amber-100'
 }`}>
 <span className={`relative flex h-2 w-2`}>
 <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isActiveStatus ? 'bg-emerald-400' : 'bg-amber-500'}`}></span>
 <span className={`relative inline-flex rounded-full h-2 w-2 ${isActiveStatus ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
 </span>
 <span>{isActiveStatus ? t('ได้รับการรับรองแล้ว', 'Active') : t('ใบรับรองหมดอายุ', 'Expired')}</span>
 </span>

 <span className="text-[10px] font-bold font-mono text-gray-600 dark:text-slate-500 bg-gray-50 px-2 py-0.5 rounded border">
 {client.category}
 </span>
 </div>

 {/* Body Context */}
 <div className="space-y-2">
 <div className="text-xs text-gray-600 dark:text-slate-500 font-sans font-bold flex items-center gap-1">
 <Tag className="w-3.5 h-3.5 text-blue-500" />
 <span>{client.standard}</span>
 </div>

 <h4 className="font-display font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors text-sm line-clamp-1 leading-snug">
 {lang === 'TH' ? client.companyNameTH : client.companyNameEN}
 </h4>
 
 <p className="text-xs text-gray-600 dark:text-slate-500 line-clamp-1 font-sans">
 {lang === 'TH' ? client.companyNameEN : client.companyNameTH}
 </p>

 {/* Meta values */}
 <div className="grid grid-cols-2 gap-2 pt-3 border-t border-gray-50 text-[10.5px] text-gray-700 dark:text-slate-400 font-sans">
 <div className="flex items-center gap-1.5">
 <MapPin className="w-3.5 h-3.5 text-gray-600 dark:text-slate-500 shrink-0" />
 <span className="truncate">{t(client.provinceTH, client.provinceEN)}</span>
 </div>
 <div className="flex items-center gap-1.5 justify-end">
 <Calendar className="w-3.5 h-3.5 text-gray-600 dark:text-slate-500 shrink-0" />
 <span className="truncate">{t(`หมดอายุ: ${client.expiryDate.split('-')[0]}`, `Exp: ${client.expiryDate.split('-')[0]}`)}</span>
 </div>
 </div>
 </div>

 {/* Bottom Actions Frame */}
 <div className="mt-4 pt-3 border-t border-gray-50 flex gap-2">
 <button
 onClick={(e) => {
 e.stopPropagation();
 openVerificationModal(client);
 }}
 className="flex-1 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-xl text-[10.5px] font-bold flex items-center justify-center gap-1 uppercase tracking-wider transition-colors"
 >
 <span>{t('ตรวจใบรับรอง', 'Inspect')}</span>
 <ExternalLink className="w-3 h-3" />
 </button>
 
 {!isActiveStatus && (
 <button
 onClick={(e) => openRenewalModal(client, e)}
 className="py-2 px-3 bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white rounded-xl text-[10.5px] font-black flex items-center justify-center gap-1 transition-all animate-pulse shadow-sm min-w-[100px]"
 >
 <Zap className="w-3 h-3 text-yellow-250 animate-bounce" />
 <span>{t('ต่ออายุพิเศษ', 'Renew Now')}</span>
 </button>
 )}
 </div>
 </div>
 );
 })}
 </div>
 ) : (
 <div className="py-20 text-center border-2 border-dashed border-gray-150 rounded-3xl max-w-xl mx-auto space-y-4">
 <AlertCircle className="w-12 h-12 text-gray-300 mx-auto" />
 <div className="space-y-1">
 <h4 className="font-display font-bold text-gray-700 dark:text-slate-200">{t('ไม่พบบันทึกตรงตามเงื่อนไขค้นหา', 'No Certified Records Match')}</h4>
 <p className="text-xs text-gray-600 dark:text-slate-500 font-sans max-w-md mx-auto">
 {t(
 'กรุณาทดลองพิมพ์หาชื่อชื่อ สหกรณ์ จังหวัดพัทลุง ชุมพร หรือรหัส มกษ.9046 หรือพิมพ์แบรนด์จำลองเพื่อตรวจสอบข้อมูลใหม่อีกครั้ง',
 'Double check spelling filters. Type "DUR01" for durian coop, "เชียงราย" for rice processing, or reset keyword filters.'
 )}
 </p>
 </div>
 <button
 onClick={() => {
 setSearchQuery('');
 setStatusFilter('All');
 setCategoryFilter('All');
 }}
 className="px-5 py-2.5 bg-gray-950 text-white rounded-xl text-xs font-bold hover:bg-gray-850 cursor-pointer transition-colors"
 >
 {t('รีเซ็ตการค้นหาทั้งหมด', 'Clear Search Filters')}
 </button>
 </div>
 )}
 </div>

 {/* FOOTER INTERACTIVE SANDBOX PLAYGROUND */}
 <div className="bg-gray-50 border border-gray-200/60 p-6 md:p-8 rounded-[2.5rem] relative overflow-hidden">
 <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-amber-500/5 via-transparent to-transparent pointer-events-none rounded-bl-full"></div>
 <div className="max-w-3xl space-y-6">
 <div className="space-y-2">
 <span className="text-[10px] font-bold text-amber-600 bg-amber-500/10 px-3 py-1 rounded-full uppercase tracking-widest font-sans inline-block">
 🛠️ {t('ลูกเล่นพิเศษจำลองระบบในแซนด์บ็อกซ์', 'Interactive Sandbox Sandbox Feature')}
 </span>
 <h3 className="text-xl md:text-2xl font-display font-medium text-gray-900 dark:text-white tracking-tight">
 {t('ทดลองจำลองยื่นสมัครเพื่อประทับตราออกใบรับรองดิจิทัล', 'Custom Digital Certificate Generation Simulator')}
 </h3>
 <p className="text-xs text-gray-700 dark:text-slate-400 font-sans max-w-2xl leading-relaxed">
 {t(
 'ระบุชื่อจัดจำลององค์กรออฟไลน์เพื่อสร้างรหัสทดสอบและออกใบประกาศในนาม QAIC ให้ระบบจำลองประมวลขอบข่ายสิทธิประโยชน์เพื่อนำเสนอฝ่ายงานความตระหนักร่วมในองค์กรทันที',
 'Type down your business brand and select standard to dynamically mock-register a verifiable certificate inside our local view. Test and print PDF layout with simulated security stamps.'
 )}
 </p>
 </div>

 <form onSubmit={handleMintSandboxCert} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
 <div className="md:col-span-2 space-y-1.5">
 <label className="text-[10px] font-bold text-gray-600 dark:text-slate-500 uppercase tracking-widest font-sans block">
 {t('ระบุชื่อบริษัทจำลองสำหรับการรับรอง', 'Mock Company Name (TH/EN)')}
 </label>
 <input
 type="text"
 required
 placeholder="Acme Agricultural Exporters CO., Ltd."
 value={customCompanyName}
 onChange={(e) => setCustomCompanyName(e.target.value)}
 className="w-full px-4 py-3 bg-white/40 backdrop-blur-[35px] border border-white/40 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] dark:bg-slate-900/40 dark:border-white/20 dark:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.2)] border rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 font-sans"
 />
 </div>
 
 <div className="space-y-1.5">
 <label className="text-[10px] font-bold text-gray-600 dark:text-slate-500 uppercase tracking-widest font-sans block">
 {t('เลือกประเภทเกณฑ์มาตรฐาน', 'Select Target Standard')}
 </label>
 <select
 value={customStandard}
 onChange={(e) => setCustomStandard(e.target.value)}
 className="w-full px-3 py-3 bg-white/40 backdrop-blur-[35px] border border-white/40 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] dark:bg-slate-900/40 dark:border-white/20 dark:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.2)] border rounded-xl text-xs focus:outline-none font-sans"
 >
 <option value="ISO 9001:2015">ISO 9001:2015</option>
 <option value="มกษ. 9046-2560">มกษ. 9046-2560 (ทุเรียนแช่เยือกแข็ง)</option>
 <option value="มกษ. 4403-2564">มกษ. 4403-2564 (โรงสีข้าว)</option>
 <option value="มกษ. 6401-2558">มกษ. 6401-2558 (ศูนย์นมดิบ)</option>
 <option value="ISO 27001:2022">ISO 27001:2022</option>
 <option value="HACCP & GHPs (Codex)">HACCP & GHPs</option>
 </select>
 </div>

 <div>
 <button
 type="submit"
 disabled={isGenerating}
 className="w-full py-3 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded-xl uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
 >
 {isGenerating ? (
 <>
 <RefreshCw className="w-4 h-4 animate-spin" />
 <span>{t('ประทับตรา...', 'Issuing...')}</span>
 </>
 ) : (
 <>
 <Plus className="w-4 h-4" />
 <span>{t('สร้างและสืบค้น', 'Mock-Issue')}</span>
 </>
 )}
 </button>
 </div>
 </form>

 {generatedMsg && (
 <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-[11px] text-emerald-850 font-sans font-bold flex items-center gap-2 animate-bounce">
 <Check className="w-4 h-4 text-emerald-600" />
 <span>
 {t(
 'สำเร็จ! ออกใบรับรองจำลองและเปิดแผงหน้าต่างตรวจประทับพร้อมลายเซ็นดงแล้ว และได้บรรจุเข้าระบบให้ค้นหาต่อได้ทันที',
 'Mock certification processed securely! View your certificate inside the visual template.'
 )}
 </span>
 </div>
 )}
 </div>
 </div>

 {/* ACTIVE CERTIFICATE VERIFICATION DETAIL MODAL SHEET */}
 {activeCert && (
 <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-md flex flex-col items-center justify-center p-4 overflow-y-auto">
 {/* Layout Toggle Buttons */}
 <div className="flex justify-center gap-2 mb-4 pointer-events-auto relative z-10">
 <button
 type="button"
 onClick={() => setCertLayout('paper')}
 className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
 certLayout === 'paper' 
 ? 'bg-red-800 text-white shadow-md' 
 : ' bg-white/40 backdrop-blur-[35px] border border-white/40 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] dark:bg-slate-900/40 dark:border-white/20 dark:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.2)] text-red-850 border border-red-800 hover:bg-white'
 }`}
 >
 {t('รูปแบบใบจริง (Paper View)', 'Paper Certificate View')}
 </button>
 <button
 type="button"
 onClick={() => setCertLayout('digital')}
 className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
 certLayout === 'digital' 
 ? 'bg-red-800 text-white shadow-md' 
 : ' bg-white/40 backdrop-blur-[35px] border border-white/40 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] dark:bg-slate-900/40 dark:border-white/20 dark:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.2)] text-red-855 border border-red-800 hover:bg-white'
 }`}
 >
 {t('รูปแบบดิจิทัล (Digital View)', 'Digital Data View')}
 </button>
 </div>

 <div className={`relative w-full max-w-xl rounded-2xl overflow-hidden shadow-2xl animate-scaleIn select-none p-6 transition-all duration-300 ${
 certLayout === 'digital' 
 ? 'bg-white/40 backdrop-blur-[35px] border border-white/40 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] dark:bg-slate-900/40 dark:border-white/20 dark:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.2)] border-transparent' 
 : 'bg-[#faf6ee] border-[10px] border-[#991b1b]'
 }`}>
 {/* Close Button top edge outside critical borders */}
 <button
 onClick={closeVerificationModal}
 className="absolute -top-4 -right-4 p-2 bg-red-800 text-white rounded-full hover:bg-red-700 transition-colors shadow-lg cursor-pointer pointer-events-auto z-30"
 >
 <XCircle className="w-5 h-5" />
 </button>

 {certLayout === 'digital' ? (
 /* INNER FORMAL BORDER FRAME "ล้อมกรอบลายดนตรีสีแดงดูเป็นทางการ" */
 <div className="border border-red-800 m-1.5 p-6 rounded-lg relative min-h-[460px] md:min-h-[500px]">
 {/* Corner Traditional Accents */}
 <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-red-800"></div>
 <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-red-800"></div>
 <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-red-800"></div>
 <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-red-800"></div>

 {/* Background Safety Lion Crest Watermark */}
 <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
 <Award className="w-[300px] h-[300px] text-red-900" />
 </div>

 {/* Certificate content */}
 <div className="text-center space-y-6 pt-4 relative z-10">
 {/* Header Section representing official CB */}
 <div className="space-y-1">
 <span className="text-[10px] font-bold text-red-800 tracking-widest uppercase font-mono">
 QAIC ACCREDITATION REGISTRAR
 </span>
 <h3 className="text-xl md:text-2xl font-display font-bold text-gray-900 dark:text-white tracking-wide">
 CERTIFICATE OF COMPLIANCE
 </h3>
 <p className="text-[9px] text-red-800 font-bold tracking-widest uppercase">
 {activeCert.category === 'TAS' 
 ? 'THAILAND AGRICULTURAL STANDARD IN COMPLIANCE WITH ACFS / มกอช.' 
 : 'INTERNATIONAL STANDARDS ORGANISATION COMPLIANCE'}
 </p>
 <div className="w-16 h-0.5 bg-red-800 mx-auto mt-2"></div>
 </div>

 {/* Main Body - Grantee details */}
 <div className="space-y-1 py-2">
 <span className="text-[10px] italic text-gray-700 dark:text-slate-400 font-sans block">{t('เอกสารนี้รับรองว่า', 'This is to certify that')}</span>
 <h4 className="text-base md:text-xl font-bold text-gray-900 dark:text-white leading-snug">
 {lang === 'TH' ? activeCert.companyNameTH : activeCert.companyNameEN}
 </h4>
 <p className="text-[11px] text-gray-800 dark:text-slate-300 font-sans font-medium">
 {lang === 'TH' ? activeCert.companyNameEN : activeCert.companyNameTH}
 </p>
 <p className="text-[10px] text-gray-600 dark:text-slate-500 font-sans">
 {t('จังหวัดพิกัดโรงงาน / Operating Province: ', 'Operating Province: ')} {t(activeCert.provinceTH, activeCert.provinceEN)}, {activeCert.country}
 </p>
 </div>

 {/* Achieved Standard Section */}
 <div className="bg-red-800/5 py-4 px-3 rounded-xl border border-red-800/10 max-w-md mx-auto space-y-1">
 <span className="text-[9px] font-bold uppercase text-red-800 font-sans tracking-widest">
 {t('ได้รับการตรวจรับรองสอดคล้องตามเกณฑ์มาตรฐาน', 'Has been assessed for')}
 </span>
 <div className="text-lg md:text-xl font-black text-red-900 font-display tracking-wider">
 {activeCert.standard}
 </div>
 </div>

 {/* Certified Scope details */}
 <div className="space-y-1 max-w-lg mx-auto">
 <span className="text-[9.5px] font-bold uppercase text-gray-600 dark:text-slate-500 tracking-widest font-sans block">
 {t('ขอบข่ายการรับรองระบบ', 'Certified Scope of Operations')}
 </span>
 <p className="text-[11px] text-gray-700 dark:text-slate-200 leading-relaxed font-sans italic text-center px-4">
 "{lang === 'TH' ? activeCert.scopeTH : activeCert.scopeEN}"
 </p>
 </div>

 {/* Bottom Signature and Stamps Area */}
 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-gray-150 relative">
 
 {/* Left block: Registration codes */}
 <div className="text-left text-[9.5px] text-gray-700 dark:text-slate-400 font-medium font-sans space-y-1">
 <div>
 <span className="font-bold text-gray-700 dark:text-slate-200">CERTIFICATE NO: </span>
 <span className="font-mono">{activeCert.certificateNo}</span>
 </div>
 <div>
 <span className="font-bold text-gray-700 dark:text-slate-200">DATE OF CERTIFIED: </span>
 <span className="font-mono">{activeCert.issueDate}</span>
 </div>
 <div>
 <span className="font-bold text-gray-700 dark:text-slate-200">EXPIRY DATE OF LIFE: </span>
 <span className="font-mono text-red-805">{activeCert.expiryDate}</span>
 </div>
 <div>
 <span className="font-bold text-gray-700 dark:text-slate-200">STATUS: </span>
 <span className={`font-bold uppercase ${activeCert.status === 'Active' ? 'text-emerald-600' : 'text-red-650'}`}>
 {activeCert.status}
 </span>
 </div>
 </div>

 {/* Middle: Secure QR Code for real-time validation */}
 <div className="flex flex-col items-center justify-center gap-1.5">
 <div className="bg-white/40 backdrop-blur-[35px] border border-white/40 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] dark:bg-slate-900/40 dark:border-white/20 dark:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.2)] p-2 rounded-lg border border-red-800/20 shadow-md">
 <QrCode className="w-16 h-16 text-gray-900 dark:text-white stroke-1" />
 </div>
 <span className="text-[7.5px] font-mono text-gray-600 dark:text-slate-500 font-bold uppercase tracking-wider">
 ACFS / MASCI QR PASS
 </span>
 </div>

 {/* Right: Accredited Standard Logo & Rubber Seal */}
 <div className="flex items-center justify-center gap-4">
 <div className="bg-white/40 backdrop-blur-[35px] border border-white/40 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] dark:bg-slate-900/40 dark:border-white/20 dark:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.2)] p-1.5 rounded border shadow-sm w-12 h-16 flex items-center justify-center">
 <img src={getStandardLogo(activeCert.category)} alt="Standard Logo" className="w-full h-full object-contain" />
 </div>
 <div className="border-4 border-red-800/80 border-dashed rounded-full p-1 w-16 h-16 flex flex-col items-center justify-center text-center rotate-[-8deg] bg-red-800/5 hidden md:flex">
 <span className="text-[5px] font-black text-red-800">ACCREDITED</span>
 <Award className="w-3.5 h-3.5 text-red-800 my-0.5" />
 <span className="text-[4px] font-bold text-red-800 tracking-tighter">QAIC REGISTRAR</span>
 </div>
 </div>

 </div>

 {/* Print button triggers for physical audit copy */}
 <div className="pt-4 flex items-center justify-center gap-4 pointer-events-auto">
 <button
 onClick={() => {
 window.print();
 }}
 className="px-5 py-2.5 bg-red-800 hover:bg-red-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-lg shadow-red-800/10 cursor-pointer border-none"
 >
 <Printer className="w-4 h-4" />
 <span>{t('สั่งระบบพิมพ์ใบประกาศสัญญานี้', 'Print Official Certificate')}</span>
 </button>
 <button
 onClick={closeVerificationModal}
 className="px-5 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 dark:text-slate-200 rounded-xl text-xs font-bold cursor-pointer border-none"
 >
 {t('ปิดหน้าต่างตรวจสอบ', 'Close Inspect Panel')}
 </button>
 </div>

 </div>
 </div>
 ) : (
 /* Paper view using ตัวอย่างใบcer.png as background */
 <div className="text-center space-y-6">
 <div 
 className="relative w-full aspect-[1/1.414] bg-white/40 backdrop-blur-[35px] border border-white/40 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] dark:bg-slate-900/40 dark:border-white/20 dark:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.2)] rounded-lg shadow-inner overflow-hidden border p-6 md:p-10 text-center flex flex-col justify-between"
 style={{ 
 backgroundImage: 'url("/ตัวอย่างใบcer.png")', 
 backgroundSize: '100% 100%', 
 backgroundPosition: 'center',
 backgroundRepeat: 'no-repeat'
 }}
 >
 <div className="h-full flex flex-col justify-between pt-[24%] pb-[5%]">
 {/* Empty placeholder to push down content */}
 <div></div>

 {/* Corporate content absolute-aligned over blank template spots */}
 <div className="space-y-4 md:space-y-6">
 <div className="space-y-1 md:space-y-2">
 <span className="text-[8px] md:text-[10px] italic text-red-800/80 tracking-widest font-sans font-bold uppercase block">
 This is to certify that
 </span>
 <h4 className="text-xs md:text-lg font-bold text-gray-900 dark:text-white leading-snug px-6">
 {lang === 'TH' ? activeCert.companyNameTH : activeCert.companyNameEN}
 </h4>
 <p className="text-[9px] md:text-[11px] text-gray-650 font-sans font-medium px-6">
 {lang === 'TH' ? activeCert.companyNameEN : activeCert.companyNameTH}
 </p>
 <p className="text-[7.5px] md:text-[9px] text-gray-600 dark:text-slate-500 font-sans">
 {t('Location: ', 'Location: ')} {t(activeCert.provinceTH, activeCert.provinceEN)}, {activeCert.country}
 </p>
 </div>

 <div className="space-y-0.5 bg-red-900/5 py-1.5 px-3 rounded-lg border border-red-900/10 max-w-[240px] md:max-w-xs mx-auto">
 <span className="text-[7px] font-bold uppercase text-red-800/70 tracking-wider block">{t('ได้รับการรับรองมาตรฐานระบบงาน', 'Has been assessed and certified under')}</span>
 <div className="text-xs md:text-base font-black text-red-950 font-display">
 {activeCert.standard}
 </div>
 </div>

 <div className="space-y-0.5 max-w-[280px] md:max-w-sm mx-auto">
 <span className="text-[7px] md:text-[8.5px] font-bold uppercase text-gray-600 dark:text-slate-500 tracking-widest block">Scope of Certified Operations</span>
 <p className="text-[8px] md:text-[10px] text-gray-750 leading-relaxed font-sans italic px-6 line-clamp-3">
 "{lang === 'TH' ? activeCert.scopeTH : activeCert.scopeEN}"
 </p>
 </div>
 </div>

 {/* Bottom Validation Row */}
 <div className="grid grid-cols-3 items-end gap-2 pt-2 border-t border-gray-150/40 text-left">
 {/* Cert Codes */}
 <div className="text-[7px] md:text-[8px] text-gray-700 dark:text-slate-400 font-sans space-y-0.5 leading-tight">
 <div><span className="font-bold text-gray-700 dark:text-slate-200">CERT NO: </span><span className="font-mono">{activeCert.certificateNo}</span></div>
 <div><span className="font-bold text-gray-700 dark:text-slate-200">ISSUE: </span><span className="font-mono">{activeCert.issueDate}</span></div>
 <div><span className="font-bold text-gray-700 dark:text-slate-200">EXPIRY: </span><span className="font-mono text-red-800">{activeCert.expiryDate}</span></div>
 <div><span className="font-bold text-gray-700 dark:text-slate-200">STATUS: </span><span className="font-bold text-emerald-600">{activeCert.status}</span></div>
 </div>

 {/* QR Code */}
 <div className="flex flex-col items-center justify-center">
 <div className="bg-white/40 backdrop-blur-[35px] border border-white/40 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] dark:bg-slate-900/40 dark:border-white/20 dark:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.2)] p-1 rounded border shadow-sm w-8 h-8 md:w-11 md:h-11 flex items-center justify-center">
 <QrCode className="w-full h-full text-gray-900 dark:text-white stroke-1" />
 </div>
 <span className="text-[5px] font-mono text-gray-600 dark:text-slate-500 mt-0.5 uppercase">VERIFIED QR</span>
 </div>

 {/* Standard Logo Badge */}
 <div className="flex flex-col items-center justify-center">
 <div className="bg-white/40 backdrop-blur-[35px] border border-white/40 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] dark:bg-slate-900/40 dark:border-white/20 dark:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.2)] p-1 rounded border shadow-sm w-8 h-11 md:w-11 md:h-16 flex items-center justify-center">
 <img src={getStandardLogo(activeCert.category)} alt="Standard Logo" className="w-full h-full object-contain" />
 </div>
 <span className="text-[5px] font-mono text-gray-600 dark:text-slate-500 mt-0.5 uppercase">ACCREDITED</span>
 </div>
 </div>
 </div>
 </div>

 {/* Print button triggers for physical audit copy */}
 <div className="pt-2 flex items-center justify-center gap-4 pointer-events-auto">
 <button
 onClick={() => {
 window.print();
 }}
 className="px-5 py-2.5 bg-red-800 hover:bg-red-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-lg shadow-red-800/10 cursor-pointer border-none"
 >
 <Printer className="w-4 h-4" />
 <span>{t('สั่งระบบพิมพ์ใบประกาศสัญญานี้', 'Print Official Certificate')}</span>
 </button>
 <button
 onClick={closeVerificationModal}
 className="px-5 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 dark:text-slate-200 rounded-xl text-xs font-bold cursor-pointer border-none"
 >
 {t('ปิดหน้าต่างตรวจสอบ', 'Close Inspect Panel')}
 </button>
 </div>
 </div>
 )}

 </div>
 </div>
 )}

 {/* RENEWAL EMERGENCY ACTION DRAWERS / OVERLAY FORM */}
 {renewalClient && (
 <div className="fixed inset-0 z-[110] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
 <div className="bg-white/40 backdrop-blur-[35px] border border-white/40 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] dark:bg-slate-900/40 dark:border-white/20 dark:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.2)] rounded-3xl w-full max-w-lg p-6 md:p-8 border shadow-2xl relative animate-scaleIn">
 
 {/* Header */}
 <div className="flex items-center justify-between border-b pb-4 mb-6">
 <div className="flex items-center gap-2 text-amber-600">
 <Zap className="w-6 h-6 text-amber-500 animate-bounce" />
 <h3 className="font-display font-bold text-lg text-gray-900 dark:text-white">
 {t('ขอนัดหมายต่ออายุระบบด่วนพิเศษ (Renew)', 'Express Certification Renewal Request')}
 </h3>
 </div>
 <button 
 onClick={() => setRenewalClient(null)}
 className="p-1.5 bg-gray-100 rounded-full text-gray-600 dark:text-slate-500 hover:text-gray-900 dark:text-white cursor-pointer"
 >
 <XCircle className="w-5 h-5" />
 </button>
 </div>

 {/* Content Context */}
 {isRenewalSubmitted ? (
 <div className="text-center py-8 space-y-4">
 <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
 <CheckCircle2 className="w-10 h-10" />
 </div>
 <div className="space-y-2">
 <h4 className="font-display font-bold text-gray-900 dark:text-white text-base">{t('บันทึกคำขอต่ออายุด่วนเสร็จสมบูรณ์แล้ว!', 'Renewal Ticket Created Successfully!')}</h4>
 <p className="text-xs text-gray-700 dark:text-slate-400 font-sans max-w-sm mx-auto leading-relaxed">
 {t(
 'ประสานงานข้อมูลเรียบร้อย! เจ้าหน้าที่วิเคราะห์มาตรฐานอาวุโส (CISO/Lead Auditor) ประจำสาขาได้รับการส่งสัญญาณสั่นสะเทือนจะรีบติดต่อกลับเพื่อส่งแพ็กเกจพิเศษและกำหนดเวลาทบทวนตรวจบอร์ดหน้างานภายใน 15 นาที',
 'Your request is dispatched. Senior auditors in your operating sector have been notified. An expert will reach out to schedule an audit scope re-evaluation campaign within 15 minutes.'
 )}
 </p>
 </div>
 </div>
 ) : (
 <form onSubmit={submitRenewalRequest} className="space-y-4">
 
 <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-100/60 text-xs text-amber-850 font-sans space-y-1">
 <div className="font-bold flex items-center gap-1">
 <AlertTriangle className="w-4 h-4 text-amber-600" />
 <span>{t('เตรียมการทบทวนสำหรับสิทธิที่หมดอายุ', 'Re-evaluation audit targeting expired slot')}</span>
 </div>
 <div><strong>{t('ชื่อองค์กร / Client:', 'Enterprise Name:')}</strong> {renewalClient.companyNameTH}</div>
 <div><strong>{t('มาตรฐาน / Standard:', 'Target Standard:')}</strong> {renewalClient.standard}</div>
 <div><strong>{t('รหัสรับรองเดิม / Old Ref Code:', 'Previous ID:')}</strong> {renewalClient.certificateNo}</div>
 </div>

 <div className="space-y-1">
 <label className="text-[10px] font-bold text-gray-600 dark:text-slate-500 uppercase tracking-widest font-sans block">{t('ชื่อผู้ลงประสานงาน', 'Your Full Name')}</label>
 <div className="relative">
 <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
 <User className="h-4 w-4 text-gray-600 dark:text-slate-500" />
 </span>
 <input
 type="text"
 required
 placeholder="เช่น คุณวิฑูรย์ รักความสะอาด"
 value={renewalForm.name}
 onChange={(e) => setRenewalForm({ ...renewalForm, name: e.target.value })}
 className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none"
 />
 </div>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <div className="space-y-1">
 <label className="text-[10px] font-bold text-gray-600 dark:text-slate-500 uppercase tracking-widest font-sans block">{t('เบอร์โทรศัพท์ติดต่อประสานงาน', 'Direct phone number')}</label>
 <div className="relative">
 <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
 <Phone className="h-4 w-4 text-gray-600 dark:text-slate-500" />
 </span>
 <input
 type="tel"
 required
 placeholder="เช่น 081-234-5678"
 value={renewalForm.phone}
 onChange={(e) => setRenewalForm({ ...renewalForm, phone: e.target.value })}
 className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none"
 />
 </div>
 </div>

 <div className="space-y-1">
 <label className="text-[10px] font-bold text-gray-600 dark:text-slate-500 uppercase tracking-widest font-sans block">{t('อีเมลสำหรับยื่นข้อเสนอพิเศษ', 'Contact Email address')}</label>
 <div className="relative">
 <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
 <Mail className="h-4 w-4 text-gray-600 dark:text-slate-500" />
 </span>
 <input
 type="email"
 required
 placeholder="เมลที่ใช้ติดต่อ"
 value={renewalForm.email}
 onChange={(e) => setRenewalForm({ ...renewalForm, email: e.target.value })}
 className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none"
 />
 </div>
 </div>
 </div>

 <div className="space-y-1">
 <label className="text-[10px] font-bold text-gray-600 dark:text-slate-500 uppercase tracking-widest font-sans block">{t('รายละเอียดเพิ่มเติม', 'Additional requirements')}</label>
 <textarea
 value={renewalForm.notes}
 onChange={(e) => setRenewalForm({ ...renewalForm, notes: e.target.value })}
 rows={3}
 className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none font-sans"
 ></textarea>
 </div>

 <button
 type="submit"
 disabled={isSubmittingRenewal}
 className="w-full py-3 mt-4 bg-gradient-to-r from-amber-500 to-rose-500 text-white font-bold text-xs rounded-xl uppercase tracking-wider hover:opacity-90 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
 >
 {isSubmittingRenewal ? (
 <>
 <RefreshCw className="w-4 h-4 animate-spin" />
 <span>{t('กำลังส่งคำขอเข้าสัญญาณจ้างผู้ประเมิน...', 'Transmitting signal to Regional Auditors...')}</span>
 </>
 ) : (
 <>
 <Zap className="w-4 h-4" />
 <span>{t('ส่งรายงานขอต่อสายด่วน CISO ลดประเมินพิเศษ', 'Dispatch Express Renewal Order & Discount Request')}</span>
 </>
 )}
 </button>

 </form>
 )}

 </div>
 </div>
 )}

 </div>
 );
}
