import SectionHeading from '../components/SectionHeading';
import SkillCard from '../components/SkillCard';
import { skills } from '../data/site';

export default function TechStack() {
  return (
    <section id="skills" className="scroll-mt-24 px-4 py-24 sm:px-6 md:py-32 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          title="Tech Stack"
          copy="A current learning ecosystem across programming, web, mobile, cloud, AI automation, data, and developer tooling. These are presented as active working areas, not expert-level claims."
        />
        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill, index) => (
            <SkillCard key={skill.category} category={skill.category} items={skill.items} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
