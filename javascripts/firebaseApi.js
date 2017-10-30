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