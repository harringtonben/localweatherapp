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
},{}],3:[function(require,module,exports){
"use strict";

const weather = require("./weatherapp");

$("#weatherzip").keyup(() => {
    if ($("#weatherzip").val().length === 5) {
        $("#weathersubmit").removeClass("disabled");
    }
});

$("#weathersubmit").click(() => {
    let query = $("#weatherzip").val();
    weather.searchWeather(query);
    $("#weatherzip").val("");
    $("#weathersubmit").addClass("disabled");
    $("#changeweather").removeClass("hidden");
});

$("#weatherzip").keypress((e) => {
    if ($("#weatherzip").val().length === 5 && e.key === "Enter") {
        let query = $("#weatherzip").val();
        weather.searchWeather(query);
        $("#weatherzip").val("");
        $("#changeweather").removeClass("hidden");
    }
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
        $.ajax(`http://api.openweathermap.org/data/2.5/forecast?zip=${query}&appid=${weatherKey}&units=imperial`).done((data) => {
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
        console.log(results);
    }).catch((error) => {
        console.log("There was an error", error);
    });
};

const setApiKey = (apiKey) => {
    weatherKey = apiKey;
};

module.exports = {searchWeather, searchForecast, setApiKey};
},{"./dom":2}]},{},[4]);
