const { Router } = require("express");
const requireRoles = require("../middlewares/require-role");
const requireAuth = require("../middlewares/require-auth");
const Movie = require("../models/Movie");
const Reservation = require("../models/Reservation");
const Session = require("../models/Session");
const Room = require("../models/Room");
const Genre = require("../models/Genre");
const jwt = require("jsonwebtoken");

/**
 * @param {Express.Application} app
 * @param {Router} router
 */
module.exports = function (app, router) {
  router.post("/reservation", [requireAuth], async (req, res) => {
    try {
      const token = jwt.decode(req.headers.authorization);
      const userId = token.id;
      if (!req.body.session_id) {
        return res.status(400).send("Invalid session_id");
      }
      if (
        await seatTaken(
          req.body.rows_number,
          req.body.seats_number,
          req.body.session_id
        )
      ) {
        return res.status(400).send("place déja prise");
      }
      const reservation = await Reservation.create({
        user_id: userId,
        session_id: req.body.session_id,
        rows_number: req.body.rows_number,
        seats_number: req.body.seats_number,
      });
      res.status(200).send("Reservation save");
    } catch (e) {
      console.log(e);
      res.status(400).send("Bad Request");
    }
  });
};

async function seatTaken(row, column, sessionId) {
  const rowTaken = await Reservation.findOne({
    where: {
      rows_number: row,
      seats_number: column,
      session_id: sessionId,
    },
  });
  return !!rowTaken;
}
