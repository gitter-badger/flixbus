/*global require, module*/

const _ = require('lodash');
const cheerio = require('cheerio');
const inquirer = require('inquirer');

const helper = require('./lib/helper.js');
const flixbus = require('./lib/flixbus');


var getToday = function() {
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
  {
    type: "input",
    name: "backRideDate",
    message: "Wann zurück",
    "default": getToday
  }
];

inquirer.prompt(questions, function (answers) {
  flixbus.search({
    adults: 1,
    children: 0,
    bikes: 0,
    departureStation: "",
    arrivalStation: "",
    departureCity: flixbus.cities.getBySlug(answers.departureCity).cityId,
    arrivalCity: flixbus.cities.getBySlug(answers.arrivalCity).cityId,
    rideDate: answers.rideDate,
    backRideDate: answers.backRideDate,
    oneWay: "",
  }, function (err, response, body) {
    console.log(flixbus.rides.toTable(body));
  });
});

