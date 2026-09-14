'use strict';

const modal = document.getElementById('orderModal');
const confirmStep = document.getElementById('confirmStep');
const prankStep = document.getElementById('prankStep');
const selectedCard = document.getElementById('selectedCard');
const selectedCountry = document.getElementById('selectedCountry');
const orderForm = document.getElementById('orderForm');
const customerName = document.getElementById('customerName');
const customerPhone = document.getElementById('customerPhone');
const dataConsent = document.getElementById('dataConsent');
const toast = document.getElementById('toast');

function wipePersonalData() {
  customerName.value = '';
  customerPhone.value = '';
  dataConsent.checked = false;
  orderForm.reset();
}

function scrollToCards() {
  document.getElementById('cards')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

document.querySelectorAll('[data-scroll-cards]').forEach((button) => {
  button.addEventListener('click', scrollToCards);
});

function openModal(card, country) {
  wipePersonalData();
  selectedCard.textContent = card;
  selectedCountry.textContent = country;
  confirmStep.classList.remove('hidden');
  prankStep.classList.add('hidden');
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  window.setTimeout(() => customerName.focus(), 180);
}

function closeModal() {
  wipePersonalData();
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
}

document.querySelectorAll('.order-btn').forEach((button) => {
  button.addEventListener('click', () => {
    openModal(button.dataset.card, button.dataset.country);
  });
});

document.querySelectorAll('[data-close-modal]').forEach((element) => {
  element.addEventListener('click', closeModal);
});

customerPhone.addEventListener('input', () => {
  customerPhone.value = customerPhone.value.replace(/[^0-9+() -]/g, '');
});

orderForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!orderForm.checkValidity()) {
    orderForm.reportValidity();
    return;
  }

  // First erase every personal value. Only after that reveal the joke.
  wipePersonalData();
  confirmStep.classList.add('hidden');
  prankStep.classList.remove('hidden');
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal.classList.contains('open')) closeModal();
});

const filters = document.querySelectorAll('.filter');
const cards = document.querySelectorAll('.product-card');

filters.forEach((filter) => {
  filter.addEventListener('click', () => {
    filters.forEach((item) => item.classList.remove('active'));
    filter.classList.add('active');
    const category = filter.dataset.filter;
    cards.forEach((card) => {
      const shouldShow = category === 'all' || card.dataset.category === category;
      card.classList.toggle('filtered-out', !shouldShow);
    });
  });
});

let toastTimer;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 1800);
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const targetId = link.getAttribute('href');
    if (!targetId || targetId === '#') return;
    const target = document.querySelector(targetId);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// Extra cleanup for refresh, back/forward cache and tab closing.
window.addEventListener('pageshow', wipePersonalData);
window.addEventListener('pagehide', wipePersonalData);
window.addEventListener('beforeunload', wipePersonalData);

// The page deliberately has no fetch/XHR, analytics, cookies,
// localStorage, sessionStorage, service worker or external API calls.
console.info('LumaCard loaded: application fields are local-only and cleared immediately.');
