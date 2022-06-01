require('dotenv').config();
const { DataTypes, Sequelize } = require('sequelize');
const path = require('path');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

const {PICTURES_DEFAULT_DIR} = process.env; 


module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemons', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    life: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    strength: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    defense: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    speed: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    heigth:{
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    weight:{
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    image: {
      type: DataTypes.STRING,
      defaultValue: PICTURES_DEFAULT_DIR + 'pokeball.png',
    },
  },
  {
    timestamps: false,
  });
};
