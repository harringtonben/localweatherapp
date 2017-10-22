"use strict";

const tm = (unix_tm) => {
  var dt = new Date(unix_tm*1000);
  return dt;
};

const domStrang = (currentWeather) => {
    let printStrang = ``;
    printStrang += `<div class="weather-city">
                        <h1>${currentWeather.name}</h1>
                    </div>
                    <table class="table current-weather">
                      <tr>
                        <td>
                          <img src="http://openweathermap.org/img/w/${currentWeather.weather[0].icon}.png" alt="">
                        <td>
                        <td>
                          <p>${tm(currentWeather.dt)}</p>
                        </td>
                        <td>
                          <p>Current Temp: ${Math.round(currentWeather.main.temp)}</p>
                        </td>
                        <td>
                          <p>Conditions: ${currentWeather.weather[0].description}</p>
                        </td>
                        <td>
                          <p>Wind Speed: ${currentWeather.wind.speed}</p> 
                        </td>
                        <td>
                          <p>Air Pressue: ${currentWeather.main.pressure}</p>
                        </td>
                      </tr>
                    </table>`;
    printDom(printStrang);
};

const threeDayWeather = (currentWeather) => {
  let printStrang = ``;
  printStrang += `<div class="weather-city">
                      <h1>${currentWeather.city.name}</h1>
                  </div>
                  <table class="table current-weather">`;
  let forecastArray = currentWeather.list;
  for (let i = 0; i < 3; i++) {
    printStrang += `<tr>
                      <td>
                        <img src="http://openweathermap.org/img/w/${forecastArray[i].weather[0].icon}.png" alt="">
                      </td>
                      <td>
                        <p>${tm(forecastArray[i].dt)}</p>
                      </td>
                      <td>
                        <p>High Temp: ${Math.round(forecastArray[i].temp.max)}</p>
                      </td>
                      <td>
                        <p>Low Temp: ${Math.round(forecastArray[i].temp.min)}</p>
                      </td>
                      <td>
                        <p>Conditions: ${forecastArray[i].weather[0].description}</p>
                      </td>
                      <td>
                        <p>Wind Speed: ${forecastArray[i].speed}</p>
                      </td>
                      <td>
                        <p>Air Pressure: ${forecastArray[i].pressure}</p>
                      </td>
                    </tr>`;
  }
    printStrang += `</table>`;
  printDom(printStrang);
};

const sevenDayWeather = (currentWeather) => {
  let printStrang = ``;
    printStrang += `<div class="weather-city">
                        <h1>${currentWeather.city.name}</h1>
                    </div>
                    <table class="table current-weather">`;
  let forecastArray = currentWeather.list;
  for (let i = 0; i < forecastArray.length; i++) {
    printStrang += `<tr>
                      <td>
                        <img src="http://openweathermap.org/img/w/${forecastArray[i].weather[0].icon}.png" alt="">
                      </td>
                      <td>
                        <p>${tm(forecastArray[i].dt)}</p>
                      </td>
                      <td>
                        <p>High Temp: ${Math.round(forecastArray[i].temp.max)}</p>
                      </td>
                      <td>
                        <p>Low Temp: ${Math.round(forecastArray[i].temp.min)}</p>
                      </td>
                      <td>
                        <p>Conditions: ${forecastArray[i].weather[0].description}</p>
                      </td>
                      <td>
                        <p>Wind Speed: ${forecastArray[i].speed}</p>
                      </td>
                      <td>
                        <p>Air Pressure: ${forecastArray[i].pressure}</p>
                      </td>
                    </tr>`;
  }
    printStrang += `</table>`;
  printDom(printStrang);
};

const printDom = (strang) => {
    $("#weatherOutput").html(strang);
};

module.exports = {domStrang, threeDayWeather, sevenDayWeather};