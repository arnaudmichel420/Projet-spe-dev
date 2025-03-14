const { Router } = require("express");
const requireRoles = require("../middlewares/require-role");
const requireAuth = require("../middlewares/require-auth");
const Movie = require("../models/Movie");
const Genre = require("../models/Genre");
const MovieGenre = require("../models/MovieGenre");
const Session = require("../models/Session");
const Room = require("../models/Room");
const { Op, where } = require("sequelize");

/**
 * @param {Express.Application} app
 * @param {Router} router
 */
module.exports = function (app, router) {
  router.post(
    "/movie",
    [requireAuth, requireRoles(["ADMIN"])],
    async (req, res) => {
      try {
        if (!req.body.title) {
          return res.status(400).send("Invalid title");
        }
        if (!req.body.duration) {
          return res.status(400).send("Invalid duration");
        }
        if (!req.body.poster) {
          return res.status(400).send("Invalid poster");
        }
        if (!req.body.description) {
          return res.status(400).send("Invalid description");
        }
        if (!req.body.genre) {
          return res.status(400).send("Invalid genre");
        }
        //check if genre exist
        const genreId = await Genre.findOne({
          where: {
            genre: req.body.genre,
          },
        });
        if (!genreId) {
          return res.status(400).send("genre n'existe pas");
        }
        //check if movie exist
        const movieTaken = await Movie.findOne({
          where: {
            title: req.body.title,
          },
        });
        if (movieTaken) {
          return res.status(400).send("film existe déja");
        }

        //add movie
        const movie = await Movie.create({
          title: req.body.title,
          duration: req.body.duration,
          poster: req.body.poster,
          description: req.body.description,
        });

        //add genre
        const movieId = await Movie.findOne({
          where: {
            title: req.body.title,
          },
        });
        const movieGenre = await MovieGenre.create({
          movie_id: movieId.dataValues.id,
          genre_id: genreId.dataValues.id,
        });
        res.status(200).send("Film save");
      } catch (e) {
        console.log(e);
        res.status(400).send("Bad Request");
      }
    }
  );
  router.post(
    "/session",
    [requireAuth, requireRoles(["ADMIN"])],
    async (req, res) => {
      try {
        if (!req.body.title) {
          return res.status(400).send("Invalid title");
        }
        if (!req.body.room) {
          return res.status(400).send("Invalid duration");
        }
        if (!req.body.date) {
          return res.status(400).send("Invalid poster");
        }
        //check if movie exist
        const movieId = await Movie.findOne({
          where: {
            title: req.body.title,
          },
        });
        if (!movieId) {
          return res.status(400).send("film n'existe pas");
        }

        //check if room exist
        const roomId = await Room.findOne({
          where: {
            name: req.body.room,
          },
        });
        if (!roomId) {
          return res.status(400).send("salle n'existe pas");
        }

        //check if room available
        const movieEnding = new Date(req.body.date);
        movieEnding.setMinutes(
          movieEnding.getMinutes() + movieId.dataValues.duration
        );

        const roomTaken = await Session.findOne({
          where: {
            room_id: roomId.dataValues.id,
            start_time: {
              [Op.lt]: movieEnding,
            },
            end_time: {
              [Op.gt]: req.body.date,
            },
          },
        });
        if (roomTaken) {
          return res.status(400).send("salle prise");
        }

        const session = await Session.create({
          movie_id: movieId.dataValues.id,
          room_id: roomId.dataValues.id,
          start_time: req.body.date,
          end_time: movieEnding,
        });
        res.status(200).send("Session save");
      } catch (e) {
        console.log(e);
        res.status(400).send("Bad Request");
      }
    }
  );
};
