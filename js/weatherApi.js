 async function getWeather(city){
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

    return data 
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