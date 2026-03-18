import rammobiles from '../assets/rammobiles.png';
import financial from '../assets/financial.png';
import book from '../assets/book.png';

export const projects = [
  {
    title: 'Ram Mobiles',
    liveLink: 'https://ecommerce-mern-website-1.onrender.com',
    githubLink: 'https://github.com/nitinvedi/ecommerce-mern-website', // Add if available, otherwise leave empty
    period: "Nov '25 – Dec '25",
    description: 'A full-stack e-commerce platform managing product catalog, order lifecycles, and inventory with secure authentication.',
    technologies: ["React", "Node.js", "MongoDB", "Express", "Tailwind"],
    image: rammobiles
  },
  {
    title: 'Distributed URL Shortener',
    liveLink: '', 
    githubLink: 'https://github.com/nitinvedi/url-shortener',
    period: "Mar '26",
    description: 'A highly scalable, distributed URL shortener built with Go, engineered for sub-10ms latency and high throughput.',
    technologies: ["Go (Golang)", "Redis", "PostgreSQL", "Docker"],
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: 'Zypher',
    liveLink: '', 
    githubLink: 'https://www.github.com/nitinvedi/power-supply-feedback',
    period: "Jan '25",
    description: 'A responsive web platform for electricity service feedback with secure authentication and server-side validation.',
    technologies: ["PHP", "JavaScript", "Tailwind CSS", "MySQL"],
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: 'Financial Fraud Detection',
    liveLink: '', 
    githubLink: 'https://github.com/nitinvedi/Financial-Fraud-Detection-System',
    period: "Mar '24",
    description: 'End-to-end ML pipeline and Streamlit dashboard to detect fraudulent financial transactions using historical banking data.',
    technologies: ["Python", "Scikit-learn", "Streamlit", "ML"],
    image: financial
  },
  {
    title: 'Library Management System',
    liveLink: 'https://code-store8-cipher-school.vercel.app/',
    githubLink: 'https://github.com/nitinvedi/CodeStore8-CipherSchool',
    period: "Jun '25 – Jul '25",
    description: 'Full-stack library system with JWT authentication, role-based permissions, and efficient book tracking.',
    technologies: ["MERN Stack", "Redux", "JWT"],
    image: book
  },
];
