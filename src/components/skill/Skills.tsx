import { SkillIconData } from '../../data/skills';
import { cssClass } from '../../utils/style';
import SvgIconComponent from '../icons/SvgIconComponent';

import styles from './Skills.module.css';

interface SkillsProps {
    iconClassName?: string;
    title: string;
    skillsIconData: SkillIconData[];
}

export default function SkillIconsView(props: SkillsProps) {
    const { iconClassName, title, skillsIconData } = props;

    return (
        <div className={styles.skillsContainer}>
            <header className={styles.headerContent}>
                {title}
            </header>
            <div className={styles.skillsContent}>
                {skillsIconData.map((skillIcon, index) =>
                    <div key={index} className={styles.skillIconContainer}>
                        <SvgIconComponent
                            className={cssClass(styles.svgIcon, iconClassName)}
                            path={skillIcon.path}
                            viewBox={skillIcon.viewBox}
                        />
                        <span className={styles.skillLabel}>{skillIcon.skill}</span>
                    </div>
                )}
            </div>
        </div>
    );
}