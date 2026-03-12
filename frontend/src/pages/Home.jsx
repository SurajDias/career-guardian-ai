import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import FeatureCards from "../components/FeatureCards";
import CTASection from "../components/CTASection";
import Footer from "../components/Footer";
import "../index.css";
import "../home-stripe.css";

function Home() {
    return (
        <div className="stripe-landing-page">
            <Navbar />
            <main>
                <HeroSection />
                <FeatureCards />
                <CTASection />
            </main>
            <Footer />
        </div>
    );
}

export default Home;