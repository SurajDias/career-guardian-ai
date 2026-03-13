import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, BarChart3, Target, ShieldAlert, Compass, Zap } from "lucide-react";
import SkillGapChart from "../components/SkillGapChart";
import "../home-stripe.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import InterviewSimulator from "./InterviewSimulator";

function ResumeAnalysisDashboard() {

    const navigate = useNavigate();
    const location = useLocation();

    const data = location.state?.data || {};
    const isJobMatch = data.isJobAnalysis || false;

    const detectedSkills = isJobMatch
        ? (data.matched_skills || [])
        : (data.detected_skills || []);

    const missingSkills = isJobMatch
        ? (data.missing_skills || [])
        : (data.missing_keywords || data.missing_skills || []);

    const score = isJobMatch
        ? (data.match_score ?? 0)
        : (data.atsData?.ats_score ?? data.ats_score ?? 0);

    const synergySkills = data.high_synergy_missing || [];
    const growthSuggestions = data.growth_suggestions || [];

    const circumference = 2 * Math.PI * 60;
    const offset = circumference - (score / 100) * circumference;

    if (!data || Object.keys(data).length === 0) {
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
                        <h1 style={{ color: 'var(--s-text-head)' }}>
                            {isJobMatch ? "Job Fit Analysis" : "Resume Analysis Dashboard"}
                        </h1>

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
                                        cx="65" cy="65"
                                        r="60"
                                        style={{ strokeDashoffset: offset }}
                                    />
                                </svg>

                                <div className="score-value">
                                    {score}<span>/100</span>
                                </div>
                            </div>

                            <h2>{isJobMatch ? "Your Job Fit Score" : "Your Resume Score"}</h2>

                            <p>
                                {isJobMatch
                                    ? score >= 80 ? "Excellent match for this job role."
                                        : score >= 50 ? "Good match but learning missing skills will improve chances."
                                            : "You need more core skills for this role."
                                    : score >= 80 ? "Excellent! Your resume is highly optimized."
                                        : score >= 50 ? "Good foundation. Improve keywords for better ATS ranking."
                                            : "Your resume needs improvement to pass ATS filters."}
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

                                    <h3>
                                        {isJobMatch ? "Job Requirement Gap" : "Skill Gap Analysis"}
                                    </h3>
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

                                    <h3>
                                        {isJobMatch ? "Matched Skills" : "Detected Skills"}
                                    </h3>
                                </div>

                                <div className="skill-tags">

                                    {detectedSkills.length > 0
                                        ? detectedSkills.map((s) => (
                                            <span key={s} className="skill-tag found">{s}</span>
                                        ))
                                        : <p style={{ color: 'var(--s-text-muted)' }}>
                                            No matching skills detected.
                                        </p>
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

                                    {synergySkills.map((s) => (
                                        <span
                                            key={s}
                                            className="skill-tag missing"
                                            style={{ border: "2px solid #ff4d6a" }}
                                        >
                                            {s} (Recommended Next)
                                        </span>
                                    ))}

                                    {missingSkills
                                        .filter(s => !synergySkills.includes(s))
                                        .map((s) => (
                                            <span key={s} className="skill-tag missing">
                                                {s}
                                            </span>
                                        ))}

                                    {missingSkills.length === 0 && growthSuggestions.map((s) => (
                                        <span
                                            key={s}
                                            className="skill-tag missing"
                                            style={{
                                                backgroundColor: "var(--s-bg-alt)",
                                                border: "1px solid var(--s-border)",
                                                color: "var(--s-text-sub)"
                                            }}
                                        >
                                            {s} (Suggested Growth)
                                        </span>
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
                                    <p>Scan job posts for scam indicators</p>
                                </div>

                                <ArrowLeft size={18} className="nav-card-arrow" />
                            </div>

                            <div
                                className="nav-card animate-fade-in-up delay-5"
                                onClick={() => navigate("/career-roadmap", { state: { missingSkills } })}
                            >
                                <div className="nav-card-icon teal">
                                    <Compass size={24} />
                                </div>

                                <div className="nav-card-info">
                                    <h3>Career Roadmap</h3>
                                    <p>View personalized learning roadmap</p>
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
                                    <p>Practice interviews with AI guidance</p>
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