/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface BusinessSector {
  id: string;
  iconName: string;
  titleTH: string;
  titleEN: string;
  descriptionTH: string;
  descriptionEN: string;
  whatIsItTH: string;
  whatIsItEN: string;
  roleTH: string;
  roleEN: string;
  standardsTH: string[];
  standardsEN: string[];
}

export const BUSINESS_SECTORS: BusinessSector[] = [
  {
    id: 'energy',
    iconName: 'Zap',
    titleTH: 'พลังงาน',
    titleEN: 'Energy',
    descriptionTH: 'กลุ่มอุตสาหกรรมจัดหา ผลิต และส่งจ่ายพลังงานไฟฟ้า น้ำมัน และพลังงานสะอาด',
    descriptionEN: 'Electricity, petroleum, natural gas, and renewable energy sectors.',
    whatIsItTH: 'กลุ่มอุตสาหกรรมที่ครอบคลุมการขุดเจาะ ผลิต แปรรูป และจัดจำหน่ายพลังงานทุกรูปแบบ ทั้งพลังงานฟอสซิล (น้ำมัน แก๊สธรรมชาติ) และพลังงานหมุนเวียน/พลังงานสะอาด (แสงอาทิตย์ ลม น้ำ ชีวมวล) ซึ่งเป็นรากฐานสำคัญในการขับเคลื่อนเศรษฐกิจระดับประเทศ',
    whatIsItEN: 'A sector covering the sourcing, production, refining, and distribution of all energy forms, including fossil fuels (petroleum, natural gas) and renewable/clean energy (solar, wind, hydro, biomass), which form the foundation of national economic growth.',
    roleTH: 'สร้างความมั่นคงทางพลังงาน พัฒนาโครงสร้างพื้นฐานในการส่งจ่ายพลังงานอย่างมีประสิทธิภาพ และยกระดับกระบวนการผลิตและการใช้พลังงานให้เป็นมิตรต่อสิ่งแวดล้อม ลดการปล่อยก๊าซเรือนกระจกเพื่อมุ่งสู่เป้าหมายความร่วมมือด้านสภาพภูมิอากาศสากล',
    roleEN: 'Ensuring energy security, building efficient power distribution infrastructure, and upgrading production processes to be environmentally friendly, thereby reducing greenhouse gas emissions to achieve global climate targets.',
    standardsTH: ['ISO 50001 (ระบบจัดการพลังงาน)', 'ISO 14001 (ระบบจัดการสิ่งแวดล้อม)', 'ISO 9001 (ระบบจัดการคุณภาพ)', 'ISO 45001 (ความปลอดภัยและอาชีวอนามัย)'],
    standardsEN: ['ISO 50001 (Energy Management)', 'ISO 14001 (Environmental Management)', 'ISO 9001 (Quality Management)', 'ISO 45001 (Occupational Health & Safety)']
  },
  {
    id: 'food-agri',
    iconName: 'Utensils',
    titleTH: 'อาหารและเกษตร',
    titleEN: 'Food and Agriculture',
    descriptionTH: 'การเพาะปลูก แปรรูป จัดเก็บ และจัดจำหน่ายอาหารและผลผลิตทางการเกษตร',
    descriptionEN: 'Cultivation, processing, storage, and distribution of food and agriculture products.',
    whatIsItTH: 'ห่วงโซ่อุปทานอาหารและการเกษตรตั้งแต่ระดับต้นน้ำ (ฟาร์มและการเพาะปลูก) กลางน้ำ (โรงงานแปรรูปอาหารและเครื่องดื่ม) ไปจนถึงปลายน้ำ (การขนส่ง จัดจำหน่าย และร้านอาหาร) ที่ต้องการการควบคุมสุขอนามัยอย่างเคร่งครัด',
    whatIsItEN: 'The food and agricultural supply chain starting from upstream (farming and cultivation), midstream (food and beverage processing plants), to downstream (logistics, retail, and restaurants) which require strict hygiene and safety control.',
    roleTH: 'ควบคุมคุณภาพและความปลอดภัยของอาหารเพื่อปกป้องสุขภาพของผู้บริโภค ป้องกันการปนเปื้อนในทุกขั้นตอนของกระบวนการผลิต (Farm to Fork) และส่งเสริมความยั่งยืนในอุตสาหกรรมการเกษตร',
    roleEN: 'Controlling food quality and safety to protect consumer health, preventing contamination at every step of the process (Farm to Fork), and promoting sustainability in the agricultural industry.',
    standardsTH: ['HACCP (การวิเคราะห์อันตรายและจุดวิกฤตที่ต้องควบคุม)', 'GHPs/GMP (หลักเกณฑ์วิธีการที่ดีในการผลิต)', 'ISO 22000 (ระบบจัดการความปลอดภัยของอาหาร)', 'BRCGS (มาตรฐานสากลความปลอดภัยอาหาร)', 'มกอช. (TAS)'],
    standardsEN: ['HACCP (Hazard Analysis & Critical Control Points)', 'GHPs/GMP (Good Hygiene/Manufacturing Practices)', 'ISO 22000 (Food Safety Management System)', 'BRCGS (Global Standard for Food Safety)', 'TAS (Thai Agricultural Standard)']
  },
  {
    id: 'it-telecom',
    iconName: 'Cpu',
    titleTH: 'ไอทีและการสื่อสาร',
    titleEN: 'IT and Communications',
    descriptionTH: 'ธุรกิจบริการเทคโนโลยีสารสนเทศ พัฒนาซอฟต์แวร์ คลาวด์ และโทรคมนาคม',
    descriptionEN: 'Information technology services, software development, cloud, and telecom infrastructure.',
    whatIsItTH: 'กลุ่มธุรกิจที่ให้บริการด้านเทคโนโลยี คอมพิวเตอร์ ซอฟต์แวร์ ระบบเครือข่าย อินเทอร์เน็ต คลาวด์คอมพิวเตอร์ และการสื่อสารโทรคมนาคม ซึ่งทำหน้าที่จัดการ แลกเปลี่ยน และประมวลผลข้อมูลที่มีความสำคัญขององค์กรและลูกค้า',
    whatIsItEN: 'A business sector providing technology services, computing, software development, networks, internet, cloud computing, and telecommunications, responsible for managing, exchanging, and processing critical corporate and customer data.',
    roleTH: 'รักษาความปลอดภัยข้อมูลและความเป็นส่วนตัวของลูกค้า ป้องกันภัยคุกคามและการโจมตีทางไซเบอร์ รับประกันความเสถียรในการทำงานของระบบ และปรับปรุงคุณภาพการบริการไอทีให้รวดเร็วและมีประสิทธิภาพสูงสุด',
    roleEN: 'Securing information security and client privacy, protecting systems against cyber threats and attacks, guaranteeing uptime and business continuity, and improving IT service quality to achieve maximum efficiency.',
    standardsTH: ['ISO/IEC 27001 (ระบบจัดการความปลอดภัยของข้อมูล)', 'ISO/IEC 27701 (ระบบจัดการข้อมูลส่วนบุคคล)', 'ISO/IEC 20000-1 (ระบบจัดการบริการไอที)', 'PDPA Compliance'],
    standardsEN: ['ISO/IEC 27001 (Information Security)', 'ISO/IEC 27701 (Privacy Information Management)', 'ISO/IEC 20000-1 (IT Service Management)', 'PDPA Compliance']
  },
  {
    id: 'logistics',
    iconName: 'Truck',
    titleTH: 'ขนส่งโลจิสติกส์และการบิน',
    titleEN: 'Logistics & Aviation',
    descriptionTH: 'การขนส่ง คลังสินค้า บรรจุภัณฑ์ และมาตรฐานชิ้นส่วนอุตสาหกรรมการบิน',
    descriptionEN: 'Cargo shipping, warehousing, supply chain distribution, and aviation engineering.',
    whatIsItTH: 'การเคลื่อนย้าย จัดเก็บ และการกระจายสินค้า วัตถุดิบ ตลอดจนอุตสาหกรรมอากาศยานและการบิน ซึ่งรวมถึงระบบคลังสินค้าที่อุณหภูมิควบคุมและมาตรฐานความปลอดภัยของการบินเชิงพาณิชย์',
    whatIsItEN: 'Movement, warehousing, and distribution of goods and raw materials, as well as aerospace and aviation sectors, which include temperature-controlled logistics and commercial aviation safety standards.',
    roleTH: 'ส่งมอบสินค้าให้ถึงมือผู้รับอย่างรวดเร็ว ปลอดภัย และอยู่ในสภาพสมบูรณ์ที่สุด ป้องกันความเสียหายระหว่างจัดเก็บและขนส่ง และสร้างระบบการบริหารจัดการที่มีต้นทุนต่ำสุดแต่มีประสิทธิภาพสูงสุด',
    roleEN: 'Delivering goods to recipients quickly, safely, and in perfect condition, preventing damage during storage and transport, and establishing a low-cost, high-efficiency supply chain framework.',
    standardsTH: ['GDP (หลักเกณฑ์ที่ดีในการจัดเก็บและขนส่งยาและเวชภัณฑ์)', 'ISO 9001 (ระบบจัดการคุณภาพ)', 'AS9100 (มาตรฐานระบบการจัดการคุณภาพสำหรับอุตสาหกรรมการบินและการป้องกันประเทศ)', 'ISO 45001'],
    standardsEN: ['GDP (Good Distribution Practice for medicinal products)', 'ISO 9001 (Quality Management)', 'AS9100 (Quality Management for Aviation, Space & Defense)', 'ISO 45001']
  },
  {
    id: 'petroleum',
    iconName: 'Flame',
    titleTH: 'ปิโตรเลี่ยมและเคมีภัณฑ์',
    titleEN: 'Petroleum & Chemicals',
    descriptionTH: 'การสำรวจ กลั่น ขุดเจาะปิโตรเลียม และอุตสาหกรรมการผลิตเคมีภัณฑ์ขั้นต้นและขั้นปลาย',
    descriptionEN: 'Exploration, refining, drilling, and processing of petrochemical products.',
    whatIsItTH: 'อุตสาหกรรมหนักที่เปลี่ยนสภาพน้ำมันดิบ แก๊สธรรมชาติ และสารเคมีพื้นฐานให้กลายเป็นพลังงานน้ำมัน เม็ดพลาสติก ปุ๋ย สารทำละลาย และเคมีภัณฑ์ต่าง ๆ ที่ใช้ในอุตสาหกรรมอื่น',
    whatIsItEN: 'Heavy industrial sectors converting crude oil, natural gas, and basic chemical feeds into petroleum fuels, plastic resins, fertilizers, solvents, and various industrial chemical reagents.',
    roleTH: 'ควบคุมกระบวนการผลิตภายใต้มาตรฐานความปลอดภัยระดับสูงสุด ป้องกันความเสี่ยงจากการระเบิด การรั่วไหล และอุบัติภัยร้ายแรง พร้อมลดผลกระทบสิ่งแวดล้อมจากการปล่อยของเสียและมลพิษเคมี',
    roleEN: 'Controlling operational processes under the highest safety protocols, preventing hazards such as explosions, leaks, and severe accidents, and minimizing industrial waste and chemical pollution.',
    standardsTH: ['ISO 45001 (ความปลอดภัยและอาชีวอนามัย)', 'ISO 14001 (ระบบจัดการสิ่งแวดล้อม)', 'ISO 9001 (ระบบจัดการคุณภาพ)', 'ISO 22301 (การบริหารความต่อเนื่องทางธุรกิจ)'],
    standardsEN: ['ISO 45001 (Occupational Health & Safety)', 'ISO 14001 (Environmental Management)', 'ISO 9001 (Quality Management)', 'ISO 22301 (Business Continuity Management)']
  },
  {
    id: 'medical-health',
    iconName: 'HeartPulse',
    titleTH: 'การแพทย์และบริการสุขภาพ',
    titleEN: 'Medical & Healthcare',
    descriptionTH: 'โรงพยาบาล คลินิก เครื่องมือแพทย์ และการบริการดูแลสุขภาพเชิงป้องกัน',
    descriptionEN: 'Clinical services, hospitals, pharmaceuticals, and medical devices manufacturing.',
    whatIsItTH: 'กลุ่มธุรกิจโรงพยาบาล สถานพยาบาล คลินิก ตลอดจนโรงงานผลิตยา วัสดุสิ้นเปลืองทางการแพทย์ และเครื่องมือการแพทย์ที่ต้องการคุณภาพ ความสะอาด และความแม่นยำสูงมากเพื่อความปลอดภัยของผู้ป่วย',
    whatIsItEN: 'Hospitals, medical centers, clinics, as well as pharmaceuticals, medical disposables, and medical equipment manufacturers requiring extreme quality, sterility, and precision to ensure patient safety.',
    roleTH: 'รับประกันคุณภาพการวินิจฉัยและดูแลรักษาผู้ป่วย ป้องกันการติดเชื้อในสถานพยาบาล ตลอดจนควบคุมกระบวนการออกแบบและผลิตเครื่องมือแพทย์ให้อัตราความผิดพลาดเป็นศูนย์ (Zero defect)',
    roleEN: 'Ensuring diagnostics and patient care quality, preventing healthcare-associated infections, and governing medical device design and manufacturing towards zero defects.',
    standardsTH: ['ISO 13485 (ระบบจัดการคุณภาพสำหรับเครื่องมือแพทย์)', 'ISO 15189 (มาตรฐานห้องปฏิบัติการทางการแพทย์)', 'ISO 9001 (ระบบจัดการคุณภาพ)', 'GMP Medical devices'],
    standardsEN: ['ISO 13485 (Medical Devices Quality Management)', 'ISO 15189 (Medical Laboratories Quality & Competence)', 'ISO 9001 (Quality Management)', 'GMP Medical devices']
  },
  {
    id: 'env-sustain',
    iconName: 'Leaf',
    titleTH: 'สิ่งแวดล้อมและความยั่งยืน',
    titleEN: 'Environment & Sustainability',
    descriptionTH: 'การจัดการของเสีย บำบัดน้ำเสีย พลังงานหมุนเวียน และการประเมินคาร์บอนเครดิต',
    descriptionEN: 'Waste recycling, carbon auditing, circular economy, and green policies.',
    whatIsItTH: 'การดำเนินงานและบริการที่เกี่ยวข้องกับการอนุรักษ์ธรรมชาติ การลดมลพิษ การจัดการของเสียชุมชนและอุตสาหกรรม ตลอดจนการประเมินปริมาณก๊าซเรือนกระจกและการชดเชยคาร์บอนเครดิตเพื่อความยั่งยืน',
    whatIsItEN: 'Operations and services targeting environmental conservation, pollution mitigation, municipal and industrial waste treatment, carbon footprint accounting, and carbon offsetting towards sustainability.',
    roleTH: 'ช่วยให้องค์กรลดผลกระทบต่อระบบนิเวศ ใช้ทรัพยากรอย่างมีประสิทธิภาพสูงสุดตามหลักเศรษฐกิจหมุนเวียน (Circular Economy) และรายงานข้อมูลสิ่งแวดล้อมและความยั่งยืนอย่างเป็นสากลและน่าเชื่อถือ',
    roleEN: 'Guiding organizations to minimize ecological impact, optimize resource efficiency based on circular economy principles, and declare environment and sustainability data with global credibility.',
    standardsTH: ['ISO 14001 (ระบบจัดการสิ่งแวดล้อม)', 'ISO 14064 (การประเมินการปล่อยก๊าซเรือนกระจก)', 'ISO 50001 (ระบบจัดการพลังงาน)', 'ISO 14067 (คาร์บอนฟุตพริ้นท์ของผลิตภัณฑ์)'],
    standardsEN: ['ISO 14001 (Environmental Management)', 'ISO 14064 (Greenhouse Gases Validation & Verification)', 'ISO 50001 (Energy Management)', 'ISO 14067 (Carbon Footprint of Products)']
  },
  {
    id: 'cert-inspection',
    iconName: 'FileCheck2',
    titleTH: 'หน่วยตรวจสอบการรับรอง',
    titleEN: 'Certification & Inspection',
    descriptionTH: 'การประเมินความสอดคล้อง การทดสอบ สอบเทียบ และออกใบรับรองสากล',
    descriptionEN: 'Calibration, testing, inspector audits, and compliance validation bodies.',
    whatIsItTH: 'หน่วยประเมินความสอดคล้อง (Conformity Assessment Bodies) หรือหน่วยงานบุคคลภายนอก (Third-party) ที่ทำหน้าที่สุ่มตรวจ วิเคราะห์ ทดสอบ สอบเทียบ และรับรองมาตรฐานระบบงาน บุคคล หรือผลิตภัณฑ์',
    whatIsItEN: 'Conformity Assessment Bodies or third-party entities performing product inspections, chemical/physical testing, calibration audits, and certification of management systems, persons, or products.',
    roleTH: 'สร้างความน่าเชื่อถือและความยอมรับให้กับสินค้าและบริการสากล รับประกันว่าหน่วยตรวจประเมินปฏิบัติงานด้วยความโปร่งใส ปราศจากผลประโยชน์ทับซ้อน และมีมาตรฐานทางวิชาการระดับสูงสุด',
    roleEN: 'Building trust and acceptance for global trade, ensuring that assessment bodies execute audits transparently, free from conflict of interest, and with the highest degree of technical competence.',
    standardsTH: ['ISO/IEC 17021-1 (ข้อกำหนดหน่วยตรวจประเมินและรับรองระบบ)', 'ISO/IEC 17025 (ข้อกำหนดความสามารถของห้องปฏิบัติการทดสอบและสอบเทียบ)', 'ISO/IEC 17020 (ข้อกำหนดหน่วยตรวจ)'],
    standardsEN: ['ISO/IEC 17021-1 (Requirements for bodies auditing management systems)', 'ISO/IEC 17025 (Competence of testing & calibration laboratories)', 'ISO/IEC 17020 (Requirements for bodies performing inspection)']
  },
  {
    id: 'construction',
    iconName: 'Hammer',
    titleTH: 'ก่อสร้างและวัสดุ',
    titleEN: 'Construction & Materials',
    descriptionTH: 'วิศวกรรมโยธา งานออกแบบสถาปัตยกรรม และการผลิตวัสดุก่อสร้างอุตสาหกรรม',
    descriptionEN: 'Structural engineering, architectural designs, concrete, steel, and cement production.',
    whatIsItTH: 'อุตสาหกรรมการออกแบบอาคาร ก่อสร้างโครงสร้างพื้นฐาน งานโยธา งานสาธารณูปโภค ตลอดจนการผลิตวัสดุก่อสร้าง เช่น ปูนซีเมนต์ เหล็กเส้น หิน ทราย และกระจกอุตสาหกรรม',
    whatIsItEN: 'Civil engineering, building architecture, public infrastructure projects, and utility works, as well as construction material manufacturing including cement, steel rebar, sand, gravel, and glass sheets.',
    roleTH: 'รับประกันความแข็งแรงปลอดภัยของโครงสร้าง ควบคุมคุณภาพงานวัสดุก่อสร้างให้สอดคล้องตามมาตรฐานอุตสาหกรรม และบริหารจัดการความปลอดภัยของวิศวกรและแรงงานหน้างานก่อสร้างเพื่อลดอุบัติเหตุเป็นศูนย์',
    roleEN: 'Ensuring structural integrity and safety, controlling material supply to meet industrial specifications, and managing construction site health and safety for workers and engineers to hit zero accidents.',
    standardsTH: ['ISO 9001 (ระบบจัดการคุณภาพ)', 'ISO 45001 (ความปลอดภัยและอาชีวอนามัย)', 'ISO 14001 (ระบบจัดการสิ่งแวดล้อม)', 'ISO 50001 (ระบบจัดการพลังงาน)'],
    standardsEN: ['ISO 9001 (Quality Management)', 'ISO 45001 (Occupational Health & Safety)', 'ISO 14001 (Environmental Management)', 'ISO 50001 (Energy Management)']
  },
  {
    id: 'tourism',
    iconName: 'Compass',
    titleTH: 'ท่องเที่ยวและบริการ',
    titleEN: 'Tourism & Services',
    descriptionTH: 'โรงแรม รีสอร์ต ธุรกิจนำเที่ยว งานบริการฟู้ดแอนด์เบฟเวอเรจ และสปา',
    descriptionEN: 'Hotels, travel agencies, luxury spas, and dining services.',
    whatIsItTH: 'อุตสาหกรรมบริการและการต้อนรับ (Hospitality) ได้แก่ โรงแรม รีสอร์ต โฮมสเตย์ ธุรกิจนำเที่ยว ร้านอาหาร สวนสนุก และบริการนันทนาการเชิงสุขภาพที่มีเป้าหมายเพื่อตอบสนองความคาดหวังของนักท่องเที่ยว',
    whatIsItEN: 'The services and hospitality industry including hotels, resorts, homestays, tour agencies, restaurants, theme parks, and wellness spas built to satisfy traveler expectations.',
    roleTH: 'ยกระดับมาตรฐานความปลอดภัยและสุขอนามัยของสถานบริการ สร้างความเชื่อมั่นและพึงพอใจให้กับผู้มาเยือน และขับเคลื่อนอุตสาหกรรมท่องเที่ยวให้เติบโตอย่างเป็นมิตรต่อชุมชนและสิ่งแวดล้อมโดยรอบ',
    roleEN: 'Elevating hygiene and safety standards across tourist facilities, building trust and satisfaction for guests, and facilitating local tourism growth while respecting communities and environments.',
    standardsTH: ['ISO 9001 (ระบบจัดการคุณภาพ)', 'ISO 22483 (มาตรฐานการบริการและข้อกำหนดสำหรับโรงแรม)', 'ISO 21101 (ระบบจัดการความปลอดภัยของการท่องเที่ยวแบบผจญภัย)'],
    standardsEN: ['ISO 9001 (Quality Management)', 'ISO 22483 (Service requirements for hotels)', 'ISO 21101 (Safety management system for adventure tourism)']
  },
  {
    id: 'education',
    iconName: 'GraduationCap',
    titleTH: 'การศึกษา',
    titleEN: 'Education',
    descriptionTH: 'โรงเรียน มหาวิทยาลัย สถาบันวิชาชีพ และศูนย์พัฒนาการเรียนรู้ออนไลน์',
    descriptionEN: 'Schools, colleges, vocational training centers, and e-learning platforms.',
    whatIsItTH: 'ระบบสถาบันการศึกษาตั้งแต่ระดับประถม มัธยม มหาวิทยาลัย ตลอดจนสถาบันฝึกอบรมอาชีพเฉพาะทาง และผู้ให้บริการระบบเรียนรู้ออนไลน์ ที่มีผู้เรียนเป็นศูนย์กลางสำคัญในการพัฒนาทักษะทรัพยากรมนุษย์',
    whatIsItEN: 'Educational system ranging from primary, secondary, and higher education to vocational learning facilities and e-learning providers where students are the core target of human resource development.',
    roleTH: 'พัฒนาขีดความสามารถการจัดระบบบริหารสถานศึกษาอย่างเป็นระบบและตรวจสอบได้ ยกระดับคุณภาพการเรียนการสอน หลักสูตร และความปลอดภัยของผู้เรียน เพื่อความพร้อมสู่มาตรฐานสากล',
    roleEN: 'Enhancing school management and administrative capabilities transparently, improving teaching and curriculum quality, guaranteeing student safety, and preparing institutions for international certification.',
    standardsTH: ['ISO 21001 (ระบบการจัดการองค์กรทางการศึกษา)', 'ISO 9001 (ระบบจัดการคุณภาพ)', 'ISO 29993 (การบริการฝึกอบรมนอกระบบการศึกษาขั้นพื้นฐาน)'],
    standardsEN: ['ISO 21001 (Educational Organizations Management System)', 'ISO 9001 (Quality Management)', 'ISO 29993 (Learning services outside formal education)']
  },
  {
    id: 'others',
    iconName: 'Layers',
    titleTH: 'อื่นๆ',
    titleEN: 'Others',
    descriptionTH: 'ธุรกิจจัดซื้อ ค้าส่ง ค้าปลีก งานบริการวิชาชีพ และธุรกิจเกิดใหม่',
    descriptionEN: 'Retails, wholesale commerce, professional agencies, and new startups.',
    whatIsItTH: 'ธุรกิจหรืออุตสาหกรรมอื่น ๆ ที่ไม่ได้จัดอยู่ในกลุ่มหลัก เช่น ค้าปลีก ค้าส่ง ธุรกิจนายหน้า สตาร์ทอัพเทคโนโลยีขั้นสูง งานบริการให้คำปรึกษาทางกฎหมาย/บัญชี และอุตสาหกรรมขนาดเบาทั่วไป',
    whatIsItEN: 'Various other industries not categorized in major sectors, such as retail and wholesale shops, trading agencies, high-tech startups, consulting, accounting/law firms, and general light industries.',
    roleTH: 'ช่วยเพิ่มขีดความสามารถในการแข่งขันของธุรกิจ ยกระดับคุณภาพการทำงานและการควบคุมภายใน และสร้างรากฐานความเป็นระบบเพื่อรองรับการเจริญเติบโตที่มั่นคงและสร้างความน่าเชื่อถือให้กับคู่ค้าสากล',
    roleEN: 'Enhancing business competitiveness, optimizing internal work processes and management controls, and establishing structured systems to support stable scaling and gain trust from international partners.',
    standardsTH: ['ISO 9001 (ระบบจัดการคุณภาพ)', 'ISO 14001 (ระบบจัดการสิ่งแวดล้อม)', 'ISO 45001 (ความปลอดภัยและอาชีวอนามัย)', 'ISO 22301 (การบริหารความต่อเนื่องทางธุรกิจ)'],
    standardsEN: ['ISO 9001 (Quality Management)', 'ISO 14001 (Environmental Management)', 'ISO 45001 (Occupational Health & Safety)', 'ISO 22301 (Business Continuity Management)']
  }
];
