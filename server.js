const http=require("http"),fs=require("fs"),path=require("path");
const KEY=process.env.HOSTKEY||"paradoks",PORT=process.env.PORT||3000;
let state=null,tmr=null;const peers={},cl=new Set(),hc=new Set();
const send=(r,ev,d)=>r.write(`event: ${ev}\ndata: ${JSON.stringify(d)}\n\n`);
const pushP=()=>{clearTimeout(tmr);tmr=setTimeout(()=>hc.forEach(r=>send(r,"p",Object.values(peers))),150)};
http.createServer((q,s)=>{const u=new URL(q.url,"http://x"),k=u.searchParams.get("k");
 if(u.pathname=="/events"){s.writeHead(200,{"Content-Type":"text/event-stream","Cache-Control":"no-cache",Connection:"keep-alive","X-Accel-Buffering":"no"});
  const h=k===KEY,set=h?hc:cl;set.add(s);if(state)send(s,"g",state);if(h)send(s,"p",Object.values(peers));
  const ping=setInterval(()=>s.write(": \n\n"),20000);q.on("close",()=>{clearInterval(ping);set.delete(s)});return}
 if(q.method=="POST"){let b="";q.on("data",c=>{b+=c;if(b.length>1e5)q.destroy()});q.on("end",()=>{
  try{const d=JSON.parse(b);
   if(u.pathname=="/state"){if(k!==KEY){s.writeHead(403);return s.end()}state=d;[...cl,...hc].forEach(r=>send(r,"g",d))}
   else if(u.pathname=="/vote"&&d.id){peers[String(d.id).slice(0,16)]=d;pushP()}}catch(e){}
  s.writeHead(204);s.end()});return}
 const f=u.pathname=="/"?"index.html":path.normalize(u.pathname).replace(/^(\.\.[\/\\])+/,"");
 fs.readFile(path.join(__dirname,f),(e,x)=>{if(e){s.writeHead(404);return s.end("404")}
  s.writeHead(200,{"Content-Type":f.endsWith(".html")?"text/html; charset=utf-8":"text/plain"});s.end(x)})
}).listen(PORT,()=>console.log("Oyun: http://localhost:"+PORT+"/?k="+KEY));
