import {
  Bot,
  BrainCircuit,
  Cloud,
  Code2,
  Database,
  Github,
  Globe,
  Laptop,
  Linkedin,
  Mail,
  Palette,
  Smartphone,
  Workflow,
} from 'lucide-react';
import awsCloudPractitioner from '../../certificate/AWS Certified Cloud Practitioner certificate.pdf';
import awsDataEngineer from '../../certificate/AWS Certified Data Engineer - Associate certificate.pdf';
import dartProgramming from '../../certificate/Dart Programming.pdf';
import dataverse from '../../certificate/DATAVERSE.pdf';
import es6 from '../../certificate/ECMAScript ES6 JavaScript Tutorials.pdf';
import erModeling from '../../certificate/Introduction to Entity Relationship ER Modeling.pdf';
import noSql from '../../certificate/Introduction to NoSQL databases.pdf';
import django from '../../certificate/Learning Django Web Development.pdf';
import flask from '../../certificate/Learning Flask.pdf';
import networkingEssentials from '../../certificate/Networking Essentials (1).pdf';
import flutterProjects from '../../certificate/RealWorld Projects with Flutter.pdf';
import redHat from '../../certificate/RED HAT.pdf';

export const socialLinks = {
  github: 'https://github.com/jatin-agarwal-01',
  linkedin: 'https://www.linkedin.com/in/jatin-agarwal-builds/',
  email: 'mailto:jatinagarwal825@gmail.com',
  emailAddress: 'jatinagarwal825@gmail.com',
  leetcode: 'https://leetcode.com/u/jatin_agarwal01/',
};

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Skills', href: '#skills' },
  { label: 'Process', href: '#process' },
  { label: 'Certificates', href: '#certificates' },
  { label: 'Experience', href: '#experience' },
  { label: 'Services', href: '#services' },
];

// Listed in page order so the numbering in the mobile menu matches the scroll order.
export const mobileNavLinks = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'GitHub', href: '#github' },
  { label: 'Skills', href: '#skills' },
  { label: 'Process', href: '#process' },
  { label: 'Outcomes', href: '#outcomes' },
  { label: 'Services', href: '#services' },
  { label: 'Certificates', href: '#certificates' },
  { label: 'Experience', href: '#experience' },
  { label: 'Education', href: '#education' },
  { label: 'Testimonials', href: '#testimonials' },
];

// REVIEW BEFORE DEPLOY: keep the certification count in sync with `certifications` below.
export const heroStats = [
  { value: '12', label: 'Certifications' },
  { value: '06', label: 'Capabilities' },
  { value: '03', label: 'Core tracks' },
];

export const focusAreas = [
  { label: 'AI Agents', icon: Bot },
  { label: 'Automation', icon: Workflow },
  { label: 'Cloud', icon: Cloud },
  { label: 'Software Development', icon: Code2 },
  { label: 'Data & Analytics', icon: Database },
  { label: 'Mobile Development', icon: Smartphone },
  { label: 'Web Development', icon: Laptop },
];

export const skills = [
  { category: 'Programming', items: ['C', 'Java', 'Python', 'Dart', 'JavaScript', 'Kotlin'] },
  { category: 'Web', items: ['HTML', 'CSS', 'React', 'Tailwind CSS'] },
  { category: 'Mobile', items: ['Flutter', 'React Native'] },
  { category: 'Cloud', items: ['AWS', 'Hetzner', 'Oracle Cloud'] },
  { category: 'AI / Automation', items: ['LangChain', 'LangGraph', 'AI Agents', 'n8n', 'RAG', 'MCP'] },
  { category: 'Data / Analytics', items: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'SQL', 'Power BI', 'Tableau'] },
  { category: 'Tools', items: ['GitHub', 'Git', 'VS Code', 'Vercel', 'Streamlit'] },
];

export const principles = [
  {
    n: '01',
    title: 'Clear structure over unnecessary complexity',
    desc: 'Software that is maintainable from the start rather than repaired later.',
  },
  {
    n: '02',
    title: 'Interfaces that feel intentional, not improvised',
    desc: 'Every spacing, motion, and type choice made deliberately as a system.',
  },
  {
    n: '03',
    title: 'Consistency, reliability, and steady momentum',
    desc: 'Disciplined iteration through shipping and reflection over time.',
  },
];

export const projects = [
  {
    no: '01',
    title: 'Flutter Mobile App',
    short: 'A polished cross-platform mobile application built with Flutter, focusing on clean architecture and smooth UX.',
    // `stack` is the single source of truth for this project's technologies: the chips,
    // the card's bento panel, and the drawer all read from it.
    stack: [
      {
        name: 'Flutter',
        detail:
          'One codebase for iOS and Android, with a shared widget library so every screen inherits the same spacing and motion rhythm.',
      },
      {
        name: 'Dart',
        detail:
          'Typed models and isolates for parsing, keeping heavy work off the UI thread so frames stay inside the 16ms budget.',
      },
      {
        name: 'Firebase',
        detail:
          'Auth and Firestore as the remote source of truth, mirrored into an offline-first local cache behind a repository layer.',
      },
    ],
    outcome: '40% faster load times',
    problem:
      'A legacy mobile experience with slow cold starts, inconsistent navigation, and a fragile state layer that broke under real-world usage patterns.',
    approach:
      'Rebuilt on a layered clean architecture with a single source of truth for state, offline-first caching, and a design system that kept every screen visually coherent.',
    steps: [
      'Audited navigation flows and isolated the three slowest cold-start paths.',
      'Introduced a repository pattern with Firebase-backed offline cache.',
      'Built a shared widget library so every screen inherited the same motion and spacing rhythm.',
      'Profiled on mid-range Android hardware until frame budget held under 16ms.',
    ],
    metrics: [
      { value: '40%', label: 'Faster load times' },
      { value: '16ms', label: 'Frame budget held' },
    ],
  },
  {
    no: '02',
    title: 'React Web Platform',
    short: 'A modern web application with component-driven architecture and responsive design.',
    stack: [
      {
        name: 'React',
        detail:
          'Component-driven UI with shared data hooks for fetching, optimistic updates, and an error boundary per route.',
      },
      {
        name: 'TypeScript',
        detail:
          'Types the component variants and API payloads, so a contract change fails at build time instead of in a user session.',
      },
      {
        name: 'Tailwind',
        detail:
          'Utility tokens holding spacing, type scale, and colour consistent as the grid collapses to a single column.',
      },
    ],
    outcome: '2x engagement increase',
    problem:
      'A fragmented frontend where every page felt like a different product, with rising bounce rates on mobile and inconsistent interaction patterns.',
    approach:
      'Adopted a component-driven architecture with a typed design system, shared hooks for data fetching, and a responsive grid that respected content hierarchy on every breakpoint.',
    steps: [
      'Defined a typed component library with documented variants.',
      'Built reusable data hooks with optimistic updates and error boundaries.',
      'Introduced a responsive layout system that collapsed gracefully to single column.',
      'Instrumented engagement events to validate the redesign against real sessions.',
    ],
    metrics: [
      { value: '2x', label: 'Engagement increase' },
      { value: '-35%', label: 'Mobile bounce' },
    ],
  },
  {
    no: '03',
    title: 'AWS Cloud Project',
    short: 'Cloud-native deployment pipeline with AWS services for scalable infrastructure.',
    stack: [
      {
        name: 'AWS',
        detail:
          'The delivery backbone — IAM boundaries, CloudWatch metrics, and a deployment pipeline with health checks and rollback.',
      },
      {
        name: 'EC2',
        detail:
          'Auto-scaled capacity for sustained traffic, right-sized against real CPU and memory metrics rather than guesswork.',
      },
      {
        name: 'S3',
        detail:
          'Static asset origin behind a CDN, serving fingerprinted bundles and cutting load off the application servers.',
      },
      {
        name: 'Lambda',
        detail:
          'Short-lived event-driven workloads, replacing always-on instances and removing the idle spend that drove the bill.',
      },
    ],
    outcome: '60% cost reduction',
    problem:
      'A manual, fragile deployment process running on oversized always-on instances, with unpredictable monthly costs and no path to scale under load.',
    approach:
      'Replaced fixed capacity with an event-driven pipeline using Lambda for short-lived workloads, S3 for static assets, and EC2 auto-scaling for sustained traffic.',
    steps: [
      'Mapped workloads by duration and frequency to decide Lambda vs EC2.',
      'Moved static assets to S3 behind a CDN to cut origin load.',
      'Wired an automated deployment pipeline with health checks and rollback.',
      'Right-sized instances and introduced auto-scaling policies tied to real metrics.',
    ],
    metrics: [
      { value: '60%', label: 'Cost reduction' },
      { value: '0', label: 'Manual deploys' },
    ],
  },
  {
    no: '04',
    title: 'AI Agent System',
    short: 'Intelligent agent workflow built during the AI Agent Internship at Cognio Labs.',
    stack: [
      {
        name: 'Python',
        detail:
          'Orchestration layer for the agent graph, the typed tool interfaces it calls, and the harness that measures cycle time.',
      },
      {
        name: 'LLM',
        detail:
          'Reasoning over each triage step, constrained by typed tool calls and validation guardrails on every output.',
      },
      {
        name: 'Automation',
        detail:
          'Human-in-the-loop checkpoints that route low-confidence results to a person instead of letting the agent guess.',
      },
    ],
    outcome: '3x process efficiency',
    problem:
      'A repetitive knowledge-workflow consuming hours of manual triage, with no structured way to hand tasks to an LLM reliably.',
    approach:
      'Designed an agent workflow with typed tool calls, guardrails on LLM output, and a human-in-the-loop checkpoint for anything ambiguous.',
    steps: [
      'Decomposed the workflow into discrete, observable agent steps.',
      'Built typed tool interfaces so the LLM could call internal services safely.',
      'Added validation guardrails and a fallback path for low-confidence outputs.',
      'Measured cycle time before and after to quantify the efficiency gain.',
    ],
    metrics: [
      { value: '3x', label: 'Process efficiency' },
      { value: '92%', label: 'Auto-handled' },
    ],
  },
];

// REVIEW BEFORE DEPLOY: confirm each repository is still public and the live links resolve.
export const repositoryProjects = [
  {
    name: 'ToDo App',
    icon: Smartphone,
    category: 'Android / Mobile',
    description:
      'A full-featured Kotlin Android ToDo app with authentication, task priorities, reminders, search, statistics, guest restrictions, dark mode, and Material Design 3 UI.',
    href: 'https://github.com/jatin-agarwal-01/Syntecxhub_ToDoListApp',
    tech: ['Kotlin', 'Room DB', 'MVVM', 'StateFlow', 'Coroutines', 'Material Design 3'],
  },
  {
    name: 'Campus Event Management System',
    icon: Globe,
    category: 'Campus Web Platform',
    description:
      'A React + Vite campus event platform with routes for events, clubs, dashboards, permissions, admin workflows, calendar, notifications, search, and venue discovery.',
    href: 'https://github.com/jatin-agarwal-01/Campus-Event-Management-System',
    tech: ['React', 'Vite', 'Tailwind CSS', 'Zustand', 'React Router', 'Framer Motion'],
  },
  {
    name: 'AI Agents Hub',
    icon: Bot,
    category: 'AI / Automation',
    description:
      'A Streamlit hub for experimenting with LangChain and LangGraph agents, including chat agents, document drafting, memory agents, RAG, and ReAct-style workflows.',
    href: 'https://github.com/jatin-agarwal-01/Learning-AI-Agents',
    tech: ['Python', 'Streamlit', 'LangChain', 'LangGraph', 'OpenAI', 'RAG'],
  },
  {
    name: 'SafePulse',
    icon: Workflow,
    category: 'Civic Health & Safety',
    description:
      'A civic health and safety platform repository described as Flutter + Django, currently kept lean with early project documentation.',
    href: 'https://github.com/jatin-agarwal-01/SafePulse',
    tech: ['Flutter', 'Django'],
  },
  {
    name: 'Enhanced Calculator',
    icon: Code2,
    category: 'Java Fundamentals',
    description:
      'A Java console calculator covering basic operations, advanced math operations, constants, factorial logic, and input validation.',
    href: 'https://github.com/jatin-agarwal-01/EnhancedCalculator',
    tech: ['Java', 'OOP', 'Scanner', 'Math API'],
  },
  {
    name: 'Personal Portfolio',
    icon: Laptop,
    category: 'Frontend / Portfolio',
    description:
      'This portfolio repository, rebuilt with React, Tailwind CSS, Framer Motion, responsive sections, verified project data, and recruiter-friendly content.',
    href: 'https://github.com/jatin-agarwal-01/jatin-agarwal-portfolio',
    tech: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Lucide React'],
  },
];

// REVIEW BEFORE DEPLOY: the inspected-repo count is a manual snapshot, not a live GitHub read.
export const githubFacts = [
  { label: 'Public profile', value: 'jatin-agarwal-01' },
  { label: 'Verified public repos inspected', value: '14' },
  { label: 'Primary active areas', value: 'Web, Android, AI, Cloud' },
];

export const processSteps = [
  {
    n: '01',
    title: 'Discover',
    desc: 'Understand the real problem before writing a line of code. Listen to users, map constraints, and define what success actually looks like.',
  },
  {
    n: '02',
    title: 'Define',
    desc: 'Narrow scope to the work that matters. Set clear structure over unnecessary complexity and agree on the smallest valuable shape.',
  },
  {
    n: '03',
    title: 'Design',
    desc: 'Shape interfaces that feel intentional, not improvised. Establish type, spacing, and motion as a system rather than a collection of one-offs.',
  },
  {
    n: '04',
    title: 'Develop',
    desc: 'Build with maintainability from the start. Typed components, clean architecture, and tested edges instead of repairs later.',
  },
  {
    n: '05',
    title: 'Deliver',
    desc: 'Ship, measure, and iterate. Reflect on what worked, fold lessons back in, and keep momentum steady and consistent.',
  },
];

export const outcomes = [
  { value: 40, suffix: '%', label: 'Faster Load Times' },
  { value: 2, suffix: 'x', label: 'User Engagement' },
  { value: 60, suffix: '%', label: 'Cost Reduction' },
  { value: 3, suffix: 'x', label: 'Process Efficiency' },
];

export const services = [
  {
    icon: Smartphone,
    title: 'Mobile App Development',
    desc: 'Flutter and Dart cross-platform apps with clean architecture and smooth, consistent UX.',
  },
  {
    icon: Globe,
    title: 'Web Development',
    desc: 'React and TypeScript modern web with component-driven, responsive design systems.',
  },
  {
    icon: Cloud,
    title: 'Cloud Solutions',
    desc: 'AWS deployment and infrastructure, event-driven pipelines, and scalable delivery.',
  },
  {
    icon: Bot,
    title: 'AI Agent Development',
    desc: 'LLM-powered automation with typed tool calls, guardrails, and human-in-the-loop checkpoints.',
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    desc: 'Clean, intentional interfaces built as systems of type, spacing, and motion.',
  },
  {
    icon: BrainCircuit,
    title: 'Problem Solving',
    desc: 'Algorithmic thinking, data structures, and optimization for resilient implementations.',
  },
];

// REVIEW BEFORE DEPLOY: `date` is the issue year. Replace with the exact issue date from each
// certificate PDF as it is confirmed, and add new credentials here (heroStats counts these).
export const certifications = [
  { title: 'AWS Certified Cloud Practitioner', issuer: 'Amazon Web Services', date: '2026', file: awsCloudPractitioner },
  { title: 'AWS Certified Data Engineer - Associate', issuer: 'Amazon Web Services', date: '2026', file: awsDataEngineer },
  { title: 'Dart Programming', issuer: 'Training Program', date: '2026', file: dartProgramming },
  { title: 'DATAVERSE', issuer: 'Inter College Hackathon', date: '2026', file: dataverse },
  { title: 'ECMAScript ES6 JavaScript Tutorials', issuer: 'Training Program', date: '2026', file: es6 },
  { title: 'Introduction to Entity Relationship ER Modeling', issuer: 'Training Program', date: '2026', file: erModeling },
  { title: 'Introduction to NoSQL databases', issuer: 'Training Program', date: '2026', file: noSql },
  { title: 'Learning Django Web Development', issuer: 'Training Program', date: '2026', file: django },
  { title: 'Learning Flask', issuer: 'Training Program', date: '2026', file: flask },
  { title: 'Networking Essentials', issuer: 'Cisco Networking Academy', date: '2026', file: networkingEssentials },
  { title: 'RealWorld Projects with Flutter', issuer: 'Training Program', date: '2026', file: flutterProjects },
  { title: 'RED HAT', issuer: 'Red Hat', date: '2026', file: redHat },
];

// REVIEW BEFORE DEPLOY: every `period` here is closed out. If a new role starts open-ended,
// replace "to Present" with the real end date once it finishes.
export const experience = [
  {
    role: 'AI Agent Intern',
    company: 'Cognio Labs',
    period: 'June 22, 2026 to August 22, 2026',
    desc: 'Built intelligent AI agent systems, working with LLMs, automation workflows, and production-grade AI solutions.',
  },
  {
    role: 'Android App Development Intern',
    company: 'SyntecXHub',
    period: 'June 4, 2026 to July 3, 2026',
    desc: 'Hands-on Android development experience building mobile features, learning clean architecture, and collaborating on real app components.',
  },
];

// REVIEW BEFORE DEPLOY: bump the academic stage on the current entry each term.
export const education = [
  {
    eyebrow: 'Current',
    institution: 'KIET',
    qualification: 'B.Tech - Computer Science',
    metrics: [{ value: '5th Semester', label: 'Academic stage' }],
  },
  {
    eyebrow: 'Class XII',
    institution: "St. Teresa's Academy",
    qualification: 'Senior Secondary - PCM',
    metrics: [
      { value: '88.6%', label: 'Aggregate' },
      { value: '92%', label: 'PCM' },
    ],
  },
  {
    eyebrow: 'Class X',
    institution: "St. Teresa's Academy",
    qualification: 'Secondary',
    metrics: [{ value: '88.67%', label: 'Aggregate' }],
  },
];

export const testimonials = [
  {
    text: 'Jatin approaches every build with rare discipline. The work is structured, the interfaces feel intentional, and the code is built to last rather than repaired later.',
    name: 'Engineering Mentor',
    role: 'Cognio Labs',
  },
  {
    text: 'He shipped features faster than we expected and kept the mobile app visually coherent across every screen. Clean architecture showed in the result.',
    name: 'Project Lead',
    role: 'SyntecXHub',
  },
  {
    text: 'A product-minded developer who treats polish as a feature, not an afterthought. Reliable execution and steady momentum throughout.',
    name: 'Collaborator',
    role: 'Independent',
  },
];

export const teamsAndTools = {
  teams: ['SyntecXHub', 'Cognio Labs'],
  platforms: ['AWS', 'Google', 'Flutter', 'React'],
};

export const contactButtons = [
  { label: 'Email', href: socialLinks.email, icon: Mail },
  { label: 'LinkedIn', href: socialLinks.linkedin, icon: Linkedin },
  { label: 'GitHub', href: socialLinks.github, icon: Github },
  { label: 'LeetCode', href: socialLinks.leetcode, icon: Code2 },
];
