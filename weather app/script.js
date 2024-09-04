// Replace 'YOUR_API_KEY' with your actual OpenWeatherMap API key
const apiKey = 'YOUR_API_KEY';

document.getElementById('locationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const location = document.getElementById('locationInput').value;
    fetchWeatherData(location);
});

function fetchWeatherData(location) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => displayWeatherData(data))
        .catch(error => alert('Error fetching weather data. Please try again.'));
}

function displayWeatherData(data) {
    if (data.cod === 200) {
        const weatherInfo = document.getElementById('weatherInfo');
        weatherInfo.innerHTML = `
            <p><strong>${data.name}, ${data.sys.country}</strong></p>
            <p class="temperature">${data.main.temp}°C</p>
            <p>${data.weather[0].description}</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
            <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="Weather Icon">
        `;
    } else {
        alert('Location not found. Please enter a valid location.');
    }
}

// Optionally: Fetch weather based on user's geolocation
function fetchWeatherByGeolocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

            fetch(apiUrl)
                .then(response => response.json())
                .then(data => displayWeatherData(data))
                .catch(error => alert('Error fetching weather data. Please try again.'));
        });
    } else {
        alert('Geolocation is not supported by your browser.');
    }
}

// Uncomment the line below to fetch weather data automatically based on user's location when the page loads
// fetchWeatherByGeolocation();
