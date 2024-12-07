const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('Certificadora3', 'postgres', 'admin', {
  host: 'localhost',
  dialect: 'postgres'
});

module.exports = sequelize;