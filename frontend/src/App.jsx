import { useState } from "react";

const C = {
  bg:"#070D1A",bg2:"#0F1838",card:"#0F1E38",card2:"#162540",
  blue:"#4DA6FF",jade:"#00E5A0",warn:"#FFB547",danger:"#FF6B6B",purple:"#B47FFF",
  t1:"#F0F4F8",t2:"#7A99BE",t3:"#3A5070",
};

// ── Translations ──────────────────────────────────────────────────────────────
const T = {
  fr: {
    dir:"ltr", hello:"Bonjour,", balance:"Solde total", income:"Revenus", expenses:"Dépenses",
    add:"Ajouter", budget:"Budget", credit:"Crédit", goals:"Objectifs", history:"Historique",
    notifs:"Notifications", alerts:"alertes", updated:"Mis à jour aujourd'hui",
    thisMonth:"Ce mois", remaining:"Restant", spent:"Dépensé", on:"sur",
    recentTx:"Transactions récentes", seeAll:"Voir tout →",
    addOp:"Ajouter une opération", details:"Détails de l'opération",
    expense:"💸 Dépense", revenue:"💰 Revenu", amount:"Montant", label:"Libellé",
    category:"Catégorie", date:"Date", quickAmt:"Montant rapide",
    continue:"Continuer →", save:"✓ Enregistrer", cancel:"Modifier",
    setBudgets:"Définir vos budgets mensuels", saveBudgets:"✓ Sauvegarder",
    newGoal:"Nouvel objectif d'épargne", target:"Montant cible (MAD)",
    alreadySaved:"Déjà épargné", createGoal:"✓ Créer l'objectif",
    addGoal:"+ Ajouter un objectif", chooseIcon:"Choisir une icône",
    goalName:"Nom de l'objectif", rank:"Classement", thisMonthPts:"Ce mois",
    status:"Statut", excellent:"Excellent", scoreTitle:"Score Credix",
    factors:"Facteurs du score", aiTip:"Conseil Credix IA",
    aiMsg:"Réduire votre utilisation du crédit à 20% pourrait augmenter votre score de",
    aiMsg2:"dans les 30 jours.",
    noTx:"Aucune transaction.\nAppuyez sur ➕ pour commencer.",
    noTxFilter:"Aucune transaction ici.\nAppuyez sur + Ajouter.",
    all:"Toutes", modify:"Modifier ✏️", activeGoals:"objectif(s) actif(s)",
    saved:"Épargné", left:"Restant", placeholderExp:"Ex: Courses Marjane…",
    placeholderInc:"Ex: Salaire Octobre…", placeholderGoal:"Ex: Voyage au Portugal…",
    cats: {
      expense:["Alimentation","Transport","Loisirs","Abonnements","Santé","Logement","Shopping","Éducation","Divers"],
      income:["Salaire","Freelance","Investissement","Remboursement","Autre revenu"],
    },
    factorNames:["Paiements à temps","Utilisation crédit","Ancienneté","Nouvelles demandes","Mix de crédit"],
  },
  en: {
    dir:"ltr", hello:"Hello,", balance:"Total Balance", income:"Income", expenses:"Expenses",
    add:"Add", budget:"Budget", credit:"Credit", goals:"Goals", history:"History",
    notifs:"Notifications", alerts:"alerts", updated:"Updated today",
    thisMonth:"This month", remaining:"Remaining", spent:"Spent", on:"of",
    recentTx:"Recent Transactions", seeAll:"See all →",
    addOp:"Add a transaction", details:"Transaction details",
    expense:"💸 Expense", revenue:"💰 Income", amount:"Amount", label:"Label",
    category:"Category", date:"Date", quickAmt:"Quick amount",
    continue:"Continue →", save:"✓ Save", cancel:"Edit",
    setBudgets:"Set your monthly budgets", saveBudgets:"✓ Save budgets",
    newGoal:"New savings goal", target:"Target amount (MAD)",
    alreadySaved:"Already saved", createGoal:"✓ Create goal",
    addGoal:"+ Add a goal", chooseIcon:"Choose an icon",
    goalName:"Goal name", rank:"Ranking", thisMonthPts:"This month",
    status:"Status", excellent:"Excellent", scoreTitle:"Credix Score",
    factors:"Score factors", aiTip:"Credix AI Tip",
    aiMsg:"Reducing your credit usage to 20% could increase your score by",
    aiMsg2:"in the next 30 days.",
    noTx:"No transactions.\nPress ➕ to get started.",
    noTxFilter:"No transactions here.\nPress + Add.",
    all:"All", modify:"Edit ✏️", activeGoals:"active goal(s)",
    saved:"Saved", left:"Left", placeholderExp:"e.g. Grocery store…",
    placeholderInc:"e.g. October Salary…", placeholderGoal:"e.g. Trip to London…",
    cats: {
      expense:["Food","Transport","Leisure","Subscriptions","Health","Housing","Shopping","Education","Misc"],
      income:["Salary","Freelance","Investment","Refund","Other income"],
    },
    factorNames:["On-time payments","Credit usage","Credit age","New inquiries","Credit mix"],
  },
  es: {
    dir:"ltr", hello:"Hola,", balance:"Saldo total", income:"Ingresos", expenses:"Gastos",
    add:"Agregar", budget:"Presupuesto", credit:"Crédito", goals:"Metas", history:"Historial",
    notifs:"Notificaciones", alerts:"alertas", updated:"Actualizado hoy",
    thisMonth:"Este mes", remaining:"Restante", spent:"Gastado", on:"de",
    recentTx:"Transacciones recientes", seeAll:"Ver todo →",
    addOp:"Agregar operación", details:"Detalles",
    expense:"💸 Gasto", revenue:"💰 Ingreso", amount:"Importe", label:"Descripción",
    category:"Categoría", date:"Fecha", quickAmt:"Importe rápido",
    continue:"Continuar →", save:"✓ Guardar", cancel:"Editar",
    setBudgets:"Definir presupuestos mensuales", saveBudgets:"✓ Guardar presupuestos",
    newGoal:"Nueva meta de ahorro", target:"Meta (MAD)",
    alreadySaved:"Ya ahorrado", createGoal:"✓ Crear meta",
    addGoal:"+ Agregar meta", chooseIcon:"Elegir icono",
    goalName:"Nombre de la meta", rank:"Clasificación", thisMonthPts:"Este mes",
    status:"Estado", excellent:"Excelente", scoreTitle:"Puntuación Credix",
    factors:"Factores de puntuación", aiTip:"Consejo IA Credix",
    aiMsg:"Reducir el uso de crédito al 20% podría aumentar tu puntuación en",
    aiMsg2:"en los próximos 30 días.",
    noTx:"Sin transacciones.\nPresiona ➕ para empezar.",
    noTxFilter:"Sin transacciones aquí.\nPresiona + Agregar.",
    all:"Todas", modify:"Editar ✏️", activeGoals:"meta(s) activa(s)",
    saved:"Ahorrado", left:"Restante", placeholderExp:"Ej: Supermercado…",
    placeholderInc:"Ej: Sueldo Octubre…", placeholderGoal:"Ej: Viaje a París…",
    cats: {
      expense:["Alimentación","Transporte","Ocio","Suscripciones","Salud","Vivienda","Compras","Educación","Otros"],
      income:["Sueldo","Freelance","Inversión","Reembolso","Otros ingresos"],
    },
    factorNames:["Pagos a tiempo","Uso del crédito","Antigüedad","Nuevas solicitudes","Mix de crédito"],
  },
  ar: {
    dir:"rtl", hello:"مرحباً،", balance:"الرصيد الإجمالي", income:"الدخل", expenses:"المصروفات",
    add:"إضافة", budget:"الميزانية", credit:"الائتمان", goals:"الأهداف", history:"السجل",
    notifs:"الإشعارات", alerts:"تنبيهات", updated:"تحديث اليوم",
    thisMonth:"هذا الشهر", remaining:"المتبقي", spent:"المُنفق", on:"من",
    recentTx:"المعاملات الأخيرة", seeAll:"← عرض الكل",
    addOp:"إضافة معاملة", details:"تفاصيل المعاملة",
    expense:"💸 مصروف", revenue:"💰 دخل", amount:"المبلغ", label:"الوصف",
    category:"الفئة", date:"التاريخ", quickAmt:"مبالغ سريعة",
    continue:"← متابعة", save:"✓ حفظ", cancel:"تعديل",
    setBudgets:"تحديد الميزانيات الشهرية", saveBudgets:"✓ حفظ الميزانيات",
    newGoal:"هدف ادخار جديد", target:"المبلغ المستهدف (درهم)",
    alreadySaved:"تم توفيره بالفعل", createGoal:"✓ إنشاء الهدف",
    addGoal:"+ إضافة هدف", chooseIcon:"اختر أيقونة",
    goalName:"اسم الهدف", rank:"الترتيب", thisMonthPts:"هذا الشهر",
    status:"الحالة", excellent:"ممتاز", scoreTitle:"درجة Credix",
    factors:"عوامل الدرجة", aiTip:"نصيحة Credix الذكية",
    aiMsg:"تقليل استخدام الائتمان إلى 20% قد يرفع درجتك بمقدار",
    aiMsg2:"خلال 30 يومًا.",
    noTx:"لا توجد معاملات.\nاضغط ➕ للبدء.",
    noTxFilter:"لا توجد معاملات هنا.\nاضغط + إضافة.",
    all:"الكل", modify:"تعديل ✏️", activeGoals:"هدف (أهداف) نشط",
    saved:"تم توفيره", left:"المتبقي", placeholderExp:"مثال: تسوق من ماكرو…",
    placeholderInc:"مثال: راتب أكتوبر…", placeholderGoal:"مثال: رحلة إلى أوروبا…",
    cats: {
      expense:["طعام","مواصلات","ترفيه","اشتراكات","صحة","سكن","تسوق","تعليم","متفرقات"],
      income:["راتب","عمل حر","استثمار","استرداد","دخل آخر"],
    },
    factorNames:["المدفوعات في الوقت","استخدام الائتمان","عمر الائتمان","طلبات جديدة","مزيج الائتمان"],
  },
};

const CAT_ICONS = {
  Alimentation:"🛒",Transport:"🚗",Loisirs:"🎉",Abonnements:"📱",Santé:"💊",Logement:"🏠",Shopping:"🛍️",Éducation:"📚",Divers:"📦",
  Salaire:"💼",Freelance:"💻",Investissement:"📈",Remboursement:"🤝","Autre revenu":"💰",
  Food:"🛒",Leisure:"🎉",Subscriptions:"📱",Health:"💊",Housing:"🏠",Education:"📚",Misc:"📦",Salary:"💼",Investment:"📈",Refund:"🤝","Other income":"💰",
  Alimentación:"🛒",Transporte:"🚗",Ocio:"🎉",Suscripciones:"📱",Salud:"💊",Vivienda:"🏠",Compras:"🛍️",Educación:"📚",Otros:"📦",
  Sueldo:"💼","Otros ingresos":"💰",
  "طعام":"🛒","مواصلات":"🚗","ترفيه":"🎉","اشتراكات":"📱","صحة":"💊","سكن":"🏠","تسوق":"🛍️","تعليم":"📚","متفرقات":"📦",
  "راتب":"💼","عمل حر":"💻","استثمار":"📈","استرداد":"🤝","دخل آخر":"💰",
};

const LANG_FLAGS = { fr:"🇫🇷", en:"🇬🇧", es:"🇪🇸", ar:"🇲🇦" };
const LANG_NAMES = { fr:"Français", en:"English", es:"Español", ar:"العربية" };

// ── Components ────────────────────────────────────────────────────────────────
function CredixLogo({ dir }) {
  const isRtl = dir === "rtl";
  return (
    <svg viewBox="0 0 120 24" width="120" height="24" style={{ direction:"ltr" }}>
      <defs><linearGradient id="lgx" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor={C.blue}/><stop offset="100%" stopColor={C.jade}/></linearGradient></defs>
      <rect x="0.5" y="0.5" width="23" height="23" rx="7" fill={C.card2}/>
      <rect x="0.5" y="0.5" width="23" height="23" rx="7" fill="none" stroke="url(#lgx)" strokeWidth="1"/>
      <text x="12" y="16.5" fontFamily="'Space Mono',monospace" fontWeight="700" fontSize="8.5" fill="url(#lgx)" textAnchor="middle">CR</text>
      <text x="33" y="17" fontFamily="'Plus Jakarta Sans',sans-serif" fontWeight="800" fontSize="14" fill={C.t1} letterSpacing="-0.5">Credix</text>
    </svg>
  );
}

function MiniLine({ data, color=C.jade, h=40 }) {
  const w=200,max=Math.max(...data),min=Math.min(...data),range=max-min||1;
  const pts=data.map((v,i)=>`${(i/(data.length-1))*w},${h-((v-min)/range)*(h-8)-4}`);
  return (
    <svg viewBox={`0 0 ${w} ${h}`} style={{ width:"100%",height:h }}>
      <defs><linearGradient id="la" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={color} stopOpacity="0.25"/><stop offset="100%" stopColor={color} stopOpacity="0"/></linearGradient></defs>
      <path d={`M ${pts.join(" L ")} L ${w},${h} L 0,${h} Z`} fill="url(#la)"/>
      <path d={`M ${pts.join(" L ")}`} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx={pts[pts.length-1].split(",")[0]} cy={pts[pts.length-1].split(",")[1]} r="3" fill={color}/>
    </svg>
  );
}

function Donut({ segs,size=105,sw=13 }) {
  const r=(size-sw)/2,circ=2*Math.PI*r,total=segs.reduce((a,s)=>a+s.v,0)||1;
  let off=0;
  return (
    <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={sw}/>
      {segs.map((s,i)=>{const len=(s.v/total)*circ;const el=<circle key={i} cx={size/2} cy={size/2} r={r} fill="none" stroke={s.c} strokeWidth={sw} strokeDasharray={`${len} ${circ-len}`} strokeDashoffset={-off} transform={`rotate(-90 ${size/2} ${size/2})`} strokeLinecap="butt"/>;off+=len;return el;})}
    </svg>
  );
}

function ScoreRing({ score,size=165 }) {
  const r=size/2-13,circ=2*Math.PI*r,pct=score/850;
  const col=score>=750?C.jade:score>=650?C.warn:C.danger;
  return (
    <div style={{ position:"relative",width:size,height:size,display:"flex",alignItems:"center",justifyContent:"center" }}>
      <svg viewBox={`0 0 ${size} ${size}`} style={{ position:"absolute",width:size,height:size }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={13}/>
        <defs><linearGradient id="sr"><stop offset="0%" stopColor={col}/><stop offset="100%" stopColor={C.blue}/></linearGradient></defs>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="url(#sr)" strokeWidth={13} strokeDasharray={`${pct*circ} ${circ}`} strokeLinecap="round" transform={`rotate(-90 ${size/2} ${size/2})`}/>
      </svg>
      <div style={{ textAlign:"center",zIndex:1 }}>
        <div style={{ fontSize:34,fontWeight:700,fontFamily:"'Space Mono',monospace",color:col,lineHeight:1 }}>{score}</div>
        <div style={{ fontSize:9,color:C.t2,textTransform:"uppercase",letterSpacing:".1em",marginTop:4 }}>{score>=750?"Excellent":score>=650?"Good":"Fair"}</div>
        <div style={{ fontSize:9,color:C.t3,marginTop:2 }}>/ 850</div>
      </div>
    </div>
  );
}

// ── Language Picker ───────────────────────────────────────────────────────────
function LangPicker({ lang, setLang }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position:"relative", zIndex:60 }}>
      <button onClick={()=>setOpen(o=>!o)}
        style={{ background:C.card2,border:`1px solid rgba(255,255,255,0.1)`,borderRadius:10,padding:"5px 10px",cursor:"pointer",display:"flex",alignItems:"center",gap:6,color:C.t1,fontSize:12 }}>
        <span style={{ fontSize:16 }}>{LANG_FLAGS[lang]}</span>
        <span style={{ fontFamily:"'Sora',sans-serif",fontSize:11,color:C.t2 }}>{LANG_NAMES[lang]}</span>
        <span style={{ fontSize:10,color:C.t3 }}>{open?"▲":"▼"}</span>
      </button>
      {open && (
        <div style={{ position:"absolute",top:"calc(100% + 6px)",right:0,background:C.bg2,border:`1px solid rgba(255,255,255,0.1)`,borderRadius:12,overflow:"hidden",minWidth:130,boxShadow:"0 8px 24px rgba(0,0,0,0.4)" }}>
          {Object.entries(LANG_NAMES).map(([k,v])=>(
            <button key={k} onClick={()=>{setLang(k);setOpen(false);}}
              style={{ width:"100%",display:"flex",alignItems:"center",gap:10,padding:"9px 14px",background:lang===k?`rgba(0,229,160,0.08)`:"transparent",border:"none",cursor:"pointer",color:lang===k?C.jade:C.t2,fontSize:12,fontFamily:"'Sora',sans-serif" }}>
              <span style={{ fontSize:16 }}>{LANG_FLAGS[k]}</span>{v}
              {lang===k && <span style={{ marginLeft:"auto",fontSize:12,color:C.jade }}>✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

const inp = (dir) => ({ background:C.card2,border:`1px solid rgba(255,255,255,0.09)`,borderRadius:12,color:C.t1,fontSize:14,padding:"11px 14px",width:"100%",fontFamily:"'Sora',sans-serif",outline:"none",colorScheme:"dark",direction:dir,textAlign:dir==="rtl"?"right":"left" });

// ── Add Transaction Modal ─────────────────────────────────────────────────────
function AddModal({ t, onClose, onAdd }) {
  const [type,setType]=useState("expense");
  const [amount,setAmount]=useState("");
  const [cat,setCat]=useState("");
  const [name,setName]=useState("");
  const [step,setStep]=useState(1);
  const canNext=amount&&parseFloat(amount)>0;
  const canSave=canNext&&cat&&name;

  function handleSave() {
    if (!canSave) return;
    const d=new Date(),dateStr=d.toLocaleDateString("fr-FR",{day:"2-digit",month:"short"});
    onAdd({ id:Date.now(),name,cat,amt:type==="expense"?-parseFloat(amount):parseFloat(amount),date:dateStr,icon:CAT_ICONS[cat]||"📦",type });
    onClose();
  }

  return (
    <div style={{ position:"absolute",inset:0,background:"rgba(7,13,26,0.9)",zIndex:100,display:"flex",flexDirection:"column",justifyContent:"flex-end" }}>
      <div style={{ position:"absolute",inset:0 }} onClick={onClose}/>
      <div style={{ position:"relative",background:C.bg2,borderRadius:"24px 24px 0 0",padding:"0 18px 36px",border:`1px solid rgba(255,255,255,0.07)`,borderBottom:"none",direction:t.dir }}>
        <div style={{ display:"flex",justifyContent:"center",padding:"12px 0 4px" }}><div style={{ width:36,height:4,borderRadius:2,background:"rgba(255,255,255,0.15)" }}/></div>
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 0 16px" }}>
          <div style={{ fontSize:15,fontWeight:700,fontFamily:"'Plus Jakarta Sans',sans-serif" }}>{step===1?t.addOp:t.details}</div>
          <button onClick={onClose} style={{ background:"rgba(255,255,255,0.06)",border:"none",borderRadius:8,width:30,height:30,cursor:"pointer",color:C.t2,fontSize:15 }}>✕</button>
        </div>

        {step===1 && <>
          <div style={{ display:"flex",background:C.card,borderRadius:14,padding:4,marginBottom:18,gap:4 }}>
            {["expense","income"].map(tp=>(
              <button key={tp} onClick={()=>{setType(tp);setCat("");}}
                style={{ flex:1,padding:"9px 0",borderRadius:11,border:"none",cursor:"pointer",fontSize:13,fontWeight:600,fontFamily:"'Plus Jakarta Sans',sans-serif",
                  background:type===tp?(tp==="expense"?`rgba(255,107,107,0.9)`:C.jade):"transparent",
                  color:type===tp?(tp==="expense"?"#fff":C.bg):C.t2 }}>
                {tp==="expense"?t.expense:t.revenue}
              </button>
            ))}
          </div>
          <div style={{ marginBottom:16 }}>
            <div style={{ fontSize:10,color:C.t2,marginBottom:7,textTransform:"uppercase",letterSpacing:".08em" }}>{t.amount} (MAD)</div>
            <div style={{ position:"relative" }}>
              <input type="number" value={amount} onChange={e=>setAmount(e.target.value)} placeholder="0"
                style={{ ...inp(t.dir),fontSize:30,fontFamily:"'Space Mono',monospace",fontWeight:700,padding:"13px 60px 13px 16px",color:type==="expense"?C.danger:C.jade }}/>
              <div style={{ position:"absolute",right:14,top:"50%",transform:"translateY(-50%)",fontSize:12,color:C.t3,fontFamily:"'Space Mono',monospace" }}>MAD</div>
            </div>
          </div>
          <div style={{ fontSize:10,color:C.t2,marginBottom:8,textTransform:"uppercase",letterSpacing:".08em" }}>{t.quickAmt}</div>
          <div style={{ display:"flex",gap:7,marginBottom:18,flexWrap:"wrap" }}>
            {(type==="expense"?[50,100,200,500,1000,2000]:[1000,3000,5000,8000,10000,15000]).map(v=>(
              <button key={v} onClick={()=>setAmount(String(v))}
                style={{ padding:"6px 12px",background:amount===String(v)?(type==="expense"?`rgba(255,107,107,0.15)`:`rgba(0,229,160,0.12)`):C.card,
                  border:`1px solid ${amount===String(v)?(type==="expense"?C.danger:C.jade):"rgba(255,255,255,0.07)"}`,
                  borderRadius:20,cursor:"pointer",fontSize:12,fontFamily:"'Space Mono',monospace",
                  color:amount===String(v)?(type==="expense"?C.danger:C.jade):C.t2 }}>
                {v>=1000?`${v/1000}k`:v}
              </button>
            ))}
          </div>
          <button onClick={()=>canNext&&setStep(2)}
            style={{ width:"100%",padding:13,borderRadius:14,border:"none",cursor:canNext?"pointer":"default",
              background:canNext?`linear-gradient(135deg,${C.blue},${C.jade})`:"rgba(255,255,255,0.06)",
              color:canNext?C.bg:C.t3,fontSize:14,fontWeight:700,fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
            {t.continue}
          </button>
        </>}

        {step===2 && <>
          <div style={{ display:"flex",alignItems:"center",gap:10,background:C.card,borderRadius:12,padding:"10px 14px",marginBottom:16 }}>
            <div style={{ fontSize:22 }}>{type==="expense"?"💸":"💰"}</div>
            <div>
              <div style={{ fontSize:19,fontWeight:700,fontFamily:"'Space Mono',monospace",color:type==="expense"?C.danger:C.jade }}>
                {type==="expense"?"-":"+"}{ parseFloat(amount||0).toLocaleString() } MAD
              </div>
              <div style={{ fontSize:10,color:C.t2 }}>{type==="expense"?t.expense:t.revenue}</div>
            </div>
            <button onClick={()=>setStep(1)} style={{ marginLeft:"auto",background:"none",border:"none",color:C.blue,cursor:"pointer",fontSize:11 }}>{t.cancel}</button>
          </div>
          <div style={{ marginBottom:12 }}>
            <div style={{ fontSize:10,color:C.t2,marginBottom:7,textTransform:"uppercase",letterSpacing:".08em" }}>{t.label}</div>
            <input value={name} onChange={e=>setName(e.target.value)} placeholder={type==="expense"?t.placeholderExp:t.placeholderInc} style={inp(t.dir)}/>
          </div>
          <div style={{ marginBottom:16 }}>
            <div style={{ fontSize:10,color:C.t2,marginBottom:8,textTransform:"uppercase",letterSpacing:".08em" }}>{t.category}</div>
            <div style={{ display:"flex",flexWrap:"wrap",gap:7 }}>
              {t.cats[type].map(c=>(
                <button key={c} onClick={()=>setCat(c)}
                  style={{ display:"flex",alignItems:"center",gap:5,padding:"6px 11px",
                    background:cat===c?`rgba(77,166,255,0.15)`:C.card,
                    border:`1px solid ${cat===c?C.blue:"rgba(255,255,255,0.07)"}`,
                    borderRadius:20,cursor:"pointer",fontSize:11,color:cat===c?C.blue:C.t2,fontFamily:"'Sora',sans-serif" }}>
                  <span style={{ fontSize:13 }}>{CAT_ICONS[c]||"📦"}</span>{c}
                </button>
              ))}
            </div>
          </div>
          <button onClick={handleSave}
            style={{ width:"100%",padding:13,borderRadius:14,border:"none",cursor:canSave?"pointer":"default",
              background:canSave?`linear-gradient(135deg,${C.blue},${C.jade})`:"rgba(255,255,255,0.06)",
              color:canSave?C.bg:C.t3,fontSize:14,fontWeight:700,fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
            {t.save}
          </button>
        </>}
      </div>
    </div>
  );
}

// ── Budget Modal ──────────────────────────────────────────────────────────────
function BudgetModal({ t, budgets, onClose, onSave }) {
  const [vals,setVals]=useState(budgets.map(b=>({...b})));
  return (
    <div style={{ position:"absolute",inset:0,background:"rgba(7,13,26,0.9)",zIndex:100,display:"flex",flexDirection:"column",justifyContent:"flex-end" }}>
      <div style={{ position:"absolute",inset:0 }} onClick={onClose}/>
      <div style={{ position:"relative",background:C.bg2,borderRadius:"24px 24px 0 0",padding:"0 18px 36px",border:`1px solid rgba(255,255,255,0.07)`,borderBottom:"none",maxHeight:"75vh",overflowY:"auto",direction:t.dir }}>
        <div style={{ display:"flex",justifyContent:"center",padding:"12px 0 4px" }}><div style={{ width:36,height:4,borderRadius:2,background:"rgba(255,255,255,0.15)" }}/></div>
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 0 18px" }}>
          <div style={{ fontSize:15,fontWeight:700,fontFamily:"'Plus Jakarta Sans',sans-serif" }}>{t.setBudgets}</div>
          <button onClick={onClose} style={{ background:"rgba(255,255,255,0.06)",border:"none",borderRadius:8,width:30,height:30,cursor:"pointer",color:C.t2,fontSize:15 }}>✕</button>
        </div>
        {vals.map((b,i)=>(
          <div key={i} style={{ marginBottom:16 }}>
            <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:7 }}>
              <span style={{ fontSize:18 }}>{b.icon}</span>
              <span style={{ fontSize:13,fontWeight:500,flex:1 }}>{b.cat}</span>
              <span style={{ fontSize:14,fontFamily:"'Space Mono',monospace",fontWeight:700,color:b.color }}>{parseInt(vals[i].total).toLocaleString()} MAD</span>
            </div>
            <input type="range" min="100" max="10000" step="100" value={vals[i].total}
              onChange={e=>{const n=[...vals];n[i]={...n[i],total:parseInt(e.target.value)};setVals(n);}}
              style={{ width:"100%",accentColor:b.color,height:4,cursor:"pointer",direction:"ltr" }}/>
          </div>
        ))}
        <button onClick={()=>{onSave(vals);onClose();}}
          style={{ width:"100%",padding:13,borderRadius:14,border:"none",cursor:"pointer",background:`linear-gradient(135deg,${C.blue},${C.jade})`,color:C.bg,fontSize:14,fontWeight:700,fontFamily:"'Plus Jakarta Sans',sans-serif",marginTop:6 }}>
          {t.saveBudgets}
        </button>
      </div>
    </div>
  );
}

// ── Goal Modal ────────────────────────────────────────────────────────────────
function GoalModal({ t, onClose, onAdd }) {
  const [name,setName]=useState(""),[target,setTarget]=useState(""),[ saved,setSaved]=useState(""),[ icon,setIcon]=useState("✈️");
  const icons=["✈️","🚗","🏠","📱","💍","🎓","🛡️","🏖️","💡","🎯","🎸","👶"];
  const canSave=name&&parseFloat(target)>0;
  const COLS=[C.blue,C.jade,C.warn,C.purple,C.danger];
  return (
    <div style={{ position:"absolute",inset:0,background:"rgba(7,13,26,0.9)",zIndex:100,display:"flex",flexDirection:"column",justifyContent:"flex-end" }}>
      <div style={{ position:"absolute",inset:0 }} onClick={onClose}/>
      <div style={{ position:"relative",background:C.bg2,borderRadius:"24px 24px 0 0",padding:"0 18px 36px",border:`1px solid rgba(255,255,255,0.07)`,borderBottom:"none",direction:t.dir }}>
        <div style={{ display:"flex",justifyContent:"center",padding:"12px 0 4px" }}><div style={{ width:36,height:4,borderRadius:2,background:"rgba(255,255,255,0.15)" }}/></div>
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 0 16px" }}>
          <div style={{ fontSize:15,fontWeight:700,fontFamily:"'Plus Jakarta Sans',sans-serif" }}>{t.newGoal}</div>
          <button onClick={onClose} style={{ background:"rgba(255,255,255,0.06)",border:"none",borderRadius:8,width:30,height:30,cursor:"pointer",color:C.t2,fontSize:15 }}>✕</button>
        </div>
        <div style={{ marginBottom:14 }}>
          <div style={{ fontSize:10,color:C.t2,marginBottom:8,textTransform:"uppercase",letterSpacing:".08em" }}>{t.chooseIcon}</div>
          <div style={{ display:"flex",gap:8,flexWrap:"wrap" }}>
            {icons.map(ic=>(
              <button key={ic} onClick={()=>setIcon(ic)}
                style={{ width:40,height:40,borderRadius:12,border:`1.5px solid ${icon===ic?C.blue:"rgba(255,255,255,0.07)"}`,background:icon===ic?`rgba(77,166,255,0.15)`:C.card,cursor:"pointer",fontSize:19 }}>{ic}</button>
            ))}
          </div>
        </div>
        <div style={{ marginBottom:12 }}>
          <div style={{ fontSize:10,color:C.t2,marginBottom:7,textTransform:"uppercase",letterSpacing:".08em" }}>{t.goalName}</div>
          <input value={name} onChange={e=>setName(e.target.value)} placeholder={t.placeholderGoal} style={inp(t.dir)}/>
        </div>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:18 }}>
          <div>
            <div style={{ fontSize:10,color:C.t2,marginBottom:7,textTransform:"uppercase",letterSpacing:".08em" }}>{t.target}</div>
            <input type="number" value={target} onChange={e=>setTarget(e.target.value)} placeholder="15000"
              style={{ ...inp(t.dir),fontSize:16,fontFamily:"'Space Mono',monospace",fontWeight:700,color:C.jade }}/>
          </div>
          <div>
            <div style={{ fontSize:10,color:C.t2,marginBottom:7,textTransform:"uppercase",letterSpacing:".08em" }}>{t.alreadySaved}</div>
            <input type="number" value={saved} onChange={e=>setSaved(e.target.value)} placeholder="0"
              style={{ ...inp(t.dir),fontSize:16,fontFamily:"'Space Mono',monospace",fontWeight:700,color:C.blue }}/>
          </div>
        </div>
        <button onClick={()=>{if(!canSave)return;onAdd({name,icon,target:parseFloat(target),saved:parseFloat(saved||0),color:COLS[Math.floor(Math.random()*COLS.length)]});onClose();}}
          style={{ width:"100%",padding:13,borderRadius:14,border:"none",cursor:canSave?"pointer":"default",
            background:canSave?`linear-gradient(135deg,${C.blue},${C.jade})`:"rgba(255,255,255,0.06)",
            color:canSave?C.bg:C.t3,fontSize:14,fontWeight:700,fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
          {t.createGoal}
        </button>
      </div>
    </div>
  );
}

// ── Screens ───────────────────────────────────────────────────────────────────
function Home({ t, setTab, transactions, setModal, lang, setLang }) {
  const income=transactions.filter(x=>x.amt>0).reduce((a,x)=>a+x.amt,0);
  const expense=transactions.filter(x=>x.amt<0).reduce((a,x)=>a+Math.abs(x.amt),0);
  const balance=Math.max(0,income-expense);
  return (
    <div style={{ paddingBottom:80,direction:t.dir }}>
      <div style={{ padding:"14px 16px 0",display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10 }}>
        <CredixLogo dir={t.dir}/>
        <div style={{ display:"flex",alignItems:"center",gap:8 }}>
          <LangPicker lang={lang} setLang={setLang}/>
          <button onClick={()=>setTab("notifs")} style={{ background:C.card,border:`1px solid rgba(255,255,255,0.07)`,borderRadius:11,width:34,height:34,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",position:"relative",fontSize:14 }}>
            🔔<span style={{ position:"absolute",top:5,right:5,width:7,height:7,background:C.danger,borderRadius:"50%",border:`2px solid ${C.bg}` }}/>
          </button>
        </div>
      </div>
      <div style={{ padding:"6px 16px 12px" }}>
        <div style={{ fontSize:11,color:C.t2 }}>{t.hello}</div>
        <div style={{ fontSize:19,fontWeight:600,fontFamily:"'Plus Jakarta Sans',sans-serif" }}>Karim 👋</div>
      </div>
      {/* Balance card */}
      <div style={{ margin:"0 12px 12px",background:`linear-gradient(140deg,#0A2A50 0%,#0D4A35 100%)`,borderRadius:20,padding:"15px 16px 12px",border:`1px solid rgba(77,166,255,0.15)` }}>
        <div style={{ fontSize:10,color:"rgba(255,255,255,0.5)",textTransform:"uppercase",letterSpacing:".1em",marginBottom:3 }}>{t.balance}</div>
        <div style={{ display:"flex",alignItems:"baseline",gap:6 }}>
          <span style={{ fontSize:32,fontWeight:700,fontFamily:"'Space Mono',monospace",color:C.t1 }}>{balance.toLocaleString()}</span>
          <span style={{ fontSize:14,color:"rgba(255,255,255,0.4)",fontFamily:"'Space Mono',monospace" }}>MAD</span>
        </div>
        <MiniLine data={[8200,9100,7800,11200,10400,9800,Math.max(1,balance)]} color="rgba(255,255,255,0.7)" h={38}/>
        <div style={{ display:"flex",justifyContent:"space-between",marginTop:9,paddingTop:9,borderTop:"1px solid rgba(255,255,255,0.08)" }}>
          <div><div style={{ fontSize:9,color:"rgba(255,255,255,0.4)",textTransform:"uppercase",letterSpacing:".08em",marginBottom:1 }}>{t.income}</div><div style={{ fontSize:13,fontWeight:600,fontFamily:"'Space Mono',monospace",color:C.jade }}>+{income.toLocaleString()}</div></div>
          <div style={{ textAlign:t.dir==="rtl"?"left":"right" }}><div style={{ fontSize:9,color:"rgba(255,255,255,0.4)",textTransform:"uppercase",letterSpacing:".08em",marginBottom:1 }}>{t.expenses}</div><div style={{ fontSize:13,fontWeight:600,fontFamily:"'Space Mono',monospace",color:"#FF9999" }}>-{expense.toLocaleString()}</div></div>
        </div>
      </div>
      {/* Quick actions */}
      <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:7,margin:"0 12px 12px" }}>
        {[{icon:"➕",label:t.add,action:()=>setModal("add"),hi:true},{icon:"📊",label:t.budget,action:()=>setTab("budget")},{icon:"⭐",label:t.credit,action:()=>setTab("credit")},{icon:"🎯",label:t.goals,action:()=>setTab("goals")}].map((a,i)=>(
          <button key={i} onClick={a.action} style={{ background:a.hi?`rgba(0,229,160,0.1)`:C.card,border:`1px solid ${a.hi?`rgba(0,229,160,0.25)`:"rgba(255,255,255,0.06)"}`,borderRadius:13,padding:"9px 3px",textAlign:"center",cursor:"pointer" }}>
            <div style={{ fontSize:17,marginBottom:2 }}>{a.icon}</div>
            <div style={{ fontSize:9,color:a.hi?C.jade:C.t2,fontFamily:"'Sora',sans-serif",fontWeight:a.hi?600:400 }}>{a.label}</div>
          </button>
        ))}
      </div>
      {/* Score teaser */}
      <div onClick={()=>setTab("credit")} style={{ margin:"0 12px 12px",background:C.card,border:`1px solid rgba(77,166,255,0.15)`,borderRadius:15,padding:"11px 13px",display:"flex",alignItems:"center",gap:11,cursor:"pointer" }}>
        <div style={{ position:"relative",width:46,height:46,flexShrink:0 }}>
          <svg viewBox="0 0 46 46" style={{ position:"absolute",width:46,height:46 }}>
            <defs><linearGradient id="tsr2"><stop offset="0%" stopColor={C.jade}/><stop offset="100%" stopColor={C.blue}/></linearGradient></defs>
            <circle cx="23" cy="23" r="19" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="5"/>
            <circle cx="23" cy="23" r="19" fill="none" stroke="url(#tsr2)" strokeWidth="5" strokeDasharray={`${(748/850)*119} 119`} strokeLinecap="round" transform="rotate(-90 23 23)"/>
          </svg>
          <div style={{ position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700,fontFamily:"'Space Mono',monospace",color:C.jade }}>748</div>
        </div>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:12,fontWeight:600,fontFamily:"'Plus Jakarta Sans',sans-serif" }}>{t.scoreTitle}</div>
          <div style={{ fontSize:10,color:C.t2 }}>{t.excellent} · Top 15%</div>
        </div>
        <svg width="7" height="12" viewBox="0 0 7 12"><path d={t.dir==="rtl"?"M6 1L1 6l5 5":"M1 1l5 5-5 5"} stroke={C.t3} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </div>
      {/* Transactions */}
      <div style={{ padding:"0 12px" }}>
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10 }}>
          <div style={{ fontSize:12,fontWeight:600,fontFamily:"'Plus Jakarta Sans',sans-serif" }}>{t.recentTx}</div>
          <span onClick={()=>setTab("transactions")} style={{ fontSize:10,color:C.blue,cursor:"pointer" }}>{t.seeAll}</span>
        </div>
        {transactions.length===0&&<div style={{ textAlign:"center",padding:"20px 0",color:C.t3,fontSize:12,whiteSpace:"pre-line" }}>{t.noTx}</div>}
        {transactions.slice(0,4).map(tx=>(
          <div key={tx.id} style={{ display:"flex",alignItems:"center",gap:10,marginBottom:9 }}>
            <div style={{ width:36,height:36,borderRadius:11,background:tx.type==="income"?`rgba(0,229,160,0.1)`:`rgba(255,107,107,0.08)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:15,flexShrink:0 }}>{tx.icon}</div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:12,fontWeight:500 }}>{tx.name}</div>
              <div style={{ fontSize:10,color:C.t2 }}>{tx.cat} · {tx.date}</div>
            </div>
            <div style={{ fontSize:12,fontWeight:600,fontFamily:"'Space Mono',monospace",color:tx.amt>0?C.jade:C.t1 }}>{tx.amt>0?"+":""}{tx.amt.toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BudgetScreen({ t, budgets, setModal }) {
  const totalS=budgets.reduce((a,b)=>a+b.spent,0),totalT=budgets.reduce((a,b)=>a+b.total,0);
  const pct=totalT>0?Math.round((totalS/totalT)*100):0;
  return (
    <div style={{ padding:"14px 12px 80px",direction:t.dir }}>
      <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:2 }}>
        <div style={{ fontSize:16,fontWeight:700,fontFamily:"'Plus Jakarta Sans',sans-serif" }}>{t.budget}</div>
        <button onClick={()=>setModal("budget")} style={{ background:`rgba(77,166,255,0.1)`,border:`1px solid rgba(77,166,255,0.25)`,borderRadius:10,padding:"5px 11px",color:C.blue,fontSize:11,cursor:"pointer",fontFamily:"'Sora',sans-serif",fontWeight:600 }}>{t.modify}</button>
      </div>
      <div style={{ fontSize:10,color:C.t2,marginBottom:14 }}>Mars 2026</div>
      <div style={{ background:C.card,borderRadius:18,padding:15,marginBottom:12,display:"flex",alignItems:"center",gap:15 }}>
        <div style={{ position:"relative",flexShrink:0 }}>
          <Donut segs={budgets.map(b=>({v:b.spent+1,c:b.color}))} size={100} sw={12}/>
          <div style={{ position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center" }}>
            <div style={{ fontSize:18,fontWeight:700,fontFamily:"'Space Mono',monospace" }}>{pct}%</div>
            <div style={{ fontSize:9,color:C.t2 }}>{t.spent.toLowerCase()}</div>
          </div>
        </div>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:10,color:C.t2,marginBottom:3 }}>{t.spent}</div>
          <div style={{ fontSize:19,fontWeight:700,fontFamily:"'Space Mono',monospace" }}>{totalS.toLocaleString()}</div>
          <div style={{ fontSize:10,color:C.t2,marginBottom:8 }}>{t.on} {totalT.toLocaleString()} MAD</div>
          <div style={{ height:5,background:"rgba(255,255,255,0.06)",borderRadius:3,overflow:"hidden" }}>
            <div style={{ height:"100%",width:`${Math.min(100,pct)}%`,background:pct>80?C.danger:pct>60?C.warn:C.jade,borderRadius:3 }}/>
          </div>
          <div style={{ fontSize:11,color:C.jade,marginTop:5 }}>{t.remaining}: {(totalT-totalS).toLocaleString()} MAD</div>
        </div>
      </div>
      {budgets.map((b,i)=>{const p=b.total>0?Math.round((b.spent/b.total)*100):0;return(
        <div key={i} style={{ background:C.card,borderRadius:13,padding:"11px 13px",marginBottom:7 }}>
          <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:7 }}>
            <div style={{ width:32,height:32,borderRadius:10,background:`${b.color}15`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14 }}>{b.icon}</div>
            <div style={{ flex:1 }}>
              <div style={{ display:"flex",justifyContent:"space-between" }}>
                <span style={{ fontSize:12,fontWeight:500 }}>{b.cat}</span>
                <span style={{ fontSize:11,fontFamily:"'Space Mono',monospace",color:p>80?C.danger:C.t1 }}>{p}%</span>
              </div>
              <div style={{ fontSize:10,color:C.t2 }}>{b.spent.toLocaleString()} / {b.total.toLocaleString()} MAD</div>
            </div>
          </div>
          <div style={{ height:4,background:"rgba(255,255,255,0.06)",borderRadius:2,overflow:"hidden" }}>
            <div style={{ height:"100%",width:`${Math.min(100,p)}%`,background:b.color,borderRadius:2 }}/>
          </div>
        </div>
      );})}
    </div>
  );
}

function CreditScreen({ t }) {
  return (
    <div style={{ padding:"14px 12px 80px",direction:t.dir }}>
      <div style={{ fontSize:16,fontWeight:700,fontFamily:"'Plus Jakarta Sans',sans-serif",marginBottom:2 }}>{t.scoreTitle}</div>
      <div style={{ fontSize:10,color:C.t2,marginBottom:18 }}>{t.updated}</div>
      <div style={{ display:"flex",justifyContent:"center",marginBottom:14 }}><ScoreRing score={748} size={160}/></div>
      <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:7,marginBottom:13 }}>
        {[{v:t.excellent,l:t.status},{v:"Top 15%",l:t.rank},{v:"+12 pts",l:t.thisMonthPts}].map((s,i)=>(
          <div key={i} style={{ background:C.card,borderRadius:12,padding:"9px 6px",textAlign:"center" }}>
            <div style={{ fontSize:11,fontWeight:700,fontFamily:"'Space Mono',monospace",color:C.jade }}>{s.v}</div>
            <div style={{ fontSize:9,color:C.t2,marginTop:2 }}>{s.l}</div>
          </div>
        ))}
      </div>
      <div style={{ background:C.card,borderRadius:16,padding:14,marginBottom:11 }}>
        <div style={{ fontSize:12,fontWeight:600,fontFamily:"'Plus Jakarta Sans',sans-serif",marginBottom:11 }}>{t.factors}</div>
        {t.factorNames.map((name,i)=>{const vals=[98,24,72,85,60];const v=vals[i];const good=v>50&&i!==1||i===0;return(
          <div key={i} style={{ marginBottom:10 }}>
            <div style={{ display:"flex",justifyContent:"space-between",fontSize:11,marginBottom:4 }}>
              <span style={{ color:C.t2 }}>{name}</span>
              <span style={{ fontFamily:"'Space Mono',monospace",color:good?C.jade:C.warn }}>{v}%</span>
            </div>
            <div style={{ height:4,background:"rgba(255,255,255,0.06)",borderRadius:2,overflow:"hidden" }}>
              <div style={{ height:"100%",width:`${v}%`,background:good?C.jade:C.warn,borderRadius:2 }}/>
            </div>
          </div>
        );})}
      </div>
      <div style={{ background:`rgba(77,166,255,0.06)`,border:`1px solid rgba(77,166,255,0.18)`,borderRadius:13,padding:13 }}>
        <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:7 }}>
          <div style={{ width:26,height:26,borderRadius:8,background:`rgba(77,166,255,0.12)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13 }}>🤖</div>
          <span style={{ fontSize:12,fontWeight:600,color:C.blue,fontFamily:"'Plus Jakarta Sans',sans-serif" }}>{t.aiTip}</span>
        </div>
        <div style={{ fontSize:12,color:C.t2,lineHeight:1.7 }}>{t.aiMsg} <span style={{ color:C.jade,fontWeight:600 }}>+12 pts</span> {t.aiMsg2}</div>
      </div>
    </div>
  );
}

function TransactionsScreen({ t, transactions, setModal, onDelete }) {
  const [filter,setFilter]=useState("all");
  const list=filter==="all"?transactions:transactions.filter(x=>x.type===filter);
  return (
    <div style={{ padding:"14px 12px 80px",direction:t.dir }}>
      <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12 }}>
        <div style={{ fontSize:16,fontWeight:700,fontFamily:"'Plus Jakarta Sans',sans-serif" }}>{t.history}</div>
        <button onClick={()=>setModal("add")} style={{ background:`rgba(0,229,160,0.1)`,border:`1px solid rgba(0,229,160,0.25)`,borderRadius:10,padding:"5px 11px",color:C.jade,fontSize:11,cursor:"pointer",fontFamily:"'Sora',sans-serif",fontWeight:600 }}>+ {t.add}</button>
      </div>
      <div style={{ display:"flex",gap:7,marginBottom:14,direction:"ltr" }}>
        {[["all",t.all],["income",t.income],["expense",t.expenses]].map(([v,l])=>(
          <button key={v} onClick={()=>setFilter(v)} style={{ padding:"5px 12px",borderRadius:20,border:"none",cursor:"pointer",fontSize:11,fontWeight:500,fontFamily:"'Sora',sans-serif",background:filter===v?C.blue:C.card,color:filter===v?"#fff":C.t2 }}>{l}</button>
        ))}
      </div>
      {list.length===0&&<div style={{ textAlign:"center",padding:"32px 0",color:C.t3,fontSize:12,whiteSpace:"pre-line" }}>{t.noTxFilter}</div>}
      {list.map(tx=>(
        <div key={tx.id} style={{ display:"flex",alignItems:"center",gap:10,padding:"10px 12px",background:C.card,borderRadius:13,marginBottom:7 }}>
          <div style={{ width:36,height:36,borderRadius:11,background:tx.type==="income"?`rgba(0,229,160,0.1)`:`rgba(255,107,107,0.08)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:15,flexShrink:0 }}>{tx.icon}</div>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:12,fontWeight:500 }}>{tx.name}</div>
            <div style={{ fontSize:10,color:C.t2 }}>{tx.cat} · {tx.date}</div>
          </div>
          <div style={{ display:"flex",alignItems:"center",gap:7 }}>
            <div style={{ textAlign:"right" }}>
              <div style={{ fontSize:12,fontWeight:600,fontFamily:"'Space Mono',monospace",color:tx.amt>0?C.jade:C.t1 }}>{tx.amt>0?"+":""}{tx.amt.toLocaleString()}</div>
              <div style={{ fontSize:9,color:C.t3 }}>MAD</div>
            </div>
            <button onClick={()=>onDelete(tx.id)} style={{ background:"rgba(255,107,107,0.1)",border:"none",borderRadius:7,width:24,height:24,cursor:"pointer",color:C.danger,fontSize:11,display:"flex",alignItems:"center",justifyContent:"center" }}>✕</button>
          </div>
        </div>
      ))}
    </div>
  );
}

function GoalsScreen({ t, goals, setModal, onDelete }) {
  return (
    <div style={{ padding:"14px 12px 80px",direction:t.dir }}>
      <div style={{ fontSize:16,fontWeight:700,fontFamily:"'Plus Jakarta Sans',sans-serif",marginBottom:2 }}>{t.goals}</div>
      <div style={{ fontSize:10,color:C.t2,marginBottom:14 }}>{goals.length} {t.activeGoals}</div>
      {goals.map((g,i)=>{const p=g.target>0?Math.round((g.saved/g.target)*100):0;return(
        <div key={i} style={{ background:C.card,borderRadius:16,padding:14,marginBottom:10,border:`1px solid rgba(255,255,255,0.04)` }}>
          <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:11 }}>
            <div style={{ width:40,height:40,borderRadius:13,background:`${g.color}15`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:19 }}>{g.icon}</div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:13,fontWeight:600,fontFamily:"'Plus Jakarta Sans',sans-serif" }}>{g.name}</div>
              <div style={{ fontSize:10,color:C.t2 }}>{g.target.toLocaleString()} MAD</div>
            </div>
            <div style={{ background:`${g.color}18`,borderRadius:9,padding:"3px 8px",fontSize:11,fontWeight:700,color:g.color,fontFamily:"'Space Mono',monospace" }}>{p}%</div>
            <button onClick={()=>onDelete(i)} style={{ background:"rgba(255,107,107,0.08)",border:"none",borderRadius:7,width:24,height:24,cursor:"pointer",color:C.danger,fontSize:11 }}>✕</button>
          </div>
          <div style={{ height:6,background:"rgba(255,255,255,0.06)",borderRadius:3,overflow:"hidden",marginBottom:7,direction:"ltr" }}>
            <div style={{ height:"100%",width:`${Math.min(100,p)}%`,background:g.color,borderRadius:3 }}/>
          </div>
          <div style={{ display:"flex",justifyContent:"space-between",fontSize:11 }}>
            <span style={{ color:C.t2 }}>{t.saved}: <strong style={{ color:C.t1 }}>{g.saved.toLocaleString()}</strong></span>
            <span style={{ color:C.t2 }}>{t.left}: <strong style={{ color:g.color }}>{(g.target-g.saved).toLocaleString()}</strong></span>
          </div>
        </div>
      );})}
      <button onClick={()=>setModal("goal")} style={{ width:"100%",padding:11,background:`rgba(77,166,255,0.06)`,border:`1px dashed rgba(77,166,255,0.25)`,borderRadius:13,color:C.blue,fontSize:12,fontWeight:500,cursor:"pointer",fontFamily:"'Sora',sans-serif" }}>
        {t.addGoal}
      </button>
    </div>
  );
}

function NotifsScreen({ t }) {
  const typeColor={warning:C.warn,info:C.blue,success:C.jade,danger:C.danger};
  const items=[
    {type:"warning",title:t.budget,msg:"62%",time:"2h",icon:"🛒"},
    {type:"info",title:t.scoreTitle,msg:"+12 pts",time:"5h",icon:"📈"},
    {type:"success",title:t.add,msg:"✓",time:"1d",icon:"✅"},
    {type:"danger",title:t.credit,msg:"1 200 MAD",time:"1d",icon:"⚠️"},
    {type:"info",title:t.aiTip,msg:"100 MAD → 1 200 MAD/an",time:"2d",icon:"🤖"},
  ];
  return (
    <div style={{ padding:"14px 12px 80px",direction:t.dir }}>
      <div style={{ fontSize:16,fontWeight:700,fontFamily:"'Plus Jakarta Sans',sans-serif",marginBottom:2 }}>{t.notifs}</div>
      <div style={{ fontSize:10,color:C.t2,marginBottom:14 }}>{items.length} {t.alerts}</div>
      {items.map((n,i)=>(
        <div key={i} style={{ background:C.card,borderRadius:"0 13px 13px 0",padding:"11px 13px",marginBottom:7,borderLeft:`3px solid ${typeColor[n.type]}` }}>
          <div style={{ display:"flex",alignItems:"center",gap:10 }}>
            <div style={{ width:32,height:32,borderRadius:10,background:`${typeColor[n.type]}12`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,flexShrink:0 }}>{n.icon}</div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:12,fontWeight:600,fontFamily:"'Plus Jakarta Sans',sans-serif",marginBottom:2 }}>{n.title}</div>
              <div style={{ fontSize:11,color:C.t2 }}>{n.msg}</div>
            </div>
            <div style={{ fontSize:10,color:C.t3 }}>{n.time}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────
const INIT_TX=[
  {id:1,name:"Salaire Mars",cat:"Salaire",amt:8500,date:"01 Mar",icon:"💼",type:"income"},
  {id:2,name:"Marjane",cat:"Alimentation",amt:-340,date:"05 Mar",icon:"🛒",type:"expense"},
  {id:3,name:"Netflix",cat:"Abonnements",amt:-59,date:"07 Mar",icon:"📺",type:"expense"},
  {id:4,name:"Carburant",cat:"Transport",amt:-220,date:"08 Mar",icon:"⛽",type:"expense"},
  {id:5,name:"Loyer",cat:"Logement",amt:-3200,date:"01 Mar",icon:"🏠",type:"expense"},
];
const INIT_BUDGETS=[
  {cat:"Alimentation",spent:340,total:2000,color:C.jade,icon:"🛒"},
  {cat:"Transport",spent:220,total:800,color:C.blue,icon:"🚗"},
  {cat:"Loisirs",spent:0,total:600,color:C.warn,icon:"🎉"},
  {cat:"Abonnements",spent:59,total:400,color:C.danger,icon:"📱"},
  {cat:"Santé",spent:0,total:500,color:C.purple,icon:"💊"},
];
const INIT_GOALS=[
  {name:"Voyage Europe",target:15000,saved:6200,icon:"✈️",color:C.blue},
  {name:"Fonds urgence",target:30000,saved:18500,icon:"🛡️",color:C.jade},
];

export default function App() {
  const [lang,setLang]=useState("fr");
  const [tab,setTab]=useState("home");
  const [modal,setModal]=useState(null);
  const [transactions,setTransactions]=useState(INIT_TX);
  const [budgets,setBudgets]=useState(INIT_BUDGETS);
  const [goals,setGoals]=useState(INIT_GOALS);
  const t=T[lang];

  function addTransaction(tx) {
    setTransactions(p=>[tx,...p]);
    if(tx.type==="expense") setBudgets(p=>p.map(b=>b.cat===tx.cat?{...b,spent:b.spent+Math.abs(tx.amt)}:b));
  }
  function deleteTransaction(id) {
    const tx=transactions.find(x=>x.id===id);
    if(tx?.type==="expense") setBudgets(p=>p.map(b=>b.cat===tx.cat?{...b,spent:Math.max(0,b.spent-Math.abs(tx.amt))}:b));
    setTransactions(p=>p.filter(x=>x.id!==id));
  }

  const NAV=[
    {id:"home",label:t.add.slice(0,5),icon:(a)=><svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M3 9.5L10 3l7 6.5V17a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" stroke={a?C.jade:C.t3} strokeWidth="1.5" fill={a?`${C.jade}20`:"none"} strokeLinejoin="round"/></svg>,label2:t.goals.slice(0,7)},
    {id:"budget",icon:(a)=><svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="7" stroke={a?C.jade:C.t3} strokeWidth="1.5" fill={a?`${C.jade}20`:"none"}/><path d="M10 6v8M7 8.5h4.5a1.5 1.5 0 010 3H7" stroke={a?C.jade:C.t3} strokeWidth="1.3" strokeLinecap="round"/></svg>},
    {id:"transactions",icon:(a)=><svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 6h12M4 10h8M4 14h5" stroke={a?C.jade:C.t3} strokeWidth="1.5" strokeLinecap="round"/><path d="M15 12l2 2-2 2" stroke={a?C.jade:C.t3} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>},
    {id:"credit",icon:(a)=><svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2l1.9 5.6H18l-4.9 3.6 1.9 5.6L10 13.2 5 16.8l1.9-5.6L2 7.6h6.1L10 2z" stroke={a?C.jade:C.t3} strokeWidth="1.4" fill={a?`${C.jade}20`:"none"} strokeLinejoin="round"/></svg>},
    {id:"goals",icon:(a)=><svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="7" stroke={a?C.jade:C.t3} strokeWidth="1.5" fill={a?`${C.jade}20`:"none"}/><circle cx="10" cy="10" r="3" stroke={a?C.jade:C.t3} strokeWidth="1.3"/><circle cx="10" cy="10" r="1" fill={a?C.jade:C.t3}/></svg>},
  ];
  const NAV_LABELS={"home":{fr:"Accueil",en:"Home",es:"Inicio",ar:"الرئيسية"},"budget":{fr:"Budget",en:"Budget",es:"Presupuesto",ar:"الميزانية"},"transactions":{fr:"Historique",en:"History",es:"Historial",ar:"السجل"},"credit":{fr:"Crédit",en:"Credit",es:"Crédito",ar:"الائتمان"},"goals":{fr:"Objectifs",en:"Goals",es:"Metas",ar:"الأهداف"}};

  return (
    <div style={{ fontFamily:"'Sora',sans-serif",background:C.bg,minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:"16px 0" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@600;700;800&family=Space+Mono:wght@400;700&display=swap');*{box-sizing:border-box;margin:0;padding:0;}::-webkit-scrollbar{width:0;}button,input{font-family:'Sora',sans-serif;outline:none;}@keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}.screen{animation:fadeIn .2s ease forwards;}`}</style>
      <div style={{ width:390,background:C.bg2,borderRadius:46,overflow:"hidden",border:`1.5px solid rgba(255,255,255,0.06)`,boxShadow:`0 40px 100px rgba(0,0,0,0.7)`,maxHeight:"90vh",display:"flex",flexDirection:"column",position:"relative" }}>
        {/* Status bar */}
        <div style={{ height:44,background:C.bg,display:"flex",alignItems:"flex-end",justifyContent:"space-between",padding:"0 22px 8px",flexShrink:0 }}>
          <span style={{ fontSize:12,fontWeight:600,color:C.t1,fontFamily:"'Space Mono',monospace" }}>9:41</span>
          <div style={{ width:96,height:20,background:C.bg,borderRadius:"0 0 16px 16px",border:`1.5px solid rgba(255,255,255,0.05)`,borderTop:"none" }}/>
          <div style={{ display:"flex",gap:5,alignItems:"center" }}>
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none"><rect x="0" y="6" width="2.5" height="6" rx="1" fill={C.t2}/><rect x="4" y="4" width="2.5" height="8" rx="1" fill={C.t2}/><rect x="8" y="2" width="2.5" height="10" rx="1" fill={C.t2}/><rect x="12" y="0" width="2.5" height="12" rx="1" fill={C.t1}/></svg>
            <svg width="20" height="12" viewBox="0 0 20 12" fill="none"><rect x="0.5" y="0.5" width="16" height="11" rx="3" stroke={C.t2} strokeWidth="1"/><rect x="2" y="2" width="11" height="8" rx="2" fill={C.jade}/><path d="M18 4v4" stroke={C.t2} strokeWidth="1.5" strokeLinecap="round"/></svg>
          </div>
        </div>
        {/* Screen */}
        <div className="screen" key={tab+lang} style={{ flex:1,overflowY:"auto",overflowX:"hidden",color:C.t1 }}>
          {tab==="home"         && <Home t={t} setTab={setTab} transactions={transactions} setModal={setModal} lang={lang} setLang={setLang}/>}
          {tab==="budget"       && <BudgetScreen t={t} budgets={budgets} setModal={setModal}/>}
          {tab==="credit"       && <CreditScreen t={t}/>}
          {tab==="transactions" && <TransactionsScreen t={t} transactions={transactions} setModal={setModal} onDelete={deleteTransaction}/>}
          {tab==="goals"        && <GoalsScreen t={t} goals={goals} setModal={setModal} onDelete={i=>setGoals(p=>p.filter((_,j)=>j!==i))}/>}
          {tab==="notifs"       && <NotifsScreen t={t}/>}
        </div>
        {/* FAB */}
        <button onClick={()=>setModal("add")} style={{ position:"absolute",bottom:78,right:16,width:50,height:50,borderRadius:"50%",background:`linear-gradient(135deg,${C.blue},${C.jade})`,border:"none",cursor:"pointer",fontSize:26,color:C.bg,boxShadow:`0 4px 20px rgba(0,229,160,0.35)`,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,zIndex:50 }}>+</button>
        {/* Bottom nav */}
        <div style={{ height:68,background:C.bg,borderTop:`1px solid rgba(255,255,255,0.04)`,display:"flex",alignItems:"center",justifyContent:"space-around",padding:"0 4px 10px",flexShrink:0 }}>
          {NAV.map(n=>{const a=tab===n.id;return(
            <button key={n.id} onClick={()=>setTab(n.id)} style={{ flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:3,padding:"4px 0",background:"none",border:"none",cursor:"pointer" }}>
              {n.icon(a)}
              <span style={{ fontSize:8,fontWeight:a?600:400,color:a?C.jade:C.t3,letterSpacing:".02em",textAlign:"center",lineHeight:1.2 }}>{NAV_LABELS[n.id][lang]}</span>
              {a&&<div style={{ width:4,height:4,borderRadius:"50%",background:C.jade }}/>}
            </button>
          );})}
        </div>
        {/* Modals */}
        {modal==="add"    && <AddModal    t={t} onClose={()=>setModal(null)} onAdd={addTransaction}/>}
        {modal==="budget" && <BudgetModal t={t} budgets={budgets} onClose={()=>setModal(null)} onSave={setBudgets}/>}
        {modal==="goal"   && <GoalModal   t={t} onClose={()=>setModal(null)} onAdd={g=>setGoals(p=>[...p,g])}/>}
      </div>
    </div>
  );
}
