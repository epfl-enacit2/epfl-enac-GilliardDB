'use strict';
var configs = require('./configs')(require('path').join(__dirname, 'configs/configs.json'));
var store = require('../')(configs.db);

configs.acquisitionSys.boards.map(function (board) {
    var acquData = {
        boardID: board.BID,
            sensorID: "TC0", 
            acquisitionSysId: "1",
            sensorVal: "5"
    };
    var i=0;
    for (i=0;i<1 ;i++){
    store.repository.insertSensorValue({
        models: store.models,
        configs: configs,
        currentBoard: board,
        acquisitionData: acquData
    });
    }
});