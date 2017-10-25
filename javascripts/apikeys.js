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