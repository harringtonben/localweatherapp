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