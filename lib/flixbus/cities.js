/*global require, module*/

const _ = require('lodash');
const locations = require('../../data/locations.json');

/**
 *
 * @returns {Array|*}
 */
function all() {
  return locations.map(function (cityData) {
    return {
      aliases: cityData.aliases,
      category: cityData.name.substr(0, 1),
      coordinates: cityData.coordinates,
      cityId: cityData.id,
      destinations: cityData.destinations,
      name: cityData.name,
      slug: cityData.slugs,
      stationId: null,
      stations: _.map(cityData.stations, function (stationData) {
        return {
          aliases: stationData.aliases,
          category: stationData.name.substr(0, 1),
          coordinates: stationData.coordinates,
          cityId: cityData.id,
          destinations: stationData.destinations,
          name: stationData.name,
          slug: stationData.slug,
          stationId: stationData.id
        };
      })
    }
  });
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
    "slug": slug
  });
}


module.exports.all = all;
module.exports.get = get;
module.exports.getBySlug = getBySlug;