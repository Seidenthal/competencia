const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('Certificadora3', 'postgres', 'admin', {
  host: 'localhost',
  dialect: 'postgres',
  timezone: '-03:00',
});

module.exports = sequelize;
