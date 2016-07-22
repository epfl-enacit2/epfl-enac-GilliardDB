'use strict';
var configs = require('./configs')(require('path').join(__dirname, 'configs/configs.json'));
var store = require('../')(configs.db);

configs.acquisitionSys.boards.map(function (board) {
    store.repository.insertSensorValue({
        models: store.models,
        configs: configs,
        currentBoard: board,
        acquisitionData: {
            boardID: board.BID,
            sensorID: "TC1", 
            acquisitionSysId: "1",
            sensorVal: "5"
        }
    })
});