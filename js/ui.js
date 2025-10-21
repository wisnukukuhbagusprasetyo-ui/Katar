
export function el(html){ const d=document.createElement('div'); d.innerHTML=html.trim(); return d.firstChild; }
export function toast(msg){ alert(msg); }
