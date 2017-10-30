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