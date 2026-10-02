function initNavbar() {
  const navbar = document.getElementById("navbar");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 80) {
      navbar.classList.add("is-scrolled");
    } else {
      navbar.classList.remove("is-scrolled");
    }
  });
}

function initHamburger() {
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("navMenu");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("is-open");
    navMenu.classList.toggle("is-open");
  });
}

function smoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId.startsWith("#")) {
        return;
      }

      const target = document.querySelector(targetId);

      if (!target) {
        return;
      }

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

function highlightActiveNav() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        const id = entry.target.id;

        navLinks.forEach((link) => {
          link.classList.remove("is-active");

          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("is-active");
          }
        });
      });
    },
    {
      threshold: 0.5,
    },
  );

  sections.forEach((section) => {
    observer.observe(section);
  });
}

function animateCounter(element, target) {
  let count = 0;

  const increment = Math.ceil(target / 100);

  const timer = setInterval(() => {
    count += increment;

    if (count >= target) {
      count = target;
      clearInterval(timer);
    }

    element.textContent = count;
  }, 20);
}

function initCounters() {
  const counters = document.querySelectorAll(".counter");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        const target = Number(entry.target.dataset.target);

        animateCounter(entry.target, target);

        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.5,
    },
  );

  counters.forEach((counter) => {
    observer.observe(counter);
  });
}

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

  elements.forEach((element) => {
    observer.observe(element);
  });
}

function showTabContent(tabId) {
  const panels = document.querySelectorAll(".tab-panel");

  panels.forEach((panel) => {
    panel.classList.remove("active");
    panel.style.display = "none";
  });

  const activePanel = document.getElementById(tabId);

  activePanel.style.display = "block";
  activePanel.classList.add("active");
}

function initTabs() {
  const tabButtons = document.querySelectorAll(".tab-btn");

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      tabButtons.forEach((btn) => {
        btn.classList.remove("active");
      });

      button.classList.add("active");

      const tabId = button.dataset.tab;

      showTabContent(tabId);
    });
  });

  showTabContent("personal");
}

function initPricingToggle() {
  const toggle = document.getElementById("pricingToggle");

  const prices = document.querySelectorAll(".price");

  let yearlyMode = false;

  toggle.addEventListener("click", () => {
    yearlyMode = !yearlyMode;

    prices.forEach((price) => {
      price.textContent = yearlyMode
        ? price.dataset.yearly
        : price.dataset.monthly;
    });
  });
}

let currentSlide = 0;

function goToSlide(index) {
  const testimonials = document.querySelectorAll(".testimonial");

  const dots = document.querySelectorAll(".dot");

  testimonials.forEach((item) => {
    item.classList.remove("active");
  });

  dots.forEach((dot) => {
    dot.classList.remove("active");
  });

  testimonials[index].classList.add("active");
  dots[index].classList.add("active");

  currentSlide = index;
}

function initCarousel() {
  const testimonials = document.querySelectorAll(".testimonial");

  const dots = document.querySelectorAll(".dot");

  goToSlide(0);

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      goToSlide(index);
    });
  });

  setInterval(() => {
    let nextSlide = currentSlide + 1;

    if (nextSlide >= testimonials.length) {
      nextSlide = 0;
    }

    goToSlide(nextSlide);
  }, 4000);
}

function showFieldError(fieldId, message) {
  clearFieldError(fieldId);

  const field = document.getElementById(fieldId);

  field.classList.add("input-error");

  const errorEl = document.createElement("span");

  errorEl.className = "field-error";
  errorEl.id = fieldId + "Error";
  errorEl.textContent = message;

  field.insertAdjacentElement("afterend", errorEl);
}

function clearFieldError(fieldId) {
  const field = document.getElementById(fieldId);

  field.classList.remove("input-error");

  const existingError = document.getElementById(fieldId + "Error");

  if (existingError) {
    existingError.remove();
  }
}

function validateForm(name, email, phone) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const phonePattern = /^[0-9+\-\s()]{7,20}$/;

  ["name", "email", "phone"].forEach(clearFieldError);

  let isValid = true;

  if (!name.trim()) {
    showFieldError("name", "Please enter your name.");
    isValid = false;
  }

  if (!emailPattern.test(email)) {
    showFieldError("email", "Please enter a valid email address.");
    isValid = false;
  }

  if (phone && !phonePattern.test(phone)) {
    showFieldError("phone", "Please enter a valid phone number.");
    isValid = false;
  }

  return isValid;
}

function initContactForm() {
  const form = document.getElementById("contactForm");

  const success = document.getElementById("successMessage");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;

    const email = document.getElementById("email").value;

    const phone = document.getElementById("phone").value;

    if (!validateForm(name, email, phone)) {
      return;
    }

    form.style.display = "none";
    success.style.display = "block";
  });
}

function prefillPlan(planName) {
  const planSelect = document.getElementById("membershipPlan");

  planSelect.value = planName;

  const contactSection = document.getElementById("contact");

  contactSection.scrollIntoView({
    behavior: "smooth",
  });
}

function initBackToTop() {
  const button = document.getElementById("backToTop");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
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

function initPlanButtons() {
  const buttons = document.querySelectorAll(".plan-btn");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const plan = button.dataset.plan;

      prefillPlan(plan);
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initHamburger();
  smoothScroll();
  highlightActiveNav();
  initCounters();
  initScrollAnimations();
  initTabs();
  initPricingToggle();
  initCarousel();
  initContactForm();
  initBackToTop();
  initPlanButtons();
});
document.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    document.body.style.scrollBehavior = "smooth";
  });
});
