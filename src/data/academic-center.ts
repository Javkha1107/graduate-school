import type { Locale } from "@/lib/i18n";

type LocalizedText = Record<Locale, string>;

export type AcademicCenterProgramLevel = "masters" | "doctoral";

export interface AcademicCenterProgram {
  code: string;
  level: AcademicCenterProgramLevel;
  credits: number;
  name: LocalizedText;
  school: LocalizedText;
}

export const academicCenterPrograms: AcademicCenterProgram[] = [
  {
    code: "091201",
    level: "masters",
    credits: 30,
    name: { mn: "Анагаах ухаан", en: "Medicine" },
    school: { mn: "Анагаах ухааны сургууль", en: "School of Medicine" },
  },
  {
    code: "091201",
    level: "doctoral",
    credits: 60,
    name: { mn: "Анагаах ухаан", en: "Medicine" },
    school: { mn: "Анагаах ухааны сургууль", en: "School of Medicine" },
  },
  {
    code: "091601",
    level: "masters",
    credits: 30,
    name: { mn: "Эм зүй", en: "Pharmacy" },
    school: { mn: "Эм зүйн сургууль", en: "School of Pharmacy" },
  },
  {
    code: "091601",
    level: "doctoral",
    credits: 60,
    name: { mn: "Эм зүй", en: "Pharmacy" },
    school: { mn: "Эм зүйн сургууль", en: "School of Pharmacy" },
  },
  {
    code: "091301",
    level: "masters",
    credits: 30,
    name: { mn: "Сувилахуй", en: "Nursing" },
    school: { mn: "Сувилахуйн сургууль", en: "School of Nursing" },
  },
  {
    code: "091301",
    level: "doctoral",
    credits: 60,
    name: { mn: "Сувилахуй", en: "Nursing" },
    school: { mn: "Сувилахуйн сургууль", en: "School of Nursing" },
  },
  {
    code: "091701",
    level: "masters",
    credits: 30,
    name: { mn: "Уламжлалт анагаах ухаан", en: "Traditional Medicine" },
    school: {
      mn: "Монгол анагаах ухааны олон улсын сургууль",
      en: "International School of Mongolian Medicine",
    },
  },
  {
    code: "091701",
    level: "doctoral",
    credits: 60,
    name: { mn: "Уламжлалт анагаах ухаан", en: "Traditional Medicine" },
    school: {
      mn: "Монгол анагаах ухааны олон улсын сургууль",
      en: "International School of Mongolian Medicine",
    },
  },
  {
    code: "091401",
    level: "masters",
    credits: 30,
    name: { mn: "Био-анагаах ухаан", en: "Biomedical Sciences" },
    school: {
      mn: "Био-Анагаахын сургууль",
      en: "School of Biomedical Sciences",
    },
  },
  {
    code: "091401",
    level: "doctoral",
    credits: 60,
    name: { mn: "Био-анагаах ухаан", en: "Biomedical Sciences" },
    school: {
      mn: "Био-Анагаахын сургууль",
      en: "School of Biomedical Sciences",
    },
  },
  {
    code: "091302",
    level: "masters",
    credits: 30,
    name: { mn: "Эх баригч", en: "Midwifery" },
    school: { mn: "Сувилахуйн сургууль", en: "School of Nursing" },
  },
  {
    code: "091302",
    level: "doctoral",
    credits: 60,
    name: { mn: "Эх баригч", en: "Midwifery" },
    school: { mn: "Сувилахуйн сургууль", en: "School of Nursing" },
  },
  {
    code: "091501",
    level: "masters",
    credits: 30,
    name: { mn: "Хөдөлгөөн засал", en: "Physical Therapy" },
    school: { mn: "Сувилахуйн сургууль", en: "School of Nursing" },
  },
  {
    code: "091501",
    level: "doctoral",
    credits: 60,
    name: { mn: "Хөдөлгөөн засал", en: "Physical Therapy" },
    school: { mn: "Сувилахуйн сургууль", en: "School of Nursing" },
  },
  {
    code: "091502",
    level: "masters",
    credits: 30,
    name: { mn: "Хөдөлмөр засал", en: "Occupational Therapy" },
    school: { mn: "Сувилахуйн сургууль", en: "School of Nursing" },
  },
  {
    code: "091502",
    level: "doctoral",
    credits: 60,
    name: { mn: "Хөдөлмөр засал", en: "Occupational Therapy" },
    school: { mn: "Сувилахуйн сургууль", en: "School of Nursing" },
  },
  {
    code: "098801",
    level: "masters",
    credits: 30,
    name: { mn: "Нийгмийн эрүүл мэнд", en: "Public Health" },
    school: {
      mn: "Нийгмийн эрүүл мэндийн сургууль",
      en: "School of Public Health",
    },
  },
  {
    code: "098801",
    level: "doctoral",
    credits: 60,
    name: { mn: "Нийгмийн эрүүл мэнд", en: "Public Health" },
    school: {
      mn: "Нийгмийн эрүүл мэндийн сургууль",
      en: "School of Public Health",
    },
  },
  {
    code: "091101",
    level: "masters",
    credits: 30,
    name: { mn: "Нүүр ам судлал", en: "Dentistry" },
    school: { mn: "Нүүр ам судлалын сургууль", en: "School of Dentistry" },
  },
  {
    code: "091101",
    level: "doctoral",
    credits: 60,
    name: { mn: "Нүүр ам судлал", en: "Dentistry" },
    school: { mn: "Нүүр ам судлалын сургууль", en: "School of Dentistry" },
  },
];

export const academicCenterContacts = {
  manager: {
    degree: {
      mn: "АУ-ы доктор",
      en: "Doctor of Medical Sciences",
    },
    name: "Энхжаргал САРАНТУЯА",
    email: "sarantuya.en@mnums.edu.mn",
  },
  specialist: {
    degree: {
      mn: "АУ-ы магистр",
      en: "Master of Medical Sciences",
    },
    name: "Ганбат ЦАЦРАЛТУЯА",
    email: "tsatsraltuya@mnums.edu.mn",
  },
  address: {
    street: {
      mn: "С.Зоригийн гудамж",
      en: "S. Zorig Street",
    },
    postal: {
      mn: "Ш/Х-48/111, Улаанбаатар хот 14210, Монгол Улс",
      en: "P.O. Box 48/111, Ulaanbaatar 14210, Mongolia",
    },
    office: {
      mn: "АШУҮИС, Ахисан түвшний сургууль, 4 тоот",
      en: "MNUMS, Graduate School, Room 4",
    },
    email: "grad.academic@mnums.edu.mn",
  },
} as const;
