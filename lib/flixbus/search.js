/*global require, module*/

const request = require('request');
const cheerio = require('cheerio');
const merge = require('merge');

module.exports = function (params, cb) {
  request({
    url: "http://www.flixbus.de"
  }, function (err, response, body) {
    var $ = cheerio.load(body);

    request({
      url: "https://shop.flixbus.de/search",
      qs: merge({
        form_build_id: $('#fb-search-form-main input[name="form_build_id"]').val(),
        form_id: $('#fb-search-form-main input[name="form_id"]').val(),
        _locale: "de"
      }, params)
    }, cb);
  });

};