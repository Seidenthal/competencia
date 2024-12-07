const { DataTypes } = require('sequelize');
const db = require('../config/database');

const Admin = db.define('Admin', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Admin;