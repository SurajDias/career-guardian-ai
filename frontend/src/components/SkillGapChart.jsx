import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

const COLORS = {
    found: "#00d4aa",
    missing: "#ff4d6a",
};

function SkillGapChart({ detectedSkills = [], missingSkills = [] }) {
    
    // Generate dynamic chart data based on API results
    const data = [
        ...detectedSkills.map(skill => ({ skill: skill.length > 12 ? skill.substring(0, 10) + "..." : skill, level: 85, status: "found" })),
        ...missingSkills.map(skill => ({ skill: skill.length > 12 ? skill.substring(0, 10) + "..." : skill, level: 20, status: "missing" }))
    ];

    if (data.length === 0) {
        return <div style={{ padding: "20px", textAlign: "center", color: "#8898aa" }}>No skills detected</div>;
    }

    return (
        <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} layout="vertical" margin={{ top: 5, right: 20, bottom: 5, left: 80 }}>
                    <XAxis type="number" domain={[0, 100]} tick={{ fill: "#8898aa", fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis type="category" dataKey="skill" tick={{ fill: "#0a2540", fontSize: 13, fontWeight: 600 }} axisLine={false} tickLine={false} width={100} />
                    <Tooltip
                        cursor={{ fill: "rgba(50,50,93,0.03)" }}
                        contentStyle={{
                            background: "#ffffff",
                            border: "1px solid #e6ebf1",
                            borderRadius: "12px",
                            boxShadow: "0 13px 27px -5px rgba(50,50,93,0.25)",
                            color: "#0a2540",
                            fontSize: "13px",
                            fontWeight: 500
                        }}
                        formatter={(value, name) => [`${value}%`, "Proficiency"]}
                    />
                    <Bar dataKey="level" radius={[0, 6, 6, 0]} barSize={18}>
                        {data.map((entry, index) => (
                            <Cell key={index} fill={COLORS[entry.status]} fillOpacity={0.8} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default SkillGapChart;
