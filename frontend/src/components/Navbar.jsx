import { Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
    const navigate = useNavigate();
    const [isAboutOpen, setIsAboutOpen] = useState(false);

    const scrollToFeatures = () => {
        const featuresSection = document.querySelector(".stripe-features");
        if (featuresSection) {
            featuresSection.scrollIntoView({ behavior: "smooth" });
        } else if (window.location.pathname !== "/") {
            // Fallback: If not on home page, navigate and then scroll
            navigate("/");
            setTimeout(() => {
                document.querySelector(".stripe-features")?.scrollIntoView({ behavior: "smooth" });
            }, 100);
        }
    };

    return (
        <header className="stripe-navbar">
            <div className="stripe-nav-container">
                <div className="stripe-logo" onClick={() => navigate("/")}>
                    <Shield size={24} className="stripe-logo-icon" />
                    <span className="stripe-logo-text">CareerGuardian</span>
                </div>
                <nav className="stripe-nav-links">
                    <button onClick={scrollToFeatures}>Features</button>
                    <button onClick={() => setIsAboutOpen(true)}>About</button>
                </nav>
                <div className="stripe-nav-actions">
                    <button className="stripe-btn-primary" onClick={() => navigate("/upload")}>
                        Start now <span className="arrow">→</span>
                    </button>
                </div>
                {/* Mobile Hamburger Placeholder */}
                <div className="stripe-mobile-menu">
                    <div className="hamburger"></div>
                    <div className="hamburger"></div>
                    <div className="hamburger"></div>
                </div>
            </div>

            {/* About Modal */}
            {isAboutOpen && (
                <div 
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(10, 37, 64, 0.4)',
                        backdropFilter: 'blur(4px)',
                        zIndex: 9999,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '24px'
                    }}
                    onClick={() => setIsAboutOpen(false)}
                >
                    <div 
                        style={{
                            background: 'var(--s-bg-card)',
                            padding: '32px',
                            borderRadius: 'var(--s-radius-lg)',
                            maxWidth: '500px',
                            width: '100%',
                            boxShadow: 'var(--s-shadow-hover)',
                            position: 'relative'
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button 
                            onClick={() => setIsAboutOpen(false)}
                            style={{
                                position: 'absolute',
                                top: '16px',
                                right: '16px',
                                background: 'transparent',
                                border: 'none',
                                fontSize: '20px',
                                cursor: 'pointer',
                                color: 'var(--s-text-muted)'
                            }}
                        >
                            ✕
                        </button>
                        <h2 style={{ color: 'var(--s-text-head)', marginBottom: '16px', fontSize: '1.5rem', fontWeight: 800 }}>Career Guardian AI+</h2>
                        <p style={{ color: 'var(--s-text-body)', marginBottom: '16px', lineHeight: 1.6 }}>
                            Career Guardian AI+ is an AI-powered platform designed to help job seekers improve their resumes, identify missing skills, detect phishing job offers, and practice interviews with an AI interview coach.
                        </p>
                        <p style={{ color: 'var(--s-text-body)', lineHeight: 1.6, margin: 0 }}>
                            The system analyzes resumes, highlights skill gaps, detects suspicious job postings, and generates personalized career guidance.
                        </p>
                    </div>
                </div>
            )}
        </header>
    );
}
