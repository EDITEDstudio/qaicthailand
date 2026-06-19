/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ISOStandard, EmployeeNode, MockCertificate, QuizQuestion } from './types';

// Full List of ISO and International Standards managed by QAIC Thailand
export const ISO_STANDARDS: ISOStandard[] = [
  {
    id: 'iso-9001',
    code: 'ISO 9001:2015',
    nameTH: 'ระบบการจัดการคุณภาพ (QMS)',
    nameEN: 'Quality Management System (QMS)',
    category: 'Quality & Risk',
    accreditation: ['UKAS', 'NAC'],
    shortDescTH: 'มาตรฐานสากลเพื่อการประกันคุณภาพ ประสิทธิภาพ และความสม่ำเสมอในทุกกระบวนการ',
    shortDescEN: 'The global benchmark for quality assurance, efficiency, and operational consistency.',
    longDescTH: 'มาตรฐานสากลสำหรับการจัดทำและจัดการระบบบริหารคุณภาพ ซึ่งเน้นกลุ่มเป้าหมายในด้านความพึงพอใจของลูกค้าและกระบวนการทำงานที่ขับเคลื่อนด้วยการปรับปรุงอย่างต่อเนื่อง เหมาะสมกับการรับรองให้กับทุกขนาดธุรกิจ',
    longDescEN: 'The foundational standard for implementing a Quality Management System focus on customer satisfaction, structured process control, and continuous improvement. Highly recommended for businesses of all sizes and sectors.',
    benefitsTH: [
      'เพิ่มความมั่นใจให้กับลูกค้าและคู่ค้าทางธุรกิจ',
      'ลดต้นทุนและความผิดพลาดในการทำงาน',
      'เพิ่มศักยภาพในการประมูลงานราชการและองค์กรขนาดใหญ่',
      'ระบบการทำงานมีความเสถียรและพนักงานมีภารกิจงานที่ชัดเจน'
    ],
    benefitsEN: [
      'Boost client and stakeholder confidence globally',
      'Optimize operational costs and minimize defect rates',
      'Unlock access to governmental and large corporate tenders',
      'Standardize workflow structures and establish solid accountability'
    ],
    stepsTH: [
      'ขั้นตอนที่ 1: ตรวจประเมินเบื้องต้น (Stage 1 Audit)',
      'ขั้นตอนที่ 2: ตรวจประเมินรับรองจริง (Stage 2 Audit)',
      'ขั้นตอนที่ 3: รับมอบใบรับรองระบบคุณภาพ',
      'ขั้นตอนที่ 4: ตรวจประเมินติดตามผลรายปี (Surveillance Audit)'
    ],
    stepsEN: [
      'Step 1: Document Review & Readiness Check (Stage 1)',
      'Step 2: Core Certification Auditing (Stage 2 onsite)',
      'Step 3: Certification Issuance and Registering',
      'Step 4: Continuous Surveillances (Annual audits)'
    ],
    baseCost: 32000,
    baseDays: 5,
    whatIsItTH: "มาตรฐานสากลสำหรับระบบบริหารงานคุณภาพ (QMS) ที่เป็นรากฐานสำคัญในการช่วยจัดระเบียบกระบวนการทำงานทุกแผนกขององค์กรให้มีประสิทธิภาพ โปร่งใส และตรวจสอบได้ในทุกขั้นตอน",
    whatIsItEN: "The international standard for Quality Management Systems (QMS) designed to structure, align, and control organizational processes to ensure consistency and client satisfaction.",
    benefitsDetailedTH: [
      "เปลี่ยนวิธีทำงานที่เคยสับสนและขึ้นกับตัวบุคคล ให้เป็นระบบคู่มือการทำงานมาตรฐาน (SOP) ที่พนักงานใหม่เปิดอ่านแล้วเริ่มงานได้ทันที",
      "ลดของเสียและความผิดพลาดจากกระบวนการทำงานลงได้กว่า 35% ส่งผลให้ควบคุมงบประมาณและต้นทุนได้อย่างมีนัยสำคัญ",
      "ช่วยสร้างแต้มต่อและเป็นเกณฑ์บังคับในการเข้าประมูลรับงานราชการ รัฐวิสาหกิจ หรือโครงการจัดซื้อจัดจ้างขนาดใหญ่",
      "ยกระดับภาพลักษณ์ความโปร่งใส ส่งผลให้คู่ค้าและนักลงทุนข้ามชาติตกลงร่วมทุนธุรกิจได้ง่ายขึ้น"
    ],
    benefitsDetailedEN: [
      "Sop-driven operations that eliminate dependency on key individuals and streamline onboarding of new personnel",
      "Cut down internal waste and workflow errors by over 35%, directly lowering operating expenses",
      "Acquire mandatory qualification scores for public and private enterprise procurement tenders",
      "Promote corporate governance and ease joint-venture audits with global trade entities"
    ],
    principlesTH: [
      "การมุ่งเน้นที่ลูกค้า (Customer Focus) เพื่อส่งมอบผลิตภัณฑ์และบริการที่ตรงตามใจลูกค้าเสมอ",
      "การบริหารงานแบบกระบวนการ (Process Approach) เชื่อมโยงทุกแผนกเป็นสายพานการทำงานแบบป้อนรับส่งต่ออย่างไม่มีสะดุด",
      "การปรับปรุงระบบอย่างต่อเนื่อง (Continuous Improvement) ใช้กรอบการทำงานแบบ PDCA เสมอ",
      "การตัดสินใจบนหลักฐานจริง (Evidence-based Decision Making) วิเคราะห์ด้วยข้อมูลและสถิติแทนการคาดเดา"
    ],
    principlesEN: [
      "Customer Focus: Aligning service capabilities directly with client feedback and buyer expectations",
      "Process Approach: Structuring departmental inputs and outputs as a seamless chain of activities",
      "Continuous Improvement: Enforcing active cycles of Plan-Do-Check-Act across teams",
      "Evidence-based Decisions: Relying strictly on performance logs and data analysis over guesswork"
    ],
    keyPointsTH: [
      "การบริหารความเสี่ยงและโอกาสทางธุรกิจ (Risk-based Thinking) ตั้งแต่ระดับผู้บริหารระดับสูง",
      "การมีส่วนร่วมของพนักงานทุกระดับ (People Engagement) ในการผลักดันเป้าหมายคุณภาพเดียวกัน",
      "การกำหนดเป้าหมาย KPI ของแต่ละฝ่ายที่สอดคล้องกับนโยบายคุณภาพหลัก"
    ],
    keyPointsEN: [
      "Proactive Risk-based Thinking embedded in executive planning and core operations",
      "High level of employee engagement toward mutual quality targets",
      "Quantifiable KPI metrics linked to the organizational quality policy statement"
    ]
  },
  {
    id: 'iso-14001',
    code: 'ISO 14001:2015',
    nameTH: 'ระบบการจัดการสิ่งแวดล้อม (EMS)',
    nameEN: 'Environmental Management System (EMS)',
    category: 'Environmental & Energy',
    accreditation: ['UKAS', 'NAC'],
    shortDescTH: 'ยกระดับองค์กรสู่การปล่อยมลพิษเป็นศูนย์ และปฏิบัติตามกฎหมายควบคุมสิ่งแวดล้อมอย่างมีระบบ',
    shortDescEN: 'Step into sustainable stewardship and assure legal compliance regarding wastes and emissions.',
    longDescTH: 'กรอบมาตรฐานสำหรับการจัดการด้านสิ่งแวดล้อมที่ช่วยลดผลกระทบทางสิ่งแวดล้อมที่เกิดขึ้นจากกิจกรรมขององค์กรอย่างยั่งยืน และเตรียมพร้อมสำหรับระเบียบการค้านานาชาติ',
    longDescEN: 'A globally recognized benchmark to map out a structural framework for reducing corporate carbon footprint, minimizing toxic waste, and meeting environmental legal requirements.',
    benefitsTH: [
      'ลดต้นทุนสาธารณูปโภค พลังงาน และการทิ้งขยะ',
      'สร้างภาพลักษณ์องค์กรสีเขียว (Green Corporate Identity)',
      'ลดความเสี่ยงในการรับผิดชอบต่อคดีสิ่งแวดล้อมของแบรนด์',
      'สอดรับกับเจตนารมณ์ ESG และ Carbon Neutrality ในปัจจุบัน'
    ],
    benefitsEN: [
      'Diminish waste disposal and consumption of electricity/raw materials',
      'Achieve certified Green Industry and eco-friendly brand identity',
      'Mitigate risks of legal cleanups, penalties, and toxic mishaps',
      'Satisfy corporate ESG objectives and prepare for green trading standards'
    ],
    stepsTH: [
      'ขั้นตอนที่ 1: ตรวจสอบแผนผังสิ่งแวดล้อมและระเบียบกฎหมาย',
      'ขั้นตอนที่ 2: เดินสำรวจหน้างานและกระบวนการผลิตสิ่งประดิษฐ์ คัดแยกของเสีย',
      'ขั้นตอนที่ 3: อนุมัติใบประกาศสิ่งแวดล้อมโดยสถาบัน',
      'ขั้นตอนที่ 4: เผยแพร่รายงานความโปร่งใสด้านสิ่งแวดล้อมแก่บุคคลภายนอก'
    ],
    stepsEN: [
      'Step 1: Regulatory and Aspect-Impact reviews (Stage 1)',
      'Step 2: Functional layout observation & Waste separation system audits',
      'Step 3: Advisory review and accredited ISO 14001 certification grant',
      'Step 4: Continuous eco-compliance and annual tracking'
    ],
    baseCost: 38000,
    baseDays: 6,
    whatIsItTH: "มาตรฐานระบบการจัดการสิ่งแวดล้อม (EMS) เพื่อควบคุมผลกระทบเชิงลบต่อระบบนิเวศ จัดระเบียบสารเคมี ของเสีย มลพิษทางอากาศ และรักษากฎหมายสิ่งแวดล้อมของประเทศอย่างยั่งยืน",
    whatIsItEN: "The global Environmental Management System (EMS) standard helping companies limit pollution, manage waste pathways, and ensure continuous legal compliance.",
    benefitsDetailedTH: [
      "ประหยัดงบค่าไฟฟ้า ค่าน้ำ และต้นทุนเชื้อเพลิงในการผลิตลงได้กว่า 15-20% จากการวางแผนระบบประหยัดพลังงาน",
      "ขจัดความเสี่ยงในการถูกหน่วยงานรัฐสั่งปรับ สั่งปิดโรงงาน หรือถูกชุมชนรอบข้างฟ้องร้องเนื่องจากควัน กลิ่น หรือน้ำเสียปนเปื้อน",
      "เปิดโอกาสการเข้าร่วมกลุ่มอุตสาหกรรมสีเขียว (Green Industry) และผ่านเกณฑ์คัดเลือกคู่ค้าของกลุ่มอุตสาหกรรมยักษ์ใหญ่",
      "เตรียมความพร้อมทางธุรกิจเพื่อรับมือกับมาตรการกำแพงภาษีคาร์บอนในการค้าระหว่างประเทศ"
    ],
    benefitsDetailedEN: [
      "Cut factory utility consumption (electricity, water, fuels) by 15-20% through efficient usage mapping",
      "Shield the factory from expensive environmental fines, community lawsuits, or forced shutdowns due to toxic releases",
      "Attain Green Industry status to secure contracts with corporate buyers demanding green standards",
      "Position your products favorably against global carbon taxation frameworks in export markets"
    ],
    principlesTH: [
      "การระบุประเด็นปัญหาสิ่งแวดล้อม (Environmental Aspects) และความรุนแรงของผลกระทบต่อธรรมชาติ",
      "การจัดเก็บและคัดแยกสารเคมีอันตรายและขยะอุตสาหกรรมตามประเภทอย่างปลอดภัย",
      "การทบทวนและซักซ้อมแผนรับมือสถานการณ์ฉุกเฉิน เช่น เหตุสารเคมีรั่วไหล สารพิษกระจายตัว"
    ],
    principlesEN: [
      "Assess and identify corporate Environmental Aspects and product-cycle environmental impacts",
      "Enforce strict protocols for chemical safety storage and industrial waste partitioning",
      "Coordinate realistic drills for response scenarios including toxic containment and spillages"
    ],
    keyPointsTH: [
      "การประเมินวัฏจักรชีวิตผลิตภัณฑ์ (Life Cycle Perspective) ตั้งแต่ขั้นตอนผลิตไปจนถึงการย่อยสลาย",
      "ความตระหนักรู้และการให้ความรู้เรื่องสิ่งแวดล้อมแก่พนักงานและผู้รับเหมาในหน้างานทุกคน",
      "การลดปริมาณการปล่อยก๊าซเรือนกระจกเพื่อตอบรับแผน Carbon Neutrality ขององค์กร"
    ],
    keyPointsEN: [
      "Life Cycle Perspective auditing from raw materials handling down to customer disposal routes",
      "Consistent environmental protection training for all site personnel and logistics staff",
      "Practical milestones set for carbon reductions and corporate recycling targets"
    ]
  },
  {
    id: 'iso-45001',
    code: 'ISO 45001:2018',
    nameTH: 'ระบบการจัดการความปลอดภัยและอาชีวอนามัย (OHS)',
    nameEN: 'Occupational Health and Safety (OHS)',
    category: 'Health & Safety',
    accreditation: ['UKAS'],
    shortDescTH: 'ปกป้องพนักงานจากความปลอดภัยในที่ทำงานสูงสุด และลดอุบัติเหตุเป็นศูนย์',
    shortDescEN: 'Protect your human resources and eliminate hazardous operational factors.',
    longDescTH: 'ระบบป้องกันเชิงรุกที่ลดโอกาสการเจ็บป่วยและอุบัติเหตุจากการทำงานของกำลังคนในองค์กร ซึ่งเป็นมาตรฐานสากลความปลอดภัยระดับสูงสุด',
    longDescEN: 'A comprehensive preventive framework ensuring full physical wellbeing, structural risk reduction, and industrial workspace safety for staff, subcontractors, and visitors.',
    benefitsTH: [
      'ลดอัตราการสูญเสียกำลังคน วันลาเจ็บป่วย และชดเชยค่าเบี้ยประกัน',
      'สร้างขวัญกำลังใจและวัฒนธรรมความปลอดภัยแบบเป็นระบบ',
      'สอดคล้องตามพ.ร.บ.ความปลอดภัย อาชีวอนามัย และสภาพแวดล้อมของไทย',
      'ลดความรับผิดชอบทางกฎหมายของคณะผู้บริหารเมื่อเกิดเหตุสุดวิสัย'
    ],
    benefitsEN: [
      'Significantly drop worker injury rates, sick leaves, and legal liability claims',
      'Cultivate a robust safety-first culture and boost staff morale',
      'Fully align with Thai statutory laws and industry-level hazard regulations',
      'Lower commercial liability insurance premiums for corporate locations'
    ],
    stepsTH: [
      'ขั้นตอนที่ 1: วิเคราะห์แผนประเมินความเสี่ยงงานความปลอดภัย (Risk Matrix Form)',
      'ขั้นตอนที่ 2: ตรวจแนวทางปฏิบัติ ซ้อมอพยพหนีไฟและอุปกรณ์ชุดความปลอดภัย',
      'ขั้นตอนที่ 3: ออกเอกสารรับรองสำหรับองค์กรโดยคณะกรรมการ',
      'ขั้นตอนที่ 4: คัดกรองและประเมินผลระบบฉุกเฉินประจำปี'
    ],
    stepsEN: [
      'Step 1: Review Hazard Identification and Risk Assessments (HIRA)',
      'Step 2: Evaluate emergency drills and protective personal equipment audits',
      'Step 3: Issue official UKAS accredited ISO 45001 certificate',
      'Step 4: Continuous safety improvements and yearly checks'
    ],
    baseCost: 36000,
    baseDays: 5,
    whatIsItTH: "มาตรฐานระดับสูงสุดเพื่อความปลอดภัย สุขภาพ และสวัสดิภาพในการทำงาน มุ่งกำจัดความเสี่ยงจากการบาดเจ็บและสร้างสิ่งแวดล้อมการทำงานเชิงบวกแก่พนักงานทุกคน",
    whatIsItEN: "The premier Occupational Health and Safety (OH&S) management standard targeting risk reduction, injury prevention, and building a safe workforce culture.",
    benefitsDetailedTH: [
      "ลดจำนวนอุบัติเหตุในพื้นที่ทำงานหรือไลน์การผลิตให้กลายเป็นศูนย์ สร้างความมั่นใจให้กำลังพลปฏิบัติงานได้อย่างเต็มศักยภาพ",
      "ลดต้นทุนเบี้ยประกันภัยความเสียหายในโรงงาน และลดการจ่ายเงินทดแทนเหตุพนักงานบาดเจ็บลงได้มาก",
      "ช่วยคุ้มครองตัวผู้บริหารจากการถูกดำเนินคดีอาญาเมื่อเกิดเหตุสุดวิสัย หากสามารถพิสูจน์ได้ว่าระบบความปลอดภัยเป็นไปตามมาตรฐานสากล",
      "เพิ่มโอกาสในการรับงานอุตสาหกรรมปิโตรเคมี ก่อสร้าง ยานยนต์ และพลังงานที่เน้นเกณฑ์ความปลอดภัยสูงสุด"
    ],
    benefitsDetailedEN: [
      "Sustain a zero-accident record in dangerous assembly lines and workspaces, keeping operational throughput stable",
      "Reduce insurance premiums, workers compensation costs, and substitute labor expenses",
      "Shield corporate board directors from severe personal liability under industrial safety laws during major accidents",
      "Pass stringent pre-qualifications for heavy industry sectors including petrochemicals, mining, energy, and construction"
    ],
    principlesTH: [
      "การระบุอันตรายและการวิเคราะห์ระบุระดับความเสี่ยงของทุกกิจกรรม (HIRA)",
      "การเปิดให้ตัวแทนพนักงานและคนทำงานหน้างานจริงมีส่วนร่วมชี้แนะนโยบายความปลอดภัย",
      "การกำจัดอันตรายโดยใช้ลำดับขั้นควบคุมความเสี่ยง เช่น การเปลี่ยนเครื่องจักรใหม่ หรือการติดตั้งแผงกั้น"
    ],
    principlesEN: [
      "Systematic execution of Hazard Identification and Risk Assessment (HIRA) across sites",
      "High worker participation and consultation from front-line operators regarding safety designs",
      "Application of the Hierarchy of Controls to proactively eliminate or isolate hazards"
    ],
    keyPointsTH: [
      "การวางเส้นทางหลบภัย อุปกรณ์ป้องกันภัยส่วนบุคคล (PPE) และระบบปฐมพยาบาลที่มีมาตรฐานชัดเจน",
      "การสอบสวนหาสาเหตุอย่างจริงจังเมื่อมีเกือบเกิดอุบัติเหตุ (Near-Miss Incident) เพื่อป้องกันเหตุการณ์จริง",
      "การควบคุมสภาพแวดล้อมงาน เช่น ตรวจวัดปริมาณฝุ่น ความเข้มของแสง และเสียงดังในพื้นที่ผลิต"
    ],
    keyPointsEN: [
      "Validated emergency evacuation plans, appropriate PPE distribution, and first-aid kits maintenance",
      "Meticulous analysis of Near-Miss events to prevent major accidents from occurring in the future",
      "Ongoing audits of sound levels (decibels), lighting safety, and air quality across manufacturing floors"
    ]
  },
  {
    id: 'haccp',
    code: 'HACCP & GHPs (Codex)',
    nameTH: 'การวิเคราะห์อันตรายและจุดวิกฤต (อาหารปลอดภัย)',
    nameEN: 'Hazard Analysis and Critical Control Point',
    category: 'Food Safety & GMP',
    accreditation: ['UKAS', 'NAC'],
    shortDescTH: 'มาตรฐานสาธารณสุขระดับโลกเพื่อการจัดทำอาหารปลอดภัย ไม่ปนเปื้อนเคมีหรือชีวภาพ',
    shortDescEN: 'Global food safety benchmark preventing physical, biological, and chemical contaminations.',
    longDescTH: 'มาตรการควบคุมขั้นพื้นฐานสำหรับอุตสาหกรรมห่วงโซ่อาหาร จากฟาร์มสู่โต๊ะเสิร์ฟ ครอบคลุมผู้ส่งออก วัตถุดิบ และโรงงานแปรรูปอาหารเพื่อการส่งออก',
    longDescEN: 'Crucial for standardizing high hygiene, sanitation, biological pathogen prevention, and allergen control. Standard safety passport for manufacturing, distribution, and export of food.',
    benefitsTH: [
      'ผ่านเกณฑ์มาตรฐานการตรวจสอบจาก อ.ย. ไทยทันที',
      'ความเสี่ยงจากสารปนเปื้อนหรือข่าวอาหารมีสารพิษลดลง',
      'สามารถส่งสินค้าจำหน่ายในโมเดิร์นเทรด ร้านค้าพรีเมียม และส่งออกยุโรป/อเมริกา',
      'ได้รับความน่าเชื่อถือในเครือข่ายห่วงโซ่อุปทานอาหารระดับสูง'
    ],
    benefitsEN: [
      'Guarantee instantly compliant inspections from FDA and health ministries',
      'Safeguard consumers from food-borne poisonings and recall events',
      'Secure listings in Modern Trade chains, hypermarkets, and export paths',
      'Empower food traceability from ingredients to end consumer products'
    ],
    stepsTH: [
      'ขั้นตอนที่ 1: ตรวจสอบความสะอาดจุดควบคุมวิกฤต CCP ของสายการผลิต',
      'ขั้นตอนที่ 2: ดำเนินสุ่มตรวจจุลชีววิทยาและสารตกค้าง',
      'ขั้นตอนที่ 3: รับเอกสารรับรองมาตรฐานคู่ขนาน GHPs (GMP)',
      'ขั้นตอนที่ 4: ติดตามความเหมาะสมทุกๆ 6 เดือน เพื่อคงระดับความปลอดภัยสูงสุด'
    ],
    stepsEN: [
      'Step 1: System and paperwork inspection of Critical Control Points (CCPs)',
      'Step 2: On-site verification of sanitation controls and microbial parameters',
      'Step 3: Double certification of GHPs and HACCP standards',
      'Step 4: Highly frequent surveillance audits to sustain food-grade status'
    ],
    baseCost: 28000,
    baseDays: 4,
    whatIsItTH: "มาตรฐานสุขอนามัยอาหารสากลที่วิเคราะห์ความเสี่ยงและกำหนดจุดควบคุมวิกฤต (Critical Control Point) เพื่อป้องกันอันตรายทางชีวภาพ เคมี และกายภาพ ปนเปื้อนในทุกกระบวนการผลิตอาหาร",
    whatIsItEN: "The fundamental food safety standard that identifies, evaluates, and controls biological, chemical, and physical hazards in food processing using Critical Control Points.",
    benefitsDetailedTH: [
      "รับประกันความปลอดภัยสูงสุดต่อผู้บริโภค ป้องกันข่าวลือเรื่องอาหารเป็นพิษหรือปนเปื้อนซึ่งอาจทำลายชื่อเสียงแบรนด์อาหารของคุณ",
      "ผ่านการตรวจประเมินรับใบอนุญาตสถานที่ผลิตอาหารของ อย. ประเทศไทยได้ง่ายขึ้นอย่างรวดเร็ว",
      "ขยายช่องทางจัดจำหน่ายสินค้าอาหารเข้าสู่ระบบห้างโมเดิร์นเทรดชั้นนำ ซูเปอร์มาร์เก็ตพรีเมียม และตลาดต่างประเทศ",
      "ช่วยสร้างระบบจัดการเศษชิ้นส่วนหรือสิ่งแปลกปลอมด้วยการตรวจสอบที่แม่นยำ ลดปริมาณของเสียที่ต้องทิ้งหลังแพ็กเกจจิ้ง"
    ],
    benefitsDetailedEN: [
      "Guarantee absolute product safety, preventing costly lawsuits or public relations crises from contaminated food",
      "Ensure compliant sanitary inspections from the FDA and public health authorities",
      "Qualify for product displays in top-tier local supermarkets and major global retail chains",
      "Build physical foreign-body containment barriers (magnets, metal detectors) to minimize product waste"
    ],
    principlesTH: [
      "การวิเคราะห์หาอันตรายทั้งหมดที่เป็นไปได้ (Hazard Analysis) ในส่วนผสมและขั้นตอนการจัดเตรียม",
      "การกำหนดจุดวิกฤตที่ต้องควบคุม (Critical Control Point - CCP) เช่น อุณหภูมิการต้ม ความชื้น หรือรังสี",
      "การกำหนดเกณฑ์ควบคุมวิกฤต (Critical Limits) และตรวจสอบแบบเรียลไทม์ เช่น ควบคุมอุณหภูมิที่ 75 องศาเซลเซียสขึ้นไป"
    ],
    principlesEN: [
      "Conduct in-depth Hazard Analysis for biological, chemical, and physical impurities",
      "Determine process-level Critical Control Points (CCPs) such as heating, cooling, or pH adjustment",
      "Define Critical Limits (e.g., minimum cooking temperature of 75°C) and monitor them continuously"
    ],
    keyPointsTH: [
      "การจัดทำระบบตรวจสอบย้อนกลับ (Traceability) สำหรับวัตถุดิบและบรรจุภัณฑ์อาหารทุกล็อต",
      "สุขอนามัยส่วนบุคคลของพนักงานและการป้องกันการปนเปื้อนข้ามของสารก่อภูมิแพ้ (Allergen)",
      "มาตรการล้างทำความสะอาดเครื่องมือและกำจัดสัตว์พาหะนำโรคอย่างรัดกุม"
    ],
    keyPointsEN: [
      "Documented batch traceability to track ingredients back to raw farm batches",
      "Strict employee personal hygiene rules and allergen cross-contact prevention programs",
      "Sustained CIP (Cleaning-in-place) logs and active pest controls"
    ]
  },
  {
    id: 'iso-22000',
    code: 'ISO 22000:2018',
    nameTH: 'ระบบจัดการความปลอดภัยอาหารระดับสากล',
    nameEN: 'Food Safety Management System (FSMS)',
    category: 'Food Safety & GMP',
    accreditation: ['UKAS'],
    shortDescTH: 'การบวกเอา ISO 9001 และ HACCP เข้าด้วยกัน เพื่อองค์กรร้านอาหารและอาหารแปรรูปข้ามชาติ',
    shortDescEN: 'Combines general quality frameworks with strict HACCP critical safety parameters.',
    longDescTH: 'มาตรฐานระดับสูงสุดที่บูรณาการระบบอาหารปลอดภัยระดับท้องถิ่น เข้ากับระบบควบคุมการทำงานของแบรนด์อาหารชั้นนำแบบภาพรวมทั้งหมด',
    longDescEN: 'The premiere tier of international food management integrating the HACCP concept with the corporate structure of ISO Quality assurance, suitable for major international food brands.',
    benefitsTH: [
      'เป็นที่อมรับจากกลุ่มสากลผู้จำหน่ายชั้นนำของโลก (GFSI เครือข่ายคู่ค้า)',
      'ลดภาระการจัดทำระบบแยกย่อย ด้วยโครงสร้าง ISO-High Level Structure',
      'เสริมสร้างประสิทธิภาพในการจัดการวิกฤตทางอาหารตลอดซัพพลายเชน',
      'พร้อมทำงานก้าวเข้าสู่อุตสาหกรรมอาหารพรีเมียมและนวัตกรรมใหม่'
    ],
    benefitsEN: [
      'Gain high reputation in the Global Food Safety Initiative (GFSI) networks',
      'Consolidate separate compliance protocols into one High-Level Structure',
      'Mitigate vulnerabilities down the international complex logistics chains',
      'Excel in bidding and delivering food assets to premier clients'
    ],
    stepsTH: [
      'ขั้นตอนที่ 1: ตรวจวิเคราะห์สารตั้งต้นความสะอาดและกระบวนการจัดการอาหาร',
      'ขั้นตอนที่ 2: วางแนวทางสอบกลับสินค้า (Traceability Trial Audit)',
      'ขั้นตอนที่ 3: รับรองใบตราสัญลักษณ์ ISO 22000',
      'ขั้นตอนที่ 4: ทบทวนระบบและกระบวนการอย่างมีประสิทธิภาพรายปี'
    ],
    stepsEN: [
      'Step 1: Check foundational food safety designs and process flows',
      'Step 2: Execution of practical mock traceability and recall trials',
      'Step 3: Certification issuance with global UKAS registration status',
      'Step 4: Periodic annual standard upkeep and testing validation'
    ],
    baseCost: 45000,
    baseDays: 6,
    whatIsItTH: "ระบบจัดการความปลอดภัยของอาหารระดับสูงสุดที่บูรณาการระบบคุณภาพภาพรวม (ISO 9001) และความปลอดภัยอาหารเฉพาะทาง (HACCP) เข้าด้วยกันอย่างเป็นหนึ่งเดียว",
    whatIsItEN: "The state-of-the-art Food Safety Management System (FSMS) standard aligning corporate quality management systems directly with food safety controls.",
    benefitsDetailedTH: [
      "รับการยอมรับทั่วโลกในเวทีอาหารส่งออกสากล สามารถร่วมเป็นคู่ค้ากับซัพพลายเชนอาหารของแบรนด์ข้ามชาติและสายการบินต่าง ๆ",
      "ลดเวลาและค่าใช้จ่ายของเอกสารระบบงานลง เนื่องจากปรับปรุงระบบด้วยโครงสร้าง ISO แบบ High-Level Structure ร่วมกัน",
      "สร้างความเชื่อมั่นอย่างยั่งยืนตลอดห่วงโซ่การขนส่งสินค้าอาหารสดและเครื่องดื่มข้ามประเทศ",
      "มีระบบการจัดการวิกฤตทางอาหารและการเรียกคืนสินค้าฉุกเฉินที่รวดเร็วและมีประสิทธิภาพสูง"
    ],
    benefitsDetailedEN: [
      "Attain top-tier compliance status accepted by global food manufacturers, airlines, and exporters",
      "Merge administrative compliance paperwork into one system utilizing the High-Level Structure",
      "Assure complete food safety integration through long international logistics and cargo handling",
      "Sustain validated business continuity and product recall frameworks to manage supply threats"
    ],
    principlesTH: [
      "การสื่อสารข้อมูลความปลอดภัยอาหารอย่างมีประสิทธิภาพระหว่างผู้ผลิต คู่ค้าขนส่ง และผู้ซื้อ",
      "การสร้างระบบโครงสร้างการบริหารงานที่ชัดเจนในระดับนโยบายองค์กร",
      "การนำระบบโปรแกรมพื้นฐานด้านสุขลักษณะความปลอดภัย (PRPs) มาวิเคราะห์ความสมบูรณ์ก่อนเริ่มสายการผลิต"
    ],
    principlesEN: [
      "Interactive communication on food safety profiles between farmers, shippers, and retailers",
      "Systematic integration of food safety controls into the corporate governance registry",
      "Prerequisite Programs (PRPs) setup and audit to prepare the environment for safe production"
    ],
    keyPointsTH: [
      "การป้องกันการปนเปื้อนโดยเจตนาและการปกป้องอาหารจากภัยคุกคาม (Food Defense / Food Fraud)",
      "การทดสอบความน่าเชื่อถือของการสอบกลับย้อนกลับ (Traceability test) ทั้งวัตถุดิบและบรรจุภัณฑ์",
      "การตรวจสอบสภาพแวดล้อมทางกายภาพอย่างเข้มงวด เช่น ระบบกรองอากาศ ความชื้น และสุขอนามัยในคลังสินค้า"
    ],
    keyPointsEN: [
      "Proactive Food Defense and Food Fraud risk assessments to prevent tampering",
      "Rigorous and frequent recall and mock traceability tests",
      "Sustained verification of warehouse environmental criteria, air quality, and clean water supplies"
    ]
  },
  {
    id: 'iso-27001',
    code: 'ISO 27001:2022',
    nameTH: 'ระบบจัดการความมั่นคงและความคุ้มครองข้อมูลสารสนเทศ (ISMS)',
    nameEN: 'Information Security Management (ISMS)',
    category: 'Security & Tech',
    accreditation: ['UKAS'],
    shortDescTH: 'ป้องข้อมูลลูกค้าระดับสูงจากการโจรกรรมทางไซเบอร์ ตามมาตรฐานความปลอดภัยสากลล่าสุด',
    shortDescEN: 'Protect core customer data from modern cybersecurity exploitation and ransomware threats.',
    longDescTH: 'กรอบมาตรฐานสากลเพื่อการป้องกันทรัพย์สินทางปัญญา ข้อมูลส่วนบุคคล และระบบซอฟต์แวร์จากการรุกรานทางดิจิทัล สอดคล้องตามกฎหมาย PDPA ของประเทศไทย',
    longDescEN: 'Essential layout outlining risk analysis, network defenses, database encryption, access roles, and continuous defense against hacker interventions. Strongly aligned with Thai PDPA principles.',
    benefitsTH: [
      'ปกป้ององค์กรจากข้อมูลรั่วไหล ค่าปรับกฎหมาย PDPA และแฮกเกอร์เรียกค่าไถ่',
      'เพิ่มความไว้วางใจให้กับลูกค้ารายย่อยและสถิตระกับธนาคารระดับสากล',
      'มีแผนกู้ชีพกู้ระบบสำรองในยามเกิดเหตุฉุกเฉิน (Disaster Recovery Plan)',
      'สร้างความได้เปรียบทางธุรกิจไอที แอปพลิเคชัน คลาวด์ และฟินเทค'
    ],
    benefitsEN: [
      'Insure against severe data leaks, ransomware payouts, and PDPA fines',
      'Assert extreme security credentials to tech companies, banks, and enterprises',
      'Establish certified Business Continuity Plans (BCP) and disaster responses',
      'Become a highly certified service provider in Software/Cloud fields'
    ],
    stepsTH: [
      'ขั้นตอนที่ 1: ตรวจประเมิน Statement of Applicability (SoA)',
      'ขั้นตอนที่ 2: สแกนแผนกความปลอดภัยระบบไอที ทดสอบแผนฉุกเฉินสำรวจหน้างานจริง',
      'ขั้นตอนที่ 3: อนุมัติใบประกาศสากล ISO 27001',
      'ขั้นตอนที่ 4: ตรวจรันระบบรักษาความปลอดภัย ติดตามระบบประจำปี'
    ],
    stepsEN: [
      'Step 1: Pre-assessment audit of controls and Statement of Applicability (SoA)',
      'Step 2: Penetrative network process check, server logs, backup test onsite',
      'Step 3: Technical reviewer sign-off and ISO 27001 official accreditation',
      'Step 4: Continuous system defense evaluation and annual auditing'
    ],
    baseCost: 55000,
    baseDays: 7,
    whatIsItTH: "มาตรฐานสากลด้านความมั่นคงปลอดภัยสารสนเทศ (ISMS) ครอบคลุมการรักษาความลับ ความถูกต้อง และความพร้อมใช้งานของข้อมูลองค์กร ทั้งในรูปแบบดิจิทัลและเอกสาร",
    whatIsItEN: "The leading global standard for Information Security Management Systems (ISMS) establishing controls to safeguard data assets from cyber attacks, system failures, and digital espionage.",
    benefitsDetailedTH: [
      "ป้องกันการโจมตีจากแฮกเกอร์ มัลแวร์เรียกค่าไถ่ (Ransomware) และข้อมูลลูกค้ารั่วไหลที่สร้างความเสียหายด้านงบประมาณมหาศาล",
      "สอดคล้องตามพ.ร.บ.คุ้มครองข้อมูลส่วนบุคคล (PDPA) ของประเทศไทย ป้องกันโทษปรับและความรับผิดชอบของบริษัท",
      "สร้างความเชื่อมั่นอย่างมีระดับเพื่อรับบริการงานระดับองค์กรกับกลุ่มสถาบันการเงิน ธนาคาร หรือโปรเจกต์ไอทีขนาดใหญ่",
      "มีแผนความต่อเนื่องทางธุรกิจ (BCP) และแผนกู้คืนระบบหลังภัยพิบัติ (Disaster Recovery) ที่พร้อมใช้งานได้จริงเมื่อระบบล่ม"
    ],
    benefitsDetailedEN: [
      "Eliminate cyber vulnerabilities and prevent ransomware exploitation or damaging database leaks",
      "Fully align and satisfy all Thai PDPA guidelines and international privacy acts",
      "Acquire premier status as a certified vendor eligible for government, FinTech, and banking cloud systems bidding",
      "Establish functional IT disaster recovery plans and minimize downtime during hardware outages"
    ],
    principlesTH: [
      "การรักษาความลับ (Confidentiality) จำกัดสิทธิ์ให้ผู้มีอำนาจเท่านั้นที่เข้าถึงข้อมูลได้",
      "การรักษาความถูกต้อง (Integrity) ป้องกันไม่ให้ข้อมูลถูกแก้ไขดัดแปลงอย่างไม่ถูกต้อง",
      "ความพร้อมใช้งาน (Availability) รับประกันความเสถียรของระบบเพื่อให้เรียกใช้งานข้อมูลได้ทุกเมื่อที่ต้องการ"
    ],
    principlesEN: [
      "Confidentiality: Ensuring that data is accessible only to those with authorized credentials",
      "Integrity: Safeguarding data from unauthorized modifications and malicious editing",
      "Availability: Keeping IT resources and servers active and running whenever required by customers"
    ],
    keyPointsTH: [
      "การระบุความเสี่ยงและจัดหมวดหมู่สินทรัพย์ไอที รวมถึงระบุผู้ดูแลรับผิดชอบอย่างโปร่งใส",
      "การเข้ารหัสข้อมูลที่อ่อนไหว (Data Encryption) ทั้งขณะบันทึกเก็บและส่งต่อผ่านเครือข่าย",
      "การอบรมทัศนคติความปลอดภัยไซเบอร์แก่พนักงานทุกคน (Cybersecurity Awareness) เพื่อลดความเสี่ยงโดน Phishing"
    ],
    keyPointsEN: [
      "Meticulous cataloging and vulnerability mapping of all digital hardware and software assets",
      "Enforce end-to-end data encryption for files in storage and during internet transit",
      "Mandatory staff security training (phishing tests, passkey safety) to reduce human vulnerabilities"
    ]
  },
  {
    id: 'gdp',
    code: 'GDP (Good Distribution Practice)',
    nameTH: 'มาตรฐานหลักเกณฑ์ที่ดีในการกระจายยาและเครื่องมือแพทย์',
    nameEN: 'Good Distribution Practice (GDP)',
    category: 'Express Certifications',
    accreditation: ['QAIC-Group'],
    shortDescTH: 'การจัดเก็บและจัดส่งเวชภัณฑ์อย่างถูกหลักสากล ควบคุมอุณหภูมิและความปลอดภัยตลอดเส้นทาง',
    shortDescEN: 'The mandatory guideline for quality, temperature control, and safety of medical cargo.',
    longDescTH: 'มาตรฐานประกันว่ายา อุปกรณ์การแพทย์ และเวชภัณฑ์ ได้รับการควบคุมและดูแลอย่างเหมาะสม ตลอดการขนส่ง สต็อกสินค้า และการกระจายไปยังโรงพยาบาลหรือร้านยา',
    longDescEN: 'Strict criteria for maintaining pharmaceuticals, diagnostics, biologicals, and medical implants under specific environmental criteria during storage, shipping, and routing.',
    benefitsTH: [
      'เพิ่มความมั่นใจต่อผู้ผลิตยาระดับโลกในการให้สิทธิ์การจัดจำหน่ายในไทย',
      'สอดรับกับข้อกำหนดอุตสาหกรรมยา สากล WHO GDP และสาธารณสุขไทย',
      'ควบคุมอุณหภูมิและความเสี่ยงยาเสื่อมสภาพอย่างเป็นเอกภาพระบบ',
      'เปิดเส้นทางการประมูลจัดหาเครื่องมือแพทย์เข้าสู่กลุ่มรพ.มหาวิทยาลัย'
    ],
    benefitsEN: [
      'Secure prestige distribution rights from leading international drugmakers',
      'Satisfy local public health ministries and WHO GDP standard controls',
      'Sustain temperature logs (Cold-Chain) and prevent pharmaceutical degradation',
      'Gain leading points in prestigious public tertiary hospital tenders'
    ],
    stepsTH: [
      'ขั้นตอนที่ 1: ตรวจสอบความถูกต้องระบบคลังจัดเก็บและยานพาหนะคุมอุณหภูมิ',
      'ขั้นตอนที่ 2: สอบทานเอกสารควบคุมคุณภาพออฟไลน์',
      'ขั้นตอนที่ 3: มอบใบรับรองระบบ GDP ประจำสาขา',
      'ขั้นตอนที่ 4: ตรวจประเมินรักษามาตรฐานยารายปีอย่างต่อเนื่อง'
    ],
    stepsEN: [
      'Step 1: Physical assessment of storage warehouse layout and temperature logistics vehicles',
      'Step 2: Verification of quality control paperwork and transport logging procedures',
      'Step 3: Verification approval and official GDP certificate grant',
      'Step 4: Annual surveillance verification audits'
    ],
    baseCost: 30000,
    baseDays: 4,
    whatIsItTH: "มาตรฐานหลักเกณฑ์การกระจายยาและเครื่องมือแพทย์ (Good Distribution Practice) เพื่อรับรองว่าเวชภัณฑ์ได้รับการจัดเก็บและขนส่งด้วยระบบควบคุมสภาวะที่ปลอดภัยตลอดเส้นทางจนถึงปลายทาง",
    whatIsItEN: "Good Distribution Practice (GDP) establishes quality and security standards for the transport, storage, and logistics of pharmaceuticals, vaccines, and medical devices.",
    benefitsDetailedTH: [
      "รักษาความคงตัวและประสิทธิภาพของยา ผลิตภัณฑ์ชีววัตถุ และวัคซีน ป้องกันผลเสียต่อผู้ป่วยเนื่องจากยาเสื่อมสภาพ",
      "ได้รับสิทธิ์เป็นตัวแทนจัดจำหน่ายและนำเข้ายาอย่างเป็นทางการจากบริษัทยาข้ามชาติชั้นนำของโลก",
      "สอดคล้องตามระเบียบข้อบังคับของกระทรวงสาธารณสุขและเกณฑ์องค์การอนามัยโลก (WHO GDP)",
      "ป้องกันการปลอมปน การสูญหาย หรือการปะปนของยาปลอมเข้าสู่ระบบกระจายเวชภัณฑ์"
    ],
    benefitsDetailedEN: [
      "Sustain vaccine potency and pharmaceutical potency by eliminating temperature drops during transport",
      "Qualify for exclusive import and representation contracts with international drug makers",
      "Meet all requirements defined by the Ministry of Public Health and WHO guidelines",
      "Build verification controls to stop counterfeit, expired, or diverted drugs entering customer pipelines"
    ],
    principlesTH: [
      "การจัดทำแผนผังอุณหภูมิคลังสินค้า (Temperature Mapping) เพื่อค้นหาจุดร้อน-เย็นที่อาจเป็นอันตรายต่อยา",
      "การตรวจสอบและสอบเทียบเครื่องบันทึกอุณหภูมิ (Data Logger) ในตู้แช่และพาหนะจัดส่ง",
      "ระบบการทำความสะอาดพื้นที่จัดเก็บยาและการควบคุมฝุ่นละอองอย่างถูกลักษณะ"
    ],
    principlesEN: [
      "Execute systematic Temperature Mapping across all medical warehouse racking zones",
      "Deploy calibrated temperature logging instrumentation (Data Loggers) inside cold-chain vehicles",
      "Strict sanitation rules, ventilation, and dust prevention controls in medicine storage areas"
    ],
    keyPointsTH: [
      "การควบคุมระบบสินค้าหมดอายุก่อนให้ออกก่อน (FEFO - First Expired, First Out) อย่างเคร่งครัด",
      "ขั้นตอนการเรียกเก็บยาและผลิตภัณฑ์คืน (Product Recall) กรณีพบความบกพร่องของล็อตผลิต",
      "การฝึกอบรมบุคลากรขับขี่รถขนส่งเกี่ยวกับการควบคุมอุณหภูมิตู้ทำความเย็น"
    ],
    keyPointsEN: [
      "Strict FEFO (First-Expired, First-Out) stock rotation controls",
      "Fast and structured callback procedures to isolate defective batches during a recall event",
      "Consistent training of logistics drivers regarding cold-chain warning signs and backup procedures"
    ]
  },
  {
    id: 'iso-13485',
    code: 'ISO 13485:2016',
    nameTH: 'ระบบจัดการคุณภาพสำหรับเครื่องมือแพทย์',
    nameEN: 'Medical Devices Quality Management',
    category: 'Health & Safety',
    accreditation: ['UKAS'],
    shortDescTH: 'มาตรฐานการผลิตและควบคุมเครื่องมือทางการแพทย์ให้ปลอดภัยระดับสากล',
    shortDescEN: 'Quality management for design and manufacture of medical devices.',
    longDescTH: 'มาตรฐานที่กำหนดข้อกำหนดสำหรับระบบการจัดการคุณภาพที่องค์กรจำเป็นต้องแสดงให้เห็นถึงความสามารถในการจัดหาเครื่องมือแพทย์และบริการที่เกี่ยวข้อง',
    longDescEN: 'Specifies requirements for a quality management system where an organization needs to demonstrate its ability to provide medical devices and related services.',
    benefitsTH: [
      'สร้างความเชื่อมั่นในคุณภาพและความปลอดภัยของผลิตภัณฑ์',
      'ลดความเสี่ยงและความผิดพลาดในกระบวนการผลิต',
      'เพิ่มโอกาสในการขยายตลาดต่างประเทศ',
      'สอดคล้องกับระเบียบข้อบังคับของเครื่องมือแพทย์ทั่วโลก'
    ],
    benefitsEN: [
      'Build confidence in product quality and safety',
      'Reduce risks and errors in manufacturing processes',
      'Increase opportunities for international market expansion',
      'Comply with global medical device regulations'
    ],
    stepsTH: [
      'ขั้นตอนที่ 1: ตรวจประเมินเบื้องต้น (Gap Analysis)',
      'ขั้นตอนที่ 2: ตรวจประเมินรับรอง Stage 1 & 2',
      'ขั้นตอนที่ 3: ออกใบรับรองมาตรฐานเครื่องมือแพทย์',
      'ขั้นตอนที่ 4: ตรวจประเมินติดตามผลรายปี'
    ],
    stepsEN: [
      'Step 1: Initial Gap Analysis',
      'Step 2: Stage 1 & 2 Certification Audits',
      'Step 3: Issuance of Medical Device Certificate',
      'Step 4: Annual Surveillance Audits'
    ],
    baseCost: 48000,
    baseDays: 6,
    whatIsItTH: "มาตรฐานการจัดการคุณภาพเฉพาะทางสำหรับอุตสาหกรรมเครื่องมือแพทย์และเวชภัณฑ์ ครอบคลุมการออกแบบ พัฒนา ผลิต และจัดจำหน่ายอุปกรณ์ทางการแพทย์อย่างปลอดภัย",
    whatIsItEN: "The international Quality Management System standard specific to the medical devices sector, ensuring compliance with strict healthcare requirements.",
    benefitsDetailedTH: [
      "รับรองว่าการผลิตเครื่องมือแพทย์มีความปลอดภัยต่อคนไข้สูงสุด ลดปัญหาชิ้นส่วนเสียหายที่อาจทำให้เกิดวิกฤตความปลอดภัยโรงพยาบาล",
      "ช่วยเตรียมความพร้อมและตอบสนองต่อหลักเกณฑ์การยื่นคำขอขึ้นทะเบียนสถานที่ผลิตเครื่องมือแพทย์ของ อย.",
      "เพิ่มขีดความสามารถการค้าสู่ตลาดส่งออกทั่วโลก ทั้งยุโรป (CE Mark) และอเมริกาที่ต้องใช้ใบรับรองมาตรฐานนี้",
      "ลดอัตราสินค้าบกพร่องและลดค่าความเสียหายทางคลินิก (Clinical liabilities) ในกรณีเกิดข้อบกพร่องของผลิตภัณฑ์"
    ],
    benefitsDetailedEN: [
      "Ensure maximum patient safety by preventing device failures, shielding your company from clinical crises",
      "Sustain compliance benchmarks for swift registration approvals with domestic FDA groups",
      "Meet technical prerequisites to export protective gear, diagnostic tools, and surgical implants globally",
      "Diminish product recalls and reduce product liability claims through validated manufacturing controls"
    ],
    principlesTH: [
      "การควบคุมสภาวะสิ่งแวดล้อมที่สะอาดปราศจากฝุ่นและเชื้อโรค (Cleanroom & Bioburden Controls)",
      "การจัดการความเสี่ยงตลอดกระบวนการพัฒนาผลิตภัณฑ์ (ตามเกณฑ์ประเมิน ISO 14971)",
      "ระบบการสืบย้อนและการติดตามสินค้าหลังออกสู่ตลาด (Post-market Surveillance)"
    ],
    principlesEN: [
      "Rigorous Cleanroom, ventilation, and bioburden controls in manufacturing zones",
      "Mandatory integration of ISO 14971 risk management throughout the product lifecycle",
      "Establish detailed customer feedback loops and Post-market Surveillance systems"
    ],
    keyPointsTH: [
      "การประเมินและการตรวจสอบผลความสมบูรณ์ของขั้นตอนการฆ่าเชื้อ (Sterilization Validation)",
      "การติดฉลากระบุรหัสประจำตัวสินค้าแบบเฉพาะ (UDI - Unique Device Identification)",
      "การสอบเทียบและบำรุงรักษาเครื่องมือวิเคราะห์ผลผลิตอย่างเคร่งครัด"
    ],
    keyPointsEN: [
      "Validation of sterilization packaging barrier integrity and shelf life",
      "Rigorous identification of components using Unique Device Identification (UDI) tracking codes",
      "Strict calibration routines for testing instrumentation and scientific measuring devices"
    ]
  },
  {
    id: 'brcgs',
    code: 'BRCGS Food Safety',
    nameTH: 'มาตรฐานสากลด้านความปลอดภัยของอาหาร',
    nameEN: 'BRCGS Global Standard for Food Safety',
    category: 'Food Safety & GMP',
    accreditation: ['UKAS'],
    shortDescTH: 'มาตรฐานระดับโลกสำหรับผู้ผลิตอาหารเพื่อส่งออกไปยังเครือข่ายค้าปลีกชั้นนำ',
    shortDescEN: 'The global standard for food safety used by over 28,000 suppliers in 130 countries.',
    longDescTH: 'มาตรฐานสากลที่เน้นความปลอดภัยของอาหาร การจัดการคุณภาพ และความสอดคล้องตามกฎหมายสำหรับอุตสาหกรรมผลิตอาหาร',
    longDescEN: 'The Global Standard for Food Safety has been designed to help food businesses fulfill their legal obligations and protect the consumer.',
    benefitsTH: [
      'เป็นที่ยอมรับจากผู้ค้าปลีกรายใหญ่ทั่วโลก',
      'ลดจำนวนครั้งในการตรวจประเมินจากลูกค้า',
      'เน้นการจัดการวัฒนธรรมความปลอดภัยทางอาหาร',
      'สร้างความได้เปรียบในการแข่งขันระดับสากล'
    ],
    benefitsEN: [
      'Accepted by major retailers globally',
      'Reduce the number of customer audits',
      'Focus on food safety culture management',
      'Create a competitive advantage in the global market'
    ],
    stepsTH: [
      'ขั้นตอนที่ 1: ตรวจประเมินเพื่อการรับรอง',
      'ขั้นตอนที่ 2: จัดทำรายงานตรวจประเมิน',
      'ขั้นตอนที่ 3: รับรองโดยอิสระจากสถาบัน',
      'ขั้นตอนที่ 4: ตรวจติดตามความต่อเนื่องของระบบ'
    ],
    stepsEN: [
      'Step 1: Certification Audit',
      'Step 2: Audit Report Preparation',
      'Step 3: Independent Review and Certification',
      'Step 4: Annual Surveillance Audits'
    ],
    baseCost: 52000,
    baseDays: 5,
    whatIsItTH: "มาตรฐานระดับสูงสุดทางอาหารที่จัดตั้งโดยสมาคมผู้ค้าปลีกแห่งประเทศอังกฤษ (BRCGS) เพื่อรับรองความปลอดภัย คุณภาพกระบวนการ และกฎระเบียบของโรงงานผลิตอาหารอย่างเข้มข้น",
    whatIsItEN: "The globally recognized Food Safety Standard under GFSI oversight, widely demanded by European and North American retailers to assure food quality.",
    benefitsDetailedTH: [
      "เป็นใบเปิดทางสำหรับการนำเข้าและจัดจำหน่ายอาหารแปรรูปไปยังแบรนด์ห้างซูเปอร์มาร์เก็ตชั้นนำทั่วโลก",
      "ลดภาระการเข้าตรวจประเมินจากลูกค้าแต่ละรายซ้ำซ้อน เนื่องจากได้รับการยอมรับเทียบเท่ามาตรฐานระดับสูงแล้ว",
      "กระตุ้นและวัดผลวัฒนธรรมความปลอดภัยทางอาหาร (Food Safety Culture) ให้เกิดเป็นทัศนคติการปฏิบัติจริงของพนักงาน",
      "ลดการสูญเสียทางการผลิตจากสิ่งปนเปื้อน เช่น เศษโลหะ แก้ว หรือพลาสติก ด้วยเครื่องมือกรองแยกที่ได้รับการสอบทาน"
    ],
    benefitsDetailedEN: [
      "Qualify as an approved supplier for leading international supermarkets and hypermarkets",
      "Avoid duplicate customer quality audit visits, saving time and management resources",
      "Establish a certified Food Safety Culture across all corporate and factory operations",
      "Prevent expensive batch dumping due to physical contamination (glass, plastic, metal shards)"
    ],
    principlesTH: [
      "การจัดทำระบบความปลอดภัยอาหารที่มีการควบคุมความสะอาดระดับสูงสุด (GMP/Codex)",
      "การวางโครงสร้างและสภาพแวดล้อมโรงงานเพื่อแยกโซนสะอาด-สกปรกที่ถูกสุขลักษณะ",
      "การควบคุมการปนเปื้อนทางกายภาพ (Foreign Body Control) ด้วยเครื่องเอ็กซ์เรย์และเครื่องตรวจโลหะ"
    ],
    principlesEN: [
      "Combine active HACCP plans with meticulous sanitation standards across production zones",
      "Zoning designs to divide wet/dry and high-risk/low-risk food-handling sectors",
      "Strict metal detection and physical foreign body control policies"
    ],
    keyPointsTH: [
      "การจัดการสารก่อภูมิแพ้ (Allergen Control) เพื่อป้องกันอันตรายและคัดกรองข้ามผลิตภัณฑ์",
      "การจัดทำประเมินและมาตรการป้องกันการปลอมแปลงในห่วงโซ่อาหาร (VACCP & TACCP)",
      "ระบบสุขาภิบาลล้างทำความสะอาดเครื่องจักรและการตรวจสอบสารตกค้าง (ATP Swab) สม่ำเสมอ"
    ],
    keyPointsEN: [
      "Rigorous allergen management to avoid cross-contact during product runs",
      "Enforce food defense policies (TACCP) and food fraud vulnerability studies (VACCP)",
      "Comprehensive verification of cleaning schedules (CIP) using ATP swab testing"
    ]
  },
  {
    id: 'iso-50001',
    code: 'ISO 50001:2018',
    nameTH: 'ระบบการจัดการพลังงาน',
    nameEN: 'Energy Management System (EnMS)',
    category: 'Environmental & Energy',
    accreditation: ['UKAS', 'NAC'],
    shortDescTH: 'เพิ่มประสิทธิภาพการใช้พลังงานในองค์กรและลดต้นทุนค่าไฟ/น้ำมันอย่างยั่งยืน',
    shortDescEN: 'Improve energy performance and cut operational costs through better management.',
    longDescTH: 'มาตรฐานสากลที่ช่วยให้องค์กรมีแนวทางในการจัดการด้านพลังงาน เพื่อให้เกิดการใช้พลังงานอย่างมีประสิทธิภาพสูงสุด',
    longDescEN: 'Supports organizations in all sectors to use energy more efficiently, through the development of an energy management system.',
    benefitsTH: [
      'ลดการใช้พลังงานและต้นทุนค่าใช้จ่ายด้านพลังงาน',
      'มีส่วนร่วมในการลดการปล่อยก๊าซเรือนกระจก',
      'สร้างความยั่งยืนทางการดำเนินธุรกิจ',
      'ปรับปรุงสมรรถนะด้านพลังงานอย่างต่อเนื่อง'
    ],
    benefitsEN: [
      'Reduce energy consumption and costs',
      'Contribute to decreasing greenhouse gas emissions',
      'Promote business sustainability',
      'Continually improve energy performance'
    ],
    stepsTH: [
      'ขั้นตอนที่ 1: ตรวจสอบพื้นฐานการใช้พลังงาน',
      'ขั้นตอนที่ 2: ตรวจประเมินรับรองระบบ Energy Management',
      'ขั้นตอนที่ 3: ออกใบประกาศนียบัตร EnMS',
      'ขั้นตอนที่ 4: ตรวจติดตามผลประหยัดพลังงานรายปี'
    ],
    stepsEN: [
      'Step 1: Baseline Energy Use Review',
      'Step 2: EnMS Certification Audits',
      'Step 3: Issuance of EnMS Certificate',
      'Step 4: Annual Surveillance of Energy Gains'
    ],
    baseCost: 42000,
    baseDays: 6,
    whatIsItTH: "มาตรฐานระบบการจัดการพลังงาน (Energy Management System - EnMS) เพื่อช่วยให้องค์กรกำหนดเกณฑ์การใช้พลังงาน วางเป้าหมายการประหยัดพลังงาน และใช้อย่างมีประสิทธิภาพสูงสุด",
    whatIsItEN: "The international Energy Management System (EnMS) standard providing a systematic framework to continuously improve energy performance, efficiency, and consumption profiles.",
    benefitsDetailedTH: [
      "ลดต้นทุนการใช้จ่ายด้านพลังงานไฟฟ้า เชื้อเพลิง และก๊าซในระบบอุตสาหกรรมลงอย่างเป็นรูปธรรม 10-25%",
      "ช่วยสร้างตัวชี้วัดประสิทธิภาพด้านพลังงาน (EnPIs) ที่ชัดเจน ตรวจวัดและทบทวนความคุ้มค่าของเครื่องจักรได้จริง",
      "มีส่วนร่วมโดยตรงในการลดการปล่อยก๊าซเรือนกระจก สอดรับนโยบายด้านคาร์บอนต่ำ (Net Zero Emissions)",
      "สร้างความเชื่อมั่นให้แก่นักลงทุนในฐานะองค์กรที่เป็นมิตรต่อสิ่งแวดล้อมตามเกณฑ์ ESG"
    ],
    benefitsDetailedEN: [
      "Cut down energy bills (electricity, oil, gas) by 10-25% through optimized utilization designs",
      "Establish scientific Energy Performance Indicators (EnPIs) to assess machine efficiency",
      "Directly support climate protection objectives by minimizing corporate greenhouse gas emissions",
      "Upgrade corporate ESG ratings to satisfy green investment requirements"
    ],
    principlesTH: [
      "การสำรวจทบทวนพลังงาน (Energy Review) เพื่อค้นหาเครื่องจักรหรือแผนกที่เป็นจุดใช้พลังงานหลัก (SEUs)",
      "การจัดทำค่าฐานการใช้พลังงาน (Energy Baseline - EnB) เพื่อใช้เป็นจุดอ้างอิงเปรียบเทียบผลประหยัด",
      "การออกแบบกระบวนการผลิตและการจัดซื้ออุปกรณ์ที่มุ่งเน้นประสิทธิภาพการประหยัดพลังงานระดับสูง"
    ],
    principlesEN: [
      "Perform an Energy Review to isolate Significant Energy Users (SEUs) in facilities",
      "Establish an Energy Baseline (EnB) reference point to verify future performance improvements",
      "Integrate high-efficiency criteria in buying protocols and project designs"
    ],
    keyPointsTH: [
      "การบำรุงรักษาเชิงป้องกันเครื่องจักรขนาดใหญ่ (บอยเลอร์, คอมเพรสเซอร์ลม, ระบบความเย็น)",
      "การสร้างวัฒนธรรมช่วยประหยัดพลังงานและการให้รางวัลพนักงานที่สร้างสรรค์นวัตกรรมประหยัดไฟ",
      "การวัดผลและทบทวนความคุ้มค่าของการประหยัดพลังงานอย่างสม่ำเสมอโดยผู้เชี่ยวชาญ"
    ],
    keyPointsEN: [
      "Continuous preventative maintenance of high-consumption utilities (compressors, boilers, chillers)",
      "Establish staff energy-saving rewards and educate teams on daily conservation actions",
      "Frequent verification audits of target energy reductions"
    ]
  },
  {
    id: 'iatf-16949',
    code: 'IATF 16949:2016',
    nameTH: 'มาตรฐานระบบจัดการคุณภาพอุตสาหกรรมยานยนต์',
    nameEN: 'Automotive Quality Management System',
    category: 'Quality & Risk',
    accreditation: ['IATF'],
    shortDescTH: 'ตั๋วเข้าสู่ห่วงโซ่อุปทานผู้ผลิตชิ้นส่วนยานยนต์ชั้นนำระดับโลก',
    shortDescEN: 'The global technical specification and quality management standard for the automotive industry.',
    longDescTH: 'มาตรฐานระบบบริหารงานคุณภาพสำหรับอุตสาหกรรมยานยนต์ ซึ่งเน้นการพัฒนาปรับปรุงอย่างต่อเนื่อง การป้องกันความบกพร่อง และการลดความแปรปรวนและความสูญเสียในห่วงโซ่อุปทาน',
    longDescEN: 'One of the automotive industry’s most widely used international standards for quality management, focusing on continuous improvement and defect prevention.',
    benefitsTH: [
      'เข้าเป็นคู่ค้าในอุตสาหกรรมยานยนต์ระดับโลก',
      'ลดของเสียและความแปรปรวนในกระบวนการผลิต',
      'เพิ่มประสิทธิภาพในห่วงโซ่อุปทาน',
      'แสดงถึงความมุ่งมั่นในคุณภาพระดับสูงสุด'
    ],
    benefitsEN: [
      'Become a global automotive supply chain partner',
      'Reduce waste and variation in manufacturing',
      'Increase efficiency in the supply chain',
      'Demonstrate commitment to the highest quality'
    ],
    stepsTH: [
      'ขั้นตอนที่ 1: ตรวจความพรั่งพร้อมของเอกสาร',
      'ขั้นตอนที่ 2: ตรวจประเมินหน้างานจริงอย่างละเอียด',
      'ขั้นตอนที่ 3: รับรองใบประกาศมาตรฐานยานยนต์',
      'ขั้นตอนที่ 4: ตรวจประเมินติดตามผลอย่างเข้มงวด'
    ],
    stepsEN: [
      'Step 1: Document Readiness Audit',
      'Step 2: Comprehensive On-site Assessment',
      'Step 3: Issuance of Automotive Standard Certificate',
      'Step 4: Regular Surveillance Audits'
    ],
    baseCost: 65000,
    baseDays: 8,
    whatIsItTH: "มาตรฐานระบบการจัดการคุณภาพสำหรับห่วงโซ่อุปทานอุตสาหกรรมยานยนต์ ควบคุมการผลิตชิ้นส่วนยานพาหนะให้ได้สเปก ไร้ข้อบกพร่อง และลดของเสียในห่วงโซ่อุปทาน",
    whatIsItEN: "The international Quality Management System standard specific to the automotive supply chain, developed by the International Automotive Task Force (IATF).",
    benefitsDetailedTH: [
      "เป็นใบเปิดทางและเกณฑ์บังคับสำหรับการก้าวเข้าสู่การเป็นคู่ค้ากับโรงงานประกอบรถยนต์และชิ้นส่วนชั้นนำของโลก (OEMs)",
      "ลดของเสียและความแปรปรวนในสายการผลิตชิ้นส่วนลงอย่างมากด้วยการประยุกต์ใช้เครื่องมือสถิติยานยนต์",
      "ลดข้อร้องเรียนจากลูกค้าและการเคลมชิ้นงานชำรุดเสียหายหลังการประกอบรถยนต์สำเร็จ",
      "แสดงถึงขีดความสามารถการควบคุมกระบวนการขั้นสูงสุดและนวัตกรรมการผลิตชิ้นส่วนที่ได้รับการรับรองระดับสากล"
    ],
    benefitsDetailedEN: [
      "Access global automotive supply chains and fulfill bidding criteria for car manufacturers (OEMs)",
      "Decrease process variance and eliminate waste using specialized automotive statistical methodologies",
      "Significantly reduce warranty claims, component rejections, and commercial penalties from carmakers",
      "Prove world-class engineering capability and strict compliance with global auto manufacturing rules"
    ],
    principlesTH: [
      "การป้องกันข้อบกพร่องตั้งแต่ขั้นตอนการออกแบบผลิตภัณฑ์ด้วย FMEA",
      "การควบคุมการแปรปรวนของกระบวนการผลิตด้วยเครื่องมือสถิติ (Statistical Process Control - SPC)",
      "การประเมินและการยอมรับระบบการอนุมัติชิ้นส่วนสำหรับผู้ซื้อ (Production Part Approval Process - PPAP)"
    ],
    principlesEN: [
      "Failure prevention instead of finding defects, using FMEA tools in the engineering design phase",
      "Apply Statistical Process Control (SPC) to monitor and adjust critical operations",
      "Verify parts manufacturing readiness through the Production Part Approval Process (PPAP)"
    ],
    keyPointsTH: [
      "การประยุกต์ใช้เครื่องมือยานยนต์ 5 ชิ้น (APQP, FMEA, MSA, SPC, PPAP) ในการทำระบบ",
      "การปฏิบัติตามข้อกำหนดเฉพาะของลูกค้าแต่ละราย (Customer Specific Requirements - CSRs) อย่างเข้มงวด",
      "ระบบการวิเคราะห์ระบบการวัด (Measurement Systems Analysis - MSA) เพื่อความแม่นยำของอุปกรณ์วัด"
    ],
    keyPointsEN: [
      "Expertise and validation of the 5 Automotive Core Tools (APQP, FMEA, MSA, SPC, PPAP)",
      "Rigorous alignment with Customer Specific Requirements (CSRs) defined by individual OEMs",
      "Validated Measurement Systems Analysis (MSA) to check the precision of instrumentation tools"
    ]
  },
  {
    id: 'tas',
    code: 'TAS (Thai Agricultural Standard)',
    nameTH: 'มาตรฐานสินค้าเกษตรและอาหารของประเทศไทย',
    nameEN: 'Thai Agricultural Standard (TAS)',
    category: 'Food Safety & GMP',
    accreditation: ['NAC'],
    shortDescTH: 'รับรองคุณภาพสินค้าเกษตรเพื่อให้เป็นไปตามมาตรฐานที่กำหนดโดยภาครัฐ',
    shortDescEN: 'Certification for agricultural products matching Thai government standards.',
    longDescTH: 'มาตรฐานสินค้าเกษตรของไทยเพื่อให้สินค้ามีคุณภาพและปลอดภัย เป็นที่ยอมรับในตลาดในประเทศและต่างประเทศ',
    longDescEN: 'Standards established by the Ministry of Agriculture and Cooperatives to ensure safety and quality of agricultural products.',
    benefitsTH: [
      'เพิ่มความเชื่อมั่นให้กับผู้บริโภคในประเทศ',
      'ช่วยให้สามารถเข้าถึงแหล่งเงินทุนและการสนับสนุนจากรัฐ',
      'ยกระดับคุณภาพสินค้าเกษตรไทยสู่สากล',
      'ลดความเสี่ยงจากการปนเปื้อนในสินค้าเกษตร'
    ],
    benefitsEN: [
      'Build confidence for domestic consumers',
      'Access to government funding and support',
      'Upgrade Thai agricultural product quality',
      'Reduce contamination risks in agricultural products'
    ],
    stepsTH: [
      'ขั้นตอนที่ 1: ตรวจสอบกระบวนการผลิต/ฟาร์ม',
      'ขั้นตอนที่ 2: สุ่มตรวจตัวอย่างสินค้า',
      'ขั้นตอนที่ 3: รับตราสัญลักษณ์มาตรฐานสินค้าเกษตร',
      'ขั้นตอนที่ 4: ติดตามผลการดำเนินงาน'
    ],
    stepsEN: [
      'Step 1: Farm/Production Process Inspection',
      'Step 2: Sample Testing',
      'Step 3: Granting of TAS Quality Mark',
      'Step 4: Continuous Performance Tracking'
    ],
    baseCost: 15000,
    baseDays: 3,
    whatIsItTH: "มาตรฐานสินค้าเกษตรและอาหารของประเทศไทย (มกษ.) เพื่อควบคุมคุณภาพ ความปลอดภัย และคุณลักษณะของสินค้าเกษตรให้เหมาะสมและไร้สารตกค้างทางเคมี",
    whatIsItEN: "The Thai Agricultural Standard (TAS or มกษ.) established by the Ministry of Agriculture and Cooperatives to regulate food crops, packaging, and farm compliance.",
    benefitsDetailedTH: [
      "สร้างความเชื่อมั่นสูงสุดแก่ผู้บริโภคในประเทศด้วยสัญลักษณ์รับรองความปลอดภัยทางเกษตร Q-Mark",
      "ขยายช่องทางนำเสนอสินค้าผัก ผลไม้ และผลผลิตทางการเกษตรเข้าจำหน่ายในห้างค้าปลีกชั้นนำและซูเปอร์มาร์เก็ต",
      "ได้รับการสนับสนุนสิทธิพิเศษในการจัดซื้อปุ๋ยชีวภาพ อุปกรณ์ฟาร์ม และการฝึกอบรมจากกระทรวงเกษตรฯ",
      "ลดการปนเปื้อนของยาฆ่าแมลง สารเคมีตกค้าง และเชื้อโรคพืชในกระบวนการเพาะปลูก"
    ],
    benefitsDetailedEN: [
      "Assert organic safety and chemical-free status using the official government Q-Mark stamp",
      "Streamline sorting, cleaning, and delivering of fresh food harvests to leading supermarket chains",
      "Qualify for government farming grants, technical training, and agricultural exhibitions",
      "Lower pesticide residues and eliminate biological pathogens in crops through managed agricultural practices"
    ],
    principlesTH: [
      "การควบคุมระบบการปฏิบัติทางการเกษตรที่ดี (GAP - Good Agricultural Practice) ในแปลงเพาะปลูก",
      "การตรวจสอบปริมาณสารเคมีตกค้างและสารปนเปื้อนที่เป็นอันตรายต่อร่างกายมนุษย์",
      "การทำความสะอาดผลผลิตและการเก็บบรรจุสินค้าเกษตรในบรรจุภัณฑ์ที่ปลอดภัย"
    ],
    principlesEN: [
      "Implement and maintain Good Agricultural Practice (GAP) standards across crops and farming fields",
      "Perform periodic chemical residue, pesticide, and heavy metals testing of harvests",
      "Sustain sanitation standards during sorting, packaging, and cold storage of farm produce"
    ],
    keyPointsTH: [
      "การควบคุมระบบดินและน้ำที่ใช้ในฟาร์มไม่ให้มีการเจือปนของสารพิษจากภายนอก",
      "การเก็บบันทึกประวัติการใส่ปุ๋ยและการฉีดพ่นสารชีวภัณฑ์อย่างโปร่งใสสามารถตรวจสอบย้อนหลังได้",
      "การรักษาความสดและความสมบูรณ์ของสินค้าเกษตรด้วยการจัดเก็บควบคุมความเย็นอย่างเหมาะสม"
    ],
    keyPointsEN: [
      "Audit of farm soils and water supplies to block chemical run-off and heavy metals",
      "Detailed logs detailing organic fertilizer types, bio-agents, and harvest dates",
      "Deploy proper temperature and ventilation setups to preserve harvest shelf life"
    ]
  }
];

export const ORGANIZATION_MEMBERS: EmployeeNode[] = [
  {
    id: 'emp-1',
    nameTH: 'ดร. อนิรุทธ์ รัตนพิมล',
    nameEN: 'Dr. Anirut Rattanapimon',
    roleTH: 'ประธานกรรมการบริหารสูงสุด (CEO & Managing Director)',
    roleEN: 'Chief Executive Officer & Managing Director',
    email: 'anirut.r@qaic-thailand.com',
    phone: '+66 2 453 8812 ext. 101',
    certifications: ['Lead ISO Auditor', 'Quality Circle Excellence Award', 'UKAS Senior Signatory'],
    avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=256&q=80',
    department: 'Executive'
  },
  {
    id: 'emp-2',
    nameTH: 'คุณภรณี วัฒนพงศ์สกุล',
    nameEN: 'Ms. Poranee Wattanapongsakul',
    roleTH: 'ผู้รักษาระบบและผู้อำนวยการด้านการขึ้นทะเบียนใบรับรอง',
    roleEN: 'Certification Registrar & Technical Director',
    email: 'poranee.w@qaic-thailand.com',
    phone: '+66 2 453 8812 ext. 102',
    certifications: ['ISO 14001 Audit Specialist', 'IRCA Lead Auditor Certification'],
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80',
    parentId: 'emp-1',
    department: 'Executive'
  },
  {
    id: 'emp-3',
    nameTH: 'อาจารย์อิทธิ ตระกูลมงคล',
    nameEN: 'Mr. Itthi Trakoolmongkol',
    roleTH: 'ผู้อำนวยการฝ่ายการตรวจประเมินรับรองมาตรฐานระบบ',
    roleEN: 'Director of Audit Operations & Chief Assessor',
    email: 'itthi.t@qaic-thailand.com',
    phone: '+66 2 453 8812 ext. 201',
    certifications: ['QMS Lead Auditor', 'EMS Lead Auditor', 'OHS Lead Auditor', 'GHPs Expert'],
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=256&q=80',
    parentId: 'emp-1',
    department: 'Auditing'
  },
  {
    id: 'emp-4',
    nameTH: 'ดร. วิภา วงศ์ตระกูลกิจ',
    nameEN: 'Dr. Wipa Wongtrakoolkit',
    roleTH: 'ผู้เชี่ยวชาญอาวุโสด้านอุตสาหกรรมอาหารและยา',
    roleEN: 'Senior Advisor for Food & Healthcare Standards',
    email: 'wipa.w@qaic-thailand.com',
    phone: '+66 2 453 8812 ext. 301',
    certifications: ['ISO 22000 Auditor', 'HACCP Committee Chairman', 'GMP Technical Writer'],
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256&q=80',
    parentId: 'emp-2',
    department: 'Technical'
  },
  {
    id: 'emp-5',
    nameTH: 'วิศวกรวิทวัส พงพัฒนบูลย์',
    nameEN: 'Mr. Wittawat Pongpattanaboon',
    roleTH: 'หัวหน้าคณะผู้ตรวจประเมินด้านเทคโนโลยีสารสนเทศและความมั่นคงปลอดภัย',
    roleEN: 'Lead Information Security Assessor',
    email: 'wittawat.p@qaic-thailand.com',
    phone: '+66 2 453 8812 ext. 208',
    certifications: ['ISO 27001 Auditor', 'CISSP', 'CISA', 'ISO 50001 Assessor'],
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=256&q=80',
    parentId: 'emp-3',
    department: 'Auditing'
  },
  {
    id: 'emp-6',
    nameTH: 'คุณกิตติ์ดนัย ไกรเกษตรดี',
    nameEN: 'Mr. Kittidanai Kraikasetdee',
    roleTH: 'ผู้จัดการส่วนหน้าและดูแลลูกค้าสัมพันธ์ประจำประเทศไทย',
    roleEN: 'Client Relations & Marketing Lead',
    email: 'kittidanai.k@qaic-thailand.com',
    phone: '+66 2 453 8812 ext. 401',
    certifications: ['ISO Standards Customer Care Certificate'],
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
    parentId: 'emp-1',
    department: 'Sales'
  },
  {
    id: 'emp-7',
    nameTH: 'คุณปรียานุช รัตนจรัส',
    nameEN: 'Ms. Preeyanuch Rattanacharas',
    roleTH: 'หัวหน้างานทะเบียนและตรวจสอบร่างใบประกาศนียบัตร',
    roleEN: 'Head Certification Administration Office',
    email: 'preeyanuch.r@qaic-thailand.com',
    phone: '+66 2 453 8812 ext. 403',
    certifications: ['Quality Assurance Documents Specialist'],
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=80',
    parentId: 'emp-2',
    department: 'Admin'
  }
];

// Rich datasets for Simulator of Certificate Verification.
// Clients search these codes in real time or custom ones to preview highly dynamic, verifiable cert layouts.
export const MOCK_CERTIFICATES: MockCertificate[] = [
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
    authorizedSignatory: 'ดร. อนิรุทธ์ รัตนพิมล (CEO)'
  },
  {
    certificateNo: 'QAIC-TH-14125',
    companyNameTH: 'บริษัท พลังงานบริสุทธิ์ไทยแลนด์จำกัด',
    companyNameEN: 'Clean Energy Thailand Co., Ltd.',
    standard: 'ISO 14001:2015',
    scopeTH: 'การออกแบบ ติดตั้ง และการบำรุงรักษาโรงผลิตไฟฟ้าจากแผงโซลาร์พลังงานแสงอาทิตย์บนกระเบื้องหลังคา',
    scopeEN: 'Design, installation, and maintenance of rooftop solar panel power generating facilities.',
    issueDate: '2024-01-08',
    expiryDate: '2027-01-07',
    status: 'Active',
    country: 'Thailand',
    authorizedSignatory: 'ดร. อนิรุทธ์ รัตนพิมล (CEO)'
  },
  {
    certificateNo: 'QAIC-TH-27001-99',
    companyNameTH: 'บริษัท เทคโซลูชันส์ดีเวลลอปเมนท์จำกัด',
    companyNameEN: 'TechSolutions Development Co., Ltd.',
    standard: 'ISO 27001:2022',
    scopeTH: 'การทำงานของระบบคลาวด์ข้อมูล การบริการโครงสร้างไอที และซอฟต์แวร์ประมวลการประมูลภาษี',
    scopeEN: 'The operations of data cloud hosting backend, IT infrastructure services, and tax-bidding software processing.',
    issueDate: '2025-05-10',
    expiryDate: '2028-05-09',
    status: 'Active',
    country: 'Thailand',
    authorizedSignatory: 'คุณภรณี วัฒนพงศ์สกุล (Technical Director)'
  },
  {
    certificateNo: 'QAIC-TH-FOOD-HACCP',
    companyNameTH: 'ห้างหุ้นส่วนจำกัด ครัวจอมทองเฮลธ์แคร์',
    companyNameEN: 'Jomthong Healthcare Kitchen Limited Partnership',
    standard: 'HACCP & GHPs (Codex Edition 2020)',
    scopeTH: 'การปรุงอาหาร โรงครัวจัดเตรียมอาหาร และกระจายสู่ห้องผู้ป่วยหนักในเขตภาคกลางประเทศไทย',
    scopeEN: 'The cooking, kitchen-preparation, and secure distribution of patients meals to intensive care units in Central Thailand.',
    issueDate: '2023-11-20',
    expiryDate: '2026-11-19',
    status: 'Active',
    country: 'Thailand',
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
    authorizedSignatory: 'คุณภรณี วัฒนพงศ์สกุล (Technical Director)'
  },
  {
    certificateNo: 'QAIC-TH-SUSPEND-XM',
    companyNameTH: 'บริษัท ยานยนต์ดั้งเดิมอุตสาหกรรม จำกัด',
    companyNameEN: 'Traditional Automotives Industrial Ltd.',
    standard: 'ISO 9001:2015',
    scopeTH: 'การหล่อเหล็กประกอบแม่พิมพ์ช่วงล่าง และน็อตเพลาขับ',
    scopeEN: 'Casting of steel for chassis molds and drive shaft nuts.',
    issueDate: '2020-03-01',
    expiryDate: '2023-02-28',
    status: 'Suspended',
    country: 'Thailand',
    authorizedSignatory: 'ดร. อนิรุทธ์ รัตนพิมล (CEO)'
  },
  {
    certificateNo: 'QAIC-TH-EXPIRED-99',
    companyNameTH: 'สำนักพิมพ์ มหาวิทยาลัยนิติกาล',
    companyNameEN: 'Nitikarn University Press Office',
    standard: 'ISO 9001:2015',
    scopeTH: 'การรับจ้างจัดพิมพ์ ผลิตตำราวิชาการ และหนังสืออิเล็กทรอนิกส์ด้านกฎหมาย',
    scopeEN: 'Printing contract work, manufacturing academic textbook materials, and electronic law publications.',
    issueDate: '2019-12-01',
    expiryDate: '2022-11-30',
    status: 'Expired',
    country: 'Thailand',
    authorizedSignatory: 'ดร. อนิรุทธ์ รัตนพิมล (CEO)'
  }
];

// Simple, fun & insightful diagnostic questions
export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    questionTH: 'ประเภทอุตสาหกรรมหลักของธุรกิจท่านคืออะไร?',
    questionEN: 'What is your primary business sector?',
    options: [
      {
        labelTH: 'อุตสาหกรรมโรงงานผลิต / แปรรูปของใช้ทั่วไป / ก่อสร้าง',
        labelEN: 'Manufacturing / Industrial Processing / Construction',
        points: { 'iso-9001': 5, 'iso-14001': 4, 'iso-45001': 4 }
      },
      {
        labelTH: 'ธุรกิจด้านอาหาร / คาเฟ่ / โรงจ้างผลิตอาหาร / ผลิตเพื่อส่งออก',
        labelEN: 'Food Services / Bakery / Food Manufacturing / Catering',
        points: { 'haccp': 10, 'iso-22000': 8, 'iso-9001': 3 }
      },
      {
        labelTH: 'ผู้พัฒนาซอฟต์แวร์ / คลาวด์แอปพลิเคชัน / บริการระบบสารสนเทศ',
        labelEN: 'Software Dev / Cloud / IT SaaS / Telecom Data',
        points: { 'iso-27001': 10, 'iso-9001': 4 }
      },
      {
        labelTH: 'คลังจัดเก็บบริการขนส่ง หรือ ตัวแทนกระจายสินค้าทางการแพทย์และเวชภัณฑ์',
        labelEN: 'Temperature Logistic Services / Medical Warehousing',
        points: { 'gdp': 10, 'iso-9001': 3 }
      },
      {
        labelTH: 'การบริการลูกค้าทั่วไป / สำนักงานออฟฟิศ / อสังหาริมทรัพย์ / การค้าปลีก',
        labelEN: 'Client Consulting Services / Retailing / Commercial Offices',
        points: { 'iso-9001': 8 }
      }
    ]
  },
  {
    id: 2,
    questionTH: 'เป้าหมายหลักของการต้องการขอใบรับรองครั้งนี้คืออะไร?',
    questionEN: 'What is your main driver for getting certified?',
    options: [
      {
        labelTH: 'เพื่อเป็นใบเบิกทางเข้าแข่งขันงานประมูล / ยื่นข้อเสนอสัญญาใหญ่ / ราชการ',
        labelEN: 'Entering large scale contracts / Premium private B2B & government bids',
        points: { 'iso-9001': 6, 'iso-14001': 4, 'iso-27001': 4, 'gdp': 4 }
      },
      {
        labelTH: 'เพื่อยกระดับระบบความปลอดภัย ปกป้องพนักงาน ลดข้อพิพาทความเสี่ยงกฎหมาย',
        labelEN: 'To boost high workspace safety & protect human workforce',
        points: { 'iso-45001': 10 }
      },
      {
        labelTH: 'เพื่อเข้าสู่ระเบียบข้อบังคับ Green Industry ปฏิบัติตัวเป็นมิตรสิ่งแวดล้อมสากล',
        labelEN: 'Aligning with national Green factory laws & carbon footprint restrictions',
        points: { 'iso-14001': 10 }
      },
      {
        labelTH: 'เพื่อสร้างความปลอดภัยข้อมูลผู้ใช้อย่างเคร่งคัด สอดรับ PDPA และความมั่นใจระบบ',
        labelEN: 'Establishing extreme client trust, cloud privacy controls & matching PDPA',
        points: { 'iso-27001': 10 }
      }
    ]
  },
  {
    id: 3,
    questionTH: 'ขนาดและจำนวนบุคคลกรภายใต้พื้นที่ปฏิบัติงานที่จะขอรับรอง?',
    questionEN: 'What is the total headcount in scope for certification?',
    options: [
      {
        labelTH: 'ขนาดเล็ก (น้อยกว่า 15 คน) เน้นกระชับรวดเร็ว สารฐานข้อมูลสั้น',
        labelEN: 'Small team (< 15 members) - focused, agile, swift cycle',
        points: { 'iso-9001': 3, 'gdp': 4 }
      },
      {
        labelTH: 'ขนาดกลาง (16 - 100 คน) มีผังหน่วยงานต่างจังหวัดหรือคลังหลัก',
        labelEN: 'Medium business (16 - 100 members) - multi-tier management',
        points: { 'iso-9001': 4, 'iso-14001': 4, 'iso-45001': 4 }
      },
      {
        labelTH: 'ขนาดใหญ่ (มากกว่า 100 คนขึ้นไป) เป็นแบรนด์มหาชน หรือมีสายพานเครื่องจักรเทอะทะ',
        labelEN: 'Enterprise size (> 100 members) - high physical risks / factories',
        points: { 'iso-14001': 6, 'iso-45001': 8, 'iso-22000': 6 }
      }
    ]
  },
  {
    id: 4,
    questionTH: 'คู่ค้าของท่านกำหนดข้อกำหนดด้านตลาดระหว่างประเทศหรือไม่?',
    questionEN: 'Do you require UKAS internationally recognized accreditation?',
    options: [
      {
        labelTH: 'ต้องการสูงสุด (อิงประกาศนียบัตรอังกฤษ UKAS เพื่อการส่งออกสากล)',
        labelEN: 'Highly required (Global export / UKAS UK certification prestige)',
        points: { 'iso-9001': 5, 'iso-14001': 5, 'iso-27001': 5, 'iso-45001': 5 }
      },
      {
        labelTH: 'เน้นคุ้มค่า คุ้มต้นทุน (ต้องการความพึงพอใจการค้าในไทย มี NAC รับรอง)',
        labelEN: 'Cost-oriented (Local validations & regional Thai NAC seal is perfect)',
        points: { 'iso-9001': 3, 'haccp': 4, 'iso-14001': 3 }
      }
    ]
  }
];
