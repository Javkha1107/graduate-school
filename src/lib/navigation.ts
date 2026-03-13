export interface NavItem {
  labelKey: string;
  href?: string;
  children?: NavItem[];
  external?: boolean;
}

export const navigation: NavItem[] = [
  {
    labelKey: "menu.about",
    children: [
      { labelKey: "menu.deansGreeting", href: "/about/greeting" },
      { labelKey: "menu.aboutUsPage", href: "/about" },
      { labelKey: "menu.gepm", href: "/about/graduate-policy" },
      {
        labelKey: "menu.units",
        children: [
          { labelKey: "menu.eLearning", href: "/about/e-learning" },
          { labelKey: "menu.healthResearch", href: "/about/health-research" },
          { labelKey: "menu.medicalLaw", href: "/about/medical-law" },
          { labelKey: "menu.academicCouncil", href: "/about/academic-council" },
        ],
      },
      { labelKey: "menu.teachingStaff", href: "/about" },
      {
        labelKey: "menu.collaborationJoint",
        children: [
          { labelKey: "menu.collaboration", href: "/about/collaboration" },
          { labelKey: "menu.kyushu", href: "/about/kyushu" },
          { labelKey: "menu.oita", href: "/about/oita" },
          { labelKey: "menu.lumiere", href: "/about/lumiere" },
        ],
      },
      {
        labelKey: "menu.cajms",
        href: "https://www.mongoliajol.info/index.php/CAJMS",
        external: true,
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
