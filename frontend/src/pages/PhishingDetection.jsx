import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    ArrowLeft,
    Shield,
    Search,
    AlertTriangle,
    CheckCircle,
    ShieldAlert,
    ShieldCheck,
    ShieldX,
} from "lucide-react";

import "../home-stripe.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function PhishingDetection() {
    const navigate = useNavigate();

    const [input, setInput] = useState("");
    const [scanning, setScanning] = useState(false);
    const [result, setResult] = useState(null);

    // AI Pattern Database
    const patterns = [
        {
            words: ["urgent", "immediately", "act now"],
            score: 20,
            reason: "Urgency manipulation detected",
            category: "Social Engineering",
        },
        {
            words: ["wire transfer", "western union", "crypto", "bitcoin"],
            score: 30,
            reason: "Suspicious payment method requested",
            category: "Financial Fraud",
        },
        {
            words: ["bank account", "ssn", "personal information", "otp"],
            score: 30,
            reason: "Sensitive personal information requested",
            category: "Data Theft",
        },
        {
            words: ["easy money", "guaranteed income", "no experience needed"],
            score: 15,
            reason: "Unrealistic job promise",
            category: "Scam Recruitment",
        },
        {
            words: ["gmail.com", "yahoo.com", "hotmail.com"],
            score: 10,
            reason: "Non-corporate email domain used",
            category: "Suspicious Sender",
        },
    ];

    const handleScan = () => {
        if (!input.trim()) return;

        setScanning(true);
        setResult(null);

        setTimeout(() => {
            const text = input.toLowerCase();
            let score = 0;
            let explanations = [];

            patterns.forEach((pattern) => {
                pattern.words.forEach((word) => {
                    if (text.includes(word)) {
                        score += pattern.score;

                        explanations.push({
                            word,
                            reason: pattern.reason,
                            category: pattern.category,
                            impact: pattern.score,
                        });
                    }
                });
            });

            if (score > 100) score = 100;

            let level = "low";
            if (score >= 60) level = "high";
            else if (score >= 30) level = "medium";

            setResult({
                score,
                level,
                explanations,
            });

            setScanning(false);
        }, 1800);
    };

    const riskConfig = {
        low: {
            icon: ShieldCheck,
            label: "Low Risk",
            message:
                "No significant phishing indicators detected. This content appears safe.",
        },
        medium: {
            icon: ShieldAlert,
            label: "Medium Risk",
            message:
                "Some suspicious indicators were found. Verify the sender before responding.",
        },
        high: {
            icon: ShieldX,
            label: "High Risk",
            message:
                "Multiple phishing indicators detected. Do not share personal information.",
        },
    };

    return (
        <div className="stripe-landing-page">
            <Navbar />

            <div className="page results-page" style={{ paddingTop: "80px" }}>
                <div className="stripe-container">

                    <div className="results-header">
                        <h1>Explainable AI Phishing Detector</h1>

                        <button
                            className="stripe-btn-secondary"
                            onClick={() => navigate("/resume-analysis")}
                        >
                            <ArrowLeft size={16} /> Back
                        </button>
                    </div>

                    <div className="results-content">

                        {/* INPUT */}
                        <div className="dashboard-card">
                            <div className="dashboard-card-header">
                                <div className="card-icon amber">
                                    <Shield size={20} />
                                </div>
                                <h3>Scan Email or Job Post</h3>
                            </div>

                            <textarea
                                className="phishing-textarea"
                                placeholder="Paste suspicious email or job posting..."
                                rows={8}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                            />

                            <button
                                className="primary-btn scan-btn"
                                onClick={handleScan}
                                disabled={scanning}
                            >
                                {scanning ? "AI Scanning..." : <><Search size={18} /> Scan with AI</>}
                            </button>
                        </div>

                        {/* RESULT */}
                        {result && (
                            <div className="dashboard-grid">

                                {/* Risk Assessment */}
                                <div className="dashboard-card">
                                    <div className="dashboard-card-header">
                                        <h3>Risk Assessment</h3>
                                    </div>

                                    {(() => {
                                        const Icon = riskConfig[result.level].icon;

                                        return (
                                            <>
                                                <div className={`risk-indicator ${result.level}`}>
                                                    <Icon size={24} />
                                                    <span className={`risk-badge ${result.level}`}>
                                                        {riskConfig[result.level].label}
                                                    </span>
                                                </div>

                                                <p className="risk-text">
                                                    {riskConfig[result.level].message}
                                                </p>

                                                {/* AI Score */}
                                                <div className="ai-score">
                                                    <p><strong>AI Risk Score:</strong> {result.score}/100</p>

                                                    <div className="progress-bar">
                                                        <div
                                                            className="progress-fill"
                                                            style={{ width: `${result.score}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            </>
                                        );
                                    })()}
                                </div>

                                {/* Explainable AI Section */}
                                <div className="dashboard-card">
                                    <div className="dashboard-card-header">
                                        <AlertTriangle size={20} />
                                        <h3>Explainable AI Analysis</h3>
                                    </div>

                                    {result.explanations.length === 0 ? (
                                        <p>No suspicious indicators detected.</p>
                                    ) : (
                                        <ul className="findings-list">
                                            {result.explanations.map((item, index) => (
                                                <li key={index} className="finding-item">
                                                    <CheckCircle size={16} />
                                                    <div>
                                                        <strong>{item.word}</strong> → {item.reason}
                                                        <br />
                                                        <small>
                                                            Category: {item.category} | Risk Impact: +{item.impact}
                                                        </small>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>

                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default PhishingDetection;
