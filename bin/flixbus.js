#!/usr/bin/env node
/*global require, module*/

const _ = require('lodash');
const inquirer = require('inquirer');
const connectivity = require('connectivity');

const app = require('../');
const rides = require('../lib/flixbus/rides.js');

var getToday = function () {
  var date = new Date();

  var day = date.getDate();
  day = day < 10 ? '0' + day : '' + day;

  var month = date.getMonth() + 1;
  month = month < 10 ? '0' + month : '' + month;

  var year = date.getFullYear();

  return [day, month, year].join('.');
};
var questions = [
  {
    type: "input",
    name: "departureCity",
    message: "Von",
    default: "karlsruhe"
  },
  {
    type: "input",
    name: "arrivalCity",
    message: "Nach",
    default: "tuebingen"
  },
  {
    type: "input",
    name: "rideDate",
    message: "Wann",
    "default": getToday
  },
  //{
  //  type: "input",
  //  name: "backRideDate",
  //  message: "Wann zurück",
  //  "default": getToday
  //}
];

connectivity(function(online) {
  if (online) {
    inquirer.prompt(questions, function (answers) {
      app.run(answers, function (err, response, body) {
        console.log(rides.toTable(body));
      });
    });
  } else {
    console.warn("You're offline. This is only available in premium mode");
  }
});
