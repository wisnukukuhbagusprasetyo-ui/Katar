
// js/guard.js
import { auth } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";

onAuthStateChanged(auth, (user)=>{
  const isAuth = location.pathname.includes("/auth/");
  if(!user && !isAuth){
    location.href = "/auth/login.html";
  }
  if(user && isAuth && !location.pathname.endsWith("forgot.html")){
    location.href = "/index.html";
  }
});
