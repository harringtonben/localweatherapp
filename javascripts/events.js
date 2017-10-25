"use strict";

const weather = require("./weatherapp");
const firebaseApi = require("./firebaseApi");
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
        console.log("I'm hitting the google button");
        firebaseApi.authenticateGoogle().then((result) => {
            console.log("result", result);
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
            "windspeed": $(parent).find(".airpressure").html().split(": ").pop()
        };

        firebaseApi.saveForecast(savedForecast).then((results) => {
            console.log(results);
        }).catch((error) => {
            console.log(error);
        });
        console.log(savedForecast);
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
};

module.exports = {init};