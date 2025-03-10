const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../utils/sequelize");
const Genre = require("./Genre");
const Movie = require("./Movie");

const MovieGenre = sequelize.define(
  "movie_genre",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    genre_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Genre,
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
  },
  {
    sequelize,
    modelName: "MovieGenre",
    tableName: "movie_genre",
  }
);

Genre.belongsToMany(Movie, {
  through: MovieGenre,
  foreignKey: "genre_id",
  otherKey: "movie_id",
});

Movie.belongsToMany(Genre, {
  through: MovieGenre,
  foreignKey: "movie_id",
  otherKey: "genre_id",
});

module.exports = MovieGenre;
