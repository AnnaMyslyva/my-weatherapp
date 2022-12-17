//Date + Time
let now = new Date();
function currentTime(now) {
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let h5 = document.querySelector("h5");
  h5.innerHTML = `${days[now.getDay()]},  ${hours}:${minutes}`;
  return h5.innerHTML;
}
currentTime(now);

//Search-Function + 1 Temp-Function

function getCurrentWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#currentTemp");
  let city = response.data.name;
  let h1 = document.querySelector("h1");
  let dispcription = document.querySelector("#discription");
  let wind = document.querySelector("#wind");
  let humid = document.querySelector("#humid");
  let iconElement = document.querySelector("#icon1");

  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  humid.innerHTML = response.data.main.humidity + "%";
  wind.innerHTML = response.data.wind.speed + " km/s";
  dispcription.innerHTML = response.data.weather[0].main;
  h1.innerHTML = `${city}`;
  currentTemp.innerHTML = `${temperature}ºC`;
}
function searchCity(city) {
  let apiKey = "c6da6d296757d783639131d01c953a9f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getCurrentWeather);
}

function doSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", doSubmit);

//Temperature-Functions

function showCurrentPosition(position) {
  let apiKey = "c6da6d296757d783639131d01c953a9f";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getCurrentWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentPosition);
}
let form1 = document.querySelector("#currentButton");
form1.addEventListener("click", getCurrentLocation);
