'use strict';
(()=>{
 if('serviceWorker' in navigator)window.addEventListener('load',()=>{navigator.serviceWorker.register('/sw.js',{updateViaCache:'none'}).catch(()=>{});});
 const button=document.getElementById('installApp');let promptEvent=window.__installPrompt||null;
 const standalone=()=>matchMedia('(display-mode: standalone)').matches||navigator.standalone===true;
 const dialog=document.createElement('dialog');dialog.setAttribute('aria-label','安裝竹塹媽祖路關圖');dialog.style.cssText='width:min(440px,calc(100vw - 32px));max-height:85dvh;overflow:auto;border:0;border-radius:16px;padding:22px;background:#fffaf0;color:#302b27';
 const title=document.createElement('h2');title.textContent='安裝到手機';title.style.fontSize='22px';
 const help=document.createElement('p');help.style.lineHeight='1.8';
 const close=document.createElement('button');close.textContent='關閉';close.style.minHeight='44px';close.onclick=()=>dialog.close();dialog.append(title,help,close);document.body.append(dialog);
 function update(){button.hidden=standalone();button.textContent=promptEvent?'安裝路關圖 App':'安裝到手機';}
 window.addEventListener('pwa-install-ready',()=>{promptEvent=window.__installPrompt;update();});
 window.addEventListener('appinstalled',()=>{promptEvent=null;button.hidden=true;});
 button.onclick=async()=>{
  if(promptEvent){const event=promptEvent;promptEvent=null;window.__installPrompt=null;try{await event.prompt();await event.userChoice;update();return;}catch{update();}}
  const ios=/iphone|ipad|ipod/i.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
  help.textContent=ios?'請使用 Safari 開啟本網站，點選「分享」→「加入主畫面」，若出現「以網頁 App 開啟」，請將它開啟，再點「加入」。':'請使用 Chrome 或支援安裝的瀏覽器開啟本網站，點右上角「⋮」→「加入主畫面」或「安裝應用程式」。若尚未出現安裝選項，請稍候再重新整理。LINE、Facebook 等 App 內瀏覽器請先選「在外部瀏覽器開啟」。';
  dialog.showModal();
 };update();
})();
