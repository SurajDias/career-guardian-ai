import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import "../home-stripe.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getRoadmap } from "../services/api";

// ─── Skill metadata ───────────────────────────────────────────────────────────
const SKILL_META = {
  python:            { emoji: "🐍", col: "#1D9E75", bg: "#E1F5EE", tx: "#085041", level: "Beginner",     time: "4-6 weeks",  x: 100, y: 90  },
  java:              { emoji: "☕", col: "#1D9E75", bg: "#E1F5EE", tx: "#085041", level: "Beginner",     time: "6-8 weeks",  x: 310, y: 90  },
  sql:               { emoji: "🗄", col: "#1D9E75", bg: "#E1F5EE", tx: "#085041", level: "Beginner",     time: "2-3 weeks",  x: 560, y: 90  },
  "html":            { emoji: "🌐", col: "#1D9E75", bg: "#E1F5EE", tx: "#085041", level: "Beginner",     time: "2-3 weeks",  x: 100, y: 240 },
  javascript:        { emoji: "⚡", col: "#1D9E75", bg: "#E1F5EE", tx: "#085041", level: "Beginner",     time: "6-8 weeks",  x: 310, y: 240 },
  "c++":             { emoji: "⚙", col: "#1D9E75", bg: "#E1F5EE", tx: "#085041", level: "Beginner",     time: "6-8 weeks",  x: 560, y: 240 },
  docker:            { emoji: "🐳", col: "#7F77DD", bg: "#EEEDFE", tx: "#3C3489", level: "Intermediate", time: "2-3 weeks",  x: 100, y: 390 },
  aws:               { emoji: "☁", col: "#7F77DD", bg: "#EEEDFE", tx: "#3C3489", level: "Intermediate", time: "6-8 weeks",  x: 310, y: 390 },
  react:             { emoji: "⚛", col: "#7F77DD", bg: "#EEEDFE", tx: "#3C3489", level: "Intermediate", time: "4-6 weeks",  x: 560, y: 390 },
  "node.js":         { emoji: "🟢", col: "#7F77DD", bg: "#EEEDFE", tx: "#3C3489", level: "Intermediate", time: "4-5 weeks",  x: 100, y: 480 },
  mongodb:           { emoji: "🍃", col: "#7F77DD", bg: "#EEEDFE", tx: "#3C3489", level: "Intermediate", time: "2-3 weeks",  x: 310, y: 480 },
  "machine learning":{ emoji: "🤖", col: "#7F77DD", bg: "#EEEDFE", tx: "#3C3489", level: "Intermediate", time: "8-12 weeks", x: 560, y: 480 },
  kubernetes:        { emoji: "🚢", col: "#D85A30", bg: "#FAECE7", tx: "#712B13", level: "Advanced",     time: "4-6 weeks",  x: 200, y: 570 },
  tensorflow:        { emoji: "🧠", col: "#D85A30", bg: "#FAECE7", tx: "#712B13", level: "Advanced",     time: "4-6 weeks",  x: 460, y: 570 },
  "data science":    { emoji: "📊", col: "#7F77DD", bg: "#EEEDFE", tx: "#3C3489", level: "Intermediate", time: "8-10 weeks", x: 310, y: 570 },
  pandas:            { emoji: "🐼", col: "#1D9E75", bg: "#E1F5EE", tx: "#085041", level: "Beginner",     time: "2 weeks",    x: 100, y: 570 },
  numpy:             { emoji: "🔢", col: "#1D9E75", bg: "#E1F5EE", tx: "#085041", level: "Beginner",     time: "1-2 weeks",  x: 560, y: 570 },
  css:               { emoji: "🎨", col: "#1D9E75", bg: "#E1F5EE", tx: "#085041", level: "Beginner",     time: "2-3 weeks",  x: 420, y: 240 },
};

// Edges between skills (learning dependencies)
const ALL_EDGES = [
  ["python","docker"], ["python","aws"], ["python","machine learning"],
  ["python","pandas"], ["python","numpy"], ["sql","aws"],
  ["sql","data science"], ["html","javascript"], ["html","css"],
  ["javascript","react"], ["javascript","node.js"], ["docker","kubernetes"],
  ["aws","kubernetes"], ["machine learning","tensorflow"],
  ["pandas","data science"], ["node.js","mongodb"],
];

const TYPE_COLORS = {
  Course:   { bg: "#E1F5EE", tx: "#085041" },
  Cert:     { bg: "#EEEDFE", tx: "#3C3489" },
  Docs:     { bg: "#E6F1FB", tx: "#0C447C" },
  Book:     { bg: "#FAEEDA", tx: "#633806" },
  Practice: { bg: "#EAF3DE", tx: "#3B6D11" },
  Reference:{ bg: "#F1EFE8", tx: "#444441" },
};

const LEVEL_BADGE = {
  Beginner:     "b-beg",
  Intermediate: "b-int",
  Advanced:     "b-adv",
};

// ─── SVG Map Component ────────────────────────────────────────────────────────
function RoadmapSVG({ nodes, onSelect, selected }) {
  const visIds = new Set(nodes.map(n => n.id));
  const nodeMap = Object.fromEntries(nodes.map(n => [n.id, n]));

  // Calculate viewBox height based on deepest node
  const maxY = nodes.reduce((m, n) => Math.max(m, n.meta.y), 0) + 100;

  return (
    <svg width="100%" viewBox={`0 0 680 ${maxY}`} xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
      <defs>
        <marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </marker>
      </defs>

      {/* Edges */}
      {ALL_EDGES.map(([a, b]) => {
        if (!visIds.has(a) || !visIds.has(b)) return null;
        const A = nodeMap[a].meta;
        const B = nodeMap[b].meta;
        const mx = (A.x + B.x) / 2;
        const my = (A.y + B.y) / 2 - 30;
        return (
          <path
            key={`${a}-${b}`}
            d={`M${A.x},${A.y} Q${mx},${my} ${B.x},${B.y}`}
            fill="none"
            stroke="#B4B2A9"
            strokeWidth="1.5"
            strokeDasharray="6 4"
            markerEnd="url(#arr)"
            opacity="0.5"
          />
        );
      })}

      {/* Nodes */}
      {nodes.map(node => {
        const { x, y, col, bg, tx } = node.meta;
        const isSelected = selected === node.id;
        const lvlNum = { Beginner: "1", Intermediate: "2", Advanced: "3" }[node.meta.level];

        return (
          <g
            key={node.id}
            transform={`translate(${x},${y})`}
            onClick={() => onSelect(node)}
            style={{ cursor: "pointer" }}
          >
            {/* Halo */}
            <circle r="44" fill={bg} opacity="0.35" />

            {/* Outer ring */}
            <circle
              r="36"
              fill={bg}
              stroke={col}
              strokeWidth={isSelected ? 4 : 2}
              style={{ transition: "stroke-width 0.2s" }}
            />

            {/* Inner glow */}
            <circle r="24" fill={col} opacity="0.12" />

            {/* Label */}
            <text
              textAnchor="middle"
              dy="0.35em"
              fill={tx}
              fontSize="11"
              fontWeight="500"
              fontFamily="var(--font-sans)"
            >
              {node.label}
            </text>

            {/* Time below */}
            <text
              textAnchor="middle"
              y="56"
              fill="#888780"
              fontSize="10"
              fontFamily="var(--font-sans)"
            >
              {node.meta.time}
            </text>

            {/* Level badge dot */}
            <circle cx="28" cy="-28" r="11" fill={col} stroke="var(--color-background-secondary)" strokeWidth="2" />
            <text x="28" y="-23" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="500" fontFamily="var(--font-sans)">
              {lvlNum}
            </text>
          </g>
        );
      })}

      {/* Legend */}
      {[["#1D9E75", "#E1F5EE", "Beginner", 30],
        ["#7F77DD", "#EEEDFE", "Intermediate", 155],
        ["#D85A30", "#FAECE7", "Advanced", 320]].map(([col, bg, lbl, lx]) => (
        <g key={lbl}>
          <circle cx={lx + 10} cy={maxY - 18} r="9" fill={bg} stroke={col} strokeWidth="2" />
          <text x={lx + 26} y={maxY - 13} fill="#888780" fontSize="12" fontFamily="var(--font-sans)">{lbl}</text>
        </g>
      ))}
    </svg>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
function CareerRoadmap() {
  const navigate = useNavigate();
  const location = useLocation();

  const missingSkills = location.state?.missingSkills ?? [];
  const roadmap = getRoadmap(missingSkills);

  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(null);
  const detailRef = useRef(null);

  // Build node list from roadmap data
  const allNodes = roadmap.map(item => ({
    id: item.skill.toLowerCase(),
    label: item.skill,
    meta: SKILL_META[item.skill.toLowerCase()] ?? {
      emoji: "📌", col: "#888780", bg: "#F1EFE8", tx: "#444441",
      level: "Beginner", time: item.estimated_time ?? "—", x: 100, y: 90,
    },
    resources: item.resources,
  }));

  const visNodes = filter === "All" ? allNodes : allNodes.filter(n => n.meta.level === filter);

  const stats = {
    beginner:     allNodes.filter(n => n.meta.level === "Beginner").length,
    intermediate: allNodes.filter(n => n.meta.level === "Intermediate").length,
    advanced:     allNodes.filter(n => n.meta.level === "Advanced").length,
    weeks:        allNodes.reduce((a, n) => {
      const m = n.meta.time.match(/\d+/);
      return a + (m ? parseInt(m[0]) : 0);
    }, 0),
  };

  const handleSelect = (node) => {
    setSelected(node.id);
    setTimeout(() => detailRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }), 100);
  };

  const selectedNode = allNodes.find(n => n.id === selected);

  if (missingSkills.length === 0) {
    return (
      <div className="stripe-landing-page">
        <Navbar />
        <div className="page results-page" style={{ paddingTop: "80px", textAlign: "center" }}>
          <h2>No skill gaps found</h2>
          <p style={{ color: "var(--s-text-muted)", margin: "12px 0 24px" }}>
            Your resume already covers all tracked skills. Upload a new resume to get a personalised roadmap.
          </p>
          <button className="stripe-btn-secondary" onClick={() => navigate("/upload")}>
            <ArrowLeft size={16} /> Upload a Resume
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="stripe-landing-page">
      <Navbar />

      <div className="page results-page" style={{ paddingTop: "80px" }}>
        <div className="stripe-container">

          {/* HEADER */}
          <div className="results-header" style={{ marginBottom: "20px" }}>
            <h1 style={{ color: "var(--s-text-head)" }}>Career Roadmap</h1>
            <button
              className="stripe-btn-secondary"
              onClick={() => navigate("/resume-analysis", { state: location.state })}
            >
              <ArrowLeft size={16} /> Back to Dashboard
            </button>
          </div>

          {/* HERO */}
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <p style={{ color: "var(--s-text-muted)", fontSize: "14px" }}>
              Based on your resume — {allNodes.length} skill{allNodes.length !== 1 ? "s" : ""} to develop.
              Click any node to explore resources.
            </p>
          </div>

          {/* STATS */}
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap", marginBottom: "2rem" }}>
            {[
              { num: stats.beginner,     label: "Beginner skills",     color: "#1D9E75" },
              { num: stats.intermediate, label: "Intermediate skills",  color: "#7F77DD" },
              { num: stats.advanced,     label: "Advanced skills",      color: "#D85A30" },
              { num: `${stats.weeks}+`,  label: "Total weeks",          color: "var(--s-text-head)" },
            ].map(s => (
              <div key={s.label} className="dashboard-card" style={{ textAlign: "center", minWidth: "120px", padding: "14px 20px" }}>
                <div style={{ fontSize: "24px", fontWeight: "500", color: s.color }}>{s.num}</div>
                <div style={{ fontSize: "12px", color: "var(--s-text-muted)", marginTop: "2px" }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* FILTER BUTTONS */}
          <div style={{ display: "flex", gap: "8px", justifyContent: "center", marginBottom: "1rem", flexWrap: "wrap" }}>
            {[
              { label: "All skills",    val: "All",          bg: "#534AB7" },
              { label: "Beginner",      val: "Beginner",     bg: "#1D9E75" },
              { label: "Intermediate",  val: "Intermediate", bg: "#7F77DD" },
              { label: "Advanced",      val: "Advanced",     bg: "#D85A30" },
            ].map(f => (
              <button
                key={f.val}
                onClick={() => { setFilter(f.val); setSelected(null); }}
                style={{
                  padding: "7px 18px",
                  borderRadius: "20px",
                  border: filter === f.val ? "none" : "0.5px solid var(--color-border-secondary)",
                  background: filter === f.val ? f.bg : "transparent",
                  color: filter === f.val ? "#fff" : "var(--color-text-secondary)",
                  fontSize: "13px",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                {f.label}
              </button>
            ))}
          </div>

          <p style={{ textAlign: "center", fontSize: "13px", color: "var(--s-text-muted)", marginBottom: "1rem" }}>
            → Arrows show recommended learning order
          </p>

          {/* MAP */}
          <div className="dashboard-card full-width" style={{ padding: "1rem", overflow: "hidden" }}>
            {visNodes.length > 0
              ? <RoadmapSVG nodes={visNodes} onSelect={handleSelect} selected={selected} />
              : <p style={{ textAlign: "center", color: "var(--s-text-muted)", padding: "2rem" }}>
                  No {filter} skills in your gap list.
                </p>
            }
          </div>

          {/* DETAIL PANEL */}
          <div ref={detailRef}>
            {selectedNode && (
              <div className="dashboard-card full-width" style={{ marginTop: "1.5rem", padding: 0, overflow: "hidden" }}>

                {/* Panel header */}
                <div style={{
                  padding: "1.25rem 1.5rem",
                  display: "flex", alignItems: "center", gap: "16px",
                  borderBottom: "0.5px solid var(--color-border-tertiary)"
                }}>
                  <div style={{
                    width: "48px", height: "48px", borderRadius: "12px",
                    background: selectedNode.meta.bg, color: selectedNode.meta.tx,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "22px", flexShrink: 0,
                  }}>
                    {selectedNode.meta.emoji}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "18px", fontWeight: "500", color: "var(--color-text-primary)" }}>
                      {selectedNode.label}
                    </div>
                    <div style={{ fontSize: "13px", color: "var(--color-text-secondary)", marginTop: "2px" }}>
                      ⏱ {selectedNode.meta.time} estimated
                    </div>
                  </div>
                  <span style={{
                    padding: "4px 14px", borderRadius: "20px", fontSize: "12px", fontWeight: "500",
                    ...({
                      Beginner:     { background: "#E1F5EE", color: "#085041" },
                      Intermediate: { background: "#EEEDFE", color: "#3C3489" },
                      Advanced:     { background: "#FAECE7", color: "#712B13" },
                    }[selectedNode.meta.level])
                  }}>
                    {selectedNode.meta.level}
                  </span>
                </div>

                {/* Resources */}
                <div style={{ padding: "1.25rem 1.5rem", display: "flex", flexDirection: "column", gap: "10px" }}>
                  {selectedNode.resources.map((res, i) => {
                    const tc = TYPE_COLORS[res.type] ?? { bg: "#F1EFE8", tx: "#444441" };
                    return (
                      <a
                        key={i}
                        href={res.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: "flex", alignItems: "center", gap: "12px",
                          padding: "12px 16px", borderRadius: "var(--border-radius-md)",
                          border: "0.5px solid var(--color-border-tertiary)",
                          background: "var(--color-background-secondary)",
                          textDecoration: "none", transition: "border-color 0.15s",
                        }}
                      >
                        <div style={{
                          width: "32px", height: "32px", borderRadius: "8px", flexShrink: 0,
                          background: tc.bg, color: tc.tx,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: "13px", fontWeight: "500",
                        }}>
                          {res.type[0]}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: "14px", fontWeight: "500", color: "var(--color-text-primary)" }}>
                            {res.title}
                          </div>
                          <div style={{ fontSize: "11px", color: "var(--color-text-secondary)", marginTop: "1px" }}>
                            {res.type}
                          </div>
                        </div>
                        <div style={{ color: "var(--color-text-secondary)", fontSize: "16px" }}>↗</div>
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}

export default CareerRoadmap;
