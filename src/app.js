 
 function formatDate(timestamp){
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10) {
       hours = `0${hours}`
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`
    }
    let weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = weekDays[date.getDay()];
    return `${day} ${hours}:${minutes}`;

 }
 function getForecast(coordinates){
    console.log(coordinates);
  let apiKey = "dcbbd6fc3a17f5e8c90f576135d1831c"
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
 }

 function displayForecast(response){
  console.log(response.data.daily);
   let forecastElement = document.querySelector("#forecast");
   let forecastHTML =    `<div class="row">`;
   let days = ["Mon", "Tue", "Wed", "Thu", "Wed", "Thu"];
   days.forEach(function(day){
      forecastHTML = forecastHTML +

    `<div class="col-2">
      <div class="weather-forecast-date">${day}     
      </div>
      <img src="src/img/sunny.png" alt="" width="40px">
     <div class="weather-forecast-temperatures">
     <span class="weather-forecast-temp-max">18°</span>
     <span class="weather-forecast-temp-min">12°</span>      
    </div>
    </div>
 `; 
   });
   
  forecastHTML = forecastHTML + `</div>` 
   forecastElement.innerHTML = forecastHTML;
 }
 
 function showTemperature(response) {
 celsiusTemperature = Math.round(response.data.main.temp); 

 let temperatureElement = document.querySelector("#temperature");
 temperatureElement.innerHTML = celsiusTemperature;

 let cityElement = document.querySelector("#city");
 cityElement.innerHTML = response.data.name;

 let descriptionElement = document.querySelector("#description");
 descriptionElement.innerHTML = response.data.weather[0].main;

 let humidityElement = document.querySelector("#humidity");
 humidityElement.innerHTML = response.data.main.humidity;

 let windSpeedElement = document.querySelector("#wind-speed");
 windSpeedElement.innerHTML = Math.round(response.data.wind.speed);

 let dateElement = document.querySelector("#date");
 dateElement.innerHTML = formatDate(response.data.dt * 1000);

 let changingIcon = response.data.weather[0].icon;
 let iconElement = document.querySelector("#icon");
 iconElement.setAttribute("src", `https://openweathermap.org/img/wn/${changingIcon}@2x.png`);
 iconElement.setAttribute ("alt", response.data.weather[0].main);

 getForecast(response.data.coord);

  }
 function search(city){
 let apiKey = "dcbbd6fc3a17f5e8c90f576135d1831c";
 let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`; 
 axios.get(apiUrl).then(showTemperature);
}

  function processingSubmit (event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
 } 

 function showFahrTemperature (event) {
 event.preventDefault();
 let fahrTemperature = (celsiusTemperature * 9)/5 + 32;
 celsiusLink.classList.remove("active");
 fahrenheitLink.classList.add("active");
 let temperatureElement = document.querySelector("#temperature"); 
 temperatureElement.innerHTML = Math.round(fahrTemperature);
 }

 function showCelsiusTemperature(event){
 event.preventDefault();
 celsiusLink.classList.add("active");
 fahrenheitLink.classList.remove("active")
 let temperatureElement = document.querySelector("#temperature");
 temperatureElement.innerHTML = celsiusTemperature;
 }
 

 let celsiusTemperature = null;


 let form = document.querySelector("#search-form");
 form.addEventListener("submit", processingSubmit);

 let fahrenheitLink = document.querySelector("#fahrenheit-link");
 fahrenheitLink.addEventListener("click", showFahrTemperature);

 let celsiusLink = document.querySelector("#celsius-link");
 celsiusLink.addEventListener("click", showCelsiusTemperature);

search("Tokyo")