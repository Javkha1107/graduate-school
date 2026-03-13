export interface FooterSchool {
  name: { mn: string; en: string };
  href: string;
}

export const contactInfo = {
  address: {
    mn: "Анагаахын Шинжлэх Ухааны Үндэсний Их Сургууль, С.Зоригийн гудамж, Ш/Х-48/111 Улаанбаатар хот 14210, Монгол Улс",
    en: "Mongolian National University of Medical Sciences, S.Zorig Street, P.O.Box-48/111, Ulaanbaatar 14210, Mongolia",
  },
  mapUrl: "https://maps.app.goo.gl/w9fwD15dqYGgboUZA",
  email: "graduate@mnums.edu.mn",
  phone: {
    mn: "77477575",
    en: "011 32 0623",
  },
  facebook: {
    label: "MNUMS-Graduate School",
    href: "https://www.facebook.com/profile.php?id=61568481335296",
  },
};

export const componentSchools: FooterSchool[] = [
  {
    name: { mn: "Анагаах ухааны сургууль", en: "School of Medicine" },
    href: "https://medical.mnums.edu.mn/",
  },
  {
    name: {
      mn: "Монгол анагаах ухааны сургууль",
      en: "International school of Mongolian medicine",
    },
    href: "https://www.mnums.edu.mn/surguuliud/mongol-anagaah-surguuli/",
  },
  {
    name: { mn: "Нүүр ам судлалын сургууль", en: "School of Dentistry" },
    href: "https://www.mnums.edu.mn/surguuliud/nuur-am-sudlaliin-surguuli/",
  },
  {
    name: { mn: "Био-Анагаахын сургууль", en: "School of Biomedicine" },
    href: "https://biomedicine.mnums.edu.mn/mn/",
  },
  {
    name: { mn: "Эм зүйн сургууль", en: "School of Pharmacy" },
    href: "https://www.mnums.edu.mn/surguuliud/em-zuin-surguuli/",
  },
  {
    name: { mn: "Сувилахуйн сургууль", en: "School of Nursing" },
    href: "http://e-erdem.mn/",
  },
];

export const branchSchools: FooterSchool[] = [
  {
    name: {
      mn: "Дархан-Уул аймаг дахь салбар",
      en: "Darkhan-Uul Medical School",
    },
    href: "https://www.mnums.edu.mn/surguuliud/salbar-surguuliud/darhan/",
  },
  {
    name: {
      mn: "Дорноговь аймаг дахь салбар",
      en: "Dornogobi Medical School",
    },
    href: "https://www.mnums.edu.mn/surguuliud/dornogovi/",
  },
  {
    name: {
      mn: "Говь-Алтай аймаг дахь салбар",
      en: "Gobi-Altai Medical School",
    },
    href: "https://www.mnums.edu.mn/surguuliud/salbar-surguuliud/govi-altai/",
  },
];
