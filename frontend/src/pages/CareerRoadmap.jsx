import { useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import "../home-stripe.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getRoadmap } from "../services/api";

/* ─── Skill metadata ───────────────────────────────── */

const SKILL_META = {
  python:{emoji:"🐍",col:"#1D9E75",bg:"#E1F5EE",tx:"#085041",level:"Beginner",time:"4-6 weeks",x:100,y:90},
  sql:{emoji:"🗄",col:"#1D9E75",bg:"#E1F5EE",tx:"#085041",level:"Beginner",time:"2-3 weeks",x:560,y:90},
  html:{emoji:"🌐",col:"#1D9E75",bg:"#E1F5EE",tx:"#085041",level:"Beginner",time:"2-3 weeks",x:100,y:240},
  javascript:{emoji:"⚡",col:"#1D9E75",bg:"#E1F5EE",tx:"#085041",level:"Beginner",time:"6-8 weeks",x:310,y:240},
  css:{emoji:"🎨",col:"#1D9E75",bg:"#E1F5EE",tx:"#085041",level:"Beginner",time:"2-3 weeks",x:420,y:240},

  docker:{emoji:"🐳",col:"#7F77DD",bg:"#EEEDFE",tx:"#3C3489",level:"Intermediate",time:"2-3 weeks",x:100,y:390},
  aws:{emoji:"☁",col:"#7F77DD",bg:"#EEEDFE",tx:"#3C3489",level:"Intermediate",time:"6-8 weeks",x:310,y:390},
  react:{emoji:"⚛",col:"#7F77DD",bg:"#EEEDFE",tx:"#3C3489",level:"Intermediate",time:"4-6 weeks",x:560,y:390},

  "node.js":{emoji:"🟢",col:"#7F77DD",bg:"#EEEDFE",tx:"#3C3489",level:"Intermediate",time:"4-5 weeks",x:100,y:480},
  mongodb:{emoji:"🍃",col:"#7F77DD",bg:"#EEEDFE",tx:"#3C3489",level:"Intermediate",time:"2-3 weeks",x:310,y:480},
  "machine learning":{emoji:"🤖",col:"#7F77DD",bg:"#EEEDFE",tx:"#3C3489",level:"Intermediate",time:"8-12 weeks",x:560,y:480},

  kubernetes:{emoji:"🚢",col:"#D85A30",bg:"#FAECE7",tx:"#712B13",level:"Advanced",time:"4-6 weeks",x:200,y:570},
  tensorflow:{emoji:"🧠",col:"#D85A30",bg:"#FAECE7",tx:"#712B13",level:"Advanced",time:"4-6 weeks",x:460,y:570},
};

/* ─── Dependencies ───────────────────────────────── */

const ALL_EDGES = [
["python","docker"],["python","aws"],["python","machine learning"],
["sql","aws"],["html","javascript"],["html","css"],
["javascript","react"],["javascript","node.js"],
["docker","kubernetes"],["aws","kubernetes"],
["machine learning","tensorflow"],["node.js","mongodb"]
];

/* ─── SVG MAP ───────────────────────────────── */

function RoadmapSVG({nodes,onSelect,selected}){

const visIds=new Set(nodes.map(n=>n.id));
const nodeMap=Object.fromEntries(nodes.map(n=>[n.id,n]));
const maxY=nodes.reduce((m,n)=>Math.max(m,n.meta.y),0)+100;

return(

<svg width="100%" viewBox={`0 0 680 ${maxY}`}>

{ALL_EDGES.map(([a,b])=>{
if(!visIds.has(a)||!visIds.has(b)) return null

const A=nodeMap[a].meta
const B=nodeMap[b].meta
const mx=(A.x+B.x)/2
const my=(A.y+B.y)/2-30

return(
<path
key={a+b}
d={`M${A.x},${A.y} Q${mx},${my} ${B.x},${B.y}`}
fill="none"
stroke="#B4B2A9"
strokeWidth="1.5"
strokeDasharray="6 4"
/>
)
})}

{nodes.map(node=>{

const {x,y,col,bg,tx}=node.meta
const isSelected=selected===node.id

return(
<g key={node.id} transform={`translate(${x},${y})`} onClick={()=>onSelect(node)} style={{cursor:"pointer"}}>

<circle r="44" fill={bg} opacity="0.35"/>
<circle r="36" fill={bg} stroke={col} strokeWidth={isSelected?4:2}/>
<circle r="24" fill={col} opacity="0.12"/>

<text textAnchor="middle" dy="0.35em" fill={tx} fontSize="11">
{node.label}
</text>

<text textAnchor="middle" y="56" fill="#888780" fontSize="10">
{node.meta.time}
</text>

</g>
)
})}

</svg>
)
}

/* ─── MAIN COMPONENT ───────────────────────────────── */

function CareerRoadmap(){

const navigate=useNavigate()
const location=useLocation()

const missingSkills=location.state?.missingSkills ?? []

/* ⭐ DEFAULT ROADMAP IF FEW SKILLS */

const defaultSkills=[
"Python",
"SQL",
"JavaScript",
"React",
"Docker",
"AWS",
"Node.js",
"MongoDB",
"Machine Learning"
]

const roadmap = getRoadmap(
  missingSkills.length < 5
    ? [...new Set([...missingSkills, ...defaultSkills])]
    : missingSkills
)

const [filter,setFilter]=useState("All")
const [selected,setSelected]=useState(null)
const detailRef=useRef(null)

const allNodes=roadmap.map(item=>({
id:item.skill.toLowerCase(),
label:item.skill,
meta:SKILL_META[item.skill.toLowerCase()]??{
emoji:"📌",col:"#888780",bg:"#F1EFE8",tx:"#444441",
level:"Beginner",time:item.estimated_time??"—",x:100,y:90
},
resources:item.resources??[]
}))

const visNodes=filter==="All"?allNodes:allNodes.filter(n=>n.meta.level===filter)

const stats={
beginner:allNodes.filter(n=>n.meta.level==="Beginner").length,
intermediate:allNodes.filter(n=>n.meta.level==="Intermediate").length,
advanced:allNodes.filter(n=>n.meta.level==="Advanced").length,
weeks:allNodes.reduce((a,n)=>{
const m=n.meta.time.match(/\d+/)
return a+(m?parseInt(m[0]):0)
},0)
}

const fastestSkill=[...allNodes].sort((a,b)=>parseInt(a.meta.time)-parseInt(b.meta.time))[0]

const roleMap={
react:"Frontend Developer",
"node.js":"Backend Developer",
docker:"DevOps Engineer",
aws:"Cloud Engineer",
"machine learning":"ML Engineer"
}

let suggestedRole="Software Developer"

for(const n of allNodes){
if(roleMap[n.id]){
suggestedRole=roleMap[n.id]
break
}
}

const handleSelect=node=>{
setSelected(node.id)
setTimeout(()=>detailRef.current?.scrollIntoView({behavior:"smooth"}),100)
}

const selectedNode=allNodes.find(n=>n.id===selected)

return(

<div className="stripe-landing-page">

<Navbar/>

<div className="page results-page" style={{paddingTop:"80px"}}>
<div className="stripe-container">

<div className="results-header">
<h1>Career Roadmap</h1>

<button className="stripe-btn-secondary"
onClick={()=>navigate("/resume-analysis",{state:location.state})}>
<ArrowLeft size={16}/> Back
</button>

</div>

<p style={{textAlign:"center",marginBottom:"2rem"}}>
AI generated learning path based on resume analysis
</p>

{/* STATS */}

<div style={{display:"flex",gap:"12px",justifyContent:"center",flexWrap:"wrap",marginBottom:"2rem"}}>

<div className="dashboard-card">
<h3>{stats.beginner}</h3>
<p>Beginner Skills</p>
</div>

<div className="dashboard-card">
<h3>{stats.intermediate}</h3>
<p>Intermediate Skills</p>
</div>

<div className="dashboard-card">
<h3>{stats.advanced}</h3>
<p>Advanced Skills</p>
</div>

<div className="dashboard-card">
<h3>{stats.weeks}+ weeks</h3>
<p>Total Learning</p>
</div>

</div>

{/* INSIGHTS */}

<div style={{display:"flex",gap:"12px",justifyContent:"center",flexWrap:"wrap",marginBottom:"2rem"}}>

<div className="dashboard-card">
<h3>🚀 {fastestSkill?.label}</h3>
<p>Fastest Skill</p>
</div>

<div className="dashboard-card">
<h3>📈 {stats.weeks} weeks</h3>
<p>Estimated Learning</p>
</div>

<div className="dashboard-card">
<h3>🎯 {suggestedRole}</h3>
<p>Suggested Role</p>
</div>

</div>

{/* FILTER */}

<div style={{textAlign:"center",marginBottom:"1rem"}}>
<button onClick={()=>setFilter("All")}>All</button>
<button onClick={()=>setFilter("Beginner")}>Beginner</button>
<button onClick={()=>setFilter("Intermediate")}>Intermediate</button>
<button onClick={()=>setFilter("Advanced")}>Advanced</button>
</div>

{/* MAP */}

<div className="dashboard-card full-width">

<RoadmapSVG
nodes={visNodes}
onSelect={handleSelect}
selected={selected}
/>

</div>

{/* DETAILS */}

<div ref={detailRef}>

{selectedNode&&(

<div className="dashboard-card">

<h3>{selectedNode.label}</h3>
<p>Estimated Time: {selectedNode.meta.time}</p>

{selectedNode.resources.map((res,i)=>(
<a key={i} href={res.url} target="_blank" rel="noreferrer">
{res.title}
</a>
))}

</div>

)}

</div>

</div>
</div>

<Footer/>

</div>
)
}

export default CareerRoadmap