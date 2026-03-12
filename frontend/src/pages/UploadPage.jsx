import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, FileText, CheckCircle, ArrowRight, Shield } from "lucide-react";
import "../index.css";
import "../home-stripe.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function UploadPage() {

    const [file, setFile] = useState(null);
    const [dragOver, setDragOver] = useState(false);
    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        const selected = e.target.files[0];
        if (selected) setFile(selected);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setDragOver(true);
    };

    const handleDragLeave = () => {
        setDragOver(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragOver(false);
        const dropped = e.dataTransfer.files[0];
        if (dropped) setFile(dropped);
    };

    const handleSubmit = () => {
        if (!file) return;
        navigate("/processing");
    };

    const formatSize = (bytes) => {
        if (bytes < 1024) return bytes + " B";
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
        return (bytes / (1024 * 1024)).toFixed(1) + " MB";
    };

    return (
        <div className="stripe-landing-page">
            <Navbar />
            
            {/* UPLOAD AREA */}
            <div className="upload-page">
                <div className="upload-container">

                    <h2>Upload Your Resume</h2>
                    <p className="upload-subtitle">
                        Drop your resume below and let our AI analyze it for you
                    </p>

                    <div
                        className={`upload-dropzone ${dragOver ? "drag-over" : ""}`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <div className="upload-icon">
                            <Upload size={28} />
                        </div>
                        <h3>Drag & drop your file here</h3>
                        <p>or <span>browse files</span> from your computer</p>
                        <p style={{ marginTop: "8px", fontSize: "0.78rem" }}>
                            Supports PDF, DOC, DOCX
                        </p>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={handleFileChange}
                        />
                    </div>

                    {file && (
                        <div className="file-preview">
                            <div className="file-icon">
                                <FileText size={22} />
                            </div>
                            <div className="file-info">
                                <div className="file-name">{file.name}</div>
                                <div className="file-size">{formatSize(file.size)}</div>
                            </div>
                            <div className="file-check">
                                <CheckCircle size={22} />
                            </div>
                        </div>
                    )}

                    <div className="upload-actions">
                        <button
                            className="primary-btn"
                            onClick={handleSubmit}
                            disabled={!file}
                        >
                            Analyze Resume <ArrowRight size={18} />
                        </button>
                    </div>

                </div>
            </div>
            
            <Footer />
        </div>
    );
}

export default UploadPage;
