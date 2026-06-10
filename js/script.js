/* ============================================
   NEURON24 — JavaScript
   ============================================ */

(function () {
  'use strict';

  // ---- Header scroll effect ----
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.style.background = 'rgba(0, 20, 53, 0.98)';
    } else {
      header.style.background = 'rgba(0, 20, 53, 0.95)';
    }
  });

  // ---- Mobile menu ----
  const burger = document.querySelector('.header__burger');
  const mobileMenu = document.querySelector('.mobile-menu');
  burger && burger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    const spans = burger.querySelectorAll('span');
    if (mobileMenu.classList.contains('open')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });

  // Close mobile menu on nav link click
  document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      const spans = burger.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    });
  });

  // ---- Products carousel ----
  const tabs = document.querySelectorAll('.products__tab');
  const panels = document.querySelectorAll('.product-panel');
  const paginationInfo = document.querySelector('.products__pagination-info');
  const total = tabs.length;
  let activeIdx = 0;

  function setProduct(idx) {
    activeIdx = (idx + total) % total;
    tabs.forEach((t, i) => t.classList.toggle('active', i === activeIdx));
    panels.forEach((p, i) => p.classList.toggle('active', i === activeIdx));
    if (paginationInfo) paginationInfo.textContent = (activeIdx + 1) + '/' + total;
  }

  tabs.forEach((tab, i) => tab.addEventListener('click', () => setProduct(i)));

  const prevBtn = document.querySelector('.products__nav-btn--prev');
  const nextBtn = document.querySelector('.products__nav-btn--next');
  const pagePrev = document.querySelector('.products__pagination-btn--prev');
  const pageNext = document.querySelector('.products__pagination-btn--next');

  prevBtn && prevBtn.addEventListener('click', () => setProduct(activeIdx - 1));
  nextBtn && nextBtn.addEventListener('click', () => setProduct(activeIdx + 1));
  pagePrev && pagePrev.addEventListener('click', () => setProduct(activeIdx - 1));
  pageNext && pageNext.addEventListener('click', () => setProduct(activeIdx + 1));

  // ---- FAQ accordion ----
  document.querySelectorAll('.faq__item').forEach(item => {
    const question = item.querySelector('.faq__question');
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      // close all
      document.querySelectorAll('.faq__item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  // ---- Demo form ----
  const demoForm = document.getElementById('demo-form');
  const demoSuccess = document.getElementById('demo-success');
  demoForm && demoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    demoForm.style.display = 'none';
    demoSuccess.classList.add('visible');
  });

  // ---- Contact form ----
  const contactForm = document.getElementById('contact-form');
  const contactSuccess = document.getElementById('contact-success');
  contactForm && contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    contactForm.style.display = 'none';
    contactSuccess.classList.add('visible');
  });

  // ---- Scroll-to-demo buttons ----
  document.querySelectorAll('[data-scroll-to]').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = document.querySelector(btn.dataset.scrollTo);
      target && target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // ---- Animate on scroll ----
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.problem-card, .stat-card, .case-card, .review-card, .howitworks__step').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      observer.observe(el);
    });
  }
})();
