import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FileSearch, Cpu, BarChart3, Globe, CheckCircle, Loader } from "lucide-react";
import "../home-stripe.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const STEPS = [
    { icon: FileSearch, label: "Analyzing Resume..." },
    { icon: Cpu, label: "Extracting Skills..." },
    { icon: BarChart3, label: "Checking ATS Score..." },
    { icon: Globe, label: "Matching Job Market Data..." },
];

function ProcessingPage() {

    const [currentStep, setCurrentStep] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentStep((prev) => {
                if (prev >= STEPS.length) {
                    clearInterval(interval);
                    return prev;
                }
                return prev + 1;
            });
        }, 1000);

        const timeout = setTimeout(() => {
            navigate("/resume-analysis");
        }, STEPS.length * 1000 + 800);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, [navigate]);

    const progress = Math.min((currentStep / STEPS.length) * 100, 100);

    return (
        <div className="stripe-landing-page">
            <Navbar />
            
            <div className="processing-page">
                <div className="processing-container">

                <div className="processing-spinner" />

                <h2>Processing Your Resume</h2>
                <p className="processing-subtitle">
                    Our AI is analyzing your resume — this won't take long
                </p>

                <div className="processing-steps">
                    {STEPS.map((step, i) => {
                        const Icon = step.icon;
                        const isDone = i < currentStep;
                        const isActive = i === currentStep;

                        return (
                            <div
                                key={i}
                                className={`processing-step ${isDone ? "done" : ""} ${isActive ? "active" : ""}`}
                            >
                                <div className="step-icon">
                                    {isDone ? (
                                        <CheckCircle size={18} />
                                    ) : isActive ? (
                                        <Loader size={18} className="spinning" />
                                    ) : (
                                        <Icon size={18} />
                                    )}
                                </div>
                                <span className="step-label">{step.label}</span>
                            </div>
                        );
                    })}
                </div>

                <div className="processing-progress">
                    <div
                        className="processing-progress-bar"
                        style={{ width: `${progress}%` }}
                    />
                </div>

            </div>
        </div>
        <Footer />
    </div>
    );
}

export default ProcessingPage;
