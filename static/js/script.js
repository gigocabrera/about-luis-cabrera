// Sticky nav background on scroll
const nav = document.getElementById('siteNav');
const brandLogo = document.getElementById('brandLogo');
const LOGO_LIGHT = 'static/img/LuisCabreraLogoBlue.svg';
const LOGO_DARK = 'static/img/LuisCabreraLogoWhite.svg';
let navScrolled = false;
const onScroll = () => {
  const shouldScroll = window.scrollY > 40;
  if (shouldScroll !== navScrolled) {
    navScrolled = shouldScroll;
    nav.classList.toggle('scrolled', navScrolled);
    if (brandLogo) brandLogo.src = navScrolled ? LOGO_DARK : LOGO_LIGHT;
  }
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => observer.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('is-visible'));
}


// Return fully to the top when the brand is selected
const brandHome = document.getElementById('brandHome');
if (brandHome) {
  brandHome.addEventListener('click', (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    if (navLinks) navLinks.classList.remove('open');
    if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
  });
}

// Keep anchored sections aligned directly beneath the sticky navigation.
document.querySelectorAll('a[href^="#"]:not(#brandHome)').forEach((link) => {
  link.addEventListener('click', (event) => {
    const targetId = link.getAttribute('href');
    if (!targetId || targetId === '#') return;
    const target = document.querySelector(targetId);
    if (!target) return;
    event.preventDefault();
    const navHeight = nav ? nav.offsetHeight : 0;
    const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight;
    window.scrollTo({ top: Math.max(0, targetTop), behavior: 'smooth' });
    history.replaceState(null, '', targetId);
  });
});
