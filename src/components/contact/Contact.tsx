import styles from './Contact.module.css'


interface ContactProps {
    // Empty
}

export default function Contact(props: ContactProps) {

    const { } = props;

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Get in touch</h2>
            <div className={styles.content}>
                <p className={styles.message}>
                    {
                        `I'm always open to discussing new projects, creative ideas, or opportunities to 
                        be part of your visions. Whether you have a question, a proposal, or just want to 
                        say hi, don't hesitate to drop me a message. I'll get back to you as soon as 
                        possible!`
                    }
                </p>
                <a href="mailto:jordicantogalvez@gmail.com" className={styles.contactLink}>
                    <div className={styles.contactButton}>
                        Say Hello
                    </div>
                </a>
            </div>
        </div>);
}