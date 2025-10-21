
export function softParallax(root=document){
  const nodes = root.querySelectorAll('.card-glass,.nav-float');
  const onMove = (e)=>{
    const x=(e.clientX/innerWidth-.5), y=(e.clientY/innerHeight-.5);
    nodes.forEach(n=> n.style.transform = `translate3d(${x*6}px, ${y*4}px, 0)`);
  };
  window.addEventListener('mousemove', onMove);
}
export function mountHover(root=document){
  root.querySelectorAll('.clickable').forEach(el=>{
    el.addEventListener('pointerdown', ()=> el.style.transform='scale(.985)');
    el.addEventListener('pointerup',   ()=> el.style.transform='');
    el.addEventListener('pointerleave',()=> el.style.transform='');
  });
}
document.addEventListener('DOMContentLoaded', ()=>{ softParallax(); mountHover(); });
