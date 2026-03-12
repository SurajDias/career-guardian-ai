import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

const data = [
    { skill: "Python", level: 90, status: "found" },
    { skill: "ML", level: 85, status: "found" },
    { skill: "SQL", level: 80, status: "found" },
    { skill: "React", level: 70, status: "found" },
    { skill: "Docker", level: 20, status: "missing" },
    { skill: "AWS", level: 15, status: "missing" },
    { skill: "System Design", level: 10, status: "missing" },
];

const COLORS = {
    found: "#00d4aa",
    missing: "#ff4d6a",
};

function SkillGapChart() {
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
