let now = new Date();

let date = now.getDate();

let months = [
  "Jan",
  "Feb",
  "March",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];

let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"];
let day = days[now.getDay()];
let hour = now.getHours();
if (hour < 10) {
  hour = "0" + hour;
} else {
  hour = hour + "";
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = "0" + minutes;
} else {
  minutes = minutes + "";
}

let seconds = now.getSeconds();

let h4 = document.querySelector("#dayMonth");
h4.innerHTML = `${day}, ${month} ${date}`;

let time = document.querySelector("time");
time.innerHTML = `${hour}:${minutes}:${seconds}`;

//search city

function showcity(event) {
  event.preventDefault();
  let searchplace = document.querySelector("#cityInput");
  let newplace = document.querySelector("#newCity");
  newplace.innerHTML = `${searchplace.value}`;

  let apiKey = "8fe278b092a85030c10676261e22f928";
  let city = `${searchplace.value}`;

  let apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${searchplace.value}&units=metric&appid=${apiKey}`;

  axios.get(apiurl).then(showWeather);
}

let form = document.querySelector("#search-place");
form.addEventListener("submit", showcity);
form.addEventListener("click", showcity);

function showWeather(response) {
  console.log(response);

  let cityWeather = document.querySelector("#currentTemp");
  cityWeather.innerHTML = Math.round(response.data.main.temp);

  let cityName = response.data.name;
  let nameCity = document.querySelector("#newCity");
  nameCity.innerHTML = `${cityName}`;

  let h3 = response.data.sys.country;
  let countryName = document.querySelector("#nameCountry");
  countryName.innerHTML = `${h3}`;

  let mintemp = Math.round(response.data.main.temp_min);
  let minimunTemp = document.querySelector("#miniTemp");
  minimunTemp.innerHTML = `${mintemp}℃`;

  let weatherdescription = response.data.weather[0].main;
  let mainDescription = document.querySelector("#description");
  mainDescription.innerHTML = `${weatherdescription}`;

  let humidity = response.data.main.humidity;
  let checkHumidity = document.querySelector("#humidityElement");
  checkHumidity.innerHTML = `${humidity}%`;

  let Wind = Math.round(response.data.wind.speed);
  let windSpeed = document.querySelector("#windElement");
  windSpeed.innerHTML = `${Wind} m/s`;
}

function showPosition(position) {
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
  let apiKey = "8fe278b092a85030c10676261e22f928";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

function currentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("#currentButton");
button.addEventListener("click", currentPosition);
