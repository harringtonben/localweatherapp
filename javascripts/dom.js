"use strict";

const domStrang = (currentWeather) => {
    let printStrang = ``;
    printStrang += `<div class="current-weather>"
                    <div class="row">
                    <div class="col-sm-6 col-md-4 col-md-offset-4">
                    <div class="weather-city">
                        <h1>${currentWeather.name}</h1>
                    </div>
                      <div class="thumbnail">
                        <img src="http://openweathermap.org/img/w/${currentWeather.weather[0].icon}.png" alt="">
                        <div class="caption">
                          <h3>Current Temp: ${Math.round(currentWeather.main.temp)}</h3>
                          <p>Conditions: ${currentWeather.weather[0].description}</p>
                          <p>Wind Speed: ${currentWeather.wind.speed}</p>
                          <p>Wind Speed: ${currentWeather.main.pressure}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  </div>`;
    printDom(printStrang);
};

const printDom = (strang) => {
    $("#weatherOutput").html(strang);
};

module.exports = {domStrang};