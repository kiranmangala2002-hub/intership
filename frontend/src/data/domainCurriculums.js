// SPHERONIX Technologies Pvt. Ltd. Official Domain Curriculums
// Extracted from official SPHERONIX FSD Booklet & Hardware Engineering Specifications

export const FSD_PROGRAM_DATA = {
  id: 'ai-fullstack',
  title: 'Full Stack Development (FSD)',
  cardTitle: 'AI Integrated Full Stack Development',
  subtitle: '6-Month Comprehensive Training Program with Live Company Project Experience',
  company: 'SPHERONIX Technology Pvt. Ltd.',
  tagline: 'Empowering Talent Through Technology • Technology for a Brighter Tomorrow',
  duration: '6 Months (4 Months Training + 2 Months Company Project)',
  stipend: '₹10,000 – ₹15,000/mo',
  stipendType: 'Performance Based',
  icon: '💻',
  category: 'Software Engineering Flagship',
  contact: {
    address: '5th Floor, No 8 & 9, Shantipura Main Rd, Phase II, Electronic City, Konappana Agrahara, Karnataka 560100',
    phones: ['+91 7386461671', '+91 9515906062'],
    email: 'yashwanth.manager@spheronixtechnology.in',
    website: 'www.spheronixtechnology.in',
  },
  phasesSummary: [
    {
      phase: 'Phase 1',
      title: 'Technical Training',
      duration: 'Months 1 – 4',
      badge: 'Core Modules 1 to 8',
      desc: 'Comprehensive coverage of core web technologies, frontend React development, backend APIs, databases, Git/testing, deployment, and AI integrations with hands-on mini projects.',
      highlights: [
        'Balanced theory and practical hands-on implementation',
        'Regular coding exercises and application-based learning',
        'Guided practice in modern tools, APIs, and frameworks',
        'Progressive problem-solving and debugging skill building',
      ],
    },
    {
      phase: 'Phase 2',
      title: 'Company Project Experience',
      duration: 'Months 5 – 6',
      badge: 'Module 9: Major Project',
      desc: 'Participate in real-world company-related projects following standard industry development lifecycles: Plan → Code → Test → Deploy → Present.',
      highlights: [
        'Apply technical knowledge to real enterprise requirements',
        'Gain exposure to end-to-end project planning, testing, and cloud deployment',
        'Develop teamwork, collaboration, and technical communication skills',
        'Build a verified production portfolio and demonstrate outcomes to recruiters',
      ],
    },
  ],
  modules: [
    {
      number: 'Module 1',
      title: 'Web Technologies',
      subtitle: 'Foundation of Full Stack Development',
      phase: 'Phase 1 (Month 1)',
      icon: '🌐',
      subtopics: [
        {
          num: '01',
          name: 'HTML5 – Web Page Structure',
          points: [
            'Semantic HTML elements, document structure, and page organization',
            'Forms, input fields, tables, lists, links, and multimedia elements',
            'Accessible markup, metadata, and SEO-friendly page structure',
          ],
        },
        {
          num: '02',
          name: 'CSS3 – Styling and Layout',
          points: [
            'Selectors, properties, colors, typography, backgrounds, and borders',
            'Box model, Flexbox, Grid, and modern page layout techniques',
            'Responsive web design, media queries, transitions, and animations',
          ],
        },
        {
          num: '03',
          name: 'JavaScript Basics – Programming Fundamentals',
          points: [
            'Variables, data types, operators, conditions, loops, and functions',
            'Arrays, objects, events, and DOM manipulation',
            'Form validation, interactive elements, and basic browser debugging',
          ],
        },
      ],
      miniProject: {
        title: 'Mini-Project: Personal Portfolio Website',
        desc: 'Design and develop a personal portfolio with multiple content sections, responsive layouts, styling, interactive components, contact forms, project showcases, and smooth navigation.',
      },
    },
    {
      number: 'Module 2',
      title: 'Frontend Development',
      subtitle: 'Building Modern, Interactive Web Applications',
      phase: 'Phase 1 (Month 2)',
      icon: '⚛️',
      subtopics: [
        {
          num: '01',
          name: 'Advanced JavaScript (ES6+)',
          points: [
            'Arrow functions, template literals, destructuring, spread and rest operators',
            'Modules, classes, closures, and modern JavaScript programming patterns',
            'Promises, async/await, and asynchronous programming concepts',
          ],
        },
        {
          num: '02',
          name: 'DOM Manipulation & Dynamic Behavior',
          points: [
            'DOM structure, element selection, creation, modification, and removal',
            'Event handling, event propagation, and interactive page behavior',
            'Dynamic content updates, form validation, and browser-based debugging',
          ],
        },
        {
          num: '03',
          name: 'React.js – Modern UI Development',
          points: [
            'React fundamentals, application structure, and declarative UI development',
            'JSX, rendering, conditional displays, and list rendering',
            'Single-page application (SPA) concepts and reusable interface development',
          ],
        },
        {
          num: '04',
          name: 'Components, Props and Hooks',
          points: [
            'Functional components, component composition, and reusable UI elements',
            'Props, state management, and data flow between components',
            'Hooks including useState, useEffect, useRef, and custom Hooks',
          ],
        },
        {
          num: '05',
          name: 'API Integration in Frontend',
          points: [
            'HTTP requests, REST APIs, JSON data handling, and Fetch API',
            'Connecting React components with backend services and external APIs',
            'Loading states, error handling, and dynamic data rendering',
          ],
        },
      ],
      miniProject: {
        title: 'Mini-Project: Interactive Task Management Application',
        desc: 'Develop an interactive task application to create, edit, delete, and organize tasks with status tracking, filtering, responsive interfaces, and API-based data operations.',
      },
    },
    {
      number: 'Module 3',
      title: 'Backend Development',
      subtitle: 'Server-Side Programming and Application Logic',
      phase: 'Phase 1 (Month 2 - 3)',
      icon: '🖥️',
      subtopics: [
        {
          num: '01',
          name: 'Backend Fundamentals',
          points: [
            'Client-server architecture, request-response cycles, and server-side processing',
            'Business logic, routing, middleware, and application structure',
            'Environment configuration, error handling, and server debugging',
          ],
        },
        {
          num: '02',
          name: 'Backend Programming (Node.js / Python / Java)',
          points: [
            'Core programming concepts and backend application development using preferred language',
            'Framework fundamentals, routing, controllers, and modular code organization',
            'Express.js for Node.js-based applications, or language-appropriate backend frameworks',
          ],
        },
        {
          num: '03',
          name: 'REST API Development',
          points: [
            'REST principles, HTTP methods, status codes, and resource-based routing',
            'Request parameters, headers, JSON payloads, and response handling',
            'CRUD operations, input validation, and API testing',
          ],
        },
        {
          num: '04',
          name: 'Authentication and Authorization',
          points: [
            'User registration, login workflows, and password security fundamentals',
            'Token-based authentication, JWT, sessions, and secure access management',
            'Role-based permissions, protected routes, and access control',
          ],
        },
      ],
      miniProject: {
        title: 'Mini-Project: Secure Student Management API',
        desc: 'Develop REST APIs to create, retrieve, update, and delete student records with data validation, error handling, JWT authentication, and Postman API test suites.',
      },
    },
    {
      number: 'Module 4',
      title: 'Database Management',
      subtitle: 'Data Storage, Querying and Database Integration',
      phase: 'Phase 1 (Month 3)',
      icon: '🗄️',
      subtopics: [
        {
          num: '01',
          name: 'SQL – Relational Database Fundamentals',
          points: [
            'Tables, records, fields, data types, keys, and relational database concepts',
            'Queries, filtering, sorting, joins, grouping, and aggregate functions',
            'Constraints, relationships, and database normalization fundamentals',
          ],
        },
        {
          num: '02',
          name: 'NoSQL – Non-Relational Databases',
          points: [
            'Document-based data storage, flexible schemas, and data modeling',
            'Relational versus non-relational databases and their industry use cases',
            'Indexing, query optimization fundamentals, and scalable data storage concepts',
          ],
        },
        {
          num: '03',
          name: 'PostgreSQL – Relational Database Development',
          points: [
            'Database creation, table design, and schema management',
            'Advanced queries, joins, subqueries, views, and ACID transactions',
            'Constraints, indexes, and data integrity management',
          ],
        },
        {
          num: '04',
          name: 'MongoDB – Document Database Development',
          points: [
            'Collections, documents, BSON, and schema design',
            'Querying, filtering, updating, deleting, and aggregation fundamentals',
            'Indexes, relationships between documents, and data modeling',
          ],
        },
        {
          num: '05',
          name: 'CRUD Operations & Cloud Databases',
          points: [
            'Implement create, read, update, and delete operations in applications',
            'Connect backend services to databases using appropriate drivers or ORMs',
            'Cloud database configuration (MongoDB Atlas / Supabase), access security, and backups',
          ],
        },
      ],
      miniProject: {
        title: 'Mini-Project: Database-Driven Record System',
        desc: 'Build a database-driven system with relational/document data models, complex queries, data integrity constraints, filtering, and connection to a live cloud database.',
      },
    },
    {
      number: 'Module 5',
      title: 'Full-Stack Development',
      subtitle: 'Connecting Frontend, Backend and Database',
      phase: 'Phase 1 (Month 3 - 4)',
      icon: '🔄',
      subtopics: [
        {
          num: '01',
          name: 'Full-Stack Application Architecture',
          points: [
            'Connecting React frontend with backend REST APIs and database layers',
            'End-to-end data flow from user interaction to database persistence',
            'Organizing full-stack project repositories, environment variables, and configurations',
          ],
        },
        {
          num: '02',
          name: 'State Management Across Full Stack',
          points: [
            'Managing application state, server state synchronization, and cache management',
            'Handling optimistic updates, pagination, and real-time interface feedback',
            'Prop drilling solutions using React Context API or state libraries',
          ],
        },
        {
          num: '03',
          name: 'Full-Stack Authentication Flow',
          points: [
            'End-to-end user registration and login with secure token storage (HttpOnly cookies / localStorage)',
            'Protected routes on frontend and authorization middleware on backend',
            'Session handling, token refresh mechanisms, and logout flows',
          ],
        },
        {
          num: '04',
          name: 'Form Handling & Server-Side Validation',
          points: [
            'Client-side form validation and sanitization using modern libraries',
            'Server-side validation, error mapping, and consistent API error responses',
            'File uploads, multipart/form-data processing, and cloud storage integration',
          ],
        },
      ],
      miniProject: {
        title: 'Mini-Project: Complete Full-Stack Web Application',
        desc: 'Build an end-to-end authenticated web application connecting a React UI, REST backend, database storage, user authentication, and data operations.',
      },
    },
    {
      number: 'Module 6',
      title: 'Git & Testing',
      subtitle: 'Version Control, Code Quality and Testing Strategies',
      phase: 'Phase 1 (Month 4)',
      icon: '🌿',
      subtopics: [
        {
          num: '01',
          name: 'Git Version Control System',
          points: [
            'Repositories, staging area, commit history, and status tracking',
            'Branching strategies, branch creation, switching, and merging',
            'Resolving merge conflicts, viewing diffs, and understanding Git workflows',
          ],
        },
        {
          num: '02',
          name: 'GitHub Collaboration Workflows',
          points: [
            'Remote repositories, pushing, pulling, and cloning codebases',
            'Pull requests, code reviews, discussions, and repository documentation',
            'GitHub issues, project boards, and release tagging conventions',
          ],
        },
        {
          num: '03',
          name: 'Testing Fundamentals & Unit Testing',
          points: [
            'Importance of software testing and types of tests (unit, integration, end-to-end)',
            'Writing unit tests using Jest / Mocha frameworks for JavaScript code',
            'Testing utility functions, component rendering, and edge cases',
          ],
        },
        {
          num: '04',
          name: 'API Testing & Quality Assurance',
          points: [
            'Testing REST endpoints using Postman and automated test collections',
            'Validating status codes, response payloads, headers, and authentication tokens',
            'Bug tracking, debugging techniques, and writing clean, maintainable code',
          ],
        },
      ],
      miniProject: {
        title: 'Mini-Project: Git-Managed Project with Test Suite',
        desc: 'Set up a professional Git repository with feature branches, pull request workflow, comprehensive README, automated unit tests, and Postman API test collections.',
      },
    },
    {
      number: 'Module 7',
      title: 'Deployment & Cloud Hosting',
      subtitle: 'Taking Web Applications from Local to Production',
      phase: 'Phase 1 (Month 4)',
      icon: '☁️',
      subtopics: [
        {
          num: '01',
          name: 'Frontend Hosting & CI/CD Basics',
          points: [
            'Deploying modern frontend applications to Vercel, Netlify, and static hosts',
            'Build configurations, environment variables, and continuous deployment from Git',
            'Custom domains, SSL certificates, CDN distribution, and caching strategies',
          ],
        },
        {
          num: '02',
          name: 'Backend Hosting & Server Deployment',
          points: [
            'Deploying backend APIs to Render, Railway, Heroku, and container platforms',
            'Server environment variables, port binding, and logging management',
            'Database connection strings, connection pooling, and production security',
          ],
        },
        {
          num: '03',
          name: 'Cloud Infrastructure & AWS Fundamentals',
          points: [
            'Overview of AWS core services (EC2, S3, RDS, IAM)',
            'Deploying applications on AWS cloud virtual servers and static asset storage',
            'Monitoring, health checks, server uptime, and basic scaling concepts',
          ],
        },
        {
          num: '04',
          name: 'DNS, HTTPS and Production Readiness',
          points: [
            'Domain name setup, DNS records (A, CNAME), and domain routing',
            'Enabling HTTPS with SSL/TLS certificates for secure web communication',
            'Performance optimization: asset compression, lazy loading, and error monitoring',
          ],
        },
      ],
      miniProject: {
        title: 'Mini-Project: Live Deployed Full-Stack Application',
        desc: 'Deploy a complete full-stack application with frontend on Vercel/Netlify, backend on Render/AWS, live cloud database on Supabase/Atlas, and secure HTTPS URLs.',
      },
    },
    {
      number: 'Module 8',
      title: 'AI Integrations & AI Tools',
      subtitle: 'Augmenting Full Stack Applications with Artificial Intelligence',
      phase: 'Phase 1 (Month 4)',
      icon: '🤖',
      subtopics: [
        {
          num: '01',
          name: 'Generative AI & LLM Fundamentals',
          points: [
            'Understanding Large Language Models, prompt tokens, context windows, and APIs',
            'OpenAI, Gemini, and Claude API architectures and developer interfaces',
            'Role of AI agents, autonomous workflows, and intelligent web assistants',
          ],
        },
        {
          num: '02',
          name: 'AI API Integration in Web Applications',
          points: [
            'Connecting backend endpoints to OpenAI / Gemini API services',
            'Prompt engineering techniques: system prompts, few-shot examples, and temperature tuning',
            'Streaming responses, token usage tracking, and rate limit handling',
          ],
        },
        {
          num: '03',
          name: 'Developer AI Productivity Tools',
          points: [
            'Using GitHub Copilot, ChatGPT, and Claude for accelerated code generation',
            'AI-assisted debugging, refactoring, test case generation, and documentation',
            'Best practices for evaluating and verifying AI-generated code quality',
          ],
        },
        {
          num: '04',
          name: 'Building AI-Powered Features',
          points: [
            'Chatbots and conversational interfaces integrated into React frontends',
            'AI-driven text summarization, data extraction, and content generation tools',
            'Vector databases and retrieval-augmented generation (RAG) conceptual overview',
          ],
        },
      ],
      miniProject: {
        title: 'Mini-Project: AI-Powered Smart Web Assistant',
        desc: 'Build a web application featuring an integrated conversational AI chatbot using the OpenAI/Gemini API, streaming responses, dynamic prompts, and real-time UI updates.',
      },
    },
    {
      number: 'Module 9',
      title: 'Major Project (Company Experience)',
      subtitle: 'Comprehensive Real-World Enterprise Deliverable (Phase 2)',
      phase: 'Phase 2 (Months 5 – 6)',
      icon: '⭐',
      subtopics: [
        {
          num: '01',
          name: 'Project Planning & Architecture Design',
          points: [
            'Define project requirements, scope, user stories, and feature roadmaps',
            'Wireframing, UI/UX workflow planning, and responsive layout specifications',
            'System architecture: frontend design, backend API schema, database ER diagrams',
          ],
        },
        {
          num: '02',
          name: 'Frontend Development & UI Engineering',
          points: [
            'Develop responsive multi-page React application with modern styling (Tailwind CSS)',
            'Component hierarchy, navigation/routing, form validation, and state management',
            'Interactive elements, loading indicators, error boundaries, and user feedback',
          ],
        },
        {
          num: '03',
          name: 'Backend API & Database Integration',
          points: [
            'REST API development with authentication, input validation, and business logic',
            'Database schema implementation with relational/document queries and indexing',
            'Role-based access control, file storage, and secure third-party integrations',
          ],
        },
        {
          num: '04',
          name: 'AI Integration & Smart Capabilities',
          points: [
            'Embed generative AI capabilities: conversational assistants, smart summaries, or analytics',
            'Secure API key management and server-side AI proxy routes',
            'AI response validation, fallback strategies, and responsive UI rendering',
          ],
        },
        {
          num: '05',
          name: 'Testing, Deployment & Live Demo',
          points: [
            'Unit and integration tests for critical frontend and backend flows',
            'Production deployment on cloud platforms (AWS / Vercel / Render) with custom DNS',
            'Professional GitHub repository with documentation, live URL, and executive demo',
          ],
        },
      ],
      miniProject: {
        title: 'Flagship Major Deliverable: Production Enterprise Application',
        desc: 'A complete, industry-ready application built following real corporate development lifecycles, fully tested, documented on GitHub, and deployed on live cloud infrastructure.',
      },
    },
  ],
  miniProjectsList: [
    { num: '01', title: 'Personal Portfolio Website', module: 'Module 1: Web Technologies', tech: 'HTML5, CSS3, JavaScript', desc: 'Responsive personal brand portfolio with contact forms, project showcases, and interactive navigation.' },
    { num: '02', title: 'Task Management Application', module: 'Module 2: Frontend Development', tech: 'React.js, Hooks, Fetch API', desc: 'Interactive task tracker with CRUD state management, status filtering, and dynamic UI rendering.' },
    { num: '03', title: 'Student Management REST API', module: 'Module 3: Backend Development', tech: 'Node.js, Express, JWT, Postman', desc: 'Secure backend API with token authentication, route guards, validation, and Postman test automation.' },
    { num: '04', title: 'Database-Driven Record System', module: 'Module 4: Database Management', tech: 'PostgreSQL / MongoDB, Prisma', desc: 'High-performance database application with complex querying, relationships, and indexing.' },
    { num: '05', title: 'Full-Stack Authenticated App', module: 'Module 5: Full-Stack Integration', tech: 'React + Node.js + MongoDB + JWT', desc: 'End-to-end web platform integrating client UI, backend business logic, session auth, and databases.' },
    { num: '06', title: 'AI-Powered Smart Web Assistant', module: 'Module 8: AI Integrations', tech: 'OpenAI / Gemini API, Prompt Eng.', desc: 'Intelligent conversational assistant and automated content generation embedded into web applications.' },
    { num: '07', title: 'Major Enterprise Capstone Solution', module: 'Module 9: Company Project (Phase 2)', tech: 'Full Stack + AI + Cloud AWS', desc: 'Industry-grade application built across Months 5–6, deployed on AWS with CI/CD and complete GitHub docs.' },
  ],
  topCompanies: [
    'TCS', 'Infosys', 'Accenture', 'HCLTech', 'Wipro', 'Deloitte', 'Capgemini', 'IBM',
    'Cognizant', 'Microsoft', 'Google', 'Amazon', 'Meta', 'Oracle', 'ByteDance', 'PayPal',
    'Flipkart', 'Walmart', 'PhonePe', 'Zomato', 'Swiggy', 'Uber', 'OLA', 'Razorpay',
    'Freshworks', "BYJU'S", 'upGrad', 'Vedantu',
  ],
  spheronixFeatures: [
    { title: 'Hands-on Experience', desc: 'Gain practical experience with industry-standard tools and real-world projects.' },
    { title: 'Placements & Career Assistance', desc: 'Guidance and support for career opportunities across top partner companies.' },
    { title: 'Career Growth', desc: 'Build a strong career foundation in high-demand software engineering fields.' },
    { title: 'Interview Guidance', desc: 'Expert guidance for technical code interviews and HR screening rounds.' },
    { title: 'High-End Training Facilities', desc: 'Work with modern infrastructure, cloud development labs, and industry tooling.' },
    { title: 'Real-Time Projects', desc: 'Work on live, industry-oriented projects from planning to cloud deployment.' },
    { title: 'Practical-Oriented Training', desc: 'Learn by doing with hands-on, application-based technical sessions.' },
    { title: 'Strong Technical Foundation', desc: 'Build fundamental concepts in frontend, backend, databases, and AI for long-term success.' },
    { title: 'Supportive Learning Environment', desc: 'Mentorship and a friendly learning culture designed to help students grow.' },
    { title: 'Trainers with Industry Experience', desc: 'Learn directly from experienced tech professionals with real-world exposure.' },
  ],
};

export const EMBEDDED_PROGRAM_DATA = {
  id: 'embedded-iot',
  title: 'Embedded Systems & IoT',
  cardTitle: 'Embedded Systems & IoT',
  catalogTitle: 'Embedded AI & IoT',
  subtitle: 'Industry-Oriented Training in Embedded Systems | AI | IoT | Robotics | Automation',
  company: 'SPHERONIX Technology Pvt. Ltd.',
  tagline: 'Technology for a Brighter Tomorrow • Innovate | Learn | Build | Grow',
  duration: '6 Months (4-Part Technical Mastery & Live Hardware Lab Training)',
  stipend: '₹10,000 – ₹15,000/mo',
  stipendType: 'Performance Based',
  icon: '⚡',
  category: 'Embedded & Hardware Engineering Flagship',
  robotModel: 'Bionic Bot M1',
  motto: 'Ideas into Impact',
  contact: {
    address: '5th Floor, No 8 & 9, Shantipura Main Rd, Phase II, Electronic City, Bengaluru, Karnataka 560100',
    phones: ['+91 7386461671', '+91 9515906062'],
    email: 'contact@spheronixtechnology.in',
    website: 'www.spheronixtechnology.in',
  },

  // Founders & Leadership Philosophy (Page 2 & 3)
  foundersMessage: {
    title: 'Founders Message',
    team: 'Team Spheronix',
    quote: 'Inspiring Innovation, Empowering Talent, Building a Smarter, Technology-Driven Future.',
    message:
      'At SPHERONIX Technologies Pvt. Ltd., we believe in the power of innovation, practical learning, and real-world impact. Our journey began with a vision to bridge the gap between academic learning and industry requirements by creating opportunities for students in emerging technologies like AI, Embedded Systems, IoT, Robotics, and Automation. We are committed to empowering the next generation of engineers through industry-oriented training, mentorship, hackathons, and innovative projects, helping them turn their ideas into real solutions. Our goal is to build a smarter, technology-driven future together with our students, partners, and the innovation community.',
  },

  // What is Embedded AI & IoT (Page 3)
  whatIsEmbeddedAiIot: {
    title: 'What is Embedded AI & IoT?',
    roleDescription:
      'The role of an Embedded AI & IoT Software Engineer combines the fields of embedded systems, Artificial Intelligence (AI), and Internet of Things (IoT). This role is centered on the development of intelligent systems that operate at the edge, leveraging AI algorithms and IoT protocols to enable connected, autonomous, and smart devices.',
    industryComparison:
      'There is a lot of scope for Embedded Systems in almost every field nowadays, from Consumer Electronics to Robotics, Agriculture, and Military Aircraft. With such a huge scope, the demand for skilled Embedded Developers is already massive, with very limited skilled resources actually available. The Embedded Industry provides better opportunities and even better salaries and growth than the traditional Software Industry. To learn and succeed, the only need is Passion and Commitment towards Embedded Systems and a GURU who will groom you into a real-time Embedded Expert.',
    scopeIndustries: [
      { name: 'Consumer Electronics', icon: '📱', desc: 'Smart wearables, multimedia appliances & handheld gadgets' },
      { name: 'Robotics & Bionics', icon: '🤖', desc: 'Humanoid robots (Bionic Bot M1), bionic arms & motor control' },
      { name: 'Agriculture Technology', icon: '🌾', desc: 'Smart irrigation, soil telemetry & automated crop drones' },
      { name: 'Military Aircraft & Aerospace', icon: '✈️', desc: 'Mission-critical avionics, flight telemetry & ruggedized nodes' },
      { name: 'Industrial Automation', icon: '🏭', desc: 'PLC interfacing, SCADA, industrial CAN bus & robotics cells' },
      { name: 'Smart Devices & Smart Homes', icon: '🏠', desc: 'Connected thermostats, BLE mesh lighting & smart locks' },
    ],
  },

  // Why Should You Choose SPHERONIX as Your GURU? (Page 3)
  whySpheronixGuru: [
    {
      title: 'Industry-Oriented Training Programs',
      desc: 'Covering Embedded Systems, AI, IoT, Software Development, Robotics, and Automation. All essentials covered before entering the industry. Students with zero prior knowledge begin through structured progressive training.',
    },
    {
      title: 'Practical Learning & Personalized Guidance',
      desc: 'Hands-on experience through hardware-based learning, physical development boards, and practical register-level implementation of concepts.',
    },
    {
      title: 'Real-Time, Project-Based Training',
      desc: 'Focus on practical problem-solving skills, active student participation, continuous learning, practical assignments, and 1-on-1 mentor guidance.',
    },
    {
      title: 'Industry Exposure & Direct Recruiters',
      desc: 'Connect students with real-world industry requirements, live production repositories, and opportunities in leading core engineering firms.',
    },
    {
      title: 'Our Goal',
      desc: 'Help students build strong technical foundations, develop industry-relevant skills, and prepare for career opportunities in emerging technology fields.',
    },
    {
      title: 'Our Vision',
      desc: 'To inspire innovation, empower talent, and build a smarter, technology-driven future.',
    },
  ],

  // Industrial Embedded Systems vs Educational Boards Gap (Page 4)
  hardwareGapAnalysis: {
    title: 'From Learning to Real-World Innovation',
    subtitle: 'What Is Industrial Embedded Systems? Bridging the Educational Gap',
    educationalBoards: {
      type: 'Educational Boards (For Basic Learning)',
      examples: ['Arduino Uno / Nano', 'Raspberry Pi'],
      limitation:
        'Most institutes train using educational boards like Arduino and Raspberry Pi. However, the actual industry rarely uses these educational boards directly for real product development. They come with ready-made APIs where developers do not work directly with hardware registers. This creates a huge gap between candidate knowledge and real industry requirements.',
    },
    industrialBoards: {
      type: 'Industrial Boards (For Real-World Production)',
      examples: ['BeagleBone Black (ARM Cortex-A)', 'STM32 (ARM Cortex-M)', 'TI LaunchPad'],
      advantage:
        'Real-time industrial products require deeper hardware-level programming on ARM Cortex-based boards. Engineers must understand hardware registers completely, configure clock trees, write device drivers, interface peripherals from scratch, and work without ready-made code. SPHERONIX bridges this gap with 100% industrial-grade boards.',
    },
  },

  // Admission & Training Process (Page 4)
  admissionProcess: {
    admissionTest: {
      title: 'Spheronix Technology Admission Process',
      highlights: [
        'Admissions through an entrance test or selection process',
        'No fees for admission tests, where applicable',
        'Selection based on technical knowledge, aptitude, passion, and commitment towards Embedded Systems',
        'Apply through official SPHERONIX website or admissions desk',
      ],
      testSyllabus: [
        'C Programming Fundamentals & Pointers',
        'Digital Logic & Combinational/Sequential Circuits',
        'Microcontrollers & Computer Organization',
        'Operating Systems Concepts',
        'Aptitude, Reasoning & Problem Solving',
      ],
    },
    trainingProcess: {
      title: 'Structured 10-Point Training Process',
      points: [
        'Structured training with blended theory and intensive laboratory practical sessions',
        'Hands-on lab practice and hardware-based learning on industrial boards',
        'Daily assignments, register-level exercises, and code reviews',
        'Theoretical and practical assessments for every single module',
        'Mock technical interviews and personal counselling with senior architects',
        'Regular performance evaluation and milestone tracking',
        'Classroom teaching and interactive group discussions',
        'Real-time and industry-oriented project implementation',
        'Full software development lifecycle (SDLC) using Git & GitLab',
        'Career guidance and core placement assistance into semiconductor firms',
      ],
    },
  },

  // 4 Core Syllabus Parts Breakdown
  phasesSummary: [
    {
      phase: 'Part 1',
      title: 'Programming Concepts on Linux Platform',
      duration: 'Modules 1 & 2',
      badge: 'Linux, C, Data Structures, Python & Assembly',
      desc: 'Master the Linux OS environment from the ground up, followed by exhaustive C programming, GNU toolchain (GCC/GDB/Makefile), data structures, shell scripting, Python for hardware test suites, and x86/ARM assembly.',
      highlights: [
        'Linux root filesystem hierarchy, shell pipes, redirects, and permissions',
        'Deep C memory layout, stack frames, pointer arithmetic & bitwise manipulation',
        'GNU Toolchain: GCC compiler stages, GDB debugging, and Makefiles',
        'Assembly programming for x86 and ARM Cortex architectures interfacing with C',
      ],
    },
    {
      phase: 'Part 2',
      title: 'Embedded AI, ARM Cortex-M4 & FreeRTOS',
      duration: 'Modules 3 & 4',
      badge: 'Hardware Essentials, TinyML & Real-Time Kernels',
      desc: 'Build foundational mastery in digital logic, microprocessors (8085/8086), STM32F401RB-T6 SoC bare-metal C, sensor/actuator interfacing, FreeRTOS preemptive multitasking, and TinyML AI inference on edge nodes.',
      highlights: [
        'ARM Cortex-M4 NVIC interrupt controller, SysTick timer, and bare-metal C registers',
        'Interfacing GPIO, UART, I2C, SPI, CAN bus, PWM, Timers, ADC, and DAC',
        'Deploying Edge AI models with TensorFlow Lite for Microcontrollers & STM32Cube.AI',
        'FreeRTOS task scheduling, semaphores, mutexes, message queues, and IoT protocols (MQTT, CoAP)',
      ],
    },
    {
      phase: 'Part 3',
      title: 'Embedded Linux Device Driver Development',
      duration: 'Modules 5 to 8',
      badge: 'LSP, LDD, Kernel Internals & Board Support Packages',
      desc: 'Transition to advanced Linux System Programming (LSP), Linux Device Drivers (LDD), kernel compilation, U-Boot bootloader customization, BeagleBone Black BSP development, and hardware JTAG/SWD debugging.',
      highlights: [
        'Linux System Programming: Process management, signals, pthreads, IPC & memory mapping',
        'Linux Device Drivers: Character drivers, major/minor numbers, file_operations, /proc & /sys',
        'Embedded Linux BSP: U-Boot bootloader, KBuild system, and custom Device Trees (.dts)',
        'Multi-layer debugging: User space (GDB/Valgrind), Kernel (printk/OOPS/KDB), and Hardware (SWD/JTAG)',
      ],
    },
    {
      phase: 'Part 4',
      title: 'SDLC, Career & Semiconductor Industry Placement',
      duration: 'Modules 9 & 10',
      badge: 'Git/GitLab, C-Vital Drills & Placement Assistance',
      desc: 'Master enterprise open-source workflows with Git and GitLab CI/CD, cscope/ctags for kernel source navigation, intensive C-Vital coding drills, project presentations, and technical mock interviews for top semiconductor recruiters.',
      highlights: [
        'Source code version control: Git branching, patch submissions, diffs, and GitLab CI/CD',
        'Code browsing in multi-million line kernel trees using cscope ($ cscope -R) and ctags ($ ctags -R)',
        'C-Vital specialized C language mastery drills for core technical interviews',
        'Placement assistance into semiconductor leaders: TI, Qualcomm, NXP, NVIDIA, Bosch, STM',
      ],
    },
  ],

  // ALL 10 OFFICIAL MODULES FROM SPHERONIX BOOKLET (Pages 5, 6, 8, 9)
  modules: [
    {
      number: 'Module 1',
      title: 'Linux Basics',
      subtitle: 'Awareness of the Linux Platform for Beginners (Part 1: Programming Concepts)',
      phase: 'Part 1: Programming Concepts',
      icon: '🐧',
      subtopics: [
        {
          num: '01',
          name: 'Linux Origin & Kernel Features',
          points: [
            'How Linux was built and historical evolution of UNIX / Linux',
            'Linux kernel architecture, core features, and multi-user multitasking principles',
            'Open-source licensing models (GPL, LGPL) and community collaboration',
            'Basic Linux commands, terminal navigation, and file system exploration',
          ],
        },
        {
          num: '02',
          name: 'Filesystem Hierarchy & Documentation',
          points: [
            'Linux Root Filesystem Hierarchy standard (/, /bin, /etc, /dev, /proc, /sys, /var)',
            'Command documentation, man pages (sections 1 to 8), info pages, and help flags',
            'Text editors in Linux: Vim / Vi modes, shortcuts, navigation, and Nano productivity',
          ],
        },
        {
          num: '03',
          name: 'Shells, Permissions & Redirections',
          points: [
            'Types of shells (sh, bash, zsh), environment variables, and PATH configuration',
            'Users, groups, and file permissions (chmod, chown, symbolic and numeric modes)',
            'Standard I/O streams: standard input (stdin), standard output (stdout), standard error (stderr)',
            'Redirections (> , >> , <) and pipeline operator (|) for command chaining',
          ],
        },
      ],
      miniProject: {
        title: 'Mini-Project: Linux CLI System Inspection & Log Parsing Suite',
        desc: 'Construct automated Bash shell workflows using pipelines, grep, awk, and sed to parse Linux system logs, monitor CPU/memory usage, and generate system diagnostic reports.',
      },
    },
    {
      number: 'Module 2',
      title: 'Programming: C, GNU Toolchain, Data Structures, Python & Assembly',
      subtitle: 'Improving Programming Skills & Logical Problem Solving from Beginner to Expert',
      phase: 'Part 1: Programming Concepts',
      icon: '💻',
      subtopics: [
        {
          num: '01',
          name: 'C Programming Basics & Memory Layout',
          points: [
            'Elements in C: identifiers, keywords, constants, variables, and primitive data types',
            'Operators (arithmetic, relational, logical, bitwise), operator precedence & associativity',
            'Conditional statements (if-else, switch-case) and looping structures (for, while, do-while)',
            'Storage classes (auto, static, extern, register) and variable lifetimes',
            'Memory layout of a C program: Text segment, Data (initialized/uninitialized BSS), Heap, and Stack',
            'Stack frame execution, function activation records, and call-by-value vs call-by-reference',
            'Functions, multi-dimensional arrays, strings, pre-processor directives (#define, #ifdef, macros), and error handling',
          ],
        },
        {
          num: '02',
          name: 'GNU Toolchain & Build Automation',
          points: [
            'GNU C Compiler (GCC) compilation stages: Preprocessing (-E), Compilation (-S), Assembly (-c), Linking (-o)',
            'GNU Debugger (GDB): breakpoints, watchpoints, step-into/step-over, backtrace, and memory examination',
            'GNU Makefile: targets, prerequisites, rules, automatic variables ($@, $<, $^), and dependency management',
            'GNU Binutils: objdump, nm, readelf, size, strip, and GNU build system essentials',
          ],
        },
        {
          num: '03',
          name: 'C Programming Advanced & Pointer Mastery',
          points: [
            'Pointer fundamentals, address-of operator (&), dereference operator (*), and pointer arithmetic',
            'Advanced pointers: pointer to pointer (double pointers), strings and arrays with pointers',
            'Function pointers and callback architectures for event-driven embedded firmware',
            'Array pointers, command-line arguments (argc, argv), and recursive function logic',
            'Dynamic memory allocation (malloc, calloc, realloc, free) and avoiding memory leaks/dangling pointers',
            'Structures, unions, bit fields for hardware register mapping, enumerations, file handling, and mixing Assembly with C',
          ],
        },
        {
          num: '04',
          name: 'Data Structures in Embedded C',
          points: [
            'Introduction to data structures and abstract data types (ADTs)',
            'Stacks and Queues: implementation via arrays and circular buffers for UART/DMA packets',
            'Single Linked Lists and Double Linked Lists: insertion, deletion, and traversal',
            'Searching algorithms (linear search, binary search) and sorting algorithms (bubble, selection, insertion, quicksort)',
            'Binary trees and binary search trees (BST) for embedded hierarchical lookup tables',
          ],
        },
        {
          num: '05',
          name: 'Shell & Python Scripting for Test Automation',
          points: [
            'Shell scripting: variables, parameters, command substitution, conditions, loops, functions, and debugging',
            'Python programming overview: syntax, control statements, modules, file I/O, and error handling',
            'Automated testing with Pytest: writing test suites for embedded communications',
            'Hardware testing scripts: Python GPIO control, Serial (PySerial) automated telemetry, and Socket networking tests',
          ],
        },
        {
          num: '06',
          name: 'Assembly Programming for x86 & ARM Architecture',
          points: [
            'Assembly language fundamentals, machine code representation, and processor fetch-decode-execute cycle',
            'x86 architecture and x86 assembly programming (registers, instructions, calling conventions)',
            'ARM architecture and ARM assembly programming: R0-R15 registers, CPSR, Thumb-2 instruction set',
            'Registers and addressing modes, stack operations (PUSH/POP), subroutines, and linking C with Assembly routines',
            'Real-time examples: writing inline assembly in C for time-critical peripheral access',
          ],
        },
      ],
      miniProject: {
        title: 'Mini-Project: Circular DMA Buffer & Hardware Test Automation Suite',
        desc: 'Develop an optimized circular buffer data structure in C with inline ARM assembly instructions, verified by an automated Python/Pytest serial test harness.',
      },
    },
    {
      number: 'Module 3',
      title: 'Embedded Systems Essentials – Academic Level',
      subtitle: 'Brushing up Prerequisites for Learning Embedded C Programming (Part 2: Embedded AI & IoT)',
      phase: 'Part 2: Embedded AI & IoT',
      icon: '📐',
      subtopics: [
        {
          num: '01',
          name: 'Digital Electronics Foundations',
          points: [
            'Number systems: Binary, Decimal, Octal, Hexadecimal, and two’s complement representation',
            'Logic gates: AND, OR, NOT, NAND, NOR, XOR, XNOR and Boolean algebra simplification',
            'Combinational circuits: adders, subtractors, multiplexers, demultiplexers, encoders, and decoders',
            'Sequential circuits: latches, flip-flops (SR, JK, D, T), registers, and synchronous/asynchronous counters',
            'Applications of digital circuits in microprocessor buses, timing generators, and state machines',
          ],
        },
        {
          num: '02',
          name: 'Computer Organization (CO)',
          points: [
            'Introduction to Computer Organization, Von Neumann vs Harvard architectures',
            'Memory organization: RAM, ROM, cache memory hierarchy, and memory mapping techniques',
            'Input/Output organization: programmed I/O, interrupt-driven I/O, and Direct Memory Access (DMA)',
            'x86 architecture, processor registers, instruction formats, and assembly language execution flow',
          ],
        },
        {
          num: '03',
          name: '8085 / 8086 Microprocessor Architecture',
          points: [
            '8085 specifications, internal block diagram, pin configuration, and bus structures (address, data, control)',
            '8085 instruction set: data transfer, arithmetic, logical, branching, and machine control groups',
            'Memory segmentation (Code, Data, Stack, Extra segments) in 8086 microprocessors',
            '8085 simulator practicals: writing, tracing, and debugging assembly instructions on simulators',
          ],
        },
      ],
      miniProject: {
        title: 'Mini-Project: Digital State Machine & Microprocessor Bus Emulator',
        desc: 'Model and simulate a synchronous digital state machine with logic gates and emulate microprocessor bus cycles with memory segmentation mapping.',
      },
    },
    {
      number: 'Module 4',
      title: 'Embedded AI, Embedded C & FreeRTOS on ARM Cortex-M4',
      subtitle: 'Industrial Embedded Systems, Edge AI Neural Networks & Real-Time Kernels',
      phase: 'Part 2: Embedded AI & IoT',
      icon: '🦾',
      subtopics: [
        {
          num: '01',
          name: 'ARM Cortex-M4 Architecture & Bare-Metal C',
          points: [
            'ARM Cortex-M4 features, processor modes (Thread vs Handler), privileged vs unprivileged execution',
            'Internal registers (R0-R15, xPSR, MSP, PSP, CONTROL) and Thumb-2 instruction set',
            'System Tick (SysTick) timer configuration for precise millisecond system delays',
            'Nested Vectored Interrupt Controller (NVIC): interrupt priority, preemption, sub-priorities, and vector tables',
            'Embedded hardware platform: STM32F401RB-T6 SoC and Raayan Mini Development Board',
            'General C vs Embedded C, bitwise operators, bit masking, Keil µVision IDE, and STM32CubeIDE',
          ],
        },
        {
          num: '02',
          name: 'Comprehensive Hardware Peripheral Interfacing',
          points: [
            'GPIO interfacing: LEDs, push-button switches, 16x2 Character LCD, and DHT11 digital sensors',
            'UART/USART: Wi-Fi modules, Bluetooth (HC-05), GSM/GPRS, GPS receivers, Audio Codec, and Biometric fingerprint sensors',
            'I2C communication: Real-Time Clock (DS1307 RTC), EEPROM external memory, and ADXL345 3-axis accelerometer',
            'SPI protocol: high-speed TFT LCD graphic displays and external flash memory',
            'Controller Area Network (CAN bus): CAN controller, transceiver ICs, IoT nodes, and automotive OBD-II diagnostics',
            'Pulse Width Modulation (PWM) for motor control, Watchdog Timer (WDT), hardware timers/counters, and ADC/DAC (LM35 temperature sensor)',
          ],
        },
        {
          num: '03',
          name: 'Embedded AI & TinyML Neural Networks',
          points: [
            'AI Frameworks for Microcontrollers: TensorFlow Lite for Microcontrollers (TFLM), TinyML, and PyTorch Mobile',
            'Edge AI vs Cloud AI: latency, privacy, bandwidth reduction, and power constraints',
            'Edge Impulse platform: data acquisition, feature extraction, model training, and C++ library export',
            'Embedded AI Tools: STM32Cube.AI neural network optimization, STM32CubeMX integration, and STM32 AI Model Zoo',
            'Model quantization: converting 32-bit floating-point weights to INT8 integer representation for Cortex-M execution',
          ],
        },
        {
          num: '04',
          name: 'FreeRTOS Real-Time Operating System',
          points: [
            'General Purpose OS (GPOS) vs Real-Time Operating System (RTOS): determinism, latency, and scheduling',
            'FreeRTOS core libraries, architecture, and memory allocation schemes (Heap 1 through Heap 5)',
            'Real-Time scheduling: preemptive priority-based scheduling vs cooperative time-slicing',
            'Porting FreeRTOS on STM32F401RB-T6 Cortex-M4 microcontroller',
            'Task management: task creation (xTaskCreate), task states, stack sizing, and priority assignment',
            'Inter-task communication & synchronization: mutexes, binary semaphores, counting semaphores, message queues, and event groups',
            'Interrupt handling in RTOS: deferred interrupt processing with FromISR APIs and software timers',
          ],
        },
        {
          num: '05',
          name: 'IoT Architecture & Industrial Protocols',
          points: [
            'IoT 4-layer architecture: End User, IoT Gateway, Edge Node, and Physical Sensor/Actuator Layer',
            'Industrial & wireless protocols: MQTT (Publish/Subscribe, QoS, LWT), CoAP, Bluetooth Low Energy (BLE), Zigbee, Wi-Fi, CAN bus, Modbus RTU/TCP, and Ethernet',
            'Building real-time IoT cloud applications with cloud telemetry and edge data pipelines',
          ],
        },
      ],
      miniProject: {
        title: 'Mini-Project: TinyML Edge Anomaly Detector with FreeRTOS Multitasking',
        desc: 'Deploy a quantized neural network on STM32F401RB-T6 Cortex-M4 running FreeRTOS to perform real-time vibration anomaly classification on an ADXL345 accelerometer with MQTT telemetry.',
      },
    },
    {
      number: 'Module 5',
      title: 'Linux System Programming (LSP)',
      subtitle: 'Operating Systems Concepts, Linux Internals & System-Level Application Development',
      phase: 'Part 3: Embedded Linux Device Drivers',
      icon: '⚙️',
      subtopics: [
        {
          num: '01',
          name: 'OS Concepts & Linux Kernel Architecture',
          points: [
            'Types of OS kernels: Monolithic, Microkernel, Hybrid, and Real-Time Kernels',
            'Operating system operations: dual-mode execution (user mode vs kernel mode), system call interface',
            'Linux kernel architecture overview, process scheduler algorithms (CFS), and context switching mechanics',
          ],
        },
        {
          num: '02',
          name: 'File Management & File Control Operations',
          points: [
            'Linux file tree and file types (regular, directory, character, block, FIFO, socket, symbolic link)',
            'Virtual Filesystem (VFS) architecture, Superblock, Inodes, directory entries (dentry), and disk data blocks',
            'System calls (open, read, write, close, lseek) vs Standard C library buffered I/O (fopen, fread, fwrite)',
            'File descriptor table, system-wide open file table, and inode table relationships',
            'File control operations via fcntl(), file duplicate descriptors (dup, dup2), and record locking (file locking)',
          ],
        },
        {
          num: '03',
          name: 'Process Management & Multithreading',
          points: [
            'Process structure, Process Control Block (task_struct in Linux), and process lifecycle states',
            'Process creation (fork), program execution (exec family), and process termination (exit, wait, waitpid)',
            'Process scheduling, priority levels, nice values, and real-time scheduling policies (SCHED_FIFO, SCHED_RR)',
            'Signals: asynchronous notifications, signal generation, signal handlers, sigaction(), and reentrant functions',
            'POSIX Threads (pthreads): thread creation, termination, attributes, mutex locks, and condition variables',
            'Synchronization challenges: Producer-Consumer problem, race conditions, deadlocks, and thread safety',
          ],
        },
        {
          num: '04',
          name: 'Inter-Process Communication (IPC) & Memory',
          points: [
            'Classic IPC: Anonymous pipes (pipe) and Named pipes (FIFOs)',
            'System V and POSIX IPC: Semaphores, Shared Memory (shmget, shmat), and Message Queues (msgget, msgsnd, msgrcv)',
            'Network & local IPC: UNIX domain sockets and TCP/IP Internet domain sockets (client-server architecture)',
            'Memory management: Virtual memory, paging, page tables, page faults, swapping, and memory mapping (mmap)',
          ],
        },
      ],
      miniProject: {
        title: 'Mini-Project: Multi-Process Industrial Telemetry Gateway Daemon',
        desc: 'Engineer a multi-threaded Linux daemon utilizing fork/exec, POSIX shared memory, semaphores, and socket IPC to route real-time telemetry packets between independent hardware processes.',
      },
    },
    {
      number: 'Module 6',
      title: 'Linux Device Drivers (LDD)',
      subtitle: 'Writing Custom Kernel Modules & Character Device Drivers',
      phase: 'Part 3: Embedded Linux Device Drivers',
      icon: '🔌',
      subtopics: [
        {
          num: '01',
          name: 'Linux Kernel Architecture & Roles',
          points: [
            'The two primary roles of the Linux kernel: resource management and hardware abstraction',
            'Kernel programming constraints: no standard C library (libc), no floating point, restricted stack size',
            'Linux source tree overview: arch/, drivers/, include/, kernel/, fs/, net/, and Documentation/',
          ],
        },
        {
          num: '02',
          name: 'Introduction to Device Drivers',
          points: [
            'What is a Device Driver? The bridge between user applications and physical hardware controllers',
            'Types of device drivers: Character Drivers, Block Drivers, and Network Drivers',
            'Role of device drivers in hardware abstraction and uniform file-like access via /dev entries',
          ],
        },
        {
          num: '03',
          name: 'Kernel Configuration & Virtual Filesystems',
          points: [
            'Configuring the Linux kernel using make menuconfig / defconfig and compiling kernel binaries',
            'Booting the compiled Linux kernel on target embedded hardware',
            'Interacting with virtual filesystems: /proc (process & runtime info) and /sys (unified device model kobjects)',
          ],
        },
        {
          num: '04',
          name: 'Loadable Kernel Modules (LKM)',
          points: [
            'What is a Kernel Module? Dynamic runtime loading vs static kernel compilation',
            'User mode vs Kernel mode execution, CPU privilege rings, and memory protection boundaries',
            'Kernel module programming: init_module / module_init() and cleanup_module / module_exit() macros',
            'Module operations: loading with insmod / modprobe, unloading with rmmod, and inspecting with lsmod / modinfo',
            'Module licensing (MODULE_LICENSE), module parameters (module_param), and module dependencies (depmod)',
          ],
        },
        {
          num: '05',
          name: 'Character Device Driver Implementation',
          points: [
            'Character device registration: alloc_chrdev_region() and register_chrdev_region()',
            'Major and Minor numbers: major number identifies driver, minor number identifies specific physical device',
            'The file_operations structure: implementing open, read, write, unlocked_ioctl, and release operations',
            'Data transfer between user space and kernel space: copy_to_user() and copy_from_user()',
            'Automatic device node creation under /dev using class_create() and device_create() with udev',
          ],
        },
      ],
      miniProject: {
        title: 'Mini-Project: Custom Character Kernel Driver with IOCTL Hardware Control',
        desc: 'Write, compile, and insert a complete Linux Character Device Driver module that interfaces with GPIO registers via IOCTL commands, validated by a user-space C test program.',
      },
    },
    {
      number: 'Module 7',
      title: 'Embedded Linux Projects & Board Support Packages (BSP)',
      subtitle: 'Target Board Bring-up, U-Boot Customization & Device Tree Engineering',
      phase: 'Part 3: Embedded Linux Device Drivers',
      icon: '🐧',
      subtopics: [
        {
          num: '01',
          name: 'Introduction to Embedded Linux Systems',
          points: [
            'Embedded Linux system architecture: Bootloader -> Kernel -> Root Filesystem -> User Applications',
            'Embedded hardware vs software separation, building cross-compilation toolchains (GCC, Binutils, C libraries)',
            'C libraries for embedded systems: glibc, uClibc-ng, and musl libc comparison',
            'Setting up a target development board (BeagleBone Black ARM Cortex-A) and serial console debugging',
            'Boot sequence comparison: Desktop x86 BIOS/UEFI vs Embedded ARM boot sequence (ROM -> SPL -> U-Boot -> Kernel)',
          ],
        },
        {
          num: '02',
          name: 'Boot Loaders & U-Boot Customization',
          points: [
            'Board Support Packages (BSP): defining hardware platform abstractions for target processor boards',
            'Universal Boot Loader (U-Boot) architecture, build process, and configuration',
            'Essential U-Boot commands: printenv, setenv, saveenv, tftpboot, bootm, md, mm',
            'U-Boot customization: tailoring bootdelay, default boot commands (bootcmd), and network TFTP/NFS booting',
          ],
        },
        {
          num: '03',
          name: 'Linux Kernel & Device Tree Engineering',
          points: [
            'KBuild system: Makefiles, Kconfig files, and modular kernel building',
            'Introduction to Device Trees: describing non-discoverable hardware without hardcoding C files',
            'Writing and compiling Device Tree Source (.dts, .dtsi) into Device Tree Blobs (.dtb) with DTC compiler',
            'Device Tree bindings, nodes, properties (reg, interrupts, compatible), and runtime Device Tree Overlays (.dtbo)',
          ],
        },
        {
          num: '04',
          name: 'Embedded Linux Troubleshooting & Diagnostics',
          points: [
            'Configuring and cross-compiling the Linux kernel image (zImage / uImage) for BeagleBone Black',
            'Booting the Linux kernel over network (TFTP/NFS) and SD card boot partitions',
            'Self-diagnostic tools and troubleshooting kernel boot hangs and driver probe failures',
            'Developing Linux device driver automated test cases using Shell and Python scripting',
          ],
        },
      ],
      miniProject: {
        title: 'Mini-Project: BeagleBone Black Custom BSP & Device Tree Overlay',
        desc: 'Perform full board bring-up on BeagleBone Black: build custom U-Boot, compile Linux kernel, author a custom Device Tree Overlay for sensor hardware, and mount RootFS over NFS.',
      },
    },
    {
      number: 'Module 8',
      title: 'Comprehensive Debugging Techniques',
      subtitle: 'User Space, Android, Remote, Kernel Space & Hardware Debugging Tools',
      phase: 'Part 3: Embedded Linux Device Drivers',
      icon: '🔍',
      subtopics: [
        {
          num: '01',
          name: 'User Space Debugging Tools',
          points: [
            'GNU Debugger (GDB): attaching to running processes, core dump post-mortem analysis, and symbols',
            'System call tracing with strace: diagnosing file access errors, failed permissions, and network bottlenecks',
            'Library call tracing with ltrace, and inspecting process state via /proc and /sys',
            'Valgrind suite: detecting memory leaks (memcheck), buffer overruns, and uninitialized variable reads',
          ],
        },
        {
          num: '02',
          name: 'Android & Remote Target Debugging',
          points: [
            'Android Debug Bridge (adb): shell access, file pushing/pulling, logcat filtering for system events',
            'Android Virtual Device (AVD) testing and native C/C++ debugging on Android runtimes',
            'Remote target debugging: cross-GDB host setup, running gdbserver on embedded boards over Ethernet/Serial',
            'Remote shell access, automated scripting, and file transfer via SSH / SCP',
          ],
        },
        {
          num: '03',
          name: 'Kernel Space Debugging & Crash Analysis',
          points: [
            'printk logging: log levels (KERN_EMERG to KERN_DEBUG), dynamic debug, and dmesg log analysis',
            'Diagnosing Kernel Panics: fatal system states, panic notifiers, and system halting',
            'Kernel OOPS analysis: decoding stack traces, Instruction Pointer (IP), register dumps, and symbol lookup',
          ],
        },
        {
          num: '04',
          name: 'Kernel Debugging Tools (KDB, KGDB & Kprobes)',
          points: [
            'Built-in kernel debugger (KDB) and remote kernel debugger (KGDB) over serial cable',
            'Dynamic kernel tracing with Kprobes and Jprobes: hooking into kernel functions without recompilation',
            'Linux crash dump analysis using kdump and crash utility for post-crash root cause identification',
          ],
        },
        {
          num: '05',
          name: 'Hardware In-Circuit Debugging Probes',
          points: [
            'Serial Wire Debug (SWD) protocol: high-speed 2-wire debugging for ARM Cortex microcontrollers',
            'Joint Test Action Group (JTAG) standard: IEEE 1149.1 boundary scan and in-circuit emulation',
            'Logic analyzers: capturing and decoding live waveforms on SPI, I2C, UART, and CAN communication lines',
          ],
        },
      ],
      miniProject: {
        title: 'Mini-Project: Kernel Panic Post-Mortem & Logic Analyzer Packet Decode',
        desc: 'Trigger and analyze an intentional kernel OOPS on an embedded Linux board, capture crash traces with GDB/KGDB, and decode real-time SPI sensor packets with a hardware logic analyzer.',
      },
    },
    {
      number: 'Module 9',
      title: 'Open Source Development Environment (SDLC)',
      subtitle: 'Source Code Version Control, Git, GitLab CI/CD & Large Codebase Browsing',
      phase: 'Part 4: SDLC & Career Preparation',
      icon: '🐙',
      subtopics: [
        {
          num: '01',
          name: 'Source Code Version Control with Git',
          points: [
            'Introduction to GIT and distributed revision control system architecture',
            'Git concepts: working directory, staging index, commit tree, SHA-1 hashes, and HEAD pointer',
            'Essential Git commands: init, clone, status, add, commit, diff, log, reset, and checkout',
          ],
        },
        {
          num: '02',
          name: 'Advanced Git Operations & Patch Workflows',
          points: [
            'Branching strategies: branch creation, switching, feature branches, and merge strategies (fast-forward vs recursive)',
            'Tagging releases (lightweight vs annotated tags) and managing local vs remote repositories (fetch, pull, push)',
            'Git operations: contributing patches, generating git diff, git format-patch, and git am for Linux kernel contributions',
            'Resolving merge conflicts, rebasing feature commits, and writing professional semantic commit messages',
          ],
        },
        {
          num: '03',
          name: 'GitLab Enterprise DevOps & CI/CD',
          points: [
            'GitLab repository management, projects, permissions, and group hierarchies',
            'Merge Requests (MR): branch protection, code review comments, and approval workflows',
            'Issues tracking, milestone roadmaps, and agile board management for firmware teams',
            'GitLab CI/CD: writing .gitlab-ci.yml pipeline scripts for automated cross-compilation and unit tests',
            'DevOps security and compliance: scanning for vulnerabilities in embedded third-party libraries',
          ],
        },
        {
          num: '04',
          name: 'Source Code Browsing Tools for Huge Codebases',
          points: [
            'Navigating multi-million line codebases like the Linux Kernel and Android AOSP',
            'cscope database generation: building search index ($ cscope -R) and querying functions, symbols, and callers',
            'ctags source tagging: generating tag files ($ ctags -R) for rapid jump-to-definition in Vim / VS Code',
            'Efficient exploration of core kernel trees: drivers/, include/, arch/arm/, and kernel/',
          ],
        },
      ],
      miniProject: {
        title: 'Mini-Project: Automated GitLab CI/CD Cross-Compilation Pipeline',
        desc: 'Set up a complete GitLab repository with automated CI/CD pipeline that cross-compiles embedded C and device driver code, runs cscope indexing, and verifies formatting against Linux kernel coding standards.',
      },
    },
    {
      number: 'Module 10',
      title: 'Entering the Semiconductor Industry',
      subtitle: 'Assessment, C-Vital Practice, Seminars, Technical Mock Interviews & Career Assistance',
      phase: 'Part 4: SDLC & Career Preparation',
      icon: '🎯',
      subtopics: [
        {
          num: '01',
          name: 'Rigorous Assessment & Preparation',
          points: [
            'Regular module assessments and timed written technical exams',
            'Hands-on lab tests on physical development boards under mentor supervision',
            'Profile preparation: crafting a standout engineering resume highlighting embedded projects, schematics, and GitHub code',
            'Interview-oriented course revision and individual 1-on-1 career guidance',
          ],
        },
        {
          num: '02',
          name: 'Industry Exposure & C-Vital Drills',
          points: [
            'On-Campus and Off-Campus placement drive support across leading semiconductor MNCs',
            'C-Vital (Intensive C Language Mastery Drills): pointer puzzles, bitwise tricks, memory alignment, and tricky interview questions',
            'Project presentation skills: effectively demonstrating hardware prototypes to interview panels',
            'Industry seminars delivered by core engineering directors and semiconductor leads',
          ],
        },
        {
          num: '03',
          name: 'Professional Skills & Technical Mock Interviews',
          points: [
            'How to present hardware and firmware projects in core technical interviews',
            'Team interactions, collaborative engineering etiquette, and motivational leadership sessions',
            'Technical mock interviews: rigorous 1-on-1 interview simulations covering C, ARM, RTOS, Linux, and hardware debugging',
            'Direct placement assistance into top semiconductor and product companies according to company policies',
          ],
        },
      ],
      miniProject: {
        title: 'Capstone: Semiconductor Interview Repertoire & Live Hardware Portfolio',
        desc: 'Assemble an industry-grade portfolio containing your live hardware schematics, kernel modules, FreeRTOS projects, and verified GitHub repositories, paired with simulated mock interview evaluations.',
      },
    },
  ],

  // 10 REAL-WORLD EMBEDDED AI & IOT PROJECTS (Page 6 & Page 7)
  miniProjectsList: [
    {
      num: '01',
      title: 'Industrial IoT Gateway',
      module: 'Module 4: Embedded AI & IoT',
      tech: 'STM32F401, CAN Bus, Modbus, MQTT, Wi-Fi',
      desc: 'Multi-protocol edge gateway connecting industrial factory sensor nodes over CAN and Modbus, publishing telemetry to cloud servers via secure MQTT.',
    },
    {
      num: '02',
      title: 'Smart Tracking System',
      module: 'Module 4: Embedded AI & IoT',
      tech: 'ARM Cortex-M4, GPS, GSM/GPRS, Accelerometer',
      desc: 'Intelligent real-time asset tracking node with GPS geofencing, crash detection interrupts, and emergency cellular telemetry alerts.',
    },
    {
      num: '03',
      title: 'Handheld Terminal Device',
      module: 'Module 4: Embedded AI & IoT',
      tech: '0.96" OLED (SSD1306), Keypad, Barcode/RFID',
      desc: 'Portable battery-powered industrial diagnostic terminal with custom graphical OLED menu interfaces and serial RFID data capture.',
    },
    {
      num: '04',
      title: 'Smart Attendance System',
      module: 'Module 4: Embedded AI & IoT',
      tech: 'Biometric Sensor, RC522 RFID, RTC DS1307',
      desc: 'Enterprise attendance hardware with biometric fingerprint verification, contactless RFID logging, and offline EEPROM synchronization.',
    },
    {
      num: '05',
      title: 'Smart Data Logger',
      module: 'Module 4: Embedded AI & IoT',
      tech: 'Multi-Channel ADC, SPI Flash, USB/UART Export',
      desc: 'High-precision telemetry logging system sampling analog transducers with microsecond SysTick timestamps and secure SPI flash storage.',
    },
    {
      num: '06',
      title: 'Smart Home Automation System',
      module: 'Module 5: ESP32 IoT & BLE',
      tech: 'ESP32 Dual-Core, Embedded Web Server, MQTT',
      desc: 'Comprehensive wireless automation node featuring an onboard responsive web server, BLE smartphone provisioning, and cloud MQTT relays.',
    },
    {
      num: '07',
      title: 'Smart Grid Telemetry Node',
      module: 'Module 4: Embedded AI & IoT',
      tech: 'STM32, Energy ICs, CAN Bus, Modbus',
      desc: 'Industrial power grid monitoring terminal measuring voltage, current, and harmonics with fail-safe CAN bus communication.',
    },
    {
      num: '08',
      title: 'Smart Waste Management System (SWMS)',
      module: 'Module 4: Embedded AI & IoT',
      tech: 'Ultrasonic Sensors, Solar Battery, Cellular IoT',
      desc: 'Urban municipal smart bin sensor measuring fill level, tilt, and fire alerts with low-power sleep modes and cloud dispatch optimization.',
    },
    {
      num: '09',
      title: 'Firmware Over-the-Air (FOTA)',
      module: 'Module 4: Embedded AI & IoT',
      tech: 'Dual-Partition Flash, HTTPS Bootloader, SHA-256',
      desc: 'Fail-safe remote firmware upgrade system for Cortex-M microcontrollers with cryptographic checksum verification and automatic roll-back.',
    },
    {
      num: '10',
      title: 'Obstacle-Avoiding & Line-Following Autonomous Robot',
      module: 'Module 4 & Robotics Lab',
      tech: 'DC Motors, Servos, IR Array, Ultrasonic Radar, PWM',
      desc: 'Autonomous robotic vehicle platform integrating motor driver ICs, multi-channel IR line sensors, ultrasonic obstacle avoidance, and wireless command control.',
    },
  ],

  // DEVELOPMENT BOARDS & HARDWARE LAB FACILITIES (Page 7)
  developmentBoards: [
    {
      category: 'Non-OS Microcontroller Development Boards',
      board: 'STM32 ARM Cortex-M Series (STM32F401RB-T6 & Raayan Mini Board)',
      icon: '⚡',
      specs: [
        'STM32 ARM Cortex-M4 Microcontroller with Hardware FPU',
        'Bare-Metal Embedded C Programming & Register Manipulation',
        'GPIO Configuration, System Tick Timer & Interrupt Handling (NVIC)',
        'UART, SPI, and I2C Communication Buses',
        'Multi-Channel ADC and High-Resolution PWM Configuration',
        'Sensor & Actuator Interfacing with Real-Time Peripheral Control',
        'Firmware Development and Hardware Debugging via Keil & STM32CubeIDE',
        'Applications in Industrial Automation and Embedded Control',
      ],
    },
    {
      category: 'Embedded Linux Development Boards',
      board: 'BeagleBone Black (ARM Cortex-A Processor)',
      icon: '🐧',
      specs: [
        'BeagleBone Black Board powered by TI AM335x ARM Cortex-A8',
        'Embedded Linux Operating System & Command-Line Programming',
        'Linux Kernel and Custom Device Driver Fundamentals',
        'GPIO, UART, SPI, and I2C Interfacing via Linux Subsystems',
        'Device Tree (.dts/.dtbo) Configuration and Hardware Overlays',
        'Cross-Compilation Toolchains and Linux System Programming',
        'Hardware and Software Integration with U-Boot Bootloader',
        'Applications in Industrial IoT and Edge Computing Systems',
      ],
    },
    {
      category: 'ESP32-Based IoT Development Boards',
      board: 'ESP32 & ESP32-C3 Wi-Fi/Bluetooth SoC',
      icon: '📡',
      specs: [
        'Xtensa Dual-Core & RISC-V Microcontrollers',
        'Integrated 2.4 GHz Wi-Fi and Bluetooth Low Energy (BLE)',
        'Embedded C and C++ Programming with ESP-IDF & FreeRTOS',
        'GPIO, ADC, PWM, UART, SPI, and I2C Peripheral Lines',
        'Sensor and Actuator Integration for Connected Devices',
        'Onboard Embedded Web Server and WebSocket Telemetry',
        'MQTT-Based IoT Applications with TLS/SSL Cloud Security',
        'Applications in Smart Home Automation and Industrial Wireless Nodes',
      ],
    },
    {
      category: 'Robotics and Automation Development Platforms',
      board: 'Autonomous Robot Chassis & Multi-Motor Controller',
      icon: '🤖',
      specs: [
        'Microcontroller-Based Robotics Control with Dual H-Bridge Drivers',
        'Interfacing High-Torque DC Geared Motors and Precision Servo Motors',
        'Sensor Integration and Real-Time Signal Processing',
        'Ultrasonic Radar and Multi-Channel Infrared (IR) Sensor Arrays',
        'PWM-Based Motor Speed Regulation and Differential Steering',
        'Obstacle Detection, Collision Avoidance, and Line-Following Navigation',
        'Wireless Robot Control via Bluetooth / RF Remote Commands',
        'Integration of Edge AI and IoT for Smart Autonomous Robotics',
      ],
    },
    {
      category: 'Display Modules & Graphical User Interfaces',
      board: 'OLED (0.96" SSD1306) & Character LCD (16x2 / 20x4)',
      icon: '🖥️',
      specs: [
        '0.96-inch OLED: 128 x 64 Pixel Resolution with SSD1306 Controller (I2C/SPI)',
        'Text, Custom Graphic Bitmaps, and Live Sensor Data Waveforms',
        'Real-Time Parameter Monitoring and Interactive Menu Navigation',
        '16 x 2 and 20 x 4 Character LCD Modules with HD44780 Controllers',
        '4-Bit and 8-Bit Parallel GPIO Control with Custom Character Generators',
        'Integration with STM32, ESP32, and BeagleBone Black Embedded Platforms',
      ],
    },
    {
      category: 'Peripheral and Sensor Interface Modules',
      board: 'Physical Hardware Sensor & Transceiver Lab Bench',
      icon: '🔬',
      specs: [
        'UART-to-USB Converter Modules (CP2102 / FTDI) for Serial Telemetry',
        'ADC and DAC Signal Conversion Modules for Analog Sensor Processing',
        'DHT11 Digital Temperature and Humidity Environmental Sensors',
        'MPU6050 6-Axis Accelerometer and Gyroscope Motion Sensors',
        'RC522 13.56 MHz RFID Reader Modules for Contactless Identification',
        'Optocoupler Relay Modules and L298N High-Current Motor Drivers',
        'DS1307 Real-Time Clock (RTC) Modules with Battery Backup',
        'EEPROM External I2C Memory Modules for Persistent Data Logging',
        'CAN Communication Transceiver Modules (MCP2515 / TJA1050)',
        'GPIO Expansion Modules for Complex Industrial Circuitry',
      ],
    },
  ],

  // 28 OFFICIAL CORE SEMICONDUCTOR & EMBEDDED HIRING COMPANIES (Page 10)
  topCompanies: [
    'Texas Instruments',
    'Qualcomm',
    'NXP Semiconductors',
    'NVIDIA',
    'Bosch',
    'STMicroelectronics',
    'Infineon',
    'Intel',
    'AMD',
    'Renesas',
    'Microchip',
    'Analog Devices',
    'onsemi',
    'ARM',
    'Tata Elxsi',
    'HCLTech',
    'Wipro',
    'L&T Technology Services',
    'Capgemini',
    'Persistent',
    'Cognizant',
    'Tech Mahindra',
    'Mindtree',
    'Accenture',
    'Knowles',
    'Verizon',
    'Samsung',
    'Panasonic',
  ],

  // 10 OFFICIAL SPHERONIX FEATURES (Page 10)
  spheronixFeatures: [
    {
      title: 'Hands-on Experience',
      desc: 'Gain practical experience with industry-standard development boards, oscilloscopes, and logic analyzer tools.',
    },
    {
      title: 'Placements and Career Assistance',
      desc: 'Dedicated placement guidance and interview referrals across leading core electronics and semiconductor multinationals.',
    },
    {
      title: 'Career Growth',
      desc: 'Build a durable, high-paying career in high-demand technology fields with better longevity than pure software.',
    },
    {
      title: 'Interview Guidance',
      desc: 'Expert preparation covering low-level C programming, ARM architecture, RTOS multitasking, and HR screening rounds.',
    },
    {
      title: 'High-End Hardware Exposure',
      desc: 'Work with advanced industrial development boards: STM32 Cortex-M, BeagleBone Black Cortex-A, and ESP32 nodes.',
    },
    {
      title: 'Real-Time Projects',
      desc: 'Engineer 10 real-world industry projects from schematic design to register firmware and cloud IoT telemetry.',
    },
    {
      title: 'Practical-Oriented Training',
      desc: 'Learn by doing through hands-on laboratory exercises and application-based implementation on physical hardware.',
    },
    {
      title: 'Strong Technical Foundation',
      desc: 'Build fundamental concepts in digital logic, operating systems, Linux internals, and device drivers for long-term success.',
    },
    {
      title: 'Supportive Learning Environment',
      desc: 'Personalized 1-on-1 code reviews and a friendly, innovation-driven culture designed to help students grow.',
    },
    {
      title: 'Trainers with Industry Experience',
      desc: 'Learn directly from seasoned embedded firmware architects with real-world semiconductor and robotics product experience.',
    },
  ],
};
