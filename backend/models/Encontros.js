const { DataTypes } = require('sequelize');
const db = require('../config/database');

const Encontros = db.define('Encontros', {
  date: {
    type: DataTypes.DATE,
    required: true,
  },
  time: {
    type: DataTypes.TIME,
    required: true,
  },
  topic: {
    type: DataTypes.STRING,
    required: true,
  },
  tutoraId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Tutoras',
      key: 'id',
    },
  },
});

module.exports = Encontros;
