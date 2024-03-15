import GitHubIcon from '../icons/GitHub';
import InstagramIcon from '../icons/Instagram';
import LinkedinIcon from '../icons/Linkedin';

import styles from './SocialLinks.module.css';


interface SocialLinksProps {
    // Empty
}

export default function SocialLinks(props: SocialLinksProps) {
    const { } = props;

    return (
        <div className={styles.socialLinks}>
            <a
                href="www.linkedin.com/in/jordi-cantó-gálvez-455088a6"
                target="_blank"
                rel="noreferrer"
            >
                <LinkedinIcon className={styles.icon} />
            </a>
            <a href="https://github.com/JordiLakland" target="_blank" rel="noreferrer">
                <GitHubIcon className={styles.icon} />
            </a>
            <a href="https://www.instagram.com/jordicantogalvez/" target="_blank" rel="noreferrer">
                <InstagramIcon className={styles.icon} />
            </a>
            <a
                href="https://www.jordicantogalvez.dev/resume.pdf"
                target="_blank"
                rel="noreferrer"
            >
                <span className={styles.resumeLabel}>Resume</span>
            </a>
        </div>
    )
}