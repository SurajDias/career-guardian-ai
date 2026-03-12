import { ShieldCheck } from "lucide-react";

function PhishingChecker() {

    const riskLevel = "low"; // "low" | "medium" | "high"
    const riskLabels = {
        low: "Low Risk",
        medium: "Medium Risk",
        high: "High Risk",
    };
    const riskMessages = {
        low: "No suspicious patterns detected in the associated job posting. This appears to be a legitimate opportunity.",
        medium: "Some elements of this posting raised minor flags. Proceed with caution and verify the employer.",
        high: "Multiple red flags detected. This posting may be fraudulent — do not share personal information.",
    };

    return (
        <div>
            <div className={`risk-indicator ${riskLevel}`}>
                <ShieldCheck size={22} />
                <div>
                    <span className={`risk-badge ${riskLevel}`}>
                        {riskLabels[riskLevel]}
                    </span>
                </div>
            </div>
            <p className="risk-text" style={{ marginTop: "14px", lineHeight: "1.6" }}>
                {riskMessages[riskLevel]}
            </p>
        </div>
    );
}

export default PhishingChecker;
