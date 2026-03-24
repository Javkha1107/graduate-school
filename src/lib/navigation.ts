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
      { labelKey: "menu.academicCenter", href: "/training-centers/academic" },
      { labelKey: "menu.onlineCenter", href: "/training-centers/online" },
      {
        labelKey: "menu.interdisciplinaryCenter",
        href: "/training-centers/interdisciplinary",
      },
      {
        labelKey: "menu.postgraduateCenter",
        href: "/training-centers/postgraduate",
      },
    ],
  },
  {
    labelKey: "menu.admission",
    children: [
      { labelKey: "menu.admissionInfo", href: "/admission" },
      { labelKey: "menu.registration", href: "/admission/registration" },
      { labelKey: "menu.tuitionFee", href: "/admission/tuition" },
    ],
  },
  {
    labelKey: "menu.education",
    children: [
      { labelKey: "menu.masterOnCampus", href: "/education/master" },
      { labelKey: "menu.masterOnline", href: "/education/master-online" },
      { labelKey: "menu.doctoral", href: "/education/doctoral" },
      { labelKey: "menu.postDoctoral", href: "/education/postdoctoral" },
    ],
  },
  {
    labelKey: "menu.research",
    children: [
      { labelKey: "menu.project", href: "/research/projects" },
      { labelKey: "menu.publication", href: "/research/publications" },
    ],
  },
  {
    labelKey: "menu.activity",
    children: [
      { labelKey: "menu.regulations", href: "/student/regulations" },
      { labelKey: "menu.conferences", href: "/research/conferences" },
      { labelKey: "menu.orientation", href: "/student/training" },
      { labelKey: "menu.library", href: "/student/library" },
      { labelKey: "menu.journalClub", href: "/research/journal-club" },
      { labelKey: "menu.dormitory", href: "/student/dormitory" },
      { labelKey: "menu.sportEvents", href: "/student/events" },
    ],
  },
  {
    labelKey: "menu.scholarships",
    children: [
      { labelKey: "menu.scholarshipStudent", href: "/student/scholarship" },
      { labelKey: "menu.scholarshipTeacher", href: "/student/scholarship" },
      { labelKey: "menu.scholarshipPostdoc", href: "/student/scholarship" },
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
