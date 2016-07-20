module.exports = function (sequelize, SeqInit) {
    return sequelize.define('Boards', {
        BID: {
            type: SeqInit.STRING(20),
            allowNull: false,
            primaryKey: true
        },
        AcquisitionSys_IdAcquisitionSys: {
            type: SeqInit.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: AcquisitionSys,
                key: 'IdAcquisitionSys'
            }
        },
        AcquisitionSys_Sciper: {
            type: SeqInit.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: AcquisitionSys,
                key: 'Sciper'
            }
        },
        Name: {
            type: SeqInit.STRING(45)
        },
        BoardsModel: {
            type: SeqInit.STRING(45)
        },
        Rate: {
            type: SeqInit.INTEGER
        },
        ConnexionPort: {
            type: SeqInit.STRING(20)
        },
        ConnectedAt: {
            type: SeqInit.DATE,
            defaultValue: SeqInit.NOW,
            allowNull: false,
        }
    }
    );
}