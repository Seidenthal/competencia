const { DataTypes } = require('sequelize');
const db = require('../config/database');

const Section = db.define('Section', {
  title: {
    type: DataTypes.STRING,

    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  deadline: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  files: {
    type: DataTypes.JSONB,
    allowNull: true,
  },
  tutoraId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: 'Tutoras',
      key: 'id', //
    },
  },
  index: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
  },
});

module.exports = Section;
