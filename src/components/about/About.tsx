import ProfilePhoto from '../../assets/profile-photo.png';

import styles from './About.module.css';


interface AboutProps {
    // Empty
}

export default function About(props: AboutProps) {
    const { } = props;

    return (
        <div className={styles.container}>
            <img src={ProfilePhoto} alt="Jordi Cantó Profile Photo" className={styles.profilePhoto} />
            <p>
                {`My journey into the tech world began in the '90s with the acquisition of an 
                IBM PC for our home. This early exposure to technology sparked a curiosity that 
                has grown over the years. Following this interest, I graduated in `}
                <span className={styles.highlight}>Technical Engineering in Computer Management from
                    the University of Alicante</span>{`, establishing a 
                solid foundation in my tech career. I started my professional career in 2015, but 
                it was in 2019 that I discovered the dynamic ecosystem of startups. Since then, 
                I have thoroughly enjoyed the challenge of developing various projects from 
                conception to rapid growth. My enthusiasm for continuing to evolve as a developer 
                is stronger than ever, with a keen interest in the expanding field of AI.`}
            </p>
            <p>
                {`As a `}<span className={styles.highlight}>full-stack engineer</span>{`, 
                I possess a comprehensive command of development from start to finish, but I find 
                special joy in tackling front-end challenges. This combination of skills has enabled 
                me to contribute significantly to projects, whose technological complexity has 
                resulted in an extraordinarily rewarding experience.`}
            </p>
            <p>
                {`For the past two years, I have lived in `}<span className={styles.highlight}>Trondheim, Norway</span>
                {`, where my appreciation for nature has deepened. Activities such as bouldering, hiking, and 
                skiing have become cherished pastimes. These adventures not only challenge me physically but
                  also provide a revitalizing break from the digital world, ensuring a vital balance.`}
            </p>
            <p>
                {`My blend of startup experience, full-stack development skills, and adventurous 
                spirit, positions me well for the tech world's dynamic challenges. This combination 
                has honed my `}<span className={styles.highlight}>problem-solving abilities and adaptability</span>
                {`, making me ready to contribute effectively to evolving technological landscapes and innovations.`}
            </p>
        </div >
    )
}