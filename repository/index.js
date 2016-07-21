module.exports = function (properties) {
    var fs = require("fs");
    var path = require("path");
    var repository = {};
    fs.readdirSync(path.join(__dirname, "./"))
        .filter(function (file) {
            return (file.indexOf(".") !== 0) && (file !== "index.js");
        })
        .forEach(function (file) {
            var modelName = file.slice(0, -3);
            var model = require('./' + modelName);
            repository[modelName] = model.modelName;
        });
    return repository;
}

