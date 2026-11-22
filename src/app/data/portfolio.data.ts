// All portfolio content lives here and is taken from the resume.
// Edit this file to update the site's copy.

export const PROFILE = {
  firstName: 'Amogh',
  fullName: 'Amogh Lavania',
  role: 'Java Backend Developer',
  company: 'Coforge',
  location: 'Greater Noida, Uttar Pradesh',
  email: 'amogh.lavania08@gmail.com',
  phone: '+91 6396018318',
  linkedin: 'https://www.linkedin.com/in/amoghlavania',
  linkedinLabel: 'linkedin.com/in/amoghlavania',
  github: 'https://github.com/amoghlavania',
  resume: 'https://drive.google.com/file/d/1wG5fX5h84XcC9oTrgeGhPGzCRTGAGPty/view?usp=drive_link',
  summary:
    'Java Backend Developer at Coforge with 2+ years of experience in Core Java, Spring Boot, Microservices and REST APIs. ' +
    'I helped migrate an airline reservation system from mainframe to Java, improving scalability and ensuring IATA compliance.',
  avatar: 'images/amogh.jpg',
};

export const NAV_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'expertise', label: 'Expertise' },
  { id: 'project', label: 'Key Project' },
  { id: 'story', label: 'My story' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

export const HERO_ROLES = [
  'Software Engineer',
  'Java Developer',
  'Backend Engineer',
  'AWS Certified',
];

export const ABILITY_STATS = [
  { value: '2+', label: 'Years in Java backend' },
  { value: '700+', label: 'SSRs implemented' },
  { value: '0%', label: 'Parity discrepancy' },
  { value: '2×', label: 'AWS certified' },
];

export interface Door {
  plate: string;
  title: string;
  tagline: string;
  color: string;
  points: string[];
}

export const DOORS: Door[] = [
  {
    plate: 'Backend',
    title: 'Backend Engineering',
    tagline: 'Clean code, solid contracts',
    color: '#2a2c2e',
    points: ['Core Java & OOP', 'Spring Boot & Spring MVC', 'REST API design', 'Microservices architecture'],
  },
  {
    plate: 'Cloud',
    title: 'Cloud & DevOps',
    tagline: 'Ship it, then scale it',
    color: '#3d4a5c',
    points: ['AWS (2× certified)', 'Docker & Kubernetes', 'CI/CD: Jenkins, GitHub Actions', 'GCP deploys & log monitoring'],
  },
  {
    plate: 'Quality',
    title: 'Testing & Quality',
    tagline: 'Trust, but verify',
    color: '#6f8f78',
    points: ['JUnit & Mockito', 'API testing: Postman, Bruno', 'SonarQube code quality', 'Legacy-vs-Java parity checks'],
  },
  {
    plate: 'Data',
    title: 'Data & Delivery',
    tagline: 'Structured from the start',
    color: '#c4622d',
    points: ['SQL & MySQL', 'Relational database design', 'Agile / Scrum delivery', 'Git, GitHub & Copilot reviews'],
  },
];

export const PROJECT = {
  name: 'Special Service Request (SSR/OSI)',
  stack: ['Java', 'Spring Boot', 'Microservices', 'GCP', 'JUnit', 'Mockito', 'AWS ECS', 'Looker Studio'],
  stats: [
    { value: '700+', label: 'Special Service Requests designed & implemented' },
    { value: '0%', label: 'Error discrepancy between mainframe and Java outputs' },
    { value: 'IATA', label: 'Full compliance for passenger-specific services' },
  ],
  points: [
    'Designed and implemented 700+ Special Service Requests within the airline reservation platform — meal preferences, medical assistance, special seating — with full IATA compliance.',
    'Wrote unit and integration tests (JUnit, Mockito) for SSR validators, covering invalid-input scenarios so bad data never reached downstream systems.',
    'Reached 0% error discrepancy between legacy mainframe and migrated Java outputs before production, using AWS ECS-hosted reconciliation tooling and Looker Studio dashboards.',
    'Deployed and tested services on Google Cloud Platform for high-availability backend workloads.',
  ],
};

export interface StoryItem {
  year: string;
  range: string;
  title: string;
  org: string;
  points: string[];
}

export const STORY: StoryItem[] = [
  {
    year: '2026',
    range: '2026 — 2029',
    title: 'AWS Certified AI Practitioner',
    org: 'Amazon Web Services',
    points: ['Certified in AI, machine learning and generative-AI fundamentals on AWS.'],
  },
  {
    year: '2025',
    range: '2025 — 2028',
    title: 'AWS Certified Cloud Practitioner',
    org: 'Amazon Web Services',
    points: ['Certified in core AWS cloud concepts, services, security and pricing.'],
  },
  {
    year: '2024',
    range: 'Oct 2024 — Now',
    title: 'Software Engineer',
    org: 'Coforge Ltd · Greater Noida',
    points: [
      'Migrating airline backend reservation systems from legacy mainframe to Java-based microservices.',
      'Building backend services with Core Java and Spring Boot in an Agile/Scrum team.',
      'Working with Jenkins CI/CD, Git/GitHub and GitHub Copilot for reviews and change management.',
    ],
  },
  {
    year: '2020',
    range: '2020 — 2024',
    title: 'B.Tech, Computer Science & Engineering',
    org: 'DIT University, Dehradun',
    points: ['Graduated with a CGPA of 8.54.'],
  },
  {
    year: '2019',
    range: '2019 — 2020',
    title: 'Intermediate (CBSE)',
    org: 'Shri R.S. Public School, Agra',
    points: ['Completed with 81.34%.'],
  },
  {
    year: '2017',
    range: '2017 — 2018',
    title: 'Matriculation (ICSE)',
    org: "St. George's College, Agra",
    points: ['Completed with 78.67%.'],
  },
];

export const SKILL_GROUPS = [
  { title: 'Languages & Frameworks', items: ['Java', 'SQL', 'Spring Boot', 'Spring MVC', 'Microservices', 'REST APIs'] },
  { title: 'Databases', items: ['MySQL', 'Relational Database Design'] },
  {
    title: 'Cloud & DevOps',
    items: ['AWS', 'Docker', 'Kubernetes', 'Jenkins', 'GitHub Actions', 'GCP (log monitoring)'],
  },
  { title: 'Testing & Monitoring', items: ['JUnit', 'Mockito', 'Postman', 'Bruno', 'SonarQube'] },
  { title: 'Tools', items: ['Git', 'GitHub', 'GitHub Copilot', 'IntelliJ IDEA'] },
  { title: 'Concepts', items: ['OOP', 'DBMS', 'Agile Methodology', 'Cloud Computing'] },
];

export const CERTIFICATIONS = [
  {
    name: 'AWS Certified Cloud Practitioner',
    validity: '2025 — 2028',
    url: 'https://drive.google.com/file/d/1b-6_BHK-Bhv7RUx1DMjhuGvWyKbJEL1W/view?usp=sharing',
  },
  {
    name: 'AWS Certified AI Practitioner',
    validity: '2026 — 2029',
    url: 'https://drive.google.com/file/d/1V8QjGH_yCKborv5P4Mnvg35oRBrS01LM/view?usp=sharing',
  },
];
