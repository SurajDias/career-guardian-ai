import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, BarChart3, ShieldAlert, Lightbulb, Target } from "lucide-react";
import SkillGapChart from "../components/SkillGapChart";
import Dashboard from "../components/Dashboard";
import PhishingChecker from "../components/PhishingChecker";
import "../index.css";

function Results() {

    const navigate = useNavigate();
    const location = useLocation();

    // get backend result passed from UploadResume
    const data = location.state?.data || {};

    const detectedSkills = data.detected_skills || [];
    const missingSkills = data.missing_skills || [];
    const score = data.match_score || 0;

    const circumference = 2 * Math.PI * 60;
    const offset = circumference - (score / 100) * circumference;

    return (
        <div className="page results-page">

            {/* HEADER */}
            <div className="results-header">
                <h1>📊 Resume Analysis Dashboard</h1>
                <button className="back-btn" onClick={() => navigate("/")}>
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
                                cx="65"
                                cy="65"
                                r="60"
                                style={{ strokeDashoffset: offset }}
                            />
                        </svg>

                        <div className="score-value">
                            {score}<span>/100</span>
                        </div>
                    </div>

                    <h2>Your Resume Score</h2>
                    <p>Based on job skill matching analysis</p>

                </div>

                {/* DASHBOARD GRID */}
                <div className="dashboard-grid">

                    {/* Skill Gap Chart */}
                    <div className="dashboard-card full-width">
                        <div className="dashboard-card-header">
                            <div className="card-icon purple">
                                <BarChart3 size={20} />
                            </div>
                            <h3>Skill Gap Analysis</h3>
                        </div>

                        <SkillGapChart
                            detectedSkills={detectedSkills}
                            missingSkills={missingSkills}
                        />
                    </div>

                    {/* Detected Skills */}
                    <div className="dashboard-card">
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

                        <div style={{ marginTop: "20px" }}>
                            <div className="dashboard-card-header">
                                <div className="card-icon red" style={{ width: "32px", height: "32px" }}>
                                    <Target size={16} />
                                </div>
                                <h3 style={{ fontSize: "0.95rem" }}>Missing Skills</h3>
                            </div>

                            <div className="skill-tags">
                                {missingSkills.map((s) => (
                                    <span key={s} className="skill-tag missing">{s}</span>
                                ))}
                            </div>
                        </div>

                    </div>

                    {/* Scam Risk */}
                    <div className="dashboard-card">
                        <div className="dashboard-card-header">
                            <div className="card-icon amber">
                                <ShieldAlert size={20} />
                            </div>
                            <h3>Job Scam Risk Assessment</h3>
                        </div>

                        <PhishingChecker />
                    </div>

                    {/* Career Recommendations */}
                    <div className="dashboard-card full-width">
                        <div className="dashboard-card-header">
                            <div className="card-icon teal">
                                <Lightbulb size={20} />
                            </div>
                            <h3>Career Recommendations</h3>
                        </div>

                        <Dashboard />
                    </div>

                </div>

            </div>

        </div>
    );
}

export default Results;