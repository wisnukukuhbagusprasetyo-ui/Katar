
import { auth, db } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";
export let CURRENT_ROLE=null, CURRENT_USER=null;
export async function fetchRole(uid){ const s=await getDoc(doc(db,'users',uid)); return s.exists()? (s.data().role||'anggota') : 'anggota'; }
export function isAdmin(){ return ['super_admin','wakil_admin'].includes(CURRENT_ROLE); }
export function isKetua(){ return CURRENT_ROLE==='super_admin'; }
export function isKontributor(){ return ['kontributor','sekretaris','bendahara','wakil_admin','super_admin'].includes(CURRENT_ROLE); }
export function gate(sel, roles=[]){ const el=document.querySelector(sel); if(!el) return; el.style.display = roles.includes(CURRENT_ROLE)? '' : 'none'; }
onAuthStateChanged(auth, async (u)=>{ CURRENT_USER=u; if(!u) return; CURRENT_ROLE=await fetchRole(u.uid); gate('#linkSettings',['super_admin','wakil_admin']); gate('#btnTambahProduk',['kontributor','sekretaris','bendahara','wakil_admin','super_admin']); const av=document.getElementById('avatar'); if(av) av.src=u.photoURL||'/assets/icons/kt.svg'; });
