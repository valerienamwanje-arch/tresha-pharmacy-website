document.addEventListener('DOMContentLoaded', () => {

  /* ---------- footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- mobile nav toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  const header = document.getElementById('siteHeader');

  if (navToggle && mainNav) {
    const setNavOffset = () => {
      if (header) mainNav.style.setProperty('--nav-h', header.offsetHeight + 'px');
    };
    setNavOffset();
    window.addEventListener('resize', setNavOffset);

    const closeNav = () => {
      mainNav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', 'Open menu');
    };

    navToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
      navToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    });

    mainNav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeNav));
  }

  /* ---------- scroll reveal ---------- */
  const revealTargets = document.querySelectorAll('[data-reveal]');

  if ('IntersectionObserver' in window && revealTargets.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });

    revealTargets.forEach(el => io.observe(el));

    // safety net: never leave content permanently hidden
    window.setTimeout(() => {
      revealTargets.forEach(el => el.classList.add('is-visible'));
    }, 1800);
  } else {
    revealTargets.forEach(el => el.classList.add('is-visible'));
  }

  /* ---------- highlight today's opening hours ---------- */
  const today = new Date().getDay(); // 0 = Sunday ... 6 = Saturday
  document.querySelectorAll('.hours tr').forEach(row => {
    const days = (row.dataset.days || '').split(',').map(Number);
    if (days.includes(today)) row.classList.add('is-today');
  });

  /* ---------- contact form → WhatsApp handoff ---------- */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = contactForm.name.value.trim();
      const phone = contactForm.phone.value.trim();
      const topic = contactForm.topic.value.trim();
      const message = contactForm.message.value.trim();

      let text = `Hello TRESHA Pharmacy, my name is ${name} (${phone}).`;
      if (topic) text += ` Topic: ${topic}.`;
      text += ` ${message}`;

      const url = `https://wa.me/256772345678?text=${encodeURIComponent(text)}`;
      window.open(url, '_blank', 'noopener');
    });
  }

});
