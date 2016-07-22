'use strict';
module.exports = function insertSensorValues(properties){
    properties.models.AcquisitionSys
        .findOrCreate(
        {
            where: {
                $and: [
                    { IdAcquisitionSys: properties.configs.acquisitionSys.id },
                    { Sciper: properties.configs.acquisitionSys.sciper }
                ]
            }, defaults: {
                IdAcquisitionSys: properties.configs.acquisitionSys.id,
                Sciper: properties.configs.acquisitionSys.sciper,
                Computername: 'enacitpc30',
                Responsible: properties.configs.acquisitionSys.responsible,
                AppVersion: properties.configs.acquisitionSys.AppVersion
            }
        });
    properties.configs.acquisitionSys.boards.map(function (board) {
        properties.models.Boards
            .findOrCreate(
            {
                where: {
                    $and: [
                        { BID: board.BID },
                        { AcquisitionSys_IdAcquisitionSys: properties.configs.acquisitionSys.id },
                        { AcquisitionSys_Sciper: properties.configs.acquisitionSys.sciper }
                    ]
                }, defaults: {
                    BID: board.BID,
                    AcquisitionSys_IdAcquisitionSys: properties.configs.acquisitionSys.id,
                    AcquisitionSys_Sciper: properties.configs.acquisitionSys.sciper,
                    Name: board.name,
                    Rate: board.rate,
                    ConnexionPort: board.port
                }
            });

        board.sensors.map(function (sensor) {
            properties.models.Sensors
                .findOrCreate(
                {
                    where: {
                        $and: [
                            { SID: sensor.SID },
                            { Boards_BID: board.BID },
                            { Boards_AcquisitionSys_Sciper: properties.configs.acquisitionSys.sciper },
                            { Boards_AcquisitionSys_IdAcquisitionSys: properties.configs.acquisitionSys.id }
                        ]
                    }, defaults: {
                        SID: sensor.SID,
                        Boards_BID: board.BID,
                        Boards_AcquisitionSys_IdAcquisitionSys: properties.configs.acquisitionSys.id,
                        Boards_AcquisitionSys_Sciper: properties.configs.acquisitionSys.sciper,
                        Type: sensor.Type,
                        SensorModel: sensor.Model,
                        Unit: sensor.Unit,
                        BoardPins: sensor.BoardPins
                    }
                });
            properties.models.SensorValues
                .findOrCreate(
                {
                    where: {
                        $and: [
                            { CreatedAt: Date() },
                            { Sensors_SID: sensor.SID },
                            { Sensors_Boards_BID: board.BID },
                            { Sensors_Boards_AcquisitionSys_Sciper: properties.configs.acquisitionSys.sciper },
                            { Sensors_Boards_AcquisitionSys_IdAcquisitionSys: properties.configs.acquisitionSys.id }
                        ]
                    }, defaults: {
                        Sensors_Boards_BID: board.BID,
                        Sensors_Boards_AcquisitionSys_IdAcquisitionSys: properties.configs.acquisitionSys.id,
                        Sensors_Boards_AcquisitionSys_Sciper: properties.configs.acquisitionSys.sciper,
                        Sensors_SID: sensor.SID,
                        Value: sensor.Value
                    }
                });
        });
    });
}