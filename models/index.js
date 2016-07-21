'use strict';
module.exports = function (properties) {
    var fs = require("fs");
    var path = require("path");
    var models={};
    fs.readdirSync(path.join(__dirname, "./"))
    .filter(function (file) {
        return (file.indexOf(".") !== 0) && (file !== "index.js");
    })
    .forEach(function (file) {
        var modelName = file.slice(0, -3);
        var model = require('./' + modelName)(properties.store, properties.sequelize, properties.SeqInit);
        models[model.name] = model;
    });
    return models;
}
