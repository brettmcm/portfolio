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


const gallery=document.querySelector('.proposal-gallery'),count=document.querySelector('.gallery-count');
const galleryTrack=gallery.querySelector('.proposal-gallery-track');
[...galleryTrack.querySelectorAll('figure[data-category="digital"]')].reverse().forEach(card=>galleryTrack.append(card));
const vertivVideo=gallery.querySelector('video[src$="/vertiv.mp4"]')?.closest('figure');
if(vertivVideo)galleryTrack.append(vertivVideo);
const allCards=[...gallery.querySelectorAll('figure')];
let cards=allCards;
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const stride=()=>cards.length>1?cards[1].offsetLeft-cards[0].offsetLeft:cards[0].offsetWidth;
const selected=()=>{const s=stride();if(!s)return 0;return Math.max(0,Math.min(cards.length-1,Math.round(gallery.scrollLeft/s)));};
function step(direction){gallery.scrollTo({left:Math.max(0,Math.min(cards.length-1,selected()+direction))*stride(),behavior:reduced.matches?'instant':'smooth'});}
function updateGallery(){const i=selected();count.textContent=`${String(i+1).padStart(2,'0')} / ${String(cards.length).padStart(2,'0')}`;document.querySelector('#previous').disabled=i===0;document.querySelector('#next').disabled=i===cards.length-1;}
document.querySelector('#previous').addEventListener('click',()=>step(-1));document.querySelector('#next').addEventListener('click',()=>step(1));
gallery.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();step(e.key==='ArrowRight'?1:-1)}});
gallery.addEventListener('scroll',updateGallery,{passive:true});addEventListener('resize',updateGallery);
let drag=null;
gallery.addEventListener('pointerdown',e=>{if(e.pointerType==='touch'||e.button!==0||e.target.closest('video'))return;drag={id:e.pointerId,x:e.clientX,left:gallery.scrollLeft};gallery.setPointerCapture(e.pointerId);gallery.classList.add('is-dragging')});
gallery.addEventListener('pointermove',e=>{if(drag&&drag.id===e.pointerId)gallery.scrollLeft=drag.left+drag.x-e.clientX;});
function stop(e){if(!drag||drag.id!==e.pointerId)return;if(gallery.hasPointerCapture(e.pointerId))gallery.releasePointerCapture(e.pointerId);drag=null;gallery.classList.remove('is-dragging')}
gallery.addEventListener('pointerup',stop);gallery.addEventListener('pointercancel',stop);

const tabs=[...document.querySelectorAll('[role="tab"]')];
function selectCategory(tab){
 tabs.forEach(t=>{const active=t===tab;t.setAttribute('aria-selected',String(active));t.tabIndex=active?0:-1});
 allCards.forEach(card=>{card.hidden=card.dataset.category!==tab.dataset.category});
 cards=allCards.filter(card=>!card.hidden);
 cards.forEach((card,i)=>{const caption=card.querySelector('figcaption');caption.textContent=String(i+1).padStart(2,'0')+' — '+caption.textContent.replace(/^\d+ — /,'')});
 document.querySelector('#work-panel').setAttribute('aria-labelledby',tab.id);
 gallery.setAttribute('aria-label',tab.textContent+' work; use left and right arrow keys to browse');
 gallery.scrollTo({left:0,behavior:'instant'});updateGallery();
}
tabs.forEach((tab,index)=>{
 tab.addEventListener('click',()=>selectCategory(tab));
 tab.addEventListener('keydown',e=>{let next;if(e.key==='ArrowRight')next=(index+1)%tabs.length;if(e.key==='ArrowLeft')next=(index+tabs.length-1)%tabs.length;if(e.key==='Home')next=0;if(e.key==='End')next=tabs.length-1;if(next!==undefined){e.preventDefault();tabs[next].focus();selectCategory(tabs[next])}});
});
selectCategory(tabs[0]);
const panel=document.querySelector('#experience-panel');

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
const heroVideo=document.querySelector('.hero-art video');
function syncHero(){if(reduced.matches||document.hidden)heroVideo.pause();else heroVideo.play().catch(()=>{});}
reduced.addEventListener('change',syncHero);document.addEventListener('visibilitychange',syncHero);syncHero();

const portfolioVideos=[...gallery.querySelectorAll('video')];
portfolioVideos.forEach(video=>video.removeAttribute('controls'));
function syncPortfolioVideos(){
 const bounds=gallery.getBoundingClientRect();
 portfolioVideos.forEach(video=>{const rect=video.getBoundingClientRect();const visible=!video.closest('figure').hidden&&bounds.bottom>0&&bounds.top<innerHeight&&rect.right>0&&rect.left<innerWidth;
 if(visible&&!document.hidden&&!reduced.matches)video.play().catch(()=>{});else video.pause();});
}
const mediaObserver=new IntersectionObserver(syncPortfolioVideos);portfolioVideos.forEach(v=>mediaObserver.observe(v));
gallery.addEventListener('scroll',syncPortfolioVideos,{passive:true});addEventListener('scroll',syncPortfolioVideos,{passive:true});
tabs.forEach(t=>t.addEventListener('click',syncPortfolioVideos));document.addEventListener('visibilitychange',syncPortfolioVideos);reduced.addEventListener('change',syncPortfolioVideos);
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


const aboutCopy=document.querySelector('.about-layout .section-copy');
const aboutLayout=document.querySelector('.about-layout');
function sizeAboutPortrait(){aboutLayout.style.setProperty('--about-copy-height',aboutCopy.getBoundingClientRect().height+'px');}
new ResizeObserver(sizeAboutPortrait).observe(aboutCopy);
sizeAboutPortrait();

const heroMessage=document.querySelector('.hero-art-message');
const doLessLabel=heroMessage.querySelector('.do-less');
const betterLabel=heroMessage.querySelector('.better');
function alignHeroLine(){
 heroMessage.style.setProperty('--do-less-width',doLessLabel.getBoundingClientRect().width+'px');
 heroMessage.style.setProperty('--better-width',betterLabel.getBoundingClientRect().width+'px');
}
const heroLabelObserver=new ResizeObserver(alignHeroLine);
heroLabelObserver.observe(doLessLabel);heroLabelObserver.observe(betterLabel);
alignHeroLine();
