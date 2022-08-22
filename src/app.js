 
 function showTemperature(response) {
 console.log(response.data)
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
 }
 
 
 let apiKey = "dcbbd6fc3a17f5e8c90f576135d1831c";

 let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Budapest&units=metric&appid=${apiKey}`;

 axios.get(apiUrl).then(showTemperature);