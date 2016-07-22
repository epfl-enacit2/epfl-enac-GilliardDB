'use strict';
module.exports = function () {
    var fs = require("fs");
    var path = require("path");
    var repository = {};
    fs.readdirSync(path.join(__dirname, "./"))
        .filter(function (file) {
            return (file.indexOf(".") !== 0) && (file !== "index.js");
        })
        .forEach(function (file) {
            var fileName = file.slice(0, -3);
            var fileFunction = require('./' + fileName);
            repository[fileFunction.name] = fileFunction ;
        });
    return repository;
}

