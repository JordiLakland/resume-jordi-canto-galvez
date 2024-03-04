export interface ExperienceData {
    period: string;
    role: string;
    company: string;
    companyLink?: string;
    roleFunctions: string[];
    labels: string[];
}

export const trackingplanData: ExperienceData = {
    period: "Dec 2021 - Present",
    role: "Frontend Engineer",
    company: "Trackingplan",
    companyLink: "https://trackingplan.com/",
    roleFunctions: [
        "Develop and maintain Trackingplan's web application",
        "Collaborate with the product team to design and implement new features",
        "Participate in code reviews and provide feedback to the team",
        "Contribute to the design system and component library"
    ],
    labels: ["React", "TypeScript", "Cypress", "Python", "AWS", "Clickhouse", "SQL", "GitHub", "Notion"]
};

export const prensalinkData: ExperienceData = {
    period: "Apr 2019 - Dec 2021",
    role: "Fullstack Developer",
    company: "PrensaLink",
    companyLink: "https://prensalink.com/",
    roleFunctions: [
        "Develop and maintain PrensaLink's web application",
        "Collaborate with the product team to design and implement new features",
        "Participate in code reviews and provide feedback to the team",
        "Contribute to the design system and component library"
    ],
    labels: ["React", "Node.js", "TypeScript", "Laravel", "PHP", "Docker", "AWS", "Google Cloud", "Jira", "Bitbucket"]
};

export const gttData: ExperienceData = {
    period: "Jul 2015 - Apr 2019",
    role: "Software and Database Developer",
    company: "GTT",
    companyLink: "https://www.gtt.es/",
    roleFunctions: [
        "Develop and maintain GTT's web application",
        "Collaborate with the product team to design and implement new features",
        "Participate in code reviews and provide feedback to the team"
    ],
    labels: ["C#", "ASP.NET", "PL/SQL", "Oracle"]
};