import { useState, useEffect, useRef } from "react";

const COLORS = {
  blue: "#1565C0",
  blueMid: "#1E88E5",
  blueLight: "#E3F2FD",
  yellow: "#FFD600",
  yellowLight: "#FFFDE7",
  green: "#00C853",
  greenLight: "#E8F5E9",
  white: "#FFFFFF",
  bg: "#F4F7FB",
  dark: "#0D1B2A",
  gray: "#90A4AE",
  grayLight: "#ECEFF1",
  red: "#EF5350",
  orange: "#FF7043",
};

const SCREENS = ["splash","home","report","result","trivia","game","ranking","profile","map"];

// ---- ICONS (SVG inline) ----
const Icon = ({ name, size = 22, color = COLORS.blue }) => {
  const icons = {
    star: <polygon points="12,2 15.1,8.3 22,9.3 17,14.1 18.2,21 12,17.8 5.8,21 7,14.1 2,9.3 8.9,8.3" fill={color} stroke="none"/>,
    home: <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" fill="none" stroke={color} strokeWidth="2"/>,
    map: <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" fill="none" stroke={color} strokeWidth="2"/><circle cx="12" cy="10" r="3" fill={color}/></>,
    trophy: <><path d="M6 9H4V4h16v5h-2" fill="none" stroke={color} strokeWidth="2"/><path d="M6 9a6 6 0 0 0 12 0" fill="none" stroke={color} strokeWidth="2"/><line x1="12" y1="15" x2="12" y2="19" stroke={color} strokeWidth="2"/><line x1="8" y1="19" x2="16" y2="19" stroke={color} strokeWidth="2"/></>,
    user: <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" fill="none" stroke={color} strokeWidth="2"/><circle cx="12" cy="7" r="4" fill="none" stroke={color} strokeWidth="2"/></>,
    camera: <><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" fill="none" stroke={color} strokeWidth="2"/><circle cx="12" cy="13" r="4" fill="none" stroke={color} strokeWidth="2"/></>,
    alert: <><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" fill="none" stroke={color} strokeWidth="2"/><line x1="12" y1="9" x2="12" y2="13" stroke={color} strokeWidth="2"/><line x1="12" y1="17" x2="12.01" y2="17" stroke={color} strokeWidth="2"/></>,
    check: <polyline points="20 6 9 17 4 12" fill="none" stroke={color} strokeWidth="2.5"/>,
    play: <polygon points="5,3 19,12 5,21" fill={color}/>,
    flame: <path d="M12 2c0 0-5 5-5 10a5 5 0 0 0 10 0C17 7 12 2 12 2z M9 17c0-2 3-4 3-4s3 2 3 4a3 3 0 0 1-6 0z" fill={color}/>,
    bolt: <polygon points="13,2 3,14 12,14 11,22 21,10 12,10" fill={color}/>,
    medal: <><circle cx="12" cy="8" r="6" fill="none" stroke={color} strokeWidth="2"/><path d="M8.56 14.42L6 22l6-3 6 3-2.56-7.58" fill="none" stroke={color} strokeWidth="2"/></>,
    book: <><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" fill="none" stroke={color} strokeWidth="2"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" fill="none" stroke={color} strokeWidth="2"/></>,
    zap: <polygon points="13,2 3,14 12,14 11,22 21,10 12,10" fill="none" stroke={color} strokeWidth="2"/>,
    video: <><polygon points="23,7 16,12 23,17" fill={color}/><rect x="1" y="5" width="15" height="14" rx="2" fill="none" stroke={color} strokeWidth="2"/></>,
    arrow: <><line x1="5" y1="12" x2="19" y2="12" stroke={color} strokeWidth="2"/><polyline points="12 5 19 12 12 19" fill="none" stroke={color} strokeWidth="2"/></>,
    shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="none" stroke={color} strokeWidth="2"/>,
    car: <><rect x="1" y="3" width="15" height="13" rx="2" fill="none" stroke={color} strokeWidth="2" transform="scale(1.1) translate(-1,-1)"/><path d="M1 13l2-6h10l2 6" fill="none" stroke={color} strokeWidth="2"/><circle cx="5.5" cy="16.5" r="2.5" fill={color}/><circle cx="14.5" cy="16.5" r="2.5" fill={color}/></>,
    people: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" fill="none" stroke={color} strokeWidth="2"/><circle cx="9" cy="7" r="4" fill="none" stroke={color} strokeWidth="2"/><path d="M23 21v-2a4 4 0 0 0-3-3.87" fill="none" stroke={color} strokeWidth="2"/><path d="M16 3.13a4 4 0 0 1 0 7.75" fill="none" stroke={color} strokeWidth="2"/></>,
    close: <><line x1="18" y1="6" x2="6" y2="18" stroke={color} strokeWidth="2"/><line x1="6" y1="6" x2="18" y2="18" stroke={color} strokeWidth="2"/></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{display:"block",flexShrink:0}}>
      {icons[name] || null}
    </svg>
  );
};

// ---- COIN BADGE ----
const CoinBadge = ({ points }) => (
  <div style={{display:"flex",alignItems:"center",gap:4,background:COLORS.yellowLight,border:`1.5px solid ${COLORS.yellow}`,borderRadius:20,padding:"4px 10px"}}>
    <div style={{width:16,height:16,borderRadius:"50%",background:COLORS.yellow,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:800,color:COLORS.dark}}>⭐</div>
    <span style={{fontWeight:800,fontSize:13,color:COLORS.dark}}>{points}</span>
  </div>
);

// ---- PROGRESS BAR ----
const ProgressBar = ({ pct, color = COLORS.blue, height = 8 }) => (
  <div style={{background:COLORS.grayLight,borderRadius:99,overflow:"hidden",height}}>
    <div style={{width:`${pct}%`,background:color,height:"100%",borderRadius:99,transition:"width 0.6s ease"}}/>
  </div>
);

// ---- BOTTOM NAV ----
const BottomNav = ({ current, onNav }) => {
  const tabs = [
    {id:"home",icon:"home",label:"Inicio"},
    {id:"map",icon:"map",label:"Mapa"},
    {id:"report",icon:"camera",label:"Reportar"},
    {id:"ranking",icon:"trophy",label:"Ranking"},
    {id:"profile",icon:"user",label:"Perfil"},
  ];
  return (
    <div style={{display:"flex",background:COLORS.white,borderTop:`1px solid ${COLORS.grayLight}`,paddingBottom:8,paddingTop:4,boxShadow:"0 -2px 16px rgba(0,0,0,0.06)"}}>
      {tabs.map(t => {
        const isReport = t.id === "report";
        const active = current === t.id;
        return (
          <button key={t.id} onClick={() => onNav(t.id)}
            style={{flex:1,background:"none",border:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:isReport?0:2,padding:0,position:"relative",top:isReport?-18:0}}>
            {isReport ? (
              <div style={{width:52,height:52,borderRadius:"50%",background:`linear-gradient(135deg, ${COLORS.blue}, ${COLORS.blueMid})`,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:`0 4px 16px ${COLORS.blue}55`}}>
                <Icon name="camera" size={24} color={COLORS.white}/>
              </div>
            ) : (
              <Icon name={t.icon} size={22} color={active ? COLORS.blue : COLORS.gray}/>
            )}
            <span style={{fontSize:isReport?11:10,fontWeight:active||isReport?700:500,color:isReport?COLORS.blue:active?COLORS.blue:COLORS.gray}}>{t.label}</span>
          </button>
        );
      })}
    </div>
  );
};

// ---- CARD ----
const Card = ({ children, style = {}, onClick }) => (
  <div onClick={onClick} style={{background:COLORS.white,borderRadius:20,padding:16,boxShadow:"0 2px 16px rgba(21,101,192,0.08)",cursor:onClick?"pointer":"default",...style}}>
    {children}
  </div>
);

// ===== SCREENS =====

// 1. SPLASH
const SplashScreen = ({ onDone }) => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setProgress(p => { if(p>=100){clearInterval(t);onDone();return 100;}return p+2;}), 40);
    return () => clearInterval(t);
  }, []);
  return (
    <div style={{flex:1,background:`linear-gradient(170deg, ${COLORS.dark} 0%, #0a2a5e 60%, ${COLORS.blue} 100%)`,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:0,position:"relative",overflow:"hidden"}}>
      {/* City silhouette */}
      <svg width="100%" viewBox="0 0 390 120" style={{position:"absolute",bottom:0,left:0}} preserveAspectRatio="none">
        <rect x="0" y="60" width="390" height="60" fill="#0a1f3d" opacity="0.7"/>
        {[20,60,100,140,180,220,260,300,340].map((x,i)=>(
          <rect key={i} x={x} y={40-i*3%25} width={18+i*2%12} height={30+i*4%30} rx="2" fill={`rgba(30,80,180,${0.4+i*0.05})`}/>
        ))}
        {/* signal lights */}
        {[50,150,250,350].map((x,i)=>(
          <g key={i}>
            <line x1={x} y1="30" x2={x} y2="70" stroke="#1E88E5" strokeWidth="2" opacity="0.5"/>
            <circle cx={x} cy="28" r="4" fill={i%2===0?"#FFD600":"#EF5350"} opacity="0.9"/>
          </g>
        ))}
        {/* mototaxi */}
        <g transform="translate(280,52)">
          <rect x="0" y="8" width="28" height="14" rx="4" fill="#FFD600" opacity="0.9"/>
          <rect x="6" y="2" width="16" height="9" rx="3" fill="#FFD600" opacity="0.7"/>
          <circle cx="5" cy="22" r="4" fill="#333"/>
          <circle cx="23" cy="22" r="4" fill="#333"/>
        </g>
      </svg>
      {/* Floating icons */}
      {[{icon:"🚦",x:30,y:80},{icon:"⚠️",x:310,y:120},{icon:"🛵",x:60,y:160},{icon:"🚸",x:290,y:60}].map((fi,i)=>(
        <div key={i} style={{position:"absolute",left:fi.x,top:fi.y,fontSize:20,opacity:0.25,animation:`float${i} 3s ease-in-out infinite`,animationDelay:`${i*0.5}s`}}>{fi.icon}</div>
      ))}
      <style>{`
        @keyframes pulseScale { 0%,100%{transform:scale(1)}50%{transform:scale(1.06)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)} }
      `}</style>
      {/* Logo */}
      <div style={{animation:"pulseScale 2s ease-in-out infinite",marginBottom:12,zIndex:2}}>
        <div style={{width:90,height:90,borderRadius:24,background:`linear-gradient(135deg, ${COLORS.yellow}, #FFA000)`,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:`0 8px 32px ${COLORS.yellow}66`,margin:"0 auto"}}>
          <span style={{fontSize:44}}>🛣️</span>
        </div>
      </div>
      <div style={{animation:"fadeUp 0.8s ease 0.3s both",zIndex:2,textAlign:"center"}}>
        <div style={{fontSize:38,fontWeight:900,color:COLORS.white,letterSpacing:-1,lineHeight:1}}>VialApp</div>
        <div style={{fontSize:12,fontWeight:600,color:COLORS.yellow,letterSpacing:3,marginTop:2}}>ANDAHUAYLAS · APURÍMAC</div>
      </div>
      <div style={{animation:"fadeUp 0.8s ease 0.6s both",zIndex:2,marginTop:16,textAlign:"center",padding:"0 40px"}}>
        <div style={{fontSize:15,color:"rgba(255,255,255,0.8)",fontWeight:500,fontStyle:"italic"}}>"Aprende cultura vial participando"</div>
      </div>
      <div style={{animation:"fadeUp 0.8s ease 1s both",zIndex:2,width:"75%",marginTop:36}}>
        <ProgressBar pct={progress} color={COLORS.yellow} height={5}/>
        <div style={{textAlign:"center",marginTop:8,fontSize:12,color:"rgba(255,255,255,0.5)",fontWeight:600}}>CARGANDO... {progress}%</div>
      </div>
      <div style={{position:"absolute",bottom:20,zIndex:2,display:"flex",gap:6}}>
        {["🤖","🎮","📍","🏆"].map((e,i)=><span key={i} style={{fontSize:16,opacity:0.5}}>{e}</span>)}
      </div>
    </div>
  );
};

// 2. HOME
const HomeScreen = ({ onNav }) => {
  const [activeCard, setActiveCard] = useState(null);
  const quickActions = [
    {id:"trivia",icon:"⚡",label:"Trivias",color:COLORS.yellow,textColor:COLORS.dark},
    {id:"game",icon:"🎮",label:"Juego",color:COLORS.blue,textColor:COLORS.white},
    {id:"ranking",icon:"🏆",label:"Ranking",color:COLORS.green,textColor:COLORS.white},
    {id:"map",icon:"📍",label:"Mapa Vial",color:COLORS.orange,textColor:COLORS.white},
  ];
  const tips = [
    {emoji:"🚸",title:"Zona Escolar",subtitle:"Velocidad máx. 30 km/h","tag":"SEGURIDAD",tagColor:COLORS.red},
    {emoji:"🛵",title:"Mototaxis en Andahuaylas",subtitle:"Deben circular por carriles habilitados","tag":"LOCAL",tagColor:COLORS.blue},
    {emoji:"🚦",title:"Semáforo en rojo",subtitle:"Detente completamente antes de la línea","tag":"NORMA",tagColor:COLORS.green},
  ];
  const weekTop = [{name:"Carlos R.",pts:1240,emoji:"🥇"},{name:"María Q.",pts:1100,emoji:"🥈"},{name:"Tú",pts:870,emoji:"🥉"}];
  return (
    <div style={{flex:1,overflowY:"auto",background:COLORS.bg,paddingBottom:16}}>
      {/* Header */}
      <div style={{background:`linear-gradient(135deg, ${COLORS.dark} 0%, ${COLORS.blue} 100%)`,padding:"48px 20px 28px",borderBottomLeftRadius:28,borderBottomRightRadius:28,position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",right:-20,top:-20,width:120,height:120,borderRadius:"50%",background:"rgba(255,214,0,0.12)"}}/>
        <div style={{position:"absolute",right:20,top:20,width:60,height:60,borderRadius:"50%",background:"rgba(255,214,0,0.08)"}}/>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",position:"relative"}}>
          <div>
            <div style={{fontSize:13,color:"rgba(255,255,255,0.65)",fontWeight:500}}>¡Buenos días 👋</div>
            <div style={{fontSize:22,fontWeight:800,color:COLORS.white,marginTop:2}}>Conductor Vial</div>
            <div style={{display:"flex",alignItems:"center",gap:6,marginTop:8}}>
              <div style={{background:COLORS.yellow,borderRadius:12,padding:"3px 10px",fontSize:11,fontWeight:800,color:COLORS.dark}}>NIVEL 5 · EXPERTO</div>
            </div>
          </div>
          <CoinBadge points={870}/>
        </div>
        <div style={{marginTop:16,position:"relative"}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
            <span style={{fontSize:12,color:"rgba(255,255,255,0.7)",fontWeight:600}}>Progreso al siguiente nivel</span>
            <span style={{fontSize:12,color:COLORS.yellow,fontWeight:700}}>870 / 1000 XP</span>
          </div>
          <ProgressBar pct={87} color={COLORS.yellow} height={10}/>
        </div>
      </div>

      <div style={{padding:"16px 16px 0"}}>
        {/* Quick Actions */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16}}>
          {quickActions.map(a => (
            <button key={a.id} onClick={() => onNav(a.id)}
              style={{background:a.color,border:"none",borderRadius:18,padding:"14px 10px",display:"flex",flexDirection:"column",alignItems:"center",gap:6,cursor:"pointer",boxShadow:`0 4px 12px ${a.color}55`,transition:"transform 0.1s",transform:activeCard===a.id?"scale(0.96)":"scale(1)"}}
              onMouseDown={()=>setActiveCard(a.id)} onMouseUp={()=>setActiveCard(null)}>
              <span style={{fontSize:26}}>{a.icon}</span>
              <span style={{fontSize:13,fontWeight:800,color:a.textColor}}>{a.label}</span>
            </button>
          ))}
        </div>

        {/* Report Button */}
        <button onClick={() => onNav("report")}
          style={{width:"100%",background:`linear-gradient(135deg, ${COLORS.blue}, #0D47A1)`,border:"none",borderRadius:20,padding:"18px",display:"flex",alignItems:"center",justifyContent:"center",gap:12,cursor:"pointer",boxShadow:`0 6px 24px ${COLORS.blue}44`,marginBottom:16}}>
          <div style={{width:36,height:36,borderRadius:"50%",background:"rgba(255,255,255,0.2)",display:"flex",alignItems:"center",justifyContent:"center"}}>
            <Icon name="camera" size={20} color={COLORS.white}/>
          </div>
          <div style={{textAlign:"left"}}>
            <div style={{fontSize:16,fontWeight:800,color:COLORS.white}}>📸 Reportar Situación Vial</div>
            <div style={{fontSize:11,color:"rgba(255,255,255,0.7)",fontWeight:500}}>Gana puntos ayudando a tu comunidad</div>
          </div>
          <Icon name="arrow" size={18} color="rgba(255,255,255,0.7)"/>
        </button>

        {/* Weekly Ranking */}
        <Card style={{marginBottom:16}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
            <div style={{fontSize:15,fontWeight:800,color:COLORS.dark}}>🏆 Ranking Semanal</div>
            <button onClick={() => onNav("ranking")} style={{background:"none",border:"none",cursor:"pointer",fontSize:12,color:COLORS.blue,fontWeight:700}}>Ver todo</button>
          </div>
          {weekTop.map((u,i) => (
            <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderBottom:i<2?`1px solid ${COLORS.grayLight}`:"none"}}>
              <span style={{fontSize:20}}>{u.emoji}</span>
              <div style={{flex:1}}>
                <div style={{fontSize:14,fontWeight:700,color:u.name==="Tú"?COLORS.blue:COLORS.dark}}>{u.name}</div>
                <ProgressBar pct={(u.pts/1240)*100} color={i===0?COLORS.yellow:i===1?COLORS.gray:COLORS.blue} height={4}/>
              </div>
              <CoinBadge points={u.pts}/>
            </div>
          ))}
        </Card>

        {/* Tips */}
        <div style={{fontSize:15,fontWeight:800,color:COLORS.dark,marginBottom:10}}>📚 Tips del Día</div>
        <div style={{display:"flex",gap:10,overflowX:"auto",paddingBottom:8}}>
          {tips.map((tip,i) => (
            <div key={i} style={{minWidth:160,background:COLORS.white,borderRadius:18,padding:14,boxShadow:"0 2px 12px rgba(0,0,0,0.07)",flexShrink:0}}>
              <div style={{fontSize:28,marginBottom:6}}>{tip.emoji}</div>
              <div style={{fontSize:11,fontWeight:800,color:tip.tagColor,marginBottom:4,letterSpacing:1}}>{tip.tag}</div>
              <div style={{fontSize:13,fontWeight:700,color:COLORS.dark,lineHeight:1.3,marginBottom:4}}>{tip.title}</div>
              <div style={{fontSize:11,color:COLORS.gray,lineHeight:1.4}}>{tip.subtitle}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// 3. REPORT
const ReportScreen = ({ onNav }) => {
  const [step, setStep] = useState("input"); // input | analyzing | done
  const [comment, setComment] = useState("");
  const [photo, setPhoto] = useState(false);
  const [video, setVideo] = useState(false);
  const [progress, setProgress] = useState(0);
  const [aiLogs, setAiLogs] = useState([]);

  const logSteps = [
    {p: 10, text: "🔍 Cargando imagen en buffer..."},
    {p: 25, text: "🧠 Inicializando modelo VialVision v2.1..."},
    {p: 40, text: "🚗 Detectando vehículos y peatones..."},
    {p: 55, text: "📐 Calculando distancias de seguridad..."},
    {p: 70, text: "📋 Comparando con Reglamento Nacional (RNT)..."},
    {p: 85, text: "⚠️ Evaluando nivel de riesgo crítico..."},
    {p: 95, text: "✅ Generando veredicto legal..."},
  ];

  useEffect(() => {
    if (step === "analyzing") {
      const currentLog = logSteps.find(ls => progress >= ls.p && !aiLogs.includes(ls.text));
      if (currentLog) {
        setAiLogs(prev => [...prev, currentLog.text]);
      }
    }
  }, [progress, step]);

  const analyze = () => {
    if (!comment) return;
    setStep("analyzing");
    setAiLogs([]);
    let p = 0;
    const t = setInterval(() => {
      p += 2;
      setProgress(p);
      if (p >= 100) { 
        clearInterval(t); 
        setTimeout(() => onNav("result"), 600); 
      }
    }, 80);
  };

  return (
    <div style={{flex:1,overflowY:"auto",background:COLORS.bg,paddingBottom:16}}>
      <div style={{background:`linear-gradient(135deg, ${COLORS.blue}, #0D47A1)`,padding:"48px 20px 24px",borderBottomLeftRadius:28,borderBottomRightRadius:28}}>
        <button onClick={() => onNav("home")} style={{background:"rgba(255,255,255,0.2)",border:"none",borderRadius:12,padding:"6px 14px",color:COLORS.white,fontSize:13,fontWeight:700,cursor:"pointer",marginBottom:12}}>← Volver</button>
        <div style={{fontSize:22,fontWeight:900,color:COLORS.white}}>📸 Reportar Situación</div>
        <div style={{fontSize:13,color:"rgba(255,255,255,0.7)",marginTop:4}}>Ayuda a mejorar la vialidad en Andahuaylas</div>
      </div>

      {step === "analyzing" ? (
        <div style={{padding:20,textAlign:"center"}}>
          {/* Scanning Simulation Area */}
          <div style={{position:"relative",width:"100%",height:220,background:"#000",borderRadius:20,overflow:"hidden",marginBottom:20,border:`2px solid ${COLORS.blue}55`}}>
            <div className="scanner-line"/>
            
            {/* Mock Image for Scanning */}
            <div style={{width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center",opacity:0.6}}>
              <span style={{fontSize:80}}>🛵</span>
            </div>

            {/* AI Bounding Boxes appearing at certain progress */}
            {progress > 30 && (
              <div className="ai-box" style={{top:"40%",left:"30%",width:120,height:80}}>
                <div className="ai-label">MOTOTAXI ID: 442 [99%]</div>
              </div>
            )}
            {progress > 60 && (
              <div className="ai-box" style={{top:"65%",left:"10%",width:280,height:40,borderColor:COLORS.red,background:"rgba(239, 83, 80, 0.1)"}}>
                <div className="ai-label" style={{background:COLORS.red}}>OBSTRUCCIÓN VEREDA [HIGH]</div>
              </div>
            )}

            <div style={{position:"absolute",top:10,left:10,background:"rgba(0,0,0,0.6)",padding:"4px 8px",borderRadius:4,color:COLORS.green,fontSize:10,fontFamily:"monospace",textAlign:"left"}}>
              {">"} SYSTEM_BOOT: OK<br/>
              {">"} GPU_ACCEL: ACTIVE<br/>
              {">"} VIAL_DB: CONNECTED
            </div>
          </div>

          <div style={{textAlign:"left",background:COLORS.dark,borderRadius:16,padding:16,boxShadow:"0 8px 32px rgba(0,0,0,0.2)"}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
              <div style={{width:8,height:8,borderRadius:"50%",background:COLORS.green,animation:"blink 1s infinite"}}/>
              <span style={{fontSize:12,fontWeight:800,color:COLORS.white,letterSpacing:1}}>PROCESAMIENTO IA</span>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:8,minHeight:140}}>
              {aiLogs.map((log, i) => (
                <div key={i} style={{fontSize:12,color:i === aiLogs.length-1 ? COLORS.blueMid : "rgba(255,255,255,0.6)",fontWeight:600,animation:"floatIn 0.3s ease-out"}}>
                  {i === aiLogs.length-1 ? "➜ " : "✓ "} {log}
                </div>
              ))}
            </div>
            <div style={{marginTop:16}}>
              <ProgressBar pct={progress} color={COLORS.blue} height={6}/>
              <div style={{textAlign:"right",fontSize:10,color:COLORS.gray,marginTop:4,fontWeight:700}}>{progress}%</div>
            </div>
          </div>
        </div>
      ) : (
        <div style={{padding:16}}>
          {/* Upload area */}
          <Card style={{marginBottom:12}}>
            <div style={{fontSize:14,fontWeight:800,color:COLORS.dark,marginBottom:10}}>📁 Adjuntar evidencia</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              <button onClick={() => setPhoto(!photo)} style={{background:photo?COLORS.blueLight:COLORS.grayLight,border:`2px ${photo?"solid":"dashed"} ${photo?COLORS.blue:COLORS.gray}`,borderRadius:16,padding:16,cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:6,transition:"all 0.2s"}}>
                <Icon name="camera" size={28} color={photo?COLORS.blue:COLORS.gray}/>
                <span style={{fontSize:12,fontWeight:700,color:photo?COLORS.blue:COLORS.gray}}>{photo?"✅ Foto lista":"Subir Foto"}</span>
              </button>
              <button onClick={() => setVideo(!video)} style={{background:video?COLORS.blueLight:COLORS.grayLight,border:`2px ${video?"solid":"dashed"} ${video?COLORS.blue:COLORS.gray}`,borderRadius:16,padding:16,cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:6,transition:"all 0.2s"}}>
                <Icon name="video" size={28} color={video?COLORS.blue:COLORS.gray}/>
                <span style={{fontSize:12,fontWeight:700,color:video?COLORS.blue:COLORS.gray}}>{video?"✅ Video listo":"Grabar Video"}</span>
                {video && <span style={{fontSize:10,color:COLORS.gray}}>máx. 10 seg</span>}
              </button>
            </div>
            {photo && (
              <div style={{marginTop:10,background:`linear-gradient(135deg, #E3F2FD, #BBDEFB)`,borderRadius:12,padding:12,textAlign:"center",fontSize:13,color:COLORS.blue,fontWeight:600}}>
                🖼️ Simulando: Vehículo sobre vereda — Jr. Ramos Larrea, Andahuaylas
              </div>
            )}
          </Card>

          {/* Comment */}
          <Card style={{marginBottom:12}}>
            <div style={{fontSize:14,fontWeight:800,color:COLORS.dark,marginBottom:4}}>📝 Descripción <span style={{color:COLORS.red}}>*</span></div>
            <div style={{fontSize:11,color:COLORS.gray,marginBottom:8}}>Cuéntanos qué está pasando (obligatorio)</div>
            <textarea
              value={comment}
              onChange={e => setComment(e.target.value)}
              placeholder="Ej: Mototaxi estacionado sobre la vereda en la av. Andahuaylas, impidiendo el paso de peatones..."
              style={{width:"100%",border:`1.5px solid ${comment?COLORS.blue:COLORS.grayLight}`,borderRadius:12,padding:10,fontSize:13,color:COLORS.dark,background:COLORS.bg,resize:"none",outline:"none",minHeight:80,boxSizing:"border-box",transition:"border 0.2s"}}
            />
          </Card>

          {/* Location */}
          <Card style={{marginBottom:16,background:COLORS.greenLight,borderColor:COLORS.green,border:`1px solid ${COLORS.green}`}}>
            <div style={{display:"flex",gap:10,alignItems:"center"}}>
              <span style={{fontSize:22}}>📍</span>
              <div>
                <div style={{fontSize:13,fontWeight:800,color:COLORS.dark}}>Ubicación detectada</div>
                <div style={{fontSize:12,color:COLORS.green,fontWeight:600}}>Jr. Andahuaylas 245, Andahuaylas — Apurímac</div>
              </div>
            </div>
          </Card>

          {/* Category */}
          <Card style={{marginBottom:16}}>
            <div style={{fontSize:14,fontWeight:800,color:COLORS.dark,marginBottom:10}}>🏷️ Categoría del reporte</div>
            <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
              {["🛵 Mototaxi","🚗 Vehículo","🚶 Peatón","🚧 Obra vial","⚠️ Zona peligrosa"].map((cat,i)=>(
                <button key={i} style={{background:i===0?COLORS.blueLight:COLORS.grayLight,border:`1.5px solid ${i===0?COLORS.blue:COLORS.grayLight}`,borderRadius:99,padding:"6px 12px",fontSize:12,fontWeight:700,color:i===0?COLORS.blue:COLORS.gray,cursor:"pointer"}}>{cat}</button>
              ))}
            </div>
          </Card>

          <button onClick={analyze}
            style={{width:"100%",background:comment?`linear-gradient(135deg, ${COLORS.blue}, #0D47A1)`:`${COLORS.grayLight}`,border:"none",borderRadius:18,padding:"18px",fontSize:16,fontWeight:800,color:comment?COLORS.white:COLORS.gray,cursor:comment?"pointer":"not-allowed",boxShadow:comment?`0 6px 24px ${COLORS.blue}44`:"none",transition:"all 0.3s"}}>
            {comment ? "🤖 Analizar con IA → Ganar puntos" : "Completa la descripción para continuar"}
          </button>
        </div>
      )}
    </div>
  );
};

// 4. RESULT
const ResultScreen = ({ onNav }) => {
  const [showBadge, setShowBadge] = useState(false);
  useEffect(() => { setTimeout(() => setShowBadge(true), 600); }, []);
  return (
    <div style={{flex:1,overflowY:"auto",background:COLORS.bg,paddingBottom:16}}>
      <div style={{background:`linear-gradient(135deg, #1B5E20, ${COLORS.green})`,padding:"48px 20px 24px",borderBottomLeftRadius:28,borderBottomRightRadius:28}}>
        <div style={{fontSize:22,fontWeight:900,color:COLORS.white}}>✅ Análisis Completado</div>
        <div style={{fontSize:13,color:"rgba(255,255,255,0.7)",marginTop:4}}>La IA identificó la situación vial</div>
      </div>
      <div style={{padding:16}}>
        {/* Image */}
        <Card style={{marginBottom:12,overflow:"hidden",padding:0}}>
          <div style={{background:`linear-gradient(135deg, #E3F2FD, #BBDEFB)`,height:140,display:"flex",alignItems:"center",justifyContent:"center",position:"relative"}}>
            <span style={{fontSize:64}}>🛵</span>
            <div style={{position:"absolute",top:10,right:10,background:COLORS.red,borderRadius:99,padding:"4px 10px",fontSize:11,fontWeight:800,color:COLORS.white}}>⚠️ RIESGO ALTO</div>
          </div>
          <div style={{padding:14}}>
            <div style={{fontSize:16,fontWeight:800,color:COLORS.dark,marginBottom:4}}>Mototaxi estacionado en vereda</div>
            <div style={{fontSize:12,color:COLORS.gray}}>Jr. Ramos Larrea s/n · Andahuaylas</div>
          </div>
        </Card>

        {/* AI Result */}
        <Card style={{marginBottom:12,border:`2px solid ${COLORS.red}22`,background:"#FFF9F9"}}>
          <div style={{fontSize:13,fontWeight:800,color:COLORS.red,marginBottom:8,display:"flex",alignItems:"center",gap:6}}>
            <Icon name="alert" size={16} color={COLORS.red}/> INFRACCIÓN DETECTADA
          </div>
          <div style={{fontSize:15,fontWeight:800,color:COLORS.dark,marginBottom:4}}>"Vehículo estacionado sobre vereda peatonal"</div>
          <div style={{fontSize:12,color:COLORS.gray,lineHeight:1.6,marginBottom:10}}>El mototaxi bloquea el paso de peatones, obligándolos a transitar por la calzada vehicular, generando un riesgo de atropello.</div>
          <div style={{background:COLORS.yellowLight,border:`1px solid ${COLORS.yellow}`,borderRadius:12,padding:10}}>
            <div style={{fontSize:11,fontWeight:800,color:COLORS.dark,marginBottom:2}}>📋 NORMA INFRINGIDA</div>
            <div style={{fontSize:12,color:COLORS.dark,fontWeight:600}}>Art. 186° — Reglamento Nacional de Tránsito (DS N° 016-2009-MTC)</div>
            <div style={{fontSize:11,color:COLORS.gray,marginTop:2}}>"Está prohibido estacionar en veredas, bermas o zonas peatonales."</div>
          </div>
        </Card>

        {/* Risk Meter */}
        <Card style={{marginBottom:12}}>
          <div style={{fontSize:14,fontWeight:800,color:COLORS.dark,marginBottom:10}}>📊 Nivel de Riesgo Vial</div>
          {[{label:"Riesgo de atropello",pct:80,color:COLORS.red},{label:"Obstáculo peatonal",pct:90,color:COLORS.orange},{label:"Congestión generada",pct:55,color:COLORS.yellow}].map((r,i)=>(
            <div key={i} style={{marginBottom:8}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
                <span style={{fontSize:12,color:COLORS.dark,fontWeight:600}}>{r.label}</span>
                <span style={{fontSize:12,fontWeight:800,color:r.color}}>{r.pct}%</span>
              </div>
              <ProgressBar pct={r.pct} color={r.color} height={8}/>
            </div>
          ))}
        </Card>

        {/* Points earned */}
        {showBadge && (
          <Card style={{marginBottom:16,background:`linear-gradient(135deg, ${COLORS.yellowLight}, #FFF8E1)`,border:`2px solid ${COLORS.yellow}`,textAlign:"center"}}>
            <div style={{fontSize:32,marginBottom:4}}>🎉</div>
            <div style={{fontSize:18,fontWeight:900,color:COLORS.dark}}>+50 puntos ganados</div>
            <div style={{fontSize:12,color:COLORS.gray,marginTop:2}}>¡Excelente reporte ciudadano!</div>
          </Card>
        )}

        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          <button onClick={() => onNav("trivia")}
            style={{background:`linear-gradient(135deg, ${COLORS.yellow}, #FFA000)`,border:"none",borderRadius:16,padding:"14px",fontSize:14,fontWeight:800,color:COLORS.dark,cursor:"pointer",boxShadow:`0 4px 16px ${COLORS.yellow}66`}}>
            ⚡ Responder Trivia
          </button>
          <button onClick={() => onNav("home")}
            style={{background:COLORS.grayLight,border:"none",borderRadius:16,padding:"14px",fontSize:14,fontWeight:800,color:COLORS.dark,cursor:"pointer"}}>
            Continuar →
          </button>
        </div>
      </div>
    </div>
  );
};

// 5. TRIVIA
const TriviaScreen = ({ onNav }) => {
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [showPoints, setShowPoints] = useState(false);
  const q = {
    img: "🚸",
    context: "Zona Escolar · Jr. Mariscal Castilla, Andahuaylas",
    question: "Un mototaxi se aproxima a una zona escolar a las 7:30 am. ¿Cuál es la velocidad máxima permitida?",
    options: ["50 km/h","30 km/h","20 km/h"],
    correct: 1,
    explanation: "En zonas escolares, la velocidad máxima es 30 km/h según el Art. 162° del Reglamento Nacional de Tránsito.",
    norm: "Art. 162° RNT — DS N° 016-2009-MTC"
  };
  const choose = (i) => {
    if (answered) return;
    setSelected(i);
    setAnswered(true);
    if (i === q.correct) setTimeout(() => setShowPoints(true), 400);
  };
  const optColors = (i) => {
    if (!answered) return { bg: COLORS.white, border: COLORS.grayLight, text: COLORS.dark };
    if (i === q.correct) return { bg: COLORS.greenLight, border: COLORS.green, text: COLORS.green };
    if (i === selected && i !== q.correct) return { bg: "#FFEBEE", border: COLORS.red, text: COLORS.red };
    return { bg: COLORS.grayLight, border: COLORS.grayLight, text: COLORS.gray };
  };
  return (
    <div style={{flex:1,overflowY:"auto",background:COLORS.bg,paddingBottom:16}}>
      <div style={{background:`linear-gradient(135deg, ${COLORS.dark}, #1565C0)`,padding:"48px 20px 24px",borderBottomLeftRadius:28,borderBottomRightRadius:28}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
          <div style={{fontSize:12,color:"rgba(255,255,255,0.6)",fontWeight:700}}>TRIVIA VIAL · PREGUNTA 3/5</div>
          <CoinBadge points={870}/>
        </div>
        <ProgressBar pct={60} color={COLORS.yellow} height={6}/>
      </div>
      <div style={{padding:16}}>
        {/* Image context */}
        <Card style={{marginBottom:12,textAlign:"center",padding:"20px 16px"}}>
          <div style={{fontSize:64,marginBottom:8}}>{q.img}</div>
          <div style={{fontSize:11,color:COLORS.blue,fontWeight:700,marginBottom:4,letterSpacing:1}}>🏫 SITUACIÓN REAL</div>
          <div style={{fontSize:13,color:COLORS.gray}}>{q.context}</div>
        </Card>

        {/* Question */}
        <div style={{fontSize:16,fontWeight:800,color:COLORS.dark,lineHeight:1.4,marginBottom:14}}>{q.question}</div>

        {/* Options */}
        {q.options.map((opt, i) => {
          const c = optColors(i);
          return (
            <button key={i} onClick={() => choose(i)}
              style={{width:"100%",background:c.bg,border:`2px solid ${c.border}`,borderRadius:16,padding:"14px 16px",marginBottom:10,display:"flex",alignItems:"center",gap:12,cursor:answered?"default":"pointer",textAlign:"left",transition:"all 0.2s",boxShadow:selected===i&&answered?"0 4px 16px rgba(0,0,0,0.08)":"none"}}>
              <div style={{width:32,height:32,borderRadius:"50%",background:c.border,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:800,color:COLORS.white,flexShrink:0}}>
                {answered&&i===q.correct?"✓":answered&&i===selected&&i!==q.correct?"✗":["A","B","C"][i]}
              </div>
              <span style={{fontSize:14,fontWeight:700,color:c.text}}>{opt}</span>
            </button>
          );
        })}

        {answered && (
          <div style={{marginTop:4}}>
            <Card style={{background:selected===q.correct?COLORS.greenLight:"#FFF3E0",border:`2px solid ${selected===q.correct?COLORS.green:COLORS.orange}`}}>
              <div style={{fontSize:16,fontWeight:800,color:selected===q.correct?COLORS.green:COLORS.orange,marginBottom:4}}>
                {selected===q.correct?"🎉 ¡Correcto! +30 puntos":"📚 Respuesta incorrecta"}
              </div>
              <div style={{fontSize:13,color:COLORS.dark,lineHeight:1.5,marginBottom:6}}>{q.explanation}</div>
              <div style={{fontSize:11,color:COLORS.gray,fontWeight:600}}>📋 {q.norm}</div>
            </Card>
            {showPoints && (
              <div style={{textAlign:"center",marginTop:8,fontSize:13,color:COLORS.green,fontWeight:700}}>✨ ¡+30 XP añadidos a tu perfil!</div>
            )}
            <button onClick={() => onNav("home")} style={{width:"100%",marginTop:12,background:`linear-gradient(135deg, ${COLORS.blue}, #0D47A1)`,border:"none",borderRadius:16,padding:"16px",fontSize:15,fontWeight:800,color:COLORS.white,cursor:"pointer",boxShadow:`0 4px 16px ${COLORS.blue}44`}}>
              Siguiente pregunta →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// 6. GAME
const GameScreen = ({ onNav }) => {
  const [phase, setPhase] = useState("scene"); // scene | question | result
  const [selected, setSelected] = useState(null);
  const [timer, setTimer] = useState(100);
  const [isPaused, setIsPaused] = useState(false);
  
  const questions = [
    {
      q:"¿Quién tiene la prioridad de paso?",
      opts:["El mototaxi","El peatón en cruce peatonal","El conductor que lleva apuro"],
      correct:1,
      penalty: "Infracción G-10: No ceder el paso a peatones.",
      fine: "S/ 396.00",
      points: "-50 pts"
    },
    {
      q:"¿Qué debería hacer el conductor?",
      opts:["Acelerar y pasar rápido","Detenerse y ceder el paso","Tocar el claxon para avisar"],
      correct:1,
      penalty: "Infracción M-20: No respetar el cruce peatonal.",
      fine: "S/ 594.00",
      points: "-60 pts"
    },
  ];
  const [qIdx, setQIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [showPenalty, setShowPenalty] = useState(false);

  useEffect(() => {
    let interval;
    if (phase === "scene" && !isPaused) {
      interval = setInterval(() => {
        setTimer(prev => {
          if (prev <= 0) {
            clearInterval(interval);
            handleTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 50); // 5 seconds total
    }
    return () => clearInterval(interval);
  }, [phase, isPaused]);

  const handleTimeUp = () => {
    setSelected(-1); // Timeout
    setShowPenalty(true);
    setIsPaused(true);
  };

  const choose = (i) => {
    if (selected !== null) return;
    setSelected(i);
    setIsPaused(true);
    if (i === questions[qIdx].correct) {
      setScore(s => s + 50);
      setTimeout(() => next(), 1200);
    } else {
      setShowPenalty(true);
    }
  };

  const next = () => {
    if (qIdx < questions.length - 1) {
      setQIdx(qi => qi+1);
      setSelected(null);
      setTimer(100);
      setIsPaused(false);
      setShowPenalty(false);
    } else {
      setPhase("result");
    }
  };

  return (
    <div style={{flex:1,overflowY:"auto",background:COLORS.bg,paddingBottom:16}}>
      <div style={{background:`linear-gradient(135deg, #4A148C, ${COLORS.blue})`,padding:"48px 20px 24px",borderBottomLeftRadius:28,borderBottomRightRadius:28}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div>
            <div style={{fontSize:11,color:"rgba(255,255,255,0.6)",fontWeight:700,letterSpacing:1}}>🎮 SIMULACIÓN VIAL</div>
            <div style={{fontSize:20,fontWeight:900,color:COLORS.white,marginTop:2}}>Cruce Peligroso</div>
          </div>
          <div style={{background:COLORS.yellow,borderRadius:12,padding:"6px 14px",fontWeight:800,fontSize:15,color:COLORS.dark}}>+{score} pts</div>
        </div>
        {phase === "scene" && (
          <div style={{marginTop:12,background:"rgba(255,255,255,0.1)",borderRadius:99,overflow:"hidden",height:6}}>
            <div className="timer-bar" style={{width: `${timer}%`, background: timer < 30 ? COLORS.red : COLORS.yellow}}/>
          </div>
        )}
      </div>

      {phase === "result" ? (
        <div style={{padding:24,textAlign:"center"}}>
          <div style={{fontSize:64,marginBottom:8}}>🏆</div>
          <div style={{fontSize:24,fontWeight:900,color:COLORS.dark}}>¡Simulación completada!</div>
          <div style={{fontSize:16,color:COLORS.blue,fontWeight:700,marginTop:4}}>+{score} puntos ganados</div>
          <div style={{margin:"20px 0"}}>
            <Card>
              <div style={{fontSize:14,fontWeight:700,color:COLORS.dark,marginBottom:8}}>📚 Lo aprendido hoy:</div>
              <div style={{fontSize:13,color:COLORS.gray,lineHeight:1.6}}>• Los peatones en cruce peatonal tienen siempre prioridad.<br/>• El conductor debe detenerse aunque tenga prisa.<br/>• Art. 95° RNT: respetar la preferencia peatonal.</div>
            </Card>
          </div>
          <button onClick={() => onNav("home")} style={{width:"100%",background:`linear-gradient(135deg, ${COLORS.blue}, #0D47A1)`,border:"none",borderRadius:16,padding:"16px",fontSize:15,fontWeight:800,color:COLORS.white,cursor:"pointer"}}>
            Volver al inicio 🏠
          </button>
        </div>
      ) : (
        <div style={{padding:16}}>
          {/* Scene */}
          <Card style={{marginBottom:12,padding:0,overflow:"hidden",position:"relative"}}>
            <div style={{background:"linear-gradient(180deg, #87CEEB 0%, #B0D8F0 40%, #8B7355 100%)",height:180,position:"relative",display:"flex",alignItems:"flex-end",justifyContent:"center"}}>
              {/* Road */}
              <div style={{position:"absolute",bottom:0,left:0,right:0,height:70,background:"#555",display:"flex",alignItems:"center",justifyContent:"center"}}>
                <div style={{height:4,width:"100%",background:`repeating-linear-gradient(90deg, ${COLORS.yellow} 0, ${COLORS.yellow} 30px, transparent 30px, transparent 60px)`}}/>
              </div>
              {/* Zebra crossing */}
              <div style={{position:"absolute",bottom:0,left:"50%",transform:"translateX(-50%)",width:60,height:70,background:"repeating-linear-gradient(90deg, white 0, white 8px, transparent 8px, transparent 16px)",opacity:0.8}}/>
              {/* Mototaxi */}
              <div style={{position:"absolute",left:30,bottom:25,fontSize:32,transition:"transform 1s",transform:selected===1?"translateX(200px)":"none"}}>🛵</div>
              {/* Pedestrian */}
              <div style={{position:"absolute",left:"50%",bottom:60,transform:"translateX(-50%)",fontSize:28,animation:selected===1?"none":"blink 1s infinite"}}>🚶</div>
              {/* School sign */}
              <div style={{position:"absolute",right:16,bottom:70,fontSize:22}}>🏫</div>
              
              {selected === 1 && <div style={{position:"absolute",top:"20%",fontSize:40,animation:"floatIn 0.5s forwards"}}>✅</div>}
              {(selected === 0 || selected === 2 || selected === -1) && <div style={{position:"absolute",top:"20%",fontSize:40,animation:"floatIn 0.5s forwards"}}>❌</div>}
            </div>
            <div style={{padding:12,background:`${COLORS.yellowLight}`,display:"flex",gap:8,alignItems:"center"}}>
              <span style={{fontSize:18}}>ℹ️</span>
              <div style={{fontSize:12,color:COLORS.dark,fontWeight:600}}>
                {selected === -1 ? "¡SE ACABÓ EL TIEMPO! No tomaste una decisión." : "Mototaxi se aproxima a cruce peatonal. ¿Qué haces?"}
              </div>
            </div>
          </Card>

          {/* Question */}
          <div style={{fontSize:15,fontWeight:800,color:COLORS.dark,marginBottom:12,lineHeight:1.4}}>
            Escenario {qIdx+1}/{questions.length}: {questions[qIdx].q}
          </div>
          {questions[qIdx].opts.map((opt, i) => {
            let bg = COLORS.white, border = COLORS.grayLight, textC = COLORS.dark;
            if (selected !== null) {
              if (i === questions[qIdx].correct) { bg = COLORS.greenLight; border = COLORS.green; textC = COLORS.green; }
              else if (i === selected) { bg = "#FFEBEE"; border = COLORS.red; textC = COLORS.red; }
              else { bg = COLORS.grayLight; textC = COLORS.gray; }
            }
            return (
              <button key={i} onClick={() => selected===null&&choose(i)}
                style={{width:"100%",background:bg,border:`2px solid ${border}`,borderRadius:16,padding:"14px 16px",marginBottom:10,display:"flex",alignItems:"center",gap:12,cursor:"pointer",textAlign:"left",transition:"all 0.2s"}}>
                <div style={{width:28,height:28,borderRadius:"50%",background:border,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:800,color:COLORS.white,flexShrink:0}}>
                  {selected!==null&&i===questions[qIdx].correct?"✓":selected===i&&i!==questions[qIdx].correct?"✗":["A","B","C"][i]}
                </div>
                <span style={{fontSize:14,fontWeight:700,color:textC}}>{opt}</span>
              </button>
            );
          })}

          {showPenalty && (
            <div style={{marginTop:8,animation:"floatIn 0.4s ease-out"}}>
              <Card style={{background:"#FFF9F9",border:`2px solid ${COLORS.red}`,padding:16}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
                  <div style={{background:COLORS.red,color:COLORS.white,padding:"4px 12px",borderRadius:8,fontSize:12,fontWeight:900}}>PAPELETA VIRTUAL</div>
                  <span style={{fontSize:14,fontWeight:800,color:COLORS.red}}>FALLO CRÍTICO</span>
                </div>
                <div style={{fontSize:15,fontWeight:800,color:COLORS.dark,marginBottom:4}}>{questions[qIdx].penalty}</div>
                <div style={{display:"flex",justifyContent:"space-between",marginTop:12,background:"rgba(239, 83, 80, 0.05)",padding:10,borderRadius:10}}>
                  <div>
                    <div style={{fontSize:10,color:COLORS.gray,fontWeight:700}}>MULTA ESTIMADA</div>
                    <div style={{fontSize:16,fontWeight:900,color:COLORS.red}}>{questions[qIdx].fine}</div>
                  </div>
                  <div style={{textAlign:"right"}}>
                    <div style={{fontSize:10,color:COLORS.gray,fontWeight:700}}>PUNTOS LICENCIA</div>
                    <div style={{fontSize:16,fontWeight:900,color:COLORS.red}}>{questions[qIdx].points}</div>
                  </div>
                </div>
                <button onClick={next} style={{width:"100%",marginTop:16,background:COLORS.dark,color:COLORS.white,border:"none",borderRadius:12,padding:12,fontWeight:800,cursor:"pointer"}}>
                  Reintentar siguiente escenario →
                </button>
              </Card>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// 7. RANKING
const RankingScreen = () => {
  const users = [
    {pos:1,name:"Carlos Quispe",city:"Andahuaylas",pts:2340,badge:"🏅",level:"Experto"},
    {pos:2,name:"María Condori",city:"Talavera",pts:2100,badge:"🥈",level:"Avanzado"},
    {pos:3,name:"Juan Medina",city:"San Jerónimo",pts:1890,badge:"🥉",level:"Avanzado"},
    {pos:4,name:"Tú",city:"Andahuaylas",pts:870,badge:"⭐",level:"Intermedio"},
    {pos:5,name:"Rosa Vilca",city:"Andahuaylas",pts:760,badge:"🔵",level:"Básico"},
    {pos:6,name:"Pedro Huanca",city:"Kishuara",pts:650,badge:"⚪",level:"Básico"},
  ];
  const badges = [{e:"🛡️",n:"Guardián Vial"},{e:"📸",n:"Reportero Pro"},{e:"🎓",n:"Trivia Master"},{e:"🌟",n:"Ciudadano VIP"},{e:"🏫",n:"Zona Escolar"},{e:"🛵",n:"Mototaxi Safe"}];
  return (
    <div style={{flex:1,overflowY:"auto",background:COLORS.bg,paddingBottom:16}}>
      <div style={{background:`linear-gradient(135deg, ${COLORS.dark}, #B71C1C)`,padding:"48px 20px 24px",borderBottomLeftRadius:28,borderBottomRightRadius:28}}>
        <div style={{fontSize:22,fontWeight:900,color:COLORS.white}}>🏆 Ranking Semanal</div>
        <div style={{fontSize:13,color:"rgba(255,255,255,0.7)",marginTop:4}}>Provincia de Andahuaylas · Semana 20</div>
        <div style={{display:"flex",gap:8,marginTop:12}}>
          {["Semanal","Mensual","General"].map((t,i) => (
            <button key={i} style={{background:i===0?"rgba(255,255,255,0.2)":"transparent",border:`1px solid rgba(255,255,255,${i===0?0.5:0.2})`,borderRadius:99,padding:"4px 12px",color:COLORS.white,fontSize:12,fontWeight:700,cursor:"pointer"}}>{t}</button>
          ))}
        </div>
      </div>
      <div style={{padding:16}}>
        {/* Top 3 podium */}
        <div style={{display:"flex",alignItems:"flex-end",justifyContent:"center",gap:8,marginBottom:16,height:100}}>
          {[users[1],users[0],users[2]].map((u,i) => {
            const heights = [75,100,60];
            const colors = [COLORS.gray,"#FFD700","#CD7F32"];
            return (
              <div key={i} style={{flex:1,background:colors[i],borderRadius:"12px 12px 0 0",height:heights[i],display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"flex-start",paddingTop:8,maxWidth:100}}>
                <span style={{fontSize:20}}>{u.badge}</span>
                <div style={{fontSize:11,fontWeight:800,color:COLORS.white,textAlign:"center",lineHeight:1.2,padding:"0 4px"}}>{u.name.split(" ")[0]}</div>
              </div>
            );
          })}
        </div>

        {/* List */}
        <Card style={{marginBottom:16}}>
          {users.map((u,i) => (
            <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 0",borderBottom:i<users.length-1?`1px solid ${COLORS.grayLight}`:"none",background:u.name==="Tú"?COLORS.blueLight:"transparent",margin:u.name==="Tú"?"-1px -16px":0,padding:u.name==="Tú"?"10px 16px":"10px 0"}}>
              <div style={{width:28,height:28,borderRadius:"50%",background:u.pos<=3?[COLORS.yellow,COLORS.gray,"#CD7F32"][u.pos-1]:COLORS.grayLight,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:900,color:u.pos<=3?COLORS.dark:COLORS.gray,flexShrink:0}}>
                {u.pos}
              </div>
              <div style={{flex:1}}>
                <div style={{fontSize:14,fontWeight:u.name==="Tú"?800:700,color:u.name==="Tú"?COLORS.blue:COLORS.dark}}>{u.name} {u.name==="Tú"?"← Tú":""}</div>
                <div style={{fontSize:11,color:COLORS.gray}}>{u.city} · {u.level}</div>
              </div>
              <CoinBadge points={u.pts}/>
            </div>
          ))}
        </Card>

        {/* Badges */}
        <div style={{fontSize:15,fontWeight:800,color:COLORS.dark,marginBottom:10}}>🎖️ Insignias de la Semana</div>
        <div style={{display:"flex",gap:10,overflowX:"auto",paddingBottom:8}}>
          {badges.map((b,i) => (
            <div key={i} style={{minWidth:72,background:COLORS.white,borderRadius:16,padding:"12px 8px",textAlign:"center",boxShadow:"0 2px 10px rgba(0,0,0,0.1)",flexShrink:0,opacity:i<4?1:0.45}}>
              <div style={{fontSize:26,marginBottom:4}}>{b.e}</div>
              <div style={{fontSize:10,fontWeight:700,color:COLORS.dark,lineHeight:1.2}}>{b.n}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// 8. PROFILE
const ProfileScreen = () => {
  const achievements = [
    {e:"🛡️",n:"Guardián Vial",earned:true},
    {e:"📸",n:"10 Reportes",earned:true},
    {e:"⚡",n:"Trivia Streak",earned:true},
    {e:"🌟",n:"VIP Ciudadano",earned:false},
    {e:"🏆",n:"Top 3 Ranking",earned:false},
    {e:"🎓",n:"Expert Vial",earned:false},
  ];
  const stats = [{label:"Trivias",val:47,icon:"⚡"},{label:"Reportes",val:12,icon:"📸"},{label:"Días activo",val:23,icon:"🔥"},{label:"Normas aprendidas",val:38,icon:"📚"}];
  return (
    <div style={{flex:1,overflowY:"auto",background:COLORS.bg,paddingBottom:16}}>
      <div style={{background:`linear-gradient(135deg, ${COLORS.dark}, ${COLORS.blue})`,padding:"48px 20px 60px",borderBottomLeftRadius:28,borderBottomRightRadius:28,textAlign:"center",position:"relative"}}>
        <div style={{width:80,height:80,borderRadius:"50%",background:`linear-gradient(135deg, ${COLORS.yellow}, #FFA000)`,margin:"0 auto 12px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:38,boxShadow:`0 6px 24px ${COLORS.yellow}66`}}>🧑</div>
        <div style={{fontSize:20,fontWeight:900,color:COLORS.white}}>Conductor Vial</div>
        <div style={{fontSize:12,color:"rgba(255,255,255,0.6)",marginTop:2}}>📍 Andahuaylas, Apurímac</div>
        <div style={{display:"flex",gap:8,justifyContent:"center",marginTop:10}}>
          <div style={{background:COLORS.yellow,borderRadius:12,padding:"4px 12px",fontSize:12,fontWeight:800,color:COLORS.dark}}>NIVEL 5</div>
          <div style={{background:"rgba(255,255,255,0.15)",borderRadius:12,padding:"4px 12px",fontSize:12,fontWeight:700,color:COLORS.white}}>EXPERTO VIAL</div>
        </div>
      </div>

      <div style={{padding:"0 16px 0",marginTop:-24}}>
        <Card style={{marginBottom:14}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
            <div style={{fontSize:14,fontWeight:800,color:COLORS.dark}}>⭐ Progreso al Nivel 6</div>
            <span style={{fontSize:13,fontWeight:800,color:COLORS.blue}}>870 / 1000</span>
          </div>
          <ProgressBar pct={87} color={`linear-gradient(90deg, ${COLORS.blue}, ${COLORS.yellow})`} height={12}/>
          <div style={{fontSize:11,color:COLORS.gray,marginTop:6}}>¡Te faltan 130 puntos para ser MAESTRO VIAL!</div>
        </Card>

        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
          {stats.map((s,i) => (
            <Card key={i} style={{textAlign:"center",padding:"14px 10px"}}>
              <div style={{fontSize:22,marginBottom:4}}>{s.icon}</div>
              <div style={{fontSize:22,fontWeight:900,color:COLORS.blue}}>{s.val}</div>
              <div style={{fontSize:11,color:COLORS.gray,fontWeight:600}}>{s.label}</div>
            </Card>
          ))}
        </div>

        <div style={{fontSize:15,fontWeight:800,color:COLORS.dark,marginBottom:10}}>🏅 Mis Logros</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:14}}>
          {achievements.map((a,i) => (
            <div key={i} style={{background:a.earned?COLORS.blueLight:COLORS.grayLight,borderRadius:16,padding:"12px 8px",textAlign:"center",opacity:a.earned?1:0.5,border:a.earned?`1.5px solid ${COLORS.blue}`:"none"}}>
              <div style={{fontSize:24,marginBottom:4}}>{a.e}</div>
              <div style={{fontSize:10,fontWeight:700,color:a.earned?COLORS.blue:COLORS.gray,lineHeight:1.2}}>{a.n}</div>
            </div>
          ))}
        </div>

        <Card style={{background:`linear-gradient(135deg, ${COLORS.greenLight}, ${COLORS.blueLight})`}}>
          <div style={{fontSize:14,fontWeight:800,color:COLORS.dark,marginBottom:8}}>📈 Actividad reciente</div>
          {[{a:"Reportó zona peligrosa en Jr. Arequipa",t:"Hace 2h",pts:"+50"},
            {a:"Completó trivia de semáforos",t:"Hace 5h",pts:"+30"},
            {a:"Alcanzó Nivel 5",t:"Ayer",pts:"+100"}].map((ac,i) => (
            <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:i<2?`1px solid ${COLORS.blueLight}`:"none",alignItems:"center"}}>
              <div>
                <div style={{fontSize:12,fontWeight:700,color:COLORS.dark}}>{ac.a}</div>
                <div style={{fontSize:10,color:COLORS.gray}}>{ac.t}</div>
              </div>
              <div style={{fontSize:12,fontWeight:800,color:COLORS.green}}>{ac.pts}</div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
};

// 9. MAP
const MapScreen = () => {
  const [activeZone, setActiveZone] = useState(null);
  const zones = [
    {id:1,x:120,y:130,type:"danger",icon:"⚠️",label:"Alto riesgo",place:"Jr. Andahuaylas / Av. Perú",reports:8,color:COLORS.red},
    {id:2,x:200,y:90,type:"school",icon:"🏫",label:"Zona escolar",place:"I.E. María Parado de Bellido",reports:3,color:COLORS.orange},
    {id:3,x:80,y:200,type:"congestion",icon:"🚗",label:"Congestión",place:"Mercado Central",reports:12,color:COLORS.yellow},
    {id:4,x:260,y:160,type:"danger",icon:"⚠️",label:"Vereda bloqueada",place:"Jr. Ramos Larrea",reports:5,color:COLORS.red},
    {id:5,x:150,y:220,type:"safe",icon:"✅",label:"Zona segura",place:"Plaza de Armas",reports:0,color:COLORS.green},
  ];
  const legend = [{c:COLORS.red,l:"Zona peligrosa"},{c:COLORS.orange,l:"Zona escolar"},{c:COLORS.yellow,l:"Congestión"},{c:COLORS.green,l:"Zona segura"}];
  return (
    <div style={{flex:1,display:"flex",flexDirection:"column",background:COLORS.bg}}>
      <div style={{background:`linear-gradient(135deg, ${COLORS.dark}, ${COLORS.blue})`,padding:"48px 20px 18px",borderBottomLeftRadius:24,borderBottomRightRadius:24}}>
        <div style={{fontSize:20,fontWeight:900,color:COLORS.white}}>📍 Mapa de Riesgos Viales</div>
        <div style={{fontSize:12,color:"rgba(255,255,255,0.65)",marginTop:2}}>Andahuaylas, Apurímac · En tiempo real</div>
        <div style={{background:"rgba(255,255,255,0.1)",borderRadius:12,padding:"8px 12px",display:"flex",gap:8,alignItems:"center",marginTop:10}}>
          <span style={{fontSize:16}}>🔍</span>
          <span style={{fontSize:13,color:"rgba(255,255,255,0.7)"}}>Buscar zona o calle...</span>
        </div>
      </div>

      {/* Map canvas */}
      <div style={{flex:1,position:"relative",overflow:"hidden",margin:"12px 16px 0",borderRadius:20,boxShadow:"0 4px 24px rgba(0,0,0,0.12)"}}>
        {/* Map base */}
        <svg width="100%" height="100%" viewBox="0 0 340 280" style={{background:"#E8F0E4",position:"absolute",top:0,left:0}}>
          {/* Background */}
          <rect width="340" height="280" fill="#E8F0E4"/>
          {/* Blocks */}
          {[[30,30,80,60],[150,20,70,50],[250,30,60,70],[20,120,70,60],[140,100,60,50],[230,110,80,50],[30,210,90,50],[160,190,70,60],[270,200,50,60]].map(([x,y,w,h],i)=>(
            <rect key={i} x={x} y={y} width={w} height={h} rx="4" fill={i%3===0?"#DDD8CC":i%3===1?"#D5D0C4":"#E0DBD0"} opacity="0.7"/>
          ))}
          {/* Roads */}
          <rect x="0" y="90" width="340" height="16" fill="#B0AFA0" opacity="0.8"/>
          <rect x="0" y="170" width="340" height="14" fill="#B0AFA0" opacity="0.8"/>
          <rect x="110" y="0" width="14" height="280" fill="#B0AFA0" opacity="0.8"/>
          <rect x="220" y="0" width="14" height="280" fill="#B0AFA0" opacity="0.8"/>
          {/* Road markings */}
          {[30,90,150,210,270].map(x=>(
            <rect key={x} x={x} y="97" width="20" height="3" rx="1" fill="#E8E000" opacity="0.6"/>
          ))}
          {/* Heat zones */}
          <circle cx="120" cy="130" r="35" fill={COLORS.red} opacity="0.15"/>
          <circle cx="80" cy="200" r="30" fill={COLORS.yellow} opacity="0.18"/>
          <circle cx="260" cy="160" r="28" fill={COLORS.red} opacity="0.12"/>
          {/* Labels */}
          <text x="55" y="100" fontSize="6" fill="#666" fontWeight="600">Jr. Andahuaylas</text>
          <text x="55" y="180" fontSize="6" fill="#666" fontWeight="600">Av. Perú</text>
          <text x="115" y="15" fontSize="6" fill="#666" fontWeight="600" transform="rotate(90,115,15)">Jr. Ramos Larrea</text>
        </svg>

        {/* Pins */}
        {zones.map(z => (
          <button key={z.id} onClick={() => setActiveZone(activeZone?.id===z.id?null:z)}
            style={{position:"absolute",left:z.x-16,top:z.y-16,width:32,height:32,borderRadius:"50%",background:z.color,border:`2.5px solid ${COLORS.white}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,cursor:"pointer",boxShadow:`0 2px 12px ${z.color}66`,zIndex:2,transition:"transform 0.1s",transform:activeZone?.id===z.id?"scale(1.3)":"scale(1)"}}>
            {z.icon}
          </button>
        ))}

        {/* Active popup */}
        {activeZone && (
          <div style={{position:"absolute",bottom:12,left:12,right:12,background:COLORS.white,borderRadius:16,padding:14,boxShadow:"0 4px 24px rgba(0,0,0,0.18)",zIndex:10,border:`2px solid ${activeZone.color}`}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
              <div>
                <div style={{fontSize:12,fontWeight:800,color:activeZone.color,letterSpacing:0.5}}>{activeZone.label.toUpperCase()}</div>
                <div style={{fontSize:14,fontWeight:800,color:COLORS.dark,marginTop:2}}>{activeZone.place}</div>
                {activeZone.reports > 0 && <div style={{fontSize:11,color:COLORS.gray,marginTop:2}}>📊 {activeZone.reports} reportes ciudadanos esta semana</div>}
              </div>
              <button onClick={() => setActiveZone(null)} style={{background:"none",border:"none",cursor:"pointer",fontSize:18,color:COLORS.gray}}>×</button>
            </div>
          </div>
        )}

        {/* Legend */}
        <div style={{position:"absolute",top:10,right:10,background:"rgba(255,255,255,0.93)",borderRadius:12,padding:"8px 10px",boxShadow:"0 2px 10px rgba(0,0,0,0.1)"}}>
          {legend.map((l,i) => (
            <div key={i} style={{display:"flex",alignItems:"center",gap:6,marginBottom:i<3?4:0}}>
              <div style={{width:10,height:10,borderRadius:"50%",background:l.c}}/>
              <span style={{fontSize:10,color:COLORS.dark,fontWeight:600}}>{l.l}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Stats bar */}
      <div style={{display:"flex",gap:0,background:COLORS.white,borderTop:`1px solid ${COLORS.grayLight}`,padding:"10px 16px"}}>
        {[{e:"⚠️",n:"13",l:"Zonas riesgo"},{e:"📸",n:"38",l:"Reportes hoy"},{e:"🏫",n:"5",l:"Zonas escolar"},{e:"🚗",n:"3",l:"Congestión"}].map((s,i)=>(
          <div key={i} style={{flex:1,textAlign:"center",borderRight:i<3?`1px solid ${COLORS.grayLight}`:"none"}}>
            <div style={{fontSize:15}}>{s.e}</div>
            <div style={{fontSize:14,fontWeight:900,color:COLORS.blue}}>{s.n}</div>
            <div style={{fontSize:9,color:COLORS.gray,fontWeight:600}}>{s.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ===== MAIN APP =====
export default function App() {
  const [screen, setScreen] = useState("splash");
  const [splashDone, setSplashDone] = useState(false);
  const mainScreens = ["home","report","result","trivia","game","ranking","profile","map"];

  const navTo = (s) => setScreen(s);

  const renderScreen = () => {
    switch(screen) {
      case "splash": return <SplashScreen onDone={() => { setSplashDone(true); setScreen("home"); }}/>;
      case "home": return <HomeScreen onNav={navTo}/>;
      case "report": return <ReportScreen onNav={navTo}/>;
      case "result": return <ResultScreen onNav={navTo}/>;
      case "trivia": return <TriviaScreen onNav={navTo}/>;
      case "game": return <GameScreen onNav={navTo}/>;
      case "ranking": return <RankingScreen/>;
      case "profile": return <ProfileScreen/>;
      case "map": return <MapScreen/>;
      default: return <HomeScreen onNav={navTo}/>;
    }
  };

  const showNav = mainScreens.includes(screen) && screen !== "result" && screen !== "trivia" && screen !== "game";

  return (
    <div style={{display:"flex",justifyContent:"center",alignItems:"center",minHeight:"100vh",background:"linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",fontFamily:"'Segoe UI', system-ui, -apple-system, sans-serif",padding:"20px 0"}}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { display: none; }
        button:active { opacity: 0.85; }

        @keyframes scanLine {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }

        @keyframes floatIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }

        .scanner-line {
          position: absolute;
          left: 0;
          width: 100%;
          height: 3px;
          background: ${COLORS.blue};
          box-shadow: 0 0 15px ${COLORS.blue}, 0 0 5px ${COLORS.blue};
          z-index: 10;
          animation: scanLine 2s linear infinite;
        }

        .ai-box {
          position: absolute;
          border: 2px solid ${COLORS.blue};
          background: rgba(21, 101, 192, 0.1);
          border-radius: 4px;
          animation: floatIn 0.5s ease-out both;
        }

        .ai-label {
          position: absolute;
          top: -20px;
          left: -2px;
          background: ${COLORS.blue};
          color: white;
          font-size: 9px;
          padding: 2px 4px;
          border-radius: 2px;
          font-weight: 800;
          white-space: nowrap;
        }

        .timer-bar {
          height: 4px;
          background: ${COLORS.red};
          transition: width 0.1s linear;
        }
      `}</style>

      {/* Phone frame */}
      <div style={{width:390,height:844,background:COLORS.bg,borderRadius:44,overflow:"hidden",boxShadow:"0 30px 80px rgba(0,0,0,0.6), 0 0 0 10px #1a1a2e, 0 0 0 12px #333",display:"flex",flexDirection:"column",position:"relative"}}>

        {/* Status bar */}
        {screen !== "splash" && (
          <div style={{background:COLORS.dark,padding:"10px 20px 6px",display:"flex",justifyContent:"space-between",alignItems:"center",flexShrink:0}}>
            <span style={{fontSize:12,fontWeight:700,color:COLORS.white}}>9:41</span>
            <div style={{display:"flex",gap:4,alignItems:"center"}}>
              <span style={{fontSize:10,color:COLORS.white}}>📶</span>
              <span style={{fontSize:10,color:COLORS.white}}>🔋</span>
            </div>
          </div>
        )}

        {/* Screen nav pills (top) */}
        {screen !== "splash" && (
          <div style={{background:COLORS.dark,padding:"4px 10px 8px",display:"flex",gap:4,overflowX:"auto",flexShrink:0}}>
            {[{id:"home",l:"🏠"},{id:"report",l:"📸"},{id:"result",l:"✅"},{id:"trivia",l:"⚡"},{id:"game",l:"🎮"},{id:"ranking",l:"🏆"},{id:"profile",l:"👤"},{id:"map",l:"📍"}].map(s=>(
              <button key={s.id} onClick={() => navTo(s.id)}
                style={{background:screen===s.id?COLORS.blue:"rgba(255,255,255,0.1)",border:"none",borderRadius:8,padding:"4px 8px",fontSize:12,color:COLORS.white,cursor:"pointer",fontWeight:screen===s.id?800:400,transition:"all 0.2s",flexShrink:0}}>
                {s.l}
              </button>
            ))}
          </div>
        )}

        {/* Content */}
        <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
          {renderScreen()}
        </div>

        {/* Bottom Nav */}
        {showNav && <BottomNav current={screen} onNav={navTo}/>}

        {/* Home indicator */}
        {screen !== "splash" && (
          <div style={{background:COLORS.white,padding:"6px 0 8px",display:"flex",justifyContent:"center",flexShrink:0}}>
            <div style={{width:120,height:4,background:COLORS.dark,borderRadius:99,opacity:0.2}}/>
          </div>
        )}
      </div>
    </div>
  );
}
