!function(){"use strict";class e{constructor(e,t){Array.from(document.querySelectorAll(e)).map((e=>this.createGal(e,t)))}createGal(e,t){e.classList.add("ctclig-image-list");let l=document.createElement("div");l.classList.add("ctclig-main-image"),l.style.height=`${t.mainImgHt}px`,l.style.width=`${t.mainImgWd}px`,l.style.backgroundImage=`url("${e.querySelector("img").src}")`,e.insertBefore(l,e.querySelector("img"));let i=document.createElement("div");i.style.width=76*t.imgGal.length+"px",i.style.marginLeft="auto",i.style.marginRight="auto",i.style.display="block";let r=document.createElement("div");r.style.width=`${t.mainImgWd}px`,r.style.overflowX="auto",r.style.overflowY="hidden",r.style.marginLeft="auto",r.style.marginRight="auto",r.style.display="block",r.appendChild(i),e.insertBefore(r,e.querySelector("img")),Array.from(e.querySelectorAll("img")).map((t=>{let l=document.createElement("img");l.src=t.src,l.style.border="1px solid rgba(0,0,0,1)",l.style.width="70px",l.style.height="70px",l.style.margin="2px",l.addEventListener("mouseover",(t=>{e.querySelector(".ctclig-main-image").style.backgroundImage=`url("${t.target.src}")`})),t.style.display="none",i.appendChild(l)}))}}class t{constructor(e,t){this.prepMas(e,t)}prepMas(e,t){let l=Array.from(document.querySelectorAll(e)),i=0;l.map((e=>{let l=null!=t&&null!=t.elSelector?e.querySelector(t.elSelector):e.children[0];if(null!=l){let r=null!=t&&null==t.elWidth&&!0===t.percentWidth?l.offsetWidth/e.offsetWidth:null;this.layBrks(e,t,r),i++,window.addEventListener("resize",(l=>{e.classList.contains("ctclig-image-list")||e.classList.contains("webcam-carousel-gallery")||this.layBrks(e,t,r,l)}))}})),1<i&&window.dispatchEvent(new Event("resize"))}layBrks(e,t,l,i){let r=null!=t&&null!=t.elSelector?Array.from(e.querySelectorAll(t.elSelector)):Array.from(e.children),n=e.offsetWidth,a=null!=t&&null!=t.elWidth?t.elWidth:null!=l||null!=l?n*l:r[0].offsetWidth,o=null!=t&&null!=t.elMargin?t.elMargin:0,s=(n-o)/(a+o),d=Math.floor(s),g=((s-d)*a+(s+1)*o)/(d+1),c=Array(),p=Array(),h=Array(),u=Array();for(let t=0;t<=d-1;t++)p.push(e.offsetTop+o),c.push([e.offsetTop+o,e.offsetLeft+t*a+(t+1)*g]);if(null!=t&&null!=t.heightSort){for(let e in r)h.push(r[e].offsetHeight);"DESC"==t.heightSort.toUpperCase()?h.sort(((e,t)=>t-e)):"ASC"==t.heightSort.toUpperCase()&&h.sort(((e,t)=>e-t));for(let e in h)for(let t in r)r[t].offsetHeight==h[e]&&u.push(r.splice(t,1)[0])}else u=r;u.map(((l,r)=>{let n=1;c.map(((e,t)=>{if(p[0]===e[0]&&1===n)if(l.style.width=`${a}px`,l.style.position="absolute",l.style.left=`${e[1]}px`,l.style.top=`${e[0]}px`,n++,"img"===l.nodeName.toLowerCase()){l.style.height="";let i=a/l.offsetWidth*l.offsetHeight;l.style.height=`${i}px`,p[0]=e[0]+i+g,c[t]=[e[0]+i+g,e[1]],p.sort(((e,t)=>e-t))}else p[0]=e[0]+l.offsetHeight+g,c[t]=[e[0]+l.offsetHeight+g,e[1]],p.sort(((e,t)=>e-t))})),r===u.length-1&&(p.sort(((e,t)=>t-e)),e.style.height=p[0]-e.offsetTop+o+"px",null==i&&(null!=t?"function"==typeof t.callback&&t.callback(e):window.dispatchEvent(new Event("resize"))))}))}}class l{constructor(e,t){Array.from(document.querySelectorAll(e)).map(((e,l)=>this.prepCarousel(e,l,t)))}prepCarousel(e,t,l){let i=e.offsetWidth,r=e.offsetHeight,n={},a=Array.from(e.querySelectorAll("img"));a.map(((e,t)=>e.style.display="none"));let o=document.createElement("div");o.style=`width:${.42*i}px;height:${.7*r}px;z-index:400;display:inline-block;position:absolute;margin-top:${.15*r}px;margin-left:0px;background :rgba(0, 0 , 0, 1) url("") no-repeat center; background-size:cover;box-shadow:0px 5px 10px 2px black;`,n.prevThree=o,e.appendChild(o);let s=document.createElement("div");s.style=`width:${.49*i}px;height:${.8*r}px;z-index:500;display:inline-block;position:absolute;margin-top:${.1*r}px;margin-left:${.06*i}px;background :rgba(0, 0 , 0, 1) url("") no-repeat center; background-size:cover;box-shadow:0px 10px 15px 2px black;`,n.prevTwo=s,e.appendChild(s);let d=document.createElement("div");d.style=`width:${.63*i}px;height:${.9*r}px;z-index:700;display:inline-block;position:absolute;margin-top:${.05*r}px;margin-left:${.14*i}px;background :rgba(0, 0 , 0, 1) url("") no-repeat center; background-size:cover;box-shadow:0px 15px 20px 2px black;`,n.prevOne=d,e.appendChild(d);let g=document.createElement("div");g.style=`width:${.52*i}px;height:${r}px;z-index:1000;display:inline-block;position:absolute;margin-top:0px;margin-left:${.24*i}px;background :rgba(0, 0 , 0, 1) url("") no-repeat center; background-size:contain;box-shadow:0px 20px 25px 2px black;`,n.mainDiv=g,e.appendChild(g);let c=document.createElement("div");c.style=`width:${.63*i}px;height:${.9*r}px;z-index:700;display:inline-block;position:absolute;margin-top:${.05*r}px;margin-left:${.24*i}px;background :rgba(0, 0 , 0, 1) url("") no-repeat center; background-size:cover;box-shadow:0px 15px 20px 2px black;`,n.nextOne=c,e.appendChild(c);let p=document.createElement("div");p.style=`width:${.49*i}px;height:${.8*r}px;z-index:500;display:inline-block;position:absolute;margin-top:${.1*r}px;margin-left:${.45*i}px;background :rgba(0, 0 , 0, 1) url("") no-repeat center; background-size:cover;box-shadow:0px 10px 15px 2px black;`,n.nextTwo=p,e.appendChild(p);let h=document.createElement("div");h.style=`width:${.42*i}px;height:${.7*r}px;z-index:400;display:inline-block;position:absolute;margin-top:${.15*r}px;margin-left:${.58*i};background :rgba(0, 0 , 0, 1) url("") no-repeat center; background-size:cover;box-shadow:0px 5px 10px 2px black;`,n.nextThree=h,e.appendChild(h),this.createCarousel(0,a,n,t,l);for(let e in n)"mainDiv"!=e&&(n[e].addEventListener("click",(e=>this.createCarousel(parseInt(e.target.getAttribute("data-num")),a,n,t,l))),n[e].addEventListener("mouseenter",(e=>e.target.style.border="1px dotted rgba(0,0,0,0)")),n[e].addEventListener("mouseleave",(e=>e.target.style.border="")));null!=l&&"function"==typeof l.callBack&&l.callBack(e),window.addEventListener("resize",(()=>this.adjustOnResize(e,n,t)))}createCarousel(e,t,l,i,r){let n,a,o,s,d,g;n=0==e?t.length-3:1==e?t.length-2:2==e?t.length-1:e-3,a=0==e?t.length-2:1==e?t.length-1:e-2,o=0==e?t.length-1:e-1,s=e==t.length-1?0:e+1,d=e==t.length-1?1:e==t.length-2?0:e+2,g=e==t.length-1?2:e==t.length-2?1:e==t.length-3?0:e+3,l.prevThree.style.backgroundImage=`url('${t[n].src}')`,l.prevThree.title=null!=t[n].title?t[n].title:"",l.prevThree.setAttribute("data-num",n),l.prevTwo.style.backgroundImage=`url('${t[a].src}')`,l.prevTwo.title=null!=t[a].title?t[a].title:"",l.prevTwo.setAttribute("data-num",a),l.prevOne.style.backgroundImage=`url('${t[o].src}')`,l.prevOne.title=null!=t[o].title?t[o].title:"",l.prevOne.setAttribute("data-num",o);let c=new Image;c.src=t[e].src,c.title=null!=t[e].title?t[e].title:"",l.mainDiv.style.backgroundImage="url('')";let p=l.mainDiv.querySelector("#img-loading-"+i);if(null==p){p=document.createElement("div"),p.id=`img-loading-${i}`,p.style=`margin-left:${(l.mainDiv.offsetWidth-40)/2}px;margin-top:${(l.mainDiv.offsetHeight-40)/2}px;height:40px;width:40px;border-radius:50%;border-color:rgba(255,255,255,1);border-style: solid; border-width: 3px;z-index:1100; `,p.setAttribute("data-wait","left"),l.mainDiv.appendChild(p);var h=setInterval((()=>{switch(p.getAttribute("data-wait")){case"left":p.setAttribute("data-wait","top"),p.style.borderColor="rgba(255,255,255,0.5)",p.style.borderTop="3px solid  rgba(255,255,255,0.8)";break;case"top":p.setAttribute("data-wait","right"),p.style.borderColor="rgba(255,255,255,0.5)",p.style.borderRight="3px solid  rgba(255,255,255,0.8)";break;case"right":p.setAttribute("data-wait","bottom"),p.style.borderColor="rgba(255,255,255,0.5)",p.style.borderBottom="3px solid  rgba(255,255,255,0.8)";break;case"bottom":p.setAttribute("data-wait","left"),p.style.borderColor="rgba(255,255,255,0.5)",p.style.borderLeft="3px solid  rgba(255,255,255,0.8)"}}),400)}c.addEventListener("load",(e=>{clearInterval(h),l.mainDiv.removeChild(p),l.mainDiv.style.backgroundImage=`url('${e.target.src}')`,l.mainDiv.title=null!=e.target.title?e.target.title:""})),l.nextOne.style.backgroundImage=`url('${t[s].src}')`,l.nextOne.title=null!=t[s].title?t[s].title:"",l.nextOne.setAttribute("data-num",s),l.nextTwo.style.backgroundImage=`url('${t[d].src}')`,l.nextTwo.title=null!=t[d].title?t[d].title:"",l.nextTwo.setAttribute("data-num",d),l.nextThree.style.backgroundImage=`url('${t[g].src}')`,l.nextThree.title=null!=t[g].title?t[g].title:"",l.nextThree.setAttribute("data-num",g)}adjustOnResize(e,t,l){let i=e.offsetWidth,r=e.offsetHeight,n=t.prevThree;n.style.width=.42*i+"px",n.style.height=.7*r+"px",n.style.marginTop=.15*r+"px",n.style.marginLeft="0px";let a=t.prevTwo;a.style.width=.49*i+"px",a.style.height=.8*r+"px",a.style.marginTop=.1*r+"px",a.style.marginLeft=.06*i+"px";let o=t.prevOne;o.style.width=.63*i+"px",o.style.height=.9*r+"px",o.style.marginTop=.05*r+"px",o.style.marginLeft=.14*i+"px";let s=t.mainDiv;s.style.width=.52*i+"px",s.style.height=`${r}px`,s.style.marginTop="0px",s.style.marginLeft=.24*i+"px";let d=s.querySelector("#img-loading-"+l);null!=d&&(d.style.marginLeft=(s.offsetWidth-40)/2+"px",d.style.marginTop=(s.offsetHeight-40)/2+"px");let g=t.nextOne;g.style.width=.63*i+"px",g.style.height=.9*r+"px",g.style.marginTop=.05*r+"px",g.style.marginLeft=.24*i+"px";let c=t.nextTwo;c.style.width=.49*i+"px",c.style.height=.8*r+"px",c.style.marginTop=.1*r+"px",c.style.marginLeft=.45*i+"px";let p=t.nextThree;p.style.width=.42*i+"px",p.style.height=.7*r+"px",p.style.marginTop=.15*r+"px",p.style.marginLeft=.58*i+"px"}}class i{constructor(e,t){Array.from(document.querySelectorAll(e)).forEach(((e,l)=>this.prepareGal(e,l,t))),window.addEventListener("resize",(e=>this.adjustApp(e))),window.addEventListener("keydown",(e=>this.onKeyStroke(e))),this.ssIntervalId=0}prepareGal(e,t){let l=Array.from(e.querySelectorAll("img"));l.forEach(((e,i)=>e.addEventListener("click",(e=>this.createOverlay(event.target,i,l,t)))))}createOverlay(e,t,l,i){let r=window.innerWidth+1,n=window.innerHeight+1,a=1<l.length?.94:1,o=1<l.length?.04:0,s=document.createElement("style");s.id="ctc-scroll-css",s.innerHTML="::-webkit-scrollbar-track {background: rgba(255, 255, 255, 1);} ::-moz-scrollbar-track { background: rgba(255, 255, 255, 1);} #gal-sidebar::-webkit-scrollbar {display: none;} #gal-sidebar::-moz-scrollbar {display: none;}",document.querySelector("head").appendChild(s),document.body.style.overflow="hidden";let d=document.createElement("div");d.id="gallery-overlay",d.style=`position:fixed;height:${n}px;width:${r}px;background-color:rgba(0,0,0,.6);z-index:100000;top:0%;left:0%;right:0%;bottom:0%;`,document.body.insertBefore(d,document.body.firstChild);let g=document.createElement("span");g.id="overlay-close-btn",g.title="Close",g.innerHTML="&#10539;",g.style=`cursor:pointer;position:absolute;float:right;right:3px;font-size:${.016*r}px;color:rgba(255,255,255,1);text-shadow:-1px -1px 1px rgba(0,0,0,1);z-index:200000;`,d.appendChild(g),g.addEventListener("click",(()=>this.closeOverlay(d)));let c=document.createElement("span");c.id="image-loading-main",c.style=`left:${.992*r/2};top:${n/2};font-size:${.016*r}px;display:inline-block;position:fixed;color:rgba(255,255,255,1);`,c.innerHTML="Loading",d.appendChild(c);let p=setInterval((()=>{switch(c.innerHTML){case"Loading":case"Loading...<b>.</b>":c.innerHTML="Loading<b>.</b>";break;case"Loading<b>.</b>":c.innerHTML="Loading.<b>.</b>";break;case"Loading.<b>.</b>":c.innerHTML="Loading..<b>.</b>";break;case"Loading..<b>.</b>":c.innerHTML="Loading...<b>.</b>"}}),350),h=document.createElement("img"),u=new Image;u.src=e.src,h.id="loaded-img",h.src=e.src,h.style.display="none";let m=this.getOptimizedImageSize(r,n,u.width,u.height,l.length);u.addEventListener("load",(t=>{clearInterval(p),c.style.display="none",h.style=`z-index:180000;height:${m.height}px;width:${m.width}px;display:inline-block;margin:${(n-m.height)/2}px ${(a*r-m.width)/2}px;`,h.title=null!=e.getAttribute("title")||null!=e.getAttribute("title")?e.getAttribute("title"):""})),d.appendChild(h);let b=document.createElement("div");b.id="img-title-info",b.style=`z-index:195000;position:fixed;text-align:center;height:${.02*n}px;width:${m.width}px;bottom:1px;color:rgba(255,255,255,1);font-size:${.015*n};left:${o*r+(a*r-m.width)/2}px;`,b.innerHTML=null!=e.getAttribute("title")||null!=e.getAttribute("title")?e.getAttribute("title"):"",d.appendChild(b),1<l.length&&(this.createToolbar(d,l,h,t,i),this.createSidebar(d,l,h,t,i),h.addEventListener("click",(e=>{e.offsetX>e.target.offsetWidth/2?document.querySelector("#gal-next-img").click():document.querySelector("#gal-prev-img").click()})))}createToolbar(e,t,l,i,r){let n=e.querySelector("#toolbar-div"),a=e.offsetWidth,o=e.offsetHeight,s=t.length-1>=i+1?i+1:0,d=0<=i-1?i-1:t.length-1,g=`font-family:serif;height:${.02*a}px;width:${.02*a}px;text-align:center;font-size:${.016*a}px;cursor:pointer;color:rgba(255,255,255,1);border-radius:${.02*a}px;margin-top:${.002*a}px;background-color:rgba(0,0,0,0.8);`;if(null==n){let i=document.createElement("div");i.id="toolbar-div",i.style=`top:${o/1.6-.077*a}px;float:right; transform: translateY(-50%); right: 0px;display: inline-block;position: fixed;`;let r=document.createElement("div");r.id="gal-prev-img",r.style=g,r.innerHTML="&#60;",r.title="Previous image",r.addEventListener("click",(i=>this.loadImg(parseInt(i.target.getAttribute("data-img-num")),t,e,l))),r.setAttribute("data-img-num",d),r.addEventListener("mouseenter",(e=>e.target.style.fontWeight="bolder")),r.addEventListener("mouseleave",(e=>e.target.style.fontWeight="")),i.insertBefore(r,i.firstChild);let n=document.createElement("div");n.id="img-zoom-in",n.style=g,n.innerHTML="&#43;",n.title="Zoom in",n.addEventListener("click",(()=>l.style.transform=0===l.style.transform.length?"scale(1.2)":`scale(${parseFloat(l.style.transform.replace("scale(","").replace(")",""))+.2})`)),n.addEventListener("mouseenter",(e=>e.target.style.fontWeight="bolder")),n.addEventListener("mouseleave",(e=>e.target.style.fontWeight="")),i.appendChild(n);let c=document.createElement("div");c.id="img-zoom-out",c.style=g,c.innerHTML="&#8722;",c.title="Zoom out",c.addEventListener("click",(()=>{let e=parseFloat(l.style.transform.replace("scale(","").replace(")",""))-.2,t=0>e?.1:e;l.style.transform=0===l.style.transform.length?"scale(0.8)":`scale(${t})`})),c.addEventListener("mouseenter",(e=>e.target.style.fontWeight="bolder")),c.addEventListener("mouseleave",(e=>e.target.style.fontWeight="")),i.appendChild(c);let p=document.createElement("div");p.id="gal-next-img",p.style=g,p.innerHTML="&#62;",p.title="Next image",p.addEventListener("click",(i=>this.loadImg(parseInt(i.target.getAttribute("data-img-num")),t,e,l))),p.setAttribute("data-img-num",s),p.addEventListener("mouseenter",(e=>e.target.style.fontWeight="bolder")),p.addEventListener("mouseleave",(e=>e.target.style.fontWeight="")),i.appendChild(p),e.appendChild(i)}else{let t=e.querySelector("#image-loading-main");null!=t&&e.removeChild(t),n.querySelector("#gal-prev-img").setAttribute("data-img-num",d),n.querySelector("#gal-next-img").setAttribute("data-img-num",s)}}createSidebar(e,t,l,i,r){let n=document.createElement("div");n.id="gal-sidebar",n.style=`overflow-y:auto;tex-align:center;display:inline-block;width:${.04*e.offsetWidth}px;height:${e.offsetHeight}px;float:left;left:0;background-color:rgba(0,0,0,0.1);z-index:105000;`,e.appendChild(n);let a=`overflow-x: hidden;transition: width 0.5s, height 0.5s;cursor:pointer;background-color:rgba(255,255,255,1);width:93%;height:${.93*n.offsetWidth}px;border:1px dotted rgba(0,0,0,0.8);background-repeat: no-repeat;background-size:contain;background-position: center;text-align:center;color:rgba(0,0,0,1);font-size:${.6*n.offsetWidth}px;`;t.map(((i,r)=>{let o=new Image;o.src=i.src;let s=document.createElement("div");s.classList.add("img-preview"),s.title=null!=i.getAttribute("title")||null!=i.getAttribute("title")?i.getAttribute("title"):"",s.style=a,s.addEventListener("mouseenter",(e=>e.target.style.borderRadius="12%")),s.addEventListener("mouseleave",(e=>e.target.style.borderRadius="5%")),s.innerHTML="<b>.</b>",n.appendChild(s);let d=setInterval((()=>{switch(s.innerHTML){case"<b>.</b>":s.innerHTML="<b>.</b>.";break;case"<b>.</b>.":s.innerHTML=".<b>.</b>.";break;case".<b>.</b>.":s.innerHTML="...<b>.</b>";break;case"...<b>.</b>":s.innerHTML="<b>.</b>"}}),250);o.addEventListener("load",(e=>{clearInterval(d),s.innerHTML="",s.style.backgroundImage=`url('${e.target.src}')`})),s.addEventListener("click",(()=>this.loadImg(r,t,e,l)))})),this.scrollToPrev(i),n.style.paddingTop=0<(e.offsetHeight-t.length*(.93*n.offsetWidth+2))/2?(e.offsetHeight-t.length*(.93*n.offsetWidth+2))/2+"px":"0px"}loadImg(e,t,l,i){var r=new Image;r.src=t[e].src,i.src=t[e].src,i.style.display="none";let n=document.createElement("span");n.id="image-loading-main",n.style=`left:${.992*l.offsetWidth/2};top:${l.offsetHeight/2};font-size:${.016*l.offsetWidth}px;display:inline-block;position:fixed;color:rgba(255,255,255,1);`,n.innerHTML="Loading",l.appendChild(n);let a=setInterval((()=>{switch(n.innerHTML){case"Loading":case"Loading...<b>.</b>":n.innerHTML="Loading<b>.</b>";break;case"Loading<b>.</b>":n.innerHTML="Loading.<b>.</b>";break;case"Loading.<b>.</b>":n.innerHTML="Loading..<b>.</b>";break;case"Loading..<b>.</b>":n.innerHTML="Loading...<b>.</b>"}}),350),o=this.getOptimizedImageSize(l.offsetWidth,l.offsetHeight,r.width,r.height,t.length);r.addEventListener("load",(()=>{clearInterval(a),n.style.display="none",i.style=`z-index:180000;height:${o.height}px;width:${o.width}px;display:inline-block;margin:${(l.offsetHeight-o.height)/2}px ${(.94*l.offsetWidth-o.width)/2}px;`,i.title=null!=t[e].getAttribute("title")||null!=t[e].getAttribute("title")?t[e].getAttribute("title"):""}));let s=document.querySelector("#img-title-info");s.style.overflow,s.innerHTML=null!=t[e].getAttribute("title")||null!=t[e].getAttribute("title")?t[e].getAttribute("title"):"",s.style.width=o.width+"px",s.style.left=.04*l.offsetWidth+(.94*l.offsetWidth-o.width)/2+"px",this.createToolbar(l,t,i,e),this.scrollToPrev(e)}scrollToPrev(e){Array.from(document.querySelectorAll(".img-preview")).forEach(((t,l)=>{l===e?(t.scrollIntoView({block:"center"}),t.style.border="1px solid rgba(255, 0, 0, 0.8)"):t.style.border="1px solid rgba(0,0,0,0.8)"}))}adjustApp(e){let t=window.innerWidth,l=window.innerHeight,i=document.querySelector("#gallery-overlay");if(null!=i){let e=i.querySelector("#overlay-close-btn");i.style.height=`${l}px`,i.style.width=`${t}px`,e.style.fontSize=""+.016*t;let r=document.querySelector("#loaded-img"),n=document.querySelector("#gal-sidebar"),a=null!=n?2:1,o=null!=n?.94:1,s=null!=n?.04:0,d=i.querySelector("#image-loading-main");d.style.left=""+.992*t/2,d.style.top=""+l/2,d.style.fontSize=.016*t+"px";let g=new Image;g.src=r.src;let c=this.getOptimizedImageSize(t,l,g.width,g.height,a),p=r.style.display;r.style=`height:${c.height}px;width:${c.width}px;display:${p};margin:${(l-c.height)/2}px ${(o*t-c.width)/2}px;`;let h=document.querySelector("#img-title-info");if(h.style.overflow="hidden",h.style.width=c.width+"px",h.style.height=.02*l+"px",h.style.left=s*t+(o*t-c.width)/2+"px",h.style.fontSize=.015*l+"px",null!=n){let e=Array.from(n.querySelectorAll("div"));n.style.height=l+"px",n.style.width=.04*t+"px",n.style.paddingTop=0<(l-e.length*(.93*n.offsetWidth+2))/2?(l-e.length*(.93*n.offsetWidth+2))/2+"px":"0px",e.map((e=>{e.style.height=.93*n.offsetWidth+"px",e.style.fontSize=.6*n.offsetWidth+"px"}));let r=i.querySelector("#toolbar-div");r.style=`top:${l/1.8-.077*t}px;float:right;right: 0px;display: inline-block;position: fixed;`,Array.from(r.querySelectorAll("div")).map((e=>{e.style.height=.02*t+"px",e.style.width=.02*t+"px",e.style.borderRadius=.02*t+"px",e.style.marginTop=.002*t+"px",e.style.fontSize="gal-slide-show"!=e.id?.016*t+"px":.011*t+"px"}))}}}closeOverlay(e){let t=e.querySelector("#gal-slide-show");null!=t&&0<parseInt(t.getAttribute("data-interval-id"))&&clearInterval(parseInt(t.getAttribute("data-interval-id"))),document.body.removeChild(e),document.body.style.overflow="",document.body.style.margin="",document.querySelector("head").removeChild(document.querySelector("#ctc-scroll-css"))}getOptimizedImageSize(e,t,l,i,r){let n=0,a=0,o=0,s=0,d=null!=r&&1<r?.93:.955,g=1-d;if(l>=e&&i>=t)l>=i?l>i?(a=l/e,s=l/a-g*e,o=i*(s/l),o>=d*t&&(n=t/i,o=i*n-g*t,s=l*(o/i))):e>t?(o=d*t,s=o):t>e?(s=d*e,o=s):(n=t/i,o=i*n-g*t,s=l*(o/i)):(n=i/t,o=i/n-g*t,s=l*(o/i));else if(l>=e&&i<t)a=e/l,s=l*a-g*e,o=i*(s/l);else if(i>=t&&l<e)n=t/i,o=i*n-g*t,s=l*(o/i),o=i*(s/l);else{let r=d*e,a=d*t;l>=r&&i>=a?(imgAvlHtRatio=a/i,s=r*(r/l),o=t*n):l>=r&&i<a?(s=l*(r/l),o=i*(s/l)):i>=a&&l<r?(o=i*(a/i),s=l*(o/i)):(s=l,o=i),o=i*(s/l)}return s>d*e&&(s=d*e,o=i*(s/l)),{width:s,height:o}}onKeyStroke(e){let t=document.querySelector("#gallery-overlay");if(null!=t)switch(e.code){case"ArrowUp":document.querySelector("#img-zoom-in").click();break;case"ArrowDown":document.querySelector("#img-zoom-out").click();break;case"ArrowLeft":document.querySelector("#gal-prev-img").click();break;case"ArrowRight":document.querySelector("#gal-next-img").click();break;case"Escape":t.querySelector("#overlay-close-btn").click()}}}window.addEventListener("DOMContentLoaded",(r=>{let n=document.querySelectorAll("div.webcam-gal-masonry"),a=document.querySelectorAll(".webcam-gal-product"),o=document.querySelectorAll(".webcam-gal-carousel");if(0!==n.length)Array.from(n).map((e=>{new i(`#${e.getAttribute("id")}`),e.style.display="block",new t(`#${e.getAttribute("id")}`,{elWidth:parseInt(e.getAttribute("data-mas-width")),elMargin:parseInt(e.getAttribute("data-mas-gutwd"))}),console.log(parseInt(e.getAttribute("data-mas-gutwd")))}));else if(0!==a.length)Array.from(a).map((t=>{new e(`#${t.getAttribute("id")}`,{imgGal:t.querySelectorAll("img"),mainImgWd:parseInt(t.getAttribute("data-prod-wd")),mainImgHt:parseInt(t.getAttribute("data-prod-ht"))}),t.style.display="block",Array.from(document.querySelectorAll(`#${t.getAttribute("id")} div`)).map(((e,l)=>{2==l&&(e.classList.add(t.getAttribute("id")),new i(`.${t.getAttribute("id")}`))})),document.querySelector(`#${t.getAttribute("id")} .ctclig-main-image`).addEventListener("click",(()=>document.querySelector(`#${t.getAttribute("id")} img`).click()))}));else{if(0===o.length)return;Array.from(o).map((e=>{e.style.width=`${e.getAttribute("data-carousel-width")}%`,e.style.height=`${e.getAttribute("data-carousel-height")}px`,e.style.marginLeft="auto",e.style.marginRight="auto",new l(`#${e.getAttribute("id")}`),e.style.display="block",window.dispatchEvent(new Event("resize"))}))}}))}();