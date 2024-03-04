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
            <a href="https://www.linkedin.com/in/jordi-cant%C3%B3-g%C3%A1lvez-455088a6?jobid=1234&lipi=urn%3Ali%3Apage%3Ad_jobs_easyapply_pdfgenresume%3Bcfxi9QnKQ96MQRhwHbMFig%3D%3D&licu=urn%3Ali%3Acontrol%3Ad_jobs_easyapply_pdfgenresume-v02_profile" target="_blank" rel="noreferrer">
                <LinkedinIcon className={styles.icon} />
            </a>
            <a href="https://github.com/JordiLakland" target="_blank" rel="noreferrer">
                <GitHubIcon className={styles.icon} />
            </a>
            <a href="https://www.instagram.com/jordicantogalvez/" target="_blank" rel="noreferrer">
                <InstagramIcon className={styles.icon} />
            </a>
        </div>
    )
}