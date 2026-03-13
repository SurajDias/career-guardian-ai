import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, BarChart3, Target, ShieldAlert, Compass, Zap } from "lucide-react";
import SkillGapChart from "../components/SkillGapChart";
import "../home-stripe.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function ResumeAnalysisDashboard() {

    const navigate = useNavigate();
    const location = useLocation();

    // Read real API data passed from ProcessingPage, fall back to defaults
    const data = location.state?.data || {};
    const isJobMatch = data.isJobAnalysis || false;

    // If Job Analysis is true, use matched_skills. Otherwise it's ats baseline so use detected_skills.
    const detectedSkills = isJobMatch ? (data.matched_skills || []) : (data.detected_skills || ["Python", "Machine Learning", "SQL", "React", "Data Analysis"]);
    const missingSkills = isJobMatch ? (data.missing_skills || []) : (data.missing_keywords || ["Docker", "AWS", "System Design"]);
    const score = isJobMatch ? (data.match_score ?? 0) : (data.atsData?.ats_score ?? data.ats_score ?? 82);

    // Growth features (Job Analysis only)
    const synergySkills = data.high_synergy_missing || [];
    const growthSuggestions = data.growth_suggestions || [];

    const circumference = 2 * Math.PI * 60;
    const offset = circumference - (score / 100) * circumference;

    return (
        <div className="stripe-landing-page">
            <Navbar />

            <div className="page results-page" style={{ paddingTop: '80px' }}>
                <div className="stripe-container">
                    {/* HEADER */}
                    <div className="results-header" style={{ marginBottom: '20px' }}>
                        <h1 style={{ color: 'var(--s-text-head)' }}>{isJobMatch ? "Job Fit Analysis" : "Resume Analysis Dashboard"}</h1>
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
                            <h2>{isJobMatch ? "Your Job Fit" : "Your Resume Score"}</h2>
                            <p>
                                {isJobMatch
                                    ? score >= 80 ? "Excellent Match! You have almost all the required skills for this job."
                                        : score >= 50 ? "Solid match. Focus on learning the missing high-synergy skills to secure the role."
                                            : "You are currently missing several core competencies for this specific role."
                                    : score >= 80 ? "Excellent! Your resume is highly optimized for ATS systems."
                                        : score >= 50 ? "Good start, but adding more relevant keywords will improve your chances."
                                            : "Your resume needs significant improvement to pass ATS filters."
                                }
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
                                    <h3>{isJobMatch ? "Job Requirements Gap" : "Skill Gap Analysis"}</h3>
                                </div>
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
                                    <h3>{isJobMatch ? "Matched Skills" : "Detected Skills"}</h3>
                                </div>
                                <div className="skill-tags">
                                    {detectedSkills.map((s) => (
                                        <span key={s} className="skill-tag found">{s}</span>
                                    ))}
                                    {detectedSkills.length === 0 && <span style={{ fontSize: "14px", color: "var(--s-text-sub)" }}>No required skills found in resume.</span>}
                                </div>
                            </div>

                            {/* Missing Skills */}
                            <div className="dashboard-card animate-fade-in-up delay-3">
                                <div className="dashboard-card-header">
                                    <div className="card-icon red">
                                        <Target size={20} />
                                    </div>
                                    <h3>Missing Job Dependencies</h3>
                                </div>
                                <div className="skill-tags">
                                    {/* If there are high-synergy skills, render them specially */}
                                    {synergySkills.map((s) => (
                                        <span key={s} className="skill-tag missing" style={{ border: "2px solid #ff4d6a" }}>
                                            {s} (Recommended Next)
                                        </span>
                                    ))}

                                    {/* Render standard missing skills */}
                                    {missingSkills.filter(s => !synergySkills.includes(s)).map((s) => (
                                        <span key={s} className="skill-tag missing">{s}</span>
                                    ))}

                                    {/* Render growth suggestions if there are no missing job skills */}
                                    {missingSkills.length === 0 && growthSuggestions.map((s) => (
                                        <span key={s} className="skill-tag missing" style={{ backgroundColor: "var(--s-bg-alt)", border: "1px solid var(--s-border)", color: "var(--s-text-sub)" }}>
                                            {s} (Suggested Growth)
                                        </span>
                                    ))}

                                    {missingSkills.length === 0 && growthSuggestions.length === 0 && (
                                        <span style={{ fontSize: "14px", color: "var(--s-text-sub)" }}>You have all required skills!</span>
                                    )}
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

                            <div
                                className="nav-card animate-fade-in-up delay-6"
                                onClick={() => navigate("/interview-simulator")}
                            >
                                <div className="nav-card-icon purple">
                                    <Zap size={24} />
                                </div>
                                <div className="nav-card-info">
                                    <h3>Interview Simulator</h3>
                                    <p>Practice answering questions with our AI coach</p>
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
