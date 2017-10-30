(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

const weather = require("./weatherapp");
const firebaseApi = require("./firebaseApi");

const apiKeys = () => {
    return new Promise((resolve, reject) => {
        $.ajax("./db/apikeys.json").done((data) => {
            resolve(data.apiKeys);
        }).fail((error) => {
            reject(error);
        });
    });
};

const retrieveKeys = () => {
    apiKeys().then((results) => {
        weather.setApiKey(results.weatherapp.apiKey);
        firebaseApi.setKey(results.firebaseKeys);
        firebase.initializeApp(results.firebaseKeys);
    }).catch((error) => {
        console.log("error in retrieve keys", error);
    });
};

module.exports = {retrieveKeys};
},{"./firebaseApi":4,"./weatherapp":6}],2:[function(require,module,exports){
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
},{}],3:[function(require,module,exports){
"use strict";

const weather = require("./weatherapp");
const firebaseApi = require("./firebaseApi");
const dom = require("./dom");
let query;

const zipValidator = () => {
    $("#weatherzip").keyup(() => {
        if ($("#weatherzip").val().length === 5) {
            $("#weathersubmit").removeClass("disabled");
        }
    });
};

const weatherClick = () => {
    $("#weathersubmit").click(() => {
        query = $("#weatherzip").val();
        weather.searchWeather(query);
        $("#weatherzip").val("");
        $("#weathersubmit").addClass("disabled");
        $("#changeweather").removeClass("hidden");
    });
};

const weatherEnter = () => {
    $("#weatherzip").keypress((e) => {
        if ($("#weatherzip").val().length === 5 && e.key === "Enter") {
            query = $("#weatherzip").val();
            weather.searchWeather(query);
            $("#changeweather").removeClass("hidden");
            $("#changeweather").removeClass("hidden");
        }
    });
};

const forecast3Day = () => {
    $("#3dayweather").click(() => {
        weather.searchForecast(query);
    });
};

const forecast7Day = () => {
    $("#7dayweather").click(() => {
        weather.searchForecast7Day(query);
    });
};

const weatherCurrent = () => {
    $("#currentweather").click(() => {
        weather.searchWeather(query);
    });
};


const googleAuth = () => {
    $("#googleauth").click((e) => {
        firebaseApi.authenticateGoogle().then((result) => {
            $("#navbar").removeClass("hide");
            $("#signin").addClass("hide");
        }).catch((error) => {
            console.log("error in authenticate google", error);
        });
    });
};

const saveForecast = () => {
    $("body").on("click", ".save", (e) => {
        let parent = e.target.closest(".forecast");

        let savedForecast = {
            "image_path": $(parent).find(".weatherpic").attr("src"),
            "high_temp": $(parent).find(".high-temp").html().split(": ").pop(),
            "low_temp": $(parent).find(".low-temp").html().split(": ").pop(),
            "conditions": $(parent).find(".conditions").html().split(": ").pop(),
            "airpressure": $(parent).find(".airpressure").html().split(": ").pop(),
            "windspeed": $(parent).find(".windspeed").html().split(": ").pop(),
            "city_name": $("#city").html(),
            "timestamp": $(parent).find(".timestamp").html()
        };

        firebaseApi.saveForecast(savedForecast).then((results) => {
            
        }).catch((error) => {
            console.log(error);
        });
    });
};

const getSavedForecasts = () => {
    $("#saved-forecasts").click(() => {
       myForecasts(); 
    });
};

const myForecasts = () => {
    firebaseApi.getMyForecasts().then((results) => {
        // console.log(results);
        dom.savedForecasts(results);
    }).catch((error) => {
        console.log(error);
    });
};

const deleteForecast = () => {
    $("body").on("click", ".delete", (e) => {
        let forecastId = $(e.target).data("firebase-id");
        firebaseApi.deleteSavedForecast(forecastId).then((results) => {
        myForecasts();
        }).catch((error) => {
            console.log("error in deleteForecast", error);
        });
    });
};


const init = () => {
    zipValidator();
    weatherClick();
    weatherEnter();
    forecast3Day();
    forecast7Day();
    weatherCurrent();
    googleAuth();
    saveForecast();
    getSavedForecasts();
    deleteForecast();
};

module.exports = {init};
},{"./dom":2,"./firebaseApi":4,"./weatherapp":6}],4:[function(require,module,exports){
"use strict";

let firebaseKey = "";
let userUid = "";

const setKey = (key) => {
    firebaseKey = key;
};

let authenticateGoogle = () => {
    return new Promise((resolve, reject) => {
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider)
        .then((authData) => {
            userUid = authData.user.uid;
            resolve(authData.user);
        }).catch((error) => {
            reject(error);
        });
    });
  };

const saveForecast = (forecast) => {
        forecast.uid = userUid;
    return new Promise((resolve, reject) => {
        $.ajax({
            method: "POST",
            url: `${firebaseKey.databaseURL}/forecasts.json`,
            data: JSON.stringify(forecast)
        }).then((result) => {
            resolve(result);
        }).catch((error) => {
            reject(error);
        });
    });
};

const getMyForecasts = () => {
    let myForecasts = [];
    return new Promise((resolve, reject) => {
        $.ajax(`${firebaseKey.databaseURL}/forecasts.json`).then((forecasts) => {
            if (forecasts != null) {
                Object.keys(forecasts).forEach((key) => {
                    forecasts[key].id = key;
                    myForecasts.push(forecasts[key]);
                });
            }
            resolve(myForecasts);
        }).catch((error) => {
            reject(error);
        });
    });
};

const deleteSavedForecast = (forecastId) => {
    return new Promise((resolve, reject) => {
        $.ajax({
            method: "DELETE",
            url: `${firebaseKey.databaseURL}/forecasts/${forecastId}.json`
        }).then((data) => {
            resolve(data);
        }).catch((error) => {
            reject(error);
        });
    });
};


  module.exports = {setKey, authenticateGoogle, saveForecast, getMyForecasts, deleteSavedForecast};
},{}],5:[function(require,module,exports){
"use strict";

const apikeys = require("./apikeys");
const weather = require("./weatherapp");
const events = require("./events");

apikeys.retrieveKeys();
events.init();



},{"./apikeys":1,"./events":3,"./weatherapp":6}],6:[function(require,module,exports){
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
},{"./dom":2}]},{},[5]);
