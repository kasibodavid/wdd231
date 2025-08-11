// js/storage.js
const KEY = 'explorenaija:favorites';

export function getFavorites(){
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  } catch(e){ return []; }
}

export function saveFavorite(id){
  const arr = getFavorites();
  if (!arr.includes(id)) arr.push(id);
  localStorage.setItem(KEY, JSON.stringify(arr));
}
