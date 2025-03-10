const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../utils/sequelize");

class Genre extends Model {}

Genre.init(
  {
    genre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Genre",
    tableName: "genres",
  }
);

module.exports = Genre;
