const revealerOptions = {
            threshold: 0.15,
            rootMargin: "0px 0px -50px 0px"
        };

        const scrollObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            });
        }, revealerOptions);

        document.querySelectorAll('.scroll-reveal').forEach((elem) => {
            scrollObserver.observe(elem);
        });

        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const navbarHeight = document.querySelector('header').offsetHeight; //offset navbar
            window.scrollTo({
                top: target.offsetTop - navbarHeight,
                behavior: 'smooth'
                   });
                }
            });
        });

// Navbar dyn
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll("nav .nav-link");
const visibilityBySection = new Map();

const setActiveNavLink = (sectionId) => {
  navLinks.forEach((link) => link.classList.remove("active"));
  if (!sectionId) return;

  const activeLink = document.querySelector(`nav a[href="#${sectionId}"]`);
  if (activeLink) activeLink.classList.add("active");
};

sections.forEach((section) => {
  visibilityBySection.set(section.id, 0);
});

const activeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      visibilityBySection.set(
        entry.target.id,
        entry.isIntersecting ? entry.intersectionRatio : 0);  
    });

    let activeSectionId = null;
    let highestRatio = 0;
              
    visibilityBySection.forEach((ratio, sectionId) => {
      if (ratio > highestRatio) {
        highestRatio = ratio;
        activeSectionId = sectionId;
      }
    });
              
    setActiveNavLink(highestRatio > 0 ? activeSectionId : null);
  },
  { threshold: [0, 0.25, 0.4, 0.6, 0.8, 1],
    rootMargin: "-80px 0px 0px 0px" // la navbar fixe
  }
);

sections.forEach((section) => activeObserver.observe(section));

const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 50);
}, { passive: true });

// Footer - année dynamique
const yearEl = document.getElementById("cr");
if (yearEl) yearEl.textContent = new Date().getFullYear();
