'use strict';

const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');

menuBtn?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', String(open));
  menuBtn.textContent = open ? '×' : '☰';
});

document.querySelectorAll('#nav a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.textContent = '☰';
  });
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const id = link.getAttribute('href');
    if (!id || id === '#') return;
    const target = document.querySelector(id);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

const filters = document.querySelectorAll('.filter');
const vacancies = document.querySelectorAll('.vacancy-card');

filters.forEach((button) => {
  button.addEventListener('click', () => {
    filters.forEach((item) => item.classList.remove('active'));
    button.classList.add('active');

    const category = button.dataset.filter;
    vacancies.forEach((card) => {
      const visible = category === 'all' || card.dataset.category === category;
      card.classList.toggle('hidden-card', !visible);
    });
  });
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 1000) {
    nav.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.textContent = '☰';
  }
});
