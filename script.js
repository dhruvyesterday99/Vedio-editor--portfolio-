/* ==========================================================================
   ROWAN VALE PORTFOLIO — INTERACTIONS & ANIMATIONS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);

  /* ---------------- LOADER ---------------- */
  const loader = document.getElementById('loader');
  const loaderFill = document.getElementById('loaderFill');
  const loaderPct = document.getElementById('loaderPct');
  let progress = 0;
  const loaderInterval = setInterval(() => {
    progress += Math.random() * 18;
    if (progress >= 100) {
      progress = 100;
      clearInterval(loaderInterval);
      loaderFill.style.width = '100%';
      loaderPct.textContent = '100%';
      setTimeout(() => {
        loader.classList.add('done');
        document.body.style.overflow = '';
        runHeroIntro();
      }, 400);
    } else {
      loaderFill.style.width = progress + '%';
      loaderPct.textContent = String(Math.floor(progress)).padStart(2, '0') + '%';
    }
  }, 140);
  document.body.style.overflow = 'hidden';

  /* ---------------- CUSTOM CURSOR ---------------- */
  const cursorDot = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');
  let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  document.querySelectorAll('a, button, [data-cursor="link"], .faq-q, .filter-btn').forEach(el => {
    el.addEventListener('mouseenter', () => cursorRing.classList.add('hovering'));
    el.addEventListener('mouseleave', () => cursorRing.classList.remove('hovering'));
  });

  /* ---------------- SCROLL PROGRESS BAR ---------------- */
  const scrollProgress = document.getElementById('scrollProgress');
  window.addEventListener('scroll', () => {
    const h = document.documentElement;
    const scrollPct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
    scrollProgress.style.width = scrollPct + '%';
  });

  /* ---------------- HEADER SCROLL STATE ---------------- */
  const header = document.getElementById('siteHeader');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  });

  /* ---------------- MOBILE NAV ---------------- */
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    mainNav.classList.toggle('open');
    const expanded = navToggle.classList.contains('active');
    navToggle.setAttribute('aria-expanded', expanded);
  });
  mainNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navToggle.classList.remove('active');
      mainNav.classList.remove('open');
    });
  });

  /* ---------------- HERO INTRO ANIMATION ---------------- */
  function runHeroIntro() {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
    tl.fromTo('.eyebrow.reveal-line span', { y: '110%' }, { y: '0%', duration: 0.9 })
      .fromTo('.hero-title .line', { y: '110%' }, { y: '0%', duration: 1, stagger: 0.12 }, '-=0.6')
      .fromTo('.hero-sub span', { y: '110%' }, { y: '0%', duration: 0.9 }, '-=0.5')
      .fromTo('.hero-actions > span', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.5')
      .fromTo('.hero-scroll', { opacity: 0 }, { opacity: 1, duration: 0.6 }, '-=0.3');
  }

  /* ---------------- SCROLL REVEALS ---------------- */
  gsap.utils.toArray('.service-card').forEach((card, i) => {
    gsap.fromTo(card, { opacity: 0, y: 40 }, {
      opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
      delay: (i % 3) * 0.08,
      scrollTrigger: { trigger: card, start: 'top 88%' }
    });
  });

  gsap.utils.toArray('.port-card').forEach((card, i) => {
    gsap.fromTo(card, { opacity: 0, y: 50 }, {
      opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
      delay: (i % 3) * 0.08,
      scrollTrigger: { trigger: card, start: 'top 90%' }
    });
  });

  gsap.utils.toArray('.price-card').forEach((card, i) => {
    gsap.fromTo(card, { opacity: 0, y: 50 }, {
      opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
      delay: i * 0.1,
      scrollTrigger: { trigger: card, start: 'top 88%' }
    });
  });

  gsap.fromTo('.about-media', { opacity: 0, x: -40 }, {
    opacity: 1, x: 0, duration: 1, ease: 'power3.out',
    scrollTrigger: { trigger: '.about-grid', start: 'top 75%' }
  });
  gsap.fromTo('.about-copy', { opacity: 0, x: 40 }, {
    opacity: 1, x: 0, duration: 1, ease: 'power3.out',
    scrollTrigger: { trigger: '.about-grid', start: 'top 75%' }
  });

  ['.contact-intro', '.contact-form'].forEach((sel, i) => {
    gsap.fromTo(sel, { opacity: 0, y: 40 }, {
      opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: i * 0.12,
      scrollTrigger: { trigger: sel, start: 'top 85%' }
    });
  });

  gsap.utils.toArray('.section-title, .eyebrow').forEach(el => {
    if (el.closest('.hero')) return;
    gsap.fromTo(el, { opacity: 0, y: 24 }, {
      opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 90%' }
    });
  });

  /* ---------------- SKILL BARS ---------------- */
  gsap.utils.toArray('.skill-fill').forEach(bar => {
    ScrollTrigger.create({
      trigger: bar,
      start: 'top 90%',
      once: true,
      onEnter: () => { bar.style.width = bar.dataset.fill + '%'; }
    });
  });

  /* ---------------- PARALLAX ---------------- */
  gsap.utils.toArray('[data-parallax]').forEach(el => {
    gsap.to(el, {
      y: -40,
      ease: 'none',
      scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true }
    });
  });

  /* ---------------- STAT COUNTERS ---------------- */
  gsap.utils.toArray('.stat-num').forEach(el => {
    const target = parseInt(el.dataset.count, 10);
    ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      once: true,
      onEnter: () => {
        let obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 2,
          ease: 'power2.out',
          onUpdate: () => { el.textContent = Math.floor(obj.val); }
        });
      }
    });
  });

  /* ---------------- SHOWREEL MODAL ---------------- */
  const showreelBtn = document.getElementById('showreelBtn');
  const showreelModal = document.getElementById('showreelModal');
  const showreelFrame = document.getElementById('showreelFrame');
  const modalClose = document.getElementById('modalClose');
  const modalBackdrop = document.getElementById('modalBackdrop');
  const SHOWREEL_SRC = 'https://www.youtube.com/embed/aqz-KE-bpKQ?autoplay=1&rel=0';

  function openModal() {
    showreelFrame.src = SHOWREEL_SRC;
    showreelModal.classList.add('open');
    showreelModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    showreelModal.classList.remove('open');
    showreelModal.setAttribute('aria-hidden', 'true');
    showreelFrame.src = '';
    document.body.style.overflow = '';
  }
  showreelBtn.addEventListener('click', openModal);
  modalClose.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

  /* ---------------- PORTFOLIO FILTER ---------------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portCards = document.querySelectorAll('.port-card');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      portCards.forEach(card => {
        const match = filter === 'all' || card.dataset.cat === filter;
        if (match) {
          card.classList.remove('hidden');
          gsap.fromTo(card, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5 });
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  /* ---------------- BEFORE / AFTER SLIDER ---------------- */
  const baSlider = document.getElementById('baSlider');
  const baFrame = baSlider.querySelector('.ba-frame');
  const baBeforeWrap = document.getElementById('baBeforeWrap');
  const baHandle = document.getElementById('baHandle');
  let dragging = false;

  function setBeforeWidth(clientX) {
    const rect = baFrame.getBoundingClientRect();
    let pct = ((clientX - rect.left) / rect.width) * 100;
    pct = Math.max(2, Math.min(98, pct));
    baBeforeWrap.style.width = pct + '%';
    baHandle.style.left = pct + '%';
    const beforeImg = baBeforeWrap.querySelector('.ba-before');
    beforeImg.style.width = rect.width + 'px';
  }

  function startDrag(e) {
    dragging = true;
    document.body.style.userSelect = 'none';
  }
  function stopDrag() {
    dragging = false;
    document.body.style.userSelect = '';
  }
  function onDrag(e) {
    if (!dragging) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    setBeforeWidth(clientX);
  }

  baHandle.addEventListener('mousedown', startDrag);
  baHandle.addEventListener('touchstart', startDrag, { passive: true });
  window.addEventListener('mouseup', stopDrag);
  window.addEventListener('touchend', stopDrag);
  window.addEventListener('mousemove', onDrag);
  window.addEventListener('touchmove', onDrag, { passive: true });
  baFrame.addEventListener('click', (e) => setBeforeWidth(e.clientX));

  // Initialize the before image width to match frame
  window.addEventListener('load', () => {
    const rect = baFrame.getBoundingClientRect();
    baBeforeWrap.querySelector('.ba-before').style.width = rect.width + 'px';
  });
  window.addEventListener('resize', () => {
    const rect = baFrame.getBoundingClientRect();
    baBeforeWrap.querySelector('.ba-before').style.width = rect.width + 'px';
  });

  /* ---------------- TESTIMONIAL SWIPER ---------------- */
  new Swiper('.testimonial-swiper', {
    slidesPerView: 1,
    spaceBetween: 24,
    loop: true,
    autoplay: { delay: 5000, disableOnInteraction: false },
    pagination: { el: '.swiper-pagination', clickable: true },
    breakpoints: {
      768: { slidesPerView: 2 },
      1100: { slidesPerView: 3 }
    }
  });

  /* ---------------- FAQ ACCORDION ---------------- */
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    const a = item.querySelector('.faq-a');
    q.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(openItem => {
        openItem.classList.remove('open');
        openItem.querySelector('.faq-a').style.maxHeight = null;
        openItem.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.classList.add('open');
        a.style.maxHeight = a.scrollHeight + 'px';
        q.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ---------------- CONTACT FORM ---------------- */
  const contactForm = document.getElementById('contactForm');
  const formNote = document.getElementById('formNote');
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    formNote.textContent = "Thanks — your inquiry has been noted. I'll reply within one business day.";
    contactForm.reset();
  });

  /* ---------------- FOOTER YEAR ---------------- */
  document.getElementById('year').textContent = new Date().getFullYear();

  /* ---------------- SERVICE CARD TILT ---------------- */
  document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(card, { rotateX: y * -6, rotateY: x * 6, duration: 0.4, ease: 'power2.out', transformPerspective: 800 });
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.5, ease: 'power2.out' });
    });
  });
});
