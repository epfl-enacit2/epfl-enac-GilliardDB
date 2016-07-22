'use strict';
var configs = require('./configs')(require('path').join(__dirname, 'configs/configs.json'));
var store = require('../')(configs.db);

store.repository.insertSensorValues({models:store.models,configs:configs})