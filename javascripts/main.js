"use strict";

const apikeys = require("./apikeys");
const weather = require("./weatherapp");
const events = require("./events");

apikeys.retrieveKeys();
events.init();


