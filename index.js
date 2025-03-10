require("dotenv").config();
require("./src/utils/sequelize");
require("express-async-errors");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const router = express.Router();
const sequelize = require("./src/utils/sequelize");
const User = require("./src/models/User.js");
const Movie = require("./src/models/Movie.js");

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

// async function inserUser() {
//   const user1 = new User({
//     password: "test",
//     email: "test@gmail.com",
//     nom: "bob",
//     prenom: "marley",
//   });

//   await user1.save();
// }
// async function inserMovie() {
//   const movie = new Movie({
//     title: "test",
//     duration: 145,
//     poster: "url",
//     description: "lorem",
//   });

//   await movie.save();
// }
// inserUser();
// inserMovie();

// faire la commande avec les tables
//repliquer les tables dans le fichier crée
