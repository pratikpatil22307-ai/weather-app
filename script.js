
const savedHistory =  localStorage.getItem("history");
let searchHistory = JSON.parse(savedHistory) || [];
const historyList = document.getElementById("history-list");
renderHistory();
const inputEl = document.getElementById("city-input");
const SearchButton = document.getElementById("search-btn");
const clearHistoryBtn =document.getElementById("clear-history-btn");
const TempEl = document.getElementById("current-temp");
const humidityEl = document.getElementById("humidity");
const windEl = document.getElementById("wind-speed");
const airEl = document.getElementById("air-quality");



SearchButton.addEventListener("click", handleSearch);

inputEl.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        handleSearch();
    }

});
clearHistoryBtn.addEventListener(
    "click",
    clearHistory
);
function clearHistory() {

    searchHistory = [];

    localStorage.removeItem("history");

    renderHistory();

}


async function handleSearch() {
try{
    const city = inputEl.value.trim();
    
const formattedCity =
    city.charAt(0).toUpperCase() +
    city.slice(1).toLowerCase();

    if (city === "") {
        alert("Please enter a city name");
        return;

    }
   
    if (!searchHistory.includes(formattedCity)) {
    searchHistory.push(formattedCity);

     localStorage.setItem(
    "history",
    JSON.stringify(searchHistory)
   );
}

renderHistory();
    
 // fetch() sends an HTTP request to the weather server
    // Think of it as ordering food from a restaurant
    // We have asked for weather data, but haven't opened the package yet
    //it has just given the package object with headers no data
        /*
        RESPONSE ANALOGY

        Restaurant Analogy:

        You order food
              ↓
        Waiter brings a sealed package
              ↓
        response

        response contains:
        - status code (200, 404, etc.)
        - headers
        - body

        But NOT the actual weather data directly.

        Example:

        Response {
            status: 200,
            ok: true,
            ...
        }
    */

    // Open the package and convert JSON into a JavaScript object

    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=51e3da02f4575ac5663d62d04dc88053&units=metric`
    );
      /*
        JSON ANALOGY

        response = sealed Amazon box 📦

        response.json() = opening the box 📦➡️📱

        data = actual contents inside

        Example:

        {
            name: "Pune",
            main: {
                temp: 31,
                humidity: 55
            },
            wind: {
                speed: 4.5
            }
        }

        Now we can access:

        data.name
        data.main.temp
        data.main.humidity
        data.wind.speed
    */

    const data = await response.json();

    console.log(data);

    TempEl.textContent =
        `Current temperature in ${formattedCity} is ${data.main.temp}°C, feels like ${data.main.feels_like}°C.`;

    humidityEl.textContent =
        `Humidity: ${data.main.humidity}%`;

    windEl.textContent =
        `Wind Speed: ${data.wind.speed} m/s`;

    airEl.textContent =
        `Weather: ${data.weather[0].main} (${data.weather[0].description})`;



}catch(error){
       TempEl.textContent = "Failed to fetch weather data.";
        humidityEl.textContent = "--";
        windEl.textContent = "--";
        airEl.textContent = "--";
}
}

// React
//   ↓
// fetch("http://localhost:5000/weather")
//
// Browser sends HTTP request
//   ↓
// Express receives request
//
// Express asks Weather API
//   ↓
// Weather API returns JSON
//
// Express receives JSON
//   ↓
// res.json(weatherData)
//
// Express sends JSON response
//   ↓
// Browser receives response
//
// response.json()
//   ↓
// JavaScript object created
//
// React updates UI
function renderHistory(){
    historyList.innerHTML="";

    searchHistory.forEach(function(city){
       const li=document.createElement("li");

       li.textContent=city;
       historyList.appendChild(li)//
       //history lsit is the html element whose innerhtml is showing ,unless you append it to history list,it wont show on html 
    });
}