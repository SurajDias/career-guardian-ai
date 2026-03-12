import { Shield } from "lucide-react";

export default function Footer() {
    return (
        <footer className="stripe-footer">
            <div className="stripe-container">
                <div className="stripe-footer-grid">
                    <div className="stripe-footer-brand">
                        <div className="stripe-logo-small">
                            <Shield size={20} className="stripe-logo-icon" />
                            <span>CareerGuardian</span>
                        </div>
                        <p className="stripe-country">© 2026, Career Guardian AI+</p>
                    </div>
                    <div className="stripe-footer-column">
                        <h4>Products</h4>
                        <a href="#">Resume Optimizer</a>
                        <a href="#">Skill Gap Analysis</a>
                        <a href="#">Phishing Detector</a>
                        <a href="#">Career Roadmap</a>
                    </div>
                    <div className="stripe-footer-column">
                        <h4>Developers</h4>
                        <a href="#">Documentation</a>
                        <a href="#">API Reference</a>
                        <a href="#">API Status</a>
                    </div>
                    <div className="stripe-footer-column">
                        <h4>Company</h4>
                        <a href="#">About</a>
                        <a href="#">Customers</a>
                        <a href="#">Careers</a>
                        <a href="#">Blog</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
