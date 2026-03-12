import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Shield, Search, AlertTriangle, CheckCircle, ShieldAlert, ShieldCheck, ShieldX } from "lucide-react";
import "../home-stripe.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function PhishingDetection() {

    const navigate = useNavigate();
    const [input, setInput] = useState("");
    const [scanning, setScanning] = useState(false);
    const [result, setResult] = useState(null);

    const handleScan = () => {
        if (!input.trim()) return;
        setScanning(true);
        setResult(null);

        // Simulated AI analysis
        setTimeout(() => {
            const text = input.toLowerCase();
            let level = "low";
            let findings = [];

            if (text.includes("urgent") || text.includes("immediately") || text.includes("act now")) {
                findings.push("Urgency language detected");
                level = "medium";
            }
            if (text.includes("wire transfer") || text.includes("western union") || text.includes("cryptocurrency")) {
                findings.push("Suspicious payment method mentioned");
                level = "high";
            }
            if (text.includes("personal information") || text.includes("ssn") || text.includes("bank account")) {
                findings.push("Request for sensitive personal data");
                level = "high";
            }
            if (text.includes("guaranteed") || text.includes("no experience needed") || text.includes("easy money")) {
                findings.push("Unrealistic job promises detected");
                level = level === "low" ? "medium" : level;
            }
            if (text.includes("gmail.com") || text.includes("yahoo.com") || text.includes("hotmail.com")) {
                findings.push("Non-corporate email domain used");
                level = level === "low" ? "medium" : level;
            }

            if (findings.length === 0) {
                findings.push("No suspicious patterns detected");
            }

            setResult({ level, findings });
            setScanning(false);
        }, 1800);
    };

    const riskConfig = {
        low: {
            icon: ShieldCheck,
            label: "Low Risk",
            color: "var(--success)",
            message: "This content appears legitimate. No major red flags were identified.",
        },
        medium: {
            icon: ShieldAlert,
            label: "Medium Risk",
            color: "var(--warning)",
            message: "Some suspicious elements were found. Proceed with caution and verify the source independently.",
        },
        high: {
            icon: ShieldX,
            label: "High Risk",
            color: "var(--danger)",
            message: "Multiple red flags detected. This content is likely fraudulent. Do not share personal information.",
        },
    };

    return (
        <div className="stripe-landing-page">
            <Navbar />
            
            <div className="page results-page" style={{ paddingTop: '80px' }}>
                <div className="stripe-container">
                    {/* HEADER */}
                    <div className="results-header" style={{ marginBottom: '20px' }}>
                        <h1 style={{ color: 'var(--s-text-head)'}}>Phishing Detection</h1>
                        <button className="stripe-btn-secondary" onClick={() => navigate("/resume-analysis")}>
                            <ArrowLeft size={16} /> Back to Dashboard
                        </button>
                    </div>

            <div className="results-content">

                {/* INPUT SECTION */}
                <div className="phishing-input-section animate-fade-in-up">
                    <div className="dashboard-card-header">
                        <div className="card-icon amber">
                            <Shield size={20} />
                        </div>
                        <h3>Analyze Job Posting or Email</h3>
                    </div>
                    <p className="phishing-desc">
                        Paste a job description or recruitment email below to scan for phishing indicators and scam patterns.
                    </p>
                    <textarea
                        className="phishing-textarea"
                        placeholder="Paste job description or recruitment email here..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        rows={8}
                    />
                    <button
                        className="primary-btn scan-btn"
                        onClick={handleScan}
                        disabled={!input.trim() || scanning}
                    >
                        {scanning ? (
                            <>Scanning...</>
                        ) : (
                            <><Search size={18} /> Scan for Threats</>
                        )}
                    </button>
                </div>

                {/* RESULTS SECTION */}
                {result && (
                    <div className="phishing-results animate-fade-in-up">

                        <div className="dashboard-grid">

                            {/* Risk Level */}
                            <div className="dashboard-card animate-fade-in-up delay-1">
                                <div className="dashboard-card-header">
                                    <div className={`card-icon ${result.level === "low" ? "teal" : result.level === "medium" ? "amber" : "red"}`}>
                                        {(() => {
                                            const Icon = riskConfig[result.level].icon;
                                            return <Icon size={20} />;
                                        })()}
                                    </div>
                                    <h3>Risk Assessment</h3>
                                </div>
                                <div className={`risk-indicator ${result.level}`}>
                                    {(() => {
                                        const Icon = riskConfig[result.level].icon;
                                        return <Icon size={22} />;
                                    })()}
                                    <span className={`risk-badge ${result.level}`}>
                                        {riskConfig[result.level].label}
                                    </span>
                                </div>
                                <p className="risk-text" style={{ marginTop: "14px", lineHeight: "1.7" }}>
                                    {riskConfig[result.level].message}
                                </p>
                            </div>

                            {/* Findings */}
                            <div className="dashboard-card animate-fade-in-up delay-2">
                                <div className="dashboard-card-header">
                                    <div className="card-icon purple">
                                        <AlertTriangle size={20} />
                                    </div>
                                    <h3>Analysis Findings</h3>
                                </div>
                                <ul className="findings-list">
                                    {result.findings.map((f, i) => (
                                        <li key={i} className="finding-item">
                                            <CheckCircle size={16} />
                                            <span>{f}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

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
