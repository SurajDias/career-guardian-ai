import { useNavigate } from "react-router-dom";

export default function CTASection() {
    const navigate = useNavigate();
    return (
        <section className="stripe-cta">
            <div className="stripe-container">
                <div className="stripe-cta-box animate-fade-in-up delay-2">
                    <div className="stripe-cta-content">
                        <h2>Ready to protect and grow your career?</h2>
                        <p>Start using Career Guardian to analyze your resume, detect job scams, and build a personalized roadmap for your professional growth.</p>
                    </div>
                    <div className="stripe-cta-actions">
                        <button className="stripe-btn-primary" onClick={() => navigate("/upload")}>
                            Start now <span className="arrow">→</span>
                        </button>
                        <button className="stripe-btn-secondary" onClick={() => navigate("/interview-simulator")}>
                            Start AI Interview <span className="arrow">→</span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
