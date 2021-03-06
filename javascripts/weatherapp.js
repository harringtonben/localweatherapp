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