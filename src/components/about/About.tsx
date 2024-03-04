import ProfilePhoto from '../../assets/profile-photo.png';

import styles from './About.module.css';


interface AboutProps {
    // Empty
}

export default function About(props: AboutProps) {
    return (
        <div className={styles.container}>
            <img src={ProfilePhoto} alt="Jordi Cantó Profile Photo" className={styles.profilePhoto} />
            <p>
                {`Based in Trondheim for the past two years, my journey into the tech world began in 
                the 90s when my father brought home an IBM PC. This early exposure ignited a curiosity 
                in technology that has grown ever since. Fast forward to 2015, I embarked on my 
                professional career, but it wasn’t until 2019 that I took a leap into the dynamic 
                world of startups. I've thrived on the challenge of growing with various projects 
                from their inception to rapid maturity, including a stint with a startup accelerated 
                by YCombinator in the W22 batch.`}
            </p>
            <p>
                {`While comfortable working on end-to-end (E2E) development as a full-stack engineer,
                 I find a special joy in focusing on front-end challenges. This blend of skills 
                 has afforded me the opportunity to contribute to diverse projects, including a 
                 particularly inspiring one that was propelled by YCombinator. 
                 The combination of its technological intricacies and the momentum from 
                 YCombinator has provided a rich and rewarding journey.`}
            </p>
            <p>
                {`Living in Norway has significantly enhanced my appreciation for the great outdoors, 
                especially bouldering, hiking, and skiing, which have become my favorite activities. 
                Engaging in these pursuits not only presents me with physical challenges but also 
                serves as a revitalizing break from my professional endeavors, offering a perfect 
                balance to my life.`}
            </p>
            <p>
                {`Looking ahead, I am eager to continue growing as a developer, with a keen interest in
                exploring the fascinating realm of AI. The blend of my startup experience, 
                front-end specialization, and adventurous spirit positions me uniquely to contribute 
                to and thrive in technology-driven environments.`}
            </p>
        </div >
    )
}