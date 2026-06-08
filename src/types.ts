/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ThemeType = 'modern' | 'editorial' | 'cyber' | 'corporate';
export type FontSize = 'normal' | 'medium' | 'large';
export type Language = 'TH' | 'EN';

export interface UserSettings {
  theme: ThemeType;
  fontSize: FontSize;
  lang: Language;
  primaryColor: string; // Hex color code or Tailwind prefix
}

export interface ISOStandard {
  id: string;
  code: string;
  nameTH: string;
  nameEN: string;
  category: string;
  accreditation: ('UKAS' | 'NAC' | 'IATF' | 'QAIC-Group')[];
  shortDescTH: string;
  shortDescEN: string;
  longDescTH: string;
  longDescEN: string;
  benefitsTH: string[];
  benefitsEN: string[];
  stepsTH: string[];
  stepsEN: string[];
  baseCost: number;
  baseDays: number;
}

export interface EmployeeNode {
  id: string;
  nameTH: string;
  nameEN: string;
  roleTH: string;
  roleEN: string;
  email: string;
  phone: string;
  certifications: string[];
  avatarUrl: string;
  parentId?: string; // For org chart hierarchy
  department: 'Executive' | 'Auditing' | 'Technical' | 'Admin' | 'Sales';
}

export interface MockCertificate {
  certificateNo: string;
  companyNameTH: string;
  companyNameEN: string;
  standard: string;
  scopeTH: string;
  scopeEN: string;
  issueDate: string;
  expiryDate: string;
  status: 'Active' | 'Suspended' | 'Expired' | 'Pending';
  country: string;
  authorizedSignatory: string;
}

export interface QuizQuestion {
  id: number;
  questionTH: string;
  questionEN: string;
  options: {
    labelTH: string;
    labelEN: string;
    points: { [key: string]: number }; // Maps ISO code -> weight
  }[];
}
