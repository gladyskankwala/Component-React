const API_KEY = "API_KEY";

async function getWeather() {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=Paris&units=metric&appid=${API_KEY}`
    );

    if (!res.ok) throw new Error("Erreur API");

    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.error("Erreur :", error.message);
  }
}

getWeather();


const API_KEY = "API_KEY"; // ⚠️ pour test seulement
const cityEl = document.getElementById("city");
const tempEl = document.getElementById("temp");
const descEl = document.getElementById("desc");

fetch(`https://api.openweathermap.org/data/2.5/weather?q=Paris&units=metric&appid=${API_KEY}`)
  .then(res => {
    if (!res.ok) throw new Error("Erreur API");
    return res.json();
  })
  .then(data => {
    cityEl.textContent = data.name;
    tempEl.textContent = `Température : ${data.main.temp} °C`;
    descEl.textContent = data.weather[0].description;
  })
  .catch(err => {
    console.error(err);
  });

