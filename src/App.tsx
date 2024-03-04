import About from './components/about/About';
import BackgroundEffect from './components/backgroundEffect/backgroundEffect';
import Contact from './components/contact/Contact';
import Experience from './components/experience/Experience';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Languages from './components/skill/Languages';
import SectionHeader from './components/sectionHeader/SectionHeader';
import SkillIconsView from './components/skill/Skills';
import { framesWorksAndLibraries, programmingLanguages, toolsAndPlatforms } from './data/skills';

import './assets/fonts/fonts.css';
import styles from './App.module.css';

function App() {
  return (
    <BackgroundEffect>
      <div className={styles.container}>
        <Header className={styles.headerContent} />
        <main className={styles.mainContent}>
          <section id="about" className={styles.section}>
            <SectionHeader className={styles.sectionHeader} title="about" />
            <About />
          </section>
          <section id="experience">
            <SectionHeader className={styles.sectionHeader} title="experience" />
            <Experience />
          </section>
          <section id="skills">
            <SectionHeader className={styles.sectionHeader} title="skills" />
            <SkillIconsView
              iconClassName={styles.skillIcon}
              title="Programming Languages"
              skillsIconData={programmingLanguages}
            />
            <SkillIconsView
              iconClassName={styles.skillIcon}
              title="Libraries & Frameworks"
              skillsIconData={framesWorksAndLibraries}
            />
            <SkillIconsView
              iconClassName={styles.skillIcon}
              title="Tools & Platforms"
              skillsIconData={toolsAndPlatforms}
            />
            <Languages />
          </section>
          <section id="contact">
            <Contact />
          </section>
          <Footer />
        </main>
      </div>
    </BackgroundEffect>
  )
}

export default App
