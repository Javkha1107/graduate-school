export interface FacultyMember {
  name: { mn: string; en: string };
  photo: string;
  education: { mn: string; en: string };
  experience: { mn: string; en: string };
  research: { mn: string; en: string };
  link?: string;
}

export interface FacultySection {
  title: { mn: string; en: string };
  members: FacultyMember[];
}

export interface FacultyCategory {
  heading: { mn: string; en: string };
  sections: FacultySection[];
}

const UNSPLASH = (seed: string) =>
  `https://images.unsplash.com/photo-${seed}?w=300&h=300&fit=crop&crop=face`;

export const facultyData: FacultyCategory[] = [
  {
    heading: {
      mn: "АНАГААХ УХААНЫ ЧИГЛЭЛЭЭР ТАНХИМЫН СУРГАЛТЫН ХӨТӨЛБӨР ХЭРЭГЖҮҮЛЭГЧ БАГШ НАРЫН БАГИЙН АХЛАГЧ",
      en: "ON-CAMPUS TRAINING PROGRAM FACULTY TEAM LEADER IN MEDICAL SCIENCES",
    },
    sections: [
      {
        title: {
          mn: "Анагаах ухааны чиглэлээр танхимын сургалтын хөтөлбөр хэрэгжүүлэгч багш нарын багийн ахлагч",
          en: "On-Campus Training Program Faculty Team Leader in Medical Sciences",
        },
        members: [
          {
            name: { mn: "Зууннаст Хишигсүрэн", en: "Khishigsuren Zuunnast" },
            photo: UNSPLASH("1559839734-2b71ea197ec2"),
            education: {
              mn: "АШУҮИС, Сэтгэцийн эрүүл мэндийн чиглэлээр докторын хөтөлбөр",
              en: "Mongolian National University of Medical Sciences, PhD program for Mental Health",
            },
            experience: {
              mn: "АШУҮИС, АУС, Сэтгэцийн эрүүл мэндийн тэнхимийн профессор, тэнхимийн эрхлэгч, 1998/11-одоо",
              en: "Department of Mental Health, School of Medicine, MNUMS — Professor, Head of Department, 1998/11–present",
            },
            research: {
              mn: "Шүүхийн сэтгэц судлал, Хүүхдийн хүчирхийлэл, Амиа хорлолт",
              en: "Forensic Psychiatry, Child Violence, Suicide",
            },
          },
        ],
      },
    ],
  },
  {
    heading: {
      mn: "ЦАХИМ СУРГАЛТЫН ХӨТӨЛБӨР ХЭРЭГЖҮҮЛЭГЧ БАГШ НАРЫН БАГИЙН АХЛАГЧ НАР",
      en: "ONLINE TRAINING PROGRAM FACULTY TEAM LEADERS",
    },
    sections: [
      {
        title: {
          mn: "Анагаах ухааны чиглэлээр цахим сургалтын хөтөлбөр хэрэгжүүлэгч багш нарын багийн ахлагч",
          en: "Online Training Program Faculty Team Leader in Medical Sciences",
        },
        members: [
          {
            name: {
              mn: "Дашцэрэн Мягмарцэрэн",
              en: "Dashtseren Myagmartseren",
            },
            photo: UNSPLASH("1612349317150-e413f6a5b16d"),
            education: {
              mn: "ЭМШУҮИС 1998 он магистр, ЭМШУҮИС 2009 он АУ-ы доктор, АШУҮИС 2014 он дэд профессор, АШУҮИС 2023 он профессор",
              en: "HSUM 1998 MSc, HSUM 2009 MD/PhD, MNUMS 2014 Assoc. Professor, MNUMS 2023 Professor",
            },
            experience: {
              mn: "1. АШУҮИС, Ерөнхий мэргэжлийн тэнхимийн багш 2000-2013\n2. АШУҮИС, Өрхийн анагаах ухааны тэнхимийн эрхлэгч 2013-одоо\n3. Монгол Японы эмнэлэг, Өвчтөн дэмжих төвийн дарга 2022-одоо",
              en: "1. Lecturer, Dept. of General Practice & Basic Skills, MNUMS 2000–2013\n2. Head, Dept. of Family Medicine, MNUMS 2013–present\n3. Head, Patient Support Center, Mongolia-Japan Hospital 2022–present",
            },
            research: {
              mn: "Анхан шатны тусламж, Настан судлал, Халдварт бус өвчин, Амьдралын эцсийн үеийн тусламж",
              en: "Primary Health Care, Gerontology, Geriatrics, Noncommunicable Disease, Palliative Care",
            },
            link: "https://drive.google.com/open?id=17DTHxpf8ELrMZTPzIr_v2aNFzp7BrCHu",
          },
        ],
      },
      {
        title: {
          mn: "Био-Анагаах ухааны чиглэлээр цахим сургалтын хөтөлбөр хэрэгжүүлэгч багш нарын багийн ахлагч",
          en: "Online Training Program Faculty Team Leader in Biomedical Sciences",
        },
        members: [
          {
            name: {
              mn: "Лхагвасүрэн Энхсайхан",
              en: "Enkhsaikhan Lkhagvasuren",
            },
            photo: UNSPLASH("1582750433449-648ed127bb54"),
            education: {
              mn: "Токүшима Их Сургууль, Туршилтын дархлаа судлалын чиглэлээр докторын хөтөлбөр",
              en: "Tokushima University, PhD program for Experimental Immunology",
            },
            experience: {
              mn: "Гуравдугаар төв эмнэлэг, Уушигны тэнхим 2006-2009, АШУҮИС, БАС, Дархлаа судлалын тэнхимийн дэд профессор 2006-одоо",
              en: "Dept. of Pulmonology, Third Central Hospital 2006–2009; Assoc. Professor, Dept. of Immunology, School of Biomedicine, MNUMS 2006–present",
            },
            research: {
              mn: "Туршилтын дархлаа судлал, Тархины хавдар, Хавдрын эмчилгээ",
              en: "Experimental Immunology, Brain Tumor, Tumor Therapy",
            },
            link: "https://drive.google.com/open?id=1oOC4uDx5Gb65N1Mj8UYTiWJxQoGba3tv",
          },
        ],
      },
      {
        title: {
          mn: "Нийгмийн эрүүл мэндийн ухааны чиглэлээр цахим сургалтын хөтөлбөр хэрэгжүүлэгч багш нарын багийн ахлагч",
          en: "Online Training Program Faculty Team Leader in Public Health Sciences",
        },
        members: [
          {
            name: {
              mn: "Цогзолбаатар Энх-Оюун",
              en: "Enkh-Oyun Tsogzolbaatar",
            },
            photo: UNSPLASH("1594824476967-48c8b964e05a"),
            education: {
              mn: "ЭМШУҮИС АУ-ы доктор, НЭМ-ийн магистр; Жичи Их Сургууль (Япон) доктор",
              en: "MD, MPH at HSUM, Mongolia; PhD at Jichi Medical University, Japan",
            },
            experience: {
              mn: "АШУҮИС, НЭМС, Тархвар судлал, Биостатистикийн тэнхимийн дэд профессор 2009-одоо",
              en: "Assoc. Professor, Dept. of Epidemiology & Biostatistics, School of Public Health, MNUMS 2009–present",
            },
            research: {
              mn: "Халдварт өвчин, Халдварт бус өвчин, Жендэр",
              en: "Infectious Diseases, NCDs, Gender",
            },
            link: "https://drive.google.com/open?id=1Oj1450eOLIyczWBzOZH1mFjybrLWwp00",
          },
        ],
      },
    ],
  },
  {
    heading: {
      mn: "САЛБАР ДУНДЫН СУРГАЛТЫН ХӨТӨЛБӨР ХЭРЭГЖҮҮЛЭГЧ БАГШ НАРЫН БАГИЙН АХЛАГЧ НАР",
      en: "INTERDISCIPLINARY TRAINING PROGRAM FACULTY TEAM LEADERS",
    },
    sections: [
      {
        title: {
          mn: "Нийгмийн эрүүл мэндийн ухааны чиглэлээр салбар дундын сургалтын хөтөлбөр хэрэгжүүлэгч багш нарын багийн ахлагч",
          en: "Interdisciplinary Training Program Faculty Team Leader in Public Health Sciences",
        },
        members: [
          {
            name: { mn: "Мягмаржавын Сугармаа", en: "Sugarmaa Myagmarjav" },
            photo: UNSPLASH("1573496359142-b8d87734a5a2"),
            education: {
              mn: "АШУҮИС (ЭМШУИС) Анагаах ухааны доктор 2009",
              en: "MNUMS (HSUM) PhD in Medicine, 2009",
            },
            experience: {
              mn: "АШУҮИС, НЭМС, ЭМНАНУТ-ийн дэд профессор 2005-одоо",
              en: "Assoc. Professor, Dept. of Health Social Work & Social Sciences, School of Public Health, MNUMS 2005–present",
            },
            research: {
              mn: "Насжилт, Эрүүл мэндийн нийгэм-сэтгэлзүйн хүчин зүйлс, Судалгааны ёсзүй",
              en: "Aging, Psychosocial Factors of Health, Research Ethics",
            },
            link: "https://drive.google.com/open?id=1B3uK9KZETFnbm8RWwT2U5CWwYJdhOHzF",
          },
        ],
      },
    ],
  },
  {
    heading: {
      mn: "МЭРГЭШЛИЙН ПРОФЕССОРЫН БАГИЙН АХЛАГЧ НАР",
      en: "PROFESSIONAL PROFESSORIAL TEAM LEADERS",
    },
    sections: [
      {
        title: {
          mn: "Арьс, Өрхийн анагаах, халдварт өвчин судлалын профессорын багийн ахлагч",
          en: "Dermatology, Family Medicine & Infectious Disease Professorial Team Leader",
        },
        members: [
          {
            name: { mn: "Ванган Нямцэнгэл", en: "Nyamtsengel Vangan" },
            photo: UNSPLASH("1537368910025-700350fe46c7"),
            education: {
              mn: "1995-2001 АШУҮИС Ерөнхий анагаах ухаан, 2005-2009 АУ-ы магистр, 2011-2015 БНХАУ Өвөр Монголын ИС АУ-ы доктор, 2017-2018 Харвардын Анагаахын Сургууль",
              en: "1995–2001 MNUMS General Medicine (MD); 2005–2009 MSc; 2011–2015 Inner Mongolia University PhD; 2017–2018 Harvard Medical School T2T Training",
            },
            experience: {
              mn: "2025-одоо АШУҮИС АУС Халдварт өвчин судлалын тэнхимийн эрхлэгч, 2007-2025 тэнхимийн багш, 2002-2007 ХӨСҮТ",
              en: "2025–present Head, Dept. of Infectious Diseases, School of Medicine, MNUMS; 2007–2025 Faculty Member; 2002–2007 NCCD Physician",
            },
            research: {
              mn: "Халдварт өвчний тандалт, урьдчилан сэргийлэлт, БЗДХ, ХДХВ/ДОХ",
              en: "Infectious Disease Surveillance & Prevention, STDs, HIV/AIDS",
            },
            link: "https://drive.google.com/open?id=1UQ41r1UnJGlIoTOxGbYBThZ9Kcj22-Lo",
          },
        ],
      },
      {
        title: {
          mn: "Сэргээн засал судлалын профессорын багийн ахлагч",
          en: "Rehabilitation Medicine Professorial Team Leader",
        },
        members: [
          {
            name: { mn: "Авирмэд Балжинням", en: "Baljinnyam Avirmed" },
            photo: UNSPLASH("1622253692010-333f2da6031d"),
            education: {
              mn: "ЭМШУҮИС 2007 он АУ-ы доктор, АШУҮИС 2013 он Профессор",
              en: "HSUM 2007 PhD, MNUMS 2013 Professor",
            },
            experience: {
              mn: "1998 оноос АУИС, ЭМШУИС, АШУҮИС-д сэргээн засах анагаах ухааны тэнхимийн багш, эрхлэгч, профессороор ажиллаж байна",
              en: "Since 1998 — Lecturer, Head, Professor at Dept. of Rehabilitation Medicine, MNUMS",
            },
            research: {
              mn: "Сэргээн засах анагаах ухаан",
              en: "Rehabilitation Medicine",
            },
            link: "https://drive.google.com/open?id=1jB0EiidVWVi1929zVY4igk_qTn5rROjb",
          },
        ],
      },
      {
        title: {
          mn: "Уламжлалт анагаах ухаан судлалын профессорын багийн ахлагч",
          en: "Traditional Medicine Professorial Team Leader",
        },
        members: [
          {
            name: { mn: "Сэр-Од Хишигжаргал", en: "Khishigjargal Ser-Od" },
            photo: UNSPLASH("1551836022-d5d88e9218df"),
            education: {
              mn: "2010 онд АУ-ны доктор, 2013 онд дэд профессор, 2020 онд профессор",
              en: "2010 PhD in Medicine, 2013 Assoc. Professor, 2020 Professor",
            },
            experience: {
              mn: "1991 оноос АШУҮИС-ийн МАУОУС-ийн багш, профессор, тэнхимийн эрхлэгч",
              en: "Since 1991 — Lecturer, Professor, Head of Dept. at School of Traditional Medicine, MNUMS",
            },
            research: {
              mn: "Уламжлалт анагаах ухааны эмнэлзүй, жор судлал",
              en: "Clinical Traditional Medicine, Prescription Studies",
            },
            link: "https://drive.google.com/open?id=1kvI40Ozwcey3zg_EagAdNXDo7udpcx2B",
          },
        ],
      },
      {
        title: {
          mn: "Мэдээгүйжүүлэг, эрчимт эмчилгээ, яаралтай тусламж судлалын профессорын багийн ахлагч",
          en: "Anesthesiology, Intensive Care & Emergency Medicine Professorial Team Leader",
        },
        members: [
          {
            name: { mn: "Оросоо Соёмбоо", en: "Soyombo Orsoo" },
            photo: UNSPLASH("1607990281513-2c110a25bd8c"),
            education: {
              mn: "ЭМШУҮИС Ерөнхий эмч 1996-2002, Гуравдугаар төв эмнэлэг Мэдээгүйжүүлэгч-эрчимт эмчилгээний эмч 2002-2004, АШУҮИС Магистр 2008-2014",
              en: "HSUM Bachelor of Medical Doctor 1996–2002; Third State Central Hospital Residency 2002–2004; MNUMS Master program 2008–2014",
            },
            experience: {
              mn: "АШУҮИС АУС Мэдээгүйжүүлэг, эрчимт эмчилгээний тэнхимийн багш 2013-одоо, Гуравдугаар төв эмнэлэг 2008-2013, Нийслэлийн түргэн тусламж 2003-2008",
              en: "Lecturer, Dept. of Critical Care & Anesthesiology, School of Medicine, MNUMS 2013–present; Third State Central Hospital ICU 2008–2013; Capital City Emergency Center 2003–2008",
            },
            research: {
              mn: "Мэс заслын үеийн шингэний менежмент",
              en: "Perioperative Fluid Management",
            },
            link: "https://drive.google.com/open?id=18AcnxHQFbblfDEvOrNJBoEZIT1dXNINl",
          },
        ],
      },
      {
        title: {
          mn: "Нийгмийн эрүүл мэнд судлалын профессорын багийн ахлагч",
          en: "Public Health Professorial Team Leader",
        },
        members: [
          {
            name: { mn: "Дорж Гантуяа", en: "Gantuya Dorj" },
            photo: UNSPLASH("1580489944761-15a19d654956"),
            education: {
              mn: "АШУҮИС, АУ-ы доктор, дэд профессор",
              en: "PhD, Associate Professor, MNUMS",
            },
            experience: {
              mn: "АШУҮИС, НЭМС, Тархвар судлал, Биостатистикийн тэнхимийн эрхлэгч",
              en: "Head, Dept. of Epidemiology & Biostatistics, School of Public Health, MNUMS",
            },
            research: {
              mn: "Халдварт ба халдварт бус өвчний тархвар судлал, Агаарын бохирдлын хүний эрүүл мэндэд үзүүлэх нөлөө, Настан судлал",
              en: "Communicable & Non-Communicable Disease Epidemiology, Air Pollution & Human Health, Gerontology",
            },
            link: "https://drive.google.com/open?id=1drej5ra6ruS4MJ6EczXOB_GivniBpmRi",
          },
        ],
      },
      {
        title: {
          mn: "Сувилахуй судлалын профессорын багийн ахлагч",
          en: "Nursing Sciences Professorial Team Leader",
        },
        members: [
          {
            name: { mn: "Гочоосүрэн Ганхуяг", en: "Gankhuyag Gochoosuren" },
            photo: UNSPLASH("1614608682850-e0d6ed316d47"),
            education: {
              mn: "Боловсрол судлалын ухааны доктор",
              en: "Ph.D. in Education Studies",
            },
            experience: {
              mn: "АШУҮИС, Сувилахуйн сургууль, Суурь сувилахуйн тэнхимд ахлах багш; Монгол Японы эмнэлгийн Сувилахуй эрхэлсэн дэд захирал",
              en: "Senior Lecturer, Dept. of Fundamental Nursing, School of Nursing; Deputy Director for Nursing Affairs, Mongolia-Japan Hospital, MNUMS",
            },
            research: {
              mn: "Сувилахуй, Боловсрол судлал",
              en: "Nursing and Education",
            },
            link: "https://drive.google.com/open?id=1gkge4OyjauYqal_tLrUuduO6NpJdLKK7",
          },
        ],
      },
    ],
  },
];
