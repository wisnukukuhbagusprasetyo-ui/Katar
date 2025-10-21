
import { auth } from "./firebase.js";
export function onReady(cb){
  return auth.onAuthStateChanged(user=>{
    if(!user && !location.pathname.includes("/auth/")){ location.href="/auth/portal.html"; return; }
    cb && cb(user);
  });
}
