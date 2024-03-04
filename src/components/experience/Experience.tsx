import {
    ExperienceData,
    gttData,
    prensalinkData,
    trackingplanData
} from '../../data/experience';
import CaretRightIcon from '../icons/CaretRight';

import styles from './Experience.module.css';


interface ExperienceProps {
    // Empty
}

export default function Experience(props: ExperienceProps) {

    const { } = props;

    return (
        <div className={styles.container}>
            <SectionCard experienceData={trackingplanData} />
            <SectionCard experienceData={prensalinkData} />
            <SectionCard experienceData={gttData} />
        </div>
    )
}


interface SectionCardProps {
    experienceData: ExperienceData;
}

function SectionCard(props: SectionCardProps) {

    const { period, role, company, companyLink, roleFunctions, labels } = props.experienceData;

    const title = `${role} - ${company}`;

    return (
        <a href={companyLink} className={styles.companyLink} target="_blank" rel="noreferrer">
            <div className={styles.sectionCardContainer}>
                <header className={styles.sectionCardHeader} >
                    {period}
                </header>
                <div className={styles.sectionCardContent}>
                    <div className={styles.title}>
                        <span>{title}</span>
                    </div>
                    <ul>
                        {roleFunctions.map((roleFunction, index) =>
                            <li key={index} className={styles.roleFunction}>
                                <CaretRightIcon className={styles.caretRightIcon} fill="#000" />
                                {roleFunction}
                            </li>
                        )}
                    </ul>
                    <div className={styles.labelsContainer}>
                        {labels.map((label, index) =>
                            <span key={index} className={styles.label}>{label}</span>
                        )}
                    </div>
                    <div className={styles.explore}>

                    </div>
                </div>
            </div>
        </a>
    )
}