module.exports = function (store, sequelize, SeqInit) {
    return sequelize.define('AcquisitionSys', {
        IdAcquisitionSys: {
            type: SeqInit.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        Sciper: {
            type: SeqInit.STRING(7),
            allowNull: false,
            primaryKey: true
        },
        Computername: {
            type: SeqInit.STRING(45),
            allowNull: false
        },
        MacAdress: {
            type: SeqInit.STRING(45)
        },
        IP: {
            type: SeqInit.STRING(15)
        },
        Responsible: {
            type: SeqInit.STRING(145)
        },

        AppVersion: {
            type: SeqInit.STRING(10)
        },
        CreatedAt: {
            type: SeqInit.DATE,
            defaultValue: SeqInit.NOW,
            allowNull: false,
        },
        StartedAt: {
            type: SeqInit.DATE,
            defaultValue: SeqInit.NOW,
            allowNull: false,
        }
    }
    );
};

