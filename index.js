module.exports = function (dbConfigs) {
    // var fs = require("fs"),
    //     path = require("path");
    // var SeqInit = require('sequelize');
    // var sequelize = new SeqInit(dbConfigs.name, dbConfigs.username, dbConfigs.password, {
    //     host: dbConfigs.hostname,
    //     dialect: 'mysql',
    //     define: {
    //         timestamps: false,
    //         freezeTableName: true
    //     }
    // });//TODO: Passer config avec "_logging":null
    // var AcquisitionSys = sequelize.import('./models/AcquisitionSys');
    // var Boards = sequelize.import('./models/Boards');
    // var Sensors = sequelize.import('./models/Sensors');
    // var SensorValues = sequelize.import('./models/SensorValues');
    // // var p = path.join(__dirname, "./models");
    // // fs.readdir(p, function (err, files) {
    // //     if (err) {
    // //         throw err;
    // //     }

    // //     files.map(function (file) {
    // //          
    // //     });
    // // });
    // return {
    //     AcquisitionSys: AcquisitionSys,
    //     Boards: Boards,
    //     Sensors:Sensors,
    //     SensorValues:SensorValues
    // } 

    var fs = require("fs");
    var path = require("path");
    var SeqInit = require('sequelize');
    var store = {};
    
    var sequelize = new SeqInit(dbConfigs.name, dbConfigs.username, dbConfigs.password, {
        host: dbConfigs.hostname,
        dialect: 'mysql',
        define: {
            timestamps: false,
            freezeTableName: true
        }
    });//TODO: Passer config avec "_logging":null

    fs.readdirSync(path.join(__dirname, "./models"))
    .filter(function(file) {
        return (file.indexOf(".") !== 0);
    })
    .forEach(function(file) {
        var modelName = file.slice(0, -3);
        var model = require('./models/'+modelName)(store, sequelize, SeqInit);
        store[model.name] = model;
    });

    return store;
};