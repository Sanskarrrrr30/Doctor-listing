// API Response Interface
export interface ApiDoctor {
  id: string;
  name: string;
  name_initials: string;
  photo: string;
  doctor_introduction: string;
  specialities: {
    name: string;
  }[];
  fees: string;
  experience: string;
  languages: string[];
  clinic?: any;
  // Adding other potential fields that might be in the API
  consultMode?: string[];
}

// Normalized Doctor Interface for our app
export interface Doctor {
  id: string;
  name: string;
  speciality: string[];
  consultMode: string[];
  experience: number;
  fees: number;
  photo?: string;
  languages?: string[];
}

export type FilterType = "search" | "consultType" | "specialty" | "sort";

export interface FilterState {
  search: string;
  consultType: string;
  specialties: string[];
  sort: string;
}

export type SortOption = "fees" | "experience";

export const SPECIALTIES = [
  'General Physician', 'Dentist', 'Dermatologist', 'Paediatrician', 
  'Gynaecologist', 'ENT', 'Diabetologist', 'Cardiologist', 
  'Physiotherapist', 'Endocrinologist', 'Orthopaedic', 'Ophthalmologist', 
  'Gastroenterologist', 'Pulmonologist', 'Psychiatrist', 'Urologist', 
  'Dietitian/Nutritionist', 'Psychologist', 'Sexologist', 'Nephrologist', 
  'Neurologist', 'Oncologist', 'Ayurveda', 'Homeopath'
];

export const CONSULT_TYPES = ["Video Consult", "In Clinic"];

export const SORT_OPTIONS = [
  { value: "fees", label: "Fees (Low to High)" },
  { value: "experience", label: "Experience (High to Low)" }
];
