//Date + Time
let now = new Date();

function currentTime(now) {
  let hours = now.getHours();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let h5 = document.querySelector("h5");
  h5.innerHTML = `${days[now.getDay()]},  ${hours}:${minutes}`;
  return h5.innerHTML;
}
currentTime(now);

function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      ` 
    <div class="col-2">
      <div class="container text-center">
              <div class="card border-success mb-3" style="max-width: 18rem">
                <div class="card-header bg-transparent border-success">${day}</div>
                <div class="card-body text-success">
                  <h5 class="card-title"></h5>
                  <p class="card-weatherPic">
                    <img
                      src="https://ssl.gstatic.com/onebox/weather/48/cloudy.png"
                      width="50"
                      height="50"
                    />
                  </p>
                </div>
                <div class="card-footer bg-transparent border-success">13º</div>
              </div>
            </div>
          </div>
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

//Search-Function + 1 Temp-Function
let celsiusTemp = null;

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKEY = "c6da6d296757d783639131d01c953a9f";
  let apiURL = `http://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKEY}&units=metric`;
  axios.get(apiURL).then(displayForecast);
}

function getCurrentWeather(response) {
  celsiusTemp = Math.round(response.data.main.temp);
  let temperature = celsiusTemp;
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

  getForecast(response.data.coord);
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

function convertToFahrenheit(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#currentTemp");
  let fahrenheitTemp = Math.round((celsiusTemp * 9) / 5 + 32);
  tempElement.innerHTML = `${fahrenheitTemp} `;
}
let fahrenheitLink = document.querySelector("#fahrenheitLink");
fahrenheitLink.addEventListener("click", convertToFahrenheit);
