async function getItems() {
  const response = await fetch("data/items.json");
  const items = await response.json();
  const gallery = document.querySelector(".gallery");

  items.forEach(item => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <h2>${item.name}</h2>
      <figure>
        <img src="${item.image}" alt="${item.name}" loading="lazy">
      </figure>
      <address>${item.address}</address>
      <p>${item.description}</p>
      <button>Learn More</button>
    `;
    gallery.appendChild(card);
  });
}

function displayVisitMessage() {
  const msgContainer = document.getElementById("visit-message");
  const lastVisit = localStorage.getItem("lastVisit");
  const now = Date.now();

  if (!lastVisit) {
    msgContainer.textContent = "Welcome! Let us know if you have any questions.";
  } else {
    const days = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
    if (days < 1) {
      msgContainer.textContent = "Back so soon! Awesome!";
    } else {
      msgContainer.textContent = `You last visited ${days} day${days > 1 ? "s" : ""} ago.`;
    }
  }

  localStorage.setItem("lastVisit", now);
}

getItems();
displayVisitMessage();
