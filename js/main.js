const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("navbar");

if (menuBtn && nav) {
  menuBtn.addEventListener("click", () => nav.classList.toggle("open"));
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => nav.classList.remove("open"));
  });
}

const themeBtn = document.getElementById("themeBtn");
if (localStorage.getItem("theme") === "light") {
  document.body.classList.add("light");
  if (themeBtn) themeBtn.textContent = "☀";
}

if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("light");
    const light = document.body.classList.contains("light");
    localStorage.setItem("theme", light ? "light" : "dark");
    themeBtn.textContent = light ? "☀" : "☾";
  });
}

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

const counters = document.querySelectorAll("[data-count]");
if (counters.length && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const element = entry.target;
      const target = Number(element.dataset.count);
      const duration = 900;
      const start = performance.now();

      const animate = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        element.textContent = Math.round(target * eased);
        if (progress < 1) requestAnimationFrame(animate);
      };

      requestAnimationFrame(animate);
      observer.unobserve(element);
    });
  }, { threshold: 0.5 });

  counters.forEach((counter) => observer.observe(counter));
} else {
  counters.forEach((counter) => {
    counter.textContent = counter.dataset.count;
  });
}

const form = document.getElementById("contactForm");
if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    alert("Message form is ready. Connect it to your backend/email service.");
  });
}

/* Desktop profile tilt: pointer-capable devices only. Touch devices keep the CSS animation. */
const profile = document.querySelector(".animated-profile");
const profileCard = document.querySelector(".ap-card");
const canTilt = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

if (profile && profileCard && canTilt) {
  let frame = 0;
  let pointerX = 0;
  let pointerY = 0;

  const renderTilt = () => {
    frame = 0;
    const rect = profile.getBoundingClientRect();
    const x = (pointerX - rect.left) / rect.width - 0.5;
    const y = (pointerY - rect.top) / rect.height - 0.5;

    profileCard.style.setProperty("--ap-ry", `${x * 8}deg`);
    profileCard.style.setProperty("--ap-rx", `${y * -8}deg`);
    profileCard.style.setProperty("--ap-lift", "-6px");
  };

  profile.addEventListener("pointermove", (event) => {
    pointerX = event.clientX;
    pointerY = event.clientY;
    if (!frame) frame = requestAnimationFrame(renderTilt);
  });

  profile.addEventListener("pointerleave", () => {
    profileCard.style.setProperty("--ap-rx", "0deg");
    profileCard.style.setProperty("--ap-ry", "0deg");
    profileCard.style.setProperty("--ap-lift", "0px");
  });
}



const welcomeText = document.querySelector('.welcome-text');

if (welcomeText) {
    const text = welcomeText.textContent;

    welcomeText.innerHTML = [...text]
        .map((char, index) => {
            if (char === ' ') {
                return '<span class="welcome-space">&nbsp;</span>';
            }

            return `<span style="--i:${index}">${char}</span>`;
        })
        .join('');
}