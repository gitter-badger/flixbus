#!/usr/bin/env node
/*global require, module*/

const _ = require('lodash');
const cheerio = require('cheerio');
const inquirer = require('inquirer');

const app = require('../');
const helper = require('../lib/helper.js');
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

inquirer.prompt(questions, function (answers) {
  app.run(answers, function (err, response, body) {
    console.log(rides.toTable(body));
  });
});