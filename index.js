const key = YOUR_KEY_HERE; // Replace with your OpenWeatherMap API key
const url = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="

const iconMap = {
    "01d": "wi-day-sunny",
    "01n": "wi-night-clear",
    "02d": "wi-day-cloudy",
    "02n": "wi-night-alt-cloudy",
    "03d": "wi-cloud",
    "03n": "wi-cloud",
    "04d": "wi-cloudy",
    "04n": "wi-cloudy",
    "09d": "wi-showers",
    "09n": "wi-showers",
    "10d": "wi-day-rain",
    "10n": "wi-night-alt-rain",
    "11d": "wi-thunderstorm",
    "11n": "wi-thunderstorm",
    "13d": "wi-snow",
    "13n": "wi-snow",
    "50d": "wi-fog",
    "50n": "wi-fog"
};

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

async function checkWeather(city){
    // Fetch the weather data from the API
    const response = await fetch(`${url}${city}&appid=${key}`); 

    if (response.status == 404) { // Check if the response is not OK (e.g., city not found)
        document.querySelector(".error").style.display = "block"; // Show error message
        document.querySelector(".weather").style.display = "block"; // Hide weather section
    } 
    else {
        var data = await response.json();

        // Getting icon codes to update the weather icon
        const iconCode = data.weather[0].icon;
        const description = data.weather[0].description;
        const iconClass = iconMap[iconCode] || "wi-na"; // Default to 'not available' icon if not found

        document.querySelector(".description").innerHTML = description.charAt(0).toUpperCase() + description.slice(1); // Capitalize first letter
        document.getElementById("weather-icon").className = "wi"; // Reset previous icon classes

        // high and low temperatures
        document.querySelector(".hi-lo").innerHTML = `H: ${Math.round(data.main.temp_max)}°        L: ${Math.round(data.main.temp_min)}°`;

        document.getElementById("weather-icon").classList.add(iconClass);

        // Update the HTML with the fetched data (temperature, city, humidity, wind speed)
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

        document.querySelector(".weather").style.display = "block"; // Make the weather section visible
        document.querySelector(".error").style.display = "none"; // Hide the error message
    }
}

searchBtn.addEventListener("click", ()=>{ checkWeather(searchBox.value); }); // search for the city when the button is clicked
searchBox.addEventListener("keyup", (event) => { // allows searching by pressing the Enter key
    if (event.key == "Enter") { // check for the Enter key
        checkWeather(searchBox.value); // search for the city when Enter is pressed
    }
});

checkWeather(); // Call the function to fetch and display the weather data