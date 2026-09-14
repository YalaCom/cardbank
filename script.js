const modal = document.getElementById('orderModal');
const confirmStep = document.getElementById('confirmStep');
const prankStep = document.getElementById('prankStep');
const selectedCard = document.getElementById('selectedCard');
const selectedCountry = document.getElementById('selectedCountry');
const demoConsent = document.getElementById('demoConsent');
const confirmOrder = document.getElementById('confirmOrder');
const toast = document.getElementById('toast');

function scrollToCards() {
  document.getElementById('cards')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

document.querySelectorAll('[data-scroll-cards]').forEach((button) => {
  button.addEventListener('click', scrollToCards);
});

function openModal(card, country) {
  selectedCard.textContent = card;
  selectedCountry.textContent = country;
  confirmStep.classList.remove('hidden');
  prankStep.classList.add('hidden');
  demoConsent.checked = false;
  confirmOrder.disabled = true;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
}

function closeModal() {
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

demoConsent.addEventListener('change', () => {
  confirmOrder.disabled = !demoConsent.checked;
});

confirmOrder.addEventListener('click', () => {
  if (!demoConsent.checked) return;
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

const navLinks = document.querySelectorAll('a[href^="#"]');
navLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    const targetId = link.getAttribute('href');
    if (!targetId || targetId === '#') return;
    const target = document.querySelector(targetId);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// Privacy guard: this demo intentionally contains no network requests,
// no personal-data form fields, no localStorage/sessionStorage writes,
// no analytics and no external API calls.
if ('serviceWorker' in navigator) {
  // No service worker is registered so nothing is cached beyond normal browser behavior.
}

console.info('LumaCard demo loaded. No personal data collection is implemented.');
