
// js/motion.js
(function(){
  document.addEventListener("mousemove", e=>{
    const x=e.clientX/window.innerWidth-0.5;
    const y=e.clientY/window.innerHeight-0.5;
    document.body.style.transform = `perspective(1200px) rotateX(${y*2}deg) rotateY(${x*2}deg)`;
  });
  const h = new Date().getHours();
  document.body.dataset.theme = (h>=6&&h<17) ? "day" : (h>=17&&h<20) ? "sunset" : "night";
})();
