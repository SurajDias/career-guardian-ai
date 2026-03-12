import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../home-stripe.css";
import { Zap, Target, LineChart, ShieldCheck } from "lucide-react";

function InterviewSimulator() {

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://www.chatbase.co/embed.min.js";

        // Use the SAME ID from Chatbase embed code
        script.id = "DQAFyy62OiKpuxSSwHqUh";

        script.setAttribute("domain", "www.chatbase.co");

        document.body.appendChild(script);
    }, []);

    return (
        <div className="stripe-landing-page">
            <Navbar />
            
            <div className="page" style={{ paddingTop: '120px', paddingBottom: '80px' }}>
                <div className="stripe-container">
                    
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'minmax(0, 1fr) 400px', /* Reserve 400px for Chatbase */
                        gap: '40px',
                        alignItems: 'start'
                    }}>
                        
                        {/* LEFT COLUMN: Content Area */}
                        <div className="animate-fade-in-up">
                            <span className="stripe-badge">Interactive Practice</span>
                            
                            <h1 style={{
                                fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                                fontWeight: 900,
                                lineHeight: 1.1,
                                letterSpacing: '-0.04em',
                                marginBottom: '20px',
                                color: 'var(--s-text-head)'
                            }}>
                                Master your next interview with <span style={{ color: 'var(--s-primary)' }}>AI</span>
                            </h1>
                            
                            <p style={{
                                fontSize: '1.2rem',
                                color: 'var(--s-text-body)',
                                marginBottom: '40px',
                                maxWidth: '600px',
                                lineHeight: 1.6
                            }}>
                                Practice answering tough behavioral and technical questions in a low-pressure environment. Our AI Interview Coach adapts to your responses and provides constructive feedback.
                            </p>

                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                                gap: '24px',
                                marginBottom: '40px'
                            }}>
                                {/* Feature 1 */}
                                <div className="stripe-card" style={{ padding: '24px', height: 'auto' }}>
                                    <div className="stripe-card-icon icon-purple" style={{ marginBottom: '16px' }}>
                                        <Target size={20} />
                                    </div>
                                    <h3 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>Role-Specific Prep</h3>
                                    <p style={{ margin: 0, fontSize: '0.9rem' }}>Questions tailored to product, engineering, and design roles.</p>
                                </div>
                                
                                {/* Feature 2 */}
                                <div className="stripe-card" style={{ padding: '24px', height: 'auto' }}>
                                    <div className="stripe-card-icon icon-cyan" style={{ marginBottom: '16px' }}>
                                        <LineChart size={20} />
                                    </div>
                                    <h3 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>Real-time Feedback</h3>
                                    <p style={{ margin: 0, fontSize: '0.9rem' }}>Get instant analysis on your tone, clarity, and completeness.</p>
                                </div>
                                
                                {/* Feature 3 */}
                                <div className="stripe-card" style={{ padding: '24px', height: 'auto' }}>
                                    <div className="stripe-card-icon icon-green" style={{ marginBottom: '16px' }}>
                                        <Zap size={20} />
                                    </div>
                                    <h3 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>Behavioral Scenarios</h3>
                                    <p style={{ margin: 0, fontSize: '0.9rem' }}>Master the STAR method with interactive prompt scenarios.</p>
                                </div>
                                
                                {/* Feature 4 */}
                                <div className="stripe-card" style={{ padding: '24px', height: 'auto' }}>
                                    <div className="stripe-card-icon icon-blue" style={{ marginBottom: '16px' }}>
                                        <ShieldCheck size={20} />
                                    </div>
                                    <h3 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>Zero Judgment</h3>
                                    <p style={{ margin: 0, fontSize: '0.9rem' }}>A safe space to stumble, learn, and perfect your pitch.</p>
                                </div>
                            </div>
                            
                            <div style={{
                                padding: '24px',
                                background: 'white',
                                borderRadius: 'var(--s-radius-lg)',
                                border: '1px solid var(--s-border)',
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: '16px',
                                boxShadow: 'var(--s-shadow-soft)'
                            }}>
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    background: 'var(--s-primary)',
                                    color: 'white',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: 'bold',
                                    flexShrink: 0
                                }}>
                                    1
                                </div>
                                <div>
                                    <h4 style={{ margin: '0 0 4px 0', fontSize: '1.05rem' }}>How it works</h4>
                                    <p style={{ margin: 0, fontSize: '0.95rem' }}>
                                        To get started, simply click on the floating chat widget on the bottom right of your screen. Introduce yourself, tell the AI what role you're interviewing for, and begin your session!
                                    </p>
                                </div>
                            </div>

                        </div>

                        {/* RIGHT COLUMN: Spacer for Chatbase Widget */}
                        <div className="chatbase-spacer" style={{
                            height: '600px',
                            background: 'rgba(255, 255, 255, 0.4)',
                            border: '2px dashed var(--s-border)',
                            borderRadius: 'var(--s-radius-lg)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            color: 'var(--s-text-dim)',
                            textAlign: 'center',
                            padding: '24px',
                            opacity: 0.7
                        }}>
                             <div style={{
                                width: '64px',
                                height: '64px',
                                borderRadius: '50%',
                                background: 'var(--s-border)',
                                marginBottom: '16px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                             }}>
                                 <Zap size={24} color="var(--s-text-dim)" />
                             </div>
                             <p>Chatbase Widget Area</p>
                             <small style={{ display: 'block', marginTop: '8px' }}>The AI bot will appear floating here automatically.</small>
                        </div>
                    </div>
                </div>
            </div>
            
            <Footer />
        </div>
    );
}

export default InterviewSimulator;