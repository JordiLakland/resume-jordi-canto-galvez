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
                {`Based in Trondheim for the past two years, my journey into the tech world began 
                in the '90s with the purchase of an IBM PC for our home. This early exposure to 
                technology ignited a lifelong curiosity that has only grown over the years. 
                Pursuing this interest, I studied Technical Engineering in Computer Management at 
                the University of Alicante, laying a solid foundation for my career in technology. 
                I embarked on my professional career in 2015, finding my true calling in the vibrant 
                startup ecosystem in 2019. I've thrived on the challenge of growing various projects 
                from their inception to rapid maturity.`}
            </p>
            <p>
                {`Adept at end-to-end development as a full-stack engineer, I find special joy in 
                tackling front-end challenges. This blend of skills has allowed me to contribute 
                meaningfully to a wide array of projects, with the technological complexities 
                therein offering an exceptionally rewarding journey.`}
            </p>
            <p>
                {`Living in Norway has deepened my appreciation for the great outdoors, with 
                bouldering, hiking, and skiing becoming cherished activities. These pursuits not 
                only challenge me physically but also offer a revitalizing break from the digital 
                world, ensuring a well-rounded life.`}
            </p>
            <p>
                {`Looking forward, my eagerness to continue evolving as a developer is stronger 
                than ever, particularly towards the burgeoning field of AI. My blend of startup 
                experience, proficiency in front-end development, and adventurous spirit uniquely 
                positions me to thrive in and contribute to the ever-changing landscape of 
                technology.`}
            </p>
        </div >
    )
}