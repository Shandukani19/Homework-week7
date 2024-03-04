function updateWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);

  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;

  let conditionElement = document.querySelector("#current-condition");
  conditionElement.innerHTML = response.data.condition.description;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `${response.data.wind.speed}km/h`;

  let now = new Date(response.data.time * 1000);

  let timeElement = document.querySelector("#current-time");
  timeElement.innerHTML = formatDate(now);

  let iconElement = document.querySelector("#temperature-icon");
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="temperature-icon" />`;

  getForecast(response.data.city);
}

function formatDate(now) {
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[now.getDay()];
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} | ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "t2a074aee318112cc56a6b83544bob8f";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeather);
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");

  searchCity(searchInput.value);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "t2a074aee318112cc56a6b83544bob8f";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index > 0 && index < 6) {
      forecastHtml =
        forecastHtml +
        `
      <div class="forecast-container"
       <div class="forecast-day">${formatDay(day.time)}
       </div>
       
            <img
              src="${day.condition.icon_url}"
              class="forecast-icon"
            />
       
       <div class="forecast-temperatures">

            <div class="forecast-temperature">
            <strong>${Math.round(day.temperature.maximum)}°</strong></div>

            <div class="forecast-temperature">${Math.round(
              day.temperature.minimum
            )}°</div>
       </div>
          </div>
          `;
    }
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

searchCity("Helsinki");
