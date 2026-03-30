import meImage from '../assets/me.jpg';

export const personalInfo = {
  name: "David Lozada",
  title: "Senior Consultant",
  subtitle: "Full-Stack Developer & Technical Consultant",
  description: "Dynamic and results-driven technical consultant with over 5 years of experience delivering innovative IT solutions in the government and financial sectors. Proven expertise in systems architecture, software development, and project management, complemented by a strong foundation in software engineering with proficiency in React and React Native. Committed to fostering team collaboration and adapting to evolving project needs while consistently driving continuous improvement initiatives.",
  email: "daviddev47@hotmail.com",
  phone: "593 978724619",
  location: "Quito, Ecuador",
  profileImage: meImage
};

export const splashScreen = {
  welcome: "Welcome to my portfolio",
};

export const skills = [
  { name: "JavaScript", category: "Language", icon: "code" },
  { name: "TypeScript", category: "Language", icon: "code" },
  { name: "React", category: "Framework", icon: "developer_mode" },
  { name: "React Native", category: "Framework", icon: "developer_mode" },
  { name: "Node.js", category: "Backend", icon: "dns" },
  { name: "Spring Boot", category: "Backend", icon: "dns" },
  { name: "Java", category: "Language", icon: "code" },
  { name: "Redux", category: "Framework", icon: "data_object" },
  { name: "HTML5", category: "Language", icon: "code" },
  { name: "CSS3", category: "Language", icon: "code" },
  { name: "Docker", category: "Herramientas", icon: "deployed_code" },
  { name: "Firebase", category: "Herramientas", icon: "cloud" },
  { name: "Git", category: "Herramientas", icon: "code" },
  { name: "AWS", category: "Cloud", icon: "cloud" }
];

import IMG1 from '../assets/portfolio.png';
import IMG2 from '../assets/portfolio2.png';
import IMG3 from '../assets/portfolio5.png';
import IMG4 from '../assets/portfolio3.png';
import IMG5 from '../assets/portfolio6.png';
import IMG6 from '../assets/portfolio7.png';
import IMG7 from '../assets/portfolio8.png';
import IMG8 from '../assets/portfolio9.png';

export const projects = [
  {
    title: "Diners Club Web App",
    description: "Complete web application for Diners Club card management. Responsive interface developed with React and Spring Boot, integrating internal APIs and external services.",
    image: IMG7,
    tags: ["React", "Spring Boot", "Node.js"],
    liveUrl: "https://www.dinersclub.com.ec",
    codeUrl: null,
    privateRepo: true
  },
  {
    title: "ChatAnalizer",
    description: "ChatAnalizer is a privacy-first \"Relationship Wrapped\" platform built with React and FastAPI that transforms WhatsApp chat histories into deep, AI-powered analytics and cinematic visual stories.",
    image: IMG8,
    tags: ["Python", "TypeScript", "LLM"],
    liveUrl: "https://chat-analizer-api.vercel.app/",
    codeUrl: "https://github.com/DashCode47/ChatAnalizer"
  },
  {
    title: "Blu Benefits App by Diners Club",
    description: "Mobile application for managing Diners Club credit card benefits and rewards. Complete development with React Native, Firebase integration, and analytics tools.",
    image: IMG5,
    tags: ["React Native", "Firebase", "AppsFlyer"],
    liveUrl: "https://play.google.com/store/apps/details?id=com.appmundosocios&hl=es_EC",
    codeUrl: null,
    privateRepo: true
  },
  {
    title: "Blu de Diners Club",
    description: "Official Diners Club mobile application for card and benefits management. Developed with React Native and modern mobile development technologies.",
    image: IMG6,
    tags: ["React Native", "Firebase", "Redux"],
    liveUrl: "https://play.google.com/store/apps/details?id=com.blu.de.diners.club&hl=es_EC",
    codeUrl: null,
    privateRepo: true
  },


  {
    title: "My Dormitory",
    description: "Management system for student residences. Mobile application developed with React Native to facilitate university dormitory administration.",
    image: IMG3,
    tags: ["React Native", "Firebase", "Mobile"],
    liveUrl: "https://drive.google.com/file/d/1zH8YT7ghaoreTfiLROg8bJQEbIIHV6TL/view?usp=share_link",
    codeUrl: "https://github.com/DashCode47/Kursobaya-"
  },
  {
    title: "Web Agency",
    description: "Corporate website for development agency. Modern and responsive design developed with React, showcasing services and project portfolio.",
    image: IMG2,
    tags: ["React", "CSS3", "Vercel"],
    liveUrl: "https://dash-code-agency.vercel.app",
    codeUrl: "https://github.com/DashCode47/DashCode-Agency"
  },

  {
    title: "Fantasy Team",
    description: "Web application for managing fantasy sports teams. Developed with React, allows creating and managing virtual teams with real-time statistics.",
    image: IMG1,
    tags: ["React", "JavaScript", "Vercel"],
    liveUrl: "https://fantasy-team-kruger-star-km-dl.vercel.app",
    codeUrl: "https://github.com/DashCode47/Fantasy-Team"
  }
];

export const experience = [
  {
    type: "experience",
    date: "01/2025 - 10/2025",
    title: "Technical Consultant",
    company: "Centro Hub",
    location: "Hybrid",
    description: "Designed and validated technological solutions for banking projects, focusing on code accuracy and API efficiency. Analyzed complex backend integrations using Redux and Sagas to ensure reliability in data handling. Implemented rigorous tracking mechanisms using analytics libraries to evaluate feature performance and user flows."
  },
  {
    type: "experience",
    date: "09/2023 - 01/2025",
    title: "Software Engineer (React & Java Focus)",
    company: "Technisys",
    description: "Engineered Core Banking modules, requiring deep understanding of complex algorithms and secure data structures. Collaborated with cross-functional teams to validate technical requirements, ensuring seamless integration between internal APIs and external services. Conducted code reviews and performance optimizations to ensure high-performance standards in financial software."
  },
  {
    type: "experience",
    date: "11/2022 - 05/2023",
    title: "Software Developer (Java & Web)",
    company: "Kruger",
    location: "Remote",
    description: "Led the development and review of complex web applications using Java (Spring Boot) and JavaScript. Ensured code accuracy and reliability by implementing automated analysis tools like SonarLint and SonarQube, drastically reducing technical debt. Participated in the definition of API architectures, focusing on connection logic and service functionality."
  },
  {
    type: "experience",
    date: "05/2020 - 07/2022",
    title: "Software Developer",
    company: "Zaycev Design",
    location: "Remote",
    description: "Developed diverse SaaS products, adapting quickly to different codebases and frameworks. Collaborated on mobile architecture logic for iOS and Android, ensuring consistency across platforms."
  },
  {
    type: "education",
    date: "06/2023",
    title: "Bachelor: Software Engineering",
    company: "Kazan Federal University",
    location: "Russia",
    description: "Relevant Coursework: Algorithms, Data Structures, Object-Oriented Programming (Java/JavaScript), System Architecture."
  }
];

export const socialLinks = {
  linkedin: "https://www.linkedin.com/in/david-lozada471/",
  instagram: "https://instagram.com/davsh47",
  github: "https://github.com/DashCode47"
};

