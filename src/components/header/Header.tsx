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
                    Full-Stack Engineer at Trackingplan
                </div>
                <div className={styles.positionDescription}>
                    {`Full-Stack Engineer with a passion for front-end challenges and a background 
                    in Computer Management Engineering from the University of Alicante. 
                    Enjoys blending technology with outdoor adventures.`}
                </div>

                <NavBar className={styles.navBar} />
            </div>
            <SocialLinks />
        </header>)
}