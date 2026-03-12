import { useState } from "react";
import { useNavigate } from "react-router-dom";

function UploadResume() {

    const [file, setFile] = useState(null);
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = () => {

        if (!file) {
            alert("Please upload a resume first");
            return;
        }

        console.log("Sending file to processing page");

        navigate("/processing", { state: { file } });
    };

    return (
        <div className="upload-container">

            <h2>Upload Your Resume</h2>

            <div className="upload-box">

                <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                />

                {file && (
                    <p className="file-name">
                        Uploaded: {file.name}
                    </p>
                )}

            </div>

            <button
                className="primary-btn"
                onClick={handleSubmit}
            >
                Analyze Resume
            </button>

        </div>
    );
}

export default UploadResume;