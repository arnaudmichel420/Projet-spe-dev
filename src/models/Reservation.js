const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../utils/sequelize");

const Movie = require("./Movie");
const Session = require("./Session");
const User = require("./User");

class Reservation extends Model {}

Reservation.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
    },
    session_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Session,
        key: "id",
      },
    },
    rows_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    seats_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Reservation",
    tableName: "reservations",
  }
);

Reservation.hasOne(Session, {
  foreignKey: "session_id",
});
Reservation.hasOne(User, {
  foreignKey: "user_id",
});

module.exports = Reservation;
