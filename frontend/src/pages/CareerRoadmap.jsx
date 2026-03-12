import { useNavigate } from "react-router-dom";
import { ArrowLeft, Compass, BookOpen, Award, FolderGit2, TrendingUp, Code, Cloud, Layers, GraduationCap } from "lucide-react";
import Dashboard from "../components/Dashboard";
import "../home-stripe.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const certifications = [
    {
        icon: Cloud,
        title: "AWS Certified Cloud Practitioner",
        provider: "Amazon Web Services",
        difficulty: "Beginner",
    },
    {
        icon: Layers,
        title: "Docker Certified Associate",
        provider: "Docker Inc.",
        difficulty: "Intermediate",
    },
    {
        icon: Code,
        title: "System Design Interview Prep",
        provider: "Educative.io",
        difficulty: "Advanced",
    },
    {
        icon: GraduationCap,
        title: "Google Data Analytics Certificate",
        provider: "Google via Coursera",
        difficulty: "Beginner",
    },
];

const roadmapSteps = [
    {
        phase: "Month 1-2",
        title: "Foundation Building",
        description: "Fill critical skill gaps in Docker and cloud fundamentals. Complete AWS Cloud Practitioner certification.",
    },
    {
        phase: "Month 3-4",
        title: "Practical Application",
        description: "Build 2-3 portfolio projects demonstrating cloud deployment and containerization skills.",
    },
    {
        phase: "Month 5-6",
        title: "Advanced Skills",
        description: "Study system design patterns and distributed systems. Practice with mock interviews.",
    },
    {
        phase: "Month 7+",
        title: "Career Advancement",
        description: "Target senior roles with updated resume. Leverage new skills for higher-impact positions.",
    },
];

const skillProgress = [
    { skill: "Python", current: 90, target: 95 },
    { skill: "Machine Learning", current: 85, target: 90 },
    { skill: "SQL", current: 80, target: 85 },
    { skill: "React", current: 70, target: 85 },
    { skill: "Docker", current: 20, target: 75 },
    { skill: "AWS", current: 15, target: 70 },
    { skill: "System Design", current: 10, target: 70 },
];

function CareerRoadmap() {

    const navigate = useNavigate();

    return (
        <div className="stripe-landing-page">
            <Navbar />
            
            <div className="page results-page" style={{ paddingTop: '80px' }}>
                <div className="stripe-container">
                    {/* HEADER */}
                    <div className="results-header" style={{ marginBottom: '20px' }}>
                        <h1 style={{ color: 'var(--s-text-head)'}}>Career Roadmap</h1>
                        <button className="stripe-btn-secondary" onClick={() => navigate("/resume-analysis")}>
                            <ArrowLeft size={16} /> Back to Dashboard
                        </button>
                    </div>

            <div className="results-content">

                <div className="dashboard-grid">

                    {/* Career Recommendations — reuses Dashboard component */}
                    <div className="dashboard-card full-width animate-fade-in-up delay-1">
                        <div className="dashboard-card-header">
                            <div className="card-icon teal">
                                <TrendingUp size={20} />
                            </div>
                            <h3>Career Recommendations</h3>
                        </div>
                        <Dashboard />
                    </div>

                    {/* Learning Roadmap Timeline */}
                    <div className="dashboard-card full-width animate-fade-in-up delay-2">
                        <div className="dashboard-card-header">
                            <div className="card-icon purple">
                                <Compass size={20} />
                            </div>
                            <h3>Learning Roadmap</h3>
                        </div>
                        <div className="roadmap-timeline">
                            {roadmapSteps.map((step, i) => (
                                <div key={i} className="roadmap-step">
                                    <div className="roadmap-marker">
                                        <div className="roadmap-dot" />
                                        {i < roadmapSteps.length - 1 && <div className="roadmap-line" />}
                                    </div>
                                    <div className="roadmap-content">
                                        <span className="roadmap-phase">{step.phase}</span>
                                        <h4>{step.title}</h4>
                                        <p>{step.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Skill Development Progress */}
                    <div className="dashboard-card animate-fade-in-up delay-3">
                        <div className="dashboard-card-header">
                            <div className="card-icon purple">
                                <BookOpen size={20} />
                            </div>
                            <h3>Skill Development Plan</h3>
                        </div>
                        <div className="skill-progress-list">
                            {skillProgress.map((s, i) => (
                                <div key={i} className="skill-progress-item">
                                    <div className="skill-progress-header">
                                        <span className="skill-progress-name">{s.skill}</span>
                                        <span className="skill-progress-values">
                                            {s.current}% / {s.target}%
                                        </span>
                                    </div>
                                    <div className="skill-progress-bar">
                                        <div
                                            className="skill-progress-current"
                                            style={{ width: `${s.current}%` }}
                                        />
                                        <div
                                            className="skill-progress-target"
                                            style={{ width: `${s.target}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Suggested Certifications */}
                    <div className="dashboard-card animate-fade-in-up delay-4">
                        <div className="dashboard-card-header">
                            <div className="card-icon amber">
                                <Award size={20} />
                            </div>
                            <h3>Suggested Certifications</h3>
                        </div>
                        <div className="cert-list">
                            {certifications.map((cert, i) => {
                                const Icon = cert.icon;
                                return (
                                    <div key={i} className="cert-item">
                                        <div className="cert-icon">
                                            <Icon size={18} />
                                        </div>
                                        <div className="cert-info">
                                            <h4>{cert.title}</h4>
                                            <p>{cert.provider}</p>
                                        </div>
                                        <span className={`cert-difficulty ${cert.difficulty.toLowerCase()}`}>
                                            {cert.difficulty}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                </div>
                </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default CareerRoadmap;
