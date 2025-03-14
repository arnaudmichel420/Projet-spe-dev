const { Router } = require("express");
const requireRoles = require("../middlewares/require-role");
const requireAuth = require("../middlewares/require-auth");
const Session = require("../models/Session");
const Movie = require("../models/Movie");
const Room = require("../models/Room");
const { Op } = require("sequelize");
const Genre = require("../models/Genre");
const Reservation = require("../models/Reservation");

/**
 * @param {Express.Application} app
 * @param {Router} router
 */
module.exports = function (app, router) {
  router.get("/sessions", async (req, res) => {
    res.send(
      await Session.findAll({
        include: [
          {
            model: Movie,
            required: true,
            include: [
              {
                model: Genre,
                required: true,
                through: { attributes: [] },
              },
            ],
          },
          { model: Room, required: true },
        ],
      })
    );
  });
  router.get("/session/:date", async (req, res) => {
    const date = req.params.date;
    res.send(
      await Session.findAll({
        include: [
          {
            model: Movie,
            required: true,
            include: [
              {
                model: Genre,
                required: true,
                through: { attributes: [] },
              },
            ],
          },
          { model: Room, required: true },
        ],
        where: {
          start_time: {
            [Op.gte]: new Date(`${date}T00:00:00`),
            [Op.lt]: new Date(`${date}T23:59:59`),
          },
        },
      })
    );
  });
  router.get("/session/:session", async (req, res) => {
    const idSession = req.params.session;
    res.send(
      await Reservation.findAll({
        include: [
          {
            model: Session,
            required: true,
            include: [
              {
                model: Movie,
                required: true,
                include: [
                  {
                    model: Genre,
                    required: true,
                    through: { attributes: [] },
                  },
                ],
              },
              {
                model: Room,
                required: true,
              },
            ],
          },
        ],
        where: {
          session_id: idSession,
        },
      })
    );
  });
  router.get("/session/place/:session", async (req, res) => {
    const idSession = req.params.session;

    const seatTaken = await Reservation.count({
      group: "session_id",
      where: {
        session_id: idSession,
      },
    });

    const seatAvailable = await Session.findOne({
      include: [
        {
          model: Room,
          required: true,
        },
      ],
      where: {
        id: idSession,
      },
    });
    res.send({
      seatTaken: seatTaken[0].count,
      seatAvailable:
        seatAvailable.Room.rows_count * seatAvailable.Room.seats_per_row,
    });
  });
};
