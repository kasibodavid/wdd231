// js/data.js
export async function fetchTours() {
  try {
    const resp = await fetch('/final-project/data/tours.json');
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const data = await resp.json();
    return data.tours; // expects { "tours": [...] }
  } catch (err) {
    console.error('fetchTours error', err);
    throw err;
  }
}
