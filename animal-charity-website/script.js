/* 
   NAVBAR SCROLL EFFECT
 */

function initNavbar() {
  const navbar = document.getElementById("navbar");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 80) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
}

/* 
   HAMBURGER MENU
 */

function initHamburger() {
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");

  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("open");
  });
}

/* 
   SMOOTH SCROLL
 */

function smoothScroll() {
  const links = document.querySelectorAll("a[href^='#']");

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const target = document.querySelector(link.getAttribute("href"));

      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });
}

/* 
   ACTIVE NAV HIGHLIGHT
 */

function highlightActiveNav() {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-menu a");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            link.classList.remove("active");

            if (link.getAttribute("href") === `#${entry.target.id}`) {
              link.classList.add("active");
            }
          });
        }
      });
    },
    {
      threshold: 0.6,
    },
  );

  sections.forEach((section) => observer.observe(section));
}

/* 
   COUNTER ANIMATION
 */

function animateCounter(el, target) {
  let count = 0;
  const speed = target / 100;

  const interval = setInterval(() => {
    count += speed;

    if (count >= target) {
      el.textContent = target + "+";
      clearInterval(interval);
    } else {
      el.textContent = Math.floor(count) + "+";
    }
  }, 20);
}

/* 
   INIT COUNTERS
 */

function initCounters() {
  const counters = document.querySelectorAll(".stat-card h3");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const text = entry.target.textContent;
          const number = parseInt(text.replace(/\D/g, ""));

          animateCounter(entry.target, number);

          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.5,
    },
  );

  counters.forEach((counter) => observer.observe(counter));
}

/* 
   SCROLL ANIMATIONS
 */

function initScrollAnimations() {
  const elements = document.querySelectorAll(".js-animate");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    },
    {
      threshold: 0.2,
    },
  );

  elements.forEach((el) => observer.observe(el));
}

/* 
   ANIMAL FILTER SYSTEM
 */

function initAnimalFilter() {
  const buttons = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".animal-card");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.filter;

      cards.forEach((card) => {
        const type = card.dataset.type;

        if (filter === "all" || filter === type) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
}

/* 
   DONATION SELECTOR
 */

function initDonationSelector() {
  const buttons = document.querySelectorAll(".donate-btn");
  const input = document.getElementById("donationAmount");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const amount = btn.dataset.amount;
      input.value = amount;

      updateDonationImpact(amount);
    });
  });

  input.addEventListener("input", () => {
    updateDonationImpact(input.value);
  });
}

/* 
   DONATION IMPACT TEXT
 */

function updateDonationImpact(amount) {
  const impact = document.getElementById("donationImpact");

  const value = parseInt(amount);

  if (value >= 5000) {
    impact.textContent = "Sponsors a full rescue operation ❤️";
  } else if (value >= 2500) {
    impact.textContent = "Provides emergency veterinary care 🚑";
  } else if (value >= 1000) {
    impact.textContent = "Covers vaccination for rescued animals 🏥";
  } else if (value >= 500) {
    impact.textContent = "Feeds 5 animals for a week 🐾";
  } else {
    impact.textContent = "Every contribution helps save lives ❤️";
  }
}

/* 
   DONATION FORM
 */

function initDonationForm() {
  const form = document.getElementById("donationForm");
  const success = document.getElementById("donationSuccess");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("donorName").value;
    const email = document.getElementById("donorEmail").value;

    if (!name || !email) return;

    form.style.display = "none";
    success.style.display = "block";
  });
}

/* 
   VOLUNTEER FORM
 */

function initVolunteerForm() {
  const form = document.getElementById("volunteerForm");
  const error = document.getElementById("volError");
  const success = document.getElementById("volSuccess");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("volName").value;
    const email = document.getElementById("volEmail").value;
    const phone = document.getElementById("volPhone").value;
    const role = document.getElementById("volRole").value;

    error.textContent = "";

    if (!name || !email || !phone || !role) {
      error.textContent = "Please fill all required fields.";
      return;
    }

    form.style.display = "none";
    success.style.display = "block";
  });
}

/* 
   CONTACT CONDITIONAL FIELD
 */

function initConditionalField() {
  const subject = document.getElementById("contactSubject");
  const animalField = document.getElementById("animalField");

  subject.addEventListener("change", () => {
    if (subject.value === "adoption") {
      animalField.style.display = "block";
    } else {
      animalField.style.display = "none";
    }
  });
}

/* 
   CONTACT FORM
 */

function initContactForm() {
  const form = document.getElementById("contactForm");
  const error = document.getElementById("contactError");
  const success = document.getElementById("contactSuccess");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("contactName").value;
    const email = document.getElementById("contactEmail").value;
    const subject = document.getElementById("contactSubject").value;
    const message = document.getElementById("contactMessage").value;

    error.textContent = "";

    if (!name || !email || !subject || !message) {
      error.textContent = "Please fill all required fields.";
      return;
    }

    form.style.display = "none";
    success.style.display = "block";
  });
}

/* 
   PREFILL ANIMAL NAME
 */

function prefillAnimal(name) {
  const input = document.getElementById("animalField");

  if (input) {
    input.value = name;
  }

  document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
}

/* 
   BACK TO TOP BUTTON
 */

function initBackToTop() {
  const btn = document.getElementById("backToTop");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      btn.style.display = "block";
    } else {
      btn.style.display = "none";
    }
  });

  btn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

/* 
   INIT ALL FUNCTIONS
 */

initNavbar();
initHamburger();
smoothScroll();
highlightActiveNav();
initCounters();
initScrollAnimations();
initAnimalFilter();
initDonationSelector();
initDonationForm();
initVolunteerForm();
initConditionalField();
initContactForm();
initBackToTop();
