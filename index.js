'use strict';
module.exports = function (dbConfigs) {
    
    var SeqInit = require('sequelize');
    var store = {models:{},repository:{}};
    var fs = require("fs");
    var path = require("path");
    var sequelize = new SeqInit(dbConfigs.name, dbConfigs.username, dbConfigs.password, {
        host: dbConfigs.hostname,
        dialect: 'mysql',
        logging: false,
        define: {
            timestamps: false,
            freezeTableName: true
        }
    });

    store.models = require('./models')({store:store,sequelize:sequelize,SeqInit:SeqInit});
   // store.repository = require('./repository')
    return store;
};