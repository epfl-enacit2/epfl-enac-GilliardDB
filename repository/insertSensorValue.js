'use strict';
function insertSensorValue(models,configs){
    models.AcquisitionSys
        .findOrCreate(
        {
            where: {
                $and: [
                    { IdAcquisitionSys: configs.acquisitionSys.id },
                    { Sciper: configs.acquisitionSys.sciper }
                ]
            }, defaults: {
                IdAcquisitionSys: configs.acquisitionSys.id,
                Sciper: configs.acquisitionSys.sciper,
                Computername: 'enacitpc30',
                Responsible: configs.acquisitionSys.responsible,
                AppVersion: configs.acquisitionSys.AppVersion
            }
        });
    configs.acquisitionSys.boards.map(function (board) {
        models.Boards
            .findOrCreate(
            {
                where: {
                    $and: [
                        { BID: board.BID },
                        { AcquisitionSys_IdAcquisitionSys: configs.acquisitionSys.id },
                        { AcquisitionSys_Sciper: configs.acquisitionSys.sciper }
                    ]
                }, defaults: {
                    BID: board.BID,
                    AcquisitionSys_IdAcquisitionSys: configs.acquisitionSys.id,
                    AcquisitionSys_Sciper: configs.acquisitionSys.sciper,
                    Name: board.name,
                    Rate: board.rate,
                    ConnexionPort: board.port
                }
            });

        board.sensors.map(function (sensor) {
            models.Sensors
                .findOrCreate(
                {
                    where: {
                        $and: [
                            { SID: sensor.SID },
                            { Boards_BID: board.BID },
                            { Boards_AcquisitionSys_Sciper: configs.acquisitionSys.sciper },
                            { Boards_AcquisitionSys_IdAcquisitionSys: configs.acquisitionSys.id }
                        ]
                    }, defaults: {
                        SID: sensor.SID,
                        Boards_BID: board.BID,
                        Boards_AcquisitionSys_IdAcquisitionSys: configs.acquisitionSys.id,
                        Boards_AcquisitionSys_Sciper: configs.acquisitionSys.sciper,
                        Type: sensor.Type,
                        SensorModel: sensor.Model,
                        Unit: sensor.Unit,
                        BoardPins: sensor.BoardPins
                    }
                });
            models.SensorValues
                .findOrCreate(
                {
                    where: {
                        $and: [
                            { CreatedAt: Date() },
                            { Sensors_SID: sensor.SID },
                            { Sensors_Boards_BID: board.BID },
                            { Sensors_Boards_AcquisitionSys_Sciper: configs.acquisitionSys.sciper },
                            { Sensors_Boards_AcquisitionSys_IdAcquisitionSys: configs.acquisitionSys.id }
                        ]
                    }, defaults: {
                        Sensors_Boards_BID: board.BID,
                        Sensors_Boards_AcquisitionSys_IdAcquisitionSys: configs.acquisitionSys.id,
                        Sensors_Boards_AcquisitionSys_Sciper: configs.acquisitionSys.sciper,
                        Sensors_SID: sensor.SID,
                        Value: sensor.Value
                    }
                });
        });
    });
}
exports.insertSensorValue = insertSensorValue(models,configs);