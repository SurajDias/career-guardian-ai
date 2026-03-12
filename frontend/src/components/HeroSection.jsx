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
                        Financial infrastructure<br/>for your career
                    </h1>
                    <p className="stripe-hero-subtitle">
                        Millions of professionals use Career Guardian to analyze resumes, detect job scams, and build personalized roadmaps. Protect your future from your first application to your executive role.
                    </p>
                    <div className="stripe-hero-buttons">
                        <button className="stripe-btn-primary large" onClick={() => navigate("/upload")}>
                            Start now <span className="arrow">→</span>
                        </button>
                        <button className="stripe-btn-secondary large" onClick={() => navigate("/upload")}>
                            Contact sales <span className="arrow">→</span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
