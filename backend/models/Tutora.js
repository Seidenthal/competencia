const { DataTypes } = require('sequelize');
const db = require('../config/database');

const Tutora = db.define('Tutora', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  telefone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cpf: {
    type: DataTypes.STRING,
    allowNull: false
  },
  ra: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false
  },
  aprovado: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

module.exports = Tutora;