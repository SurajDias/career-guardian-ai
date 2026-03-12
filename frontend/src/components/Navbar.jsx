import { Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();
    return (
        <header className="stripe-navbar">
            <div className="stripe-nav-container">
                <div className="stripe-logo" onClick={() => navigate("/")}>
                    <Shield size={24} className="stripe-logo-icon" />
                    <span className="stripe-logo-text">CareerGuardian</span>
                </div>
                <nav className="stripe-nav-links">
                    <button>Products</button>
                    <button>Solutions</button>
                    <button>Developers</button>
                    <button>Resources</button>
                    <button>Pricing</button>
                </nav>
                <div className="stripe-nav-actions">
                    <button className="stripe-btn-text" onClick={() => navigate("/upload")}>Sign in</button>
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
        </header>
    );
}
