/*global module, require*/

const path = require('path');
const glob = require('glob');

var files = glob.sync('./lib/flixbus/*.js');
files.forEach(function (filePath) {
  var taskId = path.basename(filePath, '.js');
  module.exports[taskId] = require('./' + path.basename(filePath));
});