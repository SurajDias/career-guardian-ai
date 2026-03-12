import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, BarChart3, Target, ShieldAlert, Compass } from "lucide-react";
import SkillGapChart from "../components/SkillGapChart";
import "../home-stripe.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import InterviewSimulator from "./InterviewSimulator";

function ResumeAnalysisDashboard() {

    const navigate = useNavigate();

    // ✅ Read real API data passed from ProcessingPage via navigate()
    const location = useLocation();
    const data = location.state?.data;

    // ✅ Use real values from API — fall back to safe defaults if missing
    const score          = data?.match_score      ?? 0;
    const detectedSkills = data?.detected_skills  ?? [];
    const missingSkills  = data?.missing_skills   ?? [];
    const suggestions    = data?.suggestions      ?? [];

    const circumference = 2 * Math.PI * 60;
    const offset = circumference - (score / 100) * circumference;

    // Guard: if user navigates here directly without uploading
    if (!data) {
        return (
            <div className="stripe-landing-page">
                <Navbar />
                <div className="page results-page" style={{ paddingTop: '80px', textAlign: 'center' }}>
                    <h2>No resume data found.</h2>
                    <p>Please upload a resume first.</p>
                    <button className="stripe-btn-secondary" onClick={() => navigate("/upload")}>
                        <ArrowLeft size={16} /> Upload a Resume
                    </button>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="stripe-landing-page">
            <Navbar />

            <div className="page results-page" style={{ paddingTop: '80px' }}>
                <div className="stripe-container">

                    {/* HEADER */}
                    <div className="results-header" style={{ marginBottom: '20px' }}>
                        <h1 style={{ color: 'var(--s-text-head)' }}>Resume Analysis Dashboard</h1>
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
                            {/* ✅ Dynamic message based on real score */}
                            <p>
                                {score >= 70
                                    ? "Your resume is strong! Focus on the missing skills below to improve further."
                                    : score >= 40
                                    ? "Your resume has a good foundation. Add the missing skills to boost your score."
                                    : "Your resume needs more technical keywords. See the suggestions below."}
                            </p>
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
                                {/* ✅ Pass real data to SkillGapChart */}
                                <SkillGapChart
                                    detectedSkills={detectedSkills}
                                    missingSkills={missingSkills}
                                />
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
                                    {detectedSkills.length > 0
                                        ? detectedSkills.map((s) => (
                                            <span key={s} className="skill-tag found">{s}</span>
                                          ))
                                        : <p style={{ color: 'var(--s-text-muted)' }}>No matching skills detected.</p>
                                    }
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
                                    {missingSkills.length > 0
                                        ? missingSkills.map((s) => (
                                            <span key={s} className="skill-tag missing">{s}</span>
                                          ))
                                        : <p style={{ color: 'var(--s-text-muted)' }}>No missing skills — great job!</p>
                                    }
                                </div>
                            </div>

                            {/* Suggestions */}
                            {suggestions.length > 0 && (
                                <div className="dashboard-card full-width animate-fade-in-up delay-4">
                                    <div className="dashboard-card-header">
                                        <div className="card-icon purple">
                                            <Compass size={20} />
                                        </div>
                                        <h3>Recommendations</h3>
                                    </div>
                                    <ul style={{ paddingLeft: '20px', color: 'var(--s-text-body)' }}>
                                        {suggestions.map((s, i) => (
                                            <li key={i} style={{ marginBottom: '8px' }}>{s}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                        </div>

                        {/* NAVIGATION CARDS */}
                        <div className="nav-cards">
                            <div
                                className="nav-card animate-fade-in-up delay-5"
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
                                className="nav-card animate-fade-in-up delay-6"
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

                        {/* INTERVIEW SIMULATOR */}
                        <div className="dashboard-card full-width animate-fade-in-up delay-6" style={{ marginTop: '24px' }}>
                            <InterviewSimulator />
                        </div>

                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default ResumeAnalysisDashboard;
