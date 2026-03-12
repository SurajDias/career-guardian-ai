import { Search, Shield, BookOpen, AlertTriangle } from "lucide-react";

export default function FeatureCards() {
    return (
        <section className="stripe-features">
            <div className="stripe-container">
                <div className="stripe-section-header animate-fade-in-up">
                    <h2 className="stripe-section-title">A complete toolkit for career security</h2>
                    <p className="stripe-section-subtitle">
                        Everything you need to navigate the modern job market, perfectly integrated and designed to help you land your dream role faster.
                    </p>
                </div>

                <div className="stripe-feature-grid">
                    <div className="stripe-card animate-fade-in-up delay-1">
                        <div className="stripe-card-icon icon-purple">
                            <Search size={22} />
                        </div>
                        <h3>Resume Analysis</h3>
                        <p>Identify skill gaps and optimize your resume for ATS systems automatically.</p>
                        <a href="#" className="stripe-link">Explore resumes <span className="arrow">→</span></a>
                    </div>
                    <div className="stripe-card animate-fade-in-up delay-2">
                        <div className="stripe-card-icon icon-cyan">
                            <AlertTriangle size={22} />
                        </div>
                        <h3>Phishing Detection</h3>
                        <p>Protect your data with AI that detects fake job postings and scam emails.</p>
                        <a href="#" className="stripe-link">Learn about security <span className="arrow">→</span></a>
                    </div>
                    <div className="stripe-card animate-fade-in-up delay-3">
                        <div className="stripe-card-icon icon-blue">
                            <BookOpen size={22} />
                        </div>
                        <h3>Career Roadmap</h3>
                        <p>Get personalized learning paths and certification suggestions.</p>
                        <a href="#" className="stripe-link">View roadmaps <span className="arrow">→</span></a>
                    </div>
                    <div className="stripe-card animate-fade-in-up delay-4">
                        <div className="stripe-card-icon icon-green">
                            <Shield size={22} />
                        </div>
                        <h3>Skill Gap Insights</h3>
                        <p>Discover missing skills in your resume and get recommendations to improve your employability.</p>
                        <a href="#" className="stripe-link">View Skill Insights <span className="arrow">→</span></a>
                    </div>
                </div>
            </div>
        </section>
    );
}
