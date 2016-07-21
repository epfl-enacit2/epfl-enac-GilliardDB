'use strict';
module.exports = function (store, sequelize, SeqInit) {
    return sequelize.define('SensorValues', {
        CreatedAt: {
            type: SeqInit.DATE,
            defaultValue: SeqInit.NOW,
            allowNull: false,
            primaryKey: true
        },
        Sensors_SID: {
            type: SeqInit.STRING(45),
            allowNull: false,
            primaryKey: true,
            references: {
                model: store.Sensors,
                key: 'SID'
            }
        },
        Sensors_Boards_BID: {
            type: SeqInit.STRING(45),
            allowNull: false,
            primaryKey: true,
            references: {
                model: store.Sensors,
                key: 'Boards_BID'
            }
        },
        Sensors_Boards_AcquisitionSys_IdAcquisitionSys: {
            type: SeqInit.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: store.Sensors,
                key: 'Boards_AcquisitionSys_IdAcquisitionSys'
            }
        },
        Sensors_Boards_AcquisitionSys_Sciper: {
            type: SeqInit.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: store.Sensors,
                key: 'Boards_AcquisitionSys_Sciper'
            }
        },

        Value: {
            type: SeqInit.FLOAT,
            defaultValue: SeqInit.NULL
        }
    }
    );
}