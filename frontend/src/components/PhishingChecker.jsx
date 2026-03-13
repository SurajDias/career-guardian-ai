import React, { useState } from "react";
import { ShieldCheck } from "lucide-react";

const PhishingChecker = () => {
    const [emailText, setEmailText] = useState("");
    const [result, setResult] = useState(null);

    const checkPhishing = () => {
        const text = emailText.toLowerCase();

        if (
            text.includes("pay") ||
            text.includes("payment") ||
            text.includes("processing fee") ||
            text.includes("transfer money") ||
            text.includes("urgent") ||
            text.includes("within 2 hours")
        ) {
            setResult({
                risk_score: 85,
                risk_level: "high",
                issues: [
                    "Payment request detected",
                    "Urgent language detected",
                    "Possible phishing attempt"
                ]
            });
        }
        else if (
            text.includes("verify") ||
            text.includes("click link") ||
            text.includes("confirm details") ||
            text.includes("send documents") ||
            text.includes("interview")
        ) {
            setResult({
                risk_score: 40,
                risk_level: "medium",
                issues: [
                    "Unverified recruitment message",
                    "Request for personal information"
                ]
            });
        }
        else {
            setResult({
                risk_score: 10,
                risk_level: "low",
                issues: ["No major phishing indicators detected"]
            });
        }
    };

    const riskLabels = {
        low: "Low Risk",
        medium: "Medium Risk",
        high: "High Risk"
    };

    const riskMessages = {
        low: "No suspicious patterns detected in the associated job posting. This appears to be a legitimate opportunity.",
        medium: "Some elements of this posting raised minor flags. Proceed with caution and verify the employer.",
        high: "Multiple red flags detected. This posting may be fraudulent — do not share personal information."
    };

    return (
        <div className="container mt-5">
            <div className="card shadow p-4">

                <h2 className="text-center mb-4">🛡 Phishing Email Detector</h2>

                {/* Example Buttons */}
                <div className="mb-3 text-center">
                    <button
                        className="btn btn-danger me-2"
                        onClick={() =>
                            setEmailText(
                                "Congratulations! You are selected for Google. Pay ₹3000 processing fee immediately within 2 hours."
                            )
                        }
                    >
                        Load Phishing Example
                    </button>

                    <button
                        className="btn btn-warning me-2"
                        onClick={() =>
                            setEmailText(
                                "Please verify your documents before the interview tomorrow."
                            )
                        }
                    >
                        Load Suspicious Example
                    </button>

                    <button
                        className="btn btn-success"
                        onClick={() =>
                            setEmailText(
                                "Thank you for applying to ABC Technologies. Our recruitment team will review your application and contact you soon."
                            )
                        }
                    >
                        Load Safe Example
                    </button>
                </div>

                {/* Text Area */}
                <textarea
                    className="form-control mb-3"
                    rows="5"
                    placeholder="Paste suspicious recruitment email here..."
                    value={emailText}
                    onChange={(e) => setEmailText(e.target.value)}
                />

                {/* Check Button */}
                <div className="text-center">
                    <button className="btn btn-primary" onClick={checkPhishing}>
                        Check Email
                    </button>
                </div>

                {/* Result */}
                {result && (
                    <div className="mt-4">

                        {/* Shield Risk Indicator */}
                        <div className={`risk-indicator ${result.risk_level}`}>
                            <ShieldCheck size={22} />
                            <div>
                                <span className={`risk-badge ${result.risk_level}`}>
                                    {riskLabels[result.risk_level]}
                                </span>
                            </div>
                        </div>

                        <p className="risk-text" style={{ marginTop: "14px", lineHeight: "1.6" }}>
                            {riskMessages[result.risk_level]}
                        </p>

                        {/* Risk Score */}
                        <div
                            className={`alert ${result.risk_level === "high"
                                    ? "alert-danger"
                                    : result.risk_level === "medium"
                                        ? "alert-warning"
                                        : "alert-success"
                                }`}
                        >
                            <h5>Risk Score: {result.risk_score}%</h5>

                            <div className="progress mb-2">
                                <div
                                    className={`progress-bar ${result.risk_level === "high"
                                            ? "bg-danger"
                                            : result.risk_level === "medium"
                                                ? "bg-warning"
                                                : "bg-success"
                                        }`}
                                    style={{ width: `${result.risk_score}%` }}
                                ></div>
                            </div>

                            <h6>Issues Found:</h6>
                            <ul>
                                {result.issues.map((issue, index) => (
                                    <li key={index}>{issue}</li>
                                ))}
                            </ul>

                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default PhishingChecker;
