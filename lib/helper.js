/*global module, require*/

const fs = require('fs');

module.exports.saveFile = function (path, content) {
  fs.writeFile(path, content, function (err) {
    if (err) {
      return console.log(err);
    }

    console.log(path + " was saved!");
  });
};

module.exports.loadFile = function (path, cb) {
  fs.readFile(path, 'utf8', function (err, data) {
    if (err) {
      return console.error(err);
    }
    cb(data);
  });
};