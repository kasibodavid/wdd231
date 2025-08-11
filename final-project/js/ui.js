// js/ui.js
import { saveFavorite, getFavorites } from './storage.js';

function createTourCard(t) {
  const div = document.createElement('article');
  div.className = 'card';
  div.innerHTML = `
    <img loading="lazy" src="${t.image}" alt="${t.title}" width="600" height="400">
    <h3>${t.title}</h3>
    <p>${t.location} • ${t.duration}</p>
    <p class="meta"><span>₦${t.price}</span><span>⭐ ${t.rating}</span></p>
    <button data-id="${t.id}" class="details-btn">Details</button>
    <button data-id="${t.id}" class="fav-btn" aria-pressed="false">♡</button>
  `;
  return div;
}

export function renderTours(container, tours) {
  container.innerHTML = '';
  tours.forEach(t => container.appendChild(createTourCard(t)));
}

let modal, previouslyFocused;
export function initModal() {
  modal = document.getElementById('modal');
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e)=> {
    if (e.key === 'Escape' && modal && modal.getAttribute('aria-hidden') === 'false') closeModal();
  });
}

export function openModal(contentHtml) {
  previouslyFocused = document.activeElement;
  modal.innerHTML = `<div class="dialog" role="document">${contentHtml}<div style="text-align:right"><button id="close-modal">Close</button></div></div>`;
  modal.setAttribute('aria-hidden','false');
  document.getElementById('close-modal').focus();
  document.getElementById('close-modal').addEventListener('click', closeModal);
}

export function closeModal() {
  if (!modal) return;
  modal.setAttribute('aria-hidden','true');
  modal.innerHTML = '';
  if (previouslyFocused) previouslyFocused.focus();
}

export function hookCards(container, tours) {
  container.addEventListener('click', (e) => {
    const detailsBtn = e.target.closest('.details-btn');
    const favBtn = e.target.closest('.fav-btn');
    if (detailsBtn) {
      const id = detailsBtn.dataset.id;
      const t = tours.find(x=> String(x.id) === id);
      if (t) {
        openModal(`<h2>${t.title}</h2><p>${t.location} • ${t.duration}</p><p>${t.description}</p><p class="meta">Price: ₦${t.price} • Rating: ${t.rating}</p>`);
      }
    } else if (favBtn) {
      const id = favBtn.dataset.id;
      saveFavorite(id);
      favBtn.setAttribute('aria-pressed','true');
      favBtn.textContent = '♥';
    }
  });
}
