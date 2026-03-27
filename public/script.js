const revealItems = document.querySelectorAll(".reveal");
const navLinks = document.querySelectorAll(".site-nav a");
const sections = [...document.querySelectorAll("main section[id]")];

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.16,
    rootMargin: "0px 0px -8% 0px",
  }
);

revealItems.forEach((item) => revealObserver.observe(item));

const activateNav = () => {
  const marker = window.scrollY + window.innerHeight * 0.28;
  let activeId = "";

  sections.forEach((section) => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;

    if (marker >= top && marker < bottom) {
      activeId = section.id;
    }
  });

  navLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${activeId}`;
    link.classList.toggle("is-active", isActive);
  });
};

activateNav();
window.addEventListener("scroll", activateNav, { passive: true });
