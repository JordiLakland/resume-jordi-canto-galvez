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
                    Full Stack Enginier at Trackingplan
                </div>
                <div className={styles.positionDescription}>
                    {`I architect and implement seamless, full-stack solutions that power engaging and 
                accessible digital experiences, bridging the gap between complex back-end logic 
                and intuitive front-end designs.`}
                </div>

                <NavBar className={styles.navBar} />
            </div>
            <SocialLinks />
        </header>)
}