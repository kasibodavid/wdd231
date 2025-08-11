// js/main.js
import { fetchTours } from './data.js';
import { renderTours, initModal, hookCards } from './ui.js';

const navToggle = document.getElementById('nav-toggle');
const nav = document.getElementById('main-nav');
navToggle?.addEventListener('click', ()=>{
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!expanded));
  nav.classList.toggle('show');
});

document.getElementById('year')?.textContent = new Date().getFullYear();
document.getElementById('year2')?.textContent = new Date().getFullYear();
document.getElementById('year3')?.textContent = new Date().getFullYear();

initModal();

async function initToursPage(){
  try {
    const tours = await fetchTours(); // could throw
    // render some featured on index page if element exists
    const featuredList = document.getElementById('featured-list');
    if (featuredList) {
      renderTours(featuredList, tours.slice(0,4));
      hookCards(featuredList, tours);
    }

    const toursList = document.getElementById('tours-list');
    if (toursList) {
      renderTours(toursList, tours);
      hookCards(toursList, tours);

      // populate filter select
      const filter = document.getElementById('filter');
      const unique = Array.from(new Set(tours.map(t=>t.location)));
      unique.forEach(loc=>{
        const opt = document.createElement('option'); opt.value = loc; opt.textContent = loc;
        filter.appendChild(opt);
      });
      filter.addEventListener('change', ()=> {
        const val = filter.value;
        const filtered = val === 'all' ? tours : tours.filter(t=> t.location === val);
        renderTours(toursList, filtered);
      });

      // sort
      document.getElementById('sort')?.addEventListener('change', (e)=>{
        const val = e.target.value;
        let sorted = [...tours];
        if (val === 'price-asc') sorted.sort((a,b)=>a.price-b.price);
        if (val === 'price-desc') sorted.sort((a,b)=>b.price-a.price);
        renderTours(toursList, sorted);
      });
    }
  } catch (err) {
    console.error('Error loading tours:', err);
    const el = document.getElementById('tours-list') || document.getElementById('featured-list');
    if (el) el.innerHTML = '<p>Sorry — data failed to load. Try again later.</p>';
  }
}

initToursPage();
