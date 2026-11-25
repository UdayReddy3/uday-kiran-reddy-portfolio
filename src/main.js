import '@fontsource/inter/latin-400.css';import '@fontsource/inter/latin-500.css';import '@fontsource/inter/latin-600.css';import '@fontsource/inter/latin-700.css';import '@fontsource/inter/latin-800.css';
import '@fontsource/playfair-display/latin-700.css';import '@fontsource/playfair-display/latin-800.css';
import '@fontsource/jetbrains-mono/latin-400.css';import '@fontsource/jetbrains-mono/latin-500.css';import '@fontsource/jetbrains-mono/latin-700.css';
import './styles.css';
import {A,PROFILE,EXPERIENCE,CERTS,PROJECTS,SK,lvl,DOM,vis,ARCH,SL} from './data.js';
/* helpers */
const $=s=>document.querySelector(s),esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const NAV=["home","about","domains","skills","projects","architecture","certifications","resume","contact"];
function lb(label,url,cls=""){return url?`<a class="btn ${cls}" href="${esc(url)}" target="_blank" rel="noopener noreferrer">${label}</a>`:''}
const HNAV=NAV,lk=a=>a.map(n=>`<a href="#${n}">${n}</a>`).join('');$('#links').innerHTML=lk(HNAV);$('#flinks').innerHTML=lk(NAV);
const mb=$('#menu');mb.onclick=()=>{const o=$('#links').classList.toggle('open');mb.setAttribute('aria-expanded',o)};$('#links').onclick=()=>{$('#links').classList.remove('open');mb.setAttribute('aria-expanded',false)};

/* skills / experience / certs */
$('#skillgrid').innerHTML=Object.entries(SK).map(([c,a])=>`<div class="card rv"><h3 class="sc">${c}</h3>${a.map(([s,l])=>`<span class="sk lv-${l}">${s}</span>`).join('')}</div>`).join('');
$('#domgrid').innerHTML=DOM.map((d,i)=>`<article class="card dom rv"><span class="dn">0${i+1}</span><h3>${d.t}</h3><p>${d.d}</p><details><summary>Skills &amp; related projects</summary><div class="dtop">${d.topics.map(s=>`<span class="sk lv-${lvl(s)}">${s}</span>`).join('')}</div><p class="dnote">${d.note}</p><p class="dnote">Related projects${d.pn?' ('+d.pn.replace(/\.$/,'')+')':''}:</p><div class="dp">${d.proj.map(([k,n])=>`<a class="btn" href="#${k}">${n}</a>`).join('')}</div></details></article>`).join('');
const im=(src,alt)=>src?`<img loading="lazy" decoding="async" alt="${esc(alt)}" src="${src}" style="width:100%;border-radius:10px;margin-bottom:14px;border:1px solid var(--line)">`:'';
$('#expgrid').innerHTML=EXPERIENCE.map(x=>`<div class="card rv">${x.img?im(x.img,x.role+' certificate'):''}<h3>${x.role}</h3><p style="margin-bottom:4px">${x.org} · ${x.dur}</p><ul style="color:var(--mut);margin:0 0 8px;padding-left:18px">${x.resp.map(r=>`<li>${r}</li>`).join('')}</ul>${x.tech.map(t=>`<span class="chip">${t}</span>`).join('')}<ul style="color:var(--mut);margin:6px 0 0;padding-left:18px">${x.ach.map(r=>`<li>${r}</li>`).join('')}</ul></div>`).join('');
const cc=c=>{const pic=c.img?(c.pdf?`<a class="cimg" href="${c.pdf}" target="_blank" rel="noopener noreferrer" aria-label="Open ${esc(c.t)} certificate PDF">${im(c.img,c.t+' certificate')}</a>`:im(c.img,c.t+' certificate')):'';
return `<div class="card rv">${pic}<h3>${c.t}</h3>${c.iss?`<p class="cmeta"><b>${c.iss}</b><br>${c.dt}</p>`:''}<p>${c.d}</p><div class="cbtn">${c.pdf?`<a class="btn pri" href="${c.pdf}" target="_blank" rel="noopener noreferrer">View Certificate</a><a class="btn" href="${c.pdf}" download>Download PDF</a>`:''}${c.qr?`<button type="button" class="btn" data-act="qr" data-k="${c.pdf}">Verify Certificate</button>`:''}${lb("Verify Certificate",c.verify)}</div></div>`};
$('#certgrid').innerHTML=CERTS.filter(c=>!/Hackathon/.test(c.t)).map(cc).join('');$('#hackgrid').innerHTML=CERTS.filter(c=>/Hackathon/.test(c.t)).map(cc).join('');
$('#projgrid').innerHTML=Object.entries(PROJECTS).map(([k,p])=>`<article class="card proj rv">${vis(k)}<div class="pm"><span class="mono pc">${p.c}</span><span class="avb ${p.st==='Implemented'?'built':'planned'}">${p.st}</span></div><h3>${p.t}</h3><p class="pl"><b>Problem.</b> ${p.problem}</p><p class="pl"><b>Solution.</b> ${p.solution}</p><ul class="pf">${p.feat.map(f=>`<li>${f}</li>`).join('')}</ul><div>${p.tech.map(x=>`<span class="chip">${x}</span>`).join('')}</div><div class="btns"><a class="btn pri" href="#${k}">View Details</a>${lb("GitHub",p.gh)}${lb("Live demo",p.demo)}</div></article>`).join('');
/* architecture visualizer */
function archView(host,keys,start){
let key=start,sel=-1;
host.innerHTML='<div class="av"><div class="avtabs" role="tablist" aria-label="Choose a project"></div><div class="avhead"></div><div class="avflow"></div><div class="avexp"></div><div class="avleg"></div></div>';
const tabs=host.querySelector('.avtabs'),head=host.querySelector('.avhead'),flow=host.querySelector('.avflow'),exp=host.querySelector('.avexp'),leg=host.querySelector('.avleg');
function pick(i){sel=i;flow.querySelectorAll('.nd').forEach((b,j)=>b.setAttribute('aria-pressed',j===i));const n=ARCH[key].nodes[i];exp.querySelector('.avsel').innerHTML=`<b>${i+1}. ${n.n}</b> <span class="avb ${n.st}">${SL[n.st]}</span><p>${n.d}</p><span class="mono">${n.t}</span>`}
function render(){const a=ARCH[key],pl=a.nodes.some(n=>n.st==='planned');sel=-1;
head.innerHTML=`<h3>${a.label}</h3><span class="avb ${a.state}">${a.state==='built'?'Implemented':'Planned · under development'}</span>`;
flow.innerHTML=a.nodes.map((n,i)=>`${i?'<span class="ar" aria-hidden="true"></span>':''}<button type="button" class="nd ${n.st}" data-i="${i}" aria-pressed="false" style="--d:${i*70}ms"><span class="num">STEP ${i+1}</span><b>${n.n}</b><span class="tc">${n.t}</span><span class="nst">${SL[n.st]}</span></button>`).join('');
exp.innerHTML=`<p>${a.sum}</p><div class="avsel"><span class="mut">Select a step for details.</span></div><div class="chips" style="margin-top:12px">${a.stack.map(s=>`<span class="chip">${s}</span>`).join('')}</div>`;
leg.innerHTML=`${a.nodes.some(n=>n.st==='built')?'<span><i class="lgi built"></i>Implemented</span>':''}${pl?'<span><i class="lgi planned"></i>Planned</span>':''}`}
if(keys.length>1)keys.forEach(k=>{const b=document.createElement('button');b.type='button';b.className='avtab';b.setAttribute('role','tab');b.textContent=ARCH[k].title;b.setAttribute('aria-selected',k===key);b.onclick=()=>{key=k;tabs.querySelectorAll('.avtab').forEach(x=>x.setAttribute('aria-selected',x===b));render()};tabs.appendChild(b)});else tabs.remove();
flow.addEventListener('click',e=>{const b=e.target.closest('.nd');if(b)pick(+b.dataset.i)});
render()}
archView($('#archmain'),['deepcrop','brain'],'deepcrop');
/* certificate QR verification */
const qd=$('#qrdlg');
document.addEventListener('click',e=>{const b=e.target.closest('[data-act="qr"]');if(!b)return;const c=CERTS.find(x=>x.pdf===b.dataset.k);qd.innerHTML=`<h3>Verify: ${c.t}</h3><img class="qr" src="${c.qr}" alt="QR code printed on the original certificate" width="260" height="260"><p>Scan this QR code from the original certificate with your phone camera to verify it.</p><div class="cbtn">${c.qrUrl?`<a class="btn pri" href="${c.qrUrl}" target="_blank" rel="noopener noreferrer">Open verification link</a>`:''}<button type="button" class="btn" id="qrx">Close</button></div>`;qd.showModal();$('#qrx').onclick=()=>qd.close()});
qd.addEventListener('click',e=>{if(e.target===qd)qd.close()});
/* detail pages */
function detail(k){const p=PROJECTS[k],a=ARCH[p.arch],sec=(t,b)=>`<div class="card dsec"><h3>${t}</h3>${b}</div>`,li=a=>a.length?`<ul>${a.map(x=>`<li>${x}</li>`).join('')}</ul>`:'';
$('#detailbody').innerHTML=`<a class="btn" href="#projects">← Back to projects</a><p class="mono pc" style="margin:26px 0 8px">${p.c}</p><h2 style="max-width:26ch">${p.t}</h2><p><span class="avb ${p.st==='Implemented'?'built':'planned'}">${p.status||p.st}</span></p>${p.status?`<p class="sub">Details describe the intended design. Cloud deployment, real-time monitoring, accuracy and production use are not claimed as complete.</p>`:''}
<div class="cta" style="margin:16px 0 26px">${lb("GitHub repository",p.gh,"pri")}${lb("Live demo",p.demo)}</div>
<div class="dvis">${vis(k)}</div>
${sec('Project overview',`<p>${p.overview}</p>`)}${sec('Problem statement',`<p>${p.problem}</p>`)}${sec('Solution',`<p>${p.solution}</p>`)}
${sec('Implementation status',`<div class="grid g2"><div><p class="mono pc">Implemented</p>${p.impl.length?li(p.impl):'<p>No component is claimed as complete yet.</p>'}</div><div><p class="mono pc" style="color:#B78BFF">Planned</p>${p.plan.length?li(p.plan):'<p>No planned features listed.</p>'}</div></div>`)}
<div class="dsec"><h3 style="padding:0 2px">Architecture${a.nodes.some(n=>n.st==='planned')?' (planned)':''}</h3><div id="darch"></div></div>
${sec('Technology stack',p.tech.map(t=>`<span class="chip">${t}</span>`).join(''))}
${sec('Development workflow',li(p.workflow))}
${sec('Results',`<p>${p.results}</p>`)}`;
archView($('#darch'),[p.arch],p.arch)}
/* routing */
function route(){const h=location.hash.slice(1),t=h&&document.getElementById(h),P=PROJECTS[h],bad=h&&!t&&!P;
$('#nf').style.display=bad?'block':'none';
document.querySelectorAll('main > section').forEach(x=>{if(x.id==='nf')return;x.style.display=bad?'none':P?(x.id==='detail'?'block':'none'):(x.id==='detail'?'none':'')});
if(P){detail(h);scrollTo(0,0)}else if(t&&h&&h!=='detail')t.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth'})}
addEventListener('hashchange',route);route();
const RM=matchMedia('(prefers-reduced-motion:reduce)').matches;
/* typed roles */
const words=["Aspiring Data Analyst","Aspiring Data Scientist","Aspiring AI/ML Engineer","Python Developer"],T=$('#typed');
if(RM)T.textContent=words.join(" · ");else{let w=0,c=0,d=false;(function tick(){const s=words[w];T.textContent=s.slice(0,c);if(!d&&c===s.length){d=true;return setTimeout(tick,1500)}if(d&&c===0){d=false;w=(w+1)%words.length}c+=d?-1:1;setTimeout(tick,d?35:70)})()}
/* effects */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.08});
new MutationObserver(()=>document.querySelectorAll('.rv:not(.in)').forEach(n=>io.observe(n))).observe(document.body,{childList:true,subtree:true});
document.querySelectorAll('.rv').forEach(n=>io.observe(n));
const so=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)document.querySelectorAll('.links a').forEach(a=>a.classList.toggle('on',a.getAttribute('href')==='#'+e.target.id))}),{rootMargin:'-45% 0px -50% 0px'});
NAV.forEach(n=>{const s=document.getElementById(n);s&&so.observe(s)});
addEventListener('pointermove',e=>{if(e.pointerType!=='mouse')return;const c=$('#cur');c.style.left=e.clientX+'px';c.style.top=e.clientY+'px'},{passive:true});
if(!RM)addEventListener('scroll',()=>{const l=$('#heroL');if(l&&scrollY<700)l.style.transform=`translateY(${scrollY*.05}px)`},{passive:true});
$('#yr').textContent=new Date().getFullYear();
addEventListener('load',()=>setTimeout(()=>$('#load').classList.add('done'),600));
/* smooth scroll to contact */
document.querySelectorAll('a[href="#contact"]').forEach(a=>a.addEventListener('click',e=>{const c=$('#contact');if(!c||getComputedStyle(c).display==='none')return;e.preventDefault();c.scrollIntoView({behavior:RM?'auto':'smooth',block:'start'});try{history.replaceState(null,'','#contact')}catch(x){}}));
/* contact form. Set VITE_CONTACT_ENDPOINT (e.g. a Formspree URL) in Vercel to send messages directly; otherwise it opens the visitor's email app. */
const CONTACT_ENDPOINT=import.meta.env.VITE_CONTACT_ENDPOINT||"";
$('#form').addEventListener('submit',async ev=>{ev.preventDefault();const msg=$('#fmsg');msg.className='';msg.style.display='none';
const v={n:$('#n').value.trim(),e:$('#e').value.trim(),s:$('#s').value.trim(),m:$('#m').value.trim()};
const E={n:!v.n&&"Enter your name.",e:!/^\S+@\S+\.\S+$/.test(v.e)&&"Enter a valid email address.",s:!v.s&&"Enter a subject.",m:v.m.length<10&&"Write at least 10 characters."};
let bad=false;for(const k in E){document.querySelector(`[data-for="${k}"]`).textContent=E[k]||"";if(E[k])bad=true}if(bad)return;
const b=$('#send');b.disabled=true;
const done=(c,x)=>{b.disabled=false;b.textContent="Send Message";msg.className=c;msg.textContent=x};
if(CONTACT_ENDPOINT){b.textContent="Sending…";
try{const r=await fetch(CONTACT_ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify({name:v.n,email:v.e,subject:v.s,message:v.m})});
if(r.ok){done('ok',"Your message was sent. Thank you, I’ll get back to you soon.");$('#form').reset()}else done('bad',"Your message could not be sent (error "+r.status+"). Please email me at "+PROFILE.email+".")}
catch(x){done('bad',"Your message could not be sent. Please check your connection or email me at "+PROFILE.email+".")}return}
b.textContent="Opening email app…";
location.href=`mailto:${PROFILE.email}?subject=${encodeURIComponent(v.s)}&body=${encodeURIComponent(v.m+"\n\nFrom: "+v.n+" <"+v.e+">")}`;
setTimeout(()=>done('info',"Your email app should have opened with your message ready. It is delivered when you press Send there. If nothing opened, email me at "+PROFILE.email+"."),1200)});
