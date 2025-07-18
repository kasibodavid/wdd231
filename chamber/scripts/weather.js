// weather.js

const apiKey = "YOUR_API_KEY"; // Replace with your OpenWeatherMap API key
const lat = 6.5244;  // Latitude for Lagos
const lon = 3.3792;  // Longitude for Lagos

const tempSpan = document.getElementById("temp");
const descSpan = document.getElementById("description");
const forecastList = document.getElementById("forecast-list");

const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

async function fetchWeather() {
  try {
    const response = await fetch(weatherURL);
    const data = await response.json();
    tempSpan.textContent = Math.round(data.main.temp);
    descSpan.textContent = data.weather[0].description;
  } catch (error) {
    console.error("Error fetching current weather:", error);
  }
}

async function fetchForecast() {
  try {
    const response = await fetch(forecastURL);
    const data = await response.json();

    const forecastDays = [];
    const filtered = data.list.filter(item => item.dt_txt.includes("12:00:00"));

    filtered.slice(0, 3).forEach(forecast => {
      const date = new Date(forecast.dt_txt);
      const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
      const temp = Math.round(forecast.main.temp);
      forecastDays.push(`<li><strong>${dayName}:</strong> ${temp}°C</li>`);
    });

    forecastList.innerHTML = forecastDays.join("");
  } catch (error) {
    console.error("Error fetching forecast:", error);
  }
}

fetchWeather();
fetchForecast();
