import ProfilePhoto from '../../assets/profile-photo.png';

import styles from './About.module.css';


export default function About() {
    return (
        <div className={styles.container}>
            <img src={ProfilePhoto} alt="Jordi Cantó Profile Photo" className={styles.profilePhoto} />
            <p>
                {`My interest in technology started in the 1990s when my family got an IBM PC. 
                This early experience made me curious about tech, and over the years, that curiosity kept growing. 
                Following this interest, I studied `}
                <span className={styles.highlight}>Technical Engineering in Computer Management at the University of Alicante</span>
                {`, which gave me a strong base for my career. I started my professional career in 2015, but it was in 2019 when 
                I discovered the exciting world of startups. Since then, I have enjoyed working on different projects, 
                from the first idea to fast development. I am very motivated to keep growing as a developer, 
                especially in the fast-moving field of AI.`}
            </p>
            <p>
                {`As a `}<span className={styles.highlight}>Full-Stack developer</span>{`, I understand the whole process of building software, 
                but I especially enjoy working on the front-end using React and TypeScript. These tools have helped me make strong contributions to 
                different projects, and I find it very rewarding to solve technical problems.`}
            </p>
            <p>
                {`For the last three years, I’ve been living in `} <span className={styles.highlight}>Trondheim, Norway</span>{`. Here, 
                I’ve grown to love nature more than ever. I enjoy bouldering, hiking, and skiing, which are great ways to stay active and 
                take a break from screens. These activities help me keep a healthy balance in life.`}
            </p>
            <p>
                {`My experience in the startup ecosystem, my full-stack development skills, and my adventurous spirit 
                prepare me well for the continuous changes in the tech world. This combination has improved my `}
                <span className={styles.highlight}>problem-solving abilities and adaptability</span>
                {`, and I feel ready to be part of new technology projects and ideas.`}
            </p>
        </div>
    )
}