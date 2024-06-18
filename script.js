const weatherForm = document.getElementById('weatherForm');
const cityInput = document.getElementById('cityInput');
const cityNameDisplay = document.getElementById('cityName');
const temperatureDisplay = document.getElementById('temperature');
const weatherDescriptionDisplay = document.getElementById('weatherDescription');
const weatherIcon = document.getElementById('weatherIcon');
const errorText = document.getElementById('errorText');

const API_KEY = '85642d565ecc7e797adb011c5f0fd264'; // Replace with your OpenWeatherMap API key

weatherForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const city = cityInput.value.trim();
    if (city) {
        getWeather(city);
    } else {
        showError('Please enter a city name.');
    }
});

async function getWeather(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Weather data not available');
        }
        const weatherData = await response.json();
        
        const cityName = weatherData.name;
        const temperature = weatherData.main.temp;
        const weatherDescription = weatherData.weather[0].description;
        const iconCode = weatherData.weather[0].icon;

        cityNameDisplay.textContent = cityName;
        temperatureDisplay.textContent = `${temperature.toFixed(1)} °C`;
        weatherDescriptionDisplay.textContent = weatherDescription;
        weatherIcon.src = `http://openweathermap.org/img/wn/${iconCode}.png`;

        clearError();
    } catch (error) {
        console.error('Error fetching weather data:', error);
        showError('Error fetching weather data. Please try again later.');
    }
}

function showError(message) {
    errorText.textContent = message;
    cityNameDisplay.textContent = '';
    temperatureDisplay.textContent = '';
    weatherDescriptionDisplay.textContent = '';
    weatherIcon.src = '';
}

function clearError() {
    errorText.textContent = '';
}
