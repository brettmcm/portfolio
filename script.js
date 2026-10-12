const links=[...document.querySelectorAll('[data-proposal-contents] a')];
const sections=links.map(a=>document.querySelector(a.hash));
const thumb=document.querySelector('.proposal-scrollbar-thumb');
let frame;
function update(){cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>{let current=sections[0];sections.forEach(s=>{if(s.getBoundingClientRect().top<=innerHeight*.34)current=s});links.forEach(a=>a.hash===`#${current.id}`?a.setAttribute('aria-current','location'):a.removeAttribute('aria-current'));const r=document.documentElement,track=r.clientHeight-8,range=r.scrollHeight-r.clientHeight,h=Math.max(24,track*r.clientHeight/r.scrollHeight);thumb.style.height=`${h}px`;thumb.style.transform=`translateY(${range>0?(track-h)*r.scrollTop/range:0}px)`;thumb.style.opacity=range>0?'1':'0';});}
addEventListener('scroll',update,{passive:true});addEventListener('resize',update);new ResizeObserver(update).observe(document.body);update();
let outlinePointer=null,outlineFrame=0;
function updateOutline(){
 outlineFrame=0;
 links.forEach(a=>{
  const b=a.getBoundingClientRect();
  const distance=outlinePointer?Math.hypot((outlinePointer.x-b.left)/150,(outlinePointer.y-b.top-b.height/2)/36):Infinity;
  const influence=Math.exp(-distance*distance/2);
  a.querySelector('.contents-mark').style.setProperty('--mark-scale',String(1+3*influence));
 });
}
addEventListener('pointermove',e=>{outlinePointer={x:e.clientX,y:e.clientY};if(!outlineFrame)outlineFrame=requestAnimationFrame(updateOutline)},{passive:true});
document.documentElement.addEventListener('pointerleave',()=>{outlinePointer=null;if(!outlineFrame)outlineFrame=requestAnimationFrame(updateOutline)});


const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const panel=document.querySelector('#experience-panel');

if(panel){
let panelClosing=false;
const panelMotion={duration:340,easing:'cubic-bezier(.22,.68,0,1)',fill:'both'};
document.querySelector('#full-experience').addEventListener('click',()=>{
 if(panel.open)return;
 panel.classList.remove('is-closing');panel.showModal();document.body.classList.add('panel-open');
 if(!reduced.matches){const animation=panel.animate([{transform:'translateY(calc(100% + 8px))'},{transform:'translateY(0)'}],panelMotion);animation.finished.then(()=>animation.cancel()).catch(()=>{});}
});
async function closePanel(){
 if(panelClosing||!panel.open)return;panelClosing=true;panel.classList.add('is-closing');
 panel.getAnimations().forEach(a=>a.cancel());
 if(!reduced.matches){const animation=panel.animate([{transform:'translateY(0)'},{transform:'translateY(calc(100% + 8px))'}],{...panelMotion,duration:260,easing:'cubic-bezier(.4,0,1,1)'});await animation.finished.catch(()=>{});panel.close();animation.cancel();}else panel.close();
 panelClosing=false;
}
document.querySelector('#close-experience').addEventListener('click',closePanel);
panel.addEventListener('cancel',e=>{e.preventDefault();closePanel()});
panel.addEventListener('close',()=>document.body.classList.remove('panel-open'));
panel.addEventListener('click',e=>{const r=panel.getBoundingClientRect();if(e.target===panel&&(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom))closePanel()});
// Gradually remove the edge treatment over the final 128px of scrolling.
function updatePanelEdgeFade(){
 const fadeHeight=panel.clientHeight*.3;
 panel.style.setProperty('--edge-fade-height',fadeHeight+'px');
 const remaining=Math.max(0,panel.scrollHeight-panel.clientHeight-panel.scrollTop);
 panel.style.setProperty('--edge-fade-opacity',String(remaining<=1?0:Math.min(1,remaining/Math.max(1,fadeHeight))));
}
panel.addEventListener('scroll',updatePanelEdgeFade,{passive:true});
new ResizeObserver(updatePanelEdgeFade).observe(panel);
document.querySelector('#full-experience').addEventListener('click',()=>requestAnimationFrame(updatePanelEdgeFade));


}
const aboutCopy=document.querySelector('.about-layout .section-copy');
const aboutLayout=document.querySelector('.about-layout');
if(aboutCopy&&aboutLayout){
function sizeAboutPortrait(){aboutLayout.style.setProperty('--about-copy-height',aboutCopy.getBoundingClientRect().height+'px');}
new ResizeObserver(sizeAboutPortrait).observe(aboutCopy);
sizeAboutPortrait();

}

const journey=document.querySelector('.hero-journey');
if(journey){
 const hero=journey.querySelector('.scroll-hero');
 const message=hero.querySelector('.hero-art-message');
 const svg=message.querySelector('svg');
 const path=svg.querySelector('path');
 const dot=message.querySelector('.hero-traveler');
 const background=hero.querySelector('.hero-background');
 const mobileHero=matchMedia('(max-width: 760px)');
 const slides=[...document.querySelector('#hero-slides').content.querySelectorAll('figure')];
 const images=new Map([[0,background.querySelector('img')]]);
 let travel=0,releaseSpan=0,pathLength=0,frame=0,lineLeft=0,lineTop=0;
 const clamp=value=>Math.max(0,Math.min(1,value));
 function loadImage(index){
  if(index<0||index>=slides.length)return null;
  if(images.has(index))return images.get(index);
  const image=slides[index].querySelector('img').cloneNode(true);
  image.loading='eager';image.alt='';image.style.visibility='hidden';
  image.addEventListener('load',schedule,{once:true});
  images.set(index,image);background.append(image);
  return image;
 }
 function updateHero(){
  frame=0;
  const progress=reduced.matches?0:clamp(-journey.getBoundingClientRect().top/travel);
  // Ease from a pinned hero to normal page motion over the final 7%.
  // The exit slope reaches 1 at the endpoint, matching native page scrolling.
  const releaseProgress=releaseSpan?clamp((progress*travel-(travel-releaseSpan))/releaseSpan):0;
  const offset=reduced.matches?0:releaseSpan*releaseProgress*releaseProgress/2;
  hero.style.transform=`translate3d(0,${-offset}px,0)`;
  const index=mobileHero.matches&&progress>0
   ?Math.min(slides.length-1,1+Math.floor(progress*(slides.length-1)))
   :Math.min(slides.length-1,Math.floor(progress*slides.length));
  const next=Math.min(slides.length-1,index+1);
  // Keep the previous loaded image visible while a new image is arriving.
  const currentImage=loadImage(index);
  loadImage(next);
  loadImage(next+1);
  if(currentImage.complete&&currentImage.naturalWidth){
   images.forEach((image,i)=>{image.style.visibility=i===index||(mobileHero.matches&&i===0)?'visible':'hidden';});
  }
  const point=path.getPointAtLength(progress*pathLength);
  dot.style.left=`${lineLeft+point.x}px`;
  dot.style.top=`${lineTop+point.y}px`;
  hero.dataset.progress=progress.toFixed(4);
  hero.dataset.slide=String(index);
 }
 function schedule(){if(!frame)frame=requestAnimationFrame(updateHero);}
 function measure(){
  message.style.setProperty('--do-less-width',message.querySelector('.do-less').getBoundingClientRect().width+'px');
  message.style.setProperty('--better-width',message.querySelector('.better').getBoundingClientRect().width+'px');
  const lineBounds=svg.getBoundingClientRect(),messageBounds=message.getBoundingClientRect();
  const {width,height}=lineBounds;
  lineLeft=lineBounds.left-messageBounds.left;lineTop=lineBounds.top-messageBounds.top;
  svg.setAttribute('viewBox',`0 0 ${width} ${height}`);
  path.setAttribute('d',`M 0 0 C ${width/2} 0 ${width/2} ${height} ${width} ${height}`);
  pathLength=path.getTotalLength();
  travel=(slides.length-1)*Math.max(120,innerHeight*.22);
  releaseSpan=travel*.07;
  journey.style.setProperty('--hero-travel',`${travel}px`);
  journey.style.setProperty('--hero-release',`${reduced.matches?0:releaseSpan/2}px`);
  schedule();
 }
 journey.classList.add('is-enhanced');
 addEventListener('scroll',schedule,{passive:true});
 addEventListener('resize',measure);
 reduced.addEventListener('change',measure);
 new ResizeObserver(measure).observe(hero);
 document.fonts.ready.then(measure);
 measure();
}

// Decorative card video plays only while visible and motion is permitted.
const cardVideos=[...document.querySelectorAll('[data-card-video]')];
if(cardVideos.length){
 const motion=matchMedia('(prefers-reduced-motion: reduce)');
 const visible=new Set();
 function syncCardVideos(){
  cardVideos.forEach(video=>{
   if(visible.has(video)&&!motion.matches&&!document.hidden){
    video.muted=true;
    video.play().catch(()=>{});
   }else video.pause();
  });
 }
 const observer=new IntersectionObserver(entries=>{
  entries.forEach(({target,isIntersecting})=>isIntersecting?visible.add(target):visible.delete(target));
  syncCardVideos();
 },{threshold:0});
 cardVideos.forEach(video=>observer.observe(video));
 motion.addEventListener('change',syncCardVideos);
 document.addEventListener('visibilitychange',syncCardVideos);
}
