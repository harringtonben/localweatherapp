"use strict";

const tm = (unix_tm) => {
  var dt = new Date(unix_tm*1000);
  return dt;
};

const domStrang = (currentWeather) => {
    let printStrang = ``;
    printStrang += `<div class="weather-city">
                        <h1 id="city">${currentWeather.name}</h1>
                    </div>
                    <table class="table current-weather">
                      <tr class="forecast">
                        <td>
                          <img class="weatherpic" src="http://openweathermap.org/img/w/${currentWeather.weather[0].icon}.png" alt="">
                        <td>
                        <td>
                          <p class="timestamp">${tm(currentWeather.dt)}</p>
                        </td>
                        <td>
                          <p class="high-temp">Current Temp: ${Math.round(currentWeather.main.temp)}</p>
                        </td>
                        <td>
                          <p class="low-temp hide">: </p>
                        </td>  
                        <td>
                          <p class="conditions">Conditions: ${currentWeather.weather[0].description}</p>
                        </td>
                        <td>
                          <p class="windspeed">Wind Speed: ${currentWeather.wind.speed}</p> 
                        </td>
                        <td>
                          <p class="airpressure">Air Pressue: ${currentWeather.main.pressure}</p>
                        </td>
                        <td>
                          <button class=" btn btn-primary glyphicon glyphicon-save save"></button>
                        </td>
                      </tr>
                    </table>`;
    printDom(printStrang);
};

const threeDayWeather = (currentWeather) => {
  let printStrang = ``;
  printStrang += `<div class="weather-city">
                      <h1 id="city">${currentWeather.city.name}</h1>
                  </div>
                  <table class="table current-weather">`;
  let forecastArray = currentWeather.list;
  for (let i = 0; i < 3; i++) {
    printStrang += `<tr class="forecast">
                      <td>
                        <img class="weatherpic" src="http://openweathermap.org/img/w/${forecastArray[i].weather[0].icon}.png" alt="">
                      </td>
                      <td>
                        <p class="timestamp">${tm(forecastArray[i].dt)}</p>
                      </td>
                      <td>
                        <p class="high-temp">High Temp: ${Math.round(forecastArray[i].temp.max)}</p>
                      </td>
                      <td>
                        <p class="low-temp">Low Temp: ${Math.round(forecastArray[i].temp.min)}</p>
                      </td>
                      <td>
                        <p class="conditions">Conditions: ${forecastArray[i].weather[0].description}</p>
                      </td>
                      <td>
                        <p class="windspeed">Wind Speed: ${forecastArray[i].speed}</p>
                      </td>
                      <td>
                        <p class="airpressure">Air Pressure: ${forecastArray[i].pressure}</p>
                      </td>
                      <td>
                        <button class=" btn btn-primary glyphicon glyphicon-save save"></button>
                      </td>
                    </tr>`;
  }
    printStrang += `</table>`;
  printDom(printStrang);
};

const sevenDayWeather = (currentWeather) => {
  let printStrang = ``;
    printStrang += `<div class="weather-city">
                        <h1 id="city">${currentWeather.city.name}</h1>
                    </div>
                    <table class="table current-weather">`;
  let forecastArray = currentWeather.list;
  for (let i = 0; i < forecastArray.length; i++) {
    printStrang += `<tr class="forecast">
                      <td>
                        <img class="weatherpic" src="http://openweathermap.org/img/w/${forecastArray[i].weather[0].icon}.png" alt="">
                      </td>
                      <td>
                        <p class="timestamp" >${tm(forecastArray[i].dt)}</p>
                      </td>
                      <td>
                        <p class="high-temp">High Temp: ${Math.round(forecastArray[i].temp.max)}</p>
                      </td>
                      <td>
                        <p class="low-temp">Low Temp: ${Math.round(forecastArray[i].temp.min)}</p>
                      </td>
                      <td>
                        <p class="conditions">Conditions: ${forecastArray[i].weather[0].description}</p>
                      </td>
                      <td>
                        <p class="windspeed">Wind Speed: ${forecastArray[i].speed}</p>
                      </td>
                      <td>
                        <p class="airpressure">Air Pressure: ${forecastArray[i].pressure}</p>
                      </td>
                      <td>
                        <button class=" btn btn-primary glyphicon glyphicon-save save"></button>
                      </td>
                    </tr>`;
  }
    printStrang += `</table>`;
  printDom(printStrang);
};

const savedForecasts = (savedForecast) => {
  let printStrang = ``;
  for (let i = 0; i < savedForecast.length; i++) {
    printStrang += `<tr class="my-forecasts">
                      <td>
                        <img src="${savedForecast[i].image_path}" alt="">
                      </td>
                      <td>
                        <p>${savedForecast[i].timestamp}
                      </td>
                      <td>
                        <p>${savedForecast[i].city_name}</p>
                      </td>
                      <td>
                        <p>High Temp: ${savedForecast[i].high_temp}</p>
                      </td>
                      <td>
                        <p>Low Temp: ${savedForecast[i].low_temp}</p>
                      </td>
                      <td>
                        <p>Conditions: ${savedForecast[i].conditions}</p>
                      </td>
                      <td>
                        <p>Wind Speed: ${savedForecast[i].windspeed}</p>
                      </td>
                      <td>
                        <p>Air Pressure: ${savedForecast[i].airpressure}
                      <td>
                        <button class="btn-xs btn-default delete" data-firebase-id="${savedForecast[i].id}">X</button>
                      </td>
                    </tr>`;
  }
    printStrang += `</table>`;
  printSaved(printStrang);
};

const printDom = (strang) => {
    $("#weatherOutput").html(strang);
};

const printSaved = (strang) => {
  $("#savedforecasts").html(strang);
};

module.exports = {domStrang, threeDayWeather, sevenDayWeather, savedForecasts};