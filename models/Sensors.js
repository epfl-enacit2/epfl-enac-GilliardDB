module.exports = function (store, sequelize, SeqInit) {
    return sequelize.define('Sensors', {
        SID: {
            type: SeqInit.STRING(45),
            allowNull: false,
            primaryKey: true
        },
        Boards_BID: {
            type: SeqInit.STRING(45),
            allowNull: false,
            primaryKey: true,
            references: {
                model: store.Boards,
                key: 'BID'
            }
        },
        Boards_AcquisitionSys_IdAcquisitionSys: {
            type: SeqInit.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: store.Boards,
                key: 'AcquisitionSys_IdAcquisitionSys'
            }
        },
        Boards_AcquisitionSys_Sciper: {
            type: SeqInit.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: store.Boards,
                key: 'AcquisitionSys_Sciper'
            }
        },
        Type: {
            type: SeqInit.STRING(45)
        },
        SensorModel: {
            type: SeqInit.STRING(100)
        },
        BoardPins: {
            type: SeqInit.STRING(100)
        },
        ConnectedAt: {
            type: SeqInit.DATE,
            defaultValue: SeqInit.NOW,
            allowNull: false,
        },
        Unit: {
            type: SeqInit.STRING(100)
        }
    }
    );
}