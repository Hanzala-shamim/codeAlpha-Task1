// Replace 'YOUR_API_KEY' with your OpenWeatherMap API key
const apiKey = 'O3Y60GE0I53M89M0.';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
const mapApiKey = 'YOUR_MAP_API_KEY'; // Get an API key from a mapping service like Google Maps

// Function to fetch weather data
async function getWeatherData(city) {
    const response = await fetch(`${apiUrl}?q=${city}&appid=${apiKey}`);
    const data = await response.json();
    return data;
}

// Function to update the UI with weather information
function updateUI(weatherData) {
    document.getElementById('location').innerText = `${weatherData.name}, ${weatherData.sys.country}`;
    document.getElementById('temperature').innerText = `${Math.round(weatherData.main.temp - 273.15)}°C`; // Convert from Kelvin
    document.getElementById('description').innerText = weatherData.weather[0].description;

    // Initialize map using the latitude and longitude from the weather data
    const map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: weatherData.coord.lat, lng: weatherData.coord.lon },
        zoom: 10
    });
}

// Function to handle form submission
async function handleFormSubmit(event) {
    event.preventDefault();
    const city = document.getElementById('cityInput').value;
    const weatherData = await getWeatherData(city);
    updateUI(weatherData);
}

// Attach form submission handler to the form
document.getElementById('weatherForm').addEventListener('submit', handleFormSubmit);
