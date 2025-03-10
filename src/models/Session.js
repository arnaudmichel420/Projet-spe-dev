const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../utils/sequelize");
const Room = require("./Room");
const Movie = require("./Movie");

const Session = sequelize.define(
  "session",
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
  },
  {
    sequelize,
    modelName: "Session",
    tableName: "sessions",
  }
);

Session.hasOne(Room, {
  foreignKey: "room_id",
});
Session.hasOne(Movie, {
  foreignKey: "movie_id",
});

module.exports = Session;
