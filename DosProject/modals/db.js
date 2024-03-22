const { Sequelize } = require('sequelize');
const dbConfig = require('../config/db.config.js');

// Create a Sequelize instance
const sequelize = new Sequelize({
    storage:dbConfig.STORAGE,
    dialect: dbConfig.DIALECT
});

module.exports = sequelize;
