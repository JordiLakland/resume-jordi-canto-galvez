import { cssClass } from '../../utils/style';
import NavBar from './NavBar';

import SocialLinks from './SocialLinks';

import styles from './Header.module.css'

interface HeaderProps {
    className?: string;
}

export default function Header(props: HeaderProps) {

    const { className } = props;
    return (
        <header className={cssClass(styles.headerContainer, className)}>
            <div>
                <div className={styles.hello}>
                    Hi, my name is
                </div>
                <h1>Jordi Cantó Gálvez.</h1>
                <div className={styles.position}>
                    Full-Stack Developer
                </div>
                <div className={styles.positionDescription}>
                    {`Exploring the startup ecosystem with a continuous drive to learn, innovate, 
                    and make meaningful contributions to projects.`}
                </div>

                <NavBar className={styles.navBar} />
            </div>
            <SocialLinks />
        </header>)
}