import { Analytics } from '@vercel/analytics/react';
import Navbar from './components/Navbar';
import PageCurtain from './components/PageCurtain';
import About from './sections/About';
import Certifications from './sections/Certifications';
import Contact from './sections/Contact';
import Education from './sections/Education';
import Experience from './sections/Experience';
import Footer from './sections/Footer';
import GithubActivity from './sections/GithubActivity';
import Hero from './sections/Hero';
import Outcomes from './sections/Outcomes';
import Process from './sections/Process';
import Projects from './sections/Projects';
import Services from './sections/Services';
import TechStack from './sections/TechStack';
import Testimonials from './sections/Testimonials';
import WorkMarquee from './sections/WorkMarquee';

export default function App() {
  return (
    <div className="min-h-screen overflow-x-clip bg-[#0c0c0c] text-[#d7e2ea] antialiased">
      <PageCurtain />
      <Navbar />
      <main>
        <Hero />
        <WorkMarquee />
        <About />
        <Projects />
        <GithubActivity />
        <TechStack />
        <Process />
        <Outcomes />
        <Services />
        <Certifications />
        <Experience />
        <Education />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <Analytics />
    </div>
  );
}
