// Static site content. Content that lives in Storyblok (projects, partners,
// testimonials, blog posts) is NOT here — see src/lib/storyblok.ts.

export const site = {
  name: "Uptick Tech",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://uptick.tech",
  tagline: "Web apps, SaaS platforms & custom software",
  description:
    "Uptick Tech is an IT company building scalable, secure, high-performance web applications, SaaS platforms, dashboards and custom software with the MERN stack, Next.js and the cloud.",
  contact: {
    email: "upticktechllp@gmail.com",
    phone: "+91 73069 94840",
    whatsapp: "917306994840",
    address: "Malappuram, Kerala",
    response: "Within 2 hours",
    // opens Google Maps (directions on phones, map on desktop)
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Malappuram%2C+Kerala",
  },
  social: [{ label: "Instagram", href: "https://www.instagram.com/uptick_tech/" }],
};

export const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services", mega: true },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const stats = [
  { value: 20, suffix: "+", label: "Projects delivered" },
  { value: 15, suffix: "+", label: "Happy clients" },
  { value: 99, suffix: "%", label: "On-time delivery" },
  { value: 24, suffix: "/7", label: "Support & monitoring" },
];

export type Service = {
  slug: string;
  icon: string;
  title: string;
  short: string;
  intro: string;
  features: string[];
  tech: string[];
  // matches the `category` option on the Storyblok `contact` block
  enquiry: string;
};

export const services: Service[] = [
  {
    slug: "web-development",
    icon: "globe",
    title: "Web Development",
    short: "Fast, SEO-ready websites and web apps on Next.js and the MERN stack.",
    intro:
      "From brand websites to complex web applications, we build fast, accessible and search-friendly experiences with clean, maintainable code that your team can grow.",
    features: [
      "Next.js & React front-ends with server rendering",
      "Node.js / Express APIs and MongoDB data layers",
      "Headless CMS integration (Storyblok and others)",
      "Core Web Vitals & SEO optimisation",
      "Animations, micro-interactions and 3D with Framer Motion, GSAP and Three.js",
    ],
    tech: ["Next.js", "React", "Node.js", "MongoDB", "TypeScript", "Tailwind"],
    enquiry: "WEB DEVELOPMENT",
  },
  {
    slug: "saas-development",
    icon: "layers",
    title: "SaaS Platforms",
    short: "Multi-tenant products with auth, billing, roles and analytics.",
    intro:
      "We take SaaS ideas from MVP to scale — designing the architecture, subscription flows and admin tooling needed to launch quickly and grow safely.",
    features: [
      "Multi-tenant architecture and role-based access",
      "Subscription billing and payment gateways",
      "Usage analytics and admin consoles",
      "API-first design with documentation",
      "Scalable cloud deployment and monitoring",
    ],
    tech: ["Next.js", "Node.js", "PostgreSQL", "Redis", "Stripe", "AWS"],
    enquiry: "WEB DEVELOPMENT",
  },
  {
    slug: "dashboards-admin-panels",
    icon: "grid",
    title: "Dashboards & Admin Panels",
    short: "Real-time data views and internal tools teams love to use.",
    intro:
      "Turn raw data into decisions. We design and build dashboards, reporting tools and back-office panels that are fast, clear and secure.",
    features: [
      "Real-time charts and KPI tracking",
      "Role-based views and audit trails",
      "Data import/export and report generation",
      "Integrations with existing systems and APIs",
      "Responsive layouts for desktop and tablet",
    ],
    tech: ["React", "Next.js", "Node.js", "MongoDB", "WebSockets"],
    enquiry: "WEB DEVELOPMENT",
  },
  {
    slug: "erp-custom-software",
    icon: "shield",
    title: "ERP & Custom Software",
    short: "Tailor-made software shaped around your business workflow.",
    intro:
      "Off-the-shelf tools rarely fit perfectly. We build ERP modules and bespoke software that automate your processes and connect your systems.",
    features: [
      "Inventory, HR, accounting and CRM modules",
      "Workflow automation and approvals",
      "Third-party and legacy system integrations",
      "Secure data handling and backups",
      "Training, documentation and long-term support",
    ],
    tech: ["Node.js", "React", "PostgreSQL", "MongoDB", "Docker"],
    enquiry: "ERP SOFTWARE",
  },
  {
    slug: "mobile-app-development",
    icon: "phone",
    title: "Mobile App Development",
    short: "Cross-platform apps for iOS and Android with a native feel.",
    intro:
      "We build polished mobile experiences that share logic with your web platform, so you ship to both stores faster and keep one consistent product.",
    features: [
      "Cross-platform apps with React Native",
      "Push notifications, offline mode and deep links",
      "App Store and Google Play release support",
      "Secure authentication and payments",
      "Analytics and crash monitoring",
    ],
    tech: ["React Native", "TypeScript", "Node.js", "Firebase"],
    enquiry: "APP DEVELOPMENT",
  },
  {
    slug: "ecommerce-solutions",
    icon: "cart",
    title: "E-commerce Solutions",
    short: "Conversion-focused online stores with custom checkout and admin.",
    intro:
      "Whether it is a custom storefront or a headless commerce build, we create stores that load fast, convert well and are easy to manage.",
    features: [
      "Custom storefronts and headless commerce",
      "Payment, shipping and tax integrations",
      "Inventory and order management",
      "Performance and conversion optimisation",
      "Multi-currency and multi-language support",
    ],
    tech: ["Next.js", "Stripe", "Node.js", "MongoDB", "Redis"],
    enquiry: "E-COMMERCE",
  },
  {
    slug: "cloud-devops",
    icon: "cloud",
    title: "Cloud & DevOps",
    short: "CI/CD, containers and cloud infrastructure with monitoring built in.",
    intro:
      "Ship confidently with automated pipelines, reproducible environments and observability that catches problems before your users do.",
    features: [
      "CI/CD pipelines and automated testing",
      "Docker and container orchestration",
      "AWS and Vercel deployments",
      "Security hardening and backups",
      "Logging, monitoring and alerting",
    ],
    tech: ["AWS", "Docker", "GitHub Actions", "Vercel", "Nginx"],
    enquiry: "OTHER ENQUIRY",
  },
  {
    slug: "ui-ux-3d-design",
    icon: "pen",
    title: "UI/UX & 3D Experiences",
    short: "Interfaces and interactive 3D that make products memorable.",
    intro:
      "Design and engineering together: research-led UI/UX, design systems and immersive 3D / motion experiences that bring your brand to life.",
    features: [
      "User research, wireframes and prototypes",
      "Design systems and component libraries",
      "Interactive 3D with Three.js / React Three Fiber",
      "Motion design with GSAP and Framer Motion",
      "Accessibility and usability testing",
    ],
    tech: ["Figma", "Three.js", "GSAP", "Framer Motion"],
    enquiry: "WEB DEVELOPMENT",
  },
];

export const processSteps = [
  ["01", "Discover", "We study your goals, users and constraints, then define scope, roadmap and success metrics."],
  ["02", "Design", "Wireframes and interactive prototypes so you see and shape the product before code is written."],
  ["03", "Develop", "Agile sprints with clean code, automated tests and regular demos you can react to."],
  ["04", "Deploy", "Secure CI/CD releases to the cloud with monitoring, performance tuning and zero-downtime updates."],
  ["05", "Support", "Ongoing maintenance, scaling and new features as your product and users grow."],
] as const;

export const faqs = [
  {
    q: "How do you choose the right technology for my project?",
    a: "We start from your goals, budget, timeline and team. For most web products we recommend Next.js with a Node.js back-end, but we pick the stack that fits the problem rather than the other way around.",
  },
  {
    q: "How long does a typical project take?",
    a: "A business website usually takes 3–6 weeks, while SaaS platforms, dashboards and ERP systems are delivered in phases over 2–6 months. You get a clear plan with milestones after discovery.",
  },
  {
    q: "What security standards do you follow?",
    a: "We follow OWASP best practices — validated inputs, secure authentication, role-based access, encrypted data in transit and at rest, dependency audits and regular backups.",
  },
  {
    q: "Do you provide support after launch?",
    a: "Yes. We offer maintenance plans covering monitoring, updates, bug fixes, performance tuning and new features, with fast response times.",
  },
  {
    q: "Can you work with our existing team or system?",
    a: "Absolutely. We regularly extend existing codebases, integrate with legacy systems and collaborate with in-house developers and designers.",
  },
  {
    q: "Who owns the code and design?",
    a: "You do. Once the project is paid for, all source code, designs and assets are transferred to you.",
  },
];

export const values = [
  ["Quality first", "Clean, tested, documented code that is easy to extend and maintain."],
  ["Transparent", "Clear scope, honest timelines and regular demos — no surprises."],
  ["Performance driven", "Fast load times, great Core Web Vitals and efficient infrastructure."],
  ["Long-term partners", "We stay after launch to help your product evolve and scale."],
];

export const techStack = [
  "React", "Next.js", "Node.js", "Express", "MongoDB", "TypeScript", "Tailwind CSS",
  "Three.js", "GSAP", "Framer Motion", "AWS", "Docker", "PostgreSQL", "Storyblok",
];
