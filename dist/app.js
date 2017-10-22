(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

const weather = require("./weatherapp");


const apiKeys = () => {
    return new Promise((resolve, reject) => {
        $.ajax("./db/apikeys.json").done((data) => {
            resolve(data);
        }).fail((error) => {
            reject(error);
        });
    });
};

const retrieveKeys = () => {
    apiKeys().then((results) => {
        weather.setApiKey(results.apiKeys.weatherapp.apiKey);
    }).catch((error) => {
        console.log("error in retrieve keys", error);
    });
};

module.exports = {retrieveKeys};
},{"./weatherapp":5}],2:[function(require,module,exports){
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
},{}],3:[function(require,module,exports){
"use strict";

const weather = require("./weatherapp");
let query;

$("#weatherzip").keyup(() => {
    if ($("#weatherzip").val().length === 5) {
        $("#weathersubmit").removeClass("disabled");
    }
});

$("#weathersubmit").click(() => {
    query = $("#weatherzip").val();
    weather.searchWeather(query);
    $("#weatherzip").val("");
    $("#weathersubmit").addClass("disabled");
    $("#changeweather").removeClass("hidden");
});

$("#weatherzip").keypress((e) => {
    if ($("#weatherzip").val().length === 5 && e.key === "Enter") {
        query = $("#weatherzip").val();
        weather.searchWeather(query);
        $("#changeweather").removeClass("hidden");
        $("#changeweather").removeClass("hidden");
    }
});

$("#3dayweather").click(() => {
    weather.searchForecast(query);
});

$("#7dayweather").click(() => {
    weather.searchForecast7Day(query);
});

$("#currentweather").click(() => {
    weather.searchWeather(query);
});

module.exports = {};
},{"./weatherapp":5}],4:[function(require,module,exports){
"use strict";

const apikeys = require("./apikeys");
const weather = require("./weatherapp");
require("./events");

apikeys.retrieveKeys();


console.log("I'm in main JS dawg");
},{"./apikeys":1,"./events":3,"./weatherapp":5}],5:[function(require,module,exports){
"use strict";

const dom = require("./dom");

let weatherKey;

const weatherAPISearch = (query) => {
    return new Promise((resolve, reject) => {
        $.ajax(`http://api.openweathermap.org/data/2.5/weather?zip=${query}&appid=${weatherKey}&units=imperial`).done((data) => {
            resolve(data);
        }).fail((error) => {
            reject(error);
        });
    });
};

const forecastAPISearch = (query) => {
    return new Promise((resolve, reject) => {
        $.ajax(`http://api.openweathermap.org/data/2.5/forecast/daily?zip=${query}&appid=${weatherKey}&units=imperial`).done((data) => {
            resolve(data);
        }).fail((error) => {
            reject(error);
        });
    });
};

const searchWeather = (query) => {
    weatherAPISearch(query).then((results) => {
        dom.domStrang(results);
    }).catch((error) => {
        console.log("There was an error", error);
    }); 
};

const searchForecast = (query) => {
    forecastAPISearch(query).then((results) => {
        dom.threeDayWeather(results);
    }).catch((error) => {
        console.log("There was an error", error);
    });
};

const searchForecast7Day = (query) => {
    forecastAPISearch(query).then((results) => {
        dom.sevenDayWeather(results);
    }).catch((error) => {
        console.log("There was an error", error);
    });
};

const setApiKey = (apiKey) => {
    weatherKey = apiKey;
};

module.exports = {searchWeather, searchForecast,searchForecast7Day, setApiKey};
},{"./dom":2}]},{},[4]);
