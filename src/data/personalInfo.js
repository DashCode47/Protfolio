import meImage from '../assets/me.jpg';

export const personalInfo = {
  name: "David Lozada",
  title: "Senior Consultant",
  subtitle: "Desarrollador Full-Stack & Consultor Técnico",
  description: "Consultor técnico dinámico y orientado a resultados con más de 5 años de experiencia entregando soluciones IT innovadoras en los sectores gubernamental y financiero. Experiencia comprobada en arquitectura de sistemas, desarrollo de software y gestión de proyectos, complementada con una sólida base en ingeniería de software y dominio en React y React Native. Comprometido con fomentar la colaboración en equipo y adaptarse a las necesidades cambiantes de los proyectos mientras impulsa iniciativas de mejora continua.",
  email: "daviddev47@hotmail.com",
  phone: "593 978724619",
  location: "Quito, Ecuador",
  profileImage: meImage
};

export const skills = [
  { name: "JavaScript", category: "Lenguaje", icon: "code" },
  { name: "TypeScript", category: "Lenguaje", icon: "code" },
  { name: "React", category: "Framework", icon: "developer_mode" },
  { name: "React Native", category: "Framework", icon: "developer_mode" },
  { name: "Node.js", category: "Backend", icon: "dns" },
  { name: "Spring Boot", category: "Backend", icon: "dns" },
  { name: "Java", category: "Lenguaje", icon: "code" },
  { name: "Redux", category: "Framework", icon: "data_object" },
  { name: "HTML5", category: "Lenguaje", icon: "code" },
  { name: "CSS3", category: "Lenguaje", icon: "code" },
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

export const projects = [
  {
    title: "Blu Benefits App by Diners Club",
    description: "Aplicación móvil para gestión de beneficios y recompensas de tarjeta de crédito Diners Club. Desarrollo completo con React Native, integración de Firebase y herramientas de analítica.",
    image: IMG5,
    tags: ["React Native", "Firebase", "AppsFlyer"],
    liveUrl: "https://play.google.com/store/apps/details?id=com.appmundosocios&hl=es_EC",
    codeUrl: null,
    privateRepo: true
  },
  {
    title: "Blu de Diners Club",
    description: "Aplicación móvil oficial de Diners Club para gestión de tarjetas y beneficios. Desarrollada con React Native y tecnologías modernas de desarrollo móvil.",
    image: IMG6,
    tags: ["React Native", "Firebase", "Redux"],
    liveUrl: "https://play.google.com/store/apps/details?id=com.blu.de.diners.club&hl=es_EC",
    codeUrl: null,
    privateRepo: true
  },
  {
    title: "Diners Club Web App",
    description: "Aplicación web completa para gestión de tarjetas Diners Club. Interfaz responsiva desarrollada con React y Spring Boot, integrando APIs internas y servicios externos.",
    image: IMG7,
    tags: ["React", "Spring Boot", "Node.js"],
    liveUrl: "https://www.dinersclub.com.ec",
    codeUrl: null,
    privateRepo: true
  },
  {
    title: "Fantasy Team",
    description: "Aplicación web para gestión de equipos de fantasía deportiva. Desarrollada con React, permite crear y gestionar equipos virtuales con estadísticas en tiempo real.",
    image: IMG1,
    tags: ["React", "JavaScript", "Vercel"],
    liveUrl: "https://fantasy-team-kruger-star-km-dl.vercel.app",
    codeUrl: "https://github.com/DashCode47/Fantasy-Team"
  },
  {
    title: "My Dormitory",
    description: "Sistema de gestión para residencias estudiantiles. Aplicación móvil desarrollada con React Native para facilitar la administración de dormitorios universitarios.",
    image: IMG3,
    tags: ["React Native", "Firebase", "Mobile"],
    liveUrl: "https://drive.google.com/file/d/1zH8YT7ghaoreTfiLROg8bJQEbIIHV6TL/view?usp=share_link",
    codeUrl: "https://github.com/DashCode47/Kursobaya-"
  },
  {
    title: "Web Agency",
    description: "Sitio web corporativo para agencia de desarrollo. Diseño moderno y responsivo desarrollado con React, mostrando servicios y portfolio de proyectos.",
    image: IMG2,
    tags: ["React", "CSS3", "Vercel"],
    liveUrl: "https://dash-code-agency.vercel.app",
    codeUrl: "https://github.com/DashCode47/DashCode-Agency"
  },
  {
    title: "Recipe App",
    description: "Aplicación móvil para descubrir y guardar recetas de cocina. Desarrollada con React Native, incluye búsqueda, favoritos y categorización de recetas.",
    image: IMG4,
    tags: ["React Native", "Mobile", "Firebase"],
    liveUrl: "https://drive.google.com/file/d/1QHVe7lP8j1Sgb57cXI7ZiDJR_ObxbfFe/view?usp=share_link",
    codeUrl: "https://github.com/DashCode47/Recipes-App"
  }
];

export const experience = [
  {
    type: "experience",
    date: "01/2025 - 10/2025",
    title: "Technical Consultant",
    company: "Centro Hub",
    location: "Hybrid",
    description: "Diseño y validación de soluciones tecnológicas para proyectos bancarios, enfocándome en la precisión del código y eficiencia de API. Analicé integraciones backend complejas usando Redux y Sagas para asegurar confiabilidad en el manejo de datos. Implementé mecanismos de seguimiento rigurosos usando librerías de analítica para evaluar el rendimiento de características y flujos de usuarios."
  },
  {
    type: "experience",
    date: "09/2023 - 01/2025",
    title: "Software Engineer (React & Java Focus)",
    company: "Technisys",
    description: "Ingeniería de módulos Core Banking, requiriendo comprensión profunda de algoritmos complejos y estructuras de datos seguras. Colaboré con equipos multifuncionales para validar requisitos técnicos, asegurando integración fluida entre APIs internas y servicios externos. Realicé revisiones de código y optimizaciones de rendimiento para asegurar altos estándares de rendimiento en software financiero."
  },
  {
    type: "experience",
    date: "11/2022 - 05/2023",
    title: "Software Developer (Java & Web)",
    company: "Kruger",
    location: "Remote",
    description: "Lideré el desarrollo y revisión de aplicaciones web complejas usando Java (Spring Boot) y JavaScript. Aseguré precisión y confiabilidad del código implementando herramientas de análisis automatizado como SonarLint y SonarQube, reduciendo drásticamente la deuda técnica. Participé en la definición de arquitecturas de API, enfocándome en la lógica de conexión y funcionalidad de servicios."
  },
  {
    type: "experience",
    date: "05/2020 - 07/2022",
    title: "Software Developer",
    company: "Zaycev Design",
    location: "Remote",
    description: "Desarrollé diversos productos SaaS, adaptándome rápidamente a diferentes bases de código y frameworks. Colaboré en la lógica de arquitectura móvil para iOS y Android, asegurando consistencia entre plataformas."
  },
  {
    type: "education",
    date: "06/2023",
    title: "Bachelor: Software Engineering",
    company: "Kazan Federal University",
    location: "Russia",
    description: "Cursos relevantes: Algoritmos, Estructuras de Datos, Programación Orientada a Objetos (Java/JavaScript), Arquitectura de Sistemas."
  }
];

export const socialLinks = {
  linkedin: "https://www.linkedin.com/in/david-lozada471/",
  instagram: "https://instagram.com/davsh47",
  github: "https://github.com/DashCode47"
};

