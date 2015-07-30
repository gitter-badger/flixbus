/*global require, module*/

const cities = require('./lib/flixbus/cities');
const search = require('./lib/flixbus/search');

var app = module.exports;
app.run = function (params, cb) {
  search({
    adults: 1,
    children: 0,
    bikes: 0,
    departureStation: "",
    arrivalStation: "",
    departureCity: cities.getBySlug(params.departureCity).cityId,
    arrivalCity: cities.getBySlug(params.arrivalCity).cityId,
    rideDate: params.rideDate,
    backRideDate: params.backRideDate,
    oneWay: ""
  }, cb)
};