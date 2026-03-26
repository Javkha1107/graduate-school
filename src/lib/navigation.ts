export interface NavItem {
  labelKey: string;
  href?: string;
  children?: NavItem[];
  external?: boolean;
}

export const navigation: NavItem[] = [
  {
    labelKey: "menu.news",
    children: [
      { labelKey: "menu.newsInfo", href: "/news" },
      { labelKey: "menu.formsRegulations", href: "/news/forms" },
    ],
  },
  {
    labelKey: "menu.introduction",
    children: [
      { labelKey: "menu.greeting", href: "/introduction/greeting" },
      { labelKey: "menu.history", href: "/introduction/history" },
      {
        labelKey: "menu.structure",
        children: [
          {
            labelKey: "menu.structureOrganization",
            href: "/introduction/structure",
          },
          {
            labelKey: "menu.facultyLeaders",
            href: "/introduction/structure#faculty-leaders",
          },
        ],
      },
      {
        labelKey: "menu.academicCouncil",
        href: "/introduction/academic-council",
      },
      {
        labelKey: "menu.programCommittee",
        href: "/introduction/program-committee",
      },
    ],
  },
  {
    labelKey: "menu.trainingCenters",
    children: [
      {
        labelKey: "menu.academicCenter",
        children: [
          {
            labelKey: "menu.centerIntroduction",
            href: "/training-centers/academic#introduction",
          },
          {
            labelKey: "menu.trainingProgram",
            href: "/training-centers/academic#programs",
          },
          {
            labelKey: "menu.doctoralTraining",
            href: "/training-centers/academic#doctoral",
          },
          {
            labelKey: "menu.masterTraining",
            href: "/training-centers/academic#masters",
          },
        ],
      },
      { labelKey: "menu.onlineCenter", href: "/training-centers/online" },
      {
        labelKey: "menu.interdisciplinaryCenter",
        href: "/training-centers/interdisciplinary",
      },
      {
        labelKey: "menu.postgraduateCenter",
        children: [
          {
            labelKey: "menu.postgraduateAdmission",
            href: "/training-centers/postgraduate#admission",
          },
          {
            labelKey: "menu.postgraduateGraduation",
            href: "/training-centers/postgraduate#graduation",
          },
          {
            labelKey: "menu.postgraduateBasic",
            href: "/training-centers/postgraduate#basic",
          },
          {
            labelKey: "menu.postgraduateSubspec",
            href: "/training-centers/postgraduate#subspecialization",
          },
          {
            labelKey: "menu.postgraduatePrograms",
            href: "/training-centers/postgraduate#programs",
          },
          {
            labelKey: "menu.postgraduateHospitals",
            href: "/training-centers/postgraduate#hospitals",
          },
        ],
      },
    ],
  },
  {
    labelKey: "menu.student",
    children: [
      { labelKey: "menu.studentCouncil", href: "/student/council" },
      {
        labelKey: "menu.studentSupport",
        href: "/student/support",
      },
      {
        labelKey: "menu.transferRequest",
        href: "/student/transfer",
      },
    ],
  },
  {
    labelKey: "menu.research",
    children: [
      { labelKey: "menu.conferences", href: "/research/conferences" },
      { labelKey: "menu.cajms", href: "/research/cajms" },
      {
        labelKey: "menu.ethicsCommittee",
        href: "/research/ethics-committee",
      },
    ],
  },
  {
    labelKey: "menu.internationalRelations",
    children: [
      { labelKey: "menu.oita", href: "/collaboration/oita" },
      { labelKey: "menu.tokushima", href: "/collaboration/tokushima" },
    ],
  },
];

// Separate items shown as buttons/badges in the header
export const headerActions: NavItem[] = [
  {
    labelKey: "menu.contact",
    href: "/contact",
  },
];
