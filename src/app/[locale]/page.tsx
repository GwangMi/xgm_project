import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { ProfileIntro } from "@/components/profile-intro";
import { About } from "@/components/about";
import { Experience } from "@/components/experience";
import { Projects } from "@/components/projects";
import { Skills } from "@/components/skills";
import { Education } from "@/components/education";
import { Publications } from "@/components/publications";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="relative z-10 flex flex-1 flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <ProfileIntro />
        <About />
        <Skills />
        <Education />
        <Experience />
        <Projects />
        <Publications />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
