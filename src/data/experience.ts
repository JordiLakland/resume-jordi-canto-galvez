export interface ExperienceData {
    period: string;
    role: string;
    company: string;
    companyLink?: string;
    roleFunctions: string[];
    labels: string[];
}

export const trackingplanData: ExperienceData = {
    period: "Dec 2021 - Apr 2025",
    role: "Full-Stack Developer",
    company: "Trackingplan (Y Combinator W22)",
    companyLink: "https://trackingplan.com/",
    roleFunctions: [
        "Front-End Development - Implementation of user interfaces using React and TypeScript within the Trackingplan development team. Providing interactive and high-performance solutions that enhance user experience.",
        "End-to-End Project Management - Leadership in the full-scale development of projects, from conceptualization based on specifications and design to final implementation, utilizing Python for Back-End development.",
        "Code Review - Active participation in code reviews, committed to maintaining high quality standards and promoting best practices within the development team.",
        "Deploy Management - Responsibility for managing automatic deploys using AWS CodePipeline, ensuring continuous and stable deliveries in both development and production environments.",
        "Interdisciplinary Collaboration - Close collaboration with development and UX/UI design teams, ensuring that technical functionalities align with user experience objectives.",
        "Incident Management - Responsibility for reporting, tracking, and resolving errors, adopting a proactive approach to maintain system stability and reliability. Collaboration with various departments to facilitate quick resolution of incidents, thus contributing to product quality and user satisfaction."
    ],
    labels: ["React", "TypeScript", "Cypress", "Python", "AWS", "Clickhouse", "SQL", "GitHub", "Notion"]
};

export const prensalinkData: ExperienceData = {
    period: "Apr 2019 - Dec 2021",
    role: "Full-Stack Developer",
    company: "PrensaLink",
    companyLink: "https://prensalink.com/",
    roleFunctions: [
        "Software Development and Product Management Collaboration - Participation in software development alongside Product Management, involving activities such as planning, coding, and design reviews. This collaboration ensures that development efforts are aligned with product goals and user needs.",
        "E-commerce Platform Development, Deployment, and Maintenance - Participation in the development, deployment, and maintenance of an e-commerce platform for link building utilizing technologies like React, Laravel, Docker, Bitbucket as the code repository, and JIRA for task management.",
        "Cloud Infrastructure Maintenance - Involvement in maintaining a cloud-based infrastructure for deploying all company products, using technologies such as Amazon EC2 for web servers, S3 for nightly backups."
    ],
    labels: ["React", "Node.js", "TypeScript", "Laravel", "PHP", "Docker", "AWS", "Google Cloud", "Jira", "Bitbucket"]
};

export const gttData: ExperienceData = {
    period: "Jul 2015 - Apr 2019",
    role: "PL/SQL Programmer",
    company: "GTT",
    companyLink: "https://www.gtt.es/",
    roleFunctions: [
        "Application Development and Maintenance - Engaged in the development and ongoing maintenance of the Tax Application, primarily using PL/SQL. This role underscores a deep understanding of database management and programming techniques to ensure the application’s reliability and performance.",
        "Module Collaboration - Actively collaborated across different modules within the organization, facilitating integration and cohesive functionality within the Tax Information System. This collaboration ensured that the system met comprehensive needs and functional requirements effectively.",
        "Rapid Learning and Adaptation - Demonstrated rapid learning and adaptation in a complex tax information system environment, starting from scratch and quickly becoming proficient in PL/SQL and related technologies. Contributed effectively to the team by applying newly acquired skills to solve problems and enhance system functionality."
    ],
    labels: ["C#", "ASP.NET", "PL/SQL", "Oracle"]
};