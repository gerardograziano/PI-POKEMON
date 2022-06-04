const { DataTypes, Sequelize } = require('sequelize');
const path = require('path');

const dirPicturesTypes = path.join('./pictures/types', 'defaultType.png');
//console.log('dirPicturesTypes', dirPicturesTypes); ******************************** borrar

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('types', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    
    image: {
      type: DataTypes.STRING,
      defaultValue: dirPicturesTypes ,
    },
  },
  {
    timestamps: false,
  });
};
