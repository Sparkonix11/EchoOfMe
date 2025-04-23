import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';

// Sample skill data - you can replace this with data from a file
const skillCategories = [
  {
    name: 'Programming Languages',
    skills: [
      { name: 'JavaScript', proficiency: 90 },
      { name: 'TypeScript', proficiency: 85 },
      { name: 'Python', proficiency: 80 },
      { name: 'Java', proficiency: 75 },
      { name: 'C++', proficiency: 70 },
    ],
  },
  {
    name: 'Frontend Development',
    skills: [
      { name: 'React', proficiency: 90 },
      { name: 'Next.js', proficiency: 85 },
      { name: 'HTML/CSS', proficiency: 95 },
      { name: 'Tailwind CSS', proficiency: 90 },
      { name: 'Three.js', proficiency: 75 },
    ],
  },
  {
    name: 'Backend Development',
    skills: [
      { name: 'Node.js', proficiency: 85 },
      { name: 'Express', proficiency: 80 },
      { name: 'MongoDB', proficiency: 75 },
      { name: 'PostgreSQL', proficiency: 70 },
      { name: 'GraphQL', proficiency: 65 },
    ],
  },
  {
    name: 'Tools & Technologies',
    skills: [
      { name: 'Git', proficiency: 90 },
      { name: 'Docker', proficiency: 75 },
      { name: 'AWS', proficiency: 70 },
      { name: 'CI/CD', proficiency: 75 },
      { name: 'Figma', proficiency: 80 },
    ],
  },
];

// Skill bar component
function SkillBar({ name, proficiency }: { name: string; proficiency: number }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-gray-800">{name}</span>
        <span className="text-xs font-medium text-gray-600">{proficiency}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <motion.div
          className="h-2.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-600"
          style={{ width: `${proficiency}%` }}
          initial={{ width: 0 }}
          whileInView={{ width: `${proficiency}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  return (
    <section id="skills" ref={sectionRef} className="py-20 bg-gray-50 dark:bg-gray-50 relative overflow-hidden">
      {/* Background design elements - blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100 dark:bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-100 dark:bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-100 dark:bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      
      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center">
        <motion.div
          className="max-w-6xl mx-auto w-full"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              My Skills
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              I&apos;ve developed a diverse set of skills throughout my academic journey and personal projects.
              Here&apos;s an overview of my technical expertise and competencies.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
            {skillCategories.map((category) => (
              <motion.div key={category.name} variants={itemVariants} className="col-span-1">
                <h3 className="text-xl font-bold mb-4 text-gray-900 text-center">
                  {category.name}
                </h3>
                <div className="space-y-4">
                  {category.skills.map((skill) => (
                    <SkillBar key={skill.name} name={skill.name} proficiency={skill.proficiency} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            variants={itemVariants} 
            className="mt-16 bg-white dark:bg-white p-6 md:p-8 rounded-lg shadow-md backdrop-blur-sm bg-opacity-80"
          >
            <h3 className="text-xl font-bold mb-4 text-gray-900 text-center">
              Additional Skills & Interests
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col items-center">
                <h4 className="font-semibold text-gray-800 mb-2 text-center">Soft Skills</h4>
                <ul className="list-disc list-inside text-gray-700 space-y-1 mx-auto">
                  <li>Team Leadership</li>
                  <li>Project Management</li>
                  <li>Problem Solving</li>
                  <li>Communication</li>
                </ul>
              </div>
              <div className="flex flex-col items-center">
                <h4 className="font-semibold text-gray-800 mb-2 text-center">Languages</h4>
                <ul className="list-disc list-inside text-gray-700 space-y-1 mx-auto">
                  <li>Hindi (Native)</li>
                  <li>English (Fluent)</li>
                </ul>
              </div>
              <div className="flex flex-col items-center">
                <h4 className="font-semibold text-gray-800 mb-2 text-center">Areas of Interest</h4>
                <ul className="list-disc list-inside text-gray-700 space-y-1 mx-auto">
                  <li>Artificial Intelligence</li>
                  <li>Web Development</li>
                  <li>UI/UX Design</li>
                  <li>Cloud Computing</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}