 
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
 
 
 function showTemperature(response) {
 let temperatureElement = document.querySelector("#temperature");
 temperatureElement.innerHTML = Math.round(response.data.main.temp);

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
 
 search("Zaporizhzhia")


 let form = document.querySelector("#search-form");
 form.addEventListener("submit", processingSubmit);