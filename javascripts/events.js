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