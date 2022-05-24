function formatDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "saturday",
  ];
  let day = days[date.getDay()];

  return `${day}, ${hours}:${minutes}`;
}

function displayWeather(response) {
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed * 3.6
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector(".city-name").innerHTML = response.data.name;
}

function getCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  getApiUrl(city);
}

function getApiUrl(city) {
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=05409376d26a23dfd6e8eeb4020ab875&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
}

function showCurrentWeather(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentWeather);
}

let currentTime = new Date();
let dateTimeElement = document.querySelector("#day-time");
dateTimeElement.innerHTML = formatDate(currentTime);

let apiKey = "05409376d26a23dfd6e8eeb4020ab875";
let units = "metric";

let submitCity = document.querySelector("#search-form");
submitCity.addEventListener("submit", getCity);

let currentButton = document.querySelector(".btn-info");
currentButton.addEventListener("click", getCurrentPosition);

getApiUrl("Munich");
