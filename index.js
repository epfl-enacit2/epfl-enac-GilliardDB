module.exports = function (dbConfigs) {
    var fs = require("fs"),
        path = require("path");
    var SeqInit = require('sequelize');
    var sequelize = new SeqInit(dbConfigs.name, dbConfigs.username, dbConfigs.password, {
        host: dbConfigs.hostname,
        dialect: 'mysql',
        define: {
            timestamps: false,
            freezeTableName: true
        }
    });//TODO: Passer config avec "_logging":null
    var AcquisitionSys = sequelize.import('./models/AcquisitionSys');
    var Boards = sequelize.import('./models/Boards');
    var Sensors = sequelize.import('./models/Sensors');
    var SensorValues = sequelize.import('./models/SensorValues');
    // var p = path.join(__dirname, "./models");
    // fs.readdir(p, function (err, files) {
    //     if (err) {
    //         throw err;
    //     }

    //     files.map(function (file) {
    //          
    //     });
    // });
    return {
        AcquisitionSys: AcquisitionSys,
        Boards: Boards,
        Sensors:Sensors,
        SensorValues:SensorValues
    }
};