import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import UploadPage from "./pages/UploadPage";
import ProcessingPage from "./pages/ProcessingPage";
import ResumeAnalysisDashboard from "./pages/ResumeAnalysisDashboard";
import PhishingDetection from "./pages/PhishingDetection";
import CareerRoadmap from "./pages/CareerRoadmap";
import InterviewSimulator from "./pages/InterviewSimulator";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/processing" element={<ProcessingPage />} />
        <Route path="/resume-analysis" element={<ResumeAnalysisDashboard />} />
        <Route path="/phishing-detection" element={<PhishingDetection />} />
        <Route path="/career-roadmap" element={<CareerRoadmap />} />
        <Route path="/results" element={<Navigate to="/resume-analysis" replace />} />
        <Route path="/interview-simulator" element={<InterviewSimulator />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
