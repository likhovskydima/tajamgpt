const body = document.body;
const nav = document.querySelector('.site-nav');
const navToggle = document.querySelector('.site-nav__toggle');
const navLinksContainer = document.querySelector('.site-nav__links');
const navLinks = navLinksContainer ? navLinksContainer.querySelectorAll('a[href^="#"]') : [];

function toggleNav() {
  const isOpen = navLinksContainer.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
  body.classList.toggle('nav-open', isOpen);
}

if (navToggle && navLinksContainer) {
  navToggle.addEventListener('click', toggleNav);
}

navLinks.forEach(link => {
  link.addEventListener('click', event => {
    const targetId = link.getAttribute('href').slice(1);
    const target = document.getElementById(targetId);
    if (!target) return;

    event.preventDefault();
    const yOffset = nav.offsetHeight || 0;
    const elementPosition = target.getBoundingClientRect().top + window.pageYOffset - yOffset + 1;

    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth'
    });

    if (navLinksContainer.classList.contains('is-open')) {
      toggleNav();
    }
  });
});

const sections = Array.from(document.querySelectorAll('section[id]'));

function highlightCurrentSection() {
  if (!nav || !navLinksContainer) return;
  const scrollPos = window.scrollY + (nav.offsetHeight || 0) + 12;

  sections.forEach(section => {
    const id = section.id;
    const link = navLinksContainer.querySelector(`a[href="#${id}"]`);
    if (!link) return;

    const sectionTop = section.offsetTop;
    const sectionBottom = sectionTop + section.offsetHeight;
    const isActive = scrollPos >= sectionTop && scrollPos < sectionBottom;

    link.classList.toggle('is-active', isActive);
  });
}

window.addEventListener('scroll', highlightCurrentSection);
window.addEventListener('load', highlightCurrentSection);

const observerOptions = {
  threshold: 0.2,
  rootMargin: '0px 0px -40px 0px'
};

const animatedElements = document.querySelectorAll('[data-animate]');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

animatedElements.forEach(el => observer.observe(el));

const currentYearEl = document.getElementById('current-year');
if (currentYearEl) {
  currentYearEl.textContent = new Date().getFullYear();
}

function closeNavOnResize() {
  if (window.innerWidth > 820 && navLinksContainer.classList.contains('is-open')) {
    navLinksContainer.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    body.classList.remove('nav-open');
  }
}

window.addEventListener('resize', closeNavOnResize);
