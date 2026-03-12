import { useState } from "react";
import { checkPhishing } from "../services/api";

function JobInput() {

    const [jobText, setJobText] = useState("");
    const [result, setResult] = useState(null);

    const handleScan = async () => {
        try {
            const response = await checkPhishing(jobText);
            setResult(response);
        } catch (error) {
            console.error("Error checking job:", error);
        }
    };

    return (
        <div style={{
            background: "white",
            padding: "20px",
            borderRadius: "10px",
            width: "300px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
        }}>
            <h3>Check Job Posting</h3>

            <textarea
                placeholder="Paste job description"
                style={{ width: "100%", height: "80px" }}
                value={jobText}
                onChange={(e) => setJobText(e.target.value)}
            />

            <button
                style={{ marginTop: "10px" }}
                onClick={handleScan}
            >
                Scan Job
            </button>

            {result && (
                <div style={{ marginTop: "15px" }}>
                    <strong>Result:</strong>
                    <pre>{JSON.stringify(result, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}

export default JobInput;