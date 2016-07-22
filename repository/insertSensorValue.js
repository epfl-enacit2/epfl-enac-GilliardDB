'use strict';
/**
 * Insert a value in SensorValue and create associations if it doesn't exist
 * @param {object} properties - properties should contains : 
 * {
 *      models: {
 *          [modelName1]: [sequelizeModel1]
 *      },
 *      configs:{
 *              "db": {
 *                  "hostname": "localhost",
 *                  "username": "user",
 *                  "password": "pass",
 *                  "name": "dbName"
 *              },
 *              "logging": "console", 
 *              "acquisitionSys": {
 *                  "responsible": "mbonjour <mickael.bonjour@epfl.ch>",
 *                  "sciper": "240312",
 *                  "AppVersion":"1.0",
 *                  "boards": [
 *                      {
 *                          "port": "COM3",
 *                          "rate": 9600,
 *                          "name": "FirstModule", 
 *                          "model": "Arduino UNO", 
 *                          "sensors": [ 
 *                              {
 *                                  "SID": "TC0", 
 *                                  "Type": "Temperature", 
 *                                  "Model": "", 
 *                                  "Unit": "° Celsius", 
 *                                  "BoardPins": "12:13",
 *                              }
 *                          ]
 *                      },
 *                      {
 *                          "port": "COM4",
 *                          "rate": 4800,
 *                          "name": "SecondModule", 
 *                          "model": "Arduino DUE", 
 *                          "sensors": [ 
 *                              {
 *                                  "SID": "TC0", 
 *                                  "Type": "Temperature", 
 *                                  "Model": "", 
 *                                  "Unit": "° Celsius", 
 *                                  "BoardPins": "12:13",
 *                              }
 *                          ]
 *                      }
 *                  ]
 *              },
 * 
 *          },
 *      acquisitionData:{
 *          acquisitionSysId:"",
 *          boardID:"",
 *          sensorID:"",
 *          sensorVal:""
 *      },
 *      currentBoard:{
 *      }
 *      
 * }
 */
module.exports = function insertSensorValue(properties) {
    properties.models.AcquisitionSys
        .findOrCreate(
        {
            where: {
                $and: [
                    { IdAcquisitionSys: properties.acquisitionData.acquisitionSysId },
                    { Sciper: properties.configs.acquisitionSys.sciper }
                ]
            }, defaults: {
                IdAcquisitionSys: properties.acquisitionData.acquisitionSysId,
                Sciper: properties.configs.acquisitionSys.sciper,
                Computername: 'enacitpc30',
                Responsible: properties.configs.acquisitionSys.responsible,
                AppVersion: properties.configs.acquisitionSys.AppVersion
            }
        })
        .then(function () {
            properties.models.Boards
                .findOrCreate(
                {
                    where: {
                        $and: [
                            { BID: properties.acquisitionData.boardID },
                            { AcquisitionSys_IdAcquisitionSys: properties.acquisitionData.acquisitionSysId },
                            { AcquisitionSys_Sciper: properties.configs.acquisitionSys.sciper }
                        ]
                    }, defaults: {
                        BID: properties.acquisitionData.boardID,
                        AcquisitionSys_IdAcquisitionSys: properties.acquisitionData.acquisitionSysId,
                        AcquisitionSys_Sciper: properties.configs.acquisitionSys.sciper,
                        Name: properties.currentBoard.name,
                        Rate: properties.currentBoard.rate,
                        ConnexionPort: properties.currentBoard.port
                    }
                }).then(function () {

                    var sensorDefaults;

                    //properties.currentBoard.hasOwnProperty('sensors')
                    if (false) { //Si il existe un sensors[i].SID == properties.acquisitionData.sensorID
                        sensorDefaults = {
                            SID: properties.acquisitionData.sensorID,
                            Boards_BID: properties.acquisitionData.boardID,
                            Boards_AcquisitionSys_IdAcquisitionSys: properties.acquisitionData.acquisitionSysId,
                            Boards_AcquisitionSys_Sciper: properties.configs.acquisitionSys.sciper,
                            Type: sensor.Type,
                            SensorModel: sensor.Model,
                            Unit: sensor.Unit,
                            BoardPins: sensor.BoardPins
                        };
                    }
                    else {
                        sensorDefaults = {
                            SID: properties.acquisitionData.sensorID,
                            Boards_BID: properties.acquisitionData.boardID,
                            Boards_AcquisitionSys_IdAcquisitionSys: properties.acquisitionData.acquisitionSysId,
                            Boards_AcquisitionSys_Sciper: properties.configs.acquisitionSys.sciper,
                        }
                    }

                    properties.models.Sensors
                        .findOrCreate(
                        {
                            where: {
                                $and: [
                                    { SID: properties.acquisitionData.sensorID },
                                    { Boards_BID: properties.acquisitionData.boardID },
                                    { Boards_AcquisitionSys_Sciper: properties.configs.acquisitionSys.sciper },
                                    { Boards_AcquisitionSys_IdAcquisitionSys: properties.acquisitionData.acquisitionSysId }
                                ]
                            }, defaults: sensorDefaults
                        })
                        .then(function () {
                            properties.models.SensorValues
                                .create(
                                {
                                    Sensors_Boards_BID: properties.acquisitionData.boardID,
                                    Sensors_Boards_AcquisitionSys_IdAcquisitionSys: properties.acquisitionData.acquisitionSysId,
                                    Sensors_Boards_AcquisitionSys_Sciper: properties.configs.acquisitionSys.sciper,
                                    Sensors_SID: properties.acquisitionData.sensorID,
                                    Value: properties.acquisitionData.sensorVal
                                });
                        });
                });
        });
}