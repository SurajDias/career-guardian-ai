import { BookOpen, Code, Cloud, Layers } from "lucide-react";

const recommendations = [
    {
        icon: Cloud,
        title: "Learn AWS Fundamentals",
        desc: "Cloud skills are in high demand — start with AWS Certified Cloud Practitioner",
    },
    {
        icon: Layers,
        title: "Master Docker & Containers",
        desc: "Containerization is essential for modern deployment workflows",
    },
    {
        icon: Code,
        title: "System Design Basics",
        desc: "Learn distributed systems concepts to ace senior-level interviews",
    },
    {
        icon: BookOpen,
        title: "Build Portfolio Projects",
        desc: "Showcase your skills with 2-3 real-world projects on GitHub",
    },
];

function Dashboard() {
    return (
        <ul className="recommendation-list">
            {recommendations.map((rec, i) => {
                const Icon = rec.icon;
                return (
                    <li key={i} className="recommendation-item">
                        <div className="rec-icon">
                            <Icon size={18} />
                        </div>
                        <div className="rec-info">
                            <h4>{rec.title}</h4>
                            <p>{rec.desc}</p>
                        </div>
                    </li>
                );
            })}
        </ul>
    );
}

export default Dashboard;
