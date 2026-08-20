
const menuBtn=document.getElementById("menuBtn"),nav=document.getElementById("navbar");
if(menuBtn){menuBtn.addEventListener("click",()=>nav.classList.toggle("open"));nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")))}
const themeBtn=document.getElementById("themeBtn");
if(localStorage.getItem("theme")==="light"){document.body.classList.add("light");if(themeBtn)themeBtn.textContent="☀"}
if(themeBtn)themeBtn.addEventListener("click",()=>{document.body.classList.toggle("light");const light=document.body.classList.contains("light");localStorage.setItem("theme",light?"light":"dark");themeBtn.textContent=light?"☀":"☾"});
document.getElementById("year").textContent=new Date().getFullYear();
const counters=document.querySelectorAll("[data-count]");
const obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){const el=e.target,target=+el.dataset.count;let n=0;const tick=()=>{n+=Math.ceil(target/50);if(n>=target)el.textContent=target;else{el.textContent=n;requestAnimationFrame(tick)}};tick();obs.unobserve(el)}}),{threshold:.5});
counters.forEach(c=>obs.observe(c));
const form=document.getElementById("contactForm");if(form)form.addEventListener("submit",e=>{e.preventDefault();alert("Message form is ready. Connect it to your backend/email service.");});
