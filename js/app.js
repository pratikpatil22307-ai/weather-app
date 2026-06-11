// =======================
// DOM ELEMENTS
// =======================

const inputEl = document.getElementById("city-input");
const SearchButton = document.getElementById("search-btn");
const clearHistoryBtn = document.getElementById("clear-history-btn");

const historyList = document.getElementById("history-list");

const TempEl = document.getElementById("current-temp");
const humidityEl = document.getElementById("humidity");
const windEl = document.getElementById("wind-speed");
const airEl = document.getElementById("air-quality");

// =======================
// INITIAL RENDER
// =======================

renderHistory();

// =======================
// EVENT LISTENERS
// =======================

SearchButton.addEventListener("click", handleSearch);

inputEl.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        handleSearch();
    }
});

clearHistoryBtn.addEventListener("click", function () {

    clearHistoryStorage();

    renderHistory();
});

// =======================
// SEARCH FUNCTION
// =======================

async function handleSearch() {

    try {

        const city = inputEl.value.trim();

        if (city === "") {
            alert("Please enter a city name");
            return;
        }

        const formattedCity =
            city.charAt(0).toUpperCase() +
            city.slice(1).toLowerCase();

        // Get weather from weatherApi.js
        const data = await getWeather(city);

        // Save history using history.js
        addToHistory(formattedCity);

        // Update history UI
        renderHistory();

        // Update weather UI
        TempEl.textContent =
            `Current temperature in ${formattedCity} is ${data.main.temp}°C, feels like ${data.main.feels_like}°C.`;

        humidityEl.textContent =
            `Humidity: ${data.main.humidity}%`;

        windEl.textContent =
            `Wind Speed: ${data.wind.speed} m/s`;

        airEl.textContent =
            `Weather: ${data.weather[0].main} (${data.weather[0].description})`;

    } catch (error) {

        console.error(error);

        TempEl.textContent = "Failed to fetch weather data.";
        humidityEl.textContent = "--";
        windEl.textContent = "--";
        airEl.textContent = "--";
    }
}

// =======================
// HISTORY UI
// =======================

function renderHistory() {

    historyList.innerHTML = "";

    const history = getHistory();

    history.forEach(function (city) {

        const li = document.createElement("li");

        li.textContent = city;

        historyList.appendChild(li);
    });
}