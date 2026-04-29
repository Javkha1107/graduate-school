export interface NavItem {
  labelKey: string;
  href?: string;
  children?: NavItem[];
  external?: boolean;
}

export const navigation: NavItem[] = [
  {
    labelKey: "menu.news",
    href: "/news",
    // children: [{ labelKey: "menu.newsInfo", href: "/news" }],
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
          {
            labelKey: "menu.academicAdmission",
            href: "/training-centers/academic#admission",
          },
          {
            labelKey: "menu.academicStudent",
            href: "/training-centers/academic#student",
          },
        ],
      },
      {
        labelKey: "menu.onlineCenter",
        href: "/training-centers/online#online-master",

        // children: [
        //   {
        //     labelKey: "menu.onlineMasterTraining",
        //     href: "/training-centers/online#online-master",
        //   },
        //   {
        //     labelKey: "menu.programIntroduction",
        //     href: "https://icec.mnums.edu.mn/local/staticpage/view.php?page=aboutus20241025mongol",
        //     external: true,
        //   },
        // ],
      },
      {
        labelKey: "menu.interdisciplinaryCenter",
        children: [
          {
            labelKey: "menu.centerIntroduction",
            href: "/training-centers/interdisciplinary#introduction",
          },
          {
            labelKey: "menu.jointPrograms",
            href: "/training-centers/interdisciplinary#joint-programs",
          },
          {
            labelKey: "menu.postdocResearch",
            href: "/training-centers/interdisciplinary#postdoc-research",
          },
        ],
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
      {
        labelKey: "menu.conferences",
        href: "/research/conferences#conferences",
      },
      {
        labelKey: "menu.interdisciplinaryCouncil",
        href: "/research/conferences#interdisciplinary-council",
      },
      { labelKey: "menu.cajms", href: "/research/conferences#cajms" },
      {
        labelKey: "menu.healthScienceJournal",
        href: "/research/conferences#health-science-journal",
      },
      {
        labelKey: "menu.ethicsCommittee",
        href: "/research/conferences#ethics-committee",
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
  {
    labelKey: "menu.rulesRegulations",
    href: "/rules",
  },
];

// Separate items shown as buttons/badges in the header
export const headerActions: NavItem[] = [
  {
    labelKey: "menu.contact",
    href: "/contact",
  },
];
