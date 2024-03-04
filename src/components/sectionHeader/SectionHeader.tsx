import { cssClass } from '../../utils/style';
import styles from './SectionHeader.module.css';


interface SectionHeaderProps {
    className?: string;
    title: string;
}

export default function SectionHeader(props: SectionHeaderProps) {

    const { className, title } = props;

    return (
        <div className={cssClass(styles.sectionHeaderContainer, className)}>
            <h2>{title.toUpperCase()}</h2>
        </div>
    )
}

