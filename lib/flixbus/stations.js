/*global require, module*/

const _ = require('lodash');
const cities = require('./cities.js');

/**
 *
 * @returns {*}
 */
function all() {
  return _.pick(cities.all(), 'stations');
}

/**
 *
 * @param id
 * @returns {*}
 */
function get(id) {
  return _.findWhere(all(), {
    "id": id
  });
}

/**
 *
 * @param slug
 * @returns {*}
 */
function getBySlug(slug) {
  return _.findWhere(all(), {
    "slugs": slug
  });
}

module.exports.all = all;
module.exports.get = get;
module.exports.getBySlug = getBySlug;