async function loadSpotlights() {
  const response = await fetch('data/member.json');
  const data = await response.json();
  const spotlightContainer = document.querySelector('.spotlights');

  // Filter only Gold or Silver members
  const qualified = data.members.filter(member =>
    member.membership === 'Gold' || member.membership === 'Silver'
  );

  // Shuffle and pick 2 or 3
  const shuffled = qualified.sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, Math.floor(Math.random() * 2) + 2); // 2 or 3

  selected.forEach(member => {
    const card = document.createElement('div');
    card.classList.add('card');

    card.innerHTML = `
      <img src="${member.logo}" alt="${member.name} logo">
      <div>
        <h3>${member.name}</h3>
        <p><strong>Phone:</strong> ${member.phone}</p>
        <p><strong>Address:</strong> ${member.address}</p>
        <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
        <p><strong>Level:</strong> ${member.membership}</p>
      </div>
    `;

    spotlightContainer.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', loadSpotlights);
