const API_KEY = "011c179aa6411dbc068b903058a0d442";

const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");

const weatherContainer = document.getElementById("weather-container");
const forecastSection = document.getElementById("forecast-section");

const loading = document.getElementById("loading");
const error = document.getElementById("error");

function showLoading() {
    loading.classList.remove("hidden");
    error.classList.add("hidden");
}

function hideLoading() {
    loading.classList.add("hidden");
}

function showError(message) {
    error.textContent = message;
    error.classList.remove("hidden");
}

function getWeatherIcon(condition) {
    condition = condition.toLowerCase();
    if (condition.includes("clear")) return "☀️";
    if (condition.includes("cloud")) return "☁️";
    if (condition.includes("rain")) return "🌧️";
    if (condition.includes("thunder")) return "⛈️";
    if (condition.includes("snow")) return "❄️";
    if (condition.includes("mist") || condition.includes("fog")) return "🌫️";
    return "🌤️";
}

function formatTime(timestamp) {
    return new Date(timestamp * 1000).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });
}

function updateDateTime() {
    const now = new Date();
    document.getElementById("date-time").textContent = 
        now.toLocaleString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
}

function updateBackground(weatherType) {
    document.body.classList.remove(
        "weather-clear", "weather-clouds", "weather-rain",
        "weather-thunderstorm", "weather-snow", "weather-mist"
    );

    weatherType = weatherType.toLowerCase();

    if (weatherType.includes("clear")) {
        document.body.classList.add("weather-clear");
    } else if (weatherType.includes("cloud")) {
        document.body.classList.add("weather-clouds");
    } else if (weatherType.includes("rain")) {
        document.body.classList.add("weather-rain");
    } else if (weatherType.includes("thunder")) {
        document.body.classList.add("weather-thunderstorm");
    } else if (weatherType.includes("snow")) {
        document.body.classList.add("weather-snow");
    } else {
        document.body.classList.add("weather-mist");
    }
}

async function fetchWeather(city) {
    try {
        showLoading();

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );

        const data = await response.json();
        hideLoading();

        if (data.cod != 200) {
            showError("City not found");
            return;
        }

        weatherContainer.classList.remove("hidden");
        forecastSection.classList.remove("hidden");

        document.getElementById("location").textContent = `${data.name}, ${data.sys.country}`;
        document.getElementById("temperature").textContent = `${Math.round(data.main.temp)}°C`;
        document.getElementById("condition").textContent = data.weather[0].description;
        document.getElementById("weather-icon").textContent = getWeatherIcon(data.weather[0].main);

        // Update Background
        updateBackground(data.weather[0].main);

        document.getElementById("feels-like").textContent = `${Math.round(data.main.feels_like)}°C`;
        document.getElementById("humidity").textContent = `${data.main.humidity}%`;
        document.getElementById("wind").textContent = `${Math.round(data.wind.speed * 3.6)} km/h`;
        document.getElementById("pressure").textContent = `${data.main.pressure} hPa`;
        document.getElementById("high-low").textContent = `${Math.round(data.main.temp_max)}° / ${Math.round(data.main.temp_min)}°`;
        document.getElementById("sunrise").textContent = formatTime(data.sys.sunrise);
        document.getElementById("sunset").textContent = formatTime(data.sys.sunset);

        updateDateTime();
        fetchForecast(city);

    } catch (err) {
        hideLoading();
        showError("Failed to fetch weather data");
        console.error(err);
    }
}

async function fetchForecast(city) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
        );

        const data = await response.json();
        const forecastContainer = document.getElementById("forecast-container");
        forecastContainer.innerHTML = "";

        const dailyForecast = data.list.filter(item => item.dt_txt.includes("12:00:00"));

        dailyForecast.slice(0, 5).forEach(day => {
            const date = new Date(day.dt_txt);
            const card = document.createElement("div");
            card.className = "forecast-card";

            card.innerHTML = `
                <div class="forecast-day">${date.toLocaleDateString("en-US", { weekday: "short" })}</div>
                <div class="forecast-icon">${getWeatherIcon(day.weather[0].main)}</div>
                <div class="forecast-temp">${Math.round(day.main.temp)}°C</div>
                <div>${day.weather[0].main}</div>
            `;
            forecastContainer.appendChild(card);
        });

    } catch (err) {
        console.error(err);
    }
}

// Event Listeners
searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (!city) return;
    fetchWeather(city);
});

cityInput.addEventListener("keypress", e => {
    if (e.key === "Enter") {
        const city = cityInput.value.trim();
        if (!city) return;
        fetchWeather(city);
    }
});

// Load default city
window.addEventListener("load", () => {
    fetchWeather("Karachi");
});