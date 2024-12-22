export const navlinks = [
  { name: "HOME", path: "/" },
  {
    name: "Doctors",
    path: "/doctors",
  },
  {
    name: "ADMISSIONS",
    path: "/admissions",
    dropdown: [
      { name: "Admission Process", path: "/admissions/process" },
      { name: "Apply Now", path: "/admissions/apply" },
    ],
  },
  {
    name: "PLACEMENT",
    path: "/placement",
    dropdown: [
      { name: "Overview", path: "/placement/overview" },
      { name: "Statistics", path: "/placement/statistics" },
    ],
  },
  {
    name: "STUDENT'S LIFE",
    path: "/students-life",
    dropdown: [
      { name: "Campus Life", path: "/students-life/campus" },
      { name: "Activities", path: "/students-life/activities" },
    ],
  },
  {
    name: "INTERNATIONAL RELATIONS",
    path: "/international-relations",
  },
];
