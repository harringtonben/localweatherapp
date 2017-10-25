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

  module.exports = {setKey, authenticateGoogle, saveForecast};