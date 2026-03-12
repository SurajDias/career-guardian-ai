import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { uploadResume } from "../services/api";
import { FileSearch, Cpu, BarChart3, Globe, CheckCircle, Loader } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../home-stripe.css";

const STEPS = [
  { icon: FileSearch, label: "Analyzing Resume..." },
  { icon: Cpu, label: "Extracting Skills..." },
  { icon: BarChart3, label: "Checking ATS Score..." },
  { icon: Globe, label: "Matching Job Market Data..." }
];

function ProcessingPage() {

  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  // prevents double execution in React StrictMode
  const hasRun = useRef(false);

  useEffect(() => {

    if (hasRun.current) return;
    hasRun.current = true;

    const file = location.state?.file;

    if (!file) {
      console.error("No file received.");
      navigate("/upload");
      return;
    }

    const processResume = async () => {

      try {

        console.log("Uploading file:", file);

        const result = await uploadResume(file);

        console.log("Backend response:", result);

        if (!result) {
          throw new Error("Empty response from backend");
        }

        // small delay so UI animation looks smooth
        setTimeout(() => {
          navigate("/resume-analysis", { state: { data: result } });
        }, 1500);

      } catch (error) {

        console.error("Upload error:", error);

        alert("Error processing resume. Check console for details.");

      }

    };

    processResume();

  }, [location, navigate]);

  // animation
  useEffect(() => {

    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= STEPS.length) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(interval);

  }, []);

  return (
    <div className="stripe-landing-page">

      <Navbar />

      <div className="processing-page">

        <div className="processing-container">

          <div className="processing-spinner" />

          <h2>Processing Your Resume</h2>

          <div className="processing-steps">

            {STEPS.map((step, i) => {

              const Icon = step.icon;
              const done = i < currentStep;
              const active = i === currentStep;

              return (
                <div key={i} className={`processing-step ${done ? "done" : ""} ${active ? "active" : ""}`}>

                  <div className="step-icon">

                    {done ? (
                      <CheckCircle size={18} />
                    ) : active ? (
                      <Loader size={18} className="spinning" />
                    ) : (
                      <Icon size={18} />
                    )}

                  </div>

                  <span>{step.label}</span>

                </div>
              );

            })}

          </div>

        </div>

      </div>

      <Footer />

    </div>
  );
}

export default ProcessingPage;