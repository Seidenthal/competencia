const { DataTypes } = require('sequelize');
const db = require('../config/database');

const Section = db.define('Section', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  deadline: {
    type: DataTypes.DATE,
    allowNull: true
  },
  files: {
    type: DataTypes.JSONB,
    allowNull: true
  }
});

module.exports = Section;