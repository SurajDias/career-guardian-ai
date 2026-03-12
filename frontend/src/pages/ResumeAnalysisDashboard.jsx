import { useNavigate } from "react-router-dom";
import { ArrowLeft, BarChart3, Target, ShieldAlert, Compass } from "lucide-react";
import SkillGapChart from "../components/SkillGapChart";
import "../home-stripe.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const detectedSkills = ["Python", "Machine Learning", "SQL", "React", "Data Analysis"];
const missingSkills = ["Docker", "AWS", "System Design"];

function ResumeAnalysisDashboard() {

    const navigate = useNavigate();
    const score = 82;
    const circumference = 2 * Math.PI * 60;
    const offset = circumference - (score / 100) * circumference;

    return (
        <div className="stripe-landing-page">
            <Navbar />
            
            <div className="page results-page" style={{ paddingTop: '80px' }}>
                <div className="stripe-container">
                    {/* HEADER */}
                    <div className="results-header" style={{ marginBottom: '20px' }}>
                        <h1 style={{ color: 'var(--s-text-head)'}}>Resume Analysis Dashboard</h1>
                        <button className="stripe-btn-secondary" onClick={() => navigate("/")}>
                            <ArrowLeft size={16} /> Back to Home
                        </button>
                    </div>

            <div className="results-content">

                {/* SCORE HERO */}
                <div className="score-hero">
                    <svg width="0" height="0" style={{ position: "absolute" }}>
                        <defs>
                            <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#5417cf" />
                                <stop offset="100%" stopColor="#00d4aa" />
                            </linearGradient>
                        </defs>
                    </svg>
                    <div className="score-ring">
                        <svg viewBox="0 0 130 130">
                            <circle className="ring-bg" cx="65" cy="65" r="60" />
                            <circle
                                className="ring-fill"
                                cx="65" cy="65" r="60"
                                style={{ strokeDashoffset: offset }}
                            />
                        </svg>
                        <div className="score-value">
                            {score}<span>/100</span>
                        </div>
                    </div>
                    <h2>Your Resume Score</h2>
                    <p>Your resume is strong but has room for improvement in cloud and devops skills</p>
                </div>

                {/* DASHBOARD GRID */}
                <div className="dashboard-grid">

                    {/* Skill Gap Chart */}
                    <div className="dashboard-card full-width animate-fade-in-up delay-1">
                        <div className="dashboard-card-header">
                            <div className="card-icon purple">
                                <BarChart3 size={20} />
                            </div>
                            <h3>Skill Gap Analysis</h3>
                        </div>
                        <SkillGapChart />
                    </div>

                    {/* Detected Skills */}
                    <div className="dashboard-card animate-fade-in-up delay-2">
                        <div className="dashboard-card-header">
                            <div className="card-icon teal">
                                <Target size={20} />
                            </div>
                            <h3>Detected Skills</h3>
                        </div>
                        <div className="skill-tags">
                            {detectedSkills.map((s) => (
                                <span key={s} className="skill-tag found">{s}</span>
                            ))}
                        </div>
                    </div>

                    {/* Missing Skills */}
                    <div className="dashboard-card animate-fade-in-up delay-3">
                        <div className="dashboard-card-header">
                            <div className="card-icon red">
                                <Target size={20} />
                            </div>
                            <h3>Missing Skills</h3>
                        </div>
                        <div className="skill-tags">
                            {missingSkills.map((s) => (
                                <span key={s} className="skill-tag missing">{s}</span>
                            ))}
                        </div>
                    </div>

                </div>

                {/* NAVIGATION CARDS */}
                <div className="nav-cards">
                    <div
                        className="nav-card animate-fade-in-up delay-4"
                        onClick={() => navigate("/phishing-detection")}
                    >
                        <div className="nav-card-icon amber">
                            <ShieldAlert size={24} />
                        </div>
                        <div className="nav-card-info">
                            <h3>Phishing Detection</h3>
                            <p>Scan job posts and emails for scam indicators</p>
                        </div>
                        <ArrowLeft size={18} className="nav-card-arrow" />
                    </div>

                    <div
                        className="nav-card animate-fade-in-up delay-5"
                        onClick={() => navigate("/career-roadmap")}
                    >
                        <div className="nav-card-icon teal">
                            <Compass size={24} />
                        </div>
                        <div className="nav-card-info">
                            <h3>Career Roadmap</h3>
                            <p>Get personalized learning paths and recommendations</p>
                        </div>
                        <ArrowLeft size={18} className="nav-card-arrow" />
                    </div>
                </div>

                    </div>
                </div>
            </div>
            
            <Footer />
        </div>
    );
}

export default ResumeAnalysisDashboard;
