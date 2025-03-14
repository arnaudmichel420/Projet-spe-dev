const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../utils/sequelize");
const Room = require("./Room");
const Movie = require("./Movie");

class Session extends Model {}
Session.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    room_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Room,
        key: "id",
      },
    },
    movie_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Movie,
        key: "id",
      },
    },
    start_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Session",
    tableName: "sessions",
  }
);

module.exports = Session;
