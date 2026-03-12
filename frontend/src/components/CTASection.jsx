import { useNavigate } from "react-router-dom";

export default function CTASection() {
    const navigate = useNavigate();
    return (
        <section className="stripe-cta">
            <div className="stripe-container">
                <div className="stripe-cta-box animate-fade-in-up delay-2">
                    <div className="stripe-cta-content">
                        <h2>Ready to secure your career?</h2>
                        <p>Join millions of professionals who use our platform to grow safely.</p>
                    </div>
                    <div className="stripe-cta-actions">
                        <button className="stripe-btn-primary" onClick={() => navigate("/upload")}>
                            Start now <span className="arrow">→</span>
                        </button>
                        <button className="stripe-btn-secondary" onClick={() => navigate("/upload")}>
                            Contact sales <span className="arrow">→</span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
