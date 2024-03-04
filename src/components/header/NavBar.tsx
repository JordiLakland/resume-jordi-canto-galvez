import { useState, useEffect } from 'react';
import { cssClass } from '../../utils/style';

import styles from './NavBar.module.css';

const SECTIONS = ['about', 'experience', 'skills', 'contact'];

interface NavBarProps {
    className?: string;
}

export default function NavBar(props: NavBarProps) {

    const { className } = props;

    const [activeSection, setActiveSection] = useState('about');

    useEffect(() => {
        const handleScroll = () => {
            let currentSection = '';
            const nearBottom = window.innerHeight + window.scrollY >= document.documentElement.offsetHeight - 200;

            if (nearBottom) {
                currentSection = SECTIONS[SECTIONS.length - 1];
            } else {
                SECTIONS.forEach((section) => {
                    const item = document.getElementById(`${section}`);
                    if (item && item.getBoundingClientRect().top <= 200) {
                        currentSection = section;
                    }
                });
            }
            setActiveSection(currentSection);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (sectionId: string) => {
        const section = document.getElementById(`${sectionId}`);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
            setActiveSection(sectionId);
        }
    };

    return (
        <nav id="menu" className={cssClass(styles.navContainer, className)}>
            <ul>
                {SECTIONS.map((section) => (
                    <li
                        key={section}
                        data-link={`${section}`}
                    >
                        <a
                            href={`#${section}`}
                            onClick={(e) => {
                                e.preventDefault();
                                scrollToSection(section);
                                window.history.pushState({}, '', `#${section}`);
                            }}
                        >
                            <div className={cssClass(
                                styles.menuItem,
                                activeSection === section && styles.active
                            )}>
                                <span className={styles.navIndicator}></span>
                                <span className={styles.navLabel}>{section.toUpperCase()}</span>
                            </div>
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};
