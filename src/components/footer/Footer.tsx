import styles from './Footer.module.css'

interface FooterProps {
    // Empty
}

export default function Footer(props: FooterProps) {

    const { } = props;

    return (
        <footer className={styles.footer}>
            <p className={styles.copy}>
                {`© ${new Date().getFullYear()} Build by Jordi Cantó Gálvez.`}
            </p>
        </footer>);
}