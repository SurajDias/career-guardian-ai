function JobInput() {
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
            />

            <button style={{ marginTop: "10px" }}>
                Scan Job
            </button>
        </div>
    );
}

export default JobInput;