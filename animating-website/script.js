document.addEventListener("DOMContentLoaded", init);

//
// INIT MASTER FUNCTION
//
function init() {
  initTypewriter();
  initScrollObserver();
  initNavbarScroll();
  initSkillBars();
  initBackToTop();
  initNavToggle();
}

//
// MOBILE NAV TOGGLE
//
function initNavToggle() {
  const toggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  const ctaBtn = document.querySelector(".btn-cta");

  toggle.addEventListener("click", () => {
    toggle.classList.toggle("is-open");
    navLinks.classList.toggle("is-open");
    ctaBtn.classList.toggle("is-open");
  });

  navLinks.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      toggle.classList.remove("is-open");
      navLinks.classList.remove("is-open");
      ctaBtn.classList.remove("is-open");
    });
  });
}

//
// TYPEWRITER EFFECT
//
function initTypewriter() {
  const roles = ["Frontend Developer", "UI Builder", "Creative Coder"];
  const typewriterElement = document.getElementById("typewriter");

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeLoop() {
    const currentRole = roles[roleIndex];

    if (!isDeleting) {
      typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;

      if (charIndex === currentRole.length) {
        isDeleting = true;
        setTimeout(typeLoop, 1200);
        return;
      }
    } else {
      typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }

    setTimeout(typeLoop, isDeleting ? 60 : 120);
  }

  setTimeout(typeLoop, 1200);
}

//
// SCROLL OBSERVER (ANIMATIONS)
//
function initScrollObserver() {
  const elements = document.querySelectorAll(".js-animate");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;

          const delay = el.dataset.delay || "0s";
          el.style.animationDelay = delay;

          el.classList.add("is-visible");
        }
      });
    },
    {
      threshold: 0.2,
    },
  );

  elements.forEach((el) => observer.observe(el));
}

//
// NAVBAR SCROLL EFFECT
//
function initNavbarScroll() {
  const navbar = document.querySelector(".navbar");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 80) {
      navbar.style.background = "rgba(10,10,15,0.8)";
      navbar.style.backdropFilter = "blur(10px)";
      navbar.style.borderBottom = "1px solid #1e1e35";
    } else {
      navbar.style.background = "transparent";
      navbar.style.backdropFilter = "none";
      navbar.style.borderBottom = "none";
    }
  });
}

//
// SKILL BAR ANIMATION
//
function initSkillBars() {
  const skillBars = document.querySelectorAll(".skill-bar");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const percent = bar.getAttribute("data-percent");

          bar.style.setProperty("--target-width", percent + "%");

          bar.querySelector("::after");
          bar.style.setProperty("--fill", percent + "%");

          bar.style.position = "relative";
          bar.innerHTML = `<span class="fill"></span>`;
          const fill = bar.querySelector(".fill");

          fill.style.height = "100%";
          fill.style.width = "0%";
          fill.style.background = "#00f5ff";
          fill.style.position = "absolute";
          fill.style.left = "0";
          fill.style.top = "0";

          setTimeout(() => {
            fill.style.width = percent + "%";
          }, 100);

          observer.unobserve(bar);
        }
      });
    },
    {
      threshold: 0.5,
    },
  );

  skillBars.forEach((bar) => observer.observe(bar));
}

//
// BACK TO TOP BUTTON
//
function initBackToTop() {
  const button = document.querySelector(".back-to-top");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      button.style.display = "block";
    } else {
      button.style.display = "none";
    }
  });

  button.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}
