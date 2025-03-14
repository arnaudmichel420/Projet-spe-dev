require("dotenv").config();
require("./src/utils/sequelize");
require("express-async-errors");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const router = express.Router();
const sequelize = require("./src/utils/sequelize");

app.use(cors());
app.use(bodyParser.json());
app.use("/api", router);

require("./src/controllers")(app, router);

app.use((error, req, res, next) => {
  console.log(error);
  res.status(500).send({
    code: "SERVER_ERRROR",
    message: "Internal Server Error",
  });
});

app.listen(process.env.APP_PORT, () => {
  console.log(`Api listening at http://localhost:${process.env.APP_PORT}`);
});

const Movie = require("./src/models/Movie");
const Room = require("./src/models/Room");
const Session = require("./src/models/Session");
const MovieGenre = require("./src/models/MovieGenre");
const Genre = require("./src/models/Genre");
const Reservation = require("./src/models/Reservation");
const User = require("./src/models/User");

Movie.hasMany(Session, { foreignKey: "movie_id" });
Session.belongsTo(Movie, { foreignKey: "movie_id" });
Room.hasMany(Session, { foreignKey: "room_id" });
Session.belongsTo(Room, { foreignKey: "room_id" });
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

Session.hasMany(Reservation, {
  foreignKey: "session_id",
});
Reservation.belongsTo(Session, {
  foreignKey: "session_id",
});
Reservation.belongsTo(User, {
  foreignKey: "user_id",
});
User.hasMany(Reservation, {
  foreignKey: "user_id",
});
