module.exports = function (dbConfigs) {
    var fs = require("fs");
    var path = require("path");
    var SeqInit = require('sequelize');
    var store = {};

    var sequelize = new SeqInit(dbConfigs.name, dbConfigs.username, dbConfigs.password, {
        host: dbConfigs.hostname,
        dialect: 'mysql',
        logging: false,
        define: {
            timestamps: false,
            freezeTableName: true
        }
    });

    fs.readdirSync(path.join(__dirname, "./models"))
        .filter(function (file) {
            return (file.indexOf(".") !== 0);
        })
        .forEach(function (file) {
            var modelName = file.slice(0, -3);
            var model = require('./models/' + modelName)(store, sequelize, SeqInit);
            store[model.name] = model;
        });

    return store;
};