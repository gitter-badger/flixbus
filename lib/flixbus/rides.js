/*global module, require*/

const cheerio = require('cheerio');
const Table = require('cli-table');

function parser($) {
  return $('.sr-row.unbooked').map(function () {
    return {
      departure: $(this).find('.dept-arr .departure').text(),
      arrival: $(this).find('.dept-arr .arrival').text(),
      duration: {
        hours: $(this).find('.duration span:first-child').text(),
        minutes: $(this).find('.duration span:last-child').html()
      },
      numberOfTransfers: $(this).find('.transf-num').text(),
      price: $(this).find('.price-actions .num').text()
    };
  });
}

function toTable(body) {
  var $ = cheerio.load(body);
  var items = parser($);

  var table = new Table({
    head: ['Abfahrt', 'Ankunft', 'Reisedauer', 'Preis']
  });
  items.map(function (index, element) {
    table.push([
      element.departure,
      element.arrival,
      element.duration.hours + ":" + element.duration.minutes,
      element.price
    ]);
  });

  return table.toString();
}

module.exports.parser = parser;
module.exports.toTable = toTable;