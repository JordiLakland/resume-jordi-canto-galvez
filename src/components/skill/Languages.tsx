import CaretRightIcon from '../icons/CaretRight';
import styles from './Languages.module.css'

interface LanguagesProps {
    // Empty
}

export default function Languages(props: LanguagesProps) {

    const { } = props;

    return (
        <div className={styles.languagesContainer}>
            <header className={styles.languagesHeader} >
                Languages
            </header>
            <div className={styles.languagesContent}>
                <div className={styles.languageContent}>
                    <CaretRightIcon className={styles.caretRightIcon} fill="#000" />
                    <span className={styles.languageLabel}>Spanish: </span>
                    <span className={styles.languageDescription}>Native Proficiency</span>
                </div>
                <div className={styles.languageContent}>
                    <CaretRightIcon className={styles.caretRightIcon} fill="#000" />
                    <span className={styles.languageLabel}>Catalan: </span>
                    <span className={styles.languageDescription}>Native Proficiency</span>
                </div>
                <div className={styles.languageContent}>
                    <CaretRightIcon className={styles.caretRightIcon} fill="#000" />
                    <span className={styles.languageLabel}>English: </span>
                    <span className={styles.languageDescription}>Professional Working Proficiency</span>
                </div>
            </div>
        </div >
    );
}