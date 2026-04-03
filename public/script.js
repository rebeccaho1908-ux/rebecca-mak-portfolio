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

const carousels = document.querySelectorAll("[data-carousel]");

carousels.forEach((carousel) => {
  const track = carousel.querySelector("[data-carousel-track]");
  const prevButton = carousel.querySelector("[data-carousel-prev]");
  const nextButton = carousel.querySelector("[data-carousel-next]");
  const slides = [...carousel.querySelectorAll(".guidelines-slide")];

  if (!track || !prevButton || !nextButton || slides.length === 0) return;

  const getCurrentIndex = () => {
    const scrollLeft = track.scrollLeft;
    let closestIndex = 0;
    let closestDistance = Infinity;

    slides.forEach((slide, index) => {
      const distance = Math.abs(slide.offsetLeft - scrollLeft);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    return closestIndex;
  };

  const scrollToIndex = (index) => {
    const boundedIndex = Math.max(0, Math.min(index, slides.length - 1));
    track.scrollTo({ left: slides[boundedIndex].offsetLeft, behavior: "smooth" });
  };

  prevButton.addEventListener("click", () => {
    scrollToIndex(getCurrentIndex() - 1);
  });

  nextButton.addEventListener("click", () => {
    scrollToIndex(getCurrentIndex() + 1);
  });
});
