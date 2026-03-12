import { useNavigate } from "react-router-dom";

export default function HeroSection() {
    const navigate = useNavigate();
    return (
        <section className="stripe-hero">
            <div className="stripe-hero-canvas">
                {/* Simulated Stripe gradient mesh background */}
                <div className="stripe-gradient-blob blob-1"></div>
                <div className="stripe-gradient-blob blob-2"></div>
                <div className="stripe-gradient-blob blob-3"></div>
                <div className="stripe-gradient-blob blob-4"></div>
            </div>
            <div className="stripe-container hero-content-container">
                <div className="stripe-hero-main animate-fade-in-up">
                    <span className="stripe-badge">Career Protection API</span>
                    <h1 className="stripe-hero-title">
                        Your AI Career Guardian<br />
                    </h1>
                    <p className="stripe-hero-subtitle">
                        Your career deserves protection. Career Guardian uses AI to analyze your resume, detect job scams, identify missing skills, and generate a personalized roadmap to help you grow with confidence in today’s competitive job market.
                    </p>
                    <div className="stripe-hero-buttons">
                        <button className="stripe-btn-primary large" onClick={() => navigate("/upload")}>
                            Start now <span className="arrow">→</span>
                        </button>
                        <button className="stripe-btn-secondary large" onClick={() => navigate("/upload")}>
                            Check Job Scam <span className="arrow">→</span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
