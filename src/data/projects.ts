import { Project } from '../types';
// Import the Knowtopia image directly
import knowtopiaImg from '../assets/knowtopia.png';
import crimecastImg from '../assets/crimecast.png';
import skillportImg from '../assets/skillport.png';
import kitaabImg from '../assets/kitaab.png';
import lyricmatchImg from '../assets/lyricmatch.png';
import resumebuilderImg from '../assets/resumebuilder.png';

export const projects: Project[] = [
  {
    id: 'knowtopia',
    title: 'Knowtopia',
    description: 'A knowledge sharing platform that allows users to create, share, and discover educational content on various topics.',
    technologies: ['Vue.js', 'Python', 'Flask', 'JavaScript', 'Tailwind CSS', 'Docker', 'OpenAI API'],
    thumbnailUrl: knowtopiaImg,
    videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4', // Placeholder
    // liveUrl: 'https://github.com/Sparkonix11/Knowtopia',
    sourceUrl: 'https://github.com/Sparkonix11/Knowtopia',
    screenshots: []
  },
  {
    id: 'crimecast',
    title: 'CrimeCast - Forecasting Crime Categories',
    description: 'A predictive analytics project that uses machine learning to forecast crime categories based on historical data and various factors.',
    technologies: ['Python', 'Jupyter Notebook', 'Scikit-learn', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn'],
    thumbnailUrl: crimecastImg,
    videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4', // Placeholder
    sourceUrl: 'https://github.com/Sparkonix11/CrimeCast-Forecasting-Crime-Categories',
  },
  {
    id: 'skillport',
    title: 'SkillPort',
    description: 'A platform designed to connect skilled professionals with people seeking to learn specific skills, facilitating knowledge transfer and skill development.',
    technologies: ['React.js', 'Redux Toolkit', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS', 'JWT', 'Razorpay'],
    thumbnailUrl: skillportImg,
    videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4', // Placeholder
    sourceUrl: 'https://github.com/Sparkonix11/SkillPort',
  },
  {
    id: 'kitaab',
    title: 'Kitaab',
    description: 'An online book store and reading platform that allows users to discover, purchase, and read books digitally.',
    technologies: ['Vue.js', 'Vite', 'Python', 'Flask', 'SQLite', 'JavaScript', 'CSS', 'JWT'],
    thumbnailUrl: kitaabImg,
    videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4', // Placeholder
    // liveUrl: 'https://github.com/Sparkonix11/Kitaab',
    sourceUrl: 'https://github.com/Sparkonix11/Kitaab',
  },
  {
    id: 'lyricmatch',
    title: 'LyricMatch',
    description: 'An application that matches lyrics with songs and provides information about songs based on lyric queries.',
    technologies: ['React', 'Vite', 'JavaScript', 'Python', 'Flask', 'Google API', 'Waitress'],
    thumbnailUrl:  lyricmatchImg,
    videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    liveUrl: 'https://sparkonix11.github.io/LyricMatch/',
    sourceUrl: 'https://github.com/Sparkonix11/LyricMatch',
  },
  {
    id: 'resumebuilder',
    title: 'ResumeBuilder',
    description: 'A tool that helps users create professional resumes with customizable templates, sections, and styling options.',
    technologies: ['TypeScript', 'React', 'JavaScript', 'PDF Generation'],
    thumbnailUrl: resumebuilderImg,
    videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4', // Placeholder
    sourceUrl: 'https://github.com/Sparkonix11/ResumeBuilder',
  }
];